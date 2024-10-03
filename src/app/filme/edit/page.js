"use client"

import { useState, useEffect } from 'react';  // Removi "react" pois não é necessário importá-lo diretamente
import axios from 'axios';
import { useRouter, useSearchParams } from "next/navigation";
import { format } from 'date-fns';

export default function EditFilme() {
    const searchParams = useSearchParams(); 
    const id = searchParams.get('id');

    const [titulo, setTitulo] = useState('');
    const [ano, setAno] = useState('');
    const [anoError, setAnoError] = useState(''); // Estado para erro no campo ano 
    const [Datalancamento, setDatalancamento] = useState('');
    const [diretor, setDiretor] = useState('');
    const [generoId, setGeneroId] = useState('');
    const router = useRouter();

    const [data_genero, setData_genero] = useState([]);

    useEffect(() => {
        axios.get("/api/genero").then((response) => {
            setData_genero(response.data);
        }).catch((error) => {
            console.log(error)
        })
    }, [])


    useEffect(() => {
        if (id) {
            axios.get(`/api/filme?id=${id}`)
            .then((response) => {
                    const filme = response.data;
                    setTitulo(filme.titulo);
                    setAno(filme.ano);
                    setDatalancamento(filme.Datalancamento ? format(new Date(filme.Datalancamento), 'yyyy-MM-dd') : '');                
                    setDiretor(filme.diretor);
                    setGeneroId(filme.generoId);
            }).catch((error) => {
                console.error(error);
            });
        } else {
            console.log("ID não definido");
        }

    }, [id]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateAno(ano)) {
            return; // Impede o envio se houver erro
        }

        try {
            const dataLancamento = new Date(Datalancamento).toISOString();
            await axios.put(`/api/filme?id=${id}`, {
                titulo,
                ano,
                Datalancamento: dataLancamento, 
                diretor,
                generoId
            });
            router.push("/filme");
        } catch (error) {
            console.error("Erro ao atualizar filme:",error);
        }
    };

    const validateAno = (value) => {
        const isValid = /^\d+$/.test(value) && value > 0;
        if (!isValid) {
            setAnoError('O ano deve ser um número positivo.');
        } else {
            setAnoError('');
        }
        return isValid;
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
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Ano</label>
                        <input 
                            type="text" 
                            value={ano} 
                            onChange={(e) => setAno(Number(e.target.value))} 
                            onBlur={() => validateAno(ano)} // Chama a validação quando o campo perde o foco
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                        {anoError && <p className="text-red-500 text-sm">{anoError}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Data de Lançamento</label>
                        <input 
                            type="date" 
                            value={Datalancamento} 
                            onChange={(e) => setDatalancamento(e.target.value)} 
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700">Diretor</label>
                        <input 
                            type="text" 
                            value={diretor} 
                            onChange={(e) => setDiretor(e.target.value)} 
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="genero" className="block text-gray-700 text-sm font-bold mb-2">Gênero:</label>
                        <select
                            id="genero"
                            name="genero"
                            value={generoId} 
                            onChange={(e) => setGeneroId(Number(e.target.value))}
                            className="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                            required >

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
    );
}
