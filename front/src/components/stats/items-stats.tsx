import { useCallback } from "react";
import "chartist/dist/index.css";
import { BarChart } from "chartist";
import { useItemsChartQuery } from "../aio-urql";
import QueryResult from "../../lib/query-result";

const ItemStats = () => {
  const [itemsChartRes] = useItemsChartQuery();

  let graphtRef = useCallback(
    (node: any) => {
      const labels =
        (itemsChartRes?.data &&
          itemsChartRes?.data?.itemsChart?.map((item: any) => item.name)) ||
        [];
      const values =
        (itemsChartRes?.data &&
          itemsChartRes?.data?.itemsChart?.map((item: any) => ({
            meta: item,
            value: item.qtyBought,
          }))) ||
        [];

      if (node) {
        new BarChart(
          node,
          {
            labels,
            series: [values],
          },
          {
            seriesBarDistance: 5,
            horizontalBars: true,
            axisY: {
              offset: 70,
              showGrid: false,
            },
            axisX: {
              onlyInteger: true,
            },
          },
          [
            // Options override for media < 480px
            [
              "screen and (max-width: 480px)",
              {
                height: "100vh",
              },
            ],
          ]
        ).on("draw", (data: any) => {
          if (data.type === "bar") {
            data.element._node.addEventListener(
              "mouseenter",
              (evt: MouseEvent) => {
                console.log(evt.offsetX, evt.offsetY, evt.x, evt.y, evt);

                const tooltip =
                  document.getElementsByClassName("chartist-tooltip");

                (tooltip[0] as HTMLDivElement).style.top =
                  evt.clientY + window.scrollY - 100 + "px";

                (tooltip[0] as HTMLDivElement).style.left =
                  evt.clientX + window.scrollX - 160 + "px";

                tooltip[0].classList.remove("hidden");

                const meta = document.getElementsByClassName(
                  "chartist-tooltip-meta"
                );
                meta[0].innerHTML = data.meta.name;

                const value = document.getElementsByClassName(
                  "chartist-tooltip-value"
                );
                value[0].innerHTML = "stock: " + data.meta.qtyBought;
              }
            );
            data.element._node.addEventListener("mouseleave", () => {
              const tooltip =
                document.getElementsByClassName("chartist-tooltip");
              tooltip[0].classList.add("hidden");
            });
          }
        });
      }
    },
    [itemsChartRes.data]
  );

  if (itemsChartRes.error || itemsChartRes.fetching) {
    return <QueryResult response={itemsChartRes} />;
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="w-full ct-chart">
        <div className="relative">
          <div className="absolute z-10 bg-white text-xs shadow text-center px-3 py-1 rounded-md w-auto chartist-tooltip">
            <span className="chartist-tooltip-meta"></span>
            <br />
            <span className="chartist-tooltip-value"></span>
          </div>
        </div>
      </div>
      <div ref={graphtRef} className="ct-chart ct-perfect-fourth"></div>
    </div>
  );
};
export default ItemStats;
