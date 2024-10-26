import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  padding-bottom: 50px;
  min-height: 120vh;
  background-image: url(${(props) => props.background});
  background-position: center; /* Centraliza a imagem */
  background-size: cover; /* Faz a imagem cobrir todo o espaço do container */
  background-repeat: no-repeat; /* Evita que a imagem se repita */
  position: relative;
`;

export const TextContainer = styled.div`
  width: 40%;
  padding-left: 250px;
  color: var(--black);
  z-index: 2;
`;

export const Text = styled.div`
  font-size: 1.5rem;
  line-height: 1.8;

  p {
    margin-bottom: 20px;
  }
`;

export const Logo = styled.img`
  margin-top: 60px;
  max-width: 300px;
  height: auto;
  display: block;
`;
