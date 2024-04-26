import { MoveLeft, MoveRight } from "lucide-react";
import { months } from "../../config";
import { useDatePicker } from "./date-picker-state";

type RenderMonthsProps = {
  options: Record<string, any>;
};
export const RenderMonths = ({}: RenderMonthsProps) => {
  const {
    data: { currentDate },
    dispatch,
  } = useDatePicker();
  return (
    <div className="calendar absolute z-20 w-[285px] -left-[260px] bg-white border rounded shadow-lg">
      <div className="flex justify-between bg-gray-200 p-1">
        <span
          onClick={() => {
            if (!currentDate) return; //return early
            currentDate.setFullYear(currentDate.getFullYear() - 1);
            dispatch({
              data: { currentDate: new Date(currentDate) },
              type: "SET_CURRENT_DATE",
            });
          }}
          className="px-2 basis-1/6 cursor-pointer py-0 border-2 border-gray-300 hover:bg-gray-300"
        >
          <MoveLeft />
        </span>
        <div
          className="cursor-pointer basis-4/6 bg-blue-200 hover:bg-blue-300 rounded-md px-3 pt-[2px] text-center"
          onClick={() =>
            dispatch({ data: { currentDate }, type: "OPEN_CALENDAR" })
          }
        >
          {currentDate?.toLocaleString("default", {
            year: "numeric",
          })}
        </div>
        <span
          onClick={() => {
            if (!currentDate) return; //return early
            currentDate.setFullYear(currentDate.getFullYear() + 1);
            dispatch({
              data: { currentDate: new Date(currentDate) },
              type: "SET_CURRENT_DATE",
            });
          }}
          className="px-2 basis-1/6 cursor-pointer py-0 border-2 border-gray-300 hover:bg-gray-300"
        >
          <MoveRight />
        </span>
      </div>
      <div className="grid grid-cols-4 gap-1 p-2">
        {months.map((month, key) => (
          <div
            onClick={() => {
              if (!currentDate) return; //return early

              currentDate.setMonth(key);
              dispatch({
                data: {
                  currentDate: new Date(currentDate),
                  isMonths: false,
                  isCalendar: true,
                },
                type: "SET_CURRENT_DATE",
              });
            }}
            key={key}
            className="cursor-pointer flex font-bold h-10 justify-center items-center border"
          >
            {month}
          </div>
        ))}
      </div>
    </div>
  );
};
