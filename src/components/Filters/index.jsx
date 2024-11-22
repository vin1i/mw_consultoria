import React, { useState, useEffect } from "react";
import { FiltersContainer, Label, Select } from "./styles";

const renderSelect = (id, label, key, value, options, onChange) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <Select id={id} value={value} onChange={(e) => onChange(key, e.target.value)}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Select>
  </div>
);

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

  return (
    <FiltersContainer>
      {renderSelect(
        "tipo",
        "Tipo de Imóvel",
        "tipo",
        filters.tipo,
        [
          { value: "", label: "Todos" },
          { value: "Apartamento", label: "Apartamento" },
          { value: "Casa", label: "Casa" },
          { value: "Cobertura", label: "Cobertura" },
        ],
        handleFilterChange
      )}

      {renderSelect(
        "quartos",
        "Quartos",
        "quartos",
        filters.quartos,
        [
          { value: "", label: "Qualquer" },
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4+" },
        ],
        handleFilterChange
      )}

      {renderSelect(
        "banheiros",
        "Banheiros",
        "banheiros",
        filters.banheiros,
        [
          { value: "", label: "Qualquer" },
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3+" },
        ],
        handleFilterChange
      )}

      {renderSelect(
        "vagas",
        "Vagas",
        "vagas",
        filters.vagas,
        [
          { value: "", label: "Qualquer" },
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3+" },
        ],
        handleFilterChange
      )}
    </FiltersContainer>
  );
};

export default Filters;
