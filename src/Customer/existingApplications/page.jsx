import React, { useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { FaTimesCircle } from "react-icons/fa";
import Navbar from "../components/navbar";
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

import Loader from "../components/loader";

import certificate from "../../assets/certificate.pdf";

import { useNavigate } from "react-router-dom";

const ExistingApplications = () => {
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

  return (
    <div>
      {loading && <Loader />}
      <Navbar />
      <div className="p-20">
        <div className="flex items-center gap-5 mb-5">
          <BiEnvelopeOpen className="text-4xl text-black" />
          <h1 className="text-2xl font-bold text-black italic">
            Existing Applications
          </h1>
        </div>
        <div className="table w-full">
          <div className="table-row-group">
            <div className="table-row bg-gray-200">
              <div className="table-cell font-semibold p-5">Application ID</div>
              <div className="table-cell font-semibold">Date Created</div>
              <div className="table-cell font-semibold text-center">Status</div>
              <div className="table-cell font-semibold text-center">
                Payment Status
              </div>
              <div className="table-cell font-semibold">Payment Date</div>
              <div className="table-cell font-semibold">Actions</div>
            </div>
            {applications.map((application) => (
              <div key={application.id} className="table-row">
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
                  {application.status ===
                  "Sent to RTO" ? null : application.status ===
                    "Waiting for Payment" ? (
                    <button
                      className="btn btn-sm text-white btn-primary"
                      onClick={onClickPayment}
                    >
                      <MdPayment />
                      Pay Now
                    </button>
                  ) : application.status === "Waiting for Verification" ? (
                    <button className="btn btn-sm text-white btn-primary">
                      <IoCall />
                      Verify Now
                    </button>
                  ) : application.status === "Student Intake Form pending" ? (
                    <button
                      className="btn btn-sm text-white btn-primary"
                      onClick={onClickStudentForm}
                    >
                      <GrFormAdd />
                      Fill Form
                    </button>
                  ) : application.status === "Upload Documents" ? (
                    <button className="btn btn-sm text-white btn-primary" onClick={onClickUpload}>
                      <BiUpload /> Upload
                    </button>
                  ) : application.status === "Certficated Generated" ? (
                    <button
                      className="btn btn-sm text-white btn-primary"
                      onClick={onClickDownload}
                    >
                      <BiDownload /> Download
                    </button>
                  ) : application.status === "Dispatched" ? (
                    <div className="flex gap-2">
                      <button className="btn btn-sm text-white btn-primary">
                        <CgTrack /> Track
                      </button>
                      <button className="btn btn-sm text-white btn-primary">
                        <BiDownload /> Download
                      </button>
                    </div>
                  ) : (
                    application.status === "Completed" && (
                      <div className="flex gap-2">
                        <button className="btn btn-sm text-white btn-primary">
                          <BiDownload /> Download
                        </button>
                        <button className="btn btn-sm text-white btn-primary">
                          <BsEye /> View
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExistingApplications;
