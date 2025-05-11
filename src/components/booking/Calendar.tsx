import React from "react";
import { format, getDaysInMonth, startOfMonth } from "date-fns";

interface CalendarComponentProps {
  currentDate: Date;
}

const CalendarComponent = ({ currentDate }: CalendarComponentProps) => {
  const totalDays = getDaysInMonth(currentDate);
  const firstDayOfMonth = startOfMonth(currentDate).getDay();

  return (
    <div className="bg-white p-6 rounded-3xl shadow-md h-full w-[350px]">
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
  );
};

export default CalendarComponent;
