"use client";
import testImage from "@/assets/testImage.png";
import ticketImage from "@/assets/ticket.png";
import Button from "@/components/Button";
import Image from "next/image";
import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

export default function Home() {
  const [window_k, setWindow] = useState(0);
  const [window_ani, setWindowAni] = useState(false);

  function closeWindow() {
    setWindowAni(false);
  }

  function openWindow(key: number) {
    setWindowAni(true);
    setWindow(key);
  }

  const [text, setText] = useState("");
  const window_data = [
    {
      title: "未知窗口",
      w: "50vw",
      h: "50vh",
      dom: null,
    },
    {
      title: "兑换码",
      w: 300,
      h: 140,
      dom: (
        <div className={"flex-1 flex items-center justify-center"}>
          <input
            className={"input"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ borderRadius: "5px 0 0 5px" }}
          />
          <button className={"button"} style={{ borderRadius: "0 5px 5px 0 " }}>
            提交
          </button>
        </div>
      ),
    },
    {
      title: "获取『追·卡券』",
      w: 320,
      h: 240,
      dom: (
        <div className={"flex-1 flex flex-col"}>
          <div style={{ height: "50px" }}>1</div>
          <div style={{ height: "50px" }}>2</div>
        </div>
      ),
    },
  ];
  const windowRef = useRef(null);

  function roll(times: 1 | 10) {
    setRollCutscene(true);
  }

  const [roll_cutscene, setRollCutscene] = useState(false);

  function nextCard() {
    if (card_k >= 6) console.log("没了！");
    else setCard(card_k + 1);
  }
  function nextCardAni() {
    setCardAni(card_k);
  }

  const [card_k, setCard] = useState(0);
  const [card_ani_k, setCardAni] = useState(1);
  const cardRef = useRef(null);

  return (
    <main className={"flex flex-col w-screen h-screen"}>
      <div id={"headline"}>
        <h1>✨生日活动</h1>
        <p>『抽卡的快乐』</p>
      </div>
      <div className={"flex items-center h-14 pr-2"}>
        <div className={"flex-1"}></div>
        <div className={"w-80 flex items-center"}>
          <div className={"flex-1"}></div>
          <div className={"px-1"}>
            <Button onClick={() => openWindow(1)}>兑换码</Button>
          </div>
          <div className={"px-1"}>
            <div id={"ticket"}>
              <div>
                <Image fill src={ticketImage.src} alt={"追·卡券"} />
              </div>
              <span>7</span>
              <button onClick={() => openWindow(2)}>+</button>
            </div>
          </div>
        </div>
      </div>
      <div className={"flex-1 flex items-center justify-center"}>
        <div id={"banner"}>
          <div>
            <div id={"banner-hero"} className={"absolute"}>
              <Image
                width={100}
                height={100}
                src={testImage.src}
                alt={"五星"}
              />
            </div>
          </div>
          <div
            className={
              "absolute left-0 right-0 -bottom-3 flex items-center px-6"
            }
          >
            <div className={"flex-1"}></div>
            <div className={"px-3"}>
              <Button onClick={() => roll(1)}>
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
              <Button onClick={() => roll(10)}>
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
      </div>
      <div className={"flex items-center p-6"}>
        <div className={"px-6"}>token</div>
        <div className={"flex-1"}></div>
        <div className={"px-6"}>
          <div id={"bag"}>背包</div>
        </div>
      </div>

      <CSSTransition
        nodeRef={windowRef}
        in={window_ani}
        onExited={() => setWindow(0)}
        timeout={200}
        classNames="window"
      >
        <>
          {window_k != 0 ? (
            <div
              ref={windowRef}
              className={"fixed inset-0 flex items-center justify-center"}
            >
              <div id={"curtain"} onClick={closeWindow}></div>
              <div
                className={"window flex flex-col"}
                style={{
                  width: window_data[window_k].w,
                  height: window_data[window_k].h,
                }}
              >
                <div className={"window-head flex items-center"}>
                  <div className={"flex-1 text-center leading-9 pl-10"}>
                    {window_data[window_k].title}
                  </div>
                  <div className={"w-10 text-center"}>
                    <button onClick={closeWindow}>×</button>
                  </div>
                </div>
                {window_data[window_k].dom}
              </div>
            </div>
          ) : null}
        </>
      </CSSTransition>

      {roll_cutscene ? (
        <div id={"roll"}>
          <div id={"curtain"} onClick={nextCard}></div>
          <CSSTransition
            in={card_k == card_ani_k}
            nodeRef={cardRef}
            timeout={200}
            onExited={() => nextCardAni()}
            classNames="roll-card"
          >
            <div id={"roll-card"} ref={cardRef}></div>
          </CSSTransition>
        </div>
      ) : null}
    </main>
  );
}
