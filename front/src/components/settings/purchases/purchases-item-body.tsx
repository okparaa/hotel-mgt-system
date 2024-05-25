import { CheckCircle } from "lucide-react";
import { getDateFromTimestamp, getKey, toCommas } from "../../../lib/utils";
import { Fragment, useRef } from "react";
import { useChest } from "../../../app-chest";
type PurchasesItemBodyProps = {
  searchItems?: any[];
};

export const PurchasesItemBody = ({ searchItems }: PurchasesItemBodyProps) => {
  const {
    data: { purchase, user },
    updateChest,
  } = useChest();

  const hashRef = useRef("");
  if (purchase.hash === "") {
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
          <td className="text-center naira">{toCommas(item.price)}</td>
          <td className="text-center">
            <span
              id={`${item.id}`}
              className="icon-span cursor-pointer"
              onClick={(e) => {
                const id = e.currentTarget.id;
                const createdAt = getDateFromTimestamp();
                if (
                  purchase.items.some((it) => {
                    return it.sku === item.sku;
                  })
                ) {
                  return;
                }

                purchase.items.push({
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
                    items: purchase.items,
                    hash: hashRef.current,
                  },
                  type: "purchase",
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
