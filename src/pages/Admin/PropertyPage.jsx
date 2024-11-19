import React, { useState, useEffect } from "react";
import PropertyForm from "../Admin/PropertyForm";
import { getImoveis } from "../../services/propertyService";
import VideoPlayer from "../../components/VideoPlayer";

function PropertyPage() {
  const [properties, setProperties] = useState([]);

  const refreshProperties = async () => {
    const data = await getImoveis();
    setProperties(data);
  };

  useEffect(() => {
    refreshProperties();
  }, []);

  return (
    <div>
      {/* Formulário para adicionar propriedades */}
      <PropertyForm onSave={refreshProperties} />

      {/* Lista de propriedades */}
      <div>
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.id}>
              <h3>{property.nm_titulo}</h3>
              <p>Descrição: {property.ds_descricao || 'Descrição não disponível'}</p>
              <p>
                Valor: R${" "}
                {property.vl_preco
                  ? property.vl_preco.toLocaleString("pt-BR")
                  : "Preço não disponível"}
              </p>
              <p>Endereço: {property.ds_localizacao || 'Localização não disponível'}</p>

              {/* Renderiza vídeos associados ao imóvel */}
              {property.videos && property.videos.length > 0 ? (
                <div>
                  {property.videos.map((videoUrl, index) => (
                    <VideoPlayer key={index} videoUrl={videoUrl} />
                  ))}
                </div>
              ) : (
                <p>Sem vídeos disponíveis</p>
              )}
            </div>
          ))
        ) : (
          <p>Carregando propriedades...</p>
        )}
      </div>
    </div>
  );
}

export default PropertyPage;
