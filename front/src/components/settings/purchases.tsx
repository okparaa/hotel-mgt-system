import { Table } from "../../lib/table";
import { Search } from "../../lib/search";
import { PurchasesItemBody } from "./purchases/purchases-item-body";
import {
  errorMsgHandler,
  getDateFromTimestamp,
  ucwords,
} from "../../lib/utils";

import { useChest } from "../../app-chest";
import { useInventoriesItemsQuery, useNewInventoryMutation } from "../aio-urql";
import QueryResult from "../../lib/query-result";
import { PurchasesCheckout } from "./purchases/purchases-checkout";
import { RotateCcw, Save } from "lucide-react";
import { useState } from "react";
import { options } from "../../config";

const Purchases = () => {
  const today = getDateFromTimestamp(new Date().toDateString());
  const [inventoriesItemsRes] = useInventoriesItemsQuery({
    variables: { date: today },
  });

  if (inventoriesItemsRes.error || !inventoriesItemsRes.data) {
    return <QueryResult response={inventoriesItemsRes} />;
  }

  const {
    data: { search, inventory },
    updateChest,
  } = useChest();

  const [newInventoryRes, newInventory] = useNewInventoryMutation();
  const [errorMsg, setErrorMsg] = useState("");
  if (newInventoryRes.error) {
    setErrorMsg(() => errorMsgHandler(newInventoryRes.error)?.message);
  }
  const evts = new Map();
  inventoriesItemsRes.data?.dates?.forEach((date) => {
    const key: string = date?.createdAt || "j";
    evts.set(key, true);
  });

  options.events = evts;

  const tItemHead = (
    <tr>
      <th className="">NAME</th>
      <th className="!text-center">SKU</th>
      <th className="!text-center">QTY</th>
      <th className="!text-center">DESC</th>
      <th className="!text-center">PRICE</th>
      <th className="!text-center w-20">PICK</th>
    </tr>
  );

  const searchItems = inventoriesItemsRes.data?.items?.filter((item) => {
    const str = Object.values(item!).join(" ").toLowerCase();
    const searche = search || "";
    return str.includes(searche.toLowerCase());
  });

  return (
    <>
      <div className="flex">
        <div className="basis-7/12 overflow-x-auto">
          <Table
            tHead={tItemHead}
            tBody={<PurchasesItemBody searchItems={searchItems} />}
            Searche={<Search hasBtn={false} />}
          />
        </div>
        <div className="w-6 mx-1 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200"></div>
        <div className="w-5/12 rounded-md bg-gradient-to-b from-slate-400 via-slate-200 to-slate-200">
          <PurchasesCheckout options={options} />

          <div className="p-1 text-[16px] gap-10 flex justify-center mt-3">
            <button
              onClick={() => {
                updateChest({
                  type: "inventory",
                  data: {
                    items: [],
                    total: 0,
                    hash: "",
                  },
                });
              }}
              className="px-4 shadow-md py-0 outline-1 bg-slate-600 text-white border text-lg flex items-center gap-2 rounded-full"
            >
              <RotateCcw /> <span className="pb-[3px]">reset</span>
            </button>
            <button
              onClick={() => {
                try {
                  const newInventories = inventory.items.map((item) => {
                    return {
                      priceBought: item.priceBought,
                      qtyBought: item.qtyBought,
                      itemId: item.itemId,
                      createdAt: item.createdAt,
                      userId: item.userId,
                    };
                  });
                  newInventory({
                    inventory: { hash: inventory.hash, items: newInventories },
                  });
                } catch (error) {}
              }}
              className="px-4 shadow-md pb-0 outline-1 bg-slate-600 text-white border text-lg flex items-center gap-2 rounded-full"
            >
              <Save />
              <span className="pb-[3px]">save</span>
            </button>
          </div>
          {errorMsg && (
            <div className="text-2xl text-center pt-4 text-red-600">
              {ucwords(errorMsg)}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Purchases;
