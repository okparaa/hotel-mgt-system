import { Activity, CheckCheck, UserCog2, X } from "lucide-react";
import {
  getDateFromTimestamp,
  getDays,
  getKey,
  toCommas,
  ucwords,
} from "../../../lib/utils";
import {
  Order,
  // useChangeOrderRecovMutation,
  // useRemoveOrderRecovMutation,
} from "../../aio-urql";
import { ChestBook, ChestBooker } from "../../../lib/types";
import { useChest } from "../../../app-chest";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { bookable } from "../../../config";
import Tooltip from "../../../lib/tooltip";
import { OrderModal } from "./order-modal";
type OrdersBodyProps = {
  searchOrders?: Order[];
};

export const OrdersBody = ({ searchOrders }: OrdersBodyProps) => {
  const [open, setOpen] = useState(false);
  const {
    data: { booker },
    updateChest,
  } = useChest();

  // const [changeOrderRecovRes, changeOrderRecov] = useChangeOrderRecovMutation();
  // const [removeOrderRecovRes, removeOrderRecov] = useRemoveOrderRecovMutation();
  if (booker.hash === "") {
    updateChest({
      data: { ...booker, hash: getKey() + getKey() + getKey() + getKey() },
      type: "booker",
    });
  }

  const navigate = useNavigate();

  return (
    <>
      <OrderModal
        open={open}
        onClose={() => setOpen(false)}
        balance={booker.total as number}
        guest={booker.guestName as string}
      />
      {searchOrders?.map((order: Order) => {
        const total = order.bookings?.reduce((total, booking) => {
          if (booking?.room?.price) return total + booking?.room?.price;
          return total;
        }, 0) as number;

        const recovd =
          order.recoveries?.reduce((tot, recov) => {
            return (
              tot +
              (recov?.cash || 0) +
              (recov?.pos || 0) +
              (recov?.txfa || 0) +
              (recov?.debitAmt || 0)
            );
          }, 0) || 0;

        const TRecov = order.recoveries?.map((recov) => {
          const total =
            (recov?.cash ? recov?.cash : 0) +
            (recov?.pos ? recov?.pos : 0) +
            (recov?.txfa ? recov?.txfa : 0) +
            (recov?.debitAmt ? recov?.debitAmt : 0);
          return (
            <span
              id={recov?.id}
              className="bg-slate-300 rounded-md p-1 cursor-pointer naira"
            >
              {toCommas(total)}
            </span>
          );
        });

        const recvd =
          (order?.cash || 0) + (order?.pos || 0) + (order?.txfa || 0) + recovd;
        const isOk = total === recvd;
        const isOver = total < recvd;

        return (
          <tr key={order.id} id={order.id} className="bg-tr">
            <td className="">{ucwords(order.guestName)}</td>
            <td className="text-center">
              {order.bookings?.map((booking) => {
                const { days } = getDays({
                  inDate: booking?.inDate!,
                  outDate: booking?.outDate!,
                });
                return (
                  <Tooltip
                    text={
                      bookable[Number(booking?.room?.type)] +
                      " " +
                      booking?.room?.name
                    }
                  >
                    <div className="flex flex-col divide-y-2">
                      <span>
                        checkin:{" "}
                        {getDateFromTimestamp(booking?.inDate, "d-ms-y")}
                      </span>
                      <span>
                        checkout:{" "}
                        {getDateFromTimestamp(booking?.outDate, "d-ms-y")}
                      </span>
                      <span className="naira ">
                        {toCommas(booking?.room?.price! * days)}
                      </span>
                    </div>
                  </Tooltip>
                );
              })}
            </td>
            <td className="text-center">
              <div className="flex justify-center">
                <span
                  onClick={() => {
                    if (isOk || isOver) return;
                    setOpen(true);
                    const oldBooking: ChestBooker = {
                      cash: 0,
                      pos: 0,
                      txfa: 0,
                      hash: booker.hash,
                      orderId: order.id,
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
                  className={`w-20 relative px-2 py-1 rounded-md ${
                    isOk
                      ? "bg-slate-300 flex justify-center"
                      : isOver
                      ? "bg-yellow-300 naira"
                      : "bg-red-400 cursor-pointer naira"
                  }`}
                >
                  <span>{!isOk && toCommas(Math.abs(total - recvd))}</span>
                  {isOk ? (
                    <CheckCheck size={20} className="ikon" />
                  ) : isOver ? (
                    <Activity className="absolute bg-slate-500 text-white rounded-full inline-flex h-4 w-4 -right-2 -top-2" />
                  ) : (
                    <X className="absolute text-white bg-red-700 rounded-full inline-flex h-4 w-4 -right-1 -top-1" />
                  )}
                </span>
              </div>
            </td>
            <td className="">
              <span className="text-xs flex flex-wrap gap-1">{TRecov}</span>
            </td>
            <td className="text-center">
              <span
                id={`${order.id}`}
                className={
                  !isOk && !isOver
                    ? `icon-span cursor-pointer`
                    : `icon-span border-none`
                }
                onClick={() => {
                  updateChest({
                    data: {
                      id: order.id,
                      __typename: "Order",
                      name: "debits",
                      value: total - recvd,
                    },
                    type: "store",
                  });
                  !isOk && !isOver && navigate("/aio/settings/debits");
                }}
              >
                {isOk || isOver ? (
                  <CheckCheck size={20} className="ikon" />
                ) : (
                  <UserCog2 size={20} className="ikon" />
                )}
              </span>
            </td>
          </tr>
        );
      })}
    </>
  );
};
