import { forwardRef } from "react";
import Form, {
  Button,
  Checkbox,
  Hidden,
  Input,
  Textarea,
} from "../../lib/forms";
import { Image } from "../../lib/image";
import revenues from "../../images/revenues.jpg";
import { useChest } from "../../app-chest";
import { useSectionQuery } from "../aio-urql";

type RoutesFormProps = {
  newSection: ({ variables }: any) => Promise<any>;
  fetching: boolean;
  defaultValues: any;
  eSection: ({ variables }: any) => Promise<any>;
};

const SectionsForm = forwardRef(
  (
    { newSection, fetching, defaultValues, eSection }: RoutesFormProps,
    ref: any
  ) => {
    const {
      data: { store },
    } = useChest();

    const neu = store.neu;

    if (store.id && store.__typename === "Section") {
      const [sectionRes] = useSectionQuery({ variables: { id: store.id } });
      defaultValues = sectionRes.data?.section;
    }

    return (
      <div className="flex divide-x">
        <div className="flex flex-1 flex-col p-4 justify-center gap-8">
          <p className="text-xl font-semibold text-left">
            Sections are the various places in your organisation where revenues
            are generated. They usually appear in the daily sales analysis.
          </p>
          <div className="flex justify-center items-center">
            <Image
              src={revenues}
              alt="keyboard"
              className="p-1 rounded-tl-3xl rounded-br-3xl -rotate-6 w-10/12 border-blue-200 border-4"
            />
          </div>
        </div>
        <div className="p-4 flex flex-col flex-1 text-left">
          <p className="font-bold text-xl pb-4">Create Section</p>
          <Form
            ref={ref}
            defaultValues={defaultValues}
            onSubmit={async (data: any) => {
              try {
                if (store.id && store.__typename === "Section") {
                  await eSection({
                    section: {
                      id: data.id,
                      name: data.name,
                      description: data.description,
                      slug: data.slug,
                      isSxn: data.isSxn,
                    },
                  });
                } else {
                  await newSection({
                    section: {
                      name: data.name,
                      description: data.description,
                      slug: data.slug,
                      isSxn: data.isSxn,
                    },
                  });
                }
              } catch (error) {}
            }}
          >
            {!neu ? <Hidden name="id" /> : <></>}
            <Input
              req_msg="required"
              name="name"
              placeholder="Section name"
              size="w-10/12"
            />
            <Input
              req_msg="required"
              name="slug"
              placeholder="3 letter name"
              size="w-6/12"
              regx_msg="use 3 letters"
              regx="^\w{3}$"
            />
            <Textarea
              req_msg="required"
              name="description"
              placeholder="Describe the section"
            />
            <Checkbox
              name="isSxn"
              options={[{ key: 1, value: "Rev Pt?" }]}
              value="yes"
              className="mr-2"
              legend="Section?"
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
export default SectionsForm;
