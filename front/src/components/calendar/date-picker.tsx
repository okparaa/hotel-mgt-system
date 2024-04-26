import { CalendarDays } from "lucide-react";
import { useEffect, useReducer } from "react";
import { RenderCalendar } from "./calendar";
import { RenderMonths } from "./months";
import { PickerContext, reducer } from "./date-picker-state";

export type DatePickerOptions = {
  minYear?: number;
  maxYear?: number;
  initialDate?: Date;
  className?: string;
  normal?: boolean;
  events?: Map<string, boolean> | undefined;
};

interface DatePickerProps {
  onSelectDate: (date: Date) => void;
  options: DatePickerOptions;
}

const DatePicker = ({ onSelectDate, options }: DatePickerProps) => {
  const initialDateState = {
    isCalendar: false,
    isMonths: false,
    currentDate: new Date(),
  };
  const [data, dispatch] = useReducer(reducer, initialDateState);

  useEffect(() => {
    const checkOutsideClick = (e: MouseEvent) => {
      if (
        (data.isCalendar || data.isMonths) &&
        !(e.target as HTMLElement).closest(".calendar")
      ) {
        dispatch({ data, type: "CLOSE" });
      }
    };
    document.addEventListener("click", checkOutsideClick);
    return () => document.removeEventListener("click", checkOutsideClick);
  }, [data.isCalendar, data.isMonths]);

  return (
    <PickerContext.Provider value={{ data, dispatch }}>
      <div className={`relative ${options?.className}`}>
        <CalendarDays
          onClick={() => dispatch({ data, type: "TOGGLE_CALENDAR" })}
          className="cursor-pointer"
        />
        {data.isCalendar && (
          <RenderCalendar options={options} onSelectDate={onSelectDate} />
        )}
        {data.isMonths && <RenderMonths options={options} />}
      </div>
    </PickerContext.Provider>
  );
};

export default DatePicker;
