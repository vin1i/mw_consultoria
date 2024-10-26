// src/components/Servicos/ServicosStyles.js
import styled from "styled-components";

export const ServicosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px 50px;
  padding: 50px 100px;
  background-color: var(--grey);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -20px; /* Espaço antes do footer */
    left: 0;
    width: 100%;
    height: 3px; /* Espessura da linha */
    background-color: var(--red); /* Cor da linha */
  }
`;

export const ServicoCard = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 50px 20px 20px;
`;

export const Image = styled.img`
  width: 150px;
  height: auto;
  margin-right: 50px;
`;

export const Text = styled.div`
  h3 {
    font-size: 1.6rem; /* Aumente a fonte do título */
    margin-bottom: 10px;
    color: var(--black); /* Cor do título preta */
  }

  p {
    font-size: 1.2rem; /* Aumente a fonte do parágrafo */
    color: var(--black); /* Cor do parágrafo preta */
  }
`;

export const TituloServicos = styled.h1`
  font-size: 1.8rem; /* Tamanho do título */
  color: var(--red); /* Cor do título */
  text-align: start;
  background-color: var(--grey);
  padding: 10px;
  padding-left: 100px;
  position: relative;
  margin-bottom: 50px;

  &::after {
    content: "";
    position: absolute;
    bottom: 1px; /* Distância da linha para o título */
    left: 100px; /* Mesma distância usada no padding-left */
    width: 10%; /* Comprimento da linha */
    height: 2px; /* Espessura da linha */
    background-color: var(--black); /* Cor da linha */
  }
`;

export const WhatsAppButton = styled.a`
  background-color: var(--red);
  color: var(--white);
  padding: 5px 24px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 20px auto;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  height: 50px;
  width: 200px;

  &:hover {
    background-color: darkred; /* Cor de fundo ao passar o mouse */
  }
`;
