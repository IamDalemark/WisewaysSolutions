import { supabase } from "@/lib/supabaseClient";
import { BookingFormData } from "@/types/bookings.type";

export const fetchAppointments = async (): Promise<BookingFormData[]> => {
  const { data, error } = await supabase
    .from("booking") 
    .select()
    .order("date", { ascending: true });

  if (error) {
    console.error("Fetch error:", error.message);
    throw new Error("Could not fetch appointments");
  }

  return data as BookingFormData[];
};