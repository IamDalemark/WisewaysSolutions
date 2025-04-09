"use client";

import React from "react";
import Image from "next/image";
import ServiceDropDownItem from "./ServiceDropDownItem";
import ProfileDownMenuItem from "./ProfileDropDownItem";
import Link from "next/link";

export const NavBar = () => {
    return (
    <nav className="w-[80%] flex items-center bg-[#F3F3F3] fixed top-[4%] mx-[10%] rounded-3xl h-20 shadow-xl px-[2%]">
        
        <div className="flex w-2/3">
            <Link href="/"> 
                <Image src={"/wiseways_navbar_logo.png"} alt="WiseWays Solution logo" width={190} height={51.5} className="mx-5 my-1"></Image>
            </Link>

            <ul className="flex items-center px-5">
                <li className="list-none">
                    <ServiceDropDownItem label="SERVICES"/>
                </li>
                <li className="list-none">
                    <a href="#about" className="flex text-blue-green p-2 mx-2 hover:text-[#FD8432]">
                        ABOUT
                    </a>
                </li>
                <li className="list-none">
                    <a href="#contact" className="flex text-blue-green p-2 mx-2 hover:text-[#FD8432]">
                        CONTACT
                    </a>
                </li>
            </ul>
        </div>

        <div className="flex w-1/3 justify-end">
            <button className="inline-block h-5/8 w-48 py-1 mx-2 bg-blue-green text-[#F3F3F3] rounded-2xl leading-[1.25] 
            hover:bg-blue-green-dark hover:text-[#BECECE]">
            <p>SCHEDULE <br /> APPOINTMENT</p>
            </button>

            <ProfileDownMenuItem/>
        </div>
    </nav>

    );
};


export default NavBar;