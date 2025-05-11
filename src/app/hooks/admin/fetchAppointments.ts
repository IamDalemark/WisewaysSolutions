import { BookingAdminData } from "@/types/bookings.type";

export const fetchAppointments= async (): Promise<BookingAdminData[]> => { 
  try {
    const response = await fetch("/api/admin/appointments", { 
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to fetch appointments"); 
    }

    return result as BookingAdminData[]; 
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};