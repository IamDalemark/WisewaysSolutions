"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/layout/NavBar";
import DateAndTimeSelection from "@/components/booking/BookingDateAndTimeSelection";
import EnterDetails from "@/components/booking/BookingEnterDetails";
import BookingLandingContent from "@/components/booking/BookingLandingContent";
import { BookingDateTime, BookingDetails } from "@/types/bookings.type";

const BookingPage = () => {
  const [hasBooking, setHasBooking] = useState(false);
  const [isSchedulingBooking, setIsSchedulingBooking] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({});
  const [userCountry, setUserCountry] = useState("");

  const getUserCountryFromLocale = (): string => {
    try {
      const locale = Intl.DateTimeFormat().resolvedOptions().locale;
      const region = locale.split("-")[1];
      if (!region) return "";
      const regionName = new Intl.DisplayNames([locale], { type: "region" });
      return regionName.of(region) || "";
    } catch {
      return "";
    }
  };

  useEffect(() => {
    const country = getUserCountryFromLocale();
    setUserCountry(country);
  }, []);

  const nextStep = (data: BookingDateTime) => {
    setBookingData({ ...bookingData, ...data });
    setCurrentStep(currentStep + 1);
  };

  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleBookingConfirmation = (finalData: BookingDetails) => {
    setBookingData({ ...bookingData, ...finalData });
    console.log("Booking confirmed with data:", bookingData);
    setHasBooking(true);
    setIsSchedulingBooking(false);
  };

  const renderBookingProcess = () => {
    switch (currentStep) {
      case 1:
        return (
          <DateAndTimeSelection
            userCountry={userCountry}
            onNext={nextStep}
            initialData={bookingData}
          />
        );
      case 2:
        return (
          <EnterDetails
            userCountry={userCountry}
            onSubmit={handleBookingConfirmation}
            onPrevious={previousStep}
            initialData={bookingData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E1E1E1]">
      <NavBar />
      <div className="mt-20 w-full max-w-6xl">
        {isSchedulingBooking ? (
          renderBookingProcess()
        ) : hasBooking ? (
          <div className="bg-white p-8 rounded shadow text-center">
            <h2 className="text-2xl font-bold text-teal-600 mb-4">
              Thank You for Your Booking!
            </h2>
            <pre className="text-left bg-gray-100 p-4 rounded">
              {JSON.stringify(bookingData, null, 2)}
            </pre>
          </div>
        ) : (
          <BookingLandingContent
            onStartBookingProcess={() => setIsSchedulingBooking(true)}
          />
        )}
      </div>
    </div>
  );
};

export default BookingPage;
