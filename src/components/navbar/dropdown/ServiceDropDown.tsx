// the dropdown menu for the services button in the navbar
import React from "react";
import Link from "next/link";

type MenuItem = {
    label: string;
    href: string;
};

interface Props {
    
    menuItems: MenuItem[];
}

const ServiceDropDown = ({ menuItems }: Props) => {
    return (
        <div className="rounded-xl bg-[#f3f3f3] h-48 lg:h-42 w-[80%] sm:w-[75%] lg:w-[30%] py-3 px-4 absolute shadow-2xl overflow-hidden
        left-[10%] sm:left-[14%] lg:left-[25%] top-[20%] md:top-[30%] lg:top-[120%] justify-self-center">
  
        <div className="max-h-full overflow-auto pr-1 pb-1"> {/* add pr-1 to avoid scrollbar overlapping */}
            {menuItems.map((item) => (
            <Link key={item.label} href={item.href}>
                <button className="flex text-[#0D767A] pl-2 py-2 leading-[1.25] text-lg lg:text-base text-left hover:text-[#FD8432]
                w-[80%] hover:scale-103 transition-all cursor-pointer">
                {item.label}
                </button>
            </Link>
            ))}
        </div>
        
        </div>
    );
};

export default ServiceDropDown;