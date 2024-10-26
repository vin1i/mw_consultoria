import styled from "styled-components";

export const Container = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SocialMedia = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  span {
    color: var(--black);
    font-size: 1.4rem;
  }

  .social-icons {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 30px;
    margin-top: 10px;

    .social-icon {
      transition: all 0.3s ease-in-out;

      a {
        color: var(--red); /* Cor padrão do ícone */
        transition: color 0.3s ease-in-out;

        &:hover {
          color: var(--dark-red); /* Cor ao passar o mouse */
        }

        svg {
          /* Certifique-se de que a cor não esteja sendo definida aqui */
          width: 30px;  /* Defina o tamanho */
          height: 30px; /* Defina o tamanho */
        }
      }
    }
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  span {
    color: var(--red);
    font-size: 2.6rem;
  }

  a {
    color: var(--black);
    text-decoration: none;
    font-size: 1.3rem;
    margin-top: 5px;
    &:hover {
      color: var(--red);
    }
  }
`;

export const PhoneInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  span {
    color: var(--black);
    font-size: 2.6rem;
  }

  a {
    color: var(--black);
    font-size: 1.45rem;
    text-decoration: none;
    margin-bottom: 10px;
  }
`;

export const WhatsAppButton = styled.a`
  background-color: var(--white);
  color: var(--black);
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
  border: 2px solid var(--black);
  transition: background-color 0.3s ease;
  height: 60px;
  width: 230px;

  &:hover {
    background-color: var(--grey);
  }
`;

export const FooterBar = styled.div`
  font-size: 1rem;
  background-color: var(--black);
  color: var(--white);
  text-align: center;
  padding: 10px 0;
  width: 100%;
  position: relative;
`;

export const WhatsAppButtonRedondo = styled.a`
  position: fixed; /* Fixa o botão na tela */
  bottom: 20px; /* Distância do fundo da tela */
  right: 20px; /* Distância da direita da tela */
  background-color: var(--light-green); /* Cor de fundo do botão */
  color: var(--white); /* Cor do ícone */
  border-radius: 50%; /* Botão redondo */
  width: 90px; /* Largura do botão */
  height: 90px; /* Altura do botão */
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Sombra do botão */
  transition: background-color 0.3s ease;
  z-index: 1000; /* Aumenta o valor do z-index para ficar acima da FooterBar */

  &:hover {
    background-color: #16AC32; /* Cor ao passar o mouse */
  }
`;