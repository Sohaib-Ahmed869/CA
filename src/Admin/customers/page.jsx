import React, { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { FaTimesCircle } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import { BiDownload } from "react-icons/bi";
import { BiEnvelopeOpen } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { BsArrowUpRight } from "react-icons/bs";
import { BsClock } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { BiUpload } from "react-icons/bi";
import { FaCertificate } from "react-icons/fa";
import { BsTruck } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { CgTrack } from "react-icons/cg";
import { GrFormAdd } from "react-icons/gr";
import { IoCall } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import applicationsimg from "../../assets/applications.png";
import { BiEdit } from "react-icons/bi";
import Loader from "../../Customer/components/loader";

import certificate from "../../assets/certificate.pdf";

import { useNavigate } from "react-router-dom";

import {
  getApplications,
  verifyApplication,
  addNoteToApplication,
} from "../../Customer/Services/adminServices";

import { initiateVerificationCall } from "../../Customer/Services/twilioService";

const Application = ({ application, setSelectedApplication }) => {
  const [viewIntakeForm, setViewIntakeForm] = useState(false);
  const [viewDocuments, setViewDocuments] = useState(false);
  const [documentLinks, setDocumentLinks] = useState([]);

  const onClickViewDocuments = async () => {
    console.log("Viewing documents for application with ID:", application);

    // List of document keys to check in application.document
    const documentKeys = [
      "license",
      "passport",
      "birth_certificate",
      "medicare",
      "creditcard",
      "resume",
      "previousQualifications",
      "reference1",
      "reference2",
      "employmentLetter",
      "payslip",
      "idCard",
      "australian_citizenship",
      "image1",
      "image2",
      "image3",
      "image4",
      "video1",
      "video2",
    ];

    // Loop through each document key, open the link if it's not null
    const links = documentKeys
      .map((docKey) => ({
        name: docKey,
        url: application.document[docKey],
      }))
      .filter((doc) => doc.url); // Filter out null/undefined URLs

    setDocumentLinks(links);
    setViewDocuments(true);
  };

  return (
    <div className="min-h-screen">
      <button onClick={() => setSelectedApplication(null)} className="btn-sm">
        Back
      </button>
      <div className="flex flex-col items-center justify-center p-16">
        <div className="col-span-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Application# {application.applicationId}
          </h1>
          <p className="text-sm text-gray-500">
            This application was submitted by {application.user.firstName}{" "}
            {application.user.lastName} on{" "}
            {application.status[0].time.split("T")[0]}
          </p>
          <h1 className="text-lg font-semibold text-gray-800 mt-4">
            {application.isf.lookingForWhatQualification}
          </h1>
        </div>

        <div className="col-span-4 bg-white p-4 rounded-lg shadow-lg w-full">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-sm text-gray-500">
              <h2 className="text-lg font-semibold text-gray-800">
                Initial Screening Information
              </h2>
              <p>First Name: {application.user.firstName}</p>
              <p>Last Name: {application.user.lastName}</p>
              <p>Email: {application.user.email}</p>
              <p>Country: {application.user.country}</p>
              <p>State: {application.isf.state}</p>
              <p>Industry: {application.isf.industry}</p>
              <p>Qualification: {application.isf.qualification || "N/A"}</p>
              <p>Years of Experience: {application.isf.yearsOfExperience}</p>
              <p>
                Location of Experience: {application.isf.locationOfExperience}
              </p>
              <p>
                Formal Education:{" "}
                {application.isf.formalEducation ? "Yes" : "No"} -{" "}
                {application.isf.formalEducationAnswer || "N/A"}
              </p>

              <p>
                Terms and Conditions:{" "}
                {application.user.toc ? "Agreed" : "Not Agreed"}
              </p>
            </div>
            <div className="text-sm text-gray-500 flex justify-end">
              <button
                onClick={onClickViewDocuments}
                className="btn-sm btn-primary rounded-xl flex items-center gap-2 text-white bg-primary px-4 py-2 m-2"
              >
                View Documents
              </button>
              <button
                onClick={() => setViewIntakeForm(true)}
                className="btn-sm rounded-xl flex items-center gap-2 btn-primary text-white bg-primary px-4 py-2 m-2"
              >
                View Intake Form
              </button>
            </div>
          </div>
        </div>

        {viewIntakeForm && (
          <dialog className="modal modal-open">
            <div className="col-span-4 bg-white p-4 rounded-lg shadow-lg w-1/2">
              <button
                onClick={() => setViewIntakeForm(false)}
                className="mt-4 mr-4 float-right"
              >
                <FaTimes className="text-lg" />
              </button>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Student Intake Form
                </h2>
                {/* <button
                  onClick={onClickDownloadIntakeForm}
                  className=" text-black btn-sm rounded-xl flex items-center gap-2 bg-gray-200 px-4 py-2 m-2 disabled:opacity-50"
                >
                  <GrDocumentDownload />
                  Download Intake Form
                </button> */}
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="text-md text-gray-500 ">
                  <h2 className="text-lg font-semibold text-gray-800 mt-4">
                    Personal Information
                  </h2>
                  <div className="text-md text-gray-500 grid grid-cols-2">
                    <p>First Name: {application.user.firstName}</p>
                    <p>Last Name: {application.user.lastName}</p>
                    <p>USI: {application.sif.USI}</p>
                    <p>Gender: {application.sif.gender}</p>
                    <p className=" text-gray-500">
                      Date of Birth: {application.sif.dob}
                    </p>
                    <p>Home Address: {application.sif.homeAddress}</p>
                    <p>Suburb: {application.sif.suburb}</p>
                    <p>Postcode: {application.sif.postcode}</p>
                    <p>Country: {application.user.country}</p>
                    <p>State: {application.sif.state}</p>

                    <p className=" text-gray-500">
                      Location Of Experience:{" "}
                      {application.isf.locationOfExperience}
                    </p>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800 mt-4">
                    Contact Information
                  </h2>
                  <div className="text-md text-gray-500 grid grid-cols-2">
                    <p>Email: {application.user.email}</p>
                    <p>Phone: {application.sif.contactNumber}</p>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 mt-4">
                    Education
                  </h2>
                  <div className="text-md text-gray-500 grid grid-cols-2">
                    <p>
                      Credits Transfer:{" "}
                      {application.sif.creditsTransfer ? "Yes" : "No"}
                    </p>

                    <p>
                      Year of Completion:{" "}
                      {application.sif.YearCompleted || "N/A"}
                    </p>
                    <p>
                      Highest Level of Education:{" "}
                      {application.sif.nameOfQualification || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </dialog>
        )}
        {viewDocuments && (
          <dialog className="modal modal-open text-lg" id="documentLinksModal">
            <div className="col-span-4 bg-white p-4 rounded-lg shadow-lg">
              <button
                onClick={() => setViewDocuments(false)}
                className="mt-4 mr-4 float-right"
              >
                <FaTimes className="text-lg" />
              </button>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm text-gray-500">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Documents
                  </h2>
                  {documentLinks.length === 0 && (
                    <p>No documents uploaded for this application</p>
                  )}
                  {documentLinks.map((doc, index) => (
                    <p key={index}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline"
                      >
                        {doc.name}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

const CustomersInfo = () => {
  const navigate = useNavigate();
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [applications, setApplications] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = React.useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  const onClickPayment = () => {
    alert("Redirected to Payment Gateway");
  };

  const onClickDownload = (certificateURL) => {
    console.log("Downloading certificate:", certificateURL);
    // alert("Downloading certificate");
    window.open(certificateURL, "_blank");
  };

  const onClickStudentForm = () => {
    navigate("/student-intake-form");
  };

  const onClickUpload = () => {
    navigate("/upload-documents");
  };

  const [filteredApplications, setFilteredApplications] = useState([]);

  const [activeStatus, setActiveStatus] = useState("Unverified");

  const [selectedApplication, setSelectedApplication] = useState(null);

  const getApplicationsData = async () => {
    try {
      setSubmissionLoading(true);
      let applicationsData = await getApplications();
      //filter applications based on status which are not in Waiting for Verification
      setApplications(applicationsData);
      setFilteredApplications(applicationsData);
      setSubmissionLoading(false);
    } catch (error) {
      setSubmissionLoading(false);
      console.error("Failed to fetch applications:", error);
    }
  };

  const onVerifyApplication = async (applicationId) => {
    try {
      setSubmissionLoading(true);
      await verifyApplication(applicationId);
      getApplicationsData();
      setSubmissionLoading(false);
    } catch (error) {
      console.error("Failed to verify application:", error);
      setSubmissionLoading(false);
    }
  };

  useEffect(() => {
    getApplicationsData();
  }, []);

  useEffect(() => {
    console.log(selectedApplication);
  }, [selectedApplication]);

  const [text, setText] = useState("Initiate Call");

  const simulateCall = () => {
    setText("Calling...");
    const statuses = ["Ringing...", "Answered!", "Completed"];
    let i = 0;
    const interval = setInterval(() => {
      setText(statuses[i]);
      i++;
      if (i === 3) {
        clearInterval(interval);
      }
    }, 5000);
    return () => clearInterval(interval);
  };

  const searchByIDorName = () => {
    if (search === "") {
      setFilteredApplications(applications);
      return;
    }
    let searchValue = search.toLowerCase();
    let filtered = applications.filter(
      (app) =>
        app.applicationId?.toLowerCase().includes(searchValue) ||
        app.user?.firstName?.toLowerCase().includes(searchValue) ||
        app.user?.lastName?.toLowerCase().includes(searchValue)
    );
    setFilteredApplications(filtered);
    setCurrentPage(1);
  };
  useEffect(() => {
    //search applications by ID or Name
    searchByIDorName();
  }, [search]);

  const onClickInitiateCall = async (applicationId) => {
    try {
      setSubmissionLoading(true);
      await initiateVerificationCall(applicationId);
      setSubmissionLoading(false);
    } catch (error) {
      console.error("Error initiating verification call:", error);
      setSubmissionLoading(false);
    }
  };

  const totalItems = filteredApplications.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredApplications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const [addNoteModal, setAddNoteModal] = useState(false);
  const [note, setNote] = useState("");

  const noteAddedToast = () => {
    toast.success("Note added successfully");
  };

  const noteErrorToast = () => {
    toast.error("Failed to add note");
  };

  const filterApplications = (status) => {
    setActiveStatus(status);
    setCurrentPage(1);
    if (status === "All") {
      setFilteredApplications(applications);
    } else {
      const filtered = applications.filter(
        (application) => application.currentStatus === status
      );
      setFilteredApplications(filtered);
    }
  };

  const onClickAddNote = async () => {
    setSubmissionLoading(true);
    try {
      const response = await addNoteToApplication(selectedApplicationId, note);
      if (response === "error") {
        noteErrorToast();
        setSubmissionLoading(false);
        return;
      }
      setSubmissionLoading(false);
      setAddNoteModal(false);
      noteAddedToast();
      setNote("");
      getApplicationsData();
    } catch (error) {
      console.error("Failed to add note:", error);
      noteErrorToast();
      setSubmissionLoading(false);
    }
  };

  const [selectedApplicationId, setSelectedApplicationId] = useState(null);

  return (
    <div className="">
      {loading && <Loader />}
      {submissionLoading && <SpinnerLoader />}
      <Toaster />

      {!selectedApplication && (
        <div className="p-3 overflow-x-auto">
          <div className="flex items-center gap-4 mb-5 lg:flex-row flex-col">
            <img src={applicationsimg} alt="Applications" className="h-36" />
            <div className="flex flex-col lg:w-1/2 w-full">
              <h1 className="text-3xl font-bold">Customers</h1>
              <p className="text-sm mt-2">
                Here you can view all the applications and their statuses.
              </p>
            </div>
          </div>

          <div className="flex items-start flex-col mb-4 gap-2">
            <label htmlFor="search" className="text-sm">
              Search by ID or Name
            </label>
            <input
              type="text"
              id="search"
              className="input input-bordered w-full"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className=" overflow-x-auto border border-gray-300 rounded-md">
            <div className="table mx-auto max-sm:overflow-x-auto overflow-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="font-semibold p-5">ID</th>
                  <th className="font-semibold">Date Created</th>
                  <th className="font-semibold">Customer</th>
                  <th className="font-semibold text-center">Certificate</th>
                  <th className="font-semibold text-center">Industry</th>
                  <th className="font-semibold text-center">Status</th>
                  <th className="text-center w-52">Notes</th>
                  <th className="font-semibold text-center">Paid</th>
                  <th className="font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  //if there are no applications to show
                  filteredApplications.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center p-5">
                        No applications to show
                      </td>
                    </tr>
                  )
                }
                {currentItems.map((application) => (
                  <tr
                    key={application.id}
                    className="animate-fade-up items-center overflow-auto"
                  >
                    <td className="p-5 flex items-center">
                      {application.applicationId
                        ? application.applicationId
                        : application.id}
                      <BsEye
                        className="text-blue-500 ml-2 cursor-pointer"
                        onClick={() => setSelectedApplication(application)}
                      />
                    </td>
                    <td className="">
                      {application.status[0].time.split("T")[0]}
                    </td>
                    <td>
                      {application.user.firstName +
                        " " +
                        application.user.lastName}
                    </td>
                    <td className="text-center w-40">
                      {application.isf.lookingForWhatQualification}
                    </td>
                    <td className="text-center">{application.isf.industry}</td>
                    <td className="p-2 flex items-center justify-center flex-col mt-5 w-60">
                      {application.currentStatus === "Sent to RTO" ? (
                        <div className="p-1 rounded-full bg-red-600 text-white flex items-center justify-center gap-2  max-sm:text-center">
                          <BsArrowUpRight className="text-white" />
                          {application.currentStatus}
                        </div>
                      ) : application.currentStatus ===
                        "Waiting for Verification" ? (
                        <div className="p-1 rounded-full bg-yellow-300 text-black flex items-center justify-center gap-2 max-sm:text-center">
                          <BsClock className="text-black" />
                          {application.currentStatus}
                        </div>
                      ) : application.currentStatus ===
                        "Waiting for Payment" ? (
                        <div className="p-1 rounded-full bg-green-400 text-white flex items-center justify-center gap-2  max-sm:text-center">
                          <BsClock className="text-white" />
                          {application.currentStatus}
                        </div>
                      ) : application.currentStatus ===
                        "Student Intake Form" ? (
                        <div className="p-1 rounded-full bg-blue-900 text-white flex items-center justify-center gap-2 max-sm:text-center">
                          <BiUser className="text-white" />
                          {application.currentStatus}
                        </div>
                      ) : application.currentStatus === "Upload Documents" ? (
                        <div className="p-1 rounded-full bg-red-900 text-white flex items-center justify-center gap-2  ">
                          <BiUpload className="text-white" />
                          {application.currentStatus}
                        </div>
                      ) : application.currentStatus ===
                        "Certificate Generated" ? (
                        <div className="p-1 rounded-full bg-primary text-white flex items-center justify-center gap-2  ">
                          <FaCertificate className="text-white" />
                          {application.currentStatus}
                        </div>
                      ) : application.currentStatus === "Dispatched" ? (
                        <div className="p-1 rounded-full bg-black text-white flex items-center justify-center gap-2  ">
                          <BsTruck className="text-white" />
                          {application.currentStatus}
                        </div>
                      ) : (
                        application.currentStatus === "Completed" && (
                          <div className="p-1 rounded-full bg-green-500 text-white flex items-center justify-center gap-2  ">
                            <BiCheck className="text-white" />
                            {application.currentStatus}
                          </div>
                        )
                      )}
                    </td>
                    <td className="items-center justify-center relative">
                      {application.note ? (
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-center w-full">
                            {application.note}
                          </p>
                          <p
                            className="cursor-pointer bg-white border-0 btn-sm rounded absolute top-2 right-2 hover:bg-white"
                            onClick={() => {
                              setSelectedApplicationId(application.id);
                              setAddNoteModal(true);
                            }}
                          >
                            <BiEdit />
                          </p>
                        </div>
                      ) : (
                        <button
                          className="btn bg-white border-0 btn-sm rounded w-full"
                          onClick={() => {
                            setSelectedApplicationId(application.id);
                            setAddNoteModal(true);
                          }}
                        >
                          <GrFormAdd />
                        </button>
                      )}
                    </td>
                    <td className=" text-center">
                      {application.paid ? (
                        <BiCheckCircle className="text-green-500 text-xl" />
                      ) : (
                        <FaTimesCircle className="text-red-500 text-xl" />
                      )}
                    </td>

                    <td className="flex items-center flex-col gap-2">
                      <button
                        className="btn btn-primary btn-sm w-full"
                        onClick={() => onClickInitiateCall(application.id)}
                      >
                        Call Now
                      </button>
                      {application.currentStatus === "Completed" ||
                      application.currentStatus === "Dispatched" ||
                      application.currentStatus === "Certificate Generated" ? (
                        <div className="flex items-center gap-2 w-full">
                          <button
                            className="btn bg-green-500 hover:bg-green-600 text-white btn-sm w-full"
                            onClick={() =>
                              onClickDownload(application.certificateId)
                            }
                          >
                            Download
                          </button>
                        </div>
                      ) : (
                        <div className=" items-center gap-2 max-sm:text-sm w-full">
                          {application.verified ? null : (
                            <div className="flex items-center gap-2 max-sm:flex-col w-full">
                              <button
                                className="btn bg-green-500 hover:bg-green-600 text-white btn-sm flex items-center max-sm:w-full w-full"
                                onClick={() =>
                                  onVerifyApplication(application.id)
                                }
                              >
                                <BiCheck className="text-white max-sm:hidden" />
                                Verify
                              </button>
                              <button
                                className="btn bg-yelloq-500 hover:bg-yellow-600 text-black btn-sm flex max-sm:w-full w-full"
                                onClick={simulateCall}
                              >
                                {text}
                              </button>
                              <button className="btn bg-red-500 hover:bg-red-600 text-white btn-sm flex max-sm:w-full w-full">
                                <FaTimesCircle className="text-white max-sm:hidden" />
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </div>
            <div className="flex items-center justify-between gap-4 p-4">
              <button
                onClick={goToPreviousPage}
                className="btn btn-primary btn-sm"
              >
                Previous
              </button>
              <div>
                Page {currentPage} of {totalPages}
              </div>
              <button onClick={goToNextPage} className="btn btn-primary btn-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedApplication && (
        <Application
          application={selectedApplication}
          setSelectedApplication={setSelectedApplication}
        />
      )}

      {addNoteModal && (
        <dialog className="modal" open>
          <div className="modal-box">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Add Note</h1>
              <button
                className="btn btn-secondary"
                onClick={() => setAddNoteModal(false)}
              >
                Close
              </button>
            </div>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md mt-5"
              placeholder="Enter note here"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <button className="btn btn-primary mt-5" onClick={onClickAddNote}>
              Add Note
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default CustomersInfo;
