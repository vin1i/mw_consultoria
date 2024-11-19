import React, { Fragment, useEffect, useState } from "react";
import Banner from "../../components/Banner";
import About from "../../components/About";
import Servicos from "../../components/Servicos/Servicos";
import Card from "../../components/Card";
import { Wrapper, ImoveisSection, SectionTitle, Header } from "./styles";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";

const Home = () => {
  const [imoveis, setImoveis] = useState([]);

  const fetchImoveis = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "imoveis"));
      const imoveisData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImoveis(imoveisData); // Atualiza o estado com os dados de imóveis
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error);
    }
  };

  // Busca os imóveis quando o componente é montado
  useEffect(() => {
    fetchImoveis();
  }, []);

  return (
    <Fragment>
      <section id="inicio">
        <Banner />
      </section>

      <Header>
        <h2>Encontre o imóvel dos seus sonhos!</h2>
        <ImoveisSection>
          <SectionTitle>Nossos Imóveis</SectionTitle>
          <Wrapper>
            {imoveis.map((item) => (
              <Card
                key={item.id}
                thumb={item.thumb} // Certifique-se de que 'thumb' está no Firestore
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

      <section id="contato"></section>
    </Fragment>
  );
};

export default Home;
