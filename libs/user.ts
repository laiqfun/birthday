"use server";
import { getPrismaClient } from "./db";

export async function getUserById(id: number) {
  const prisma = await getPrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  console.log(user);
  return user;
}
