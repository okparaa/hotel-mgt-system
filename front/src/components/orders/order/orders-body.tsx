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

  console.log(searchOrders);

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
          const { days } = getDays({
            inDate: booking?.inDate!,
            outDate: booking?.outDate!,
          });
          if (booking?.curPrice) return total + booking?.curPrice * days;
          return total;
        }, 0) as number;

        const recovd =
          order.recoveries?.reduce((tot, recov) => {
            if (recov?.deleted) return tot;
            return (
              tot +
              (recov?.cash || 0) +
              (recov?.pos || 0) +
              (recov?.txfa || 0) +
              (recov?.debitAmt || 0)
            );
          }, 0) || 0;

        const TotalRecov = order.recoveries?.map((recov) => {
          if (recov?.deleted) return null;
          const total =
            (recov?.cash ? recov?.cash : 0) +
            (recov?.pos ? recov?.pos : 0) +
            (recov?.txfa ? recov?.txfa : 0) +
            (recov?.debitAmt ? recov?.debitAmt : 0);

          return (
            <span
              id={recov?.id}
              className="badge naira"
              onClick={(e) => {
                console.log((e.target as HTMLSpanElement).id);
              }}
            >
              {toCommas(total)}
            </span>
          );
        });

        const deposit =
          (order?.cash || 0) + (order?.pos || 0) + (order?.txfa || 0);
        const isOk = total === deposit + recovd;
        const isOver = total < deposit + recovd;

        return (
          <tr key={order.id} id={order.id} className="bg-tr">
            <td>
              <div className="flex flex-col">
                <span>{ucwords(order.guestName)}</span>
              </div>
            </td>
            <td className="">
              <span className="text-base flex naira">{toCommas(deposit)}</span>
            </td>
            <td className="">
              <span className="text-base flex naira">
                {toCommas(order.amount)}
              </span>
            </td>
            <td>
              <div className="flex flex-wrap gap-1 justify-center text-sm">
                {recovd ? (
                  TotalRecov
                ) : (
                  <span className="badge w-[55px] text-center p-0">0</span>
                )}
              </div>
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
                      total: total - deposit - recovd,
                      guestName: order.guestName!,
                      guestEmail: order.guestEmail!,
                      guestPhone: order.guestPhone!,
                      bookables: order.bookings?.map((booking) => {
                        return {
                          roomId: booking?.room?.id!,
                          inDate: booking?.inDate!,
                          outDate: booking?.outDate!,
                          curPrice: booking?.room?.price,
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
                  <span>
                    {!isOk && toCommas(Math.abs(total - deposit - recovd))}
                  </span>
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

            <td className="text-center">
              <div className="flex justify-center flex-wrap w-full">
                {order.bookings?.map((booking) => {
                  const { days } = getDays({
                    inDate: booking?.inDate!,
                    outDate: booking?.outDate!,
                  });
                  return (
                    <div className=" w-32">
                      <Tooltip
                        text={
                          bookable[Number(booking?.room?.type)] +
                          " " +
                          booking?.room?.name
                        }
                      >
                        <div className="flex flex-col divide-y-2">
                          <span>
                            In:
                            <span className="ml-1">
                              {getDateFromTimestamp(booking?.inDate, "d-ms-y")}
                            </span>
                          </span>
                          <span>
                            Out:
                            <span className="ml-1">
                              {getDateFromTimestamp(booking?.outDate, "d-ms-y")}
                            </span>
                          </span>
                          <span className="naira ml-1">
                            {toCommas(booking?.curPrice! * days)}
                          </span>
                        </div>
                      </Tooltip>
                    </div>
                  );
                })}
              </div>
            </td>
            <td className="text-center">
              <span
                id={`${order.id}`}
                className={
                  !isOk && !isOver
                    ? `icon-span`
                    : `icon-span border-none !cursor-default`
                }
                onClick={() => {
                  updateChest({
                    data: {
                      id: order.id,
                      __typename: "Order",
                      name: "debits",
                      value: total - deposit - recovd,
                    },
                    type: "store",
                  });
                  !isOk && !isOver && navigate("/aio/debits/debits");
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
