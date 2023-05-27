import Image from "next/image";
export default function PillLabel({
  onClick,
  icon,
  alt,
  n = 0,
}: {
  onClick(): unknown;
  icon: string;
  alt?: string;
  n?: number;
}) {
  return (
    <div
      className={
        "relative rounded-full flex items-center w-20 bg-gray-700 border-2 border-gray-600 text-gray-300"
      }
    >
      <div className={"w-8"}>
        <div className={"absolute -top-1 -left-1 h-8 w-8"}>
          <Image fill src={icon} alt={alt!} />
        </div>
      </div>
      <span className={"flex-1 text-sm"}>{n}</span>
      <button className={"w-6 h-6"} onClick={onClick}>+</button>
    </div>
  );
}
