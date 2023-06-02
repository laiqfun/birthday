"use client";

import ticketImage from "@/assets/ticket.png";
import { gsap } from "gsap";
import Image from "next/image";
import { createRef, useLayoutEffect, useState } from "react";
import backgroundImage from "../assets/bg.png";
import heroImage from "../assets/hero.png";
import Button from "./Button";
import Roller from "./Roller";

const data = [
  [
    "白色的『羽毛』",
    "奇怪的『道具』",
    "『密语』",
    "(空)",
    "请看↑",
    "🕊这张卡被鸽子叼走了",
    "其实什么也没有的",
  ],
  ["追求的小秘密", "追求的帅照", "追求的画"],
  [
    "『预告：《追求的深情告白》』",
    "『预告：《归星》（追求16岁生日曲）』",
    "『预告：《寻找过去的回忆》』",
    "（歪掉了！）《追求的草稿艺术画集》",
    "（歪掉了！）追求的未发布“小曲”",
  ],
];
export default function Banner() {
  const rootRef = createRef<HTMLDivElement>();
  const buttonGroupRef = createRef<HTMLDivElement>();
  // const [buttonDisabled, setButtonDisabled] = useState(false);
  const [rollStart, setRollStart] = useState(false);
  function roll(times: 1 | 10) {
    let s3 = Math.floor(Math.random() * data[0].length);
    let s4 = Math.floor(Math.random() * data[1].length);
    let s5 = Math.floor(Math.random() * data[2].length);
    if (times == 1) {
      setCardItems([{ name: data[0][s3], star: 3, image_src: heroImage.src }]);
    }else{
      setCardItems([
        { name: data[2][s5], star: 5, image_src: heroImage.src },
        { name: data[1][s4], star: 4, image_src: heroImage.src },
        { name: data[0][0], star: 3, image_src: heroImage.src },
        { name: data[0][1], star: 3, image_src: heroImage.src },
        { name: data[0][2], star: 3, image_src: heroImage.src },
        { name: data[0][3], star: 3, image_src: heroImage.src },
        { name: data[0][4], star: 3, image_src: heroImage.src },
        { name: data[0][5], star: 3, image_src: heroImage.src },
        { name: data[0][6], star: 3, image_src: heroImage.src },
        { name: data[1][1], star: 4, image_src: heroImage.src },
      ]);
    }
    // setButtonDisabled(true);
    setRollStart(true);
  }
  useLayoutEffect(() => {
    const gsapCtx = gsap.context(() => {
      gsap.fromTo(
        rootRef.current,
        { opacity: 0, y: 50 },
        { y: 0, opacity: 1, ease: "power4", duration: 2 }
      );
      gsap.from(buttonGroupRef.current, {
        opacity: 0,
        x: -50,
        delay: 0.5,
        duration: 1,
        ease: "power4",
      });
      return () => {
        gsapCtx.revert();
      };
    }, rootRef);
  }, []);
  const [card_items, setCardItems] = useState([
    { name: "Test", star: 3, image_src: heroImage.src },
  ]);
  return (
    <div
      className="w-5/6 md:max-w-3xl h-96 md:mx-12  max-w-full mx-0 relative bg-cover rounded-md shadow-md opacity-0"
      style={{ backgroundImage: `url('${backgroundImage.src}')` }}
      ref={rootRef}
    >
      <div>
        <div className={"absolute"}>
          <Image width={100} height={100} src={heroImage.src} alt={"五星"} />
        </div>
      </div>
      <div
        className={
          "absolute -left-6 sm:left-auto -right-6 bottom-0 translate-y-5 flex items-center"
        }
        ref={buttonGroupRef}
      >
        <div className={"px-1 sm:w-auto w-full flex"}>
          <Button onClick={() => roll(1)} disabled={rollStart}>
            <Image
              className="inline"
              height={24}
              width={24}
              src={ticketImage.src}
              alt={"追·卡券"}
            />
            <span>
              x1 <span className={"text-gray-400 text-lg"}>|</span>{" "}
              <span className="mx-3">抽1次</span>{" "}
            </span>
          </Button>
        </div>
        <div className={"px-1 sm:w-auto w-full flex"}>
          <Button onClick={() => roll(10)} disabled={rollStart}>
            <Image
              className="inline"
              height={24}
              width={24}
              src={ticketImage.src}
              alt={"追·卡券"}
            />
            <span>
              x10 <span className={"text-gray-400 text-lg"}>|</span>{" "}
              <span className="mx-3">抽10次</span>{" "}
            </span>
          </Button>
        </div>
      </div>
      {rollStart ? (
        <Roller items={card_items} onClose={() => setRollStart(false)} />
      ) : null}
    </div>
  );
}
