import React from "react";
import { CardContainer, CardImage, CardInfo, DetailsButton } from "./styles";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Card = ({ id, tipo, endereco, valor, thumb, imagens }) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <CardContainer>
      <Slider {...settings}>
        <div>
          <CardImage src={thumb} alt={tipo} />
        </div>
        {imagens &&
          imagens.map((imagem, index) => (
            <div key={index}>
              <CardImage src={imagem} alt={tipo} />
            </div>
          ))}
      </Slider>
      <CardInfo>
        <h3>{tipo}</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaMapMarkerAlt style={{ marginRight: "8px" }} />
          <p>{endereco}</p>
        </div>
        <p>
          <strong>{valor}</strong>
        </p>
        <DetailsButton
          onClick={() => navigate(`/imoveis/${id}`, { replace: true })}
        >
          Detalhes <FaArrowRight />
        </DetailsButton>
      </CardInfo>
    </CardContainer>
  );
};

export default Card;
