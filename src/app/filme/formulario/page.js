"use client"
import { useState, react, useEffect } from 'react';  // Usa o hook useState para manter o estado do formulário e dos dados
import axios from 'axios';
import { format } from 'date-fns';


export default function Filme() {
    const [titulo, setTitulo] = useState('');
    const [ano, setAno] = useState('');
    const [Datalancamento, setDatalancamento] = useState(new Date());
    const [diretor, setDiretor] = useState('');
    const [generoId, setGeneroId] = useState('');

    const [data_genero, setData_genero] = useState([]);
    useEffect(() => {
        axios.get("/api/genero").then((response) => {
            setData_genero(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const createFilme = async (e) => {

        e.preventDefault();
        try {
            const response = await axios.post('/api/filme', { titulo, ano, Datalancamento, diretor, generoId })
            console.log(response)
        } catch (error) {
            console.log(error)
        } // Previne o comportamento padrão do formulário


    };


    return (
        <div className='bg-gray-100 h-screen flex items-center justify-center'>
            <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 class="text-2xl font-bold mb-6 text-center">Inserir Filme</h2>
                <div className=" mb-4 w-full grid justify-items-end">
                    <a className="px-2 py-2 border border-1 bg-gray-700 rounded-md text-white" href="/filme">Listagem</a>
                </div>

                <form onSubmit={createFilme}>
                    <div class="mb-4">

                        <label for="titulo" class="block text-gray-700 text-sm font-bold mb-2">Título do Filme:</label>
                        <input id="titulo" type="text" name="titulo"
                            value={titulo} onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Digite o título do filme"
                            class="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" />
                    </div>

                    <div class="mb-4">
                        <label for="ano" class="block text-gray-700 text-sm font-bold mb-2">Ano de Produção:</label>
                        <input id="ano" type="number" name="ano"
                            value={ano} onChange={(e) => setAno(e.target.value)}
                            placeholder="Digite o ano"
                            class="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" />
                    </div>

                    <div class="mb-4">
                        <label for="data_lancamento" class="block text-gray-700 text-sm font-bold mb-2">Data de Lançamento:</label>
                        <input id="data_lancamento"
                            onChange={(e) => setDatalancamento(e.target.value)}
                            type="date"
                            value={format(Datalancamento, 'yyyy-MM-dd')}
                            name="data_lancamento"
                            class="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" />
                    </div>

                    <div class="mb-4">
                        <label for="diretor" class="block text-gray-700 text-sm font-bold mb-2">Diretor:</label>
                        <input id="diretor" type="text" name="diretor"
                            value={diretor} onChange={(e) => setDiretor(e.target.value)}
                            placeholder="Digite o nome do diretor"
                            class="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" />
                    </div>

                    <div class="mb-4">
                        <label for="genero" class="block text-gray-700 text-sm font-bold mb-2">Gênero:</label>
                        <select
                            id="genero"
                            name="genero"
                            value={generoId} onChange={(e) => setGeneroId(e.target.value)}
                            class="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500">
                            <option value="">Selecione o gênero</option>
                            {data_genero.map((res) => (
                                <option value={res.id}>{res.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div class="flex justify-center">
                        <button type="submit" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                            Inserir Filme
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}