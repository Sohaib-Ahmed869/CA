import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const PersonalInfo = ({ personalInfo, setPersonalInfo }) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
      case "middleName":
      case "surname":
        if (name !== "middleName" && value.trim() === "") {
          error = `${
            name === "firstName" ? "First name" : "Surname"
          } is required`;
        }
        break;
      case "postcode":
        if (value && !/^\d{4,6}$/.test(value)) {
          error = "Postcode must be 4-6 digits";
        }
        break;
      case "dob":
        if (value) {
          const dobDate = new Date(value);
          const today = new Date();
          if (dobDate > today) {
            error = "Date of birth cannot be in the future";
          }
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
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  // Field component for consistent styling
  const InputField = ({
    label,
    name,
    type,
    value,
    onChange,
    error,
    required = true,
    maxLength,
    placeholder,
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
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`w-full h-11 px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );

  return (
    <div className="mb-10 animate-fade">
      <div className="flex items-center mb-6 border-b pb-2">
        <div className="w-1 h-6 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-2xl font-semibold text-green-700">
          Personal Information
        </h2>
      </div>

      {/* Main personal details */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputField
          label="First Name"
          name="firstName"
          type="text"
          value={personalInfo.firstName}
          onChange={handleChange}
          error={errors.firstName}
          placeholder="John"
        />

        <InputField
          label="Middle Name"
          name="middleName"
          type="text"
          value={personalInfo.middleName}
          onChange={handleChange}
          required={false}
          placeholder="(Optional)"
        />

        <InputField
          label="Surname"
          name="surname"
          type="text"
          value={personalInfo.surname}
          onChange={handleChange}
          error={errors.surname}
          placeholder="Doe"
        />

        <div className="space-y-2">
          <label
            htmlFor="USI"
            className="block text-sm font-medium text-gray-700 flex items-center"
          >
            USI
            <span className="ml-1 text-xs text-gray-500">
              (Only for people living in Australia)
            </span>
            <div className="relative group ml-2">
              <p className="text-gray-400 text-base rounded-full h-5 w-5 flex items-center justify-center cursor-pointer hover:text-gray-600">
                <FaInfoCircle />
              </p>
              <div className="absolute top-6 right-0 w-64 bg-gray-800 text-white text-xs rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                If you don't know your USI or don't have one, use{" "}
                <a
                  href="https://www.usi.gov.au/students/find-your-usi"
                  className="text-blue-400 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  this link
                </a>
                .
              </div>
            </div>
          </label>
          <input
            id="USI"
            name="USI"
            type="text"
            value={personalInfo.USI}
            onChange={handleChange}
            className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
            placeholder="e.g. ABC12345678"
          />
        </div>
      </div>

      {/* Personal attributes section */}
      <div className="mt-8 bg-gray-50 p-5 rounded-lg border border-gray-200">
        <h3 className="text-base font-medium text-gray-700 mb-4">
          Personal Details
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={personalInfo.gender}
              onChange={handleChange}
              className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 bg-white"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="preferNotToSay">Prefer not to say</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={personalInfo.dob}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              className={`w-full h-11 px-3 py-2 border ${
                errors.dob ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500`}
            />
            {errors.dob && <p className="text-red-500 text-xs">{errors.dob}</p>}
          </div>
        </div>
      </div>

      {/* Address section */}
      <div className="mt-8 bg-gray-50 p-5 rounded-lg border border-gray-200">
        <h3 className="text-base font-medium text-gray-700 mb-4">
          Address Information
        </h3>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="homeAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Home Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="homeAddress"
              name="homeAddress"
              value={personalInfo.homeAddress}
              onChange={handleChange}
              placeholder="Street address"
              className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <label
                htmlFor="suburb"
                className="block text-sm font-medium text-gray-700"
              >
                Suburb <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="suburb"
                name="suburb"
                value={personalInfo.suburb}
                onChange={handleChange}
                placeholder="Suburb"
                className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="postcode"
                className="block text-sm font-medium text-gray-700"
              >
                Postcode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={personalInfo.postcode}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  e.target.value = value;
                  handleChange(e);
                }}
                maxLength={6}
                placeholder="e.g. 2000"
                className={`w-full h-11 px-3 py-2 border ${
                  errors.postcode ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500`}
              />
              {errors.postcode && (
                <p className="text-red-500 text-xs">{errors.postcode}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State <span className="text-red-500">*</span>
              </label>
              <select
                id="state"
                name="state"
                value={personalInfo.state}
                onChange={handleChange}
                className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 bg-white"
              >
                <option value="">Select State</option>
                <option value="NSW">New South Wales</option>
                <option value="VIC">Victoria</option>
                <option value="QLD">Queensland</option>
                <option value="SA">South Australia</option>
                <option value="WA">Western Australia</option>
                <option value="TAS">Tasmania</option>
                <option value="NT">Northern Territory</option>
                <option value="ACT">Australian Capital Territory</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive help text at the bottom */}
      <div className="mt-4 text-xs text-gray-500 italic">
        Fields marked with <span className="text-red-500">*</span> are required
      </div>
    </div>
  );
};

export default PersonalInfo;
