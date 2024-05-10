import { useRef, useState } from "react";
import { FormRef } from "../../lib/forms";
import { errorHandler } from "../../lib/utils";
import FormModal from "../../lib/form-modal";
import { Search } from "../../lib/search";
import { Table } from "../../lib/table";
import { TRoomBody } from "./partials/t-room-body";
import RoomsForm from "../forms/rooms-form";
import { useChest } from "../../app-chest";
import {
  Room,
  useDRoomMutation,
  useERoomMutation,
  useNewRoomMutation,
  useRoomPriceMutation,
  useRoomsQuery,
} from "../aio-urql";

const Rooms = () => {
  const [open, setOpen] = useState(false); //for edit and new modal
  const [openDel, setOpenDel] = useState(false); //for delete modal
  const formRef = useRef<FormRef>(null);
  const [{ fetching: creating, error: newError, data: newData }, newRoom] =
    useNewRoomMutation();
  if (!newError && newData) {
    formRef.current?.reset();
    setOpen(false);
  } else if (newError) {
    setOpen(false);
    errorHandler(newError, formRef.current);
  }

  const {
    data: { search },
    updateChest,
  } = useChest();
  const [{}, roomPrice] = useRoomPriceMutation();

  const [{ data: roomData, fetching: loading }] = useRoomsQuery();

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

  const bookable = ["room", "hall", "pool", "other"];

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

  const searchItems = roomData?.rooms?.filter((item: any) => {
    const str = Object.values(item).join(" ").toLowerCase();
    const searche = search || "";
    return str.includes(searche.toLowerCase());
  });

  const tBody = (
    <TRoomBody
      searchRooms={searchItems}
      editRoom={editRoom}
      deleteRoom={deleteRoom}
      roomPrice={roomPrice}
      bookable={bookable}
    />
  );

  const [{ fetching: updating }, eRoom] = useERoomMutation();

  const [{ fetching: deleting }, dRoom] = useDRoomMutation();

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
          fetching={creating || updating}
          newRoom={newRoom}
          eRoom={eRoom}
          ref={formRef}
          bookable={bookable}
          closeModal={() => setOpen(false)}
          defaultValues={defaultValues}
        />
      </FormModal>
      {roomData?.rooms && (
        <div className="my-2 mr-2 overflow-x-auto">
          <Table
            Searche={<Search onOpen={() => setOpen(true)} />}
            tHead={tHead}
            tBody={tBody}
            fetching={loading}
            deleting={deleting}
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
