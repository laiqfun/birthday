"use server";

import { getPrismaClient } from "./db";

export async function applyServerAction(
  key: string
): Promise<boolean | string> {
  "use server";
  if (!key) return "兑换码无效";
  const prisma = await getPrismaClient();
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
  if (error) {
    return error;
  } else {
    return true;
  }
}
