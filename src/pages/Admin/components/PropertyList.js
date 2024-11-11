import React, { useEffect, useState } from 'react';
import { getProperties, deleteProperty } from '../../../services/propertyService';

function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetchProperties() {
      const data = await getProperties();
      setProperties(data);
    }
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    await deleteProperty(id);
    setProperties(properties.filter(property => property.id !== id));
  };

  return (
    <div>
      {properties.map((property) => (
        <div key={property.id}>
          <h3>{property.title}</h3>
          <button onClick={() => handleDelete(property.id)}>Deletar</button>
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
