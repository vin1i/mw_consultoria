import styled from "styled-components";

export const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 0 auto;
`;

export const Imagem = styled.img`
  width: 100%;
  border-radius: 10px;
`;

export const Titulo = styled.h2`
  font-size: 1.8em;
  color: #333;
`;

export const Endereco = styled.p`
  font-size: 1em;
  color: #666;
  margin: 5px 0;
`;

export const Info = styled.div`
  display: flex;
  gap: 15px;
  font-size: 1em;
  color: #666;
  margin: 15px 0;
`;

export const Valor = styled.h3`
  font-size: 1.6em;
  color: #b12704;
`;

export const Descricao = styled.p`
  font-size: 1em;
  color: #333;
  line-height: 1.5;
`;

export const BotaoContato = styled.button`
  background-color: #b12704;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
`;
