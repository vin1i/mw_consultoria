import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

export const PageButton = styled.button`
  margin: 0 5px;
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  background-color: ${({ isActive }) => (isActive ? '#555' : '#ddd')};
  color: ${({ isActive }) => (isActive ? '#fff' : '#333')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border-radius: 4px;

  &:hover {
    background-color: ${({ disabled }) => (!disabled ? '#aaa' : '#ddd')};
  }
`;