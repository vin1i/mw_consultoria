import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

// Use o nome correto da coleção no Firebase: "properties"
const propertyCollection = collection(db, "properties");

export const addImovel = async (imovelData) => {
  if (!imovelData || !imovelData.tp_imovel || !imovelData.ds_localizacao || !imovelData.vl_preco) {
    console.error("Dados do imóvel incompletos:", imovelData);
    return null;
  }

  if (typeof imovelData.vl_preco !== 'number' || imovelData.vl_preco <= 0) {
    console.error("Preço inválido:", imovelData.vl_preco);
    return null;
  }
  
  try {
    const docRef = await addDoc(propertyCollection, imovelData);
    console.log("Imóvel adicionado com ID:", docRef.id);
    return docRef.id;  // Retorna o ID do documento para possíveis usos
  } catch (error) {
    console.error("Erro ao adicionar imóvel:", error.message);
    throw new Error("Falha ao adicionar o imóvel. Verifique os dados e tente novamente.");
  }
};

export const getImoveis = async () => {
  try {
    const querySnapshot = await getDocs(propertyCollection);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      tipo: doc.data().tp_imovel || 'Desconhecido',  // Adicionando valor default
      endereco: doc.data().ds_localizacao || 'Não informado', // Valor default para endereço
      valor: doc.data().vl_preco || 0,  // Valor default para preço
      quartos: doc.data().nr_quartos || 0,  // Garantindo valores default
      banheiros: doc.data().nr_banheiros || 0, 
      vagas: doc.data().nr_vagas_garagem || 0, 
      suites: doc.data().nr_suites || 0, 
      metrosQuadrados: doc.data().nr_tamanho || 0,
      descricao: doc.data().ds_descricao || 'Sem descrição', // Garantindo que tenha sempre um valor
      disponibilidade: doc.data().st_disponibilidade || 'Indefinido', 
      titulo: doc.data().nm_titulo || 'Sem título',
      imagens: doc.data().imagens || [], 
      videos: doc.data().videos || [],   
    }));
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error);
    throw error;
  }
};

export const getImovelById = async (id) => {
  try {
    // Certifique-se de usar o nome correto da coleção: "properties"
    const docRef = doc(db, "properties", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error("Imóvel não encontrado.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar imóvel:", error);
    throw error;
  }
};

export const updateImovel = async (id, updatedData) => {
  if (!updatedData || Object.keys(updatedData).length === 0) {
    console.error("Dados para atualização ausentes ou vazios:", updatedData);
    return;
  }

  try {
    // Use o nome correto da coleção: "properties"
    const propertyRef = doc(db, "properties", id);
    await updateDoc(propertyRef, updatedData);
    console.log("Imóvel atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar imóvel:", error.message);
    throw new Error(`Falha ao atualizar o imóvel: ${error.message}`);
  }
};

export const deleteImovel = async (id) => {
  const confirmDelete = window.confirm("Você tem certeza que deseja excluir este imóvel?");
  if (!confirmDelete) {
    console.log("Exclusão cancelada.");
    return;
  }

  try {
    // Use o nome correto da coleção: "properties"
    const propertyRef = doc(db, "properties", id);
    await deleteDoc(propertyRef);
    console.log("Imóvel deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar imóvel:", error);
    throw error;
  }
};
