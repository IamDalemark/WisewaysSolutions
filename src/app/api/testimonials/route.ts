import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import sendEmailToAdmin from "@/emails/sendEmailToAdmin";
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

    const testimonial_id = data?.[0]?.testimonial_id;
    sendEmailToAdmin({ name, testimonial, rating, email, testimonial_id });

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const testimonial_id = searchParams.get("testimonial_id");
  const is_approved = searchParams.get("is_approved");

  if (
    !testimonial_id ||
    !["approved", "rejected"].includes(is_approved || "")
  ) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }
  console.log("test_id", testimonial_id, "is+approv", is_approved);
  const { error } = await supabase
    .from("testimonial")
    .update({ is_approved })
    .eq("testimonial_id", testimonial_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new Response(
    `Testimonial ${is_approved}. This has been processed successfully.`
  );
};
