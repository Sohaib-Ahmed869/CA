import React, { useState, useEffect } from "react";
import Navbar from "../../Customer/components/navbar";
import JSZip from "jszip";
import { BsEye } from "react-icons/bs";
import { BiCertification } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { BiUpload } from "react-icons/bi";
import Sidebar from "../components/siderbar";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import pending from "../../assets/pending.png";
import { getApplications } from "../../Customer/Services/rtoservices";
import {
  uploadCertificate,
  requestMoreDocuments,
} from "../../Customer/Services/adminServices";
import SpinnerLoader from "../../Customer/components/spinnerLoader";

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
                className="btn-sm rounded-xl flex items-center gap-2 bg-gray-200 px-4 py-2 m-2"
              >
                View Documents
              </button>
              <button
                onClick={() => setViewIntakeForm(true)}
                className="btn-sm rounded-xl flex items-center gap-2 bg-gray-200 px-4 py-2 m-2"
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
const Approval = () => {
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentLinks, setDocumentLinks] = useState([]);

  const applicationsPerPage = 10;
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleReject = (id) => {
    const newApplications = applications.map((application) => {
      if (application.id === id) {
        return {
          ...application,
          status: "Rejected",
        };
      }
      return application;
    });
    setApplications(newApplications);
  };

  const handleOpenModal = (id) => {
    setSelectedApplicationId(id);
    document.getElementById("uploadCertificateModal").showModal();
  };

  const closeModal = () => {
    document.getElementById("uploadCertificateModal").close();
  };

  const openDocument = (url) => {
    console.log("Opening document:", url);
    window.open(url, "_blank");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCertificateFile(file);
      console.log("File selected:", file);
    } else {
      console.log("No file selected");
    }
  };

  const onClickViewDocuments = async (application) => {
    console.log(
      "Viewing documents for application with ID:",
      application.document
    );

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
    ];

    // Loop through each document key, open the link if it's not null
    const links = documentKeys
      .map((docKey) => ({
        name: docKey,
        url: application.document[docKey],
      }))
      .filter((doc) => doc.url); // Filter out null/undefined URLs

    setDocumentLinks(links);
    document.getElementById("documentLinksModal").showModal();
  };

  // Separate displayed applications from full applications list
  const [displayedApplications, setDisplayedApplications] = useState([]);
  const [dateFilter, setDateFilter] = useState("All");

  const getRTOApplications = async () => {
    const rtoType = localStorage.getItem("rtoType");
    const fetchApplications = async () => {
      setSubmissionLoading(true);
      const applicationsData = await getApplications();
      setApplications(
        applicationsData.filter(
          (app) =>
            app.type === rtoType &&
            app.currentStatus === "Sent to RTO" &&
            app.paid === true
        )
      );
      setDisplayedApplications(
        applicationsData.filter(
          (app) =>
            (app.type === rtoType || app.type === "default") &&
            app.currentStatus === "Sent to RTO" &&
            app.paid === true
        )
      );
      setSubmissionLoading(false);
    };
    fetchApplications();
  };

  useEffect(() => {
    getRTOApplications();
  }, []);

  const donwloadAllDocsAsZip = async () => {
    const zip = new JSZip();
    const folder = zip.folder("Documents");
    documentLinks.forEach((doc) => {
      fetch(doc.url)
        .then((response) => response.blob())
        .then((blob) => {
          folder.file(doc.name, blob);
        });
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "Documents.zip");
    });
  };

  // Filter and paginate applications when `applications`, `dateFilter`, or `currentPage` changes
  // useEffect(() => {
  //   const today = new Date();
  //   const filteredApplications = applications.filter((app) => {
  //     if (dateFilter === "All") return true;
  //     const daysDifference = Math.ceil(
  //       Math.abs(today - app.dateCreated) / (1000 * 60 * 60 * 24)
  //     );
  //     return daysDifference <= parseInt(dateFilter);
  //   });

  //   const startIndex = (currentPage - 1) * applicationsPerPage;
  //   setDisplayedApplications(
  //     filteredApplications.slice(startIndex, startIndex + applicationsPerPage)
  //   );
  // }, [applications, currentPage, dateFilter]);

  // // Pagination Controls
  // const totalPages = Math.ceil(
  //   applications.filter((app) => {
  //     const daysDiff = Math.ceil(
  //       Math.abs(new Date() - app.dateCreated) / (1000 * 60 * 60 * 24)
  //     );
  //     return dateFilter === "All" || daysDiff <= parseInt(dateFilter);
  //   }).length / applicationsPerPage
  // );

  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  const uploadCertificate2 = async (id) => {
    setSubmissionLoading(true);
    try {
      if (!certificateFile) {
        console.error("No certificate file selected.");
        return;
      }

      // Check the selected file
      console.log("Selected file:", certificateFile);

      // Create a FormData object and append the file
      const formData = new FormData();
      formData.append("certificate", certificateFile);

      console.log(
        "FormData after appending file:",
        formData.get("certificate")
      ); // Check if file is appended

      const response = await uploadCertificate(id, formData); // Pass FormData directly
      console.log("Upload response:", response);
      setSubmissionLoading(false);
      closeModal();
    } catch (err) {
      console.error("Error uploading certificate:", err);
    }
  };

  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const onClickRequestMoreDocuments = async () => {
    if (!message) {
      notifyError("Please type a message before sending.");
      return;
    }

    try {
      setSubmissionLoading(true);
      const response = await requestMoreDocuments(
        selectedApplicationId,
        message
      );
      console.log("Request more documents response:", response);

      notify("Request sent successfully.");
      document.getElementById("moreDocumentsModal").close();

      //get updated applications
      getRTOApplications();

      setSubmissionLoading(false);
    } catch (err) {
      console.error("Error requesting more documents:", err);
      notifyError("Error sending request.");
      setSubmissionLoading(false);
    }
  };

  const [message, setMessage] = useState("");
  const [showMoreDocuments, setShowMoreDocuments] = useState(false);

  return (
    <div className="">
      {submissionLoading && <SpinnerLoader />}
      {!selectedApplication && (
        <div className="p-10 w-full max-sm:p-2">
          <div className="flex items-center gap-4 mb-5 lg:flex-row flex-col max-sm:items-start">
            <img src={pending} alt="Dashboard" className="h-36" />
            <div className="flex flex-col lg:w-1/2 w-1/2">
              <h1 className="text-3xl font-bold">Active Applications</h1>
              <p className="text-sm mt-2">
                Here you can view all the applications that are pending
                approval.
              </p>
            </div>
          </div>
          <div className="flex gap-2 mb-5 justify-end text-sm max-sm:justify-start">
            <select
              name="dateFilter"
              id="dateFilter"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className=" p-2 rounded-xl"
            >
              <option value="All">All</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
          <div className="overflow-x-auto border border-gray-300 rounded-md">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Application Id</th>
                  <th>Customer Registered Name</th>
                  <th>Submitted date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedApplications.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No applications found
                    </td>
                  </tr>
                )}
                {displayedApplications.map((application, index) =>
                  application.certficateIssued ? null : (
                    <tr
                      key={application.id}
                      className="border-b overflow-x-auto"
                    >
                      <td className="flex items-center gap-2">
                        {application.applicationId
                          ? application.applicationId
                          : application.id}
                        <BsEye
                          onClick={() => setSelectedApplication(application)}
                          className="cursor-pointer text-blue-500"
                        />
                      </td>
                      <td>
                        {application.user.firstName} {application.user.lastName}
                      </td>
                      <td>{application.status[0].time.split("T")[0]}</td>
                      <td className="flex gap-2">
                        {application.currentStatus === "Sent to RTO" && (
                          <>
                            <button
                              className="bg-blue-500 text-white px-2 py-1 rounded flex gap-1 items-center"
                              onClick={() => onClickViewDocuments(application)}
                            >
                              <BsEye />
                              View Documents
                            </button>
                            <button
                              onClick={() => handleOpenModal(application.id)}
                              className="bg-green-500 text-white px-2 py-1 rounded flex gap-1 items-center"
                            >
                              <BiCertification />
                              Issue Certificate
                            </button>
                            <button
                              onClick={() => handleReject(application.id)}
                              className="bg-red-500 text-white px-2 py-1 rounded flex gap-1 items-center"
                            >
                              <FaTimes />
                              Reject
                            </button>
                            <button
                              className="bg-yellow-700 text-white px-2 py-1 rounded flex gap-1 items-center"
                              onClick={() => {
                                setSelectedApplicationId(application.id);
                                document
                                  .getElementById("moreDocumentsModal")
                                  .showModal();
                              }}
                            >
                              Request More Information
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-2 mt-5 max-sm:justify-start">
            <button
              onClick={handlePreviousPage}
              className="btn btn-outline btn-sm"
            >
              Previous
            </button>
            <button onClick={handleNextPage} className="btn btn-outline btn-sm">
              Next
            </button>
          </div>
        </div>
      )}

      {selectedApplication && (
        <Application
          application={selectedApplication}
          setSelectedApplication={setSelectedApplication}
        />
      )}

      <dialog id="moreDocumentsModal" className="modal">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() =>
              document.getElementById("moreDocumentsModal").close()
            }
          >
            ✕
          </button>
          <h2 className="font-bold text-lg">More Documents Message</h2>
          <p className="text-gray-500">Please type your message here:</p>
          <textarea
            className="border rounded-lg p-2 w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="modal-action">
            <button
              onClick={onClickRequestMoreDocuments}
              className="btn btn-outline btn-sm"
            >
              Send
            </button>
          </div>
        </div>
      </dialog>

      {/* DaisyUI Modal with showModal() */}
      <dialog id="uploadCertificateModal" className="modal">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>
          <h2 className="font-bold text-lg">Upload Certificate</h2>
          <div className="w-full flex flex-col items-center gap-2">
            <div className="flex justify-center items-center gap-2 mt-4">
              <BiUpload className="text-3xl text-green-500" />
              <span className="text-gray-500">
                Select a certificate to upload
              </span>
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              className=" shadow-lg rounded-xl border"
            />
          </div>
          <div className="modal-action">
            <button
              onClick={() =>
                uploadCertificate2(selectedApplicationId, certificateFile)
              }
              className="btn btn-primary text-white btn-sm"
            >
              Upload
            </button>
            <button onClick={closeModal} className="btn btn-outline btn-sm">
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="documentLinksModal" className="modal">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() =>
              document.getElementById("documentLinksModal").close()
            }
          >
            ✕
          </button>
          <h2 className="font-bold text-lg">View Documents</h2>
          <button
            onClick={donwloadAllDocsAsZip}
            className="btn btn-primary text-white btn-sm"
          >
            Download All Documents
          </button>
          <ul className="mt-4">
            {documentLinks.map((doc, index) => (
              <li key={index} className="my-2">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="modal-action">
            <button
              onClick={() =>
                document.getElementById("documentLinksModal").close()
              }
              className="btn btn-outline btn-sm"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Approval;
