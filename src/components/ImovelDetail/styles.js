import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ImageContainer = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

export const Address = styled.p`
  font-size: 18px;
  color: #777;
`;

export const Features = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  color: #555;

  p {
    display: flex;
    align-items: center;
    font-size: 16px;
    gap: 5px;
  }
`;

export const Price = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: var(--red);
`;

export const Description = styled.p`
  font-size: 16px;
  color: #555;
`;

export const WhatsAppButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--red);
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s;
  width: fit-content;

  &:hover {
    background-color: var(--dark-red);
  }

  svg {
    margin-left: 10px;
  }
`;
