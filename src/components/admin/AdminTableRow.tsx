import React from "react";
import StatusColumnButtons from "./StatusColumnButtons";
import TableCellDropDown from "./TableCellDropDown";
import { TestimonialAdminData } from "@/types/testimonials.type";
import { testimonialColumns } from "@/app/admin/(dashboard)/testimonials/page";

type Props = {
  row: TestimonialAdminData;
  isLastRow: boolean;
};

const maxLengths: Record<string, number> = {
  testimonial: 35,
  name: 20,
  email: 30,
};

const AdminTableRow: React.FC<Props> = ({row, isLastRow}) => {
    return (
        <tr
        className={`${isLastRow ? "" : "border-b-neutral-300 border-b-1"}`}
        >
          {testimonialColumns.map((col, colIdx) => {
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
                    row.is_approved === "Accepted" || row.is_approved === "Declined" ? (
                      <span>{row.is_approved}</span>
                    ) : (
                      <StatusColumnButtons rowId={row.testimonial_id} />
                    )
                  ) : shouldTruncate ? (
                    <TableCellDropDown shortText={shortText} fullText={cellValue} isReview={col.accessor === "testimonial"}/>
                  ) : (
                    cellValue
                  )}
                </td>
              );
          })}
        </tr>
    );
};

export default AdminTableRow;

