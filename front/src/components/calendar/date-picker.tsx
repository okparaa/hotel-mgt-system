import { CalendarDays } from "lucide-react";
import React, { useEffect, useState } from "react";
import { RenderCalendar } from "./calendar";
import { RenderMonths } from "./months";

interface CustomDatePickerProps {
  onSelectDate: (date: Date) => void;
  events?: Map<string, boolean> | undefined;
  options?: {
    minYear: number;
    maxYear: number;
    initialDate: Date;
    className: string;
  };
}

const DatePicker: React.FC<CustomDatePickerProps> = ({
  onSelectDate,
  events,
  options,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMonths, setShowMonths] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date: Date) => {
    onSelectDate(date);
    setShowCalendar(false);
    setShowMonths(false);
  };

  useEffect(() => {
    const checkOutsideClick = (e: MouseEvent) => {
      if (
        (showCalendar || showMonths) &&
        !(e.target as HTMLElement).closest(".calendar")
      ) {
        setShowCalendar(false);
        setShowMonths(false);
      }
    };
    document.addEventListener("mousedown", checkOutsideClick);
    return () => document.removeEventListener("mousedown", checkOutsideClick);
  }, []);
  const showMonthPicker = () => {
    setShowMonths(true);
    setShowCalendar(false);
  };
  const showCalendarPicker = () => {
    setShowMonths(false);
    setShowCalendar(true);
  };

  return (
    <div className={`relative ${options?.className}`}>
      <CalendarDays onClick={toggleCalendar} className="cursor-pointer" />
      {showCalendar && !showMonths && (
        <RenderCalendar
          showMonthPicker={showMonthPicker}
          handleDateSelect={handleDateSelect}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          events={events}
        />
      )}
      {showMonths && !showCalendar && (
        <RenderMonths
          showCalendarPicker={showCalendarPicker}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      )}
    </div>
  );
};

export default DatePicker;
