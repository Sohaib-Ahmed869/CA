import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { documentsUpload } from "../Services/customerApplication";
import SpinnerLoader from "../components/spinnerLoader";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
const UploadDocuments = () => {
  const [submissionLoading, setSubmissionLoading] = useState(false);
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
      [e.target.name]: e.target.files[0], // Set the File object directly
    });
  };

  const handleResume = (e) => {
    setResume(e.target.files[0]);
  };

  const handlePreviousQualifications = (e) => {
    setPreviousQualifications(e.target.files[0]);
  };

  const handleTwoReferences = (e) => {
    setTwoReferences({
      ...twoReferences,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleEmploymentLetter = (e) => {
    setEmploymentLetter(e.target.files[0]);
  };

  const handlePayslip = (e) => {
    setPayslip(e.target.files[0]);
  };

  const navigate = useNavigate();

  const successToast = () => toast.success("Documents uploaded successfully");
  const errorToast = () => toast.error("Please fill in all the fields");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !hundredPointsOfID.driversLicense ||
      !hundredPointsOfID.passport ||
      !hundredPointsOfID.birthCertificate ||
      !hundredPointsOfID.medicareCard ||
      !hundredPointsOfID.creditCard ||
      !resume ||
      !previousQualifications ||
      !twoReferences.referenceOne ||
      !twoReferences.referenceTwo ||
      !employmentLetter ||
      !payslip
    ) {
      // Show an error toast
      errorToast();
      return;
    }
    setSubmissionLoading(true);
    const formData = new FormData();
    formData.append("license", hundredPointsOfID.driversLicense);
    formData.append("passport", hundredPointsOfID.passport);
    formData.append("birth_certificate", hundredPointsOfID.birthCertificate);
    formData.append("medicare", hundredPointsOfID.medicareCard);
    formData.append("creditcard", hundredPointsOfID.creditCard);
    formData.append("resume", resume);
    formData.append("previousQualifications", previousQualifications);
    formData.append("reference1", twoReferences.referenceOne);
    formData.append("reference2", twoReferences.referenceTwo);
    formData.append("employmentLetter", employmentLetter);
    formData.append("payslip", payslip);

    try {
      const id = window.location.pathname.split("/")[2];
      const applicationId = id;
      const response = await documentsUpload(formData, applicationId);
      console.log(response);
      setSubmissionLoading(false);
      successToast();

      alert("Documents uploaded successfully");
      navigate("/");
    } catch (err) {
      setSubmissionLoading(false);
      alert("Error uploading documents");
    }
  };

  useEffect(() => {
    console.log(hundredPointsOfID);
    console.log(resume);
    console.log(previousQualifications);
    console.log(twoReferences);
    console.log(employmentLetter);
    console.log(payslip);
  }, [
    hundredPointsOfID,
    resume,
    previousQualifications,
    twoReferences,
    employmentLetter,
    payslip,
  ]);
  return (
    <div>
      <Navbar />
      <Toaster position="bottom-right" reverseOrder={false} />
      {submissionLoading && <SpinnerLoader />}
      <div className="p-5 lg:p-60 lg:pt-36 lg:pb-20">
        <div className="flex flex-col items-center text-left w-full">
          <h1 className="text-2xl lg:text-3xl font-bold">Upload Documents</h1>
          <p className="text-md text-gray-600 mb-3 lg:mb-8 mt-2">
            Please upload the following documents to complete your application.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-1 bg-white p-5 rounded-lg shadow-lg">
          <p className="text-md text-red-500 mb-3">
            Please ensure all documents are clear and legible. All documents
            must be in PDF format. Maximum file size is 5MB.
          </p>
          <div>
            <h3 className="file-lg font-semibold mb-3">100 Points of ID</h3>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="gap-1 flex flex-col">
                <label className="text-md text-gray-600">
                  Driver's License <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="driversLicense"
                  id="driversLicense"
                  onChange={handleChange}
                  placeholder="Driver's License"
                  className="border border-gray-300 max-sm:p-0 w-full"
                />
              </div>
              <div className="gap-1 flex flex-col">
                <label className="text-md text-gray-600">
                  Passport <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="passport"
                  id="passport"
                  onChange={handleChange}
                  placeholder="Passport"
                  className="border border-gray-300 max-sm:p-0 w-full"
                />
              </div>
              <div className="gap-1 flex flex-col">
                <label className="text-md text-gray-600">
                  Birth Certificate <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="birthCertificate"
                  id="birthCertificate"
                  onChange={handleChange}
                  placeholder="Birth Certificate"
                  className="border border-gray-300 max-sm:p-0 w-full"
                />
              </div>
              <div className="gap-1 flex flex-col">
                <label className="text-md text-gray-600">
                  Medicare Card <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="medicareCard"
                  id="medicareCard"
                  onChange={handleChange}
                  placeholder="Medicare Card"
                  className="border border-gray-300 max-sm:p-0 w-full"
                />
              </div>
              <div className="gap-1 flex flex-col">
                <label className="text-md text-gray-600">
                  Credit Card <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="creditCard"
                  id="creditCard"
                  onChange={handleChange}
                  placeholder="Credit Card"
                  className="border border-gray-300 max-sm:p-0 w-full"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="file-lg font-semibold mb-3">
              Other Documents <span className="text-red-500">*</span>
            </h3>
            <div className="gap-1 flex flex-col">
              <label className="text-md text-gray-600">Resume</label>
              <input
                type="file"
                onChange={handleResume}
                placeholder="Resume"
                className="border border-gray-300 max-sm:p-0 w-full"
              />
            </div>
            <div className="gap-1 flex flex-col mt-4">
              <label className="text-md text-gray-600">
                Previous Qualifications <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handlePreviousQualifications}
                placeholder="Previous Qualifications"
                className="border border-gray-300 max-sm:p-0 w-full"
              />
            </div>
          </div>
          <h3 className="file-lg font-semibold mb-3">
            Two References <span className="text-red-500">*</span>
          </h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="gap-1 flex flex-col">
              <label className="text-md text-gray-600">
                Reference One <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="referenceOne"
                id="referenceOne"
                onChange={handleTwoReferences}
                placeholder="Reference One"
                className="border border-gray-300 max-sm:p-0 w-full"
              />
            </div>
            <div className="gap-1 flex flex-col">
              <label className="text-md text-gray-600">
                Reference Two <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="referenceTwo"
                id="referenceTwo"
                onChange={handleTwoReferences}
                placeholder="Reference Two"
                className="border border-gray-300 max-sm:p-0 w-full"
              />
            </div>
          </div>
          <h3 className="file-lg font-semibold mb-3">
            Employment Documents <span className="text-red-500">*</span>
          </h3>
          <div className="gap-1 flex flex-col">
            <label className="text-md text-gray-600">
              Employment Letter <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              onChange={handleEmploymentLetter}
              placeholder="Employment Letter"
              className="border border-gray-300 max-sm:p-0 w-full"
            />
          </div>
          <div className="gap-1 flex flex-col">
            <label className="text-md text-gray-600">
              Payslip <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
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
