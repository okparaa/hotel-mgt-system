import { useRef, useState } from "react";
import { FormRef } from "../../lib/forms";
import {
  CREATE_SECTION,
  DEL_SECTION,
  EDIT_SECTION,
  GET_SECTIONS,
} from "../queries/sections-queries";
import { useMutation, useQuery } from "@apollo/client";
import { errorHandler, updateFxn } from "../../lib/utils";
import { SEARCH } from "../queries/locals";
import FormModal from "../../lib/form-modal";
import { Table } from "../../lib/table";
import { Search } from "../../lib/search";
import SectionsForm from "../forms/sections-form";
import { NewSectionMutation, Section } from "../../__generated__/graphql";
import { store as sectionStore } from "../../lib/client";
import { TSectionBody } from "./partials/t-section-body";

const Sections = () => {
  const [open, setOpen] = useState(false); //for edit and new modal
  const [openDel, setOpenDel] = useState(false); //for delete modal
  const formRef = useRef<FormRef>(null);
  const [newSection, { loading: creating }] = useMutation<NewSectionMutation>(
    CREATE_SECTION,
    {
      onError: (error) => {
        setOpen(false);
        errorHandler(error, formRef.current);
      },

      update: (cache, { data }) => {
        formRef.current?.reset();
        setOpen(false);
        cache.updateQuery({ query: GET_SECTIONS }, ({ sections }: any) => ({
          sections: [data?.newSection, ...sections],
        }));
      },
    }
  );

  const { data: { sections } = {}, loading } = useQuery(GET_SECTIONS);

  const deleteSection = (section: Section) => {
    sectionStore({ name: section.name, id: section.id });
    setOpenDel(true);
  };
  const editSection = (section: Section) => {
    sectionStore({ section });
    setOpen(true);
  };

  const tHead = (
    <tr>
      <th className="w-auto">Name</th>
      <th>Desc</th>
      <th className="!text-center">STATUS</th>
      <th colSpan={2} className="!text-center w-32">
        <span>Action</span>
      </th>
    </tr>
  );

  const {
    data: { search },
  } = useQuery(SEARCH);

  const searchSections = sections?.filter((item: any) => {
    const str = Object.values(item).join(" ").toLowerCase();
    const searche = search || "";
    return str.includes(searche.toLowerCase());
  });

  const tBody = (
    <TSectionBody
      searchSections={searchSections}
      editSection={editSection}
      deleteSection={deleteSection}
    />
  );

  const [eSection, { loading: updating }] = useMutation(EDIT_SECTION, {
    onError: (error) => {
      errorHandler(error, formRef.current);
    },
    update: (cache, { data: eData }) => {
      setOpen(false);
      cache.updateQuery({ query: GET_SECTIONS }, ({ sections }: any) => ({
        sections: updateFxn(sections, eData?.eSection),
      }));
    },
  });

  const [dSection, { loading: deleting }] = useMutation(DEL_SECTION, {
    update: (cache, { data: { dSection } }: any) => {
      cache.updateQuery({ query: GET_SECTIONS }, ({ sections }: any) => ({
        sections: sections.filter((section: any) => section.id !== dSection.id),
      }));
    },
  });

  const defaultValues = {
    name: "",
    description: "",
    isSxn: true,
    slug: "",
  };

  return (
    <>
      <FormModal
        isOpen={open}
        onClose={() => setOpen(false)}
        className="w-8/12 p-4 rounded-xl shadow-xl backdrop:bg-gray-800 backdrop:bg-opacity-45"
      >
        <SectionsForm
          loading={creating || updating}
          newSection={newSection}
          eSection={eSection}
          ref={formRef}
          defaultValues={defaultValues}
        />
      </FormModal>
      {sections && (
        <div className="my-2 mr-2 overflow-x-auto">
          <Table
            Searche={<Search onOpen={() => setOpen(true)} />}
            tHead={tHead}
            tBody={tBody}
            loading={loading}
            deleting={deleting}
            remove={dSection}
            open={openDel}
            onClose={() => setOpenDel(false)}
          />
        </div>
      )}
    </>
  );
};

export default Sections;
