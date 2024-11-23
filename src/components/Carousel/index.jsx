import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ images }) => {
  if (!images || images.length === 0) {
    return <FallbackMessage>Nenhuma imagem disponível</FallbackMessage>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    autoplay: true,
    autoplaySpeed: 3000,
    lazyLoad: "progressive", // Alterado para carregamento progressivo
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <SlideContainer key={index}>
          <img
            src={image.src}
            alt={image.alt}
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/800x400?text=Imagem+Indisponível")
            }
          />
          {image.caption && <p>{image.caption}</p>}
        </SlideContainer>
      ))}
    </Slider>
  );
};

// Validação de props
Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      caption: PropTypes.string,
    })
  ).isRequired,
};

// Customização das setas
const CustomArrow = ({ direction, onClick }) => (
  <ArrowButton
    direction={direction}
    onClick={onClick}
    aria-label={direction === "next" ? "Próxima imagem" : "Imagem anterior"}
  >
    {direction === "next" ? <FaArrowRight /> : <FaArrowLeft />}
  </ArrowButton>
);

// Estilos personalizados
const ArrowButton = styled.button`
  position: absolute;
  top: 50%; /* Centraliza verticalmente */
  transform: translateY(-50%); /* Corrige o alinhamento */
  ${(props) => (props.direction === "next" ? "right: 15px;" : "left: 15px;")} /* Posiciona à esquerda ou direita */
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px; /* Tamanho fixo para consistência */
  height: 40px; /* Tamanho fixo para consistência */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px; /* Tamanho da seta */
  cursor: pointer;
  z-index: 2;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const SlideContainer = styled.div`
  position: relative;
  text-align: center;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  p {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5px 10px;
    border-radius: 4px;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const FallbackMessage = styled.p`
  font-size: 1.2rem;
  color: var(--black);
  text-align: center;
  padding: 20px;
`;

export default Carousel;
