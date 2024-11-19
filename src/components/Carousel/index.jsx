import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ images }) => {
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
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <SlideContainer key={index}>
          <Image src={image.src} alt={image.alt} />
          <p>{image.caption}</p>
        </SlideContainer>
      ))}
    </Slider>
  );
};

// Componente para customizar as setas
const CustomArrow = ({ direction, onClick }) => {
  return (
    <ArrowButton direction={direction} onClick={onClick}>
      {direction === "next" ? <FaArrowRight /> : <FaArrowLeft />}
    </ArrowButton>
  );
};

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
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

export default Carousel;
