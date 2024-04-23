import { Hotel } from "lucide-react";
import { useRoomsQuery } from "../aio-urql";
import QueryResult from "../../lib/query-result";
import { Search } from "../../lib/search";
import { useChest } from "../../state-mgr/app-chest";
import { DashTable } from "./partials/dash-table";
import { OrderRooms } from "./partials/order-rooms";
import { Booker } from "./partials/booker";

const DashRooms = () => {
  const [roomsRes] = useRoomsQuery();
  if (roomsRes.error || roomsRes.fetching) {
    return <QueryResult result={roomsRes} />;
  }
  const bookable = ["room", "hall", "pool", "other"];

  const {
    data: { search, order_items, mini_search },
  } = useChest();

  const roomSearch = roomsRes.data?.rooms?.filter((room: any) => {
    const str = "room " + room.name + " room" + room.name;
    const searche = search || "";
    return str.includes(searche.toLowerCase());
  });
  const pickedRooms = order_items.items?.filter((item) => {
    const str = Object.values(item).join(" ").toLowerCase();
    const searche = mini_search || "";
    return str.includes(searche.toLowerCase());
  });
  const tOrdersHead = <div>Rooms</div>;
  const tOrdersBody = <OrderRooms searchRooms={pickedRooms} />;
  return (
    <div className="h-fit flex flex-wrap py-5 justify-evenly">
      <div className="">
        <Search hasBtn={false} />
        {roomSearch?.map((room: any) => {
          if (!room) return <></>;
          const type = room.type as any;
          return (
            <span className="link-btn-room">
              <>
                <Hotel className="font-bold w-7 h-7" />{" "}
                <div>
                  {bookable[type]} {room?.name}
                </div>
              </>
            </span>
          );
        })}
      </div>
      <div className="w-6 mx-1 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200"></div>
      <div className="mr-2 basis-7/12 overflow-x-auto">
        <DashTable
          tHead={tOrdersHead}
          tBody={tOrdersBody}
          fetching={roomsRes.fetching}
          tOrder={<Booker />}
        />
      </div>
    </div>
  );
};

export default DashRooms;
