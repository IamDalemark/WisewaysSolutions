"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ServiceDropDown from "./ServiceDropDown";

interface Props {
    label: string
}

const ServiceDropDownItem = ({label} : Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuItems = [{label: "Accounting & Bookkeeping"}, {label: "Content Creation"}, {label: "Customer Support"}, {label: "Data Entry & Processing"},
                        {label: "Digital Marketing"}, {label: "Graphic & Web Design"}, {label: "IT Support & Help Desk"}, {label: "Recruitment & HR"},
                        {label: "Software Development"}, {label: "Virtual Assitance"}];

    return (
        <div>
            <button className="flex text-[#0D767A] p-2 mx-2 hover:text-[#FD8432]"
            onClick={() => setIsOpen(!isOpen)}>
                {label} {isOpen ? <ChevronUp color="#086B70" strokeWidth={3}/> : <ChevronDown color="#086B70" strokeWidth={3}/>}
            </button>

            
            {isOpen && <ServiceDropDown menuItems={menuItems}/>}
        </div>
    );
};

export default ServiceDropDownItem;