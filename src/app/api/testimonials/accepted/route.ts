import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
export const GET = async () => {
  const { data, error } = await supabase
    .from("testimonial")
    .select("*")
    .eq("is_approved", "Accepted");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
};
