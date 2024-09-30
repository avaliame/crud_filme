"use client"

import { useState, useEffect } from 'react';
import CardFilme from './CardFilme';
import { useClient } from 'next/app';


function MyComponent() {
  const [count, setCount] = useState(0);
  useEffect(() => {

  }, []);
}

export default function ListaFilme() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const fetchFilmes = async () => {
      const response = await fetch('/api/filmes');
      const data = await response.json();
      setFilmes(data);
    };
    fetchFilmes();
  }, []);

  return (
    <div>
      {filmes.map((filme) => (
        <CardFilme key={filme.id} filme={filme} />
      ))}
    </div>
  );
}
