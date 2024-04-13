import { useQuery } from "@apollo/client";
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
import { ROUTES } from "../queries/locals";
import { Lynk } from "../../lib/lynk";

const SettingsIndex = () => {
  const {
    data: { routes },
  } = useQuery(ROUTES);
  console.log(routes);

  return (
    <div className="h-fit flex flex-wrap gap-5 py-5 justify-evenly items-center link-btn-container">
      <Lynk className="link-btn-dash" to="aio/settings/purchases">
        <ShoppingCart className="font-bold w-10 h-10" /> <div>Purchases</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/settings/staff">
        <UsersRound className="font-bold w-10 h-10" /> <div>Staff</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/settings/sections">
        <BadgeCheck className="font-bold w-10 h-10" />
        <div>Sections</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/settings/routes">
        <Split className="font-bold w-10 h-10" />
        <div>Routes</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/settings/rooms">
        <Key className="font-bold w-10 h-10" />
        <div>Rooms</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/settings/billings">
        <Receipt className="font-bold w-10 h-10" />
        <div>Billing</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/settings/orders">
        <PackageOpen className="font-bold w-10 h-10" />
        <div>Orders</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/settings/items">
        <Warehouse className="font-bold w-10 h-10" />
        <div>Store</div>
      </Lynk>
    </div>
  );
};
export default SettingsIndex;
