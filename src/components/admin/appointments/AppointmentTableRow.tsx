"use client";

import React from "react";
import { BookingAdminData } from "@/types/bookings.type";
import AppointmentStatusButtons from "./AppointmentStatusButtons";
import TableCellDropDown from "../TableCellDropDown";
import { appointmentTableColumns } from "@/constants/adminTableColumns";
import { formatTime } from "@/utils/timeUtils";

const maxLengths: Record<string, number> = {
  name: 20,
  email: 30,
  service: 25,
};

interface AdminTableRowProps {
  row: BookingAdminData;
  isLastRow: boolean;
}

const AppointmentTableRow: React.FC<AdminTableRowProps> = ({ row, isLastRow }) => {
  return (
    <tr className={`${isLastRow ? "" : "border-b-neutral-300 border-b-2 md:border-b-1"}
    ${row.status === "Declined" ? "text-gray-400" : ""}
    text-sm xl:text-base h-27 md:h-18 lg:h-14`}>
    {appointmentTableColumns.map((col, colIdx) => {
        const cellValue = row[col.accessor as keyof BookingAdminData];
        const maxLength = maxLengths[col.accessor] ?? Infinity;

        const shouldTruncate = 
            typeof cellValue === "string" && cellValue.length > maxLength;

        const shortText = shouldTruncate ? 
          `${cellValue.slice(0, maxLength)}...` : cellValue;

        return (
            <td key={colIdx} className={`${col.header === "Date" || col.header === "Time" || col.header === "Service" || col.header === "Status" ? 
                "text-center px-4" : "text-left pl-4 pr-3 md:pl-8 md:pr-4"}
              ${col.header === "User" ? "w-[20%] text-base" : ""}
              ${col.header === "Email" ? "w-[25%] hidden lg:table-cell" : ""} 
              ${col.header === "Status" || col.header === "Time" ? "hidden md:table-cell" : ""}
              ${col.header === "Service" ? "hidden sm:table-cell w-[10%] text-center" : ""}
              ${col.header === "Date" ? "w-[50%] sm:w-[25%] md:w-[15%] text-base" : ""}
              pt-4 sm:pt-0 align-top sm:align-middle`}>
            
            { col.header === "Status" ? (
                row.status === "Accepted" || row.status === "Declined" ? (
                  <span>{row.status}</span>
                ) : (
                  <AppointmentStatusButtons rowId={row.booking_id} />
                )
              ) : shouldTruncate ? (
                <TableCellDropDown 
                  shortText={shortText} 
                  fullText={cellValue} 
                  isReview={col.accessor === "testimonial"}
                />
              ) : (
                cellValue
            )}

            {/* Email and Status content to appear in User's column when in smaller screens */}
            { col.header === "User" && (
                <dl className="mt-0.5">
                  <dt className="hidden">Email</dt>
                  <dd className="text-gray-500 text-xs lg:hidden">{row.email}</dd>

                  <div className="md:hidden h-0.25 w-full bg-gray-300 mt-2 mb-1"></div>

                  <dt className="hidden">Status</dt>
                  <dd className="md:hidden text-center">
                    {row.status === "Accepted" || row.status === "Declined" ? (
                      <span>{row.status}</span>
                    ) : (
                      <AppointmentStatusButtons rowId={row.booking_id} />
                    )}
                  </dd>
                </dl>
            )}
            
            {/* Time and Service to appear in Date's column when in smaller screens */}
            {col.header === "Date" && (
                <dl className="mt-1">
                  <dt className="hidden">Time</dt>
                  <dd className="text-gray-500 font-medium md:hidden">Time: {formatTime(row.created_at)}</dd>

                  <dt className="hidden">Service</dt>
                  <dd className="text-blue-green font-medium sm:hidden">Service: {row.service}</dd>
                </dl>
            )}
        </td>
        );
    })}
    </tr>

  );
};

export default AppointmentTableRow;
