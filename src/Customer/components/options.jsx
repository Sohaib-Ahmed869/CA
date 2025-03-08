import React, { useState, useEffect } from "react";
import {
  FaFileAlt,
  FaUpload,
  FaEye,
  FaFolderOpen,
  FaPlusCircle,
  FaUser,
  FaBell,
} from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
import customer from "../../assets/customer.png";
import { getApplications } from "../Services/customerApplication";
import SpinnerLoader from "./spinnerLoader";
import ImprovedTimeline from "./Timeline";

const CustomerDashboard = () => {
  const [userId, setUserId] = useState("");
  const [applications, setApplications] = useState([]);
  const [lastApplication, setLastApplication] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [userName, setUserName] = useState(""); // Added for personalization
  const navigate = useNavigate();

  useEffect(() => {
    // Show loader initially
    setTimeout(() => setLoading(false), 1000);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && <Loader />}
      {submissionLoading && <SpinnerLoader />}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Welcome Header Card */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row items-center p-6 md:p-8">
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
                We're here to help you with your certification journey. Track
                your progress below or start a new application today.
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline Section - Takes more space now */}
          <div className="lg:col-span-2 order-2 lg:order-1">
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

              {/* Card 3: Help Resources */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <FaBell className="text-emerald-600 text-xl" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Help & Resources
                      </h2>
                      <p className="text-sm text-gray-500">Support materials</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                        <span>Documentation requirements</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                        <span>Payment options</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                        <span>Certificate validation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
