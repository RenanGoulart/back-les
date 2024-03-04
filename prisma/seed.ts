import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const states = [
  { name: "Acre" },
  { name: "Alagoas" },
  { name: "Amapá" },
  { name: "Amazonas" },
  { name: "Bahia" },
  { name: "Ceará" },
  { name: "Distrito Federal" },
  { name: "Espírito Santo" },
  { name: "Goiás" },
  { name: "Maranhão" },
  { name: "Mato Grosso" },
  { name: "Mato Grosso do Sul" },
  { name: "Minas Gerais" },
  { name: "Pará" },
  { name: "Paraíba" },
  { name: "Paraná" },
  { name: "Pernambuco" },
  { name: "Piauí" },
  { name: "Rio de Janeiro" },
  { name: "Rio Grande do Norte" },
  { name: "Rio Grande do Sul" },
  { name: "Rondônia" },
  { name: "Roraima" },
  { name: "Santa Catarina" },
  { name: "São Paulo" },
  { name: "Sergipe" },
  { name: "Tocantins" }
]

const main = async () => {
  // create country and states
  const country = await prisma.country.create({
    data: {
      name: 'Brasil',
    }
  });

  await prisma.state.createMany({
    data: states.map(state => ({
      name: state.name,
      countryId: country.id
    }))
  });

};

main()
  .then(() => {
    prisma.$disconnect();
  })
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
  });
