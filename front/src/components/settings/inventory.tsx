import { useCallback, useRef } from "react";
import { CalendarDays } from "lucide-react";

import { Table } from "../../lib/table";
import { Search } from "../../lib/search";
import { MiniSearch } from "../../lib/mini-search";
import { TInventoryBody } from "./partials/t-inventory-body";
import { TInventoryItemBody } from "./partials/t-inventory-item-body";
import { getDateFromTimestamp } from "../../lib/utils";

import "../pikaday/css/pikaday.css";
import { Pikaday } from "../pikaday/pikaday";
import { useChest } from "../../state-mgr/app-chest";
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

const Inventory = () => {
  const today = getDateFromTimestamp();
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

  const triggerRef = useRef(undefined);
  const min_year = 2022;
  const max_year = 2040;

  const initial_date = new Date();

  const evts = inventoriesItemsRes.data?.dates?.map((date) => {
    return date?.createdAt ? new Date(date.createdAt).toDateString() : "";
  });

  const pikaRef = useCallback(
    (node: any) => {
      new Pikaday({
        field: node,
        trigger: triggerRef.current,
        reposition: true,
        events: evts,
        format: "YYYY-M-D",
        keyboardInput: false,
        defaultDate: initial_date,
        yearRange: [min_year, max_year],
        onSelect: dateSelect,
        toString(date: any) {
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return `${year}-${month}-${day}`;
        },
      });
    },
    [inventoriesItemsRes.data?.dates]
  );

  const dateSelect = (_: any, dateObj: any) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const date = `${year}-${month}-${day}`;
    console.log("new date", date);
    updateChest({ type: "store", data: { prev_date: date } });
    getInventories({ date });
  };

  const tItemHead = (
    <tr>
      <th>NAME</th>
      <th className="!text-center">SKU</th>
      <th className="!text-center">PICK</th>
    </tr>
  );

  const tInventoryHead = (
    <tr>
      <th className="w-16">SKU</th>
      <th>NAME</th>
      <th className="!text-center">U/Price</th>
      <th className="w-24 !text-center">QTY</th>
      <th className="!text-center">
        DEL
        <span
          ref={pikaRef}
          className="border-b border-gray-600 pl-1 pb-1 absolute cursor-pointer top-0 right-0"
        >
          <CalendarDays className="hover:-translate-x-[2px] transition-transform" />
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
