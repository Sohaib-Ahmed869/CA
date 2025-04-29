import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import SingleFileUploader from "./SingleFileUploader";
import { BsCheck, BsInfoCircle } from "react-icons/bs";
import { CgLock } from "react-icons/cg";
import {
  FaIdCard,
  FaFileAlt,
  FaUserTie,
  FaBriefcase,
  FaRegImages,
} from "react-icons/fa";
import SpinnerLoader from "../components/spinnerLoader";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import axios from "axios";
import UploadRequestedDocuments from "../uploadRequestedDocuments/uploadRequestedDocuments";
import { getApplications } from "../Services/adminServices";
import { useDispatch, useSelector } from "react-redux";
import { triggerStatsRefresh } from "../../utils/firestoreTriggers";
const URL = import.meta.env.VITE_REACT_BACKEND_URL;

const UploadDocuments = () => {
  const navigate = useNavigate();
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const userId = sessionStorage.getItem("userId");
  console.log(userId);
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
  const dispatch = useDispatch();
  const AdminUserId = import.meta.env.VITE_ADMIN_USER_ID;
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

  // Point values for each ID type
  const pointValues = {
    driversLicense: 40,
    idCard: 40,
    passport: 70,
    birthCertificate: 70,
    medicareCard: 25,
    creditcard: 15,
    australianCitizenship: 70,
  };

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

    // Calculate score based on uploaded documents
    Object.keys(hundredPointsOfID).forEach((doc) => {
      if (hundredPointsOfID[doc] && pointValues[doc]) {
        newScore += pointValues[doc];
      }
    });

    setScore(newScore);
  }, [hundredPointsOfID]);

  // On mount, grab the application ID from the URL and the industry from localStorage
  useEffect(() => {
    const idFromUrl = window.location.pathname.split("/")[2];
    setApplicationId(idFromUrl);
    const industry = localStorage.getItem("applicationIndustry");
    setApplicationIndustry(industry);
  }, []);

  useEffect(() => {
    const fetchApplication = async () => {
      const idFromUrl = window.location.pathname.split("/")[2];

      try {
        const response = await axios.get(
          `${URL}/api/applications/applications-by-id/${idFromUrl}`
        );
        setApplications(response.data.application);
        console.log("response", response.data.application);
        // Preload documents if they exist
        if (response.data.application.documentsForm) {
          const documents = response.data.application.documentsForm;

          // Preload 100 Points of ID
          setHundredPointsOfID((prev) => ({
            ...prev,
            driversLicense: documents.driversLicense?.fileUrl || "",
            passport: documents.passport?.fileUrl || "",
            birthCertificate: documents.birthCertificate?.fileUrl || "",
            medicareCard: documents.medicareCard?.fileUrl || "",
            creditcard: documents.creditcard?.fileUrl || "",
            idCard: documents.idCard?.fileUrl || "",
            australianCitizenship:
              documents.australianCitizenship?.fileUrl || "",
          }));

          // Preload other documents
          setResume(documents.resume?.fileUrl || "");
          setPreviousQualifications(
            documents.previousQualifications?.fileUrl || ""
          );
          setTwoReferences({
            reference1: documents.reference1?.fileUrl || "",
            reference2: documents.reference2?.fileUrl || "",
          });
          setEmploymentLetter(documents.employmentLetter?.fileUrl || "");
          setPayslip(documents.payslip?.fileUrl || "");
          console.log("ok", documents);
          // Preload images and videos if they exist

          console.log("ok", documents.images);
          setImages({
            image1: documents.image1?.fileUrl || "",
            image2: documents.image2?.fileUrl || "",
            image3: documents.image3?.fileUrl || "",
            image4: documents.image4?.fileUrl || "",
          });

          setVideos({
            video1: documents.video1?.fileUrl || "",
            video2: documents.video2?.fileUrl || "",
          });
        }
      } catch (error) {
        console.error("Error fetching application:", error);
      }
    };

    fetchApplication();
  }, [applicationId, resume]); // Toast helpers
  console.log("resume", resume);
  const successToast = () => toast.success("Documents uploaded successfully");
  const errorToast = (message = "Please fill in all the required fields") =>
    toast.error(message);

  // Final Submit: all single-file uploads are already done
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check required fields
    if (
      !resume ||
      !previousQualifications ||
      !twoReferences.reference1 ||
      !employmentLetter ||
      !payslip
    ) {
      errorToast("Please upload all required documents");
      return;
    }

    // Check 100 points
    if (score < 100) {
      errorToast("You need at least 100 points of ID to continue");
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
        errorToast(
          "Please upload all required images and videos for your industry"
        );
        return;
      }
    }

    setSubmissionLoading(true);
    try {
      await axios.post(`/api/users/${applicationId}/submitDocument`, {});

      await triggerStatsRefresh(userId);
      successToast();
      setSubmissionLoading(false);
      // Use toast instead of alert for better UX
      navigate("/");
    } catch (err) {
      setSubmissionLoading(false);
      errorToast("Error submitting documents");
    }
  };

  // Helper function to render point value tag
  const renderPointsTag = (points) => (
    <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
      {points} points
    </span>
  );
  const getUserApplications = async (userId) => {
    setSubmissionLoading(true);
    // setIsRefreshing(true);
    try {
      const response = await getApplications(userId);
      console.log(response);
      setApplications(response);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmissionLoading(false);
      // setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserApplications(userId);
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      {submissionLoading && <SpinnerLoader />}

      <div className="max-w-7xl py-32 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload Documents</h1>
          <p className="mt-2 text-lg text-gray-600">
            Please provide the required documents to complete your application
          </p>
        </div>

        {/* Main content area */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Points indicator */}
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  ID Verification
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  You need at least 100 points of ID to submit your application
                </p>
              </div>
              <div
                className={`${
                  score >= 100
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                } px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2`}
              >
                {score >= 100 ? (
                  <BsCheck className="h-5 w-5 text-green-500" />
                ) : (
                  <BsInfoCircle className="h-5 w-5 text-yellow-500" />
                )}
                <span>
                  Current Score: <span className="font-bold">{score}/100</span>
                </span>
              </div>
            </div>
          </div>

          {/* Points of ID section */}
          <div className="px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <FaIdCard className="text-green-500" />
                  100 Points of ID
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    (Choose any combination to reach 100 points)
                  </span>
                </h3>
              </div>

              <div className="relative">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="driversLicense"
                  existingFileUrl={hundredPointsOfID.driversLicense} // ✅ Pass preloaded document URL
                  label={
                    <div className="flex justify-between w-full">
                      <span>Driver's License</span>
                      {renderPointsTag(pointValues.driversLicense)}
                    </div>
                  }
                  onUploadSuccess={handleHundredPointsUploadSuccess}
                  onDeleteSuccess={handleHundredPointsDeleteSuccess}
                />
              </div>

              <div className="relative">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="idCard"
                  existingFileUrl={hundredPointsOfID.idCard} // ✅ Pass preloaded document URL
                  label={
                    <div className="flex justify-between w-full">
                      <span>ID Card</span>
                      {renderPointsTag(pointValues.idCard)}
                    </div>
                  }
                  onUploadSuccess={handleHundredPointsUploadSuccess}
                  onDeleteSuccess={handleHundredPointsDeleteSuccess}
                />
              </div>

              <div className="relative">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="passport"
                  existingFileUrl={hundredPointsOfID.passport} // ✅ Pass preloaded document URL
                  label={
                    <div className="flex justify-between w-full">
                      <span>Passport</span>
                      {renderPointsTag(pointValues.passport)}
                    </div>
                  }
                  onUploadSuccess={handleHundredPointsUploadSuccess}
                  onDeleteSuccess={handleHundredPointsDeleteSuccess}
                />
              </div>

              <div className="relative">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="birthCertificate"
                  existingFileUrl={hundredPointsOfID.birthCertificate} // ✅ Pass preloaded document URL
                  label={
                    <div className="flex justify-between w-full">
                      <span>Birth Certificate</span>
                      {renderPointsTag(pointValues.birthCertificate)}
                    </div>
                  }
                  onUploadSuccess={handleHundredPointsUploadSuccess}
                  onDeleteSuccess={handleHundredPointsDeleteSuccess}
                />
              </div>

              <div className="relative">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="medicareCard"
                  existingFileUrl={hundredPointsOfID.medicareCard} // ✅ Pass preloaded document URL
                  label={
                    <div className="flex justify-between w-full">
                      <span>Medicare Card</span>
                      {renderPointsTag(pointValues.medicareCard)}
                    </div>
                  }
                  onUploadSuccess={handleHundredPointsUploadSuccess}
                  onDeleteSuccess={handleHundredPointsDeleteSuccess}
                />
              </div>

              <div className="relative">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="creditcard"
                  existingFileUrl={hundredPointsOfID.creditcard} // ✅ Pass preloaded document URL
                  label={
                    <div className="flex justify-between w-full">
                      <span>Credit Card</span>
                      {renderPointsTag(pointValues.creditcard)}
                    </div>
                  }
                  onUploadSuccess={handleHundredPointsUploadSuccess}
                  onDeleteSuccess={handleHundredPointsDeleteSuccess}
                />
              </div>

              <div className="relative">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="australianCitizenship"
                  existingFileUrl={hundredPointsOfID.australianCitizenship} // ✅ Pass preloaded document URL
                  label={
                    <div className="flex justify-between w-full">
                      <span>Australian Citizenship</span>
                      {renderPointsTag(pointValues.australianCitizenship)}
                    </div>
                  }
                  onUploadSuccess={handleHundredPointsUploadSuccess}
                  onDeleteSuccess={handleHundredPointsDeleteSuccess}
                />
              </div>
            </div>
          </div>

          {/* Professional Documents section */}
          <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="col-span-1 sm:col-span-2">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <FaFileAlt className="text-green-500" />
                  Professional Documents
                  <span className="text-red-500 ml-1">*</span>
                </h3>
              </div>

              <div className="relative">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="resume"
                  label="Resume"
                  required={true}
                  existingFileUrl={resume} // ✅ Pass preloaded document URL
                  onUploadSuccess={(field, fileUrl) => setResume(fileUrl)}
                  onDeleteSuccess={() => setResume("")}
                />
              </div>
              <div className="relative">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="previousQualifications"
                  label="Previous Qualifications"
                  required={true}
                  existingFileUrl={previousQualifications} // ✅ Pass preloaded document URL
                  onUploadSuccess={(field, fileUrl) =>
                    setPreviousQualifications(fileUrl)
                  }
                  onDeleteSuccess={() => setPreviousQualifications("")}
                />
              </div>
            </div>
          </div>

          {/* References section */}
          <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="col-span-1 sm:col-span-2">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <FaUserTie className="text-green-500" />
                  Professional References
                  <span className="text-red-500 ml-1">*</span>
                </h3>
              </div>

              <div className="relative">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="reference1"
                  label="Reference One"
                  required={true}
                  existingFileUrl={twoReferences.reference1} // ✅ Pass preloaded document URL
                  onUploadSuccess={(field, fileUrl) =>
                    setTwoReferences((prev) => ({
                      ...prev,
                      reference1: fileUrl,
                    }))
                  }
                  onDeleteSuccess={() =>
                    setTwoReferences((prev) => ({ ...prev, reference1: "" }))
                  }
                />
              </div>

              <div className="relative">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="reference2"
                  label="Reference Two"
                  existingFileUrl={twoReferences.reference2} // ✅ Pass preloaded document URL
                  onUploadSuccess={(field, fileUrl) =>
                    setTwoReferences((prev) => ({
                      ...prev,
                      reference2: fileUrl,
                    }))
                  }
                  onDeleteSuccess={() =>
                    setTwoReferences((prev) => ({ ...prev, reference2: "" }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Employment Documents section */}
          <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="col-span-1 sm:col-span-2">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <FaBriefcase className="text-green-500" />
                  Employment Documents
                  <span className="text-red-500 ml-1">*</span>
                </h3>
              </div>

              <div className="relative">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="employmentLetter"
                  label="Employment Letter"
                  required={true}
                  existingFileUrl={employmentLetter} // ✅ Pass preloaded document URL
                  onUploadSuccess={(field, fileUrl) =>
                    setEmploymentLetter(fileUrl)
                  }
                  onDeleteSuccess={() => setEmploymentLetter("")}
                />
              </div>

              <div className="relative">
                <SingleFileUploader
                  applicationId={applicationId}
                  fieldName="payslip"
                  label="Payslip/Invoice"
                  existingFileUrl={payslip} // ✅ Pass preloaded document URL
                  required={true}
                  onUploadSuccess={(field, fileUrl) => setPayslip(fileUrl)}
                  onDeleteSuccess={() => setPayslip("")}
                />
              </div>
            </div>
          </div>

          {/* Industry-specific Documents section - shown conditionally */}
          {((!applications.requestedDocuments?.length === 0 &&
            applicationIndustry === "Automotive") ||
            applicationIndustry === "Building & Construction") && (
            <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-1 sm:col-span-2">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                    <FaRegImages className="text-green-500" />
                    Industry Documentation
                    <span className="text-red-500 ml-1">*</span>
                  </h3>
                  <p className="mt-1 mb-4 text-sm text-gray-500">
                    Required for {applicationIndustry} industry
                  </p>
                </div>

                <div className="relative">
                  <SingleFileUploader
                    applicationId={applicationId}
                    fieldName="image1"
                    label="Image 1"
                    existingFileUrl={images.image1} // ✅ Pass preloaded document URL
                    required={true}
                    onUploadSuccess={(field, fileUrl) =>
                      setImages((prev) => ({ ...prev, image1: fileUrl }))
                    }
                    onDeleteSuccess={() =>
                      setImages((prev) => ({ ...prev, image1: "" }))
                    }
                  />
                </div>

                <div className="relative">
                  <SingleFileUploader
                    applicationId={applicationId}
                    fieldName="image2"
                    label="Image 2"
                    existingFileUrl={images.image2} // ✅ Pass preloaded document URL
                    required={true}
                    onUploadSuccess={(field, fileUrl) =>
                      setImages((prev) => ({ ...prev, image2: fileUrl }))
                    }
                    onDeleteSuccess={() =>
                      setImages((prev) => ({ ...prev, image2: "" }))
                    }
                  />
                </div>

                <div className="relative">
                  <SingleFileUploader
                    applicationId={applicationId}
                    fieldName="image3"
                    label="Image 3"
                    existingFileUrl={images.image3} // ✅ Pass preloaded document URL
                    required={true}
                    onUploadSuccess={(field, fileUrl) =>
                      setImages((prev) => ({ ...prev, image3: fileUrl }))
                    }
                    onDeleteSuccess={() =>
                      setImages((prev) => ({ ...prev, image3: "" }))
                    }
                  />
                </div>

                <div className="relative">
                  <SingleFileUploader
                    applicationId={applicationId}
                    fieldName="image4"
                    label="Image 4"
                    existingFileUrl={images.image4} // ✅ Pass preloaded document URL
                    required={true}
                    onUploadSuccess={(field, fileUrl) =>
                      setImages((prev) => ({ ...prev, image4: fileUrl }))
                    }
                    onDeleteSuccess={() =>
                      setImages((prev) => ({ ...prev, image4: "" }))
                    }
                  />
                </div>

                <div className="relative">
                  <SingleFileUploader
                    applicationId={applicationId}
                    fieldName="video1"
                    label="Video 1"
                    existingFileUrl={videos.video1} // ✅ Pass preloaded document URL
                    required={true}
                    onUploadSuccess={(field, fileUrl) =>
                      setVideos((prev) => ({ ...prev, video1: fileUrl }))
                    }
                    onDeleteSuccess={() =>
                      setVideos((prev) => ({ ...prev, video1: "" }))
                    }
                  />
                </div>

                <div className="relative">
                  <SingleFileUploader
                    applicationId={applicationId}
                    fieldName="video2"
                    label="Video 2"
                    existingFileUrl={videos.video2} // ✅ Pass preloaded document URL
                    required={true}
                    onUploadSuccess={(field, fileUrl) =>
                      setVideos((prev) => ({ ...prev, video2: fileUrl }))
                    }
                    onDeleteSuccess={() =>
                      setVideos((prev) => ({ ...prev, video2: "" }))
                    }
                  />
                </div>
              </div>
            </div>
          )}
          {console.log("application", applications)}
          <UploadRequestedDocuments
            applications={applications}
            applicationId={applicationId}
          />

          {/* Alert box with important information */}
          <div className="px-4 py-4 sm:px-6 bg-green-50 border-t border-green-200">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <BsInfoCircle className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Important Information
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <ul className="list-disc space-y-1 pl-5">
                    <li>All documents must be clear and legible</li>
                    <li>Supported formats: PDF, PNG, JPG, DOCX, MP4</li>

                    <li>You need 100+ points from the ID documents section</li>
                    <li>All fields marked with * are required</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="mt-6">
          <button
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              score >= 100
                ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={score < 100}
          >
            {score < 100 ? (
              <div className="flex items-center justify-center gap-2">
                <CgLock className="h-5 w-5" /> Submit Application (Need{" "}
                {100 - score} more points)
              </div>
            ) : (
              "Submit Application"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
