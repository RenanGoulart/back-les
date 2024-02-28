-- CreateEnum
CREATE TYPE "PhoneType" AS ENUM ('FIXO', 'CELULAR');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MASCULINO', 'FEMININO', 'NAO_INFORMADO');

-- CreateEnum
CREATE TYPE "CardBrand" AS ENUM ('VISA', 'MASTERCARD', 'AMERICAN_EXPRESS', 'DISCOVER', 'DINERS_CLUB', 'JCB', 'MAESTRO', 'ELO', 'HIPERCARD', 'OUTRO');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('COBRANCA', 'ENTREGA');

-- CreateEnum
CREATE TYPE "StreetAddressType" AS ENUM ('RUA', 'AVENIDA', 'TRAVESSA', 'ALAMEDA', 'ESTRADA', 'OUTRO');

-- CreateEnum
CREATE TYPE "ResidenceType" AS ENUM ('CASA', 'APARTAMENTO', 'CHACARA', 'CONDOMINIO', 'OUTRO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "ddd" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "phoneType" "PhoneType" NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCard" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "cardHolder" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "cardBrand" "CardBrand" NOT NULL,

    CONSTRAINT "CreditCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "residence" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "addressType" "AddressType" NOT NULL,
    "streetAdressType" "StreetAddressType" NOT NULL,
    "residenceType" "ResidenceType" NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
