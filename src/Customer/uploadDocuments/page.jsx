import React, { useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { documentsUpload } from "../Services/customerApplication";
const UploadDocuments = () => {
  const [hundredPointsOfID, setHundredPointsOfID] = useState({
    driversLicense: "",
    passport: "",
    birthCertificate: "",
    medicareCard: "",
    creditCard: "",
  });

  const [resume, setResume] = useState("");
  const [previousQualifications, setPreviousQualifications] = useState("");

  const [twoReferences, setTwoReferences] = useState({
    referenceOne: "",
    referenceTwo: "",
  });

  const [employmentLetter, setEmploymentLetter] = useState("");
  const [payslip, setPayslip] = useState("");

  const handleChange = (e) => {
    setHundredPointsOfID({
      ...hundredPointsOfID,
      [e.target.name]: e.target.value,
    });
  };

  const handleResume = (e) => {
    setResume(e.target.value);
  };

  const handlePreviousQualifications = (e) => {
    setPreviousQualifications(e.target.value);
  };

  const handleTwoReferences = (e) => {
    setTwoReferences({
      ...twoReferences,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmploymentLetter = (e) => {
    setEmploymentLetter(e.target.value);
  };

  const handlePayslip = (e) => {
    setPayslip(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("license", hundredPointsOfID.driversLicense);
    formData.append("passport", hundredPointsOfID.passport);
    formData.append("birth_certificate", hundredPointsOfID.birthCertificate);
    formData.append("medicare", hundredPointsOfID.medicareCard);
    formData.append("creditcard", hundredPointsOfID.creditCard);
    formData.append("resume", resume);
    formData.append("previous_qualifications", previousQualifications);
    formData.append("reference1", twoReferences.referenceOne);
    formData.append("reference2", twoReferences.referenceTwo);
    formData.append("employmentLetter", employmentLetter);
    formData.append("payslip", payslip);

    try {
      const id = window.location.pathname.split("/")[2];
      const applicationId = id;
      const response = await documentsUpload(formData, applicationId);

      alert("Documents uploaded successfully");
      navigate("/");
    } catch (err) {
      alert("Error uploading documents");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-5 lg:p-60 lg:pt-20 lg:pb-20">
        <div className="flex flex-col items-center text-left w-full">
          <h1 className="text-2xl lg:text-3xl font-bold">Upload Documents</h1>
          <p className="text-md text-gray-600 mb-3 lg:mb-8 mt-2">
            Please upload the following documents to complete your application.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-1 bg-white p-5 rounded-lg shadow-lg">
          <div>
            <h3 className="file-lg font-semibold mb-3">100 Points of ID</h3>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="gap-1 flex flex-col">
                <label className="text-md text-gray-600">
                  Driver's License
                </label>
                <input
                  type="file"
                  name="driversLicense"
                  id="driversLicense"
                  value={hundredPointsOfID.driversLicense}
                  onChange={handleChange}
                  placeholder="Driver's License"
                  className="border border-gray-300 max-sm:p-0 w-full"
                />
              </div>
              <div className="gap-1 flex flex-col">
                <label className="text-md text-gray-600">Passport</label>
                <input
                  type="file"
                  name="passport"
                  id="passport"
                  value={hundredPointsOfID.passport}
                  onChange={handleChange}
                  placeholder="Passport"
                  className="border border-gray-300 max-sm:p-0 w-full"
                />
              </div>
              <div className="gap-1 flex flex-col">
                <label className="text-md text-gray-600">
                  Birth Certificate
                </label>
                <input
                  type="file"
                  name="birthCertificate"
                  id="birthCertificate"
                  value={hundredPointsOfID.birthCertificate}
                  onChange={handleChange}
                  placeholder="Birth Certificate"
                  className="border border-gray-300 max-sm:p-0 w-full"
                />
              </div>
              <div className="gap-1 flex flex-col">
                <label className="text-md text-gray-600">Medicare Card</label>
                <input
                  type="file"
                  name="medicareCard"
                  id="medicareCard"
                  value={hundredPointsOfID.medicareCard}
                  onChange={handleChange}
                  placeholder="Medicare Card"
                  className="border border-gray-300 max-sm:p-0 w-full"
                />
              </div>
              <div className="gap-1 flex flex-col">
                <label className="text-md text-gray-600">Credit Card</label>
                <input
                  type="file"
                  name="creditCard"
                  id="creditCard"
                  value={hundredPointsOfID.creditCard}
                  onChange={handleChange}
                  placeholder="Credit Card"
                  className="border border-gray-300 max-sm:p-0 w-full"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="file-lg font-semibold mb-3">Other Documents</h3>
            <div className="gap-1 flex flex-col">
              <label className="text-md text-gray-600">Resume</label>
              <input
                type="file"
                value={resume}
                onChange={handleResume}
                placeholder="Resume"
                className="border border-gray-300 max-sm:p-0 w-full"
              />
            </div>
            <div className="gap-1 flex flex-col mt-4">
              <label className="text-md text-gray-600">
                Previous Qualifications
              </label>
              <input
                type="file"
                value={previousQualifications}
                onChange={handlePreviousQualifications}
                placeholder="Previous Qualifications"
                className="border border-gray-300 max-sm:p-0 w-full"
              />
            </div>
          </div>
          <h3 className="file-lg font-semibold mb-3">Two References</h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="gap-1 flex flex-col">
              <label className="text-md text-gray-600">Reference One</label>
              <input
                type="file"
                name="referenceOne"
                id="referenceOne"
                value={twoReferences.referenceOne}
                onChange={handleTwoReferences}
                placeholder="Reference One"
                className="border border-gray-300 max-sm:p-0 w-full"
              />
            </div>
            <div className="gap-1 flex flex-col">
              <label className="text-md text-gray-600">Reference Two</label>
              <input
                type="file"
                name="referenceTwo"
                id="referenceTwo"
                value={twoReferences.referenceTwo}
                onChange={handleTwoReferences}
                placeholder="Reference Two"
                className="border border-gray-300 max-sm:p-0 w-full"
              />
            </div>
          </div>
          <h3 className="file-lg font-semibold mb-3">Employment Documents</h3>
          <div className="gap-1 flex flex-col">
            <label className="text-md text-gray-600">Employment Letter</label>

            <input
              type="file"
              value={employmentLetter}
              onChange={handleEmploymentLetter}
              placeholder="Employment Letter"
              className="border border-gray-300 max-sm:p-0 w-full"
            />
          </div>
          <div className="gap-1 flex flex-col">
            <label className="text-md text-gray-600">Payslip</label>
            <input
              type="file"
              value={payslip}
              onChange={handlePayslip}
              placeholder="Payslip"
              className="border border-gray-300 max-sm:p-0 w-full"
            />
          </div>
        </div>
        <button
          className="btn btn-primary text-white p-2 max-sm:p-0 rounded mt-5 w-full"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UploadDocuments;
