import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  FiltersContainer,
  FieldContainer,
  Label,
  PriceInput,
  StyledSelect,
  SliderWrapper,
} from "./styles";

const Filters = ({ filters, onFilterChange, filterOptions }) => {
  const [priceRange, setPriceRange] = useState([
    filters.precoMinimo || 0,
    filters.precoMaximo || 20000000,
  ]);

  const [tempPriceRange, setTempPriceRange] = useState(priceRange);

  const handleRangeChange = (range) => {
    setPriceRange(range);
    setTempPriceRange(range);
    onFilterChange({
      ...filters,
      precoMinimo: range[0],
      precoMaximo: range[1],
    });
  };

  const handleTempInputChange = (index, value) => {
    const updatedTempRange = [...tempPriceRange];
    updatedTempRange[index] = value === "" ? "" : Number(value);
    setTempPriceRange(updatedTempRange);
  };

  const applyInputChange = (index) => {
    const updatedRange = [...tempPriceRange];
    if (updatedRange[0] === "" || updatedRange[1] === "") {
      updatedRange[0] = priceRange[0];
      updatedRange[1] = priceRange[1];
    }

    updatedRange[0] = Math.max(0, Math.min(20000000, updatedRange[0]));
    updatedRange[1] = Math.max(0, Math.min(20000000, updatedRange[1]));

    if (updatedRange[0] > updatedRange[1]) {
      if (index === 0) updatedRange[1] = updatedRange[0];
      if (index === 1) updatedRange[0] = updatedRange[1];
    }

    setPriceRange(updatedRange);
    setTempPriceRange(updatedRange);
    onFilterChange({
      ...filters,
      precoMinimo: updatedRange[0],
      precoMaximo: updatedRange[1],
    });
  };

  return (
    <FiltersContainer>
      <FieldContainer>
        <Label>Preço (R$)</Label>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <PriceInput
            type="number"
            min={0}
            max={20000000}
            value={tempPriceRange[0]}
            onChange={(e) => handleTempInputChange(0, e.target.value)}
            onBlur={() => applyInputChange(0)}
            onKeyDown={(e) =>   e.key === "Enter" && applyInputChange(0)}
          />
          <span style={{ fontWeight: "bold", color: "#333" }}>até</span>
          <PriceInput
            type="number"
            min={0}
            max={20000000}
            value={tempPriceRange[1]}
            onChange={(e) => handleTempInputChange(1, e.target.value)}
            onBlur={() => applyInputChange(1)}
            onKeyDown={(e) => e.key === "Enter" && applyInputChange(1)}
          />
        </div>
        <SliderWrapper>
          <Slider
            range
            min={0}
            max={20000000}
            step={10000}
            value={priceRange}
            onChange={handleRangeChange}
            trackStyle={{ backgroundColor: "var(--red)", height: 8 }}
            handleStyle={{
              borderColor: "var(--red)",
              backgroundColor: "#fff",
              height: 20,
              width: 20,
              marginTop: -6 /* Centraliza verticalmente os handles */,
              boxShadow:
                "0 0 5px rgba(0,0,0,0.2)" /* Adiciona um efeito leve */,
            }}
            railStyle={{ backgroundColor: "#ddd", height: 8 }}
          />
        </SliderWrapper>
      </FieldContainer>

      {filterOptions.map(({ id, label, key, options }) => (
        <FieldContainer key={id}>
          <Label htmlFor={id}>{label}</Label>
          <StyledSelect
            id={id}
            value={filters[key] || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, [key]: e.target.value })
            }
          >
            {options.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </StyledSelect>
        </FieldContainer>
      ))}
    </FiltersContainer>
  );
};

export default Filters;
