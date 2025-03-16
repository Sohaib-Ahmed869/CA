import React, { useState, useEffect, useRef } from "react";
import {
  FaFileAlt,
  FaEye,
  FaFolderOpen,
  FaPlusCircle,
  FaUser,
  FaBell,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCog,
} from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
import customer from "../../assets/customer.png";
import { getApplications } from "../Services/customerApplication";
import SpinnerLoader from "./spinnerLoader";
import ImprovedTimeline from "./Timeline";
import Modal from "./modal";
import PaymentPage from "../checkoutForm"; // Import payment component
import studentAgreementdoc from "../../../public/1.pdf";
import studentApplicantAgreement from "../../../public/2.pdf";
import TOCdoc from "../../../public/3.pdf";
import DocumentModal from "./viewDocsModal";

const CustomerDashboard = () => {
  const [userId, setUserId] = useState("");
  const [applications, setApplications] = useState([]);
  const [lastApplication, setLastApplication] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdatePhoneOpen, setIsUpdatePhoneOpen] = useState(false);
  const [isUpdateEmailOpen, setIsUpdateEmailOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [paymentDetails, setPaymentDetails] = useState({
    price: 0,
    discount: 0,
    applicationId: "",
    userId: "",
    partialScheme: false,
    paid: false,
    payment1: 0,
    payment2: 0,
    full_paid: false,
  });

  const [DocumentModalOpen, setDocumentModalOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState("");

  //scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to open modal with selected document
  const openModal = (doc) => {
    setCurrentDoc(doc); // Directly set the file URL
    setDocumentModalOpen(true);
  };

  const closeModal = () => {
    setDocumentModalOpen(false);
    // Revoke the object URL to prevent memory leaks
    setCurrentDoc("");
  };
  // Helper function to calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    if (!price) return 0;
    if (!discount) return price;
    const cleanPrice = parseFloat(price.toString().replace(/,/g, ""));
    return cleanPrice - discount;
  };

  useEffect(() => {
    // Show loader initially
    setTimeout(() => setLoading(false), 1000);
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

  useEffect(() => {
    // Authentication check
    const authListener = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        // Get user's display name if available
        setUserName(user.displayName || "");
        console.log("User ID:", user.uid);
      } else {
        navigate("/login");
      }
    });
    return () => authListener(); // Cleanup listener on unmount
  }, [navigate]);

  const statuses = [
    "Student Intake Form",
    "Payment Awaiting",
    "Waiting for Documents",
    "Sent to RTO",
    "Certificate Generated",
  ];

  const fetchApplicationsData = async () => {
    setSubmissionLoading(true);
    try {
      const applicationsData = await getApplications(userId);
      setApplications(applicationsData);
      console.log("Applications:", applicationsData);
      setLastApplication(
        applicationsData.length > 0
          ? applicationsData[applicationsData.length - 1]
          : null
      );
      console.log("Last Application:", lastApplication);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
    setSubmissionLoading(false);
  };

  useEffect(() => {
    if (userId) {
      fetchApplicationsData();
    }
  }, [userId]);

  useEffect(() => {
    if (lastApplication) {
      setTimeline(
        statuses.map((status) => ({
          statusname: status,
          time: lastApplication.status?.some((s) => s.statusname === status),
        }))
      );
    }
  }, [lastApplication]);

  const navigateToExistingApplications = () =>
    navigate("/existing-applications");
  const navigateToNewApplication = () => navigate("/new-application");

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Handler for payment click
  const handlePaymentClick = (
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
    // Calculate the final price if there's a discount
    const finalPrice = discount
      ? calculateDiscountedPrice(price, discount)
      : price;

    setPaymentDetails({
      price: finalPrice,
      discount,
      applicationId,
      userId,
      partialScheme,
      paid,
      payment1,
      payment2,
      full_paid,
    });
    setShowPaymentModal(true);
  };

  // Handler for student form click
  const handleStudentFormClick = (applicationId) => {
    navigate(`/student-intake-form/${applicationId}`);
  };

  // Handler for document upload click
  const handleUploadClick = (applicationId, industry) => {
    if (industry) {
      localStorage.setItem("applicationIndustry", industry);
    }
    navigate(`/upload-documents/${applicationId}`);
  };

  // Handler for certificate download
  const handleCertificateClick = (certificateId) => {
    //open in app
    window.open(certificateId, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && <Loader />}
      {submissionLoading && <SpinnerLoader />}

      {/* Welcome Header Card with Hamburger Menu */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 shadow-lg mb-8 overflow-visible">
        <div className="flex flex-col md:flex-row items-center p-6 md:p-8 relative overflow-visible">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <div className="bg-white p-3 rounded-full">
              <img src={customer} alt="Customer" className="h-20 w-20" />
            </div>
          </div>
          <div className="text-center md:text-left text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome to Certified Australia{userName ? `, ${userName}` : "!"}
            </h1>
            <p className="text-emerald-100 max-w-2xl">
              We're here to help you with your certification journey. Track your
              progress below or start a new application today.
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline Section - Takes more space now */}
          <div className="lg:col-span-2 order-1 lg:order-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-1">
                {applications && applications.length > 0 ? (
                  <ImprovedTimeline
                    applications={applications}
                    timeline={timeline}
                    applicationName={
                      lastApplication?.initialForm?.lookingForWhatQualification
                    }
                    paid={lastApplication?.paid}
                    onPaymentClick={handlePaymentClick}
                    onStudentFormClick={handleStudentFormClick}
                    onUploadClick={handleUploadClick}
                    onCertificateClick={handleCertificateClick}
                  />
                ) : (
                  <div className="py-12 px-6 text-center">
                    <div className="inline-block p-4 rounded-full bg-emerald-100 mb-4">
                      <FaFileAlt className="text-emerald-600 text-3xl" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Applications Yet
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Create your first application to start your certification
                      journey.
                    </p>
                    <button
                      onClick={navigateToNewApplication}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      <FaPlusCircle className="mr-2" /> Start New Application
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Cards Section */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="space-y-6">
              {/* Card 1: New Application */}
              <div
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={navigateToNewApplication}
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <FaPlusCircle className="text-emerald-600 text-xl" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold text-gray-900">
                        New Application
                      </h2>
                      <p className="text-sm text-gray-500">
                        Start your certification process
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      Begin a new certification application with our streamlined
                      process.
                    </p>
                  </div>
                  <div className="mt-5 flex justify-end">
                    <span className="inline-flex items-center text-sm font-medium text-emerald-600">
                      Get Started <FaEye className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Existing Applications */}
              <div
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={navigateToExistingApplications}
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <FaFolderOpen className="text-emerald-600 text-xl" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Existing Applications
                      </h2>
                      <p className="text-sm text-gray-500">
                        Review and manage applications
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      View, edit, and track all your current certification
                      applications.
                    </p>
                  </div>
                  <div className="mt-5 flex justify-end">
                    <span className="inline-flex items-center text-sm font-medium text-emerald-600">
                      View All <FaEye className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 3: Important Documents */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <FaFileAlt className="text-emerald-600 text-xl" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Important Documents
                      </h2>
                      <p className="text-sm text-gray-500">
                        Required agreements
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        </div>
                        <div className="ml-2">
                          <button
                            onClick={() => openModal(studentApplicantAgreement)}
                            className="text-emerald-600 font-medium hover:underline"
                          >
                            Student/Applicant Agreement
                          </button>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Guidelines for your application process
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        </div>
                        <div className="ml-2">
                          <button
                            onClick={() => openModal(studentAgreementdoc)}
                            className="text-emerald-600 font-medium hover:underline"
                          >
                            Student Privacy Contract
                          </button>
                          <p className="text-xs text-gray-500 mt-0.5">
                            How we handle your personal information
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        </div>
                        <div className="ml-2">
                          <button
                            onClick={() => openModal(TOCdoc)}
                            className="text-emerald-600 font-medium hover:underline"
                          >
                            Terms and Conditions
                          </button>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Legal requirements for certification
                          </p>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-4 bg-emerald-50 p-3 rounded-md">
                      <p className="text-xs text-emerald-800">
                        <span className="font-medium">Important:</span> You must
                        review and accept these documents before submitting your
                        application.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DocumentModal
        isOpen={DocumentModalOpen}
        onClose={closeModal}
        docLink={currentDoc}
      />

      {/* Update Phone/Email Modal */}
      {isUpdateEmailOpen || isUpdatePhoneOpen ? (
        <Modal
          isUpdateEmailOpen={isUpdateEmailOpen}
          setIsUpdateEmailOpen={setIsUpdateEmailOpen}
          setIsUpdatePhoneOpen={setIsUpdatePhoneOpen}
          isUpdatePhoneOpen={isUpdatePhoneOpen}
        />
      ) : null}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Payment Details</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="btn btn-sm btn-circle"
              >
                ✕
              </button>
            </div>

            <div className="py-4">
              <PaymentPage
                price={paymentDetails.price}
                discount={paymentDetails.discount}
                applicationId={paymentDetails.applicationId}
                partialScheme={paymentDetails.partialScheme}
                paid={paymentDetails.paid}
                payment1={paymentDetails.payment1}
                payment2={paymentDetails.payment2}
                setShowCheckoutModal={setShowPaymentModal}
                getUserApplications={fetchApplicationsData}
                userId={userId}
                full_paid={paymentDetails.full_paid}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
