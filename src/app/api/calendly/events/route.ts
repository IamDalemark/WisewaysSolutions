// app/api/calendly/sync/route.ts
import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabaseClient";

// Interface definitions
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
  cancellation?: {
    canceled_by: string;
    reason: string;
    canceler_type: string;
    created_at: string;
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
  old_invitee?: string | null;
  scheduled_at: string;
  cancel_url: string;
  reschedule_url: string;
  payment?: object | null;
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
  invitee_id: string;
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

interface EnhancedInvitee extends CalendlyInvitee {
  canceled: boolean;
  has_no_show: boolean;
}

interface EventWithInvitees extends CalendlyEvent {
  invitees: EnhancedInvitee[];
}

interface SyncStats {
  processedEvents: number;
  activeEvents: number;
  canceledEvents: number;
  bookingsUpdated: number;
  bookingsMarkedCanceled: number;
  bookingsLinkUpdated: number;
  errors: number;
}

function extractIdFromUri(uri: string): string | null {
  const match = uri.match(/\/([^\/]+)$/);
  return match ? match[1] : null;
}

export async function GET() {
  // Get the access token from cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("calendly_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    // STEP 1: Get user information to get the user URI
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
    const stats: SyncStats = {
      processedEvents: 0,
      activeEvents: 0,
      canceledEvents: 0,
      bookingsUpdated: 0,
      bookingsMarkedCanceled: 0,
      bookingsLinkUpdated: 0,
      errors: 0,
    };

    // Get current date/time for filtering
    const currentDate = new Date();

    // STEP 1: Fetch scheduled events from Calendly (active and canceled)
    const eventsQueryParams = new URLSearchParams({
      user: userUri,
      count: "100",
    });

    const eventsResponse = await axios.get<CalendlyEventsResponse>(
      `${
        process.env.CALENDLY_API_BASE_URL
      }scheduled_events?${eventsQueryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Fetched events:", eventsResponse.data.collection.length);

    // STEP 1: Fetch all bookings from the database
    const { data: bookings, error: bookingsError } = await supabase
      .from("booking")
      .select("*");

    if (bookingsError) {
      console.error("Supabase fetch error:", bookingsError);
      return NextResponse.json(
        { error: "Failed to fetch bookings" },
        { status: 500 }
      );
    }

    console.log("Fetched bookings:", bookings.length);

    // Create an email lookup map for bookings
    const bookingEmailMap = new Map<string, Booking>();
    bookings.forEach((booking: Booking) => {
      bookingEmailMap.set(booking.email.toLowerCase(), booking);
    });

    // STEP 2: Process each event to get invitee emails
    const eventsWithInvitees: EventWithInvitees[] = [];

    for (const event of eventsResponse.data.collection) {
      stats.processedEvents++;
      try {
        // Extract event ID
        const eventId = extractIdFromUri(event.uri);
        if (!eventId) continue;

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

        // Map invitees with additional properties
        const invitees: EnhancedInvitee[] =
          inviteesResponse.data.collection.map((invitee) => ({
            ...invitee,
            canceled: invitee.status === "canceled",
            has_no_show: !!invitee.no_show,
          }));

        eventsWithInvitees.push({
          ...event,
          invitees,
        });

        if (event.status === "canceled") {
          stats.canceledEvents++;
        } else {
          stats.activeEvents++;
        }
      } catch (err) {
        console.error("Error processing event:", err);
        stats.errors++;
      }
    }

    // STEP 3: First process active events to update IDs
    // Sort events to process active ones first
    const sortedEvents = [...eventsWithInvitees].sort((a, b) => {
      // Active events come first (status is not "canceled")
      if (a.status !== "canceled" && b.status === "canceled") return -1;
      if (a.status === "canceled" && b.status !== "canceled") return 1;

      return (
        new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
      );
    });

    // First pass: Process active events to update IDs
    const processedEmails = new Set<string>();
    const bookingsToUpdate: {
      id: string;
      updates: {
        booking_id?: string;
        invitee_id?: string;
        status?: string;
      };
    }[] = [];

    // First pass - update booking_id and invitee_id for active events
    for (const event of sortedEvents) {
      // Skip canceled / no show events in first pass
      if (
        event.status === "canceled" ||
        event.invitees.some((inv) => inv.has_no_show)
      )
        continue;

      console.log(event);

      // Process invitees for this event
      for (const invitee of event.invitees) {
        // Skip canceled invitees in the first pass
        if (invitee.status === "canceled") continue;

        const inviteeEmail = invitee.email.toLowerCase();
        const matchingBooking = bookingEmailMap.get(inviteeEmail);

        if (matchingBooking) {
          const eventId = extractIdFromUri(event.uri);
          const inviteeId = extractIdFromUri(invitee.uri);

          // Mark this email as processed so we don't update it again with canceled events
          processedEmails.add(inviteeEmail);

          const updates: {
            booking_id?: string;
            invitee_id?: string;
            status?: string;
          } = {};
          let needsUpdate = false;

          // Update Calendly IDs if they're missing or different
          if (eventId && matchingBooking.booking_id !== eventId) {
            updates.booking_id = eventId;
            needsUpdate = true;
          }

          if (inviteeId && matchingBooking.invitee_id !== inviteeId) {
            updates.invitee_id = inviteeId;
            needsUpdate = true;
          }

          // Check if the event date is in the past to update status
          const eventDate = new Date(event.start_time);
          const isPastEvent = eventDate < currentDate;

          if (invitee.has_no_show) {
            updates.status = "no_show";
            needsUpdate = true;
          } else if (isPastEvent) {
            updates.status = "completed";
            needsUpdate = true;
          } else {
            updates.status = "pending";
            needsUpdate = true;
          }

          // If there are updates to make
          if (needsUpdate) {
            bookingsToUpdate.push({
              id: matchingBooking.booking_id,
              updates,
            });

            if (updates.booking_id || updates.invitee_id) {
              stats.bookingsLinkUpdated++;
            }
          }
        }
      }
    }

    // Second pass: Process canceled events for emails not already processed
    for (const event of sortedEvents) {
      // Skip active events in second pass
      if (
        event.status !== "canceled" &&
        !event.invitees.some((inv) => inv.has_no_show)
      )
        continue;

      // Process invitees for this event
      for (const invitee of event.invitees) {
        const inviteeEmail = invitee.email.toLowerCase();

        // Skip if this email was already processed in the active events pass
        if (processedEmails.has(inviteeEmail)) continue;

        const matchingBooking = bookingEmailMap.get(inviteeEmail);

        if (matchingBooking) {
          const eventId = extractIdFromUri(event.uri);
          const inviteeId = extractIdFromUri(invitee.uri);

          const updates: {
            booking_id?: string;
            invitee_id?: string;
            status?: string;
          } = {};
          let needsUpdate = false;

          // Update Calendly IDs if needed
          if (eventId && matchingBooking.booking_id !== eventId) {
            updates.booking_id = eventId;
            needsUpdate = true;
          }

          if (inviteeId && matchingBooking.invitee_id !== inviteeId) {
            updates.invitee_id = inviteeId;
            needsUpdate = true;
          }

          // Mark as canceled
          updates.status = "cancelled";
          needsUpdate = true;

          // If there are updates to make
          if (needsUpdate) {
            bookingsToUpdate.push({
              id: matchingBooking.booking_id,
              updates,
            });
            stats.bookingsMarkedCanceled++;

            if (updates.booking_id || updates.invitee_id) {
              stats.bookingsLinkUpdated++;
            }
          }
        }
      }
    }

    // STEP 4: Apply all updates at once
    for (const update of bookingsToUpdate) {
      try {
        const { error: updateError } = await supabase
          .from("booking")
          .update(update.updates)
          .eq("booking_id", update.id);

        if (updateError) {
          console.error("Error updating booking:", updateError);
          stats.errors++;
        } else {
          stats.bookingsUpdated++;
        }
      } catch (err) {
        console.error("Exception updating booking:", err);
        stats.errors++;
      }
    }

    // Return statistics about the sync operation
    return NextResponse.json({
      data: {
        collection: sortedEvents,
        pagination: eventsResponse.data.pagination,
      },
      success: true,
      stats,
      message: `Sync completed: ${stats.bookingsUpdated} bookings updated, ${stats.bookingsMarkedCanceled} marked as canceled, ${stats.bookingsLinkUpdated} links updated`,
    });
  } catch (error) {
    console.error("Error syncing Calendly events:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to sync Calendly events",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
