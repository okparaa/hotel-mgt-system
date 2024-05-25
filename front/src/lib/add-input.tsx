import { useEffect, useRef, useState } from "react";
import { toCommas } from "./utils";
import { Loader2 } from "lucide-react";
import { useChest } from "../app-chest";

type AddInputProps = {
  initialValue: string | number;
  action: (value: string | number) => void;
  isCurrency?: boolean;
  isBusy?: boolean;
  id: string;
  className?: string;
};

export const AddInput = ({
  initialValue,
  action,
  isCurrency = true,
  isBusy,
  className,
  id,
}: AddInputProps) => {
  const [editing, setEditing] = useState(false);
  // const [value, setValue] = useState(String(initialValue));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editing]);
  const {
    data: { row },
  } = useChest();
  return (
    <>
      {editing ? (
        <input
          type="text"
          ref={inputRef}
          className="text-center border-y-2 h-[28px] border-slate-900 bg-transparent outline-none w-11/12"
          value={initialValue == 0 ? "" : initialValue}
          onChange={(e) => {
            initialValue = (e.target as HTMLInputElement).value;
          }}
          onBlur={() => {
            setEditing(false);
            if (initialValue === "0") initialValue = "0";
            action(initialValue);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setEditing(false);
              action(initialValue);
            }
          }}
        />
      ) : (
        <span
          className={`${className ? className : " border-slate-300"} ${
            isCurrency ? "naira" : ""
          } w-11/12 text-center cursor-text border-y-2 h-[28px] flex justify-center items-center`}
          value={initialValue}
          onClick={() => {
            setEditing(true);
            if (initialValue === 0) initialValue = "";
          }}
        >
          {isBusy && row.id === id ? (
            <Loader2 className="animate-spin" />
          ) : (
            toCommas(initialValue)
          )}
        </span>
      )}
    </>
  );
};
