"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Page() {
  const [status, setStatus] = useState("Checking connection...");

  useEffect(() => {
    const testConnection = async () => {
      const { error } = await supabase.from("admin").select("*").limit(1);
      if (error) setStatus("Error connecting to Supabase");
      else setStatus("Connected to Supabase!");
    };

    testConnection();
  }, []);

  return <h1>{status}</h1>;
}