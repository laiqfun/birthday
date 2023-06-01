import AliPayImage from "assets/AliPay.jpg";
import WeiChatPayImage from "assets/WeiChatPay.png";
import Image from "next/image";
import Dialog from "./Dialog";
export default function Bag({
    isShow,
    onClose,
}:{
    isShow:boolean;
    onClose():unknown;
}) {
  return (
    <Dialog isShow={isShow} onClose={onClose} title="充值">
      <div className="w-screen h-[80vh]">
        <div className={"flex"}>
            <div className={"flex-1 flex items-center justify-center"}>
            <Image width={300} height={300} alt="支付宝支付" src={AliPayImage}/>
            </div>
            <div className={"flex-1 flex items-center justify-center"}>
            <Image width={300} height={300} alt="微信支付" src={WeiChatPayImage}/>
            </div>            
        </div>
      </div>
    </Dialog>
  );
}
