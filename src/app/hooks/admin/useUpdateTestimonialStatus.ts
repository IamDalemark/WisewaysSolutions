
import { useState } from "react";

export const useUpdateTestimonialStatus = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStatus = async (id: string, status: "Accepted" | "Declined") => {
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to update status");
      }

      return { success: true };
    } catch (error) {
      console.error("Error updating status:", error);
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateStatus, isUpdating };
};