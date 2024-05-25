import { CheckCircle } from "lucide-react";
import { getKey, toCommas } from "../../../lib/utils";
import { Fragment, useRef } from "react";
import { useChest } from "../../../app-chest";
import { Item } from "../../aio-urql";
import { ChestOrderItem } from "../../../lib/types";

type OrderItemBodyProps = {
  searchItems: Item[];
};

export const OrderItemBody = ({ searchItems }: OrderItemBodyProps) => {
  const {
    data: { orderItems: order, session },
    updateChest,
  } = useChest();

  const hashRef = useRef("");
  if (order.items.length === 0) {
    hashRef.current = getKey() + getKey() + getKey() + getKey();
  }

  return (
    <Fragment>
      {searchItems?.map((item: Item) => (
        <tr key={item.id} id={item.id} className="bg-tr">
          <td>{item.name}</td>
          <td className="text-center">{item.sku}</td>
          <td>{item.type}</td>
          <td>
            <span>&#8358;</span>
            {toCommas(item.price || 0)}
          </td>
          <td className="text-center">
            <span
              id={`${item.id}`}
              className="icon-span"
              onClick={() => {
                if (order.items.some((it: any) => it.itemId === item.id)) {
                  return;
                }
                const curr_order: ChestOrderItem = {
                  qtySold: 1,
                  priceSold: item.price!,
                  itemId: item.id,
                  name: item.name,
                  userId: session.id,
                  sku: item.sku!,
                };

                const total = Number(order.total) + Number(item.price);

                updateChest({
                  type: "orderItems",
                  data: {
                    hash: hashRef.current,
                    total,
                    cash: order.cash,
                    pos: order.pos,
                    txfa: order.txfa,
                    items: [...order.items, curr_order],
                  },
                });
              }}
            >
              <CheckCircle size={20} className="ikon" />
            </span>
          </td>
        </tr>
      ))}
    </Fragment>
  );
};
