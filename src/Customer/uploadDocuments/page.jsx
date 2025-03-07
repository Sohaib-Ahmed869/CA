import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import SingleFileUploader from "./SingleFileUploader";
import { BsCheck } from "react-icons/bs";
import { CgLock } from "react-icons/cg";
import SpinnerLoader from "../components/spinnerLoader";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import axios from "axios";
const UploadDocuments = () => {
  const navigate = useNavigate();
  const [submissionLoading, setSubmissionLoading] = useState(false);

  // The application ID and industry
  const [applicationId, setApplicationId] = useState("");
  const [applicationIndustry, setApplicationIndustry] = useState("");

  // 100 Points of ID fields: must match what you want in Firestore
  const [hundredPointsOfID, setHundredPointsOfID] = useState({
    driversLicense: "",
    passport: "",
    birthCertificate: "",
    medicareCard: "",
    creditcard: "",
    idCard: "",
    australianCitizenship: "",
  });

  // Other fields
  const [resume, setResume] = useState("");
  const [previousQualifications, setPreviousQualifications] = useState("");
  const [twoReferences, setTwoReferences] = useState({
    reference1: "",
    reference2: "",
  });
  const [employmentLetter, setEmploymentLetter] = useState("");
  const [payslip, setPayslip] = useState("");
  const [images, setImages] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });
  const [videos, setVideos] = useState({
    video1: "",
    video2: "",
  });

  const [score, setScore] = useState(0);

  // Called after each single-file upload success
  const handleHundredPointsUploadSuccess = (field, fileUrl) => {
    setHundredPointsOfID((prev) => ({ ...prev, [field]: fileUrl }));
  };

  const handleHundredPointsDeleteSuccess = (field) => {
    setHundredPointsOfID((prev) => ({ ...prev, [field]: "" }));
  };

  // Recalculate the "100 Points of ID" score whenever ID fields change
  useEffect(() => {
    let newScore = 0;
    if (hundredPointsOfID.driversLicense) newScore += 40;
    if (hundredPointsOfID.idCard) newScore += 40;
    if (hundredPointsOfID.passport) newScore += 70;
    if (hundredPointsOfID.birthCertificate) newScore += 70;
    if (hundredPointsOfID.medicareCard) newScore += 25;
    setScore(newScore);
  }, [hundredPointsOfID]);

  // On mount, grab the application ID from the URL and the industry from localStorage
  useEffect(() => {
    const idFromUrl = window.location.pathname.split("/")[2];
    setApplicationId(idFromUrl);
    const industry = localStorage.getItem("applicationIndustry");
    setApplicationIndustry(industry);
  }, []);

  // Toast helpers
  const successToast = () => toast.success("Documents uploaded successfully");
  const errorToast = () => toast.error("Please fill in all the required fields");
  const errorToast2 = () =>
    toast.error("100 points of ID score is less than 100");

  // Final Submit: all single-file uploads are already done
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check required fields
    if (
      !hundredPointsOfID.creditcard ||
      !resume ||
      !previousQualifications ||
      !twoReferences.reference1 ||
      !employmentLetter ||
      !payslip
    ) {
      errorToast();
      return;
    }

    // Check 100 points
    if (score < 100) {
      errorToast2();
      return;
    }

    // If automotive or building, check images/videos
    if (
      applicationIndustry === "Automotive" ||
      applicationIndustry === "Building & Construction"
    ) {
      if (
        !images.image1 ||
        !images.image2 ||
        !images.image3 ||
        !images.image4 ||
        !videos.video1 ||
        !videos.video2
      ) {
        errorToast();
        return;
      }
    }

    setSubmissionLoading(true);
    try {
      await axios.post(`/api/users/${applicationId}/submitDocument`, {});

      setSubmissionLoading(false);
      successToast();
      alert("Documents uploaded successfully");
      navigate("/");
    } catch (err) {
      setSubmissionLoading(false);
      alert("Error submitting documents");
    }
  };

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
              100 Points of ID <span className="text-red-500">*</span>
            </h3>
            <div
              className={`flex items-center gap-2 border border-gray-300 p-2 rounded-lg mb-3 ${
                score >= 100 ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {score >= 100 ? (
                <BsCheck className="text-green-400 text-2xl" />
              ) : (
                <p className="text-red-800 text-xl">X</p>
              )}
              <p className="text-md">Score: {score}/100</p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="gap-1 flex flex-col">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="driversLicense" 
                  label="Driver's License"
                  onUploadSuccess={handleHundredPointsUploadSuccess}
                  onDeleteSuccess={handleHundredPointsDeleteSuccess}
                />
              </div>
              <div className="gap-1 flex flex-col">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="idCard"
                  label="ID Card"
                  onUploadSuccess={handleHundredPointsUploadSuccess}
                  onDeleteSuccess={handleHundredPointsDeleteSuccess}
                />
              </div>
              <div className="gap-1 flex flex-col">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="passport"
                  label="Passport"
                  onUploadSuccess={handleHundredPointsUploadSuccess}
                  onDeleteSuccess={handleHundredPointsDeleteSuccess}
                />
              </div>
              <div className="gap-1 flex flex-col">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="australianCitizenship"
                  label="Australian Citizenship"
                  onUploadSuccess={handleHundredPointsUploadSuccess}
                  onDeleteSuccess={handleHundredPointsDeleteSuccess}
                />
              </div>
              <div className="gap-1 flex flex-col">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="birthCertificate"
                  label="Birth Certificate"
                  onUploadSuccess={handleHundredPointsUploadSuccess}
                  onDeleteSuccess={handleHundredPointsDeleteSuccess}
                />
              </div>
              <div className="gap-1 flex flex-col">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="medicareCard"
                  label="Medicare Card"
                  onUploadSuccess={handleHundredPointsUploadSuccess}
                  onDeleteSuccess={handleHundredPointsDeleteSuccess}
                />
              </div>
              <div className="gap-1 flex flex-col">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="creditcard"
                  label="Credit Card"
                  onUploadSuccess={handleHundredPointsUploadSuccess}
                  onDeleteSuccess={handleHundredPointsDeleteSuccess}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="file-lg font-semibold mb-3">
              Other Documents <span className="text-red-500">*</span>
            </h3>
            <div className="gap-1 flex flex-col">
              <SingleFileUploader
                applicationId={applicationId}
                fieldName="resume"
                label="Resume"
                onUploadSuccess={(field, fileUrl) => setResume(fileUrl)}
                onDeleteSuccess={() => setResume("")}
              />
            </div>
            <div className="gap-1 flex flex-col mt-4">
              <SingleFileUploader
                applicationId={applicationId}
                fieldName="previousQualifications"
                label="Previous Qualifications"
                onUploadSuccess={(field, fileUrl) =>
                  setPreviousQualifications(fileUrl)
                }
                onDeleteSuccess={() => setPreviousQualifications("")}
              />
            </div>
          </div>
          <h3 className="file-lg font-semibold mb-3">
            Two References <span className="text-red-500">*</span>
          </h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="gap-1 flex flex-col">
              <SingleFileUploader
                applicationId={applicationId}
                fieldName="reference1"
                label="Reference One"
                onUploadSuccess={(field, fileUrl) =>
                  setTwoReferences((prev) => ({ ...prev, reference1: fileUrl }))
                }
                onDeleteSuccess={() =>
                  setTwoReferences((prev) => ({ ...prev, reference1: "" }))
                }
              />
            </div>
            <div className="gap-1 flex flex-col">
              <SingleFileUploader
                applicationId={applicationId}
                fieldName="reference2"
                label="Reference Two"
                onUploadSuccess={(field, fileUrl) =>
                  setTwoReferences((prev) => ({ ...prev, reference2: fileUrl }))
                }
                onDeleteSuccess={() =>
                  setTwoReferences((prev) => ({ ...prev, reference2: "" }))
                }
              />
            </div>
          </div>
          <h3 className="file-lg font-semibold mb-3">
            Employment Documents <span className="text-red-500">*</span>
          </h3>
          <div className="gap-1 flex flex-col">
            <SingleFileUploader
              applicationId={applicationId}
              fieldName="employmentLetter"
              label="Employment Letter"
              onUploadSuccess={(field, fileUrl) => setEmploymentLetter(fileUrl)}
              onDeleteSuccess={() => setEmploymentLetter("")}
            />
          </div>
          <div className="gap-1 flex flex-col">
            <SingleFileUploader
              applicationId={applicationId}
              fieldName="payslip"
              label="Payslip/Invoice"
              onUploadSuccess={(field, fileUrl) => setPayslip(fileUrl)}
              onDeleteSuccess={() => setPayslip("")}
            />
          </div>
          {(applicationIndustry === "Automotive" ||
            applicationIndustry === "Building & Construction") && (
            <>
              <h3 className="file-lg font-semibold mb-3">
                Images and Videos <span className="text-red-500">*</span>
              </h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 bg-white p-5 rounded-lg">
                <div className="gap-1 flex flex-col">
                  <SingleFileUploader
                    applicationId={applicationId}
                    fieldName="image1"
                    label="Image 1"
                    onUploadSuccess={(field, fileUrl) =>
                      setImages((prev) => ({ ...prev, image1: fileUrl }))
                    }
                    onDeleteSuccess={() =>
                      setImages((prev) => ({ ...prev, image1: "" }))
                    }
                  />
                </div>
                <div className="gap-1 flex flex-col">
                  <SingleFileUploader
                    applicationId={applicationId}
                    fieldName="image2"
                    label="Image 2"
                    onUploadSuccess={(field, fileUrl) =>
                      setImages((prev) => ({ ...prev, image2: fileUrl }))
                    }
                    onDeleteSuccess={() =>
                      setImages((prev) => ({ ...prev, image2: "" }))
                    }
                  />
                </div>
                <div className="gap-1 flex flex-col">
                  <SingleFileUploader
                    applicationId={applicationId}
                    fieldName="image3"
                    label="Image 3"
                    onUploadSuccess={(field, fileUrl) =>
                      setImages((prev) => ({ ...prev, image3: fileUrl }))
                    }
                    onDeleteSuccess={() =>
                      setImages((prev) => ({ ...prev, image3: "" }))
                    }
                  />
                </div>
                <div className="gap-1 flex flex-col">
                  <SingleFileUploader
                    applicationId={applicationId}
                    fieldName="image4"
                    label="Image 4"
                    onUploadSuccess={(field, fileUrl) =>
                      setImages((prev) => ({ ...prev, image4: fileUrl }))
                    }
                    onDeleteSuccess={() =>
                      setImages((prev) => ({ ...prev, image4: "" }))
                    }
                  />
                </div>
                <div className="gap-1 flex flex-col">
                  <SingleFileUploader
                    applicationId={applicationId}
                    fieldName="video1"
                    label="Video 1"
                    onUploadSuccess={(field, fileUrl) =>
                      setVideos((prev) => ({ ...prev, video1: fileUrl }))
                    }
                    onDeleteSuccess={() =>
                      setVideos((prev) => ({ ...prev, video1: "" }))
                    }
                  />
                </div>
                <div className="gap-1 flex flex-col">
                  <SingleFileUploader
                    applicationId={applicationId}
                    fieldName="video2"
                    label="Video 2"
                    onUploadSuccess={(field, fileUrl) =>
                      setVideos((prev) => ({ ...prev, video2: fileUrl }))
                    }
                    onDeleteSuccess={() =>
                      setVideos((prev) => ({ ...prev, video2: "" }))
                    }
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

