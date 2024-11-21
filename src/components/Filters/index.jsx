import React, { useState, useEffect } from "react";
import { FiltersContainer, Label, Select } from "./styles";

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    tipo: "",
    quartos: "",
    banheiros: "",
    vagas: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const renderSelect = (label, key, options) => (
    <div>
      <Label>{label}</Label>
      <Select
        value={filters[key]}
        onChange={(e) => handleFilterChange(key, e.target.value)}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </div>
  );

  return (
    <FiltersContainer>
      {renderSelect("Tipo de Imóvel", "tipo", [
        { value: "", label: "Todos" },
        { value: "Apartamento", label: "Apartamento" },
        { value: "Casa", label: "Casa" },
        { value: "Cobertura", label: "Cobertura" },
      ])}

      {renderSelect("Quartos", "quartos", [
        { value: "", label: "Qualquer" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4+" },
      ])}

      {renderSelect("Banheiros", "banheiros", [
        { value: "", label: "Qualquer" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3+" },
      ])}

      {renderSelect("Vagas", "vagas", [
        { value: "", label: "Qualquer" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3+" },
      ])}
    </FiltersContainer>
  );
};

export default Filters;
