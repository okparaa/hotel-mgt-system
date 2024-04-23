import { useState } from "react";
import Working from "../../lib/working";
import { useEditUserSlugsMutation } from "../aio-urql";

type UserToggleSwitchProps = {
  id: string;
  value: string;
  user: any;
  status: boolean | undefined;
};
export const UserToggleSwitch = ({
  id,
  value,
  user,
  status,
}: UserToggleSwitchProps) => {
  const [isChecked, setIsChecked] = useState(status);
  const [{ fetching }, mutation] = useEditUserSlugsMutation();

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="relative mt-1">
      <input
        type="checkbox"
        id={id}
        value={value}
        className="hidden"
        checked={isChecked}
        onChange={async (e) => {
          const chkbx = e.target as HTMLInputElement;
          let sxns = "";
          if (chkbx.checked) {
            sxns =
              user.routeSlugs == ""
                ? chkbx.value
                : user.routeSlugs.includes(chkbx.value)
                ? user.routeSlugs
                : user.routeSlugs + "." + chkbx.value;
          } else {
            sxns = user.routeSlugs
              .split(".")
              .reduce((acc: string, curr: string) => {
                if (curr == chkbx.value) {
                  return acc;
                }
                return acc == "" ? curr : acc + "." + curr;
              }, "");
          }
          await mutation({
            user: {
              id: user?.id,
              routeSlugs: sxns,
            },
          });
          toggleSwitch();
        }}
      />
      <label htmlFor={id} className="cursor-pointer flex">
        <span className="-mt-[1px]">
          <Working loading={fetching} />
        </span>
        <div className="relative p-[3px]">
          <div
            className={`w-12 h-4 rounded-full shadow-inner ${
              isChecked ? "bg-fuchsia-600" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`absolute -top-[2px] w-6 h-6 bg-white rounded-full shadow-md border border-gray-400 transition-transform transform ${
              isChecked ? "translate-x-full" : "translate-x-0"
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};
