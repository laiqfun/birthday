import localFont from "next/font/local";
import "./globals.css";

const HanYiQiHeiFont = localFont({
  src: "../assets/HanYiQiHei-65Jian-Regular-2.ttf",
  preload: true,
});
export const metadata = {
  title: "Lai追求的16岁生日特别网站",
  description:
    "我的16岁生日一定要搞一个“大”的，搞什么好呢🤔，对了就是一个抽卡网站！(●ˇ∀ˇ●)！",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={HanYiQiHeiFont.className + " flex w-full h-full"}>
        {children}
      </body>
    </html>
  );
}
