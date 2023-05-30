"use client";

import React from "react";

export default function Button({
  children,
  onClick,
  disabled = false,
  primary = false,
}: {
  children: React.ReactNode;
  onClick(): unknown;
  disabled?: boolean;
  primary?: boolean;
}) {
  return (
    <button
      className={`
      py-1 px-3 m-1 
      w-full sm:w-auto
      flex justify-center items-center
      shadow 
      border-transparent border-2 rounded-full
      align-middle text-sm
       active:shadow-none 
      ${
        primary
          ? "active:bg-orange-700 bg-orange-500 hover:bg-orange-600 active:border-orange-200 text-gray-200 shadow-orange-400"
          : "bg-white hover:bg-gray-100 active:bg-gray-300 active:border-white text-gray-700"
      } 
        
      hover:shadow-md 
      duration-150
      disabled:opacity-60 disabled:pointer-events-none disabled:bg-gray-300 disabled:shadow-none`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
