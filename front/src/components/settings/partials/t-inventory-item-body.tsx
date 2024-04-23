import { CheckCircle } from "lucide-react";
import { getDateFromTimestamp } from "../../../lib/utils";
import { Fragment } from "react";
type TItemBodyProps = {
  currInventories?: any[];
  searchItems?: any[];
  newInventory: (variables: any) => void;
};
export const TInventoryItemBody = ({
  currInventories,
  searchItems,
  newInventory,
}: TItemBodyProps) => {
  return (
    <Fragment>
      {searchItems?.map((item: any) => (
        <tr key={item.id} id={item.id} className="bg-tr">
          <td>{item.name}</td>
          <td className="text-center">{item.sku}</td>
          <td className="text-center">
            <span
              id={`${item.id}`}
              className="icon-span"
              onClick={(e) => {
                const id = e.currentTarget.id;
                const createdAt = getDateFromTimestamp();
                if (
                  currInventories?.some((inv: { item: { sku: any } }) => {
                    return inv?.item?.sku === item.sku;
                  })
                ) {
                  return;
                }
                newInventory({
                  inventory: {
                    priceBought: "0",
                    qtyBought: "1",
                    itemId: id,
                    createdAt,
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
