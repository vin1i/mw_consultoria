// Importações do Firebase e Firestore
import { db } from '../../../services/firebase/firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { uploadImagesToCloudinary } from '../../../services/CloudinaryService'; // Importa a função de upload

// Criação da referência à coleção 'properties' no Firestore
const propertyCollection = collection(db, 'properties');

// Função para adicionar um novo imóvel com imagens e vídeos
export const addProperty = async (propertyData) => {
  try {
    console.log("Iniciando a adição de imóvel com dados:", JSON.stringify(propertyData, null, 2));

    const imagePublicIds = propertyData.imagens 
      ? await uploadImagesToCloudinary(propertyData.imagens) 
      : [];
    console.log("IDs das imagens retornados pelo Cloudinary:", imagePublicIds);

    const newPropertyData = {
      ...propertyData,
      fotos: imagePublicIds,
      dt_criacao: new Date().toISOString(),
    };

    console.log("Dados formatados para Firestore:", JSON.stringify(newPropertyData, null, 2));

    const docRef = await addDoc(propertyCollection, newPropertyData);

    console.log("Imóvel adicionado com sucesso! ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao adicionar imóvel:", error.message);
    throw new Error("Erro ao adicionar imóvel: " + error.message);
  }
};

// Função para obter todos os imóveis
export const getImoveis = async () => {
  try {
    const querySnapshot = await getDocs(propertyCollection);

    const imoveis = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      console.log("Imóvel recebido do Firestore:", JSON.stringify(data, null, 2));

      return {
        id: doc.id,
        tipo: data.tipo || 'Indefinido',
        endereco: data.endereco || 'Não informado',
        valor: data.valor || 0,
        quartos: data.quartos || 0,
        banheiros: data.banheiros || 0,
        vagas: data.vagas || 0,
        suites: data.suites || 0,
        metrosQuadrados: data.metrosQuadrados || 0,
        descricao: data.descricao || 'Não informada',
        disponibilidade: data.disponibilidade || 'Não informado',
        titulo: data.titulo || 'Sem título',
        imagens: data.fotos || [], // Pode combinar imagens e fotos se necessário
        videos: data.videos || [],
        condominio: data.condominio || 0,
        dt_criacao: data.dt_criacao || ''
      };
    });

    console.log("Lista de imóveis formatada:", JSON.stringify(imoveis, null, 2));
    return imoveis;
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error.message);
    throw error;
  }
};

// Função para atualizar imóvel
export const updateImovel = async (id, updatedData) => {
  try {
    console.log("Dados recebidos para atualização:", JSON.stringify(updatedData, null, 2));

    const propertyRef = doc(db, 'properties', id);
    await updateDoc(propertyRef, updatedData);

    console.log("Imóvel atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar imóvel:", error.message);
    throw error;
  }
};

// Função para deletar imóvel
export const deleteImovel = async (id) => {
  try {
    console.log("ID do imóvel a ser deletado:", id);

    const propertyRef = doc(db, 'properties', id);
    await deleteDoc(propertyRef);

    console.log("Imóvel deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar imóvel:", error.message);
    throw error;
  }
};
