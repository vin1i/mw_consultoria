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
  CarouselWrapper,
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
import { getImovelById } from "../../services/firebase/firestoreService";
import { useLoading } from "../../context/LoadingContext";

const ImobiDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const { setIsLoading, isLoading } = useLoading();

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true);
      try {
        const propertyData = await getImovelById(id);
        if (propertyData) {
          setProperty(propertyData);
        } else {
          console.error("Imóvel não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar imóvel:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id, setIsLoading]);

  if (isLoading) {
    return (
      <Wrapper>
        <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
          <span role="img" aria-label="Carregando">
            ⏳
          </span>{" "}
          Carregando detalhes do imóvel...
        </p>
      </Wrapper>
    );
  }

  if (!property) {
    return (
      <Wrapper>
        <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
          Imóvel não encontrado.
        </p>
      </Wrapper>
    );
  }

  // Formata as imagens
  const images = property.imagens?.length
    ? property.imagens.map((img) => ({
        src: img.startsWith("http")
          ? img
          : `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${img}`,
        alt: property.titulo || "Imagem do imóvel",
      }))
    : [
        {
          src: "https://via.placeholder.com/300x200?text=Sem+Imagem",
          alt: "Sem Imagem",
        },
      ];

  if (property.videos?.length > 0) {
    const videoURL = property.videos[0];
    images.push({
      src: videoURL,
      type: "video",
    });
  }

  return (
    <Wrapper>
      <CarouselWrapper>
        <Carousel images={images} />
      </CarouselWrapper>
      <ContentContainer>
        <Title>{property.titulo || property.tipo || "Sem Título"}</Title>
        <Address>{property.endereco || "Endereço não informado"}</Address>

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

        <Price>
          {property.valorVenda !== undefined && (
            <p>
              <strong>Valor do Imóvel:</strong> R${" "}
              {property.valorVenda.toLocaleString("pt-BR")}
            </p>
          )}
          {property.vlCondominio !== undefined && (
            <p>
              <strong>Condomínio:</strong> R${" "}
              {property.vlCondominio.toLocaleString("pt-BR")}
            </p>
          )}
          {property.vlIptu !== undefined && (
            <p>
              <strong>IPTU:</strong> R${" "}
              {property.vlIptu.toLocaleString("pt-BR")}
            </p>
          )}
        </Price>

        <Description style={{ whiteSpace: "pre-wrap" }}>
          {property.descricao || "Descrição não disponível."}
        </Description>

        <WhatsAppButton
          href={`https://api.whatsapp.com/send?phone=5511999999999&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20o%20im%C3%B3vel%20${
            property.titulo || property.tipo
          }%20em%20${property.endereco}.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Fale conosco sobre o imóvel ${
            property.titulo || property.tipo
          } localizado em ${property.endereco}`}
        >
          Fale conosco!
          <FaWhatsapp />
        </WhatsAppButton>
      </ContentContainer>
    </Wrapper>
  );
};

export default ImobiDetails;
