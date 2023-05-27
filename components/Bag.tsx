import Dialog from "./Dialog";
export default function Bag({
    isShow,
    onClose,
}:{
    isShow:boolean;
    onClose():unknown;
}) {
  return (
    <Dialog isShow={isShow} onClose={onClose} title="背包">
      <div className="w-screen h-[80vh]">
        <div className={""}></div>
      </div>
    </Dialog>
  );
}
