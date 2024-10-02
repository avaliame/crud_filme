"use client"
import { useState } from 'react';  // Usa o hook useState para manter o estado do formulário e dos dados
import axios from 'axios';  // Importa axios para fazer requisições HTTP


export default function Genero() {
    const [nome, setName] = useState('');  // Estado para o nome do gênero
    const [genero, setGenres] = useState([]);  // Estado para armazenar a lista de gêneros

    /* const fetchGenero = async () => {  // Função para buscar todos os gêneros
        const res = await axios.get('/api/genero');  // Faz requisição GET para a API de gêneros
        setGenero(res.data);  // Armazena os gêneros no estado
    }; */

    const createGenero = async (e) => {

        e.preventDefault();
        try {
            const response = await axios.post('/api/genero', { nome })
            console.log('genero criado com sucesso:', response.data)
        } catch (error) {
            console.log(error)
        }


    };

    return (
        <div className='bg-gray-100 h-screen flex items-center justify-center'>

            <div class="bg-white p-8 rounded shadow-lg w-full max-w-sm">
                <h2 class="text-2xl font-bold mb-6 text-center">Gênero do Filme</h2>
                <div className=" mb-4 w-full grid justify-items-end">
                    <a className="px-2 py-2 border border-1 bg-gray-700 rounded-md text-white" href="/genero">Listagem</a>
                </div>
                <form onSubmit={createGenero}>
                    <div class="mb-4">
                        <label for="genero" class="block text-gray-700 text-sm font-bold mb-2">Gênero de Filme:</label>
                        <input id="genero" type="text" name="nome"
                            value={nome} onChange={(e) => setName(e.target.value)}
                            placeholder="Digite o gênero do filme"
                            class="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                        />

                    </div>
                    <div class="flex justify-center">
                        <button type="submit" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"> Enviar </button>
                    </div>
                </form>
            </div>
        </div >
    )
}