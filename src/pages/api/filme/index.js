import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default async function handler(req, res) {
    const method = req.method

    switch (method) {
        case 'GET':
            const data = await prisma.filme.findMany();
            res.status(200).json(data);
            break;

        case 'POST':
            let { titulo, Datalancamento, ano, diretor, generoId } = req.body
            console.log("chegou no backend")
            console.log(Datalancamento)
            const filme = await prisma.filme.create({ data: { titulo, Datalancamento, ano, diretor, generoId } });
            res.status(201).json(filme);

            break;
        case 'PUT':
            const updatedFilme = await prisma.filme.update({
                where: { id: parseInt(req.query.id) },
                data: req.body,
            });
            res.json(updatedFilme);
            break;

        case 'DELETE':
            await prisma.filme.delete({
                where: { id: parseInt(req.query.id) },
            });
            res.status(204).end();
            break;

        case 'GET':
            if (req.query.filme) {
                const genero = await prisma.filme.findMany();
                res.json(genero);
            } else {
                const filmes = await prisma.filme.findMany();
                res.status(200).json(filmes);
            }
            break;

        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}