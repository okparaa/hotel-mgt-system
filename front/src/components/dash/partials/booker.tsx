import { Trash2 } from "lucide-react";
import { useChest } from "../../../state-mgr/app-chest";

type TOrderBodyProps = {
  pickedItems?: any;
};

export const Booker = ({}: TOrderBodyProps) => {
  const {
    data: { booker },
    updateChest,
  } = useChest();

  const bookable = ["room", "hall", "pool", "other"];
  console.log(booker);

  return (
    <div>
      <div>sales</div>
      {booker.bookables.map((book) => {
        return (
          <div className="booker">
            <span>
              {bookable[book.type]} {book.name}
            </span>
            <span>@{book.price}</span>
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
