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

import { Link, useNavigate } from "react-router-dom";

const ExistingApplications = () => {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const statuses = [
    "Waiting for Verification",
    "Waiting for Payment",
    "Student Intake Form",
    "Upload Documents",
    "Sent to RTO",
    "Certificate Generated",
    "Dispatched",
    "Completed",
  ];

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [price, setPrice] = useState(0);
  const [applicationId, setApplicationId] = useState("");
  const [partialScheme, setPartialScheme] = useState(false);
  const [paid, setPaid] = useState(false);
  const [payment1, setPayment1] = useState(0);
  const [payment2, setPayment2] = useState(0);
  const [full_paid, setFullPaid] = useState(false);

  useEffect(() => {
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
    setIsRefreshing(true);
    try {
      const response = await getApplications(userId);
      console.log(response);
      setApplications(response);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmissionLoading(false);
      setIsRefreshing(false);
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

  // Check if all required steps are completed
  const checkAllStepsCompleted = (application) => {
    // Get completion statuses
    const isPaymentDone = application.paid;

    // Check if student form is filled - simplified check, can be enhanced
    const isStudentFormFilled =
      application.studentForm &&
      Object.keys(application.studentForm).length > 0 &&
      application.studentForm.firstName;

    // Check if documents are uploaded - simplified check, can be enhanced
    const areDocumentsUploaded =
      application.documentsForm &&
      Object.keys(application.documentsForm).length > 0 &&
      (application.documentsForm.resume ||
        application.documentsForm.creditcard);

    return {
      isPaymentDone,
      isStudentFormFilled,
      areDocumentsUploaded,
      allCompleted:
        isPaymentDone && isStudentFormFilled && areDocumentsUploaded,
    };
  };

  // Filter and sort applications
  const filteredApplications = applications
    .filter((app) => {
      // Apply search filter
      const searchLower = searchTerm.toLowerCase();
      const appIdMatch =
        app.applicationId?.toLowerCase().includes(searchLower) || false;
      const industryMatch =
        app.initialForm?.industry?.toLowerCase().includes(searchLower) || false;
      const qualificationMatch =
        app.initialForm?.lookingForWhatQualification
          ?.toLowerCase()
          .includes(searchLower) || false;
      const statusMatch =
        app.currentStatus?.toLowerCase().includes(searchLower) || false;

      // Apply status filter
      const statusFilterMatch = filterStatus
        ? app.currentStatus === filterStatus
        : true;

      return (
        (appIdMatch || industryMatch || qualificationMatch || statusMatch) &&
        statusFilterMatch
      );
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === "date") {
        const dateA =
          a.status && a.status[0]?.time
            ? new Date(a.status[0].time)
            : new Date(0);
        const dateB =
          b.status && b.status[0]?.time
            ? new Date(b.status[0].time)
            : new Date(0);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortBy === "status") {
        return sortOrder === "asc"
          ? (a.currentStatus || "").localeCompare(b.currentStatus || "")
          : (b.currentStatus || "").localeCompare(a.currentStatus || "");
      } else if (sortBy === "price") {
        const priceA = parseFloat(a.price?.toString().replace(/,/g, "") || 0);
        const priceB = parseFloat(b.price?.toString().replace(/,/g, "") || 0);
        return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
      }
      return 0;
    });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to toggle sort order
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  // Get action buttons for an application
  const getActionButtons = (application) => {
    const {
      isPaymentDone,
      isStudentFormFilled,
      areDocumentsUploaded,
      allCompleted,
    } = checkAllStepsCompleted(application);

    const buttons = [];

    // Always show these buttons if not completed
    if (!isStudentFormFilled) {
      buttons.push({
        label: "Fill Student Form",
        icon: <BiUser />,
        action: () => onClickStudentForm(application.id),
        color: "btn-primary",
        priority: 2,
      });
    }

    if (!areDocumentsUploaded) {
      buttons.push({
        label: "Upload Documents",
        icon: <BiUpload />,
        action: () =>
          onClickUpload(application.id, application.initialForm?.industry),
        color: "btn-primary",
        priority: 3,
      });
    }

    if (!isPaymentDone) {
      buttons.push({
        label: "Make Payment",
        icon: <MdPayment />,
        action: () =>
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
          ),
        color: "btn-success",
        priority: 1,
      });
    }

    // Add certificate download if available
    if (
      application.currentStatus === "Certificate Generated" ||
      application.currentStatus === "Completed"
    ) {
      buttons.push({
        label: "Download Certificate",
        icon: <BiDownload />,
        action: () => onClickDownload(application.certificateId),
        color: "btn-primary",
        priority: 0,
      });
    }

    // Add verification call button if status is waiting for verification
    if (application.currentStatus === "Waiting for Verification") {
      buttons.push({
        label: "Verify Now",
        icon: <IoCall />,
        action: () => handleVerifyNow(application.id),
        color: "btn-primary",
        priority: 0,
      });
    }

    // Sort buttons by priority (lower number = higher priority)
    return buttons.sort((a, b) => a.priority - b.priority);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && <Loader />}
      {submissionLoading && <SpinnerLoader />}
      <Navbar />

      <div className="container mx-auto p-4 lg:p-8 lg:py-28">
        <div className="flex items-center gap-4 mb-6 lg:flex-row flex-col max-sm:mt-24">
          <img
            src={applicationsimg}
            alt="Applications"
            className="h-24 lg:h-36"
          />
          <div className="flex flex-col w-full">
            <h1 className="text-3xl font-bold max-sm:text-2xl text-gray-800">
              My Applications
            </h1>
            <p className="text-sm mt-2 text-gray-600">
              View and manage all your qualification applications in one place.
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 hidden md:block">
          <h3 className="text-gray-700 font-medium mb-3">
            Application Status Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 p-2 rounded bg-gray-50">
              <BiCheckCircle className="text-green-500 text-xl" />
              <div>
                <p className="font-medium">Paid</p>
                <p className="text-xs text-gray-500">Payment complete</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-gray-50">
              <FaTimesCircle className="text-red-500 text-xl" />
              <div>
                <p className="font-medium">Unpaid</p>
                <p className="text-xs text-gray-500">Payment pending</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-gray-50">
              <BiUser className="text-blue-500 text-xl" />
              <div>
                <p className="font-medium">Student Form</p>
                <p className="text-xs text-gray-500">Personal details</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-gray-50">
              <BiUpload className="text-red-500 text-xl" />
              <div>
                <p className="font-medium">Documents</p>
                <p className="text-xs text-gray-500">Required files</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
            <div className="flex gap-3">
              <button
                className="btn btn-sm text-white btn-primary flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                onClick={() => navigate("/new-application")}
              >
                <BiEnvelopeOpen />
                New Application
              </button>
              <button
                className={`btn btn-sm ${
                  isRefreshing ? "bg-gray-400" : "btn-outline btn-primary"
                } flex items-center gap-2 shadow hover:shadow-md transition-all`}
                onClick={() => getUserApplications(userId)}
                disabled={isRefreshing}
              >
                <svg
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 w-full lg:w-auto">
              <div className="relative flex-grow lg:min-w-[250px]">
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="input input-bordered w-full pr-10 shadow-sm focus:shadow transition-shadow"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              {/* <select
                className="select select-bordered shadow-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select> */}
              <div className="gap-2 hidden lg:flex">
                <select
                  className="select select-bordered shadow-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Sort by Date</option>
                  <option value="status">Sort by Status</option>
                  <option value="price">Sort by Price</option>
                </select>
                <button
                  className="btn btn-square btn-sm shadow hover:shadow-md transition-all"
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-gray-500">
              {filteredApplications.length} application
              {filteredApplications.length !== 1 ? "s" : ""} found
            </div>
          </div>
        </div>

        {/* Applications Grid */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white p-10 rounded-lg shadow text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium">No applications found</h3>
            <p className="mt-1 text-gray-500">
              {searchTerm || filterStatus
                ? "Try adjusting your search or filter criteria"
                : "Start by creating a new application"}
            </p>
            <button
              className="btn btn-primary mt-4 shadow-md hover:shadow-lg transition-all"
              onClick={() => navigate("/new-application")}
            >
              <BiEnvelopeOpen className="mr-2" />
              Create New Application
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredApplications.map((application) => {
              const paymentStatus = application.partialScheme
                ? application.full_paid
                  ? true
                  : false
                : application.paid
                ? true
                : false;

              // Get completion status of all required steps
              const completionStatus = checkAllStepsCompleted(application);

              // Get all action buttons for this application
              const actionButtons = getActionButtons(application);

              // Primary action is the first button
              const primaryAction =
                actionButtons.length > 0 ? actionButtons[0] : null;

              return (
                <div
                  key={application.id}
                  className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Card Header */}
                  <div className="bg-gray-100 p-5 border-b border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-xl text-primary">
                        #{application.applicationId || application.id}
                      </h3>
                      <div className="flex items-center">
                        {paymentStatus ? (
                          <div className="flex items-center bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                            <BiCheckCircle className="text-green-600 mr-1" />
                            PAID
                          </div>
                        ) : (
                          <div className="flex items-center bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                            <FaTimesCircle className="text-red-600 mr-1" />
                            UNPAID
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Created: {formatDate(application.status?.[0]?.time)}
                      </div>
                      {/*
                       if all steps are completed, show a badge that says "Waiting for Verification"
                       */}
                      {completionStatus.allCompleted && (
                        <div className="flex items-center bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                          <BsClock className="text-yellow-600 mr-1" />
                          Waiting for Verification
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Application Details */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-5 mb-6">
                      <div>
                        <p className="text-gray-500 text-sm mb-1">Industry</p>
                        <p className="font-medium">
                          {application.initialForm?.industry || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm mb-1">
                          Qualification
                        </p>
                        <p
                          className="font-medium truncate"
                          title={
                            application.initialForm?.lookingForWhatQualification
                          }
                        >
                          {application.initialForm
                            ?.lookingForWhatQualification || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm mb-1">Price</p>
                        <p className="font-medium flex items-center">
                          <span>
                            $
                            {application.price
                              ? parseFloat(application.price).toLocaleString()
                              : "0"}
                          </span>
                          {application.discount ? (
                            <span className="text-green-600 text-xs ml-2 bg-green-50 px-2 py-0.5 rounded">
                              - $
                              {parseFloat(
                                application.discount
                              ).toLocaleString()}{" "}
                              Discount
                            </span>
                          ) : null}
                        </p>
                      </div>
                      {application.partialScheme && (
                        <div>
                          <p className="text-gray-500 text-sm mb-1">
                            Payment Plan
                          </p>
                          <p className="font-medium">
                            ${application.payment1 || 0} + $
                            {application.payment2 || 0}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Progress Indicators */}
                    <div className="border-t border-b border-gray-100 py-4 mb-5">
                      <div className="flex justify-between items-center mb-3">
                        <p className="font-medium">Application Progress</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div
                          className={`p-2 border rounded-md text-center ${
                            completionStatus.isStudentFormFilled
                              ? "bg-green-200 border-green-200"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <BiUser
                            className={`mx-auto text-lg ${
                              completionStatus.isStudentFormFilled
                                ? "text-green-500"
                                : "text-gray-400"
                            }`}
                          />
                          <p className="text-xs mt-1">Student Form</p>
                        </div>
                        <div
                          className={`p-2 border rounded-md text-center ${
                            completionStatus.areDocumentsUploaded
                              ? "bg-green-200 border-green-200"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <BiUpload
                            className={`mx-auto text-lg ${
                              completionStatus.areDocumentsUploaded
                                ? "text-green-500"
                                : "text-gray-400"
                            }`}
                          />
                          <p className="text-xs mt-1">Documents</p>
                        </div>
                        <div
                          className={`p-2 border rounded-md text-center ${
                            completionStatus.isPaymentDone
                              ? "bg-green-200 border-green-200"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <MdPayment
                            className={`mx-auto text-lg ${
                              completionStatus.isPaymentDone
                                ? "text-green-500"
                                : "text-gray-400"
                            }`}
                          />
                          <p className="text-xs mt-1">Payment</p>
                        </div>
                      </div>
                    </div>

                    {/* Next Step Section */}
                    {primaryAction && (
                      <div className="mb-5">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-medium flex items-center">
                            <span className="flex items-center justify-center mr-2 w-5 h-5 rounded-full bg-primary text-white text-xs">
                              !
                            </span>
                            Next Step:
                          </p>
                          <p className="text-sm text-gray-500">
                            {primaryAction.label}
                          </p>
                        </div>
                        <button
                          className={`btn ${primaryAction.color} w-full text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all`}
                          onClick={primaryAction.action}
                        >
                          {primaryAction.icon} {primaryAction.label}
                        </button>
                      </div>
                    )}

                    {/* Secondary Action Buttons */}
                    {actionButtons.length > 1 && (
                      <div className="grid grid-cols-1 gap-3 mb-5">
                        {actionButtons.slice(1).map((button, index) => (
                          <button
                            key={index}
                            className={`btn ${button.color} w-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all`}
                            onClick={button.action}
                          >
                            {button.icon} {button.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* View Application Button - Always show this */}
                    <Link
                      to={`/view-application/${application.userId}/${application.id}`}
                      className="btn btn-outline w-full flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all"
                    >
                      <BsEye /> View Complete Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Payment Modal */}
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
                full_paid={full_paid}
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
