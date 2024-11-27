import React, { useState, useEffect, useMemo, useContext } from "react";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import Filters from "../../components/Filters";
import { Wrapper, Sidebar, ListingsSection, PaginationWrapper } from "./styles";
import { getImoveis } from "../Admin/services/propertyService";
import { useLoading } from "../../context/LoadingContext";

const cloudinaryCloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

const ImobiList = () => {
  const [imoveis, setImoveis] = useState([]);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    tipo: "",
    quartos: "",
    banheiros: "",
    vagas: "",
  });
  const { setIsLoading, isLoading } = useLoading();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filterOptions = [
    {
      id: "tipo",
      label: "Tipo de Negócio",
      key: "tipo",
      options: [
        { value: "", label: "Todos" },
        { value: "venda", label: "Venda" },
        { value: "locacao", label: "Locação" },
        { value: "vendaLocacao", label: "Venda e Locação" },
      ],
    },
    {
      id: "quartos",
      label: "Quartos",
      key: "quartos",
      options: [
        { value: "", label: "Qualquer" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4+", label: "4+" },
      ],
    },
    {
      id: "banheiros",
      label: "Banheiros",
      key: "banheiros",
      options: [
        { value: "", label: "Qualquer" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3+" },
      ],
    },
    {
      id: "vagas",
      label: "Vagas",
      key: "vagas",
      options: [
        { value: "", label: "Qualquer" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3+" },
      ],
    },
  ];

  useEffect(() => {
    const fetchImoveis = async () => {
      setIsLoading(true);
      try {
        const fetchedImoveis = await getImoveis();
        setImoveis(fetchedImoveis);
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
        setError("Erro ao carregar os imóveis. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImoveis();
  }, [setIsLoading]);

  const filteredProperties = useMemo(() => {
    return imoveis.filter((property) => {
      if (filters.tipo) {
        if (
          filters.tipo === "venda" &&
          property.tipo !== "venda" &&
          property.tipo !== "vendaLocacao"
        ) {
          return false;
        }

        if (
          filters.tipo === "locacao" &&
          property.tipo !== "locacao" &&
          property.tipo !== "vendaLocacao"
        ) {
          return false;
        }

        if (
          filters.tipo !== "venda" &&
          filters.tipo !== "locacao" &&
          filters.tipo !== property.tipo
        ) {
          return false;
        }
      }

      if (filters.quartos) {
        const quartosFilter = Number(filters.quartos.replace("+", ""));
        const quartosProperty = Number(property.quartos);
        if (
          (filters.quartos.includes("+") && quartosProperty < quartosFilter) ||
          (!filters.quartos.includes("+") && quartosProperty !== quartosFilter)
        ) {
          return false;
        }
      }

      if (filters.banheiros) {
        const banheirosFilter = Number(filters.banheiros.replace("+", ""));
        const banheirosProperty = Number(property.banheiros);
        if (
          (filters.banheiros.includes("+") &&
            banheirosProperty < banheirosFilter) ||
          (!filters.banheiros.includes("+") &&
            banheirosProperty !== banheirosFilter)
        ) {
          return false;
        }
      }

      if (filters.vagas) {
        const vagasFilter = Number(filters.vagas.replace("+", ""));
        const vagasProperty = Number(property.vagas);
        if (
          (filters.vagas.includes("+") && vagasProperty < vagasFilter) ||
          (!filters.vagas.includes("+") && vagasProperty !== vagasFilter)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [imoveis, filters]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const currentProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProperties, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <Wrapper>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
        <Sidebar>
          <Filters
            filters={filters}
            onFilterChange={setFilters}
            filterOptions={filterOptions}
          />
        </Sidebar>
        <ListingsSection>
          {imoveis.length === 0 ? (
            <p>Nenhum imóvel encontrado com os filtros aplicados.</p>
          ) : (
            currentProperties.length > 0 ? (
              currentProperties.map((property) => (
                <Card
                  key={property.id}
                  id={property.id}
                  titulo={property.titulo}
                  tipo={property.tipo}
                  endereco={property.endereco}
                  valorVenda={property.valorVenda}
                  valorLocacao={property.valorLocacao}
                  condominio={Number(property.condominio) || 0}
                  iptu={Number(property.iptu) || 0}
                  quartos={Number(property.quartos)}
                  banheiros={Number(property.banheiros)}
                  vagas={Number(property.vagas)}
                  metrosQuadrados={Number(property.metrosQuadrados)}
                  suites={Number(property.suites)}
                  imagens={property.imagens || []}
                  descricao={property.descricao}
                />
              ))
            ) : (
              <p>Nenhum imóvel encontrado com os filtros aplicados.</p>
            )
          )}
          {totalPages > 1 && (
            <PaginationWrapper>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </PaginationWrapper>
          )}
        </ListingsSection>
      </>
    )}
  </Wrapper>
  );
};

export default ImobiList;
