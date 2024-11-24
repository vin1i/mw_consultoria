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
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
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

  const parseCurrency = (value) => {
    if (!value) return 0;
    return parseFloat(
      value.replace("R$ ", "").replace(".", "").replace(",", ".")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    } catch (err) {
      console.error("Erro ao salvar imóvel:", err);
      setError("Erro ao salvar o imóvel. Tente novamente.");
      toast.error("Erro ao salvar o imóvel. Tente novamente.", {
        autoClose: 15000,
      });
    }
  };

  return (
    <>
      <ToastContainer autoClose={10000} position="top-center" />
      <FormContainer onSubmit={handleSubmit}>
        <h2>{existingProperty ? "Editar Imóvel" : "Cadastrar Novo Imóvel"}</h2>
        <FormGrid>
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
            <NumericFormat
              value={formData.valorVenda}
              onValueChange={(values) =>
                handleChange("valorVenda", values.formattedValue)
              }
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              placeholder="Preço para venda do imóvel"
              customInput={Input} // Para estilizar com styled-components
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
          <Button type="submit">
            {existingProperty ? "Salvar Alterações" : "Cadastrar Imóvel"}
          </Button>
          <CancelButton type="button" onClick={oncancel}>
            Cancelar
          </CancelButton>
        </ButtonGroup>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </FormContainer>
    </>
  );
};

export default PropertyForm;
