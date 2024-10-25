import styled from "styled-components";

export const Container = styled.div`
  padding: 25px 150px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--red);
  background-color: var(--white);

  @media (max-width: 768px) {
    padding: 10px 20px;
    flex-direction: column; // Altera a direção se necessário
    align-items: flex-start;
  }
`;

export const Logo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    max-width: 160px; // Mudar para max-width para responsividade
    width: 100%; // Adicionando 100% para garantir que se ajuste
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }
  li {
    margin-right: 40px; // Ajuste conforme necessário
    cursor: pointer;
    padding: 10px;
    &:hover {
        color: var(--red);
    }
  }
  span {
    font-size: 1.2rem;
    font-family: 'Myriad Pro', sans-serif;
    font-weight: 500;
    font-stretch: condensed;
  }
`;

export const SocialLinks = styled.div`
    display: flex;
    align-items: center;
    a {
        margin-right: 10px;
    }
    img {
        width: 20px;
    }
`;
