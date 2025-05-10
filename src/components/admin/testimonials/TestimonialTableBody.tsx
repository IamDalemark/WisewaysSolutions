"use client";

import React, { useEffect, useState } from "react";
import { fetchTestimonials } from "@/app/hooks/admin/fetchTestimonials";
import { TestimonialAdminData } from "@/types/testimonials.type";
import TestimonialStatusButtons from "./TestimonialStatusButtons";
import TableCellDropDown from "../TableCellDropDown";
import { supabase } from "@/lib/supabaseClient";

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Testimonial", accessor: "testimonial" },
  { header: "Rating", accessor: "rating" },
  { header: "Status", accessor: "is_approved" },
];

const maxLengths: Record<string, number> = {
  name: 20,
  email: 30,
  testimonial: 35,
};

interface AdminTableBodyTestimonialProps {
  filters?: {
    name?: string;
    status?: string;
    rating?: string;
  };
}

const TestimonialTableBody: React.FC<AdminTableBodyTestimonialProps> = ({ filters = {} }) => {
  const [error, setError] = useState("");
  const [testimonials, setTestimonials] = useState<TestimonialAdminData[]>([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState<TestimonialAdminData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchTestimonials();
        setTestimonials(data);
        setFilteredTestimonials(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;

    let result = [...testimonials];

    if (filters.name) {
      result = result.filter(testimonial =>
        testimonial.name.toLowerCase().includes(filters.name!.toLowerCase())
      );
    }

    if (filters.status) {
      result = result.filter(testimonial => testimonial.is_approved === filters.status);
    }

    if (filters.rating) {
      result = result.filter(testimonial => 
        testimonial.rating.toString() === filters.rating
      );
    }

    setFilteredTestimonials(result);
  }, [filters, testimonials]);

  useEffect(() => {
    const channel = supabase
      .channel("testimonials-updates")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "testimonial",
        },
        (payload) => {
          const updated = payload.new as TestimonialAdminData;
          setTestimonials((prev) =>
            prev.map((t) =>
              t.testimonial_id === updated.testimonial_id ? updated : t
            )
          );
        }
      )
      .subscribe();
  
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} className="text-center py-4">
            Loading testimonials...
          </td>
        </tr>
      </tbody>
    );
  }

  if (error) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} className="text-red-600 text-center py-4">
            {error}
          </td>
        </tr>
      </tbody>
    );
  }

  if (filteredTestimonials.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} className="text-center py-4">
            No testimonials found
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="text-center text-sm w-full">
      {filteredTestimonials.map((row, rowIdx) => (
        <tr
          key={rowIdx}
          className={
            rowIdx === filteredTestimonials.length - 1 ? "" : "border-b border-neutral-300"
          }
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
                    shortText={String(shortText)}
                    fullText={cellValue as string}
                    isReview={col.accessor === "testimonial"}
                  />
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

export default TestimonialTableBody;