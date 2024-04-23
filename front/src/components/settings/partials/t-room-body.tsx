import { Pencil, Trash2 } from "lucide-react";
import { addInput, toCommas } from "../../../lib/utils";
import { Fragment } from "react";
import { useChest } from "../../../state-mgr/app-chest";

type TRoomBodyProps = {
  searchRooms?: any[];
  editRoom: ({ variables }: any) => void;
  deleteRoom: ({ variables }: any) => void;
  roomPrice: ({ variables }: any) => void;
  bookable: string[];
};

export const TRoomBody = ({
  searchRooms,
  editRoom,
  deleteRoom,
  roomPrice,
  bookable,
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
            <span
              className="bwks border-y cursor-text border-gray-400 flex w-9 h-8 m-auto justify-center items-center rounded-md"
              onClick={(e) =>
                addInput(e, (value) => {
                  roomPrice({
                    id: room.id,
                    price: value,
                  });
                })
              }
            >
              {toCommas(room.price)}
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
