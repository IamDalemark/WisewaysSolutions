"use client";

import React from "react";
import Image from "next/image";
import ServiceDropDownItem from "./ServiceDropDownItem";
import ProfileDownMenuItem from "./ProfileDropDownItem";

export const NavBar = () => {
  return (
    <nav className="flex justify-start items-center bg-[#F3F3F3] sticky top-6 ml-[10%] mr-[10%] rounded-3xl h-20 shadow-xl">
      <Image
        src={"/wiseways_navbar_logo.png"}
        alt="WiseWays Solution logo"
        width={190}
        height={51.5}
        className="mx-5 my-1"
      ></Image>

      <ul className="flex">
        <li className="list-none">
          <ServiceDropDownItem label="SERVICES" />
        </li>
        <li className="list-none">
          <a
            href="#about"
            className="flex text-[#0D767A] p-2 mx-2 hover:text-[#FD8432] hover:underline"
          >
            ABOUT
          </a>
        </li>
        <li className="list-none">
          <a
            href="#contact"
            className="flex text-[#0D767A] p-2 mx-2 hover:text-[#FD8432] hover:underline"
          >
            CONTACT
          </a>
        </li>
      </ul>

      <button
        className="inline-block h-5/8 w-1/6 py-1 bg-[#0D767A] text-[#F3F3F3] rounded-2xl ml-52 mr-1 leading-[1.25] 
        hover:bg-[#086B70] hover:text-[#BECECE]"
      >
        <p>
          SCHEDULE <br /> APPOINTMENT
        </p>
      </button>

      <ProfileDownMenuItem />
    </nav>
  );
};

export default NavBar;
