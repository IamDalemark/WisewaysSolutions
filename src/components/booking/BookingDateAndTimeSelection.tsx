import React, { useState } from "react";
import CalendarPicker from "@/components/booking/CalendarPicker";
import TimePicker from "@/components/booking/TimePicker";
import { BookingDateTime } from "@/types/bookings.type";

interface DateAndTimeSelectionProps {
  userCountry: string;
  onNext: (data: BookingDateTime) => void;
  initialData: { date?: Date; time?: string };
}

const DateAndTimeSelection = ({
  userCountry,
  onNext,
  initialData,
}: DateAndTimeSelectionProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    initialData.date ? new Date(initialData.date) : new Date()
  );
  const [selectedTime, setSelectedTime] = useState<string>(
    initialData.time || ""
  );

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      onNext({ date: selectedDate, time: selectedTime });
    } else {
      alert("Please select a date and time.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-teal-700 text-center">
        Select Date & Time
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
        {/* Time Picker */}
        <div className="justify-center rounded-lg w-full md:w-1/2">
          <TimePicker
            userCountry={userCountry}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onTimeSelect={handleTimeSelect}
            onNext={handleNext}
          />
        </div>

        {/* Calendar Picker */}
        <div className="justify-center rounded-lg w-full md:w-1/2">
          <CalendarPicker
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default DateAndTimeSelection;
