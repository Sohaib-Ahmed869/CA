// sections/EmploymentDetails.js
import React from "react";

const EmploymentDetails = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      employmentDetails: {
        ...formData.employmentDetails,
        [name]: value,
      },
    });
  };

  return (
    <div>
      <div className="flex items-center mb-6 border-b pb-2">
        <div className="w-1 h-6 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-2xl font-semibold text-green-700">
          Employment Details
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="block text-md font-medium text-gray-700">
            Employer's Legal Name
          </label>
          <input
            type="text"
            name="employerName"
            value={formData.employmentDetails.employerName}
            onChange={handleChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-md font-medium text-gray-700">
            Your Position
          </label>
          <input
            type="text"
            name="position"
            value={formData.employmentDetails.position}
            onChange={handleChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>

        <div className="flex flex-col gap-2 col-span-2">
          <label className="block text-md font-medium text-gray-700">
            Business Address
          </label>
          <input
            type="text"
            name="businessAddress"
            value={formData.employmentDetails.businessAddress}
            onChange={handleChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-md font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.employmentDetails.phone}
            onChange={handleChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-md font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.employmentDetails.email}
            onChange={handleChange}
            className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>
      </div>
    </div>
  );
};

export default EmploymentDetails;
