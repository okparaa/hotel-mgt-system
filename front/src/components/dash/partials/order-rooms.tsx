import { CheckCircle } from "lucide-react";
import { getKey, toCommas } from "../../../lib/utils";
import { Fragment, useRef } from "react";
import { useChest } from "../../../state-mgr/app-chest";

type OrderRoomsProps = {
  searchRooms?: any[];
};

export const OrderRooms = ({ searchRooms }: OrderRoomsProps) => {
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
      {searchRooms?.map((room: any) => (
        <div key={room.id} id={room.id} className="bg-tr">
          <div>{room.name}</div>
          <div className="text-center">{room.sku}</div>
          <div>
            <span>&#8358;</span>
            {toCommas(room.price)}
          </div>
          <div className="text-center">
            <span
              id={`${room.id}`}
              className="icon-span"
              onClick={() => {
                if (order.items.some((it: any) => it.roomId === room.id)) {
                  return;
                }
                const curr_order = {
                  roomId: room.id,
                  userId: session.id,
                  name: room.name,
                  sku: room.sku,
                  priceSold: room.price,
                  hash: hashRef.current,
                };

                const total = Number(order.total) + Number(room.price);

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
          </div>
        </div>
      ))}
    </Fragment>
  );
};
