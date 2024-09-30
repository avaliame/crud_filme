-- CreateTable
CREATE TABLE "Genero" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Filme" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "Datalancamento" TIMESTAMP(3) NOT NULL,
    "generoId" INTEGER NOT NULL,
    "diretor" TEXT NOT NULL,

    CONSTRAINT "Filme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genero_nome_key" ON "Genero"("nome");

-- AddForeignKey
ALTER TABLE "Filme" ADD CONSTRAINT "Filme_generoId_fkey" FOREIGN KEY ("generoId") REFERENCES "Genero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
