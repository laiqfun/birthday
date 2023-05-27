"use client";
import ticketImage from "@/assets/ticket.png";
import Banner from "@/components/Banner";
import Button from "@/components/Button";
import CDKEYDialog from "@/components/CDKEYDialog";
import GetTicketDialog from "@/components/GetTicketDialog";
import PillLabel from "@/components/PillLabel";
import { User } from "@prisma/client";
import { useState } from "react";

export default function Home() {
  const [showCDKEYDialog, setShowCDKEYDialog] = useState(false);
  const [showGetTicketDialog, setShowGetTicketDialog] = useState(false);
  const [user, setUser] = useState<User>();
  function getTicket(k: number) {
    setShowGetTicketDialog(false)
    if(k==0){
      //创建账号
    }else if(k==1){
      //使用兑换码
    }else{
      //答题
      alert("答题八成要鸽")
    }
  }

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
            <PillLabel
              icon={ticketImage.src}
              alt="『追·卡券』"
              onClick={() => setShowGetTicketDialog(true)}
            />
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
      <GetTicketDialog
        isShow={showGetTicketDialog}
        onClose={() => setShowGetTicketDialog(false)}
        onClick={getTicket}
      ></GetTicketDialog>
    </main>
  );
}
