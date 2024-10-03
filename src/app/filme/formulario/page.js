"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

export default function Filme() {
    const [titulo, setTitulo] = useState('');
    const [ano, setAno] = useState('');
    const [Datalancamento, setDatalancamento] = useState(new Date());
    const [diretor, setDiretor] = useState('');
    const [generoId, setGeneroId] = useState('');
    const [data_genero, setData_genero] = useState([]);
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        axios.get("/api/genero")
        .then((response) => {
            setData_genero(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const createFilme = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/filme', { titulo, ano, Datalancamento, diretor, generoId });
            setMensagem('Filme inserido com sucesso!');
        } catch (error) {
            console.log(error);
            setMensagem('Erro ao inserir filme.');
        }
    };

    return (
        <div className='bg-gray-100 h-screen flex items-center justify-center'>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Inserir Filme</h2>
                {mensagem && <p className="text-center text-red-500 mb-4">{mensagem}</p>}
                <div className="mb-4 w-full grid justify-items-end">
                    <a className="px-2 py-2 border border-1 bg-gray-700 rounded-md text-white" href="/filme">Listagem</a>
                </div>

                <div className="mb-4 w-full grid justify-items-end">
                <a href="/" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"> Pagina inicial</a>
                </div>
                
                <form onSubmit={createFilme}>
                    <div className="mb-4">
                        <label htmlFor="titulo" className="block text-gray-700 text-sm font-bold mb-2">Título do Filme:</label>
                        <input 
                            id="titulo" 
                            type="text" 
                            name="titulo"
                            value={titulo} 
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Digite o título do filme"
                            className="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" 
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="ano" className="block text-gray-700 text-sm font-bold mb-2">Ano de Produção:</label>
                        <input 
                            id="ano" 
                            type="number" 
                            name="ano"
                            value={ano} 
                            onChange={(e) => setAno(Number(e.target.value))}
                            placeholder="Digite o ano"
                            className="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" 
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="data_lancamento" className="block text-gray-700 text-sm font-bold mb-2">Data de Lançamento:</label>
                        <input 
                            id="data_lancamento"
                            type="date"
                            onChange={(e) => setDatalancamento(new Date(e.target.value))}
                            value={format(Datalancamento, 'yyyy-MM-dd')}
                            name="data_lancamento"
                            className="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" 
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="diretor" className="block text-gray-700 text-sm font-bold mb-2">Diretor:</label>
                        <input 
                            id="diretor" 
                            type="text" 
                            name="diretor"
                            value={diretor} 
                            onChange={(e) => setDiretor(e.target.value)}
                            placeholder="Digite o nome do diretor"
                            className="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" 
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
                            required
                        >
                            <option value="">Selecione o gênero</option>
                            {data_genero.map((res) => (
                                <option key={res.id} value={res.id}>{res.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                            Inserir Filme
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
