import React, { useEffect, useState } from "react";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import applicationsimg from "../../assets/applications.png";
import Papa from "papaparse";

// Import Lucide React icons for consistent styling
import {
  DownloadCloud,
  Search,
  Calendar,
  DollarSign,
  FileText,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const URL = import.meta.env.VITE_REACT_BACKEND_URL;

const ExpensesDashboard = () => {
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState({ start: "", end: "" });
  const [totalExpenses, setTotalExpenses] = useState(0);

  const itemsPerPage = 10;

  // Fetch all applications with expenses
  const getApplicationsWithExpenses = async () => {
    try {
      setSubmissionLoading(true);
      const response = await fetch(`${URL}/api/admin/applications`);
      if (!response.ok) throw new Error("Failed to fetch applications");

      let applicationsData = await response.json();

      // Filter only applications that have expenses
      applicationsData = applicationsData.filter(
        (app) => app.expenses && app.expenses.length > 0
      );

      // Flatten expenses array with application details
      let allExpenses = [];
      applicationsData.forEach((app) => {
        app.expenses.forEach((expense) => {
          allExpenses.push({
            ...expense,
            applicationId: app.applicationId,
            customerName: `${app.user.firstName} ${app.user.lastName}`,
            customerEmail: app.user.email,
            qualification: app.isf.lookingForWhatQualification,
            applicationStatus: app.currentStatus,
          });
        });
      });

      // Sort by most recent expenses
      allExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));

      setApplications(applicationsData);
      setFilteredExpenses(allExpenses);

      // Calculate total expenses
      const total = allExpenses.reduce(
        (sum, expense) => sum + parseFloat(expense.amount),
        0
      );
      setTotalExpenses(total);

      setSubmissionLoading(false);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
      toast.error("Failed to load expenses");
      setSubmissionLoading(false);
    }
  };

  useEffect(() => {
    getApplicationsWithExpenses();
  }, []);

  const searchExpenses = () => {
    let filtered = [];

    if (applications.length > 0) {
      applications.forEach((app) => {
        app.expenses.forEach((expense) => {
          const searchStr = search.toLowerCase();
          const matchesSearch =
            app.applicationId?.toLowerCase().includes(searchStr) ||
            app.user.firstName?.toLowerCase().includes(searchStr) ||
            app.user.lastName?.toLowerCase().includes(searchStr) ||
            expense.description?.toLowerCase().includes(searchStr);

          const matchesDateFilter =
            (!dateFilter.start ||
              new Date(expense.date) >= new Date(dateFilter.start)) &&
            (!dateFilter.end ||
              new Date(expense.date) <= new Date(dateFilter.end));

          if (matchesSearch && matchesDateFilter) {
            filtered.push({
              ...expense,
              applicationId: app.applicationId,
              customerName: `${app.user.firstName} ${app.user.lastName}`,
              customerEmail: app.user.email,
              qualification: app.isf.lookingForWhatQualification,
              applicationStatus: app.currentStatus,
            });
          }
        });
      });
    }

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    setFilteredExpenses(filtered);
    setCurrentPage(1);

    // Update total for filtered results
    const total = filtered.reduce(
      (sum, expense) => sum + parseFloat(expense.amount),
      0
    );
    setTotalExpenses(total);
  };

  useEffect(() => {
    searchExpenses();
  }, [search, dateFilter]);

  const ExportButton = () => {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
      try {
        setIsExporting(true);
        const dataToExport = filteredExpenses.map((expense) => ({
          "Application ID": expense.applicationId,
          Date: expense.date,
          Customer: expense.customerName,
          Qualification: expense.qualification,
          Description: expense.description,
          Amount: expense.amount,
          "Application Status": expense.applicationStatus,
        }));

        const csv = Papa.unparse(dataToExport);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `expenses_report_${
          new Date().toISOString().split("T")[0]
        }.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("Expenses report exported successfully");
      } catch (error) {
        console.error("Error exporting data:", error);
        toast.error("Failed to export data");
      } finally {
        setIsExporting(false);
      }
    };

    return (
      <button
        onClick={handleExport}
        className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors shadow-sm"
        disabled={isExporting}
      >
        {isExporting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <DownloadCloud size={18} />
        )}
        {isExporting ? "Exporting..." : "Export Expenses"}
      </button>
    );
  };

  // Pagination
  const totalItems = filteredExpenses.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredExpenses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 xl:p-10 w-full animate-fade">
      {submissionLoading && <SpinnerLoader />}
      <Toaster />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-xl shadow-md mb-6">
        <div className="flex items-center gap-6 flex-col sm:flex-row p-6">
          <div className="bg-white p-4 rounded-full flex-shrink-0">
            <img
              src={applicationsimg}
              alt="Applications"
              className="h-16 w-16 object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Expenses Overview</h1>
            <p className="text-green-100 mt-1">
              Track and manage all expenses across applications
            </p>
          </div>
        </div>
      </div>

      {/* Stats Summary Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-green-50 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <DollarSign className="text-green-700 mr-2" size={24} />
            <div>
              <div className="text-sm text-gray-500">Total Expenses</div>
              <div className="text-2xl font-bold text-green-800">
                ${totalExpenses.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <FileText className="text-green-700 mr-2" size={24} />
            <div>
              <div className="text-sm text-gray-500">
                Applications with Expenses
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {applications.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-green-50 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="search"
              className="flex items-center text-sm font-medium text-gray-700 mb-2"
            >
              <Search size={16} className="mr-1" />
              Search by ID, Name or Description
            </label>
            <input
              type="text"
              id="search"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="md:col-span-1">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar size={16} className="mr-1" />
              Start Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={dateFilter.start}
              onChange={(e) =>
                setDateFilter({ ...dateFilter, start: e.target.value })
              }
            />
          </div>

          <div className="md:col-span-1">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar size={16} className="mr-1" />
              End Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={dateFilter.end}
              onChange={(e) =>
                setDateFilter({ ...dateFilter, end: e.target.value })
              }
            />
          </div>

          <div className="md:col-span-3 flex justify-end">
            <ExportButton />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-green-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-green-50 border-b border-green-100">
                <th className="font-semibold text-green-800 p-4 text-left">
                  Date
                </th>
                <th className="font-semibold text-green-800 p-4 text-left">
                  Application ID
                </th>
                <th className="font-semibold text-green-800 p-4 text-left">
                  Student{" "}
                </th>
                <th className="font-semibold text-green-800 p-4 text-left">
                  Qualification
                </th>
                <th className="font-semibold text-green-800 p-4 text-left">
                  Description
                </th>
                <th className="font-semibold text-green-800 p-4 text-right">
                  Amount
                </th>
                <th className="font-semibold text-green-800 p-4 text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((expense) => (
                <tr
                  key={expense.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-gray-800">{expense.date}</td>
                  <td className="p-4 text-gray-800">{expense.applicationId}</td>
                  <td className="p-4">
                    <div className="text-gray-800">{expense.customerName}</div>
                    <div className="text-sm text-gray-500">
                      {expense.customerEmail}
                    </div>
                  </td>
                  <td className="p-4 text-gray-800">{expense.qualification}</td>
                  <td className="p-4 text-gray-800">{expense.description}</td>
                  <td className="p-4 text-right font-medium">
                    ${parseFloat(expense.amount).toFixed(2)}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        expense.applicationStatus === "Completed"
                          ? "bg-green-100 text-green-800"
                          : expense.applicationStatus === "Waiting for Payment"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {expense.applicationStatus}
                    </span>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    No expenses found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-gray-100">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors disabled:opacity-50 disabled:pointer-events-none"
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className="text-sm text-gray-500">
            Page {currentPage} of {Math.max(1, totalPages)}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors disabled:opacity-50 disabled:pointer-events-none"
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpensesDashboard;
