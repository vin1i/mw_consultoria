import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CloudinaryImage from "../CloudinaryImage";
import { CardContainer, CardInfo, DetailsButton, LocationText } from "./styles";

// Definindo as PropTypes para garantir a tipagem das props
const Card = ({ id, tipo, endereco, valor, thumb, imagens = [] }) => {
  const navigate = useNavigate();

  // Configurações do Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768, // ajuste para telas pequenas
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
        },
      },
    ],
  };

  return (
    <CardContainer>
      {/* Slider de imagens */}
      <Slider {...settings}>
        <div>
          {/* Carregamento da imagem do Cloudinary */}
          <CloudinaryImage
            publicId={thumb}
            width={500}
            height={300}
            alt={`Imagem do imóvel ${tipo}`}
          />
        </div>
        {imagens && imagens.length > 0 ? (
          imagens.map((imagem, index) => (
            <div key={index}>
              {/* Carregar imagens adicionais do Cloudinary */}
              <CloudinaryImage
                publicId={imagem}
                width={500}
                height={300}
                alt={`Imagem do imóvel ${tipo}`}
              />
            </div>
          ))
        ) : (
          <div>No additional images available</div>
        )}
      </Slider>

      {/* Informações do Card */}
      <CardInfo>
        <h3>{tipo}</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaMapMarkerAlt style={{ marginRight: "8px" }} />
          <LocationText>{endereco}</LocationText>
        </div>
        <h4>
          <strong>{valor || "Valor não disponível"}</strong>
        </h4>
        <DetailsButton onClick={() => navigate(`/imoveis/${id}`, { replace: true })}>
          Detalhes <FaArrowRight />
        </DetailsButton>
      </CardInfo>
    </CardContainer>
  );
};

// Validação das props com PropTypes
Card.propTypes = {
  id: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  endereco: PropTypes.string.isRequired,
  valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  thumb: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired, // Aceitar tanto string quanto objeto
  imagens: PropTypes.arrayOf(PropTypes.string),
};

export default Card;
