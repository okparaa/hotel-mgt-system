import { ReactNode } from "preact/compat";
import { Link } from "react-router-dom";
import { useChest } from "../app-chest";
import { RoutesQuery } from "../components/aio-urql";

type LynkProps = {
  children: ReactNode;
  className: string;
  to: string;
  routes: RoutesQuery["routes"];
};

export const Lynk = ({ routes, children, to, className }: LynkProps) => {
  const {
    data: { user },
  } = useChest();

  const rute = routes?.filter((route: any) => {
    if (to === route.name && route.route && route.route.slug == "all") {
      return true;
    } else if (to === route.name && user.slg.includes(route.slug)) {
      return true;
    } else if (
      to === route.name &&
      user.slg.split(".").some((slg: any) => route.otherSlugs.includes(slg))
    ) {
      return true;
    } else if (
      to === route.name &&
      route.route &&
      user.rut === route.route.slug
    ) {
      return true;
    } else if (to === route.name && user.rut === route.slug) {
      return true;
    } else if (to === route.name && user.rut === "all") {
      return true;
    } else if (to === route.name && route.otherSlugs.includes(user.rut)) {
      return true;
    }
    return false;
  });

  if (rute && rute.length < 1) return <></>;

  return (
    <Link className={className} to={`/${to}`}>
      {children}
    </Link>
  );
};
