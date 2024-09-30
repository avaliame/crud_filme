"use client"


export default function ClientePage() {
    return (    
    <body class="bg-gray-100 h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 class="text-2xl font-bold mb-6 text-center">Inserir Novo Filme</h2>
            <form>
                <!-- Campo Título -->
                <div class="mb-4">
                    <label for="titulo" class="block text-gray-700 text-sm font-bold mb-2">Título do Filme:</label>
                    <input id="titulo" type="text" name="titulo" placeholder="Digite o título do filme" class="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500">
                </div>
                <!-- Campo Ano -->
                <div class="mb-4">
                    <label for="ano" class="block text-gray-700 text-sm font-bold mb-2">Ano de Produção:</label>
                    <input id="ano" type="number" name="ano" placeholder="Digite o ano" class="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500">
                </div>
                <!-- Campo Data de Lançamento -->
                <div class="mb-4">
                    <label for="data_lancamento" class="block text-gray-700 text-sm font-bold mb-2">Data de Lançamento:</label>
                    <input id="data_lancamento" type="date" name="data_lancamento" class="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500">
                </div>
                <!-- Campo Diretor -->
                <div class="mb-4">
                    <label for="diretor" class="block text-gray-700 text-sm font-bold mb-2">Diretor:</label>
                    <input id="diretor" type="text" name="diretor" placeholder="Digite o nome do diretor" class="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500">
                </div>
                <!-- Campo Gênero -->
                <div class="mb-4">
                    <label for="genero" class="block text-gray-700 text-sm font-bold mb-2">Gênero:</label>
                    <select id="genero" name="genero" class="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500">
                        <option value="">Selecione o gênero</option>
                        <option value="acao">Ação</option>
                        <option value="comedia">Comédia</option>
                        <option value="drama">Drama</option>
                        <option value="terror">Terror</option>
                        <option value="sci-fi">Ficção Científica</option>
                        <option value="aventura">Aventura</option>
                    </select>
                </div>
                {<!-- Botão de Enviar -->}
                <div class="flex justify-center">
                    <button type="submit" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"> Inserir Filme </button>
                </div>
            </form>
        </div>
    </body>
    
    )
}