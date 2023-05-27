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
      className="
      p-1 px-5 m-1 
      w-full sm:w-auto
      flex justify-center items-center
      shadow 
      border-transparent border-2 rounded-full
      align-middle text-sm
      active:border-white active:shadow-lg active:bg-gray-200
      bg-white text-gray-700  
      hover:bg-gray-100 hover:shadow-md 
      duration-200 
      disabled:opacity-60 disabled:pointer-events-none disabled:bg-gray-300"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
