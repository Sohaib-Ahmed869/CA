import React, { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { FaTimesCircle } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import { BiDownload } from "react-icons/bi";
import { BiEnvelopeOpen } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { BsArrowUpRight } from "react-icons/bs";
import { BsClock } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { BiUpload } from "react-icons/bi";
import { FaCertificate } from "react-icons/fa";
import { BsTruck } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { CgTrack } from "react-icons/cg";
import { GrFormAdd } from "react-icons/gr";
import { IoCall } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import applicationsimg from "../../assets/applications.png";
import { BiEdit } from "react-icons/bi";
import PaymentPage from "../../Customer/checkoutForm";
import Loader from "../../Customer/components/loader";
import { getAuth } from "firebase/auth";
import Papa from "papaparse";
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

const hasChangeAccess = () => {
  const auth = getAuth();
  const currentUserId = auth.currentUser.uid;

  const allowedUserIds = [
    "SE6BCPgaNzOFAD3N181iia2iCUG2",
    "wJ1LPS7YLDMpGzKY6HHVm9na9wA2",
  ];
  return allowedUserIds.includes(currentUserId);
};

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
  const [color, setColor] = useState("");
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [note, setNote] = useState(application.note || "");
  const [isUpdateEmailOpen, setIsUpdateEmailOpen] = useState(false);
  const [isUpdatePhoneOpen, setIsupdatePhoneOpen] = useState(false);
  const [callAttempts, setCallAttempts] = useState(1);
  const [contactStatus, setContactStatus] = useState("");
  const [isCallStatusModalOpen, setIsCallStatusModalOpen] = useState(false);
  const [isContactStatusModalOpen, setIsContactStatusModalOpen] =
    useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // For the delete confirmation modal
  const [applicationToDelete, setApplicationToDelete] = useState(null); // Track the application to delete

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  //self-note: add possible admins to the state
  const [possibleAdmins, setPossibleAdmins] = useState([
    "Gabi",
    "Sidra",
    "Sameer",
    "Aayan",
    "Ilhan",
    "Azhar",
  ]);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [assignAdminModal, setAssignAdminModal] = useState(false);

  const [payment1, setPayment1] = useState("");
  const [payment2, setPayment2] = useState("");
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [updatedPhone, setUpdatedPhone] = useState(
    application.user.phone || ""
  );
  const [updatedEmail, setUpdatedEmail] = useState(
    application.user.email || ""
  );

  const handleDeleteClick = (applicationId) => {
    setApplicationToDelete(applicationId);
    setShowDeleteModal(true);
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
        toast.error("Failed to delete application");
      }
      setSubmissionLoading(false);
    } catch (error) {
      toast.error("Error deleting application");
      setSubmissionLoading(false);
    } finally {
      setShowDeleteModal(false);
      setApplicationToDelete(null);
    }
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

  const handleAddColor = async () => {
    try {
      setSubmissionLoading(true);
      const response = await addColorToApplication(application.id, color);
      if (response.message === "Color updated successfully") {
        toast.success("Color updated successfully!");
        // Update the local application state
        const updatedApplication = {
          ...application,
          color,
        };

        setSelectedApplication(updatedApplication);
        setColor("");
        setIsColorModalOpen(false);
        setSubmissionLoading(false);
        await getApplicationsData();
      } else {
        toast.error("Failed to update color.");
        setSubmissionLoading(false);
      }
    } catch (err) {
      console.error("Error updating color:", err);
      toast.error("An error occurred while updating the color.");
      setSubmissionLoading(false);
    }
  };

  const handlePhoneUpdate = async () => {
    try {
      setSubmissionLoading(true);
      const response = await updatePhone(application.user.id, updatedPhone);
      if (response === "error") {
        toast.error("Failed to update phone number.");
      } else {
        toast.success("Phone number updated successfully!");
        // Update the local application state
        const updatedApplication = {
          ...application,
          user: { ...application.user, phone: updatedPhone },
        };
        setSelectedApplication(updatedApplication);
      }
      setSubmissionLoading(false);
      setIsupdatePhoneOpen(false);

      await getApplicationsData();
    } catch (error) {
      console.error("Error updating phone:", error);
      toast.error("An error occurred while updating the phone number.");
      setSubmissionLoading(false);
    }
  };

  const handleEmailUpdate = async () => {
    try {
      setSubmissionLoading(true);
      const response = await updateEmail(application.user.id, updatedEmail);
      if (response === "error") {
        toast.error("Failed to update email.");
      } else {
        toast.success("Email updated successfully!");
        // Update the local application state
        const updatedApplication = {
          ...application,
          user: { ...application.user, email: updatedEmail },
        };
        setSelectedApplication(updatedApplication);
      }
      setSubmissionLoading(false);
      setIsUpdateEmailOpen(false);

      await getApplicationsData();
    } catch (error) {
      console.error("Error updating email:", error);
      toast.error("An error occurred while updating the email.");
      setSubmissionLoading(false);
    }
  };

  const handlePaymentUpdate = async () => {
    try {
      setSubmissionLoading(true);
      const response = await dividePayment(application.id, payment1, payment2);
      if (response === "error") {
        toast.error("Failed to divide payment.");
      } else {
        toast.success("Payment divided successfully!");
        // Update the local application state
        const updatedApplication = {
          ...application,
          price: response.price,
        };
        setSelectedApplication(updatedApplication);
      }
      setSubmissionLoading(false);
      setOpenPaymentModal(false);

      await getApplicationsData();
    } catch (error) {
      console.error("Error dividing payment:", error);
      toast.error("An error occurred while dividing the payment.");
      setSubmissionLoading(false);
    }
  };

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
        // Update the local application state
        const updatedApplication = {
          ...application,
          assignedAdmin: selectedAdmin,
        };
        setSelectedApplication(updatedApplication);
      }
      setSubmissionLoading(false);
      setAssignAdminModal(false);

      await getApplicationsData();
    } catch (error) {
      console.error("Error assigning admin:", error);

      toast.error("An error occurred while assigning the admin.");
      setSubmissionLoading(false);
    }
  };

  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [discount, setDiscount] = useState("");
  const [isEditingIntakeForm, setIsEditingIntakeForm] = useState(false);
  const [editedIntakeForm, setEditedIntakeForm] = useState(null);

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
      // Update the local application state
      const updatedApplication = {
        ...application,
        discount: data.discount,
      };
      setSelectedApplication(updatedApplication);
      setDiscountModalOpen(false);
      setDiscount("");
      //fetch updated applications
      await getApplicationsData();
      // go back to applications page
    } catch (error) {
      console.error("Error updating discount:", error);
      toast.error("Failed to apply discount");
    } finally {
      setSubmissionLoading(false);
    }
  };

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
      // Update the local application state
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
      // Update the local application state
      const updatedApplication = {
        ...application,
        contactStatus,
      };

      setSelectedApplication(updatedApplication);

      setIsCallStatusModalOpen(false);

      await getApplicationsData();
    } catch (error) {
      console.error("Error updating contact status:", error);
      toast.error("Failed to update contact status");
    } finally {
      setSubmissionLoading(false);
    }
  };

  const calculateDiscountedPrice = (price) => {
    // Remove commas and convert to number
    const cleanPrice = parseFloat(price.toString().replace(/,/g, ""));
    return (cleanPrice - application.discount).toFixed(2);
  };

  const handleNoteUpdate = async () => {
    try {
      setSubmissionLoading(true);
      const response = await addNoteToApplication(application.id, note);
      if (response === "error") {
        toast.error("Failed to update note");
      } else {
        toast.success("Note updated successfully!");
        // Update the local application state
        const updatedApplication = {
          ...application,
          note: note,
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
          <p className="text-sm  text-gray-500">
            This application has been assigned to{" "}
            <span className="font-bold text-black">
              {" "}
              {application.assignedAdmin || "N/A"}{" "}
            </span>
          </p>
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
              {application.note ? "Edit Note" : "Add Note"}
            </button>
          </div>
          {application.note && !isAddingNote && (
            <p className="text-gray-600">{application.note}</p>
          )}
        </div>

        <div className="col-span-4 bg-white p-4 rounded-lg shadow-lg w-full">
          <h1 className="text-lg font-semibold text-gray-800">Discount</h1>
          <div className="grid grid-cols-2 gap-4">
            {application.discount ? (
              <p>
                Discount: {application.discount}/- applied from original price:
                ${application.price} so the final price is: ${" "}
                {calculateDiscountedPrice(application.price)}
              </p>
            ) : (
              <p>No discount applied</p>
            )}
          </div>
        </div>

        <div className="col-span-4 bg-white p-4 rounded-lg shadow-lg w-full">
          <div className="flex items-start justify-between">
            <div className="text-sm text-gray-500">
              <h2 className="text-lg font-semibold text-gray-800">
                Call Attempts and Contact Status
              </h2>
              <p>Call Attempts: {application.contactAttempts || 0}</p>
              <p>Contact Status: {application.contactStatus || "N/A"}</p>
              <h2 className="text-lg font-semibold text-gray-800">
                Initial Screening Information
              </h2>
              <p>First Name: {application.user.firstName}</p>
              <p>Last Name: {application.user.lastName}</p>
              <div>
                <h2 className="text-lg font-semibold">Contact Information</h2>
                <p className="flex items-center">
                  Phone: +{application.user.phone}{" "}
                  <button
                    className="btn-sm btn-secondary ml-2"
                    onClick={() => setIsupdatePhoneOpen(true)}
                  >
                    Update Phone
                  </button>
                </p>
                <p className="flex item-center">
                  Email: {application.user.email}{" "}
                  <button
                    className="btn-sm btn-secondary ml-2"
                    onClick={() => setIsUpdateEmailOpen(true)}
                  >
                    Update Email
                  </button>
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
                onClick={() => setOpenPaymentModal(true)}
                className="btn-sm btn-primary rounded-xl flex items-center justify-center gap-2 text-white bg-primary px-4 py-5"
              >
                Divide Payment
              </button>
              <button
                onClick={() => setIsColorModalOpen(true)}
                className="btn-sm btn-warning rounded-xl flex items-center justify-center gap-2 text-white bg-primary px-4 py-5"
              >
                Add/Update Color
              </button>
              <button
                onClick={() => setDiscountModalOpen(true)}
                className="btn-sm btn-primary rounded-xl flex items-center justify-center gap-2 text-white bg-primary px-4 py-5"
              >
                Add Discount
              </button>

              <button
                onClick={() => setAssignAdminModal(true)}
                className="btn-sm btn-primary rounded-xl flex items-center justify-center gap-2 text-white bg-primary px-4 py-5"
              >
                Assign Admin
              </button>
              <button
                onClick={() => setIsCallStatusModalOpen(true)}
                className="btn-sm btn-primary rounded-xl flex items-center justify-center gap-2 text-white bg-primary px-4 py-5"
              >
                Update Call Status
              </button>
              <button
                onClick={() => setIsContactStatusModalOpen(true)}
                className="btn-sm btn-primary rounded-xl flex items-center justify-center gap-2 text-white bg-primary px-4 py-5"
              >
                Update Contact Status
              </button>
              <button
                onClick={() => resendEmailFunc(application.userId)}
                className="btn-sm btn-primary rounded-xl flex items-center justify-center gap-2 text-white bg-primary px-4 py-5"
              >
                Resend Email
              </button>
              <button
                onClick={() => onClickInitiateCall(application.id)}
                className="btn-sm btn-primary rounded-xl flex items-center justify-center gap-2 text-white bg-primary px-4 py-5"
              >
                Call Now
              </button>

              <button
                onClick={() => handleDeleteClick(application.id)}
                className="btn-sm btn-danger rounded-xl flex items-center justify-center gap-2 text-white bg-primary px-4 py-5"
              >
                Archive Application
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
                {application.note ? "Edit Note" : "Add Note"}
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
                {application.note ? "Update Note" : "Add Note"}
              </button>
            </div>
          </dialog>
        )}

        {isCallStatusModalOpen && (
          <dialog className="modal modal-open">
            <div className="modal-box">
              <button
                className="btn btn-secondary float-right"
                onClick={() => setIsCallStatusModalOpen(false)}
              >
                Close
              </button>
              <h3 className="font-bold text-lg">Update Call Status</h3>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Call Attempts
                </label>
                <select
                  className="select select-bordered w-full mt-1"
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

              <button
                className="btn btn-primary mt-4 w-full"
                onClick={handleUpdateCallAttempts}
              >
                Update Call Attempts
              </button>
            </div>
          </dialog>
        )}

        {isContactStatusModalOpen && (
          <dialog className="modal modal-open">
            <div className="modal-box">
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Contact Status
                </label>
                <select
                  className="select select-bordered w-full mt-1"
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

              <button
                className="btn btn-primary mt-4 w-full"
                onClick={handleUpdateContactStatus}
                disabled={!contactStatus}
              >
                Update Status
              </button>
              <button
                className="btn btn-secondary mt-4 w-full"
                onClick={() => setIsContactStatusModalOpen(false)}
              >
                Close
              </button>
            </div>
          </dialog>
        )}

        {discountModalOpen && (
          <dialog className="modal modal-open">
            <div className="modal-box">
              <button
                className="btn btn-secondary float-right"
                onClick={() => setDiscountModalOpen(false)}
              >
                Close
              </button>
              <h3 className="font-bold text-lg">Add Discount</h3>
              <p className="text-sm mt-4">
                Current Price: ${application.price}
              </p>
              <input
                type="number"
                className="input input-bordered w-full mt-4"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="Enter discount amount"
                min="0"
              />
              <button
                className="btn btn-primary mt-4 w-full"
                onClick={handleDiscountUpdate}
                disabled={!discount || discount < 0}
              >
                Apply Discount
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
                    className="btn btn-primary btn-sm text-white mt-3"
                  >
                    Edit Form
                  </button>
                )}
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
        {isColorModalOpen && (
          <dialog className="modal modal-open">
            <div className="col-span-4 bg-white p-4 rounded-lg shadow-lg">
              <button
                onClick={() => setIsColorModalOpen(false)}
                className="mt-4 mr-4 float-right"
              >
                <FaTimes className="text-lg" />
              </button>
              <h2 className="text-lg font-semibold text-gray-800">
                Add/Update Application Color
              </h2>
              <label htmlFor="color-select" className="block text-gray-700">
                Select Color:
              </label>
              <select
                id="color-select"
                className="select select-bordered w-full mb-4"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="white">White (Default)</option>
                <option value="red">Hot Lead</option>
                <option value="orange">Warm Lead</option>
                <option value="gray">Cold Lead </option>
                <option value="yellow">Proceeded With Payment</option>
                <option value="lightblue">Impacted Student</option>
                <option value="pink">Agent</option>
                <option value="green">Completed</option>
              </select>
              <div className="flex justify-end">
                <button
                  onClick={handleAddColor}
                  className="btn btn-primary text-white"
                >
                  Update Color
                </button>
              </div>
            </div>
          </dialog>
        )}

        {/* Update Phone Modal */}
        {isUpdatePhoneOpen && (
          <dialog className="modal modal-open">
            <div className="modal-box">
              <button
                className="btn btn-secondary float-right"
                onClick={() => setIsupdatePhoneOpen(false)}
              >
                Close
              </button>
              <h3 className="font-bold text-lg">Update Phone</h3>
              <input
                className="input input-bordered w-full mt-4"
                value={updatedPhone}
                onChange={(e) => setUpdatedPhone(e.target.value)}
                placeholder="Enter new phone number"
              />
              <button
                className="btn btn-primary mt-4 w-full"
                onClick={handlePhoneUpdate}
              >
                Update Phone
              </button>
            </div>
          </dialog>
        )}

        {/* Update Email Modal */}
        {isUpdateEmailOpen && (
          <dialog className="modal modal-open">
            <div className="modal-box">
              <button
                className="btn btn-secondary float-right"
                onClick={() => setIsUpdateEmailOpen(false)}
              >
                Close
              </button>
              <h3 className="font-bold text-lg">Update Email</h3>
              <input
                className="input input-bordered w-full mt-4"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
                placeholder="Enter new email address"
              />
              <button
                className="btn btn-primary mt-4 w-full"
                onClick={handleEmailUpdate}
              >
                Update Email
              </button>
            </div>
          </dialog>
        )}

        {openPaymentModal && (
          <dialog className="modal modal-open">
            <div className="modal-box">
              <button
                className="btn btn-secondary float-right"
                onClick={() => setOpenPaymentModal(false)}
              >
                Close
              </button>
              <h3 className="font-bold text-lg">Divide Payment</h3>
              <p className="text-sm mt-4">
                {application.user.firstName} {application.user.lastName} has
                applied for {application.isf.qualification} in{" "}
                {application.isf.industry}. The total payment amount is{" "}
                {application.price}.
              </p>
              <input
                className="input input-bordered w-full mt-4"
                value={payment1}
                onChange={(e) => setPayment1(e.target.value)}
                placeholder="Enter first payment amount"
              />
              <input
                className="input input-bordered w-full mt-4"
                value={payment2}
                onChange={(e) => setPayment2(e.target.value)}
                placeholder="Enter second payment amount"
              />
              <button
                className="btn btn-primary mt-4 w-full"
                onClick={handlePaymentUpdate}
              >
                Divide Payment
              </button>
            </div>
          </dialog>
        )}

        {assignAdminModal && (
          <dialog className="modal modal-open">
            <div className="modal-box">
              <button
                className="btn btn-secondary float-right"
                onClick={() => setAssignAdminModal(false)}
              >
                Close
              </button>
              <h3 className="font-bold text-lg">Assign Admin</h3>
              <label
                htmlFor="admin-select"
                className="block text-gray-700 mt-5 mb-5"
              >
                Select Admin:
              </label>
              <select
                id="admin-select"
                className="select select-bordered w-full mb-4"
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
              <button
                className="btn btn-primary mt-4 w-full"
                onClick={handleAssignAdmin}
              >
                Assign Admin
              </button>
            </div>
          </dialog>
        )}

        {showDeleteModal && (
          <dialog open className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Confirm Deletion</h3>
              <p className="py-4">
                Are you sure you want to archive this application? This action
                cannot be undone.
              </p>
              <div className="modal-action">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={confirmDeleteApplication}
                >
                  Confirm
                </button>
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

  const [filterOptions, setFilterOptions] = useState([
    "All",
    "Assigned to Gabi",
    "Assigned to Sidra",
    "Assigned to Sameer",
    "Assigned to Aayan",
    "Assigned to Ilhan",
    "Assigned to Azhar",
    "Assigned to N/A",
  ]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const [colorFilterOptions] = useState([
    "All",
    "Hot Lead",
    "Warm Lead",
    "Cold Lead",
    "Proceeded With Payment",
    "Impacted Student",
    "Agent",
    "Completed",
    "Default",
  ]);
  const [selectedColorFilter, setSelectedColorFilter] = useState("All");

  const handleColorFilterChange = (e) => {
    setSelectedColorFilter(e.target.value);
  };

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
      setApplications(response);
      setSubmissionLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
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

  const onClickStudentForm = () => {
    navigate("/student-intake-form");
  };

  const onClickUpload = () => {
    navigate("/upload-documents");
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

  const ExportButton = () => {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
      try {
        setIsExporting(true);

        // Fetch data from backend
        const response = await fetch(`${URL}/api/applications/export`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const { applications } = await response.json();

        // Generate CSV using Papa Parse
        const csv = Papa.unparse(applications, {
          quotes: true,
          header: true,
        });

        // Create and download the file
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `applications_${
          new Date().toISOString().split("T")[0]
        }.csv`;
        document.body.appendChild(link);
        link.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);

        toast.success("Applications exported successfully");
      } catch (error) {
        console.error("Error exporting applications:", error);
        toast.error("Failed to export applications");
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
        {isExporting ? "Exporting..." : "Export to CSV"}
      </button>
    );
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
                    htmlFor="assignmentFilter"
                    className="text-sm block mb-2"
                  >
                    Filter by Assignment
                  </label>
                  <select
                    id="assignmentFilter"
                    className="select select-bordered w-full"
                    value={selectedFilter}
                    onChange={handleFilterChange}
                  >
                    {filterOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label htmlFor="colorFilter" className="text-sm block mb-2">
                    Filter by Status
                  </label>
                  <select
                    id="colorFilter"
                    className="select select-bordered w-full"
                    value={selectedColorFilter}
                    onChange={handleColorFilterChange}
                  >
                    {colorFilterOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
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
                <div className="flex-1">
                  <label
                    htmlFor="callAttemptsFilter"
                    className="text-sm block mb-2"
                  >
                    Filter by Call Attempts
                  </label>
                  <select
                    id="callAttemptsFilter"
                    className="select select-bordered w-full"
                    value={selectedCallAttemptsFilter}
                    onChange={(e) =>
                      setSelectedCallAttemptsFilter(e.target.value)
                    }
                  >
                    <option value="All">All</option>
                    <option value="1">1 Attempt</option>
                    <option value="2">2 Attempts</option>
                    <option value="3">3 Attempts</option>
                    <option value="4">4 Attempts</option>
                    <option value="5">5 Attempts</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 mb-5">
            <ExportButton />
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
                  <th className="font-semibold text-center">Status</th>
                  <th className="text-center w-52">Notes</th>

                  <th className="font-semibold text-center">Payment Status</th>
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
                {currentItems
                  .filter((application) => !application.archive) // Only show non-archived applications
                  .map((application) => (
                    <tr
                      key={application.id}
                      className={`animate-fade-up items-center overflow-auto `}
                    >
                      <td className={`p-5 flex items-center`}>
                        <div className="flex flex-col">
                          {application.applicationId
                            ? application.applicationId
                            : application.id}{" "}
                          <br></br>
                          {application.color && (
                            <>
                              (
                              {application.color === "red"
                                ? "Hot Lead"
                                : application.color === "yellow"
                                ? "Proceeded With Payment"
                                : application.color === "orange"
                                ? "Warm Lead"
                                : application.color === "gray"
                                ? "Cold Lead"
                                : application.color === "lightblue"
                                ? "Impacted Student"
                                : application.color === "pink"
                                ? "Agent"
                                : application.color === "green"
                                ? "Completed"
                                : "N/A"}
                              )
                            </>
                          )}
                          {application.assignedAdmin && (
                            <p className="text-sm text-gray-500">
                              Assigned to: {application.assignedAdmin}
                            </p>
                          )}
                        </div>

                        {/* <BsEye
                        className="text-blue-500 ml-2 cursor-pointer"
                        onClick={() => setSelectedApplication(application)}
                      /> */}
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
                      <td className="text-center">
                        {application.isf.industry}
                      </td>
                      <td className="p-2 flex items-center justify-center flex-col mt-5 w-60">
                        {application.currentStatus === "Sent to RTO" ? (
                          // Only show "Sent to RTO" if:
                          // 1. For partial schemes: both paid and full_paid must be true
                          // 2. For non-partial schemes: paid must be true
                          (
                            application.partialScheme
                              ? application.paid && application.full_paid
                              : application.paid
                          ) ? (
                            <div className="p-1 rounded-full bg-red-600 text-white flex items-center justify-center gap-2 max-sm:text-center">
                              <BsArrowUpRight className="text-white" />
                              Sent to RTO
                            </div>
                          ) : (
                            <div className="p-1 rounded-full bg-green-400 text-white flex items-center justify-center gap-2 max-sm:text-center">
                              <BsClock className="text-white" />
                              Waiting for Payment
                            </div>
                          )
                        ) : application.currentStatus === "Sent to Assessor" ? (
                          (
                            application.partialScheme
                              ? application.paid && application.full_paid
                              : application.paid
                          ) ? (
                            <div className="p-1 rounded-full bg-red-600 text-white flex items-center justify-center gap-2 max-sm:text-center">
                              <BsArrowUpRight className="text-white" />
                              Sent to Assessor
                            </div>
                          ) : (
                            <div className="p-1 rounded-full bg-green-400 text-white flex items-center justify-center gap-2 max-sm:text-center">
                              <BsClock className="text-white" />
                              Waiting for Payment
                            </div>
                          )
                        ) : application.currentStatus ===
                          "Waiting for Verification" ? (
                          <div className="p-1 rounded-full bg-yellow-300 text-black flex items-center justify-center gap-2 max-sm:text-center">
                            <BsClock className="text-black" />
                            {application.currentStatus}
                          </div>
                        ) : application.currentStatus ===
                          "Waiting for Payment" ? (
                          <div className="p-1 rounded-full bg-green-400 text-white flex items-center justify-center gap-2  max-sm:text-center">
                            <BsClock className="text-white" />
                            {application.currentStatus}
                          </div>
                        ) : application.currentStatus ===
                          "Student Intake Form" ? (
                          <div className="p-1 rounded-full bg-blue-900 text-white flex items-center justify-center gap-2 max-sm:text-center">
                            <BiUser className="text-white" />
                            {application.currentStatus}
                          </div>
                        ) : application.currentStatus === "Upload Documents" ? (
                          <div className="p-1 rounded-full bg-red-900 text-white flex items-center justify-center gap-2  ">
                            <BiUpload className="text-white" />
                            {application.currentStatus}
                          </div>
                        ) : application.currentStatus ===
                          "Certificate Generated" ? (
                          <div className="p-1 rounded-full bg-primary text-white flex items-center justify-center gap-2  ">
                            <FaCertificate className="text-white" />
                            {application.currentStatus}
                          </div>
                        ) : application.currentStatus === "Dispatched" ? (
                          <div className="p-1 rounded-full bg-black text-white flex items-center justify-center gap-2  ">
                            <BsTruck className="text-white" />
                            {application.currentStatus}
                          </div>
                        ) : (
                          application.currentStatus === "Completed" && (
                            <div className="p-1 rounded-full bg-green-500 text-white flex items-center justify-center gap-2  ">
                              <BiCheck className="text-white" />
                              {application.currentStatus}
                            </div>
                          )
                        )}
                      </td>
                      <td className="items-center justify-center relative">
                        {application.note ? (
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-center w-full">
                              {application.note}
                            </p>
                            {/* <p
                            className="cursor-pointer bg-white border-0 btn-sm rounded absolute top-2 right-2 hover:bg-white"
                            onClick={() => {
                              setSelectedApplicationId(application.id);
                              setNote(application.note);
                              window.scrollTo(0, 0);
                              setAddNoteModal(true);
                              //tale to the top of the page
                            }}
                          >
                            <BiEdit />
                          </p> */}
                          </div>
                        ) : (
                          // <button
                          //   className="btn bg-white border-0 btn-sm rounded w-full"
                          //   onClick={() => {
                          //     setSelectedApplicationId(application.id);
                          //     window.scrollTo(0, 0);
                          //     setAddNoteModal(true);
                          //   }}
                          // >
                          //   <GrFormAdd />
                          // </button>
                          <p className="text-sm text-center w-full">No notes</p>
                        )}
                      </td>
                      {/* <td className=" text-center">
                        {application.full_paid ? (
                          <BiCheckCircle className="text-green-500 text-xl" />
                        ) : (
                          <FaTimesCircle className="text-red-500 text-xl" />
                        )}
                      </td> */}
                      <td className="text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center gap-2">
                            {application.full_paid ? (
                              <span className="flex items-center text-green-500">
                                <BiCheckCircle className="mr-1" />
                                Paid in Full
                              </span>
                            ) : application.paid &&
                              application.partialScheme ? (
                              <span className="flex items-center text-orange-500">
                                Partial: ${application.amount_paid || 0} / $
                                {calculateDiscountedPrice(
                                  application.price,
                                  application.discount
                                )}
                              </span>
                            ) : (
                              <span className="flex items-center text-red-500">
                                <FaTimesCircle className="mr-1" />
                                Due: $
                                {calculateDiscountedPrice(
                                  application.price,
                                  application.discount
                                )}
                              </span>
                            )}
                          </div>
                          {application.discount && (
                            <span className="text-xs text-gray-500">
                              Discount: ${application.discount}
                            </span>
                          )}
                          {!application.full_paid && application.price && (
                            <span className="text-xs text-gray-500">
                              Original: ${application.price}
                            </span>
                          )}
                        </div>
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
                        application.currentStatus ===
                          "Certificate Generated" ? (
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
