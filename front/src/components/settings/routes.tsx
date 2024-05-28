import { useRef, useState } from "react";
import { FormRef } from "../../lib/forms";
import FormModal from "../../lib/form-modal";
import { Table } from "../../lib/table";

import { RouteBody } from "./routes/route-body";
import RoutesForm from "../forms/route-form";
import Pagination from "../../lib/pagination";
import { Search } from "../../lib/search";
import { useChest } from "../../app-chest";
import {
  useRoutesQuery,
  Route,
  useCreateRouteMutation,
  useUpdateRouteMutation,
  useRemoveRouteMutation,
} from "../aio-urql";
import QueryResult from "../../lib/query-result";

const Ruotes = () => {
  const [open, setOpen] = useState(false); //for edit and new modal
  const [openDel, setOpenDel] = useState(false); //for delete modal
  const formRef = useRef<FormRef>(null);
  const [routesRes] = useRoutesQuery();

  if (routesRes.error || routesRes.fetching) {
    return <QueryResult response={routesRes} />;
  }

  const [createRouteRes, createRoute] = useCreateRouteMutation();

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

  const pageRoutes = routesRes.data?.routes?.slice(startIndex, endIndex);

  const searchRoute = routesRes.data?.routes?.filter((route) => {
    const str = route && Object.values(route).join(" ").toLowerCase();
    return str && str.includes(search.toLowerCase());
  });

  const searchRoutes = !!search ? searchRoute : pageRoutes;

  const totalItems = !search
    ? routesRes.data?.routes?.length || 0
    : searchRoute?.length || 0;

  const tBody = (
    <RouteBody
      searchRoutes={searchRoutes}
      editRoute={editRoute}
      deleteRoute={deleteRoute}
    />
  );

  const [updateRouteRes, updateRoute] = useUpdateRouteMutation();

  const [removeRouteRes, removeRoute] = useRemoveRouteMutation();

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
          fetching={createRouteRes.fetching || updateRouteRes.fetching}
          createRoute={createRoute}
          updateRoute={updateRoute}
          closeModal={() => setOpen(false)}
          ref={formRef}
          defaultValues={defaultValues}
        />
      </FormModal>
      {routesRes.data?.routes && (
        <div className="my-2 mr-2 overflow-x-auto">
          <Table
            Search={<Search onOpen={() => setOpen(true)} />}
            tHead={tHead}
            tBody={tBody}
            fetching={routesRes.fetching}
            deleting={removeRouteRes.fetching}
            remove={removeRoute}
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
