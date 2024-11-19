import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { setLocalStorage, getLocalStorage } from './utils';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    const [imoveis, setImoveis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Função para obter imóveis do localStorage ou API
    async function getImoveis() {
        setLoading(true);
        const cachedImoveis = getLocalStorage("imoveis"); // Tenta pegar do localStorage

        if (cachedImoveis) {
            setImoveis(cachedImoveis);
            setLoading(false);
        } else {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setImoveis(response.data);
                setLocalStorage("imoveis", response.data); // Salva no localStorage
                setError(null);
            } catch (err) {
                setError("Erro ao buscar imóveis");
            } finally {
                setLoading(false);
            }
        }
    }

    // Função para adicionar imóvel
    async function addImovel(novoImovel) {
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', novoImovel);
            const newImoveis = [...imoveis, response.data];
            setImoveis(newImoveis);
            setLocalStorage("imoveis", newImoveis); // Atualiza o localStorage
        } catch (err) {
            setError("Erro ao adicionar imóvel");
        }
    }

    // Função para atualizar imóvel
    async function updateImovel(id, updatedImovel) {
        try {
            const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedImovel);
            const updatedImoveis = imoveis.map(imovel => (imovel.id === id ? response.data : imovel));
            setImoveis(updatedImoveis);
            setLocalStorage("imoveis", updatedImoveis); // Atualiza no localStorage
        } catch (err) {
            setError("Erro ao atualizar imóvel");
        }
    }

    // Função para deletar imóvel
    async function deleteImovel(id) {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const updatedImoveis = imoveis.filter(imovel => imovel.id !== id);
            setImoveis(updatedImoveis);
            setLocalStorage("imoveis", updatedImoveis); // Atualiza no localStorage
        } catch (err) {
            setError("Erro ao remover imóvel");
        }
    }

    useEffect(() => {
        getImoveis(); // Busca imóveis ao montar o componente
    }, []);

    return (
        <AppContext.Provider value={{ imoveis, loading, error, getImoveis, addImovel, updateImovel, deleteImovel }}>
            {children}
        </AppContext.Provider>
    );
};
