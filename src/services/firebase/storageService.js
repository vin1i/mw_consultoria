import { storage } from '../services/firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImages = async (files) => {
  const uploadPromises = files.map(async (file) => {
    const fileRef = ref(storage, `images/${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  });
  
  return await Promise.all(uploadPromises);
};