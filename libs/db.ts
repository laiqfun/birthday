"use server";
import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient | null;
let disconnectClock: NodeJS.Timeout;

// 数据库休眠时间
// 每次获取client实例都会重置计时，若超出休眠时间，则断开数据库连接
// 实际应用体现为，在短时间内多次获取client将会降低延迟，首次获取延迟较大
let DB_SLEEP_TIME = 10e3;
export async function getPrismaClient() {
  "use server";
  clearTimeout(disconnectClock);
  if (!prismaClient) {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
    console.log("[db] created client");
  } else {
    console.log("[db] reused client");

    disconnectClock = setTimeout(async () => {
      if (!prismaClient) return;
      console.log("[db] sleep");
      await prismaClient!.$disconnect();
      prismaClient = null;
    }, DB_SLEEP_TIME);
  }
  return prismaClient!;
}
