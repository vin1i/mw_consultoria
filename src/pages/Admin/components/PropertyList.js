import React, { useEffect, useState } from "react";
import { getImoveis, deleteImovel } from "../services/propertyService";
import styled from "styled-components";
import Carousel from "../../../components/Carousel";
import Swal from "sweetalert2";

const PropertyList = ({ onEdit, onDelete }) => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    const result = await Swal.fire({
      title: "Você tem certeza?",
      text: "Esta ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--light-green)",
      cancelButtonColor: "var(--red)",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });
  
    if (result.isConfirmed) {
      try {
        await deleteImovel(id); // Função para excluir o imóvel
        setProperties((prev) => prev.filter((property) => property.id !== id)); // Atualiza a lista
        await Swal.fire({
          title: "Excluído!",
          text: "O imóvel foi excluído com sucesso.",
          icon: "success",
          confirmButtonColor: "var(--red)", // Personaliza o botão de "OK" no modal de sucesso
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Erro ao deletar imóvel:", error);
        await Swal.fire({
          title: "Erro!",
          text: "Não foi possível excluir o imóvel. Tente novamente.",
          icon: "error",
          confirmButtonColor: "var(--red)", // Mesma personalização no erro
          confirmButtonText: "OK",
        });
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
              <Title>{property.titulo || "Sem título"}</Title>
              <Details>
                <p>
                  <strong>Endereço:</strong>{" "}
                  {property.endereco || "Não informado"}
                </p>
                <p>
                  <strong>Valor Venda:</strong>{" "}
                  {property.valorVenda
                    ? `R$ ${property.valorVenda.toLocaleString("pt-BR")}`
                    : "Não disponível"}
                </p>
                <p>
                  <strong>Valor Locação:</strong>{" "}
                  {property.valorLocacao
                    ? `R$ ${property.valorLocacao.toLocaleString("pt-BR")}`
                    : "Não disponível"}
                </p>
                <p>
                  <strong>Condomínio:</strong>{" "}
                  {property.vlCondominio
                    ? `R$ ${property.vlCondominio.toLocaleString("pt-BR")}`
                    : "Não disponível"}
                </p>
                <p>
                  <strong>IPTU:</strong>{" "}
                  {property.vlIptu
                    ? `R$ ${property.vlIptu.toLocaleString("pt-BR")}`
                    : "Não disponível"}
                </p>
                <p>
                  <strong>Quartos:</strong>{" "}
                  {property.quartos || "Não informado"}
                </p>
                <p>
                  <strong>Banheiros:</strong>{" "}
                  {property.banheiros || "Não informado"}
                </p>
                <p>
                  <strong>Suítes:</strong> {property.suites || "Não informado"}
                </p>
                <p>
                  <strong>Vagas:</strong> {property.vagas || "Não informado"}
                </p>
                <p>
                  <strong>Metragem:</strong>{" "}
                  {property.metrosQuadrados || "Não informado"} m²
                </p>
                <p>
                  <strong>Disponibilidade:</strong>{" "}
                  {property.disponibilidade || "Não informado"}
                </p>
                <p>
                  <strong>Descrição:</strong>{" "}
                  {property.descricao || "Não informada"}
                </p>
              </Details>
              <ButtonContainer>
                <ActionButton onClick={() => onEdit(property)}>Editar</ActionButton>
                <ActionButton onClick={() => confirmDelete(property.id)}>Excluir</ActionButton>
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
