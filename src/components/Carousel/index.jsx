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
      {images.map((item, index) => (
        <SlideContainer key={index}>
          {item.type === "video" ? (
            <iframe
              width="100%"
              height="400px"
              src={item.src.replace("watch?v=", "embed/")} // Formata a URL do YouTube
              title="Vídeo do imóvel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img src={item.src} alt={item.alt} />
          )}
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

  img, iframe {
    width: 100%;
    max-height: 400px; /* Limita a altura do carrossel */
    object-fit: cover; /* Garante proporção */
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    img, iframe {
      max-height: 300px; /* Reduz altura para telas menores */
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
