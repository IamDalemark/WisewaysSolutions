"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface TestimonialFilterButtonProps {
  onFilter: (filters: {
    name?: string;
    status?: string;
    rating?: string;
  }) => void;
  onReset: () => void;
}

const TestimonialFilterButton: React.FC<TestimonialFilterButtonProps> = ({
  onFilter,
  onReset,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");

  const handleApply = () => {
    onFilter({
      name: name.trim() || undefined,
      status: status || undefined,
      rating: rating || undefined,
    });
    setShowFilters(false);
  };

  const handleReset = () => {
    setName("");
    setStatus("");
    setRating("");
    onReset();
    setShowFilters(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setShowFilters(!showFilters)}
        className="bg-blue-green text-white hover:bg-blue-green-dark"
        aria-expanded={showFilters}
        aria-haspopup="dialog"
      >
        Filter by
      </Button>

      {showFilters && (
        <div
          className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg p-4 z-10 border border-gray-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="space-y-3">
            <div>
              <label
                htmlFor="name-filter"
                className="block text-sm font-medium mb-1"
              >
                Name
              </label>
              <input
                id="name-filter"
                type="text"
                placeholder="Search name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label
                htmlFor="status-filter"
                className="block text-sm font-medium mb-1"
              >
                Status
              </label>
              <select
                id="status-filter"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">All Statuses</option>
                <option value="Accepted">Accepted</option>
                <option value="Declined">Declined</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="rating-filter"
                className="block text-sm font-medium mb-1"
              >
                Rating
              </label>
              <select
                id="rating-filter"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">All Ratings</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                onClick={handleReset}
                className="px-3 py-1 text-sm"
              >
                Reset
              </Button>
              <Button
                onClick={handleApply}
                className="px-3 py-1 text-sm bg-blue-green text-white hover:bg-blue-green-dark"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialFilterButton;
