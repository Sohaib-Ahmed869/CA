import React, { useState } from "react";

const EmploymentDetails = ({ employmentDetails, setEmploymentDetails }) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "employersContactNumber":
        if (value && !/^[0-9+\-\s()]*$/.test(value)) {
          error = "Please enter a valid phone number";
        }
        break;
      default:
        break;
    }

    return error;
  };
  const handleContactChange = (e) => {
    const value = e.target.value.replace(/[^\d+\-\s()]/g, "");
    e.target.value = value;
    handleChange(e);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate the field
    const error = validateField(name, value);

    // Update errors state
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setEmploymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="mb-10 animate-fade">
      <div className="flex items-center mb-6 border-b pb-2">
        <div className="w-1 h-6 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-2xl font-semibold text-green-700">
          Employment Details
        </h2>
      </div>

      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-6">
        <p className="text-sm text-gray-600 mb-4">
          Please provide information about your current or most recent
          employment. This information helps us ensure your qualifications align
          with your professional experience.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="Business Name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Business Name <span className="text-red-500"></span>{" "}
            </label>

            <input
              name="businessName"
              type="text"
              value={employmentDetails.businessName}
              className={
                "w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500"
              }
              onChange={handleChange}
              placeholder="Name of the business"
            />
          </div>
          {console.log(employmentDetails)}
          <div>
            <label
              htmlFor="Position"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Position<span className="text-red-500"></span>{" "}
            </label>
            <input
              label="Position"
              name="position"
              type="text"
              value={employmentDetails.position}
              className={
                "w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500"
              }
              onChange={handleChange}
              placeholder="Your job title"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
        <h3 className="text-base font-medium text-gray-700 mb-4">
          Employer Information
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="Employer's Legal Name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Employer's Legal Name <span className="text-red-500"></span>{" "}
            </label>
            <input
              name="employersLegalName"
              type="text"
              value={employmentDetails.employersLegalName}
              className={
                "w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500"
              }
              onChange={handleChange}
              placeholder="Registered business name"
            />
          </div>
          <div>
            <label
              htmlFor="employersContactNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Employer's Contact Number
              <span className="text-red-500"></span>{" "}
            </label>
            <input
              name="employersContactNumber"
              type="text"
              value={employmentDetails.employersContactNumber}
              className={
                "w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500"
              }
              error={errors.employersContactNumber}
              placeholder="e.g. (02) 1234 5678"
              // customHandler={(e) => {
              //   // Allow only numbers, +, -, spaces, and parentheses
              //   const value = e.target.value.replace(/[^\d+\-\s()]/g, "");
              //   e.target.value = value;
              //   handleChange(e);
              // }}
              onChange={handleContactChange}
            />
          </div>
        </div>

        <div className="mt-6">
          <div>
            <label
              htmlFor="Employer's Address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Employer's Address
              <span className="text-red-500"></span>{" "}
            </label>
            <input
              label="Employer's Address"
              name="employersAddress"
              type="text"
              value={employmentDetails.employersAddress}
              className={
                "w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500"
              }
              onChange={handleChange}
              placeholder="Complete business address"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center text-xs text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="italic">
          All employment details are optional but recommended for a complete
          application
        </span>
      </div>
    </div>
  );
};

export default EmploymentDetails;
