"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  shortText: string;
  fullText: string;
  isReview?: boolean;
}

const TableCellDropDown = ({ shortText, fullText, isReview }: Props) => {
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
        className="flex w-full text-left hover:text-[#FD8432] hover:scale-105 transition-all cursor-pointer 
        justify-self-start justify-between items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {shortText}
        <div className="w-[10%]">
          {isOpen ? <ChevronUp size={16} strokeWidth={3} /> : <ChevronDown size={16} strokeWidth={3} />}
        </div>
      </button>
      
      {isOpen && (
        <div 
          className={`absolute z-10 mt-2 bg-white text-[#0D767A] border 
          rounded-md shadow-md text-sm ${isReview ? "right-[10%] sm:left-[50%] sm:-translate-x-[50%] pl-5 pr-2 py-4 w-70 sm:w-80" : "px-5 py-3 w-64"} overflow-hidden`}
        >
          <div className={`${isReview ? "pr-3 text-left max-h-70 md:max-h-50" : "text-center text-wrap"} overflow-auto`}>
            {fullText}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableCellDropDown;


