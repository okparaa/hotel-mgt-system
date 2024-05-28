import { Sofa } from "lucide-react";
import {
  RoomsQuery,
  useCancelBookingMutation,
  useRoomsQuery,
} from "../aio-urql";
import QueryResult from "../../lib/query-result";
import { Search } from "../../lib/search";
import { useChest } from "../../app-chest";
import { Booker } from "./partials/booker";
import {
  addDaysToDate,
  getDateFromTimestamp,
  getDays,
  getKey,
  ucwords,
} from "../../lib/utils";
import { useState } from "react";
import Modal from "../../lib/modal";
import { ChestBook } from "../../lib/types";
import { BookingCheckout } from "./partials/booking-checkout";

const DashRooms = () => {
  const [roomsRes] = useRoomsQuery();
  if (roomsRes.error || roomsRes.fetching) {
    return <QueryResult response={roomsRes} />;
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

  const roomSearch: RoomsQuery["rooms"] = roomsRes.data?.rooms?.filter(
    (room: any) => {
      const str = "room " + room.name + " room" + room.name;
      return str.includes(search.toLowerCase());
    }
  );

  const [openDel, setOpenDel] = useState(false); //for delete modal

  const [removeBookingRes, cancelBooking] = useCancelBookingMutation();

  return (
    <>
      <div className="bg-slate-400 bg-gradient-to-b from-slate-200 to-slate-400 font-extrabold text-2xl p-2 ml-2 text-center mb-2 rounded-md">
        Front Desk
      </div>
      <div className="flex flex-col-reverse md:flex-row">
        <Modal
          loading={removeBookingRes.fetching}
          onClose={() => setOpenDel(false)}
          action={cancelBooking}
          isOpen={openDel}
        >
          Are you sure?
        </Modal>
        <div className="w-8/12">
          <div className="flex flex-wrap">
            <div className="w-full flex justify-center">
              <span className="w-[97.5%]">
                <Search hasBtn={false} />
              </span>
            </div>
            {roomSearch?.map((room) => {
              const today = new Date(new Date().setHours(14)).getTime();
              const inDate = new Date(room?.booking?.inDate || "").getTime();
              const outDate = new Date(
                new Date(room?.booking?.outDate || "").setHours(14)
              ).getTime();

              const isBooked =
                outDate >= today &&
                today >= inDate &&
                room?.booking?.canceled !== true;

              if (!room) return <></>;
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
                          delMsg: `Cancel [${ucwords(room.type)} ${
                            room.name
                          }] booking?`,
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
                      type: room.type,
                      roomId: room.id,
                      curPrice: room.price,
                      inDate: getDateFromTimestamp(new Date().toDateString()),
                      outDate: getDateFromTimestamp(
                        addDaysToDate(new Date(), 1).toDateString()
                      ),
                      name: room.name,
                    } as ChestBook;
                    console.log(ruum);

                    booker.bookables.push(ruum);
                    const newBooking = booker.bookables;

                    const total = newBooking.reduce(
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
                        bookables: newBooking,
                      },
                    });
                  }}
                >
                  <>
                    <Sofa className="w-5 h-5" />{" "}
                    <div className="flex flex-col justify-center pb-1">
                      <span className="text-center">
                        {ucwords(room.type)} {room?.name}{" "}
                      </span>
                      <span className="text-sm pt-0 text-center opacity-55">
                        {isBooked
                          ? "Out: " +
                            getDateFromTimestamp(
                              room.booking?.outDate,
                              "d-msh-y"
                            )
                          : ""}
                      </span>
                    </div>
                  </>
                </span>
              );
            })}
          </div>
        </div>
        <div className="w-[460px] min-h-full">
          <div className="mb-4 min-h-full bg-gradient-to-b to-slate-200 from-slate-400 rounded-md shadow-2xl p-2">
            <Booker />
            <BookingCheckout />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashRooms;
