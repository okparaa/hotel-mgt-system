import { Trash2 } from "lucide-react";
import { useChest } from "../../../app-chest";
import { toCommas } from "../../../lib/utils";
import { useState } from "preact/hooks";
import DatePicker from "../../calendar/date-picker";
type TOrderBodyProps = {};

export const Booker = ({}: TOrderBodyProps) => {
  const {
    data: { booker },
    updateChest,
  } = useChest();

  const bookable = ["Room", "hall", "pool", "other"];

  const [checkInDate, setCheckInDate] = useState<Date>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date>(new Date());

  const handleCheckInDate = (date: Date) => {
    setCheckInDate(date);
  };
  const handleCheckOutDate = (date: Date) => {
    setCheckOutDate(date);
  };
  const options = {
    minYear: 2022,
    maxYear: 2040,
    initialDate: new Date(),
    className: "inline-block",
  };

  return (
    <div>
      <div>sales</div>
      {booker.bookables.map((book) => {
        return (
          <div className="booker">
            <span>
              {bookable[book.type]} {book.name}{" "}
              <strong>@{toCommas(book.price)}</strong>
            </span>
            <span>
              In:
              <DatePicker options={options} onSelectDate={handleCheckInDate} />
              <div className="text-sm">{checkInDate.toDateString()}</div>
            </span>
            <span>
              Out:
              <DatePicker options={options} onSelectDate={handleCheckOutDate} />
              <div className="text-sm">{checkOutDate.toDateString()}</div>
            </span>
            <span
              onClick={() => {
                const updatedBooking: any = booker.bookables.filter(
                  (buk: any) => buk.id !== book.id
                );
                const total = updatedBooking.reduce(
                  (acc: number, book: any) => {
                    return acc + Number(book.price);
                  },
                  0
                );

                updateChest({
                  type: "booker",
                  data: {
                    cash: booker.cash,
                    pos: booker.pos,
                    txfa: booker.txfa,
                    hash: booker.hash,
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
