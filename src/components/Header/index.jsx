import React from 'react';
import LogoImg from '../../assets/MarisaWebberLogo.png';
import { Container, Logo, Menu, MenuContainer, SocialLinks } from './styles';
import { FaFacebookSquare, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container>
      <Logo>
        <Link to='/'><img src={LogoImg} alt="Logo" /></Link>
      </Logo>
      <MenuContainer>
        <Menu>
          <ul>
            <li onClick={() => scrollToSection('inicio')}>
              <span>INÍCIO</span>
            </li>
            <li onClick={() => scrollToSection('sobre-nos')}>
              <span>SOBRE NÓS</span>
            </li>
            <li onClick={() => scrollToSection('servicos')}>
              <span>SERVIÇOS</span>
            </li>
            <li onClick={() => navigate('/imoveis')}>
              <span>IMÓVEIS</span>
            </li>
            <li onClick={() => scrollToSection('contato')}>
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
