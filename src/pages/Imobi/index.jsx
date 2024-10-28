import React from "react";
import {
  Container,
  Description,
  Thumb,
  Price,
  Details,
  Location,
  Card,
} from "./styles";

const Imobi = () => {
  return (
    <Container>
      <Card>
        <Thumb>
          <img
            src={require("../../assets/Foto1.png")}
            alt="Edif cio Sunny Garden"
          />
        </Thumb>
        <Description>
          <Location>Cidade Monções</Location>
          <Price>R$ 1.990.000</Price>
          <Details>
            <div>114 m²</div>
            <div>2 quartos</div>
            <div>2 banheiros</div>
            <div>1 suíte</div>
            <div>1 vaga</div>
          </Details>
          <p>
            Descubra o conforto e a elegância desta cobertura de 114 m² no
            coração do Brooklin. Com uma sala ampla equipada com lareira e
            varanda, este espaço é perfeito para momentos de descontração e
            convívio. A sala de jantar oferece um ambiente ideal para refeições
            em família.
          </p>
          <p>
            A cozinha, bem planejada, e a área de serviço proporcionam
            praticidade no dia a dia. A cobertura dispõe de dois dormitórios,
            sendo uma suíte espaçosa, além de um banheiro social. Inclui uma
            vaga de garagem.
          </p>
          <p>
            O condomínio oferece uma série de comodidades para toda a família,
            incluindo playground para as crianças, salão de festas para
            celebrações especiais e salão de jogos para entretenimento.
          </p>
          <p>
            Localizado em uma região privilegiada, o imóvel está próximo a
            importantes vias de acesso como a Av. Jornalista Roberto Marinho e a
            Av. Santo Amaro, além de uma ampla variedade de comércios, padarias,
            supermercados, bancos, igreja e colégios. Aproveite a conveniência
            de viver em um bairro que oferece tudo o que você precisa ao seu
            alcance. Não perca esta oportunidade única!
          </p>
        </Description>
      </Card>
    </Container>
  );
};

export default Imobi;
