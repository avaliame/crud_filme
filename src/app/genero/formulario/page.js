"use client"
import { useState } from 'react';  // Usa o hook useState para manter o estado do formulário e dos dados
import axios from 'axios';  // Importa axios para fazer requisições HTTP


export default function Genero() {
    const [nome, setName] = useState('');  // Estado para o nome do gênero
    const [genero, setGenres] = useState([]);  // Estado para armazenar a lista de gêneros

    const fetchGenero = async () => {  // Função para buscar todos os gêneros
        const res = await axios.get('/api/genero');  // Faz requisição GET para a API de gêneros
        setGenero(res.data);  // Armazena os gêneros no estado
    };

    const createGenero = async (e) => {
        e.preventDefault();  // Previne o comportamento padrão do formulário
        await axios.post('/api/genero', { nome });  // Envia o novo gênero para a API
        fetchGenero();  // Atualiza a lista de gêneros após criar um novo
    };

    return (
        <div className='bg-gray-100 h-screen flex items-center justify-center'>
            {/* <h1>Cadastro de Gêneros</h1>
      <form onSubmit={createGenero}>
        <input value={nome} onChange={(e) => setName(e.target.value)} placeholder="Nome do Gênero" />
        <button type="submit">Criar Gênero</button>
      </form>
      <h2>Gêneros</h2>
      <ul>
        {genero.map((genero) => (
          <li key={genero.id}>{genero.nome}</li>
        ))}
      </ul> */}
            <div class="bg-white p-8 rounded shadow-lg w-full max-w-sm">
                <h2 class="text-2xl font-bold mb-6 text-center">Escolha o Gênero de Filme</h2>
                <form>
                    <div class="mb-4">
                        <label for="genero" class="block text-gray-700 text-sm font-bold mb-2">Gênero de Filme:</label>
                        <select id="genero" name="genero" class="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500">
                            <option value="">Selecione um gênero</option>
                            <option value="acao">Ação</option>
                            <option value="comedia">Comédia</option>
                            <option value="drama">Drama</option>
                            <option value="terror">Terror</option>
                            <option value="aventura">Aventura</option>
                            <option value="sci-fi">Ficção Científica</option>
                        </select>
                    </div>
                    <div class="flex justify-center">
                        <button type="submit" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"> Enviar </button>
                    </div>
                </form>
            </div>
        </div >
    )
}