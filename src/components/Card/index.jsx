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
  endereco,
  valorVenda,
  valorLocacao,
  condominio,
  iptu,
  imagens,
  videos,
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
  const media = [
    ...(imagens || []).map((img) => ({ src: img, type: "image" })),
    ...(videos || []).map((vid) => ({ src: vid, type: "video" })),
  ];

  return (
    <CardContainer>
      <div
        style={{
          flex: 1,
          padding: "8px",
          paddingBottom: "33px",
          background: "#ffffff",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <ImageCarousel media={media} cloudinaryBaseUrl={cloudinaryBaseUrl} showDots={false} />
      </div>
      <InfoContainer>
        <Title>{titulo || "Sem título"}</Title>
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
            <FaDoorClosed /> {suites || 0} Suítes
          </span>
          <span>
            <FaCar /> {vagas || 0} Vagas
          </span>
        </Features>
        <Price>
          {valorVenda > 0 && (
            <p>
              <strong>Venda: </strong>
              {parseFloat(valorVenda).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          )}
          {valorLocacao > 0 && (
            <p>
              <strong>Locação: </strong>
              {parseFloat(valorLocacao).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          )}
          {condominio > 0 && (
            <p>
              <strong>Condomínio: </strong>
              {parseFloat(condominio).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          )}
          {iptu > 0 && (
            <p>
              <strong>IPTU: </strong>
              {parseFloat(iptu).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
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
  endereco: PropTypes.string,
  valorVenda: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valorLocacao: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  condominio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iptu: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imagens: PropTypes.arrayOf(PropTypes.string),
  videos: PropTypes.arrayOf(PropTypes.string),
  quartos: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  banheiros: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  vagas: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  metrosQuadrados: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  suites: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  descricao: PropTypes.string,
};

export default Card;
