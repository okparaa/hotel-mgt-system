import { Check, CheckCircle, X } from "lucide-react";
import {
  getDateFromTimestamp,
  getKey,
  toCommas,
  ucwords,
} from "../../../lib/utils";
import { Fragment } from "react";
import { Order } from "../../aio-urql";
import { ChestBook, ChestBooker } from "../../../lib/types";
import { useChest } from "../../../app-chest";
type OrdersBodyProps = {
  searchOrders?: Order[];
};

export const OrdersBody = ({ searchOrders }: OrdersBodyProps) => {
  const {
    data: { booker },
    updateChest,
  } = useChest();

  if (booker.hash === "") {
    updateChest({
      data: { ...booker, hash: getKey() + getKey() + getKey() + getKey() },
      type: "booker",
    });
  }
  return (
    <Fragment>
      {searchOrders?.map((order: Order) => {
        const total = order.bookings?.reduce((total, booking) => {
          if (booking?.room?.price) return total + booking?.room?.price;
          return total;
        }, 0) as number;

        const recvd =
          (order?.cash || 0) + (order?.pos || 0) + (order?.txfa || 0);

        const isComplete = total === recvd;

        return (
          <tr key={order.id} id={order.id} className="bg-tr">
            <td>{ucwords(order.guestName)}</td>
            <td className="text-center">
              <div className="flex flex-col">
                {order.bookings?.map((booking) => {
                  return (
                    <span className="text-sm">
                      {booking?.room?.name +
                        ": exp " +
                        getDateFromTimestamp(booking?.outDate, "d-msh-y")}
                    </span>
                  );
                })}
              </div>
            </td>
            <td className="text-center bwks">{total}</td>
            <td className={`text-center`}>
              <span
                className={`bwks relative px-2 py-1 rounded-md ${
                  isComplete ? "" : "bg-red-300"
                }`}
              >
                {toCommas(recvd)}
                {isComplete ? (
                  <Check className="absolute text-white bg-red-700 rounded-full inline-flex h-4 w-4 -right-1 -top-1" />
                ) : (
                  <X className="absolute text-white bg-red-700 rounded-full inline-flex h-4 w-4 -right-1 -top-1" />
                )}
              </span>
            </td>
            <td className="text-center">
              <span
                id={`${order.id}`}
                className="icon-span"
                onClick={() => {
                  console.log(order);
                  const oldBooking: ChestBooker = {
                    cash: 0,
                    pos: 0,
                    txfa: 0,
                    hash: booker.hash,
                    total: total - recvd,
                    guestName: order.guestName!,
                    guestEmail: order.guestEmail!,
                    guestPhone: order.guestPhone!,
                    bookables: order.bookings?.map((booking) => {
                      return {
                        roomId: booking?.room?.id!,
                        inDate: booking?.inDate!,
                        outDate: booking?.outDate!,
                        price: booking?.room?.price!,
                        name: booking?.room?.name!,
                        type: +booking?.room?.type!,
                      };
                    }) as ChestBook[],
                  };
                  updateChest({
                    type: "booker",
                    data: oldBooking,
                  });
                }}
              >
                <CheckCircle size={20} className="ikon" />
              </span>
            </td>
          </tr>
        );
      })}
    </Fragment>
  );
};
