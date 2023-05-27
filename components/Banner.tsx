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
  const [rollStart, setRollStart] = useState(false);
  function roll(times: 1|10) {
    setButtonDisabled(true);
    setRollStart(true)
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
          <Button onClick={() => roll(1)} disabled={buttonDisabled}>
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
          <Button onClick={() => roll(10)} disabled={buttonDisabled}>
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
    </div>
  );
}
