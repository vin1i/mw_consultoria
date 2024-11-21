import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Description,
  Thumb,
  Price,
  Details,
  Location,
  Card,
} from "./styles";

const Imobi = ({ imovel }) => {
  if (!imovel) {
    return <p>Carregando informações do imóvel...</p>;
  }

  const {
    titulo,
    localizacao,
    preco,
    metrosQuadrados,
    quartos,
    banheiros,
    suites,
    vagas,
    descricao,
    imagens,
  } = imovel;

  const imageUrl =
    imagens && imagens.length > 0
      ? imagens[0]
      : "https://via.placeholder.com/600x400?text=Sem+Imagem";

  return (
    <Container>
      <Card>
        <Thumb>
          <img src={imageUrl} alt={titulo || "Imagem do imóvel"} />
        </Thumb>
        <Description>
          <Location>{localizacao || "Localização não disponível"}</Location>
          <Price>
            {preco
              ? preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : "Preço não disponível"}
          </Price>
          <Details>
            <div>{metrosQuadrados ? `${metrosQuadrados} m²` : "N/A"}</div>
            <div>{quartos ? `${quartos} quartos` : "N/A"}</div>
            <div>{banheiros ? `${banheiros} banheiros` : "N/A"}</div>
            <div>{suites ? `${suites} suíte(s)` : "N/A"}</div>
            <div>{vagas ? `${vagas} vaga(s)` : "N/A"}</div>
          </Details>
          {descricao ? (
            descricao.split("\n").map((paragrafo, index) => (
              <p key={index}>{paragrafo}</p>
            ))
          ) : (
            <p>Descrição não disponível.</p>
          )}
        </Description>
      </Card>
    </Container>
  );
};

Imobi.propTypes = {
  imovel: PropTypes.shape({
    titulo: PropTypes.string,
    localizacao: PropTypes.string,
    preco: PropTypes.number,
    metrosQuadrados: PropTypes.number,
    quartos: PropTypes.number,
    banheiros: PropTypes.number,
    suites: PropTypes.number,
    vagas: PropTypes.number,
    descricao: PropTypes.string,
    imagens: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default Imobi;
