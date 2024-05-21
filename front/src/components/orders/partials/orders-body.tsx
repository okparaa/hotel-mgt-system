import {
  Check,
  CheckCheck,
  CheckCircle,
  HelpCircle,
  Loader2,
  Save,
  Trash2,
  UserCog2,
  X,
} from "lucide-react";
import {
  getDateFromTimestamp,
  getKey,
  toCommas,
  ucwords,
} from "../../../lib/utils";
import {
  Order,
  useChangeOrderRecovMutation,
  useRemoveOrderRecovMutation,
} from "../../aio-urql";
import { ChestBook, ChestBooker } from "../../../lib/types";
import { useChest } from "../../../app-chest";
import { useNavigate } from "react-router-dom";
import FormModal from "../../../lib/form-modal";
import { useState } from "react";
import DatePicker from "../../calendar/date-picker";
import { options } from "../../../config";
type OrdersBodyProps = {
  searchOrders?: Order[];
};

export const OrdersBody = ({ searchOrders }: OrdersBodyProps) => {
  const [open, setOpen] = useState(false);
  const {
    data: { booker, store },
    updateChest,
  } = useChest();

  const [changeOrderRecovRes, changeOrderRecov] = useChangeOrderRecovMutation();
  const [removeOrderRecovRes, removeOrderRecov] = useRemoveOrderRecovMutation();
  if (booker.hash === "") {
    updateChest({
      data: { ...booker, hash: getKey() + getKey() + getKey() + getKey() },
      type: "booker",
    });
  }
  const navigate = useNavigate();
  const dateSelect = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const selectedDate = `${year}-${month}-${day}`;
    updateChest({ type: "store", data: { prevDate: selectedDate } });
  };

  return (
    <>
      <FormModal
        isOpen={open}
        onClose={() => setOpen(false)}
        className="p-4 rounded-xl shadow-xl backdrop:bg-gray-800 backdrop:bg-opacity-45 w-[375px] min-h-[306px]"
      >
        <div className="flex flex-col">
          <span className="flex items-center justify-between gap-3">
            <span className="w-32 h-7 border rounded-md text-base">
              {getDateFromTimestamp(store.prevDate, "d-msh-y")}
            </span>
            <span className="link bg-slate-300 cursor-pointer !rounded-md !px-1 mr-6">
              <DatePicker options={options} onSelectDate={dateSelect} />
            </span>
          </span>
          <div className="flex justify-center mt-6 h-full">
            <label htmlFor="debit-aim" className="mr-3">
              Debit:
            </label>
            <span
              className={`border naira cursor-text border-gray-400 flex w-24 h-8 rounded-md items-center ${
                changeOrderRecovRes.fetching || removeOrderRecovRes.fetching
                  ? "opacity-25"
                  : ""
              }`}
            >
              {changeOrderRecovRes.fetching ? (
                <Loader2 className="animate-spin" />
              ) : (
                <input
                  type="text"
                  id="debit-aim"
                  className="w-11/12 outline-none focus:border-slate-600 focus:border-y-[1px]"
                  value={store?.value}
                  onChange={(e) => {
                    const value = (e.target as HTMLInputElement).value;
                    updateChest({ data: { value }, type: "debit" });
                  }}
                />
              )}
            </span>
          </div>
          <span className="flex justify-around mt-3">
            <span
              onClick={async () => {
                await removeOrderRecov({
                  id: store.id,
                });
                setOpen(false);
              }}
              className="link bg-slate-300 cursor-pointer mr-2 !rounded-md"
            >
              {removeOrderRecovRes.fetching ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span className="flex flex-col items-center w-10">
                  <Trash2 />
                  <span className="text-sm">delete</span>
                </span>
              )}
            </span>
            <span
              onClick={async () => {
                await changeOrderRecov({
                  recov: {
                    id: store.id,
                    pos: booker.pos,
                    cash: booker.cash,
                    txfa: booker.txfa,
                  },
                });
                setOpen(false);
              }}
              className="link bg-slate-300 cursor-pointer mr-2 !rounded-md"
            >
              {removeOrderRecovRes.fetching ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span className="flex flex-col items-center w-10">
                  <Save />
                  <span className="text-sm">save</span>
                </span>
              )}
            </span>
          </span>
        </div>
      </FormModal>

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
              onClick={() => {
                setOpen(true);
              }}
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
              <div className="flex flex-col">
                {order.bookings?.map((booking) => {
                  return (
                    <span className="text-sm">
                      {"R " +
                        booking?.room?.name +
                        ": " +
                        getDateFromTimestamp(booking?.outDate, "d-ms-y")}
                    </span>
                  );
                })}
              </div>
            </td>
            <td className="text-center flex flex-col items-center justify-center">
              <span className="naira">{toCommas(total)}</span>
              <span
                className={`naira flex w-20 relative px-2 py-1 rounded-md ${
                  isOk
                    ? "bg-slate-300 !p-1"
                    : isOver
                    ? "bg-yellow-300"
                    : "bg-red-400"
                }`}
              >
                <span>{toCommas(recvd)}</span>
                {isOk ? (
                  <Check className="absolute text-white bg-slate-500 rounded-full inline-flex h-4 w-4 -right-1 -top-1" />
                ) : isOver ? (
                  <HelpCircle className="absolute text-white bg-yellow-700 rounded-full inline-flex h-5 w-5 -right-2 -top-2" />
                ) : (
                  <X className="absolute text-white bg-red-700 rounded-full inline-flex h-4 w-4 -right-1 -top-1" />
                )}
              </span>
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
            <td className="text-center">
              <span
                id={`${order.id}`}
                className={
                  !isOk ? `icon-span cursor-pointer` : `icon-span border-none`
                }
                onClick={() => {
                  if (isOk) return;
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
              >
                {isOk ? (
                  <CheckCheck size={20} className="ikon" />
                ) : (
                  <CheckCircle size={20} className="ikon" />
                )}
              </span>
            </td>
          </tr>
        );
      })}
    </>
  );
};
