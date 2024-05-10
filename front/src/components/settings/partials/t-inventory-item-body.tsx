import { CheckCircle } from "lucide-react";
import { getDateFromTimestamp, getKey, toCommas } from "../../../lib/utils";
import { Fragment, useRef } from "react";
import { useChest } from "../../../app-chest";
type TItemBodyProps = {
  searchItems?: any[];
};

export const TInventoryItemBody = ({ searchItems }: TItemBodyProps) => {
  const {
    data: { inventory, user },
    updateChest,
  } = useChest();

  const hashRef = useRef("");
  if (inventory.hash === "") {
    hashRef.current = getKey() + getKey() + getKey() + getKey();
  }

  return (
    <Fragment>
      {searchItems?.map((item: any) => (
        <tr key={item.id} id={item.id} className="bg-tr">
          <td>{item.name}</td>
          <td className="text-center">{item.sku}</td>
          <td className="text-center">{item.qtyBought}</td>
          <td className="text-center">{item.type}</td>
          <td className="text-center bwks">{toCommas(item.price)}</td>
          <td className="text-center">
            <span
              id={`${item.id}`}
              className="icon-span"
              onClick={(e) => {
                const id = e.currentTarget.id;
                const createdAt = getDateFromTimestamp();
                if (
                  inventory.items.some((it) => {
                    return it.sku === item.sku;
                  })
                ) {
                  return;
                }

                inventory.items.push({
                  priceBought: 0,
                  qtyBought: 1,
                  itemId: id,
                  userId: user.id,
                  createdAt,
                  name: item.name,
                  sku: item.sku,
                });

                updateChest({
                  data: {
                    items: inventory.items,
                    hash: hashRef.current,
                  },
                  type: "inventory",
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
