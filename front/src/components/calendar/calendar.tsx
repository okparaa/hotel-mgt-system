type RenderCalendarProps = {
  showMonthPicker: () => void;
  handleDateSelect: (date: any) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  events: Map<string, boolean> | undefined;
};

export const RenderCalendar = ({
  showMonthPicker,
  setCurrentDate,
  handleDateSelect,
  events,
  currentDate,
}: RenderCalendarProps) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const numDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const dates = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    dates.push({ date: null, event: null, today: null });
  }

  for (let i = 1; i <= numDaysInMonth; i++) {
    const day = i < 10 ? "0" + i : i;
    const m = currentMonth + 1;
    const month = m < 10 ? "0" + m : m;
    const isEvt = events?.get(`${currentYear}-${month}-${day}`);

    const currDate = new Date(currentYear, currentMonth, i);
    const today = currDate.toDateString() === new Date().toDateString();
    dates.push({ date: currDate, event: isEvt ? true : false, today });
  }

  return (
    <div className="calendar absolute w-[285px] -left-[260px] z-20 bg-white border rounded shadow-lg">
      <div className="flex justify-between bg-slate-200 p-1">
        <span
          onClick={() => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            setCurrentDate(new Date(currentDate));
          }}
          className="px-2 cursor-pointer py-0 border-2 border-gray-300 hover:bg-gray-300"
        >
          &lt;
        </span>
        <div
          className="flex-1 text-center cursor-pointer bg-blue-200 hover:bg-blue-300 rounded-md px-3 pt-[2px]"
          onClick={() => showMonthPicker()}
        >
          {currentDate.toLocaleString("default", {
            month: "short",
            year: "numeric",
          })}
        </div>
        <span
          onClick={() => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            setCurrentDate(new Date(currentDate));
          }}
          className="px-2 cursor-pointer py-0 border-2 border-gray-300 hover:bg-gray-300"
        >
          &gt;
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1 p-2">
        {days.map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {dates.map((current) => {
          const date = current.date;
          return (
            <div
              key={date?.toString()}
              onClick={() => date && handleDateSelect(date)}
              className={`rounded-md flex justify-center items-center cursor-pointer pb-[2px] ${
                date ? "hover:bg-fuchsia-600 border hover:text-white" : ""
              } ${current.today ? "bg-fuchsia-400" : ""} ${
                current.event && !current.today ? "bg-fuchsia-200" : ""
              }`}
            >
              {date ? date.getDate() : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};
