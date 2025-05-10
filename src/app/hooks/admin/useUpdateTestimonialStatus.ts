import { useToast } from "@/components/contexts/ToastContext";
import { useState } from "react";

export const useUpdateTestimonialStatus = () => {
  const { addToast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStatus = async (
    id: string,
    status: "pending" | "Accepted" | "Declined"
  ) => {
    setIsUpdating(true);
    try {
      const response = await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update status");
      }
      addToast("Successfully Updated Status!", "success");
      return { success: true };
    } catch (error) {
      addToast("Error Updating Status.", "error");
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateStatus, isUpdating };
};
