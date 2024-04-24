import { MiniSearch } from "../../lib/mini-search";
import { Table } from "../../lib/table";
import { TOrderItemBody } from "./partials/t-order-item-body";
import { TOrderBody } from "./partials/t-order-body";
import { TOrderCheckout } from "./partials/t-order-checkout";
import { useItemsQuery } from "../aio-urql";
import { useChest } from "../../app-chest";
import QueryResult from "../../lib/query-result";
import { Search } from "../../lib/search";

const Orders = () => {
  const [result] = useItemsQuery();
  const { data: dataItems, error, fetching: fetchingItems } = result;
  if (error || fetchingItems) return <QueryResult result={result} />;
  const {
    data: { search, mini_search, order_items },
  } = useChest();

  const tOrdersHead = (
    <tr>
      <th className="w-14">SKU</th>
      <th>NAME</th>
      <th className="!text-center">Price</th>
      <th className="w-24 !text-center">QTY</th>
      <th className="!text-center">DEL</th>
    </tr>
  );
  const tItemHead = (
    <tr>
      <th>NAME</th>
      <th className="!text-center">SKU</th>
      <th>PRICE</th>
      <th className="!text-center">PICK</th>
    </tr>
  );

  const searchItems = dataItems?.items?.filter((item) => {
    const str = Object.values(item!).join(" ").toLowerCase();
    const searche = search || "";
    return str.includes(searche.toLowerCase());
  });

  const pickedItems = order_items.items?.filter((item) => {
    const str = Object.values(item).join(" ").toLowerCase();
    const searche = mini_search || "";
    return str.includes(searche.toLowerCase());
  });

  const tItemBody = <TOrderItemBody searchItems={searchItems} />;
  const tOrdersBody = <TOrderBody pickedItems={pickedItems} />;

  return (
    <div className="flex">
      <div className="basis-5/12 overflow-x-auto">
        <Table
          tHead={tItemHead}
          tBody={tItemBody}
          Searche={<Search hasBtn={false} />}
        />
      </div>
      <div className="w-6 mx-1 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200"></div>
      <div className="mr-2 basis-7/12 overflow-x-auto">
        <Table
          Searche={<MiniSearch />}
          tHead={tOrdersHead}
          tBody={tOrdersBody}
          fetching={fetchingItems}
          tOrder={<TOrderCheckout />}
        />
      </div>
    </div>
  );
};

export default Orders;
