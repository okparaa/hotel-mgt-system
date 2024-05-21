import { Check, RotateCcw, Save, X } from "lucide-react";
import { initBooking, useChest } from "../../../app-chest";
import { errorMsgHandler, toCommas, ucwords } from "../../../lib/utils";
import { useEffect, useState } from "preact/compat";
import { useRecoverMutation } from "../../aio-urql";
import { AddInput } from "../../../lib/add-input";

type OrdersCheckoutProps = {};
export const OrdersCheckout = ({}: OrdersCheckoutProps) => {
  const {
    data: { booker, session },
    updateChest,
  } = useChest();
  const total = booker.cash + booker.pos + booker.txfa;

  const [errorMsg, setErrorMsg] = useState("");
  const [recoverMutateRes, recoverMutate] = useRecoverMutation();

  useEffect(() => {
    !recoverMutateRes.error &&
      updateChest({
        type: "booker",
        data: initBooking,
      });
    recoverMutateRes.error &&
      setErrorMsg(() => errorMsgHandler(recoverMutateRes.error)?.message);
  }, [recoverMutateRes.data, recoverMutateRes.error]);

  return (
    <div>
      {booker.bookables.length > 0 && (
        <div className="border border-slate-600 rounded-md my-1 pl-4">
          Guest: <span className="font-bold">{ucwords(booker.guestName)}</span>
        </div>
      )}
      {booker.bookables.length > 0 && (
        <>
          <div className="flex border-2 border-slate-600 py-2 mt-2 rounded-md">
            <div className="flex-1 text-center checkout">
              <span>Cash</span>
              <span className="border-y cursor-text border-black flex w-10/12 m-auto justify-center items-center rounded-md h-10">
                <AddInput
                  id={booker.hash}
                  initialValue={booker.cash}
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
              <span className="border-y cursor-text border-black flex w-10/12 h-10 m-auto justify-center items-center rounded-md">
                <AddInput
                  id={booker.hash}
                  initialValue={booker.pos}
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
              <span className="border-y cursor-text border-black flex w-10/12 h-10 m-auto justify-center items-center rounded-md">
                <AddInput
                  id={booker.hash}
                  initialValue={booker.txfa}
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
              <span className="bg-slate-600 text-white relative font-semibold border border-black flex w-20 h-10 m-auto justify-center items-center rounded-md">
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
                  await recoverMutate({
                    recovery: {
                      pos: booker.pos,
                      txfa: booker.txfa,
                      cash: booker.cash,
                      userId: session.id,
                      orderId: booker.orderId,
                      hash: booker.hash,
                    },
                  });
                } catch (error) {}
              }}
              className="px-4 shadow-md pb-0 outline-1 bg-slate-600 text-white border text-lg flex items-center gap-2 rounded-full"
            >
              <Save />
              <span className="pb-[3px]">save</span>
            </button>
          </div>
        </>
      )}
      {errorMsg && (
        <div className="text-2xl text-center pt-4 text-red-600">
          {ucwords(errorMsg)}
        </div>
      )}
    </div>
  );
};
