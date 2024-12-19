import React, { useState, useEffect, useMemo } from "react";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import Filters from "../../components/Filters";
import { Wrapper, Sidebar, ListingsSection, PaginationWrapper } from "./styles";
import { getImoveis } from "../Admin/services/propertyService";
import { useLoading } from "../../context/LoadingContext";

const cloudinaryCloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const cloudinaryBaseUrl = `https://res.cloudinary.com/${cloudinaryCloudName}`;

const normalizeValues = (value) => {
  if (!value) return 0;
  if (typeof value === "string") {
    return parseFloat(
      value.replace("R$", "").replace(/\./g, "").replace(",", ".")
    );
  }
  return value;
};

const ImobiList = () => {
  const [imoveis, setImoveis] = useState([]);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    tipo: "",
    quartos: "",
    banheiros: "",
    vagas: "",
    precoMinimo: 100000,
    precoMaximo: 1000000,
  });
  const { setIsLoading, isLoading } = useLoading();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
        const normalizedImoveis = fetchedImoveis.map((property) => ({
          ...property,
          valorVenda: normalizeValues(property.valorVenda),
          valorLocacao: normalizeValues(property.valorLocacao),
          vlCondominio: normalizeValues(property.vlCondominio),
          vlIptu: normalizeValues(property.vlIptu),
        }));
        setImoveis(normalizedImoveis);
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

      if (
        (filters.precoMinimo && property.valorVenda < filters.precoMinimo) ||
        (filters.precoMaximo && property.valorVenda > filters.precoMaximo)
      ) {
        return false;
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
            ) : currentProperties.length > 0 ? (
              currentProperties.map((property) => (
                <Card
                  key={property.id}
                  id={property.id}
                  titulo={property.titulo}
                  tipo={property.tipo}
                  endereco={property.endereco}
                  valorVenda={property.valorVenda}
                  valorLocacao={property.valorLocacao}
                  condominio={property.vlCondominio}
                  iptu={property.vlIptu}
                  quartos={Number(property.quartos)}
                  banheiros={Number(property.banheiros)}
                  vagas={Number(property.vagas)}
                  metrosQuadrados={Number(property.metrosQuadrados)}
                  suites={Number(property.suites)}
                  cloudinaryBaseUrl={cloudinaryBaseUrl}
                  imagens={
                    property.imagens?.length > 0
                      ? property.imagens.map((img) =>
                          img.startsWith("http")
                            ? img
                            : `${cloudinaryBaseUrl}/image/upload/${img}`
                        )
                      : [
                          "https://via.placeholder.com/300x200?text=Imagem+Indisponível",
                        ]
                  }
                  descricao={property.descricao}
                  disponibilidade={property.disponibilidade}
                />
              ))
            ) : (
              <p>Nenhum imóvel encontrado com os filtros aplicados.</p>
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
