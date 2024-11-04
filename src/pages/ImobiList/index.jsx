import React, { useState } from "react";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import Filters from "../../components/Filters";
import { Wrapper, Sidebar, ListingsSection } from "./styles";
import { properties } from "./data"; // Importação da propriedade properties

const ImobiList = () => {
  const [filters, setFilters] = useState({
    tipo: "",
    quartos: "",
    banheiros: "",
    vagas: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredProperties = properties.filter((property) => {
    if (filters.tipo && property.tipo !== filters.tipo) return false;
    if (filters.quartos && property.quartos !== Number(filters.quartos)) return false;
    if (filters.banheiros && property.banheiros !== Number(filters.banheiros)) return false;
    if (filters.vagas && property.vagas !== Number(filters.vagas)) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <Wrapper>
      <Sidebar>
        <Filters onFilterChange={handleFilterChange} />
      </Sidebar>
      <ListingsSection>
        {currentProperties.map((property) => (
          <Card
            key={property.id}
            id={property.id}
            thumb={property.thumb}
            tipo={property.tipo}
            endereco={property.endereco}
            valor={property.valor}
            slug={property.slug}
          />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </ListingsSection>
    </Wrapper>
  );
};

export default ImobiList;
