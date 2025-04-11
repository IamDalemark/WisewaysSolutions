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
        <div className="rounded-xl bg-[#f3f3f3] h-40 w-60 mt-10 py-3 px-4 absolute drop-shadow-xl overflow-auto">
            {menuItems.map((item) => {
                return (
                    <Link key={item.label} href={item.href}>
                        <button className="flex text-[#0D767A] py-2 leading-[1.25] text-left hover:text-[#FD8432] \
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