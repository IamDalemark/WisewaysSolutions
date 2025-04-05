import React from "react";

type MenuItem = {
    label: string
};

interface Props {
    menuItems : MenuItem[]
};

const DropDownMenu = ({menuItems}: Props) => {
    return (
        <div className="rounded-xl bg-[#F3F3F3] h-8 w-10">
            {menuItems.map((item) => {
                return (
                    <button key={item.label} className="flex text-[#0D767A] p-2 mx-2 hover:text-[#FD8432] hover:underline">
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
};

export default DropDownMenu;