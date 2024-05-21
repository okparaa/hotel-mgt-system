import { Trash2 } from "lucide-react";
import { toCommas } from "../../../lib/utils";
import { Fragment } from "react";
import { ChestBookItem } from "../../../lib/types";
import { AddInput } from "../../../lib/add-input";
type TInventoryBodyProps = {
  currInventories?: ChestBookItem[];
  eInventory: (variables: any) => void;
  dInventory: (variables: any) => void;
};
export const TInventoryBody = ({
  currInventories,
  eInventory,
  dInventory,
}: TInventoryBodyProps) => {
  return (
    <Fragment>
      {currInventories?.map((inventory: any) => (
        <tr key={inventory.itemId} className="bg-tr">
          <td>{inventory.item?.sku}</td>
          <td>{inventory.item?.name}</td>
          <td>
            <span className="border-y cursor-text border-gray-400 flex w-9 h-8 m-auto justify-center items-center rounded-md">
              <AddInput
                id={inventory.id}
                initialValue={toCommas(inventory.priceBought)}
                action={(value) => {
                  eInventory({
                    inventory: {
                      priceBought: value,
                      qtyBought: inventory.qtyBought,
                      itemId: inventory.itemId,
                      createdAt: inventory.createdAt,
                    },
                  });
                }}
              />
            </span>
          </td>
          <td className="text-center">
            <span className="border-y cursor-text border-gray-400 flex w-9 h-8 m-auto justify-center items-center rounded-md">
              <AddInput
                id={inventory.id}
                initialValue={inventory.qtyBought}
                action={(value) => {
                  eInventory({
                    inventory: {
                      qtyBought: value,
                      priceBought: inventory.priceBought,
                      itemId: inventory.itemId,
                      createdAt: inventory.createdAt,
                    },
                  });
                }}
              />
            </span>
          </td>
          <td className="!text-center">
            <span
              id={inventory.id}
              className="icon-span"
              onClick={() => {
                dInventory({
                  itemId: inventory.itemId,
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
