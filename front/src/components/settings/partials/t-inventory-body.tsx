import { Trash2 } from "lucide-react";
import { addInput, toCommas } from "../../../lib/utils";
import { Fragment } from "react";
type TInventoryBodyProps = {
  currInventories?: any[];
  eInventory: ({ variables }: any) => void;
  dInventory: ({ variables }: any) => void;
};
export const TInventoryBody = ({
  currInventories,
  eInventory,
  dInventory,
}: TInventoryBodyProps) => {
  return (
    <Fragment>
      {currInventories?.map((inventory: any) => (
        <tr key={inventory.id} className="bg-tr">
          <td>{inventory.item?.sku}</td>
          <td>{inventory.item?.name}</td>
          <td>
            <span
              className="border-y cursor-text border-gray-400 flex w-9 h-8 m-auto justify-center items-center rounded-md"
              onClick={(e) =>
                addInput(e, (value) =>
                  eInventory({
                    variables: {
                      inventory: {
                        id: inventory.id,
                        priceBought: value,
                        qtyBought: inventory.qtyBought,
                        itemId: inventory.item.id,
                        createdAt: inventory.createdAt,
                      },
                    },
                  })
                )
              }
            >
              {toCommas(inventory.priceBought)}
            </span>
          </td>
          <td className="text-center">
            <span
              className="border-y cursor-text border-gray-400 flex w-9 h-8 m-auto justify-center items-center rounded-md"
              onClick={(e) =>
                addInput(e, (value) =>
                  eInventory({
                    variables: {
                      inventory: {
                        id: inventory.id,
                        qtyBought: value,
                        priceBought: inventory.priceBought + "",
                        itemId: inventory.item.id,
                        createdAt: inventory.createdAt,
                      },
                    },
                  })
                )
              }
            >
              {inventory.qtyBought}
            </span>
          </td>
          <td className="!text-center">
            <span
              id={inventory.id}
              className="icon-span"
              onClick={() => {
                dInventory({
                  variables: { id: inventory.id, itemId: inventory.item.id },
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
