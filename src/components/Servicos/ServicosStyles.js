import styled from "styled-components";

export const ServicosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px 50px;
  padding: 50px 100px;
  background-color: var(--grey);
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 30px 50px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
`;

export const ServicoCard = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--white);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 15px;
  }
`;

export const Image = styled.img`
  width: 150px;
  height: auto;
  margin-right: 20px;
  border-radius: 8px;

  @media (max-width: 768px) {
    margin: 0 auto 15px;
    width: 120px;
  }
`;

export const Text = styled.div`
  h3 {
    font-size: 1.6rem;
    margin-bottom: 10px;
    color: var(--black);
    font-weight: bold;
    text-align: left;

    @media (max-width: 768px) {
      text-align: center;
      font-size: 1.4rem;
    }
  }

  p {
    font-size: 1.2rem;
    color: var(--black);
    line-height: 1.5;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

export const TituloServicos = styled.div`
  font-size: 2rem;
  color: var(--red);
  text-align: start;
  background-color: var(--grey);
  padding: 10px 100px;
  position: relative;
  margin-bottom: 50px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 100px;
    width: 10%;
    height: 2px;
    background-color: var(--black);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 1.8rem;

    &::after {
      left: 20px;
      width: 20%;
    }
  }
`;

export const WhatsAppButton = styled.a`
  background-color: var(--red);
  color: var(--white);
  padding: 10px 24px;
  font-size: 1.2rem;
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
  width: 200px;

  &:hover {
    background-color: darkred;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    font-size: 1rem;
    padding: 10px;
  }
`;
