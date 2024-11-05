import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Função para adicionar um novo imóvel
export async function addProperty(propertyData) {
  try {
    await addDoc(collection(db, 'properties'), propertyData);
    console.log('Imóvel adicionado com sucesso!');
  } catch (e) {
    console.error('Erro ao adicionar imóvel: ', e);
  }
}

// Função para listar todos os imóveis
export async function getProperties() {
  const querySnapshot = await getDocs(collection(db, 'properties'));
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
}

// Função para atualizar um imóvel
export async function updateProperty(id, updatedData) {
  const propertyRef = doc(db, 'properties', id);
  await updateDoc(propertyRef, updatedData);
}

// Função para deletar um imóvel
export async function deleteProperty(id) {
  await deleteDoc(doc(db, 'properties', id));
}
