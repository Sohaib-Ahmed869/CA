// sections/LanguageCultural.js
import React from "react";
import countryList from "react-select-country-list";

const LanguageCultural = ({ formData, setFormData }) => {
  const countries = countryList().getData();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "speaks") {
      setFormData({
        ...formData,
        otherLanguage: {
          ...formData.otherLanguage,
          speaks: checked,
        },
      });
    } else if (name === "language") {
      setFormData({
        ...formData,
        otherLanguage: {
          ...formData.otherLanguage,
          language: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6 border-b pb-2">
        <div className="w-1 h-6 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-2xl font-semibold text-green-700">
          Language & Cultural Diversity
        </h2>
      </div>
      {/* Country of Birth */}
      <label className="block text-md mb-2  font-medium text-gray-700">
        Country of Birth
      </label>

      <select
        id="countryOfBirth"
        name="countryOfBirth"
        className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
        value={formData.countryOfBirth}
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

      {/* Other Language */}
      <label className="block mt-4 mb-2  text-md font-medium text-gray-700">
        Do you speak a language other than English at home?
      </label>
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          name="speaks"
          checked={formData.otherLanguage.speaks}
          onChange={handleChange}
          className="mr-2 rounded-sm"
        />
        Yes
      </div>
      {formData.otherLanguage.speaks && (
        <input
          type="text"
          name="language"
          value={formData.otherLanguage.language}
          onChange={handleChange}
          placeholder="Specify language"
          className="rounded-md border-2 w-1/2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
        />
      )}

      {/* Indigenous Status */}
      <label className="block  mt-4 mb-2 text-md font-medium text-gray-700">
        Are you of Aboriginal or Torres Strait Islander origin?
      </label>
      <select
        name="indigenousStatus"
        value={formData.indigenousStatus}
        onChange={handleChange}
        className="rounded-md border-2 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
      >
        <option value="">Select</option>
        <option value="No">No</option>
        <option value="Aboriginal">Yes, Aboriginal</option>
        <option value="Torres Strait Islander">
          Yes, Torres Strait Islander
        </option>
        <option value="Both">Yes, Both</option>
      </select>
    </div>
  );
};

export default LanguageCultural;
