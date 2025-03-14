import React, { useState, useEffect } from "react";
import JSZip from "jszip";
import { BsEye, BsClock, BsCalendarDate } from "react-icons/bs";
import {
  BiCertification,
  BiUpload,
  BiCheck,
  BiSearch,
  BiRefresh,
  BiArrowBack,
} from "react-icons/bi";
import {
  FaTimes,
  FaFileAlt,
  FaRegFileAlt,
  FaFileDownload,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { MdLocationOn, MdWorkOutline, MdSchool } from "react-icons/md";
import { VscDebugBreakpointData } from "react-icons/vsc";
import { TbReportMoney } from "react-icons/tb";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import pending from "../../assets/pending.png";
import { getApplications } from "../../Customer/Services/rtoservices";
import {
  uploadCertificate,
  requestMoreDocuments,
} from "../../Customer/Services/adminServices";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import DocumentModal from "../../Customer/components/viewDocsModal";
import RequestMoreDocuments from "../RequestMoreDocuments/RequestMoreDocuments";

const Approval = () => {
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentLinks, setDocumentLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [dateFilter, setDateFilter] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedTab, setSelectedTab] = useState("overview");

  const applicationsPerPage = 10;
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [message, setMessage] = useState("");
  const [totalApplications, setTotalApplications] = useState(0);
  const [DocumentModalOpen, setDocumentModalOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState("");
  const [SingleDocModelOpen, setSingleDocModelOpen] = useState(false);
  const [showRequestDocsModal, setShowRequestDocsModal] = useState(false);

  const CloseRequestDocsModal = () => {
    setShowRequestDocsModal(false);
  };
  const OpenRequestDocsModal = () => {
    setShowRequestDocsModal(true);
  };
  // Function to open modal with selected document
  const openModal = (doc) => {
    setCurrentDoc(doc); // Directly set the file URL
    setDocumentModalOpen(true);
  };

  const closedocModal = () => {
    setDocumentModalOpen(false);
    // Revoke the object URL to prevent memory leaks
    setCurrentDoc("");
  };

  // List of possible application statuses
  const statusOptions = [
    "All",
    "Student Intake Form",
    "Upload Documents",
    "Sent to RTO",
    "Waiting for Verification",
    "Certificate Generated",
  ];

  const handleReject = (id) => {
    const newApplications = applications.map((application) => {
      if (application.id === id) {
        return {
          ...application,
          status: "Rejected",
        };
      }
      return application;
    });
    setApplications(newApplications);
    toast.success("Application rejected");
  };

  const handleOpenModal = (id) => {
    setSelectedApplicationId(id);
    document.getElementById("uploadCertificateModal").showModal();
  };

  const closeModal = () => {
    document.getElementById("uploadCertificateModal").close();
  };

  const openDocument = (url) => {
    console.log("Opening document:", url);
    window.open(url, "_blank");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCertificateFile(file);
      console.log("File selected:", file);
    } else {
      console.log("No file selected");
    }
  };

  const onClickViewDocuments = async (application) => {
    console.log("Viewing documents for application:", application);

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

    // Loop through each document key, open the link if it's not null
    const links = documentKeys
      .map((docKey) => ({
        name: docKey,
        url: application.document && application.document[docKey],
      }))
      .filter((doc) => doc.url); // Filter out null/undefined URLs

    setDocumentLinks(links);
    document.getElementById("documentLinksModal").showModal();
  };

  const filterDates = (applications, daysFilter) => {
    if (daysFilter === "All") return applications;

    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - parseInt(daysFilter));

    return applications.filter((app) => {
      if (!app.status || !app.status[0] || !app.status[0].time) return false;
      const appDate = new Date(app.status[0].time);
      return appDate >= pastDate;
    });
  };

  // Function to get all eligible applications for RTO
  const getRTOApplications = async () => {
    const rtoType = localStorage.getItem("rtoType");

    try {
      setSubmissionLoading(true);
      const applicationsData = await getApplications();

      // Filter applications that meet our criteria:
      // 1. Student form and documents are uploaded
      // 2. Payment is fully completed (not partial)
      // 3. Match the RTO type or are 'default' type
      const eligibleApplications = applicationsData.filter((app) => {
        console.log("Checking application:", app);
        // Check if student form is filled
        const hasStudentForm =
          app.sif && Object.keys(app.sif).length > 0 && app.sif.firstName;

        // Check if documents are uploaded
        const hasDocuments =
          app.document &&
          Object.keys(app.document).length > 0 &&
          app.document.resume;

        // Check if payment is completely done (not partial)
        const isPaymentComplete =
          app.paid === true &&
          (!app.partialScheme || (app.partialScheme && app.full_paid === true));

        return hasStudentForm && hasDocuments && isPaymentComplete;
      });

      setApplications(eligibleApplications);
      setTotalApplications(eligibleApplications.length);

      // Calculate total pages
      setTotalPages(
        Math.ceil(eligibleApplications.length / applicationsPerPage)
      );
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to fetch applications");
    } finally {
      setSubmissionLoading(false);
    }
  };

  useEffect(() => {
    getRTOApplications();
  }, []);

  const downloadAllDocsAsZip = async () => {
    try {
      setSubmissionLoading(true);
      const zip = new JSZip();
      const folder = zip.folder("Documents");

      // Create an array of promises for each fetch
      const fetchPromises = documentLinks.map(async (doc) => {
        try {
          const response = await fetch(doc.url);
          const blob = await response.blob();

          // Get file extension from URL or default to '.pdf'
          const fileExtension = doc.url.split(".").pop().toLowerCase() || "pdf";
          const fileName = `${doc.name}.${fileExtension}`;

          folder.file(fileName, blob);
          return true;
        } catch (error) {
          console.error(`Error fetching ${doc.name}:`, error);
          return false;
        }
      });

      // Wait for all fetches to complete
      await Promise.all(fetchPromises);

      // Create a download link for the zip file
      const zipContent = await zip.generateAsync({ type: "blob" });
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(zipContent);
      downloadLink.download = "Documents.zip";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      toast.success("Documents downloaded successfully");
    } catch (error) {
      console.error("Error creating zip file:", error);
      toast.error("Failed to download documents");
    } finally {
      setSubmissionLoading(false);
    }
  };

  // Pagination handlers
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const handlePreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  const uploadCertificate2 = async (id) => {
    if (!certificateFile) {
      toast.error("No certificate file selected");
      return;
    }

    try {
      setSubmissionLoading(true);

      // Create a FormData object and append the file
      const formData = new FormData();
      formData.append("certificate", certificateFile);

      const response = await uploadCertificate(id, formData);
      toast.success("Certificate uploaded successfully");

      // Refresh applications list
      await getRTOApplications();

      closeModal();
      setCertificateFile(null);
    } catch (err) {
      console.error("Error uploading certificate:", err);
      toast.error("Failed to upload certificate");
    } finally {
      setSubmissionLoading(false);
    }
  };

  const onClickRequestMoreDocuments = async () => {
    if (!message) {
      toast.error("Please type a message before sending");
      return;
    }

    try {
      setSubmissionLoading(true);
      await requestMoreDocuments(selectedApplicationId, message);

      toast.success("Request sent successfully");
      document.getElementById("moreDocumentsModal").close();
      setMessage("");

      // Refresh applications
      await getRTOApplications();
    } catch (err) {
      console.error("Error requesting more documents:", err);
      toast.error("Error sending request");
    } finally {
      setSubmissionLoading(false);
    }
  };

  // Apply filters and sorting to applications
  const filteredApplications = applications
    .filter((app) => {
      // Apply status filter
      if (filterStatus !== "All") {
        if (app.currentStatus !== filterStatus) return false;
      }

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
        app.isf?.industry?.toLowerCase().includes(searchLower) || false;
      const statusMatch =
        app.currentStatus?.toLowerCase().includes(searchLower) || false;

      return appIdMatch || nameMatch || industryMatch || statusMatch;
    })
    // Apply date filter
    .filter((app) => {
      if (dateFilter === "All") return true;

      const filterDays = parseInt(dateFilter);
      const appDate = new Date(app.status?.[0]?.time || 0);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - filterDays);

      return appDate >= cutoffDate;
    })
    // Apply sorting
    .sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.status?.[0]?.time || 0);
        const dateB = new Date(b.status?.[0]?.time || 0);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortBy === "name") {
        const nameA = `${a.user?.firstName || ""} ${a.user?.lastName || ""}`;
        const nameB = `${b.user?.firstName || ""} ${b.user?.lastName || ""}`;
        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else if (sortBy === "status") {
        return sortOrder === "asc"
          ? (a.currentStatus || "").localeCompare(b.currentStatus || "")
          : (b.currentStatus || "").localeCompare(a.currentStatus || "");
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

  // Get status badge styling
  const getStatusBadge = (status) => {
    let bgColor = "bg-gray-100 text-gray-800";
    let Icon = BsClock;

    switch (status) {
      case "Student Intake Form":
        bgColor = "bg-blue-100 text-blue-800";
        Icon = FaRegFileAlt;
        break;
      case "Upload Documents":
        bgColor = "bg-indigo-100 text-indigo-800";
        Icon = BiUpload;
        break;
      case "Sent to RTO":
        bgColor = "bg-purple-100 text-purple-800";
        Icon = FaFileAlt;
        break;
      case "Waiting for Verification":
        bgColor = "bg-yellow-100 text-yellow-800";
        Icon = BsClock;
        break;
      case "Certificate Generated":
        bgColor = "bg-green-100 text-green-800";
        Icon = BiCertification;
        break;
      case "Completed":
        bgColor = "bg-emerald-100 text-emerald-800";
        Icon = BiCheck;
        break;
      default:
        break;
    }

    return { bgColor, Icon };
  };

  // Render Initial Form Details
  const renderInitialFormDetails = () => {
    if (!selectedApplication?.isf)
      return (
        <div className="text-center py-6">
          <p className="text-gray-500">No initial screening data available</p>
        </div>
      );

    const initialForm = selectedApplication.isf;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start">
            <MdSchool className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Education</p>
              <p className="font-medium">
                {initialForm.formal_education || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <MdSchool className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Qualification</p>
              <p className="font-medium">
                {initialForm.qualification || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <MdLocationOn className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">State</p>
              <p className="font-medium">{initialForm.state || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <MdWorkOutline className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-medium">
                {initialForm.yearsOfExperience || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start">
            <MdWorkOutline className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Industry</p>
              <p className="font-medium">{initialForm.industry || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <MdSchool className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Desired Qualification</p>
              <p className="font-medium">
                {initialForm.lookingForWhatQualification || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <TbReportMoney className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-medium">
                {selectedApplication.price
                  ? `$${selectedApplication.price}`
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Student Intake Form Details
  const renderStudentFormDetails = () => {
    if (!selectedApplication?.sif)
      return (
        <div className="text-center py-6">
          <p className="text-gray-500">No student intake form data available</p>
        </div>
      );

    const studentForm = selectedApplication.sif;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start">
            <FaUser className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">
                {`${studentForm.firstName || ""} ${
                  studentForm.lastName || ""
                }`.trim() || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <VscDebugBreakpointData className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">USI</p>
              <p className="font-medium">{studentForm.USI || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <FaUser className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium">{studentForm.gender || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <BsCalendarDate className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">{studentForm.dob || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <MdLocationOn className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Home Address</p>
              <p className="font-medium">{studentForm.homeAddress || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <FaPhoneAlt className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Contact Number</p>
              <p className="font-medium">
                {studentForm.contactNumber || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <FaEnvelope className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{studentForm.email || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start">
            <MdLocationOn className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Country of Birth</p>
              <p className="font-medium">
                {studentForm.countryOfBirth || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <VscDebugBreakpointData className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Australian Citizen</p>
              <p className="font-medium">
                {studentForm.australianCitizen ? "Yes" : "No"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <MdWorkOutline className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Employment Status</p>
              <p className="font-medium">
                {studentForm.employmentStatus || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <MdWorkOutline className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Business Name</p>
              <p className="font-medium">{studentForm.businessName || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <MdWorkOutline className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Position</p>
              <p className="font-medium">{studentForm.position || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <MdWorkOutline className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Employer's Legal Name</p>
              <p className="font-medium">
                {studentForm.employersLegalName || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Documents List
  const renderDocumentsList = () => {
    if (
      !selectedApplication?.document &&
      !selectedApplication?.requestedDocuments
    ) {
      return (
        <div className="text-center py-6">
          <p className="text-gray-500">No documents available</p>
        </div>
      );
    }
    const documentTypes = [
      // Document types configuration
      { key: "driversLicense", label: "Driver's License" },
      { key: "idCard", label: "ID Card" },
      { key: "passport", label: "Passport" },
      { key: "birthCertificate", label: "Birth Certificate" },
      { key: "medicareCard", label: "Medicare Card" },
      { key: "creditcard", label: "Credit Card" },
      { key: "australian_citizenship", label: "Australian Citizenship" },
      { key: "license", label: "License" },
      { key: "birth_certificate", label: "Birth Certificate" },
      { key: "medicare", label: "Medicare" },
      { key: "resume", label: "Resume" },
      { key: "previousQualifications", label: "Previous Qualifications" },
      { key: "reference1", label: "Reference 1" },
      { key: "reference2", label: "Reference 2" },
      { key: "employmentLetter", label: "Employment Letter" },
      { key: "payslip", label: "Payslip" },
      { key: "image1", label: "Image 1" },
      { key: "image2", label: "Image 2" },
      { key: "image3", label: "Image 3" },
      { key: "image4", label: "Image 4" },
      { key: "video1", label: "Video 1" },
      { key: "video2", label: "Video 2" },
    ].filter(
      (doc) =>
        selectedApplication.document && doc.key in selectedApplication.document
    );
    // Extract requested document names
    const requestedDocumentNames =
      selectedApplication?.requestedDocuments?.map((doc) => doc.name) || [];

    // Combine all document keys (static + requested)
    const allDocumentKeys = [
      ...new Set([
        ...documentTypes.map((d) => d.key),
        ...requestedDocumentNames,
      ]),
    ];

    // Merge documents with status
    const mergedDocuments = allDocumentKeys.map((docKey) => {
      const docConfig = documentTypes.find((d) => d.key === docKey);
      const fileData = selectedApplication?.document?.[docKey];

      // Generate label if not in config
      const label = docConfig?.label || docKey.replace(/_/g, " ");

      return {
        key: docKey,
        label: label.charAt(0).toUpperCase() + label.slice(1), // Capitalize
        fileUrl: fileData?.fileUrl,
        isUploaded: !!fileData?.fileUrl,
      };
    });

    if (mergedDocuments.length === 0) {
      return (
        <div className="text-center py-6">
          <p className="text-gray-500">No documents available</p>
        </div>
      );
    }

    return (
      <>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            {/* Table headers remain same */}
            <tbody className="divide-y divide-gray-200">
              {mergedDocuments.map((doc, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{doc.label}</td>
                  <td className="py-3 px-4 text-right">
                    {doc.isUploaded ? (
                      <button
                        onClick={() => {
                          openModal(doc.fileUrl);
                          setSingleDocModelOpen(true);
                        }}
                        className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
                      >
                        <FaEye className="mr-1" /> View
                      </button>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-gray-500 bg-gray-200 cursor-not-allowed"
                      >
                        <FaTimesCircle className="mr-1" /> Not Uploaded
                      </button>
                    )}
                  </td>{" "}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Document Modal */}
        {SingleDocModelOpen && currentDoc && (
          <DocumentModal
            isOpen={SingleDocModelOpen}
            onClose={closeModal}
            docLink={currentDoc}
          />
        )}
      </>
    );
  };
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Toaster position="top-right" />
      {submissionLoading && <SpinnerLoader />}

      {!selectedApplication && (
        <div className="w-full">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 py-8 px-4 sm:px-6 lg:px-8 shadow-md mb-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0 gap-3">
                <div className="flex-shrink-0 bg-white p-3 rounded-full">
                  <img
                    src={pending}
                    alt="Pending Applications"
                    className="h-16 w-16"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    RTO Application Management
                  </h1>
                  <p className="text-emerald-100">
                    Review and process applications with completed forms,
                    documents, and payments
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={getRTOApplications}
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
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <select
                    className="pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

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
                    <option value="status">Sort by Status</option>
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
                  {filteredApplications.length} of {totalApplications}{" "}
                  applications
                </p>
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Applications
                </h3>
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
                    {searchTerm ||
                    filterStatus !== "All" ||
                    dateFilter !== "All"
                      ? "Try adjusting your search filters."
                      : "There are no applications that meet the criteria at this time."}
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
                          Student
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Checked by Assessor
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Submitted Date
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
                      {paginatedApplications.map((application) => {
                        return (
                          <tr
                            key={application.id}
                            className="hover:bg-gray-50 transition-colors duration-150"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">
                                  {application.applicationId || application.id}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {application.user?.firstName}{" "}
                                {application.user?.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {application.isf?.industry || "N/A"}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {application.assessed ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                    <FaCheckCircle className="mr-1" /> Checked
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    <BsClock className="mr-1" /> Pending
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(application.status?.[0]?.time)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex flex-wrap gap-2">
                                <button
                                  className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
                                  onClick={() =>
                                    setSelectedApplication(application)
                                  }
                                >
                                  <BsEye className="mr-1" />
                                  View
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {filteredApplications.length > 0 && (
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
                        <span className="font-medium">
                          {indexOfFirstApp + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium">
                          {Math.min(
                            indexOfLastApp,
                            filteredApplications.length
                          )}
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

                        {/* Page numbers - display up to 5 page numbers */}
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
              )}
            </div>
          </div>
        </div>
      )}

      {/* View Application Details */}
      {selectedApplication && (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <button
                onClick={() => setSelectedApplication(null)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                <BiArrowBack className="mr-2" /> Back to Applications
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="px-4 py-5 sm:px-6 bg-emerald-600">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg leading-6 font-medium text-white">
                    Application Details:{" "}
                    {selectedApplication.applicationId ||
                      selectedApplication.id}
                  </h3>
                </div>
              </div>

              <div className="border-t border-gray-200 p-4">
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex-1 min-w-0 bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Student
                    </h4>
                    <p className="font-semibold text-gray-900">
                      {selectedApplication.user?.firstName}{" "}
                      {selectedApplication.user?.lastName}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0 bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Status
                    </h4>
                    <div className="mt-1">
                      {(() => {
                        const { bgColor, Icon } = getStatusBadge(
                          selectedApplication.currentStatus
                        );
                        return (
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}
                          >
                            <Icon className="mr-1" />
                            {selectedApplication.currentStatus}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Submitted Date
                    </h4>
                    <p className="font-semibold text-gray-900">
                      {formatDate(selectedApplication.status?.[0]?.time)}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0 bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Payment Status
                    </h4>
                    <div className="mt-1">
                      {selectedApplication.paid ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <BiCheck className="mr-1" /> Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <FaTimes className="mr-1" /> Unpaid
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex -mb-px space-x-8">
                    <button
                      onClick={() => setSelectedTab("overview")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        selectedTab === "overview"
                          ? "border-emerald-500 text-emerald-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Initial Screening
                    </button>
                    <button
                      onClick={() => setSelectedTab("student")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        selectedTab === "student"
                          ? "border-emerald-500 text-emerald-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Student Information
                    </button>
                    <button
                      onClick={() => setSelectedTab("documents")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        selectedTab === "documents"
                          ? "border-emerald-500 text-emerald-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Documents
                    </button>
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-lg p-4 mb-6">
                  {selectedTab === "overview" && renderInitialFormDetails()}
                  {selectedTab === "student" && renderStudentFormDetails()}
                  {selectedTab === "documents" && renderDocumentsList()}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
                    onClick={() => onClickViewDocuments(selectedApplication)}
                  >
                    <BsEye className="mr-2" /> View All Documents
                  </button>
                  <button
                    onClick={() => handleOpenModal(selectedApplication.id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
                    <BiCertification className="mr-2" /> Issue Certificate
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedApplication.id);
                      setSelectedApplication(null);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none"
                  >
                    <FaTimes className="mr-2" /> Reject Application
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none"
                    onClick={OpenRequestDocsModal}
                  >
                    Request More Documents
                  </button>
                </div>
              </div>
            </div>
          </div>
          {showRequestDocsModal && (
            <RequestMoreDocuments
              applicationId={selectedApplication.id}
              PreviouslyRequestedDocuments={
                selectedApplication.requestedDocuments
              }
              UploadedDocuments={selectedApplication.document}
              onClose={CloseRequestDocsModal}
            />
          )}
        </>
      )}

      {/* Upload Certificate Modal */}
      <dialog
        id="uploadCertificateModal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box bg-white rounded-lg shadow-xl">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg mb-4">Upload Certificate</h3>
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="p-4 bg-emerald-100 rounded-full">
                <BiCertification className="text-3xl text-emerald-600" />
              </div>
              <p className="text-center text-gray-700">
                Please select the certificate file to upload for application ID:
                <br />
                <span className="font-medium">{selectedApplicationId}</span>
              </p>
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-50 transition-colors">
                <BiUpload className="text-3xl text-emerald-500" />
                <span className="mt-2 text-base leading-normal">
                  Select a file
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {certificateFile && (
                <div className="text-sm text-gray-700 bg-blue-50 p-2 rounded-md w-full text-center">
                  Selected: {certificateFile.name}
                </div>
              )}
            </div>
          </div>

          <div className="modal-action">
            <button
              onClick={() => uploadCertificate2(selectedApplicationId)}
              disabled={!certificateFile}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                certificateFile
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Upload Certificate
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      {/* Document Links Modal */}
      <dialog
        id="documentLinksModal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box bg-white rounded-lg shadow-xl">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() =>
              document.getElementById("documentLinksModal").close()
            }
          >
            ✕
          </button>
          <h3 className="font-bold text-lg mb-4">Application Documents</h3>

          {documentLinks.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto h-12 w-12 text-gray-400 flex items-center justify-center rounded-full bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No documents found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This application doesn't have any documents uploaded.
              </p>
            </div>
          ) : (
            <>
              <button
                onClick={downloadAllDocsAsZip}
                className="mb-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center justify-center"
              >
                <FaFileDownload className="mr-2" /> Download All Documents
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                {documentLinks.map((doc, index) => {
                  const fileUrl = doc.url;

                  return (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                    >
                      <button
                        onClick={() => {
                          openModal(fileUrl.fileUrl);
                          setSingleDocModelOpen(false);
                        }}
                        className="flex items-center text-indigo-600 hover:text-indigo-800 w-full text-left"
                      >
                        <FaFileAlt className="mr-2 text-gray-500" />
                        <span className="truncate">{doc.name}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
              <DocumentModal
                isOpen={DocumentModalOpen}
                onClose={closedocModal}
                docLink={currentDoc}
              />
            </>
          )}

          <div className="modal-action">
            <button
              onClick={() =>
                document.getElementById("documentLinksModal").close()
              }
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>

      {/* Request More Documents Modal */}
      <dialog
        id="moreDocumentsModal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box bg-white rounded-lg shadow-xl">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() =>
              document.getElementById("moreDocumentsModal").close()
            }
          >
            ✕
          </button>
          <h3 className="font-bold text-lg mb-2">
            Request Additional Information
          </h3>
          <p className="text-gray-600 mb-4">
            Please specify what additional information or documents you need
            from the applicant.
          </p>

          <div className="form-control w-full">
            <textarea
              className="textarea textarea-bordered h-32 w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="Enter your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <div className="modal-action">
            <button
              onClick={onClickRequestMoreDocuments}
              disabled={!message.trim()}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                message.trim()
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Send Request
            </button>
            <button
              onClick={() =>
                document.getElementById("moreDocumentsModal").close()
              }
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Approval;
