import { Table } from "../../lib/table";
import { OrderCheckout } from "./order/order-checkout";
import { Item, useItemsQuery, useNewOrderItemsMutation } from "../aio-urql";
import { useChest } from "../../app-chest";
import QueryResult from "../../lib/query-result";
import { Search } from "../../lib/search";
import { errorMsgHandler, toCommas, ucwords } from "../../lib/utils";
import { Check, RotateCcw, Save, X } from "lucide-react";
import { useState } from "react";
import { AddInput } from "../../lib/add-input";
import { useParams } from "react-router-dom";
import { OrderItemBody } from "./order/order-item-body";

const Orders = () => {
  const [result] = useItemsQuery();
  const { data: dataItems, error } = result;
  if (error || !dataItems) return <QueryResult response={result} />;
  const {
    data: { search, orderItems },
    updateChest,
  } = useChest();

  const tItemHead = (
    <tr>
      <th>NAME</th>
      <th className="!text-center">SKU</th>
      <th className="text-center">DESC</th>
      <th className="">PRICE</th>
      <th className="!text-center">PICK</th>
    </tr>
  );

  const searchItems = dataItems?.items?.filter((item) => {
    const str = Object.values(item!).join(" ").toLowerCase();
    const searche = search || "";
    return str.includes(searche.toLowerCase());
  }) as Item[];

  const denom = orderItems.cash + orderItems.pos + orderItems.txfa;
  const [errorMsg, setErrorMsg] = useState("");
  const [orderItemsRes, newOrderItems] = useNewOrderItemsMutation();
  if (orderItemsRes.error) {
    setErrorMsg(() => errorMsgHandler(orderItemsRes.error)?.message);
  }
  const { section } = useParams();
  console.log(section);

  return (
    <div className="flex">
      <div className="w-full overflow-x-auto">
        <Table
          tHead={tItemHead}
          tBody={<OrderItemBody searchItems={searchItems} />}
          Search={<Search hasBtn={false} />}
        />
      </div>
      <div className="w-6 mx-1 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200"></div>
      <div className="w-[360px] rounded-md bg-gradient-to-b from-slate-200 to-slate-500">
        <OrderCheckout />
        <div className="flex justify-around border-2 border-slate-700 p-1 m-2 rounded-md">
          <div className="flex flex-col items-center">
            <span>Cash</span>
            <span className="cursor-text flex w-20 h-8 m-auto justify-center items-center rounded-md">
              <AddInput
                id={orderItems.hash}
                initialValue={orderItems.cash}
                className="border-slate-400"
                action={(value) => {
                  updateChest({
                    type: "orderItems",
                    data: {
                      cash: +value,
                      txfa: orderItems.txfa,
                      pos: orderItems.pos,
                      total: orderItems.total,
                      items: orderItems.items,
                      hash: orderItems.hash,
                    },
                  });
                }}
              />
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span>POS</span>
            <span className="border-y border-slate-300 cursor-text flex w-20 h-8 m-auto justify-center items-center rounded-md">
              <AddInput
                id={orderItems.hash}
                initialValue={orderItems.pos}
                className="border-slate-400"
                action={(value) => {
                  updateChest({
                    type: "orderItems",
                    data: {
                      cash: orderItems.cash,
                      txfa: orderItems.txfa,
                      pos: +value,
                      total: orderItems.total,
                      items: orderItems.items,
                      hash: orderItems.hash,
                    },
                  });
                }}
              />
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span>Txfer</span>
            <span className="border-y border-slate-300 cursor-tex flex w-20 h-8 m-auto justify-center items-center rounded-md">
              <AddInput
                id={orderItems.hash}
                initialValue={orderItems.txfa}
                className="border-slate-400"
                action={(value) => {
                  updateChest({
                    type: "orderItems",
                    data: {
                      cash: orderItems.cash,
                      txfa: +value,
                      pos: orderItems.pos,
                      total: orderItems.total,
                      items: orderItems.items,
                      hash: orderItems.hash,
                    },
                  });
                }}
              />
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span>Total</span>
            <span className="naira relative bg-slate-600 border-2 text-white flex w-20 h-8 m-auto justify-center items-center rounded-md">
              {toCommas(denom)}
              {denom !== orderItems.total ? (
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
                type: "orderItems",
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
                  orderItems: orderItems.items,
                  pos: orderItems.pos,
                  txfa: orderItems.txfa,
                  cash: orderItems.cash,
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
