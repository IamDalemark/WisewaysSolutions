"use client";

import React, { useEffect, useState } from "react";
import { fetchTestimonials } from "@/app/hooks/admin/fetchTestimonials";
import { TestimonialAdminData } from "@/types/testimonials.type";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";
import TestimonialTableRow from "./TestimonialTableRow";

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Testimonial", accessor: "testimonial" },
  { header: "Rating", accessor: "rating" },
  { header: "Status", accessor: "is_approved" },
];

interface AdminTableBodyTestimonialProps {
  filters?: {
    name?: string;
    status?: string;
    rating?: string;
  };
  currentPage: number;
  setTotalPages: (n: number) => void;
}

const ROWS_PER_PAGE = 12;

export const TestimonialTableBody: React.FC<AdminTableBodyTestimonialProps> = ({
  filters = {}, currentPage, setTotalPages
}) => {
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
      result = result.filter((testimonial) =>
        testimonial.name.toLowerCase().includes(filters.name!.toLowerCase())
      );
      console.log(result);
    }

    if (filters.status) {
      result = result.filter(
        (testimonial) => testimonial.is_approved === filters.status
      );
    }

    if (filters.rating) {
      result = result.filter(
        (testimonial) => testimonial.rating.toString() === filters.rating
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
        async () => {
        try {
          const updatedData = await fetchTestimonials();
          setTestimonials(updatedData);
        } catch (err) {
          console.error("Failed to fetch updated testimonials:", err);
        }
      }
    )
    .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const total = Math.ceil(filteredTestimonials.length / ROWS_PER_PAGE);
    setTotalPages(total);
  }, [filteredTestimonials, setTotalPages]);

  const paginatedTestimonials = filteredTestimonials.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  if (error) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length}
            className="text-red-600 text-center py-4"
          >
            {error}
          </td>
        </tr>
      </tbody>
    );
  }

  if (loading) {
    return (
      <tbody>
        <tr className="w-full">
          <td colSpan={5} className="py-4">
            <div className="flex justify-center items-center text-gray-500 gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading testimonials...</span>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  if (paginatedTestimonials.length === 0) {
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
    <tbody className="w-full">
      {paginatedTestimonials.map((row, rowIdx) => (
        <TestimonialTableRow
          key={row.testimonial_id}
          row={row}
          isLastRow={rowIdx === testimonials.length - 1}
        />
      ))}
    </tbody>
  );
};
