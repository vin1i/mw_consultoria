import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    const [imoveis, setImoveis] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function getImoveis() {
        setLoading(true);
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setImoveis(response.data);
            setError(null);
        } catch (err) {
            setError("Erro ao buscar imóveis");
        } finally {
            setLoading(false);
        }
    }

    async function addImovel(novoImovel) {
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', novoImovel);
            setImoveis([...imoveis, response.data]);
        } catch (err) {
            setError("Erro ao adicionar imóvel");
        }
    }

    async function updateImovel(id, updatedImovel) {
        try {
            const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedImovel);
            setImoveis(imoveis.map(imovel => (imovel.id === id ? response.data : imovel)));
        } catch (err) {
            setError("Erro ao atualizar imóvel");
        }
    }

    async function deleteImovel(id) {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
            setImoveis(imoveis.filter(imovel => imovel.id !== id));
        } catch (err) {
            setError("Erro ao remover imóvel");
        }
    }

    useEffect(() => {
        getImoveis();
    }, []);

    return (
        <AppContext.Provider value={{ imoveis, loading, error, getImoveis, addImovel, updateImovel, deleteImovel }}>
            {children}
        </AppContext.Provider>
    );
};
