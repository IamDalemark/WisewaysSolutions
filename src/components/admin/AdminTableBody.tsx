"use client";

import React, { useState, useEffect } from "react";
import { fetchTestimonials } from "@/app/hooks/admin/fetchTestimonials";
import { TestimonialAdminData } from "@/types/testimonials.type";
import { supabase } from "@/lib/supabaseClient";
import AdminTableRow from "./AdminTableRow";

const AdminTableBody: React.FC = () => {
  const [error, setError] = useState("");
  const [testimonials, setTestimonials] = useState<TestimonialAdminData[]>([]);

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
    <tbody className="text-center text-sm w-full">
      {testimonials.map((row, rowIdx) => (
        <AdminTableRow key={row.testimonial_id} row={row} isLastRow={rowIdx === testimonials.length - 1} />
      ))
      }
    </tbody>
  );
};

export default AdminTableBody;