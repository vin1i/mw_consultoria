import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column; /* Força uma coluna */
  margin-top: 2rem;
  gap: 2rem; /* Espaçamento entre barra lateral, listagem e paginação */

  @media (min-width: 768px) {
    flex-direction: row; /* Alinha a barra lateral em linha */
    align-items: flex-start; /* Alinha os itens no topo */
  }
`;

export const Sidebar = styled.div`
  width: 100%;
  margin-left: 2rem;
  padding: 1rem;
  background-color: #f7f7f7;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @media (min-width: 768px) {
    width: 20%;
  }
`;

export const ListingsSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    width: 75%;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center; /* Centraliza o pagination */
  align-items: center;
  padding: 1rem 0;
  width: 100%;
  margin-top: 2rem;
  background-color: #fff; /* Cor de fundo opcional */
  border-top: 1px solid #ddd; /* Linha de separação opcional */
`;
