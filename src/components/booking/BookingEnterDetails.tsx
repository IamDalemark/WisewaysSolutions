import { BookingDetails } from "@/types/bookings.type";
import React, { useState } from "react";

interface EnterDetailsProps {
  onSubmit: (data: BookingDetails) => void;
  onPrevious: () => void;
  initialData: {
    name?: string;
    email?: string;
    phone?: string;
    service?: string;
  };
}

const EnterDetails: React.FC<EnterDetailsProps> = ({
  onSubmit,
  onPrevious,
  initialData,
}) => {
  const [name, setName] = useState(initialData.name || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [phone, setPhone] = useState(initialData.phone || "");
  const [service, setService] = useState(initialData.service || "");

  const serviceOptions = ["Service A", "Service B", "Service C"];

  const handleSubmit = () => {
    onSubmit({ name, email, phone, service });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-blue-green mb-6 text-center">
        Enter Your Details
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-green focus:border-blue-green"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-green focus:border-blue-green"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone:
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-green focus:border-blue-green"
          />
        </div>

        <div>
          <label
            htmlFor="service"
            className="block text-sm font-medium text-gray-700"
          >
            Select Service:
          </label>
          <select
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white focus:ring-blue-green focus:border-blue-green"
          >
            <option value="">-- Select a service --</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={onPrevious}
          className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition-all"
        >
          Previous
        </button>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded-lg bg-blue-green hover:bg-blue-green-dark text-white font-semibold transition-all"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EnterDetails;
