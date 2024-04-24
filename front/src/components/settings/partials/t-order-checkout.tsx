import { useState } from "react";
import {
  addInput,
  errorMsgHandler,
  toCommas,
  ucwords,
} from "../../../lib/utils";
import { useChest } from "../../../app-chest";
import { useNewOrderItemsMutation } from "../../aio-urql";
import { Check, RotateCcw, Save, X } from "lucide-react";

export const TOrderCheckout = () => {
  const {
    data: { order_items },
    updateChest,
  } = useChest();
  const [errorMsg, setErrorMsg] = useState("");
  const order = order_items;
  const denom = order.cash + order.pos + order.txfa;

  const [orderItemsRes, newOrderItems] = useNewOrderItemsMutation();
  if (orderItemsRes.error) {
    setErrorMsg(() => errorMsgHandler(orderItemsRes.error)?.message);
  }

  return (
    <>
      {order_items.items.length > 0 && (
        <>
          <tr>
            <td colSpan={5} className="h-2 bg-slate-700"></td>
          </tr>

          <tr className="checkout">
            <td colSpan={3} className="text-center amount">
              <span className="text-xl">
                <span>&#8358;</span>
                {toCommas(order_items.total)}
              </span>
            </td>
            <td colSpan={2}></td>
          </tr>
          <tr>
            <td colSpan={5} className="h-1 bg-slate-700"></td>
          </tr>
          <tr>
            <td colSpan={5} className="p-1 text-center">
              <div className="flex justify-between flex-wrap">
                <div className="!border-none">
                  <span>cash</span>
                  <span
                    className="bwks border-y border-slate-400 cursor-text flex w-20 h-10 m-auto justify-center items-center rounded-md"
                    onClick={(e) =>
                      addInput(e, (value) => {
                        updateChest({
                          type: "order_items",
                          data: {
                            cash: +value,
                            txfa: order.txfa,
                            pos: order.pos,
                            total: order.total,
                            items: order.items,
                            hash: order.hash,
                          },
                        });
                      })
                    }
                  >
                    {toCommas(order_items.cash)}
                  </span>
                </div>
                <div className="!border-none">
                  <span>pos</span>
                  <span
                    className="bwks border-y border-slate-400 cursor-text flex w-20 h-10 m-auto justify-center items-center rounded-md"
                    onClick={(e) =>
                      addInput(e, (value) => {
                        updateChest({
                          type: "order_items",
                          data: {
                            cash: order.cash,
                            txfa: order.txfa,
                            pos: +value,
                            total: order.total,
                            items: order.items,
                            hash: order.hash,
                          },
                        });
                      })
                    }
                  >
                    {toCommas(order_items.pos)}
                  </span>
                </div>
                <div className="!border-none">
                  <span>transfer</span>
                  <span
                    className="bwks border-y border-slate-400 cursor-tex flex w-20 h-10 m-auto justify-center items-center rounded-md"
                    onClick={(e) =>
                      addInput(e, (value) => {
                        updateChest({
                          type: "order_items",
                          data: {
                            cash: order.cash,
                            txfa: +value,
                            pos: order.pos,
                            total: order.total,
                            items: order.items,
                            hash: order.hash,
                          },
                        });
                      })
                    }
                  >
                    {toCommas(order_items.txfa)}
                  </span>
                </div>
                <div>
                  <span>total</span>
                  <span className="bwks relative border border-slate-400 flex w-20 h-10 m-auto justify-center items-center rounded-md">
                    {toCommas(denom)}
                    {denom !== order.total ? (
                      <X className="absolute text-white bg-red-500 rounded-full inline-flex h-4 w-4 -right-2 -top-2" />
                    ) : (
                      <Check className="absolute text-white bg-red-500 rounded-full inline-flex h-4 w-4 -right-2 -top-2" />
                    )}
                  </span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={5} className="h-2 bg-slate-700"></td>
          </tr>
          <tr>
            <td colSpan={5}>
              <div className="p-1 text-[16px] gap-10 flex justify-center">
                <button
                  onClick={() => {
                    updateChest({
                      type: "order_items",
                      data: {
                        cash: 0,
                        pos: 0,
                        txfa: 0,
                        hash: "",
                        total: 0,
                        items: [],
                      },
                    });
                  }}
                  className="px-4 shadow-md py-0 outline-1 bg-fuchsia-800 text-white border text-lg flex items-center gap-2 rounded-full"
                >
                  <RotateCcw /> <span className="pb-[3px]">reset</span>
                </button>
                <button
                  onClick={() => {
                    try {
                      newOrderItems({
                        orderItems: order_items.items,
                        pos: order_items.pos,
                        txfa: order_items.txfa,
                        cash: order_items.cash,
                      });
                    } catch (error) {}
                  }}
                  className="px-4 shadow-md pb-0 outline-1 bg-fuchsia-800 text-white border text-lg flex items-center gap-2 rounded-full"
                >
                  <Save />
                  <span className="pb-[3px]">save</span>
                </button>
              </div>
            </td>
          </tr>
          {errorMsg && (
            <tr>
              <td colSpan={5} style={{ border: "none" }}>
                <div className="text-2xl text-center pt-4 text-red-600">
                  {ucwords(errorMsg)}
                </div>
              </td>
            </tr>
          )}
        </>
      )}
    </>
  );
};
