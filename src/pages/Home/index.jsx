import React, { Fragment } from "react";
import Banner from "../../components/Banner";
import About from "../../components/About";
import Servicos from "../../components/Servicos/Servicos";
import Card from "../../components/Card";
import { Wrapper, Header, ImoveisSection } from "./styles";

// Dados fictícios para a listagem de imóveis
const fakeData = [
  {
    id: 1,
    thumb: "https://via.placeholder.com/150",
    tipo: "Apartamento",
    endereco: "Rua A, 123 - Bairro",
    valor: "R$ 500.000",
    slug: "apartamento-rua-a"
  },
  {
    id: 2,
    thumb: "https://via.placeholder.com/150",
    tipo: "Casa",
    endereco: "Rua B, 456 - Bairro",
    valor: "R$ 750.000",
    slug: "casa-rua-b"
  },
  {
    id: 3,
    thumb: "https://via.placeholder.com/150",
    tipo: "Cobertura",
    endereco: "Avenida C, 789 - Bairro",
    valor: "R$ 1.200.000",
    slug: "cobertura-avenida-c"
  },
  {
    id: 4,
    thumb: "https://via.placeholder.com/150",
    tipo: "Casa",
    endereco: "Rua D, 987 - Bairro",
    valor: "R$ 900.000",
    slug: "casa-rua-d"
  }
];

const Home = () => {
  let Cards = [];
  const totalCardsToShow = 4; // Defina quantos cards você quer mostrar
  
  for (let i = 0; i < totalCardsToShow; i++) {
    Cards.push(
      <Card
        key={fakeData[i].id} // Use o ID do item como chave
        thumb={fakeData[i].thumb}
        tipo={fakeData[i].tipo}
        endereco={fakeData[i].endereco}
        valor={fakeData[i].valor}
        slug={fakeData[i].slug}
      />
    );
  }
  return (
    <Fragment>
      <Banner />
      <Header>
        <h2>Encontre o imóvel dos seus sonhos!</h2>
      <ImoveisSection>
        <h2>Nossos Imóveis</h2>
        <Wrapper>
          {fakeData.map((item) => (
            <Card
              key={item.id}
              thumb={item.thumb}
              tipo={item.tipo}
              endereco={item.endereco}
              valor={item.valor}
              slug={item.slug}
            />
          ))}
        </Wrapper>
      </ImoveisSection>
      </Header>
      
      <section id="sobre-nos">
        <About />
      </section>
      
      <section id="servicos">
        <Servicos />
      </section>
      
    </Fragment>
  );
};

export default Home;
