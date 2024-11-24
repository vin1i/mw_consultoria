import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaCar,
  FaDoorClosed,
  FaRulerCombined,
} from "react-icons/fa";
import {
  CardContainer,
  InfoContainer,
  Title,
  Address,
  Features,
  Price,
  Description,
  Button,
} from "./styles";
import ImageCarousel from "../ImageCarousel";

const Card = ({
  id,
  tipo,
  endereco,
  valorVenda,
  valorLocacao,
  condominio,
  iptu,
  imagens,
  titulo,
  quartos,
  banheiros,
  vagas,
  metrosQuadrados,
  suites,
  descricao,
}) => {
  const navigate = useNavigate();
  const cloudinaryBaseUrl = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`;

  return (
    <CardContainer>
      <div
        style={{
          flex: 1,
          padding: "8px",
          background: "#ffffff",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <ImageCarousel images={imagens} cloudinaryBaseUrl={cloudinaryBaseUrl} />
      </div>
      <InfoContainer>
        <Title>{titulo || tipo}</Title>
        <Address>
          <FaMapMarkerAlt /> {endereco}
        </Address>
        <Description>
          {descricao
            ? `${descricao.substring(0, 100)}...`
            : "Descrição não disponível."}
        </Description>
        <Features>
          <span>
            <FaRulerCombined /> {metrosQuadrados || 0} m²
          </span>
          <span>
            <FaBed /> {quartos || 0} Quartos
          </span>
          <span>
            <FaBath /> {banheiros || 0} Banheiros
          </span>
          <span>
            <FaCar /> {vagas || 0} Vagas
          </span>
          <span>
            <FaDoorClosed /> {suites || 0} Suítes
          </span>
        </Features>
        {/* Seção de preços */}
        <Price>
          {valorVenda && (
            <p>
              <strong>Venda:</strong> R$ {valorVenda.toLocaleString("pt-BR")}
            </p>
          )}
          {valorLocacao && (
            <p>
              <strong>Locação:</strong> R${" "}
              {valorLocacao.toLocaleString("pt-BR")}
            </p>
          )}
          {condominio && (
            <p>
              <strong>Condomínio:</strong> R${" "}
              {condominio.toLocaleString("pt-BR")}
            </p>
          )}
          {iptu && (
            <p>
              <strong>IPTU:</strong> R$ {iptu.toLocaleString("pt-BR")}
            </p>
          )}
        </Price>
        <Button onClick={() => navigate(`/imoveis/${id}`)}>VER MAIS</Button>
      </InfoContainer>
    </CardContainer>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  titulo: PropTypes.string,
  endereco: PropTypes.string.isRequired,
  valor: PropTypes.number.isRequired,
  imagens: PropTypes.arrayOf(PropTypes.string).isRequired,
  quartos: PropTypes.number,
  banheiros: PropTypes.number,
  vagas: PropTypes.number,
  metrosQuadrados: PropTypes.number,
  suites: PropTypes.number,
  descricao: PropTypes.string,
};

export default Card;
