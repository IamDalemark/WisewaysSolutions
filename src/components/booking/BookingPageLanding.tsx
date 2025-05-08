import React from "react";
import CalendarComponent from "./Calendar";

interface BookingPageContentProps {
  onStartBookingProcess: () => void;
}

const BookingPageContent = ({
  onStartBookingProcess,
}: BookingPageContentProps) => {
  const currentDate = new Date();
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] px-8">
      <div className="flex flex-col lg:flex-row items-start justify-center gap-5 max-w-7xl w-full">
        {/* Left Content */}
        <div className="flex flex-col max-w-xl w-full">
          <h1 className="text-teal-700 text-5xl font-bold leading-tight mb-8">
            Lorem ipsum dolor sit amet, consectetur
          </h1>
          <button
            className="bg-teal-700 text-white rounded-2xl shadow-md px-6 py-4 text-base font-semibold 
            w-fit hover:bg-blue-green-dark hover:scale-103 transition-all cursor-pointer"
            onClick={onStartBookingProcess}
          >
            CHOOSE A DATE & TIME
          </button>
        </div>

        <CalendarComponent currentDate={currentDate} />
      </div>
    </div>
  );
};

export default BookingPageContent;
