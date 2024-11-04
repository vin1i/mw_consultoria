import React from "react";
import { useParams } from "react-router-dom";
import { properties } from "../../pages/ImobiList/data";

const ImobiDetails = () => {
    const { id } = useParams();
    console.log("ID da URL:", id); // Verifique o ID capturado da URL
    const property = properties.find((property) => property.id === parseInt(id));
    console.log("Imóvel encontrado:", property); // Verifique se o imóvel foi encontrado
  
    if (!property) {
      return <p>Imóvel não encontrado.</p>;
    }
  
    return (
      <div>
        <h1>{property.tipo}</h1>
        <img src={property.thumb} alt={property.tipo} />
        <p>Endereço: {property.endereco}</p>
        <p>Valor: {property.valor}</p>
        <p>Quartos: {property.quartos}</p>
        <p>Banheiros: {property.banheiros}</p>
        <p>Vagas: {property.vagas}</p>
      </div>
    );
  };
  

export default ImobiDetails;
