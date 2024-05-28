import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../lib/navbar";
import SideColBar from "../lib/sidebar";
import { useChest } from "../app-chest";

const Port = () => {
  const {
    data: { session },
  } = useChest();
  if (session.auth !== "ok") {
    return <Navigate to="/users/login" replace={true} />;
  }

  return (
    <div className="w-11/12 h-[100vh] mx-auto bg-gray-50">
      <div className="mr-2">
        <Navbar />
      </div>
      <SideColBar />
      <div className="ml-[90px] mr-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Port;
