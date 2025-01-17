import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
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
  StatusBadge,
} from "./styles";
import { FaBath, FaBed, FaCar, FaDoorClosed, FaRulerCombined, FaWhatsapp } from "react-icons/fa";
import Carousel from "../Carousel";
import { useLoading } from "../../context/LoadingContext";
import ShareIcon from "./shareIcon";

const ImobiDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);  // Adicionado para lidar com erros específicos
  const { setIsLoading, isLoading } = useLoading();

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true);
      setError(null);  
      try {
        const response = await fetch(`https://mw-consultoria.onrender.com/properties/${id}`);
        
        // Verificando o código de status HTTP
        if (!response.ok) {
          throw new Error(`Erro na resposta da API: ${response.status} ${response.statusText}`);
        }
  
        const propertyData = await response.json();
        setProperty({
          ...propertyData,
          valorVenda: propertyData.valorVenda || 0,
          valorLocacao: propertyData.valorLocacao || 0,
          vlCondominio: propertyData.vlCondominio || 0,
          vlIptu: propertyData.vlIptu || 0,
          endereco: propertyData.endereco || "Endereço não informado",
          descricao: propertyData.descricao || "Descrição não disponível",
          imagens: propertyData.imagens || ["https://via.placeholder.com/300x200?text=Sem+Imagem"], // Imagem padrão
        });
  
      } catch (error) {
        console.error("Erro ao buscar imóvel:", error);
        setError("Erro ao carregar dados do imóvel.");
        setProperty(null);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProperty();
  }, [id]);
  

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

  if (error) {
    return (
      <Wrapper>
        <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
          {error}  {/* Exibindo mensagem de erro personalizada */}
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

  const metaTitle = property.titulo || "Imóvel disponível | MW Consultoria Imobiliária";
  const metaDescription =
    property.descricao?.substring(0, 150) || "Confira este imóvel disponível na MW Consultoria Imobiliária.";
  const metaImage = images[0]?.src || "https://via.placeholder.com/300x200?text=Sem+Imagem";
  const metaUrl = `https://www.mwconsultoriaimobiliaria.com.br/imoveis/${id}`;

  return (
    <Wrapper>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={metaUrl} />
        <meta property="og:type" content="website" />
      </Helmet>
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
          <div className="price-container">
            {property.valorVenda > 0 && (
              <div className="price-item highlight">
                <span className="label">Venda</span>
                <span className="value">
                  {property.valorVenda.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            )}
            {property.valorLocacao > 0 && (
              <div className="price-item highlight">
                <span className="label">Locação</span>
                <span className="value">
                  {property.valorLocacao.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            )}

            {property.vlCondominio > 0 && (
              <div className="price-item">
                <span className="label">Condomínio</span>
                <span className="value">
                  {property.vlCondominio.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            )}

            <div className="price-item">
              <span className="label">IPTU</span>
              <span className="value">
                {property.vlIptu > 0
                  ? property.vlIptu.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : "não informado"}
              </span>
            </div>

            <StatusBadge status={property.disponibilidade}>
              {property.disponibilidade || "Status não informado"}
            </StatusBadge>
          </div>
        </Price>

        <Description style={{ whiteSpace: "pre-wrap" }}>
          {property.descricao || "Descrição não disponível."}
        </Description>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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

          <ShareIcon
            link={metaUrl}
            title={metaTitle}
            description={metaDescription}
            image={images[0].src}
          />
        </div>
      </ContentContainer>
    </Wrapper>
  );
};

export default ImobiDetails;
