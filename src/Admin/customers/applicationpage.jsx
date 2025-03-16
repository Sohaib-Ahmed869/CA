import React, { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { FaTimesCircle } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";

import { FaArchive } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { MdNotes } from "react-icons/md";
import { MdLabel } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { BiUpload } from "react-icons/bi";
import { Settings } from "lucide-react";
import { IoCall } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import { Toaster } from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { getAuth } from "firebase/auth";
import Papa from "papaparse";
import { toast } from "react-hot-toast";
import DocumentModal from "../../Customer/components/viewDocsModal";
const URL = import.meta.env.VITE_REACT_BACKEND_URL;

import certificate from "../../assets/certificate.pdf";

import { useNavigate } from "react-router-dom";

import {
  getApplications,
  verifyApplication,
  addNoteToApplication,
  resendEmail,
  addColorToApplication,
  updateEmail,
  updatePhone,
  dividePayment,
  assignApplicationToAdmin,
  deleteApplication,
} from "../../Customer/Services/adminServices";

import { initiateVerificationCall } from "../../Customer/Services/twilioService";

const Application = ({
  application,
  setSelectedApplication,
  getApplicationsData,
  onClickInitiateCall,
  resendEmailFunc,
  onClickPayment,
}) => {
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [activeView, setActiveView] = useState("overview");
  const [viewIntakeForm, setViewIntakeForm] = useState(false);
  const [viewDocuments, setViewDocuments] = useState(false);
  const [documentLinks, setDocumentLinks] = useState([]);
  const [color, setColor] = useState(application.color || "");
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [note, setNote] = useState(application.note || "");
  const [isUpdateEmailOpen, setIsUpdateEmailOpen] = useState(false);
  const [isUpdatePhoneOpen, setIsUpdatePhoneOpen] = useState(false);
  const [callAttempts, setCallAttempts] = useState(
    application.contactAttempts || 1
  );
  const [contactStatus, setContactStatus] = useState(
    application.contactStatus || ""
  );
  const [isCallStatusModalOpen, setIsCallStatusModalOpen] = useState(false);
  const [isContactStatusModalOpen, setIsContactStatusModalOpen] =
    useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(false);

  // Form editing states
  const [isEditingIntakeForm, setIsEditingIntakeForm] = useState(false);
  const [editedIntakeForm, setEditedIntakeForm] = useState(null);

  // Payment and discount states
  const [payment1, setPayment1] = useState("");
  const [payment2, setPayment2] = useState("");
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [discount, setDiscount] = useState("");

  // User information states
  const [updatedPhone, setUpdatedPhone] = useState(
    application.user?.phone || ""
  );
  const [updatedEmail, setUpdatedEmail] = useState(
    application.user?.email || ""
  );

  // Admin assignment states
  const [possibleAdmins] = useState([
    "Gabi",
    "Sidra",
    "Ibrahim",
    "Sameer",
    "Aayan",
    "Ilhan",
    "Azhar",
    "Wania",
  ]);
  const [selectedAdmin, setSelectedAdmin] = useState(
    application.assignedAdmin || ""
  );
  const [showDeadlineModal, setShowDeadlineModal] = useState(null);
  const [deadlineDate, setDeadlineDate] = useState("");
  const [assignAdminModal, setAssignAdminModal] = useState(false);
  // Document Modal
  const [DocumentModalOpen, setDocumentModalOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState("");

  // Function to open modal with selected document
  const openModal = (doc) => {
    setCurrentDoc(doc); // Directly set the file URL
    setDocumentModalOpen(true);
  };

  const closeModal = () => {
    setDocumentModalOpen(false);
    // Revoke the object URL to prevent memory leaks
    setCurrentDoc("");
  };

  // Format date helper function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSetDeadline = async () => {
    if (!deadlineDate || !showDeadlineModal) return;

    try {
      setSubmissionLoading(true);

      // Call your API to update the deadline
      const response = await fetch(
        `${URL}/api/applications/payment2DeadlineDate/${showDeadlineModal}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ payment2Deadline: deadlineDate }),
        }
      );

      if (response.ok) {
        toast.success("Payment deadline set successfully");
        // Refetch applications to update the UI
        getApplicationsData();
        // locally upon successful deadline update for instant UI update
        const updatedApplication = {
          ...application,
          payment2Deadline: deadlineDate,
        };
        setSelectedApplication(updatedApplication);
      } else {
        toast.error("Failed to set payment deadline");
      }
    } catch (error) {
      console.error("Error setting deadline:", error);
      toast.error("An error occurred while setting the deadline");
    } finally {
      setSubmissionLoading(false);
      setShowDeadlineModal(null);
      setDeadlineDate("");
    }
  };

  // Handle archive/delete application
  const handleDeleteClick = () => {
    setApplicationToDelete(application.id);
    setShowDeleteModal(true);
    setShowActionMenu(false);
  };

  const confirmDeleteApplication = async () => {
    try {
      setSubmissionLoading(true);
      const result = await deleteApplication(applicationToDelete);
      if (result.message) {
        toast.success(result.message);
        getApplicationsData();
        setSelectedApplication(null);
      } else {
        toast.error("Failed to archive application");
      }
    } catch (error) {
      toast.error("Error archiving application");
    } finally {
      setSubmissionLoading(false);
      setShowDeleteModal(false);
      setApplicationToDelete(null);
    }
  };

  const [payment2Deadline, setPayment2Deadline] = useState("");

  // View documents handler
  const onClickViewDocuments = () => {
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
      "driversLicense", // Added the key used in the upload component
      "birthCertificate", // Added the key used in the upload component
      "medicareCard", // Added the key used in the upload component
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
    setActiveView("documents");
  };

  // Color management handler
  const handleAddColor = async () => {
    try {
      setSubmissionLoading(true);
      const response = await addColorToApplication(application.id, color);
      if (response.message === "Color updated successfully") {
        toast.success("Color updated successfully!");
        const updatedApplication = {
          ...application,
          color,
        };
        setSelectedApplication(updatedApplication);
        setIsColorModalOpen(false);
        await getApplicationsData();
      } else {
        toast.error("Failed to update color.");
      }
    } catch (err) {
      console.error("Error updating color:", err);
      toast.error("An error occurred while updating the color.");
    } finally {
      setSubmissionLoading(false);
    }
  };

  // Phone update handler
  const handlePhoneUpdate = async () => {
    try {
      setSubmissionLoading(true);
      const response = await updatePhone(application.user.id, updatedPhone);
      if (response === "error") {
        toast.error("Failed to update phone number.");
      } else {
        toast.success("Phone number updated successfully!");
        const updatedApplication = {
          ...application,
          user: { ...application.user, phone: updatedPhone },
        };
        setSelectedApplication(updatedApplication);
        setIsUpdatePhoneOpen(false);
        await getApplicationsData();
      }
    } catch (error) {
      console.error("Error updating phone:", error);
      toast.error("An error occurred while updating the phone number.");
    } finally {
      setSubmissionLoading(false);
    }
  };

  // Email update handler
  const handleEmailUpdate = async () => {
    try {
      setSubmissionLoading(true);
      const response = await updateEmail(application.user.id, updatedEmail);
      if (response === "error") {
        toast.error("Failed to update email.");
      } else {
        toast.success("Email updated successfully!");
        const updatedApplication = {
          ...application,
          user: { ...application.user, email: updatedEmail },
        };
        setSelectedApplication(updatedApplication);
        setIsUpdateEmailOpen(false);
        await getApplicationsData();
      }
    } catch (error) {
      console.error("Error updating email:", error);
      toast.error("An error occurred while updating the email.");
    } finally {
      setSubmissionLoading(false);
    }
  };

  // Payment update handler
  const handlePaymentUpdate = async () => {
    console.log("handlePaymentUpdate triggered");

    if (payment1 > application.price) {
      toast.error("Please enter valid payment amount.");
      return;
    }
    if (!payment1 || !payment2 || !payment2Deadline) {
      // Check deadline is provided
      toast.error("Please enter payment amount and deadline.");
      return;
    }

    if (application.full_paid) {
      toast.error("Full payment is already paid cannot divide payment.");
      return;
    }
    if (application.paid) {
      toast.error("First payment is already paid cannot divide payment.");
      return;
    }
    try {
      setSubmissionLoading(true);
      const response = await dividePayment(
        application.id,
        payment1,
        payment2,
        payment2Deadline
      ); // Add deadline
      if (response === "error") {
        toast.error("Failed to divide payment.");
      } else {
        toast.success("Payment divided successfully!");
        const updatedApplication = {
          ...application,
          partialScheme: true,
          payment1: payment1,
          payment2: payment2,
          payment2Deadline: payment2Deadline,
        };
        setSelectedApplication(updatedApplication);
        await getApplicationsData();
      }
    } catch (error) {
      console.error("Error dividing payment:", error);
      toast.error("An error occurred while dividing the payment.");
    } finally {
      setSubmissionLoading(false);
      setOpenPaymentModal(false);
    }
  };

  // Admin assignment handler
  const handleAssignAdmin = async () => {
    try {
      setSubmissionLoading(true);
      const response = await assignApplicationToAdmin(
        application.id,
        selectedAdmin
      );
      if (response === "error") {
        toast.error("Failed to assign admin.");
      } else {
        toast.success("Admin assigned successfully!");
        const updatedApplication = {
          ...application,
          assignedAdmin: selectedAdmin,
        };
        setSelectedApplication(updatedApplication);
        setAssignAdminModal(false);
        await getApplicationsData();
      }
    } catch (error) {
      console.error("Error assigning admin:", error);
      toast.error("An error occurred while assigning the admin.");
    } finally {
      setSubmissionLoading(false);
    }
  };

  // Discount update handler
  const handleDiscountUpdate = async () => {
    try {
      setSubmissionLoading(true);
      const response = await fetch(
        `${URL}/api/applications/discount/${application.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ discount: parseFloat(discount) }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update discount");
      }

      const data = await response.json();
      toast.success("Discount applied successfully!");
      const updatedApplication = {
        ...application,
        discount: data.discount,
      };
      setSelectedApplication(updatedApplication);
      setDiscountModalOpen(false);
      setDiscount("");
      await getApplicationsData();
    } catch (error) {
      console.error("Error updating discount:", error);
      toast.error("Failed to apply discount");
    } finally {
      setSubmissionLoading(false);
    }
  };

  // Call attempts update handler
  const handleUpdateCallAttempts = async () => {
    try {
      setSubmissionLoading(true);
      const response = await fetch(
        `${URL}/api/applications/callAttempts/${application.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contactAttempts: callAttempts }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update call attempts");
      }

      toast.success("Call attempts updated successfully!");
      const updatedApplication = {
        ...application,
        contactAttempts: callAttempts,
      };
      setSelectedApplication(updatedApplication);
      setIsCallStatusModalOpen(false);
      await getApplicationsData();
    } catch (error) {
      console.error("Error updating call attempts:", error);
      toast.error("Failed to update call attempts");
    } finally {
      setSubmissionLoading(false);
    }
  };

  // Contact status update handler
  const handleUpdateContactStatus = async () => {
    try {
      setSubmissionLoading(true);
      const response = await fetch(
        `${URL}/api/applications/contactStatus/${application.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contactStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update contact status");
      }

      toast.success("Contact status updated successfully!");
      const updatedApplication = {
        ...application,
        contactStatus,
      };
      setSelectedApplication(updatedApplication);
      setIsContactStatusModalOpen(false);
      await getApplicationsData();
    } catch (error) {
      console.error("Error updating contact status:", error);
      toast.error("Failed to update contact status");
    } finally {
      setSubmissionLoading(false);
    }
  };

  // Calculate discounted price helper function
  const calculateDiscountedPrice = (price) => {
    if (!price) return "0.00";
    try {
      const cleanPrice = parseFloat(price.toString().replace(/,/g, ""));
      const discountedPrice = (
        cleanPrice - (application.discount || 0)
      ).toFixed(2);
      return isNaN(discountedPrice) ? "0.00" : discountedPrice;
    } catch (error) {
      console.error("Error calculating discounted price:", error);
      return "0.00";
    }
  };

  // Note update handler
  const handleNoteUpdate = async () => {
    try {
      setSubmissionLoading(true);
      const response = await addNoteToApplication(application.id, note);
      if (response === "error") {
        toast.error("Failed to update note");
      } else {
        toast.success("Note updated successfully!");
        const updatedApplication = {
          ...application,
          note: note,
        };
        setSelectedApplication(updatedApplication);
        setIsAddingNote(false);
        await getApplicationsData();
      }
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("An error occurred while updating the note");
    } finally {
      setSubmissionLoading(false);
    }
  };

  // Student intake form edit handler
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

  // Get color label for display
  const getColorLabel = (colorValue) => {
    const colorMap = {
      red: "Hot Lead",
      orange: "Warm Lead",
      gray: "Cold Lead",
      yellow: "Proceeded With Payment",
      lightblue: "Impacted Student",
      pink: "Agent",
      green: "Completed",
      white: "Default",
    };
    return colorMap[colorValue] || "N/A";
  };

  const handleViewDocument = (documentUrl) => {
    if (documentUrl) {
      // Check if the documentUrl is an object with fileUrl property
      if (typeof documentUrl === "object" && documentUrl.fileUrl) {
        window.open(documentUrl.fileUrl, "_blank");
      } else {
        window.open(documentUrl, "_blank");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {submissionLoading && <SpinnerLoader />}
      <Toaster position="top-right" />

      {/* Header section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 py-6 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSelectedApplication(null)}
                className="mr-4 p-2 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-30 transition-all"
              >
                <FaArrowLeft className="text-lg" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center">
                  Application #{application.applicationId || application.id}
                  {application.color && (
                    <span className="ml-2 text-sm px-3 py-1 rounded-full bg-white text-emerald-800">
                      {getColorLabel(application.color)}
                    </span>
                  )}
                </h1>
                <p className="text-emerald-100">
                  Submitted by {application.user.firstName}{" "}
                  {application.user.lastName} on{" "}
                  {formatDate(application.status[0]?.time?.split("T")[0])}
                </p>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onClickInitiateCall(application.id)}
                className="flex items-center px-3 py-1.5 bg-white bg-opacity-20 rounded-md text-white hover:bg-opacity-30 transition-all"
                title="Call Now"
              >
                <IoCall className="mr-1.5" />
                <span className="hidden sm:inline">Call</span>
              </button>

              <button
                onClick={() => resendEmailFunc(application.id)}
                className="flex items-center px-3 py-1.5 bg-white bg-opacity-20 rounded-md text-white hover:bg-opacity-30 transition-all"
                title="Resend Email"
              >
                <FaEnvelope className="mr-1.5" />
                <span className="hidden sm:inline">Email</span>
              </button>

              <button
                onClick={handleDeleteClick}
                className="flex items-center px-3 py-1.5 bg-white bg-opacity-20 rounded-md text-white hover:bg-opacity-30 transition-all"
                title="Archive Application"
              >
                <FaArchive className="mr-1.5" />
                <span className="hidden sm:inline">Archive</span>
              </button>
            </div>
          </div>

          {/* Qualification display */}
          <div className="mt-4 px-12">
            <p className="text-emerald-100">Qualification</p>
            <h2 className="text-xl font-semibold text-white">
              {application.isf?.lookingForWhatQualification || "N/A"}
            </h2>
            {application.assignedAdmin && (
              <p className="text-emerald-100 mt-1">
                Assigned to{" "}
                <span className="font-semibold">
                  {application.assignedAdmin}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-6">
              <div className="divide-y divide-gray-200">
                <button
                  onClick={() => setActiveView("overview")}
                  className={`w-full text-left px-6 py-4 flex items-center ${
                    activeView === "overview"
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <BiUser
                    className={`mr-3 text-xl ${
                      activeView === "overview"
                        ? "text-emerald-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span className="font-medium">Overview</span>
                </button>

                <button
                  onClick={() => {
                    setActiveView("settings");
                  }}
                  className={`w-full text-left px-6 py-4 flex items-center ${
                    activeView === "settings"
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Settings
                    className={`mr-3 text-xl ${
                      activeView === "settings"
                        ? "text-emerald-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span className="font-medium">Application Management</span>
                </button>

                <button
                  onClick={() => {
                    setActiveView("notes");
                    setIsAddingNote(true);
                  }}
                  className={`w-full text-left px-6 py-4 flex items-center ${
                    activeView === "notes"
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <MdNotes
                    className={`mr-3 text-xl ${
                      activeView === "notes"
                        ? "text-emerald-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span className="font-medium">Notes</span>
                </button>

                <button
                  onClick={() => {
                    setActiveView("payments");
                  }}
                  className={`w-full text-left px-6 py-4 flex items-center ${
                    activeView === "payments"
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <MdPayment
                    className={`mr-3 text-xl ${
                      activeView === "payments"
                        ? "text-emerald-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span className="font-medium">Payments</span>
                </button>

                <button
                  onClick={() => {
                    setActiveView("intake");
                    setViewIntakeForm(true);
                  }}
                  className={`w-full text-left px-6 py-4 flex items-center ${
                    activeView === "intake"
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <BiUser
                    className={`mr-3 text-xl ${
                      activeView === "intake"
                        ? "text-emerald-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span className="font-medium">Student Intake Form</span>
                </button>

                <button
                  onClick={() => {
                    setActiveView("documents");
                    onClickViewDocuments();
                  }}
                  className={`w-full text-left px-6 py-4 flex items-center ${
                    activeView === "documents"
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <BiUpload
                    className={`mr-3 text-xl ${
                      activeView === "documents"
                        ? "text-emerald-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span className="font-medium">Documents</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right content area */}
          <div className="md:w-3/4">
            {/* Overview View */}
            {activeView === "overview" && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Application Overview
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Customer Information */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-700 mb-3">
                        Student Information
                      </h3>
                      <div className="space-y-2">
                        <p className="flex justify-between">
                          <span className="text-gray-500">Name:</span>
                          <span className="font-medium">
                            {application.user.firstName}{" "}
                            {application.user.lastName}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Email:</span>
                          <span className="font-medium flex items-center">
                            {application.user.email}
                            <button
                              onClick={() => setIsUpdateEmailOpen(true)}
                              className="ml-2 text-emerald-600 hover:text-emerald-700"
                            >
                              <BiEdit />
                            </button>
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Phone:</span>
                          <span className="font-medium flex items-center">
                            +{application.user.phone}
                            <button
                              onClick={() => setIsUpdatePhoneOpen(true)}
                              className="ml-2 text-emerald-600 hover:text-emerald-700"
                            >
                              <BiEdit />
                            </button>
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Contact Status:</span>
                          <span className="font-medium">
                            {application.contactStatus || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Call Attempts:</span>
                          <span className="font-medium">
                            {application.contactAttempts || 0}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Application Details */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-700 mb-3">
                        Application Details
                      </h3>
                      <div className="space-y-2">
                        <p className="flex justify-between">
                          <span className="text-gray-500">Industry:</span>
                          <span className="font-medium">
                            {application.isf.industry}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Qualification:</span>
                          <span className="font-medium">
                            {application.isf.qualification || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Experience:</span>
                          <span className="font-medium">
                            {application.isf.yearsOfExperience} years
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Location:</span>
                          <span className="font-medium">
                            {application.isf.locationOfExperience}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">
                            Formal Education:
                          </span>
                          <span className="font-medium">
                            {application.isf.formalEducation ? "Yes" : "No"}
                            {application.isf.formalEducationAnswer &&
                              ` - ${application.isf.formalEducationAnswer}`}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Application Status */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-700 mb-3">
                        Application Status
                      </h3>
                      <div className="space-y-2">
                        <p className="flex justify-between">
                          <span className="text-gray-500">Current Status:</span>
                          <span className="font-medium">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                application.currentStatus ===
                                "Waiting for Verification"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : application.currentStatus ===
                                    "Waiting for Payment"
                                  ? "bg-green-100 text-green-800"
                                  : application.currentStatus ===
                                    "Student Intake Form"
                                  ? "bg-blue-100 text-blue-800"
                                  : application.currentStatus ===
                                    "Upload Documents"
                                  ? "bg-red-100 text-red-800"
                                  : application.currentStatus ===
                                    "Certificate Generated"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : application.currentStatus === "Dispatched"
                                  ? "bg-gray-100 text-gray-800"
                                  : application.currentStatus === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {application.currentStatus}
                            </span>
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">
                            Assigned Sales Agent:
                          </span>
                          <span className="font-medium">
                            {application.assignedAdmin || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Date Created:</span>
                          <span className="font-medium">
                            {formatDate(
                              application.status[0]?.time?.split("T")[0]
                            )}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Terms Accepted:</span>
                          <span className="font-medium">
                            {application.user.toc ? "Yes" : "No"}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-700 mb-3">
                        Payment Information
                      </h3>
                      <div className="space-y-2">
                        <p className="flex justify-between">
                          <span className="text-gray-500">Total Price:</span>
                          <span className="font-medium">
                            ${application.price || "0.00"}
                          </span>
                        </p>
                        {console.log(application)}
                        {application.partialScheme &&
                          application.payment2Deadline && (
                            <>
                              <p className="flex justify-between">
                                <span className="text-gray-500">
                                  Date of Payment 2 :
                                </span>

                                <span className="font-medium">
                                  {application.payment2Deadline
                                    ? new Date(
                                        application.payment2Deadline
                                      ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })
                                    : "Not Available"}{" "}
                                </span>
                              </p>
                            </>
                          )}
                        {application.full_paid && (
                          <p className="flex justify-between">
                            <span className="text-gray-500">
                              Date of Payment:
                            </span>
                            <span className="font-medium">
                              {application.fullPaymentDate
                                ? new Date(
                                    application.fullPaymentDate
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : "Not Available"}{" "}
                            </span>
                          </p>
                        )}
                        {application.discount > 0 && (
                          <p className="flex justify-between">
                            <span className="text-gray-500">Discount:</span>
                            <span className="font-medium text-green-600">
                              -${application.discount}
                            </span>
                          </p>
                        )}

                        <p className="flex justify-between">
                          <span className="text-gray-500">Final Price:</span>
                          <span className="font-medium">
                            ${calculateDiscountedPrice(application.price)}
                          </span>
                        </p>

                        <p className="flex justify-between">
                          <span className="text-gray-500">Payment Status:</span>
                          <span className="font-medium">
                            {application.full_paid ? (
                              <span className="flex items-center text-green-600">
                                <BiCheckCircle className="mr-1" />
                                Paid in Full
                              </span>
                            ) : application.paid &&
                              application.partialScheme ? (
                              <span className="flex items-center text-orange-500">
                                <BiCheckCircle className="mr-1" />
                                Partially Paid
                              </span>
                            ) : (
                              <span className="flex items-center text-red-500">
                                <FaTimesCircle className="mr-1" />
                                Unpaid
                              </span>
                            )}
                          </span>
                        </p>

                        {application.partialScheme && (
                          <>
                            <p className="flex justify-between">
                              <span className="text-gray-500">
                                First Payment:
                              </span>
                              <span className="font-medium">
                                ${application.payment1}
                              </span>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-gray-500">
                                Second Payment:
                              </span>
                              <span className="font-medium">
                                ${application.payment2}
                              </span>
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="mt-6 border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-medium text-gray-700">
                        Notes
                      </h3>
                      <button
                        onClick={() => {
                          setActiveView("notes");
                          setIsAddingNote(true);
                        }}
                        className="px-3 py-1 text-sm bg-emerald-50 text-emerald-600 rounded-md hover:bg-emerald-100 transition-colors"
                      >
                        {application.note ? "Edit Note" : "Add Note"}
                      </button>
                    </div>
                    {application.note ? (
                      <p className="text-gray-600">{application.note}</p>
                    ) : (
                      <p className="text-gray-400 italic">No notes added yet</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Notes View */}
            {activeView === "notes" && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Application Notes
                  </h2>

                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-3">
                      {application.note ? "Edit Note" : "Add Note"}
                    </h3>
                    <textarea
                      className="w-full border border-gray-300 rounded-md p-3 min-h-[150px] focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Enter notes about this application here..."
                    />
                    <div className="flex justify-end mt-4 gap-3">
                      <button
                        onClick={() => setIsAddingNote(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleNoteUpdate}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payments View */}
            {/* Payments View */}
            {activeView === "payments" && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Payment Management
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Current Payment Details */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-700 mb-3">
                        Current Payment Details
                      </h3>
                      <div className="space-y-3">
                        <p className="flex justify-between">
                          <span className="text-gray-500">Original Price:</span>
                          <span className="font-medium">
                            ${application.price || "0.00"}
                          </span>
                        </p>

                        {application.discount > 0 && (
                          <p className="flex justify-between">
                            <span className="text-gray-500">
                              Discount Applied:
                            </span>
                            <span className="font-medium text-green-600">
                              -${application.discount}
                            </span>
                          </p>
                        )}

                        <p className="flex justify-between">
                          <span className="text-gray-500">Final Price:</span>
                          <span className="font-medium">
                            ${calculateDiscountedPrice(application.price)}
                          </span>
                        </p>

                        <div className="border-t border-gray-200 pt-3 mt-3">
                          <p className="flex justify-between">
                            <span className="text-gray-500">
                              Payment Status:
                            </span>
                            <span className="font-medium">
                              {application.full_paid ? (
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                  Paid in Full
                                </span>
                              ) : application.paid &&
                                application.partialScheme ? (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                                  Partially Paid ($
                                  {application.payment1 || 0})
                                </span>
                              ) : (
                                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                                  Unpaid
                                </span>
                              )}
                            </span>
                          </p>
                        </div>

                        {application.partialScheme && (
                          <div className="border-t border-gray-200 pt-3 mt-3">
                            <h4 className="font-medium text-gray-700 mb-2">
                              Payment Plan
                            </h4>
                            <p className="flex justify-between">
                              <span className="text-gray-500">
                                First Payment:
                              </span>
                              <span className="font-medium">
                                ${application.payment1}
                                {application.paid && (
                                  <span className="ml-2 text-xs text-green-600">
                                    (Paid)
                                  </span>
                                )}
                              </span>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-gray-500">
                                Second Payment:
                              </span>
                              <span className="font-medium">
                                ${application.payment2}
                                {application.full_paid && (
                                  <span className="ml-2 text-xs text-green-600">
                                    (Paid)
                                  </span>
                                )}
                              </span>
                            </p>

                            <p className="flex justify-between">
                              <span className="text-gray-500">
                                Due Date for Payment 2:
                              </span>
                              <span className="font-medium">
                                {application.payment2Deadline
                                  ? new Date(
                                      application.payment2Deadline
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                  : "Not Available"}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Payment Actions */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-700 mb-3">
                        Payment Actions
                      </h3>
                      <div className="space-y-4">
                        {/* Process Payment Button - New addition */}
                        {!application.full_paid && (
                          <button
                            onClick={() => {
                              // For partial payment schemes that are already partially paid
                              if (
                                application.partialScheme &&
                                application.paid &&
                                !application.full_paid
                              ) {
                                // Set price to payment2 for second payment
                                onClickPayment(
                                  application.payment2,
                                  0,
                                  application.id,
                                  application.userId,
                                  application.partialScheme,
                                  application.paid,
                                  application.payment1,
                                  application.payment2,
                                  application.full_paid
                                );
                              }
                              // For unpaid or regular payments
                              else {
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
                                );
                              }
                            }}
                            className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                          >
                            <MdPayment />
                            {application.partialScheme &&
                            application.paid &&
                            !application.full_paid
                              ? "Process Final Payment"
                              : application.paid
                              ? "Process Remaining Payment"
                              : "Process Payment"}
                          </button>
                        )}

                        <button
                          onClick={() => setDiscountModalOpen(true)}
                          className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                        >
                          <MdPayment />
                          Apply Discount
                        </button>

                        <button
                          onClick={() => setOpenPaymentModal(true)}
                          className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                        >
                          <BiPlus />
                          Set Up Payment Plan
                        </button>

                        <button
                          className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                          onClick={() => setShowDeadlineModal(application.id)}
                        >
                          Set Deadline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Documents View */}
            {activeView === "documents" && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Application Documents
                  </h2>

                  {documentLinks.length === 0 ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                      <p className="text-gray-500">
                        No documents have been uploaded for this application.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {console.log("documentLink", documentLinks)}

                      {documentLinks.map((doc, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <p className="font-medium capitalize text-gray-700">
                              {doc.name}
                            </p>
                            <button
                              onClick={() => openModal(doc.url.fileUrl)}
                              className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-md hover:bg-emerald-100 transition-colors flex items-center gap-2"
                            >
                              <BsEye />
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            <DocumentModal
              isOpen={DocumentModalOpen}
              onClose={closeModal}
              docLink={currentDoc}
            />
            {/* Intake Form View */}
            {activeView === "intake" && viewIntakeForm && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Student Intake Form
                    </h2>

                    {!isEditingIntakeForm && (
                      <button
                        onClick={() => {
                          setIsEditingIntakeForm(true);
                          setEditedIntakeForm({
                            ...application.sif,
                            // Exclude qualification fields
                            lookingForWhatQualification: undefined,
                            qualification: undefined,
                          });
                        }}
                        className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-md hover:bg-emerald-100 transition-colors flex items-center gap-2"
                      >
                        <BiEdit />
                        Edit Form
                      </button>
                    )}
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-3">
                      Personal Information
                    </h3>

                    {isEditingIntakeForm ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            USI
                          </label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Gender
                          </label>
                          <select
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Home Address
                          </label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Suburb
                          </label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Postcode
                          </label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            value={editedIntakeForm?.state || ""}
                            onChange={(e) =>
                              setEditedIntakeForm({
                                ...editedIntakeForm,
                                state: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Credits Transfer
                          </label>
                          <select
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Year of Completion
                          </label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Highest Level of Education
                          </label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            value={editedIntakeForm?.nameOfQualification || ""}
                            onChange={(e) =>
                              setEditedIntakeForm({
                                ...editedIntakeForm,
                                nameOfQualification: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p className="flex justify-between">
                          <span className="text-gray-500">First Name:</span>
                          <span className="font-medium">
                            {application.sif?.firstName || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Last Name:</span>
                          <span className="font-medium">
                            {application.sif?.lastName || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Middle Name:</span>
                          <span className="font-medium">
                            {application.sif?.middleName || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">USI:</span>
                          <span className="font-medium">
                            {application.sif?.USI || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Gender:</span>
                          <span className="font-medium">
                            {application.sif?.gender || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Date of Birth:</span>
                          <span className="font-medium">
                            {application.sif?.dob || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Home Address:</span>
                          <span className="font-medium">
                            {application.sif?.homeAddress || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Suburb:</span>
                          <span className="font-medium">
                            {application.sif?.suburb || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Postcode:</span>
                          <span className="font-medium">
                            {application.sif?.postcode || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">State:</span>
                          <span className="font-medium">
                            {application.sif?.state || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">
                            Country of Birth:
                          </span>
                          <span className="font-medium">
                            {application.sif?.countryOfBirth || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">
                            Employment Status:
                          </span>
                          <span className="font-medium">
                            {application.sif?.employmentStatus || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">English Level:</span>
                          <span className="font-medium">
                            {application.sif?.englishLevel || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Contact Number:</span>
                          <span className="font-medium">
                            {application.sif?.contactNumber || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Email:</span>
                          <span className="font-medium">
                            {application.sif?.email || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">
                            Aboriginal or Torres Strait Islander:
                          </span>
                          <span className="font-medium">
                            {application.sif
                              ?.aboriginalOrTorresStraitIslander || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Disability:</span>
                          <span className="font-medium">
                            {application.sif?.disability || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">
                            Credits Transfer:
                          </span>
                          <span className="font-medium">
                            {application.sif?.creditsTransfer ? "Yes" : "No"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Year Completed:</span>
                          <span className="font-medium">
                            {application.sif?.YearCompleted || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">
                            Name of Qualification:
                          </span>
                          <span className="font-medium">
                            {application.sif?.nameOfQualification || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Business Name:</span>
                          <span className="font-medium">
                            {application.sif?.businessName || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">
                            Employer's Legal Name:
                          </span>
                          <span className="font-medium">
                            {application.sif?.employersLegalName || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">
                            Employer's Address:
                          </span>
                          <span className="font-medium">
                            {application.sif?.employersAddress || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">
                            Employer's Contact Number:
                          </span>
                          <span className="font-medium">
                            {application.sif?.employersContactNumber || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Position:</span>
                          <span className="font-medium">
                            {application.sif?.position || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">
                            Australian Citizen:
                          </span>
                          <span className="font-medium">
                            {application.sif?.australianCitizen || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">
                            Previous Qualifications:
                          </span>
                          <span className="font-medium">
                            {application.sif?.previousQualifications || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">
                            Date of Application:
                          </span>
                          <span className="font-medium">
                            {application.sif?.date || "N/A"}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Agreement:</span>
                          <span className="font-medium">
                            {application.sif?.agree ? "Agreed" : "Not Agreed"}
                          </span>
                        </p>
                      </div>
                    )}

                    {isEditingIntakeForm && (
                      <div className="flex justify-end mt-4 gap-3">
                        <button
                          onClick={() => {
                            setIsEditingIntakeForm(false);
                            setEditedIntakeForm(null);
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleEditIntakeForm}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Settings View */}
            {activeView === "settings" && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Application Settings
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    {/* Admin Assignment */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-700 mb-3">
                        Admin Assignment
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Current Assignment:{" "}
                        <span className="font-medium">
                          {application.assignedAdmin || "None"}
                        </span>
                      </p>
                      <button
                        onClick={() => setAssignAdminModal(true)}
                        className="w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 flex items-center justify-center gap-2"
                      >
                        <BiUser />
                        {application.assignedAdmin
                          ? "Reassign Sales Agent"
                          : "Assign Sales Agent"}
                      </button>
                    </div>

                    {/* Contact Status */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-700 mb-3">
                        Contact Status
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Call Attempts:{" "}
                        <span className="font-medium">
                          {application.contactAttempts || 0}
                        </span>
                      </p>
                      <p className="text-gray-600 mb-4">
                        Contact Status:{" "}
                        <span className="font-medium">
                          {application.contactStatus || "N/A"}
                        </span>
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        <button
                          onClick={() => setIsCallStatusModalOpen(true)}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 flex items-center justify-center gap-2"
                        >
                          <FaPhoneAlt />
                          Update Call Attempts
                        </button>
                        <button
                          onClick={() => setIsContactStatusModalOpen(true)}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 flex items-center justify-center gap-2"
                        >
                          <BiUser />
                          Update Contact Status
                        </button>
                      </div>
                    </div>

                    {/* Lead Status */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-700 mb-3">
                        Lead Status
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Current Status:{" "}
                        <span className="font-medium">
                          {getColorLabel(application.color || "white")}
                        </span>
                      </p>
                      <button
                        onClick={() => setIsColorModalOpen(true)}
                        className="w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 flex items-center justify-center gap-2"
                      >
                        <MdLabel />
                        Update Lead Status
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {/* Update Phone Modal */}
      {isUpdatePhoneOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Update Phone Number
            </h3>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={updatedPhone}
              onChange={(e) => setUpdatedPhone(e.target.value)}
              placeholder="Enter new phone number"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsUpdatePhoneOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePhoneUpdate}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                Update Phone
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Email Modal */}
      {isUpdateEmailOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Update Email Address
            </h3>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              placeholder="Enter new email address"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsUpdateEmailOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEmailUpdate}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                Update Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Update Color Modal */}
      {isColorModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Update Lead Status
            </h3>

            <div className="mb-4">
              <label
                htmlFor="color-select"
                className="block text-sm font-medium text-gray-500 mb-2"
              >
                Select Status:
              </label>
              <select
                id="color-select"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="white">White (Default)</option>
                <option value="red">Hot Lead</option>
                <option value="orange">Warm Lead</option>
                <option value="gray">Cold Lead</option>
                <option value="yellow">Proceeded With Payment</option>
                <option value="lightblue">Impacted Student</option>
                <option value="pink">Agent</option>
                <option value="green">Completed</option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsColorModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddColor}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discount Modal */}
      {discountModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Apply Discount
            </h3>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Current Price: ${application.price}
              </p>

              <label
                htmlFor="discount-input"
                className="block text-sm font-medium text-gray-500 mb-2"
              >
                Discount Amount:
              </label>
              <input
                id="discount-input"
                type="number"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="Enter discount amount"
                min="0"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDiscountModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDiscountUpdate}
                disabled={!discount || discount < 0}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Apply Discount
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Plan Modal */}
      {openPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Set Up Payment Plan
            </h3>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                {application.user.firstName} {application.user.lastName} has
                applied for {application.isf.qualification} in{" "}
                {application.isf.industry}. The total payment amount is{" "}
                {application.discount ? (
                  <span>
                    ${application.price} - ${application.discount} = $
                    {calculateDiscountedPrice(application.price)}
                  </span>
                ) : (
                  <span>${application.price}</span>
                )}
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="payment1-input"
                    className="block text-sm font-medium text-gray-500 mb-2"
                  >
                    First Payment Amount:
                  </label>
                  <input
                    id="payment1-input"
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={payment1}
                    onChange={(e) => {
                      const enteredPayment =
                        e.target.value.trim() === ""
                          ? ""
                          : parseFloat(e.target.value);
                      setPayment1(enteredPayment);
                      setPayment2(
                        enteredPayment && enteredPayment < application.price
                          ? application.discount
                            ? application.price -
                              enteredPayment -
                              application.discount
                            : application.price - enteredPayment
                          : ""
                      );
                    }}
                    placeholder="Enter first payment amount"
                    min="0"
                  />
                </div>

                <div>
                  <label
                    htmlFor="payment2-input"
                    className="block text-sm font-medium text-gray-500 mb-2"
                  >
                    Second Payment Amount:
                  </label>
                  <input
                    id="payment2-input"
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={payment1 ? payment2 : ""}
                    placeholder="Enter second payment amount"
                    min="0"
                    readOnly
                  />
                </div>
                <div>
                  <label
                    htmlFor="payment2-deadline"
                    className="block text-sm font-medium text-gray-500 mb-2"
                  >
                    Second Payment Deadline:
                  </label>
                  <input
                    id="payment2-deadline"
                    type="date"
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={payment2Deadline}
                    onChange={(e) => setPayment2Deadline(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenPaymentModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentUpdate}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                // disabled={!payment1 || !payment2}
              >
                Set Up Payment Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Call Attempts Modal */}
      {isCallStatusModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Update Call Attempts
            </h3>

            <div className="mb-4">
              <label
                htmlFor="call-attempts-select"
                className="block text-sm font-medium text-gray-500 mb-2"
              >
                Number of Call Attempts:
              </label>
              <select
                id="call-attempts-select"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={callAttempts}
                onChange={(e) => setCallAttempts(parseInt(e.target.value))}
              >
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsCallStatusModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCallAttempts}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                Update Call Attempts
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Status Modal */}
      {isContactStatusModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Update Contact Status
            </h3>

            <div className="mb-4">
              <label
                htmlFor="contact-status-select"
                className="block text-sm font-medium text-gray-500 mb-2"
              >
                Contact Status:
              </label>
              <select
                id="contact-status-select"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={contactStatus}
                onChange={(e) => setContactStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Voice Mail">Voice Mail</option>
                <option value="No pick up">No pick up</option>
                <option value="Request Follow Up">Request Follow Up</option>
                <option value="Picked Up">Picked Up</option>
                <option value="Invalid Number">Invalid Number</option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsContactStatusModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateContactStatus}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                disabled={!contactStatus}
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Assignment Modal */}
      {assignAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Assign Sales Agent
            </h3>

            <div className="mb-4">
              <label
                htmlFor="admin-select"
                className="block text-sm font-medium text-gray-500 mb-2"
              >
                Select Admin:
              </label>
              <select
                id="admin-select"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={selectedAdmin}
                onChange={(e) => setSelectedAdmin(e.target.value)}
              >
                <option value="">Select Admin</option>
                {possibleAdmins.map((admin) => (
                  <option key={admin} value={admin}>
                    {admin}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setAssignAdminModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignAdmin}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                disabled={!selectedAdmin}
              >
                Assign Sales Agent
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deadline Setting Modal */}
      {showDeadlineModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Set Payment Deadline</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded p-2"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700"
                onClick={() => setShowDeadlineModal(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-emerald-600 rounded-lg text-white"
                onClick={handleSetDeadline}
              >
                Save Deadline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete/Archive Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Confirm Archive
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to archive this application? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteApplication}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Archive Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Application;
