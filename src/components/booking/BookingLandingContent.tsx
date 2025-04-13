import React from "react";
import { format, getDaysInMonth, startOfMonth } from "date-fns";

interface BookingLandingContentProps {
  onStartBookingProcess: () => void;
}

const BookingLandingContent = ({
  onStartBookingProcess,
}: BookingLandingContentProps) => {
  const currentDate = new Date();
  const totalDays = getDaysInMonth(currentDate);
  const firstDayOfMonth = startOfMonth(currentDate).getDay();
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] px-8">
      <div className="flex flex-col lg:flex-row items-start justify-center gap-20 max-w-7xl w-full">
        {/* Left Content */}
        <div className="flex flex-col max-w-xl w-full">
          <h1 className="text-teal-700 text-5xl font-bold leading-tight mb-8">
            Lorem ipsum dolor sit amet, consectetur
          </h1>
          <button
            className="bg-teal-700 text-white rounded-2xl shadow-md px-6 py-4 text-sm font-semibold w-fit"
            onClick={onStartBookingProcess}
          >
            CHOOSE A DATE & TIME
          </button>
        </div>

        {/* Right Calendar */}
        <div className="bg-white p-6 rounded-3xl shadow-md w-[350px]">
          <div className="flex justify-center items-center py-2">
            <span className="text-lg font-semibold">
              {format(currentDate, "MMMM yyyy")}
            </span>
          </div>

          <div className="grid grid-cols-7 text-center font-medium text-gray-600 mb-2 text-sm">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 text-center text-sm">
            {[...Array(firstDayOfMonth)].map((_, i) => (
              <div key={`empty-${i}`} className="py-2" />
            ))}

            {[...Array(totalDays)].map((_, i) => {
              const day = i + 1;
              const isToday = day === currentDate.getDate();

              return (
                <div
                  key={day}
                  className={`py-2 m-1 rounded-full ${
                    isToday
                      ? "bg-green-200 text-gray-800 font-semibold"
                      : "text-gray-800"
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingLandingContent;
