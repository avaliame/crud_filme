import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



export default async function handler(req, res) {
    const method = req.method

    switch (method) {
        case 'GET':
            const { id } = req.query;
            
            if (id) {
                const genero = await prisma.genero.findUnique({
                    where: { id: parseInt(id) },
                });
                if (!genero) {
                    return res.status(404).json({ error: 'Gênero não encontrado' });
                }
                return res.status(200).json(genero);
            }

            const genero = await prisma.genero.findMany();
            return res.status(200).json(genero);

        break;

        case 'POST':{
            let { nome } = req.body
            console.log("chegou no backend")
            const genero = await prisma.genero.create({ data: { nome } });
            res.status(201).json(genero);

        break;
        }
        case 'PUT':{
            
            const { id: updateId } = req.query;
            const updatedGenero = await prisma.genero.update({
                where: { id: parseInt(updateId) },
                data: { nome: req.body.nome },
            });
            return res.status(200).json(updatedGenero);
            break;
        }

        case 'DELETE':{
            const id = parseInt(req.query.id);
            if (!id) {
                return res.status(400).json({ error: 'ID é necessário' });
            }
            await prisma.genero.delete({
                where: { id: id },
            });
            res.status(204).end();
            break;
        }

        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}