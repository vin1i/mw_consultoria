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
  gap: 16px;
`;

export const InfoContainer = styled.div`
  flex: 2;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.h3`
  font-size: 20px;
  margin-bottom: 8px;
  color: var(--red);
  font-weight: bold;
`;

export const Address = styled.p`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #777;
  margin-bottom: 12px;

  svg {
    margin-right: 8px;
    color: #e63946;
  }
`;

export const Features = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #555;

  span {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const Price = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #e63946;
  margin: 16px 0;
`;

export const Button = styled.button`
  background-color: #e63946;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background-color: #d62839;
  }
`;
