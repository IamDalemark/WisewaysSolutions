import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  console.log(code);
  if (!code) {
    return Response.redirect(
      "http://localhost:3000/admin/login?error=missing_code"
    );
  }

  try {
    const tokenRes = await axios.post(
      `${process.env.CALENDLY_AUTH_BASE_URL}oauth/token`,
      {
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    (await cookies()).set("calendly_access_token", tokenRes.data.access_token, {
      httpOnly: true,
      path: "/",
    });
    console.log("Token response:", tokenRes.data);
    return NextResponse.redirect("http://localhost:3000/admin/testimonials");
  } catch (err) {
    console.error("Calendly login error:", err);
    return Response.redirect(
      "http://localhost:3000/admin/login?error=oauth_failed"
    );
  }
}
