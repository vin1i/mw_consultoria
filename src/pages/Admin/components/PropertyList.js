import React, { useEffect, useState } from 'react';
import { getImoveis, deleteImovel } from '../services/propertyService';

const cloudinaryCloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

function PropertyList({ onEdit, onDelete }) {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const data = await getImoveis();
        setProperties(data);
      } catch (error) {
        console.error("Erro ao carregar propriedades:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const confirmDelete = (id) => {
    if (window.confirm("Tem certeza de que deseja excluir este imóvel?")) {
      onDelete(id);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Carregando propriedades...</p>
      ) : properties.length > 0 ? (
        properties.map((property) => (
          <div
            key={property.id}
            style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}
          >
            <h3>{property.titulo}</h3>
            <p><strong>Endereço:</strong> {property.endereco}</p>
            <p><strong>Valor:</strong> R$ {property.valor.toLocaleString()}</p>
            <p><strong>Quartos:</strong> {property.quartos}</p>
            <p><strong>Banheiros:</strong> {property.banheiros}</p>
            <p><strong>Suítes:</strong> {property.suites}</p>
            <p><strong>Vagas na garagem:</strong> {property.vagas}</p>
            <p><strong>Condomínio:</strong> R$ {property.condominio.toLocaleString()}</p>
            <p><strong>Disponibilidade:</strong> {property.disponibilidade}</p>
            <p><strong>Metragem:</strong> {property.metrosQuadrados} m²</p>
            <p><strong>Tipo:</strong> {property.tipo}</p>
            <p><strong>Descrição:</strong> {property.descricao}</p>
            <p><strong>Data de criação:</strong> {new Date(property.dt_criacao).toLocaleString()}</p>

            <div>
              <strong>Imagens:</strong>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {property.imagens?.map((img, index) => (
                  <img
                    key={index}
                    src={`https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/${img}`}
                    alt={`Imagem ${index + 1}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                ))}
              </div>
            </div>

            <div>
              <strong>Vídeos:</strong>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {property.videos?.map((video, index) => (
                  <iframe
                    key={index}
                    width="200"
                    height="150"
                    src={`https://www.youtube.com/embed/${video}`}
                    title={`Vídeo ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ))}
              </div>
            </div>

            <button onClick={() => onEdit(property)}>Editar</button>
            <button onClick={() => confirmDelete(property.id)}>Deletar</button>
          </div>
        ))
      ) : (
        <p>Nenhuma propriedade encontrada.</p>
      )}
    </div>
  );
}

export default PropertyList;
