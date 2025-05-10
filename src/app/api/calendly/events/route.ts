import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabaseClient";

interface CalendlyEvent {
  uri: string;
  name: string;
  status: string;
  start_time: string;
  end_time: string;
  event_type: string;
  location?: {
    type: string;
    location?: string;
    join_url?: string;
    status?: string;
  };
  calendar_event?: {
    external_id: string;
    kind: string;
  };
  cancellation: {
    canceled_by: string;
    reason: string;
    canceler_type: string;
  };
  invitees_counter: {
    total: number;
    active: number;
    limit: number;
  };
  rescheduled: boolean;
  created_at: string;
  updated_at: string;
  event_memberships: Array<{
    user: string;
  }>;
  event_guests: Array<{
    email: string;
    name?: string;
  }>;
  meeting_notes_html: string | null;
  meeting_notes_plain: string | null;
}

interface Booking {
  booking_id: string;
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  status: string;
  managed_by: string | null;
  created_at: string;
}

interface CalendlyEventsResponse {
  collection: CalendlyEvent[];
  pagination: {
    count: number;
    next_page: string | null;
    previous_page: string | null;
    next_page_token: string | null;
    previous_page_token: string | null;
  };
}

interface CalendlyInvitee {
  email: string;
  name: string;
  status: string;
  questions_and_answers: Array<{
    question: string;
    answer: string;
  }>;
  created_at: string;
  updated_at: string;
  tracking: {
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    utm_content: string | null;
    utm_term: string | null;
    salesforce_uuid: string | null;
  };
  timezone: string;
  uri: string;
  rescheduled: boolean;
  no_show?: {
    uri: string;
    created_at: string;
  };
}

interface CalendlyInviteesResponse {
  collection: CalendlyInvitee[];
  pagination: {
    count: number;
    next_page: string | null;
    previous_page: string | null;
    next_page_token: string | null;
    previous_page_token: string | null;
  };
}

export async function GET(req: NextRequest) {
  // Get the access token from cookies
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("calendly_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    // First, get user information to get the user URI
    const userResponse = await axios.get(
      `${process.env.CALENDLY_API_BASE_URL}users/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const userUri = userResponse.data.resource.uri;

    // Parse query parameters
    const url = new URL(req.url);
    const count = url.searchParams.get("count") || "50";
    const status = url.searchParams.get("status") || ""; // active, canceled
    const startTime = url.searchParams.get("start_time") || "";
    const endTime = url.searchParams.get("end_time") || "";
    const pageToken = url.searchParams.get("page_token") || "";

    // Build query parameters
    const queryParams = new URLSearchParams({
      user: userUri,
      count,
      status,
    });

    if (startTime) queryParams.append("min_start_time", startTime);
    if (endTime) queryParams.append("max_start_time", endTime);
    if (pageToken) queryParams.append("page_token", pageToken);
    if (status) queryParams.append("status", status);

    // Get scheduled events from Calendly
    const eventsResponse = await axios.get<CalendlyEventsResponse>(
      `${
        process.env.CALENDLY_API_BASE_URL
      }scheduled_events?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("eventsResponse", eventsResponse.data.collection);
    // Fetch bookings from the database
    const { data: bookings, error } = await supabase
      .from("booking")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch bookings" },
        { status: 500 }
      );
    }

    // Create an email lookup map for bookings
    const bookingEmailMap = new Map();
    bookings.forEach((booking: Booking) => {
      // Store booking by lowercase email for case-insensitive matching
      bookingEmailMap.set(booking.email.toLowerCase(), booking);
    });

    // Process each event to get invitee emails
    const eventsWithInvitees = await Promise.all(
      eventsResponse.data.collection.map(async (event) => {
        try {
          // Extract event ID
          const eventIdMatch = event.uri.match(/\/scheduled_events\/([^\/]+)$/);
          const eventId = eventIdMatch ? eventIdMatch[1] : null;

          if (!eventId) return { ...event, invitees: [] };

          // Get invitees for this event
          const inviteesResponse = await axios.get<CalendlyInviteesResponse>(
            `${process.env.CALENDLY_API_BASE_URL}scheduled_events/${eventId}/invitees`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("invitees", inviteesResponse.data.collection);
          return {
            ...event,
            invitees: inviteesResponse.data.collection.map((invitee) => ({
              ...invitee,
              // Pass through the original values but ensure they're boolean
              rescheduled: Boolean(invitee.rescheduled),
              canceled: invitee.status === "canceled",
              no_show: invitee.no_show ? true : false,
            })),
          };
        } catch (err) {
          console.error("Error fetching invitees for event:", err);
          return { ...event, invitees: [] };
        }
      })
    );

    // Filter events based on email matching
    const matchedEvents = eventsWithInvitees.filter((event) => {
      // Check if any invitee's email matches a booking email
      return event.invitees?.some((invitee) =>
        bookingEmailMap.has(invitee.email.toLowerCase())
      );
    });

    // Enhance matched events with booking information
    const enhancedMatchedEvents = matchedEvents.map((event) => {
      const matchingInvitee = event.invitees?.find((invitee) =>
        bookingEmailMap.has(invitee.email.toLowerCase())
      );

      const matchingBooking = matchingInvitee
        ? bookingEmailMap.get(matchingInvitee.email.toLowerCase())
        : null;

      return {
        ...event,
        booking: matchingBooking
          ? {
              id: matchingBooking.booking_id,
              name: matchingBooking.name,
              email: matchingBooking.email,
              service: matchingBooking.service,
              status: matchingBooking.status,
              // The event may have been rescheduled at the event level or invitee level
              rescheduled:
                event.rescheduled || matchingInvitee?.rescheduled === true,
              canceled: matchingInvitee?.status === "canceled",
              no_show: matchingInvitee?.no_show ? true : false,
            }
          : null,
      };
    });

    // Return the matched events without the invitees data (to keep response clean)
    const cleanedEvents = enhancedMatchedEvents.map(({ ...rest }) => rest);

    return NextResponse.json({
      collection: cleanedEvents,
      pagination: eventsResponse.data.pagination,
      matchCount: matchedEvents.length,
      totalEvents: eventsResponse.data.collection.length,
    });
  } catch {
    console.error("Error fetching Calendly events:");

    return NextResponse.json(
      { error: "Failed to fetch Calendly events" },
      { status: 500 }
    );
  }
}
