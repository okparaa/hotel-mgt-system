import { useRef, useState } from "react";
import { FormRef } from "../../lib/forms";
import { errorHandler } from "../../lib/utils";
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
import { bookable } from "../../config";
import QueryResult from "../../lib/query-result";

const Rooms = () => {
  const [open, setOpen] = useState(false); //for edit and new modal
  const [openDel, setOpenDel] = useState(false); //for delete modal
  const formRef = useRef<FormRef>(null);
  const [newRoomRes, newRoom] = useCreateRoomMutation();

  // { fetching: creating, error: newError, data: newData }
  if (!newRoomRes.error && newRoomRes.data) {
    formRef.current?.reset();
    setOpen(false);
  } else if (newRoomRes.error) {
    setOpen(false);
    errorHandler(newRoomRes.error, formRef.current);
  }

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
  const editRoom = (room: Room) => {
    updateChest({
      type: "store",
      data: { __typename: "Room", id: room.id },
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

  const searchItems = roomsRes.data?.rooms?.filter((item: any) => {
    const str = Object.values(item).join(" ").toLowerCase();
    const searche = search || "";
    return str.includes(searche.toLowerCase());
  });

  const tBody = (
    <RoomBody
      searchRooms={searchItems}
      editRoom={editRoom}
      isBusy={roomPriceRes.fetching}
      deleteRoom={deleteRoom}
      roomPrice={roomPrice}
      bookable={bookable}
    />
  );

  const [eRoomRes, eRoom] = useUpdateRoomMutation();

  const [dRoomRes, dRoom] = useRemoveRoomMutation();

  const defaultValues = {
    name: "",
    price: "",
    description: "",
    type: "0",
  };

  return (
    <>
      <FormModal
        isOpen={open}
        onClose={() => setOpen(false)}
        className="w-8/12 p-4 rounded-xl shadow-xl backdrop:bg-gray-800 backdrop:bg-opacity-45"
      >
        <RoomsForm
          fetching={eRoomRes.fetching || newRoomRes.fetching}
          newRoom={newRoom}
          eRoom={eRoom}
          ref={formRef}
          bookable={bookable}
          onClose={() => setOpen(false)}
          defaultValues={defaultValues}
        />
      </FormModal>
      {roomsRes.data?.rooms && (
        <div className="my-2 mr-2 overflow-x-auto">
          <Table
            Searche={<Search onOpen={() => setOpen(true)} />}
            tHead={tHead}
            tBody={tBody}
            fetching={roomsRes.fetching}
            deleting={dRoomRes.fetching}
            remove={dRoom}
            open={openDel}
            onClose={() => setOpenDel(false)}
          />
        </div>
      )}
    </>
  );
};

export default Rooms;
