import React, { useState, useEffect } from "react";
import PropertyForm from "../Admin/PropertyForm";
import { getImoveis  } from "../../services/propertyService";
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
      <PropertyForm onSave={refreshProperties} />

      <div>
        {properties.map((property) => (
          <div key={property.id}>
            <h3>{property.titulo}</h3>
            <p>{property.descricao}</p>
            <p>{property.valor}</p>
            <p>{property.endereco}</p>

            {/* Renderiza vídeos associados ao imóvel */}
            {property.videos && property.videos.length > 0 && (
              <div>
                {property.videos.map((videoUrl, index) => (
                  <VideoPlayer key={index} videoUrl={videoUrl} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyPage;
