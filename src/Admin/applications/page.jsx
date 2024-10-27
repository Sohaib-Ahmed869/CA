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

import Application from "./application";

import Loader from "../../Customer/components/loader";

import certificate from "../../assets/certificate.pdf";

import { useNavigate } from "react-router-dom";

const ExistingApplicationsAdmin = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([
    {
      id: 1,
      dateCreated: new Date(),
      status: "Sent to RTO",
      paymentStatus: true,
      paymentDate: new Date(),
    },
    {
      id: 2,
      dateCreated: new Date(),
      status: "Waiting for Verification",
      paymentStatus: false,
      paymentDate: null,
    },
    {
      id: 22,
      dateCreated: new Date(),
      status: "Waiting for Payment",
      paymentStatus: false,
      paymentDate: null,
    },
    {
      id: 3,
      dateCreated: new Date(),
      status: "Student Intake Form pending",
      paymentStatus: true,
      paymentDate: new Date(),
    },
    {
      id: 4,
      dateCreated: new Date(),
      status: "Upload Documents",
      paymentStatus: true,
      paymentDate: new Date(),
    },
    {
      id: 5,
      dateCreated: new Date(),
      status: "Certficated Generated",
      paymentStatus: true,
      paymentDate: new Date(),
    },
    {
      id: 23,
      dateCreated: new Date(),
      status: "Dispatched",
      paymentStatus: true,
      paymentDate: new Date(),
    },
    {
      id: 24,
      dateCreated: new Date(),
      status: "Completed",
      paymentStatus: true,
      paymentDate: new Date(),
    },
  ]);
  const statuses = [
    "Waiting for Verification",
    "Waiting for Payment",
    "Student Intake Form pending",
    "Upload Documents",
    "Sent to RTO",
    "Certficated Generated",
    "Dispatched",
    "Completed",
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

  const [filteredApplications, setFilteredApplications] =
    useState(applications);

  const [activeStatus, setActiveStatus] = useState("All");

  const filterApplications = (status) => {
    setActiveStatus(status);
    if (status === "All") {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(
        applications.filter((application) => application.status === status)
      );
    }
  };

  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    console.log(selectedApplication);
  }, [selectedApplication]);

  return (
    <div>
      {loading && <Loader />}

      {!selectedApplication && (
        <div className="p-5">
          <div className="flex items-center gap-5 justify-center mb-10">
            <h1 className="text-2xl font-bold text-black text-center">
              Existing Applications
            </h1>
          </div>
          <div className="flex items-center gap-5 mb-14">
            <div className="flex items-center gap-2">
              <button
                className={`px-8 py-2 w-full btn rounded-xl font-normal focus:bg-blue-900 focus:text-white hover:bg-blue-900 hover:text-white ${
                  activeStatus === "All"
                    ? "bg-blue-900 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => filterApplications("All")}
              >
                All
              </button>
            </div>
            {statuses.map((status) => (
              <div key={status} className="flex items-center gap-2">
                <button
                  className={`px-4 py-2 w-full rounded-xl font-normal btn focus:bg-blue-900 focus:text-white ${
                    activeStatus === status
                      ? "bg-blue-900 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => filterApplications(status)}
                >
                  {status}
                </button>
              </div>
            ))}
          </div>

          <div className="table w-full">
            <div className="table-row-group">
              <div className="table-row bg-gray-200">
                <div className="table-cell font-semibold p-5">
                  Application ID
                </div>
                <div className="table-cell font-semibold">Date Created</div>
                <div className="table-cell font-semibold text-center">
                  Status
                </div>
                <div className="table-cell font-semibold text-center">
                  Payment Status
                </div>
                <div className="table-cell font-semibold">Payment Date</div>
                <div className="table-cell font-semibold">Actions</div>
              </div>
              {filteredApplications.map((application) => (
                <div key={application.id} className="table-row animate-fade-up">
                  <div className="table-cell p-5">{application.id}</div>
                  <div className="table-cell">
                    {application.dateCreated.toDateString()}
                  </div>
                  <div className="w-full p-2 flex items-center justify-center">
                    {application.status === "Sent to RTO" ? (
                      <div className="p-1 text rounded-full bg-blue-900 text-white flex items-center justify-center w-2/3 gap-2">
                        <BsArrowUpRight className="text-white" />
                        {application.status}
                      </div>
                    ) : application.status === "Waiting for Verification" ? (
                      <div className="p-1 rounded-full bg-blue-900 text-white flex items-center justify-center w-2/3 gap-2">
                        <BsClock className="text-white" />
                        {application.status}
                      </div>
                    ) : application.status === "Waiting for Payment" ? (
                      <div className="p-1 rounded-full bg-blue-900 text-white flex items-center justify-center w-2/3 gap-2">
                        <BsClock className="text-white" />
                        {application.status}
                      </div>
                    ) : application.status === "Student Intake Form pending" ? (
                      <div className="p-1 rounded-full bg-blue-900 text-white flex items-center justify-center w-2/3 gap-2">
                        <BiUser className="text-white" />
                        {application.status}
                      </div>
                    ) : application.status === "Upload Documents" ? (
                      <div className="p-1 rounded-full bg-blue-900 text-white flex items-center justify-center w-2/3 gap-2">
                        <BiUpload className="text-white" />
                        {application.status}
                      </div>
                    ) : application.status === "Certficated Generated" ? (
                      <div className="p-1 rounded-full bg-blue-900 text-white flex items-center justify-center w-2/3 gap-2">
                        <FaCertificate className="text-white" />
                        {application.status}
                      </div>
                    ) : application.status === "Dispatched" ? (
                      <div className="p-1 rounded-full bg-blue-900 text-white flex items-center justify-center w-2/3 gap-2">
                        <BsTruck className="text-white" />
                        {application.status}
                      </div>
                    ) : (
                      application.status === "Completed" && (
                        <div className="p-1 rounded-full bg-green-500 text-white flex items-center justify-center w-2/3 gap-2">
                          <BiCheck className="text-white" />
                          {application.status}
                        </div>
                      )
                    )}
                  </div>
                  <div className="table-cell p-2">
                    {application.paymentStatus ? (
                      <BiCheckCircle className="text-green-500 text-xl text-center w-full" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-xl text-center w-full" />
                    )}
                  </div>
                  <div className="table-cell p-2">
                    {application.paymentDate
                      ? application.paymentDate.toDateString()
                      : "N/A"}
                  </div>
                  <div className="table-cell">
                    {application.status === "Completed" ? (
                      <div className="flex items-center gap-2">
                        <button
                          className="btn bg-green-500 hover:bg-green-600 text-white btn-sm"
                          onClick={onClickDownload}
                        >
                          <BiDownload className="text-white" />
                          Download
                        </button>
                        <button
                          className="btn bg-green-500 hover:bg-green-600 text-white btn-sm"
                          onClick={setSelectedApplication.bind(
                            this,
                            application
                          )}
                        >
                          <BsEye className="text-white" />
                          View
                        </button>
                      </div>
                    ) : (
                      <button className="btn bg-red-500 hover:bg-red-600 text-white btn-sm">
                        <FaTimesCircle className="text-white" />
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              ))}
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
    </div>
  );
};

export default ExistingApplicationsAdmin;
