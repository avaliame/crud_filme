
// pages/edit/[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import FormFilme from '../../components/FormFilme';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function EditFilme() {
  const router = useRouter();
  const { id } = router.query;
  const [filme, setFilme] = useState(null);

  useEffect(() => {
    const fetchFilme = async () => {
      const fetchedFilme = await prisma.filme.findUnique({
        where: { id: parseInt(id) },
      });
      setFilme(fetchedFilme);
    };
    if (id) fetchFilme();
  }, [id]);

  return (
    <div>
      <h1>Editar Filme</h1>
      {filme && <FormFilme initialData={filme} />}
    </div>
  );
}