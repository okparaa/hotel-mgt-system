import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../lib/navbar";
import { useQuery } from "@apollo/client";
import { SESSION } from "./queries/locals";
import SideColBar from "../lib/sidebar";
import Loading from "../lib/loading";
import { GET_ROUTES } from "./queries/routes-queries";

const Port = () => {
  const {
    data: { session },
  } = useQuery(SESSION);
  const { data, loading } = useQuery(GET_ROUTES);
  if (loading || !data) return <Loading />;
  if (session.auth !== "ok") {
    return <Navigate to="/users/login" />;
  }
  return (
    <div className="w-10/12 mx-auto bg-gray-50">
      <Navbar />
      <SideColBar />
      <div className="ml-[90px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Port;
