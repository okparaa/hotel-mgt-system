import { addInput, toCommas } from "../../../lib/utils";
import { useChest } from "../../../app-chest";
import { Trash2 } from "lucide-react";

export const TOrderCheckout = () => {
  const {
    data: { order_items },
    updateChest,
  } = useChest();

  const order = order_items;
  return (
    <div className="flex flex-col w-full px-2">
      <div className="font-extrabold bg-slate-600 text-white p-2 text-center text-xl my-2 rounded-md border-2">
        Sales: <span className="bwks">{toCommas(order_items.total)}</span>
      </div>
      <div className="flex font-semibold">
        <span className="text-center flex-1">Item</span>
        <span className="text-center flex-1">
          <span>Price</span>
        </span>
        <span className="text-center flex-1">
          <span>Qty</span>
        </span>
        <span className="px-2 flex items-center">
          <span>Del</span>
        </span>
      </div>
      {order_items.items?.map((item) => {
        return (
          <>
            <div className="order">
              <span className="orderspan">{item.name}</span>
              <span className="orderspan">
                <span
                  className="bwks border-y border-black cursor-text flex w-14 m-auto justify-center items-center rounded-sm"
                  onClick={(e) =>
                    addInput(e, (value) => {
                      const orda = {
                        itemId: item.itemId,
                        priceSold: value,
                        qtySold: item.qtySold,
                      };
                      const updatedItems: any = order.items.map((ord: any) => {
                        if (ord.itemId === orda.itemId) {
                          return { ...ord, ...orda };
                        }
                        return ord;
                      });
                      const total = updatedItems.reduce(
                        (acc: number, item: any) => {
                          return (
                            acc + Number(item.priceSold) * Number(item.qtySold)
                          );
                        },
                        0
                      );

                      updateChest({
                        type: "order_items",
                        data: {
                          cash: order.cash,
                          pos: order.pos,
                          txfa: order.txfa,
                          hash: order.hash,
                          total,
                          items: updatedItems,
                        },
                      });
                    })
                  }
                >
                  {toCommas(item.priceSold)}
                </span>
              </span>
              <span className="orderspan">
                <span
                  className="cursor-text border-y border-black flex w-12 m-auto justify-center items-center rounded-sm"
                  onClick={(e) =>
                    addInput(e, (value) => {
                      const orda = {
                        itemId: item.itemId,
                        priceSold: item.priceSold,
                        qtySold: value,
                      };
                      const updatedItems: any = order.items.map((ord: any) => {
                        if (ord.itemId === orda.itemId) {
                          return { ...ord, ...orda };
                        }
                        return ord;
                      });
                      const total = updatedItems.reduce(
                        (acc: number, item: any) => {
                          return (
                            acc + Number(item.priceSold) * Number(item.qtySold)
                          );
                        },
                        0
                      );
                      updateChest({
                        type: "order_items",
                        data: {
                          cash: order.cash,
                          pos: order.pos,
                          txfa: order.txfa,
                          hash: order.hash,
                          total,
                          items: updatedItems,
                        },
                      });
                    })
                  }
                >
                  {item.qtySold}
                </span>
              </span>
              <span className="p-2 flex items-center">
                <span
                  className="cursor-pointer"
                  id={item.itemId}
                  onClick={() => {
                    const updatedItems: any = order.items.filter(
                      (ord: any) => ord.itemId !== item.itemId
                    );
                    const total = updatedItems.reduce(
                      (acc: number, item: any) => {
                        return (
                          acc + Number(item.priceSold) * Number(item.qtySold)
                        );
                      },
                      0
                    );
                    updateChest({
                      type: "order_items",
                      data: {
                        cash: order.cash,
                        pos: order.pos,
                        txfa: order.txfa,
                        hash: order.hash,
                        total,
                        items: updatedItems,
                      },
                    });
                  }}
                >
                  <Trash2 size={20} className="ikon" />
                </span>
              </span>
            </div>
          </>
        );
      })}
    </div>
  );
};
