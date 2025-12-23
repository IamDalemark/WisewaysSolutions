import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export const GET = async () => {
  try {
    const { data, error } = await supabase
      .from("refresh")
      .update({
        updates_count: supabase.rpc("increment", { x: 1 }), // optional if you create RPC
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        refresh: data,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
