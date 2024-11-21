import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ images }) => {
  if (!images || images.length === 0) {
    return <p>Nenhuma imagem disponível</p>;
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
    lazyLoad: "ondemand",
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <SlideContainer key={index}>
          <img src={image.src} alt={image.alt} />
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
  <ArrowButton direction={direction} onClick={onClick}>
    {direction === "next" ? <FaArrowRight /> : <FaArrowLeft />}
  </ArrowButton>
);

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  ${props => (props.direction === "next" ? "right: 10px;" : "left: 10px;")}
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  font-size: 20px;
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

export default Carousel;
