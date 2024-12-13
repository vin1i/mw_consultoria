// import React from "react";
// import { FiltersContainer, FieldContainer, Label, Select } from "./styles";

// const Filters = ({ filters, onFilterChange, filterOptions }) => {
//   const handleChange = (key, value) => {
//     const updatedFilters = { ...filters, [key]: value };
//     onFilterChange(updatedFilters);
//   };

//   return (
//     <FiltersContainer>
//       {filterOptions.map(({ id, label, key, options }) => (
//         <FieldContainer key={id}>
//           <Label htmlFor={id}>{label}</Label>
//           <Select
//             id={id}
//             value={filters[key] || ""}
//             onChange={(e) => handleChange(key, e.target.value)}
//           >
//             {options.map(({ value, label }) => (
//               <option key={value} value={value}>
//                 {label}
//               </option>
//             ))}
//           </Select>
//         </FieldContainer>
//       ))}
//     </FiltersContainer>
//   );
// };

// export default Filters;

import React from "react";
import { FiltersContainer, FieldContainer, Label, Select } from "./styles";

const Filters = ({ filters, onFilterChange, filterOptions }) => {
  const handleChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    onFilterChange(updatedFilters);
  };

  return (
    <FiltersContainer>



          {/* Filtro de preço mínimo */}
          <FieldContainer>
        <Label htmlFor="precoMinimo">Preço Mínimo</Label>
        <Select
          id="precoMinimo"
          value={filters.precoMinimo || ""}
          onChange={(e) => handleChange('precoMinimo', e.target.value)}
        >
          <option value="">Selecione o preço mínimo</option>
    <option value={100000}>100.000</option>
    <option value={200000}>200.000</option>
    <option value={300000}>300.000</option>
    <option value={500000}>500.000</option>
    <option value={1000000}>1.000.000</option>
    <option value={2000000}>2.000.000</option>
    <option value={5000000}>5.000.000</option>
    <option value={10000000}>10.000.000</option>
        </Select>
      </FieldContainer>

      {/* Filtro de preço máximo */}
      <FieldContainer>
        <Label htmlFor="precoMaximo">Preço Máximo</Label>
        <Select
          id="precoMaximo"
          value={filters.precoMaximo || ""}
          onChange={(e) => handleChange('precoMaximo', e.target.value)}
        >
          <option value="">Selecione o preço máximo</option>
    <option value={500000}>500.000</option>
    <option value={1000000}>1.000.000</option>
    <option value={2000000}>2.000.000</option>
    <option value={5000000}>5.000.000</option>
    <option value={10000000}>10.000.000</option>
    <option value={15000000}>15.000.000</option>
    <option value={20000000}>20.000.000</option>
        </Select>
      </FieldContainer>





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
