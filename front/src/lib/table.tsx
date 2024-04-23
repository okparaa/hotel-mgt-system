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
  Searche?: JSX.Element;
  tOrder?: JSX.Element;
};

export const Table = ({
  fetching,
  tHead,
  remove,
  tBody,
  tOrder,
  open = false,
  onClose = () => null,
  deleting = false,
  Searche,
}: TableProps) => {
  if (fetching) return <Loading />;

  return (
    <>
      <table className="btab">
        <caption className="uppercase">{Searche ? Searche : <></>}</caption>
        <thead>{tHead}</thead>
        <tbody>
          {tBody}
          {tOrder}
        </tbody>
      </table>
      <Modal loading={deleting} onClose={onClose} action={remove} isOpen={open}>
        Are you sure?
      </Modal>
    </>
  );
};
