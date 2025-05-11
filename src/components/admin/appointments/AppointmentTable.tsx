"use client";

import {
  CalendlyEvent,
  CalendlyResponse,
  PaginationData,
} from "@/types/calendly.type";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

interface AppointmentTableProps {
  onReschedule: (uri: string) => void;
  onCancel: (uri: string) => void;
}

const AppointmentTable = ({
  onReschedule,
  onCancel,
}: AppointmentTableProps) => {
  const [events, setEvents] = useState<CalendlyEvent[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(
    async (pageToken?: string) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          count: "100",
        });

        if (pageToken) {
          params.append("page_token", pageToken);
        }

        const response = await axios.get<CalendlyResponse>(
          `/api/calendly/events?${params.toString()}`
        );

        // First, check the structure of the response
        let eventCollection: CalendlyEvent[] = [];
        let paginationData: PaginationData | null = null;

        // Handle different possible response structures
        if (response.data.collection) {
          eventCollection = response.data.collection;
          paginationData = response.data.pagination || null;
        } else if (response.data.data?.collection) {
          eventCollection = response.data.data.collection;
          paginationData = response.data.data.pagination || null;
        } else {
          // If no collection is found, assume the response itself is the collection
          eventCollection = Array.isArray(response.data) ? response.data : [];
        }

        setEvents(eventCollection);
        setPagination(paginationData);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setEvents, setPagination]
  );

  const syncCalendly = async () => {
    try {
      setLoading(true);
      await axios.get("/api/calendly/events");
      // Reload events after sync
      fetchEvents();
    } catch (error) {
      console.error("Error syncing with Calendly:", error);
      setError("Failed to sync with Calendly. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleNextPage = () => {
    if (pagination?.next_page_token) {
      fetchEvents(pagination.next_page_token);
    }
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  const handlePrevPage = () => {
    if (pagination?.previous_page_token) {
      fetchEvents(pagination.previous_page_token);
    }
  };

  const getInviteeInfo = (event: CalendlyEvent) => {
    if (!event.invitees || event.invitees.length === 0) {
      return { name: "-", email: "-", uri: "-" };
    }

    // Try to find a non-canceled invitee
    const activeInvitee = event.invitees.find(
      (inv) => inv.status !== "canceled" && !inv.has_no_show
    );

    // If no active invitee, just take the first one
    const invitee = activeInvitee || event.invitees[0];

    return {
      name: invitee.name || "-",
      email: invitee.email || "-",
      uri: invitee.uri || "-",
    };
  };

  const isEventCanceled = (event: CalendlyEvent): boolean => {
    return (
      event.status === "canceled" ||
      !!event.invitees?.some((inv) => inv.canceled || inv.status === "canceled")
    );
  };

  // Check if an event has a "no show"
  const hasNoShow = (event: CalendlyEvent): boolean => {
    return !!event.invitees?.some((inv) => inv.has_no_show);
  };

  // Determine event status display
  const getEventStatusDisplay = (
    event: CalendlyEvent
  ): {
    text: string;
    className: string;
  } => {
    if (isEventCanceled(event)) {
      return {
        text: "Canceled",
        className: "bg-red-100 text-red-800",
      };
    } else if (event.rescheduled) {
      return {
        text: "Rescheduled",
        className: "bg-yellow-100 text-yellow-800",
      };
    } else if (hasNoShow(event)) {
      return {
        text: "No Show",
        className: "bg-purple-100 text-purple-800",
      };
    } else if (event.status === "active") {
      return {
        text: "Active",
        className: "bg-green-100 text-green-800",
      };
    } else {
      return {
        text: event.status.charAt(0).toUpperCase() + event.status.slice(1),
        className: "bg-gray-100 text-gray-800",
      };
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
    );
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No scheduled events found.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <div className="flex justify-end w-full mb-4">
              <button
                onClick={syncCalendly}
                className="
                bg-blue-green
                hover:bg-blue-600
                text-white
                font-medium
                px-4
                py-2
                rounded-lg
                transition-colors
                duration-200
                flex
                items-center
                shadow-sm"
              >
                Sync with Calendly
              </button>
            </div>
            <table className="bg-[#f3f3f3] w-full rounded-xl">
              <thead>
                <tr className="bg-blue-green text-[#f3f3f3] overflow-hidden">
                  <th className="px-4 md:px-8 py-3 text-left rounded-tl-xl">
                    Name
                  </th>
                  <th className="px-4 md:px-8 py-3 text-left hidden lg:table-cell">
                    Email
                  </th>
                  <th className="px-4 md:px-8 py-3 text-left">Start Time</th>
                  <th className="px-4 md:px-8 py-3 text-left hidden md:table-cell">
                    End Time
                  </th>
                  <th className="px-4 md:px-4 py-3 text-center hidden sm:table-cell">
                    Status
                  </th>
                  <th className="px-4 md:px-8 py-3 text-left rounded-tr-xl">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => {
                  const inviteeInfo = getInviteeInfo(event);
                  const status = getEventStatusDisplay(event);

                  return (
                    <tr
                      key={event.uri}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="px-4 md:px-8 py-4 text-sm font-medium">
                        {inviteeInfo.name}
                      </td>
                      <td className="px-4 md:px-8 py-4 text-sm hidden lg:table-cell">
                        {inviteeInfo.email}
                      </td>
                      <td className="px-4 md:px-8 py-4 text-sm">
                        {formatDateTime(event.start_time)}
                      </td>
                      <td className="px-4 md:px-8 py-4 text-sm hidden md:table-cell">
                        {formatDateTime(event.end_time)}
                      </td>
                      <td className="px-4 md:px-4 py-4 text-center hidden sm:table-cell">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${status.className}`}
                        >
                          {status.text}
                        </span>
                      </td>
                      <td className="px-4 md:px-8 py-4 text-sm">
                        {status.text == "Canceled" ||
                        status.text == "No Show" ? (
                          <></>
                        ) : (
                          <div className="flex space-x-2 min-w-full justify-around">
                            <button
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-3 rounded text-xs"
                              onClick={() => onReschedule(inviteeInfo.uri)}
                            >
                              Reschedule
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-3 rounded text-xs"
                              onClick={() => onCancel(inviteeInfo.uri)}
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          {pagination && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrevPage}
                disabled={!pagination.previous_page_token}
                className={`px-4 py-2 border rounded-md ${
                  pagination.previous_page_token
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Previous
              </button>
              <span className="text-sm text-gray-500">
                Showing {events.length} of {pagination.count} events
              </span>
              <button
                onClick={handleNextPage}
                disabled={!pagination.next_page_token}
                className={`px-4 py-2 border rounded-md ${
                  pagination.next_page_token
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AppointmentTable;
