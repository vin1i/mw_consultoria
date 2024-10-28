import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  margin-top: 2rem;
`;

export const Sidebar = styled.div`
  width: 20%;
  padding: 1rem;
  background-color: #f7f7f7;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const ListingsSection = styled.div`
  width: 75%;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;
