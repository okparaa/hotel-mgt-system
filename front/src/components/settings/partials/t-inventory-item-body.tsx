import { CheckCircle } from "lucide-react";
import { GET_INVENTORIES } from "../../queries/inventory-queries";
import { Inventory } from "../../../__generated__/graphql";
import { getDateFromTimestamp } from "../../../lib/utils";
import { Fragment } from "react";
type TItemBodyProps = {
  currInventories?: any[];
  searchItems?: any[];
  newInventory: ({ variables }: any) => void;
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
                  variables: {
                    inventory: {
                      priceBought: "0",
                      qtyBought: "1",
                      itemId: id,
                      createdAt,
                    },
                  },
                  update: (cache: any, { data }: any) => {
                    cache.updateQuery(
                      {
                        query: GET_INVENTORIES,
                        variables: { date: createdAt },
                      },
                      ({ inventories }: any) => ({
                        inventories: [
                          data?.newInventory,
                          ...inventories.filter(
                            (inventory: Inventory) =>
                              inventory.id !== data?.newInventory?.id
                          ),
                        ],
                      })
                    );
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
