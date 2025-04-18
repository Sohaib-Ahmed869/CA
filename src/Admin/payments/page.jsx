import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  fetchPaginatedPayments,
  getApplications,
} from "../../Customer/Services/adminServices";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import {
  FaFileDownload,
  FaFilter,
  FaChartBar,
  FaChevronDown,
} from "react-icons/fa";
import { BiRefresh, BiTime } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { AiOutlineFileSearch } from "react-icons/ai";
import {
  MdPayment,
  MdAttachMoney,
  MdLocalAtm,
  MdOutlinePayments,
} from "react-icons/md";
import { BsCalendarCheck, BsWallet2 } from "react-icons/bs";
import paymentsimg from "../../assets/payments.png";
const URL = import.meta.env.VITE_REACT_BACKEND_URL;

const PaymentsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [activeFilter, setActiveFilter] = useState("All Payments");
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage, setPaymentsPerPage] = useState(10);
  const [paginatedApplications, setPaginatedApplications] = useState([]);
  const [totalApplications, setTotalApplications] = useState(0);
  // useEffect(() => {
  //   const indexOfLastPayment = currentPage * paymentsPerPage;
  //   const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  //   setPaginatedApplications(
  //     filteredApplications.slice(indexOfFirstPayment, indexOfLastPayment)
  //   );
  // }, [filteredApplications, currentPage, paymentsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [stats, setStats] = useState({
    totalApplications: 0,
    completedPayments: 0,
    partialPayments: 0,
    fullPaidPayments: 0,
    pendingPayments: 0,
    totalRevenue: 0,
  });
  const [searchInput, setSearchInput] = useState("");

  const handleReferesh = () => {
    setSearchTerm("");
    setActiveFilter("All Payments");
    setCurrentPage(1);
  };
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 1000);

    return () => clearTimeout(delayTimer); // Clear timeout if input changes before 20s
  }, [searchInput]);
  // Payment status options for filtering
  const statuses = [
    "All Payments",
    "Payments Completed",
    "Waiting for Payment",
    "Partial Payment",
  ];
  // fetch stats for kpi
  const fetchStats = async () => {
    try {
      const response = await fetch(`${URL}/api/admin/payment-stats`);
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch stats");
      console.log(data);
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      toast.error(error.message || "Failed to fetch stats");
    }
  };
  useEffect(() => {
    fetchStats();
  }, []);

  // Fetch payments when filters/pagination changes
  useEffect(() => {
    fetchApplications();
  }, [
    activeFilter,
    searchTerm,
    sortBy,
    sortDirection,
    currentPage,
    paymentsPerPage,
  ]);

  const fetchApplications = async () => {
    setSubmissionLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: paymentsPerPage,
        search: searchTerm,
        status: activeFilter,
        sortBy,
        sortDirection,
      };

      const response = await fetchPaginatedPayments(params);
      setApplications(response.applications);
      setTotalApplications(response.total);
      setSubmissionLoading(false);
    } catch (error) {
      toast.error(error.message || "Failed to fetch payments");
      setSubmissionLoading(false);
    } finally {
      setSubmissionLoading(false);
    }
  };
  // const fetchApplications = async () => {
  //   setSubmissionLoading(true);
  //   try {
  //     const applicationsData = await getApplications();
  //     // Sort applications by date in descending order (most recent first)
  //     const sortedApplications = applicationsData.sort((a, b) => {
  //       return new Date(b.status[0].time) - new Date(a.status[0].time);
  //     });
  //     setApplications(sortedApplications);
  //     setFilteredApplications(sortedApplications);
  //     setSubmissionLoading(false);
  //   } catch (err) {
  //     console.error("Error fetching applications:", err);
  //     toast.error("Failed to fetch payment data");
  //     setSubmissionLoading(false);
  //   }
  // };

  // // Apply filters based on status and search term
  // useEffect(() => {
  //   let filtered = [...applications];

  //   // Apply status filter
  //   if (activeFilter === "Payments Completed") {
  //     filtered = filtered.filter((application) => application.paid === true);
  //   } else if (activeFilter === "Waiting for Payment") {
  //     filtered = filtered.filter((application) => application.paid === false);
  //   } else if (activeFilter === "Partial Payment") {
  //     filtered = filtered.filter(
  //       (application) =>
  //         application.partialScheme &&
  //         application.paid &&
  //         !application.full_paid
  //     );
  //   }

  //   // Apply search filter
  //   if (searchTerm.trim()) {
  //     const searchLower = searchTerm.toLowerCase();
  //     filtered = filtered.filter(
  //       (application) =>
  //         (application.user?.firstName + " " + application.user?.lastName)
  //           ?.toLowerCase()
  //           .includes(searchLower) ||
  //         application.applicationId?.toLowerCase().includes(searchLower) ||
  //         (application.isf?.lookingForWhatQualification || "")
  //           ?.toLowerCase()
  //           .includes(searchLower)
  //     );
  //   }

  //   // Sort applications
  //   filtered = filtered.sort((a, b) => {
  //     if (sortBy === "date") {
  //       return sortDirection === "asc"
  //         ? new Date(a.status[0].time) - new Date(b.status[0].time)
  //         : new Date(b.status[0].time) - new Date(a.status[0].time);
  //     } else if (sortBy === "amount") {
  //       const aPrice = parseFloat(a.price?.toString().replace(/,/g, "") || 0);
  //       const bPrice = parseFloat(b.price?.toString().replace(/,/g, "") || 0);
  //       return sortDirection === "asc" ? aPrice - bPrice : bPrice - aPrice;
  //     } else if (sortBy === "name") {
  //       const aName = a.user?.firstName + " " + a.user?.lastName || "";
  //       const bName = b.user?.firstName + " " + b.user?.lastName || "";
  //       return sortDirection === "asc"
  //         ? aName.localeCompare(bName)
  //         : bName.localeCompare(aName);
  //     }
  //     return 0;
  //   });

  //   setFilteredApplications(filtered);
  // }, [activeFilter, applications, searchTerm, sortBy, sortDirection]);

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

  // Calculate discounted price or show correct amount based on payment scheme
  const calculateFinalPrice = (application) => {
    if (!application.price) return "N/A";

    if (application.discount) {
      const cleanPrice = parseFloat(
        application.price.toString().replace(/,/g, "")
      );
      return formatCurrency(cleanPrice - application.discount);
    }

    return formatCurrency(
      parseFloat(application.price.toString().replace(/,/g, ""))
    );
  };

  // Determine amount paid based on payment scheme
  const getAmountPaid = (application) => {
    if (!application.paid) return formatCurrency(0);

    if (application.partialScheme) {
      if (application.full_paid) {
        return `${formatCurrency(
          application.payment1 + application.payment2
        )} (Full)`;
      } else {
        return `${formatCurrency(application.payment1)} (Partial)`;
      }
    }

    if (application.discount) {
      const cleanPrice = parseFloat(
        application.price.toString().replace(/,/g, "")
      );
      return formatCurrency(cleanPrice - application.discount);
    }

    return formatCurrency(
      parseFloat(application.price.toString().replace(/,/g, ""))
    );
  };

  // Get payment status display text
  const getPaymentStatus = (application) => {
    if (application.paid) {
      if (application.partialScheme) {
        return application.full_paid ? "Fully Paid" : "Partial Paid";
      }
      return "Paid";
    }
    return "Not Paid";
  };

  // Get payment status class for styling
  const getStatusClass = (application) => {
    if (application.paid) {
      if (application.partialScheme && !application.full_paid) {
        return "bg-yellow-100 text-yellow-800";
      }
      return "bg-green-100 text-green-800";
    }
    return "bg-red-100 text-red-800";
  };

  // Export payments to CSV
  // const exportPayments = () => {
  //   // Create CSV content
  //   const headers = [
  //     "Application ID",
  //     "Date",
  //     "Student",
  //     "Qualification",
  //     "Original Price",
  //     "Final Price",
  //     "Paid Amount",
  //     "Status",
  //   ];

  //   const csvContent = [
  //     headers.join(","),
  //     applications.map((app) =>
  //       [
  //         app.applicationId || app.id || "",
  //         app.status?.[0]?.time ? formatDate(app.status[0].time) : "",
  //         app.user?.firstName + " " + app.user?.lastName || "",
  //         app.isf?.lookingForWhatQualification || "",
  //         app.price || 0,
  //         app.discount ? parseFloat(app.price) - app.discount : app.price,
  //         app.paid
  //           ? app.partialScheme
  //             ? app.full_paid
  //               ? app.payment1 + app.payment2
  //               : app.payment1
  //             : app.discount
  //             ? parseFloat(app.price) - app.discount
  //             : app.price
  //           : 0,
  //         getPaymentStatus(app),
  //       ]
  //         .map((value) => `"${value}"`)
  //         .join(",")
  //     ),
  //   ].join("\n");

  //   // Create and download blob
  //   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.setAttribute("href", url);
  //   link.setAttribute(
  //     "download",
  //     `payments-export-${new Date().toISOString().split("T")[0]}.csv`
  //   );
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);

  //   toast.success("Payment data exported successfully");
  // };
  const exportPayments = () => {
    // Only run in browser environments
    if (typeof window === "undefined") {
      console.error("This function can only run in a browser environment");
      return;
    }

    try {
      // Create CSV content
      const headers = [
        "Application ID",
        "Date",
        "Student",
        "Qualification",
        "Original Price",
        "Final Price",
        "Paid Amount",
        "Status",
      ];

      const csvContent = [
        headers.join(","),
        ...(applications?.map((app) =>
          [
            app.applicationId || app.id || "",
            app.status?.[0]?.time ? formatDate(app.status[0].time) : "",
            `${app.user?.firstName || ""} ${app.user?.lastName || ""}`.trim(),
            app.isf?.lookingForWhatQualification || "",
            app.price || 0,
            app.discount ? parseFloat(app.price) - app.discount : app.price,
            app.paid ? calculatePaidAmount(app) : 0,
            getPaymentStatus(app),
          ]
            .map((value) => `"${String(value).replace(/"/g, '""')}"`)
            .join(",")
        ) || []),
      ].join("\n");

      // Create and download blob
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `payments-export-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
      document.body.removeChild(link);

      toast.success("Payment data exported successfully");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export payment data");
    }
  };

  // Helper function for payment calculation
  const calculatePaidAmount = (app) => {
    if (app.partialScheme) {
      return app.full_paid ? app.payment1 + app.payment2 : app.payment1;
    }
    return app.discount ? parseFloat(app.price) - app.discount : app.price;
  };
  // Toggle sort direction when clicking on the same column
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("desc");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-fade">
      {submissionLoading && <SpinnerLoader />}
      <Toaster position="bottom-right" reverseOrder={false} />

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
            <div className="bg-white p-3 rounded-xl shadow-md transform">
              <img src={paymentsimg} alt="Payments" className="h-32 w-auto" />
            </div>
          </div>
          <div className="text-center md:text-left text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Payment Management
            </h1>
            <p className="text-emerald-100 max-w-3xl text-lg">
              Track and manage all payment transactions. Verify payment status,
              process refunds, and generate reports for accounting purposes.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Revenue */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-emerald-100 p-4 rounded-full">
                  <MdAttachMoney className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="ml-5">
                  <p className="text-gray-500 text-sm font-medium">
                    Total Revenue
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {formatCurrency(stats.totalRevenue)}
                  </h3>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    From{" "}
                    {stats.completedPayments +
                      stats.partialPayments +
                      stats.fullPaidPayments}{" "}
                    payments
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Full Payments */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 p-4 rounded-full">
                  <MdOutlinePayments className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5">
                  <p className="text-gray-500 text-sm font-medium">
                    Completed Payments
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stats.completedPayments + stats.fullPaidPayments}
                  </h3>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-sm text-gray-500 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span>
                    {Math.round(
                      ((stats.completedPayments + stats.fullPaidPayments) /
                        stats.totalApplications) *
                        100
                    )}
                    % of total applications
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Partial Payments */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 p-4 rounded-full">
                  <BsWallet2 className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="ml-5">
                  <p className="text-gray-500 text-sm font-medium">
                    Partial Payments
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stats.partialPayments}
                  </h3>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-sm text-gray-500 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                  <span>Awaiting second installment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Payments */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-100 p-4 rounded-full">
                  <BiTime className="h-8 w-8 text-red-600" />
                </div>
                <div className="ml-5">
                  <p className="text-gray-500 text-sm font-medium">
                    Awaiting Payments
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stats.pendingPayments}
                  </h3>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-sm text-gray-500 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                  <span>
                    {Math.round(
                      (stats.pendingPayments / stats.totalApplications) * 100
                    )}
                    % of total applications
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
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setActiveFilter(status);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === status
                        ? "bg-emerald-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <button
                  className="flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-700 transition-colors text-sm font-medium"
                  onClick={handleReferesh}
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
                        <option value="date">Date</option>
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
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center text-sm text-gray-500">
              <FaChartBar className="mr-2 text-gray-400" />
              Showing {totalApplications} payment transactions
              {searchTerm && (
                <span className="ml-1">matching "{searchTerm}"</span>
              )}
              {activeFilter !== "All Payments" && (
                <span className="ml-1">with status "{activeFilter}"</span>
              )}
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          {applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="p-6 rounded-full bg-gray-100 mb-6 flex items-center justify-center">
                <AiOutlineFileSearch className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No payment transactions found
              </h3>
              <p className="text-gray-500 mb-6 text-center max-w-md">
                {searchTerm || activeFilter !== "All Payments"
                  ? "Try adjusting your search criteria or filters to see more payment transactions."
                  : "When payments are processed, they will appear here for management and tracking."}
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
                      onClick={() => handleSort("date")}
                    >
                      <div className="flex items-center">
                        <span>Application ID</span>
                        {sortBy === "date" && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                        <span className="ml-2 text-gray-400">/ Date</span>
                      </div>
                    </th>
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
                        <span>Price</span>
                        {sortBy === "amount" && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Paid Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">
                            #{application.applicationId || application.id}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 flex items-center">
                            <BsCalendarCheck className="mr-1" />
                            {formatDate(application.status?.[0]?.time)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-medium">
                            {application.user?.firstName?.[0] || ""}
                            {application.user?.lastName?.[0] || ""}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {application.user?.firstName}{" "}
                              {application.user?.lastName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {application.user?.email}
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
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(
                            parseFloat(
                              application.price?.toString().replace(/,/g, "") ||
                                0
                            )
                          )}
                        </div>
                        {application.discount && (
                          <div className="text-xs text-green-600 font-medium">
                            Discount: {formatCurrency(application.discount)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {getAmountPaid(application)}
                        </div>
                        {application.partialScheme && (
                          <div className="text-xs text-gray-500">
                            {application.full_paid
                              ? `${formatCurrency(
                                  application.payment1
                                )} + ${formatCurrency(application.payment2)}`
                              : `Next: ${formatCurrency(
                                  application.payment2 || 0
                                )}`}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex justify-center">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                              application
                            )}`}
                          >
                            {getPaymentStatus(application)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="px-6 py-4 bg-white border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing {paymentsPerPage} of {totalApplications} payments
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                      value={paymentsPerPage}
                      onChange={(e) => {
                        setPaymentsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      <option value={5}>5 per page</option>
                      <option value={10}>10 per page</option>
                      <option value={25}>25 per page</option>
                      <option value={50}>50 per page</option>
                    </select>

                    <button
                      className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>

                    {Array.from({
                      length: Math.ceil(
                        filteredApplications.length / paymentsPerPage
                      ),
                    })
                      .map((_, index) => (
                        <button
                          key={index}
                          className={`px-3 py-1 rounded ${
                            currentPage === index + 1
                              ? "bg-emerald-600 text-white"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </button>
                      ))
                      .slice(
                        Math.max(0, currentPage - 3),
                        Math.min(
                          Math.ceil(
                            filteredApplications.length / paymentsPerPage
                          ),
                          currentPage + 2
                        )
                      )}

                    <button
                      className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil(filteredApplications.length / paymentsPerPage)
                      }
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
  );
};

export default PaymentsPage;
