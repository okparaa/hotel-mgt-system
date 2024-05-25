import { Loader2 } from "lucide-react";
import { useChest } from "../../../app-chest";
import { gConfig } from "../../../config";
import { addInput, getDateFromTimestamp, toCommas } from "../../../lib/utils";
import { UsersQuery, useDebitStaffMutation } from "../../aio-urql";
type TDebitBodyProps = {
  searchUsers: UsersQuery["users"];
  onOpen: () => void;
};
export const TDebitBody = ({ searchUsers, onOpen }: TDebitBodyProps) => {
  const {
    data: { store, row },
    updateChest,
  } = useChest();
  const [debitStaffRes, debitStaff] = useDebitStaffMutation();
  return (
    <>
      {searchUsers?.map((user) => {
        const debits =
          user?.recoveries?.reduce((total, dbt) => {
            return dbt?.deleted ? total : total + dbt?.debitAmt!;
          }, 0) || 0;
        return (
          <tr className="">
            <td className="bg-gradient-to-r from-slate-400 via-slate-50 to-slate-50">
              <div className="flex items-center">
                <img
                  src={`${gConfig.baseUrl}/${gConfig.rest}/img/${user?.photoUrl}`}
                  alt=""
                  className="rounded-l-full w-20"
                />

                <div className="flex flex-col pl-2">
                  <span>
                    {user?.surname} {user?.firstname}
                  </span>
                  <span>{user?.phone}</span>
                  <span className="naira">{toCommas(user?.salary)}</span>
                </div>
              </div>
            </td>
            <td>
              <div className="flex justify-center flex-wrap gap-2">
                {user?.recoveries?.map((debt) => {
                  if (debt?.deleted) return null;
                  return (
                    <span
                      onClick={() => {
                        updateChest({
                          data: {
                            id: debt?.id,
                            value: debt?.debitAmt!,
                            staffId: user.id,
                            prevDate: getDateFromTimestamp(
                              new Date().toDateString()
                            ),
                            __typename: "Recovery",
                          },
                          type: "debit",
                        });
                        onOpen();
                      }}
                      className="naira link cursor-pointer !py-0 bg-slate-200 flex"
                    >
                      {toCommas(debt?.debitAmt)}
                    </span>
                  );
                })}
              </div>
            </td>
            <td>
              <div
                className="naira border-y-2 pl-1 w-16 flex items-center h-7 rounded-md cursor-text text-base"
                onClick={(e) => {
                  addInput(e, async (value) => {
                    updateChest({
                      data: { id: user?.id, __typename: "User" },
                      type: "row",
                    });
                    await debitStaff({
                      debit: {
                        debitAmt: value,
                        orderId: store.id,
                        staffId: user?.id,
                      },
                    });
                  });
                }}
              >
                {debitStaffRes.fetching && row.id === user?.id && (
                  <Loader2 className="animate-spin mx-auto" />
                )}
              </div>
            </td>
            <td>
              <span className="naira text-base">
                {toCommas((user?.salary || 0) - debits)}
              </span>
            </td>
          </tr>
        );
      })}
    </>
  );
};
