import { JSX } from "react";
import Loading from "./loading";
import Modal from "./modal";

type TableProps = {
  fetching?: boolean;
  deleting?: boolean;
  remove?: ({ variables }: any) => Promise<any>;
  tHead: JSX.Element;
  tBody: JSX.Element;
  open?: boolean;
  onClose?: () => void;
  className?: string;
  Search?: JSX.Element;
  Info?: JSX.Element;
};

export const Table = ({
  fetching,
  tHead,
  remove,
  tBody,
  open = false,
  onClose = () => null,
  deleting = false,
  Search,
  className,
  Info,
}: TableProps) => {
  if (fetching) return <Loading />;
  return (
    <>
      <table className={`btab ${className}`}>
        <caption className="uppercase">
          {Search ? Search : <></>}
          {Info ? Info : <></>}
        </caption>
        <thead>{tHead}</thead>
        <tbody>{tBody}</tbody>
      </table>
      <Modal loading={deleting} onClose={onClose} action={remove} isOpen={open}>
        Are you sure?
      </Modal>
    </>
  );
};
