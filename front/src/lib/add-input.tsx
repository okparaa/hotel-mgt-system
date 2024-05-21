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
};

export const AddInput = ({
  initialValue,
  action,
  isCurrency = true,
  isBusy,
  id,
}: AddInputProps) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(String(initialValue));
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
          className="text-center border-y-2 h-7 border-slate-900 bg-transparent outline-none w-10/12"
          value={value}
          onChange={(e) => {
            setValue((e.target as HTMLInputElement).value);
          }}
          onBlur={() => {
            setEditing(false);
            if (value === "0") setValue("0");
            action(value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setEditing(false);
              action(value);
            }
          }}
        />
      ) : (
        <span
          className={`${
            isCurrency ? "naira" : ""
          } w-11/12 text-center border-y-2 border-slate-300 h-7 flex justify-center`}
          value={value}
          onClick={() => {
            setEditing(true);
            if (value === "0") setValue("");
          }}
        >
          {isBusy && row.id === id ? (
            <Loader2 className="animate-spin" />
          ) : (
            toCommas(value)
          )}
        </span>
      )}
    </>
  );
};
