import React from "react";

export default function Button({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick(): unknown;
  disabled?: boolean;
}) {
  return (
    <button
      className="p-1 px-2 m-1 shadow border-transparent align-middle border-2 active:border-white bg-white text-gray-700  hover:bg-gray-100 hover:shadow-md active:shadow-lg active:bg-gray-200 duration-200 rounded-full text-sm disabled:opacity-60 disabled:pointer-events-none disabled:bg-gray-300"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
