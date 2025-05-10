"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import ServiceDropDown from "./ServiceDropDown";
import { useAutoCloseDropdown } from "@/hooks/useAutoCloseDropDown";

interface Props {
  label: string;
  initialOpen: boolean;
}

const ServiceDropDownItem = ({ label, initialOpen = false }: Props) => {
  const { isOpen, setIsOpen, ref } = useAutoCloseDropdown(initialOpen);

  const menuItems = [
    {
      label: "Accounting & Bookkeeping",
      href: "/services/accountingAndBookkeeping",
    },
    { label: "Content Creation", href: "/services/contentCreation" },
    { label: "Customer Support", href: "/services/customerSupport" },
    {
      label: "Data Entry & Processing",
      href: "/services/dataEntryAndProcessing",
    },
    { label: "Digital Marketing", href: "/services/digitalMarketing" },
    { label: "Graphic & Web Design", href: "/services/graphicAndWebDesign" },
    { label: "IT Support & Help Desk", href: "/services/itSupportAndHelpDesk" },
    { label: "Recruitment & HR", href: "/services/recruitmentAndHr" },
    { label: "Software Development", href: "/services/softwareDevelopment" },
    { label: "Virtual Assistance", href: "/services/virtualAssistance" },
  ];

  return (
    <div ref={ref}>
      <button
        className="flex group text-xl lg:text-base text-[#0D767A] p-2 hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}{" "}
        {isOpen ? (
          <ChevronUp
            color="#086B70"
            strokeWidth={3}
            className="group-hover:stroke-[#FD8432]"
          />
        ) : (
          <ChevronDown
            color="#086B70"
            strokeWidth={3}
            className="group-hover:stroke-[#FD8432]"
          />
        )}
      </button>

      {isOpen && <ServiceDropDown menuItems={menuItems} />}
    </div>
  );
};

export default ServiceDropDownItem;
