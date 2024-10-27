import React, { useState } from "react";

const Screen1 = ({
  industry,
  setIndustry,
  qualification,
  setQualification,
}) => {
  const industryOptions = [
    "Community Services",
    "Construction",
    "Education",
    "Engineering",
    "Finance",
    "Healthcare",
    "Hospitality",
    "Information Technology",
    "Manufacturing",
    "Mining",
    "Retail",
    "Transportation",
    "Other",
  ];

  const qualificationOptions = [
    "Certificate",
    "Diploma",
    "Advanced Diploma",
    "Bachelor Degree",
    "Masters Degree",
    "Doctorate",
    "Other",
  ];

  return (
    <div className="flex flex-col items-center animate-fade w-full">
      <div className="flex flex-col items-center">
        <div className="mb-4 flex flex-col gap-4 text-center mt-4">
          <label htmlFor="industry">What industry is your experience in?</label>
          <select
            id="industry"
            className="input lg:w-96"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <option value="">Select an option</option>
            {industryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-4 flex flex-col gap-4 text-center">
          <label htmlFor="qualification">
            What qualification are you looking for?
          </label>
          <select
            id="qualification"
            className="input ;g:w-96"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          >
            <option value="">Select an option</option>
            {qualificationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Screen1;
