"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import LandingPage from "./pages/LandingPage";

export default function Page() {
  return (
    <div className="scroll-smooth">
      <LandingPage />
      <h1>{status}</h1>
      this is the landing page
    </div>
  );
}
