"use client";

import Link from "next/link";
import React from "react";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { HomeIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { PowerIcon } from "@heroicons/react/24/solid";
const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
});

const Navbar = ({ color }: { color?: string }) => {
  const { data: session } = useSession();
  const logout = (e: MouseEvent) => {
    e.preventDefault();
    signOut();
  };
  const login = (e: MouseEvent) => {
    e.preventDefault();
    signIn();
  };
  return (
    <nav
      className={`pt-4 w-full ${
        color === "black" ? "pb-8 pr-10 mb-1 bg-white" : "mb-6"
      }`}
    >
      <ul className="flex justify-end">
        <div
          className={`${roboto.className} text-blue-100 flex-row ${
            color === "black" ? "xmenu" : "menu"
          }`}
        >
          <Link href="/">
            <HomeIcon className="w-5 h-5 inline-block" /> Home
          </Link>
          <Link href="/services">
            <WrenchScrewdriverIcon className="w-5 h-5 inline-block" /> Services
          </Link>
          {session ? (
            <Link href="/logout">
              <PowerIcon className="w-5 h-5 inline-block" /> Logout
            </Link>
          ) : (
            <Link href="/login">
              <PowerIcon className="w-5 h-5 inline-block" /> Login
            </Link>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
