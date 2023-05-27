"use client";
import { gsap } from "gsap";
import Image from "next/image";
import React, { createRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import closeButton from "../assets/close.png";
import Button from "./Button";
export default function Dialog({
  isShow,
  backdropCloseable = true,
  onClose = () => {},
  children,
  title = "",
  onButtonClick = () => {
    onClose();
  },
  buttons = ["取消"],
  disableButtons = false,
}: {
  isShow: boolean;
  backdropCloseable?: boolean;
  onClose(): unknown;
  children?: React.ReactNode;
  title?: string;
  onButtonClick?(index: number): unknown;
  buttons?: String[];
  disableButtons?: boolean;
}) {
  const rootRef = createRef<HTMLDivElement>();
  const containerRef = createRef<HTMLDivElement>();

  useLayoutEffect(() => {
    const gsapCtx = gsap.context(() => {
      gsap.to(
        containerRef.current,
        isShow
          ? {
              y: 0,
              opacity: 1,
              ease: "power4",
              duration: 0.5,
            }
          : {
              y: 50,
              opacity: 0,
              ease: "power4",
              duration: 0.5,
            }
      );
    }, rootRef);
    return () => {
      // gsapCtx.revert();
    };
  }, [isShow]);
  return createPortal(
    <div
      ref={rootRef}
      onClick={() => backdropCloseable && onClose()}
      className="
      flex h-screen w-screen fixed backdrop-blur bg-black bg-opacity-20 duration-300
      justify-center items-center z-10
      "
      style={{
        pointerEvents: isShow ? "all" : "none",
        opacity: isShow ? 1 : 0,
      }}
    >
      <div
        onClick={(ev) => ev.stopPropagation()}
        ref={containerRef}
        className="
      flex flex-col
      w-96
      h-48
      max-w-lg
      bg-white
      rounded-tl-lg rounded-br-lg
      shadow-lg
      "
      >
        <div className="p-2 flex items-center">
          <span className="flex-1">{title}</span>
          <Image
            src={closeButton.src}
            width={20}
            className="cursor-pointer hover:hue-rotate-30"
            alt={"关闭"}
            height={20}
            onClick={onClose}
          />
        </div>
        <div className="flex-1 p-4">{children}</div>
        <div className="bg-gray-300 w-full h-12 items-center flex justify-center rounded-br-lg">
          {buttons.map((v, i) => (
            <Button
              key={i}
              onClick={() => onButtonClick(i)}
              disabled={disableButtons}
            >
              {v}
            </Button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
