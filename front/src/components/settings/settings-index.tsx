import {
  BoxesIcon,
  Key,
  PackageOpen,
  Receipt,
  ShoppingCart,
  Split,
  Store,
  UsersRound,
} from "lucide-react";
import { Lynk } from "../../lib/lynk";
import { useRoutesQuery } from "../aio-urql";
import QueryResult from "../../lib/query-result";

const SettingsIndex = () => {
  const [routesRes] = useRoutesQuery();

  if (routesRes.error || routesRes.fetching) {
    return <QueryResult response={routesRes} />;
  }

  return (
    <>
      <div className="bg-gradient-to-b from-slate-500 to-slate-700 font-extrabold text-2xl text-white pb-1 text-center rounded-md">
        Settings
      </div>
      <div className="h-fit flex flex-wrap gap-5 py-5 justify-evenly items-center link-btn-container">
        <Lynk
          routes={routesRes.data?.routes}
          className="link-btn-dash"
          to="aio/settings/purchases"
        >
          <ShoppingCart className="font-bold w-7 h-7" /> <div>Purchases</div>
        </Lynk>
        <Lynk
          routes={routesRes.data?.routes}
          className="link-btn-dash"
          to="aio/settings/staff"
        >
          <UsersRound className="font-bold w-7 h-7" /> <div>Staff</div>
        </Lynk>
        <Lynk
          routes={routesRes.data?.routes}
          className="link-btn-dash"
          to="aio/settings/routes"
        >
          <Split className="font-bold w-7 h-7" />
          <div>Routes</div>
        </Lynk>
        <Lynk
          routes={routesRes.data?.routes}
          className="link-btn-dash"
          to="aio/settings/rooms"
        >
          <Key className="font-bold w-7 h-7" />
          <div>Rooms</div>
        </Lynk>
        <Lynk
          routes={routesRes.data?.routes}
          className="link-btn-dash"
          to="aio/settings/billings"
        >
          <Receipt className="font-bold w-7 h-7" />
          <div>Billing</div>
        </Lynk>
        <Lynk
          routes={routesRes.data?.routes}
          className="link-btn-dash"
          to="aio/settings/orders"
        >
          <PackageOpen className="font-bold w-7 h-7" />
          <div>Orders</div>
        </Lynk>
        <Lynk
          routes={routesRes.data?.routes}
          className="link-btn-dash"
          to="aio/settings/items"
        >
          <BoxesIcon className="font-bold w-7 h-7" />
          <div>Items</div>
        </Lynk>
        <Lynk
          routes={routesRes.data?.routes}
          className="link-btn-dash"
          to="aio/settings/items"
        >
          <Store className="font-bold w-7 h-7" />
          <div>Store</div>
        </Lynk>
      </div>
    </>
  );
};
export default SettingsIndex;
