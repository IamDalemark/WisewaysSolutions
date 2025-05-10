"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
interface Booking {
  id: string;
  name: string;
  email: string;
  service: string;
  status: string;
}

interface CalendlyEvent {
  uri: string;
  name: string;
  status: string;
  start_time: string;
  end_time: string;
  event_type: string;
  invitees_counter: {
    total: number;
    active: number;
    limit: number;
  };
  created_at: string;
  updated_at: string;
  rescheduled?: boolean;
  canceled?: boolean;
  booking?: Booking | null;
}
interface PaginationData {
  count: number;
  next_page: string | null;
  previous_page: string | null;
  next_page_token: string | null;
  previous_page_token: string | null;
}

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
        const params = new URLSearchParams({
          count: "10",
          status: "active",
        });

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

        const response = await axios.get(
          `/api/calendly/events?${params.toString()}`
        );

        setEvents(response.data.collection);
        setPagination(response.data.pagination);
      } catch {
        console.log("Error");
      } finally {
        setLoading(false);
      }
    },
    [dateRange, setLoading, setError, setEvents, setPagination]
  );

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

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Calendly Events</h2>

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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.uri} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {event.booking?.name || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {event.booking?.email || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {event.booking?.service || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(event.start_time)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(event.end_time)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          event.canceled
                            ? "bg-red-100 text-red-800"
                            : event.rescheduled
                            ? "bg-yellow-100 text-yellow-800"
                            : event.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {event.canceled
                          ? "Canceled"
                          : event.rescheduled
                          ? "Rescheduled"
                          : event.status.charAt(0).toUpperCase() +
                            event.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
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
