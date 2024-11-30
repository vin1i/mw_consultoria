export const uploadImagesToCloudinary = async (files) => {
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

  if (!uploadPreset || !cloudName) {
    console.error("Cloudinary upload preset ou cloud name não configurado");
    return [];
  }

  const filesArray = (Array.isArray(files) ? files : [files]).filter(file => file instanceof File);

  if (filesArray.length === 0) {
    console.warn("Nenhum arquivo válido para upload.");
    return [];
  }

  const uploadPromises = filesArray.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      if (!data.public_id) {
        console.error("Public ID não retornado pelo Cloudinary.");
        throw new Error("Public ID não retornado.");
      }

      return data.public_id;
    } catch (error) {
      console.error("Erro ao fazer upload para o Cloudinary:", error);
      throw error;
    }
  });

  return await Promise.all(uploadPromises);
};
