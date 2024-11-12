import React, { useState, useEffect } from "react";
import Navbar from "../../Customer/components/navbar";
import JSZip from "jszip";
import { BsEye } from "react-icons/bs";
import { BiCertification } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { BiUpload } from "react-icons/bi";
import Sidebar from "../components/siderbar";
import pending from "../../assets/pending.png";
import { getApplications } from "../../Customer/Services/rtoservices";
import { uploadCertificate } from "../../Customer/Services/adminServices";
import SpinnerLoader from "../../Customer/components/spinnerLoader";

const Approval = () => {
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentLinks, setDocumentLinks] = useState([]);

  const applicationsPerPage = 10;
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);

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

  useEffect(() => {
    const rtoType = localStorage.getItem("rtoType");
    const fetchApplications = async () => {
      setSubmissionLoading(true);
      const applicationsData = await getApplications();
      setApplications(
        applicationsData.filter(
          (app) => app.type === rtoType && app.currentStatus === "Sent to RTO"
        )
      );
      setDisplayedApplications(
        applicationsData.filter(
          (app) => app.type === rtoType && app.currentStatus === "Sent to RTO"
        )
      );
      setSubmissionLoading(false);
    };
    fetchApplications();
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

  return (
    <div className="flex overflow-x-auto">
      {submissionLoading && <SpinnerLoader />}
      <div className="p-10 w-full">
        <div className="flex items-center gap-4 mb-5 lg:flex-row flex-col">
          <img src={pending} alt="Dashboard" className="h-36" />
          <div className="flex flex-col lg:w-1/2 w-full">
            <h1 className="text-3xl font-bold">Active Applications</h1>
            <p className="text-sm mt-2">
              Here you can view all the applications that are pending approval.
            </p>
          </div>
        </div>
        <div className="flex gap-2 mb-5 justify-end text-sm">
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

        <table className="table">
          <thead>
            <tr>
              <th>Application Id</th>
              <th>Customer Registered Name</th>
              <th>Payment Date</th>
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
                <tr key={application.id}>
                  <td>{application.id}</td>
                  <td>
                    {application.user.firstName} {application.user.lastName}
                  </td>
                  <td>
                    {application.paymentDate
                      ? application.paymentDate.toLocaleDateString()
                      : "N/A"}
                  </td>
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
                          Grant Certificate
                        </button>
                        <button
                          onClick={() => handleReject(application.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded flex gap-1 items-center"
                        >
                          <FaTimes />
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <div className="flex justify-end gap-2 mt-5">
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
