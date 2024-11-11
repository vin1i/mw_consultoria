// Importações do Firebase e Firestore
import { db } from '../services/firebase/firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
// Importações do Firebase Storage (temporariamente comentadas)
// import { storage } from '../services/firebase/firebaseConfig';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Criação da referência à coleção 'properties' no Firestore
const propertyCollection = collection(db, 'properties');

// Função para fazer upload de múltiplas imagens
// const uploadImages = async (files) => {
//   const uploadPromises = files.map(async (file) => {
//     const fileRef = ref(storage, `images/${file.name}`);
//     await uploadBytes(fileRef, file);
//     return await getDownloadURL(fileRef); // Retorna a URL da imagem
//   });

//   return await Promise.all(uploadPromises); // Retorna um array de URLs
// };

// Função para adicionar um novo imóvel com imagens e vídeos
// Função para simular o upload de múltiplas imagens
const uploadImages = async (files) => {
  if (!files || files.length === 0) {
    return []; // Retorna um array vazio se não houver arquivos
  }
  
  return files.map(() => "https://via.placeholder.com/200");
};

// Função para adicionar um novo imóvel com imagens e vídeos
export const addProperty = async (propertyData, imageFiles, videoUrls) => {
  try {
    const imageUrls = await uploadImages(imageFiles);

    const newPropertyData = {
      ...propertyData,
      imagens: imageUrls,
      videos: videoUrls, // Pode ser uma lista de URLs do YouTube ou IDs
    };

    return await addDoc(propertyCollection, newPropertyData);
  } catch (error) {
    console.error("Erro ao adicionar imóvel:", error);
    throw error;
  }
};

// Função para obter todos os imóveis
export const getImoveis = async () => {
  try {
    const querySnapshot = await getDocs(propertyCollection);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      thumb: "", // Se precisar adicionar uma URL de imagem fixa ou personalizada
      tipo: doc.data().tp_imovel,
      endereco: doc.data().ds_localizacao,
      valor: doc.data().vl_preco,
      quartos: doc.data().nr_quartos,
      banheiros: doc.data().nr_banheiros,
      vagas: doc.data().nr_vagas_garagem,
      suites: doc.data().nr_suites,
      metrosQuadrados: doc.data().nr_tamanho,
      descricao: doc.data().ds_descricao,
      disponibilidade: doc.data().st_disponibilidade,
      titulo: doc.data().nm_titulo,
      imagens: doc.data().imagens || [], // Array de URLs simuladas ou reais
      videos: doc.data().videos || [],   // Array de URLs de vídeos
    }));
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error);
    throw error;
  }
};

// Funções para atualizar e deletar imóveis permanecem inalteradas
export const updateImovel = async (id, updatedData) => {
  try {
    const propertyRef = doc(db, 'properties', id);
    await updateDoc(propertyRef, updatedData);
    console.log("Imóvel atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar imóvel:", error);
    throw error;
  }
};

export const deleteImovel = async (id) => {
  try {
    const propertyRef = doc(db, 'properties', id);
    await deleteDoc(propertyRef);
    console.log("Imóvel deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar imóvel:", error);
    throw error;
  }
};
