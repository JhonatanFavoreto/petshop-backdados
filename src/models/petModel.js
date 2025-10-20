//é no model que fazemos a consulta para o banco de dados
//ex: SELECT * FROM bruxos; porém estamos usando o PRISMA
// que abstrai o comando SQL

// importar o Prisma Client gerado em src/generated/prisma
// (o schema.prisma define output customizado para ../src/generated/prisma)
import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

// Crio a variavel findAll e já exporto
export const findAll = async () => {
  // SELECT * FROM bruxos = findMany
  // Model no Prisma: pets (conforme schema.prisma)
  return await prisma.pets.findMany({
    orderBy: { nome: "asc" },
  });
};

// Crio a variavel findById e já exporto
export const findById = async (id) => {
  return await prisma.pets.findUnique({
    where: { id: Number(id) },
  });
}