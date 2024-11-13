import React, { useState } from "react";
import certificates from "../../certificate";

const Screen1 = ({
  industry,
  setIndustry,
  qualification,
  setQualification,
  type,
  setType,
  price,
  setPrice,
}) => {
  const industryOptions = [
    "Community Services",
    "Finance & Accounting",
    "Building & Construction",
    "Business",
    "Automotive",
    "Real Estate",
    "Information & Communications Technology",
    "Beauty Therapy & Hairdressing",
    "Training & Education",
    "Hospitality",
    "Security Management",
    "Fitness & Allied Health",
    "Electrical",
    "Travel and Tourism",
  ];

  const [qualificationOptions, setQualificationOptions] =
    useState(certificates);

  const onChangeCertificate = (e) => {
    setQualification(e.target.value);
    //find the selected certificate
    const selectedCertificate = qualificationOptions.find(
      (certificate) => certificate.qualification === e.target.value
    );
    //set the type of the certificate
    setType(selectedCertificate.type);
    //set the price of the certificate
    setPrice(selectedCertificate.price);
  };

  return (
    <div className="flex flex-col items-center animate-fade w-full">
      <div className="flex flex-col items-center">
        <div className="mb-4 flex flex-col gap-4 text-center mt-4">
          <label htmlFor="industry">What industry is your experience in?</label>
          <select
            id="industry"
            className="input lg:w-96 max-sm:w-full"
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
            className="input lg:w-96 max-sm:w-full"
            value={qualification}
            onChange={onChangeCertificate}
          >
            <option value="">Select an option</option>[
            {qualificationOptions
              .filter((option) => option.industry === industry)
              .map((option) => (
                <option key={option.qualification} value={option.qualification}>
                  {option.qualification}
                </option>
              ))}
            ]
          </select>
        </div>
      </div>
    </div>
  );
};

export default Screen1;
