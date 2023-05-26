"use client";

import { useState } from "react";

export default function ActionButton(props: {
  action(): Promise<any>;
  children?: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <button
      className="bg-slate-800 hover:bg-slate-600 active:bg-slate-950 m-2 rounded duration-200 p-1 disabled:opacity-20 disabled:pointer-events-none"
      disabled={loading}
      onClick={() => {
        setLoading(true);
        props.action().then((d: any) => {
          setLoading(false);
          if (d) alert(JSON.stringify(d));
        });
      }}
    >
      {props.children}
    </button>
  );
}
