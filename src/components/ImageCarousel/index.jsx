import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = ({ images, cloudinaryBaseUrl }) => {
  if (!images || images.length === 0) {
    return <FallbackMessage>Nenhuma imagem disponível</FallbackMessage>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    autoplay: true,
    autoplaySpeed: 3000,
    lazyLoad: "ondemand",
  };

  return (
    <StyledSlider
      {...settings}
      role="region"
      aria-label="Carrossel de imagens do imóvel"
    >
      {images.map((image, index) => (
        <SlideContainer key={index}>
          <img
            src={
              image.startsWith("http")
                ? image
                : `${cloudinaryBaseUrl}/image/upload/${image}`
            }
            alt={`Imagem ${index + 1}`}
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/800x400?text=Imagem+Indisponível")
            }
          />
        </SlideContainer>
      ))}
    </StyledSlider>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  cloudinaryBaseUrl: PropTypes.string.isRequired,
};

const CustomArrow = ({ direction, onClick }) => (
  <ArrowButton
    direction={direction}
    onClick={onClick || (() => {})} // Garante que `onClick` sempre terá uma função
    aria-label={direction === "next" ? "Próxima imagem" : "Imagem anterior"}
  >
    {direction === "next" ? <FaArrowRight /> : <FaArrowLeft />}
  </ArrowButton>
);

CustomArrow.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func, // Torna `onClick` opcional
};

const StyledSlider = styled(Slider)`
  .slick-arrow {
    z-index: 2;
  }

  .slick-prev,
  .slick-next {
    width: 70px;
    height: 70px;
  }

  .slick-prev:before,
  .slick-next:before {
    content: "";
  }

  .slick-dots li button:before {
    color: var(--red);
  }

  .slick-dots li.slick-active button:before {
    color: var(--dark-red);
    font-size: 12px;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) =>
    props.direction === "next"
      ? "right: 15px;"
      : "left: 15px;"}
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  z-index: 2;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const SlideContainer = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const FallbackMessage = styled.p`
  font-size: 1.2rem;
  color: var(--black);
  text-align: center;
  padding: 20px;
`;

export default ImageCarousel;