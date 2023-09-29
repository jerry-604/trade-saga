import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
        name: "Person 1"
    },
  });
  await prisma.user.create({
    data: {
        name: "Person 2"
    },
  });
  await prisma.user.create({
    data: {
        name: "Person 3"
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });