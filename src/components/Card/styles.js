import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex: 1,
  padding: "8px",
  background: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
  flex-direction: row;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 8px;

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }
  }

`;

export const ImageContainer = styled.div`
  flex: 1.5;
  height: 300px;
  overflow: hidden;
  border-right: 1px solid #ddd;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    border-right: none;
    height: 140px;
    flex: 1;
  }
`;

export const InfoContainer = styled.div`
  flex: 1;
  padding: 10px 5px 10px 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 10px 20px 20px 20px;
  }
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--black);
  text-transform: uppercase;
  border-bottom: 2px solid var(--red);
  padding-bottom: 3px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Address = styled.p`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: var(--black);
  margin-bottom: 10px;

  svg {
    margin-right: 6px;
    color: var(--red);
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 13px;
  color: var(--black);
  margin: 6px 0;

  span {
    display: flex;
    align-items: center;
    gap: 5px;

    svg {
      color: var(--red);
    }
  }

  @media (max-width: 768px) {
    font-size: 12px;

    span {
    display: flex;
    align-items: center;
    gap: 10px;

    svg {
      color: var(--red);
    }
  }
`;

export const Price = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: var(--red);
  margin-bottom: 5px;

  p {
    margin: 5px;
    font-size: 16px;
    color: var(--red);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  @media (max-width: 768px) {
    font-size: 16px;

    p {
      font-size: 16px;
    }
  }
`;

export const Description = styled.p`
  font-size: 13px;
  color: var(--black);
  margin-bottom: 12px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const Button = styled.button`
  background-color: var(--red);
  color: #fff;
  font-size: 13px;
  font-weight: bold;
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.3s ease, transform 0.2s;

  &:hover {
    background-color: var(--dark-red);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width: 100%;
    padding: 8px;
  }
`;
