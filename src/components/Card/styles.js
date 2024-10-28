import styled from "styled-components";

export const CardContainer = styled.div`
  width: 300px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
`;

export const CardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

export const CardInfo = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: start;

  h3 {
    font-size: 1.2em;
    margin-bottom: 4px;
  }

  p {
    margin: 0;
  }
`;

export const DetailsButton = styled.a`
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 10px 15px; /* Adiciona padding para um botão mais confortável */
  background-color: var(--red); /* Cor de fundo do botão */
  color: white; /* Cor do texto */
  text-decoration: none; /* Remove o sublinhado */
  border-radius: 5px; /* Bordas arredondadas */
  transition: background-color 0.3s, transform 0.2s; /* Transições suaves para fundo e transformações */
  z-index: 2; /* Garante que o botão esteja acima de outros elementos */
  cursor: pointer;
  outline: none;

  /* Adiciona sombra para dar mais destaque ao botão */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05); /* Aumenta o tamanho do botão */
  }

  svg {
    margin-left: 5px; /* Espaçamento entre o texto e o ícone */
  }
`;
