import { Navigate, useParams } from "react-router-dom";
import Avatar from "../../lib/avatar";
import { ChangeEvent, useRef } from "react";
import { gConfig } from "../../config";
import { Accordion } from "../../lib/accordion";
import Form, { Select } from "../../lib/forms";
import { ucwords } from "../../lib/utils";
import { UserToggleSwitch } from "../forms/user-toggle-switch";
import {
  useAssignRouteMutation,
  useRoutesQuery,
  useUserQuery,
} from "../aio-urql";
import QueryResult from "../../lib/query-result";

const StaffMgr = () => {
  const { userId } = useParams();
  const { rest, baseUrl, image } = gConfig;
  const avatarUrl = useRef<string | null>();
  if (userId == null) return <Navigate to="/aio/settings/staff" />;

  const [routesRes] = useRoutesQuery();
  const [userRes] = useUserQuery({ variables: { id: userId } });
  const [assignRouteRes, mutation] = useAssignRouteMutation();

  if (
    userRes.error ||
    userRes.fetching ||
    routesRes.error ||
    routesRes.fetching
  ) {
    return <QueryResult response={userRes} />;
  }

  const imageUrl = `${baseUrl}/${rest}/${image}/${userRes.data?.user?.photoUrl}`;
  const updateAvatar = (imgSrc: string) => {
    avatarUrl.current = imgSrc;
  };

  const route_options = routesRes.data?.routes
    ?.map((route) => ({
      key: route?.id,
      value: route?.section,
      slug: route?.slug,
    }))
    .filter((route: { value: any; slug: any }) => route.value && route.slug);

  const fullname = `${userRes.data?.user?.surname} ${userRes.data?.user?.firstname} ${userRes.data?.user?.lastname}`;
  return (
    <div className="overflow-x-auto">
      <div className="max-w-4xl flex items-center h-auto flex-wrap mx-auto mt-5">
        <div
          id="profile"
          className="w-full rounded-lg shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div className="p-4 md:p-12 text-center">
            <Avatar
              updateAvatar={updateAvatar}
              avatarUrl={avatarUrl}
              imageUrl={imageUrl}
            />
            <h1 className="text-3xl font-bold pt-8 lg:pt-0">
              {ucwords(fullname)}
            </h1>
            <div className="mx-auto lg:mx-0 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <svg
                className="h-4 fill-current text-green-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
              </svg>
              What you do: Westbrook Staff
            </p>
            <div className="mx-auto lg:mx-0 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <div className="text-2xl">
              <strong>Section</strong>
            </div>
            <Accordion
              className="mb-2 rounded-md bg-slate-100"
              msg={userRes.data?.user?.route?.section || ""}
              title="Section"
            >
              <div className="px-3 py-1 flex flex-col">
                <div className="flex justify-between p-2">
                  <div>Post to section:</div>
                  <Form defaultValues={{ role: userRes.data?.user?.route?.id }}>
                    <Select
                      options={route_options}
                      name="role"
                      fetching={assignRouteRes.fetching}
                      className="block bg-white text-[17px] px-3 w-auto rounded-md border border-gray-300 focus:outline-none"
                      not_input={1}
                      onChange={async (e: ChangeEvent) => {
                        const option =
                          route_options &&
                          route_options[
                            (e.currentTarget as HTMLSelectElement)
                              .selectedIndex - 1
                          ];
                        await mutation({
                          user: {
                            id: userRes.data?.user?.id || "",
                            routeId: option?.key,
                          },
                        });
                      }}
                    />
                  </Form>
                </div>
              </div>
            </Accordion>
            <div className="mx-auto lg:mx-0 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <div className="text-2xl">
              <strong>Permissions</strong>
            </div>
            <div className="flex justify-evenly flex-wrap">
              {routesRes.data?.routes?.map((route) => {
                return (
                  <Accordion
                    active={userRes.data?.user?.routeSlugs?.includes(
                      route?.slug || ""
                    )}
                    title={`(${route?.slug}) ${ucwords(route?.section || "")}`}
                    key={route?.id}
                    className="accordion-duo mb-2 rounded-md bg-slate-100"
                  >
                    <div className="px-3 flex flex-col">
                      <div className="flex justify-between p-2">
                        <div>Allow</div>
                        <Form defaultValues={{}}>
                          <UserToggleSwitch
                            user={userRes.data?.user}
                            id={route?.id || ""}
                            value={route?.slug || ""}
                            status={userRes.data?.user?.routeSlugs?.includes(
                              route?.slug || ""
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
    </div>
  );
};

export default StaffMgr;
