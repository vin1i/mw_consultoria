import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  gap: 50px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Image = styled.img`
  width: 100%;
  max-width: 650px;
  height: auto;
  object-fit: cover;

  @media (max-width: 1024px) {
    max-width: 80%;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 20px;
  }
`;

export const Text = styled.div`
  width: 570px;
  padding: 30px 0 0 50px;
  font-size: 1.6rem;

  h1 {
    position: relative;
    margin-bottom: 40px;
    font-size: 2.5rem;
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
    font-size: 2rem;
    margin-top: 10px;
    margin-bottom: 25px;
  }

  p {
    font-size: 1.6rem;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  @media (max-width: 1024px) {
    padding: 0 20px;
    text-align: center;
    width: 100%;

    h1 {
      font-size: 2rem;
    }

    h3 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const Arrow = styled.img`
  width: 220px;
  margin-left: 20px;
  align-self: flex-start;

  @media (max-width: 1024px) {
    display: none;
  }
`;
