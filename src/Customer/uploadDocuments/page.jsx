import React, { useState } from "react";
import Navbar from "../components/navbar";
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

  return (
    <div>
      <Navbar />
      <div className="mb-10 p-4 lg:p-20">
        <h2 className="file-2xl font-semibold mb-5">Upload Documents</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
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
                  className="border border-gray-300 p-2 max-sm:p-0 w-full"
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
                  className="border border-gray-300 p-2 max-sm:p-0 w-full"
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
                  className="border border-gray-300 p-2 max-sm:p-0 w-full"
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
                  className="border border-gray-300 p-2 max-sm:p-0 w-full"
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
                  className="border border-gray-300 p-2 max-sm:p-0 w-full"
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
                className="border border-gray-300 p-2 max-sm:p-0 w-full"
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
                className="border border-gray-300 p-2 max-sm:p-0 w-full"
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
                className="border border-gray-300 p-2 max-sm:p-0 w-full"
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
                className="border border-gray-300 p-2 max-sm:p-0 w-full"
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
              className="border border-gray-300 p-2 max-sm:p-0 w-full"
            />
          </div>
          <div className="gap-1 flex flex-col">
            <label className="text-md text-gray-600">Payslip</label>
            <input
              type="file"
              value={payslip}
              onChange={handlePayslip}
              placeholder="Payslip"
              className="border border-gray-300 p-2 max-sm:p-0 w-full"
            />
          </div>
        </div>
        <button className="btn btn-primary text-white p-2 max-sm:p-0 rounded mt-5 w-full">
          Submit
        </button>
      </div>
    </div>
  );
};

export default UploadDocuments;
