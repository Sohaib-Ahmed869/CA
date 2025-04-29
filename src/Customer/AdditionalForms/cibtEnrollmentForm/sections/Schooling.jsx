// sections/Schooling.js
import React from "react";

const Schooling = ({ formData, setFormData }) => {
  const handleLevelChange = (e) => {
    setFormData({
      ...formData,
      highestSchoolLevel: e.target.value,
    });
  };

  const handleEnrolledChange = (e) => {
    setFormData({
      ...formData,
      stillEnrolled: e.target.value,
    });
  };

  return (
    <div>
      <div className="flex items-center mb-6 border-b pb-2">
        <div className="w-1 h-6 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-2xl font-semibold text-green-700">Schooling </h2>
      </div>
      {/* Highest Level Completed */}
      <label className="block text-md font-medium text-gray-700">
        What is your highest COMPLETED school level?
      </label>
      <select
        value={formData.highestSchoolLevel}
        onChange={handleLevelChange}
        className="rounded-md my-2  border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
      >
        <option value="">Select</option>
        <option value="Year 12 or equivalent">Year 12 or equivalent</option>
        <option value="Year 11 or equivalent">Year 11 or equivalent</option>
        <option value="Year 10 or equivalent">Year 10 or equivalent</option>
        <option value="Year 9 or equivalent">Year 9 or equivalent</option>
        <option value="Year 8 or below">Year 8 or below</option>
        <option value="Never attended school">Never attended school</option>
      </select>

      {/* Still Enrolled? */}
      <label className="block text-md font-medium text-gray-700">
        Are you still enrolled in secondary or senior secondary education?
      </label>
      <select
        value={formData.stillEnrolled}
        onChange={handleEnrolledChange}
        className="rounded-md my-2 border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
      >
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>
  );
};

export default Schooling;
