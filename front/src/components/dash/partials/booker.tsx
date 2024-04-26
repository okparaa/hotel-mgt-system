import { Trash2 } from "lucide-react";
import { useChest } from "../../../app-chest";
import { getDateFromTimestamp, toCommas } from "../../../lib/utils";
import DatePicker, { DatePickerOptions } from "../../calendar/date-picker";
import { bookable } from "../../../config";
type TOrderBodyProps = {};

export const Booker = ({}: TOrderBodyProps) => {
  const {
    data: { booker },
    updateChest,
  } = useChest();

  const handleCheckInDate = (date: Date, book: Record<string, any>) => {
    book.inDate = date.toDateString();
    updateChest({
      type: "booker",
      data: {
        ...booker,
        bookables: booker.bookables?.map((buk) => {
          if (buk.id === book.id) {
            return { ...buk, ...book };
          }
          return buk;
        }),
      },
    });
  };

  const handleCheckOutDate = (date: Date, book: Record<string, any>) => {
    book.outDate = date.toDateString();
    updateChest({
      type: "booker",
      data: {
        ...booker,
        bookables: booker.bookables?.map((buk) => {
          if (buk.id === book.id) {
            return { ...buk, ...book };
          }
          return buk;
        }),
      },
    });
  };

  const options: DatePickerOptions = {
    minYear: 2022,
    maxYear: 2040,
    initialDate: new Date(),
    className: "inline-block",
  };

  return (
    <div>
      <div className="font-semibold text-center text-lg">
        Sales: @{toCommas(booker.total)}
      </div>
      {booker.bookables?.map((book) => {
        return (
          <div className="booker rounded-md">
            <span className="flex flex-col">
              {bookable[book.type]} {book.name}{" "}
              <strong>@{toCommas(book.price)}</strong>
            </span>
            <span className="flex items-center flex-col">
              <span className="flex">
                In:
                <DatePicker
                  options={options}
                  onSelectDate={(date) => handleCheckInDate(date, book)}
                />
              </span>
              <span
                style={{ padding: "0 5px 2px 5px" }}
                className="text-white text-sm bg-rose-600 rounded-xl p-0"
              >
                {getDateFromTimestamp(book.inDate, "d-msh-y")}
              </span>
            </span>
            <span className="flex items-center flex-col">
              <span className="flex">
                Out:
                <DatePicker
                  options={options}
                  onSelectDate={(date) => handleCheckOutDate(date, book)}
                />
              </span>
              <span
                style={{ padding: "0 5px 2px 5px" }}
                className="text-white text-sm bg-rose-600 rounded-xl p-0"
              >
                {getDateFromTimestamp(book.outDate, "d-msh-y")}
              </span>
            </span>
            <span
              onClick={() => {
                const updatedBooking: any = booker.bookables?.filter(
                  (buk: any) => buk.id !== book.id
                );
                const total = updatedBooking.reduce(
                  (acc: number, book: Record<string, any>) => {
                    return acc + Number(book.price);
                  },
                  0
                );
                updateChest({
                  type: "booker",
                  data: {
                    ...booker,
                    total,
                    bookables: updatedBooking,
                  },
                });
              }}
            >
              <span className="flex">
                <Trash2 size={20} className="ikon cursor-pointer" />
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
};
