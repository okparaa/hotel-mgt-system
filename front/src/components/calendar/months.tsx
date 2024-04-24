type RenderMonthsProps = {
  showCalendarPicker: () => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
};
export const RenderMonths = ({
  showCalendarPicker,
  setCurrentDate,
  currentDate,
}: RenderMonthsProps) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="calendar absolute z-20 w-[285px] -left-[260px] bg-white border rounded shadow-lg">
      <div className="flex justify-between bg-gray-200 p-1">
        <span
          onClick={() => {
            currentDate.setFullYear(currentDate.getFullYear() - 1);
            setCurrentDate(new Date(currentDate));
          }}
          className="px-2 cursor-pointer py-0 border-2 border-gray-300 hover:bg-gray-300"
        >
          &lt;
        </span>
        <div
          className="cursor-pointer bg-blue-200 hover:bg-blue-300 rounded-md px-3 pt-[2px]"
          onClick={() => showCalendarPicker()}
        >
          {currentDate.toLocaleString("default", {
            year: "numeric",
          })}
        </div>
        <span
          onClick={() => {
            currentDate.setFullYear(currentDate.getFullYear() + 1);
            setCurrentDate(new Date(currentDate));
          }}
          className="px-2 cursor-pointer py-0 border-2 border-gray-300 hover:bg-gray-300"
        >
          &gt;
        </span>
      </div>
      <div className="grid grid-cols-4 gap-1 p-2">
        {months.map((month, key) => (
          <div
            onClick={() => {
              currentDate.setMonth(key);
              setCurrentDate(currentDate);
              showCalendarPicker();
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
