import {
  BarChart4Icon,
  BarChartHorizontal,
  LineChart,
  PieChart,
} from "lucide-react";
import { Lynk } from "../../lib/lynk";
import { useRoutesQuery } from "../aio-urql";

const StatsIndex = () => {
  const [routesRes] = useRoutesQuery();

  return (
    <div className="h-fit flex flex-wrap gap-6 lg:gap-7 py-5 justify-evenly items-center">
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="aio/stats/items"
      >
        <BarChartHorizontal className="font-bold w-7 h-7" />
        <div>Store</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="aio/stats/staff"
      >
        <LineChart className="font-bold w-7 h-7" /> <div>Staff</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="aio/stats/sections"
      >
        <BarChart4Icon className="font-bold w-7 h-7" />
        <div>Sections</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="aio/stats/rooms"
      >
        <PieChart className="font-bold w-7 h-7" />
        <div>Rooms</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="aio/stats/kitchen"
      >
        <PieChart className="font-bold w-7 h-7" />
        <div>Kitchen</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="aio/stats/oval"
      >
        <PieChart className="font-bold w-7 h-7" />
        <div>Oval Bar</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="aio/stats/karaoke"
      >
        <PieChart className="font-bold w-7 h-7" />
        <div>Karaoke</div>
      </Lynk>
      <Lynk
        routes={routesRes.data?.routes}
        className="link-btn-dash"
        to="aio/stats/pool"
      >
        <PieChart className="font-bold w-7 h-7" />
        <div>Pool</div>
      </Lynk>
    </div>
  );
};
export default StatsIndex;
