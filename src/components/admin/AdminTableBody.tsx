"use client";

import React, { useState } from "react";
import TableCellDropDown from "./TableCellDropDown";
import { AdminTableProps } from "./AdminTable";
import StatusColumnButtons from "./StatusColumnButtons";


const AdminTableBody: React.FC<AdminTableProps> = ({ columns, data }) => {
    const maxLengths: Record<string, number> = {
    review: 35,
    clientName: 20,
    email: 25,
    };

    const [statuses, setStatuses] = useState<Record<number, string>>({});

    const handleStatusChange = (rowIdx: number, status: string) => {
        setStatuses((prev) => ({ ...prev, [rowIdx]: status }));
    };
    
    return (
    <tbody className="text-center text-sm w-full">
      {data.map((row, rowIdx) => (
        <tr
          key={rowIdx}
          className={`${rowIdx === columns.length - 1 ? "" : "border-b-neutral-300 border-b-1"}`}
        >
          {columns.map((col, colIdx) => {
            const cellValue = row[col.accessor];
            const maxLength = maxLengths[col.accessor] ?? Infinity;

            const shouldTruncate =
              typeof cellValue === "string" && cellValue.length > maxLength;

            const shortText = shouldTruncate
              ? `${cellValue.slice(0, maxLength)}...`
              : cellValue;

            return (
              <td key={colIdx} className="px-4 py-2 text-center">
                { col.accessor === "status" ? (
                  statuses[rowIdx] ? (
                    <span>{statuses[rowIdx]}</span>
                  ) : (
                    <StatusColumnButtons onChange={(status) => handleStatusChange(rowIdx, status)}/>
                  )
                ) : shouldTruncate ? (
                  <TableCellDropDown shortText={String(shortText)} fullText={String(cellValue)} isReview={col.accessor === "review"}/>
                ) : (
                  cellValue
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
    );
};

export default AdminTableBody;
