import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row; /* Mantém a direção em linha */
  justify-content: flex-start; /* Distribui o espaço entre os elementos */
  align-items: center; /* Alinha verticalmente no centro */
  width: 100vw;
  gap: 50px;

  @media (max-width: 768px) {
    flex-direction: column; /* Em telas menores, muda para coluna */
    align-items: center; /* Centraliza os itens */
  }
`;

export const Image = styled.img`
  width: 100%; /* Define a imagem com largura total */
  max-width: 650px; /* Limita a largura máxima da imagem */
  height: auto; /* Mantém a proporção da imagem */
  object-fit: cover;

  @media (max-width: 768px) {
    max-width: 100%; /* Imagem ocupa toda a largura em telas pequenas */
    margin-bottom: 20px; /* Espaço abaixo da imagem */
  }
`;

export const Text = styled.div`
  width: 570px; /* Ajusta a largura do texto para 40% */
  padding: 30px 0 0 50px; /* Padding do texto */
  font-size: 1.6rem; /* Tamanho da fonte */

  h1 {
    position: relative;
    margin-bottom: 60px; /* Espaço abaixo do título */
  }

  h1::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 38%;
    height: 2px;
    background-color: var(--black);
  }

  h3 {
    font-size: 30px; /* Tamanho do subtítulo */
    margin-top: 10px; /* Margem acima do subtítulo */
    margin-bottom: 25px; /* Margem abaixo do subtítulo */
  }

  p {
    font-size: 26px; /* Tamanho do parágrafo */
    margin-bottom: 20px; /* Margem abaixo do parágrafo */
  }

  @media (max-width: 768px) {
    width: 100%; /* Preenche toda a largura em telas pequenas */
    padding: 0; /* Remove padding em telas pequenas */
    text-align: center; /* Centraliza o texto */
  }
`;

export const Arrow = styled.img`
  width: 220px; /* Tamanho fixo da seta */
  margin-left: 20px;
  align-self: flex-start; /* Alinha a seta na parte inferior do container */

  @media (max-width: 768px) {
    display: none; /* Esconde a seta em telas menores */
  }
`;
