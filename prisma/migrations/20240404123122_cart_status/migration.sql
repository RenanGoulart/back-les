/*
  Warnings:

  - Added the required column `status` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CartStatus" AS ENUM ('ABERTO', 'FECHADO');

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "status" "CartStatus" NOT NULL;
