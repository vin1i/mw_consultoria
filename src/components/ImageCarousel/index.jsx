import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ImageCarousel = ({ images, cloudinaryBaseUrl }) => {
  const formatImage = (image) =>
    image.startsWith("http") ? image : `${cloudinaryBaseUrl}/image/upload/${image}`;

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView={1}
      style={{ borderRadius: "8px", overflow: "hidden" }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={formatImage(image)}
            alt={`Imagem ${index + 1}`}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  cloudinaryBaseUrl: PropTypes.string.isRequired,
};

export default ImageCarousel;