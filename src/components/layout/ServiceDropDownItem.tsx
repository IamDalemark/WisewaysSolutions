"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ServiceDropDown from "./ServiceDropDown";

interface Props {
    label: string;
}

const ServiceDropDownItem = ({ label }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const menuItems = [
        { label: "Accounting & Bookkeeping", href: "/services/accountingAndBookkeeping" },
        { label: "Content Creation", href: "/services/contentCreation" },
        { label: "Customer Support", href: "/services/customerSupport" },
        { label: "Data Entry & Processing", href: "/services/dataEntryAndProcessing" },
        { label: "Digital Marketing", href: "/services/digitalMarketing" },
        { label: "Graphic & Web Design", href: "/services/graphicAndWebDesign" },
        { label: "IT Support & Help Desk", href: "/services/itSupportAndHelpDesk" },
        { label: "Recruitment & HR", href: "/services/recruitmentAndHr" },
        { label: "Software Development", href: "/services/softwareDevelopment" },
        { label: "Virtual Assistance", href: "/services/virtualAssistance" }
    ];
    
    useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };
    
            if (isOpen) {
                document.addEventListener("mousedown", handleClickOutside);
            }
    
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [isOpen]);

    return (
        <div ref={dropdownRef}>
            <button className="flex text-[#0D767A] p-2 hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}>
                {label} {isOpen ? <ChevronUp color="#086B70" strokeWidth={3}/> 
                                : <ChevronDown color="#086B70" strokeWidth={3}/>}
            </button>

            {isOpen && <ServiceDropDown menuItems={menuItems} />}
        </div>
    );
};

export default ServiceDropDownItem;