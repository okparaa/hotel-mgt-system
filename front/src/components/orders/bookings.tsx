import { Order, OrdersQuery, useCancelBookingMutation } from "../aio-urql";
import QueryResult from "../../lib/query-result";
import { Search } from "../../lib/search";
import { useChest } from "../../app-chest";

import {
  getDateFromTimestamp,
  getDays,
  getKey,
  toCommas,
} from "../../lib/utils";
import { useState } from "react";
import Modal from "../../lib/modal";
import { BookingCheckout } from "../dash/partials/booking-checkout";
import { Table } from "../../lib/table";
import DatePicker from "../calendar/date-picker";
import { bookable, options } from "../../config";
import { ChestBook } from "../../lib/types";
import { Trash2 } from "lucide-react";
import { OrdersBody } from "./partials/orders-body";
import { useLazyQuery } from "../../lib/useLazyQuery";
import { ORDERS } from "../queries/orders-queries";

const OrdersBookings = () => {
  const [ordersRes, getBookings] = useLazyQuery<OrdersQuery>({
    query: ORDERS,
  });

  if (ordersRes.error || ordersRes.fetching) {
    return <QueryResult result={ordersRes} />;
  }

  const dateSelect = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const selectedDate = `${year}-${month}-${day}`;
    updateChest({ type: "store", data: { prev_date: selectedDate } });
    getBookings({ date: selectedDate });
  };

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

  const OrderBookingHead = (
    <tr>
      <th className="">NAME</th>
      <th className="!text-center">Room(s)</th>
      <th className="!text-center">Day(s)</th>
      <th className="!text-center">AMOUNT</th>
      <th className="!text-center w-20">PICK</th>
    </tr>
  );
  const searchOrders = ordersRes.data?.orders?.filter((order) => {
    const str = order?.bookings?.reduce((acc, booking) => {
      return acc + "room " + booking?.room?.name;
    }, "");
    const searche = search || "";
    return str?.includes(searche.toLowerCase());
  }) as Order[];

  const tBody = <OrdersBody searchOrders={searchOrders} />;

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
          <Table
            tHead={OrderBookingHead}
            tBody={tBody}
            Searche={<Search hasBtn={false} />}
          />
        </div>
      </div>
      <div className="w-full md:w-7/12 lg:w-4/12 min-w-[317px]">
        <div className="mb-4 bg-gradient-to-b to-slate-200 from-slate-400 rounded-md shadow-2xl p-2">
          <div>
            <div className="bg-slate-600 p-2 text-center my-2 rounded-md border-2 flex justify-between">
              <span className="text-xl flex items-center font-semibold text-white pl-3">
                Sales: <span className="bwks">{toCommas(booker.total)}</span>
              </span>
              <span className="bg-slate-400 flex items-center p-2 rounded-md">
                <DatePicker options={options} onSelectDate={dateSelect} />
              </span>
            </div>
            {booker.bookables?.map((book) => {
              return (
                <div className="booker rounded-md border-slate-600">
                  <span className="flex flex-col">
                    {bookable[book.type]} {book.name}{" "}
                    <strong>@{toCommas(book.price)}</strong>
                  </span>
                  <span className="flex items-center flex-col">
                    <span
                      style={{ padding: "0 5px 2px 5px" }}
                      className="text-black border-2 border-slate-600 text-sm rounded-md p-0 font-semibold"
                    >
                      {getDateFromTimestamp(book.inDate, "d-msh-y")}
                    </span>
                  </span>
                  <span className="flex items-center flex-col">
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
                          return acc + Number(book.price) * days;
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
          <BookingCheckout />
        </div>
      </div>
    </div>
  );
};

export default OrdersBookings;
