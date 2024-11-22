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

  // Configurações do Cloudinary
  const cloudinaryCloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

  // Configurações do carrossel
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

  const fallbackImage = "https://via.placeholder.com/500x300?text=Sem+Imagem";
  const thumbImage = thumb || fallbackImage;

  return (
    <CardContainer>
      <Slider {...settings}>
        {/* Imagem destacada (thumb) */}
        <div>
          <CloudinaryImage
            publicId={thumbImage}
            width={500}
            height={300}
            alt={`Imagem destacada do imóvel: ${tipo}, localizado em ${endereco}`}
          />
        </div>

        {/* Imagens adicionais */}
        {imagens.length > 0
          ? imagens.map((imagem, index) => {
              const imageUrl = `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/${imagem}`;
              return (
                <div key={index}>
                  <CloudinaryImage
                    publicId={imagem}
                    width={500}
                    height={300}
                    alt={`Imagem adicional do imóvel: ${tipo}, localizado em ${endereco}`}
                  />
                </div>
              );
            })
          : null}
      </Slider>

      {/* Informações do imóvel */}
      <CardInfo>
        <h3>{tipo}</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaMapMarkerAlt style={{ marginRight: "8px" }} />
          <LocationText>{endereco}</LocationText>
        </div>
        <h4>
          <strong>
            {valor
              ? valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : "Valor não disponível"}
          </strong>
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
  thumb: PropTypes.string,
  imagens: PropTypes.arrayOf(PropTypes.string),
};

export default Card;
