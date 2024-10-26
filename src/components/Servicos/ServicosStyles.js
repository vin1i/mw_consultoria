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
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: var(--red);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
`;

export const ServicoCard = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

export const Image = styled.img`
  width: 150px;
  height: auto;
  margin-right: 20px;
`;

export const Text = styled.div`
  h3 {
    font-size: 1.6rem;
    margin-bottom: 10px;
    color: var(--black);
  }

  p {
    font-size: 1.2rem;
    color: var(--black);
  }
`;

export const TituloServicos = styled.h1`
  font-size: 1.8rem;
  color: var(--red);
  text-align: start;
  background-color: var(--grey);
  padding: 10px;
  padding-left: 100px;
  position: relative;
  margin-bottom: 50px;

  &::after {
    content: "";
    position: absolute;
    bottom: 1px;
    left: 100px;
    width: 10%;
    height: 2px;
    background-color: var(--black);
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
    background-color: darkred;
  }
`;

