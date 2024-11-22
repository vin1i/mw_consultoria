import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  padding-bottom: 50px;
  min-height: 120vh;
  background-image: url(${(props) => props.background});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;

  @media (max-width: 1024px) {
    padding: 20px;
    min-height: 100vh;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    padding: 20px 10px;
    min-height: auto;
  }
`;

export const TextContainer = styled.div`
  width: 40%;
  padding-left: 250px;
  color: var(--black);
  z-index: 2;

  @media (max-width: 1024px) {
    padding-left: 50px;
    width: 60%;
  }

  @media (max-width: 768px) {
    padding: 10px;
    width: 100%;
  }
`;

export const Text = styled.div`
  font-size: 1.5rem;
  line-height: 1.8;

  p {
    margin-bottom: 20px;
  }

  @media (max-width: 1024px) {
    font-size: 1.4rem;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    text-align: center;
  }
`;

export const Logo = styled.img`
  margin-top: 60px;
  max-width: 300px;
  height: auto;
  display: block;

  @media (max-width: 768px) {
    margin-top: 30px;
    max-width: 200px;
  }
`;
