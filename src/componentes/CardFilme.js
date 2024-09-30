// components/MovieCard.js
"use client"

import { useState } from 'react';

export default function  CardFilme({ movie }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await fetch(`/api/filmes/${filme.id}`, { method: 'DELETE' });
      // Remover o filme da lista
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  // ... (restante do componente)
}