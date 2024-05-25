import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  LogInIcon,
  Menu,
  PencilRulerIcon,
  Power,
} from "lucide-react";
import { Image } from "./image";
import logo from "../images/logo.png";
import { useChest } from "../app-chest";
import { storage } from "../client";

const Navbar = () => {
  const {
    data: { session },
    updateChest,
  } = useChest();

  const navigate = useNavigate();
  const signOut = async (e: MouseEvent) => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    await storage.clear();
    const sess = { id: "", auth: "", vfy: "", iat: "", exp: "" };
    updateChest({ type: "session", data: sess });
    const usr = {
      id: "",
      sur: "",
      fir: "",
      las: "",
      pic: "",
      usr: "",
      slg: "",
      rut: "",
    };
    updateChest({ type: "user", data: usr });
    navigate("/");
  };
  return (
    <nav className="relative w-full py-4 px-5">
      {session.auth !== "ok" && (
        <span className=" w-12 absolute top-1">
          <Image src={logo} alt="logo" />
        </span>
      )}
      <div className="flex justify-end items-center">
        <div className="text-blue-100 flex-row menu hidden md:block">
          <Link to={session.auth === "ok" ? "/aio" : "/"}>
            <HomeIcon className="w-5 inline-block" /> Home
          </Link>
          <Link to="/services">
            <PencilRulerIcon className="w-5 inline-block" /> Services
          </Link>
          {session.auth !== "" ? (
            <Link onClick={signOut} to="/" className="w-28 inline-block">
              <Power className="w-5 inline-block mb-0 p-0" /> Logout
            </Link>
          ) : (
            <Link to="/users/login" className="w-28">
              <LogInIcon className="w-5 inline-block p-0" /> Login
            </Link>
          )}
        </div>
        <div className="md:hidden">
          <Menu size={25} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
