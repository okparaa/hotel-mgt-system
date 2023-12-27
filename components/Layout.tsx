import Footer from "@/components/Footer";
import React, { useState } from "react";
import { Eczar } from "next/font/google";
import Sidebar, { SidebarItem } from "./Sidebar";
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Power,
  Receipt,
  Settings,
  UserCircle,
} from "lucide-react";
import Navbar from "./Navbar";
const eczar = Eczar({
  subsets: ["latin"],
  weight: "500",
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const size = 23;
  const bodyBg = () => "mx-auto h-full min-h-[100vh] bg-gray-50";
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={bodyBg()}>
      {expanded && (
        <div className="fixed z-[1] h-screen left-[50%] -translate-x-[50%] w-10/12 opacity-40 bg-slate-800"></div>
      )}
      <div className={`${eczar.className} mx-auto w-10/12`}>
        <Navbar color="black" />
        <div className="flex">
          <Sidebar expanded={expanded} setExpanded={setExpanded}>
            <SidebarItem
              expanded={expanded}
              setExpanded={setExpanded}
              icon={<LayoutDashboard size={size} />}
              text="Dashboard"
              alert
            />
            <SidebarItem
              expanded={expanded}
              setExpanded={setExpanded}
              icon={<BarChart3 size={size} />}
              text="Statistics"
            />
            <SidebarItem
              expanded={expanded}
              setExpanded={setExpanded}
              icon={<UserCircle size={size} />}
              text="Users"
            />
            <SidebarItem
              expanded={expanded}
              setExpanded={setExpanded}
              icon={<Boxes size={size} />}
              text="Inventory"
            />
            <SidebarItem
              expanded={expanded}
              setExpanded={setExpanded}
              icon={<Package size={size} />}
              text="Orders"
              alert
            />
            <SidebarItem
              expanded={expanded}
              setExpanded={setExpanded}
              icon={<Receipt size={size} />}
              text="Billing"
            />
            <hr className="my-3" />
            <SidebarItem
              expanded={expanded}
              setExpanded={setExpanded}
              icon={<Settings size={size} />}
              text="Settings"
            />
            <SidebarItem
              expanded={expanded}
              setExpanded={setExpanded}
              icon={<LifeBuoy size={size} />}
              text="Help"
            />
            <SidebarItem
              expanded={expanded}
              setExpanded={setExpanded}
              icon={<Power size={size} />}
              text="Logout"
            />
          </Sidebar>
          <div className="ml-16">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
