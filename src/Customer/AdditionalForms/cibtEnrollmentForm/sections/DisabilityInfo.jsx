// sections/DisabilityInfo.js
import React from "react";

const DisabilityInfo = ({ formData, setFormData }) => {
  const handleDisabilityChange = (e) => {
    const hasDisability = e.target.value === "yes";
    setFormData({
      ...formData,
      disability: {
        ...formData.disability,
        hasDisability,
        types: hasDisability ? formData.disability.types : [],
      },
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const currentTypes = formData.disability.types;
    const updatedTypes = checked
      ? [...currentTypes, value]
      : currentTypes.filter((type) => type !== value);

    setFormData({
      ...formData,
      disability: {
        ...formData.disability,
        types: updatedTypes,
      },
    });
  };

  const disabilityTypes = [
    "Hearing/deaf",
    "Physical",
    "Intellectual",
    "Learning",
    "Mental Illness",
    "Acquired brain impairment",
    "Vision",
    "Medical Condition",
    "Other",
  ];

  return (
    <div>
      <div className="flex items-center mb-6 border-b pb-2">
        <div className="w-1 h-6 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-2xl font-semibold text-green-700">
          Disability Information
        </h2>
      </div>

      {/* Has Disability */}
      <label className="block my-3 text-md font-medium text-gray-700">
        Do you consider yourself to have a disability, impairment or long-term
        condition?
      </label>
      <select
        value={formData.disability.hasDisability ? "yes" : "no"}
        onChange={handleDisabilityChange}
        className="rounded-md border-2 w-1/3 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
      >
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>

      {/* Disability Types */}
      {formData.disability.hasDisability && (
        <div className="mb-4">
          <label className="block font-medium mb-2">
            Select all that apply:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {disabilityTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  value={type}
                  checked={formData.disability.types.includes(type)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DisabilityInfo;
