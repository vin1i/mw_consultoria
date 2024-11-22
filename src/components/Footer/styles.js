import styled from "styled-components";

export const Container = styled.div`
  background-color: #ffffff;
  width: 100%;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 30px; /* Espaço entre os elementos */
  }
`;

export const SocialMedia = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  span {
    color: var(--black);
    font-size: 1.4rem;

    @media (max-width: 768px) {
      text-align: center;
    }
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
        color: var(--red);
        transition: color 0.3s ease-in-out;

        &:hover {
          color: var(--dark-red);
        }

        svg {
          width: 30px;
          height: 30px;
        }
      }
    }

    @media (max-width: 768px) {
      justify-content: center; /* Centraliza os ícones */
      gap: 20px;
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

    @media (max-width: 768px) {
      text-align: center;
    }
  }

  a {
    color: var(--black);
    text-decoration: none;
    font-size: 1.3rem;
    margin-top: 5px;

    &:hover {
      color: var(--red);
    }

    @media (max-width: 768px) {
      text-align: center;
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

    @media (max-width: 768px) {
      text-align: center;
      font-size: 2rem;
    }
  }

  a {
    color: var(--black);
    font-size: 1.45rem;
    text-decoration: none;
    margin-bottom: 10px;

    @media (max-width: 768px) {
      text-align: center;
    }
  }
`;

export const WhatsAppButton = styled.a`
  background-color: var(--white);
  color: var(--black);
  padding: 10px 24px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  border: 2px solid var(--black);
  transition: background-color 0.3s ease;
  border-radius: 8px;

  &:hover {
    background-color: var(--grey);
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1rem;
    padding: 8px;
  }
`;

export const RedLine = styled.div`
  background-color: var(--red);
  height: 3px;
  width: 100%;
`;

export const FooterBar = styled.div`
  font-size: 1rem;
  background-color: var(--black);
  color: var(--white);
  text-align: center;
  padding: 10px 0;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 0;
  }
`;

export const WhatsAppButtonRedondo = styled.a`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--light-green);
  color: var(--white);
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
  z-index: 1000;

  &:hover {
    background-color: #16ac32;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    bottom: 15px;
    right: 15px;
  }
`;
