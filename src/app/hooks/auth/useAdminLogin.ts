"use server";

import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";  

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function signInAdmin(email: string, password: string) {
  try {
    const { data, error } = await supabase
      .from("admin")
      .select("*")
      .eq("email", email)
      .single();  

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, message: "An error occurred while retrieving data." };
    }

    if (!data) {
      return { success: false, message: "Invalid email or password." };
    }

    const admin = data;

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return { success: false, message: "Invalid email or password." };
    }

    const token = `${admin.admin_id}-${admin.email}`;

    return {
      success: true,
      token,
      message: "Login successful",
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An unexpected error occurred during login." };
  }
}
