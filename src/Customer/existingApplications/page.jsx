import React, { useEffect, useState, useRef } from "react";
import { BiCheckCircle } from "react-icons/bi";
import {
  FaTimesCircle,
  FaFileAlt,
  FaCertificate,
  FaSignOutAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCog,
  FaUser,
  FaBars,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import { BsEye, BsClock, BsTruck } from "react-icons/bs";
import { BiDownload, BiUser, BiUpload, BiCheck } from "react-icons/bi";
import { IoCall } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";
import { CgTrack } from "react-icons/cg";
import PaymentPage from "../checkoutForm";
import { auth } from "../../firebase";
import {
  onAuthStateChanged,
  signInWithCustomToken,
  signOut,
} from "firebase/auth";
import { getApplications } from "../Services/customerApplication";
import SpinnerLoader from "../components/spinnerLoader";
import Loader from "../components/loader";
import Footer from "../components/footer";
import Modal from "../components/modal";
import { initiateVerificationCall } from "../Services/twilioService";

import { Link, useNavigate } from "react-router-dom";
import applicationsimg from "../../assets/applications.png";

const ExistingApplications = () => {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdatePhoneOpen, setIsUpdatePhoneOpen] = useState(false);
  const [isUpdateEmailOpen, setIsUpdateEmailOpen] = useState(false);
  const menuRef = useRef(null);

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
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Match the dashboard loading time
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
    // For partial payment schemes, set the correct price based on payment status
    if (partialScheme) {
      if (paid && !full_paid) {
        // If partially paid, set price to payment2 for the second payment
        setPrice(payment2);
      } else {
        // If not paid at all, set price to payment1 for the first payment
        setPrice(payment1);
      }
    } else {
      // For regular payments, handle discount if present
      if (!discount) {
        setPrice(price);
      } else {
        setPrice(calculateDiscountedPrice(price, discount));
      }
    }

    setApplicationId(applicationId);
    setPartialScheme(partialScheme);
    setPaid(paid);
    setPayment1(payment1);
    setPayment2(payment2);
    setFullPaid(full_paid);
    setDiscount(discount);

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
        sessionStorage.setItem("userId", user.uid);
        setUserName(user.displayName || "");
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

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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

  // Get payment status details
  const getPaymentStatus = (application) => {
    // For applications with partial payment scheme
    if (application.partialScheme) {
      if (application.full_paid) {
        return {
          status: "FULLY PAID",
          color: "bg-green-100 text-green-800",
          icon: <BiCheckCircle className="text-green-600 mr-1" />,
          cardColorClass: "bg-green-50",
        };
      } else if (application.paid) {
        return {
          status: "PARTIALLY PAID",
          color: "bg-yellow-100 text-yellow-800",
          icon: <BiCheckCircle className="text-yellow-600 mr-1" />,
          cardColorClass: "bg-yellow-50",
        };
      } else {
        return {
          status: "UNPAID",
          color: "bg-red-100 text-red-800",
          icon: <FaTimesCircle className="text-red-600 mr-1" />,
          cardColorClass: "",
        };
      }
    }
    // For regular applications
    else {
      if (application.paid) {
        return {
          status: "PAID",
          color: "bg-green-100 text-green-800",
          icon: <BiCheckCircle className="text-green-600 mr-1" />,
          cardColorClass: "bg-green-50",
        };
      } else {
        return {
          status: "UNPAID",
          color: "bg-red-100 text-red-800",
          icon: <FaTimesCircle className="text-red-600 mr-1" />,
          cardColorClass: "",
        };
      }
    }
  };

  // Check if all required steps are completed
  const checkAllStepsCompleted = (application) => {
    // Get payment status - for partial scheme, consider both partial and full payment
    const isPaymentDone = application.partialScheme
      ? application.full_paid
      : application.paid;

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

      return appIdMatch || industryMatch || qualificationMatch || statusMatch;
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
        color: "bg-emerald-600 hover:bg-emerald-700",
        priority: 2,
      });
    }

    if (!areDocumentsUploaded) {
      buttons.push({
        label: "Upload Documents",
        icon: <BiUpload />,
        action: () =>
          onClickUpload(application.id, application.initialForm?.industry),
        color: "bg-emerald-600 hover:bg-emerald-700",
        priority: 3,
      });
    }

    // For partial payment scheme
    if (application.partialScheme) {
      if (!application.paid) {
        // First payment not made yet
        buttons.push({
          label: "Make Initial Payment",
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
          color: "bg-emerald-600 hover:bg-emerald-700",
          priority: 1,
        });
      } else if (!application.full_paid) {
        // First payment made, but not fully paid
        buttons.push({
          label: "Make Final Payment",
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
          color: "bg-emerald-600 hover:bg-emerald-700",
          priority: 1,
        });
      }
    } else if (!isPaymentDone) {
      // Regular payment (not a scheme)
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
        color: "bg-emerald-600 hover:bg-emerald-700",
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
        color: "bg-emerald-600 hover:bg-emerald-700",
        priority: 0,
      });
    }

    // Add verification call button if status is waiting for verification
    if (application.currentStatus === "Waiting for Verification") {
      buttons.push({
        label: "Verify Now",
        icon: <IoCall />,
        action: () => handleVerifyNow(application.id),
        color: "bg-emerald-600 hover:bg-emerald-700",
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

      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8 bg-white p-4 rounded-full">
            <img
              src={applicationsimg}
              alt="Applications"
              className="h-20 w-20 md:h-24 md:w-24"
            />
          </div>
          <div className="text-center md:text-left text-white">
            <h1 className="text-3xl font-bold mb-2">My Applications</h1>
            <p className="text-emerald-100 max-w-2xl">
              View and manage all your qualification applications in one place.
              Track your progress, make payments, and update your documentation.
            </p>
          </div>

          {/* Hamburger Menu */}
          <div className="absolute top-6 right-6" ref={menuRef}>
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 top-12 w-56 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-visible">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {auth.currentUser?.email || "User"}
                  </p>
                </div>

                <div className="py-1">
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setIsUpdateEmailOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <FaEnvelope className="mr-3 text-emerald-600" />
                    Update Email
                  </button>

                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setIsUpdatePhoneOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <FaPhoneAlt className="mr-3 text-emerald-600" />
                    Update Phone
                  </button>
                </div>

                <div className="py-1 border-t border-gray-100">
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="mr-3 text-red-600" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 mt-4 sm:px-6 lg:px-8">
        {/* Filters and Controls */}
        <div className="bg-white rounded-xl  shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
              <div className="flex gap-3">
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
                  onClick={() => navigate("/")}
                >
                  <FaArrowLeft className="mr-2" />
                  Home
                </button>
                <button
                  className="inline-flex  items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
                  onClick={() => navigate("/new-application")}
                >
                  <GrFormAdd className="mr-2 text-white" />
                  New Application
                </button>
              </div>
              <div className="flex flex-col lg:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-grow lg:min-w-[250px]">
                  <input
                    type="text"
                    placeholder="Search applications..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                <select
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Sort by Date</option>
                  <option value="status">Sort by Status</option>
                  <option value="price">Sort by Price</option>
                </select>
                <button
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-gray-500">
                {filteredApplications.length} application
                {filteredApplications.length !== 1 ? "s" : ""} found
              </div>
            </div>
          </div>
        </div>

        {/* Applications Grid */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-10 text-center">
            <div className="inline-block p-4 rounded-full bg-emerald-100 mb-4">
              <FaFileAlt className="text-emerald-600 text-3xl" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 mb-2">
              No applications found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? "Try adjusting your search criteria"
                : "Start by creating a new application"}
            </p>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
              onClick={() => navigate("/new-application")}
            >
              <GrFormAdd className="mr-2 text-white" /> Create New Application
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApplications.map((application) => {
              // Get payment status using our new function
              const paymentStatusInfo = getPaymentStatus(application);

              // Get completion status of all required steps
              const completionStatus = checkAllStepsCompleted(application);

              // Get all action buttons for this application
              const actionButtons = getActionButtons(application);

              // Primary action is the first button
              const primaryAction =
                actionButtons.length > 0 ? actionButtons[0] : null;

              // Determine status color based on application status
              let statusColor = "bg-gray-100 text-gray-800";
              let statusIcon = <CgTrack className="mr-1" />;

              if (application.currentStatus === "Waiting for Verification") {
                statusColor = "bg-yellow-100 text-yellow-800";
                statusIcon = <BsClock className="mr-1" />;
              } else if (
                application.currentStatus === "Certificate Generated"
              ) {
                statusColor = "bg-green-100 text-green-800";
                statusIcon = <FaCertificate className="mr-1" />;
              } else if (application.currentStatus === "Dispatched") {
                statusColor = "bg-blue-100 text-blue-800";
                statusIcon = <BsTruck className="mr-1" />;
              } else if (application.currentStatus === "Completed") {
                statusColor = "bg-emerald-100 text-emerald-800";
                statusIcon = <BiCheck className="mr-1" />;
              }

              return (
                <div
                  key={application.id}
                  className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                >
                  {/* Card Header */}
                  <div className="bg-gray-50 p-5 border-b border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-xl text-emerald-600">
                        #{application.applicationId || application.id}
                      </h3>
                      <div className="flex items-center">
                        <div
                          className={`flex items-center ${paymentStatusInfo.color} text-xs font-semibold px-2 py-1 rounded-full`}
                        >
                          {paymentStatusInfo.icon}
                          {paymentStatusInfo.status}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Created: {formatDate(application.status?.[0]?.time)}
                      </div>
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
                    </div>
                    <div className="border-t border-b border-gray-100 py-4">
                      {application.partialScheme && (
                        <div>
                          <p className="text-gray-500 text-sm mb-1">
                            Payment Plan
                          </p>
                          <p className="font-medium">
                            <span className="bg-blue-50 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full mr-1">
                              1st
                            </span>
                            ${application.payment1 || 0} +
                            <span className="bg-blue-50 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full mx-1">
                              2nd
                            </span>
                            ${application.payment2 || 0}
                          </p>
                          <div>
                            {application.paid && !application.full_paid && (
                              <div className="mt-2">
                                <p className="text-gray-500 text-xs">
                                  Payment Status
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                                    <span>
                                      Paid: ${application.payment1 || 0}
                                    </span>
                                  </div>
                                  <div className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                                    <span>
                                      Remaining: ${application.payment2 || 0}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
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
                              ? "bg-emerald-100 border-emerald-200"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <BiUser
                            className={`mx-auto text-lg ${
                              completionStatus.isStudentFormFilled
                                ? "text-emerald-600"
                                : "text-gray-400"
                            }`}
                          />
                          <p className="text-xs mt-1">Student Form</p>
                        </div>
                        <div
                          className={`p-2 border rounded-md text-center ${
                            completionStatus.areDocumentsUploaded
                              ? "bg-emerald-100 border-emerald-200"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <BiUpload
                            className={`mx-auto text-lg ${
                              completionStatus.areDocumentsUploaded
                                ? "text-emerald-600"
                                : "text-gray-400"
                            }`}
                          />
                          <p className="text-xs mt-1">Documents</p>
                        </div>
                        <div
                          className={`p-2 border rounded-md text-center ${
                            completionStatus.isPaymentDone
                              ? application.partialScheme &&
                                !application.full_paid
                                ? "bg-yellow-100 border-yellow-200"
                                : "bg-emerald-100 border-emerald-200"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <MdPayment
                            className={`mx-auto text-lg ${
                              completionStatus.isPaymentDone
                                ? application.partialScheme &&
                                  !application.full_paid
                                  ? "text-yellow-600"
                                  : "text-emerald-600"
                                : "text-gray-400"
                            }`}
                          />
                          <p className="text-xs mt-1">
                            {application.partialScheme &&
                            application.paid &&
                            !application.full_paid
                              ? "Partial Payment"
                              : "Payment"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Next Step Section */}
                    {primaryAction && (
                      <div className="mb-5">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-medium flex items-center">
                            <span className="flex items-center justify-center mr-2 w-5 h-5 rounded-full bg-emerald-600 text-white text-xs">
                              !
                            </span>
                            Next Step:
                          </p>
                          <p className="text-sm text-gray-500">
                            {primaryAction.label}
                          </p>
                        </div>
                        <button
                          className={`w-full text-white flex items-center justify-center gap-2 px-4 py-2 rounded-md ${primaryAction.color} shadow-md hover:shadow-lg transition-all`}
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
                            className={`w-full text-white flex items-center justify-center gap-2 px-4 py-2 rounded-md ${button.color} shadow-md hover:shadow-lg transition-all`}
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
                      className="w-full border border-gray-300 text-gray-700 flex items-center justify-center gap-2 px-4 py-2 rounded-md hover:bg-gray-50 shadow-sm hover:shadow transition-all"
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
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="font-bold text-lg text-gray-900">
                {partialScheme
                  ? paid && !full_paid
                    ? "Make Final Payment"
                    : "Make Initial Payment"
                  : "Make Payment"}
              </h3>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4">
              {partialScheme && (
                <div className="mb-4 p-3 bg-blue-50 rounded-md text-blue-800 text-sm">
                  {paid && !full_paid ? (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <BsEye className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p>
                          <strong>Final Payment:</strong> You've already made
                          your initial payment of ${payment1}. This is your
                          final payment of ${payment2} to complete your
                          application.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <BsEye className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p>
                          <strong>Payment Plan:</strong> This is your initial
                          payment of ${payment1}. A second payment of $
                          {payment2} will be required later to complete your
                          application.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <PaymentPage
                price={price}
                discount={discount}
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

      {/* Update Phone/Email Modal */}
      {isUpdateEmailOpen || isUpdatePhoneOpen ? (
        <Modal
          isUpdateEmailOpen={isUpdateEmailOpen}
          setIsUpdateEmailOpen={setIsUpdateEmailOpen}
          setIsUpdatePhoneOpen={setIsUpdatePhoneOpen}
          isUpdatePhoneOpen={isUpdatePhoneOpen}
        />
      ) : null}

      <Footer />
    </div>
  );
};

export default ExistingApplications;
