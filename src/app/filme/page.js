"use client"

import axios from "axios"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function ClientePage() {
	
	const [data, setData] = useState([]);
    useEffect(() => {
		fetchFilmes(); // Função para buscar filmes
    }, []);
	
	const editFilme = (id) => {
		window.location.href = `/filme/edit?id=${id}`;
	};

	const fetchFilmes = () => {
        axios.get("/api/filme").then((response) => {
            setData(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    };

	const deleteFilme = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este filme?")) {
            try {
                await axios.delete(`/api/filme?id=${id}`);
                fetchFilmes(); // Atualiza a lista de filmes após exclusão
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (

		<div className="bg-gray-100 h-screen flex items-center justify-center">
			<div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold mb-6 text-center">Lista de Filmes</h2>
				<div className=" mb-4 w-full grid justify-items-end">
				<a className="px-2 py-2 border border-1 bg-gray-700 rounded-md text-white" href="/filme/formulario">+ Adicionar</a>
				</div>
				<div className="overflow-x-auto">
					<table class="min-w-full table-auto">
						<thead>
							<tr class="bg-gray-200 text-gray-700">
								<th class="px-4 py-2 text-left">ID</th>
								<th class="px-4 py-2 text-left">Título</th>
								<th class="px-4 py-2 text-left">Ano</th>
								<th class="px-4 py-2 text-left">Data de Lançamento</th>
								<th class="px-4 py-2 text-left">Diretor</th>
								<th class="px-4 py-2 text-left">Gênero</th>
								<th class="px-4 py-2 text-left">Opções</th>
							</tr>
						</thead>
						<tbody>
										{data?.map((res) => (
											<tr key={res.id} class="border-b">
												<td class="px-4 py-2">{res.id}</td>
												<td class="px-4 py-2">{res.titulo}</td>
												<td class="px-4 py-2">{res.ano}</td>
												<td class="px-4 py-2">{res.Datalancamento}</td>
												<td class="px-4 py-2">{res.diretor}</td>
												<td class="px-4 py-2">{res.genero.nome}</td>
												<td class="px-4 py-2">
													<a  href={`/filme/edit?id=${res.ano}`} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2">Editar</a>
													
													<button
                                            onClick={() => deleteFilme(res.id)} // Chama a função de exclusão
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                                            Excluir
                                        </button>
												</td>
											</tr>
										))}

									</tbody >
					</table>
				</div>
			</div>
		</div>

    )
}