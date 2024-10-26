import React from "react";
import { Container, TextContainer, Text, Overlay, Logo } from "./DiferencialStyles";
import imagem from "../../assets/Faixa.png";
import logo from "../../assets/MarisaWebberLogo2.png";

const Diferencial = () => {
  return (
    <Container background={imagem}>
      <TextContainer>
        <Text>
          <p>
            Nosso diferencial está no atendimento único e dedicado. Cada cliente
            tem uma história, e nós temos o compromisso de conhecê-la.
            Entendemos suas necessidades, expectativas e, mais importante, seu
            sonho. Seja compra, venda ou investimento, nós oferecemos uma
            consultoria completa para garantir que cada decisão seja a melhor
            para você.
          </p>
          <p>
            Na MW Consultoria, seu sucesso é a nossa prioridade. Estamos aqui
            para oferecer suporte e transformar o mercado imobiliário em uma
            experiência tranquila e segura. Confie em nós para fazer do seu
            sonho, uma realidade.
          </p>
          <Logo src={logo} alt="Logo da MW Consultoria" />
        </Text>
      </TextContainer>
    </Container>
  );
};

export default Diferencial;
