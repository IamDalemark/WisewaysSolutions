
import { supabase } from "@/lib/supabaseClient";
import { TestimonialAdminData } from "@/types/testimonials.type";

export const fetchTestimonials = async (): Promise<TestimonialAdminData[]> => {
  const { data, error } = await supabase
    .from("testimonial")
    .select()
    .order("submitted_at", { ascending: false });

  if (error) {
    console.error("Fetch error:", error.message);
    throw new Error("Could not fetch testimonials");
  }

  return data as TestimonialAdminData[];
};
