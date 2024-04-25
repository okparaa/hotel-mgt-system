import { Trash2 } from "lucide-react";
import { useChest } from "../../../app-chest";
import { toCommas } from "../../../lib/utils";
import DatePicker from "../../calendar/date-picker";
type TOrderBodyProps = {};

export const Booker = ({}: TOrderBodyProps) => {
  const {
    data: { booker },
    updateChest,
  } = useChest();

  const bookable = ["Room", "hall", "pool", "other"];
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
  const options = {
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
          <div className="booker">
            <span>
              {bookable[book.type]} {book.name}{" "}
              <strong>@{toCommas(book.price)}</strong>
            </span>
            <span>
              In:
              <DatePicker
                options={options}
                onSelectDate={(date) => handleCheckInDate(date, book)}
              />
              <div className="text-sm">{book.inDate}</div>
            </span>
            <span>
              Out:
              <DatePicker
                options={options}
                onSelectDate={(date) => handleCheckOutDate(date, book)}
              />
              <div className="text-sm">{book.outDate}</div>
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
              <Trash2 size={20} className="ikon cursor-pointer" />
            </span>
          </div>
        );
      })}
    </div>
  );
};
