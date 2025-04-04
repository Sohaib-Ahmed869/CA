import React, { useState, useEffect } from "react";
import {
  getApplications,
  getIndustries,
} from "../../Customer/Services/adminServices";
import { MdLabel } from "react-icons/md";
import { updateQualification } from "../../Customer/Services/adminServices";
import toast from "react-hot-toast";
const ChangeQualification = ({ id, setSelectedApplication }) => {
  const [industries, setIndustries] = useState([]);
  const [qualificationOptions, setQualificationOptions] = useState([]);
  const [qualification, setQualification] = useState("");
  const [expense, setExpense] = useState(0);
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [industry, setIndustry] = useState("");
  // Store the selected industry ID
  const [selectedIndustryId, setSelectedIndustryId] = useState(null);

  const handleUpdateQualification = async () => {
    if (!selectedIndustryId || !qualification || !type || !price) {
      toast.error("Please fill all the fields");
      return;
    }
    const toastid = toast.loading("Updating Qualification...");
    try {
      const response = await updateQualification(id, {
        industry,
        qualification,
        type,
        price,
        expense,
      });
      toast.dismiss(toastid);
      toast.success("Qualification updated successfully");
      console.log("Qualification updated successfully:", response);
      setSelectedIndustryId(null);
      setQualification("");
      setIndustry("");
      setType("");
      setPrice(0);
      setExpense(0);
      const applications = await getApplications();
      console.log("Applications:", applications);
      console.log("id in qualification:", id);

      const updatedApplication = applications.filter(
        (application) => application.id === id
      );
      console.log("Updated Application:", updatedApplication);
      setSelectedApplication(updatedApplication[0]);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update qualification");
    }
  };

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
      setExpense(selectedCertificate.expense);
    }
  };

  const fetchIndustries = async () => {
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  const handleIndustryChange = (e) => {
    const selectedIndustryName = e.target.value;
    setQualification("");
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
    <div className="flex flex-col items-center animate-fade w-full bg-gray-50 my-4">
      <div className="flex flex-col ">
        <div className="mb-4 flex flex-col gap-4  mt-4">
          <label
            htmlFor="industry"
            className="text-base text-gray-700 font-outfit "
          >
            Select Industry?
          </label>
          <select
            id="industry"
            className="input lg:w-96 max-sm:w-full"
            value={industry}
            onChange={handleIndustryChange}
          >
            <option value="">Select Industry</option>
            {industries.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-4 flex flex-col gap-4 ">
          <label
            htmlFor="qualification"
            className="text-base text-gray-700 font-outfit "
          >
            {" "}
            Choose Qualification{" "}
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
      <button
        onClick={handleUpdateQualification}
        className="w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 flex items-center justify-center gap-2"
      >
        <MdLabel />
        Update Qualification
      </button>
    </div>
  );
};

export default ChangeQualification;
