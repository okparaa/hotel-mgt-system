import React, { useState } from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  direction?: "top" | "bottom" | "left" | "right";
}

const Tooltip = ({ text, children }: TooltipProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`relative w-full`}>
      {open && (
        <div className="absolute border-2 border-t-0 border-slate-400 text-sm translate-y-[27px] z-10 rounded-b-md bg-slate-300 w-full">
          {children}
        </div>
      )}
      <div
        className="bg-slate-300 w-full border-2 border-b-0 hover:bg-slate-500 hover:text-white hover:border-slate-400 rounded-md p-[2px] text-base cursor-default"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
