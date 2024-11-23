import React, { useState, useEffect } from "react";
import { addProperty, updateImovel } from "../services/propertyService";
import { uploadImagesToCloudinary } from "../../../services/CloudinaryService";
import Carousel from "../../../components/Carousel";
import VideoPlayer from "../../../components/VideoPlayer";
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

const Section = styled.div`
  margin-bottom: 20px;

  h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 10px;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const MediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PropertyForm = ({ existingProperty }) => {
  const [formData, setFormData] = useState({
    nmTitulo: "",
    dsDescricao: "",
    vlPreco: "",
    dsLocalizacao: "",
    tpImovel: "venda",
    nrTamanho: "",
    nrQuartos: "",
    nrBanheiros: "",
    nrVagasGaragem: "",
    nrSuites: "",
    stDisponibilidade: true,
    vlCondominio: "",
    videos: [""],
    fotos: [],
  });
  const [error, setError] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [newVideos, setNewVideos] = useState([]);

  useEffect(() => {
    if (existingProperty) {
      setFormData(existingProperty);
      setPreviewImages(existingProperty.fotos || []);
      setNewVideos(existingProperty.videos || []);
    }
  }, [existingProperty]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFotosChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...imageUrls]);
    handleChange("fotos", files);
  };

  const handleVideoUrlChange = (index, event) => {
    const updatedVideos = [...formData.videos];
    updatedVideos[index] = event.target.value;
    handleChange("videos", updatedVideos);
  };

  const handleAddVideoUrl = () => {
    handleChange("videos", [...formData.videos, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Enviando dados do formulário:", formData);
      const fotoUrls = await uploadImagesToCloudinary(formData.fotos);
      const payload = {
        ...formData,
        fotos: fotoUrls,
        videos: formData.videos.filter((url) => url.trim() !== ""),
      };

      if (existingProperty) {
        await updateImovel(existingProperty.id, payload);
      } else {
        await addProperty(payload);
      }

      alert("Imóvel salvo com sucesso!");
      setFormData({
        nmTitulo: "",
        dsDescricao: "",
        vlPreco: "",
        dsLocalizacao: "",
        tpImovel: "venda",
        nrTamanho: "",
        nrQuartos: "",
        nrBanheiros: "",
        nrVagasGaragem: "",
        nrSuites: "",
        stDisponibilidade: true,
        vlCondominio: "",
        videos: [""],
        fotos: [],
      });
      setPreviewImages([]);
      setNewVideos([]);
    } catch (error) {
      console.error("Erro ao salvar imóvel:", error);
      setError("Erro ao salvar imóvel. Tente novamente.");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>{existingProperty ? "Editar Imóvel" : "Cadastrar Novo Imóvel"}</h2>

      <Section>
        <h3>Dados do Imóvel</h3>
        <InputGroup>
          <Label>Título</Label>
          <Input
            type="text"
            value={formData.nmTitulo}
            onChange={(e) => handleChange("nmTitulo", e.target.value)}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>Descrição</Label>
          <Textarea
            value={formData.dsDescricao}
            onChange={(e) => handleChange("dsDescricao", e.target.value)}
            rows="5"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>Preço</Label>
          <Input
            type="number"
            value={formData.vlPreco}
            onChange={(e) => handleChange("vlPreco", e.target.value)}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>Localização</Label>
          <Input
            type="text"
            value={formData.dsLocalizacao}
            onChange={(e) => handleChange("dsLocalizacao", e.target.value)}
            required
          />
        </InputGroup>
      </Section>

      <Section>
        <h3>Mídias</h3>
        <MediaContainer>
          <Carousel images={previewImages.map((src) => ({ src, alt: "Imagem" }))} />
          <FileInput type="file" multiple accept="image/*" onChange={handleFotosChange} />
        </MediaContainer>

        {newVideos.map((video, index) => (
          <VideoPlayer key={index} videoUrl={video} />
        ))}
        <InputGroup>
          <Label>Adicionar Vídeo</Label>
          {formData.videos.map((url, index) => (
            <Input
              key={index}
              type="text"
              value={url}
              placeholder="URL do vídeo"
              onChange={(event) => handleVideoUrlChange(index, event)}
            />
          ))}
          <Button type="button" onClick={handleAddVideoUrl}>
            Adicionar outro vídeo
          </Button>
        </InputGroup>
      </Section>

      <Button type="submit">{existingProperty ? "Salvar Alterações" : "Cadastrar"}</Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormContainer>
  );
};

export default PropertyForm;
