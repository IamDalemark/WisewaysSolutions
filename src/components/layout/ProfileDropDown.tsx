import React from "react";
import { User } from "lucide-react";

type MenuItem = {
    label: string
};

interface Props {
    menuItems : MenuItem[]
};

const ProfileDropDown = ({menuItems}: Props) => {
    return (
        <div className="rounded-xl bg-[#f3f3f3] min-h-20 w-65 mt-10 py-3 px-4 absolute drop-shadow-xl overflow-auto">
            
            <div className="flex">
                <div className="items-start bg-[#BECECE] h-18 w-18 rounded-full p-2 my-2">
                    <User color="#5D7F81" strokeWidth={2} size={54} className="m-auto"/>
                </div>
                <div className="p-3">
                    <p className="text-2xl font-semibold">Username</p>
                    <p className="text-sm font-regular text-[#979797]">username&gmail.com</p>
                    <p className="text-xs font-regular text-[#a8a8a8]">(User)</p>
                </div>
            
            </div>

            {menuItems.map((item) => {
                return (
                    <button key={item.label} className="flex text-sm text-[#0D767A] py-2 leading-[1] text-left hover:text-[#FD8432] hover:underline">
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
};

export default ProfileDropDown;