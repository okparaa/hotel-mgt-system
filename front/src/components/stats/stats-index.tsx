import {
  BarChart4Icon,
  BarChartHorizontal,
  LineChart,
  PieChart,
} from "lucide-react";
import { Lynk } from "../../lib/lynk";

const StatsIndex = () => {
  return (
    <div className="h-fit flex flex-wrap gap-6 lg:gap-10 py-5 justify-evenly items-center">
      <Lynk className="link-btn-dash" to="aio/stats/items">
        <BarChartHorizontal className="font-bold w-10 h-10" />
        <div>Store</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/stats/staff">
        <LineChart className="font-bold w-10 h-10" /> <div>Staff</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/stats/sections">
        <BarChart4Icon className="font-bold w-10 h-10" />
        <div>Sections</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/stats/rooms">
        <PieChart className="font-bold w-10 h-10" />
        <div>Rooms</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/stats/kitchen">
        <PieChart className="font-bold w-10 h-10" />
        <div>Kitchen</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/stats/oval">
        <PieChart className="font-bold w-10 h-10" />
        <div>Oval Bar</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/stats/karaoke">
        <PieChart className="font-bold w-10 h-10" />
        <div>Karaoke</div>
      </Lynk>
      <Lynk className="link-btn-dash" to="aio/stats/pool">
        <PieChart className="font-bold w-10 h-10" />
        <div>Pool</div>
      </Lynk>
    </div>
  );
};
export default StatsIndex;
