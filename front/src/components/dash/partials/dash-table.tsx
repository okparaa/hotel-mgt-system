import { JSX } from "react";
import Loading from "../../../lib/loading";

type TableProps = {
  fetching?: boolean;
  tHead: JSX.Element;
  tBody: JSX.Element;
  tOrder?: JSX.Element;
};

export const DashTable = ({ fetching, tHead, tBody, tOrder }: TableProps) => {
  if (fetching) return <Loading />;

  return (
    <>
      {/* <caption className="uppercase">{Searche ? Searche : <></>}</caption> */}
      {tHead}
      {tBody}
      {tOrder}
    </>
  );
};
