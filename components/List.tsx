export default function List({
  content,
  onClick=()=>{},
}: {
  onClick(k:number): unknown;
  content: {
    text: string;
  }[];
}) {
  return (
    <div className={"flex flex-col p-2"}>
      {content.map((c,k) => {
        return (
          <div
            className={
              "border my-1 px-1 py-2 cursor-pointer text-sm text-gray-600"
            }
            onClick={()=>onClick(k)}
          >
            {c.text}
          </div>
        );
      })}
    </div>
  );
}
