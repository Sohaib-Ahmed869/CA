import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getApplications } from "../../Customer/Services/adminServices";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import { FaArchive, FaSearch, FaRedo, FaArrowLeft } from "react-icons/fa";
import { BiRefresh, BiTime } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDeleteOutline, MdRestoreFromTrash } from "react-icons/md";

const ArchivedApplications = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [confirmUnarchive, setConfirmUnarchive] = useState(null);
  const URL = import.meta.env.VITE_REACT_BACKEND_URL;

  // Fetch archived applications
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await getApplications();
      const archivedApplications = response.filter(
        (app) => app.archive === true
      );
      setApplications(archivedApplications);
    } catch (error) {
      console.error("Error fetching archived applications:", error);
      toast.error("Failed to fetch archived applications");
    }
    setLoading(false);
  };

  const handleUnarchive = async (applicationId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${URL}/api/applications/unArchiveApplication/${applicationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Application restored successfully");
        setApplications(applications.filter((app) => app.id !== applicationId));
        setConfirmUnarchive(null);
      } else {
        toast.error("Failed to restore application");
      }
    } catch (error) {
      console.error("Error unarchiving application:", error);
      toast.error("Failed to restore application");
    }
    setLoading(false);
  };

  // Format date in a user-friendly way
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

  // Apply search and sorting
  const filteredApplications = applications
    .filter((application) => {
      if (!searchTerm) return true;

      const searchLower = searchTerm.toLowerCase();
      return (
        application.applicationId?.toLowerCase().includes(searchLower) ||
        application.user?.firstName?.toLowerCase().includes(searchLower) ||
        application.user?.lastName?.toLowerCase().includes(searchLower) ||
        application.isf?.lookingForWhatQualification
          ?.toLowerCase()
          .includes(searchLower) ||
        application.isf?.industry?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      let comparison = 0;

      if (sortBy === "date") {
        comparison =
          new Date(b.status?.[0]?.time || 0) -
          new Date(a.status?.[0]?.time || 0);
      } else if (sortBy === "name") {
        comparison = `${a.user?.firstName} ${a.user?.lastName}`.localeCompare(
          `${b.user?.firstName} ${b.user?.lastName}`
        );
      } else if (sortBy === "qualification") {
        comparison = (a.isf?.lookingForWhatQualification || "").localeCompare(
          b.isf?.lookingForWhatQualification || ""
        );
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

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
    <div className="min-h-screen bg-gray-50">
      {loading && <SpinnerLoader />}
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 py-16 px-4 sm:px-6 lg:px-8 relative">
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
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8 bg-white p-4 rounded-xl shadow-md">
            <FaArchive className="h-20 w-20 md:h-24 md:w-24 text-emerald-600" />
          </div>
          <div className="text-center md:text-left text-white">
            <h1 className="text-3xl font-bold mb-2">Archived Applications</h1>
            <p className="text-emerald-100 max-w-2xl">
              View and manage previously archived applications. You can search,
              sort, and restore applications back to the active system when
              needed.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Controls and filters */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex gap-3">
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none transition-all"
                  onClick={fetchApplications}
                >
                  <BiRefresh className="mr-2" />
                  Refresh
                </button>
              </div>
              <div className="flex flex-col lg:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-grow lg:min-w-[250px]">
                  <HiOutlineSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Search by ID, name or qualification..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="qualification">Sort by Qualification</option>
                </select>
                <button
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-all"
                  onClick={() =>
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                  }
                >
                  {sortDirection === "asc" ? "↑ Ascending" : "↓ Descending"}
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              {filteredApplications.length} archived application
              {filteredApplications.length !== 1 ? "s" : ""} found
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {filteredApplications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="bg-gray-100 p-6 rounded-full mb-6">
                <AiOutlineFileSearch className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No archived applications found
              </h3>
              <p className="text-gray-500 mb-6 text-center max-w-md">
                {searchTerm
                  ? "Try adjusting your search criteria or clear filters to see all archived applications."
                  : "When you archive applications, they will appear here for future reference."}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-all"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
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
                      </div>
                      <div className="text-xs font-normal text-gray-400 normal-case mt-1">
                        Date Archived
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center">
                        <span>Customer</span>
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
                      onClick={() => handleSort("qualification")}
                    >
                      <div className="flex items-center">
                        <span>Qualification</span>
                        {sortBy === "qualification" && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-normal text-gray-400 normal-case mt-1">
                        Industry
                      </div>
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
                  {filteredApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">
                            #{application.applicationId || application.id}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 flex items-center">
                            <BiTime className="mr-1" />
                            {formatDate(application.status?.[0]?.time)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {application.user?.firstName?.[0]}
                            {application.user?.lastName?.[0]}
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
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {confirmUnarchive === application.id ? (
                          <div className="flex items-center justify-end space-x-2">
                            <span className="text-xs text-gray-500">
                              Confirm?
                            </span>
                            <button
                              onClick={() => setConfirmUnarchive(null)}
                              className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleUnarchive(application.id)}
                              className="inline-flex items-center px-2 py-1 border border-transparent text-xs rounded-md text-white bg-green-600 hover:bg-green-700"
                            >
                              Confirm
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmUnarchive(application.id)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            title="Restore application"
                          >
                            <MdRestoreFromTrash className="mr-1.5" />
                            Restore
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchivedApplications;
