import { useState } from "react";
import { BookingFormData, SubmitBookingResult } from "@/types/bookings.type";

export const useSubmitBooking = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitBooking = async (
    formData: BookingFormData
  ): Promise<SubmitBookingResult> => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/bookings", {
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
      console.error("Error submitting booking:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to submit. Please try again.",
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitBooking, isSubmitting };
};
