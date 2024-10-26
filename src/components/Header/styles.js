import styled from "styled-components";

export const Container = styled.div`
  padding: 25px 150px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid var(--red);
  background-color: var(--white);

  @media (max-width: 768px) {
    padding: 10px 20px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Logo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    max-width: 190px;
    width: 100%;
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
    margin-right: 40px;
    cursor: pointer;
    padding: 10px;
    &:hover {
      color: var(--red);
    }
  }
  span {
    font-size: 1.4rem;
    font-family: 'Myriad Pro', sans-serif;
    font-weight: 500;
    font-stretch: condensed;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-right: 15px;
    color: var(--black);
    transition: color 0.3s ease;

    &:hover {
      color: var(--red);
    }
  }
`;
