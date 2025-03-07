import React, { useState, useEffect } from "react";
import {
  FaFileAlt,
  FaUpload,
  FaEye,
  FaFolderOpen,
  FaPlusCircle,
} from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
import customer from "../../assets/customer.png";
import { getApplications } from "../Services/customerApplication";
import SpinnerLoader from "./spinnerLoader";
import Timeline from "./Timeline";
const CustomerDashboard = () => {
  const [userId, setUserId] = useState("");
  const [applications, setApplications] = useState([]);
  const [lastApplication, setLastApplication] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submissionLoading, setSubmissionLoading] = useState(false);
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
          time: lastApplication.status.some((s) => s.statusname === status),
        }))
      );
    }
  }, [lastApplication]);

  const navigateToExistingApplications = () =>
    navigate("/existing-applications");
  const navigateToNewApplication = () => navigate("/new-application");

  return (
    <div className="min-h-screen mt-20 lg:mt-10">
      {loading && <Loader />}
      {submissionLoading && <SpinnerLoader />}
      <Navbar />
      <div className="flex flex-col max-sm:flex-col-reverse">
        <div className="rounded-lg lg:full w-full mt-10 hidden lg:block">
          {lastApplication ? (
            <Timeline
              timeline={timeline}
              applications={applications}
              applicationId={lastApplication.applicationId}
              applicationName={
                lastApplication.initialForm.lookingForWhatQualification
              }
              paid={lastApplication.paid}
            />
          ) : (
            <p className=""></p>
          )}
        </div>
        <div className="flex flex-col items-center lg:p-10 lg:w-full w-full mt-5 max-sm:p-5">
          <div className="flex flex-col items-center text-left w-full">
            <img src={customer} alt="Customer" className="h-24" />
            <div className="text-center">
              <h1 className="text-2xl lg:text-3xl font-bold ">
                Hello and Welcome to Certified Australia!
              </h1>
              <p className="text-md  mb-3 lg:mb-8">
                We are here to help you with your certificate needs. Please
                select from the following options to get started.
              </p>
            </div>
          </div>
          <div className="rounded-lg lg:full w-full mt-10 lg:hidden">
            {lastApplication ? (
              <Timeline
                timeline={timeline}
                applicationId={lastApplication.applicationId}
              />
            ) : (
              <p className="">No applications found.</p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:g rid-cols-2 lg:grid-cols-2 gap-6 w-1/2 max-sm:w-full">
            <div
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={navigateToNewApplication}
            >
              <FaPlusCircle className="text-primary mb-4 text-2xl md:text-5xl" />
              <h2 className="text-xl font-semibold mb-2 ">New Application</h2>
              <p className="">Start a new application.</p>
            </div>
            <div
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={navigateToExistingApplications}
            >
              <FaFolderOpen className="text-primary mb-4 text-2xl md:text-5xl" />
              <h2 className="text-xl font-semibold  mb-2">
                Existing Applications
              </h2>
              <p className="">View and manage your existing applications.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
