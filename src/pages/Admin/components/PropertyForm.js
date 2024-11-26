import React, { useState, useEffect } from "react";
import { uploadImagesToCloudinary } from "../../../services/CloudinaryService";
import { toast, ToastContainer } from "react-toastify";
import Carousel from "../../../components/Carousel";
import { NumericFormat } from "react-number-format";
import styled from "styled-components";

const FormContainer = styled.form`
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
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
  grid-column: span 2;
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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Button = styled.button`
  flex: 1;
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

const CancelButton = styled(Button)`
  background-color: var(--red);

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

const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const PreviewImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ddd;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
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
      const formattedProperty = {
        ...existingProperty,
        valorVenda: existingProperty.valorVenda
          ? `R$ ${Number(existingProperty.valorVenda).toLocaleString("pt-BR")}`
          : "",
        valorLocacao: existingProperty.valorLocacao
          ? `R$ ${Number(existingProperty.valorLocacao).toLocaleString(
              "pt-BR"
            )}`
          : "",
        vlCondominio: existingProperty.vlCondominio
          ? `R$ ${Number(existingProperty.vlCondominio).toLocaleString(
              "pt-BR"
            )}`
          : "",
        vlIptu: existingProperty.vlIptu
          ? `R$ ${Number(existingProperty.vlIptu).toLocaleString("pt-BR")}`
          : "",
        imagens: existingProperty.imagens || [],
        videos: existingProperty.videos || [""],
      };
      setFormData(formattedProperty);
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
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newImageUrls]);
    handleChange("imagens", [...(formData.imagens || []), ...files]);
  };

  useEffect(() => {
    if (existingProperty) {
      const formattedImages = existingProperty.imagens.map((img) =>
        img.startsWith("http")
          ? img
          : `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${img}`
      );

      setFormData((prev) => ({
        ...prev,
        ...existingProperty,
        imagens: formattedImages,
      }));
      setPreviewImages(formattedImages);
    }
  }, [existingProperty]);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
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

  const parseCurrency = (value) => {
    if (!value) return 0;
    return parseFloat(
      value.replace("R$ ", "").replace(".", "").replace(",", ".")
    );
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const fotos = await uploadImagesToCloudinary(formData.imagens);
      const payload = {
        ...formData,
        imagens: fotos,
        valorVenda: parseCurrency(formData.valorVenda),
        valorLocacao: parseCurrency(formData.valorLocacao),
        vlCondominio: parseCurrency(formData.vlCondominio),
        vlIptu: parseCurrency(formData.vlIptu),
      };
      await onSave(payload);
      toast.success("Imóvel salvo com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar imóvel:", err);
      setError(
        "Erro ao salvar as imagens. Verifique sua conexão ou tente novamente."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
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
    toast.info("Edição cancelada.");
  };

  return (
    <>
      <ToastContainer autoClose={10000} position="top-center" />
      <FormContainer onSubmit={handleSubmit}>
        <h2>{existingProperty ? "Editar Imóvel" : "Cadastrar Novo Imóvel"}</h2>
        <FormGrid>
          <InputGroup>
            <Label>Imagens</Label>
            <FileInput
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            {previewImages.length > 0 && (
              <PreviewContainer>
                {previewImages.map((src, index) => (
                  <PreviewImage
                    key={index}
                    src={src}
                    alt={`Preview ${index + 1}`}
                  />
                ))}
              </PreviewContainer>
            )}
          </InputGroup>

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

          <InputGroup>
            <Label>Valor de Venda</Label>
            <NumericFormat
              value={formData.valorVenda}
              onValueChange={(values) =>
                handleChange("valorVenda", values.formattedValue)
              }
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              placeholder="Preço para venda do imóvel"
              customInput={Input}
            />
          </InputGroup>

          <InputGroup>
            <Label>Valor de Locação</Label>
            <NumericFormat
              value={formData.valorLocacao}
              onValueChange={(values) =>
                handleChange("valorLocacao", values.formattedValue)
              }
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              placeholder="Preço para locação do imóvel"
              customInput={Input}
            />
          </InputGroup>

          <InputGroup>
            <Label>Valor do Condomínio</Label>
            <NumericFormat
              value={formData.vlCondominio}
              onValueChange={(values) =>
                handleChange("vlCondominio", values.formattedValue)
              }
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              placeholder="Preço do condomínio do imóvel"
              customInput={Input}
            />
          </InputGroup>

          <InputGroup>
            <Label>Valor do IPTU</Label>
            <NumericFormat
              value={formData.vlIptu}
              onValueChange={(values) =>
                handleChange("vlIptu", values.formattedValue)
              }
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              placeholder="Preço do IPTU do imóvel"
              customInput={Input}
            />
          </InputGroup>

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
                  {!isValidUrl(video) && video.length > 0 && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      URL inválida
                    </p>
                  )}
                  <Button
                    type="button"
                    onClick={() => handleRemoveVideo(index)}
                  >
                    Remover
                  </Button>
                </div>
              ))}
            <AddVideoButton type="button" onClick={handleAddVideo}>
              Adicionar outro vídeo
            </AddVideoButton>
          </InputGroup>
        </FormGrid>

        <ButtonGroup>
          <Button type="submit" disabled={isSaving}>
            {isSaving
              ? "Salvando..."
              : existingProperty
              ? "Salvar Alterações"
              : "Cadastrar Imóvel"}
          </Button>
          <CancelButton type="button" onClick={handleCancel}>
            Cancelar
          </CancelButton>
        </ButtonGroup>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </FormContainer>
    </>
  );
};

export default PropertyForm;
