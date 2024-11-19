import React, { useState, useEffect, useMemo } from "react";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import Filters from "../../components/Filters";
import { Wrapper, Sidebar, ListingsSection } from "./styles";
import { getImoveis } from '../../services/propertyService';
import CloudinaryImage from '../../components/CloudinaryImage';

const ImobiList = () => {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    tipo: "",
    quartos: "",
    banheiros: "",
    vagas: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        setLoading(true);
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

  const filteredProperties = useMemo(() => {
    return imoveis.filter((property) => {
      if (filters.tipo && property.tipo !== filters.tipo) return false;
      if (filters.quartos && property.quartos !== Number(filters.quartos)) return false;
      if (filters.banheiros && property.banheiros !== Number(filters.banheiros)) return false;
      if (filters.vagas && property.vagas !== Number(filters.vagas)) return false;
      return true;
    });
  }, [imoveis, filters]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (newFilters) => {
    // Só atualiza os filtros se realmente houver uma mudança
    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
      setFilters(newFilters);
      setCurrentPage(1);
    }
  };

  return (
    <Wrapper>
      {loading ? (
        <p>Carregando imóveis...</p>
      ) : (
        <>
          <Sidebar>
            <Filters onFilterChange={handleFilterChange} />
          </Sidebar>
          <ListingsSection>
            {currentProperties.map((property) => (
              <Card
                key={property.id}
                id={property.id}
                tipo={property.tipo}
                endereco={property.endereco}
                valor={property.valor}
                slug={property.slug}
                thumb={<CloudinaryImage publicId={property.cloudinaryPublicId} width={300} height={200} />}
              />
            ))}
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
