"use client";
import cake1Image from "@/assets/cake-1.png";
import cake6Image from "@/assets/cake-6.png";
import cakeFImage from "@/assets/cake-fire.png";
import cakeImage from "@/assets/cake.png";
import ticketImage from "@/assets/ticket.png";
import Banner from "@/components/Banner";
import Button from "@/components/Button";
import CDKEYDialog from "@/components/CDKEYDialog";
import GetTicketDialog from "@/components/GetTicketDialog";
import GetPayDialog from "@/components/PayDialog";
import PillLabel from "@/components/PillLabel";
import { User } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [showContent,setShowContent] = useState(false);
  useEffect(()=>{
    setTimeout(()=>{
      setShowContent(true);
    },2000)
  })

  const [showCDKEYDialog, setShowCDKEYDialog] = useState(false);
  const [showGetTicketDialog, setShowGetTicketDialog] = useState(false);
  const [showBagDialog, setShowBagDialog] = useState(false);
  const [showPayDialog, setShowPayDialog] = useState(false);
  const [cd,setCD] = useState(2);
  const [user, setUser] = useState<User>();
  function openBag(){
    setShowBagDialog(true);
    setTimeout(()=>setShowBagDialog(false),2000);
  }
  function getTicket(k: number) {
    if(k!=2)setShowGetTicketDialog(false);
    if(k==0){
      setShowPayDialog(true);
    }else if(k==1){
      setShowCDKEYDialog(true);
    }else if(k==2){
      if(cd>0){
        alert("啊哦，这个功能被『鸽子』破坏了！")
        setCD(cd-1);
      }else{
        alert("这个按钮被你按坏了")
      }
    }else{
      //+648券
    }
  }

  return (<>
    {showContent?<main className={"flex flex-col w-screen h-screen"}>
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
      {/* <div className={"px-6"}>token</div> */}
      <div className={"flex-1"}></div>
      <div className={"px-6"}>
        <div className={"absolute bottom-12 right-6 duration-100 ease-in-out bg-white rounded shadow p-3"} style={{transform:`scale(${showBagDialog?'1':'0'}) translateX(${showBagDialog?'0':'10px'})`}}>这个功能被一股莫名的力量消灭了……</div>
        <div className={"cursor-pointer"} onClick={openBag}>背包</div>
      </div>
    </div>

    <CDKEYDialog
      isShow={showCDKEYDialog}
      onClose={() => setShowCDKEYDialog(false)}
    ></CDKEYDialog>
    <GetPayDialog
      isShow={showPayDialog}
      onClose={() => setShowPayDialog(false)}
    ></GetPayDialog>
    <GetTicketDialog
      isShow={showGetTicketDialog}
      onClose={() => setShowGetTicketDialog(false)}
      onClick={getTicket}
    ></GetTicketDialog>
    {/* <Bag isShow={showBagDialog} onClose={()=>setShowBagDialog(false)}></Bag> */}
  </main>:<div className={"flex inset-0"}>
    <div className={"absolute top-0 left-0 right-0 bottom-1/2 bg-white"}></div>
    <div className={"absolute bottom-0 left-0 right-0 top-1/2 bg-black"}></div>
    <div className={"absolute top-[30vh] left-0 right-0 leading-[20vh] text-black text-center text-[5vh]"}>
      <h1>真糟糕！</h1>
    </div>
    <div className={"absolute bottom-[30vh] left-0 right-0 leading-[20vh] text-white text-center text-[5vw]"}>
      <h1>网站被『鸽子』叼走了一半</h1>
    </div>
    <div className={"absolute bottom-0 left-0 right-0 h-[220px]"}>
      <div className={"absolute left-1/2 -ml-[100px]"}>
        <Image width={200} height={200} alt={"蛋糕"} src={cakeImage}/>
      </div>
      <div className={"absolute left-1/2 -ml-[50px]"}>
        <Image width={60} height={60} alt={"蛋糕“1”蜡烛"} src={cake1Image}/>
      </div>
      <div className={"absolute right-1/2 -mr-[50px]"}>
        <Image width={60} height={60} alt={"蛋糕“6”蜡烛"} src={cake6Image}/>
      </div>
      <div className={"absolute left-1/2 -ml-[50px] -mt-[30px]"}>
        <Image width={60} height={60} alt={"蛋糕火焰"} src={cakeFImage}/>
      </div>
      <div className={"absolute right-1/2 -mr-[50px] -mt-[30px]"}>
        <Image width={60} height={60} alt={"蛋糕火焰"} src={cakeFImage}/>
      </div>
    </div>
    </div>}</>
  );
}
