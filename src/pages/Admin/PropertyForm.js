import React, { useState, useEffect } from "react";
import { addProperty, updateImovel } from "../../services/propertyService";
import styled from "styled-components";

const FormContainer = styled.form`
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
`;

const FormColumn = styled.div`
  flex: 1;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: var(--red);
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--dark-red);
  }
`;

const FileInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ErrorMessage = styled.p`
  color: red;
`;

function PropertyForm({ existingProperty, onSave }) {
  const [nmTitulo, setNmTitulo] = useState(""); // nm_titulo
  const [dsDescricao, setDsDescricao] = useState(""); // ds_descricao
  const [vlPreco, setVlPreco] = useState(""); // vl_preco
  const [dsLocalizacao, setDsLocalizacao] = useState(""); // ds_localizacao
  const [tpImovel, setTpImovel] = useState("venda"); // tp_imovel
  const [nrTamanho, setNrTamanho] = useState(""); // nr_tamanho
  const [nrQuartos, setNrQuartos] = useState(""); // nr_quartos
  const [nrBanheiros, setNrBanheiros] = useState(""); // nr_banheiros
  const [nrVagasGaragem, setNrVagasGaragem] = useState(""); // nr_vagas_garagem
  const [nrSuites, setNrSuites] = useState(""); // nr_suites
  const [stDisponibilidade, setStDisponibilidade] = useState(true); // st_disponibilidade
  const [videos, setVideos] = useState([]); // videos
  const [fotos, setFotos] = useState([]); // fotos
  const [error, setError] = useState(null);

  useEffect(() => {
    if (existingProperty) {
      setNmTitulo(existingProperty.nm_titulo);
      setDsDescricao(existingProperty.ds_descricao);
      setVlPreco(existingProperty.vl_preco);
      setDsLocalizacao(existingProperty.ds_localizacao);
      setTpImovel(existingProperty.tp_imovel);
      setNrTamanho(existingProperty.nr_tamanho);
      setNrQuartos(existingProperty.nr_quartos);
      setNrBanheiros(existingProperty.nr_banheiros);
      setNrVagasGaragem(existingProperty.nr_vagas_garagem);
      setNrSuites(existingProperty.nr_suites);
      setStDisponibilidade(existingProperty.st_disponibilidade);
      setVideos(existingProperty.videos || []);
      setFotos(existingProperty.fotos || []);
    }
  }, [existingProperty]);

  const handleVideoChange = (e) => {
    const newVideo = e.target.value;

    // Expressão regular para validar URL do YouTube
    const youtubeRegex =
      /^(https?\:\/\/)?(www\.youtube\.com|youtube\.com)\/(?:[^\/\n\s]+\/\S+|\S+\/\S+|\S+)(?:[?&](?:[a-z0-9-]+=[^&]+&)*v=([a-zA-Z0-9_-]+))$/;

    // Verifica se a URL do vídeo é do YouTube
    if (newVideo && youtubeRegex.test(newVideo) && !videos.includes(newVideo)) {
      setVideos([...videos, newVideo]); // Adiciona a nova URL ao array de vídeos
    } else if (newVideo && !youtubeRegex.test(newVideo)) {
      setError("Por favor, insira uma URL válida do YouTube.");
    }
  };

  const handleFotosChange = (e) => {
    const newFotos = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    ); // Adicionando fotos com base na URL do arquivo
    setFotos([...fotos, ...newFotos]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const finalVideos = videos || [];

    const propertyData = {
      nm_titulo: nmTitulo,
      ds_descricao: dsDescricao,
      vl_preco: parseFloat(vlPreco),
      ds_localizacao: dsLocalizacao,
      tp_imovel: tpImovel,
      nr_tamanho: parseFloat(nrTamanho),
      nr_quartos: parseInt(nrQuartos),
      nr_banheiros: parseInt(nrBanheiros),
      nr_vagas_garagem: parseInt(nrVagasGaragem),
      nr_suites: parseInt(nrSuites),
      st_disponibilidade: stDisponibilidade,
      videos: finalVideos, // Garante que sempre seja um array
      fotos: fotos, // Mantemos as fotos como URLs locais (depois de serem carregadas para o storage)
      dt_criacao: new Date(), // dt_criacao será o timestamp atual
    };

    try {
      if (existingProperty) {
        await updateImovel(existingProperty.id, propertyData);
        alert("Imóvel atualizado com sucesso!");
      } else {
        await addProperty(propertyData);
        alert("Imóvel cadastrado com sucesso!");
      }
      onSave();
    } catch (error) {
      setError("Erro ao salvar o imóvel: " + error.message);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>{existingProperty ? "Editar Imóvel" : "Cadastrar Novo Imóvel"}</h2>

      <FormRow>
        <FormColumn>
          <Label>Título:</Label>
          <Input
            type="text"
            value={nmTitulo}
            onChange={(e) => setNmTitulo(e.target.value)}
            placeholder="Título do imóvel"
          />

          <Label>Localização:</Label>
          <Input
            type="text"
            value={dsLocalizacao}
            onChange={(e) => setDsLocalizacao(e.target.value)}
            required
          />

          <Label>Tamanho (m²):</Label>
          <Input
            type="number"
            value={nrTamanho}
            onChange={(e) => setNrTamanho(e.target.value)}
            required
          />

          <Label>Quartos:</Label>
          <Input
            type="number"
            value={nrQuartos}
            onChange={(e) => setNrQuartos(e.target.value)}
            required
          />

          <Label>Banheiros:</Label>
          <Input
            type="number"
            value={nrBanheiros}
            onChange={(e) => setNrBanheiros(e.target.value)}
            required
          />

          <Label>Vagas de Garagem:</Label>
          <Input
            type="number"
            value={nrVagasGaragem}
            onChange={(e) => setNrVagasGaragem(e.target.value)}
            required
          />
        </FormColumn>

        <FormColumn>
          <Label>Suítes:</Label>
          <Input
            type="number"
            value={nrSuites}
            onChange={(e) => setNrSuites(e.target.value)}
            required
          />

          <Label>Preço:</Label>
          <Input
            type="number"
            value={vlPreco}
            onChange={(e) => setVlPreco(e.target.value)}
            required
          />

          <Label>Categoria:</Label>
          <Select
            value={tpImovel}
            onChange={(e) => setTpImovel(e.target.value)}
          >
            <option value="venda">Venda</option>
            <option value="aluguel">Aluguel</option>
          </Select>

          <Label>Descrição:</Label>
          <Textarea
            value={dsDescricao}
            onChange={(e) => setDsDescricao(e.target.value)}
            rows="5"
            placeholder="Descrição do imóvel"
          />

          <Label>Disponibilidade:</Label>
          <Input
            type="checkbox"
            checked={stDisponibilidade}
            onChange={() => setStDisponibilidade(!stDisponibilidade)}
          />
        </FormColumn>
      </FormRow>

      <Label>Fotos:</Label>
      <FileInput
        type="file"
        accept="image/*"
        multiple
        onChange={handleFotosChange}
      />

      <Label>Vídeos (URLs do YouTube):</Label>
      <Input
        type="text"
        placeholder="Cole a URL do vídeo"
        onChange={handleVideoChange}
      />
      <ul>
        {existingProperty && videos.length > 0 && (
          <li>
            <strong>Vídeos cadastrados:</strong>
          </li>
        )}
        {videos.map((video, index) => (
          <li key={index}>{video}</li> // Exibe as URLs adicionadas
        ))}
      </ul>

      <Button type="submit">
        {existingProperty ? "Salvar alterações" : "Cadastrar Imóvel"}
      </Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormContainer>
  );
}

export default PropertyForm;
