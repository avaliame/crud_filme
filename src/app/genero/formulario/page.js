"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CreateGenero() {
    const [nome, setName] = useState('');
    const [generosCadastrados, setGenerosCadastrados] = useState([]);
    const router = useRouter();
    const [mensagem, setMensagem] = useState('');

    const createGenero = async (e) => {
        e.preventDefault();

        if (generosCadastrados.includes(nome)) {
            setMensagem('Este gênero já foi cadastrado!');
            return;
        }

        try {
            await axios.post('/api/genero', { nome });
            setGenerosCadastrados([...generosCadastrados, nome]); // Adiciona o gênero à lista
            setMensagem('Gênero inserido com sucesso!');
            setName('');
        } catch (error) {
            console.error("Erro ao criar gênero:", error);
            setMensagem('Gênero já existente !');

        }
    };

    
    return (
        <div className='bg-gray-100 h-screen flex items-center justify-center'>
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Gênero do Filme</h2>
                {mensagem && <p className="text-center text-red-500 mb-4">{mensagem}</p>}
                <div className="mb-4 w-full grid justify-items-end">
                    <a className="px-2 py-2 border border-1 bg-gray-700 rounded-md text-white" href="/genero">Listagem</a>
                </div>

                <div className="mb-4 w-full grid justify-items-end">
                <a href="/" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"> Pagina inicial</a>
                </div>

                <form onSubmit={createGenero}>
                    <div className="mb-4">
                        <label htmlFor="genero" className="block text-gray-700 text-sm font-bold mb-2">Gênero de Filme:</label>
                        <input 
                            id="genero" 
                            type="text" 
                            name="nome"
                            value={nome} 
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Digite o gênero do filme"
                            className="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                            required 
                        />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Enviar</button>
                    </div>
                </form>
            
            </div>
        </div>
    );
}
