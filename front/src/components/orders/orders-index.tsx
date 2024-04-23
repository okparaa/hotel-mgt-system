import {
  Camera,
  Cigarette,
  CloudSun,
  DropletsIcon,
  Fish,
  Key,
  LucideFileKey2,
  Music4,
  ShoppingCart,
  Sofa,
  Split,
  UsersRound,
  Warehouse,
  Waves,
  Wine,
} from "lucide-react";
import { Lynk } from "../../lib/lynk";
import { useRoutesQuery } from "../aio-urql";
const [routesRes] = useRoutesQuery();
const OrdersIndex = () => {
  return (
    <div className="h-fit flex flex-wrap gap-5 py-5 justify-evenly items-center link-btn-dash-container">
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="/aio/orders/acco"
      >
        <ShoppingCart className="font-bold w-10 h-10" /> <div>Rooms</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="/aio/orders/booking"
      >
        <UsersRound className="font-bold w-10 h-10" /> <div>Reserve X</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="/aio/orders/tribes"
      >
        <Split className="font-bold w-10 h-10" />
        <div>Tribes</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="/aio/orders/oval"
      >
        <Key className="font-bold w-10 h-10" />
        <div>Oval Bar</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="/aio/orders/katunga"
      >
        <Sofa className="font-bold w-10 h-10" />
        <div>Katunga</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="/aio/orders/karaoke"
      >
        <Music4 className="font-bold w-10 h-10" />
        <div>Karaoke</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="/aio/orders/pool"
      >
        <Waves className="font-bold w-10 h-10" />
        <div>Pool</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="/aio/orders/laundry"
      >
        <CloudSun className="font-bold w-10 h-10" />
        <div>Laundry</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="/aio/orders/lost-card"
      >
        <LucideFileKey2 className="font-bold w-10 h-10" />
        <div>Key Card</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="/aio/orders/photo-space"
      >
        <Camera className="font-bold w-10 h-10" />
        <div>Photo Space</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="/aio/orders/shisha"
      >
        <Cigarette className="font-bold w-10 h-10" />
        <div>Shisha</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="/aio/orders/resv-fb"
      >
        <Wine className="font-bold w-10 h-10" />
        <div>Resv F&B</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="/aio/orders/hall"
      >
        <Warehouse className="font-bold w-10 h-10" />
        <div>Hall</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="/aio/orders/bbq"
      >
        <Fish className="font-bold w-10 h-10" />
        <div>BBQ</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="/aio/orders/cockage"
      >
        <DropletsIcon className="font-bold w-10 h-10" />
        <div>Cockage</div>
      </Lynk>
    </div>
  );
};
export default OrdersIndex;
