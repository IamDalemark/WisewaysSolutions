"use client";

import React, { useEffect, useState } from "react";
import { TestimonialTableBody } from "./TestimonialTableBody";

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

const getVisibleColumns = (columns: AdminTableColumn[], width: number) => {
  return columns.filter((col) => {
    if (col.header === "Email") return width >= 1024;
    if (col.header === "Status") return width >= 768;
    if (col.header === "Rating") return width >= 640;
    return true;
  });
};

export const TestimonialTable = ({ columns, body, filters, currentPage, setTotalPages }: AdminTableProps) => {
  const [visibleHeaders, setVisibleHeaders] = useState<AdminTableColumn[]>([]);

  useEffect(() => {
    const updateVisibleHeaders = () => {
      setVisibleHeaders(getVisibleColumns(columns, window.innerWidth));
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
              const isVisible = visibleHeaders.find((v) => v.header === col.header);
              if (!isVisible) return null;

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
                    ${col.header === "Rating" ? "hidden sm:table-cell md:px-4" : ""}
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