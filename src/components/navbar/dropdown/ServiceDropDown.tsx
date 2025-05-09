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
        <div className="rounded-xl bg-[#f3f3f3] h-48 lg:h-42 w-[80%] sm:w-[75%] lg:w-[30%] py-3 px-4 absolute shadow-2xl overflow-auto
        left-[10%] sm:left-[14%] lg:left-[25%] top-[20%] md:top-[30%] lg:top-[120%] justify-self-center">
            {menuItems.map((item) => {
                return (
                    <Link key={item.label} href={item.href}>
                        <button className="flex text-[#0D767A] pl-2 py-2 leading-[1.25] text-lg lg:text-base text-left hover:text-[#FD8432]
                        w-full hover:scale-103 transition-all cursor-pointer">
                            {item.label}
                        </button>
                    </Link>
                );
            })}
        </div>
    );
};

export default ServiceDropDown;