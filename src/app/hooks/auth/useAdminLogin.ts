"use server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const JWT_KEY = process.env.JWT_KEY || "dev-secret-key";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function signInAdmin(email: string, password: string) {
  try {
    const { data, error } = await supabase
      .from("admin")
      .select("*");

    console.log("Supabase response data:", data); 
    console.error("Supabase error:", error);
    if (error) {
      console.error("Supabase error:", error);
      return { success: false, message: "An error occurred while retrieving data." };
    }

    if (!data || data.length === 0) {
      return { success: false, message: "Invalid email or password." };
    }

    const admin = data[0];

    if (admin.email !== email || admin.password !== password) {
      return { success: false, message: "Invalid email or password." };
    }

    const token = jwt.sign(
      {
        id: admin.admin_id,    
        email: admin.email,
        role: "admin",
      },
      JWT_KEY,
      { expiresIn: "2h" }
    );

    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set("token", token, { path: "/", httpOnly: true, secure: process.env.NODE_ENV === "production" });

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
