-- CreateEnum
CREATE TYPE "PricingGroup" AS ENUM ('EDICAO_ESPECIAL', 'EDICAO_LIMITADA', 'EDICAO_NORMAL');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ROCK', 'POP', 'HIP_HOP', 'MPB', 'BLUES', 'FUNK', 'REGGAE');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "producer" TEXT NOT NULL,
    "numberOfTracks" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "pricingGroup" "PricingGroup" NOT NULL,
    "categories" "Category"[],
    "barCode" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
