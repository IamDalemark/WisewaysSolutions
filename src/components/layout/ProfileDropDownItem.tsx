"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import ProfileDropDown from "./ProfileDropDown";

const ProfileDownMenuItem = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuItems = [{label: "Change Password"}, {label: "Log Out"}];

    return (
        <div>
            <div className="flex h-11 w-20 ml-2 rounded-[2.5rem] hover:bg-[#D7D8D8]"
            onClick={() => setIsOpen(!isOpen)}>
            <div className="bg-[#BECECE] h-11 w-11 rounded-full p-1.5 ">
                <User color="#5D7F81" strokeWidth={2.5} size={30} className="m-auto"/>
            </div>
            <div className="pl-0.5 py-2.5">
                {isOpen ? <ChevronUp color="#086B70" strokeWidth={3}/> : <ChevronDown color="#086B70" strokeWidth={3}/>}
            </div>
                
            </div>

            {isOpen && <ProfileDropDown menuItems={menuItems}/>}
        </div>
    );
};

export default ProfileDownMenuItem;