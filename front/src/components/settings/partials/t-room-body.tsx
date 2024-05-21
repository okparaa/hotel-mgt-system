import { Pencil, Trash2 } from "lucide-react";
import { Fragment } from "react";
import { useChest } from "../../../app-chest";
import { AddInput } from "../../../lib/add-input";

type TRoomBodyProps = {
  searchRooms?: any[];
  editRoom: ({ variables }: any) => void;
  deleteRoom: ({ variables }: any) => void;
  roomPrice: ({ variables }: any) => void;
  bookable: string[];
  isBusy?: boolean;
};

export const TRoomBody = ({
  searchRooms,
  editRoom,
  deleteRoom,
  roomPrice,
  bookable,
  isBusy = false,
}: TRoomBodyProps) => {
  const { updateChest } = useChest();
  return (
    <Fragment>
      {searchRooms?.map((room: any) => (
        <tr key={room.id} className="bg-tr">
          <td>
            {bookable && bookable[room.type]} {room.name}
          </td>
          <td>{room.description}</td>
          <td>{room.sku}</td>
          <td className="!text-center">{room.status}</td>
          <td>
            <span className="cursor-text flex h-8 m-auto justify-center items-center rounded-md">
              <AddInput
                id={room.id}
                initialValue={room.price}
                isBusy={isBusy}
                action={(value) => {
                  if (+value === +room.price) return;
                  updateChest({ data: { id: room.id }, type: "row" });
                  roomPrice({
                    id: room.id,
                    price: Number(value),
                  });
                }}
              />
            </span>
          </td>
          <td className="text-right !px-0">
            <span
              className="icon-span"
              onClick={() => {
                updateChest({ type: "store", data: { neu: false } });
                editRoom(room);
              }}
            >
              <Pencil size={20} className="ikon" />
            </span>
          </td>
          <td className="text-center !px-0">
            <span
              id={room.id}
              className="icon-span"
              onClick={() => deleteRoom(room)}
            >
              <Trash2 size={20} className="ikon" />
            </span>
          </td>
        </tr>
      ))}
    </Fragment>
  );
};
