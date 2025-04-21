import React, { useState } from "react";

const ReportingFilters = ({
  onFilterChange,
  onCustomDateChange,
  dateFilter,
}) => {
  const [localStartDate, setLocalStartDate] = useState("");
  const [localEndDate, setLocalEndDate] = useState("");

  return (
    <div className="p-6 bg-white shadow-sm">
      <div className="flex flex-wrap gap-4 items-center">
        <label htmlFor="dateFilter">Filter by Date:</label>
        <select
          onChange={(e) => onFilterChange(e.target.value)}
          className="p-2 border rounded-lg"
          value={dateFilter}
        >
          <option value="all">All Time</option>
          <option value="week">Last Week</option>
          <option value="month">Last 30 Days</option>
          <option value="custom">Custom Range</option>
        </select>

        {dateFilter === "custom" && (
          <div className="flex gap-2">
            <input
              type="date"
              onChange={(e) => setLocalStartDate(e.target.value)}
              className="p-2 border rounded-lg"
            />
            <input
              type="date"
              onChange={(e) => setLocalEndDate(e.target.value)}
              className="p-2 border rounded-lg"
            />
            <button
              onClick={() => onCustomDateChange(localStartDate, localEndDate)}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportingFilters;
