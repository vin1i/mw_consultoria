import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CloudinaryImage from "../CloudinaryImage";
import { CardContainer, CardInfo, DetailsButton, LocationText } from "./styles";

const Card = ({ id, tipo, endereco, valor, thumb, imagens = [] }) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
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
      <Slider {...settings}>
        <div>
          <CloudinaryImage
            publicId={thumb}
            width={500}
            height={300}
            alt={`Imagem destacada do imóvel: ${tipo}, localizado em ${endereco}`}
          />
        </div>
        {imagens.length > 0 ? (
          imagens.map((imagem, index) => (
            <div key={index}>
              <CloudinaryImage
                publicId={imagem}
                width={500}
                height={300}
                alt={`Imagem adicional do imóvel: ${tipo}, localizado em ${endereco}`}
              />
            </div>
          ))
        ) : (
          <div>Sem imagens adicionais disponíveis</div>
        )}
      </Slider>

      <CardInfo>
        <h3>{tipo}</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaMapMarkerAlt style={{ marginRight: "8px" }} />
          <LocationText>{endereco}</LocationText>
        </div>
        <h4>
          <strong>{valor || "Valor não disponível"}</strong>
        </h4>
        <DetailsButton onClick={() => navigate(`/imoveis/${id}`)}>
          Detalhes <FaArrowRight />
        </DetailsButton>
      </CardInfo>
    </CardContainer>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  endereco: PropTypes.string.isRequired,
  valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  thumb: PropTypes.string.isRequired,
  imagens: PropTypes.arrayOf(PropTypes.string),
};

export default Card;
