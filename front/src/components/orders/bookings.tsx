import { Order, OrdersQuery, useOrdersQuery } from "../aio-urql";
import QueryResult from "../../lib/query-result";
import { Search } from "../../lib/search";
import { useChest } from "../../app-chest";

import { getDateFromTimestamp, getKey } from "../../lib/utils";
import { Table } from "../../lib/table";
import { useLazyQuery } from "../../lib/useLazyQuery";
import { ORDERS } from "../queries/orders-queries";
import DatePicker from "../calendar/date-picker";
import { options } from "../../config";
import { OrdersBody } from "./order/orders-body";

const OrdersBookings = () => {
  const {
    data: { search, booker, store },
    updateChest,
  } = useChest();

  const today =
    store.prevDate || getDateFromTimestamp(new Date().toDateString());
  const [ordersRes1] = useOrdersQuery({
    variables: {
      date: today,
    },
  });

  const [ordersRes2, getBookings] = useLazyQuery<OrdersQuery>({
    query: ORDERS,
  });

  if (ordersRes1.error || ordersRes1.fetching) {
    return <QueryResult response={ordersRes1} />;
  }

  const dateSelect = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const selectedDate = `${year}-${month}-${day}`;
    updateChest({ type: "store", data: { prevDate: selectedDate } });
    getBookings({ date: selectedDate });
  };

  if (booker.hash === "") {
    updateChest({
      data: { ...booker, hash: getKey() + getKey() + getKey() + getKey() },
      type: "booker",
    });
  }

  const OrderBookingHead = (
    <tr>
      <th className="">NAME</th>
      <th className="!text-center">Room(s)</th>
      <th className="!text-center">BALANCE</th>
      <th className="!text-center">HIST</th>
      <th className="!text-center w-20">DEDUCT</th>
    </tr>
  );

  let ordersRes;
  if (ordersRes2.data?.orders && ordersRes2.data?.orders.length > 0) {
    ordersRes = ordersRes2;
  } else {
    ordersRes = ordersRes1;
  }

  const searchOrders = ordersRes.data?.orders?.filter((order) => {
    const str = order?.bookings?.reduce((acc, booking) => {
      return acc + "room " + booking?.room?.name;
    }, "");
    const searche = search || "";
    return str?.includes(searche.toLowerCase());
  }) as Order[];

  return (
    <div className="flex flex-col-reverse md:flex-row">
      <div className="w-full ">
        <div className="flex flex-wrap">
          <Table
            tHead={OrderBookingHead}
            tBody={<OrdersBody searchOrders={searchOrders} />}
            Searche={
              <Search
                hasBtn={false}
                Calenda={
                  <span className="bg-slate-400 flex items-center p-1 rounded-md">
                    <DatePicker options={options} onSelectDate={dateSelect} />
                  </span>
                }
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersBookings;
