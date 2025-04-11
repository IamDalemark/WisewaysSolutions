import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export const POST = async (request: Request) => {
  try {
    const { name, email, rating, testimonial } = await request.json();

    if (!name || !email || !rating || !testimonial) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("testimonial")
      .insert([
        { name, email, rating, testimonial }
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};