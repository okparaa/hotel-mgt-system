import { useRef, useState } from "react";
import { FormRef } from "../../lib/forms";
import { errorHandler } from "../../lib/utils";
import FormModal from "../../lib/form-modal";
import { Table } from "../../lib/table";
import { Search } from "../../lib/search";
import SectionsForm from "../forms/sections-form";
import { TSectionBody } from "./partials/t-section-body";
import {
  Section,
  useDSectionMutation,
  useESectionMutation,
  useNewSectionMutation,
  useSectionsQuery,
} from "../aio-urql";
import QueryResult from "../../lib/query-result";
import { useChest } from "../../app-chest";

const Sections = () => {
  const [open, setOpen] = useState(false); //for edit and new modal
  const [openDel, setOpenDel] = useState(false); //for delete modal
  const formRef = useRef<FormRef>(null);
  const [sectionNewRes, newSection] = useNewSectionMutation();

  if (sectionNewRes.error || sectionNewRes.fetching) {
    return <QueryResult result={sectionNewRes} />;
  }

  if (!sectionNewRes.error && sectionNewRes.data) {
    formRef.current?.reset();
    setOpen(false);
  } else if (sectionNewRes.error) {
    setOpen(false);
    errorHandler(sectionNewRes.error, formRef.current);
  }

  const {
    data: { search },
    updateChest,
  } = useChest();

  const [sectionsRes] = useSectionsQuery();

  const deleteSection = (section: Section) => {
    updateChest({
      data: { name: section.name, id: section.id },
      type: "store",
    });
    setOpenDel(true);
  };
  const editSection = (section: Section) => {
    updateChest({
      data: { __typename: "Section", id: section.id },
      type: "store",
    });
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

  const searchSections = sectionsRes.data?.sections?.filter((item: any) => {
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

  const [sectionERes, eSection] = useESectionMutation();

  if (!sectionERes.error && sectionERes.data) {
    formRef.current?.reset();
    setOpen(false);
  } else if (sectionERes.error) {
    setOpen(false);
    errorHandler(sectionERes.error, formRef.current);
  }

  const [sectionDRes, dSection] = useDSectionMutation();

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
          fetching={sectionNewRes.fetching || sectionERes.fetching}
          newSection={newSection}
          eSection={eSection}
          ref={formRef}
          defaultValues={defaultValues}
        />
      </FormModal>
      {sectionsRes?.data?.sections && (
        <div className="my-2 mr-2 overflow-x-auto">
          <Table
            Searche={<Search onOpen={() => setOpen(true)} />}
            tHead={tHead}
            tBody={tBody}
            fetching={sectionsRes.fetching}
            deleting={sectionDRes.fetching}
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
