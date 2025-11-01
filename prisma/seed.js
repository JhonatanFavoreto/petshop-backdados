// Usar o client gerado diretamente (o generator no schema grava em ../src/generated/prisma)
// Importa o arquivo index.js gerado (ESM requer caminho com extensão)
import { PrismaClient } from '../src/generated/prisma/index.js';
import { faker } from '@faker-js/faker/locale/pt_BR';

const prisma = new PrismaClient();

const NUM_PETS = 80;

function createFakePet(index) {
  const especieOptions = ['Cachorro', 'Gato', 'Pássaro', 'Hamster', 'Peixe', 'Coelho', 'Tartaruga', 'Ferret', 'Reptil'];
  const especie = faker.helpers.arrayElement(especieOptions);

  let nome;
  if (especie === 'Cachorro') {
    nome = `${faker.word.adjective({ length: { min: 3, max: 8 } })} ${faker.person.firstName()}`;
  } else if (especie === 'Gato') {
    nome = `${faker.word.noun({ length: { min: 4, max: 8 } })}`;
    nome = nome.charAt(0).toUpperCase() + nome.slice(1);
  } else if (especie === 'Peixe') {
    nome = `${faker.word.adjective()}-${faker.word.noun()}`;
  } else {
    nome = faker.person.firstName();
  }

  nome = `${nome} ${index + 1}`;

  return {
    nome: nome,
    especie: especie,
    idade: faker.number.int({ min: 1, max: 20 }),
    dono: faker.person.fullName(),
  };
}

async function main() {
  console.log('Iniciando o seeding de dados (tema: PetShop)...');

  await prisma.pets.deleteMany();
  console.log('Tabela pets limpa.');

  const petsData = Array.from({ length: NUM_PETS }, (_, i) => createFakePet(i));

  try {
    const result = await prisma.pets.createMany({
      data: petsData,
      skipDuplicates: true,
    });

    console.log(`✅ Seeding concluído. ${result.count} pets foram criados na tabela 'pets'.`);
  } catch (error) {
    console.error('❌ Erro durante o seeding:', error);
  } finally {
    await prisma.$disconnect();
    console.log('Prisma desconectado.');
  }
}

main();