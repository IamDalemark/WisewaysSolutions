import React from "react";

type MenuItem = {
    label: string
};

interface Props {
    menuItems : MenuItem[]
};

const ServiceDropDown = ({menuItems}: Props) => {
    return (
        <div className="rounded-xl bg-[#f3f3f3] h-40 w-60 mt-10 py-3 px-4 absolute drop-shadow-xl overflow-auto">
            {menuItems.map((item) => {
                return (
                    <button key={item.label} className="flex text-[#0D767A] py-2 leading-[1.25] text-left hover:text-[#FD8432] hover:underline">
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
};

export default ServiceDropDown;