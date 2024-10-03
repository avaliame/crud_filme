"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function ClientePage() {
    const [data, setData] = useState([]);
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        fetchGeneros(); // Função para buscar gêneros
    }, []);

    const fetchGeneros = () => {
        axios.get("/api/genero")
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                setMensagem('Erro ao carregar os gêneros.');
            });
    };

    const deleteGenero = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este gênero?")) {
            try {
                await axios.delete(`/api/genero?id=${id}`);
                fetchGeneros(); // Atualiza a lista de gêneros após exclusão
                setMensagem('Gênero excluído com sucesso!');
            } catch (error) {
                console.log(error);
                setMensagem('Não é possível excluir o gênero, pois ele está sendo utilizado em outros registros.');
            }
        }
    };

    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Lista de Gêneros</h2>
                {mensagem && <p className="text-center text-red-500 mb-4">{mensagem}</p>}

                <div className="mb-4 w-full grid justify-items-end">
                    <a className="px-2 py-2 border border-1 bg-gray-700 rounded-md text-white" href="/genero/formulario">+ Adicionar</a>
                </div>

                <div className="mb-4 w-full grid justify-items-end">
                    <a href="/" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Página inicial</a>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Gênero</th>
                                <th className="px-4 py-2 text-left">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((res) => (
                                <tr key={res.id} className="border-b">
                                    <td className="px-4 py-2">{res.id}</td>
                                    <td className="px-4 py-2">{res.nome}</td>
                                    <td className="px-4 py-2">
                                        <a href={`/genero/edit?id=${res.id}`} className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-4">Editar</a>
                                        <button
                                            onClick={() => deleteGenero(res.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
