"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  CalendlyEvent,
  CalendlyResponse,
  PaginationData,
} from "@/types/calendly.type";

export default function CalendlyEvents() {
  const [events, setEvents] = useState<CalendlyEvent[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10), // 30 days ago
    endDate: new Date().toISOString().slice(0, 10), // today
  });

  const fetchEvents = useCallback(
    async (pageToken?: string) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({});

        if (dateRange.startDate) {
          params.append(
            "start_time",
            new Date(dateRange.startDate).toISOString()
          );
        }

        if (dateRange.endDate) {
          // Add a day to include all events on the end date
          const endDate = new Date(dateRange.endDate);
          endDate.setDate(endDate.getDate() + 1);
          params.append("end_time", endDate.toISOString());
        }

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
    [dateRange, setLoading, setError, setEvents, setPagination]
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  const handleNextPage = () => {
    if (pagination?.next_page_token) {
      fetchEvents(pagination.next_page_token);
    }
  };

  const handlePrevPage = () => {
    if (pagination?.previous_page_token) {
      fetchEvents(pagination.previous_page_token);
    }
  };

  // Get invitee information (name, email) from the first active invitee
  const getInviteeInfo = (event: CalendlyEvent) => {
    if (!event.invitees || event.invitees.length === 0) {
      return { name: "-", email: "-" };
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
    };
  };

  // Check if an event is considered "canceled"
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Calendly Events</h2>
        <button
          onClick={syncCalendly}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Syncing..." : "Sync with Calendly"}
        </button>
      </div>

      {/* Date filter controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={dateRange.startDate}
            onChange={handleDateChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={dateRange.endDate}
            onChange={handleDateChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={() => fetchEvents()}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No events found for the selected period
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => {
                  const inviteeInfo = getInviteeInfo(event);
                  const status = getEventStatusDisplay(event);

                  return (
                    <tr key={event.uri} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {inviteeInfo.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {inviteeInfo.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {event.name || event.event_type || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDateTime(event.start_time)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDateTime(event.end_time)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.className}`}
                        >
                          {status.text}
                        </span>
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
    </div>
  );
}
