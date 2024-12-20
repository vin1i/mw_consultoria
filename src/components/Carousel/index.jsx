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
    autoplay: false,
    lazyLoad: "progressive",
  };

  return (
    <Slider {...settings}>
      {images.map((item, index) => {

        return (
          <div key={index}>
            {item.type === "video" ? (
              <iframe
                width="100%"
                height="400px"
                src={item.src}
                title={`Vídeo ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <img
                src={item.src}
                alt={`Imagem ${index + 1}`}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            )}
          </div>
        );
      })}
    </Slider>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      type: PropTypes.oneOf(["image", "video"]),
    })
  ).isRequired,
};

const CustomArrow = ({ direction, onClick }) => (
  <ArrowButton
    direction={direction}
    onClick={onClick}
    aria-label={direction === "next" ? "Próxima imagem" : "Imagem anterior"}
  >
    {direction === "next" ? <FaArrowRight /> : <FaArrowLeft />}
  </ArrowButton>
);

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.direction === "next" ? "right: 15px;" : "left: 15px;")}
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
  position: relative;
  text-align: center;

  img,
  iframe {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    img,
    iframe {
      max-height: 300px;
    }
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;

  iframe {
    border-radius: 8px;
  }
`;

const FallbackMessage = styled.p`
  font-size: 1.2rem;
  color: var(--black);
  text-align: center;
  padding: 20px;
`;

export default Carousel;
