import { Pencil, Trash2 } from "lucide-react";
import { useChest } from "../../../app-chest";
import { AddInput } from "../../../lib/add-input";
import { roomStatusOptions } from "../../../config";
import { RoomsQuery } from "../../aio-urql";
import { ucwords } from "../../../lib/utils";

type RoomBodyProps = {
  searchRooms?: RoomsQuery["rooms"];
  editRoom: ({ variables }: any) => void;
  deleteRoom: ({ variables }: any) => void;
  roomPrice: ({ variables }: any) => void;
  isBusy?: boolean;
};

export const RoomBody = ({
  searchRooms,
  editRoom,
  deleteRoom,
  roomPrice,
  isBusy = false,
}: RoomBodyProps) => {
  const { updateChest } = useChest();
  return (
    <>
      {searchRooms?.map((room) => (
        <tr key={room?.id} className="bg-tr">
          <td>
            {ucwords(room?.type)} {room?.name}
          </td>
          <td>{room?.description}</td>
          <td>{room?.sku}</td>
          <td>
            <div className="flex text-center justify-center">
              {room?.status ? (
                room?.status == "o-of-o" ? (
                  <span className="bg-red-400 w-16 h-8 py-1 rounded-md cursor-pointer">
                    {roomStatusOptions[room.status]}
                  </span>
                ) : (
                  <span className="bg-green-300 w-16 py-1 rounded-md">
                    {roomStatusOptions[room.status]}
                  </span>
                )
              ) : (
                <span className="bg-green-300 w-16 py-1 rounded-md">Good</span>
              )}
            </div>
          </td>
          <td>
            <span className="cursor-text flex w-28 h-8 m-auto justify-center items-center rounded-md">
              <AddInput
                id={room!.id}
                initialValue={room?.price!}
                isBusy={isBusy}
                action={(value) => {
                  if (+value === room?.price) return;
                  updateChest({ data: { id: room?.id }, type: "row" });
                  roomPrice({
                    id: room?.id,
                    price: Number(value),
                  });
                }}
              />
            </span>
          </td>
          <td className="text-right !px-0">
            <span
              id={room?.id}
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
              id={room?.id}
              className="icon-span"
              onClick={() => deleteRoom(room)}
            >
              <Trash2 size={20} className="ikon" />
            </span>
          </td>
        </tr>
      ))}
    </>
  );
};
