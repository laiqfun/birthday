import Image from 'next/image';
import { createRef } from "react";
import { createPortal } from 'react-dom';
export default function Roller({
    items,
    onClose,
}:{
    items:{
        star:number;
        name:string;
        image_src:string;
    }[];
    onClose():unknown;
}) {
  const cardRef = createRef<HTMLDivElement>();
  const cardKey = 0;
  return createPortal(
    <div className={"fixed inset-0 z-50 bg-slate-100 flex items-center justify-center"}>
        <div>
            <div className={"absolute top-1/2 left-[10%]"}>
                <div>{items[cardKey].name}</div>
                <div>{items[cardKey].star}</div>
            </div>
            <div>
                <Image src={items[cardKey].image_src} width={100} height={100} alt={"卡"} />
            </div>
        </div>
    </div>,
    document.body
  );
}
