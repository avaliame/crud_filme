"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from "next/navigation";

export default function GerenciarGenero() {
    const searchParams = useSearchParams(); 
    const id = searchParams.get('id');
    
    const [nome, setNome] = useState('');
    const [genero, setGenre] = useState([]);
    const router = useRouter();
    const [mensagem, setMensagem] = useState('');


    // Função para buscar todos os gêneros (caso seja necessário)
    useEffect(() => {
        const fetchGenero = async () => {
            try {
                const response = await axios.get('/api/genero');
                setGenero(response.data);
            } catch (error) {
                console.error("Erro ao buscar gêneros:", error);
            }
        };
        fetchGenero();
    }, []);

    // Função para buscar um gênero específico, se estiver no modo de edição
    useEffect(() => {
        if (id) {
            const fetchGenero = async () => {
                try {
                    const response = await axios.get(`/api/genero?id=${id}`);
                    const genero = response.data;
                    setNome(genero.nome);
                } catch (error) {
                    console.error("Erro ao buscar gênero:", error);
                }
            };
            fetchGenero();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem('');
        try {
            if (id) {
                await axios.put(`/api/genero?id=${id}`, { nome });
            } else {
                await axios.post('/api/genero', { nome });
            }
            router.push("/genero"); 
        } catch (error) {
            console.error("Erro ao salvar gênero:", error);
            setMensagem('Gênero já existente !');
        }
    };

    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">{id ? "Editar Gênero" : "Adicionar Gênero"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nome do Gênero</label>
                        <input 
                            type="text" 
                            value={nome} 
                            onChange={(e) => setNome(e.target.value)} 
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    
                    {mensagem && <p className="text-red-500 mb-4">{mensagem}</p>} 
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Salvar</button>
                </form>

            </div>
        </div>
    );
}
