import React, { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { FaTimesCircle } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import { BiDownload } from "react-icons/bi";
import { BiEnvelopeOpen } from "react-icons/bi";

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

import applicationsimg from "../../assets/applications.png";

import Application from "./application";

import Loader from "../../Customer/components/loader";

import certificate from "../../assets/certificate.pdf";

import { useNavigate } from "react-router-dom";

import {
  getApplications,
  verifyApplication,
} from "../../Customer/Services/adminServices";

const ExistingApplicationsAdmin = () => {
  const navigate = useNavigate();
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const statuses = [
    "Student Intake Form",
    "Upload Documents",
    "Sent to RTO",
    "Certificate Generated",
  ];
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  const onClickPayment = () => {
    alert("Redirected to Payment Gateway");
  };

  const onClickDownload = () => {
    window.open(certificate);
  };

  const onClickStudentForm = () => {
    navigate("/student-intake-form");
  };

  const onClickUpload = () => {
    navigate("/upload-documents");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of applications per page

  const [filteredApplications, setFilteredApplications] = useState([]);

  const [activeStatus, setActiveStatus] = useState("All");

  const [selectedApplication, setSelectedApplication] = useState(null);

  const getApplicationsData = async () => {
    try {
      setSubmissionLoading(true);
      const applicationsData = await getApplications();
      //only keep verified applications
      setApplications(applicationsData.filter((app) => app.verified));
      setFilteredApplications(applicationsData.filter((app) => app.verified));
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

  useEffect(() => {
    getApplicationsData();
  }, []);

  // Calculate pagination
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

  return (
    <div>
      {loading && <Loader />}
      {submissionLoading && <SpinnerLoader />}

      {!selectedApplication && (
        <div className="">
          <div className="flex items-center gap-4 mb-5 lg:flex-row flex-col">
            <img src={applicationsimg} alt="Applications" className="h-36" />
            <div className="flex flex-col lg:w-1/2 w-full">
              <h1 className="text-3xl font-bold">Applications</h1>
              <p className="text-sm mt-2">
                Here you can view all the applications and their statuses.
              </p>
            </div>
          </div>
          <div className="flex lg:items-center gap-5 mb-14 max-sm:flex-col max-sm:w-full">
            <div className="flex items-center gap-2 ">
              <button
                className={`px-8 py-2 w-full btn rounded-xl font-normal  ${
                  activeStatus === "All" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => filterApplications("All")}
              >
                All
              </button>
            </div>
            {statuses.map((status) => (
              <div key={status} className="flex items-center gap-2">
                <button
                  className={`px-4 py-2 w-full rounded-xl font-normal btn ${
                    activeStatus === status ? "btn-primary" : "btn-secondary"
                  }`}
                  onClick={() => filterApplications(status)}
                >
                  {status}
                </button>
              </div>
            ))}
          </div>
          <div className=" overflow-x-auto border border-gray-300 rounded-md">
            <table className="table w-full overflow-x-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="font-semibold p-5">ID</th>
                  <th className="font-semibold">Date Created</th>
                  <th className="font-semibold">Customer</th>
                  <th className="font-semibold text-center">Certificate</th>
                  <th className="font-semibold text-center">Status</th>
                  <th className="font-semibold text-center">Paid</th>
                  <th className="font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((application) => (
                  <tr
                    key={application.id}
                    className="animate-fade-up items-center"
                  >
                    <td className="p-5">
                      {application.applicationId
                        ? application.applicationId
                        : application.id}
                    </td>
                    <td>{application.status[0].time.split("T")[0]}</td>
                    <td>
                      {application.user.firstName +
                        " " +
                        application.user.lastName}
                    </td>
                    <td className="text-center min-w-40">
                      {application.isf.lookingForWhatQualification}
                    </td>
                    <td className="p-2 flex items-center justify-center max-sm:mt-6 min-w-52">
                      {application.currentStatus === "Sent to RTO" ? (
                        <div className="p-1 rounded-full bg-red-600 text-white flex items-center justify-center gap-2 max-sm:w-full max-sm:text-center">
                          <BsArrowUpRight className="text-white" />
                          {application.currentStatus}
                        </div>
                      ) : application.currentStatus ===
                        "Waiting for Verification" ? (
                        <div className="p-1 rounded-full bg-yellow-300 text-black flex items-center justify-center gap-2   max-sm:w-full max-sm:text-center">
                          <BsClock className="text-black" />
                          {application.currentStatus}
                        </div>
                      ) : application.currentStatus ===
                        "Waiting for Payment" ? (
                        <div className="p-1 rounded-full bg-green-400 text-white flex items-center justify-center gap-2   max-sm:w-full max-sm:text-center">
                          <BsClock className="text-white" />
                          {application.currentStatus}
                        </div>
                      ) : application.currentStatus ===
                        "Student Intake Form" ? (
                        <div className="p-1 rounded-full bg-blue-900 text-white flex items-center justify-center gap-2   max-sm:w-full max-sm:text-center">
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
                    <td className="p-2 text-center">
                      {application.paid ? (
                        <BiCheckCircle className="text-green-500 text-xl" />
                      ) : (
                        <FaTimesCircle className="text-red-500 text-xl" />
                      )}
                    </td>
                    <td>
                      {application.currentStatus === "Completed" ||
                      application.currentStatus === "Dispatched" ||
                      application.currentStatus === "Certificate Generated" ? (
                        <div className="flex items-center gap-2 flex-col lg:flex-row">
                          <button
                            className="btn bg-green-500 hover:bg-green-600 text-white btn-sm"
                            onClick={onClickDownload}
                          >
                            <BiDownload className="text-white hidden lg:block" />
                            Download
                          </button>
                          <button
                            className="btn bg-green-500 hover:bg-green-600 text-white btn-sm"
                            onClick={() => setSelectedApplication(application)}
                          >
                            <BsEye className="text-white" />
                            View
                          </button>
                        </div>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="7" className="p-5">
                    <div className="flex items-center justify-between">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={goToPreviousPage}
                      >
                        Previous
                      </button>
                      <div>
                        Page {currentPage} of {totalPages}
                      </div>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={goToNextPage}
                      >
                        Next
                      </button>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {selectedApplication && (
        <Application
          application={selectedApplication}
          setSelectedApplication={setSelectedApplication}
        />
      )}
    </div>
  );
};

export default ExistingApplicationsAdmin;
