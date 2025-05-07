
import { useState } from "react";

export const useUpdateAppointmentStatus = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStatus = async (id: string, status: "pending" | "Accepted" | "Declined") => {
    setIsUpdating(true);
    try {
      const response = await fetch("/api/admin/appointments", {
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