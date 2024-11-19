import React from "react";
import { useParams } from "react-router-dom";
import { properties } from "../../pages/ImobiList/data";
import {
  Wrapper,
  ContentContainer,
  Title,
  Address,
  Price,
  Features,
  Description,
  WhatsAppButton,
} from "./styles";
import {
  FaBath,
  FaBed,
  FaCar,
  FaDoorClosed,
  FaRulerCombined,
  FaWhatsapp,
} from "react-icons/fa";
import Carousel from "../Carousel";  // Importando o carrossel

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImobiDetails = () => {
  const { id } = useParams();
  const property = properties.find((property) => property.id === parseInt(id));

  if (!property) {
    return <p>Imóvel não encontrado.</p>;
  }

  // Preparar as imagens para o carrossel, incluindo a imagem principal (thumb) e as imagens adicionais
  const images = [
    { src: property.thumb, alt: property.tipo }, // Imagem principal (thumb)
    ...property.imagens.map((img) => ({ src: img, alt: property.tipo })) // Imagens adicionais
  ];

  return (
    <Wrapper>
      <Carousel images={images} />  {/* Adicionando o carrossel aqui */}

      <ContentContainer>
        <Title>{property.tipo}</Title>
        <Address>{property.endereco}</Address>

        <Features>
          <p>
            <FaRulerCombined /> {property.metrosQuadrados} m²
          </p>
          <p>
            <FaBed /> {property.quartos} quartos
          </p>
          <p>
            <FaBath /> {property.banheiros} banheiros
          </p>
          <p>
            <FaCar /> {property.vagas} vagas
          </p>
          <p>
            <FaDoorClosed /> {property.suites} suítes
          </p>
        </Features>

        <Price>R$ {property.valor.toLocaleString("pt-BR")}</Price>

        <Description style={{ whiteSpace: "pre-wrap" }}>
          {property.descricao}
        </Description>

        <WhatsAppButton
          href={`https://api.whatsapp.com/send?phone=5511999999999&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20im%C3%B3vel%20${property.tipo}%20em%20${property.endereco}.`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Fale conosco!
          <FaWhatsapp
            style={{ color: "white", fontSize: "25px", marginLeft: "10px" }}
          />
        </WhatsAppButton>
      </ContentContainer>
    </Wrapper>
  );
};

export default ImobiDetails;
