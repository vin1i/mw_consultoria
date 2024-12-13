import styled from "styled-components";

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 300px;

  @media (max-width: 768px) {
  
    max-width: 100%;
    padding: 0.5rem;
    gap: 0.8rem;
  }
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.3rem;
  }
`;

export const Label = styled.label`
  font-weight: bold;
  color: #333;
  font-size: 1rem;
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: var(--red);
  }

  &:focus {
    outline: none;
    border-color: var(--red);
    box-shadow: 0 0 0 2px rgba(156, 25, 43, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
