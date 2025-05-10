"use client";

import React, { useEffect, useState } from "react";
import { fetchAppointments } from "@/app/hooks/admin/fetchAppointments";
import { BookingAdminData } from "@/types/bookings.type";
import AdminTableRowBooking from "./AppointmentTableRow";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Service", accessor: "service" },
  { header: "Date", accessor: "date" },
  { header: "Time", accessor: "time" },
  { header: "Status", accessor: "status" },
];

interface AdminTableBodyBookingProps {
  filters?: {
    date?: string;
    status?: string;
    clientName?: string;
  };
  currentPage: number;
  setTotalPages: (n: number) => void;
}

const AppointmentTableBody: React.FC<AdminTableBodyBookingProps> = ({ 
  filters = {}, currentPage, setTotalPages
}) => {
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState<BookingAdminData[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingAdminData[]>([]);
  const [loading, setLoading] = useState(true);

  const PAGE_SIZE = 5;

  useEffect(() => {
    if (!filteredBookings.length) {
      setTotalPages(1);
    } else {
      const total = Math.ceil(filteredBookings.length / PAGE_SIZE);
      setTotalPages(total);
    }
  }, [filteredBookings, setTotalPages]);

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );


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

   if (error) {
     return (
       <tbody>
         <tr>
           <td
             colSpan={columns.length}
             className="text-red-600 text-center py-4"
           >
             {error}
           </td>
         </tr>
       </tbody>
     );
   }
 
   if (loading) {
     return (
       <tbody>
         <tr className="w-full">
           <td colSpan={6} className="py-4">
             <div className="flex justify-center items-center text-gray-500 gap-2">
               <Loader2 className="h-4 w-4 animate-spin" />
               <span>Loading appointments...</span>
             </div>
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
    <tbody className="w-full">
      {paginatedBookings.map((row, rowIdx) => (
        <AdminTableRowBooking
          key={row.booking_id}
          row={row}
          isLastRow={rowIdx === paginatedBookings.length - 1}
        />
      ))}
    </tbody>

  );
};

export default AppointmentTableBody;