import { Pencil, Trash2 } from "lucide-react";
import { store as routeStore } from "../../../lib/client";
import { Link } from "react-router-dom";
import { Fragment } from "react";

type TSectionBodyProps = {
  searchRoutes?: any[];
  editRoute: ({ variables }: any) => void;
  deleteRoute: ({ variables }: any) => void;
};

export const TRouteBody = ({
  searchRoutes,
  editRoute,
  deleteRoute,
}: TSectionBodyProps) => {
  return (
    <Fragment>
      {searchRoutes?.map((route: any) => (
        <tr key={route.id} className="bg-tr">
          <td>
            <Link
              to={`/aio/settings/route-mgr/${route.id}`}
              className="text-fuchsia-800"
            >
              {route.name}
            </Link>
          </td>
          <td className="truncate">{route.description}</td>
          <td>{route.section}</td>
          <td>{route.slug}</td>
          <td className="text-right !px-0">
            <span
              className="icon-span"
              onClick={() => {
                routeStore({ neu: false });
                editRoute(route);
              }}
            >
              <Pencil size={20} className="ikon" />
            </span>
          </td>
          <td className="text-center !px-0">
            <span
              id={route.id}
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
