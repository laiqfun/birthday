"use client";

import ticketImage from "@/assets/ticket.png";
import { gsap } from "gsap";
import Image from "next/image";
import { createRef, useLayoutEffect, useState } from "react";
import backgroundImage from "../assets/bg.png";
import heroImage from "../assets/hero.png";
import Button from "./Button";

export default function Banner() {
  const rootRef = createRef<HTMLDivElement>();
  const buttonGroupRef = createRef<HTMLDivElement>();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  function roll(times: number) {
    setButtonDisabled(true);
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
  return (
    <div
      className="w-full h-96 mx-12 relative bg-cover rounded-md shadow-md max-w-3xl opacity-0"
      style={{ backgroundImage: `url('${backgroundImage.src}')` }}
      ref={rootRef}
    >
      <div>
        <div id={"banner-hero"} className={"absolute"}>
          <Image width={100} height={100} src={heroImage.src} alt={"五星"} />
        </div>
      </div>
      <div
        className={
          "absolute right-0 bottom-0 translate-y-5 flex items-center px-6"
        }
        ref={buttonGroupRef}
      >
        <div className={"flex-1"}></div>
        <div className={"px-3"}>
          <Button onClick={() => roll(1)} disabled={buttonDisabled}>
            <Image
              style={{ display: "inherit" }}
              height={30}
              width={30}
              src={ticketImage.src}
              alt={"追·卡券"}
            />
            <span>x1 | 抽1次</span>
          </Button>
        </div>
        <div className={"px-3"}>
          <Button onClick={() => roll(10)} disabled={buttonDisabled}>
            <Image
              style={{ display: "inherit" }}
              height={30}
              width={30}
              src={ticketImage.src}
              alt={"追·卡券"}
            />
            <span>x10 | 抽10次</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
