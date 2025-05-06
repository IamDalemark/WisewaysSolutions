
import { TestimonialAdminData } from "@/types/testimonials.type";

export const fetchTestimonials = async (): Promise<TestimonialAdminData[]> => {
  try {
    const response = await fetch("/api/admin/testimonials", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to fetch testimonials");
    }

    return result as TestimonialAdminData[];
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
