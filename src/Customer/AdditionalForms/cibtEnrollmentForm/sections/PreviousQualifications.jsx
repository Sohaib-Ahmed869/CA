// sections/PreviousQualifications.js
import React from "react";

const PreviousQualifications = ({ formData, setFormData }) => {
  const qualificationOptions = [
    "Bachelor degree or higher degree",
    "Advanced diploma or associate degree",
    "Diploma (or associate diploma)",
    "Certificate IV (or advanced certificate/technician)",
    "Certificate III (or trade certificate)",
    "Certificate II",
    "Certificate I",
    "Other education",
  ];

  const handleQualificationChange = (e) => {
    const { value, checked } = e.target;
    const updatedList = checked
      ? [...formData.previousQualifications, value]
      : formData.previousQualifications.filter((q) => q !== value);

    setFormData({
      ...formData,
      previousQualifications: updatedList,
    });
  };

  return (
    <div>
      <div className="flex items-center mb-6 border-b pb-2">
        <div className="w-1 h-6 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-2xl font-semibold text-green-700">
          Previous Qualifications Achieved
        </h2>
      </div>
      <label className="block my-2 text-md font-medium text-gray-700">
        Have you successfully completed any of the following qualifications?
      </label>

      <div className="grid grid-cols-2 gap-2">
        {qualificationOptions.map((qualification) => (
          <label
            key={qualification}
            className="block text-md font-regular text-gray-600"
          >
            <input
              type="checkbox"
              value={qualification}
              checked={formData.previousQualifications.includes(qualification)}
              onChange={handleQualificationChange}
              className="mr-2 rounded-md"
            />
            {qualification}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PreviousQualifications;
