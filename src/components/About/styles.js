import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 20px 0;
  gap: 50px;
  position: relative;
  width: 100vw;
`;

export const Image = styled.img`
  max-width: 550px;
  height: 100%;
  object-fit: cover;
  height: ${(props) => props.height};
`;

export const Text = styled.div`
  width: 60%;
  padding: 20px 0;
  margin-left: -30px;

  h1 {
    position: relative;
    margin-bottom: 50px;
  }

  h1::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 13%;
    height: 2px;
    background-color: var(--black);
  }

  h3 {
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 10px;
    width: 60%;
  }

  p {
    font-size: 24px;
    margin-bottom: 20px;
    width: 45%;
  }
`;

export const Arrow = styled.img`
  position: absolute;
  top: 0;
  right: 100px;
  width: 220px;
`;
