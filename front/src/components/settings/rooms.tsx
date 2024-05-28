import { useRef, useState } from "react";
import { FormRef } from "../../lib/forms";
import FormModal from "../../lib/form-modal";
import { Search } from "../../lib/search";
import { Table } from "../../lib/table";
import { RoomBody } from "./rooms/room-body";
import RoomsForm from "../forms/rooms-form";
import { useChest } from "../../app-chest";
import {
  Room,
  useCreateRoomMutation,
  useRemoveRoomMutation,
  useRoomPriceMutation,
  useRoomsQuery,
  useUpdateRoomMutation,
} from "../aio-urql";
import QueryResult from "../../lib/query-result";

const Rooms = () => {
  const [open, setOpen] = useState<boolean>(); //for edit and new modal
  const [openDel, setOpenDel] = useState<boolean>(); //for delete modal
  const formRef = useRef<FormRef>(null);
  const [createRoomRes, createRoom] = useCreateRoomMutation();

  const {
    data: { search },
    updateChest,
  } = useChest();

  const [roomPriceRes, roomPrice] = useRoomPriceMutation();

  const [roomsRes] = useRoomsQuery();

  if (roomsRes.error || roomsRes.fetching) {
    return <QueryResult response={roomsRes} />;
  }

  const deleteRoom = (room: Room) => {
    updateChest({
      type: "store",
      data: { delMsg: `Delete Room ${room.name}?`, id: room.id },
    });
    setOpenDel(true);
  };

  const editRoom = async (room: Room) => {
    updateChest({
      data: {
        id: room.id,
        __typename: "Room",
      },
      type: "store",
    });
    setOpen(true);
  };

  const tHead = (
    <tr>
      <th className="w-auto">Name</th>
      <th>Desc</th>
      <th className="w-14">SKU</th>
      <th className="!text-center">STATUS</th>
      <th className="!text-center">PRICE</th>
      <th colSpan={2} className="!text-center w-32">
        <span>Action</span>
      </th>
    </tr>
  );

  const searchRooms = roomsRes.data?.rooms?.filter((item) => {
    const str = item && Object.values(item).join(" ").toLowerCase();
    return str && str.includes(search.toLowerCase());
  });

  const tBody = (
    <RoomBody
      searchRooms={searchRooms}
      editRoom={editRoom}
      isBusy={roomPriceRes.fetching}
      deleteRoom={deleteRoom}
      roomPrice={roomPrice}
    />
  );

  const [updateRoomRes, updateRoom] = useUpdateRoomMutation();

  const [removeRoomRes, removeRoom] = useRemoveRoomMutation();

  const defaultValues = {
    name: "",
    price: "",
    description: "",
    type: "room",
    status: "good",
  };

  return (
    <>
      <FormModal
        isOpen={open}
        onClose={() => setOpen(false)}
        className="w-8/12 p-4 rounded-xl shadow-xl backdrop:bg-gray-800 backdrop:bg-opacity-45"
      >
        <RoomsForm
          fetching={updateRoomRes.fetching || createRoomRes.fetching}
          createRoom={createRoom}
          updateRoom={updateRoom}
          ref={formRef}
          onClose={() => setOpen(false)}
          defaultValues={defaultValues}
        />
      </FormModal>
      {roomsRes.data?.rooms && (
        <div className="my-2 mr-2 overflow-x-auto">
          <Table
            Search={<Search onOpen={() => setOpen(true)} />}
            tHead={tHead}
            tBody={tBody}
            fetching={roomsRes.fetching}
            deleting={removeRoomRes.fetching}
            remove={removeRoom}
            open={openDel}
            onClose={() => setOpenDel(false)}
          />
        </div>
      )}
    </>
  );
};

export default Rooms;
