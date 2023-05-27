"use server";

import { PrismaClient } from "@prisma/client";

export async function applyServerAction(
  key: string
): Promise<boolean | string> {
  "use server";
  await new Promise((r) => setTimeout(r, 1e3)); // 模拟加载
  const prisma = new PrismaClient();
  await prisma.$connect();
  const cdkey = await prisma.cdkey.findFirst({
    where: {
      content: key,
    },
  });
  let error = "";
  if (cdkey) {
    if (cdkey?.used) error = "兑换码已被使用";
    else {
      await prisma.cdkey.update({
        where: {
          content: key,
        },
        data: {
          used: true,
          useTime: new Date(),
        },
      });
      // TODO: 增加user.money
      // await prisma.user.update({})
    }
  } else error = "兑换码无效";
  prisma.$disconnect();
  if (error) {
    return error;
  } else {
    return true;
  }
}
