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
          setProperty({
            ...propertyData,
            valorVenda: propertyData.valorVenda || 0,
            valorLocacao: propertyData.valorLocacao || 0,
            vlCondominio: propertyData.vlCondominio || 0,
            vlIptu: propertyData.vlIptu || 0,
          });
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

  const images = property.imagens?.length
    ? property.imagens.map((img) => {
        const imageUrl = img.startsWith("http")
          ? img
          : `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${img}`;
        return {
          src: imageUrl,
          type: "image",
        };
      })
    : [
        {
          src: "https://via.placeholder.com/300x200?text=Sem+Imagem",
          type: "image",
        },
      ];

  if (property.videos?.length > 0) {
    property.videos.forEach((videoURL) => {
      let embedURL = "";

      if (videoURL.includes("youtube.com/shorts")) {
        embedURL = videoURL.replace("youtube.com/shorts", "youtube.com/embed");
      } else if (videoURL.includes("youtube.com/watch")) {
        embedURL = videoURL.replace("watch?v=", "embed/");
      } else {
        console.warn(`URL de vídeo inválida:`, videoURL);
      }

      if (embedURL) {
        images.push({
          src: embedURL,
          type: "video",
        });
      }
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
            <FaRulerCombined /> {property.metrosQuadrados || 0} m²
          </p>
          <p>
            <FaBed /> {property.quartos || 0} quartos
          </p>
          <p>
            <FaDoorClosed /> {property.suites || 0} suítes
          </p>
          <p>
            <FaBath /> {property.banheiros || 0} banheiros
          </p>
          <p>
            <FaCar /> {property.vagas || 0} vagas
          </p>
        </Features>

        <Price>
          {property.valorVenda > 0 && (
            <p>
              <strong>Valor do Imóvel:</strong>{" "}
              {property.valorVenda.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          )}
          {property.valorLocacao > 0 && (
            <p>
              <strong>Valor da Locação:</strong>{" "}
              {property.valorLocacao.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          )}
          {property.vlCondominio > 0 && (
            <p>
              <strong>Condomínio:</strong>{" "}
              {property.vlCondominio.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
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
          href={`https://api.whatsapp.com/send?phone=5511973738808&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20o%20im%C3%B3vel%20${
            property.titulo || property.tipo
          }%20em%20${property.endereco}.`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Fale conosco!
          <FaWhatsapp />
        </WhatsAppButton>
      </ContentContainer>
    </Wrapper>
  );
};

export default ImobiDetails;
