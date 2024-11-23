// src/components/Card/index.jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaBed, FaBath, FaCar } from "react-icons/fa";
import {
  CardContainer,
  InfoContainer,
  Title,
  Address,
  Features,
  Price,
  Button,
} from "./styles";
import ImageCarousel from "../ImageCarousel";

const Card = ({ id, tipo, endereco, valor, imagens, titulo, quartos, banheiros, vagas }) => {
  const navigate = useNavigate();
  const cloudinaryBaseUrl = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`;

  return (
    <CardContainer>
      {/* Carrossel de Imagens */}
      <ImageCarousel images={imagens} cloudinaryBaseUrl={cloudinaryBaseUrl} />

      {/* Informações do Imóvel */}
      <InfoContainer>
        <Title>{titulo}</Title>
        <Address>
          <FaMapMarkerAlt /> {endereco}
        </Address>
        <Features>
          <span>
            <FaBed /> {quartos || 0} Quartos
          </span>
          <span>
            <FaBath /> {banheiros || 0} Banheiros
          </span>
          <span>
            <FaCar /> {vagas || 0} Vagas
          </span>
        </Features>
        <Price>
          R$ {valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </Price>
        <Button onClick={() => navigate(`/imoveis/${id}`)}>VER MAIS</Button>
      </InfoContainer>
    </CardContainer>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  endereco: PropTypes.string.isRequired,
  valor: PropTypes.number.isRequired,
  imagens: PropTypes.arrayOf(PropTypes.string).isRequired,
  quartos: PropTypes.number,
  banheiros: PropTypes.number,
  vagas: PropTypes.number,
};

export default Card;
