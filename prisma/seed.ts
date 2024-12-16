import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a user with Google Auth fields
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "Test User",
      emailVerified: new Date(),
      image: "https://example.com/placeholder.jpg",
    },
  });

  console.log("User created:", user);

  // Create some tags
  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        name: "Personal",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Work",
      },
    }),
  ]);

  console.log("Tags created:", tags);

  // Create notebooks for the user with tags
  const notebook1 = await prisma.notebook.create({
    data: {
      title: "My First Notebook",
      content: "Welcome to my first notebook! This is where I'll store my thoughts and ideas.",
      isPublic: false,
      userId: user.id,
      tags: {
        connect: [{ id: tags[0].id }], // Connect to "Personal" tag
      },
    },
  });

  const notebook2 = await prisma.notebook.create({
    data: {
      title: "Work Projects",
      content: "A place to keep track of all my work-related projects and notes.",
      isPublic: false,
      userId: user.id,
      tags: {
        connect: [{ id: tags[1].id }], // Connect to "Work" tag
      },
    },
  });

  console.log("Notebooks created:", notebook1, notebook2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });