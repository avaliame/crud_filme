import { PrismaClient } from '@prisma/client';
import { parse } from 'date-fns';
const prisma = new PrismaClient();


export default async function handler(req, res) {
    const method = req.method

    switch (method) {
        case 'GET':
            const { id } = req.query;

            if (id) {
                // Se houver um ID na query string, busca apenas o filme com esse ID
                const filme = await prisma.filme.findUnique({
                    where: {
                        id: parseInt(id), // Certifique-se de converter o ID para número
                    },
                    include: {
                        genero: true, // Inclui o gênero do filme
                    },
                });

                if (!filme) {
                    return res.status(404).json({ error: 'Filme não encontrado' });
                }

                res.status(200).json(filme);
            } else {
                const filme = await prisma.filme.findMany({
                    include: {
                        genero: true,
                    },
                });
                res.status(200).json(filme);
                break;
            }


        case 'POST':
            let { titulo, Datalancamento, ano, diretor, generoId } = req.body
            console.log("chegou no backend")
            console.log(Datalancamento)
            const filme = await prisma.filme.create({
                data: {
                    titulo, Datalancamento, ano, diretor, generoId,
                    include: {
                        genero: true,  // Incluir também após a criação, se quiser retornar o nome do gênero.
                    },
                }
            });
            res.status(201).json(filme);

            break;
        case 'PUT':{

            const { id } = req.query.id;
            if (!id) {
                return res.status(400).json({ error: 'ID é necessário' });
            }

            const updatedFilme = await prisma.filme.update({
                where: { id: parsrInt(id) },
                data: req.body,
            });
            res.json(updatedFilme);
            break;
        }
        case 'DELETE':{
            const id = req.query.id;
            if (!id) {
                return res.status(400).json({ error: 'ID é necessário' });
            }
            await prisma.filme.delete({
                where: { id: parseInt(id) },
            });
            res.status(204).end();
            break;
        }
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}