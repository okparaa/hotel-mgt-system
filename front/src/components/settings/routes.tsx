import { useRef, useState } from "react";
import { FormRef } from "../../lib/forms";
import { useMutation, useQuery } from "@apollo/client";
import { errorHandler, updateFxn } from "../../lib/utils";
import { SEARCH } from "../queries/locals";
import FormModal from "../../lib/form-modal";
import { Table } from "../../lib/table";
import { Search } from "../../lib/search";
import { NewRouteMutation, Route } from "../../__generated__/graphql";
import { store as routeStore } from "../../lib/client";
import {
  CREATE_ROUTE,
  DEL_ROUTE,
  EDIT_ROUTE,
  GET_ROUTES,
} from "../queries/routes-queries";
import { TRouteBody } from "./partials/t-route-body";
import RoutesForm from "../forms/route-form";
import Pagination from "../../lib/pagination";

const Ruotes = () => {
  const [open, setOpen] = useState(false); //for edit and new modal
  const [openDel, setOpenDel] = useState(false); //for delete modal
  const formRef = useRef<FormRef>(null);
  const [newRoute, { loading: creating }] = useMutation<NewRouteMutation>(
    CREATE_ROUTE,
    {
      onError: (error) => {
        errorHandler(error, formRef.current);
      },

      update: (cache, { data }) => {
        formRef.current?.reset();
        setOpen(false);
        cache.updateQuery({ query: GET_ROUTES }, ({ routes }: any) => ({
          routes: [data?.newRoute, ...routes],
        }));
      },
    }
  );

  const { data: { routes } = {}, loading } = useQuery(GET_ROUTES);

  const deleteRoute = (route: Route) => {
    routeStore({ name: route.name, id: route.id });
    setOpenDel(true);
  };
  const editRoute = (route: Route) => {
    routeStore({ route });
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

  const {
    data: { search },
  } = useQuery(SEARCH);

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
  const pageRoutes = routes?.slice(startIndex, endIndex);
  const searchRoute = routes?.filter((route: any) => {
    const str = Object.values(route).join(" ").toLowerCase();
    return str.includes(searche.toLowerCase());
  });

  const searchRoutes = !!searche ? searchRoute : pageRoutes;

  const totalItems = !searche ? routes?.length || 0 : searchRoute?.length || 0;

  const tBody = (
    <TRouteBody
      searchRoutes={searchRoutes}
      editRoute={editRoute}
      deleteRoute={deleteRoute}
    />
  );

  const [eRoute, { loading: updating }] = useMutation(EDIT_ROUTE, {
    onError: (error) => {
      errorHandler(error, formRef.current);
    },
    update: (cache, { data: eData }) => {
      setOpen(false);
      cache.updateQuery({ query: GET_ROUTES }, ({ routes }: any) => ({
        routes: updateFxn(routes, eData?.eRoute),
      }));
    },
  });

  const [dRoute, { loading: deleting }] = useMutation(DEL_ROUTE, {
    update: (cache, { data: { dRoute } }: any) => {
      cache.updateQuery({ query: GET_ROUTES }, ({ routes }: any) => ({
        routes: routes.filter((route: any) => route.id !== dRoute.id),
      }));
    },
  });

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
          loading={creating || updating}
          newRoute={newRoute}
          eRoute={eRoute}
          ref={formRef}
          defaultValues={defaultValues}
        />
      </FormModal>
      {routes && (
        <div className="my-2 mr-2 overflow-x-auto">
          <Table
            Searche={<Search onOpen={() => setOpen(true)} />}
            tHead={tHead}
            tBody={tBody}
            loading={loading}
            deleting={deleting}
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
