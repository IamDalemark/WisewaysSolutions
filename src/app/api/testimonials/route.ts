import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
// import sendEmailToAdmin from "@/emails/sendEmailToAdmin";
export const POST = async (request: Request) => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { name, email, rating, testimonial } = await request.json();

    if (!name || !email || !rating || !testimonial) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("testimonial")
      .insert([{ name, email, rating, testimonial }])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error }, { status: 500 });
    }

    // sendEmailToAdmin({ name, testimonial, rating, email });

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
