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
    position: relative;
  }
`;

export const Logo = styled.div`
  img {
    max-width: 190px;
    width: 100%;
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--black);
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: var(--white);
    border-top: 3px solid var(--red);
    padding: 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const Menu = styled.div`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
  }
  li {
    margin-right: 40px;
    cursor: pointer;
    padding: 10px;

    @media (max-width: 768px) {
      margin-right: 0;
      margin-bottom: 20px;
      text-align: center;
      width: 100%;
    }

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

    @media (max-width: 768px) {
      margin-right: 10px;
    }
  }
`;
