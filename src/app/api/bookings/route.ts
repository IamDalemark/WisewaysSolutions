import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
// import sendAppointmentEmailToAdmin from "@/emails/sendAppointmentEmailToAdmin";

export const POST = async (request: Request) => {
  try {
    const { name, email, service, date, time } = await request.json();

    if (!name || !email || !service || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure the date is stored as an ISO string (for compatibility)
    const isoDate = new Date(date).toISOString();

    const { data, error } = await supabase
      .from("booking")
      .insert([
        {
          name,
          email,
          service,
          date: isoDate,
          time,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // sendAppointmentEmailToAdmin({ service, name, email, date, time });
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
