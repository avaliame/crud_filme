"use client"

import { useState, react, useEffect } from 'react';  // Usa o hook useState para manter o estado do formulário e dos dados
import axios from 'axios';
//import { useRouter } from "next/router";
import { useRouter, useSearchParams } from "next/navigation";



export default function EditFilme() {
    const searchParams = useSearchParams(); 
    const id = searchParams.get('id');

    const [titulo, setTitulo] = useState('');
    const [ano, setAno] = useState('');
    const [Datalancamento, setDatalancamento] = useState(new Date());
    const [diretor, setDiretor] = useState('');
    const [generoId, setGeneroId] = useState('');
    const router = useRouter();

    const [data_genero, setData_genero] = useState([]);

    useEffect(() => {
        axios.get("/api/genero").then((response) => {
            setData_genero(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        if (id) {
            // Busca os dados do filme pelo ID
            axios.get(`/api/filme?id=${id}`).then((response) => {
                const filme = response.data;
                setTitulo(filme.titulo);
                setAno(filme.ano);
                setDatalancamento(filme.Datalancamento);
                setDiretor(filme.diretor);
                setGeneroId(filme.generoId);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [id]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/filme?id=${id}`, {
                titulo,
                ano,
                Datalancamento,
                diretor,
                generoId
            });
            // Redireciona após edição bem-sucedida
            router.push("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Editar Filme</h2>
              
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                        <label className="block text-gray-700">Título</label>
                        <input 
                            type="text" 
                            value={titulo} 
                            onChange={(e) => setTitulo(e.target.value)} 
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Ano</label>
                        <input 
                            type="text" 
                            value={ano} 
                            onChange={(e) => setAno(e.target.value)} 
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Data de Lançamento</label>
                        <input 
                            type="date" 
                            value={Datalancamento} 
                            onChange={(e) => setDatalancamento(e.target.value)} 
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700">Diretor</label>
                        <input 
                            type="text" 
                            value={diretor} 
                            onChange={(e) => setDiretor(e.target.value)} 
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div class="mb-4">
                        <label for="genero" class="block text-gray-700 text-sm font-bold mb-2">Gênero:</label>
                        <select
                            id="genero"
                            name="genero"
                            value={generoId} onChange={(e) => setGeneroId(Number(e.target.value))}
                            class="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500">
                            <option value="">Selecione o gênero</option>
                            {data_genero.map((res) => (
                                <option key={res.id} value={res.id}>{res.nome}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Salvar</button>

                </form>
            </div>
        </div>
    )
}