-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ATIVO', 'INATIVO');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'ATIVO',
ADD COLUMN     "statusReason" TEXT;
