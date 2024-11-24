import React, { useState, useEffect, useMemo } from "react";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import Filters from "../../components/Filters";
import { Wrapper, Sidebar, ListingsSection } from "./styles";
import { getImoveis } from "../Admin/services/propertyService";

const cloudinaryCloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

const ImobiList = () => {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Estado para erro
  const [filters, setFilters] = useState({
    tipo: "",
    quartos: "",
    banheiros: "",
    vagas: "",
  });
  console.log("Imóveis recebidos:", imoveis);
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

  // Função para validar a imagem
  const getImageURL = (images) => {
    if (images && images.length > 0 && images[0]) {
      const url = `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/${images[0]}`;
      console.log("URL gerada para a imagem:", url); // Verificar a URL gerada
      return url;
    }
    console.warn("Sem imagens válidas. Usando placeholder.");
    return "https://via.placeholder.com/300x200?text=Sem+Imagem";
  };

  useEffect(() => {
    const fetchImoveis = async () => {
      setLoading(true);
      try {
        const fetchedImoveis = await getImoveis();
        setImoveis(fetchedImoveis);
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImoveis();
  }, []);

  // Aplica os filtros
  const filteredProperties = useMemo(() => {
    return imoveis.filter((property) => {
      // Filtro por tipo
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
  
      // Filtro por quartos
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
  
      // Filtro por banheiros
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
  
      // Filtro por vagas
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

  // Paginação
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const currentProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProperties, currentPage, itemsPerPage]);

  // Atualiza filtros e reseta a página
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Resetar para a primeira página ao aplicar filtros
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <Wrapper>
      {loading ? (
        <p>Carregando imóveis...</p>
      ) : error ? (
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
            {currentProperties.length > 0 ? (
              currentProperties.map((property) => (
                <Card
                  key={property.id}
                  id={property.id}
                  titulo={property.titulo}
                  tipo={property.tipo}
                  endereco={property.endereco}
                  valorVenda={property.valorVenda}
                  valorLocacao={property.valorLocacao}
                  condominio={Number(property.condominio) || 0} // Converte para número
                  iptu={Number(property.iptu) || 0} // Converte para número
                  quartos={Number(property.quartos)} // Converte para número
                  banheiros={Number(property.banheiros)} // Converte para número
                  vagas={Number(property.vagas)} // Converte para número
                  metrosQuadrados={Number(property.metrosQuadrados)} // Converte para número
                  suites={Number(property.suites)} // Converte para número
                  imagens={property.imagens || []}
                  descricao={property.descricao}
                />
              ))
            ) : (
              <p>Nenhum imóvel encontrado com os filtros aplicados.</p>
            )}
          </ListingsSection>
        </>
      )}
    </Wrapper>
  );
};

export default ImobiList;
