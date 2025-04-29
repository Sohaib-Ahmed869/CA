// sections/USIInfo.js
import React from "react";

const USIInfo = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      usi: e.target.value,
    });
  };

  return (
    <div>
      <div className="flex items-center mb-6 border-b pb-2">
        <div className="w-1 h-6 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-2xl font-semibold text-green-700">
          Unique Student Identifier (USI)
        </h2>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          From 1 January 2015, we can only issue nationally recognised
          qualifications if you have a USI. Create or find your USI at{" "}
          <a
            href="https://www.usi.gov.au"
            className="text-green-600 hover:underline"
          >
            www.usi.gov.au
          </a>
        </p>

        <div className="flex flex-col gap-2">
          <label className="block text-md font-medium text-gray-700">
            USI Number
          </label>
          <input
            type="text"
            name="usi"
            value={formData.usi}
            onChange={handleChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
            placeholder="Enter your 10-digit USI"
          />
        </div>
      </div>
    </div>
  );
};

export default USIInfo;
