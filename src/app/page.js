"use client"

export default function Home() {
  return (
    <div>
      <div className="bg-gray-100 h-screen flex items-center justify-center">
                <div class="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
                <h2 class="text-2xl font-bold mb-6 text-center">Filmes</h2>
                    <div className=" mb-4 w-full grid justify-items-center">
                       <a className="px-2 py-2 border border-1 bg-red-600 rounded-md text-white" href="/genero/formulario">+ Cadastrar Genero</a>
                    </div>

                    <div className=" mb-4 w-full grid justify-items-center">
                        <a className="px-2 py-2 border border-1 bg-blue-700 rounded-md text-white" href="/genero">+ Listar Genero</a>
                    </div>

                    <div className=" mb-4 w-full grid justify-items-center">
                        <a className="px-2 py-2 border border-1 bg-green-700 rounded-md text-white" href="/filme/formulario">+ Cadastrar Filme</a>
                    </div>

                    <div className=" mb-4 w-full grid justify-items-center">
                        <a className="px-2 py-2 border border-1 bg-yellow-500 rounded-md text-white" href="/filme">+ Listar Filmes</a>
                    </div>
                </div>                
      </div>                
    </div>
  );
}