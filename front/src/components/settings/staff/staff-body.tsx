import { Link } from "react-router-dom";
import { Fragment } from "react";
import { AddInput } from "../../../lib/add-input";
import { UsersQuery } from "../../aio-urql";
type StaffBodyProps = {
  currInventories?: any[];
  searchItems?: UsersQuery["users"];
  editItem: ({ variables }: any) => void;
};
export const StaffBody = ({ searchItems, editItem }: StaffBodyProps) => {
  return (
    <Fragment>
      {searchItems?.map((user) => (
        <tr key={user?.id} className="bg-tr">
          <td>
            <Link
              to={`/aio/settings/staff-mgr/${user?.id}`}
              className="text-fuchsia-800"
            >
              {user?.surname}, {user?.firstname} {user?.lastname?.slice(0, 1)}.
            </Link>
          </td>
          <td className="hidden lg:table-cell">{user?.phone}</td>
          <td className="truncate !lowercase hidden xl:table-cell">
            {user?.username}
          </td>
          <td>
            <span className="pl-1 w-32 cursor-text border-slate-300 flex h-8 justify-start items-center rounded-sm">
              <AddInput
                id={user?.id as string}
                initialValue={user?.salary as number}
                action={(value) => {
                  editItem({
                    id: user?.id,
                    salary: value,
                  });
                }}
              />
            </span>
          </td>
          <td>{user?.route?.section}</td>
        </tr>
      ))}
    </Fragment>
  );
};
