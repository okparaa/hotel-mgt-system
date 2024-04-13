import { forwardRef } from "react";
import Form, { Button, Hidden, Input, Select, Textarea } from "../../lib/forms";
import { Image } from "../../lib/image";
import keyboard from "../../images/keyboard.jpg";
import { STORE } from "../queries/locals";
import { useQuery } from "@apollo/client";

type RoomsFormProps = {
  newRoom: ({ variables }: any) => Promise<any>;
  loading: boolean;
  defaultValues: any;
  eRoom: ({ variables }: any) => Promise<any>;
  bookable: string[];
};

const RoomsForm = forwardRef(
  (
    { newRoom, loading, defaultValues, eRoom, bookable }: RoomsFormProps,
    ref: any
  ) => {
    const {
      data: { store },
    } = useQuery(STORE);

    const neu = store.neu;

    if (store.room && store.room.__typename === "Room") {
      defaultValues = store.room;
    }

    return (
      <div className="flex divide-x">
        <div className="p-4 flex flex-col flex-1 text-left">
          <p className="font-bold text-xl pb-4">Create Room</p>
          <Form
            ref={ref}
            defaultValues={defaultValues}
            onSubmit={async (data: any) => {
              try {
                if (store.room && store.room.__typename === "Room") {
                  await eRoom({
                    variables: {
                      room: {
                        id: data.id,
                        name: data.name,
                        price: data.price,
                        type: data.type,
                        description: data.description,
                      },
                    },
                  });
                } else {
                  await newRoom({
                    variables: {
                      room: {
                        name: data.name,
                        price: data.price,
                        description: data.description,
                        type: data.type,
                      },
                    },
                  });
                }
              } catch (error) {}
            }}
          >
            {!neu ? <Hidden name="id" /> : <></>}
            <Select req_msg="required" name="type" options={bookable} />
            <Input
              req_msg="required"
              name="name"
              placeholder="ID Number"
              size="w-10/12"
            />
            <Input name="price" placeholder="Price (e.g 2000)" size="w-8/12" />
            <Textarea
              req_msg="required"
              name="description"
              placeholder="Describe the room"
            />
            <div className="btn">
              <Button title="Save" status={loading} />
            </div>
          </Form>
        </div>
        <div className="flex flex-1 flex-col p-4 justify-center gap-8">
          <p className="text-xl font-semibold text-left">
            The core advantage of data is that it tells you something about the
            business that you didn’t already know.
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
