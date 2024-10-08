
import axios from 'axios';  // Importa axios para fazer requisições externas
import { PrismaClient } from '@prisma/client';  // Importa Prisma para interagir com o banco de dados
const prisma = new PrismaClient();

export default async function handler(req, res) {
    //  const { generoId } = req.body;  // Recebe o ID do gênero para associar os filmes carregados

    // Faz uma requisição à OMDb API buscando filmes de ação



    const method = req.method

    switch (method) {
        case 'GET':
            const response =  axios.get('http://www.omdbapi.com/?apikey=');
            //const filmes = response.data.Search;  // Extrai os filmes da resposta da API
            res.json(response.data);
        break
    }
    //console.log(response.data)

    // Para cada filme obtido, cria um registro no banco de dados
    // await Promise.all(
    // filmes.map(async (filme) => {
    //      await prisma.filme.create({
    //        data: {
    //        titulo: filme.Titulo,
    //          ano: parseInt(filme.ano),
    //          Datalancamento: new Date(),  // Definindo a data atual como data de lançamento


    //          generoId: generoId,  // Associa o filme ao gênero selecionado
    //          diretor: 'Unknown',  // OMDb nem sempre fornece o diretor
    //        },
    //      });
    //    })
    //  );

    // Responde que os filmes foram carregados com sucesso
}

