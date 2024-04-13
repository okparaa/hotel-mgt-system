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
import { Link } from "react-router-dom";

const OrdersIndex = () => {
  return (
    <div className="h-fit flex flex-wrap gap-5 py-5 justify-evenly items-center link-btn-dash-container">
      <Link className="link-btn-dash" to="/aio/orders/acco">
        <ShoppingCart className="font-bold w-10 h-10" /> <div>Rooms</div>
      </Link>
      <Link className="link-btn-dash" to="/aio/orders/booking">
        <UsersRound className="font-bold w-10 h-10" /> <div>Reserve X</div>
      </Link>
      <Link className="link-btn-dash" to="/aio/orders/tribes">
        <Split className="font-bold w-10 h-10" />
        <div>Tribes</div>
      </Link>
      <Link className="link-btn-dash" to="/aio/orders/oval">
        <Key className="font-bold w-10 h-10" />
        <div>Oval Bar</div>
      </Link>
      <Link className="link-btn-dash" to="/aio/orders/katunga">
        <Sofa className="font-bold w-10 h-10" />
        <div>Katunga</div>
      </Link>
      <Link className="link-btn-dash" to="/aio/orders/karaoke">
        <Music4 className="font-bold w-10 h-10" />
        <div>Karaoke</div>
      </Link>
      <Link className="link-btn-dash" to="/aio/orders/pool">
        <Waves className="font-bold w-10 h-10" />
        <div>Pool</div>
      </Link>
      <Link className="link-btn-dash" to="/aio/orders/laundry">
        <CloudSun className="font-bold w-10 h-10" />
        <div>Laundry</div>
      </Link>
      <Link className="link-btn-dash" to="/aio/orders/lost-card">
        <LucideFileKey2 className="font-bold w-10 h-10" />
        <div>Key Card</div>
      </Link>
      <Link className="link-btn-dash" to="/aio/orders/photo-space">
        <Camera className="font-bold w-10 h-10" />
        <div>Photo Space</div>
      </Link>
      <Link className="link-btn-dash" to="/aio/orders/shisha">
        <Cigarette className="font-bold w-10 h-10" />
        <div>Shisha</div>
      </Link>
      <Link className="link-btn-dash" to="/aio/orders/resv-fb">
        <Wine className="font-bold w-10 h-10" />
        <div>Resv F&B</div>
      </Link>
      <Link className="link-btn-dash" to="/aio/orders/hall">
        <Warehouse className="font-bold w-10 h-10" />
        <div>Hall</div>
      </Link>
      <Link className="link-btn-dash" to="/aio/orders/bbq">
        <Fish className="font-bold w-10 h-10" />
        <div>BBQ</div>
      </Link>
      <Link className="link-btn-dash" to="/aio/orders/cockage">
        <DropletsIcon className="font-bold w-10 h-10" />
        <div>Cockage</div>
      </Link>
    </div>
  );
};
export default OrdersIndex;
