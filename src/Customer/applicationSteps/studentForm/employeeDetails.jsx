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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate the field
    const error = validateField(name, value);

    // Update errors state
    setErrors({
      ...errors,
      [name]: error,
    });

    // Update form data
    setEmploymentDetails({
      ...employmentDetails,
      [name]: value,
    });
  };

  // Field component for consistent styling
  const InputField = ({
    label,
    name,
    type,
    value,
    onChange,
    error,
    required = false,
    maxLength,
    placeholder,
    customHandler,
    ...props
  }) => (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={customHandler || onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`w-full h-11 px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

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
          <InputField
            label="Business Name"
            name="businessName"
            type="text"
            value={employmentDetails.businessName}
            onChange={handleChange}
            placeholder="Name of the business"
          />

          <InputField
            label="Position"
            name="position"
            type="text"
            value={employmentDetails.position}
            onChange={handleChange}
            placeholder="Your job title"
          />
        </div>
      </div>

      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
        <h3 className="text-base font-medium text-gray-700 mb-4">
          Employer Information
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputField
            label="Employer's Legal Name"
            name="employersLegalName"
            type="text"
            value={employmentDetails.employersLegalName}
            onChange={handleChange}
            placeholder="Registered business name"
          />

          <InputField
            label="Employer's Contact Number"
            name="employersContactNumber"
            type="text"
            value={employmentDetails.employersContactNumber}
            error={errors.employersContactNumber}
            placeholder="e.g. (02) 1234 5678"
            customHandler={(e) => {
              // Allow only numbers, +, -, spaces, and parentheses
              const value = e.target.value.replace(/[^\d+\-\s()]/g, "");
              e.target.value = value;
              handleChange(e);
            }}
          />
        </div>

        <div className="mt-6">
          <InputField
            label="Employer's Address"
            name="employersAddress"
            type="text"
            value={employmentDetails.employersAddress}
            onChange={handleChange}
            placeholder="Complete business address"
          />
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
