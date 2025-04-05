"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import DropDownMenu from "./DropDownMenu";

interface Props {
    label: string
}

const DropDownMenuItem = ({label} : Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuItems = [{label: "Accounting"}, {label: "Virtual Assistant"}];

    return (
        <div>
            <button className="flex text-[#0D767A] p-2 mx-2 hover:text-[#FD8432] hover:underline"
            onClick={() => setIsOpen(!isOpen)}>
                {label} {isOpen ? <ChevronUp color="#086B70" strokeWidth={3}/> : <ChevronDown color="#086B70" strokeWidth={3}/>}
            </button>

            {isOpen && <DropDownMenu menuItems={menuItems}/>}
        </div>
    );
};

export default DropDownMenuItem;