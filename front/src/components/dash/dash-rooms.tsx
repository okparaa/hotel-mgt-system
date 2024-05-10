import { Sofa } from "lucide-react";
import { Room, useCancelBookingMutation, useRoomsQuery } from "../aio-urql";
import QueryResult from "../../lib/query-result";
import { Search } from "../../lib/search";
import { useChest } from "../../app-chest";
import { Booker } from "./partials/booker";
import {
  addDaysToDate,
  getDateFromTimestamp,
  getDays,
  getKey,
} from "../../lib/utils";
import { useState } from "react";
import Modal from "../../lib/modal";
import { ChestBook } from "../../lib/types";
import { BookingCheckout } from "./partials/booking-checkout";
import { bookable } from "../../config";

const DashRooms = () => {
  const [roomsRes] = useRoomsQuery();
  if (roomsRes.error || roomsRes.fetching) {
    return <QueryResult result={roomsRes} />;
  }

  const {
    data: { search, booker },
    updateChest,
  } = useChest();

  if (booker.hash === "") {
    updateChest({
      data: { ...booker, hash: getKey() + getKey() + getKey() + getKey() },
      type: "booker",
    });
  }

  const roomSearch = roomsRes.data?.rooms?.filter((room: any) => {
    const str = "room " + room.name + " room" + room.name;
    const searche = search || "";
    return str.includes(searche.toLowerCase());
  }) as Room[];

  const [openDel, setOpenDel] = useState(false); //for delete modal

  const [removeBookingRes, cancelBooking] = useCancelBookingMutation();

  return (
    <div className="flex flex-col-reverse md:flex-row">
      <Modal
        loading={removeBookingRes.fetching}
        onClose={() => setOpenDel(false)}
        action={cancelBooking}
        isOpen={openDel}
      >
        Are you sure?
      </Modal>
      <div className="w-full md:w-6/12 ml:w-7/12 lg:w-8/12 ">
        <div className="flex flex-wrap">
          <Search hasBtn={false} />
          {roomSearch?.map((room: Room) => {
            const today = new Date(new Date().setHours(14)).getTime();
            const inDate = new Date(room.booking?.inDate || "").getTime();
            const outDate = new Date(
              new Date(room.booking?.outDate || "").setHours(14)
            ).getTime();

            const isBooked =
              outDate >= today &&
              today >= inDate &&
              room.booking?.canceled !== true;

            if (!room) return <></>;
            const type = room.type as any;
            return (
              <span
                className={`${
                  isBooked
                    ? "bg-slate-600 text-white ring-4"
                    : "bg-fuchsia-50 py-2"
                } link-btn-room`}
                onClick={() => {
                  if (isBooked) {
                    updateChest({
                      data: {
                        delMsg: `Cancel [Room ${room.name}] booking?`,
                        id: room.booking?.id,
                      },
                      type: "store",
                    });
                    return setOpenDel(true);
                  }

                  if (
                    booker.bookables?.some((rum: ChestBook) => {
                      return rum.roomId === room.id;
                    })
                  ) {
                    return;
                  }
                  const ruum = {
                    type: Number(room.type),
                    roomId: room.id,
                    price: room.price,
                    inDate: getDateFromTimestamp(new Date().toDateString()),
                    outDate: getDateFromTimestamp(
                      addDaysToDate(new Date(), 1).toDateString()
                    ),
                    name: room.name,
                  } as ChestBook;

                  booker.bookables.push(ruum);
                  const newBooking = booker.bookables;

                  const total = newBooking.reduce(
                    (acc: number, book: ChestBook) => {
                      const { days } = getDays({
                        inDate: book.inDate,
                        outDate: book.outDate,
                      });
                      return acc + Number(book.price) * days;
                    },
                    0
                  );
                  updateChest({
                    type: "booker",
                    data: {
                      ...booker,
                      total,
                      bookables: newBooking,
                    },
                  });
                }}
              >
                <>
                  <Sofa className="w-5 h-5" />{" "}
                  <div className="flex flex-col justify-center pb-1">
                    <span className="text-center">
                      {bookable[type]} {room?.name}{" "}
                    </span>
                    <span className="text-sm pt-0 text-center opacity-55">
                      {isBooked
                        ? "Out: " +
                          getDateFromTimestamp(room.booking?.outDate, "d-msh-y")
                        : ""}
                    </span>
                  </div>
                </>
              </span>
            );
          })}
        </div>
      </div>
      <div className="w-full md:w-7/12 lg:w-4/12 min-w-[317px]">
        <div className="mb-4 bg-gradient-to-b to-slate-200 from-slate-400 rounded-md shadow-2xl p-2">
          <Booker />
          <BookingCheckout />
        </div>
      </div>
    </div>
  );
};

export default DashRooms;
