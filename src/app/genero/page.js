"use client"

import axios from "axios"
import { useEffect, useState } from "react"

export default function ClientePage() {
    
    const [data, setData] = useState([]);
    useEffect(() => {
		fetchGeneros(); // Função para buscar filmes
    }, []);

    const fetchGeneros = () => {
        axios.get("/api/genero").then((response) => {
            setData(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    };


    const deleteGenero = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este filme?")) {
            try {
                await axios.delete(`/api/genero?id=${id}`);
                fetchGeneros(); // Atualiza a lista de filmes após exclusão
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <div className="bg-gray-100 h-screen flex items-center justify-center">
                <div class="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
                    <h2 class="text-2xl font-bold mb-6 text-center">Lista de Gêneros </h2>
                    
                    <div className=" mb-4 w-full grid justify-items-end">
                        <a className="px-2 py-2 border border-1 bg-gray-700 rounded-md text-white" href="/genero/formulario">+ Adicionar</a>
                    </div>
                    
                    <div className="mb-4 w-full grid justify-items-end">
                    <a href="/" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"> Pagina inicial</a>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full table-auto">
                            <thead>
                                <tr class="bg-gray-200 text-gray-700">
                                    <th class="px-4 py-2 text-left">ID</th>
                                    <th class="px-4 py-2 text-left">Gênero</th>
                                    <th class="px-4 py-2 text-left">Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((res) => (
                                    <tr key={res.id} class="border-b">
                                        <td class="px-4 py-2">{res.id}</td>
                                        <td class="px-4 py-2">{res.nome}</td>
                                        <td class="px-4 py-2">
                                        <a  href={`/genero/edit?id=${res.id}`} class="bg-blue-900 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-4">Editar</a>
                                            
                                            <button
                                            onClick={() => deleteGenero(res.id)} // Chama a função de exclusão
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                                            Excluir
                                        </button>

                                        </td>
                                    </tr>
                                ))}

                            </tbody >
                        </table >
                    </div >
                </div >
            </div>
        </>
    )
}