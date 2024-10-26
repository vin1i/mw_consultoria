import React from 'react';
import LogoImg from '../../assets/MarisaWebberLogo.png';
import { Container, Logo, Menu, MenuContainer, SocialLinks } from './styles';
import { FaFacebookSquare, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Header = () => {
  const handleClick = () => {
    console.log('Menu clicado!');
  };

  return (
    <Container>
      <Logo>
        <img src={LogoImg} alt="Logo" />
      </Logo>
      <MenuContainer>
        <Menu>
          <ul>
            <li onClick={handleClick}>
              <span>INÍCIO</span>
            </li>
            <li onClick={handleClick}>
              <span>SOBRE NÓS</span>
            </li>
            <li onClick={handleClick}>
              <span>SERVIÇOS</span>
            </li>
            <li onClick={handleClick}>
              <span>IMÓVEIS</span>
            </li>
            <li onClick={handleClick}>
              <span>CONTATO</span>
            </li>
          </ul>
        </Menu>
      </MenuContainer>
      <SocialLinks>
        <a href="https://www.instagram.com/example" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={25} />
        </a>
        <a href="https://www.facebook.com/example" target="_blank" rel="noopener noreferrer">
          <FaFacebookSquare size={25} />
        </a>
        <a href="https://api.whatsapp.com/send?phone=5511973738808" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp size={25} />
        </a>
      </SocialLinks>
    </Container>
  );
};

export default Header;
