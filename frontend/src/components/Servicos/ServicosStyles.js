import styled, { keyframes, css } from "styled-components";

const growLine = keyframes`
  from {
    width: 0;
  }
  to {
    width: 20%; /* Ajusta a largura para ser proporcional */
  }
`;

export const ServicosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px 40px; /* Reduz o espaçamento */
  padding: 40px 80px;
  background-color: var(--grey);
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr; /* Apenas uma coluna em telas menores */
    padding: 30px 50px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 20px;
    gap: 25px; /* Menor espaçamento entre os cards */
  }
`;

export const ServicoCard = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--white);
  border-radius: 8px;
  padding: 15px; /* Reduz o padding */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    flex-direction: column; /* Alinha verticalmente no mobile */
    text-align: center;
    padding: 10px;
  }
`;

export const Image = styled.img`
  width: 120px;
  height: auto;
  margin-right: 15px;
  border-radius: 8px;

  @media (max-width: 768px) {
    margin: 0 auto 10px;
    width: 120px; /* Reduz o tamanho da imagem no mobile */
  }

  @media (max-width: 480px) {
    width: 120px; /* Imagem ainda menor para telas muito pequenas */
  }
`;

export const Text = styled.div`
  h3 {
    font-size: 1.6rem; /* Reduzido do original */
    margin-bottom: 8px; /* Reduzido o espaçamento */
    color: var(--black);
    font-weight: bold;
    text-align: left;

    @media (max-width: 768px) {
      text-align: center; /* Centraliza no mobile */
      font-size: 1.3rem;
    }

    @media (max-width: 480px) {
      font-size: 1.3rem; /* Título menor em telas muito pequenas */
    }
  }

  p {
    font-size: 1rem; /* Reduzido do original */
    color: var(--black);
    line-height: 1.4; /* Levemente reduzido */
    margin-top: 5px; /* Adiciona espaçamento mais sutil */

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }

    @media (max-width: 480px) {
      font-size: 0.85rem; /* Reduz ainda mais em telas muito pequenas */
    }
  }
`;

export const DuvidasText = styled.div`
  font-size: 1rem; /* Texto reduzido */
  margin: 0 auto; /* Centralizado */
  padding: 10px;
  max-width: 550px;
  text-align: center; /* Centralizado */

  h3 {
    font-size: 1.2rem; /* Título reduzido */
    margin-bottom: 10px;
    color: var(--black); /* Contraste */
  }

  p {
    font-size: 1rem; /* Texto reduzido */
    color: var(--black);
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;

    h3 {
      font-size: 1rem;
    }

    p {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;

    h3 {
      font-size: 0.9rem;
    }

    p {
      font-size: 0.7rem;
    }
  }
`;

export const TituloServicos = styled.div`
  font-size: 1.8rem;
  color: var(--red);
  text-align: start;
  background-color: var(--grey);
  padding: 10px 80px;
  position: relative;
  margin-bottom: 20px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 80px;
    height: 2px;
    background-color: var(--black);
    width: 0; /* Começa com 0 */
    ${({ isVisible }) =>
      isVisible &&
      css`
        animation: ${growLine} 1s ease-in-out forwards;
      `} /* Animação ativada apenas quando visível */
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 1.6rem;
    margin-bottom: 15px;

    &::after {
      left: 20px;
      width: 0;
      ${({ isVisible }) =>
        isVisible &&
        css`
          animation: ${growLine} 1s ease-in-out forwards;
        `}
    }
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
    padding: 10px 15px;
    margin-bottom: 10px;

    &::after {
      left: 15px;
      width: 0;
      ${({ isVisible }) =>
        isVisible &&
        css`
          animation: ${growLine} 1s ease-in-out forwards;
        `}
    }
  }
`;

export const WhatsAppButton = styled.a`
  background-color: var(--red);
  color: var(--white);
  padding: 10px 20px;
  font-size: 1rem; /* Reduzido do original */
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 20px auto;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  height: 50px;
  width: 180px;

  &:hover {
    background-color: darkred;
  }

  @media (max-width: 768px) {
    width: 100%; /* Ocupa toda a largura */
    height: auto;
    font-size: 1rem; /* Texto menor no mobile */
  }

  @media (max-width: 480px) {
    font-size: 0.9rem; /* Texto menor */
    padding: 8px;
  }
`;
