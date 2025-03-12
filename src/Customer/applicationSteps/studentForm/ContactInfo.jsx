import React, { useEffect, useState } from "react";
import FloatingLabelInput from "../../components/floatingLabelInput";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import countryList from "react-select-country-list";
import { getUserInfo } from "../../Services/customerApplication";
const ContactInfo = ({ contactInfo, setContactInfo }) => {
  const [errors, setErrors] = useState({});
  const countries = countryList().getData();
  const userId = sessionStorage.getItem("userId");
  // Function to fetch user info
  const getUser = async (userId) => {
    try {
      const response = await getUserInfo(userId);
      // console.log("Fetched User:", response);

      // Set email only if it's not already set
      if (!contactInfo.email) {
        setContactInfo((prev) => ({ ...prev, email: response.email || "" }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          error = "Please enter a valid email address";
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

    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  return (
    <div className="mb-10 animate-fade">
      <div className="flex items-center mb-6 border-b pb-2">
        <div className="w-1 h-6 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-2xl font-semibold text-green-700">
          Contact Information
        </h2>
      </div>

      {/* Main form layout with consistent sizing */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Phone field with custom styling */}
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="phone-input-container">
            <PhoneInput
              country={"au"}
              value={contactInfo.contactNumber}
              onChange={(phone) =>
                setContactInfo({ ...contactInfo, contactNumber: phone })
              }
              inputClass="w-full h-11 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
              containerClass="w-full"
              buttonStyle={{
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem 0 0 0.375rem",
                backgroundColor: "#f9fafb",
              }}
              dropdownStyle={{
                width: "300px",
              }}
            />
          </div>
        </div>

        {/* Email field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="your.email@example.com"
            value={contactInfo.email}
            onChange={handleChange}
            className={`w-full h-11 px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Country of Birth field */}
        <div className="space-y-2">
          <label
            htmlFor="countryOfBirth"
            className="block text-sm font-medium text-gray-700"
          >
            Country of Birth <span className="text-red-500">*</span>
          </label>

          <select
            id="countryOfBirth"
            name="countryOfBirth"
            className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
            value={contactInfo.countryOfBirth}
            onChange={handleChange}
          >
            <option value="" disabled>
              -- Select a Country --
            </option>
            {countries.map((country) => (
              <option key={country.label} value={country.label}>
                {country.label}
              </option>
            ))}
          </select>
        </div>
        {/* {console.log(contactInfo)} */}
        {/* English Level field */}
        <div className="space-y-2">
          <label
            htmlFor="englishLevel"
            className="block text-sm font-medium text-gray-700"
          >
            English Level
          </label>

          <select
            id="englishLevel"
            name="englishLevel"
            className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
            value={contactInfo.englishLevel}
            onChange={handleChange}
          >
            <option value="" disabled>
              -- Select English Level --
            </option>
            {[
              "Native",
              "Fluent",
              "Advanced",
              "Intermediate",
              "Basic",
              "No Proficiency",
            ].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Citizenship and background information */}
      <div className="mt-8 bg-gray-50 p-5 rounded-lg border border-gray-200">
        <h3 className="text-base font-medium text-gray-700 mb-4">
          Additional Information
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="australianCitizen"
              className="block text-sm font-medium text-gray-700"
            >
              Are you an Australian citizen?
            </label>
            <select
              id="australianCitizen"
              name="australianCitizen"
              value={contactInfo.australianCitizen}
              className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 bg-white"
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="aboriginalOrTorresStraitIslander"
              className="block text-sm font-medium text-gray-700"
            >
              Are you Aboriginal or Torres Strait Islander?
            </label>
            <select
              id="aboriginalOrTorresStraitIslander"
              name="aboriginalOrTorresStraitIslander"
              value={contactInfo.aboriginalOrTorresStraitIslander}
              className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 bg-white"
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="disability"
              className="block text-sm font-medium text-gray-700"
            >
              Do you have a disability?
            </label>
            <select
              id="disability"
              name="disability"
              value={contactInfo.disability}
              className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 bg-white"
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      </div>

      {/* Education and employment information */}
      <div className="mt-8 bg-gray-50 p-5 rounded-lg border border-gray-200">
        <h3 className="text-base font-medium text-gray-700 mb-4">
          Education & Employment
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="previousQualifications"
              className="block text-sm font-medium text-gray-700"
            >
              Previous Qualifications
            </label>
            <input
              name="previousQualifications"
              type="text"
              id="previousQualifications"
              placeholder="e.g. Bachelor of Science"
              value={contactInfo.previousQualifications}
              onChange={handleChange}
              className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="employmentStatus"
              className="block text-sm font-medium text-gray-700"
            >
              Employment Status
            </label>
            <select
              name="employmentStatus"
              id="employmentStatus"
              value={contactInfo.employmentStatus}
              className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 bg-white"
              onChange={handleChange}
            >
              <option value="">Select Employment Status</option>
              <option value="Employed">Employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Student">Student</option>
              <option value="Retired">Retired</option>
            </select>
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

export default ContactInfo;
