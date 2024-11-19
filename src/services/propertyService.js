// Importações do Firebase e Firestore
import { db } from '../services/firebase/firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { uploadImagesToCloudinary } from '../services/CloudinaryService'; // Importa a função de upload

// Criação da referência à coleção 'properties' no Firestore
const propertyCollection = collection(db, 'properties');

// Função para adicionar um novo imóvel com imagens e vídeos
export const addProperty = async (propertyData) => {
  try {
    console.log("Dados do imóvel:", propertyData);

    const imagePublicIds = propertyData.imagens ? await uploadImagesToCloudinary(propertyData.imagens) : [];

    // Cria os dados do imóvel a serem salvos no Firestore
    const newPropertyData = {
      ds_descricao: propertyData.descricao || '',
      ds_localizacao: propertyData.endereco || '',
      nm_titulo: propertyData.titulo || '',
      nr_banheiros: propertyData.banheiros || 0,
      nr_quartos: propertyData.quartos || 0,
      nr_suites: propertyData.suites || 0,
      nr_tamanho: propertyData.metrosQuadrados || 0,
      nr_vagas_garagem: propertyData.vagas || 0,
      st_disponibilidade: propertyData.disponibilidade || 'Disponível',
      tp_imovel: propertyData.tipo || 'Apartamento',
      videos: propertyData.videos || [],
      vl_condominio: propertyData.condominio || 0,
      vl_preco: propertyData.valor || 0,
      dt_criacao: new Date(),
      fotos: imagePublicIds.length ? imagePublicIds : [] // Prevenção contra array vazio
    };

    console.log("Dados do imóvel formatados para Firestore:", newPropertyData);
    
    const docRef = await addDoc(propertyCollection, newPropertyData);

    console.log("Imóvel adicionado com sucesso! ID:", docRef.id);
    return docRef.id; // Retorna o ID do documento adicionado
  } catch (error) {
    console.error("Erro ao salvar o imóvel:", error.message);
    throw new Error("Erro ao adicionar imóvel: " + error.message);
  }
};

// Função para obter todos os imóveis
export const getImoveis = async () => {
  try {
    const querySnapshot = await getDocs(propertyCollection);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      tipo: doc.data().tipo || 'Indefinido',
      endereco: doc.data().endereco || 'Não informado',
      valor: doc.data().valor || 0,
      quartos: doc.data().quartos || 0,
      banheiros: doc.data().banheiros || 0,
      vagas: doc.data().vagas || 0,
      suites: doc.data().suites || 0,
      metrosQuadrados: doc.data().metrosQuadrados || 0,
      descricao: doc.data().descricao || 'Não informada',
      disponibilidade: doc.data().disponibilidade || 'Não informado',
      titulo: doc.data().titulo || 'Sem título',
      imagens: doc.data().imagens || [],
      videos: doc.data().videos || [],
    }));
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error);
    throw error;
  }
};

// Função para atualizar imóvel
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

// Função para deletar imóvel
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
