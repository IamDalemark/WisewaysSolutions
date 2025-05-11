"use client";
import React, { useEffect, useState } from "react";
import CalendlyScheduler from "@/components/booking/CalendlyScheduler";
import BookingPageLanding from "@/components/booking/BookingPageLanding";
import { useUser } from "@/components/contexts/UserContext";
import { useGetBooking } from "../hooks/bookings/useGetBooking";
import ScheduledBooking from "@/components/booking/ScheduledBooking";
import { AlertTriangle, Loader2 } from "lucide-react";
import CancelBooking from "@/components/booking/CancelBooking";
import RescheduleBooking from "@/components/booking/RescheduleBooking";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/contexts/ToastContext";

const BookingPage = () => {
  const { addToast } = useToast();
  const router = useRouter();
  const { user, loading } = useUser();
  const [userID, setUserID] = useState("");
  const { booking, error, isFetching, getBooking } = useGetBooking(
    userID ?? ""
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentState, setCurrentState] = useState(0);

  const [hasBooking, setHasBooking] = useState(false);
  const [isSchedulingBooking, setIsSchedulingBooking] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.user_metadata.email);
      setName(user.user_metadata.username.replaceAll(" ", "%20"));
      setUserID(user.id);
    }
    if (!user && !loading) {
      router.replace("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    setHasBooking(!!booking);
  }, [booking]);

  const handleBookingConfirmation = () => {
    setIsSchedulingBooking(false);
    setUserID(user!.id);
    getBooking();
    router.refresh();
    addToast("Successfully Booked Appointment", "success");
  };

  const renderScheduledBooking = () => {
    switch (currentState) {
      case 0:
        return (
          <ScheduledBooking
            invitee_id={booking!.invitee_id}
            onHandleReschedule={() => setCurrentState(1)}
            onHandleCancellation={() => setCurrentState(2)}
          />
        );
      case 1:
        return (
          <RescheduleBooking
            invitee_id={booking!.invitee_id}
            onHandleReturn={() => setCurrentState(0)}
          />
        );
      case 2:
        return (
          <CancelBooking
            invitee_id={booking!.invitee_id}
            onHandleReturn={() => setCurrentState(0)}
          />
        );
    }
  };

  if (!user || loading || isFetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#E1E1E1] px-4">
        <Loader2 className="w-10 h-10 text-gray-600 animate-spin mb-4" />
        <p className="text-gray-700 text-base md:text-lg font-medium">
          Loading, please wait...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#E1E1E1] px-4 text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-700 text-sm md:text-base mb-6">
          {error?.message ||
            "An unexpected error occurred. Please try again later."}
        </p>
        <button
          onClick={() => location.reload()}
          className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E1E1E1]">
      <div className="h-full w-full">
        {isSchedulingBooking ? (
          <div className="lg:mt-20 sm:mt-36">
            <CalendlyScheduler
              name={name}
              email={email}
              user_id={user!.id}
              onSubmit={handleBookingConfirmation}
            />
          </div>
        ) : hasBooking ? (
          renderScheduledBooking()
        ) : (
          <BookingPageLanding
            onStartBookingProcess={() => setIsSchedulingBooking(true)}
          />
        )}
      </div>
    </div>
  );
};

export default BookingPage;
