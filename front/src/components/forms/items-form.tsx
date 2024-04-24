import { forwardRef } from "react";
import Form, { Button, Hidden, Input, Textarea } from "../../lib/forms";
import { Image } from "../../lib/image";
import keyboard from "../../images/keyboard.jpg";
import { useChest } from "../../app-chest";
import { useItemQuery } from "../aio-urql";

type ItemsFormProps = {
  newItem: ({ variables }: any) => Promise<any>;
  fetching: boolean;
  defaultValues: any;
  eItem: ({ variables }: any) => Promise<any>;
  closeModal: () => void;
};

const ItemsForm = forwardRef(
  (
    { newItem, fetching, defaultValues, eItem, closeModal }: ItemsFormProps,
    ref: any
  ) => {
    const {
      data: { store },
    } = useChest();

    const neu = store.neu;

    if (store.id && store.__typename === "Item") {
      const [itemRes] = useItemQuery({ variables: { id: store.id } });
      defaultValues = itemRes.data?.item;
    }

    return (
      <div className="flex divide-x">
        <div className="p-4 flex flex-col flex-1 text-left">
          <p className="font-bold text-xl pb-4">Create Store Item</p>
          <Form
            ref={ref}
            defaultValues={defaultValues}
            onSubmit={async (data: any) => {
              try {
                if (store.id && store.__typename === "Item") {
                  await eItem({
                    item: {
                      id: data.id,
                      name: data.name,
                      type: data.type,
                      price: data.price,
                      sku: data.sku,
                      description: data.description,
                    },
                  });
                  closeModal();
                } else {
                  await newItem({
                    item: {
                      name: data.name,
                      type: data.type,
                      price: data.price,
                      description: data.description,
                    },
                  });
                  closeModal();
                }
              } catch (error) {
                // console.log(error);
              }
            }}
          >
            {!neu ? <Hidden name="id" /> : <></>}
            <Input
              req_msg="required"
              name="name"
              placeholder="Item Name"
              size="w-10/12"
            />
            <Input
              req_msg="required"
              size="w-8/12"
              name="type"
              placeholder="Type (e.g food/drinks)"
            />
            <Input name="price" placeholder="Price (e.g 2000)" size="w-8/12" />
            <Textarea
              req_msg="required"
              name="description"
              placeholder="Place it's used"
            />
            <div className="btn">
              <Button title="Save" status={fetching} />
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

export default ItemsForm;
