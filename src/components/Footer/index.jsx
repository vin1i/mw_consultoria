import React, { useState } from "react";
import {
  Container,
  Section,
  SectionTitle,
  LinkList,
  SocialMedia,
  FooterBar,
  WhatsAppButtonRedondo,
  RedLine,
  QRButton,
  QRModal,
  QRCodeContainer,
  QRCodeImage,
} from "./styles";
import {
  FaFacebookSquare,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaQrcode,
} from "react-icons/fa";
import QRCode from "../../assets/QrCodeMarisaWeber.jpeg"; // Substitua pelo caminho real da imagem

const Footer = ({ id }) => {
  const [showQR, setShowQR] = useState(false);

  const toggleQR = () => {
    setShowQR((prev) => !prev);
  };

  return (
    <>
      <RedLine />
      <Container id={id}>
        <Section>
          <SectionTitle>Redes Sociais</SectionTitle>
          <SocialMedia>
            <a
              href="https://www.instagram.com/marisawebber/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/marisawebber/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookSquare />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=5511973738808"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.linkedin.com/in/marisawebber"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </SocialMedia>
        </Section>

        <Section>
          <SectionTitle>Encontre-nos</SectionTitle>
          <LinkList>
            <a href="/">QUEM SOMOS</a>
            <a href="/">SERVIÇOS</a>
            <a href="/imoveis">IMÓVEIS</a>
            <a href="/">CONTATOS</a>
          </LinkList>
        </Section>

        <Section>
          <SectionTitle>Contato</SectionTitle>
          <LinkList>
            <span className="phone-number">11 97373-8808</span>
            <a href="mailto:marisawebbersp@gmail.com">
              marisawebbersp@gmail.com
            </a>
            {/* Botão para abrir o modal */}
            <QRButton onClick={toggleQR}>
              <FaQrcode size={20} />
              Ver QR Code
            </QRButton>
          </LinkList>
        </Section>
      </Container>

      <WhatsAppButtonRedondo
        href="https://api.whatsapp.com/send?phone=5511973738808"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={30} />
      </WhatsAppButtonRedondo>

      <FooterBar>
        <span>2024 - Criado e desenvolvido por Inovação Marketing</span>
      </FooterBar>

      {/* Modal para exibir o QR Code */}
      {showQR && (
        <QRModal onClick={toggleQR}>
          <QRCodeContainer onClick={(e) => e.stopPropagation()}>
            <h3>Contato via QR Code</h3>
            <QRCodeImage src={QRCode} alt="QR Code para redes sociais" />
            <button onClick={toggleQR}>Fechar</button>
          </QRCodeContainer>
        </QRModal>
      )}
    </>
  );
};

export default Footer;
