import { Check, Loader2, RotateCcw, Save, X } from "lucide-react";
import { initBooking, useChest } from "../../../app-chest";
import { Accordion } from "../../../lib/accordion";
import { errorMsgHandler, toCommas, ucwords } from "../../../lib/utils";
import { ChestBook } from "../../../lib/types";
import { TargetedEvent, useEffect, useState } from "preact/compat";
import { useBookerMutation } from "../../aio-urql";
import { AddInput } from "../../../lib/add-input";

type BookingCheckoutProps = {};
export const BookingCheckout = ({}: BookingCheckoutProps) => {
  const {
    data: { booker, session },
    updateChest,
  } = useChest();
  const total = booker.cash + booker.pos + booker.txfa;

  const [errorMsg, setErrorMsg] = useState("");
  const [bookMutateRes, bookerMutate] = useBookerMutation();

  useEffect(() => {
    bookMutateRes.error &&
      setErrorMsg(() => errorMsgHandler(bookMutateRes.error)?.message);
  }, [bookMutateRes.data, bookMutateRes.error]);

  const handleChange = (e: TargetedEvent<HTMLInputElement, Event>) => {
    const target = e.target as HTMLInputElement;
    setErrorMsg("");
    updateChest({
      data: {
        ...booker,
        [target.name]: target.value,
      },
      type: "booker",
    });
  };
  return (
    <div>
      <Accordion
        className="border border-slate-600 rounded-md my-1"
        title="Guest Details"
        extra={`${ucwords(booker.guestName)}`}
      >
        <>
          <input
            type="text"
            className="mb-1 outline-none px-2 py-1 rounded-md w-full bg-slate-100"
            placeholder="Guest Name"
            value={booker.guestName}
            name="guestName"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            className="mb-1 outline-none px-2 py-1 rounded-md w-full bg-slate-100"
            placeholder="Guest Phone"
            value={booker.guestPhone}
            name="guestPhone"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            className="mb-1 outline-none px-2 py-1 rounded-md w-full bg-slate-100"
            placeholder="Guest Email"
            value={booker.guestEmail}
            name="guestEmail"
            onChange={(e) => handleChange(e)}
          />
        </>
      </Accordion>

      <div className="flex gap-1 border-2 border-slate-600 py-2 px-1 mt-2 rounded-md">
        <div className="flex-1 text-center checkout">
          <span>Cash</span>
          <span className="border-y cursor-text border-black flex m-auto justify-center items-center rounded-md">
            <AddInput
              id={booker.hash}
              initialValue={booker.cash}
              className="border-slate-400"
              action={(value) => {
                updateChest({
                  type: "booker",
                  data: {
                    ...booker,
                    cash: +value,
                  },
                });
              }}
            />
          </span>
        </div>
        <div className="flex-1 text-center">
          <span>POS</span>
          <span className="border-y cursor-text border-black flex m-auto justify-center items-center rounded-md">
            <AddInput
              id={booker.hash}
              initialValue={booker.pos}
              className="border-slate-400"
              action={(value) => {
                updateChest({
                  type: "booker",
                  data: {
                    ...booker,
                    pos: +value,
                  },
                });
              }}
            />
          </span>
        </div>
        <div className="flex-1 text-center">
          <span>Txfer</span>
          <span className="border-y cursor-text border-black flex m-auto justify-center items-center rounded-md">
            <AddInput
              id={booker.hash}
              initialValue={booker.txfa}
              className="border-slate-400"
              action={(value) => {
                updateChest({
                  type: "booker",
                  data: {
                    ...booker,
                    txfa: +value,
                  },
                });
              }}
            />
          </span>
        </div>
        <div className="flex-1 text-center">
          <span>Total</span>
          <span className="naira bg-slate-600 text-white relative font-semibold border border-black flex m-auto justify-center items-center rounded-md h-[30px]">
            {toCommas(total)}
            {total !== booker.total ? (
              <X className="absolute text-white bg-red-700 rounded-full inline-flex h-4 w-4 -right-2 -top-2" />
            ) : (
              <Check className="absolute text-white bg-red-700 rounded-full inline-flex h-4 w-4 -right-2 -top-2" />
            )}
          </span>
        </div>
      </div>

      <div className="p-1 text-[16px] gap-10 flex justify-center mt-3">
        <button
          onClick={() => {
            updateChest({
              type: "booker",
              data: initBooking,
            });
          }}
          className="px-4 shadow-md py-0 outline-1 bg-slate-600 text-white border text-lg flex items-center gap-2 rounded-full"
        >
          <RotateCcw /> <span className="pb-[3px]">reset</span>
        </button>
        <button
          onClick={async () => {
            try {
              await bookerMutate({
                books: booker.bookables.map((book: ChestBook) => ({
                  roomId: book.roomId,
                  price: book.price,
                  inDate: book.inDate,
                  outDate: book.outDate,
                })),
                detail: {
                  pos: booker.pos,
                  txfa: booker.txfa,
                  cash: booker.cash,
                  total: booker.total,
                  userId: session.id,
                  hash: booker.hash,
                  guestEmail: booker.guestEmail,
                  guestPhone: booker.guestPhone,
                  guestName: booker.guestName,
                },
              });
            } catch (error) {}
          }}
          className="px-4 shadow-md pb-0 outline-1 bg-slate-600 text-white border text-lg flex items-center gap-2 rounded-full"
        >
          {bookMutateRes.fetching ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Save />
          )}
          <span className="pb-[3px]">save</span>
        </button>
      </div>
      {errorMsg && (
        <div className="text-2xl text-center pt-4 text-red-600">
          {ucwords(errorMsg)}
        </div>
      )}
    </div>
  );
};
