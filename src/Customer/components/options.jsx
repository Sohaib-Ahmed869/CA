import React from "react";
import {
  FaFileAlt,
  FaUpload,
  FaEye,
  FaFolderOpen,
  FaPlusCircle,
} from "react-icons/fa";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";

const CustomerDashboard = () => {
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  const navigateToScreening = () => {
    navigate("/screening");
  };

  const navigateToExistingApplications = () => {
    navigate("/existing-applications");
  };

  const navigateToNewApplication = () => {
    navigate("/new-application");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-green-100">
      {loading && <Loader />}
      <Navbar />
      <div className="flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-8 text-primary text-center">
          Hello and Welcome to Certified Australia!
        </h1>
        <p className="text-md text-center text-gray-600 mb-3 lg:mb-8 w-2/3">
          We are here to help you with your certification needs. Please select
          from the following options to get started.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {/* New Application */}
          <div
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={navigateToNewApplication}
          >
            <FaPlusCircle className="text-primary mb-4 text-2xl md:text-5xl" />
            <h2 className="text-xl font-semibold mb-2">New Application</h2>
            <p className="text-gray-600">
              Start a new application for the desired service.
            </p>
          </div>

          {/* Initial Screening Form */}
          <div
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={navigateToScreening}
          >
            <FaFileAlt className="text-primary mb-4 text-2xl md:text-5xl" />
            <h2 className="text-xl font-semibold mb-2">
              Initial Screening Form
            </h2>
            <p className="text-gray-600">
              Fill out the screening form for faster processing.
            </p>
          </div>

          {/* Document Upload Screen */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
            <FaUpload className="text-primary mb-4 text-2xl md:text-5xl" />
            <h2 className="text-xl font-semibold mb-2">Document Upload</h2>
            <p className="text-gray-600">
              Upload necessary documents for verification.
            </p>
          </div>

          {/* Track Applications */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
            <FaEye className="text-primary mb-4 text-2xl md:text-5xl" />
            <h2 className="text-xl font-semibold mb-2">Track Applications</h2>
            <p className="text-gray-600">
              Track the status of your ongoing applications.
            </p>
          </div>

          {/* Existing Applications */}
          <div
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={navigateToExistingApplications}
          >
            <FaFolderOpen className="text-primary mb-4 text-2xl md:text-5xl" />
            <h2 className="text-xl font-semibold mb-2">
              Existing Applications
            </h2>
            <p className="text-gray-600">
              View and manage your existing applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
