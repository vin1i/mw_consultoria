// Importações do Firebase e Firestore
import { db } from "../../../services/firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { uploadImagesToCloudinary } from "../../../services/CloudinaryService"; // Importa a função de upload

// Criação da referência à coleção 'properties' no Firestore
const propertyCollection = collection(db, "properties");

// Função para adicionar um novo imóvel com imagens e vídeos
export const addProperty = async (propertyData) => {
  console.log("Dados recebidos para adicionar imóvel:", propertyData); // Adicione este log
  try {
    const imagePublicIds = propertyData.imagens
      ? await uploadImagesToCloudinary(propertyData.imagens)
      : [];

    const newPropertyData = {
      ...propertyData,
      fotos: imagePublicIds,
      vlCondominio: propertyData.vlCondominio || 0,
      vlIptu: propertyData.vlIptu || 0,
      valorVenda: propertyData.valorVenda || 0,
      valorLocacao: propertyData.valorLocacao || 0,
      dt_criacao: new Date().toISOString(),
    };

    console.log("Dados formatados para Firestore:", newPropertyData); // Adicione este log
    const docRef = await addDoc(propertyCollection, newPropertyData);
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
      console.log("Dados brutos recebidos do Firestore:", data); // Adicione este log

      return {
        id: doc.id,
        tipo: data.tipo || "Indefinido",
        endereco: data.endereco || "Não informado",
        valorVenda: data.valorVenda || 0,
        valorLocacao: data.valorLocacao || 0,
        vlCondominio: data.vlCondominio || 0,
        vlIptu: data.vlIptu || 0,
        quartos: data.quartos || 0,
        banheiros: data.banheiros || 0,
        vagas: data.vagas || 0,
        suites: data.suites || 0,
        metrosQuadrados: data.metrosQuadrados || 0,
        descricao: data.descricao || "Não informada",
        disponibilidade: data.disponibilidade || "Não informado",
        titulo: data.titulo || "Sem título",
        imagens: data.imagens || [],
        videos: data.videos || [],
        dt_criacao: data.dt_criacao || "",
      };
    });

    console.log("Imóveis formatados:", imoveis); // Adicione este log
    return imoveis;
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error.message);
    throw error;
  }
};

// Função para atualizar imóvel
export const updateImovel = async (id, updatedData) => {
  console.log("Dados recebidos para atualização:", updatedData); // Adicione este log
  try {
    const propertyRef = doc(db, "properties", id);
    const updatedPropertyData = {
      ...updatedData,
      vlCondominio: updatedData.vlCondominio || 0,
      vlIptu: updatedData.vlIptu || 0,
      valorVenda: updatedData.valorVenda || 0,
      valorLocacao: updatedData.valorLocacao || 0,
    };

    console.log("Dados formatados para Firestore (update):", updatedPropertyData); // Adicione este log
    await updateDoc(propertyRef, updatedPropertyData);
  } catch (error) {
    console.error("Erro ao atualizar imóvel:", error.message);
    throw error;
  }
};


// Função para deletar imóvel
export const deleteImovel = async (id) => {
  try {
    console.log("ID do imóvel a ser deletado:", id);

    const propertyRef = doc(db, "properties", id);
    await deleteDoc(propertyRef);

    console.log("Imóvel deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar imóvel:", error.message);
    throw error;
  }
};
