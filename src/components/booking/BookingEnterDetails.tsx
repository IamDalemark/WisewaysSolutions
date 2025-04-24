import { BookingDetails } from "@/types/bookings.type";
import React, { useState } from "react";
import { useSubmitBooking } from "@/app/hooks/bookings/useSubmitBooking";
import { Loader2 } from "lucide-react";
import {
  CalendarDays,
  Clock,
  Globe,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";

interface EnterDetailsProps {
  userCountry: string;
  onSubmit: (data: BookingDetails) => void;
  onPrevious: () => void;
  initialData: {
    name?: string;
    email?: string;
    service?: string;
    date?: Date;
    time?: string;
  };
}

const EnterDetails = ({
  userCountry,
  onSubmit,
  onPrevious,
  initialData,
}: EnterDetailsProps) => {
  const time = initialData.time!;
  const date = initialData.date!.toISOString();
  const [name, setName] = useState(initialData.name || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [service, setService] = useState(initialData.service || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { submitBooking, isSubmitting } = useSubmitBooking();

  const serviceOptions = ["Service A", "Service B", "Service C"];
  const formattedDate = initialData.date!.toDateString() || "";
  const formattedTime = initialData.time || "";

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Email format is invalid";
    if (!service) newErrors.service = "Please select a service";
    return newErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const result = await submitBooking({ name, time, date, email, service });

    if (result.success) {
      onSubmit({ name, email, service });
    } else {
      setErrors({ global: result.error || "Submission failed." });
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between mb-4">
        <button onClick={onPrevious} className="text-teal-700">
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="space-y-1 text-teal-800 text-sm mb-4">
        <div className="flex items-center gap-2 font-semibold">
          <CalendarDays size={18} />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={18} />
          <span>{formattedTime}</span>
        </div>
        <div className="flex items-center gap-2 text-teal-500">
          <Globe size={18} />
          <span className="underline">
            {userCountry || "Local Time"} Local Time
          </span>{" "}
        </div>
        <p className="text-xs text-gray-500 ml-6">Duration: 30 mins.</p>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-teal-800 block mb-1">
          Choose a Service
        </label>
        <div className="relative">
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full appearance-none border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">None</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>
        {errors.service && (
          <p className="text-red-500 text-sm">{errors.service}</p>
        )}
      </div>

      <hr className="my-4 border-teal-600" />
      <h3 className="text-md font-semibold text-teal-800 mb-2">
        Confirm Details
      </h3>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-teal-800 block mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md py-2 px-3 focus:ring-2 focus:ring-teal-500`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-teal-800 block mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md py-2 px-3 focus:ring-2 focus:ring-teal-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full mt-6 bg-teal-700 text-white py-2 rounded-xl font-semibold hover:bg-teal-800 transition flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Confirm Appointment"
        )}
      </button>
    </div>
  );
};

export default EnterDetails;
