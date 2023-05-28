import starImage from "@/assets/StarBig.png";
import gsap from "gsap";
import Image from "next/image";
import { createRef, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
export default function Roller({
  items,
  onClose,
}: {
  items: {
    star: number;
    name: string;
    image_src: string;
  }[];
  onClose(): unknown;
}) {
  const cardRef = createRef<HTMLDivElement>();
  const cardInfoRef = createRef<HTMLDivElement>();
  const starRef = createRef<HTMLDivElement>();
  const bigStarRef = createRef<HTMLDivElement>();
  const [cardKey, setCardKey] = useState(0);
  const [showList, setShowList] = useState(false);
  const [playing, setPlaying] = useState(false);
  const tl = gsap.timeline();
  useLayoutEffect(() => {
    playCardAni();
  }, []);
  function nextCard() {
    if (playing) return;
    if (cardKey + 1 >= items.length) {
      setShowList(true);
    } else {
      setCardKey(cardKey + 1);
      console.log(cardKey);
      playCardAni();
    }
  }
  function playCardAni() {
    setPlaying(true);
    console.log(cardKey, items);
    if (items[cardKey].star >= 5) {
      tl.fromTo(
        starRef.current,
        {
          display: "flex",
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        }
      )
        .fromTo(
          bigStarRef.current,
          {
            y: 80,
          },
          {
            y: 0,
            delay: -0.3,
          }
        )
        .to(starRef.current, {
          opacity: 0,
          scale: 0.5,
          delay: 1,
        })
        .to(starRef.current, { display: "none", duration: 0.01 })
        .fromTo(
          cardRef.current,
          {
            opacity: 0,
            scale: 6,
          },
          {
            opacity: 1,
            scale: 1,
            ease: "expo.out",
          }
        )
        .fromTo(
          cardInfoRef.current,
          {
            x: "40%",
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
          }
        )
        .then(() => {
          setPlaying(false);
        });
    } else {
      tl.fromTo(
        cardRef.current,
        {
          opacity: 0,
          scale: 6,
        },
        {
          opacity: 1,
          scale: 1,
          ease: "expo.out",
        }
      )
        .fromTo(
          cardInfoRef.current,
          {
            x: "40%",
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
          }
        )
        .then(() => {
          setPlaying(false);
        });
    }
  }
  return createPortal(
    <div
      className={
        "fixed inset-0 z-30 bg-slate-100 flex items-center justify-center"
      }
      onClick={nextCard}
    >
      {showList ? (
        <div>
          <button onClick={onClose}>退出</button>
        </div>
      ) : (
        <div onClick={(e) => e.stopPropagation()}>
          <div
            ref={starRef}
            className={
              "absolute inset-0 z-50 hidden items-center justify-center"
            }
          >
            <Image src={starImage.src} width={50} height={50} alt={"star"} />
            <Image src={starImage.src} width={50} height={50} alt={"star"} />
            <div ref={bigStarRef} className={"flex"}>
              {items[cardKey].star >= 5 ? (
                <Image
                  src={starImage.src}
                  width={80}
                  height={80}
                  alt={"bigStar"}
                />
              ) : null}
              {items[cardKey].star >= 6 ? (
                <Image
                  src={starImage.src}
                  width={80}
                  height={80}
                  alt={"bigStar"}
                />
              ) : null}
            </div>
            <Image src={starImage.src} width={50} height={50} alt={"star"} />
            {items[cardKey].star >= 4 ? (
              <Image src={starImage.src} width={50} height={50} alt={"star"} />
            ) : null}
          </div>
          <div
            ref={cardInfoRef}
            className={"absolute top-[80%] sm:top-1/2 left-[20%] "}
          >
            <div>{items[cardKey].name}</div>
            <div>{items[cardKey].star}</div>
          </div>
          <div ref={cardRef}>
            <Image
              src={items[cardKey].image_src}
              width={200}
              height={200}
              alt={"卡"}
            />
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
