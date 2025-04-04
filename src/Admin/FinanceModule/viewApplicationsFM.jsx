import React, { useEffect, useState } from "react";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import applicationsimg from "../../assets/applications.png";
import Papa from "papaparse";

// Import Lucide React icons for consistent styling
import {
  DownloadCloud,
  Eye,
  Edit,
  X,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  DollarSign,
  Receipt,
  Search,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import {
  AddExpense,
  UpdateExpense,
} from "../../Customer/Services/adminServices";

const URL = import.meta.env.VITE_REACT_BACKEND_URL;

const calculateRemainingBalance = (price, amountPaid) => {
  const total = parseFloat(price.replace(/,/g, ""));
  const paid = parseFloat(amountPaid);
  return (total - paid).toFixed(2);
};

const Application = ({
  application,
  setSelectedApplication,
  getFinancialApplications,
}) => {
  const [viewIntakeForm, setViewIntakeForm] = useState(false);
  const [viewDocuments, setViewDocuments] = useState(false);
  const [documentLinks, setDocumentLinks] = useState([]);

  const onClickViewDocuments = async () => {
    const documentKeys = [
      "license",
      "passport",
      "birth_certificate",
      "medicare",
      "creditcard",
      "resume",
      "previousQualifications",
      "reference1",
      "reference2",
      "employmentLetter",
      "payslip",
      "idCard",
      "australian_citizenship",
      "image1",
      "image2",
      "image3",
      "image4",
      "video1",
      "video2",
    ];

    const links = documentKeys
      .map((docKey) => ({
        name: docKey,
        url: application.document?.[docKey],
      }))
      .filter((doc) => doc.url);

    setDocumentLinks(links);
    setViewDocuments(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 xl:p-10 w-full">
      <button
        onClick={() => setSelectedApplication(null)}
        className="bg-green-50 hover:bg-green-100 text-green-800 font-medium px-4 py-2 rounded-md flex items-center gap-2 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Applications
      </button>

      {/* Application Header Card */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-xl shadow-md mb-6">
        <div className="p-6 text-white">
          <div className="flex flex-col items-center justify-center text-center mb-4">
            <h1 className="text-2xl font-bold">
              Application #{application.applicationId}
            </h1>
            <p className="text-green-100 mt-1">
              Submitted by {application.user.firstName}{" "}
              {application.user.lastName} on{" "}
              {application.status[0].time.split("T")[0]}
            </p>
            <h2 className="text-xl font-semibold mt-4">
              {application.isf.lookingForWhatQualification}
            </h2>
          </div>
        </div>
      </div>

      {/* Application Details Card */}
      <div className="bg-white rounded-xl shadow-md border border-green-50 mb-6">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Application details */}
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <FileText size={18} className="mr-2 text-green-700" />
                  Initial Screening Information
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-medium text-gray-600">
                      First Name:
                    </span>{" "}
                    {application.user.firstName}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">
                      Last Name:
                    </span>{" "}
                    {application.user.lastName}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Industry:</span>{" "}
                    {application.isf.industry}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">
                      Qualification:
                    </span>{" "}
                    {application.isf.qualification || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">
                      Years of Experience:
                    </span>{" "}
                    {application.isf.yearsOfExperience}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">
                      Location of Experience:
                    </span>{" "}
                    {application.isf.locationOfExperience}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">
                      Terms and Conditions:
                    </span>{" "}
                    <span
                      className={
                        application.user.toc ? "text-green-600" : "text-red-600"
                      }
                    >
                      {application.user.toc ? "Agreed" : "Not Agreed"}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Receipt size={18} className="mr-2 text-green-700" />
                  Contact Information
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center">
                    <span className="font-medium text-gray-600 mr-2">
                      Phone:
                    </span>{" "}
                    +{application.user.phone}
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium text-gray-600 mr-2">
                      Email:
                    </span>{" "}
                    {application.user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Right column - Actions */}
            <div className="flex flex-col justify-center items-center gap-4">
              <button
                onClick={onClickViewDocuments}
                className="bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center gap-2 w-64 transition-colors"
              >
                <FileText size={18} />
                View Documents
              </button>
              <button
                onClick={() => setViewIntakeForm(true)}
                className="bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center gap-2 w-64 transition-colors"
              >
                <FileText size={18} />
                View Intake Form
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Modal */}
      {viewDocuments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FileText size={20} className="mr-2 text-green-700" />
                Documents
              </h2>
              <button
                onClick={() => setViewDocuments(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mt-4">
              {documentLinks.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  No documents uploaded for this application
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentLinks.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center p-3 border border-green-100 rounded-md hover:bg-green-50 transition-colors"
                  >
                    <FileText size={18} className="mr-2 text-green-700" />
                    <span className="text-green-700 font-medium">
                      {doc.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setViewDocuments(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Intake Form Modal */}
      {viewIntakeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FileText size={20} className="mr-2 text-green-700" />
                Student Intake Form
              </h2>
              <button
                onClick={() => setViewIntakeForm(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <p>
                  <span className="font-medium text-gray-600">First Name:</span>{" "}
                  {application.user.firstName}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Last Name:</span>{" "}
                  {application.user.lastName}
                </p>
                <p>
                  <span className="font-medium text-gray-600">USI:</span>{" "}
                  {application.sif?.USI || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Gender:</span>{" "}
                  {application.sif?.gender || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    Date of Birth:
                  </span>{" "}
                  {application.sif?.dob || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    Home Address:
                  </span>{" "}
                  {application.sif?.homeAddress || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Suburb:</span>{" "}
                  {application.sif?.suburb || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Postcode:</span>{" "}
                  {application.sif?.postcode || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Country:</span>{" "}
                  {application.user.country || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-gray-600">State:</span>{" "}
                  {application.sif?.state || "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setViewIntakeForm(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FinanceManagement = () => {
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [otherselectedApplication, setOtherSelectedApplication] =
    useState(null);
  const [addExpenseModal, setAddExpenseModal] = useState(false);
  const [updateExpenseModal, setUpdateExpenseModal] = useState(false);
  const [newExpense, setNewExpense] = useState(0);
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [viewExpensesModal, setViewExpensesModal] = useState(false);
  const [selectedExpenses, setSelectedExpenses] = useState([]);

  // Function to view expenses for an application
  // const handleViewExpenses = (application) => {
  //   setSelectedExpenses(application.expenses || []);
  //   setViewExpensesModal(true);
  // };
  const handleViewExpenses = (application) => {
    const isfExpenseEntry = application.isf?.expense
      ? {
          amount: application.isf.expense.toString(),
          description: "Default Expense",
          date:
            application.createdAt?.split("T")[0] ||
            new Date().toISOString().split("T")[0],
          id: "isf-default",
          createdAt: application.createdAt || new Date().toISOString(),
        }
      : null;

    const combinedExpenses = [
      ...(isfExpenseEntry ? [isfExpenseEntry] : []),
      ...(application.expenses || []),
    ];

    setSelectedExpenses(combinedExpenses);
    setViewExpensesModal(true);
  };
  const itemsPerPage = 10;

  const getFinancialApplications = async () => {
    try {
      setSubmissionLoading(true);
      const response = await fetch(`${URL}/api/admin/applications`);
      if (!response.ok) throw new Error("Failed to fetch applications");

      let applicationsData = await response.json();

      // Filter only paid applications (partial or full)
      applicationsData = applicationsData.filter(
        (app) => app.paid || app.full_paid
      );

      // Sort by most recent first
      applicationsData.sort(
        (a, b) => new Date(b.status[0].time) - new Date(a.status[0].time)
      );

      setApplications(applicationsData);
      setFilteredApplications(applicationsData);
      setSubmissionLoading(false);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      toast.error("Failed to load applications");
      setSubmissionLoading(false);
    }
  };

  useEffect(() => {
    getFinancialApplications();
  }, []);

  const searchByIDorName = () => {
    if (search === "") {
      setFilteredApplications(applications);
      return;
    }
    const searchValue = search.toLowerCase();
    const filtered = applications.filter(
      (app) =>
        app.applicationId?.toLowerCase().includes(searchValue) ||
        app.user?.firstName?.toLowerCase().includes(searchValue) ||
        app.user?.lastName?.toLowerCase().includes(searchValue)
    );
    setFilteredApplications(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    searchByIDorName();
  }, [search]);

  // Add Expense
  // const handleAddExpense = async () => {
  //   if (!expense.amount || !expense.description) {
  //     toast.error("Please fill all fields");
  //     return;
  //   }

  //   try {
  //     setSubmissionLoading(true);
  //     const response = await fetch(
  //       `${URL}/api/applications/expense/${selectedApplication.id}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(expense),
  //       }
  //     );

  //     if (!response.ok) throw new Error("Failed to add expense");

  //     toast.success("Expense added successfully");
  //     setAddExpenseModal(false);
  //     setExpense({
  //       amount: "",
  //       description: "",
  //       date: new Date().toISOString().split("T")[0],
  //     });
  //     await getFinancialApplications();
  //   } catch (error) {
  //     console.error("Failed to add expense:", error);
  //     toast.error("Failed to add expense");
  //   } finally {
  //     setSubmissionLoading(false);
  //   }
  // };
  const handleAddExpense = async () => {
    if (!expense.amount || !expense.description) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setSubmissionLoading(true);
      const response = await AddExpense(selectedApplication.id, expense);

      if (response.error)
        throw new Error(response.message || "Failed to add expense");

      toast.success("Expense added successfully");
      setAddExpenseModal(false);
      setExpense({
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
      await getFinancialApplications();
    } catch (error) {
      console.error("Failed to add expense:", error);
      toast.error(error.message || "Failed to add expense");
    } finally {
      setSubmissionLoading(false);
    }
  };
  // UpdateExpense
  const handleUpdateExpense = async () => {
    if (!newExpense) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setSubmissionLoading(true);

      const response = await UpdateExpense(selectedApplication.id, newExpense);

      if (response.error)
        throw new Error(response.message || "Failed to add expense");

      toast.success("Expense added successfully");
      setUpdateExpenseModal(false);
      setNewExpense("");
      await getFinancialApplications();
    } catch (error) {
      console.error("Failed to add expense:", error);
      toast.error(error.message || "Failed to add expense");
    } finally {
      setSubmissionLoading(false);
    }
  };

  const totalItems = filteredApplications.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredApplications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const ExportButton = () => {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
      try {
        setIsExporting(true);
        const dataToExport = applications.map((app) => ({
          "Application ID": app.applicationId,
          Date: app.status[0].time.split("T")[0],
          Customer: `${app.user.firstName} ${app.user.lastName}`,
          "Total Price": app.price,
          "Payment Status": app.full_paid ? "Fully Paid" : "Partially Paid",
          "Amount Paid": app.amount_paid,
          "Remaining Balance": app.full_paid
            ? "0"
            : calculateRemainingBalance(app.price, app.amount_paid),
          "Total Expenses": app.expenses
            ? app.expenses
                .reduce((sum, exp) => sum + parseFloat(exp.amount), 0)
                .toFixed(2)
            : "0",
        }));

        const csv = Papa.unparse(dataToExport);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `financial_report_${
          new Date().toISOString().split("T")[0]
        }.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("Financial report exported successfully");
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
        {isExporting ? "Exporting..." : "Export Financial Report"}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 xl:p-10 w-full animate-fade">
      {submissionLoading && <SpinnerLoader />}
      <Toaster />

      {otherselectedApplication ? (
        <Application
          application={otherselectedApplication}
          setSelectedApplication={setOtherSelectedApplication}
          getFinancialApplications={getFinancialApplications}
        />
      ) : (
        <div>
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
                <h1 className="text-2xl font-bold text-white">
                  Financial Management
                </h1>
                <p className="text-green-100 mt-1">
                  View and manage financial information for paid applications
                </p>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-green-50 mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="w-full md:w-auto">
                <label
                  htmlFor="search"
                  className="flex items-center text-sm font-medium text-gray-700 mb-2"
                >
                  <Search size={16} className="mr-1" />
                  Search by ID or Name
                </label>
                <input
                  type="text"
                  id="search"
                  className="w-full md:w-64 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <ExportButton />
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-sm border border-green-50 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-50 border-b border-green-100">
                    <th className="font-semibold text-green-800 p-4 text-left">
                      ID
                    </th>
                    <th className="font-semibold text-green-800 p-4 text-left">
                      Date
                    </th>
                    <th className="font-semibold text-green-800 p-4 text-left">
                      Student{" "}
                    </th>
                    <th className="font-semibold text-green-800 p-4 text-center">
                      Total Price
                    </th>
                    <th className="font-semibold text-green-800 p-4 text-center">
                      Payment Status
                    </th>
                    <th className="font-semibold text-green-800 p-4 text-center">
                      Amount Paid
                    </th>
                    <th className="font-semibold text-green-800 p-4 text-center">
                      Remaining Balance
                    </th>
                    <th className="font-semibold text-green-800 p-4 text-center">
                      Default Expenses
                    </th>
                    <th className="font-semibold text-green-800 p-4 text-center">
                      Total Expenses
                    </th>
                    <th className="font-semibold text-green-800 p-4 text-center">
                      Manage Expenses
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((application) => (
                    <tr
                      key={application.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 text-gray-800">
                        <div className="flex items-center">
                          {application.applicationId}
                          <button
                            onClick={() =>
                              setOtherSelectedApplication(application)
                            }
                            className="ml-2 text-green-600 hover:text-green-800"
                            title="View Application"
                          >
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-gray-800">
                        {application.status[0].time.split("T")[0]}
                      </td>
                      <td className="p-4 text-gray-800">{`${application.user.firstName} ${application.user.lastName}`}</td>
                      <td className="p-4 text-center font-medium">
                        ${application.price}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            application.partialScheme
                              ? application.full_paid
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                              : application.paid
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {application.partialScheme
                            ? application.full_paid
                              ? "Fully Paid"
                              : "Partially Paid"
                            : application.paid
                            ? "Fully Paid"
                            : "Not Paid"}
                        </span>
                      </td>
                      <td className="p-4 text-center font-medium">
                        $
                        {application.partialScheme
                          ? application.payment1
                          : application.price}
                      </td>
                      <td className="p-4 text-center font-medium">
                        $
                        {application.partialScheme
                          ? application.full_paid
                            ? "0"
                            : calculateRemainingBalance(
                                application.price,
                                application.amount_paid
                              )
                          : "0"}
                      </td>
                      <td className="p-4 text-center font-medium">
                        ${application.isf.expense}
                      </td>
                      <td className="p-4 text-center font-medium">
                        $
                        {(
                          parseFloat(application.isf?.expense || 0) +
                          (application.expenses?.reduce(
                            (sum, exp) => sum + parseFloat(exp.amount),
                            0
                          ) || 0)
                        ).toFixed(2)}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded flex items-center gap-1 text-sm"
                            onClick={() => {
                              setSelectedApplication(application);
                              setNewExpense(application.isf.expense);
                              setUpdateExpenseModal(true);
                            }}
                            title="Update Expense"
                          >
                            <PlusCircle size={14} />
                            <span className="hidden md:inline">Update</span>
                          </button>
                          <button
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded flex items-center gap-1 text-sm"
                            onClick={() => {
                              setSelectedApplication(application);
                              setAddExpenseModal(true);
                            }}
                            title="Add Expense"
                          >
                            <PlusCircle size={14} />
                            <span className="hidden md:inline">
                              Add Expense
                            </span>
                          </button>
                          <button
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded flex items-center gap-1 text-sm"
                            onClick={() => handleViewExpenses(application)}
                            // disabled={!application.expenses?.length  }
                            // disabled={application.isf.expense <= 0}
                            title="View Expenses"
                          >
                            <Eye size={14} />
                            <span className="hidden md:inline">View</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {currentItems.length === 0 && (
                    <tr>
                      <td
                        colSpan="9"
                        className="text-center py-8 text-gray-500"
                      >
                        No financial data available
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

          {/* View Expenses Modal */}
          {viewExpensesModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <Receipt size={20} className="mr-2 text-green-700" />
                    Expense Details
                  </h2>
                  <button
                    onClick={() => setViewExpensesModal(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-green-50 border-b border-green-100">
                        <th className="font-semibold text-green-800 p-3 text-left">
                          Date
                        </th>
                        <th className="font-semibold text-green-800 p-3 text-right">
                          Amount
                        </th>
                        <th className="font-semibold text-green-800 p-3 text-left">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedExpenses.map((expense, index) => (
                        <tr
                          key={expense.id || index}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="p-3 text-gray-800">
                            {new Date(expense.date).toLocaleDateString()}
                          </td>
                          <td className="p-3 text-right font-medium">
                            ${parseFloat(expense.amount).toFixed(2)}
                          </td>
                          <td className="p-3 text-gray-800">
                            {expense.description}
                          </td>
                        </tr>
                      ))}

                      {selectedExpenses.length === 0 && (
                        <tr>
                          <td
                            colSpan="3"
                            className="text-center py-8 text-gray-500"
                          >
                            No expenses found for this application
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="bg-green-50">
                        <td className="p-3 font-semibold text-green-800">
                          Total
                        </td>
                        <td
                          colSpan="2"
                          className="p-3 text-right font-semibold text-green-800"
                        >
                          $
                          {selectedExpenses
                            .reduce(
                              (sum, exp) => sum + parseFloat(exp.amount),
                              0
                            )
                            .toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setViewExpensesModal(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-md transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Add Expense Modal */}
          {addExpenseModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <PlusCircle size={20} className="mr-2 text-green-700" />
                    Add Expense
                  </h2>
                  <button
                    onClick={() => {
                      setAddExpenseModal(false);
                      setSelectedApplication(null);
                    }}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      value={expense.amount}
                      onChange={(e) =>
                        setExpense({ ...expense, amount: e.target.value })
                      }
                      placeholder="Enter amount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      value={expense.description}
                      onChange={(e) =>
                        setExpense({ ...expense, description: e.target.value })
                      }
                      placeholder="Enter expense description"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      value={expense.date}
                      onChange={(e) =>
                        setExpense({ ...expense, date: e.target.value })
                      }
                    />
                  </div>

                  <button
                    className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-2 rounded-md transition-colors mt-4"
                    onClick={handleAddExpense}
                  >
                    Add Expense
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Add Expense Modal */}
          {updateExpenseModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <PlusCircle size={20} className="mr-2 text-green-700" />
                    Update Expense
                  </h2>
                  <button
                    onClick={() => {
                      setUpdateExpenseModal(false);
                      setSelectedApplication(null);
                    }}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Update Expense Amount
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      value={newExpense}
                      onChange={(e) => {
                        setNewExpense(e.target.value);
                      }}
                      placeholder="Enter expense amount"
                    />
                  </div>

                  <button
                    className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-2 rounded-md transition-colors mt-4"
                    onClick={handleUpdateExpense}
                  >
                    Update Expense
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FinanceManagement;
