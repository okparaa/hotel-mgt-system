import { CheckCircle } from "lucide-react";
import { getKey, toCommas } from "../../../lib/utils";
import { Fragment, useRef } from "react";
import { useChest } from "../../../state-mgr/app-chest";

type TItemBodyProps = {
  searchItems?: any[];
};

export const TOrderItemBody = ({ searchItems }: TItemBodyProps) => {
  const {
    data: { session, order_items: order },
    updateChest,
  } = useChest();

  const hashRef = useRef("");
  if (order.items.length === 0) {
    hashRef.current = getKey() + getKey() + getKey() + getKey();
  }
  return (
    <Fragment>
      {searchItems?.map((item: any) => (
        <tr key={item.id} id={item.id} className="bg-tr">
          <td>{item.name}</td>
          <td className="text-center">{item.sku}</td>
          <td>
            <span>&#8358;</span>
            {toCommas(item.price)}
          </td>
          <td className="text-center">
            <span
              id={`${item.id}`}
              className="icon-span"
              onClick={() => {
                if (order.items.some((it: any) => it.itemId === item.id)) {
                  return;
                }
                const curr_order = {
                  itemId: item.id,
                  userId: session.id,
                  name: item.name,
                  sku: item.sku,
                  qtySold: "1",
                  priceSold: item.price,
                  hash: hashRef.current,
                };

                const total = Number(order.total) + Number(item.price);

                updateChest({
                  type: "order_items",
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
