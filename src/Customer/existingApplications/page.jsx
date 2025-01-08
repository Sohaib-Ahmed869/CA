import React, { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { FaTimesCircle } from "react-icons/fa";
import Navbar from "../components/navbar";
import { BsEye } from "react-icons/bs";
import { BiDownload } from "react-icons/bi";
import { BiEnvelopeOpen } from "react-icons/bi";
import PaymentPage from "../checkoutForm";
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
import { onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import { getApplications } from "../Services/customerApplication";
import SpinnerLoader from "../components/spinnerLoader";
import Loader from "../components/loader";
import Footer from "../components/footer";
import { initiateVerificationCall } from "../Services/twilioService";

import certificate from "../../assets/certificate.pdf";
import applicationsimg from "../../assets/applications.png";

import { useNavigate } from "react-router-dom";

const ExistingApplications = () => {
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

  const [partialScheme, setPartialScheme] = useState(false);
  const [paid, setPaid] = useState(false);
  const [payment1, setPayment1] = useState(0);
  const [payment2, setPayment2] = useState(0);
  const [full_paid, setFullPaid] = useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  const onClickPayment = (
    price,
    discount,
    applicationId,
    userId,
    partialScheme,
    paid,
    payment1,
    payment2,
    full_paid
  ) => {
    if (!discount) {
      setPrice(price);
    } else {
      setPrice(calculateDiscountedPrice(price, discount));
    }
    setApplicationId(applicationId);
    setPartialScheme(partialScheme);
    setPaid(paid);
    setPayment1(payment1);
    setPayment2(payment2);
    setFullPaid(full_paid);

    setShowCheckoutModal(true);
  };

  const onClickDownload = (certificateId) => {
    const certificateLink = certificateId;
    window.open(certificateLink, "_blank");
  };

  const onClickStudentForm = (id) => {
    navigate("/student-intake-form/" + id);
  };

  const onClickUpload = (id, industry) => {
    localStorage.setItem("applicationIndustry", industry);
    navigate("/upload-documents/" + id);
  };

  useEffect(() => {
    const autoLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        try {
          await signInWithCustomToken(auth, token);
          console.log("User signed in automatically with token");
        } catch (error) {
          console.error("Error during auto-login:", error);
          navigate("/login"); // Redirect to login if token is invalid
        }
      }
    };

    autoLogin();
  }, []);

  useEffect(() => {
    const authListener = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        console.log("User ID:", user.uid);
      } else {
        navigate("/login");
      }
    });
    return () => authListener(); // Cleanup listener on unmount
  }, [navigate]);

  const getUserApplications = async (userId) => {
    setSubmissionLoading(true);
    try {
      const response = await getApplications(userId);
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

  // Function to initiate the call for verification
  const handleVerifyNow = async (applicationId) => {
    try {
      setLoading(true);
      const response = await initiateVerificationCall(applicationId);
      console.log("Call response:", response);
      alert("Verification call initiated successfully!");
    } catch (error) {
      console.error("Error during call initiation:", error);
      alert("Failed to initiate the verification call. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    // Remove commas and convert to number
    console.log(price);
    if (!price) return 0;
    if (!discount) return price;
    const cleanPrice = parseFloat(price.toString().replace(/,/g, ""));
    console.log("ok", cleanPrice, discount);
    return cleanPrice - discount;
  };

  return (
    <div>
      {loading && <Loader />}
      {submissionLoading && <SpinnerLoader />}
      <Navbar />
      <div className="p-3 lg:p-20 overflow-x-auto">
        <div className="flex items-center gap-4 mb-5 lg:flex-row flex-col max-sm:mt-24">
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
        <div className="max-sm:max-w-[500px] overflow-y-auto overflow-x-auto border border-gray-300 rounded-md p-3">
          <div className="table mx-auto max-sm:overflow-x-auto">
            <div className="table-row-group">
              <div className="table-row bg-gray-200">
                <div className="table-cell font-semibold p-5 min-w-40">
                  Application ID
                </div>
                <div className="table-cell font-semibold min-w-40">
                  Date Created
                </div>
                <div className="table-cell font-semibold w-52 text-center">
                  Certificate
                </div>
                <div className="table-cell font-semibold min-w-40 text-center">
                  Industry
                </div>
                <div className="table-cell font-semibold text-center min-w-96">
                  Status
                </div>
                <div className="table-cell font-semibold text-center min-w-40">
                  Payment Status
                </div>

                <div className="table-cell font-semibold  text-center">
                  Actions
                </div>
              </div>
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="table-row max-sm:overflow-x-auto"
                >
                  <div className="table-cell p-5">
                    {application.applicationId
                      ? application.applicationId
                      : application.id}
                  </div>
                  <div className="table-cell">
                    {application.status[0].time ? (
                      application.status[0].time.split("T")[0]
                    ) : (
                      <span className="text-sm">N/A</span>
                    )}
                  </div>
                  <div className="table-cell">
                    {application.initialForm.lookingForWhatQualification}
                  </div>
                  <div className="table-cell text-center">
                    {application.initialForm.industry}
                  </div>
                  <div className="w-full p-2 flex items-center justify-center sm:flex-col min-w-96">
                    {application.currentStatus === "Sent to RTO" ? (
                      application.paid ? (
                        <div className="p-1 text rounded-full bg-red-600 text-white flex items-center justify-center w-2/3 gap-2">
                          <BsArrowUpRight className="text-white" />
                          Waiting Approval
                        </div>
                      ) : (
                        <div
                          className="p-1 rounded-full bg-red-700 text-white flex items-center justify-center w-2/3 gap-2"
                          onClick={() =>
                            onClickPayment(
                              application.price,
                              application.discount,
                              application.id
                            )
                          }
                        >
                          <MdPayment className="text-white" />
                          Payment Awaiting
                        </div>
                      )
                    ) : application.currentStatus ===
                      "Waiting for Verification" ? (
                      <div className="p-1 rounded-full bg-yellow-300 text-black flex items-center justify-center w-2/3 gap-2">
                        <BsClock className="text-black" />
                        {application.currentStatus}
                      </div>
                    ) : application.currentStatus === "Waiting for Payment" ? (
                      <div className="p-1 rounded-full bg-green-400 text-white flex items-center justify-center w-2/3 gap-2">
                        <BsClock className="text-white" />
                        <p className="text-white">Payment Awaiting</p>
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
                    ) : application.currentStatus ===
                      "Certificate Generated" ? (
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

                  <div className="flex  justify-center flex-col gap-2 w-40">
                    {application.currentStatus === "Sent to RTO" ? (
                      application.paid === false ? (
                        <button
                          className="btn btn-sm text-white btn-primary"
                          onClick={() =>
                            onClickPayment(
                              application.price,
                              application.discount,
                              application.id,
                              application.userId,
                              application.partialScheme,
                              application.paid,
                              application.payment1,
                              application.payment2,
                              application.full_paid
                            )
                          }
                        >
                          Pay Now
                        </button>
                      ) : null
                    ) : null}

                    {application.paid === false &&
                    application.currentStatus !== "Sent to RTO" ? (
                      <button
                        className="btn btn-sm text-white btn-primary"
                        onClick={() =>
                          onClickPayment(
                            application.price,
                            application.discount,
                            application.id,
                            application.userId,
                            application.partialScheme,
                            application.paid,
                            application.payment1,
                            application.payment2,
                            application.full_paid
                          )
                        }
                      >
                        Pay Now
                      </button>
                    ) : null}

                    {application.currentStatus ===
                    "Waiting for Verification" ? null : application.currentStatus === // ) //   </button> //     Verify Now //     <IoCall /> //   <button onClick={() => handleVerifyNow(application.id)}> //    ( //   className="btn btn-sm text-white btn-primary"
                      "Student Intake Form" ? (
                      <button
                        className="btn btn-sm text-white btn-primary"
                        onClick={() => onClickStudentForm(application.id)}
                      >
                        Fill Form
                      </button>
                    ) : application.currentStatus === "Upload Documents" ? (
                      <button
                        className="btn btn-sm text-white btn-primary"
                        onClick={() =>
                          onClickUpload(
                            application.id,
                            application.initialForm.industry
                          )
                        }
                      >
                        <BiUpload className="max-sm:hidden" /> Upload
                      </button>
                    ) : application.currentStatus ===
                      "Certificate Generated" ? (
                      <button
                        className="btn btn-sm text-white btn-primary"
                        onClick={() =>
                          onClickDownload(application.certificateId)
                        }
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
      </div>
      {showCheckoutModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Payment Details</h3>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="btn btn-sm btn-circle"
              >
                ✕
              </button>
            </div>

            <div className="py-4">
              <PaymentPage
                price={price}
                applicationId={applicationId}
                partialScheme={partialScheme}
                paid={paid}
                payment1={payment1}
                payment2={payment2}
                setShowCheckoutModal={setShowCheckoutModal}
                getUserApplications={getUserApplications}
                userId={userId}
              />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ExistingApplications;
