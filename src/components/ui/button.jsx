// src/components/ui/button.jsx
import React from "react";

export const Button = ({ children, type, className, ...props }) => {
  return (
    <button
      type={type || "button"}
      className={`px-6 py-2 bg-[#1EBDB8] rounded-[20px] hover:bg-white hover:text-[#1EBDB8] transition-all duration-300 border shadow-md text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
