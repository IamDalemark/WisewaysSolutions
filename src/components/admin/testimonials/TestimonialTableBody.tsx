"use client";

import React, { useState, useEffect } from "react";
import { fetchTestimonials } from "@/app/hooks/admin/fetchTestimonials";
import { TestimonialAdminData } from "@/types/testimonials.type";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";
import TestimonialTableRow from "./TestimonialTableRow";

const TestimonialTableBody: React.FC = () => {
  const [error, setError] = useState("");
  const [testimonials, setTestimonials] = useState<TestimonialAdminData[] | null>(null);

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
            prev ? 
              prev.map((t) => t.testimonial_id === updated.testimonial_id ? updated : t)
              : [updated]
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

  if (testimonials === null) {
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

  return (
    <tbody className="w-full">
      {testimonials.map((row, rowIdx) => (
        <TestimonialTableRow 
          key={row.testimonial_id} 
          row={row} 
          isLastRow={rowIdx === testimonials.length - 1} 
        />
      ))
      }
    </tbody>
  );
};

export default TestimonialTableBody;