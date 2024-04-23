import { useRef, useState } from "react";
import { FormRef } from "../../lib/forms";
import FormModal from "../../lib/form-modal";
import { Table } from "../../lib/table";

import { TRouteBody } from "./partials/t-route-body";
import RoutesForm from "../forms/route-form";
import Pagination from "../../lib/pagination";
import { Search } from "../../lib/search";
import { useChest } from "../../state-mgr/app-chest";
import {
  useDelRouteMutation,
  useEditRouteMutation,
  useRoutesQuery,
  useNewRouteMutation,
  Route,
} from "../aio-urql";
import QueryResult from "../../lib/query-result";

const Ruotes = () => {
  const [open, setOpen] = useState(false); //for edit and new modal
  const [openDel, setOpenDel] = useState(false); //for delete modal
  const formRef = useRef<FormRef>(null);
  const [routesRes] = useRoutesQuery();

  if (routesRes.error || routesRes.fetching) {
    return <QueryResult result={routesRes} />;
  }

  const [routeNewRes, newRoute] = useNewRouteMutation();

  const {
    data: { search },
    updateChest,
  } = useChest();

  const deleteRoute = (route: Route) => {
    updateChest({ data: { name: route.name, id: route.id }, type: "store" });
    setOpenDel(true);
  };
  const editRoute = async (route: Route) => {
    updateChest({
      data: {
        id: route.id,
        __typename: "Route",
      },
      type: "store",
    });
    setOpen(true);
  };

  const tHead = (
    <tr>
      <th className="w-3/12">Route</th>
      <th>Desc</th>
      <th className="w-32">Section</th>
      <th className="w-20">Slug</th>
      <th colSpan={2} className="!text-center w-32">
        <span>Action</span>
      </th>
    </tr>
  );

  const itemsPerPage = 10;

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerPage);

  const handlePageChange = (page: number) => {
    const start = (page - 1) * itemsPerPage;
    setStartIndex(start);
    const end = start + itemsPerPage;
    setEndIndex(end);
  };
  const searche = search || "";
  const pageRoutes = routesRes.data?.routes?.slice(startIndex, endIndex);
  const searchRoute = routesRes.data?.routes?.filter((route: any) => {
    const str = Object.values(route).join(" ").toLowerCase();
    return str.includes(searche.toLowerCase());
  });

  const searchRoutes = !!searche ? searchRoute : pageRoutes;

  const totalItems = !searche
    ? routesRes.data?.routes?.length || 0
    : searchRoute?.length || 0;

  const tBody = (
    <TRouteBody
      searchRoutes={searchRoutes}
      editRoute={editRoute}
      deleteRoute={deleteRoute}
    />
  );

  const [routeERes, eRoute] = useEditRouteMutation();

  const [routeDRes, dRoute] = useDelRouteMutation();

  const defaultValues = {
    name: "",
    description: "",
    section: "",
    slug: "",
    isSxn: false,
  };

  return (
    <div>
      <FormModal
        isOpen={open}
        onClose={() => setOpen(false)}
        className="w-8/12 p-4 rounded-xl shadow-xl backdrop:bg-gray-800 backdrop:bg-opacity-45"
      >
        <RoutesForm
          fetching={routeNewRes.fetching || routeERes.fetching}
          newRoute={newRoute}
          eRoute={eRoute}
          closeModal={() => setOpen(false)}
          ref={formRef}
          defaultValues={defaultValues}
        />
      </FormModal>
      {routesRes.data?.routes && (
        <div className="my-2 mr-2 overflow-x-auto">
          <Table
            Searche={<Search onOpen={() => setOpen(true)} />}
            tHead={tHead}
            tBody={tBody}
            fetching={routesRes.fetching}
            deleting={routeDRes.fetching}
            remove={dRoute}
            open={openDel}
            onClose={() => setOpenDel(false)}
          />
        </div>
      )}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Ruotes;
