// components/MovieForm.js
"use client"
import { useState } from 'react';
import { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function FormFilme({ initialData }) {
    const [titulo, setTitulo] = useState('');
    const [ano, setAno] = useState('');
    const [Datalancamento, setDatalancamento] = useState('');
    const [diretor, setDiretor] = useState('');
    const [generoId, setGeneroId] = useState('');
    const [genero, setGenero] = useState([]);
    const [filmes, setFilmes] = useState([]);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/filmes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo, ano, Datalancamento, diretor }),
        });

        if (response.ok) {
            // Filme cadastrado com sucesso
        } else {
            // Tratar erros
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Campos do formulário */}
            <button type="submit">Cadastrar</button>
        </form>
    );
}


const handleSubmit = async (event) => {
    event.preventDefault();

    const method = initialData ? 'PUT' : 'POST';
    const url = initialData ? `/api/filmes/${initialData.id}` : '/api/filmes';

    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, ano, Datalancamento, generoId, diretor }),
    });

    // ... (tratamento da resposta)
};

useEffect(() => {
    const fetchGeneros = async () => {
        const genero = await prisma.genero.findMany();
        setGenero(genero);
    };
    fetchGenero();
}, []);

return (
    <form onSubmit={handleSubmit}>
        {/* ... */}
        <select value={generoId} onChange={(e) => setGeneroId(e.target.value)}>
            <option value="">Selecione um gênero</option>
            {genero.map((genero) => (
                <option key={genero.id} value={genero.id}>
                    {genero.nome}
                </option>
            ))}
        </select>
        {/* ... */}
    </form>
);