import React from "react";
import TestimonialStatusButtons from "./TestimonialStatusButtons";
import TableCellDropDown from "../TableCellDropDown";
import { TestimonialAdminData } from "@/types/testimonials.type";
import { testimonialTableColumns } from "@/constants/adminTableColumns";

type Props = {
  row: TestimonialAdminData;
  isLastRow: boolean;
};

const maxLengths: Record<string, number> = {
  testimonial: 35,
  name: 20,
  email: 30,
};

const TestimonialTableRow: React.FC<Props> = ({ row, isLastRow }) => {
  return (
    <tr className={isLastRow ? "" : "border-b border-neutral-300"}>
      {testimonialTableColumns.map((col, colIdx) => {
        const cellValue = row[col.accessor as keyof TestimonialAdminData];
        const maxLength = maxLengths[col.accessor] ?? Infinity;
        const shouldTruncate =
          typeof cellValue === "string" && cellValue.length > maxLength;
        const shortText = shouldTruncate
          ? `${cellValue.slice(0, maxLength)}...`
          : cellValue;

        return (
          <td key={colIdx} className="px-4 py-2 text-center h-14">
            {col.accessor === "is_approved" ? (
              row.is_approved === "Accepted" || row.is_approved === "Declined" ? (
                <span>{row.is_approved}</span>
              ) : (
                <TestimonialStatusButtons rowId={row.testimonial_id} />
              )
            ) : col.accessor === "rating" ? (
              `${cellValue} Star${cellValue === "1" ? "" : "s"}`
            ) : shouldTruncate ? (
              <TableCellDropDown 
                shortText={shortText} 
                fullText={cellValue} 
                isReview={col.accessor === "testimonial"}
              />
            ) : (
              cellValue
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default TestimonialTableRow;