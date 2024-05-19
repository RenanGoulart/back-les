/*
  Warnings:

  - Added the required column `costPrice` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "costPrice" DOUBLE PRECISION NOT NULL;
