"use client";

// the main component for the actual navbar you see at the top of the website

import React from "react";
import Image from "next/image";
import NavMenuDropDownItem from "./NavMenuDropDownItem";
import Link from "next/link";
import NavBarButton from "./NavBarButton";

const NavBar = () => {
  return (
    <nav className="w-[80%] flex items-center bg-[#F3F3F3] fixed top-6 mx-[10%] rounded-3xl h-20 shadow-lg/15 px-[2%] justify-between z-1">
      <div className="flex w-[70%] md:w-[50%] lg:w-[75%] ">
        <Link
          href="/"
          className="w-[80%] lg:w-4/12 h-full ml-[4%] mr-[1%] xl:ml-[5%]"
        >
          <Image
            src={"/wiseways_navbar_logo.png"}
            alt="WiseWays Solution logo"
            width={190}
            height={51.5}
            className="hover:scale-103 transition-all"
          ></Image>
        </Link>

        <ul className="hidden lg:flex items-center lg:w-8/12">
          <NavBarButton navButtonName="Services" />
          <NavBarButton navButtonName="About" />
          <NavBarButton navButtonName="Contact" />
          <NavBarButton navButtonName="User" />
        </ul>
      </div>

      <div className="flex w-[30%] md:w-[50%] lg:w-[25%] justify-end">
        <button
          className="hidden md:inline-block h-5/8 w-[50%] lg:w-[80%] xl:[60%] py-1 mx-2 bg-blue-green text-[#F3F3F3] rounded-2xl leading-[1.25] 
            hover:bg-blue-green-dark hover:scale-103 transition-all cursor-pointer"
        >
          <p>
            SCHEDULE <br /> APPOINTMENT
          </p>
        </button>

        <NavMenuDropDownItem />
      </div>
    </nav>
  );
};

export default NavBar;
