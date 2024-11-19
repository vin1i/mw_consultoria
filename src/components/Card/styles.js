import styled from "styled-components";

export const CardContainer = styled.div`
  width: 300px;
  margin: 8px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 8px;
`;

export const CardInfo = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: start;

  h3 {
    font-size: 1.4rem;  // Para um tamanho de fonte mais legível e escalável
    font-weight: bold;
    margin-bottom: 4px;
    color: #333;  // Cor do texto
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #555;  // Cor do texto do endereço
  }
`;

export const DetailsButton = styled.a`
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 10px 15px;
  background-color: var(--red, #ff4c4c);  // Define um fallback para o vermelho, caso a variável não esteja definida
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s ease-in-out;
  cursor: pointer;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--dark-red);  // Cor de hover do botão
    transform: scale(1.05);
  }

  svg {
    margin-left: 5px;
  }
`;

export const LocationText = styled.p`
  margin-left: 8px;
`;
