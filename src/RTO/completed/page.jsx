import React, { useState, useEffect } from "react";
import Navbar from "../../Customer/components/navbar";
import { BsEye } from "react-icons/bs";
import { BiCertification } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { BiUpload } from "react-icons/bi";
import Sidebar from "../components/siderbar";
import certificate from "../../assets/certificate.pdf";
import pending from "../../assets/completed.png";
import { getApplications } from "../../Customer/Services/rtoservices";
import SpinnerLoader from "../../Customer/components/spinnerLoader";

const Completed = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [submissionLoading, setSubmissionLoading] = useState(false);

  const applicationsPerPage = 10;
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);

  const closeModal = () => {
    document.getElementById("uploadCertificateModal").close();
  };

  const handleFileChange = (event) => {
    setCertificateFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (certificateFile) {
      handleApprove(selectedApplicationId);
      setCertificateFile(null);
    } else {
      alert("Please select a certificate to upload.");
    }
  };

  const onClickDownload = () => {
    window.open(certificate);
  };

  // Separate displayed applications from full applications list
  const [displayedApplications, setDisplayedApplications] = useState([]);
  const [dateFilter, setDateFilter] = useState("All");

  useEffect(() => {
    const getApplicationsData = async () => {
      try {
        const rtoType = localStorage.getItem("rtoType");
        setSubmissionLoading(true);
        const applicationsData = await getApplications();
        setApplications(applicationsData);
        //filter the applications where the current status is certificate generated
        const filteredApplications = applicationsData.filter(
          (app) => app.currentStatus === "Certificate Generated"
        );
        setApplications(filteredApplications.filter((app) => app.type === rtoType));
        setDisplayedApplications(
          filteredApplications.filter((app) => app.type === rtoType)
        );
        setSubmissionLoading(false);
      } catch (error) {
        setSubmissionLoading(false);
        console.error("Failed to fetch applications:", error);
      }
    };
    getApplicationsData();
  }, []);

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

  // Pagination Controls
  const totalPages = Math.ceil(
    applications.filter((app) => {
      const daysDiff = Math.ceil(
        Math.abs(new Date() - app.dateCreated) / (1000 * 60 * 60 * 24)
      );
      return dateFilter === "All" || daysDiff <= parseInt(dateFilter);
    }).length / applicationsPerPage
  );

  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="">
      {submissionLoading && <SpinnerLoader />}
      <div className="mt-10 lg:p-10 w-full animate-fade">
        <div className="flex items-center gap-4 mb-5 lg:flex-row flex-col">
          <img src={pending} alt="Dashboard" className="h-36" />
          <div className="flex flex-col lg:w-1/2 w-full">
            <h1 className="text-3xl font-bold">Completed Applications</h1>
            <p className="text-sm mt-2">
              Here you can view all the applications that have been completed
              and are ready to be dispatched to the customers.
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

        <table className="table animate-fade-up">
          <thead>
            <tr>
              <th>Id</th>
              <th>Customer Name</th>
              <th>Completion Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedApplications.map((application, index) =>
              application.certficateIssued ? null : (
                <tr key={application.id}>
                  <td>{application.id}</td>
                  <td>
                    {application.user.firstName} {application.user.lastName}
                  </td>
                  <td>
                    {
                      application.status[
                        application.status.length - 1
                      ].time.split("T")[0]
                    }
                  </td>
                  <td className="flex gap-2 max-sm:flex-col">
                    {application.currentStatus === "Certificate Generated" && (
                      <>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded flex gap-1 items-center">
                          <BsEye />
                          View Documents
                        </button>
                        <button
                          onClick={() => onClickDownload(application.id)}
                          className="bg-green-500 text-white px-2 py-1 rounded flex gap-1 items-center"
                        >
                          <BiCertification />
                          View Certificate
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
              className=" shadow-lg rounded-xl border p-2"
            />
          </div>
          <div className="modal-action">
            <button
              onClick={handleUpload}
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
    </div>
  );
};

export default Completed;
