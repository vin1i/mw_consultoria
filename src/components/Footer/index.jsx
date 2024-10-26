import React from "react";
import {
  Container,
  SocialMedia,
  ContactInfo,
  PhoneInfo,
  WhatsAppButton,
  FooterBar,
  WhatsAppButtonRedondo,
} from "./styles";
import { FaFacebookSquare, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            maxWidth: "1500px",
            flexDirection: "row",
          }}
        >
          <SocialMedia>
            <span>Nossas redes sociais:</span>
            <div className="social-icons">
              <div className="social-icon">
                <a
                  href="https://www.instagram.com/marisawebber/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
              </div>
              <div className="social-icon">
                <a
                  href="https://www.facebook.com/marisawebber/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookSquare />
                </a>
              </div>
              <div className="social-icon">
                <a
                  href="https://api.whatsapp.com/send?phone=5511973738808"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </SocialMedia>
          <ContactInfo>
            <span>CONTATO</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: "10px",
              }}
            >
              <a href="/">QUEM SOMOS</a>
              <a href="/">SERVIÇOS</a>
              <a href="/">IMÓVEIS</a>
              <a href="/">CONTATOS</a>
            </div>
          </ContactInfo>
          <PhoneInfo>
            <span>11 97373-8808</span>
            <a href="mailto:marisawebbersp@gmail.com">
              marisawebbersp@gmail.com
            </a>
            <WhatsAppButton href="https://api.whatsapp.com/send?phone=5511999999999&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20MW%20Consultoria.">
              Fale conosco!
              <FaWhatsapp style={{ color: "var(--black)", fontSize: "25px" }} />
            </WhatsAppButton>
          </PhoneInfo>
        </div>
      </Container>
      <WhatsAppButtonRedondo
        href="https://api.whatsapp.com/send?phone=5511973738808"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={50} />
      </WhatsAppButtonRedondo>
      <FooterBar>
        <span>2024 - Criado e desenvolvido por Inovação Marketing</span>
      </FooterBar>
    </>
  );
};

export default Footer;
