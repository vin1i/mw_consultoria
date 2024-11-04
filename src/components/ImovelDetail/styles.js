import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
`;

export const ImageContainer = styled.div`
  width: 100%;
  max-height: 450px;
  border-radius: 10px;
  overflow: hidden;
  object-fit: cover;
  image-rendering: crisp-edges;
`;


export const ContentContainer = styled.div`
  padding: 20px 100px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
  z-index: 1;
  backface-visibility: hidden;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: var(--black);
  margin: 10px 0;
`;

export const Address = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 10px;
`;

export const Features = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 16px;
  color: var(--black);
  gap: 50px;

  p {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .feature-icon {
    font-size: 18px;
    color: #888;
  }
`;

export const Price = styled.p`
  font-size: 45px;
  font-weight: bold;
  color: var(--black);
`;

export const Description = styled.p`
  font-size: 16px;
  white-space: pre-wrap;
  line-height: 1.6;
  color: var(--black);
  margin: 0;
  padding: 0;
`;

export const WhatsAppButton = styled.a`
  background-color: var(--red);
  color: #fff;
  padding: 12px 24px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  height: 50px;
  width: 220px;
  margin: 20px 0;

  &:hover {
    background-color: var(--dark-red);
  }
`;
