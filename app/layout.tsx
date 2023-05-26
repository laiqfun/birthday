import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lai追求的16岁生日特别网站',
  description: '我的16岁生日一定要搞一个“大”的，搞什么好呢🤔，对了就是一个抽卡网站！(●ˇ∀ˇ●)！',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
