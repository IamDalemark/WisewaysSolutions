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
        className="text-[#0D767A] hover:text-[#FD8432] hover: flex justify-self-center items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {shortText} {isOpen ? <ChevronUp size={16} strokeWidth={3} /> : <ChevronDown size={16} strokeWidth={3} />}
      </button>

      {isOpen && (
        <div 
          className={`absolute left-[50%] -translate-x-[50%] z-10 mt-1 bg-white text-[#0D767A] border 
          rounded-md shadow-md text-sm ${isReview ? "pl-5 pr-2 w-80" : "px-5 w-64"} overflow-hidden`}
        >
          <div className={`${isReview ? "pr-3 py-4 text-left max-h-50" : "py-3 text-center text-wrap"} overflow-auto`}>
            {fullText}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableCellDropDown;


