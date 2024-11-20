import React, { useState, useEffect } from "react";
import { addProperty, updateImovel } from "../../services/propertyService";
import { uploadImagesToCloudinary } from "../../services/CloudinaryService";
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

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFotosChange = (e) => {
    const files = Array.from(e.target.files);
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
  
      // Upload de imagens
      const fotoUrls = await uploadImagesToCloudinary(formData.fotos);
  
      // Mapear os campos para o formato esperado
      const payload = {
        descricao: formData.dsDescricao,
        endereco: formData.dsLocalizacao,
        titulo: formData.nmTitulo,
        banheiros: parseInt(formData.nrBanheiros, 10),
        quartos: parseInt(formData.nrQuartos, 10),
        suites: parseInt(formData.nrSuites, 10),
        metrosQuadrados: parseFloat(formData.nrTamanho),
        vagas: parseInt(formData.nrVagasGaragem, 10),
        disponibilidade: formData.stDisponibilidade ? "Disponível" : "Indisponível",
        tipo: formData.tpImovel,
        condominio: parseFloat(formData.vlCondominio || 0),
        valor: parseFloat(formData.vlPreco),
        videos: formData.videos.filter((url) => url.trim() !== ""),
        imagens: fotoUrls,
      };
  
      console.log("Payload enviado para o serviço:", payload);
  
      // Chamada ao serviço
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
    } catch (error) {
      console.error("Erro ao salvar imóvel:", error);
      setError("Erro ao salvar imóvel. Tente novamente.");
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
            value={formData.nmTitulo}
            onChange={(e) => handleChange("nmTitulo", e.target.value)}
            required
          />

          <Label>Localização:</Label>
          <Input
            type="text"
            value={formData.dsLocalizacao}
            onChange={(e) => handleChange("dsLocalizacao", e.target.value)}
            required
          />

          <Label>Tamanho (m²):</Label>
          <Input
            type="number"
            value={formData.nrTamanho}
            onChange={(e) => handleChange("nrTamanho", e.target.value)}
            required
          />

          <Label>Quartos:</Label>
          <Input
            type="number"
            value={formData.nrQuartos}
            onChange={(e) => handleChange("nrQuartos", e.target.value)}
            required
          />

          <Label>Banheiros:</Label>
          <Input
            type="number"
            value={formData.nrBanheiros}
            onChange={(e) => handleChange("nrBanheiros", e.target.value)}
            required
          />

          <Label>Vagas de Garagem:</Label>
          <Input
            type="number"
            value={formData.nrVagasGaragem}
            onChange={(e) => handleChange("nrVagasGaragem", e.target.value)}
            required
          />
        </FormColumn>

        <FormColumn>
          <Label>Suítes:</Label>
          <Input
            type="number"
            value={formData.nrSuites}
            onChange={(e) => handleChange("nrSuites", e.target.value)}
            required
          />

          <Label>Preço:</Label>
          <Input
            type="number"
            value={formData.vlPreco}
            onChange={(e) => handleChange("vlPreco", e.target.value)}
            required
          />

          <Label>Condomínio:</Label>
          <Input
            type="number"
            value={formData.vlCondominio}
            onChange={(e) => handleChange("vlCondominio", e.target.value)}
            placeholder="Preço do condomínio"
          />

          <Label>Categoria:</Label>
          <Select
            value={formData.tpImovel}
            onChange={(e) => handleChange("tpImovel", e.target.value)}
            required
          >
            <option value="venda">Venda</option>
            <option value="aluguel">Aluguel</option>
          </Select>

          <Label>Descrição:</Label>
          <Textarea
            value={formData.dsDescricao}
            onChange={(e) => handleChange("dsDescricao", e.target.value)}
            rows="5"
            placeholder="Descrição do imóvel"
            required
          />

          <Label>Disponibilidade:</Label>
          <Input
            type="checkbox"
            checked={formData.stDisponibilidade}
            onChange={(e) => handleChange("stDisponibilidade", e.target.value)}
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
      

      <Label>URLs de Vídeos</Label>
      {formData.videos.map((url, index) => (
        <Input
          key={index}
          type="text"
          value={url}
          placeholder="Insira a URL do vídeo do YouTube"
          onChange={(event) => handleVideoUrlChange(index, event)}
        />
      ))}
      <Button type="button" onClick={handleAddVideoUrl}>
        Adicionar outra URL
      </Button>

      <Button type="submit">
        {existingProperty ? "Salvar alterações" : "Cadastrar Imóvel"}
      </Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormContainer>
  );
}

export default PropertyForm;
