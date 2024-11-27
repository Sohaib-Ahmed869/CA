import React, { useState, useEffect } from "react";
import { getIndustries } from "../Services/adminServices";
import SpinnerLoader from "../components/spinnerLoader";

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
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [industries, setIndustries] = useState([]);
  const [qualificationOptions, setQualificationOptions] = useState([]);

  // Store the selected industry ID
  const [selectedIndustryId, setSelectedIndustryId] = useState(null);

  const onChangeCertificate = (e) => {
    setQualification(e.target.value);

    // Find the selected certificate
    const selectedCertificate = qualificationOptions.find(
      (certificate) => certificate.qualification === e.target.value
    );

    // Set the type and price of the certificate
    if (selectedCertificate) {
      setType(selectedCertificate.type);
      setPrice(selectedCertificate.price);
    }
  };

  const fetchIndustries = async () => {
    setSubmissionLoading(true);
    try {
      const response = await getIndustries();
      console.log("Industries:", response.industries);

      // Set industries and extract all certifications
      setIndustries(response.industries);
      const updatedQualifications = response.industries.flatMap(
        (industry) => industry.certifications || []
      );
      setQualificationOptions(updatedQualifications);
      console.log("Certifications:", updatedQualifications);
      setSubmissionLoading(false);
    } catch (err) {
      console.log(err);
      setSubmissionLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  const handleIndustryChange = (e) => {
    const selectedIndustryName = e.target.value;
    setIndustry(selectedIndustryName);

    // Find the selected industry's ID
    const selectedIndustry = industries.find(
      (industry) => industry.name === selectedIndustryName
    );

    if (selectedIndustry) {
      setSelectedIndustryId(selectedIndustry.id);
    } else {
      setSelectedIndustryId(null);
    }
  };

  return (
    <div className="flex flex-col items-center animate-fade w-full">
      {submissionLoading && <SpinnerLoader />}
      <div className="flex flex-col items-center">
        <div className="mb-4 flex flex-col gap-4 text-center mt-4">
          <label htmlFor="industry">What industry is your experience in?</label>
          <select
            id="industry"
            className="input lg:w-96 max-sm:w-full"
            value={industry}
            onChange={handleIndustryChange}
          >
            <option value="">Select an option</option>
            {industries.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
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
            <option value="">Select an option</option>
            {qualificationOptions
              .filter((option) => option.industryId === selectedIndustryId)
              .map((option) => (
                <option key={option.qualification} value={option.qualification}>
                  {option.qualification}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Screen1;
