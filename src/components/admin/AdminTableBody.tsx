"use client";

import React, { useState, useEffect } from "react";
import { fetchTestimonials } from "@/hooks/fetchTestimonials";
import { TestimonialAdminData } from "@/types/testimonials.type";
import StatusColumnButtons from "./StatusColumnButtons";
import TableCellDropDown from "./TableCellDropDown";

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Review", accessor: "testimonial" },
  { header: "Rating", accessor: "rating" },
  { header: "Status", accessor: "is_approved" },
];

const maxLengths: Record<string, number> = {
  testimonial: 35,
  name: 20,
  email: 25,
};

const AdminTableBody: React.FC = () => {
  const [error, setError] = useState("");
  const [testimonials, setTestimonials] = useState<TestimonialAdminData[]>([]);
  const [statuses, setStatuses] = useState<Record<number, string>>({});

  const handleStatusChange = (rowIdx: number, status: string) => {
      setStatuses((prev) => ({ ...prev, [rowIdx]: status }));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    loadData();
  }, []);

  if (error) {
    return (
      <tbody>
        <tr>
          <td colSpan={5} className="text-red-600 text-center py-4">{error}</td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="text-center text-base w-full">
      {testimonials.map((row, rowIdx) => (
        <tr
        key={rowIdx}
        className={`${rowIdx === testimonials.length - 1 ? "" : "border-b-neutral-300 border-b-1"}`}
        >
          {columns.map((col, colIdx) => {
            const cellValue = row[col.accessor as keyof TestimonialAdminData];
            const maxLength = maxLengths[col.accessor] ?? Infinity;

            const shouldTruncate =
              typeof cellValue === "string" && cellValue.length > maxLength;

            const shortText = shouldTruncate
              ? `${cellValue.slice(0, maxLength)}...`
              : cellValue;

            return (
              <td key={colIdx} className="px-4 py-2 text-center h-14">
                { col.accessor === "is_approved" ? (
                  statuses[rowIdx] ? (
                    <span>{statuses[rowIdx]}</span>
                  ) : (
                    <StatusColumnButtons onChange={(status) => handleStatusChange(rowIdx, status)}/>
                  )
                ) : shouldTruncate ? (
                  <TableCellDropDown shortText={shortText} fullText={cellValue} isReview={col.accessor === "testimonial"}/>
                ) : (
                  cellValue
                )}
              </td>
            );
          })}
          {/* <td className="px-4 py-2 text-center h-13">{testimonial.name}</td>
          <td className="px-4 py-2 text-center h-13">{testimonial.email}</td>
          <td className="px-4 py-2 text-center h-13">{testimonial.testimonial}</td>
          <td className="px-4 py-2 text-center h-13">{testimonial.rating}</td>
          <td className="px-4 py-2 text-center h-13">{testimonial.is_approved}</td> */}
        </tr>
      ))
      }
    </tbody>
  );
};

export default AdminTableBody;


// return (
//   <td key={colIdx} className="px-4 py-2 text-center h-14">
//     { col.accessor === "is_approved" ? (
//       statuses[rowIdx] ? (
//         <span>{statuses[rowIdx]}</span>
//       ) : (
//         <StatusColumnButtons rowId={row.id} onStatusUpdate={(status) => handleStatusChange(rowIdx, status)}/>
//       )
//     ) : shouldTruncate ? (
//       <TableCellDropDown shortText={String(shortText)} fullText={cellValue} isReview={col.accessor === "testimonial"}/>
//     ) : (
//       cellValue
//     )}
//   </td>
// );