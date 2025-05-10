"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

interface FilterButtonBookingProps {
  onFilter: (filters: {
    date?: string;
    status?: string;
    clientName?: string;
  }) => void;
  onReset: () => void;
}

const FilterButtonBooking: React.FC<FilterButtonBookingProps> = ({ onFilter, onReset }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [clientName, setClientName] = useState("");

  const handleApply = () => {
    onFilter({ 
      date: date || undefined, 
      status: status || undefined, 
      clientName: clientName || undefined 
    });
    setShowFilters(false);
  };

  const handleReset = () => {
    setDate("");
    setStatus("");
    setClientName("");
    onReset();
    setShowFilters(false);
  };

  return (
    <div className="relative">
      <Button 
        onClick={() => setShowFilters(!showFilters)}
        className="bg-blue-green text-white hover:bg-blue-green-dark"
      >
        Filter by
      </Button>

      {showFilters && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg p-4 z-10 border border-gray-200">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Client Name</label>
              <input
                type="text"
                placeholder="Search name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Declined">Declined</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={handleReset}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
              >
                Reset
              </button>
              <button
                onClick={handleApply}
                className="px-3 py-1 text-sm bg-blue-green text-white rounded hover:bg-blue-green-dark"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButtonBooking;