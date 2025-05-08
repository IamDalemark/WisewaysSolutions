import { useEffect, useState } from "react";
import { Booking, GetBookingResult } from "@/types/bookings.type";

export const useGetBooking = (user_id: string | undefined) => {
  const [isFetching, setIsFetching] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const getBooking = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(
        `/api/bookings?user_id=${encodeURIComponent(user_id!)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result: GetBookingResult = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch booking.");
      }

      if (result.data!) {
        setBooking(result.data);
      }
    } catch (error) {
      console.error("Error fetching booking:", error);
      setError(error as Error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (user_id) {
      getBooking();
    } else {
      setBooking(null);
      setError(null);
      setIsFetching(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

  return { booking, error, isFetching };
};
