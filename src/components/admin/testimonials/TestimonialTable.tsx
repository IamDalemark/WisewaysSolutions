"use client";

import React, { useEffect, useState } from "react";
import TestimonialTableBody from "./TestimonialTableBody";

export interface AdminTableColumn {
  header: string;
  accessor: string;
};

export interface AdminTableProps {
  columns: AdminTableColumn[];
  body?: React.ReactNode; 
  filters?: {
    name?: string;
    status?: string;
    rating?: string;
    date?: string;
    clientName?: string;
  };
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;
};

const isColumnVisible = (header: string) => {
  if (header === "Email") return window.innerWidth >= 1024; // lg
  if (header === "Status") return window.innerWidth >= 768; // md
  if (header === "Rating") return window.innerWidth >= 640; // sm
  return true;
};

export const TestimonialTable = ({ columns, body, filters, currentPage, setTotalPages }: AdminTableProps) => {
  const [visibleHeaders, setVisibleHeaders] = useState<AdminTableColumn[]>([]);

  useEffect(() => {
    const updateVisibleHeaders = () => {
      const filtered = columns.filter(col => isColumnVisible(col.header));
      setVisibleHeaders(filtered);
    };
  
    updateVisibleHeaders();
    window.addEventListener("resize", updateVisibleHeaders);
    return () => window.removeEventListener("resize", updateVisibleHeaders);
  }, [columns]);  

  return (
    <div className="flex flex-col w-full h-full justify-center items-center mt-1 shadow-xl">
      <table className="bg-[#f3f3f3] w-full rounded-xl">
        <thead>
          <tr className="bg-blue-green text-[#f3f3f3] overflow-hidden">
            {columns.map((col, idx) => {
                const isFirst = visibleHeaders[0]?.header === col.header;
                const isLast = visibleHeaders[visibleHeaders.length - 1]?.header === col.header;

                return (
                  <th
                  key={idx}
                  className={`px-4 md:px-8 py-3
                    ${isFirst ? "rounded-tl-xl" : ""} ${isLast ? "rounded-tr-xl" : ""}
                    ${col.header === "Rating" || col.header === "Status" ? "text-center" : "text-left"}
                    ${col.header === "Email" ? "hidden lg:table-cell" : ""} 
                    ${col.header === "Status" ? "hidden md:table-cell" : ""}
                    ${col.header === "Rating" ? "hidden sm:table-cell md:px-4 " : ""}
                  `}
                  >
                    {col.header}
                  </th>
                );
            })}
          </tr>
        </thead>
        {body || (
            <TestimonialTableBody 
            currentPage={currentPage} 
            setTotalPages={setTotalPages}
            filters={filters}
            />
          )
        }
      </table>
    </div>
  );
};