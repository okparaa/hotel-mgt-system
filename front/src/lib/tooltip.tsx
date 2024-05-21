import React from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  direction?: "top" | "bottom" | "left" | "right";
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  direction = "top",
}) => {
  return (
    <div
      className={`tooltip ${direction === "top" ? "tooltip-top" : ""} ${
        direction === "bottom" ? "tooltip-bottom" : ""
      } ${direction === "left" ? "tooltip-left" : ""} ${
        direction === "right" ? "tooltip-right" : ""
      }`}
    >
      {children}
      <div className="tooltip-text">{text}</div>
    </div>
  );
};

export default Tooltip;
