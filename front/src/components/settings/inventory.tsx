import { Table } from "../../lib/table";
import { Search } from "../../lib/search";
import { MiniSearch } from "../../lib/mini-search";
import { TInventoryBody } from "./partials/t-inventory-body";
import { TInventoryItemBody } from "./partials/t-inventory-item-body";
import { getDateFromTimestamp } from "../../lib/utils";

import { useChest } from "../../app-chest";
import { useLazyQuery } from "../../lib/useLazyQuery";
import {
  InventoriesQuery,
  useDInventoryMutation,
  useEInventoryMutation,
  useInventoriesItemsQuery,
  useNewInventoryMutation,
} from "../aio-urql";
import QueryResult from "../../lib/query-result";
import { GET_INVENTORIES } from "../queries/inventory-queries";
import DatePicker, { DatePickerOptions } from "../calendar/date-picker";

const Inventory = () => {
  const today = getDateFromTimestamp(new Date().toDateString());
  const [inventoriesItemsRes] = useInventoriesItemsQuery({
    variables: { date: today },
  });

  if (inventoriesItemsRes.error || inventoriesItemsRes.fetching) {
    return <QueryResult result={inventoriesItemsRes} />;
  }

  const {
    data: { search, mini_search },
    updateChest,
  } = useChest();

  const [inventoriesRes, getInventories] = useLazyQuery<InventoriesQuery>({
    query: GET_INVENTORIES,
  });

  const [{}, dInventory] = useDInventoryMutation();

  const [{}, newInventory] = useNewInventoryMutation();
  const [{}, eInventory] = useEInventoryMutation();

  const evts = new Map();
  inventoriesItemsRes.data?.dates?.forEach((date) => {
    const key: string = date?.createdAt || "j";
    evts.set(key, true);
  });

  const dateSelect = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const selectedDate = `${year}-${month}-${day}`;
    console.log("new date", date);
    updateChest({ type: "store", data: { prev_date: selectedDate } });
    getInventories({ date: selectedDate });
  };

  const tItemHead = (
    <tr>
      <th>NAME</th>
      <th className="!text-center">SKU</th>
      <th className="!text-center">PICK</th>
    </tr>
  );

  const options: DatePickerOptions = {
    minYear: 2022,
    maxYear: 2040,
    initialDate: new Date(),
    normal: true,
    events: evts,
  };

  const tInventoryHead = (
    <tr>
      <th className="w-16">SKU</th>
      <th>NAME</th>
      <th className="!text-center">U/Price</th>
      <th className="w-24 !text-center">QTY</th>
      <th className="!text-center">
        DEL
        <span className="border-b border-gray-600 pl-1 pb-1 absolute cursor-pointer top-0 right-0">
          <DatePicker options={options} onSelectDate={dateSelect} />
        </span>
      </th>
    </tr>
  );

  const searchItems = inventoriesItemsRes.data?.items?.filter((item) => {
    const str = Object.values(item!).join(" ").toLowerCase();
    const searche = search || "";
    return str.includes(searche.toLowerCase());
  });

  const currInventories = (
    inventoriesRes.data?.inventories || inventoriesItemsRes.data?.inventories
  )?.filter((inventory) => {
    const item = inventory?.item;
    const str = (item && Object.values(item).join(" ").toLowerCase()) || "";
    const searche = mini_search || "";
    return inventory?.deleted === false && str.includes(searche.toLowerCase());
  });

  const tBody = (
    <TInventoryItemBody
      currInventories={currInventories}
      newInventory={newInventory}
      searchItems={searchItems}
    />
  );

  const tInventoryBody = (
    <TInventoryBody
      currInventories={currInventories}
      dInventory={dInventory}
      eInventory={eInventory}
    />
  );

  return (
    <>
      <div className="flex">
        <div className="basis-5/12 overflow-x-auto">
          <Table
            tHead={tItemHead}
            tBody={tBody}
            Searche={<Search hasBtn={false} />}
          />
        </div>
        <div className="w-6 mx-1 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200"></div>
        <div className="mr-2 basis-7/12 overflow-x-auto">
          <Table
            Searche={<MiniSearch />}
            tHead={tInventoryHead}
            tBody={tInventoryBody}
            fetching={inventoriesItemsRes.fetching}
          />
        </div>
      </div>
    </>
  );
};

export default Inventory;
