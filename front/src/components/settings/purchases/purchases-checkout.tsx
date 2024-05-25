import { toCommas } from "../../../lib/utils";
import { useChest } from "../../../app-chest";
import { Trash2 } from "lucide-react";
import DatePicker, { DatePickerOptions } from "../../calendar/date-picker";
import { useLazyQuery } from "../../../lib/useLazyQuery";
import { ChestBookItem, ChestPurchase } from "../../../lib/types";
import { AddInput } from "../../../lib/add-input";
import { PurchasesQuery } from "../../aio-urql";
import { PURCHASES } from "../../queries/purchases-queries";

type PurchasesCheckoutProps = {
  options: DatePickerOptions;
};

export const PurchasesCheckout = ({ options }: PurchasesCheckoutProps) => {
  const {
    data: { purchase },
    updateChest,
  } = useChest();

  const [inventoryRes, getInventories] = useLazyQuery<PurchasesQuery>({
    query: PURCHASES,
  });

  if (inventoryRes.data && !inventoryRes.error) {
    const items = inventoryRes.data?.purchases?.map((purchase) => {
      return {
        priceBought: purchase?.priceBought,
        qtyBought: purchase?.qtyBought,
        itemId: "",
        userId: purchase?.userId,
        name: purchase?.item?.name,
        sku: purchase?.item?.sku,
      };
    });
    const purchase = {
      total: 0,
      items: items,
      hash: "",
    } as ChestPurchase;

    updateChest({
      data: { ...purchase },
      type: "purchase",
    });
  }

  const dateSelect = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const selectedDate = `${year}-${month}-${day}`;
    updateChest({ type: "store", data: { prevDate: selectedDate } });
    getInventories({ date: selectedDate });
  };

  return (
    <div className="flex flex-col w-full px-2">
      <div className="bg-slate-600 p-2 text-center my-2 rounded-md border-2 flex justify-between">
        <span className="text-xl font-semibold text-white flex items-center pl-3">
          <span>Purchase: </span>
          <span className="naira ml-2">{toCommas(purchase.total || "")}</span>
        </span>
        <span className="bg-slate-400 flex items-center p-2 rounded-md">
          <DatePicker options={options} onSelectDate={dateSelect} />
        </span>
      </div>
      <div className="flex font-semibold">
        <span className="text-center flex-1">SKU</span>
        <span className="text-center flex-1">Name</span>
        <span className="text-center flex-1">U/Price</span>
        <span className="flex-1 text-center">Qty</span>
        <span className="text-center flex px-2">
          <span>Del</span>
        </span>
      </div>
      {purchase.items?.map((item) => {
        return (
          <>
            <div className="order">
              <span className="orderspan">{item.sku}</span>
              <span className="orderspan">{item.name}</span>
              <span className="orderspan">
                <span className="border-black cursor-text flex m-auto justify-center items-center rounded-sm w-full">
                  <AddInput
                    id={item.itemId}
                    initialValue={item.priceBought || "0"}
                    action={(value) => {
                      const itm = {
                        itemId: item.itemId,
                        priceBought: value,
                        qtyBought: item.qtyBought,
                      };
                      const updatedItems: any = purchase.items.map(
                        (item: any) => {
                          if (item.itemId === itm.itemId) {
                            return { ...item, ...itm };
                          }
                          return item;
                        }
                      );

                      const total = updatedItems.reduce(
                        (acc: number, item: ChestBookItem) => {
                          return (
                            acc +
                            Number(item.priceBought) * Number(item.qtyBought)
                          );
                        },
                        0
                      );

                      updateChest({
                        type: "purchase",
                        data: {
                          hash: purchase.hash,
                          total,
                          items: updatedItems,
                        },
                      });
                    }}
                  />
                </span>
              </span>
              <span className="orderspan">
                <span className="cursor-text border-black flex w-full m-auto justify-center items-center rounded-sm">
                  <AddInput
                    id={item.itemId}
                    isCurrency={false}
                    initialValue={item.qtyBought || "0"}
                    action={(value) => {
                      const bought = {
                        itemId: item.itemId,
                        priceBought: item.priceBought,
                        qtyBought: value,
                      };
                      const updatedItems: any = purchase.items.map(
                        (item: any) => {
                          if (item.itemId === bought.itemId) {
                            return { ...item, ...bought };
                          }
                          return item;
                        }
                      );
                      const total = updatedItems.reduce(
                        (acc: number, item: ChestBookItem) => {
                          return (
                            acc +
                            Number(item.priceBought) * Number(item.qtyBought)
                          );
                        },
                        0
                      );
                      updateChest({
                        type: "purchase",
                        data: {
                          hash: purchase.hash,
                          total,
                          items: updatedItems,
                        },
                      });
                    }}
                  />
                </span>
              </span>
              <span className="p-2 flex items-center">
                <span
                  className="cursor-pointer"
                  id={item.itemId}
                  onClick={() => {
                    const updatedItems: any = purchase.items.filter(
                      (bought: any) => bought.itemId !== item.itemId
                    );
                    const total = updatedItems.reduce(
                      (acc: number, item: ChestBookItem) => {
                        return (
                          acc +
                          Number(item.priceBought) * Number(item.qtyBought)
                        );
                      },
                      0
                    );
                    updateChest({
                      type: "purchase",
                      data: {
                        hash: purchase.hash,
                        total,
                        items: updatedItems,
                      },
                    });
                  }}
                >
                  <Trash2 size={20} className="ikon" />
                </span>
              </span>
            </div>
          </>
        );
      })}
    </div>
  );
};
