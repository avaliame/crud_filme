import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default async function handler(req, res) {
    const method = req.method

    switch (method) {
        case 'GET':
            // Lógica para buscar filmes e gêneros
            const data = await prisma.genero.findMany();
            res.status(200).json(data);
            break;

        case 'POST':
            let { nome } = req.body
            console.log("chegou no backend")
            const genero = await prisma.genero.create({ data: { nome } });
            res.status(201).json(genero);

            break;
        case 'PUT':
            const updatedGenero = await prisma.genero.update({
                where: { id: parseInt(req.query.id) },
                data: req.body,
            });
            res.json(updatedGenero);
            break;

        case 'DELETE':
            const id = parseInt(req.query.id);
            if (!id) {
                return res.status(400).json({ error: 'ID é necessário' });
            }
            await prisma.genero.delete({
                where: { id: id },
            });
            res.status(204).end();
            break;

        case 'GET':
            if (req.query.genero) {
                const genero = await prisma.genero.findMany();
                res.json(genero);
            } else {
                const genero = await prisma.genero.findMany();
                res.status(200).json(genero);
            }
            break;

        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}