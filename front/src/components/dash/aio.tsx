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
  Warehouse,
  Waves,
  Wine,
} from "lucide-react";
import { Lynk } from "../../lib/lynk";
import { Fragment } from "preact";
import { useRoutesQuery } from "../aio-urql";

const Aio = () => {
  const [{ data }] = useRoutesQuery();
  const routes = data?.routes;

  return (
    <>
      <div className="bg-gradient-to-b from-slate-500 to-slate-700 font-extrabold text-2xl text-white pb-1 text-center rounded-md">
        Dashboard
      </div>

      <div className="h-fit flex flex-wrap gap-5 py-5 justify-evenly items-center link-btn-dash-container">
        <Lynk routes={routes} className="link-btn-dash" to="aio/dash/bookings">
          <Fragment>
            <Hotel className="font-bold w-7 h-7" /> <div>Front Desk</div>
          </Fragment>
        </Lynk>
        <Lynk routes={routes} className="link-btn-dash" to="aio/orders/tribes">
          <Split className="font-bold w-7 h-7" />
          <div>Tribes</div>
        </Lynk>
        <Lynk routes={routes} className="link-btn-dash" to="aio/orders/oval">
          <Key className="font-bold w-7 h-7" />
          <div>Oval Bar</div>
        </Lynk>
        <Lynk routes={routes} className="link-btn-dash" to="aio/orders/katunga">
          <Sofa className="font-bold w-7 h-7" />
          <div>Katunga</div>
        </Lynk>
        <Lynk routes={routes} className="link-btn-dash" to="aio/orders/karaoke">
          <Music4 className="font-bold w-7 h-7" />
          <div>Karaoke</div>
        </Lynk>
        <Lynk routes={routes} className="link-btn-dash" to="aio/orders/pool">
          <Waves className="font-bold w-7 h-7" />
          <div>Pool</div>
        </Lynk>
        <Lynk routes={routes} className="link-btn-dash" to="aio/orders/laundry">
          <CloudSun className="font-bold w-7 h-7" />
          <div>Laundry</div>
        </Lynk>
        <Lynk
          routes={routes}
          className="link-btn-dash"
          to="aio/orders/lost-card"
        >
          <LucideFileKey2 className="font-bold w-7 h-7" />
          <div>Key Card</div>
        </Lynk>
        <Lynk
          routes={routes}
          className="link-btn-dash"
          to="aio/orders/photo-space"
        >
          <Camera className="font-bold w-7 h-7" />
          <div>Photo Space</div>
        </Lynk>
        <Lynk routes={routes} className="link-btn-dash" to="aio/orders/shisha">
          <Cigarette className="font-bold w-7 h-7" />
          <div>Shisha</div>
        </Lynk>
        <Lynk routes={routes} className="link-btn-dash" to="aio/orders/resv-fb">
          <Wine className="font-bold w-7 h-7" />
          <div>Resv F&B</div>
        </Lynk>
        <Lynk routes={routes} className="link-btn-dash" to="aio/orders/hall">
          <Warehouse className="font-bold w-7 h-7" />
          <div>Hall</div>
        </Lynk>
        <Lynk routes={routes} className="link-btn-dash" to="aio/orders/bbq">
          <Fish className="font-bold w-7 h-7" />
          <div>BBQ</div>
        </Lynk>
        <Lynk routes={routes} className="link-btn-dash" to="aio/orders/corkage">
          <DropletsIcon className="font-bold w-7 h-7" />
          <div>Cockage</div>
        </Lynk>
      </div>
    </>
  );
};

export default Aio;
