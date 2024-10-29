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

import applicationsimg from "../../assets/applications.png";

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
      customerName: "John Doe",
      certificate: "BSB30120 Certificate III in Business",
    },
    {
      id: 2,
      dateCreated: new Date(),
      status: "Verification",
      paymentStatus: false,
      paymentDate: null,
      customerName: "John Doe",
      certificate: "BSB30120 Certificate III in Business",
    },
    {
      id: 22,
      dateCreated: new Date(),
      status: "Payment",
      paymentStatus: false,
      paymentDate: null,
      customerName: "John Doe",
      certificate: "BSB30120 Certificate III in Business",
    },
    {
      id: 3,
      dateCreated: new Date(),
      status: "Student Intake Form ",
      paymentStatus: true,
      paymentDate: new Date(),
      customerName: "John Doe",
      certificate: "BSB30120 Certificate III in Business",
    },
    {
      id: 4,
      dateCreated: new Date(),
      status: "Upload Documents",
      paymentStatus: true,
      paymentDate: new Date(),
      customerName: "John Doe",
      certificate: "BSB30120 Certificate III in Business",
    },
    {
      id: 5,
      dateCreated: new Date(),
      status: "Certificate Generated",
      paymentStatus: true,
      paymentDate: new Date(),
      customerName: "John Doe",
      certificate: "BSB30120 Certificate III in Business",
    },
    {
      id: 23,
      dateCreated: new Date(),
      status: "Dispatched",
      paymentStatus: true,
      paymentDate: new Date(),
      customerName: "John Doe",
      certificate: "BSB30120 Certificate III in Business",
    },
    {
      id: 24,
      dateCreated: new Date(),
      status: "Completed",
      paymentStatus: true,
      paymentDate: new Date(),
      customerName: "John Doe",
      certificate: "BSB30120 Certificate III in Business",
    },
  ]);
  const statuses = [
    "Student Intake Form ",
    "Upload Documents",
    "Sent to RTO",
    "Certificate Generated",
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
          <div className="flex items-center gap-4 mb-5 lg:flex-row flex-col">
            <img src={applicationsimg} alt="Applications" className="h-36" />
            <div className="flex flex-col lg:w-1/2 w-full">
              <h1 className="text-3xl font-bold">Applications</h1>
              <p className="text-sm mt-2">
                Here you can view all the applications and their statuses.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 mb-14 justify-between">
            <div className="flex items-center gap-2 ">
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

          <table className="table w-full">
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
              {filteredApplications.map((application) => (
                <tr key={application.id} className="animate-fade-up items-center">
                  <td className="p-5">{application.id}</td>
                  <td>{application.dateCreated.toDateString()}</td>
                  <td>{application.customerName}</td>
                  <td className="text-center w-40">
                    {application.certificate}
                  </td>
                  <td className="p-2 flex items-center justify-center">
                    {application.status === "Sent to RTO" ? (
                      <div className="p-1 rounded-full bg-red-600 text-white flex items-center justify-center gap-2 w-3/4 max-sm:w-full max-sm:text-center">
                        <BsArrowUpRight className="text-white" />
                        {application.status}
                      </div>
                    ) : application.status === "Verification" ? (
                      <div className="p-1 rounded-full bg-yellow-300 text-black flex items-center justify-center gap-2  w-3/4 max-sm:w-full max-sm:text-center">
                        <BsClock className="text-black" />
                        {application.status}
                      </div>
                    ) : application.status === "Payment" ? (
                      <div className="p-1 rounded-full bg-green-400 text-white flex items-center justify-center gap-2  w-3/4 max-sm:w-full max-sm:text-center">
                        <BsClock className="text-white" />
                        {application.status}
                      </div>
                    ) : application.status === "Student Intake Form " ? (
                      <div className="p-1 rounded-full bg-blue-900 text-white flex items-center justify-center gap-2  w-3/4 max-sm:w-full max-sm:text-center">
                        <BiUser className="text-white" />
                        {application.status}
                      </div>
                    ) : application.status === "Upload Documents" ? (
                      <div className="p-1 rounded-full bg-red-900 text-white flex items-center justify-center gap-2  w-3/4">
                        <BiUpload className="text-white" />
                        {application.status}
                      </div>
                    ) : application.status === "Certificate Generated" ? (
                      <div className="p-1 rounded-full bg-primary text-white flex items-center justify-center gap-2  w-3/4">
                        <FaCertificate className="text-white" />
                        {application.status}
                      </div>
                    ) : application.status === "Dispatched" ? (
                      <div className="p-1 rounded-full bg-black text-white flex items-center justify-center gap-2  w-3/4">
                        <BsTruck className="text-white" />
                        {application.status}
                      </div>
                    ) : (
                      application.status === "Completed" && (
                        <div className="p-1 rounded-full bg-green-500 text-white flex items-center justify-center gap-2  w-3/4">
                          <BiCheck className="text-white" />
                          {application.status}
                        </div>
                      )
                    )}
                  </td>
                  <td className="p-2 text-center">
                    {application.paymentStatus ? (
                      <BiCheckCircle className="text-green-500 text-xl" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-xl" />
                    )}
                  </td>
                  <td>
                    {application.status === "Completed" || application.status === "Dispatched" || application.status === "Certificate Generated" ? (
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
                          onClick={() => setSelectedApplication(application)}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
