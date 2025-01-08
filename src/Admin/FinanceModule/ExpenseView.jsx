import React, { useEffect, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import applicationsimg from "../../assets/applications.png";
import Papa from "papaparse";

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
        className="btn btn-primary text-white flex items-center gap-2"
        disabled={isExporting}
      >
        {isExporting ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <BiDownload className="text-xl" />
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
    <div className="p-3 overflow-x-auto">
      {submissionLoading && <SpinnerLoader />}
      <Toaster />

      <div className="flex items-center gap-4 mb-5 lg:flex-row flex-col">
        <img src={applicationsimg} alt="Applications" className="h-36" />
        <div className="flex flex-col lg:w-1/2 w-full">
          <h1 className="text-3xl font-bold">Expenses Overview</h1>
          <p className="text-sm mt-2">
            Track and manage all expenses across applications.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="text-lg font-semibold">
            Total Expenses:{" "}
            <span className="text-primary">${totalExpenses.toFixed(2)}</span>
          </div>
          <div className="text-lg">
            Total Applications with Expenses:{" "}
            <span className="font-semibold">{applications.length}</span>
          </div>
        </div>
      </div>

      <div className="flex items-start flex-wrap mb-4 gap-4">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="search" className="text-sm block mb-2">
            Search by ID, Name or Description
          </label>
          <input
            type="text"
            id="search"
            className="input input-bordered w-full"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm block mb-2">Date Range</label>
          <div className="flex gap-2">
            <input
              type="date"
              className="input input-bordered flex-1"
              value={dateFilter.start}
              onChange={(e) =>
                setDateFilter({ ...dateFilter, start: e.target.value })
              }
            />
            <input
              type="date"
              className="input input-bordered flex-1"
              value={dateFilter.end}
              onChange={(e) =>
                setDateFilter({ ...dateFilter, end: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex-none self-end">
          <ExportButton />
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-300 rounded-md">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="font-semibold p-5">Date</th>
              <th className="font-semibold">Application ID</th>
              <th className="font-semibold">Customer</th>
              <th className="font-semibold">Qualification</th>
              <th className="font-semibold">Description</th>
              <th className="font-semibold text-right">Amount</th>
              <th className="font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((expense) => (
              <tr key={expense.id} className="animate-fade-up hover:bg-gray-50">
                <td className="p-5">{expense.date}</td>
                <td>{expense.applicationId}</td>
                <td>
                  <div>
                    <div>{expense.customerName}</div>
                    <div className="text-sm text-gray-500">
                      {expense.customerEmail}
                    </div>
                  </div>
                </td>
                <td>{expense.qualification}</td>
                <td>{expense.description}</td>
                <td className="text-right">
                  ${parseFloat(expense.amount).toFixed(2)}
                </td>
                <td className="text-center">
                  <span
                    className={`badge ${
                      expense.applicationStatus === "Completed"
                        ? "badge-success"
                        : expense.applicationStatus === "Waiting for Payment"
                        ? "badge-warning"
                        : "badge-info"
                    }`}
                  >
                    {expense.applicationStatus}
                  </span>
                </td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No expenses found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between gap-4 p-4 bg-white">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="btn btn-primary btn-sm"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="btn btn-primary btn-sm"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpensesDashboard;
