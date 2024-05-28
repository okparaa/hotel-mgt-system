import { Pencil, Trash2 } from "lucide-react";
import { getDateFromTimestamp } from "../../../lib/utils";
import { Fragment } from "react";
import { useChest } from "../../../app-chest";
import { AddInput } from "../../../lib/add-input";
import { ItemsQuery } from "../../aio-urql";

type TItemBodyProps = {
  searchItems?: ItemsQuery["items"];
  editItem: ({ variables }: any) => void;
  deleteItem: ({ variables }: any) => void;
  itemPrice: ({ variables }: any) => void;
};

export const ItemBody = ({
  searchItems,
  editItem,
  deleteItem,
  itemPrice,
}: TItemBodyProps) => {
  const { updateChest } = useChest();
  return (
    <Fragment>
      {searchItems?.map((item) => (
        <tr key={item?.id} className="bg-tr">
          <td>{item?.name}</td>
          <td className="hidden lg:table-cell truncate">{item?.description}</td>
          <td className="hidden lg:table-cell">{item?.sku}</td>
          <td>{item?.type}</td>
          <td className="!text-center !w-auto hidden md:table-cell">
            {getDateFromTimestamp(+item?.createdAt!, "d/m/y")}
          </td>
          <td>
            <span className="cursor-text border-gray-400 flex w-full h-8 m-auto justify-center items-center rounded-md">
              <AddInput
                id={item?.id!}
                initialValue={item?.price!}
                action={(value) => {
                  itemPrice({
                    id: item?.id,
                    price: value,
                  });
                }}
              />
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
              id={item?.id}
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
