import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import Carousel from "../Carousel";
import { getImovelById } from "../../services/firebase/firestoreService"; // Certifique-se de ajustar o caminho

const ImobiDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyData = await getImovelById(id); // Use o serviço Firestore
        if (propertyData) {
          setProperty(propertyData);
        } else {
          console.error("Imóvel não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar imóvel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <Wrapper>
        <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
          <span role="img" aria-label="Carregando">⏳</span> Carregando detalhes do imóvel...
        </p>
      </Wrapper>
    );
  }

  if (!property) {
    return <p>Imóvel não encontrado.</p>;
  }

  const images = property.imagens && property.imagens.length > 0
  ? property.imagens.map((img) => ({
      src: img.startsWith("http")
        ? img
        : `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${img}`,
      alt: property.tipo || "Imagem do imóvel",
    }))
  : [{ src: "https://via.placeholder.com/300x200?text=Sem+Imagem", alt: "Sem Imagem" }];


  return (
    <Wrapper>
      <Carousel images={images} />

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
          aria-label={`Fale conosco sobre o imóvel ${property.tipo} localizado em ${property.endereco}`}
        >
          Fale conosco!
          <FaWhatsapp style={{ color: "white", fontSize: "25px", marginLeft: "10px" }} />
        </WhatsAppButton>
      </ContentContainer>
    </Wrapper>
  );
};

export default ImobiDetails;
