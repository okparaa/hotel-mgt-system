import { TargetedEvent, forwardRef, useState } from "react";
import Form, { Button, Hidden, Input, Select, Textarea } from "../../lib/forms";
import { Image } from "../../lib/image";
import keyboard from "../../images/keyboard.jpg";
import { useChest } from "../../app-chest";
import { useRoomQuery } from "../aio-urql";
import { bookable, roomStatusOptions } from "../../config";

type RoomsFormProps = {
  createRoom: ({ variables }: any) => Promise<any>;
  fetching: boolean;
  defaultValues: any;
  updateRoom: ({ variables }: any) => Promise<any>;
  onClose: () => void;
};

const RoomsForm = forwardRef(
  (
    {
      createRoom,
      fetching,
      defaultValues,
      updateRoom,
      onClose,
    }: RoomsFormProps,
    ref: any
  ) => {
    const {
      data: { store },
    } = useChest();

    if (store.id && store.__typename === "Room" && !store.neu) {
      const [roomRes] = useRoomQuery({ variables: { id: store.id } });
      defaultValues = roomRes.data?.room;
    }
    const [status, setStatus] = useState("");

    const statusOptions = Object.entries(roomStatusOptions).map(
      ([key, value]) => ({
        key,
        value,
      })
    );

    return (
      <div className="flex divide-x">
        <div className="p-4 flex flex-col flex-1 text-left">
          <p className="font-bold text-xl pb-4">
            {store.neu ? "Create Room" : "Update Room"}
          </p>
          <Form
            ref={ref}
            defaultValues={defaultValues}
            onSubmit={async (data: any) => {
              try {
                if (store.id && store.__typename === "Room" && !store.neu) {
                  await updateRoom({
                    room: {
                      id: data.id,
                      name: data.name,
                      price: +data.price,
                      type: data.type,
                      description: data.description,
                      status: data.status,
                      reason: data.reason,
                    },
                  });
                  onClose();
                } else {
                  await createRoom({
                    room: {
                      name: data.name,
                      price: +data.price,
                      description: data.description,
                      type: data.type,
                      status: data.status,
                      reason: data.reason,
                    },
                  });
                  onClose();
                }
              } catch (error) {}
            }}
          >
            {!store.neu ? <Hidden name="id" /> : <></>}
            <Select req_msg="required" name="type" options={bookable} />
            <Input
              req_msg="required"
              name="name"
              placeholder="ID Number"
              size="w-10/12"
            />
            <Input
              req_msg="required"
              name="description"
              placeholder="description"
              size="w-11/12"
            />
            <Input name="price" placeholder="Price (e.g 2000)" size="w-8/12" />
            <Select
              name="status"
              req_msg="required"
              size="w-8/12"
              options={statusOptions}
              onChange={(e: TargetedEvent<HTMLSelectElement, Event>) => {
                setStatus((e.target as HTMLSelectElement).value);
              }}
            />

            <Textarea
              name="reason"
              disabled={status == "o-of-o" ? false : true}
              placeholder={
                status == "o-of-o"
                  ? "Give reasons..."
                  : "The room is good for guests"
              }
              className={`${
                status == "o-of-o" ? "border-2 border-slate-800" : "opacity-40"
              }`}
            />

            <div className="btn">
              <Button title="Save" status={fetching} />
            </div>
          </Form>
        </div>
        <div className="flex flex-1 flex-col p-4 justify-center gap-8">
          <p className="text-xl font-semibold text-left">
            The core advantage of data is that it tells you something about the
            business that you didn't already know.
          </p>
          <div className="flex justify-center items-center">
            <Image
              src={keyboard}
              alt="keyboard"
              className="p-1 rounded-tl-3xl rounded-br-3xl -rotate-6 w-10/12 border-blue-200 border-4"
            />
          </div>
        </div>
      </div>
    );
  }
);
export default RoomsForm;
