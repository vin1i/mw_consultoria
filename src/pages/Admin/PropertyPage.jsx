import React, { useState, useEffect } from "react";
import PropertyList from "../Admin/components/PropertyList";
import PropertyForm from "../Admin/components/PropertyForm";
import { getImoveis, addProperty, updateImovel, deleteImovel } from '../Admin/services/propertyService';

import VideoPlayer from "../../components/VideoPlayer";

function PropertyPage() {
  const [imoveis, setImoveis] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await getImoveis();
      setImoveis(data);
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
    }
  };

  const handleAdd = async (newProperty) => {
    try {
      await addProperty(newProperty);
      fetchProperties(); // Atualizar lista
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao adicionar imóvel:', error);
    }
  };

  const handleEdit = async (updatedProperty) => {
    try {
      await updateImovel(selectedProperty.id, updatedProperty);
      fetchProperties(); // Atualizar lista
      setSelectedProperty(null);
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao editar imóvel:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteImovel(id);
      fetchProperties(); // Atualizar lista
    } catch (error) {
      console.error('Erro ao excluir imóvel:', error);
    }
  };

  return (
    <div>
      <h1>Gerenciamento de Imóveis</h1>
      <button onClick={() => setShowForm(true)}>Adicionar Imóvel</button>
      {showForm && (
        <PropertyForm
          property={selectedProperty}
          onSave={selectedProperty ? handleEdit : handleAdd}
          onCancel={() => {
            setShowForm(false);
            setSelectedProperty(null);
          }}
        />
      )}
      <PropertyList
        properties={imoveis}
        onEdit={(property) => {
          setSelectedProperty(property);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default PropertyPage;
