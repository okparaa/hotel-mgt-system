import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useChest } from "../../../app-chest";
import { RoutesQuery } from "../../aio-urql";

type TSectionBodyProps = {
  searchRoutes?: RoutesQuery["routes"];
  editRoute: ({ variables }: any) => void;
  deleteRoute: ({ variables }: any) => void;
};

export const RouteBody = ({
  searchRoutes,
  editRoute,
  deleteRoute,
}: TSectionBodyProps) => {
  const { updateChest } = useChest();
  return (
    <Fragment>
      {searchRoutes?.map((route) => (
        <tr key={route?.id} className="bg-tr">
          <td>
            <Link
              to={`/aio/settings/route-mgr/${route?.id}`}
              className="text-fuchsia-800"
            >
              {route?.name}
            </Link>
          </td>
          <td className="truncate">{route?.description}</td>
          <td>{route?.section}</td>
          <td>{route?.slug}</td>
          <td className="text-right !px-0">
            <span
              className="icon-span"
              onClick={() => {
                updateChest({ type: "store", data: { neu: false } });
                editRoute(route);
              }}
            >
              <Pencil size={20} className="ikon" />
            </span>
          </td>
          <td className="text-center !px-0">
            <span
              id={route?.id}
              className="icon-span"
              onClick={() => deleteRoute(route)}
            >
              <Trash2 size={20} className="ikon" />
            </span>
          </td>
        </tr>
      ))}
    </Fragment>
  );
};
