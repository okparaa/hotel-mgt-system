import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../lib/navbar";
import SideColBar from "../lib/sidebar";
import { useChest } from "../state-mgr/app-chest";

const Port = () => {
  const {
    data: { session },
  } = useChest();
  if (session.auth !== "ok") {
    return <Navigate to="/users/login" replace={true} />;
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
