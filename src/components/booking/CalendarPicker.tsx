import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  addDays,
  subMonths,
  addMonths,
  isSameDay,
  isToday,
  isBefore,
  getDay,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface CalendarPickerProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const CalendarPicker = ({
  selectedDate,
  onDateSelect,
}: CalendarPickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(
    startOfMonth(selectedDate || new Date())
  );

  const startDate = startOfMonth(currentMonth);
  const endDate = endOfMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (day: Date) => {
    onDateSelect(day);
  };

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const startDayOffset = getDay(startDate);
  const daysInMonth = [];
  const today = new Date();

  for (let i = 0; i < startDayOffset; i++) {
    daysInMonth.push(null);
  }

  let currentDate = startDate;
  while (currentDate <= endDate) {
    daysInMonth.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-10 w-full h-[60vh] min-h-[400px] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="text-gray-500 hover:text-teal-500"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-bold text-teal-700">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          onClick={nextMonth}
          className="text-gray-500 hover:text-teal-500"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 text-center text-gray-600 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-xs font-semibold">
            {day}
          </div>
        ))}
      </div>

      {/* Date Grid */}
      <div className="grid grid-cols-7 gap-2 flex-grow">
        {daysInMonth.map((day, index) =>
          day ? (
            isBefore(day, today) && !isToday(day) ? (
              <div
                key={`previous-${index}`}
                className="w-10 h-10 rounded-full text-sm flex items-center justify-center transition bg-gray-100 text-black"
              >
                {format(day, "d")}
              </div>
            ) : (
              <button
                key={index}
                onClick={() => handleDateClick(day)}
                className={`w-10 h-10 rounded-full text-sm flex items-center justify-center transition ${
                  isSameDay(day, selectedDate || new Date())
                    ? "bg-teal-600 text-white font-semibold"
                    : isToday(day)
                    ? "text-teal-500"
                    : "text-gray-700"
                } hover:bg-teal-100`}
              >
                {format(day, "d")}
              </button>
            )
          ) : (
            <div key={`empty-${index}`} />
          )
        )}
      </div>
    </div>
  );
};

export default CalendarPicker;
