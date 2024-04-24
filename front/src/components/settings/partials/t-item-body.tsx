import { Pencil, Trash2 } from "lucide-react";
import { addInput, getDateFromTimestamp, toCommas } from "../../../lib/utils";
import { Fragment } from "react";
import { useChest } from "../../../app-chest";

type TItemBodyProps = {
  currInventories?: any[];
  searchItems?: any[];
  editItem: ({ variables }: any) => void;
  deleteItem: ({ variables }: any) => void;
  itemPrice: ({ variables }: any) => void;
};

export const TItemBody = ({
  searchItems,
  editItem,
  deleteItem,
  itemPrice,
}: TItemBodyProps) => {
  const { updateChest } = useChest();
  return (
    <Fragment>
      {searchItems?.map((item: any) => (
        <tr key={item.id} className="bg-tr">
          <td>{item.name}</td>
          <td className="hidden lg:table-cell">{item.description}</td>
          <td className="hidden lg:table-cell">{item.sku}</td>
          <td>{item.type}</td>
          <td className="!text-center !w-auto hidden md:table-cell">
            {getDateFromTimestamp(+item.createdAt, "d/m/y")}
          </td>
          <td>
            <span
              className="bwks cursor-text border-gray-400 flex w-9 h-8 m-auto justify-center items-center rounded-md"
              onClick={(e) =>
                addInput(e, (value) => {
                  itemPrice({
                    id: item.id,
                    price: value,
                  });
                })
              }
            >
              {toCommas(item.price)}
            </span>
          </td>
          <td className="text-right !px-0">
            <span
              className="icon-span"
              onClick={() => {
                updateChest({ data: { neu: false }, type: "store" });
                editItem(item);
              }}
            >
              <Pencil size={20} className="ikon" />
            </span>
          </td>
          <td className="text-center !px-0">
            <span
              id={item.id}
              className="icon-span"
              onClick={() => deleteItem(item)}
            >
              <Trash2 size={20} className="ikon" />
            </span>
          </td>
        </tr>
      ))}
    </Fragment>
  );
};
