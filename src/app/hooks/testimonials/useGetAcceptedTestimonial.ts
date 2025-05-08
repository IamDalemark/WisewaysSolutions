import { useState, useEffect } from "react";
import { Testimonial } from "@/types/testimonials.type";

interface UseAcceptedTestimonialsResult {
  testimonials: Testimonial[];
  loading: boolean;
}

export const useAcceptedTestimonials = (): UseAcceptedTestimonialsResult => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials/accepted");

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.error || "Failed to fetch testimonials");
        }

        const { data } = await response.json();
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return { testimonials, loading };
};
