"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  shortText: string;
  fullText: string;
  isReview?: boolean;
}

const TableCellDropdown = ({ shortText, fullText, isReview }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div className="relative" ref={dropdownRef}>
      <button
        className="text-[#0D767A] hover:text-[#FD8432] hover: flex justify-self-center items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {shortText} {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div 
          className={`absolute left-[50%] -translate-x-[50%] z-10 mt-1 bg-white text-[#0D767A] border 
          rounded-md shadow-md px-5 py-3 text-sm ${isReview ? "w-80 text-left" : "w-64 text center break-all"}`}>
          {fullText}
        </div>
      )}
    </div>
  );
};

export default TableCellDropdown;
