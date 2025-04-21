// import { useState } from "react";

// const DateRangeFilter = ({
//   selectedRange,
//   onRangeChange,
//   onCustomStartChange,
//   onCustomEndChange,
//   customStartDate,
//   customEndDate,
// }) => {
//   const [showCustom, setShowCustom] = useState(false);

//   const handleRangeChange = (e) => {
//     const value = e.target.value;
//     onRangeChange(value);
//     setShowCustom(value === "custom");
//     // Reset custom dates when switching to predefined ranges
//     if (value !== "custom") {
//       onCustomStartChange("");
//       onCustomEndChange("");
//     }
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       <div className="flex items-center gap-3">
//         <label className="text-sm font-medium text-gray-700">Date Range:</label>
//         <select
//           value={selectedRange}
//           onChange={handleRangeChange}
//           className="border rounded p-2 text-sm"
//         >
//           <option value="1week">Last 1 Week</option>
//           <option value="15days">Last 15 Days</option>
//           <option value="1month">Last 1 Month</option>
//           <option value="custom">Custom</option>
//         </select>

//       </div>

//       {showCustom && (
//         <div className="flex gap-3">
//           <div className="flex flex-col gap-1">
//             <label className="text-xs font-medium text-gray-500">
//               Start Date
//             </label>
//             <input
//               type="date"
//               onChange={(e) => onCustomStartChange(e.target.value)}
//               className="border rounded p-2 text-sm"
//               required
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label className="text-xs font-medium text-gray-500">
//               End Date
//             </label>
//             <input
//               type="date"
//               onChange={(e) => onCustomEndChange(e.target.value)}
//               className="border rounded p-2 text-sm"
//               required
//               min={customStartDate} // Ensure end date can't be before start
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DateRangeFilter;
import { useState } from "react";
import { Popover } from "@headlessui/react";
import { CalendarIcon } from "lucide-react";

const DateRangeFilter = ({
  selectedRange,
  onRangeChange,
  onCustomStartChange,
  onCustomEndChange,
  customStartDate,
  customEndDate,
}) => {
  const [tempStartDate, setTempStartDate] = useState(customStartDate);
  const [tempEndDate, setTempEndDate] = useState(customEndDate);

  const handleRangeChange = (value) => {
    onRangeChange(value);
    if (value !== "custom") {
      onCustomStartChange("");
      onCustomEndChange("");
    }
  };

  const applyCustomDates = () => {
    onCustomStartChange(tempStartDate);
    onCustomEndChange(tempEndDate);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-gray-700">Date Range:</label>
      <select
        value={selectedRange}
        onChange={(e) => handleRangeChange(e.target.value)}
        className="border-none rounded-lg p-2 text-sm"
      >
        <option value="1week">Last 1 Week</option>
        <option value="15days">Last 15 Days</option>
        <option value="1month">Last 1 Month</option>
        <option value="custom">Custom</option>
      </select>

      {selectedRange === "custom" && (
        <Popover className="relative">
          <Popover.Button className="p-2 hover:bg-gray-100 rounded">
            <CalendarIcon className="w-5 h-5 text-gray-600" />
          </Popover.Button>

          <Popover.Panel className="absolute z-10 bg-white p-4 rounded-lg shadow-lg border mt-2 right-0">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500">Start Date</label>
                  <input
                    type="date"
                    value={tempStartDate}
                    onChange={(e) => setTempStartDate(e.target.value)}
                    className="border rounded p-2 text-sm"
                  />
                </div>
                <span className="mt-5">-</span>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500">End Date</label>
                  <input
                    type="date"
                    value={tempEndDate}
                    onChange={(e) => setTempEndDate(e.target.value)}
                    className="border rounded p-2 text-sm"
                    min={tempStartDate}
                  />
                </div>
              </div>
              <button
                onClick={applyCustomDates}
                className="bg-emerald-500 text-white px-3 py-1.5 rounded text-sm hover:bg-emerald-600"
                disabled={!tempStartDate || !tempEndDate}
              >
                Apply
              </button>
            </div>
          </Popover.Panel>
        </Popover>
      )}
    </div>
  );
};

export default DateRangeFilter;
