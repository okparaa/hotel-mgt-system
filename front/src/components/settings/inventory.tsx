import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useCallback, useRef } from "react";
import { CalendarDays } from "lucide-react";
import "pikaday/css/pikaday.css";
import Pikaday from "pikaday";

import { Table } from "../../lib/table";
import {
  CREATE_INVENTORY,
  DEL_INVENTORY,
  EDIT_INVENTORY,
  GET_INVENTORIES,
  GET_ITEM_INVENTORIES,
} from "../queries/inventory-queries";
import Working from "../../lib/working";
import { Search } from "../../lib/search";
import { MiniSearch } from "../../lib/mini-search";
import { MINI_SEARCH, SEARCH, STORE } from "../queries/locals";
import { TInventoryBody } from "./partials/t-inventory-body";
import { TInventoryItemBody } from "./partials/t-inventory-item-body";
import { getDateFromTimestamp } from "../../lib/utils";
import { store } from "../../lib/client";

const Inventory = () => {
  const today = getDateFromTimestamp();
  const { data, loading } = useQuery(GET_ITEM_INVENTORIES, {
    variables: { date: today },
  });
  const {
    data: { prevDate },
  } = useQuery(STORE);

  const [getInventories, { data: inData }] = useLazyQuery(GET_INVENTORIES, {
    variables: { date: prevDate ? prevDate : today },
  });

  const {
    data: { search },
  } = useQuery(SEARCH);

  const {
    data: { mini_search },
  } = useQuery(MINI_SEARCH);

  const [dInventory] = useMutation(DEL_INVENTORY, {
    update: (cache) => {
      cache.updateQuery(
        {
          query: GET_INVENTORIES,
          variables: { date: prevDate ? prevDate : today },
        },
        ({ inventories }: any) => ({
          inventories: inventories.filter((inv: any) => inv.deleted == false),
        })
      );
    },
  });

  const [newInventory] = useMutation(CREATE_INVENTORY);
  const [eInventory] = useMutation(EDIT_INVENTORY);

  const triggerRef = useRef(null);
  const min_year = 2022;
  const max_year = 2040;

  const initial_date = new Date();
  const dateSelect = (dateObj: any) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const date = `${year}-${month}-${day}`;

    store({ prevDate: date });
    getInventories({
      variables: { date },
    });
  };

  const { inventories, items, dates } = { ...data, ...inData }; //at this point data is not null

  const evts = dates?.map((inventory) => {
    return inventory?.createdAt
      ? new Date(inventory.createdAt).toDateString()
      : "";
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
    [dates]
  );

  if (loading || !data) return <Working loading={loading} />;

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

  const searchItems = items?.filter((item: any) => {
    const str = Object.values(item).join(" ").toLowerCase();
    const searche = search || "";
    return str.includes(searche.toLowerCase());
  });

  const currInventories = inventories?.filter((inventory: any) => {
    const str = Object.values(inventory.item).join(" ").toLowerCase();
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
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default Inventory;
