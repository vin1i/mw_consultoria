import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
import PropTypes from "prop-types";

const CloudinaryImage = ({
  publicId,
  width = 500,
  height = 500,
  alt = "Imagem",
}) => {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    console.error("Cloudinary Cloud Name não configurado.");
    return (
      <p style={{ color: "red" }}>
        Erro: Configuração do Cloudinary ausente.
      </p>
    );
  }

  if (!publicId) {
    console.warn("Public ID não fornecido.");
    return (
      <img
        src="https://via.placeholder.com/500"
        alt="Imagem não disponível"
        width={width}
        height={height}
        style={{ objectFit: "cover" }}
      />
    );
  }

  const cld = new Cloudinary({ cloud: { cloudName } });

  const img = cld
    .image(publicId)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(width).height(height));

  return <AdvancedImage cldImg={img} alt={alt} />;
};

CloudinaryImage.propTypes = {
  publicId: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string,
};

export default CloudinaryImage;
