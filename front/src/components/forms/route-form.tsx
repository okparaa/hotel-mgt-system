import { forwardRef } from "react";
import Form, {
  Button,
  Checkbox,
  Hidden,
  Input,
  Textarea,
} from "../../lib/forms";
import { Image } from "../../lib/image";
import routepng from "../../images/routes.png";
import { useChest } from "../../app-chest";
import { useRouteQuery } from "../aio-urql";

type RoutesFormProps = {
  createRoute: ({ variables }: any) => Promise<any>;
  fetching: boolean;
  defaultValues: any;
  updateRoute: ({ variables }: any) => Promise<any>;
  closeModal: () => void;
};

const RoutesForm = forwardRef(
  (
    {
      createRoute,
      fetching,
      defaultValues,
      updateRoute,
      closeModal,
    }: RoutesFormProps,
    ref: any
  ) => {
    const {
      data: { store },
    } = useChest();

    if (store.id && store.__typename === "Route" && !store.neu) {
      const [routeRes] = useRouteQuery({ variables: { id: store.id } });
      defaultValues = routeRes?.data?.route;
    }

    return (
      <div className="flex divide-x">
        <div className="flex flex-1 flex-col p-4 justify-center gap-8">
          <p className="text-xl font-semibold text-left">
            Routes are the various places in this application where staff
            interact with the system. They may or may not appear in the daily
            sales analysis.
          </p>
          <div className="flex justify-center items-center">
            <Image
              src={routepng}
              alt="keyboard"
              className="p-1 rounded-tl-3xl rounded-br-3xl -rotate-6 w-10/12 border-blue-200 border-4"
            />
          </div>
        </div>
        <div className="p-4 flex flex-col flex-1 text-left">
          <p className="font-bold text-xl pb-4">Create Route</p>
          <Form
            ref={ref}
            defaultValues={defaultValues}
            onSubmit={async (data: any) => {
              try {
                if (store.id && store.__typename === "Route" && !store.neu) {
                  await updateRoute({
                    route: {
                      id: data.id,
                      name: data.name,
                      description: data.description,
                      section: data.section,
                      slug: data.slug,
                      isSxn: data.isSxn,
                    },
                  });
                  closeModal();
                } else {
                  await createRoute({
                    route: {
                      name: data.name,
                      description: data.description,
                      section: data.section,
                      slug: data.slug,
                      isSxn: data.isSxn,
                    },
                  });
                  closeModal();
                }
              } catch (error) {}
            }}
          >
            {!store.neu ? <Hidden name="id" /> : <></>}
            <Input
              req_msg="required"
              name="name"
              placeholder="Route url"
              size="w-10/12"
            />
            <Input
              req_msg="required"
              name="section"
              placeholder="Section/Dept name"
              size="w-10/12"
            />
            <Input
              req_msg="required"
              name="slug"
              placeholder="3 letter word"
              size="w-6/12"
              regx_msg="use 3 letters"
              regx="^\w{3}$"
            />
            <Textarea
              req_msg="required"
              name="description"
              placeholder="Describe the route"
            />
            <Checkbox
              name="isSxn"
              options={[{ key: 1, value: "Yes" }]}
              className="ml-4"
              legend="Is this a Revenue Point?"
            />
            <div className="btn text-center">
              <Button title="Save" status={fetching} />
            </div>
          </Form>
        </div>
      </div>
    );
  }
);
export default RoutesForm;
