import { useChest } from "../../../app-chest";
import { gConfig } from "../../../config";
import { getDateFromTimestamp, toCommas } from "../../../lib/utils";
import { UsersQuery, useDebitStaffMutation } from "../../aio-urql";
import { AddInput } from "../../../lib/add-input";

type DebitBodyProps = {
  searchUsers: UsersQuery["users"];
  onOpen: () => void;
};
export const DebitBody = ({ searchUsers, onOpen }: DebitBodyProps) => {
  const {
    data: { store },
    updateChest,
  } = useChest();
  const [_debitStaffRes, debitStaff] = useDebitStaffMutation();
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
              <div className="border-y-2 pl-1 flex items-center h-7 rounded-md cursor-text text-base">
                <AddInput
                  id={user?.id!}
                  initialValue=""
                  action={async (value) => {
                    if (Number(value) > 0) {
                      updateChest({
                        data: { id: user?.id, __typename: "User" },
                        type: "row",
                      });

                      await debitStaff({
                        debit: {
                          debitAmt: Number(value),
                          orderId: store.id,
                          staffId: user?.id,
                        },
                      });
                    }
                  }}
                />
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
