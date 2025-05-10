"use client";

import React, { useEffect, useState } from "react";
import { fetchAppointments } from "@/app/hooks/admin/fetchAppointments";
import { BookingAdminData } from "@/types/bookings.type";
import StatusColumnButtonsBooking from "./AppointmentStatusButtons";
import TableCellDropDown from "../TableCellDropDown";
import { supabase } from "@/lib/supabaseClient";

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Service", accessor: "service" },
  { header: "Date", accessor: "date" },
  { header: "Time", accessor: "time" },
  { header: "Status", accessor: "status" },
];

const maxLengths: Record<string, number> = {
  name: 20,
  email: 30,
  service: 25,
};

interface AdminTableBodyBookingProps {
  filters?: {
    date?: string;
    status?: string;
    clientName?: string;
  };
}

const AdminTableBodyBooking: React.FC<AdminTableBodyBookingProps> = ({ filters = {} }) => {
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState<BookingAdminData[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingAdminData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchAppointments();
        const formattedData = data.map(booking => ({
          ...booking,
          date: formatDate(booking.created_at),
          time: formatTime(booking.created_at)
        }));
        setBookings(formattedData);
        setFilteredBookings(formattedData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (bookings.length === 0) return;

    let result = [...bookings];

    if (filters.clientName) {
      result = result.filter(booking =>
        booking.name.toLowerCase().includes(filters.clientName!.toLowerCase())
      );
    }

    if (filters.status) {
      result = result.filter(booking => booking.status === filters.status);
    }

    if (filters.date) {
      result = result.filter(booking => {
        const bookingDate = new Date(booking.created_at).toISOString().split("T")[0];
        return bookingDate === filters.date;
      });
    }

    setFilteredBookings(result);
  }, [filters, bookings]);

  useEffect(() => {
    const channel = supabase
      .channel("booking-updates")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "booking",
        },
        (payload) => {
          const updated = payload.new as BookingAdminData;
          setBookings((prev) =>
            prev.map((b) =>
              b.booking_id === updated.booking_id ? { 
                ...updated,
                date: formatDate(updated.created_at),
                time: formatTime(updated.created_at)
              } : b
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  function formatDate(timestamp: string): string {
    try {
      const dateObj = new Date(timestamp);
      return dateObj.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid date";
    }
  }

  function formatTime(timestamp: string): string {
    try {
      const dateObj = new Date(timestamp);
      return dateObj.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    } catch (e) {
      console.error("Error formatting time:", e);
      return "Invalid time";
    }
  }

  if (loading) {
    return (
      <tbody>
        <tr>
          <td colSpan={6} className="text-center py-4">
            Loading appointments...
          </td>
        </tr>
      </tbody>
    );
  }

  if (error) {
    return (
      <tbody>
        <tr>
          <td colSpan={6} className="text-red-600 text-center py-4">
            {error}
          </td>
        </tr>
      </tbody>
    );
  }

  if (filteredBookings.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={6} className="text-center py-4">
            No appointments found
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="text-center text-sm w-full">
      {filteredBookings.map((row, rowIdx) => (
        <tr
          key={rowIdx}
          className={
            rowIdx === filteredBookings.length - 1 ? "" : "border-b border-neutral-300"
          }
        >
          {columns.map((col, colIdx) => {
            const cellValue = row[col.accessor as keyof BookingAdminData];
            const maxLength = maxLengths[col.accessor] ?? Infinity;
            const shouldTruncate =
              typeof cellValue === "string" && cellValue.length > maxLength;
            const shortText = shouldTruncate
              ? `${cellValue.slice(0, maxLength)}...`
              : cellValue;

            return (
              <td key={colIdx} className="px-4 py-2 text-center h-14">
                {col.accessor === "status" ? (
                  row.status === "Accepted" || row.status === "Declined" ? (
                    <span>{row.status}</span>
                  ) : (
                    <StatusColumnButtonsBooking rowId={row.booking_id} />
                  )
                ) : shouldTruncate ? (
                  <TableCellDropDown
                    shortText={String(shortText)}
                    fullText={cellValue as string}
                  />
                ) : (
                  cellValue
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default AdminTableBodyBooking;