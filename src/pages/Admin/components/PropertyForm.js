import React, { useState, useEffect } from "react";
import { uploadImagesToCloudinary } from "../../../services/CloudinaryService";
import Carousel from "../../../components/Carousel";
import styled from "styled-components";

const FormContainer = styled.form`
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
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
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const FileInput = styled.input`
  width: 100%;
  padding: 10px;
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

const AddVideoButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const PropertyForm = ({ existingProperty, onSave }) => {
  const [formData, setFormData] = useState({
    tipo: "venda",
    endereco: "",
    valorVenda: "",
    valorLocacao: "",
    vlCondominio: "",
    vlIptu: "",
    quartos: "",
    banheiros: "",
    vagas: "",
    suites: "",
    metrosQuadrados: "",
    descricao: "",
    disponibilidade: "Disponível",
    titulo: "",
    imagens: [],
    videos: [""],
    dt_criacao: "",
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (existingProperty) {
      setFormData((prev) => ({
        ...prev,
        ...existingProperty,
        videos: existingProperty.videos || [""],
        vlCondominio: existingProperty.vlCondominio
          ? existingProperty.vlCondominio.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : "",
        vlIptu: existingProperty.vlIptu
          ? existingProperty.vlIptu.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : "",
        valorVenda: existingProperty.valorVenda
          ? existingProperty.valorVenda.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : "",
        valorLocacao: existingProperty.valorLocacao
          ? existingProperty.valorLocacao.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : "",
      }));
      setPreviewImages(existingProperty.imagens || []);
    }
  }, [existingProperty]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...imageUrls]);
    handleChange("imagens", files);
  };

  const handleVideoChange = (index, value) => {
    const updatedVideos = [...formData.videos];
    updatedVideos[index] = value;
    handleChange("videos", updatedVideos);
  };

  const handleAddVideo = () => {
    handleChange("videos", [...formData.videos, ""]);
  };

  const handleRemoveVideo = (index) => {
    const updatedVideos = formData.videos.filter((_, i) => i !== index);
    handleChange("videos", updatedVideos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fotos = await uploadImagesToCloudinary(formData.imagens);
      const payload = {
        ...formData,
        imagens: fotos,
        valorVenda: parseFloat(formData.valorVenda.replace(",", ".")) || 0,
        valorLocacao: parseFloat(formData.valorLocacao.replace(",", ".")) || 0,
        vlCondominio: parseFloat(formData.vlCondominio.replace(",", ".")) || 0,
        vlIptu: parseFloat(formData.vlIptu.replace(",", ".")) || 0,
      };
  
      await onSave(payload);
      alert("Imóvel salvo com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar imóvel:", err);
      setError("Erro ao salvar o imóvel. Tente novamente.");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>{existingProperty ? "Editar Imóvel" : "Cadastrar Novo Imóvel"}</h2>

      {/* Tipo do imóvel */}
      <InputGroup>
        <Label>Tipo</Label>
        <Select
          value={formData.tipo}
          onChange={(e) => handleChange("tipo", e.target.value)}
        >
          <option value="venda">Venda</option>
          <option value="locacao">Locação</option>
          <option value="vendaLocacao">Venda e Locação</option>
        </Select>
      </InputGroup>

      {/* Endereço */}
      <InputGroup>
        <Label>Endereço</Label>
        <Input
          type="text"
          value={formData.endereco}
          onChange={(e) => handleChange("endereco", e.target.value)}
          required
          placeholder="Digite o endereço completo"
        />
      </InputGroup>

      {/* Valores financeiros */}
      <InputGroup>
        <Label>Valor de Venda</Label>
        <Input
          type="text"
          value={formData.valorVenda}
          onChange={(e) => handleChange("valorVenda", e.target.value)}
          placeholder="Preço para venda do imóvel"
        />
      </InputGroup>

      <InputGroup>
        <Label>Valor de Locação</Label>
        <Input
          type="text"
          value={formData.valorLocacao}
          onChange={(e) => handleChange("valorLocacao", e.target.value)}
          placeholder="Preço para locação do imóvel"
        />
      </InputGroup>

      <InputGroup>
        <Label>Valor do Condomínio</Label>
        <Input
          type="text"
          value={formData.vlCondominio}
          onChange={(e) => handleChange("vlCondominio", e.target.value)}
          placeholder="Preço do condomínio do imóvel"
        />
      </InputGroup>

      <InputGroup>
        <Label>Valor do IPTU</Label>
        <Input
          type="text"
          value={formData.vlIptu}
          onChange={(e) => handleChange("vlIptu", e.target.value)}
          placeholder="Valor do IPTU do imóvel"
        />
      </InputGroup>

      {/* Informações do imóvel */}
      <InputGroup>
        <Label>Quartos</Label>
        <Input
          type="number"
          value={formData.quartos}
          onChange={(e) => handleChange("quartos", e.target.value)}
          placeholder="Quantidade de quartos"
        />
      </InputGroup>

      <InputGroup>
        <Label>Banheiros</Label>
        <Input
          type="number"
          value={formData.banheiros}
          onChange={(e) => handleChange("banheiros", e.target.value)}
          placeholder="Quantidade de banheiros"
        />
      </InputGroup>

      <InputGroup>
        <Label>Vagas de Garagem</Label>
        <Input
          type="number"
          value={formData.vagas}
          onChange={(e) => handleChange("vagas", e.target.value)}
          placeholder="Quantidade de vagas de garagem"
        />
      </InputGroup>

      <InputGroup>
        <Label>Suítes</Label>
        <Input
          type="number"
          value={formData.suites}
          onChange={(e) => handleChange("suites", e.target.value)}
          placeholder="Quantidade de suítes"
        />
      </InputGroup>

      <InputGroup>
        <Label>Metragem (m²)</Label>
        <Input
          type="number"
          value={formData.metrosQuadrados}
          onChange={(e) => handleChange("metrosQuadrados", e.target.value)}
          placeholder="Tamanho do imóvel em metros quadrados"
        />
      </InputGroup>

      {/* Outros campos */}
      <InputGroup>
        <Label>Título</Label>
        <Input
          type="text"
          value={formData.titulo}
          onChange={(e) => handleChange("titulo", e.target.value)}
          placeholder="Digite o título do imóvel"
        />
      </InputGroup>

      <InputGroup>
        <Label>Descrição</Label>
        <Textarea
          value={formData.descricao}
          onChange={(e) => handleChange("descricao", e.target.value)}
          placeholder="Descreva o imóvel"
        />
      </InputGroup>

      {/* Mídias */}
      <InputGroup>
        <Label>Imagens</Label>
        <FileInput
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        {previewImages.length > 0 && (
          <Carousel
            images={previewImages.map((src) => ({
              src,
              alt: "Imagem do Imóvel",
            }))}
          />
        )}
      </InputGroup>

      <InputGroup>
        <Label>URLs de Vídeos do YouTube</Label>
        {Array.isArray(formData.videos) &&
          formData.videos.map((video, index) => (
            <div
              key={index}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <Input
                type="text"
                value={video}
                onChange={(e) => handleVideoChange(index, e.target.value)}
                placeholder="URL do vídeo do YouTube"
              />
              <Button type="button" onClick={() => handleRemoveVideo(index)}>
                Remover
              </Button>
            </div>
          ))}
        <AddVideoButton type="button" onClick={handleAddVideo}>
          Adicionar outro vídeo
        </AddVideoButton>
      </InputGroup>

      <Button type="submit">
        {existingProperty ? "Salvar Alterações" : "Cadastrar Imóvel"}
      </Button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </FormContainer>
  );
};

export default PropertyForm;
