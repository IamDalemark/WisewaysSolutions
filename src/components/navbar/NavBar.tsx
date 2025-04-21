"use client";

// the main component for the actual navbar you see at the top of the website

import React from "react";
import Image from "next/image";
import NavMenuDropDownItem from "./dropdown/NavMenuDropDownItem";
import Link from "next/link";
import NavBarButton from "./NavBarButton";
import UserDropDownItem from "./dropdown/UserDropDownItem";

const NavBar = () => {
  return (
    <nav className="w-[90%] sm:w-[86%] flex items-center bg-[#F3F3F3] fixed top-6 mx-[5%] sm:mx-[7%] rounded-3xl h-20 shadow-lg px-[2%] justify-between z-1">
      <div className="flex w-[60%] md:w-[40%] lg:w-[65%] xl:w-[70%]">
        <Link href="/" className="w-[80%] lg:w-[35%] xl:w-[30%] h-full mx-[2%]">
          <Image
            src={"/wiseways_navbar_logo.png"}
            alt="WiseWays Solution logo"
            width={190}
            height={51.5}
            className="hover:scale-103 transition-all"
          ></Image>
        </Link>

        <ul className="hidden lg:flex items-center lg:w-[55%] xl:w-[60%] justify-left">
          <NavBarButton navButtonName="Services" />
          <NavBarButton navButtonName="About" />
          <NavBarButton navButtonName="Contact" />
          <NavBarButton navButtonName="Testimonial" />
        </ul>
      </div>

      <div className="flex w-[30%] md:w-[55%] lg:w-[30%] xl:w-[30%] mr-[2%] justify-end">
        <button
          className="hidden md:inline-block h-5/8 w-[50%] lg:w-[60%] xl:[50%] py-1 mx-2 bg-blue-green text-[#F3F3F3] rounded-2xl leading-[1.25] 
            hover:bg-blue-green-dark hover:scale-103 transition-all cursor-pointer"
        >
          <p>
            SCHEDULE <br /> APPOINTMENT
          </p>
        </button>

        <UserDropDownItem />
        <NavMenuDropDownItem />
      </div>
    </nav>
  );
};

export default NavBar;
