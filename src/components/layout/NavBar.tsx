import React from "react";
import logo from "../assets/wiseways_logo.png";
import { ChevronDown, User } from "lucide-react";
import Image from "next/image";
// import "./NavBar.css";

export const NavBar = () => {
    return (
    <nav className="flex justify-start items-center bg-[#F3F3F3] sticky top-0 ml-[10%] mr-[10%] mt-6 rounded-3xl h-20">
        <Image src="/assets/wiseways_logo.png" alt="WiseWays Solution logo" width={340} height={103} className="w-1/5"></Image>

        <ul className="flex">
            <li className="list-none">
                <a href="" className="flex text-[#0D767A] p-2 mx-2 hover:text-[#FD8432] hover:underline">
                    SERVICES<ChevronDown color="#086B70" strokeWidth={3}/>
                </a>
            </li>
            <li className="list-none">
                <a href="" className="flex text-[#0D767A] p-2 mx-2 hover:text-[#FD8432] hover:underline">
                    ABOUT
                </a>
            </li>
            <li className="list-none">
                <a href="" className="flex text-[#0D767A] p-2 mx-2 hover:text-[#FD8432] hover:underline">
                    CONTACT
                </a>
            </li>
        </ul>

        <button className="inline-block h-5/8 w-1/7 py-1 bg-[#0D767A] text-[#F3F3F3] rounded-2xl mx-3 leading-[1.25] 
        hover:bg-[#086B70] hover:text-[#BECECE]">
        <p>SCHEDULE APPOINTMENT</p>
        </button>

        <div className="flex h-9 w-18 rounded-[2.5rem] mx-10 hover:bg-[#D7D8D8]">
            <div className="bg-[#BECECE] h-full w-1/2 rounded-full p-1.5"><User color="#5D7F81" strokeWidth={2.5}/></div>
            <ChevronDown color="#086B70" strokeWidth={3} size={32} className="p-1"/>
        </div>
    </nav>

    );
};


export default NavBar