import { ChevronRight, X } from "lucide-react";
import { ReactNode } from "react";
import { Image } from "./image";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";

import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  LifeBuoy,
  Power,
  Receipt,
  Settings,
  UserCircle,
} from "lucide-react";
import { gConfig } from "../config";
import { useChest } from "../app-chest";

type SidebarProps = {
  children: ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  const {
    data: { user, store },
    updateChest,
  } = useChest();

  const open = store.open;

  return (
    <aside className="h-screen fixed z-10 top-0">
      <nav className="h-full flex flex-col bg-gray-50 border-r shadow-sm">
        <div className="px-5 h-10 mt-4 flex justify-between items-center">
          <Image
            className={`overflow-hidden ${open ? "h-8" : "w-0"}`}
            src={logo}
            alt="logo"
          />
          <button
            className="rounded-lg p-1 bg-gray-50 hover:bg-gray-100"
            onClick={() => {
              updateChest({ type: "store", data: { open: !open } });
            }}
          >
            {open ? <X /> : <ChevronRight />}
          </button>
        </div>
        <ul className="px-5 self-center">{children}</ul>
        <div className="border-t flex pt-3 flex-col items-center">
          <Image
            src={`${gConfig.baseUrl}/${gConfig.rest}/img/${user.pic}`}
            className="w-10 h-10 rounded-full text-center"
            width={100}
            height={100}
            alt="."
          />
          <div
            className={`transition-all ${open ? "" : "absolute left-[-999px]"}`}
          >
            <div className="leading-4 text-center flex flex-col">
              <h4 className="font-semibold">{user.sur}</h4>
              <span className="text-xs text-gray-600">
                {user.usr.split("@")[0]}
              </span>
              <span className="text-xs text-gray-600 italic font-bold">
                @{user.usr.split("@")[1]}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

type SidebarItemProps = {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  action?: any;
  href?: string;
};
const SidebarItem = ({
  icon,
  text,
  active,
  alert,
  action,
  href = "",
}: SidebarItemProps) => {
  const {
    data: { store },
    updateChest,
  } = useChest();
  const open = store.open;
  return (
    <li
      onClick={() => {
        updateChest({ type: "store", data: { open: false } });
        typeof action === "function" && action();
      }}
      className={`relative flex items-center bg-white ${
        open ? "pl-[6px]" : "w-8 justify-center"
      } p-1 my-4 font-bold rounded-md cursor-pointer ring-1
      ${active ? "ring-3" : ""}
    `}
    >
      <Link to={href}>{icon}</Link>
      <Link
        to={href}
        className={`overflow-hidden text-sm ${open ? "ml-2 pr-2" : "w-0"}`}
      >
        {text}
      </Link>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            open ? "" : "top-2"
          }`}
        />
      )}
      {!open && (
        <Link
          to={href}
          className={`absolute left-full rounded-md px-2 py-1 ml-3 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </Link>
      )}
    </li>
  );
};

export { Sidebar, SidebarItem };

const SideColBar = () => {
  const size = 23;
  const navigate = useNavigate();
  const signOut = (e: MouseEvent): any => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <Sidebar>
        <SidebarItem
          href="/aio"
          icon={<LayoutDashboard size={size} className="icon" />}
          text="Dashboard"
        />
        <SidebarItem
          href="/aio/stats"
          icon={<BarChart3 size={size} className="icon" />}
          text="Statistics"
        />
        <SidebarItem
          href="/aio/users"
          icon={<UserCircle size={size} className="icon" />}
          text="Users"
        />
        <SidebarItem
          href="/aio/inventory"
          icon={<Boxes size={size} className="icon" />}
          text="Inventory"
        />
        <SidebarItem
          href="/aio/billing"
          icon={<Receipt size={size} className="icon" />}
          text="Billing"
        />
        <hr className="my-3" />
        <SidebarItem
          href="/aio/settings"
          icon={<Settings size={size} className="icon" />}
          text="Settings"
        />
        <SidebarItem
          href="/aio/help"
          icon={<LifeBuoy size={size} className="icon" />}
          text="Help"
        />
        <SidebarItem
          action={signOut}
          icon={<Power size={size} className="icon" />}
          text="Logout"
        />
      </Sidebar>
    </>
  );
};

export default SideColBar;
