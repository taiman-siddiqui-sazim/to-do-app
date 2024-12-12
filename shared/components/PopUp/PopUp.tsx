import React from "react";
import { IPopUpProps } from "./PopUp.interfaces";

export const PopUp: React.FC<IPopUpProps> = ({ message, type = "info", isVisible }) => {
  if (!isVisible) return null;

  const backgroundColors = {
    success: "bg-gray-600",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
        backgroundColors[type]
      } text-white px-6 py-3 rounded shadow-lg text-center max-w-xs sm:max-w-md`}
    >
      {message}
    </div>
  );
};
