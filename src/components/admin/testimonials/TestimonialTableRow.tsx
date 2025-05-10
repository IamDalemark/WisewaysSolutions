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
  testimonial: 40,
  name: 20,
  email: 30,
};

const TestimonialTableRow: React.FC<Props> = ({row, isLastRow}) => {
  return (
    <tr
    className={`${isLastRow ? "" : "border-b-neutral-300 border-b-2 md:border-b-1"}
    ${row.is_approved === "Declined" ? "text-gray-400" : ""}
    text-sm xl:text-base`}
    >
      {testimonialTableColumns.map((col, colIdx) => {
        const cellValue = row[col.accessor as keyof TestimonialAdminData];
        const maxLength = maxLengths[col.accessor] ?? Infinity;

        const shouldTruncate =
          typeof cellValue === "string" && cellValue.length > maxLength;

        const shortText = shouldTruncate
          ? `${cellValue.slice(0, maxLength)}...`
          : cellValue;

          return (
            <td key={colIdx} className={`${col.header === "Rating" || col.header === "Status" ? 
              "text-center px-4" : "text-left pl-4 pr-3 md:pl-8 md:pr-4"}
            ${col.header === "User" ? "text-base" : ""}
            ${col.header === "Email" ? "hidden lg:table-cell" : ""} 
            ${col.header === "Status" ? "hidden md:table-cell" : ""}
            ${col.header === "Rating" ? "hidden sm:table-cell w-[5%]" : ""}
            ${col.header === "Review" ? "w-[55%] sm:w-auto" : ""}
            pt-4 sm:pt-0 h-27 md:h-18 lg:h-14 align-top sm:align-middle`}>
            
              { col.header === "Status" ? (
                row.is_approved === "Accepted" || row.is_approved === "Declined" ? (
                  <span>{row.is_approved}</span>
                ) : (
                  <TestimonialStatusButtons rowId={row.testimonial_id} />
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
                    {row.is_approved === "Accepted" || row.is_approved === "Declined" ? (
                      <span>{row.is_approved}</span>
                    ) : (
                      <TestimonialStatusButtons rowId={row.testimonial_id} />
                    )}
                  </dd>
                </dl>
              )}
              
              {/* Rating to appear in Review's column when in smaller screens */}
              {col.header === "Review" && (
                <dl className="sm:hidden mt-1">
                  <dt className="hidden">Rating</dt>
                  <dd className="text-gray-500 font-medium">Rating: {row.rating}</dd>
                </dl>
              )}
            </td>
          );
      })}
    </tr>
  );
};

export default TestimonialTableRow;