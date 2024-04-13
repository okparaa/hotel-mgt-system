import { useRef, useState } from "react";
import { FormRef } from "../../lib/forms";
import { useMutation, useQuery } from "@apollo/client";
import { errorHandler, updateFxn } from "../../lib/utils";
import { SEARCH } from "../queries/locals";
import FormModal from "../../lib/form-modal";
import { Search } from "../../lib/search";
import { Table } from "../../lib/table";
import { store as roomStore } from "../../lib/client";
import { TRoomBody } from "./partials/t-room-body";
import RoomsForm from "../forms/rooms-form";
import {
  CREATE_ROOM,
  DEL_ROOM,
  EDIT_ROOM,
  GET_ROOMS,
  ROOM_PRICE,
} from "../queries/room-queries";
import { Room } from "../../__generated__/graphql";

const Rooms = () => {
  const [open, setOpen] = useState(false); //for edit and new modal
  const [openDel, setOpenDel] = useState(false); //for delete modal
  const formRef = useRef<FormRef>(null);
  const [newRoom, { loading: creating }] = useMutation(CREATE_ROOM, {
    onError: (error) => {
      setOpen(false);
      errorHandler(error, formRef.current);
    },

    update: (cache, { data }) => {
      formRef.current?.reset();
      setOpen(false);
      cache.updateQuery({ query: GET_ROOMS }, ({ rooms }: any) => ({
        rooms: [data?.newRoom, ...rooms],
      }));
    },
  });
  const [roomPrice] = useMutation(ROOM_PRICE, {
    update: (cache, { data }) => {
      cache.updateQuery({ query: GET_ROOMS }, ({ rooms }: any) => ({
        rooms: rooms.map((room: any) => {
          if (room.id === data?.roomPrice?.id)
            return { ...rooms, price: data?.roomPrice?.price };
          return room;
        }),
      }));
    },
  });

  const { data: { rooms } = {}, loading } = useQuery(GET_ROOMS);

  const deleteItem = (room: Room) => {
    roomStore({ name: room.name, id: room.id });
    setOpenDel(true);
  };
  const editItem = (room: Room) => {
    roomStore({ room });
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

  const {
    data: { search },
  } = useQuery(SEARCH);

  const searchItems = rooms?.filter((item: any) => {
    const str = Object.values(item).join(" ").toLowerCase();
    const searche = search || "";
    return str.includes(searche.toLowerCase());
  });

  const tBody = (
    <TRoomBody
      searchRooms={searchItems}
      editRoom={editItem}
      deleteRoom={deleteItem}
      roomPrice={roomPrice}
      bookable={bookable}
    />
  );

  const [eRoom, { loading: updating }] = useMutation(EDIT_ROOM, {
    onError: (error) => {
      errorHandler(error, formRef.current);
    },
    update: (cache, { data: eData }) => {
      setOpen(false);
      cache.updateQuery({ query: GET_ROOMS }, ({ rooms }: any) => ({
        rooms: updateFxn(rooms, eData?.eRoom),
      }));
    },
  });

  const [dRoom, { loading: deleting }] = useMutation(DEL_ROOM, {
    update: (cache, { data: { dRoom } }: any) => {
      cache.updateQuery({ query: GET_ROOMS }, ({ rooms }: any) => ({
        rooms: rooms.filter((room: any) => room.id !== dRoom.id),
      }));
    },
  });

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
          loading={creating || updating}
          newRoom={newRoom}
          eRoom={eRoom}
          ref={formRef}
          bookable={bookable}
          defaultValues={defaultValues}
        />
      </FormModal>
      {rooms && (
        <div className="my-2 mr-2 overflow-x-auto">
          <Table
            Searche={<Search onOpen={() => setOpen(true)} />}
            tHead={tHead}
            tBody={tBody}
            loading={loading}
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
