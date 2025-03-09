import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaEye,
  FaUser,
  FaCalendarAlt,
  FaGraduationCap,
  FaMoneyBillWave,
  FaStickyNote,
  FaFileAlt,
} from "react-icons/fa";
import { BiRefresh, BiSearch } from "react-icons/bi";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import toast from "react-hot-toast";
import { getApplications } from "../../Customer/Services/adminServices";
import applicationsImg from "../../assets/applications.png";

const ViewApplicationModal = ({ application, onClose }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const calculateDiscountedPrice = (price) => {
    if (!price) return 0;
    if (!application.discount) return price;
    const cleanPrice = parseFloat(price.toString().replace(/,/g, ""));
    return (cleanPrice - application.discount).toFixed(2);
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-11/12 max-w-5xl h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
        <div className="sticky top-0 bg-white z-10 pb-4 border-b border-gray-200 mb-4">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <FaTimes />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">
            Application #{application.applicationId || application.id}
          </h2>
          <p className="text-sm text-gray-600">
            Submitted on {formatDate(application.status?.[0]?.time)}
          </p>
        </div>

        <div className="space-y-6 mt-4 px-2">
          {/* Status and Payment */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaFileAlt className="mr-2 text-emerald-600" />
                Status and Payment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-600">Current Status</p>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      {application.currentStatus}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Payment Status</p>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                        application.paid
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {application.paid ? "Paid" : "Unpaid"}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Original Price</p>
                  <p className="text-gray-800">${application.price}</p>
                </div>
                {application.discount > 0 && (
                  <>
                    <div>
                      <p className="font-medium text-gray-600">
                        Discount Applied
                      </p>
                      <p className="text-gray-800">${application.discount}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Final Price</p>
                      <p className="text-gray-800">
                        ${calculateDiscountedPrice(application.price)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaUser className="mr-2 text-emerald-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-600">Full Name</p>
                  <p className="text-gray-800">
                    {application.user?.firstName} {application.user?.lastName}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Email</p>
                  <p className="text-gray-800">{application.user?.email}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Phone</p>
                  <p className="text-gray-800">{application.user?.phone}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Country</p>
                  <p className="text-gray-800">
                    {application.user?.country || "Australia"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Initial Screening */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaGraduationCap className="mr-2 text-emerald-600" />
                Initial Screening
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-600">Industry</p>
                  <p className="text-gray-800">
                    {application.isf?.industry || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">
                    Desired Qualification
                  </p>
                  <p className="text-gray-800">
                    {application.isf?.lookingForWhatQualification || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">
                    Years of Experience
                  </p>
                  <p className="text-gray-800">
                    {application.isf?.yearsOfExperience || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">
                    Location of Experience
                  </p>
                  <p className="text-gray-800">
                    {application.isf?.locationOfExperience || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Formal Education</p>
                  <p className="text-gray-800">
                    {application.isf?.formalEducation ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Student Intake Form */}
          {application.sif && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FaFileAlt className="mr-2 text-emerald-600" />
                  Student Intake Form
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-600">USI</p>
                    <p className="text-gray-800">
                      {application.sif.USI || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Gender</p>
                    <p className="text-gray-800">
                      {application.sif.gender || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Date of Birth</p>
                    <p className="text-gray-800">
                      {application.sif.dob || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Address</p>
                    <p className="text-gray-800">
                      {application.sif.homeAddress || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Suburb</p>
                    <p className="text-gray-800">
                      {application.sif.suburb || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Postcode</p>
                    <p className="text-gray-800">
                      {application.sif.postcode || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">State</p>
                    <p className="text-gray-800">
                      {application.sif.state || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Assessor Notes */}
          {application.assessorNote && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FaStickyNote className="mr-2 text-emerald-600" />
                  Assessor Notes
                </h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="whitespace-pre-wrap text-gray-700">
                    {application.assessorNote}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Status History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaCalendarAlt className="mr-2 text-emerald-600" />
                Status History
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {application.status &&
                      application.status.map((status, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {status.statusname}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {formatDate(status.time)}
                          </td>
                        </tr>
                      ))}
                    {(!application.status ||
                      application.status.length === 0) && (
                      <tr>
                        <td
                          colSpan="2"
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No status history available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

const RTOApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const getApplicationsData = async () => {
    try {
      setLoading(true);
      const response = await getApplications();

      // Filter for applications that:
      // 1. Have been assessed (assessed === true)
      // 2. Are fully paid
      const assessedApplications = response.filter((app) => {
        const isAssessed = app.assessed === true;
        const isFullyPaid = app.partialScheme ? app.full_paid : app.paid;

        return isAssessed && isFullyPaid;
      });

      // Sort by newest applications first
      assessedApplications.sort(
        (a, b) => new Date(b.status?.[0]?.time) - new Date(a.status?.[0]?.time)
      );

      setApplications(assessedApplications);
      setFilteredApplications(assessedApplications);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplicationsData();
  }, []);

  // Handle search and filter changes
  useEffect(() => {
    let filtered = applications;

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.applicationId?.toLowerCase().includes(searchLower) ||
          app.user?.firstName?.toLowerCase().includes(searchLower) ||
          app.user?.lastName?.toLowerCase().includes(searchLower) ||
          app.isf?.lookingForWhatQualification
            ?.toLowerCase()
            .includes(searchLower)
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((app) => app.currentStatus === statusFilter);
    }

    setFilteredApplications(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [search, statusFilter, applications]);

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Get unique status options for filter
  const getStatusOptions = () => {
    const statuses = applications.map((app) => app.currentStatus);
    const uniqueStatuses = ["All", ...new Set(statuses.filter(Boolean))];
    return uniqueStatuses;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {loading && <SpinnerLoader />}

      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 py-8 px-4 sm:px-6 lg:px-8 shadow-md mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0 gap-3">
            <div className="flex-shrink-0 bg-white p-3 rounded-full">
              <img
                src={applicationsImg}
                alt="Applications"
                className="h-16 w-16"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                RTO Application Management
              </h1>
              <p className="text-emerald-100">
                Review applications that have been assessed and are ready for
                RTO processing
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

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Search applications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {getStatusOptions().map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <select
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
              >
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
              </select>
            </div>
          </div>

          <div className="mt-2 flex justify-between">
            <p className="text-sm text-gray-500">
              {filteredApplications.length} applications found
            </p>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Assessed Applications
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Applications that have been assessed and are ready for RTO
              processing
            </p>
          </div>

          {filteredApplications.length === 0 ? (
            <div className="text-center py-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No applications found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {search || statusFilter !== "All"
                  ? "Try adjusting your search filters."
                  : "There are no assessed applications at this time."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Application ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date Submitted
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Qualification
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Notes
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {app.applicationId || app.id}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {app.user?.firstName} {app.user?.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {app.user?.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">
                          {formatDate(app.status?.[0]?.time)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">
                          {app.isf?.lookingForWhatQualification || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {app.currentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {app.assessorNote || "No notes"}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        >
                          <FaEye className="mr-1" /> View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredApplications.length)}
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
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
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
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border ${
                          currentPage === i + 1
                            ? "z-10 bg-emerald-50 border-emerald-500 text-emerald-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
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
          )}
        </div>
      </div>

      {/* View Application Modal */}
      {selectedApplication && (
        <ViewApplicationModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
};

export default RTOApplications;
