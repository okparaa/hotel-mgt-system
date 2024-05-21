import { Table } from "../../lib/table";
import { Search } from "../../lib/search";
import { useChest } from "../../app-chest";
import {
  useChangeRecoveryMutation,
  useRemoveRecoveryMutation,
  useUsersQuery,
} from "../aio-urql";
import QueryResult from "../../lib/query-result";
import { getDateFromTimestamp, toCommas } from "../../lib/utils";
import FormModal from "../../lib/form-modal";
import { useEffect, useRef, useState } from "react";
import { Loader2, Save, Trash2 } from "lucide-react";
import { Navigate } from "react-router-dom";
import autosize from "autosize";
import DatePicker from "../calendar/date-picker";
import { TDebitBody } from "./partials/t-debit-body";
import { options } from "../../config";

const Debits = () => {
  const dateSelect = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const selectedDate = `${year}-${month}-${day}`;
    updateChest({ type: "debit", data: { prevDate: selectedDate } });
  };

  const {
    data: { search, store, debit },
    updateChest,
  } = useChest();

  if (store.__typename !== "Order" && !store.id) {
    <Navigate to="/aio/orders/bookings" replace />;
  }
  const [open, setOpen] = useState(false); //for edit and new modal

  const [usersRes] = useUsersQuery();
  const [removeDebitRes, removeDebit] = useRemoveRecoveryMutation();
  const [changeDebitRes, changeDebit] = useChangeRecoveryMutation();

  if (usersRes.error || usersRes.fetching) {
    return <QueryResult response={usersRes} />;
  }

  const tHead = (
    <tr>
      <th className="">name</th>
      <th className="text-base !text-center">Debits</th>
      <th className="w-24">Action</th>
      <th className="w-32">Salary Due</th>
    </tr>
  );

  const Info = (
    <div className="text-2xl text-white bg-slate-600 border border-slate-600 mx-[2px] py-2">
      Recover <span className="naira">{toCommas(store.value)}</span>
    </div>
  );

  const searchUsers = usersRes.data?.users?.filter((user) => {
    const str = (user && Object.values(user).join(" ").toLowerCase()) || "";
    const searche = search || "";
    return str.includes(searche.toLowerCase());
  });

  const taRef = useRef<HTMLTextAreaElement>(null);
  const [taValue, setTaValue] = useState<String>("lost payment");
  useEffect(() => {
    if (taRef && taRef.current) {
      autosize(taRef.current);
    }
  }, [taValue]);

  return (
    <>
      <div className="my-2 mr-2">
        <FormModal
          isOpen={open}
          onClose={() => setOpen(false)}
          className="p-4 rounded-xl shadow-xl backdrop:bg-gray-800 backdrop:bg-opacity-45 w-[375px] min-h-[306px]"
        >
          <div className="flex flex-col">
            <span className="flex items-center justify-between gap-3">
              <span className="w-32 h-7 border rounded-md text-base">
                {getDateFromTimestamp(debit.prevDate, "d-msh-y")}
              </span>
              <span className="link bg-slate-300 cursor-pointer !rounded-md !px-1 mr-6">
                <DatePicker options={options} onSelectDate={dateSelect} />
              </span>
            </span>
            <div className="flex justify-center mt-6 h-full">
              <label htmlFor="debit-aim" className="mr-3">
                Debit:
              </label>
              <span
                className={`border naira cursor-text border-gray-400 flex w-24 h-8 rounded-md items-center ${
                  changeDebitRes.fetching || removeDebitRes.fetching
                    ? "opacity-25"
                    : ""
                }`}
              >
                {changeDebitRes.fetching ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <input
                    type="text"
                    id="debit-aim"
                    className="w-11/12 outline-none focus:border-slate-600 focus:border-y-[1px]"
                    value={debit?.value}
                    onChange={(e) => {
                      const value = (e.target as HTMLInputElement).value;
                      updateChest({ data: { value }, type: "debit" });
                    }}
                  />
                )}
              </span>
            </div>
            <span className="mt-4">
              <textarea
                name="reason"
                className="border-y-[2px] text-base p-1 focus:outline-none focus:border-slate-500 rounded-md"
                id="reason"
                colSpan={30}
                rowSpan={1}
                placeholder="Reason, [eg: (s)he lost cash]"
                ref={taRef}
                onChange={(e) => {
                  setTaValue((e.target as HTMLTextAreaElement)?.value);
                }}
              ></textarea>
            </span>
            <span className="flex justify-around mt-3">
              <span
                onClick={async () => {
                  await removeDebit({
                    debitId: debit.id!,
                  });
                  setOpen(false);
                }}
                className="link bg-slate-300 cursor-pointer mr-2 !rounded-md"
              >
                {removeDebitRes.fetching ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span className="flex flex-col items-center w-10">
                    <Trash2 />
                    <span className="text-sm">delete</span>
                  </span>
                )}
              </span>
              <span
                onClick={async () => {
                  await changeDebit({
                    debit: {
                      debitId: debit.id as string,
                      debitAmt: Number(debit.value),
                      debitAim: taValue as string,
                      debitedAt: debit.prevDate,
                    },
                  });
                  setOpen(false);
                }}
                className="link bg-slate-300 cursor-pointer mr-2 !rounded-md"
              >
                {removeDebitRes.fetching ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span className="flex flex-col items-center w-10">
                    <Save />
                    <span className="text-sm">save</span>
                  </span>
                )}
              </span>
            </span>
          </div>
        </FormModal>
        <Table
          className="border-separate"
          Searche={<Search hasBtn={false} />}
          tHead={tHead}
          tBody={
            <TDebitBody
              searchUsers={searchUsers}
              onOpen={() => setOpen(true)}
            />
          }
          fetching={usersRes.fetching}
          Info={Info}
        />
      </div>
    </>
  );
};

export default Debits;
