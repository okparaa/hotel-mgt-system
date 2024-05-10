import { Table } from "../../lib/table";
import { TOrderItemBody } from "./partials/t-order-item-body";
import { TOrderCheckout } from "./partials/t-order-checkout";
import { Item, useItemsQuery, useNewOrderItemsMutation } from "../aio-urql";
import { useChest } from "../../app-chest";
import QueryResult from "../../lib/query-result";
import { Search } from "../../lib/search";
import { addInput, errorMsgHandler, toCommas, ucwords } from "../../lib/utils";
import { Check, RotateCcw, Save, X } from "lucide-react";
import { useState } from "react";

const Orders = () => {
  const [result] = useItemsQuery();
  const { data: dataItems, error } = result;
  if (error || !dataItems) return <QueryResult result={result} />;
  const {
    data: { search, order_items: order },
    updateChest,
  } = useChest();

  const tItemHead = (
    <tr>
      <th>NAME</th>
      <th className="!text-center">SKU</th>
      <th>PRICE</th>
      <th className="!text-center">PICK</th>
    </tr>
  );

  const searchItems = dataItems?.items?.filter((item) => {
    const str = Object.values(item!).join(" ").toLowerCase();
    const searche = search || "";
    return str.includes(searche.toLowerCase());
  }) as Item[];

  const tItemBody = <TOrderItemBody searchItems={searchItems} />;
  const denom = order.cash + order.pos + order.txfa;
  const [errorMsg, setErrorMsg] = useState("");
  const [orderItemsRes, newOrderItems] = useNewOrderItemsMutation();
  if (orderItemsRes.error) {
    setErrorMsg(() => errorMsgHandler(orderItemsRes.error)?.message);
  }

  return (
    <div className="flex">
      <div className="basis-6/12 overflow-x-auto">
        <Table
          tHead={tItemHead}
          tBody={tItemBody}
          Searche={<Search hasBtn={false} />}
        />
      </div>
      <div className="w-6 mx-1 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200"></div>
      <div className="w-5/12 rounded-md bg-gradient-to-b from-slate-400 to-slate-600">
        <TOrderCheckout />
        <div className="flex justify-around border-2 p-3 m-2 rounded-md">
          <div className="flex flex-col items-center">
            <span>Cash</span>
            <span
              className="bwks border-y border-slate-300 cursor-text flex w-16 h-8 m-auto justify-center items-center rounded-md"
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
              {toCommas(order.cash)}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span>POS</span>
            <span
              className="bwks border-y border-slate-300 cursor-text flex w-16 h-8 m-auto justify-center items-center rounded-md"
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
              {toCommas(order.pos)}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span>Txfer</span>
            <span
              className="bwks border-y border-slate-300 cursor-tex flex w-16 h-8 m-auto justify-center items-center rounded-md"
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
              {toCommas(order.txfa)}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span>Total</span>
            <span className="bwks relative bg-slate-600 border-2 text-white flex w-16 h-8 m-auto justify-center items-center rounded-md">
              {toCommas(denom)}
              {denom !== order.total ? (
                <X className="absolute text-white bg-red-500 rounded-full inline-flex h-4 w-4 -right-2 -top-2" />
              ) : (
                <Check className="absolute text-white bg-red-500 rounded-full inline-flex h-4 w-4 -right-2 -top-2" />
              )}
            </span>
          </div>
        </div>
        <div className="p-1 text-[16px] gap-10 flex justify-center mt-3">
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
            className="px-4 shadow-md py-0 outline-1 bg-slate-600 text-white border text-lg flex items-center gap-2 rounded-full"
          >
            <RotateCcw /> <span className="pb-[3px]">reset</span>
          </button>
          <button
            onClick={() => {
              try {
                newOrderItems({
                  orderItems: order.items,
                  pos: order.pos,
                  txfa: order.txfa,
                  cash: order.cash,
                });
              } catch (error) {}
            }}
            className="px-4 shadow-md pb-0 outline-1 bg-slate-600 text-white border text-lg flex items-center gap-2 rounded-full"
          >
            <Save />
            <span className="pb-[3px]">save</span>
          </button>
        </div>
        {errorMsg && (
          <div className="text-2xl text-center pt-4 text-red-600">
            {ucwords(errorMsg)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
