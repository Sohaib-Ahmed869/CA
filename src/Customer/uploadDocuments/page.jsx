import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { documentsUpload } from "../Services/customerApplication";
import { BsCheck } from "react-icons/bs";
import { CgLock } from "react-icons/cg";
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
    idCard: "",
    australianCitizenship: "",
  });

  const [resume, setResume] = useState("");
  const [previousQualifications, setPreviousQualifications] = useState("");

  const [twoReferences, setTwoReferences] = useState({
    referenceOne: "",
    referenceTwo: "",
  });

  const [applicationIndustry, setApplicationIndustry] = useState("");

  const [employmentLetter, setEmploymentLetter] = useState("");
  const [payslip, setPayslip] = useState("");

  const [score, setScore] = useState(0);

  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const [video1, setVideo1] = useState("");
  const [video2, setVideo2] = useState("");

  const handleChange = (e) => {
    //if file size is greater than 5MB
    if (e.target.files[0].size > 5000000) {
      alert("File size is too large. Maximum file size is 5MB");
      return;
    }

    setHundredPointsOfID({
      ...hundredPointsOfID,
      [e.target.name]: e.target.files[0], // Set the File object directly
    });
  };

  const handleResume = (e) => {
    //if file size is greater than 5MB
    if (e.target.files[0].size > 5000000) {
      alert("File size is too large. Maximum file size is 5MB");
      return;
    }

    setResume(e.target.files[0]);
  };

  const handlePreviousQualifications = (e) => {
    //if file size is greater than 5MB
    if (e.target.files[0].size > 5000000) {
      alert("File size is too large. Maximum file size is 5MB");
      return;
    }

    setPreviousQualifications(e.target.files[0]);
  };

  const handleTwoReferences = (e) => {
    //if file size is greater than 5MB
    if (e.target.files[0].size > 5000000) {
      alert("File size is too large. Maximum file size is 5MB");
      return;
    }

    setTwoReferences({
      ...twoReferences,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleEmploymentLetter = (e) => {
    //if file size is greater than 5MB
    if (e.target.files[0].size > 5000000) {
      alert("File size is too large. Maximum file size is 5MB");
      return;
    }

    setEmploymentLetter(e.target.files[0]);
  };

  const handlePayslip = (e) => {
    //if file size is greater than 5MB
    if (e.target.files[0].size > 5000000) {
      alert("File size is too large. Maximum file size is 5MB");
      return;
    }

    setPayslip(e.target.files[0]);
  };

  useEffect(() => {
    let score = 0;
    if (hundredPointsOfID.driversLicense) {
      score += 40;
    }
    if (hundredPointsOfID.idCard) {
      score += 40;
    }
    if (hundredPointsOfID.passport) {
      score += 70;
    }
    if (hundredPointsOfID.birthCertificate) {
      score += 70;
    }
    if (hundredPointsOfID.medicareCard) {
      score += 25;
    }

    setScore(score);
  }, [hundredPointsOfID]);
  const navigate = useNavigate();

  const getApplicationIndustry = async () => {
    //from local storage
    const industry = localStorage.getItem("applicationIndustry");
    setApplicationIndustry(industry);
  };

  useEffect(() => {
    getApplicationIndustry();
  }, []);

  const successToast = () => toast.success("Documents uploaded successfully");
  const errorToast = () => toast.error("Please fill in all the fields");
  const errorToast2 = () =>
    toast.error("100 points of ID score is less than 100");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !hundredPointsOfID.creditCard ||
      !resume ||
      !previousQualifications ||
      !twoReferences.referenceOne ||
      !employmentLetter ||
      !payslip
    ) {
      // Show an error toast
      errorToast();
      return;
    }

    if (score < 100) {
      errorToast2();
      return;
    }

    if (applicationIndustry === "Automotive") {
      if (!image1 || !image2 || !image3 || !image4 || !video1 || !video2) {
        errorToast();
        return;
      }
    }

    setSubmissionLoading(true);
    const formData = new FormData();
    if (hundredPointsOfID.passport) {
      formData.append("passport", hundredPointsOfID.passport);
    }
    if (hundredPointsOfID.driversLicense) {
      formData.append("license", hundredPointsOfID.driversLicense);
    }
    if (hundredPointsOfID.idCard) {
      formData.append("idCard", hundredPointsOfID.idCard);
    }
    if (hundredPointsOfID.australianCitizenship) {
      formData.append(
        "australian_citizenship",
        hundredPointsOfID.australianCitizenship
      );
    }
    if (hundredPointsOfID.birthCertificate) {
      formData.append("birth_certificate", hundredPointsOfID.birthCertificate);
    }
    if (hundredPointsOfID.medicareCard)
      formData.append("medicare", hundredPointsOfID.medicareCard);

    if (hundredPointsOfID.creditCard)
      formData.append("creditcard", hundredPointsOfID.creditCard);

    if (resume) formData.append("resume", resume);

    if (previousQualifications)
      formData.append("previousQualifications", previousQualifications);

    if (twoReferences.referenceOne)
      formData.append("reference1", twoReferences.referenceOne);

    if (twoReferences.referenceTwo)
      formData.append("reference2", twoReferences.referenceTwo);

    if (employmentLetter) formData.append("employmentLetter", employmentLetter);

    if (payslip) formData.append("payslip", payslip);

    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);
    if (image3) formData.append("image3", image3);
    if (image4) formData.append("image4", image4);
    if (video1) formData.append("video1", video1);
    if (video2) formData.append("video2", video2);

    try {
      const id = window.location.pathname.split("/")[2];
      const applicationId = id;
      const response = await documentsUpload(
        formData,
        applicationId,
        applicationIndustry
      );
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
      <Toaster position="top-right" reverseOrder={false} />
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
            must be in PDF or PNG format. Maximum file size is 5MB.
          </p>
          <div>
            <h3 className="file-lg font-semibold mb-3">
              100 Points of ID<span className="text-red-500">*</span>
            </h3>
            <div
              className={`flex items-center gap-2 border border-gray-300 p-2 rounded-lg mb-3 ${
                score > 100 ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {score > 100 ? (
                <BsCheck className="text-green-400 text-2xl" />
              ) : (
                <p className="text-red-800 text-xl">X</p>
              )}
              <p className="text-md">Score: {score}/100</p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="gap-1 flex flex-col">
                <label className="text-md text-gray-600">
                  Driver's License
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
                <label className="text-md text-gray-600">ID Card</label>
                <input
                  type="file"
                  name="idCard"
                  id="idCard"
                  onChange={handleChange}
                  placeholder="ID Card"
                  className="border border-gray-300 max-sm:p-0 w-full"
                />
              </div>

              <div className="gap-1 flex flex-col">
                <label className="text-md text-gray-600">Passport</label>
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
                  Australian Citizenship
                </label>
                <input
                  type="file"
                  name="australianCitizenship"
                  id="australianCitizenship"
                  onChange={handleChange}
                  placeholder="Australian Citizenship"
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
              <label className="text-md text-gray-600">Reference Two</label>
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
              Payslip/Invoice <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              onChange={handlePayslip}
              placeholder="Payslip"
              className="border border-gray-300 max-sm:p-0 w-full"
            />
          </div>
          {/* if the industry is automotive ask for videos and images */}
          {applicationIndustry === "Automotive" && (
            <>
              <h3 className="file-lg font-semibold mb-3">
                Images and Videos <span className="text-red-500">*</span>
              </h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 bg-white p-5 rounded-lg">
                <div className="gap-1 flex flex-col">
                  <label className="text-md text-gray-600">
                    Image 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setImage1(e.target.files[0])}
                    placeholder="Image 1"
                    className="border border-gray-300 max-sm:p-0 w-full"
                  />
                </div>
                <div className="gap-1 flex flex-col">
                  <label className="text-md text-gray-600">
                    Image 2 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setImage2(e.target.files[0])}
                    placeholder="Image 2"
                    className="border border-gray-300 max-sm:p-0 w-full"
                  />
                </div>
                <div className="gap-1 flex flex-col">
                  <label className="text-md text-gray-600">
                    Image 3 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setImage3(e.target.files[0])}
                    placeholder="Image 3"
                    className="border border-gray-300 max-sm:p-0 w-full"
                  />
                </div>
                <div className="gap-1 flex flex-col">
                  <label className="text-md text-gray-600">
                    Image 4 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setImage4(e.target.files[0])}
                    placeholder="Image 4"
                    className="border border-gray-300 max-sm:p-0 w-full"
                  />
                </div>
                <div className="gap-1 flex flex-col">
                  <label className="text-md text-gray-600">
                    Video 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setVideo1(e.target.files[0])}
                    placeholder="Video 1"
                    className="border border-gray-300 max-sm:p-0 w-full"
                  />
                </div>
                <div className="gap-1 flex flex-col">
                  <label className="text-md text-gray-600">
                    Video 2 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setVideo2(e.target.files[0])}
                    placeholder="Video 2"
                    className="border border-gray-300 max-sm:p-0 w-full"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <button
          className={`btn btn-primary text-white p-2 max-sm:p-0 rounded mt-5 w-full ${
            score >= 100 ? "bg-primary" : "disabled bg-gray-500"
          }`}
          onClick={handleSubmit}
        >
          {score < 100 ? (
            <div className="flex items-center justify-center gap-2">
              <CgLock /> Submit
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadDocuments;
