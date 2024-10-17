-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('BALCAO', 'ARMARIO', 'ACESSORIOS', 'PANELEIRO');

-- CreateTable
CREATE TABLE "collections" (
    "id" TEXT NOT NULL,
    "colors" TEXT[],
    "color_names" TEXT[],

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "furnitures" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "colocarCima" BOOLEAN NOT NULL,
    "colocarDireita" BOOLEAN NOT NULL,
    "colocarEsquerda" BOOLEAN NOT NULL,
    "tipo" TEXT NOT NULL,
    "tamanhox" INTEGER NOT NULL,
    "tamanhoy" INTEGER NOT NULL,
    "cor" TEXT NOT NULL,
    "botao" BOOLEAN NOT NULL,
    "category" "Categories" NOT NULL,
    "nomeMovel" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "collection_id" TEXT NOT NULL,

    CONSTRAINT "furnitures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "furnitures" ADD CONSTRAINT "furnitures_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
