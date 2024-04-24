import { Check, Sofa, X } from "lucide-react";
import { useRoomsQuery } from "../aio-urql";
import QueryResult from "../../lib/query-result";
import { Search } from "../../lib/search";
import { useChest } from "../../app-chest";
import { Booker } from "./partials/booker";
import { addInput, toCommas } from "../../lib/utils";

const DashRooms = () => {
  const [roomsRes] = useRoomsQuery();
  if (roomsRes.error || roomsRes.fetching) {
    return <QueryResult result={roomsRes} />;
  }
  const bookable = ["room", "hall", "pool", "other"];

  const {
    data: { search, booker },
    updateChest,
  } = useChest();

  const total = booker.cash + booker.pos + booker.txfa;
  const roomSearch = roomsRes.data?.rooms?.filter((room: any) => {
    const str = "room " + room.name + " room" + room.name;
    const searche = search || "";
    return str.includes(searche.toLowerCase());
  });

  return (
    <div className="h-fit flex flex-wrap py-5 justify-between">
      <div className="basis-7/12 flex flex-wrap gap-4">
        <Search hasBtn={false} />
        {roomSearch?.map((room: any) => {
          if (!room) return <></>;
          const type = room.type as any;
          return (
            <span
              className="link-btn-room"
              onClick={() => {
                const today = new Date();
                const tomorrow = new Date("tomorrow");
                const newBooking = [
                  ...booker.bookables,
                  {
                    id: room.id,
                    price: room.price,
                    inDate: today,
                    outDate: tomorrow,
                    name: room.name,
                    type: room.type,
                  },
                ];
                updateChest({
                  type: "booker",
                  data: {
                    pos: booker.pos,
                    txfa: booker.txfa,
                    hash: booker.hash,
                    cash: booker.cash,
                    total: booker.total,
                    bookables: newBooking,
                  },
                });
              }}
            >
              <>
                <Sofa className="w-5 h-5" />{" "}
                <div>
                  {bookable[type]} {room?.name}
                </div>
              </>
            </span>
          );
        })}
      </div>
      <div className="basis-[40%] p-[12px] rounded-md shadow-2xl bg-slate-50">
        <Booker />
        <div className="flex border-2 py-2 mt-2">
          <div className="flex-1 text-center checkout">
            <span>cash</span>
            <span
              className="border-y cursor-text border-gray-400 flex w-10/12 m-auto justify-center items-center rounded-md h-10"
              onClick={(e) => {
                addInput(e, (value) => {
                  updateChest({
                    type: "booker",
                    data: {
                      cash: +value,
                      txfa: booker.txfa,
                      pos: booker.pos,
                      total: booker.total,
                      bookables: booker.bookables,
                      hash: booker.hash,
                    },
                  });
                });
              }}
            >
              {toCommas(booker.cash)}
            </span>
          </div>
          <div className="flex-1 text-center">
            <span>pos</span>
            <span
              className="border-y cursor-text border-gray-400 flex w-10/12 h-10 m-auto justify-center items-center rounded-md"
              onClick={(e) => {
                addInput(e, (value) => {
                  updateChest({
                    type: "booker",
                    data: {
                      pos: +value,
                      txfa: booker.txfa,
                      cash: booker.cash,
                      total: booker.total,
                      bookables: booker.bookables,
                      hash: booker.hash,
                    },
                  });
                });
              }}
            >
              {toCommas(booker.pos)}
            </span>
          </div>
          <div className="flex-1 text-center">
            <span>txfer</span>
            <span
              className="border-y cursor-text border-gray-400 flex w-10/12 h-10 m-auto justify-center items-center rounded-md"
              onClick={(e) => {
                addInput(e, (value) => {
                  updateChest({
                    type: "booker",
                    data: {
                      txfa: +value,
                      cash: booker.cash,
                      pos: booker.pos,
                      total: booker.total,
                      bookables: booker.bookables,
                      hash: booker.hash,
                    },
                  });
                });
              }}
            >
              {toCommas(booker.txfa)}
            </span>
          </div>
          <div className="flex-1 text-center">
            <span>total</span>
            <span className="bwks relative font-semibold border border-slate-400 flex w-20 h-10 m-auto justify-center items-center rounded-md">
              {toCommas(total)}
              {total !== booker.total ? (
                <X className="absolute text-white bg-red-500 rounded-full inline-flex h-4 w-4 -right-2 -top-2" />
              ) : (
                <Check className="absolute text-white bg-red-500 rounded-full inline-flex h-4 w-4 -right-2 -top-2" />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashRooms;
