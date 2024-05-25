import { Trash2 } from "lucide-react";
import { addInput, toCommas } from "../../../lib/utils";
import { Fragment } from "react";
import { useChest } from "../../../app-chest";

type TOrderBodyProps = {
  pickedItems?: any;
};

export const TOrderBody = ({ pickedItems }: TOrderBodyProps) => {
  const {
    data: { orderItems: order },
    updateChest,
  } = useChest();

  return (
    <Fragment>
      {pickedItems?.map((item: any) => (
        <tr key={item.itemId} className="bg-tr">
          <td>{item.sku}</td>
          <td>{item.name}</td>
          <td>
            <span
              className="naira border-y cursor-text border-gray-400 flex w-9 h-8 m-auto justify-center items-center rounded-md"
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
                    type: "orderItems",
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
          </td>
          <td className="text-center">
            <span
              className="border-y cursor-text border-gray-400 flex w-9 h-8 m-auto justify-center items-center rounded-md"
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
                    type: "orderItems",
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
              {toCommas(item.qtySold)}
            </span>
          </td>
          <td className="!text-center">
            <span
              id={item.itemId}
              className="icon-span"
              onClick={() => {
                const updatedItems: any = order.items.filter(
                  (ord: any) => ord.itemId !== item.itemId
                );
                const total = updatedItems.reduce((acc: number, item: any) => {
                  return acc + Number(item.priceSold) * Number(item.qtySold);
                }, 0);
                updateChest({
                  type: "orderItems",
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
          </td>
        </tr>
      ))}
    </Fragment>
  );
};