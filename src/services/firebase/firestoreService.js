import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const propertyCollection = collection(db, "imoveis");

export const addImovel = async (imovelData) => {
  try {
    return await addDoc(propertyCollection, imovelData);
  } catch (error) {
    console.error("Erro ao adicionar imóvel:", error);
  }
};

export const getImoveis = async () => {
  try {
    const querySnapshot = await getDocs(propertyCollection);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      thumb: "",
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
    }));
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error);
    throw error;
  }
};

export const updateImovel = async (id, updatedData) => {
  try {
    const propertyRef = doc(db, "imoveis", id); // Referência ao documento
    await updateDoc(propertyRef, updatedData);
    console.log("Imóvel atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar imóvel:", error);
    throw error;
  }
};

export const deleteImovel = async (id) => {
  try {
    const propertyRef = doc(db, "imoveis", id); // Referência ao documento
    await deleteDoc(propertyRef);
    console.log("Imóvel deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar imóvel:", error);
    throw error;
  }
};
