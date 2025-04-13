import React from "react";

interface TimePickerProps {
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  onNext: () => void;
}

const timeSlots = [
  "5:00 am",
  "6:00 am",
  "7:00 am",
  "8:00 am",
  "9:00 am",
  "11:00 am",
];

const TimePicker = ({
  selectedTime,
  onTimeSelect,
  onNext,
}: TimePickerProps) => {
  const handleTimeClick = (time: string) => {
    onTimeSelect(time);
  };

  return (
    <div className="bg-white rounded-md shadow-md p-10 w-full max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-xl font-bold text-teal-700">Select Time</h2>
      </div>

      {/* Date and Time Info */}
      <div className="mb-4 text-sm text-gray-600">
        <div>
          <span className="font-semibold text-teal-700">Thursday</span>: March
          13, 2025
        </div>
        <div>
          <span className="font-semibold text-teal-700">Time</span>: 9:37 am{" "}
          <span className="underline text-teal-500">Philippine Time</span> ▼
        </div>
        <div>
          <span className="font-semibold text-teal-700">Duration</span>: 30
          mins.
        </div>
      </div>

      {/* Time Slots */}
      <div className="space-y-2">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => handleTimeClick(time)}
            className={`w-full py-2 px-4 rounded-md text-sm text-gray-700 hover:bg-teal-50 focus:outline-none border border-teal-200 ${
              selectedTime === time
                ? "bg-teal-100 text-teal-700 font-semibold border-teal-500"
                : ""
            }`}
          >
            {time}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="mt-4 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        Next
      </button>
    </div>
  );
};

export default TimePicker;
