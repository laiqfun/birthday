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
  // const starRef = createRef<HTMLDivElement>();
  const bigStarRef = createRef<HTMLDivElement>();
  const [cardKey, setCardKey] = useState(0);
  const [showList, setShowList] = useState(false);
  const [playing, setPlaying] = useState(false);

  useLayoutEffect(() => {
    const tl = gsap.timeline();
    function playCardAni() {
      setPlaying(true);
      console.log(cardKey, items);
      if (items[cardKey].star >= 5) {
        tl.to(".star", {
          opacity: 0,
          y: 100,
          delay: -0.1,
          duration: 0.1,
        })
          .to("#star-1", {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power4.out",
          })
          .to("#star-4", {
            y: 0,
            delay: -0.4,
            opacity: 1,
            duration: 0.5,
            ease: "power4.out",
          })
          .to("#star-3", {
            y: 0,
            opacity: 1,
            delay: -0.4,
            duration: 0.5,
            ease: "power4.out",
          })
          .to("#star-2", {
            y: 0,
            delay: -0.4,
            opacity: 1,
            duration: 0.5,
            ease: "power4.out",
          })
          .to(bigStarRef.current, {
            y: 0,
            delay: -0.3,
            opacity: 1,
            duration: 0.6,
            ease: "power4.out",
          })
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

    playCardAni();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardKey]);

  function nextCard() {
    if (playing) return;
    if (cardKey + 1 >= items.length) {
      setShowList(true);
    } else {
      setCardKey(cardKey + 1);
      console.log(cardKey);
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
            // ref={starRef}
            className={"absolute inset-0 z-50 items-center justify-center"}
            style={{ display: playing ? "flex" : "none" }}
          >
            <Image
              id={"star-1"}
              src={starImage.src}
              width={50}
              height={50}
              alt={"star"}
              className="star"
            />
            <Image
              id={"star-2"}
              src={starImage.src}
              width={50}
              height={50}
              alt={"star"}
              className="star"
            />
            <div ref={bigStarRef} className={"flex star"}>
              {items[cardKey].star >= 5 ? (
                <Image
                  src={starImage.src}
                  width={80}
                  height={80}
                  alt={"bigStar"}
                  className="star"
                />
              ) : null}
              {items[cardKey].star >= 6 ? (
                <Image
                  src={starImage.src}
                  width={80}
                  height={80}
                  alt={"bigStar"}
                  className="star"
                />
              ) : null}
            </div>
            <Image
              id={"star-3"}
              src={starImage.src}
              width={50}
              height={50}
              alt={"star"}
              className="star"
            />
            {items[cardKey].star >= 4 ? (
              <Image
                id={"star-4"}
                src={starImage.src}
                width={50}
                height={50}
                alt={"star"}
                className="star"
              />
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
