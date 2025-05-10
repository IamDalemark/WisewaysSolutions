"use client";

import React from "react";
import AdminTableBodyBooking from "./AdminTableBodyBooking";

export interface AdminTableColumn {
  header: string;
  accessor: string;
};

export interface AdminTableProps {
  columns: AdminTableColumn[];
  filters?: {
    date?: string;
    status?: string;
    clientName?: string;
  };
};

const AdminTableBooking = ({ columns, filters = {} }: AdminTableProps) => {
  return (
    <div className="flex w-full h-full justify-center items-center mt-1">
      <table className="bg-[#f3f3f3] w-full rounded-xl">
        <thead>
          <tr className="bg-blue-green text-[#f3f3f3]">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`${idx === 0 ? "rounded-tl-xl" : ""} ${
                  idx === columns.length - 1 ? "rounded-tr-xl" : ""
                } px-4 py-3`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <AdminTableBodyBooking filters={filters} />
      </table>
    </div>
  );
};

export default AdminTableBooking;