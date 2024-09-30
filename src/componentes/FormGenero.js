import { useState } from 'react';  // Usa o hook useState para manter o estado do formulário e dos dados
import axios from 'axios';  // Importa axios para fazer requisições HTTP
"use client"

export default function Genero() {
  const [nome, setName] = useState('');  // Estado para o nome do gênero
  const [genero, setGenres] = useState([]);  // Estado para armazenar a lista de gêneros

  const fetchGenero= async () => {  // Função para buscar todos os gêneros
    const res = await axios.get('/api/genero');  // Faz requisição GET para a API de gêneros
    setGenero(res.data);  // Armazena os gêneros no estado
  };

  const createGenero = async (e) => {
    e.preventDefault();  // Previne o comportamento padrão do formulário
    await axios.post('/api/genero', { nome });  // Envia o novo gênero para a API
    fetchGenero();  // Atualiza a lista de gêneros após criar um novo
  };

  return (
    <div>
      <h1>Cadastro de Gêneros</h1>
      <form onSubmit={createGenero}>
        <input value={nome} onChange={(e) => setName(e.target.value)} placeholder="Nome do Gênero" />
        <button type="submit">Criar Gênero</button>
      </form>
      <h2>Gêneros</h2>
      <ul>
        {genero.map((genero) => (
          <li key={genero.id}>{genero.nome}</li>
        ))}
      </ul>
    </div>
  );
}