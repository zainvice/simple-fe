// src/components/ui/label.jsx
import React from "react";

export const Label = ({ children, className }) => {
  return (
    <label className={`block text-sm font-semibold text-gray-700 ${className}`}>
      {children}
    </label>
  );
};
