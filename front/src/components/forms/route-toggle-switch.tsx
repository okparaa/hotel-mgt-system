import { useState } from "react";
import Working from "../../lib/working";
import { useEditOtherSlugMutation } from "../aio-urql";

type RouteToggleSwitchProps = {
  id: string;
  slug: string;
  route: any;
  status: boolean | undefined;
};
export const RouteToggleSwitch = ({
  id,
  slug,
  route,
  status,
}: RouteToggleSwitchProps) => {
  const [isChecked, setIsChecked] = useState(status);
  const [{ fetching: loading }, mutation] = useEditOtherSlugMutation();

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="relative mt-1">
      <input
        type="checkbox"
        id={id}
        value={slug}
        className="hidden"
        checked={isChecked}
        onChange={async (e) => {
          const chkbx = e.target as HTMLInputElement;
          let slugs = "";
          if (chkbx.checked) {
            slugs =
              route.otherSlugs == ""
                ? chkbx.value
                : route.otherSlugs?.includes(chkbx.value)
                ? route.otherSlugs
                : route.otherSlugs + "." + chkbx.value;
          } else {
            slugs =
              route.otherSlugs
                ?.split(".")
                .reduce((acc: string, curr: string) => {
                  if (curr == chkbx.value) {
                    return acc;
                  }
                  return acc == "" ? curr : acc + "." + curr;
                }, "") || "";
          }
          await mutation({
            route: {
              id: route.id,
              otherSlugs: slugs,
            },
          });
          toggleSwitch();
        }}
      />
      <label htmlFor={id} className="cursor-pointer flex">
        <span className="-mt-[1px]">
          <Working loading={loading} />
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
