import { Eye, Link2, UserCircle2 } from "lucide-react";
import Link from "next/link";
import React from "react";

type NavProps = {};

const Nav: React.FC<NavProps> = () => {
  return (
    <nav className="p-6 flex flex-col ">
      <div className="flex place-content-between p-4 bg-White rounded-lg">
        <Link href={''} className="flex gap-2 align-middle">
          <img src="./solar_link-circle-bold.svg" alt="logo" />
          <img
            src="./devlinks.svg"
            alt="logo text"
            className="hidden md:block"
          />
        </Link>
        <div className="flex">
          <Link
            href={""}
            className="px-[27px] py-[11px] flex content-center gap-2 rounded-lg text-Grey hover:text-Purple"
          >
            <Link2 size={20} />
            <span className="font-semibold text-base leading-6 hidden md:block">
              Links
            </span>
          </Link>
          <Link
            href={""}
            className="px-[27px] py-[11px] content-center flex gap-2 rounded-lg text-Grey hover:text-Purple"
          >
            <UserCircle2 size={20} />
            <span className="font-semibold text-base leading-6 hidden md:block">
              Profile Details
            </span>
          </Link>
        </div>
        <Link
          href={""}
          className="px-[16px] py-[11px] border rounded-lg border-Purple"
        >
          <Eye size={20} color="#633CFF" className="md:hidden" />
          <span className="font-semibold text-base leading-6 hidden md:block text-Purple">
            Preveiw
          </span>
        </Link>
      </div>
    </nav>
  );
};
export default Nav;
