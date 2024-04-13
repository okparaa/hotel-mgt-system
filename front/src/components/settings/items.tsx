import { useMutation, useQuery } from "@apollo/client";
import { FormRef } from "../../lib/forms";
import { useRef, useState } from "react";
import { errorHandler, updateFxn } from "../../lib/utils";
import FormModal from "../../lib/form-modal";
import { Search } from "../../lib/search";
import ItemsForm from "../forms/items-form";
import { Item } from "../../__generated__/graphql";
import { store as itemStore } from "../../lib/client";
import {
  CREATE_ITEM,
  DEL_ITEM,
  EDIT_ITEM,
  GET_ITEMS,
  ITEM_PRICE,
} from "../queries/items-queries";
import { Table } from "../../lib/table";
import { SEARCH } from "../queries/locals";
import { TItemBody } from "./partials/t-item-body";

const Items = () => {
  const [open, setOpen] = useState(false); //for edit and new modal
  const [openDel, setOpenDel] = useState(false); //for delete modal
  const formRef = useRef<FormRef>(null);
  const [newItem, { loading: creating }] = useMutation(CREATE_ITEM, {
    onError: (error) => {
      setOpen(false);
      errorHandler(error, formRef.current);
    },

    update: (cache, { data }) => {
      formRef.current?.reset();
      setOpen(false);
      cache.updateQuery({ query: GET_ITEMS }, ({ items }: any) => ({
        items: [data?.newItem, ...items],
      }));
    },
  });
  const [itemPrice] = useMutation(ITEM_PRICE, {
    update: (cache, { data }) => {
      cache.updateQuery({ query: GET_ITEMS }, ({ items }: any) => ({
        items: items.map((item: any) => {
          if (item.id === data?.itemPrice?.id)
            return { ...item, price: data?.itemPrice?.price };
          return item;
        }),
      }));
    },
  });
  const { data: { items } = {}, loading } = useQuery(GET_ITEMS);

  const deleteItem = (item: Item) => {
    itemStore({ name: item.name, id: item.id });
    setOpenDel(true);
  };
  const editItem = (item: Item) => {
    itemStore({ item });
    setOpen(true);
  };
  const tHead = (
    <tr>
      <th className="w-auto">Name</th>
      <th className="w-3/12 hidden lg:table-cell">Loc/Desc</th>
      <th className="hidden lg:table-cell">SKU</th>
      <th>Type</th>
      <th className="!text-center hidden md:table-cell">Date</th>
      <th className="!text-center">S/PRICE</th>
      <th colSpan={2} className="!text-center w-32">
        <span>Action</span>
      </th>
    </tr>
  );

  const {
    data: { search },
  } = useQuery(SEARCH);

  const searchItems = items?.filter((item: any) => {
    const str = Object.values(item).join(" ").toLowerCase();
    const searche = search || "";
    return str.includes(searche.toLowerCase());
  });

  const tBody = (
    <TItemBody
      searchItems={searchItems}
      editItem={editItem}
      deleteItem={deleteItem}
      itemPrice={itemPrice}
    />
  );

  const [eItem, { loading: updating }] = useMutation(EDIT_ITEM, {
    onError: (error) => {
      errorHandler(error, formRef.current);
    },
    update: (cache, { data: eData }) => {
      setOpen(false);
      cache.updateQuery({ query: GET_ITEMS }, ({ items }: any) => ({
        items: updateFxn(items, eData?.eItem),
      }));
    },
  });

  const [dItem, { loading: deleting }] = useMutation(DEL_ITEM, {
    update: (cache, { data: { dItem } }: any) => {
      cache.updateQuery({ query: GET_ITEMS }, ({ items }: any) => ({
        items: items.filter((item: any) => item.id !== dItem.id),
      }));
    },
  });

  const defaultValues = {
    name: "",
    type: "",
    price: "",
    description: "",
  };

  return (
    <>
      <FormModal
        isOpen={open}
        onClose={() => setOpen(false)}
        className="w-8/12 p-4 rounded-xl shadow-xl backdrop:bg-gray-800 backdrop:bg-opacity-45"
      >
        <ItemsForm
          loading={creating || updating}
          newItem={newItem}
          eItem={eItem}
          ref={formRef}
          defaultValues={defaultValues}
        />
      </FormModal>
      {items && (
        <div className="my-2 mr-2 overflow-x-auto">
          <Table
            Searche={<Search onOpen={() => setOpen(true)} />}
            tHead={tHead}
            tBody={tBody}
            loading={loading}
            deleting={deleting}
            remove={dItem}
            open={openDel}
            onClose={() => setOpenDel(false)}
          />
        </div>
      )}
    </>
  );
};

export default Items;
