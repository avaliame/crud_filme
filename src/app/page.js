"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">App Filmes</h2>
        
        <div className="mb-4 w-full flex flex-col space-y-4">
          <Link href="/genero/formulario">
            <button className="w-full h-12 bg-red-600 rounded-md text-white hover:bg-red-700 transition">+ Cadastrar Gênero</button>
          </Link>

          <Link href="/genero">
            <button className="w-full h-12 bg-blue-700 rounded-md text-white hover:bg-blue-800 transition">+ Listar Gêneros</button>
          </Link>

          <Link href="/filme/formulario">
            <button className="w-full h-12 bg-green-700 rounded-md text-white hover:bg-green-800 transition">+ Cadastrar Filme</button>
          </Link>

          <Link href="/filme">
            <button className="w-full h-12 bg-yellow-500 rounded-md text-white hover:bg-yellow-600 transition">+ Listar Filmes</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
