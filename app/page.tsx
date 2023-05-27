"use client";
import ticketImage from "@/assets/ticket.png";
import Banner from "@/components/Banner";
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

  function initRollCutscene() {
    setCard(0);
    setCardAni(1);
    showCard(false);
  }

  function roll(times: 1 | 10) {
    initRollCutscene();
    setRollCutscene(true);
    setTimeout(() => {
      showCard(true);
      setCard(1);
    }, 2000);
  }

  const [roll_cutscene, setRollCutscene] = useState(false);

  function nextCard() {
    if (card_k >= 6) console.log("没了！");
    else setCard(card_k + 1);
    if (card_k >= 6) {
      console.log("没了！");
      setRollCutscene(false);
    } else {
      setMaxStar(Math.random() > 0.5 ? 3 : Math.random() > 0.5 ? 4 : 5);
      setCard(card_ani_k + 1);
    }
  }
  function nextCardAni() {
    setCardAni(card_k);

  function nextCardAni() {
    setCardAni(card_k)
  }

  const [card_k, setCard] = useState(0);
  const [card_ani_k, setCardAni] = useState(1);
  const cardRef = useRef(null);
  const cardRef = useRef(null)
  const [card_show, showCard] = useState(false);

  const [maxStar,setMaxStar] = useState(3);

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
        <Banner />
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
      {roll_cutscene ? <div id={"roll"}>
        <div style={{display: card_show ? "" : "none"}}>
          <div id={"curtain"} style={{background: "none"}} onClick={nextCard}></div>
          <CSSTransition
            in={card_k == card_ani_k}
            nodeRef={cardRef}
            timeout={300}
            onExited={() => nextCardAni()}
            classNames="roll-card"
          >
            <div id={"roll-card"} className={`star-${maxStar}`} ref={cardRef}>
              {card_k == card_ani_k ? <div id={"roll-card-star"}>
                {maxStar>=4?<span>⭐</span>:null}
                <span>⭐</span>
                {maxStar>=5?<span style={{fontSize:"50px"}}>⭐</span>:null}
                <span>⭐</span>
                <span>⭐</span>
              </div> : null}
              {card_k == card_ani_k ? <div id={"roll-card-effort"}></div> : null}
            </div>
          </CSSTransition>
        </div>
        <div></div>
      </div> : null}
    </main>
  );
}
