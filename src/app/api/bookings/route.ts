import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export const POST = async (request: Request) => {
  try {
    const { user_id, booking_id, invitee_id, name, email, service } =
      await request.json();

    if (!user_id || !booking_id || !invitee_id || !name || !email || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("booking")
      .insert([
        {
          user_id,
          booking_id,
          invitee_id,
          name,
          email,
          service,
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

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({ error: "Missing id param" }, { status: 400 });
    }

    // Get a specific item by ID
    const { data, error } = await supabase
      .from("booking")
      .select("*")
      .eq("user_id", user_id)
      .maybeSingle();

    console.log(data, error);
    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (data) {
      try {
        if (data.status === "cancelled") {
          const { error } = await supabase
            .from("booking")
            .delete()
            .eq("user_id", user_id);

          console.log(data, error);
          if (error) {
            console.error("Supabase error:", error);
            throw error;
          }
          return NextResponse.json({ success: false }, { status: 201 });
        }
      } catch (error) {
        console.error("Supabase error:", error);
        return NextResponse.json({ error: "Supabase Error." }, { status: 500 });
      }
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

export const DELETE = async (request: Request) => {
  try {
    const { booking_id } = await request.json();

    if (!booking_id) {
      return NextResponse.json(
        { error: "Missing booking_id" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("booking")
      .delete()
      .eq("booking_id", booking_id);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, message: "Booking deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
