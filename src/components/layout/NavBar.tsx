"use client";

import React from "react";
import { ChevronDown, User } from "lucide-react";
import Image from "next/image";
import DropDownMenuItem from "./DropDownMenuItem";

export const NavBar = () => {
    return (
    <nav className="flex justify-start items-center bg-[#F3F3F3] sticky top-6 ml-[10%] mr-[10%] rounded-3xl h-20 shadow-xl">
        <Image src={"/wiseways_navbar_logo.png"} alt="WiseWays Solution logo" width={190} height={51.5} className="mx-5 my-1"></Image>

        <ul className="flex">
            <li className="list-none">
                <DropDownMenuItem label="SERVICES"/>
                {/* <a href="" className="flex text-[#0D767A] p-2 mx-2 hover:text-[#FD8432] hover:underline">
                    SERVICES
                </a> */}
            </li>
            <li className="list-none">
                <a href="#about" className="flex text-[#0D767A] p-2 mx-2 hover:text-[#FD8432] hover:underline">
                    ABOUT
                </a>
            </li>
            <li className="list-none">
                <a href="#contact" className="flex text-[#0D767A] p-2 mx-2 hover:text-[#FD8432] hover:underline">
                    CONTACT
                </a>
            </li>
        </ul>

        <button className="inline-block h-5/8 w-1/6 py-1 bg-[#0D767A] text-[#F3F3F3] rounded-2xl ml-56 mr-1 leading-[1.25] 
        hover:bg-[#086B70] hover:text-[#BECECE]">
        <p>SCHEDULE <br /> APPOINTMENT</p>
        </button>

        <div className="flex h-11 w-22 rounded-[2.5rem] ml-5 mr-9 hover:bg-[#D7D8D8]">
            <div className="bg-[#BECECE] h-full w-1/2 rounded-full p-1.5"><User color="#5D7F81" strokeWidth={2.5} size={30} className="m-auto"/></div>
            <ChevronDown color="#086B70" strokeWidth={3} size={32} className="m-auto ml-0.5"/>
        </div>
    </nav>

    );
};


export default NavBar;