import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  height: 100vh;
  width: 100%;
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  position: relative;
`;

export const TextContainer = styled.div`
  width: 50%;
  padding-left: 380px;
  color: var(--black);
  z-index: 2;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
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
