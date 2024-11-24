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
        imagens: doc.data().imagens || [], // Garantindo que imagens seja um array
      }));
      setImoveis(imoveisData);
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
