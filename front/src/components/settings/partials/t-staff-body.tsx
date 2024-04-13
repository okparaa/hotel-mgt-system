import { Link } from "react-router-dom";
import { addInput, toCommas } from "../../../lib/utils";
import { Fragment } from "react";
type TItemBodyProps = {
  currInventories?: any[];
  searchItems?: any[];
  editItem: ({ variables }: any) => void;
};
export const TStaffBody = ({ searchItems, editItem }: TItemBodyProps) => {
  return (
    <Fragment>
      {searchItems?.map((user: any) => (
        <tr key={user.id} className="bg-tr">
          <td>
            <Link
              to={`/aio/settings/pro-mgr/${user.id}`}
              className="text-fuchsia-800"
            >
              {user.surname}, {user.firstname} {user.lastname[0]}.
            </Link>
          </td>
          <td className="hidden lg:table-cell">{user.phone}</td>
          <td className="truncate !lowercase hidden xl:table-cell">
            {user.username}
          </td>
          <td>
            <span
              className="bwks bwk cursor-text border-gray-400 flex h-8 m-auto justify-start items-center rounded-md"
              onClick={(e) =>
                addInput(e, (value) => {
                  editItem({
                    variables: {
                      id: user.id,
                      salary: value,
                    },
                  });
                })
              }
            >
              {toCommas(user.salary)}
            </span>
          </td>
          <td>{user.section && user.section.name}</td>
        </tr>
      ))}
    </Fragment>
  );
};
