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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Função para validar a imagem
  const getImageURL = (images) => {
    if (images && images.length > 0) {
      return `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/${images[0]}`;
    }
    return "https://via.placeholder.com/300x200?text=Sem+Imagem";
  };

  // Busca imóveis da API
  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        setLoading(true);
        setError("");
        const fetchedImoveis = await getImoveis();
        setImoveis(fetchedImoveis);
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
        setError("Ocorreu um problema ao carregar os imóveis. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchImoveis();
  }, []);

  // Aplica os filtros
  const filteredProperties = useMemo(() => {
    return imoveis.filter((property) => {
      if (filters.tipo && property.tipo !== filters.tipo) return false;
      if (filters.quartos && property.quartos !== Number(filters.quartos)) return false;
      if (filters.banheiros && property.banheiros !== Number(filters.banheiros)) return false;
      if (filters.vagas && property.vagas !== Number(filters.vagas)) return false;
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
            <Filters onFilterChange={handleFilterChange} />
          </Sidebar>
          <ListingsSection>
            {currentProperties.map((property) => {
              const firstImage = getImageURL(property.imagens);

              return (
                <Card
                  key={property.id}
                  id={property.id}
                  tipo={property.tipo}
                  endereco={property.endereco}
                  valor={property.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  titulo={property.titulo}
                  descricao={property.descricao}
                  metrosQuadrados={property.metrosQuadrados}
                  thumb={firstImage}
                />
              );
            })}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </ListingsSection>
        </>
      )}
    </Wrapper>
  );
};

export default ImobiList;
