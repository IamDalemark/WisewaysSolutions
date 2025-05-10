import { NextResponse } from "next/server";

export async function GET() {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.CLIENT_ID!,
    redirect_uri: process.env.REDIRECT_URI!,
  });

  return NextResponse.redirect(
    `${process.env.CALENDLY_AUTH_BASE_URL}oauth/authorize?${params}`
  );
}