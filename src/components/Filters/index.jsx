import React from "react";
import { FiltersContainer, FieldContainer, Label, Select } from "./styles";

const Filters = ({ filters, onFilterChange, filterOptions }) => {
  const handleChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    onFilterChange(updatedFilters);
  };

  return (
    <FiltersContainer>
      {filterOptions.map(({ id, label, key, options }) => (
        <FieldContainer key={id}>
          <Label htmlFor={id}>{label}</Label>
          <Select
            id={id}
            value={filters[key] || ""}
            onChange={(e) => handleChange(key, e.target.value)}
          >
            {options.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </FieldContainer>
      ))}
    </FiltersContainer>
  );
};

export default Filters;
