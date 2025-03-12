import React, { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import {
  FaTimesCircle,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import {
  BsEye,
  BsCalendar,
  BsClock,
  BsClockHistory,
  BsTruck,
  BsPeople,
} from "react-icons/bs";
import {
  BiDownload,
  BiRefresh,
  BiUser,
  BiUpload,
  BiCheck,
  BiFilterAlt,
} from "react-icons/bi";
import {
  FaCertificate,
  FaClipboardList,
  FaUserGraduate,
  FaRegCalendarCheck,
} from "react-icons/fa";
import {
  MdPayment,
  MdRestore,
  MdMoreVert,
  MdOutlineFilterAlt,
} from "react-icons/md";
import {
  HiOutlineBadgeCheck,
  HiOutlineDocumentText,
  HiOutlineChartPie,
} from "react-icons/hi";
import { RiUserSearchLine, RiFileListLine } from "react-icons/ri";
import {
  AiOutlineRise,
  AiOutlineFall,
  AiOutlineAreaChart,
} from "react-icons/ai";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import applicationsimg from "../../assets/applications.png";
import toast, { Toaster } from "react-hot-toast";
import certificate from "../../assets/certificate.pdf";
import { Link, useNavigate } from "react-router-dom";
import ViewApplications from "../ViewApplication/page";

import {
  getApplications,
  verifyApplication,
  deleteApplication,
} from "../../Customer/Services/adminServices";

import Loader from "../../Customer/components/loader";

const ExistingApplicationsAdmin = () => {
  const navigate = useNavigate();
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [showKpis, setShowKpis] = useState(true);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedViewApplication, setSelectedViewApplication] = useState(null);

  const statuses = [
    "All",
    "Student Intake Form",
    "Upload Documents",
    "Sent to RTO",
    "Certificate Issued",
  ];

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Increased number of applications per page
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [activeStatus, setActiveStatus] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");

  // Date filter options
  const dateFilters = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" },
  ];
  const [DocumentModalOpen, setDocumentModalOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState("");

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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const onClickDownload = () => {
    window.open(certificate);
    toast.success("Certificate downloaded successfully");
  };

  const getApplicationsData = async () => {
    try {
      setSubmissionLoading(true);
      const applicationsData = await getApplications();
      //only keep verified applications
      const verifiedApps = applicationsData.filter((app) => app.verified);
      setApplications(verifiedApps);
      setFilteredApplications(verifiedApps);
      setSubmissionLoading(false);
    } catch (error) {
      setSubmissionLoading(false);
      console.error("Failed to fetch applications:", error);
      toast.error("Failed to fetch applications");
    }
  };

  const handleDeleteApplication = async (applicationId, e) => {
    e.stopPropagation(); // Prevent row click when delete button is clicked
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        setSubmissionLoading(true);
        const result = await deleteApplication(applicationId);
        if (result.message) {
          toast.success(result.message);
          getApplicationsData(); // Refresh the application list
        } else {
          toast.error("Failed to delete application");
        }
        setSubmissionLoading(false);
      } catch (error) {
        setSubmissionLoading(false);
        toast.error("Error deleting application");
        console.error("Error:", error);
      }
    }
  };

  const onVerifyApplication = async (applicationId) => {
    try {
      setSubmissionLoading(true);
      await verifyApplication(applicationId);
      getApplicationsData();
      setSubmissionLoading(false);
    } catch (error) {
      console.error("Failed to verify application:", error);
      setSubmissionLoading(false);
    }
  };

  useEffect(() => {
    getApplicationsData();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    } catch (error) {
      return "Error";
    }
  };

  // Filter applications based on status, search term, and date filter
  useEffect(() => {
    let filtered = [...applications];

    // Apply status filter
    if (activeStatus !== "All") {
      if (activeStatus === "Certificate Issued") {
        filtered = filtered.filter(
          (app) => app.currentStatus === "Certificate Generated"
        );
      } else {
        filtered = filtered.filter((app) => app.currentStatus === activeStatus);
      }
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.applicationId?.toString().toLowerCase().includes(searchLower) ||
          app.id?.toString().toLowerCase().includes(searchLower) ||
          (app.user?.firstName + " " + app.user?.lastName)
            .toLowerCase()
            .includes(searchLower) ||
          (app.isf?.lookingForWhatQualification || "")
            .toLowerCase()
            .includes(searchLower) ||
          (app.currentStatus || "").toLowerCase().includes(searchLower)
      );
    }

    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const yearStart = new Date(now.getFullYear(), 0, 1);

      filtered = filtered.filter((app) => {
        const appDate = new Date(app.status[0].time);

        switch (dateFilter) {
          case "today":
            return appDate >= today;
          case "week":
            return appDate >= weekStart;
          case "month":
            return appDate >= monthStart;
          case "year":
            return appDate >= yearStart;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered = filtered.sort((a, b) => {
      switch (sortField) {
        case "date":
          return sortDirection === "asc"
            ? new Date(a.status[0].time) - new Date(b.status[0].time)
            : new Date(b.status[0].time) - new Date(a.status[0].time);
        case "name":
          const nameA = (
            a.user?.firstName +
            " " +
            a.user?.lastName
          ).toLowerCase();
          const nameB = (
            b.user?.firstName +
            " " +
            b.user?.lastName
          ).toLowerCase();
          return sortDirection === "asc"
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        case "qualification":
          const qualA = (
            a.isf?.lookingForWhatQualification || ""
          ).toLowerCase();
          const qualB = (
            b.isf?.lookingForWhatQualification || ""
          ).toLowerCase();
          return sortDirection === "asc"
            ? qualA.localeCompare(qualB)
            : qualB.localeCompare(qualA);
        case "status":
          return sortDirection === "asc"
            ? (a.currentStatus || "").localeCompare(b.currentStatus || "")
            : (b.currentStatus || "").localeCompare(a.currentStatus || "");
        case "payment":
          return sortDirection === "asc"
            ? (a.paid ? 1 : 0) - (b.paid ? 1 : 0)
            : (b.paid ? 1 : 0) - (a.paid ? 1 : 0);
        default:
          return 0;
      }
    });

    setFilteredApplications(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    activeStatus,
    applications,
    searchTerm,
    sortField,
    sortDirection,
    dateFilter,
  ]);

  // Calculate pagination
  const totalItems = filteredApplications.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredApplications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Handle viewing application with modal
  const handleViewApplication = (application) => {
    setSelectedViewApplication(application);
    setShowViewModal(true);
  };

  // Calculate KPI stats
  const calculateStats = () => {
    const totalApplications = applications.length;
    const completedApplications = applications.filter(
      (app) =>
        app.currentStatus === "Certificate Generated" ||
        app.currentStatus === "Dispatched" ||
        app.currentStatus === "Completed"
    ).length;

    const inProgressApplications = applications.filter(
      (app) =>
        app.currentStatus !== "Certificate Generated" &&
        app.currentStatus !== "Dispatched" &&
        app.currentStatus !== "Completed"
    ).length;

    const paidApplications = applications.filter((app) => app.paid).length;
    const unpaidApplications = applications.filter((app) => !app.paid).length;

    const studentFormApplications = applications.filter(
      (app) => app.currentStatus === "Student Intake Form"
    ).length;
    const uploadDocumentsApplications = applications.filter(
      (app) => app.currentStatus === "Upload Documents"
    ).length;
    const sentToRtoApplications = applications.filter(
      (app) => app.currentStatus === "Sent to RTO"
    ).length;
    const certificateGeneratedApplications = applications.filter(
      (app) => app.currentStatus === "Certificate Generated"
    ).length;

    // Calculate completion rate
    const completionRate =
      totalApplications > 0
        ? ((completedApplications / totalApplications) * 100).toFixed(1)
        : 0;

    // Calculate payment rate
    const paymentRate =
      totalApplications > 0
        ? ((paidApplications / totalApplications) * 100).toFixed(1)
        : 0;

    // Get most popular qualification
    const qualificationCount = {};
    applications.forEach((app) => {
      const qual = app.isf?.lookingForWhatQualification;
      if (qual) {
        qualificationCount[qual] = (qualificationCount[qual] || 0) + 1;
      }
    });

    let mostPopularQualification = { name: "N/A", count: 0 };
    Object.entries(qualificationCount).forEach(([name, count]) => {
      if (count > mostPopularQualification.count) {
        mostPopularQualification = { name, count };
      }
    });

    return {
      totalApplications,
      completedApplications,
      inProgressApplications,
      paidApplications,
      unpaidApplications,
      studentFormApplications,
      uploadDocumentsApplications,
      sentToRtoApplications,
      certificateGeneratedApplications,
      completionRate,
      paymentRate,
      mostPopularQualification,
    };
  };

  const stats = calculateStats();

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Sent to RTO":
        return "bg-amber-600 text-white";
      case "Waiting for Verification":
        return "bg-yellow-400 text-black";
      case "Waiting for Payment":
        return "bg-blue-400 text-white";
      case "Student Intake Form":
        return "bg-blue-700 text-white";
      case "Upload Documents":
        return "bg-red-700 text-white";
      case "Certificate Generated":
        return "bg-emerald-600 text-white";
      case "Dispatched":
        return "bg-gray-800 text-white";
      case "Completed":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Sent to RTO":
        return <BsTruck className="text-white" />;
      case "Waiting for Verification":
        return <BsClock className="text-black" />;
      case "Waiting for Payment":
        return <MdPayment className="text-white" />;
      case "Student Intake Form":
        return <BiUser className="text-white" />;
      case "Upload Documents":
        return <BiUpload className="text-white" />;
      case "Certificate Generated":
        return <FaCertificate className="text-white" />;
      case "Dispatched":
        return <BsTruck className="text-white" />;
      case "Completed":
        return <BiCheck className="text-white" />;
      default:
        return <BsClock className="text-white" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {loading && <Loader />}
      {submissionLoading && <SpinnerLoader />}
      <Toaster position="top-right" />

      {!selectedApplication && (
        <div className="animate-fadeIn">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 shadow-lg mb-6 pt-8 pb-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <svg
                className="h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 800 800"
              >
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63"
                />
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  d="M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764"
                />
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  d="M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880"
                />
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  d="M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382"
                />
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  d="M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764"
                />
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  d="M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880"
                />
              </svg>
            </div>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                <div className="bg-white p-3 rounded-xl shadow-md">
                  <img
                    src={applicationsimg}
                    alt="Applications"
                    className="h-32 w-auto"
                  />
                </div>
              </div>
              <div className="text-center md:text-left text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Application Management
                </h1>
                <p className="text-emerald-100 max-w-3xl text-lg">
                  Track, manage, and process applications through every stage of
                  certification.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                    <BsPeople className="mr-2" />
                    <span>{applications.length} Total Applications</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                    <HiOutlineBadgeCheck className="mr-2" />
                    <span>{stats.completedApplications} Completed</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                    <MdPayment className="mr-2" />
                    <span>{stats.paidApplications} Paid</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Section */}
          {showKpis && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Completion Progress */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-emerald-100 p-4 rounded-full">
                        <HiOutlineChartPie className="h-8 w-8 text-emerald-600" />
                      </div>
                      <div className="ml-5">
                        <p className="text-gray-500 text-sm font-medium">
                          Completion Rate
                        </p>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {stats.completionRate}%
                        </h3>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${stats.completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm">
                      <span className="text-gray-500">
                        {stats.completedApplications} Complete
                      </span>
                      <span className="text-gray-500">
                        {stats.inProgressApplications} In Progress
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-blue-100 p-4 rounded-full">
                        <MdPayment className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="ml-5">
                        <p className="text-gray-500 text-sm font-medium">
                          Payment Status
                        </p>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {stats.paymentRate}%
                        </h3>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${stats.paymentRate}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm">
                      <span className="text-gray-500">
                        {stats.paidApplications} Paid
                      </span>
                      <span className="text-gray-500">
                        {stats.unpaidApplications} Unpaid
                      </span>
                    </div>
                  </div>
                </div>

                {/* Application Stages */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-amber-100 p-4 rounded-full">
                        <FaClipboardList className="h-8 w-8 text-amber-600" />
                      </div>
                      <div className="ml-5">
                        <p className="text-gray-500 text-sm font-medium">
                          Application Stages
                        </p>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {applications.length}
                        </h3>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-blue-700 mr-2"></div>
                          <span className="text-gray-500">
                            Intake: {stats.studentFormApplications}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-red-700 mr-2"></div>
                          <span className="text-gray-500">
                            Documents: {stats.uploadDocumentsApplications}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-amber-600 mr-2"></div>
                          <span className="text-gray-500">
                            RTO: {stats.sentToRtoApplications}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-emerald-600 mr-2"></div>
                          <span className="text-gray-500">
                            Certificate:{" "}
                            {stats.certificateGeneratedApplications}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Popular Qualification */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-purple-100 p-4 rounded-full">
                        <FaUserGraduate className="h-8 w-8 text-purple-600" />
                      </div>
                      <div className="ml-5">
                        <p className="text-gray-500 text-sm font-medium">
                          Popular Qualification
                        </p>
                        <h3 className="text-xl font-bold text-gray-900 truncate">
                          {stats.mostPopularQualification.name}
                        </h3>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="text-sm text-gray-500 flex items-center">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                        <span>
                          {stats.mostPopularQualification.count} Applications
                          {stats.totalApplications > 0
                            ? ` (${(
                                (stats.mostPopularQualification.count /
                                  stats.totalApplications) *
                                100
                              ).toFixed(1)}%)`
                            : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                  <div className="relative flex-grow md:max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2 w-full md:w-auto">
                    <button
                      className="flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-700 transition-colors text-sm font-medium"
                      onClick={getApplicationsData}
                    >
                      <BiRefresh className="mr-2" />
                      Refresh
                    </button>
                    <button
                      className={`flex items-center justify-center px-4 py-2 ${
                        showAdvancedFilters
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      } rounded-lg shadow-sm hover:bg-opacity-90 transition-colors text-sm font-medium`}
                      onClick={() =>
                        setShowAdvancedFilters(!showAdvancedFilters)
                      }
                    >
                      <BiFilterAlt className="mr-2" />
                      Filters
                    </button>
                    <button
                      className={`flex items-center justify-center px-4 py-2 ${
                        showKpis
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      } rounded-lg shadow-sm hover:bg-opacity-90 transition-colors text-sm font-medium`}
                      onClick={() => setShowKpis(!showKpis)}
                    >
                      <HiOutlineChartPie className="mr-2" />
                      {showKpis ? "Hide Stats" : "Show Stats"}
                    </button>
                  </div>
                </div>

                {/* Advanced filters */}
                {showAdvancedFilters && (
                  <div className="bg-gray-50 p-4 rounded-lg mt-4 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date Range
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value)}
                        >
                          {dateFilters.map((filter) => (
                            <option key={filter.value} value={filter.value}>
                              {filter.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sort By
                        </label>
                        <div className="flex gap-2">
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                            value={sortField}
                            onChange={(e) => setSortField(e.target.value)}
                          >
                            <option value="date">Date</option>
                            <option value="name">Customer Name</option>
                            <option value="qualification">Qualification</option>
                            <option value="status">Status</option>
                            <option value="payment">Payment Status</option>
                          </select>
                          <button
                            className="inline-flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-all"
                            onClick={() =>
                              setSortDirection(
                                sortDirection === "asc" ? "desc" : "asc"
                              )
                            }
                          >
                            {sortDirection === "asc" ? (
                              <FaSortAmountUp />
                            ) : (
                              <FaSortAmountDown />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Results Per Page
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                          value={itemsPerPage}
                          onChange={(e) => {
                            setCurrentPage(1);
                            setItemsPerPage(Number(e.target.value));
                          }}
                        >
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Status filter buttons */}
                <div className="mt-4 flex flex-wrap gap-3">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => setActiveStatus(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeStatus === status
                          ? "bg-emerald-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <FaClipboardList className="mr-2 text-gray-400" />
                  Showing {filteredApplications.length} applications
                  {searchTerm && (
                    <span className="ml-1">matching "{searchTerm}"</span>
                  )}
                  {activeStatus !== "All" && (
                    <span className="ml-1">with status "{activeStatus}"</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {filteredApplications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="p-6 rounded-full bg-gray-100 mb-6 flex items-center justify-center">
                    <RiFileListLine className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    No applications found
                  </h3>
                  <p className="text-gray-500 mb-6 text-center max-w-md">
                    {searchTerm ||
                    activeStatus !== "All" ||
                    dateFilter !== "all"
                      ? "Try adjusting your search criteria or filters to see more applications."
                      : "No applications are available in the system."}
                  </p>
                  {(searchTerm ||
                    activeStatus !== "All" ||
                    dateFilter !== "all") && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setActiveStatus("All");
                        setDateFilter("all");
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-all"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("date")}
                        >
                          <div className="flex items-center">
                            <span>ID / Date</span>
                            {sortField === "date" && (
                              <span className="ml-1">
                                {sortDirection === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("name")}
                        >
                          <div className="flex items-center">
                            <span>Student</span>
                            {sortField === "name" && (
                              <span className="ml-1">
                                {sortDirection === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("qualification")}
                        >
                          <div className="flex items-center">
                            <span>Qualification</span>
                            {sortField === "qualification" && (
                              <span className="ml-1">
                                {sortDirection === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                        <th
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("status")}
                        >
                          <div className="flex items-center justify-center">
                            <span>Status</span>
                            {sortField === "status" && (
                              <span className="ml-1">
                                {sortDirection === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                        <th
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("payment")}
                        >
                          <div className="flex items-center justify-center">
                            <span>Paid</span>
                            {sortField === "payment" && (
                              <span className="ml-1">
                                {sortDirection === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentItems.map((application) => (
                        <tr
                          key={application.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleViewApplication(application)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col">
                              <div className="text-sm font-medium text-gray-900">
                                #{application.applicationId || application.id}
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex items-center">
                                <FaRegCalendarCheck className="mr-1" />
                                {formatDate(application.status[0].time)}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                <div className="text-emerald-700 font-medium">
                                  {application.user.firstName?.[0] || ""}
                                  {application.user.lastName?.[0] || ""}
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {application.user.firstName +
                                    " " +
                                    application.user.lastName}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {application.user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {application.isf?.lookingForWhatQualification ||
                                "N/A"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {application.isf?.industry || "N/A"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center">
                              <span
                                className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                                  application.currentStatus
                                )}`}
                              >
                                {getStatusIcon(application.currentStatus)}
                                <span className="ml-1">
                                  {application.currentStatus}
                                </span>
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center">
                              {application.paid ? (
                                <BiCheckCircle className="text-green-500 text-xl" />
                              ) : (
                                <FaTimesCircle className="text-red-500 text-xl" />
                              )}
                            </div>
                          </td>
                          <td
                            className="px-6 py-4 whitespace-nowrap text-right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex gap-2 justify-end">
                              {/* <button
                                className="inline-flex items-center px-2 py-1 border border-transparent text-xs rounded-md text-white bg-red-500 hover:bg-red-600"
                                onClick={(e) =>
                                  handleDeleteApplication(application.id, e)
                                }
                              >
                                Delete
                              </button> */}
                              <button
                                className="inline-flex items-center px-2 py-1 border border-transparent text-xs rounded-md text-white bg-gray-500 hover:bg-gray-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewApplication(application);
                                }}
                              >
                                <BsEye className="mr-1" />
                                View
                              </button>
                              {application.currentStatus ===
                                "Certificate Generated" ||
                              application.currentStatus === "Dispatched" ||
                              application.currentStatus === "Completed" ? (
                                <button
                                  className="inline-flex items-center px-2 py-1 border border-transparent text-xs rounded-md text-white bg-emerald-500 hover:bg-emerald-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onClickDownload();
                                  }}
                                >
                                  <BiDownload className="mr-1" />
                                  Certificate
                                </button>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination controls */}
                  <div className="px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing{" "}
                          <span className="font-medium">{startIndex + 1}</span>{" "}
                          to{" "}
                          <span className="font-medium">
                            {Math.min(startIndex + itemsPerPage, totalItems)}
                          </span>{" "}
                          of <span className="font-medium">{totalItems}</span>{" "}
                          results
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                            currentPage === 1
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={goToPreviousPage}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                        <button
                          className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                            currentPage === totalPages
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* View Application Modal */}
      {showViewModal && selectedViewApplication && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full">
              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Application Details
                </h3>
                <button
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setShowViewModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                <ViewApplications
                  userId={selectedViewApplication.userId}
                  id={selectedViewApplication.id}
                  application={selectedViewApplication}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedApplication && (
        <Application
          application={selectedApplication}
          setSelectedApplication={setSelectedApplication}
        />
      )}
    </div>
  );
};

export default ExistingApplicationsAdmin;
