import {
  BadgeCheck,
  Key,
  PackageOpen,
  Receipt,
  ShoppingCart,
  Split,
  UsersRound,
  Warehouse,
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
    <div className="h-fit flex flex-wrap gap-5 py-5 justify-evenly items-center link-btn-container">
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="aio/settings/inventory"
      >
        <ShoppingCart className="font-bold w-7 h-7" /> <div>Inventory</div>
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
        to="aio/settings/sections"
      >
        <BadgeCheck className="font-bold w-7 h-7" />
        <div>Sections</div>
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
        <Warehouse className="font-bold w-7 h-7" />
        <div>Store</div>
      </Lynk>
    </div>
  );
};
export default SettingsIndex;
