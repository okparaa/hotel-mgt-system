import { ReactNode } from "preact/compat";
import { useQuery } from "@apollo/client";
import { CUR_USER, ROUTES } from "../components/queries/locals";
import { Link } from "react-router-dom";

type LynkProps = {
  children: ReactNode;
  className: string;
  to: string;
};

export const Lynk = ({ children, to, className }: LynkProps) => {
  const { data } = useQuery(CUR_USER);
  const {
    data: { routes },
  } = useQuery(ROUTES);

  // const rute = routes.filter((route: any) => to == route.name);

  // if (rute.length < 1) return <></>;

  // const ruts = user.rut.split(".");
  console.log(data, routes);

  return (
    <Link className={className} to={`/${to}`}>
      {children}
    </Link>
  );
};
