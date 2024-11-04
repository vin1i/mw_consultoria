import React from "react";
import { CardContainer, CardImage, CardInfo, DetailsButton } from "./styles";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Card = ({ id, thumb, tipo, endereco, valor }) => {
  const navigate = useNavigate();

  console.log("ID no Card:", id);

  return (
    <CardContainer>
      <CardImage src={thumb} alt={tipo} />
      <CardInfo>
        <h3>{tipo}</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaMapMarkerAlt style={{ marginRight: "8px" }} />
          <p>{endereco}</p>
        </div>
        <p><strong>{valor}</strong></p>
        <DetailsButton onClick={() => navigate(`/imoveis/${id}`, { replace: true })}>
          Detalhes <FaArrowRight />
        </DetailsButton>
      </CardInfo>
    </CardContainer>
  );
};

export default Card;
