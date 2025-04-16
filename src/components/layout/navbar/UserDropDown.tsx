// the dropdown menu that will popup when you select 'user' in the navbar

import React from "react";

type MenuItem = {
    label: string
};

interface Props {
    menuItems : MenuItem[]
};

const UserDropDown = ({menuItems}: Props) => {
    return (
        <div className="rounded-xl bg-[#f3f3f3] min-h-20 w-50 sm:w-60 mt-10 py-3 px-4 absolute drop-shadow-xl/30 
        overflow-auto -right-[0%] top-[60%] lg:top-[70%]">
            
            <div className="flex">
                <div className="py-3">
                    <p className="text-xl md:text-2xl font-semibold text-blue-green">Username</p>
                    <p className="text-sm md:text-base font-regular text-[#979797]">username@gmail.com</p>
                    <p className="text-xs md:text-sm font-regular text-[#a8a8a8]">(User)</p>
                </div>
            
            </div>

            {menuItems.map((item) => {
                return (
                    <button key={item.label} className="flex text-sm text-[#0D767A] py-2 leading-[1] text-left 
                    hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer">
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
};

export default UserDropDown;