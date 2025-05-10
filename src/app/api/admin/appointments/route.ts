import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export const GET = async () => {
  try {
    const { data, error } = await supabase
      .from("booking")
      .select()
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
    }

    const formattedData = data.map(booking => ({
      ...booking,
      date: formatDate(booking.created_at),
      time: formatTime(booking.created_at)
    }));

    return NextResponse.json(formattedData, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};

function formatDate(timestamp: string): string {
  try {
    const dateObj = new Date(timestamp);
    return dateObj.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    console.error("Error formatting date:", e);
    return "Invalid date";
  }
}

function formatTime(timestamp: string): string {
  try {
    const dateObj = new Date(timestamp);
    return dateObj.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  } catch (e) {
    console.error("Error formatting time:", e);
    return "Invalid time";
  }
}

export const POST = async (request: Request) => {
    try {
      const { name, email, service, date, time } = await request.json();
  
      if (!name || !email || !service || !date || !time) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }
  
      const { data, error } = await supabase.from("booking").insert([
        {
          name,
          email,
          service,
          date,
          time,
          status: "Pending", 
          managed_by: null, 
        },
      ]);
  
      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
      }
  
      return NextResponse.json({ success: true, data }, { status: 201 });
    } catch (error) {
      console.error("Server error:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  };

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
      .from("booking")
      .update({ status })
      .eq("booking_id", id);

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
