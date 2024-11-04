import React, { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { FaTimesCircle } from "react-icons/fa";
import Navbar from "../Components/navbar";
import { BsEye } from "react-icons/bs";
import { BiDownload } from "react-icons/bi";
import { BiEnvelopeOpen } from "react-icons/bi";
import PaymentPage from "../../Customer/checkoutForm";
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
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getApplicationsByAgent } from "../../Customer/Services/agentApplication";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import Loader from "../../Customer/components/loader";

import applicationsimg from "../../assets/applications.png";

import { useNavigate } from "react-router-dom";

const ExistingApplicationsbyAgent = () => {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const statuses = [
    "Waiting for Verification",
    "Waiting for Payment",
    "Student Intake Form",
    "Upload Documents",
    "Sent to RTO",
    "Certficated Generated",
    "Dispatched",
    "Completed",
  ];

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [loading, setLoading] = React.useState(true);

  const [price, setPrice] = useState(0);
  const [applicationId, setApplicationId] = useState("");

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  const onClickPayment = (price, applicationId) => {
    setPrice(price);
    setApplicationId(applicationId);
    setShowCheckoutModal(true);
  };

  const onClickDownload = (certificateId) => {
    const certificateLink = certificateId;
    window.open(certificateLink, "_blank");
  };

  const onClickStudentForm = (id) => {
    navigate("/student-intake-form/" + id);
  };

  const onClickUpload = (id) => {
    navigate("/upload-documents/" + id);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        console.log("User ID:", user.uid);
      } else {
        navigate("/agent/login");
      }
    });
  }, []);

  const getUserApplications = async (userId) => {
    setSubmissionLoading(true);
    try {
      const response = await getApplicationsByAgent(userId);
      console.log(response);
      setApplications(response);
      setSubmissionLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserApplications(userId);
    }
  }, [userId]);

  return (
    <div>
      {loading && <Loader />}
      {submissionLoading && <SpinnerLoader />}
      <Navbar />
      <div className="p-3 lg:p-20 overflow-x-auto">
        <div className="flex items-center gap-4 mb-5 lg:flex-row flex-col">
          <img src={applicationsimg} alt="Applications" className="h-36" />
          <div className="flex flex-col lg:w-1/2 w-full">
            <h1 className="text-3xl font-bold max-sm:text-xl">Applications</h1>
            <p className="text-sm mt-2">
              Here you can view all the applications and their statuses.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between items-center gap-4 mb-10">
          <button
            className="btn btn-sm text-white btn-primary"
            onClick={() => navigate("/new-application")}
          >
            <BiEnvelopeOpen />
            New Application
          </button>
          <button
            className="btn btn-sm text-white btn-primary"
            onClick={() => getUserApplications(userId)}
          >
            Refresh
          </button>
        </div>
        <div className="table mx-auto max-sm:max-w-screen-sm sm:overflow-x-auto">
          <div className="table-row-group mx-auto">
            <div className="table-row bg-gray-200">
              <div className="table-cell font-semibold p-5 max-sm:min-w-40">
                Application ID
              </div>
              <div className="table-cell font-semibold max-sm:min-w-40">
                Date Created
              </div>
              <div className="table-cell font-semibold text-center max-sm:min-w-96">
                Status
              </div>
              <div className="table-cell font-semibold text-center max-sm:min-w-40">
                Payment Status
              </div>
              <div className="table-cell font-semibold max-sm:min-w-40">
                Payment Date
              </div>
              <div className="table-cell font-semibold max-sm:min-w-40 text-center">
                Actions
              </div>
            </div>
            {applications.map((application) => (
              <div key={application.id} className="table-row">
                <div className="table-cell p-5">{application.id}</div>
                <div className="table-cell">
                  {application.status[0].time ? (
                    application.status[0].time.split("T")[0]
                  ) : (
                    <span className="text-sm">N/A</span>
                  )}
                </div>
                <div className="w-full p-2 flex items-center justify-center sm:flex-col">
                  {application.currentStatus === "Sent to RTO" ? (
                    <div className="p-1 text rounded-full bg-red-600 text-white flex items-center justify-center w-2/3 gap-2">
                      <BsArrowUpRight className="text-white" />
                      Waiting Approval
                    </div>
                  ) : application.currentStatus ===
                    "Waiting for Verification" ? (
                    <div className="p-1 rounded-full bg-yellow-300 text-black flex items-center justify-center w-2/3 gap-2">
                      <BsClock className="text-black" />
                      {application.currentStatus}
                    </div>
                  ) : application.currentStatus === "Waiting for Payment" ? (
                    <div className="p-1 rounded-full bg-green-400 text-white flex items-center justify-center w-2/3 gap-2">
                      <BsClock className="text-white" />
                      {application.currentStatus}
                    </div>
                  ) : application.currentStatus === "Student Intake Form" ? (
                    <div className="p-1 rounded-full bg-blue-900 text-white flex items-center justify-center w-2/3 gap-2">
                      <BiUser className="text-white" />
                      {application.currentStatus}
                    </div>
                  ) : application.currentStatus === "Upload Documents" ? (
                    <div className="p-1 rounded-full bg-red-900 text-white flex items-center justify-center w-2/3 gap-2">
                      <BiUpload className="text-white" />
                      {application.currentStatus}
                    </div>
                  ) : application.currentStatus === "Certificate Generated" ? (
                    <div className="p-1 rounded-full bg-primary text-white flex items-center justify-center w-2/3 gap-2">
                      <FaCertificate className="text-white" />
                      {application.currentStatus}
                    </div>
                  ) : application.currentStatus === "Dispatched" ? (
                    <div className="p-1 rounded-full bg-black text-white flex items-center justify-center w-2/3 gap-2">
                      <BsTruck className="text-white" />
                      {application.currentStatus}
                    </div>
                  ) : (
                    application.currentStatus === "Completed" && (
                      <div className="p-1 rounded-full bg-green-500 text-white flex items-center justify-center w-2/3 gap-2">
                        <BiCheck className="text-white" />
                        {application.currentStatus}
                      </div>
                    )
                  )}
                </div>
                <div className="table-cell p-2">
                  {application.paid ? (
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
                <div className="flex w-full justify-center">
                  {application.currentStatus ===
                  "Sent to RTO" ? null : application.currentStatus ===
                    "Waiting for Payment" ? (
                    <button
                      className="btn btn-sm text-white btn-primary"
                      onClick={() =>
                        onClickPayment(application.price, application.id)
                      }
                    >
                      <MdPayment />
                      Pay Now
                    </button>
                  ) : application.currentStatus ===
                    "Waiting for Verification" ? (
                    <button className="btn btn-sm text-white btn-primary">
                      <IoCall />
                      Verify Now
                    </button>
                  ) : application.currentStatus === "Student Intake Form" ? (
                    <button
                      className="btn btn-sm text-white btn-primary"
                      onClick={() => onClickStudentForm(application.id)}
                    >
                      <GrFormAdd />
                      Fill Form
                    </button>
                  ) : application.currentStatus === "Upload Documents" ? (
                    <button
                      className="btn btn-sm text-white btn-primary"
                      onClick={() => onClickUpload(application.id)}
                    >
                      <BiUpload /> Upload
                    </button>
                  ) : application.currentStatus === "Certificate Generated" ? (
                    <button
                      className="btn btn-sm text-white btn-primary"
                      onClick={() => onClickDownload(application.certificateId)}
                    >
                      <BiDownload /> Download
                    </button>
                  ) : application.currentStatus === "Dispatched" ? (
                    <div className="flex gap-2 max-sm:flex-col">
                      <button className="btn btn-sm text-white btn-primary">
                        <CgTrack /> Track
                      </button>
                      <button className="btn btn-sm text-white btn-primary">
                        <BiDownload /> Download
                      </button>
                    </div>
                  ) : (
                    application.currentStatus === "Completed" && (
                      <div className="flex gap-2 max-sm:flex-col">
                        <button
                          className="btn btn-sm text-white btn-primary"
                          onClick={() =>
                            onClickDownload(application.certificateId)
                          }
                        >
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
      {showCheckoutModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Payment</h3>
            <div className="py-4">
              <PaymentPage price={price} applicationId={applicationId} />
            </div>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() => setShowCheckoutModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExistingApplicationsbyAgent;
