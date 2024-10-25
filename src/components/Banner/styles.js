import styled from "styled-components";
import BannerHome from "../../assets/BannerHome.png";

// Container para o banner
export const Container = styled.div`
  padding: 25px 150px;
  position: relative;
  background-image: url(${BannerHome});
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

// Componente para o texto
export const Text = styled.div`
  font-size: 40px;
  background-color: rgba(156, 25, 43, 0.75);
  color: var(--white);
  padding: 60px 300px 50px 40px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  width: 1100px; /* Defina a largura do texto */
  display: flex;
  flex-direction: column;
  align-items: left;
`;

// Componente para a linha branca que separa os textos
export const Divider = styled.div`
  width: 80%;
  height: 2px;
  background-color: var(--white);
  margin: 5px 0;
`;