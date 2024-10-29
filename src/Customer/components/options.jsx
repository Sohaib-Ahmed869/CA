import React, { useState } from "react";
import {
  FaFileAlt,
  FaUpload,
  FaEye,
  FaFolderOpen,
  FaPlusCircle,
} from "react-icons/fa";
import { BiCheck } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
import customer from "../../assets/customer.png";

const Timeline = ({ timeline }) => {
  return (
    <div className="bg-white p-3 lg:p-10 shadow-lg mt-10 w-full lg:mx-auto">
      <div className="flex flex-col items-start">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Active Application
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          Application ID: <span className="font-semibold">CA-123456</span>
        </p>
      </div>

      <div className="flex flex-col items-start">
        {timeline.map((item, index) => (
          <div key={index} className="flex items-start mb-6">
            {/* Icon and Line */}
            <div className="flex flex-col items-center mr-4">
              <div className="text-2xl">
                {item.date ? (
                  <BiCheck className="text-white bg-green-500 rounded-full p-1" />
                ) : (
                  <BsClock className="text-gray-500 bg-gray-200 rounded-full p-1" />
                )}
              </div>
              {index !== timeline.length - 1 && (
                <div className="w-px bg-gray-300 h-full mt-2"></div>
              )}
            </div>

            {/* Text Content */}
            <div className="text-sm text-gray-500">
              <p className="font-medium">{item.status}</p>
              <p>{item.date || "---"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomerDashboard = () => {
  const [timeline, setTimeline] = useState([
    {
      status: "Submitted",
      date: "01/01/2024",
    },
    {
      status: "Waiting for Payment",
      date: "01/01/2024",
    },
    {
      status: "Payment Received",
      date: "10/01/2024",
    },
    {
      status: "Student Intake Form Fill",
      date: "15/01/2024",
    },
    {
      status: "Documents Uploaded",
      date: "20/01/2024",
    },
    {
      status: "Certification Generated",
      date: null,
    },
    {
      status: "Dispatched",
      date: null,
    },
    {
      status: "Completed",
      date: null,
    },
  ]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
      <div className="flex flex-col-reverse lg:flex-row p-5">
        <div className="bg-white rounded-lg shadow-lg lg:w-1/4 w-full">
          <Timeline timeline={timeline} />
        </div>

        <div className="flex flex-col items-center p-4 lg:p-10 lg:w-3/4 w-full">
          <div className="flex flex-col items-center text-left w-full">
            <img src={customer} alt="Customer" className="h-36" />
            <div className="text-center">
              <h1 className="text-2xl lg:text-3xl font-bold">
                Hello and Welcome to Certified Australia!
              </h1>
              <p className="text-md text-gray-600 mb-3 lg:mb-8  ">
                We are here to help you with your certification needs. Please
                select from the following options to get started.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
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
    </div>
  );
};

export default CustomerDashboard;
