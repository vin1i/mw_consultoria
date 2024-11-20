import React, { useEffect, useState } from 'react';
import { getProperties, deleteProperty } from '../../../services/propertyService';

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (error) {
        console.error("Erro ao carregar propriedades:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteProperty(id);
      if (response.status === 200) { // Ou qualquer outro código de sucesso esperado
        setProperties(properties.filter((property) => property.id !== id));
        alert("Propriedade deletada com sucesso.");
      } else {
        alert("Erro ao tentar deletar a propriedade.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar a propriedade.");
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Carregando propriedades...</p>
      ) : (
        properties.map((property) => (
          <div key={property.id}>
            <h3>{property.nm_titulo}</h3>
            <button onClick={() => handleDelete(property.id)}>Deletar</button>
          </div>
        ))
      )}
    </div>
  );
}

export default PropertyList;
