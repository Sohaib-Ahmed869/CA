import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getApplications } from "../../Customer/Services/adminServices";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import {
  FaFileDownload,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaBell,
} from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { BsCalendarCheck, BsWallet2 } from "react-icons/bs";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdPayment, MdAttachMoney, MdWarning } from "react-icons/md";
import Application from "../customers/applicationpage";
import paymentsimg from "../../assets/payments.png";

import { resendEmail } from "../../Customer/Services/adminServices";

const PaymentDeadlinesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [allUpcomingPayments, setAllUpcomingPayments] = useState([]); // Original data
  const [allPastPayments, setAllPastPayments] = useState([]); // Original data
  const [filteredUpcoming, setFilteredUpcoming] = useState([]); // Filtered data
  const [filteredPast, setFilteredPast] = useState([]);
  const [upcomingPayments, setUpcomingPayments] = useState([]);
  const [pastPayments, setPastPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPastPayments, setShowPastPayments] = useState(false);
  const [sortBy, setSortBy] = useState("dueDate");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Payment status options for filtering
  const statuses = [
    "All Payments",
    "Due This Week",
    "Due This Month",
    "Overdue",
  ];
  const [activeFilter, setActiveFilter] = useState("All Payments");

  // Fetch applications which contain payment information
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const applicationsData = await getApplications();

      // Process applications to filter those with payment schemes
      processApplications(applicationsData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching applications:", err);
      toast.error("Failed to fetch payment data");
      setLoading(false);
    }
  };

  const processApplications = (applications) => {
    setApplications(applications);

    const now = new Date();
    const upcoming = [];
    const past = [];

    // Process applications to filter those with payment schemes
    applications.forEach((app) => {
      // Only process applications with partial payment schemes and due dates
      if (
        app.partialScheme &&
        app.paid &&
        !app.full_paid &&
        app.payment2Deadline
      ) {
        console.log(app.payment2Deadline);
        const deadlineDate = new Date(app.payment2Deadline);

        // Create a payment object with all relevant information
        const paymentObj = {
          ...app,
          deadlineDate,
          daysUntilDue: Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24)),
          paymentAmount: app.payment2,
          paymentType: "Second Installment",
          status: deadlineDate < now ? "Overdue" : "Upcoming",
        };
        console.log(paymentObj);
        upcoming.push(paymentObj);
      }

      // For displaying past payments that were completed
      if (app.full_paid || (app.partialScheme && app.full_paid)) {
        const paymentDate = new Date(
          app.full_paid ? app.fullPaymentDate : app.payment2Date
        );
        const paymentObj = {
          ...app,
          deadlineDate: paymentDate,
          daysUntilDue: 0,
          paymentAmount: app.partialScheme ? app.payment2 : app.price,
          paymentType: app.partialScheme
            ? "Second Installment"
            : "Full Payment",
          status: "Paid",
        };

        past.push(paymentObj);
      }
    });

    // Sort upcoming payments by due date (closest first)
    upcoming.sort((a, b) => {
      if (!a.deadlineDate) return 1; // Place items with no deadline at the end
      if (!b.deadlineDate) return -1;
      return a.deadlineDate - b.deadlineDate;
    });

    // Store the original data
    setAllUpcomingPayments(upcoming);
    setAllPastPayments(past);

    // Initially set filtered data to the same as original
    setFilteredUpcoming(upcoming);
    setFilteredPast(past);

    // Also update the direct display variables (these may be redundant if you're only using filtered)
    setUpcomingPayments(upcoming);
    setPastPayments(past);
  };

  useEffect(() => {
    if (!applications.length) return;

    let newFilteredUpcoming = [...allUpcomingPayments]; // Use original data
    let newFilteredPast = [...allPastPayments]; // Use original data

    // Apply status filter
    if (activeFilter === "Due This Week") {
      newFilteredUpcoming = newFilteredUpcoming.filter(
        (payment) => payment.daysUntilDue <= 7 && payment.daysUntilDue >= 0
      );
    }
    // Rest of your filtering logic

    // Set the filtered data without modifying the source
    setFilteredUpcoming(newFilteredUpcoming);
    setFilteredPast(newFilteredPast);
  }, [
    activeFilter,
    searchTerm,
    sortBy,
    sortDirection,
    allUpcomingPayments,
    allPastPayments,
  ]);

  // Format date in a user-friendly way
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

  // Format currency
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "N/A";

    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Calculate payment statistics for KPIs
  const calculateStats = () => {
    const totalUpcoming = upcomingPayments.length;
    const overdueCount = upcomingPayments.filter(
      (p) => p.daysUntilDue < 0
    ).length;

    // Calculate total expected revenue from upcoming payments
    let expectedRevenue = 0;
    upcomingPayments.forEach((payment) => {
      if (payment.paymentAmount) {
        expectedRevenue += parseFloat(
          payment.paymentAmount.toString().replace(/,/g, "") || 0
        );
      }
    });

    // Calculate due this week
    const dueThisWeek = upcomingPayments.filter(
      (p) => p.daysUntilDue >= 0 && p.daysUntilDue <= 7
    ).length;

    // Calculate due this month
    const dueThisMonth = upcomingPayments.filter(
      (p) => p.daysUntilDue >= 0 && p.daysUntilDue <= 30
    ).length;

    return {
      totalUpcoming,
      overdueCount,
      expectedRevenue: expectedRevenue.toFixed(2),
      dueThisWeek,
      dueThisMonth,
    };
  };

  const stats = calculateStats();

  // Get payment status class for styling
  const getStatusClass = (payment) => {
    if (payment.status === "Paid") {
      return "bg-green-100 text-green-800";
    } else if (payment.daysUntilDue < 0) {
      return "bg-red-100 text-red-800";
    } else if (payment.daysUntilDue <= 7) {
      return "bg-yellow-100 text-yellow-800";
    } else {
      return "bg-emerald-100 text-emerald-800";
    }
  };

  // Get payment status display text
  const getPaymentStatus = (payment) => {
    if (payment.status === "Paid") {
      return "Paid";
    } else if (payment.daysUntilDue < 0) {
      return `Overdue by ${Math.abs(payment.daysUntilDue)} days`;
    } else if (payment.daysUntilDue === 0) {
      return "Due Today";
    } else {
      return `Due in ${payment.daysUntilDue} days`;
    }
  };

  // Export payments to CSV
  const exportPayments = () => {
    // Create CSV content
    const headers = [
      "Application ID",
      "Student",
      "Qualification",
      "Payment Amount",
      "Due Date",
      "Status",
      "Days Until Due",
    ];

    const allPayments = [
      ...upcomingPayments,
      ...(showPastPayments ? pastPayments : []),
    ];

    const csvContent = [
      headers.join(","),
      ...allPayments.map((payment) =>
        [
          payment.applicationId || payment.id || "",
          payment.user?.firstName + " " + payment.user?.lastName || "",
          payment.isf?.lookingForWhatQualification || "",
          payment.paymentAmount || 0,
          formatDate(payment.deadlineDate),
          payment.status === "Paid" ? "Paid" : getPaymentStatus(payment),
          payment.status === "Paid" ? "0" : payment.daysUntilDue,
        ]
          .map((value) => `"${value}"`)
          .join(",")
      ),
    ].join("\n");

    // Create and download blob
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `payment-deadlines-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Payment deadlines data exported successfully");
  };

  // Toggle sort direction when clicking on the same column
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
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

  const resendEmailFunc = async (userId) => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50 animate-fade">
      {loading && <SpinnerLoader />}
      <Toaster position="bottom-right" reverseOrder={false} />
      {!selectedApplication ? (
        <>
          {/* Header */}
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
              </svg>
            </div>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                <div className="bg-white p-3 rounded-xl shadow-md transform">
                  <img
                    src={paymentsimg}
                    alt="Payments"
                    className="h-32 w-auto"
                  />
                </div>
              </div>
              <div className="text-center md:text-left text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Payment Deadlines
                </h1>
                <p className="text-emerald-100 max-w-3xl text-lg">
                  Track upcoming payment deadlines, manage overdue payments, and
                  monitor payment schedules for all partial payment
                  applications.
                </p>
              </div>
            </div>
          </div>

          {/* KPI Stats Cards */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Expected Revenue */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-emerald-100 p-4 rounded-full">
                      <MdAttachMoney className="h-8 w-8 text-emerald-600" />
                    </div>
                    <div className="ml-5">
                      <p className="text-gray-500 text-sm font-medium">
                        Expected Revenue
                      </p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {formatCurrency(stats.expectedRevenue)}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">
                        From {stats.totalUpcoming} upcoming payments
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Due This Week */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-100 p-4 rounded-full">
                      <BsCalendarCheck className="h-8 w-8 text-yellow-600" />
                    </div>
                    <div className="ml-5">
                      <p className="text-gray-500 text-sm font-medium">
                        Due This Week
                      </p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {stats.dueThisWeek}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="text-sm text-gray-500 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      <span>
                        {Math.round(
                          (stats.dueThisWeek / stats.totalUpcoming) * 100
                        ) || 0}
                        % of upcoming payments
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Due This Month */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-emerald-100 p-4 rounded-full">
                      <BsWallet2 className="h-8 w-8 text-emerald-600" />
                    </div>
                    <div className="ml-5">
                      <p className="text-gray-500 text-sm font-medium">
                        Due This Month
                      </p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {stats.dueThisMonth}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="text-sm text-gray-500 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                      <span>Including this week's deadlines</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overdue Payments */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-red-100 p-4 rounded-full">
                      <MdWarning className="h-8 w-8 text-red-600" />
                    </div>
                    <div className="ml-5">
                      <p className="text-gray-500 text-sm font-medium">
                        Overdue Payments
                      </p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {stats.overdueCount}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="text-sm text-gray-500 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      <span>
                        {Math.round(
                          (stats.overdueCount / stats.totalUpcoming) * 100
                        ) || 0}
                        % of total payments
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Controls and filters */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                  {/* <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    {statuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => setActiveFilter(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeFilter === status
                            ? "bg-emerald-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div> */}

                  <div className="flex gap-2 w-full md:w-auto">
                    <button
                      className="flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-700 transition-colors text-sm font-medium"
                      onClick={fetchApplications}
                    >
                      <BiRefresh className="mr-2" />
                      Refresh
                    </button>
                    <button
                      className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg shadow-sm hover:bg-gray-200 transition-colors text-sm font-medium"
                      onClick={exportPayments}
                    >
                      <FaFileDownload className="mr-2" />
                      Export
                    </button>
                    <button
                      className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg shadow-sm hover:bg-gray-200 transition-colors text-sm font-medium"
                      onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                    >
                      <FaFilter className="mr-2" />
                      Filters
                    </button>
                  </div>
                </div>

                {/* Advanced filters panel */}
                {showFiltersPanel && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sort By
                        </label>
                        <div className="flex gap-2">
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                          >
                            <option value="dueDate">Due Date</option>
                            <option value="amount">Amount</option>
                            <option value="name">Student Name</option>
                          </select>
                          <button
                            className="inline-flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-all"
                            onClick={() =>
                              setSortDirection(
                                sortDirection === "asc" ? "desc" : "asc"
                              )
                            }
                          >
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Search
                        </label>
                        <div className="relative">
                          <HiOutlineSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                            placeholder="Search by student name, application ID or qualification..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500">
                  {/* <div>
                    <FaBell className="inline mr-2 text-gray-400" />
                    Showing {upcomingPayments.length} upcoming payment deadlines
                    {searchTerm && (
                      <span className="ml-1">matching "{searchTerm}"</span>
                    )}
                    {activeFilter !== "All Payments" && (
                      <span className="ml-1">with filter "{activeFilter}"</span>
                    )}
                  </div> */}

                  <button
                    onClick={() => setShowPastPayments(!showPastPayments)}
                    className="flex items-center text-emerald-600 hover:text-emerald-800"
                  >
                    {showPastPayments ? (
                      <>
                        <FaChevronUp className="mr-1" /> Hide Past Payments
                      </>
                    ) : (
                      <>
                        <FaChevronDown className="mr-1" /> Show Past Payments (
                        {pastPayments.length})
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming Payments Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-medium text-gray-800 flex items-center">
                  <FaBell className="mr-2 text-emerald-500" />
                  Upcoming Payment Deadlines
                </h3>
              </div>

              {upcomingPayments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="p-6 rounded-full bg-gray-100 mb-6 flex items-center justify-center">
                    <AiOutlineFileSearch className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    No upcoming payment deadlines found
                  </h3>
                  <p className="text-gray-500 mb-6 text-center max-w-md">
                    {searchTerm || activeFilter !== "All Payments"
                      ? "Try adjusting your search criteria or filters to see more upcoming payments."
                      : "When applications with partial payment schemes are created, they will appear here for tracking."}
                  </p>
                  {(searchTerm || activeFilter !== "All Payments") && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setActiveFilter("All Payments");
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
                    <thead className="sticky top-0 bg-gray-50 z-10">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("name")}
                        >
                          <div className="flex items-center">
                            <span>Student</span>
                            {sortBy === "name" && (
                              <span className="ml-1">
                                {sortDirection === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                          <div className="flex items-center">
                            <span>Application ID</span>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Qualification
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("amount")}
                        >
                          <div className="flex items-center justify-end">
                            <span>Amount Due</span>
                            {sortBy === "amount" && (
                              <span className="ml-1">
                                {sortDirection === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("dueDate")}
                        >
                          <div className="flex items-center justify-center">
                            <span>Due Date</span>
                            {sortBy === "dueDate" && (
                              <span className="ml-1">
                                {sortDirection === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUpcoming.map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-medium">
                                {payment.user?.firstName?.[0] || ""}
                                {payment.user?.lastName?.[0] || ""}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {payment.user?.firstName}{" "}
                                  {payment.user?.lastName}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {payment.user?.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              #{payment.applicationId || payment.id}
                            </div>
                            <div className="text-xs text-gray-500">
                              {payment.paymentType}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {payment.isf?.lookingForWhatQualification ||
                                "N/A"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {payment.isf?.industry || "N/A"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {formatCurrency(payment.paymentAmount)}
                            </div>
                            {payment.discount && (
                              <div className="text-xs text-green-600 font-medium">
                                Discount: {formatCurrency(payment.discount)}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm font-medium text-gray-900">
                              {formatDate(payment.deadlineDate)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {payment.daysUntilDue < 0
                                ? `${Math.abs(
                                    payment.daysUntilDue
                                  )} days overdue`
                                : payment.daysUntilDue === 0
                                ? "Due today"
                                : `${payment.daysUntilDue} days remaining`}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center">
                              <span
                                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                                  payment
                                )}`}
                              >
                                {getPaymentStatus(payment)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex space-x-2 justify-end">
                              <button
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                onClick={() => setSelectedApplication(payment)}
                              >
                                View Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Past Payments Table (Conditional) */}
            {showPastPayments && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-800 flex items-center">
                    <MdPayment className="mr-2 text-green-500" />
                    Past Payments
                  </h3>
                </div>

                {pastPayments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="p-6 rounded-full bg-gray-100 mb-6 flex items-center justify-center">
                      <AiOutlineFileSearch className="h-16 w-16 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">
                      No past payments found
                    </h3>
                    <p className="text-gray-500 mb-6 text-center max-w-md">
                      {searchTerm
                        ? "Try adjusting your search criteria to see past payments."
                        : "Completed payments will appear here once they are processed."}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="sticky top-0 bg-gray-50 z-10">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          >
                            <div className="flex items-center">
                              <span>Student</span>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          >
                            <div className="flex items-center">
                              <span>Application ID</span>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Qualification
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          >
                            <div className="flex items-center justify-end">
                              <span>Amount Paid</span>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          >
                            <div className="flex items-center justify-center">
                              <span>Payment Date</span>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {pastPayments.map((payment) => (
                          <tr
                            key={`past-${payment.id}`}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium">
                                  {payment.user?.firstName?.[0] || ""}
                                  {payment.user?.lastName?.[0] || ""}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {payment.user?.firstName}{" "}
                                    {payment.user?.lastName}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {payment.user?.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                #{payment.applicationId || payment.id}
                              </div>
                              <div className="text-xs text-gray-500">
                                {payment.paymentType}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {payment.isf?.lookingForWhatQualification ||
                                  "N/A"}
                              </div>
                              <div className="text-xs text-gray-500">
                                {payment.isf?.industry || "N/A"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="text-sm font-medium text-gray-900">
                                {formatCurrency(payment.paymentAmount)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="text-sm font-medium text-gray-900">
                                {formatDate(
                                  payment.payment2Date ||
                                    payment.fullPaymentDate
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex justify-center">
                                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Paid
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="flex space-x-2 justify-end">
                                <button
                                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                  onClick={() =>
                                    setSelectedApplication(payment)
                                  }
                                >
                                  View Details
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <Application
          application={selectedApplication}
          setSelectedApplication={setSelectedApplication}
          getApplicationsData={fetchApplications}
          onClickInitiateCall={onClickInitiateCall} // You'll need to define this function
          resendEmailFunc={resendEmailFunc} // You'll need to define this function
          onClickPayment={onClickPayment} // You'll need to define this function
        />
      )}
    </div>
  );
};

export default PaymentDeadlinesPage;
