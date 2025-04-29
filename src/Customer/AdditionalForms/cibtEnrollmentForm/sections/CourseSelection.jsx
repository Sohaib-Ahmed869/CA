// sections/CourseSelection.js
import React from "react";

const CourseSelection = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, selectedCourse: e.target.value });
  };

  const handleStartChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      preferredStart: {
        ...formData.preferredStart,
        [name]: type === "checkbox" ? checked : value,
      },
    });
  };

  const handlePrevStudyChange = (e) => {
    setFormData({ ...formData, previousStudy: e.target.value });
  };

  return (
    <div>
      <div className="flex items-center mb-6 border-b pb-2">
        <div className="w-1 h-6 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-2xl font-semibold text-green-700">
          Course Selection
        </h2>
      </div>

      {/* Course */}
      <label className="block text-sm font-medium my-2 text-gray-700">
        Which course would you like to enroll into?
      </label>
      <select
        value={formData.selectedCourse}
        onChange={handleChange}
        // className="border rounded-md p-2 w-full mb-4"
        className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
      >
        <option value="">Select a course</option>
        <option value="BSB40820">
          Certificate IV in Marketing and Communication
        </option>
        <option value="FNS40222">
          Certificate IV in Accounting and Bookkeeping
        </option>
        <option value="CPC30220">Certificate III in Carpentry</option>
        <option value="CPC30620">
          Certificate III in Painting and Decorating
        </option>
        <option value="CPC31220">
          Certificate III in Wall and Ceiling Lining
        </option>
        <option value="CPC31320">
          Certificate III in Wall and Floor Tiling
        </option>
        <option value="CPC40120">
          Certificate IV in Building and Construction
        </option>
        <option value="CPC50220">
          Diploma of Building and Construction (Building)
        </option>
      </select>

      {/* Preferred Start */}
      <label className="block text-sm font-medium my-2 text-gray-700">
        Preferred Start Date
      </label>
      <div className="flex items-center space-x-4 mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="immediate"
            checked={formData.preferredStart.immediate}
            onChange={handleStartChange}
            className="mr-2 rounded-sm"
          />
          As soon as possible
        </label>
        <input
          type="date"
          name="specificDate"
          value={formData.preferredStart.specificDate}
          onChange={handleStartChange}
          // className="border p-2 rounded-md"
          className="rounded-md  border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
        />
      </div>

      {/* Previous Study */}
      <label className="block text-sm font-medium mb-2 text-gray-700">
        Have you studied with Cove Institute before?
      </label>
      <select
        value={formData.previousStudy}
        onChange={handlePrevStudyChange}
        className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
      >
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>
  );
};

export default CourseSelection;
