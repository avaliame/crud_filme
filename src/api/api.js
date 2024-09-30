import { PrismaClient } from '@prisma/client';
import { useState, useEffect } from 'react'

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':

      // Lógica para buscar filmes e gêneros
      const filmes = await prisma.filme.findMany();
      res.status(200).json(filmes);
      break;

    case 'POST':
      // Lógica para criar um novo filme ou gênero
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
      if (req.query.genero) {
        const genero = await prisma.genero.findMany();
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
