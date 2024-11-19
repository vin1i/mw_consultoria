import React, { useState, useEffect } from "react";
import { FiltersContainer, Label, Select } from "./styles";

const Filters = ({ onFilterChange }) => {
  const [tipo, setTipo] = useState("");
  const [quartos, setQuartos] = useState("");
  const [banheiros, setBanheiros] = useState("");
  const [vagas, setVagas] = useState("");

  // useEffect para atualizar os filtros apenas quando o usuário terminar de alterar os valores
  useEffect(() => {
    // Chamando a função onFilterChange sempre que qualquer estado de filtro mudar
    onFilterChange({ tipo, quartos, banheiros, vagas });
  }, [tipo, quartos, banheiros, vagas, onFilterChange]); // Depende de todos os filtros e da função onFilterChange

  return (
    <FiltersContainer>
      <div>
        <Label>Tipo de Imóvel</Label>
        <Select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="Apartamento">Apartamento</option>
          <option value="Casa">Casa</option>
          <option value="Cobertura">Cobertura</option>
          {/* Adicione mais opções conforme necessário */}
        </Select>
      </div>

      <div>
        <Label>Quartos</Label>
        <Select
          value={quartos}
          onChange={(e) => setQuartos(e.target.value)}
        >
          <option value="">Qualquer</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4+</option>
        </Select>
      </div>

      <div>
        <Label>Banheiros</Label>
        <Select
          value={banheiros}
          onChange={(e) => setBanheiros(e.target.value)}
        >
          <option value="">Qualquer</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3+</option>
        </Select>
      </div>

      <div>
        <Label>Vagas</Label>
        <Select
          value={vagas}
          onChange={(e) => setVagas(e.target.value)}
        >
          <option value="">Qualquer</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3+</option>
        </Select>
      </div>
    </FiltersContainer>
  );
};

export default Filters;
