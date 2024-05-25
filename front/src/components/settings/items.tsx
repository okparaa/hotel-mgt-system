import { FormRef } from "../../lib/forms";
import { useRef, useState } from "react";
import FormModal from "../../lib/form-modal";
import { Search } from "../../lib/search";
import { Table } from "../../lib/table";
import { ItemBody } from "./items/item-body";
import {
  Item,
  useCreateItemMutation,
  useItemPriceMutation,
  useItemsQuery,
  useRemoveItemMutation,
  useUpdateItemMutation,
} from "../aio-urql";
import QueryResult from "../../lib/query-result";
import { useChest } from "../../app-chest";
import ItemsForm from "../forms/items-form";

const Items = () => {
  const [open, setOpen] = useState(false); //for edit and new modal
  const [openDel, setOpenDel] = useState(false); //for delete modal
  const formRef = useRef<FormRef>(null);
  const [result, newItem] = useCreateItemMutation();
  const { error, fetching: creatingItem } = result;

  if (error || creatingItem) return <QueryResult response={result} />;

  const [{}, itemPrice] = useItemPriceMutation();

  const [itemsResult] = useItemsQuery();

  const { data: dataItems, fetching: fetchingItems } = itemsResult;

  const {
    data: { search },
    updateChest,
  } = useChest();

  const deleteItem = (item: Item) => {
    updateChest({
      data: { name: item.name, id: item.id },
      type: "store",
    });
    setOpenDel(true);
  };
  const editItem = (item: Item) => {
    updateChest({
      data: { __typename: "Item", id: item.id },
      type: "store",
    });
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

  const searchItems = dataItems?.items?.filter((item) => {
    const str = (item && Object.values(item).join(" ").toLowerCase()) || "";
    const searche = search || "";
    return str.includes(searche.toLowerCase());
  });

  const tBody = (
    <ItemBody
      searchItems={searchItems}
      editItem={editItem}
      deleteItem={deleteItem}
      itemPrice={itemPrice}
    />
  );

  const [{ fetching: updatingItem }, eItem] = useUpdateItemMutation();

  const [{ fetching: deleting }, dItem] = useRemoveItemMutation();

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
          fetching={creatingItem || updatingItem}
          newItem={newItem}
          eItem={eItem}
          ref={formRef}
          closeModal={() => setOpen(false)}
          defaultValues={defaultValues}
        />
      </FormModal>
      {dataItems?.items && (
        <div className="my-2 mr-2 overflow-x-auto">
          <Table
            Searche={<Search onOpen={() => setOpen(true)} />}
            tHead={tHead}
            tBody={tBody}
            fetching={fetchingItems}
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
