import { PrismaClient } from "@prisma/client";
import ActionButton from "./ActionButton";

export default function ApiDemo() {
  return (
    <div className="h-full w-full flex-grow flex justify-center items-center text-white">
      <div className="p-8 bg-slate-900 rounded">
        <p className="text-2xl">API Demo Page</p>
        <p className="text-red-600">
          此处会直接影响到数据库（没有身份验证），仅用于测试
        </p>
        <div className="border-dashed border-red-300 border m-2">
          <ActionButton
            action={async () => {
              "use server";
              console.log("ServerAction触发成功");
              await new Promise((r) => setTimeout(r, 1e3));
            }}
          >
            触发ServerAction(1s)
          </ActionButton>
          <ActionButton
            action={async () => {
              "use server";
              const prisma = new PrismaClient();
              await prisma.$connect();
              const user = await prisma.user.create({
                data: {
                  nickname: `RandomUser${Math.random() * 1e8}`,
                  password: "PASSWORD",
                },
              });
              await prisma.$disconnect();
              return user;
            }}
          >
            创建随机昵称用户
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
