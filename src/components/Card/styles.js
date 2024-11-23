import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ImageContainer = styled.div`
  flex: 1;
  padding: 8px;
  background: #f8f8f8;
  border-radius: 8px;
`;

export const InfoContainer = styled.div`
  flex: 2;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
  color: var(--black);
`;

export const Address = styled.p`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--black);
  margin-bottom: 12px;

  svg {
    margin-right: 8px;
    color: var(--red);
  }
`;

export const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 14px;
  color: var(--black);
  margin: 12px 0;

  span {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const Price = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: var(--red);
  margin-bottom: 16px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: var(--black);
  margin-bottom: 16px;
  line-height: 1.4;
`;

export const Button = styled.button`
  background-color: var(--red);
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background-color: var(--dark-red);
  }
`;
