import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// for fetching testimonial data
export const GET = async () => {
  try {
    // this const gets all the data from supabase of the selected table (i.e testimonial)
    const { data, error } = await supabase
      .from("testimonial")
      .select()
      .order("submitted_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch testimonials" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

// for when either "Accept" or "Decline" button is press for status
export const PATCH = async (request: Request) => {
  try {
    const { id, status } = await request.json();

    if (!id || !status || !["Accepted", "Declined"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid or missing 'id' or 'status'" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("testimonial")
      .update({ is_approved: status })
      .eq("testimonial_id", id);

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json(
        { error: "Failed to update status" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
