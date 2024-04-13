import {
  Camera,
  Cigarette,
  CloudSun,
  DropletsIcon,
  Fish,
  Hotel,
  Key,
  LucideFileKey2,
  Music4,
  Sofa,
  Split,
  UsersRound,
  Warehouse,
  Waves,
  Wine,
} from "lucide-react";
import { Lynk } from "../../lib/lynk";
import { Fragment } from "preact/jsx-runtime";

const Aio = () => {
  return (
    <div className="h-fit flex flex-wrap gap-5 py-5 justify-evenly items-center link-btn-dash-container">
      <Lynk className="link-btn-dash" to="aio/orders/acco">
        <Fragment>
          <Hotel className="font-bold w-7 h-7" /> <div>Rooms</div>
        </Fragment>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/orders/booking">
        <Fragment>
          <UsersRound className="font-bold w-7 h-7" />
          <div>Reserve X</div>
        </Fragment>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/orders/tribes">
        <Split className="font-bold w-7 h-7" />
        <div>Tribes</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/orders/oval">
        <Key className="font-bold w-7 h-7" />
        <div>Oval Bar</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/orders/katunga">
        <Sofa className="font-bold w-7 h-7" />
        <div>Katunga</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/orders/karaoke">
        <Music4 className="font-bold w-7 h-7" />
        <div>Karaoke</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/orders/pool">
        <Waves className="font-bold w-7 h-7" />
        <div>Pool</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/orders/laundry">
        <CloudSun className="font-bold w-7 h-7" />
        <div>Laundry</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/orders/lost-card">
        <LucideFileKey2 className="font-bold w-7 h-7" />
        <div>Key Card</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/orders/photo-space">
        <Camera className="font-bold w-7 h-7" />
        <div>Photo Space</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/orders/shisha">
        <Cigarette className="font-bold w-7 h-7" />
        <div>Shisha</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/orders/resv-fb">
        <Wine className="font-bold w-7 h-7" />
        <div>Resv F&B</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/orders/hall">
        <Warehouse className="font-bold w-7 h-7" />
        <div>Hall</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/orders/bbq">
        <Fish className="font-bold w-7 h-7" />
        <div>BBQ</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/orders/corkage">
        <DropletsIcon className="font-bold w-7 h-7" />
        <div>Cockage</div>
      </Lynk>
    </div>
  );
};

export default Aio;
