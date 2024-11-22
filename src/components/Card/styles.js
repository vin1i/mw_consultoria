import styled from "styled-components";

export const CardContainer = styled.div`
  width: 300px;
  margin: 16px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 90%;
    margin: 10px auto;
    padding: 12px;
  }
`;

export const CardInfo = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: start;

  h3 {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 4px;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #555;
  }
`;

export const DetailsButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 10px 15px;
  background-color: var(--red, #ff4c4c);
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s ease-in-out;
  cursor: pointer;
  outline: none;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--dark-red);
    transform: scale(1.05);
  }

  svg {
    margin-left: 5px;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 12px;
  }
`;

export const LocationText = styled.p`
  margin-left: 8px;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
