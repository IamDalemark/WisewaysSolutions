import { useState } from "react";
import { TestimonialFormData } from "@/types/testimonials.type";
import { SubmitTestimonialResult } from "@/types/testimonials.type";

export const useCreateTestimonial = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitTestimonial = async (
    formData: TestimonialFormData
  ): Promise<SubmitTestimonialResult> => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit");
      }

      return { success: true };
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to submit. Please try again."
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitTestimonial, isSubmitting };
};