import { useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import Loading from "../../lib/loading";
import { Accordion } from "../../lib/accordion";
import Form from "../../lib/forms";
import { ucwords } from "../../lib/utils";
import { RouteToggleSwitch } from "../forms/route-toggle-switch";
import { GET_ROUTE, GET_ROUTES } from "../queries/routes-queries";
import { gConfig } from "../../config";

const RouteMgr = () => {
  const { routeId: ruteId } = useParams();
  if (ruteId == null) return <Navigate to="/aio/settings/routes" />;
  const { data: routeData, loading: routeLoading } = useQuery(GET_ROUTE, {
    variables: {
      id: ruteId,
    },
  });
  const { data: routesData } = useQuery(GET_ROUTES);
  const { rest, baseUrl, image } = gConfig;
  // const [eRoute, { loading: loadingSection }] = useMutation(EDIT_ROUTE);
  if (routeLoading || !routeData || !routesData) return <Loading />;
  const { route: rute } = routeData;
  const { routes } = routesData;

  console.log(rute?.otherSlugs);

  const imageUrl = `${baseUrl}/${rest}/${image}/route.jpg`;

  // const section_options = routes?.map((route) => ({
  //   key: route?.id,
  //   value: route?.section,
  // }));

  return (
    <div className="overflow-x-auto">
      <div className="max-w-4xl flex items-center h-auto flex-wrap mx-auto mt-5">
        <div
          id="profile"
          className="w-full rounded-lg shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div className="p-4 pt-1 text-center flex flex-col">
            <img
              className="self-center rounded-2xl w-48"
              alt="route"
              src={imageUrl}
            />
            <h1 className="text-2xl font-bold pt-4 lg:pt-0">-{rute?.name}-</h1>
            <div className="mx-auto lg:mx-0 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <svg
                className="h-4 fill-current text-green-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
              </svg>
              What I do: Represent places here
            </p>
            <div className="mx-auto lg:mx-0 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <div className="text-2xl">
              <strong>Users Permissions</strong>
            </div>

            {routes?.map((route) => {
              return !route?.slug ? null : (
                <Accordion
                  active={rute?.otherSlugs?.includes(route?.slug || "@")}
                  title={`(${route?.slug}) ${ucwords(route?.section || "")}`}
                  key={route?.id}
                >
                  <div className="px-3 flex flex-col">
                    <div className="flex justify-between p-2">
                      <div>Allow: Execute sales</div>
                      <Form>
                        <RouteToggleSwitch
                          key={route?.id}
                          route={rute}
                          id={route!.id}
                          slug={route?.slug || ""}
                          status={rute?.otherSlugs?.includes(
                            route?.slug || "@"
                          )}
                        />
                      </Form>
                    </div>
                  </div>
                </Accordion>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteMgr;
