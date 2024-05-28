import { Trash2 } from "lucide-react";
import { useChest } from "../../../app-chest";
import {
  addDaysToDate,
  getDateFromTimestamp,
  getDays,
  toCommas,
  ucwords,
} from "../../../lib/utils";
import DatePicker, { DatePickerOptions } from "../../calendar/date-picker";
import { ChestBook } from "../../../lib/types";
type TOrderBodyProps = {};

export const Booker = ({}: TOrderBodyProps) => {
  const {
    data: { booker },
    updateChest,
  } = useChest();

  const handleCheckInDate = (date: Date, book: ChestBook) => {
    book.inDate = getDateFromTimestamp(date.toDateString());
    const { days } = getDays({ inDate: book.inDate, outDate: book.outDate });
    const num = days > 1 ? days : 1;
    book.outDate = getDateFromTimestamp(
      addDaysToDate(date, num).toDateString()
    );
    const books: ChestBook[] = [];
    let total = 0;

    booker.bookables?.forEach((buk) => {
      const { days } = getDays({ inDate: buk.inDate, outDate: buk.outDate });
      if (buk.roomId === book.roomId) {
        total += book.curPrice * days;
        books.push({ ...buk, ...book });
      } else {
        total += buk.curPrice * days;
        books.push(buk);
      }
    });
    booker.total = total;
    booker.bookables = books;
    updateChest({
      type: "booker",
      data: {
        ...booker,
      },
    });
  };

  const handleCheckOutDate = (date: Date, book: ChestBook) => {
    const { days, outDate } = getDays({
      date,
      inDate: book.inDate,
      outDate: book.outDate,
    });
    book.outDate = getDateFromTimestamp(outDate as string);
    booker.total = book.curPrice * days + booker.total;
    updateChest({
      type: "booker",
      data: {
        ...booker,
        bookables: booker.bookables?.map((buk) => {
          if (buk.roomId === book.roomId) {
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
    inDate: getDateFromTimestamp(),
  };

  return (
    <div className="min-w-[360px]">
      <div className="font-extrabold bg-slate-600 text-white p-2 text-center text-xl mb-3 rounded-md border-2">
        <span className="mr-2">Sales:</span>{" "}
        <span className="naira">{toCommas(booker.total)}</span>
      </div>
      {booker.bookables?.map((book) => {
        return (
          <div className="booker rounded-md border-slate-600">
            <span className="flex flex-col">
              {ucwords(book.type)} {book.name}
              <strong>@{toCommas(book.curPrice)}</strong>
            </span>
            <span className="flex items-center flex-col">
              <span className="flex">
                In:
                <DatePicker
                  options={{ ...options, inDate: book.inDate, checkIn: true }}
                  onSelectDate={(date) => handleCheckInDate(date, book)}
                />
              </span>
              <span
                style={{ padding: "0 5px 2px 5px" }}
                className="text-black border-2 border-slate-600 text-sm rounded-md p-0 font-semibold"
              >
                {getDateFromTimestamp(book.inDate, "d-msh-y")}
              </span>
            </span>
            <span className="flex items-center flex-col">
              <span className="flex">
                Out:
                <DatePicker
                  options={{ ...options, inDate: book.inDate, checkIn: false }}
                  onSelectDate={(date) => handleCheckOutDate(date, book)}
                />
              </span>
              <span
                style={{ padding: "0 5px 2px 5px" }}
                className="text-white text-sm bg-slate-600 rounded-md p-0"
              >
                {getDateFromTimestamp(book.outDate, "d-msh-y")}
              </span>
            </span>
            <span
              onClick={() => {
                const updatedBooking = booker.bookables?.filter(
                  (buk: ChestBook) => buk.roomId !== book.roomId
                );
                const total = updatedBooking.reduce(
                  (acc: number, book: ChestBook) => {
                    const { days } = getDays({
                      inDate: book.inDate,
                      outDate: book.outDate,
                    });
                    return acc + Number(book.curPrice) * days;
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
