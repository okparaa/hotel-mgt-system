import React, { ReactNode, createContext, useContext, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
type SidebarProps = {
  children: ReactNode;
  expanded: boolean;
  setExpanded: Function;
};

const Sidebar = ({ children, expanded, setExpanded }: SidebarProps) => {
  return (
    <aside className="h-screen fixed z-10 top-0">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 h-20 flex justify-between items-center">
          <Image
            className={`overflow-hidden transition-all ${
              expanded ? "w-20" : "w-0"
            }`}
            src="/logo.png"
            width={100}
            height={100}
            alt="logo"
          />
          <button
            onClick={() => setExpanded((curr: boolean) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <X /> : <Menu />}
          </button>
        </div>
        <ul className="flex-1 px-3">{children}</ul>
        <div className="border-t flex p-3">
          <Image
            src="/user_photo.png"
            className="w-10 h-10 rounded-md"
            width={100}
            height={100}
            alt="user"
          />
          <div
            className={`overflow-hidden transition-all ${
              expanded ? "w-32 ml-3" : "absolute left-[-999px]"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

type SidebarItemProps = {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  expanded: boolean;
  setExpanded: Function;
};
const SidebarItem = ({
  icon,
  text,
  active,
  alert,
  expanded,
  setExpanded,
}: SidebarItemProps) => {
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-bold rounded-md cursor-pointer transition-colors group
    ${
      active
        ? "bg-gradient-to-tr from-indigo-200 to-indigo-800"
        : "hover:bg-indigo-50 text-gray-600"
    }
    `}
      onClick={() => setExpanded(false)}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all text-lg ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-3 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
};

export { SidebarItem };
