"use client";

import React, { useEffect, useState } from "react";
import { fetchAppointments } from "@/app/hooks/admin/fetchAppointments";
import { BookingAdminData } from "@/types/bookings.type";
import StatusColumnButtonsAppointments from "./StatusColumnButtonsBooking";
import TableCellDropDown from "./TableCellDropDown";
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

const AdminTableBodyBooking: React.FC = () => {
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState<BookingAdminData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAppointments();
        setBookings(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    loadData();
  }, []);

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
              b.booking_id === updated.booking_id ? updated : b
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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

  return (
    <tbody className="text-center text-sm w-full">
      {bookings.map((row, rowIdx) => (
        <tr
          key={rowIdx}
          className={
            rowIdx === bookings.length - 1 ? "" : "border-b border-neutral-300"
          }
        >
          {columns.map((col, colIdx) => {
            let cellValue = row[col.accessor as keyof BookingAdminData];

            if (col.accessor === "date" && typeof cellValue === "string") {
              const dateObj = new Date(cellValue);
              cellValue = dateObj.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
            }

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
                    <StatusColumnButtonsAppointments rowId={row.booking_id} />
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