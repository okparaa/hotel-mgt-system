import { Pencil, Trash2 } from "lucide-react";
import { store as sectionStore } from "../../../lib/client";
import { Fragment } from "react";

type TSectionBodyProps = {
  searchSections?: any[];
  editSection: ({ variables }: any) => void;
  deleteSection: ({ variables }: any) => void;
};

export const TSectionBody = ({
  searchSections,
  editSection,
  deleteSection,
}: TSectionBodyProps) => {
  return (
    <Fragment>
      {searchSections?.map((section: any) => (
        <tr key={section.id} className="bg-tr">
          <td>{section.name}</td>
          <td>{section.description}</td>
          <td className="text-center">
            {section.isSxn ? "revenue pt" : "service pt"}
          </td>
          <td className="text-right !px-0">
            <span
              className="icon-span"
              onClick={() => {
                sectionStore({ neu: false });
                editSection(section);
              }}
            >
              <Pencil size={20} className="ikon" />
            </span>
          </td>
          <td className="text-center !px-0">
            <span
              id={section.id}
              className="icon-span"
              onClick={() => deleteSection(section)}
            >
              <Trash2 size={20} className="ikon" />
            </span>
          </td>
        </tr>
      ))}
    </Fragment>
  );
};
