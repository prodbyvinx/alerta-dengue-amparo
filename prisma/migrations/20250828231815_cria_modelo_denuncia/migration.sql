-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('PENDENTE', 'VERIFICADO', 'RESOLVIDO');

-- CreateTable
CREATE TABLE "public"."Denuncia" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT,
    "fotoUrl" TEXT,
    "status" "public"."Status" NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Denuncia_pkey" PRIMARY KEY ("id")
);
