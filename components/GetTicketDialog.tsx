import Dialog from "./Dialog";
import List from "./List";

export default function GetTicketDialog({
  onClose,
  onClick,
  isShow,
}: {
  onClose(): unknown;
  onClick(k:number):unknown;
  isShow: boolean;
}) {
    const list=[
        {
            text:"创建一个账号",
        },
        {
            text:"使用兑换码",
        },
        {
            text:"答题",
        },
    ]
  return (
    <>
      <Dialog
        isShow={isShow}
        onClose={onClose}
        title="获取『追·卡券』"
      >
        <List content={list} onClick={onClick}/>
      </Dialog>
    </>
  );
}
