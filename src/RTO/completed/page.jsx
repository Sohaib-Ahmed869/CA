import React, { useState, useEffect } from "react";
import { BsEye, BsCalendarDate, BsDownload } from "react-icons/bs";
import { BiCertification, BiSearch, BiRefresh, BiFilter } from "react-icons/bi";
import {
  FaTimes,
  FaFileAlt,
  FaRegFileAlt,
  FaUserGraduate,
} from "react-icons/fa";
import { HiDocumentText, HiOutlineDocumentSearch } from "react-icons/hi";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import completed from "../../assets/completed.png";
import { getApplications } from "../../Customer/Services/rtoservices";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import JSZip from "jszip";

// PDF Viewer component
const PDFViewer = ({ url, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className="relative bg-white rounded-lg shadow-xl w-full h-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Certificate Preview
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <FaTimes />
          </button>
        </div>
        <div className="flex-grow overflow-hidden">
          <iframe
            src={url}
            title="PDF Viewer"
            className="w-full h-full"
            frameBorder="0"
          />
        </div>
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            <BsDownload className="mr-2" /> Download Certificate
          </a>
        </div>
      </div>
    </div>
  );
};

const Completed = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [dateFilter, setDateFilter] = useState("All");
  const [viewingCertificate, setViewingCertificate] = useState(null);
  const [totalApplications, setTotalApplications] = useState(0);

  const applicationsPerPage = 10;

  const closeModal = () => {
    document.getElementById("uploadCertificateModal").close();
  };

  const onClickViewCertificate = (url) => {
    setViewingCertificate(url);
  };

  const onClickDownload = (url) => {
    window.open(url, "_blank");
  };

  // Get all completed applications
  const getApplicationsData = async () => {
    try {
      const rtoType = localStorage.getItem("rtoType");
      setSubmissionLoading(true);

      const applicationsData = await getApplications();

      // Filter for applications with "Certificate Generated" status
      const filteredApplications = applicationsData.filter(
        (app) => app.currentStatus === "Certificate Generated"
      );

      // Apply RTO type filter
      const finalFilteredApplications = filteredApplications.filter((app) => {
        // Always check if payment is completed
        const isPaymentComplete = app.paid === true;

        // If rtoType is 'all', don't filter by type
        if (rtoType.toLowerCase() === "all") {
          return isPaymentComplete;
        }

        // Otherwise, filter by matching type or default
        return isPaymentComplete;
      });

      setApplications(finalFilteredApplications);
      setTotalApplications(finalFilteredApplications.length);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      toast.error("Failed to load completed applications");
    } finally {
      setSubmissionLoading(false);
    }
  };

  useEffect(() => {
    getApplicationsData();
  }, []);

  // Apply filters and sorting to applications
  const filteredApplications = applications
    .filter((app) => {
      // Apply search filter
      const searchLower = searchTerm.toLowerCase();
      const appIdMatch =
        (app.applicationId || app.id)?.toLowerCase().includes(searchLower) ||
        false;
      const nameMatch = `${app.user?.firstName || ""} ${
        app.user?.lastName || ""
      }`
        .toLowerCase()
        .includes(searchLower);
      const industryMatch =
        app.initialForm?.industry?.toLowerCase().includes(searchLower) || false;

      return appIdMatch || nameMatch || industryMatch;
    })
    // Apply date filter
    .filter((app) => {
      if (dateFilter === "All") return true;

      const filterDays = parseInt(dateFilter);
      // Find the most recent status update (certificate generation date)
      const appDate = new Date(app.status?.[app.status.length - 1]?.time || 0);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - filterDays);

      return appDate >= cutoffDate;
    })
    // Apply sorting
    .sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.status?.[a.status.length - 1]?.time || 0);
        const dateB = new Date(b.status?.[b.status.length - 1]?.time || 0);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortBy === "name") {
        const nameA = `${a.user?.firstName || ""} ${a.user?.lastName || ""}`;
        const nameB = `${b.user?.firstName || ""} ${b.user?.lastName || ""}`;
        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else if (sortBy === "id") {
        const idA = a.applicationId || a.id || "";
        const idB = b.applicationId || b.id || "";
        return sortOrder === "asc"
          ? idA.localeCompare(idB)
          : idB.localeCompare(idA);
      }
      return 0;
    });

  // Calculate pagination
  const indexOfLastApp = currentPage * applicationsPerPage;
  const indexOfFirstApp = indexOfLastApp - applicationsPerPage;
  const paginatedApplications = filteredApplications.slice(
    indexOfFirstApp,
    indexOfLastApp
  );
  const totalPages = Math.ceil(
    filteredApplications.length / applicationsPerPage
  );

  // Format date in a human-readable way
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Pagination handlers
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const handlePreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Toaster position="top-right" />
      {submissionLoading && <SpinnerLoader />}

      {/* Certificate Viewer Modal */}
      {viewingCertificate && (
        <PDFViewer
          url={viewingCertificate}
          onClose={() => setViewingCertificate(null)}
        />
      )}

      <div className="w-full">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 py-8 px-4 sm:px-6 lg:px-8 shadow-md mb-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0 gap-3">
              <div className="flex-shrink-0 bg-white p-3 rounded-full">
                <img
                  src={completed}
                  alt="Completed Applications"
                  className="h-16 w-16"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Completed Applications
                </h1>
                <p className="text-emerald-100">
                  View and manage successfully completed applications with
                  generated certificates
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={getApplicationsData}
                className="inline-flex items-center px-4 py-2 bg-white text-emerald-700 rounded-lg shadow hover:bg-emerald-50 transition-colors duration-200"
              >
                <BiRefresh className="mr-2" />
                Refresh Data
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Search by name, ID, or industry..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <select
                  className="pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="All">All Time</option>
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                </select>

                <select
                  className="pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="id">Sort by ID</option>
                </select>

                <button
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>

            <div className="mt-2 flex justify-between">
              <p className="text-sm text-gray-500">
                {filteredApplications.length} of {totalApplications} completed
                applications
              </p>
            </div>
          </div>

          {/* Applications Dashboard */}
          {filteredApplications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-emerald-100 mb-4">
                <HiOutlineDocumentSearch className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No completed applications found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchTerm || dateFilter !== "All"
                  ? "Try adjusting your search filters for different results."
                  : "All completed applications with generated certificates will appear here."}
              </p>
            </div>
          ) : (
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  <FaUserGraduate className="mr-2 text-emerald-600" />
                  Completed Applications
                </h3>
                <span className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>
              </div>

              {/* Applications Grid View */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {paginatedApplications.map((application) => (
                  <div
                    key={application.id}
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="bg-emerald-50 px-4 py-3 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-emerald-700">
                          #{application.applicationId || application.id}
                        </h4>
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          Completed
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-3">
                        <div className="text-sm text-gray-500">Applicant</div>
                        <div className="font-medium">
                          {application.user.firstName}{" "}
                          {application.user.lastName}
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="text-sm text-gray-500">Industry</div>
                        <div className="font-medium">
                          {application.initialForm?.industry || "N/A"}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm text-gray-500">
                          Completion Date
                        </div>
                        <div className="font-medium flex items-center">
                          <BsCalendarDate className="mr-1 text-gray-400" />
                          {formatDate(
                            application.status[application.status.length - 1]
                              .time
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 mt-4">
                        <button
                          onClick={() =>
                            onClickViewCertificate(application.certificateId)
                          }
                          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
                        >
                          <BsEye className="mr-2" />
                          View Certificate
                        </button>

                        <a
                          href={application.certificateId}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                        >
                          <BsDownload className="mr-2" />
                          Download Certificate
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white ${
                      currentPage === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">{indexOfFirstApp + 1}</span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(indexOfLastApp, filteredApplications.length)}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {filteredApplications.length}
                      </span>{" "}
                      results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                          currentPage === 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <span className="sr-only">Previous</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {/* Page numbers */}
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <button
                              key={i}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === pageNum
                                  ? "z-10 bg-emerald-50 border-emerald-500 text-emerald-600"
                                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                          currentPage === totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <span className="sr-only">Next</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </nav>
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

export default Completed;
