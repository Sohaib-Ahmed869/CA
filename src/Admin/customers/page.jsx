import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import Papa from "papaparse";
import { motion } from "framer-motion"; // Additional import for animations

// Icons
import { HiOutlineSearch } from "react-icons/hi";
import {
  BiUser,
  BiEdit,
  BiDownload,
  BiPlus,
  BiCheck,
  BiFilter,
  BiRefresh,
} from "react-icons/bi";
import {
  FaTimesCircle,
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaEllipsisH,
  FaPhoneAlt,
  FaEnvelope,
  FaArchive,
  FaRegStickyNote,
  FaRegClock,
} from "react-icons/fa";
import { FaTimes, FaBars, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import {
  BsEye,
  BsTruck,
  BsArrowUpRight,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { MdPayment, MdOutlineVerified, MdLabel } from "react-icons/md";
import { AiOutlineFileSearch } from "react-icons/ai";

// Components
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import FilteredExportButton from "./FilteredExportButton";
import Loader from "../../Customer/components/loader";
import PaymentPage from "../../Customer/checkoutForm";
import Application from "./applicationpage";

// Services
import {
  getApplications,
  verifyApplication,
  addNoteToApplication,
  resendEmail,
  deleteApplication,
} from "../../Customer/Services/adminServices";

import { initiateVerificationCall } from "../../Customer/Services/twilioService";

// Assets
import customersImg from "../../assets/customers.png"; // Make sure you have this image

const URL = import.meta.env.VITE_REACT_BACKEND_URL;

const CustomersInfo = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  // State for filters
  const [filterOptions, setFilterOptions] = useState([
    "All",
    "Assigned to Gabi",
    "Assigned to Ibrahim",
    "Assigned to Sidra",

    "Assigned to Ilhan",

    "Assigned to Waniya",
    "Assigned to N/A",
  ]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [colorFilterOptions] = useState([
    "All",
    "Hot Lead",
    "Warm Lead",
    "Cold Lead",
    "Proceeded With Payment",
    "Impacted Student",
    "Agent",
    "Completed",
    "Default",
  ]);
  const [selectedColorFilter, setSelectedColorFilter] = useState("All");
  const [selectedIndustryFilter, setSelectedIndustryFilter] = useState("All");
  const [industryFilterOptions, setIndustryFilterOptions] = useState([]);
  const [selectedCallAttemptsFilter, setSelectedCallAttemptsFilter] =
    useState("All");

  // State for sorting
  const [sortField, setSortField] = useState("dateCreated");
  const [sortDirection, setSortDirection] = useState("asc");

  // State for data
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // State for modals
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);
  const [applicationContextMenu, setApplicationContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    applicationId: null,
  });

  // State for notes
  const [note, setNote] = useState("");
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);

  // State for payment
  const [price, setPrice] = useState(0);
  const [applicationId, setApplicationId] = useState("");
  const [userId, setUserId] = useState(null);
  const [partialScheme, setPartialScheme] = useState(false);
  const [paid, setPaid] = useState(false);
  const [payment1, setPayment1] = useState(0);
  const [payment2, setPayment2] = useState(0);
  const [full_paid, setFullPaid] = useState(false);

  // State for calls
  const [callStatus, setCallStatus] = useState({
    id: null,
    status: "Initiate Call",
  });

  // State for filters visibility
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Main function to get applications data
  const getApplicationsData = async () => {
    try {
      setSubmissionLoading(true);
      let applicationsData = await getApplications();

      // Sort by most recent
      applicationsData.sort(
        (a, b) => new Date(b.status[0]?.time) - new Date(a.status[0]?.time)
      );

      setApplications(applicationsData);
      setFilteredApplications(applicationsData);

      // Extract unique industries for filter
      const industries = applicationsData
        .map((app) => app.isf?.industry)
        .filter(Boolean);
      setIndustryFilterOptions(["All", ...new Set(industries)]);

      setSubmissionLoading(false);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      toast.error("Failed to load applications");
      setSubmissionLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    getApplicationsData();

    // Simulate initial loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Effect for filtering applications
  useEffect(() => {
    let filtered = applications;

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.applicationId?.toLowerCase().includes(searchLower) ||
          app.user?.firstName?.toLowerCase().includes(searchLower) ||
          app.user?.lastName?.toLowerCase().includes(searchLower) ||
          app.user?.phone?.toString().includes(searchLower) ||
          app.isf?.industry?.toLowerCase().includes(searchLower) ||
          app.isf?.lookingForWhatQualification
            ?.toLowerCase()
            .includes(searchLower)
      );
    }

    // Filter by assignment
    if (selectedFilter !== "All") {
      if (selectedFilter === "Assigned to N/A") {
        filtered = filtered.filter((app) => !app.assignedAdmin);
      } else {
        const admin = selectedFilter.replace("Assigned to ", "");
        filtered = filtered.filter((app) => app.assignedAdmin === admin);
      }
    }

    // Filter by color status
    if (selectedColorFilter !== "All") {
      const colorMap = {
        "Hot Lead": "red",
        "Warm Lead": "orange",
        "Cold Lead": "gray",
        "Proceeded With Payment": "yellow",
        "Impacted Student": "lightblue",
        Agent: "pink",
        Completed: "green",
        Default: "white",
      };

      if (selectedColorFilter === "Default") {
        filtered = filtered.filter(
          (app) => !app.color || app.color === "white"
        );
      } else {
        filtered = filtered.filter(
          (app) => app.color === colorMap[selectedColorFilter]
        );
      }
    }

    // Filter by industry
    if (selectedIndustryFilter !== "All") {
      filtered = filtered.filter(
        (app) => app.isf?.industry === selectedIndustryFilter
      );
    }

    // Filter by call attempts
    if (selectedCallAttemptsFilter !== "All") {
      if (selectedCallAttemptsFilter === "None") {
        filtered = filtered.filter((app) => !app.contactAttempts);
      } else {
        filtered = filtered.filter(
          (app) => app.contactAttempts === parseInt(selectedCallAttemptsFilter)
        );
      }
    }

    // Filter out archived applications
    filtered = filtered.filter((app) => !app.archive);

    // Sort applications
    filtered.sort((a, b) => {
      let comparison = 0;

      if (sortField === "dateCreated") {
        comparison = new Date(b.status[0]?.time) - new Date(a.status[0]?.time);
      } else if (sortField === "customerName") {
        comparison = (a.user?.firstName + " " + a.user?.lastName).localeCompare(
          b.user?.firstName + " " + b.user?.lastName
        );
      } else if (sortField === "status") {
        comparison = (a.currentStatus || "").localeCompare(
          b.currentStatus || ""
        );
      } else if (sortField === "payment") {
        // Sort by payment status (full_paid > partial > unpaid)
        if (a.full_paid && !b.full_paid) comparison = -1;
        else if (!a.full_paid && b.full_paid) comparison = 1;
        else if (a.paid && !b.paid) comparison = -1;
        else if (!a.paid && b.paid) comparison = 1;
        else comparison = 0;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    setFilteredApplications(filtered);
  }, [
    search,
    selectedFilter,
    selectedColorFilter,
    selectedIndustryFilter,
    selectedCallAttemptsFilter,
    applications,
    sortField,
    sortDirection,
  ]);

  // Helper function to toggle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Payment handling
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
    setUserId(userId);

    // Calculate discounted price
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

  // Note handling
  const onClickAddNote = async () => {
    if (!note.trim()) {
      toast.error("Note cannot be empty");
      return;
    }

    try {
      setSubmissionLoading(true);
      const response = await addNoteToApplication(selectedApplicationId, note);

      if (response === "error") {
        toast.error("Failed to add note");
      } else {
        toast.success("Note added successfully");
        setAddNoteModal(false);
        setNote("");
        await getApplicationsData();
      }
    } catch (error) {
      console.error("Failed to add note:", error);
      toast.error("An error occurred while adding note");
    } finally {
      setSubmissionLoading(false);
    }
  };

  // Call handling
  const onClickInitiateCall = async (applicationId) => {
    try {
      setCallStatus({ id: applicationId, status: "Calling..." });
      setSubmissionLoading(true);

      const auth = getAuth();
      const adminUserId = auth.currentUser.uid;
      const application = applications.find((app) => app.id === applicationId);

      if (!application) {
        throw new Error("Application not found");
      }

      await initiateVerificationCall(
        applicationId,
        application.userId,
        adminUserId
      );

      // Simulate call steps
      setTimeout(
        () => setCallStatus({ id: applicationId, status: "Ringing..." }),
        1500
      );
      setTimeout(
        () => setCallStatus({ id: applicationId, status: "Connected" }),
        3000
      );
      setTimeout(
        () => setCallStatus({ id: applicationId, status: "Completed" }),
        5000
      );
      setTimeout(
        () => setCallStatus({ id: applicationId, status: "Initiate Call" }),
        6500
      );

      setSubmissionLoading(false);
    } catch (error) {
      console.error("Error initiating call:", error);
      toast.error("Failed to initiate call");
      setCallStatus({ id: applicationId, status: "Initiate Call" });
      setSubmissionLoading(false);
    }
  };

  // Email handling
  const resendEmailFunc = async (userId) => {
    try {
      setSubmissionLoading(true);
      const response = await resendEmail(userId);

      if (response === "error") {
        toast.error("Failed to resend email");
      } else {
        toast.success("Email resent successfully");
      }
    } catch (error) {
      console.error("Failed to resend email:", error);
      toast.error("An error occurred while resending email");
    } finally {
      setSubmissionLoading(false);
    }
  };

  // Verification handling
  const onVerifyApplication = async (applicationId) => {
    try {
      setSubmissionLoading(true);
      await verifyApplication(applicationId);
      toast.success("Application verified successfully");
      await getApplicationsData();
    } catch (error) {
      console.error("Failed to verify application:", error);
      toast.error("Failed to verify application");
    } finally {
      setSubmissionLoading(false);
    }
  };

  // Delete handling
  const handleDeleteClick = (applicationId) => {
    setApplicationToDelete(applicationId);
    setShowDeleteModal(true);
    setApplicationContextMenu({ visible: false });
  };

  const confirmDeleteApplication = async () => {
    try {
      setSubmissionLoading(true);
      const result = await deleteApplication(applicationToDelete);

      if (result.message) {
        toast.success("Application archived successfully");
        await getApplicationsData();
      } else {
        toast.error("Failed to archive application");
      }
    } catch (error) {
      console.error("Error archiving application:", error);
      toast.error("An error occurred while archiving application");
    } finally {
      setSubmissionLoading(false);
      setShowDeleteModal(false);
      setApplicationToDelete(null);
    }
  };

  // Context menu handling
  const handleContextMenu = (e, applicationId) => {
    e.preventDefault();

    // Calculate position, ensuring menu stays within viewport
    const x = Math.min(e.clientX, window.innerWidth - 200);
    const y = Math.min(e.clientY, window.innerHeight - 250);

    setApplicationContextMenu({
      visible: true,
      x,
      y,
      applicationId,
    });
  };

  // Close context menu when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = () => {
      if (applicationContextMenu.visible) {
        setApplicationContextMenu({ visible: false });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [applicationContextMenu.visible]);

  // Utility functions
  const calculateDiscountedPrice = (price, discount) => {
    if (!price) return "0";
    if (!discount) return price.toString();

    try {
      const cleanPrice = parseFloat(price.toString().replace(/,/g, ""));
      return (cleanPrice - discount).toFixed(2);
    } catch (error) {
      console.error("Error calculating discounted price:", error);
      return "0";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) return "Invalid Date";

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Error";
    }
  };

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Waiting for Verification":
        return "bg-yellow-100 text-yellow-800";
      case "Waiting for Payment":
        return "bg-green-100 text-green-800";
      case "Student Intake Form":
        return "bg-blue-100 text-blue-800";
      case "Upload Documents":
        return "bg-red-100 text-red-800";
      case "Certificate Generated":
        return "bg-emerald-100 text-emerald-800";
      case "Dispatched":
        return "bg-gray-100 text-gray-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Sent to RTO":
      case "Sent to Assessor":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLeadStatusLabel = (color) => {
    switch (color) {
      case "red":
        return "Hot Lead";
      case "orange":
        return "Warm Lead";
      case "gray":
        return "Cold Lead";
      case "yellow":
        return "Payment Proceeded";
      case "lightblue":
        return "Impacted Student";
      case "pink":
        return "Agent";
      case "green":
        return "Completed";
      default:
        return null;
    }
  };

  const getLeadStatusClass = (color) => {
    switch (color) {
      case "red":
        return "bg-red-100 text-red-800";
      case "orange":
        return "bg-orange-100 text-orange-800";
      case "gray":
        return "bg-gray-100 text-gray-800";
      case "yellow":
        return "bg-yellow-100 text-yellow-800";
      case "lightblue":
        return "bg-blue-100 text-blue-800";
      case "pink":
        return "bg-pink-100 text-pink-800";
      case "green":
        return "bg-green-100 text-green-800";
      default:
        return null;
    }
  };

  // Pagination
  const totalItems = filteredApplications.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleApplications = filteredApplications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getPaginationRange = () => {
    const delta = 2; // Number of pages to show before and after current page
    const range = [];

    // Always show first page
    range.push(1);

    // Calculate start and end of range
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      range.push("...");
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      range.push(i);
    }

    // Add ellipsis before last page if needed
    if (rangeEnd < totalPages - 1) {
      range.push("...");
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  // Render functions
  const renderPaymentStatus = (application) => {
    if (application.full_paid) {
      return (
        <div className="flex items-center justify-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FaCheckCircle className="mr-1" />
            Paid in Full
          </span>
        </div>
      );
    } else if (application.paid && application.partialScheme) {
      return (
        <div className="flex flex-col items-center justify-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <FaRegClock className="mr-1" />
            Partial Payment
          </span>
          <span className="text-xs text-gray-500 mt-1">
            ${application.amount_paid || 0} / $
            {calculateDiscountedPrice(application.price, application.discount)}
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FaTimesCircle className="mr-1" />
            Unpaid
          </span>
          <span className="text-xs text-gray-500 mt-1">
            ${calculateDiscountedPrice(application.price, application.discount)}
          </span>
        </div>
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {submissionLoading && <SpinnerLoader />}
      <Toaster position="top-right" />

      {/* Main content */}
      {!selectedApplication ? (
        <div className="container mx-auto px-4 py-6">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 py-16 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
              <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8 bg-white p-4 rounded-xl">
                <img
                  src={customersImg}
                  alt="Customers"
                  className="h-20 w-20 md:h-24 md:w-24"
                />
              </div>
              <div className="text-center md:text-left text-white">
                <h1 className="text-3xl font-bold mb-2">Student Management</h1>
                <p className="text-emerald-100 max-w-2xl">
                  Manage all students applications, track progress, verify
                  documents, and process payments. Get a complete overview of
                  your student pipeline.
                </p>
              </div>
            </div>
            {/* Search and filter section */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <HiOutlineSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search by ID, name, phone or qualification..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    <BiFilter />
                    {showAdvancedFilters ? "Hide Filters" : "Show Filters"}
                  </button>

                  <button
                    onClick={getApplicationsData}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    title="Refresh data"
                  >
                    <BiRefresh />
                    Refresh
                  </button>

                  <FilteredExportButton
                    applications={filteredApplications}
                    search={search}
                    selectedFilter={selectedFilter}
                    selectedColorFilter={selectedColorFilter}
                    selectedIndustryFilter={selectedIndustryFilter}
                    selectedCallAttemptsFilter={selectedCallAttemptsFilter}
                  />
                </div>
              </div>

              {/* Advanced filters */}
              {showAdvancedFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4"
                >
                  <div>
                    <label
                      htmlFor="assignmentFilter"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      Assignment
                    </label>
                    <select
                      id="assignmentFilter"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                    >
                      {filterOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="colorFilter"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      Lead Status
                    </label>
                    <select
                      id="colorFilter"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={selectedColorFilter}
                      onChange={(e) => setSelectedColorFilter(e.target.value)}
                    >
                      {colorFilterOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="industryFilter"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      Industry
                    </label>
                    <select
                      id="industryFilter"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={selectedIndustryFilter}
                      onChange={(e) =>
                        setSelectedIndustryFilter(e.target.value)
                      }
                    >
                      {industryFilterOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="callAttemptsFilter"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      Call Attempts
                    </label>
                    <select
                      id="callAttemptsFilter"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={selectedCallAttemptsFilter}
                      onChange={(e) =>
                        setSelectedCallAttemptsFilter(e.target.value)
                      }
                    >
                      <option value="All">All</option>
                      <option value="None">None</option>
                      <option value="1">1 Attempt</option>
                      <option value="2">2 Attempts</option>
                      <option value="3">3 Attempts</option>
                      <option value="4">4 Attempts</option>
                      <option value="5">5+ Attempts</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          <div className="p-4 flex items-center justify-between bg-gray-50">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-
              {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}{" "}
              applications
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="per-page"
                className="text-sm text-gray-600 whitespace-nowrap"
              >
                Show:
              </label>
              <select
                id="per-page"
                className="border border-gray-300 rounded-md text-sm p-1"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
          {/* Applications Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("dateCreated")}
                    >
                      ID/Date
                      {sortField === "dateCreated" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? (
                            <FaArrowUp className="inline h-3 w-3" />
                          ) : (
                            <FaArrowDown className="inline h-3 w-3" />
                          )}
                        </span>
                      )}
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("customerName")}
                    >
                      Student
                      {sortField === "customerName" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? (
                            <FaArrowUp className="inline h-3 w-3" />
                          ) : (
                            <FaArrowDown className="inline h-3 w-3" />
                          )}
                        </span>
                      )}
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Industry/Qualification
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      Status
                      {sortField === "status" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? (
                            <FaArrowUp className="inline h-3 w-3" />
                          ) : (
                            <FaArrowDown className="inline h-3 w-3" />
                          )}
                        </span>
                      )}
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Notes
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("payment")}
                    >
                      Payment
                      {sortField === "payment" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? (
                            <FaArrowUp className="inline h-3 w-3" />
                          ) : (
                            <FaArrowDown className="inline h-3 w-3" />
                          )}
                        </span>
                      )}
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {visibleApplications.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center">
                          <AiOutlineFileSearch className="h-12 w-12 text-gray-300 mb-2" />
                          <p className="text-lg font-medium">
                            No applications found
                          </p>
                          <p className="text-sm">
                            Try adjusting your search criteria
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}

                  {visibleApplications.map((application) => (
                    <tr
                      key={application.id}
                      className="hover:bg-gray-50 transition-colors"
                      onContextMenu={(e) =>
                        handleContextMenu(e, application.id)
                      }
                    >
                      {/* ID and Date */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">
                            #{application.applicationId || application.id}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(application.status[0]?.time)}
                          </div>

                          {application.assignedAdmin && (
                            <div className="text-xs text-gray-500 mt-1">
                              Assigned to: {application.assignedAdmin}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <BiUser className="h-6 w-6 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {application.user.firstName}{" "}
                              {application.user.lastName}
                            </div>
                            <div className="text-xs text-gray-500">
                              +{application.user.phone}
                            </div>

                            {getLeadStatusLabel(application.color) && (
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getLeadStatusClass(
                                  application.color
                                )}`}
                              >
                                {getLeadStatusLabel(application.color)}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Industry/Qualification */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {application.isf?.industry || "N/A"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {application.isf?.lookingForWhatQualification ||
                            "N/A"}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                            application.currentStatus
                          )}`}
                        >
                          {application.currentStatus || "N/A"}
                        </span>

                        {application.contactStatus && (
                          <div className="text-xs text-gray-500 mt-1">
                            Contact: {application.contactStatus}
                            {application.contactAttempts > 0 && (
                              <span className="ml-1">
                                ({application.contactAttempts}{" "}
                                {application.contactAttempts === 1
                                  ? "attempt"
                                  : "attempts"}
                                )
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Notes */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          {application.note ? (
                            /* When note exists */
                            <div className="flex items-center gap-2 max-w-xs">
                              <div className="bg-gray-50 rounded-md px-3 py-1.5 text-sm text-gray-700 truncate flex-grow text-left">
                                {application.note.length > 30
                                  ? `${application.note.substring(0, 10)}...`
                                  : application.note}
                              </div>
                              <button
                                onClick={() => {
                                  setSelectedApplicationId(application.id);
                                  setNote(application.note);
                                  setAddNoteModal(true);
                                }}
                                className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-500 focus:outline-none transition-colors"
                                title="Edit note"
                              >
                                <BiEdit className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ) : (
                            /* When no note exists */
                            <button
                              onClick={() => {
                                setSelectedApplicationId(application.id);
                                setNote("");
                                setAddNoteModal(true);
                              }}
                              className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-500 focus:outline-none transition-colors"
                              title="Add note"
                            >
                              <BiPlus className="h-3.5 w-3.5 mr-1" />
                              <span className="text-xs">Add Note</span>
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Payment Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderPaymentStatus(application)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => setSelectedApplication(application)}
                            className="inline-flex items-center justify-center p-1.5 border border-transparent rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none transition-colors"
                            title="View/Edit Application"
                          >
                            <BsEye className="h-4 w-4" />
                          </button>

                          {/* <button
                            onClick={() => onClickInitiateCall(application.id)}
                            className={`inline-flex items-center justify-center p-1.5 border border-transparent rounded-md shadow-sm text-white ${
                              callStatus.id === application.id &&
                              callStatus.status !== "Initiate Call"
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : "bg-blue-600 hover:bg-blue-700"
                            } focus:outline-none transition-colors`}
                            title={
                              callStatus.id === application.id
                                ? callStatus.status
                                : "Initiate Call"
                            }
                            disabled={
                              callStatus.id === application.id &&
                              callStatus.status !== "Initiate Call"
                            }
                          >
                            <FaPhoneAlt className="h-4 w-4" />
                          </button> */}

                          {/* <div className="relative">
                            <button
                              onClick={() => {
                                setApplicationContextMenu((prev) => ({
                                  visible:
                                    !prev.visible ||
                                    prev.applicationId !== application.id,
                                  x: 0,
                                  y: 0,
                                  applicationId: application.id,
                                }));
                              }}
                              className="inline-flex items-center justify-center p-1.5 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
                              title="More Options"
                            >
                              <BsThreeDotsVertical className="h-4 w-4" />
                            </button>

                            {applicationContextMenu.visible &&
                              applicationContextMenu.applicationId ===
                                application.id && (
                                <div
                                  className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg"
                                  style={{
                                    top:
                                      applicationContextMenu.y > 0
                                        ? `${applicationContextMenu.y}px`
                                        : "auto",
                                    left:
                                      applicationContextMenu.x > 0
                                        ? `${applicationContextMenu.x}px`
                                        : "auto",
                                  }}
                                >
                                  <div className="py-1">
                                    {application.note ? (
                                      <button
                                        onClick={() => {
                                          setSelectedApplicationId(
                                            application.id
                                          );
                                          setNote(application.note);
                                          setAddNoteModal(true);
                                          setApplicationContextMenu({
                                            visible: false,
                                          });
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      >
                                        <div className="flex items-center">
                                          <BiEdit className="mr-2" />
                                          Edit Note
                                        </div>
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          setSelectedApplicationId(
                                            application.id
                                          );
                                          setNote("");
                                          setAddNoteModal(true);
                                          setApplicationContextMenu({
                                            visible: false,
                                          });
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      >
                                        <div className="flex items-center">
                                          <BiPlus className="mr-2" />
                                          Add Note
                                        </div>
                                      </button>
                                    )}

                                    <button
                                      onClick={() => {
                                        resendEmailFunc(application.userId);
                                        setApplicationContextMenu({
                                          visible: false,
                                        });
                                      }}
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      <div className="flex items-center">
                                        <FaEnvelope className="mr-2" />
                                        Resend Email
                                      </div>
                                    </button>

                                    {!application.full_paid && (
                                      <button
                                        onClick={() => {
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
                                          );
                                          setApplicationContextMenu({
                                            visible: false,
                                          });
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      >
                                        <div className="flex items-center">
                                          <MdPayment className="mr-2" />
                                          Process Payment
                                        </div>
                                      </button>
                                    )}

                                    {(application.currentStatus ===
                                      "Certificate Generated" ||
                                      application.currentStatus ===
                                        "Completed" ||
                                      application.currentStatus ===
                                        "Dispatched") && (
                                      <button
                                        onClick={() => {
                                          window.open(
                                            application.certificateId,
                                            "_blank"
                                          );
                                          setApplicationContextMenu({
                                            visible: false,
                                          });
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      >
                                        <div className="flex items-center">
                                          <BiDownload className="mr-2" />
                                          Download Certificate
                                        </div>
                                      </button>
                                    )}

                                    <button
                                      onClick={() =>
                                        handleDeleteClick(application.id)
                                      }
                                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                      <div className="flex items-center">
                                        <FaArchive className="mr-2" />
                                        Archive
                                      </div>
                                    </button>
                                  </div>
                                </div>
                              )}
                          </div> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">{startIndex + 1}</span> to{" "}
                      <span className="font-medium">
                        {Math.min(startIndex + itemsPerPage, totalItems)}
                      </span>{" "}
                      of <span className="font-medium">{totalItems}</span>{" "}
                      results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Previous</span>
                        <FaArrowLeft className="h-5 w-5" aria-hidden="true" />
                      </button>

                      {getPaginationRange().map((page, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            typeof page === "number"
                              ? setCurrentPage(page)
                              : null
                          }
                          disabled={page === "..."}
                          className={`${
                            page === currentPage
                              ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          } relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === "..." ? "cursor-default" : ""
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Next</span>
                        <FaArrowRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Render selected application in detail view
        <Application
          application={selectedApplication}
          setSelectedApplication={setSelectedApplication}
          getApplicationsData={getApplicationsData}
          onClickInitiateCall={onClickInitiateCall}
          resendEmailFunc={resendEmailFunc}
          onClickPayment={onClickPayment}
        />
      )}

      {/* Add/Edit Note Modal */}
      {/* Add/Edit Note Modal */}
      {addNoteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-100 rounded-full p-2">
                      <FaRegStickyNote className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {note ? "Edit Note" : "Add Note"}
                    </h3>
                  </div>
                  <button
                    onClick={() => setAddNoteModal(false)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors"
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
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="mb-5">
                  <label
                    htmlFor="note-content"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Note Content
                  </label>
                  <textarea
                    id="note-content"
                    className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
                    rows="6"
                    placeholder="Enter your note here..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                </div>

                <div className="text-xs text-gray-500 mb-5">
                  <p>
                    Notes are visible to all administrators and help track
                    important details about this application.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                  onClick={() => setAddNoteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors flex items-center"
                  onClick={onClickAddNote}
                  disabled={!note.trim()}
                >
                  {note ? (
                    <>
                      <svg
                        className="mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Update Note
                    </>
                  ) : (
                    <>
                      <svg
                        className="mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add Note
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaArchive className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Archive Application
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to archive this application? This
                        action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={confirmDeleteApplication}
                >
                  Archive
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Process Payment
                  </h3>
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setShowCheckoutModal(false)}
                  >
                    <span className="sr-only">Close</span>
                    <IoMdClose className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-4">
                  <PaymentPage
                    price={price}
                    applicationId={applicationId}
                    partialScheme={partialScheme}
                    paid={paid}
                    payment1={payment1}
                    payment2={payment2}
                    setShowCheckoutModal={setShowCheckoutModal}
                    getUserApplications={getApplicationsData}
                    userId={userId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersInfo;
