"use client"


export default function ClientePage() {
    return (
        <>
            <div className="bg-gray-100 h-screen flex items-center justify-center">
                <div class="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
                    <h2 class="text-2xl font-bold mb-6 text-center">Lista de Gêneros de Filmes</h2>
                    <div className=" mb-4 w-full grid justify-items-end">
                        <a className="px-2 py-2 border border-1 bg-gray-700 rounded-md text-white" href="/genero/formulario">+ Adicionar</a>
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
                                <tr class="border-b">
                                    <td class="px-4 py-2">1</td>
                                    <td class="px-4 py-2">Ação</td>
                                    <td class="px-4 py-2">
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2">Editar</button>
                                        <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2">Atualizar</button>
                                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Excluir</button>
                                    </td>
                                </tr>
                                <tr class="border-b">
                                    <td class="px-4 py-2">2</td>
                                    <td class="px-4 py-2">Comédia</td>
                                    <td class="px-4 py-2">
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2">Editar</button>
                                        <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2">Atualizar</button>
                                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Excluir</button>
                                    </td >
                                </tr >

                            </tbody >
                        </table >
                    </div >
                </div >
            </div>
        </>
    )
}