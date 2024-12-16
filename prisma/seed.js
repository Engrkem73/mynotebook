const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create a user with Google Auth fields
  const user = await prisma.user.create({
    data: {
      email: "kjbb73@gmail.com",
      name: "kjbb73",
      emailVerified: new Date(),
      image: "https://example.com/placeholder.jpg",
    },
  });

  console.log("User created:", user);

  // Create some tags
  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        name: "Personal Notes",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Work Notes",
      },
    }),
  ]);

  console.log("Tags created:", tags);

  // Create a notebook with tags
  const notebook = await prisma.notebook.create({
    data: {
      title: "Welcome to MyNotebook",
      content: "This is your first notebook! Feel free to edit or delete it.",
      userId: user.id,
      tags: {
        connect: [{ id: tags[0].id }],
      },
    },
  });

  console.log("Notebook created:", notebook);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
