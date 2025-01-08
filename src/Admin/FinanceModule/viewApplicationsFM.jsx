import React, { useEffect, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { GrFormAdd } from "react-icons/gr";
import applicationsimg from "../../assets/applications.png";
import Papa from "papaparse";

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
        url: application.document[docKey],
      }))
      .filter((doc) => doc.url);

    setDocumentLinks(links);
    setViewDocuments(true);
  };

  return (
    <div className="min-h-screen">
      <button onClick={() => setSelectedApplication(null)} className="btn-sm">
        Back
      </button>
      <div className="flex flex-col items-center justify-center p-16">
        <div className="col-span-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Application# {application.applicationId}
          </h1>
          <p className="text-sm text-gray-500">
            This application was submitted by {application.user.firstName}{" "}
            {application.user.lastName} on{" "}
            {application.status[0].time.split("T")[0]}
          </p>
          <h1 className="text-lg font-semibold text-gray-800 mt-4">
            {application.isf.lookingForWhatQualification}
          </h1>
        </div>

        <div className="col-span-4 bg-white p-4 rounded-lg shadow-lg w-full">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-sm text-gray-500">
              <h2 className="text-lg font-semibold text-gray-800">
                Initial Screening Information
              </h2>
              <p>First Name: {application.user.firstName}</p>
              <p>Last Name: {application.user.lastName}</p>
              <div>
                <h2 className="text-lg font-semibold">Contact Information</h2>
                <p className="flex items-center">
                  Phone: +{application.user.phone}
                </p>
                <p className="flex items-center">
                  Email: {application.user.email}
                </p>
              </div>

              <p>Industry: {application.isf.industry}</p>
              <p>Qualification: {application.isf.qualification || "N/A"}</p>
              <p>Years of Experience: {application.isf.yearsOfExperience}</p>
              <p>
                Location of Experience: {application.isf.locationOfExperience}
              </p>

              <p>
                Terms and Conditions:{" "}
                {application.user.toc ? "Agreed" : "Not Agreed"}
              </p>
            </div>
            <div className="text-sm text-gray-500 flex justify-end gap-2">
              <button
                onClick={onClickViewDocuments}
                className="btn-sm btn-primary rounded-xl flex items-center justify-center gap-2 text-white bg-primary px-4 py-5 w-64"
              >
                View Documents
              </button>
              <button
                onClick={() => setViewIntakeForm(true)}
                className="btn-sm rounded-xl flex items-center gap-2 btn-primary justify-center text-white bg-primary px-4 py-5 w-64"
              >
                View Intake Form
              </button>
            </div>
          </div>
        </div>

        {viewDocuments && (
          <dialog className="modal modal-open">
            <div className="col-span-4 bg-white p-4 rounded-lg shadow-lg">
              <button
                onClick={() => setViewDocuments(false)}
                className="mt-4 mr-4 float-right"
              >
                <FaTimes className="text-lg" />
              </button>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm text-gray-500">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Documents
                  </h2>
                  {documentLinks.length === 0 && (
                    <p>No documents uploaded for this application</p>
                  )}
                  {documentLinks.map((doc, index) => (
                    <p key={index}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline"
                      >
                        {doc.name}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </dialog>
        )}

        {viewIntakeForm && (
          <dialog className="modal modal-open">
            <div className="col-span-4 bg-white p-4 rounded-lg shadow-lg w-1/2">
              <button
                onClick={() => setViewIntakeForm(false)}
                className="mt-4 mr-4 float-right"
              >
                <FaTimes className="text-lg" />
              </button>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Student Intake Form
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="text-md text-gray-500">
                  <h2 className="text-lg font-semibold text-gray-800 mt-4">
                    Personal Information
                  </h2>
                  <div className="text-md text-gray-500 grid grid-cols-2">
                    <p>First Name: {application.user.firstName}</p>
                    <p>Last Name: {application.user.lastName}</p>
                    <p>USI: {application.sif?.USI}</p>
                    <p>Gender: {application.sif?.gender}</p>
                    <p>Date of Birth: {application.sif?.dob}</p>
                    <p>Home Address: {application.sif?.homeAddress}</p>
                    <p>Suburb: {application.sif?.suburb}</p>
                    <p>Postcode: {application.sif?.postcode}</p>
                    <p>Country: {application.user.country}</p>
                    <p>State: {application.sif?.state}</p>
                  </div>
                </div>
              </div>
            </div>
          </dialog>
        )}
      </div>
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
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [viewExpensesModal, setViewExpensesModal] = useState(false);
  const [selectedExpenses, setSelectedExpenses] = useState([]);

  // Add this function after your other functions
  const handleViewExpenses = (application) => {
    setSelectedExpenses(application.expenses || []);
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

  const handleAddExpense = async () => {
    if (!expense.amount || !expense.description) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setSubmissionLoading(true);
      const response = await fetch(
        `${URL}/api/applications/expense/${selectedApplication.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expense),
        }
      );

      if (!response.ok) throw new Error("Failed to add expense");

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
      toast.error("Failed to add expense");
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
        className="btn btn-primary text-white flex items-center gap-2"
        disabled={isExporting}
      >
        {isExporting ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <BiDownload className="text-xl" />
        )}
        {isExporting ? "Exporting..." : "Export Financial Report"}
      </button>
    );
  };

  return (
    <div className="p-3 overflow-x-auto">
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
          <div className="flex items-center gap-4 mb-5 lg:flex-row flex-col">
            <img src={applicationsimg} alt="Applications" className="h-36" />
            <div className="flex flex-col lg:w-1/2 w-full">
              <h1 className="text-3xl font-bold">Financial Management</h1>
              <p className="text-sm mt-2">
                View and manage financial information for paid applications.
              </p>
            </div>
          </div>

          <div className="flex items-start flex-col mb-4 gap-2">
            <div className="flex justify-between w-full">
              <div>
                <label htmlFor="search" className="text-sm">
                  Search by ID or Name
                </label>
                <input
                  type="text"
                  id="search"
                  className="input input-bordered w-full"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <ExportButton />
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-300 rounded-md">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="font-semibold p-5">ID</th>
                  <th className="font-semibold">Date</th>
                  <th className="font-semibold">Customer</th>
                  <th className="font-semibold text-center">Total Price</th>
                  <th className="font-semibold text-center">Payment Status</th>
                  <th className="font-semibold text-center">Amount Paid</th>
                  <th className="font-semibold text-center">
                    Remaining Balance
                  </th>
                  <th className="font-semibold text-center">Total Expenses</th>
                  <th className="font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((application) => (
                  <tr key={application.id} className="animate-fade-up">
                    <td className="p-5">
                      {application.applicationId}
                      <BsEye
                        className="text-blue-500 ml-2 cursor-pointer inline"
                        onClick={() => {
                          setOtherSelectedApplication(application);
                        }}
                      />
                    </td>
                    <td>{application.status[0].time.split("T")[0]}</td>
                    <td>{`${application.user.firstName} ${application.user.lastName}`}</td>
                    <td className="text-center">${application.price}</td>
                    <td className="text-center">
                      <span
                        className={`badge ${
                          application.partialScheme
                            ? application.full_paid
                              ? "badge-success"
                              : "badge-warning"
                            : application.paid
                            ? "badge-success"
                            : "badge-error"
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
                    <td className="text-center">
                      $
                      {application.partialScheme
                        ? application.payment1
                        : application.price}
                    </td>
                    <td className="text-center">
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
                    <td className="text-center">
                      $
                      {application.expenses
                        ? application.expenses
                            .reduce(
                              (sum, exp) => sum + parseFloat(exp.amount),
                              0
                            )
                            .toFixed(2)
                        : "0"}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-primary btn-sm text-white"
                          onClick={() => {
                            setSelectedApplication(application);
                            setAddExpenseModal(true);
                          }}
                        >
                          Add Expense
                        </button>
                        <button
                          className="btn btn-primary text-white btn-sm"
                          onClick={() => handleViewExpenses(application)}
                          disabled={!application.expenses?.length}
                        >
                          View Expenses
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between gap-4 p-4">
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

          {viewExpensesModal && (
            <dialog className="modal modal-open">
              <div className="modal-box w-11/12 max-w-3xl">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold">Expense Details</h1>
                  <button
                    className="btn btn-sm btn-circle btn-ghost"
                    onClick={() => setViewExpensesModal(false)}
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th className="font-semibold">Date</th>
                        <th className="font-semibold">Amount</th>
                        <th className="font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedExpenses.map((expense, index) => (
                        <tr key={expense.id || index} className="hover">
                          <td>{new Date(expense.date).toLocaleDateString()}</td>
                          <td>${parseFloat(expense.amount).toFixed(2)}</td>
                          <td>{expense.description}</td>
                        </tr>
                      ))}
                      {selectedExpenses.length === 0 && (
                        <tr>
                          <td colSpan="3" className="text-center py-4">
                            No expenses found for this application
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="font-semibold">
                        <td>Total</td>
                        <td colSpan="2">
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

                <div className="modal-action">
                  <button
                    className="btn btn-primary"
                    onClick={() => setViewExpensesModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </dialog>
          )}

          {addExpenseModal && (
            <dialog className="modal modal-open">
              <div className="modal-box">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Add Expense</h1>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setAddExpenseModal(false);
                      setSelectedApplication(null);
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="mt-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Amount
                    </label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      value={expense.amount}
                      onChange={(e) =>
                        setExpense({ ...expense, amount: e.target.value })
                      }
                      placeholder="Enter amount"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      className="textarea textarea-bordered w-full"
                      value={expense.description}
                      onChange={(e) =>
                        setExpense({ ...expense, description: e.target.value })
                      }
                      placeholder="Enter expense description"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      className="input input-bordered w-full"
                      value={expense.date}
                      onChange={(e) =>
                        setExpense({ ...expense, date: e.target.value })
                      }
                    />
                  </div>
                  <button
                    className="btn btn-primary w-full text-white"
                    onClick={handleAddExpense}
                  >
                    Add Expense
                  </button>
                </div>
              </div>
            </dialog>
          )}
        </div>
      )}
    </div>
  );
};

export default FinanceManagement;
