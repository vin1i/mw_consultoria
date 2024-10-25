import React from 'react';
import LogoImg from '../../assets/MarisaWebberLogo2.png';
import { Container, Logo, Menu, MenuContainer, SocialLinks } from './styles';
import InstagramIcon from '../../assets/InstagramIco.png';
import FacebookIcon from '../../assets/FaceIco.png';
import WhatsAppIcon from '../../assets/WhatsIco.png';

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
          <img src={InstagramIcon} alt="Instagram" />
        </a>
        <a href="https://www.facebook.com/example" target="_blank" rel="noopener noreferrer">
          <img src={FacebookIcon} alt="Facebook" />
        </a>
        <a href="https://www.whatsapp.com/example" target="_blank" rel="noopener noreferrer">
          <img src={WhatsAppIcon} alt="WhatsApp" />
        </a>
      </SocialLinks>
    </Container>
  );
};

export default Header;
