"use client";
import ticketImage from "@/assets/ticket.png";
import Banner from "@/components/Banner";
import Button from "@/components/Button";
import CDKEYDialog from "@/components/CDKEYDialog";
import { User } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [showCDKEYDialog, setShowCDKEYDialog] = useState(false);
  const [user, setUser] = useState<User>();

  return (
    <main className={"flex flex-col w-screen h-screen"}>
      <div id={"headline"}>
        <h1>✨生日活动</h1>
        <p>『抽卡的快乐』</p>
        <p>user:{user && user.nickname}</p>
      </div>
      <div className={"flex items-center h-14 pr-2"}>
        <div className={"flex-1"}></div>
        <div className={"w-80 flex items-center"}>
          <div className={"flex-1"}></div>
          <div className={"px-1"}>
            <Button onClick={() => setShowCDKEYDialog(true)}>兑换码</Button>
          </div>
          <div className={"px-1"}>
            <div id={"ticket"}>
              <div>
                <Image fill src={ticketImage.src} alt={"追·卡券"} />
              </div>
              <span>7</span>
              <button onClick={() => {}}>+</button>
            </div>
          </div>
        </div>
      </div>
      <div className={"flex-1 flex items-center justify-center"}>
        <Banner />
      </div>
      <div className={"flex items-center p-6"}>
        <div className={"px-6"}>token</div>
        <div className={"flex-1"}></div>
        <div className={"px-6"}>
          <div id={"bag"}>背包</div>
        </div>
      </div>

      <CDKEYDialog
        isShow={showCDKEYDialog}
        onClose={() => setShowCDKEYDialog(false)}
      ></CDKEYDialog>
    </main>
  );
}
