import React, { useEffect, useState } from "react";
import { getImoveis, deleteImovel } from "../services/propertyService";
import styled from "styled-components";
import Carousel from "../../../components/Carousel";

const PropertyList = ({ onEdit, onDelete }) => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const cloudinaryCloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

  useEffect(() => {
    async function fetchProperties() {
      try {
        const data = await getImoveis();
        setProperties(data);
      } catch (error) {
        console.error("Erro ao carregar propriedades:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const confirmDelete = async (id) => {
    if (window.confirm("Tem certeza de que deseja excluir este imóvel?")) {
      try {
        await deleteImovel(id);
        setProperties((prev) => prev.filter((property) => property.id !== id));
      } catch (error) {
        console.error("Erro ao deletar imóvel:", error);
      }
    }
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingMessage>Carregando propriedades...</LoadingMessage>
      ) : properties.length > 0 ? (
        <Grid>
          {properties.map((property) => (
            <Card key={property.id}>
              <Title>{property.titulo}</Title>
              <Details>
                <p>
                  <strong>Endereço:</strong> {property.endereco}
                </p>
                <p>
                  <strong>Valor:</strong> R$ {property.valor.toLocaleString()}
                </p>
                <p>
                  <strong>Quartos:</strong> {property.quartos}
                </p>
                <p>
                  <strong>Banheiros:</strong> {property.banheiros}
                </p>
                <p>
                  <strong>Suítes:</strong> {property.suites}
                </p>
                <p>
                  <strong>Vagas:</strong> {property.vagas}
                </p>
                <p>
                  <strong>Metragem:</strong> {property.metrosQuadrados} m²
                </p>
                <p>
                  <strong>Disponibilidade:</strong> {property.disponibilidade}
                </p>
                <p>
                  <strong>Descrição:</strong> {property.descricao}
                </p>
              </Details>

              <CarouselContainer>
                <Carousel
                  images={property.imagens?.map((img) => ({
                    src: `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/${img}`,
                    alt: "Imagem do imóvel",
                  }))}
                />
              </CarouselContainer>

              <VideoContainer>
                {property.videos?.map((video, index) => (
                  <iframe
                    key={index}
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${video}`}
                    title={`Vídeo ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ))}
              </VideoContainer>

              <ButtonContainer>
                <ActionButton onClick={() => onEdit(property)}>Editar</ActionButton>
                <ActionButton onClick={() => confirmDelete(property.id)}>Deletar</ActionButton>
              </ButtonContainer>
            </Card>
          ))}
        </Grid>
      ) : (
        <EmptyMessage>Nenhuma propriedade encontrada.</EmptyMessage>
      )}
    </Container>
  );
};

export default PropertyList;

// Estilização
const Container = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
`;

const Details = styled.div`
  font-size: 1rem;
  margin-bottom: 15px;
  color: #555;

  p {
    margin-bottom: 8px;
  }
`;

const CarouselContainer = styled.div`
  margin-bottom: 15px;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  background-color: var(--red);
  color: #fff;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--dark-red);
  }
`;

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  color: #333;
  text-align: center;
`;

const EmptyMessage = styled.p`
  font-size: 1.2rem;
  color: #333;
  text-align: center;
`;
