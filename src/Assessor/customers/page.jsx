import React, { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

import { BiCheck } from "react-icons/bi";

import SpinnerLoader from "../../Customer/components/spinnerLoader";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import applicationsimg from "../../assets/applications.png";
import PaymentPage from "../../Customer/checkoutForm";
import Loader from "../../Customer/components/loader";
import { getAuth } from "firebase/auth";
const URL = import.meta.env.VITE_REACT_BACKEND_URL;

import { useNavigate } from "react-router-dom";

import {
  getApplications,
  verifyApplication,
  addNoteToApplication,
  resendEmail,
  addAssessorNoteToApplication,
} from "../../Customer/Services/adminServices";

import { initiateVerificationCall } from "../../Customer/Services/twilioService";

const Application = ({
  application,
  setSelectedApplication,
  getApplicationsData,
  onClickInitiateCall,
  resendEmailFunc,
}) => {
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [viewIntakeForm, setViewIntakeForm] = useState(false);
  const [viewDocuments, setViewDocuments] = useState(false);
  const [documentLinks, setDocumentLinks] = useState([]);

  const [isAddingNote, setIsAddingNote] = useState(false);
  const [note, setNote] = useState(application.assessorNote || "");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const onClickViewDocuments = async () => {
    console.log("Viewing documents for application with ID:", application);

    // List of document keys to check in application.document
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

    // Loop through each document key, open the link if it's not null
    const links = documentKeys
      .map((docKey) => ({
        name: docKey,
        url: application.document[docKey],
      }))
      .filter((doc) => doc.url); // Filter out null/undefined URLs

    setDocumentLinks(links);
    setViewDocuments(true);
  };

  const [isEditingIntakeForm, setIsEditingIntakeForm] = useState(false);
  const [editedIntakeForm, setEditedIntakeForm] = useState(null);

  const calculateDiscountedPrice = (price) => {
    // Remove commas and convert to number
    const cleanPrice = parseFloat(price.toString().replace(/,/g, ""));
    return (cleanPrice - application.discount).toFixed(2);
  };

  const handleSendToRTO = async () => {
    try {
      setSubmissionLoading(true);
      const response = await fetch(
        `${URL}/api/applications/sendToRTO/${application.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send to RTO");
      }

      toast.success("Successfully sent to RTO!");
      await getApplicationsData();

      // Update the local application state
      const updatedApplication = {
        ...application,
        currentStatus: "Sent to RTO",
        status: [
          ...application.status,
          {
            statusname: "Sent to RTO",
            time: new Date().toISOString(),
          },
        ],
      };
      setSelectedApplication(updatedApplication);
    } catch (error) {
      console.error("Error sending to RTO:", error);
      toast.error("Failed to send to RTO");
    } finally {
      setSubmissionLoading(false);
    }
  };

  const handleNoteUpdate = async () => {
    try {
      setSubmissionLoading(true);
      const response = await addAssessorNoteToApplication(application.id, note);
      if (response === "error") {
        toast.error("Failed to update note");
      } else {
        toast.success("Note updated successfully!");
        // Update the local application state
        const updatedApplication = {
          ...application,
          assessorNote: note,
        };
        setSelectedApplication(updatedApplication);
      }
      setSubmissionLoading(false);
      setIsAddingNote(false);
      await getApplicationsData();
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("An error occurred while updating the note");
      setSubmissionLoading(false);
    }
  };

  const handleEditIntakeForm = async () => {
    try {
      setSubmissionLoading(true);
      const response = await fetch(
        `${URL}/api/admin/student-intake-form/${application.studentFormId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedIntakeForm),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update student intake form");
      }

      // Update the local application state
      const updatedApplication = {
        ...application,
        sif: {
          ...application.sif,
          ...editedIntakeForm,
        },
      };
      setSelectedApplication(updatedApplication);

      toast.success("Student intake form updated successfully");
      await getApplicationsData();
      setIsEditingIntakeForm(false);
      setEditedIntakeForm(null);
    } catch (error) {
      console.error("Error updating student intake form:", error);
      toast.error("Failed to update student intake form");
    } finally {
      setSubmissionLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {submissionLoading && <SpinnerLoader />}
      <div className="flex flex-col items-center justify-center p-16">
        <div className="flex justify-start items-center gap-4 w-full">
          <button
            onClick={() => setSelectedApplication(null)}
            className="btn-sm btn-secondary rounded-xl flex items-center justify-center gap-2 text-white bg-primary px-4 py-5"
          >
            Back
          </button>
        </div>
        <div className="col-span-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Application# {application.applicationId}
          </h1>

          <p className="text-sm text-gray-500">
            This application was submitted by {application.user.firstName}{" "}
            {application.user.lastName} on{" "}
            {formatDate(application.status[0].time.split("T")[0])}
          </p>
          <h1 className="text-lg font-semibold text-gray-800 mt-4">
            {application.isf.lookingForWhatQualification}
          </h1>
        </div>

        {/* Add Note section at the top */}
        <div className="col-span-4 bg-white p-4 rounded-lg shadow-lg w-full mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Notes</h2>
            <button
              onClick={() => setIsAddingNote(true)}
              className="btn btn-primary btn-sm text-white"
            >
              {application.assessorNote ? "Edit Note" : "Add Note"}
            </button>
          </div>
          {application.assessorNote && !isAddingNote && (
            <p className="text-gray-600">{application.assessorNote}</p>
          )}
        </div>

        <div className="col-span-4 bg-white p-4 rounded-lg shadow-lg w-full mb-10">
          <h1 className="text-lg font-semibold text-gray-800">Discount</h1>
          <div className="grid grid-cols-2 gap-4">
            {application.discount ? (
              <p>
                Discount: {application.discount}/- applied from original price:
                ${application.price} so the final price is: ${" "}
                {calculateDiscountedPrice(application.price)}
              </p>
            ) : (
              <p>No discount applied. Original price: ${application.price}</p>
            )}
            {application.partialScheme && (
              <p>
                Application followed Partial Payment scheme with 2 payments of $
                {application.payment1} and ${application.payment2}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-4 bg-white p-4 rounded-lg shadow-lg w-full">
          <div className="flex items-start justify-between">
            <div className="text-sm text-gray-500">
              <h2 className="text-lg font-semibold text-gray-800">
                Initial Screening Information
              </h2>
              <p>First Name: {application.user.firstName}</p>
              <p>Last Name: {application.user.lastName}</p>
              <div>
                <h2 className="text-lg font-semibold">Contact Information</h2>
                <p className="flex items-center">
                  Phone: +{application.user.phone}{" "}
                </p>
                <p className="flex item-center">
                  Email: {application.user.email}{" "}
                </p>
              </div>

              <p>Industry: {application.isf.industry}</p>
              <p>Qualification: {application.isf.qualification || "N/A"}</p>
              <p>Years of Experience: {application.isf.yearsOfExperience}</p>
              <p>
                Location of Experience: {application.isf.locationOfExperience}
              </p>
              <p>
                Formal Education:{" "}
                {application.isf.formalEducation ? "Yes" : "No"} -{" "}
                {application.isf.formalEducationAnswer || "N/A"}
              </p>

              <p>
                Terms and Conditions:{" "}
                {application.user.toc ? "Agreed" : "Not Agreed"}
              </p>
            </div>
            <div className="text-sm text-gray-500 grid grid-cols-3 gap-4">
              <button
                onClick={onClickViewDocuments}
                className="btn-sm btn-primary rounded-xl flex items-center justify-center gap-2 text-white bg-primary px-4 py-5"
              >
                View Documents
              </button>
              <button
                onClick={() => setViewIntakeForm(true)}
                className="btn-sm rounded-xl flex items-center gap-2 btn-primary justify-center text-white bg-primary px-4 py-5"
              >
                View Intake Form
              </button>

              <button
                onClick={() => onClickInitiateCall(application.id)}
                className="btn-sm btn-primary rounded-xl flex items-center justify-center gap-2 text-white bg-primary px-4 py-5"
              >
                Initiate Call
              </button>
              <button
                onClick={handleSendToRTO}
                className="btn-sm btn-primary rounded-xl flex items-center justify-center gap-2 text-white bg-primary px-4 py-5"
              >
                Send to RTO
              </button>
            </div>
          </div>
        </div>

        {isAddingNote && (
          <dialog className="modal modal-open">
            <div className="modal-box">
              <button
                className="btn btn-secondary float-right"
                onClick={() => setIsAddingNote(false)}
              >
                Close
              </button>
              <h3 className="font-bold text-lg">
                {application.assessorNote ? "Edit Note" : "Add Note"}
              </h3>
              <textarea
                className="textarea textarea-bordered w-full mt-4"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter note here"
                rows={4}
              />
              <button
                className="btn btn-primary mt-4 w-full"
                onClick={handleNoteUpdate}
              >
                {application.assessorNote ? "Update Note" : "Add Note"}
              </button>
            </div>
          </dialog>
        )}

        {viewIntakeForm && (
          <dialog className="modal modal-open">
            <div className="col-span-4 bg-white p-4 rounded-lg shadow-lg w-1/2">
              <button
                onClick={() => {
                  setViewIntakeForm(false);
                  setIsEditingIntakeForm(false);
                  setEditedIntakeForm(null);
                }}
                className="mt-4 mr-4 float-right"
              >
                <FaTimes className="text-lg" />
              </button>
              <div className="flex flex-col justify-between items-start">
                <h2 className="text-lg font-semibold text-gray-800">
                  Student Intake Form
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="text-md text-gray-500">
                  <h2 className="text-lg font-semibold text-gray-800 mt-4">
                    Personal Information
                  </h2>
                  <div className="text-md text-gray-500 grid grid-cols-2 gap-4">
                    {isEditingIntakeForm ? (
                      // Edit mode - show input fields
                      <>
                        <div>
                          <label className="text-sm font-medium">USI</label>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            value={editedIntakeForm?.USI || ""}
                            onChange={(e) =>
                              setEditedIntakeForm({
                                ...editedIntakeForm,
                                USI: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Gender</label>
                          <select
                            className="select select-bordered w-full"
                            value={editedIntakeForm?.gender || ""}
                            onChange={(e) =>
                              setEditedIntakeForm({
                                ...editedIntakeForm,
                                gender: e.target.value,
                              })
                            }
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            className="input input-bordered w-full"
                            value={editedIntakeForm?.dob || ""}
                            onChange={(e) =>
                              setEditedIntakeForm({
                                ...editedIntakeForm,
                                dob: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Home Address
                          </label>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            value={editedIntakeForm?.homeAddress || ""}
                            onChange={(e) =>
                              setEditedIntakeForm({
                                ...editedIntakeForm,
                                homeAddress: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Suburb</label>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            value={editedIntakeForm?.suburb || ""}
                            onChange={(e) =>
                              setEditedIntakeForm({
                                ...editedIntakeForm,
                                suburb: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Postcode
                          </label>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            value={editedIntakeForm?.postcode || ""}
                            onChange={(e) =>
                              setEditedIntakeForm({
                                ...editedIntakeForm,
                                postcode: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">State</label>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            value={editedIntakeForm?.state || ""}
                            onChange={(e) =>
                              setEditedIntakeForm({
                                ...editedIntakeForm,
                                state: e.target.value,
                              })
                            }
                          />
                        </div>
                        {/* Education Section */}
                        <div>
                          <label className="text-sm font-medium">
                            Credits Transfer
                          </label>
                          <select
                            className="select select-bordered w-full"
                            value={
                              editedIntakeForm?.creditsTransfer?.toString() ||
                              "false"
                            }
                            onChange={(e) =>
                              setEditedIntakeForm({
                                ...editedIntakeForm,
                                creditsTransfer: e.target.value === "true",
                              })
                            }
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Year of Completion
                          </label>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            value={editedIntakeForm?.YearCompleted || ""}
                            onChange={(e) =>
                              setEditedIntakeForm({
                                ...editedIntakeForm,
                                YearCompleted: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Highest Level of Education
                          </label>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            value={editedIntakeForm?.nameOfQualification || ""}
                            onChange={(e) =>
                              setEditedIntakeForm({
                                ...editedIntakeForm,
                                nameOfQualification: e.target.value,
                              })
                            }
                          />
                        </div>
                      </>
                    ) : (
                      // View mode - show text
                      <>
                        <p>First Name: {application.user.firstName}</p>
                        <p>Last Name: {application.user.lastName}</p>
                        <p>USI: {application.sif.USI}</p>
                        <p>Gender: {application.sif.gender}</p>
                        <p>Date of Birth: {application.sif.dob}</p>
                        <p>Home Address: {application.sif.homeAddress}</p>
                        <p>Suburb: {application.sif.suburb}</p>
                        <p>Postcode: {application.sif.postcode}</p>
                        <p>Country: {application.user.country}</p>
                        <p>State: {application.sif.state}</p>
                        <p>
                          Location Of Experience:{" "}
                          {application.isf.locationOfExperience}
                        </p>
                        {/* Education Section */}
                        <p>
                          Credits Transfer:{" "}
                          {application.sif.creditsTransfer ? "Yes" : "No"}
                        </p>
                        <p>
                          Year of Completion:{" "}
                          {application.sif.YearCompleted || "N/A"}
                        </p>
                        <p>
                          Highest Level of Education:{" "}
                          {application.sif.nameOfQualification || "N/A"}
                        </p>
                      </>
                    )}
                  </div>
                  {isEditingIntakeForm && (
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() => {
                          setIsEditingIntakeForm(false);
                          setEditedIntakeForm(null);
                        }}
                        className="btn btn-ghost"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleEditIntakeForm}
                        className="btn btn-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </dialog>
        )}
        {viewDocuments && (
          <dialog className="modal modal-open text-lg" id="documentLinksModal">
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
      </div>
    </div>
  );
};

const CustomersInfo = () => {
  const navigate = useNavigate();

  const [selectedFilter, setSelectedFilter] = useState("All");

  const [selectedColorFilter, setSelectedColorFilter] = useState("All");

  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  const [applications, setApplications] = useState([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = React.useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [price, setPrice] = useState(0);

  const [userId, setUserId] = useState(null);
  const getUserApplications = async (userId) => {
    setSubmissionLoading(true);
    try {
      const response = await getApplications(userId);
      console.log("application", response);
      //only get applications sent to Assessor
      const filteredApplications = response.filter(
        (application) => application.status[0].status === "Sent to Assessor"
      );
      setApplications(filteredApplications);
      setSubmissionLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedApplication, setSelectedApplication] = useState(null);
  useEffect(() => {
    if (userId) {
      getUserApplications(userId);
    }
  }, [userId, selectedApplication]);

  const [partialScheme, setPartialScheme] = useState(false);
  const [paid, setPaid] = useState(false);
  const [payment1, setPayment1] = useState(0);
  const [payment2, setPayment2] = useState(0);
  const [full_paid, setFullPaid] = useState(false);

  const calculateDiscountedPrice = (price, discount) => {
    // Remove commas and convert to number
    console.log(price);
    if (!price) return 0;
    if (!discount) return price;
    const cleanPrice = parseFloat(price.toString().replace(/,/g, ""));
    console.log("ok", cleanPrice, discount);
    return cleanPrice - discount;
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
    if (!discount) {
      setPrice(price);
    } else {
      setPrice(calculateDiscountedPrice(price, discount));
    }
    setApplicationId(applicationId);
    setPartialScheme(partialScheme);
    setPaid(paid);
    setFullPaid(full_paid);
    setPayment1(payment1);
    setPayment2(payment2);
    setFullPaid(full_paid);

    setShowCheckoutModal(true);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  const onClickDownload = (certificateURL) => {
    console.log("Downloading certificate:", certificateURL);
    // alert("Downloading certificate");
    window.open(certificateURL, "_blank");
  };

  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedIndustryFilter, setSelectedIndustryFilter] = useState("All");
  const [industryFilterOptions, setIndustryFilterOptions] = useState([]);
  const [selectedCallAttemptsFilter, setSelectedCallAttemptsFilter] =
    useState("All");

  const [activeStatus, setActiveStatus] = useState("Unverified");

  const getApplicationsData = async () => {
    try {
      setSubmissionLoading(true);
      const auth = getAuth();
      const userId = auth.currentUser.uid;
      let applicationsData = await getApplications();
      //only get applications sent to Assessor
      applicationsData = applicationsData.filter(
        (application) => application.currentStatus === "Sent to Assessor"
      );

      applicationsData.sort(
        (a, b) => new Date(b.status[0]?.time) - new Date(a.status[0]?.time)
      );
      //filter applications based on status which are not in Waiting for Verification

      setApplications(applicationsData);
      setFilteredApplications(applicationsData);
      setSubmissionLoading(false);
    } catch (error) {
      setSubmissionLoading(false);
      console.error("Failed to fetch applications:", error);
    }
  };

  const onVerifyApplication = async (applicationId) => {
    try {
      setSubmissionLoading(true);
      await verifyApplication(applicationId);
      getApplicationsData();
      setSubmissionLoading(false);
    } catch (error) {
      console.error("Failed to verify application:", error);
      setSubmissionLoading(false);
    }
  };

  useEffect(() => {
    getApplicationsData();
  }, []);

  useEffect(() => {
    console.log(selectedApplication);
  }, [selectedApplication]);

  const [text, setText] = useState("Initiate Call");

  const simulateCall = () => {
    setText("Calling...");
    const statuses = ["Ringing...", "Answered!", "Completed"];
    let i = 0;
    const interval = setInterval(() => {
      setText(statuses[i]);
      i++;
      if (i === 3) {
        clearInterval(interval);
      }
    }, 5000);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    // First filter by search
    let filtered = applications;
    if (search !== "") {
      let searchValue = search.toLowerCase();
      filtered = applications.filter(
        (app) =>
          app.applicationId?.toLowerCase().includes(searchValue) ||
          app.user?.firstName?.toLowerCase().includes(searchValue) ||
          app.user?.lastName?.toLowerCase().includes(searchValue) ||
          app.user?.phone?.toLowerCase().includes(searchValue)
      );
    }

    // Then filter by assignment
    if (selectedFilter !== "All") {
      if (selectedFilter === "Assigned to N/A") {
        filtered = filtered.filter((app) => !app.assignedAdmin);
      } else {
        const admin = selectedFilter.replace("Assigned to ", "");
        filtered = filtered.filter((app) => app.assignedAdmin === admin);
      }
    }

    // Then filter by color status
    if (selectedColorFilter !== "All") {
      const colorMap = {
        "Hot Lead": "red",
        "Warm Lead": "orange",
        "Proceeded With Payment": "yellow",
        "Cold Lead": "gray",
        "Impacted Student": "lightblue",
        Agent: "pink",
        Completed: "green",
      };
      //if filter is default then all applications with no color will be shown
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

    // Then filter by industry
    if (selectedIndustryFilter !== "All") {
      filtered = filtered.filter(
        (app) => app.isf.industry === selectedIndustryFilter
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

    setFilteredApplications(filtered);
  }, [
    search,
    selectedFilter,
    selectedColorFilter,
    applications,
    selectedIndustryFilter,
    selectedCallAttemptsFilter,
  ]);

  const onClickInitiateCall = async (applicationId) => {
    try {
      const auth = getAuth();
      const adminUserId = auth.currentUser.uid;

      const userId = applications.find(
        (application) => application.id === applicationId
      ).userId;
      setSubmissionLoading(true);
      await initiateVerificationCall(applicationId, userId, adminUserId);
      setSubmissionLoading(false);
    } catch (error) {
      console.error("Error initiating verification call:", error);
      setSubmissionLoading(false);
    }
  };

  const handleIndustryFilterChange = (e) => {
    setSelectedIndustryFilter(e.target.value);
  };
  const getUniqueIndustries = (applications) => {
    const industries = applications.map((app) => app.isf.industry);
    return ["All", ...new Set(industries.filter(Boolean))];
  };

  useEffect(() => {
    if (applications.length > 0) {
      setSelectedIndustryFilter("All");
      //set the filter options
      setIndustryFilterOptions(getUniqueIndustries(applications));
    }
  }, [applications]);

  const totalItems = filteredApplications.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredApplications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const [addNoteModal, setAddNoteModal] = useState(false);
  const [note, setNote] = useState("");

  const noteAddedToast = () => {
    toast.success("Successful");
  };

  const noteErrorToast = () => {
    toast.error("Failed");
  };

  const onClickAddNote = async () => {
    setSubmissionLoading(true);
    try {
      const response = await addNoteToApplication(selectedApplicationId, note);
      if (response === "error") {
        noteErrorToast();
        setSubmissionLoading(false);
        return;
      }
      setSubmissionLoading(false);
      setAddNoteModal(false);
      noteAddedToast();
      setNote("");
      getApplicationsData();
    } catch (error) {
      console.error("Failed to add note:", error);
      noteErrorToast();
      setSubmissionLoading(false);
    }
  };

  const resendEmailFunc = async (userId) => {
    setSubmissionLoading(true);
    try {
      const response = await resendEmail(userId);
      if (response === "error") {
        noteErrorToast();
        setSubmissionLoading(false);
        return;
      }
      setSubmissionLoading(false);
    } catch (error) {
      console.error("Failed", error);
      noteErrorToast();
      setSubmissionLoading(false);
    }
  };

  const [selectedApplicationId, setSelectedApplicationId] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getPaginationRange = (currentPage, totalPages) => {
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

  useEffect(() => {
    if (addNoteModal) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (showCheckoutModal) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [addNoteModal, showCheckoutModal]);
  return (
    <div className="">
      {loading && <Loader />}
      {submissionLoading && <SpinnerLoader />}
      <Toaster />

      {!selectedApplication && (
        <div className="p-3 overflow-x-auto">
          <div className="flex items-center gap-4 mb-5 lg:flex-row flex-col">
            <img src={applicationsimg} alt="Applications" className="h-36" />
            <div className="flex flex-col lg:w-1/2 w-full">
              <h1 className="text-3xl font-bold">Customers</h1>
              <p className="text-sm mt-2">
                Here you can view all the applications and their statuses.
              </p>
            </div>
          </div>

          <div className="flex items-start flex-col mb-4 gap-2">
            <div className="flex justify-between items-end w-full gap-4">
              <div className="flex gap-4 flex-1">
                <div className="flex-1">
                  <label htmlFor="search" className="text-sm block mb-2">
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

                <div className="flex-1">
                  <label
                    htmlFor="industryFilter"
                    className="text-sm block mb-2"
                  >
                    Filter by Industry
                  </label>
                  <select
                    id="industryFilter"
                    className="select select-bordered w-full"
                    value={selectedIndustryFilter}
                    onChange={handleIndustryFilterChange}
                  >
                    {industryFilterOptions.length > 0 &&
                      industryFilterOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-4">
              <p className="text-sm">Items per page:</p>
              <select
                className="select select-bordered"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
          <div className=" overflow-x-auto border border-gray-300 rounded-md">
            <div className="table mx-auto max-sm:overflow-x-auto overflow-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="font-semibold p-5">ID</th>
                  <th className="font-semibold">Date Created</th>
                  <th className="font-semibold">Customer</th>
                  <th className="font-semibold text-center">Certificate</th>
                  <th className="font-semibold text-center">Industry</th>
                  <th className="text-center w-52">Notes</th>
                  <th className="font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  //if there are no applications to show
                  filteredApplications.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center p-5">
                        No applications to show
                      </td>
                    </tr>
                  )
                }
                {currentItems.map((application) => (
                  <tr
                    key={application.id}
                    className={`animate-fade-up items-center overflow-auto `}
                  >
                    <td className={`p-5 flex  items-center`}>
                      {application.applicationId
                        ? application.applicationId
                        : application.id}
                    </td>
                    <td className="">
                      {formatDate(application.status[0].time)}
                    </td>
                    <td style={{ backgroundColor: application.color }}>
                      {application.user.firstName +
                        " " +
                        application.user.lastName}
                    </td>
                    <td className="text-center w-40">
                      {application.isf.lookingForWhatQualification}
                    </td>
                    <td className="text-center">{application.isf.industry}</td>

                    <td className="items-center justify-center relative">
                      {application.assessorNote ? (
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-center w-full">
                            {application.assessorNote}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-center w-full">No notes</p>
                      )}
                    </td>

                    <td className="flex items-center flex-col gap-2">
                      <button
                        className="btn btn-primary btn-sm w-full text-white"
                        onClick={() => setSelectedApplication(application)}
                      >
                        Edit
                      </button>
                      {/* <button
                        className="btn btn-primary btn-sm w-full text-white"
                        onClick={() => {
                          setSelectedApplicationId(application.id);
                          setNote(application.note);
                          setAddNoteModal(true);
                        }}
                      >
                        Edit Note
                      </button> */}
                      {/* <button
                        className="btn btn-primary btn-sm w-full text-white"
                        onClick={() => onClickInitiateCall(application.id)}
                      >
                        Call Now
                      </button> */}
                      {application.paid && !application.full_paid && (
                        <button
                          className="btn btn-primary btn-sm w-full text-white"
                          onClick={() =>
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
                            )
                          }
                        >
                          Pay Now
                        </button>
                      )}
                      {!application.paid && (
                        <button
                          className="btn btn-primary btn-sm w-full text-white"
                          onClick={() =>
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
                            )
                          }
                        >
                          Pay Now
                        </button>
                      )}
                      {/* <button
                        className="btn btn-primary btn-sm w-full text-white"
                        onClick={() => resendEmailFunc(application.userId)}
                      >
                        Resend Email
                      </button> */}
                      {application.currentStatus === "Completed" ||
                      application.currentStatus === "Dispatched" ||
                      application.currentStatus === "Certificate Generated" ? (
                        <div className="flex items-center gap-2 w-full">
                          <button
                            className="btn bg-green-500 hover:bg-green-600 text-white btn-sm w-full"
                            onClick={() =>
                              onClickDownload(application.certificateId)
                            }
                          >
                            Download
                          </button>
                        </div>
                      ) : (
                        <div className=" items-center gap-2 max-sm:text-sm w-full">
                          {application.verified ? null : (
                            <div className="flex items-center gap-2 max-sm:flex-col w-full">
                              <button
                                className="btn bg-green-500 hover:bg-green-600 text-white btn-sm flex items-center max-sm:w-full w-full"
                                onClick={() =>
                                  onVerifyApplication(application.id)
                                }
                              >
                                <BiCheck className="text-white max-sm:hidden" />
                                Verify
                              </button>
                              <button
                                className="btn bg-yelloq-500 hover:bg-yellow-600 text-black btn-sm flex max-sm:w-full w-full"
                                onClick={simulateCall}
                              >
                                {text}
                              </button>
                              <button className="btn bg-red-500 hover:bg-red-600 text-white btn-sm flex max-sm:w-full w-full">
                                <FaTimesCircle className="text-white max-sm:hidden" />
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </div>
            <div className="flex items-center justify-center gap-2 p-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="btn btn-sm btn-ghost"
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {getPaginationRange(currentPage, totalPages).map(
                (page, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof page === "number" ? setCurrentPage(page) : null
                    }
                    className={`btn btn-sm ${
                      page === currentPage
                        ? "btn-primary text-white"
                        : page === "..."
                        ? "btn-ghost cursor-default"
                        : "btn-ghost"
                    }`}
                    disabled={page === "..."}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="btn btn-sm btn-ghost"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedApplication && (
        <Application
          application={selectedApplication}
          setSelectedApplication={setSelectedApplication}
          getApplicationsData={getApplicationsData}
          resendEmailFunc={resendEmailFunc}
          onClickInitiateCall={onClickInitiateCall}
        />
      )}

      {addNoteModal && (
        <div
          className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"
          style={{ zIndex: 9999 }}
        >
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className=" bg-white rounded-lg p-6 w-[500px] z-50 mx-4 fixed">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Add Note</h1>
              <button
                className="btn btn-secondary"
                onClick={() => setAddNoteModal(false)}
              >
                Close
              </button>
            </div>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md mt-5"
              placeholder="Enter note here"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <button
              className="btn btn-primary mt-5 w-full"
              onClick={onClickAddNote}
            >
              Add Note
            </button>
          </div>
        </div>
      )}

      {showCheckoutModal && (
        <div
          className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"
          style={{ zIndex: 9999 }}
        >
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 w-[500px] relative z-50 mx-4">
            <h3 className="font-bold text-lg">Payment Details</h3>
            <div className="py-4">
              <PaymentPage
                price={price}
                applicationId={applicationId}
                partialScheme={partialScheme}
                paid={paid}
                payment1={payment1}
                payment2={payment2}
                setShowCheckoutModal={setShowCheckoutModal}
                getUserApplications={getUserApplications}
                userId={userId}
              />
              <button
                className="btn bg-red-500 hover:bg-red-600 btn-primary w-full mt-4"
                onClick={() => setShowCheckoutModal(false)}
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

export default CustomersInfo;
