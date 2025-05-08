import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getApplications } from "../../Customer/Services/adminServices";
import { VscDebugBreakpointData } from "react-icons/vsc";
import {
  FaEye,
  FaDownload,
  FaFileDownload,
  FaSpinner,
  FaArrowLeft,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCog,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { TbReportMoney } from "react-icons/tb";
import { MdLocationOn, MdWorkOutline, MdSchool } from "react-icons/md";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Loader from "../../Customer/components/loader";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import Modal from "../../Customer/components/modal";
import applicationImage from "../../assets/applications.png";
import DocumentModal from "../../Customer/components/viewDocsModal";
import {
  getEnrollmentKitData,
  getRplIntakeData,
} from "../../Customer/Services/rtoFormsServices";
import RPLIntakeDetails from "../../Customer/ViewApplication/rplIntakeDetails";
import EnrollmentDetails from "../../Customer/ViewApplication/RplEnrollmentKitDetails";

const ViewApplications = ({
  userId: propUserId,
  id: propId,
  application: propApplication,
}) => {
  const [selectedForm, setSelectedForm] = useState("initial"); // Default form
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState(null);
  const [userId1, setUserId1] = useState("");
  const { userId: paramUserId, id: paramId } = useParams();
  const [isDownloading, setIsDownloading] = useState(false);
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdatePhoneOpen, setIsUpdatePhoneOpen] = useState(false);
  const [isUpdateEmailOpen, setIsUpdateEmailOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [rplIntakeData, setRplIntakeData] = useState([]);
  const [EnrollmentData, setEnrollmentData] = useState([]);

  // Use either props or params
  const effectiveUserId = propUserId || paramUserId;
  const effectiveId = propId || paramId;
  const [DocumentModalOpen, setDocumentModalOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState("");
  useEffect(() => {
    const getRplData = async () => {
      setSubmissionLoading(true);
      console.log(application);
      const response = await getRplIntakeData(application.id);
      const response2 = await getEnrollmentKitData(application.id);
      setEnrollmentData(response2.data);
      setRplIntakeData(response.data);
      console.log(response.data);
      console.log(response2.data);
      setSubmissionLoading(false);
    };
    getRplData();
  }, [application]);
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

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Set application from prop if provided
  useEffect(() => {
    if (propApplication) {
      setApplication(propApplication);
      console.log("Application2:", propApplication);
      setLoading(false);
    }
  }, [propApplication]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Only check authentication if not using props
    if (!propApplication) {
      const authListener = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId1(user.uid);
          // Get user's display name if available
          setUserName(user.displayName || "");
          console.log("User ID:", user.uid);
        } else {
          navigate("/login");
        }
      });
      return () => authListener(); // Cleanup listener on unmount
    }
  }, [navigate, propApplication]);

  useEffect(() => {
    // Only fetch if not using props
    if (effectiveUserId && !propApplication) {
      getUserApplications(effectiveUserId);
    }
  }, [effectiveUserId, propApplication]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getUserApplications = async (userId1) => {
    setSubmissionLoading(true);
    try {
      const response = await getApplications(userId1);
      const foundApp = response.find((app) => app.id === effectiveId);
      setApplication(foundApp || null);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmissionLoading(false);
    }
  };

  const handleViewDocument = (documentUrl) => {
    if (documentUrl) {
      window.open(documentUrl, "_blank");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const renderInitialForm = () => {
    if (!application?.isf) return null;

    const isf = application.isf;

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <MdSchool className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Education</p>
                  <p className="font-medium">{isf.formal_education || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MdSchool className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Qualification</p>
                  <p className="font-medium">{isf.qualification || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MdLocationOn className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">State</p>
                  <p className="font-medium">{isf.state || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MdWorkOutline className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium">
                    {isf.yearsOfExperience || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <MdWorkOutline className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-medium">{isf.industry || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MdSchool className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Desired Qualification</p>
                  <p className="font-medium">
                    {isf.lookingForWhatQualification || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <TbReportMoney className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">
                    {application.price ? `$${application.price}` : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStudentForm = () => {
    if (!application?.sif) return null;

    const sif = application.sif;

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <FaUser className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">
                    {`${sif.firstName || ""} ${sif.lastName || ""}`.trim() ||
                      "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <VscDebugBreakpointData className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">USI</p>
                  <p className="font-medium">{sif.USI || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaUser className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">{sif.gender || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <BsCalendarDate className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">{sif.dob || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MdLocationOn className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Home Address</p>
                  <p className="font-medium">{sif.homeAddress || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MdLocationOn className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Suburb</p>
                  <p className="font-medium">{sif.suburb || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MdLocationOn className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">State</p>
                  <p className="font-medium">{sif.state || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MdLocationOn className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Postcode</p>
                  <p className="font-medium">{sif.postcode || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaPhoneAlt className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Contact Number</p>
                  <p className="font-medium">{sif.contactNumber || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaEnvelope className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{sif.email || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <MdLocationOn className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Country of Birth</p>
                  <p className="font-medium">{sif.countryOfBirth || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <VscDebugBreakpointData className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Australian Citizen</p>
                  <p className="font-medium">
                    {sif.australianCitizen ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <VscDebugBreakpointData className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Disability</p>
                  <p className="font-medium">{sif.disability ? "Yes" : "No"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MdWorkOutline className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Employment Status</p>
                  <p className="font-medium">{sif.employmentStatus || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MdWorkOutline className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Business Name</p>
                  <p className="font-medium">{sif.businessName || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MdWorkOutline className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Position</p>
                  <p className="font-medium">{sif.position || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MdWorkOutline className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Employer's Legal Name</p>
                  <p className="font-medium">
                    {sif.employersLegalName || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MdLocationOn className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Employer's Address</p>
                  <p className="font-medium">{sif.employersAddress || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaPhoneAlt className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Employer's Contact</p>
                  <p className="font-medium">
                    {sif.employersContactNumber || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // const renderDocumentsForm = () => {
  //   console.log("Documents Form:", application?.document);
  //   if (!application?.document) return null;

  //   const requestedDocuments = application.requestedDocuments || [];

  //   const predefinedDocuments = [
  //     { label: "Driver's License", key: "driversLicense" },
  //     { label: "ID Card", key: "idCard" },
  //     { label: "Passport", key: "passport" },
  //     { label: "Birth Certificate", key: "birthCertificate" },
  //     { label: "Medicare Card", key: "medicareCard" },
  //     { label: "Credit Card", key: "creditcard" },
  //     { label: "Australian Citizenship", key: "australianCitizenship" },
  //     { label: "Resume", key: "resume" },
  //     { label: "Previous Qualifications", key: "previousQualifications" },
  //     { label: "Reference 1", key: "reference1" },
  //     { label: "Reference 2", key: "reference2" },
  //     { label: "Employment Letter", key: "employmentLetter" },
  //     { label: "Payslip", key: "payslip" },
  //     { label: "Image 1", key: "image1" },
  //     { label: "Image 2", key: "image2" },
  //     { label: "Image 3", key: "image3" },
  //     { label: "Image 4", key: "image4" },
  //     { label: "Video 1", key: "video1" },
  //     { label: "Video 2", key: "video2" },
  //   ].filter((doc) => application.document && doc.key in application.document);

  //   // Fix: Change access path from documentsForm to document
  //   const additionalDocuments = Object.keys(application.document)
  //     .map((key) => ({
  //       label: application.document[key]?.name || key,
  //       key,
  //     }))
  //     .filter((doc) => doc.label);

  //   const documentsList = [...predefinedDocuments, ...additionalDocuments];

  //   return (
  //     <>
  //       <div className="bg-white rounded-xl shadow-md overflow-hidden">
  //         <div className="p-6">
  //           <div className="overflow-x-auto">
  //             <table className="min-w-full border-collapse">
  //               <thead>
  //                 <tr className="bg-gray-50 border-b border-gray-200">
  //                   <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                     Document Type
  //                   </th>
  //                   <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                     Status
  //                   </th>
  //                   <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                     Actions
  //                   </th>
  //                 </tr>
  //               </thead>
  //               <tbody className="divide-y divide-gray-200">
  //                 {documentsList.map((doc, index) => {
  //                   const docObject = application.documentsForm[doc.key];
  //                   const isUploaded = !!docObject && !!docObject.fileUrl;
  //                   const fileUrl = docObject?.fileUrl;

  //                   return (
  //                     <tr key={index} className="hover:bg-gray-50">
  //                       <td className="py-3 px-4">{doc.label}</td>
  //                       <td className="py-3 px-4">
  //                         {isUploaded ? (
  //                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
  //                             <FaCheckCircle className="mr-1" /> Uploaded
  //                           </span>
  //                         ) : (
  //                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
  //                             <FaTimesCircle className="mr-1" /> Not Uploaded
  //                           </span>
  //                         )}
  //                       </td>
  //                       <td className="py-3 px-4">
  //                         {isUploaded ? (
  //                           <button
  //                             onClick={() => openModal(fileUrl)}
  //                             className="inline-flex items-center text-emerald-600 hover:text-emerald-800 transition-colors"
  //                           >
  //                             <FaEye className="mr-1" /> View
  //                           </button>
  //                         ) : (
  //                           <span className="text-gray-400">Not Available</span>
  //                         )}
  //                       </td>
  //                     </tr>
  //                   );
  //                 })}
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>
  //       </div>
  //       <DocumentModal
  //         isOpen={DocumentModalOpen}
  //         onClose={closeModal}
  //         docLink={currentDoc}
  //       />
  //     </>
  //   );
  // };
  const renderDocumentsForm = () => {
    console.log("Documents Form:", application?.document);
    if (!application?.document) return null;

    const requestedDocuments = application.requestedDocuments || [];

    const predefinedDocuments = [
      { label: "Driver's License", key: "driversLicense" },
      { label: "ID Card", key: "idCard" },
      { label: "Passport", key: "passport" },
      { label: "Birth Certificate", key: "birthCertificate" },
      { label: "Medicare Card", key: "medicareCard" },
      { label: "Credit Card", key: "creditcard" },
      { label: "Australian Citizenship", key: "australianCitizenship" },
      { label: "Resume", key: "resume" },
      { label: "Previous Qualifications", key: "previousQualifications" },
      { label: "Reference 1", key: "reference1" },
      { label: "Reference 2", key: "reference2" },
      { label: "Employment Letter", key: "employmentLetter" },
      { label: "Payslip", key: "payslip" },
      { label: "Image 1", key: "image1" },
      { label: "Image 2", key: "image2" },
      { label: "Image 3", key: "image3" },
      { label: "Image 4", key: "image4" },
      { label: "Video 1", key: "video1" },
      { label: "Video 2", key: "video2" },
    ];
    // Extract unique documents from predefined list and application.document
    const documentKeys = new Set();

    // Add predefined documents (only if they exist in application.document)
    const filteredPredefinedDocuments = predefinedDocuments.filter((doc) => {
      if (application.document && doc.key in application.document) {
        documentKeys.add(doc.key);
        return true;
      }
      return false;
    });

    // Add additional documents (only if they are not already added)
    const additionalDocuments = Object.keys(application.document || {})
      .filter((key) => !documentKeys.has(key)) // Avoid duplicates
      .map((key) => ({
        label: application.document[key]?.name || key,
        key,
      }));

    const documentsList = [
      ...filteredPredefinedDocuments,
      ...additionalDocuments,
    ];

    return (
      <>
        <div className="bg-white rounded-xl shadow-md ">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document Type
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {documentsList.map((doc, index) => {
                    const docObject = application.document[doc.key];
                    const isUploaded = !!docObject && !!docObject.fileUrl;
                    const fileUrl = docObject?.fileUrl;

                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-3 px-4">{doc.label}</td>
                        <td className="py-3 px-4">
                          {isUploaded ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                              <FaCheckCircle className="mr-1" /> Uploaded
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <FaTimesCircle className="mr-1" /> Not Uploaded
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {isUploaded ? (
                            <button
                              onClick={() => openModal(fileUrl)}
                              className="inline-flex items-center text-emerald-600 hover:text-emerald-800 transition-colors"
                            >
                              <FaEye className="mr-1" /> View
                            </button>
                          ) : (
                            <span className="text-gray-400">Not Available</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && <Loader />}
      {submissionLoading && <SpinnerLoader />}
      <DocumentModal
        isOpen={DocumentModalOpen}
        onClose={closeModal}
        docLink={currentDoc}
      />
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 mt-8">
        {application ? (
          <>
            {/* Application Overview */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 border-b border-gray-100">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Created</span>
                  <span className="font-medium">
                    {formatDate(application.status?.[0]?.time)}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Qualification</span>
                  <span className="font-medium truncate">
                    {application.isf?.lookingForWhatQualification || "N/A"}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Payment Status</span>
                  {application.paid ? (
                    <span className="inline-flex items-center mt-1 font-medium text-green-600">
                      <FaCheckCircle className="mr-1" /> Paid
                    </span>
                  ) : (
                    <span className="inline-flex items-center mt-1 font-medium text-red-600">
                      <FaTimesCircle className="mr-1" /> Unpaid
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setSelectedForm("initial")}
                  className={`flex-1 py-4 px-4 text-center font-medium text-sm transition-all ${
                    selectedForm === "initial"
                      ? "text-emerald-600 border-b-2 border-emerald-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Initial Screening
                </button>
                <button
                  onClick={() => setSelectedForm("student")}
                  className={`flex-1 py-4 px-4 text-center font-medium text-sm transition-all ${
                    selectedForm === "student"
                      ? "text-emerald-600 border-b-2 border-emerald-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Student Information
                </button>
                <button
                  onClick={() => setSelectedForm("documents")}
                  className={`flex-1 py-4 px-4 text-center font-medium text-sm transition-all ${
                    selectedForm === "documents"
                      ? "text-emerald-600 border-b-2 border-emerald-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Documents
                </button>
                {application?.rplIntakeSubmitted && (
                  <button
                    onClick={() => setSelectedForm("rplIntake")}
                    className={`flex-1 py-4 px-4 text-center font-medium text-sm transition-all ${
                      selectedForm === "rplIntake"
                        ? "text-emerald-600 border-b-2 border-emerald-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    RPL Intake
                  </button>
                )}
                {application?.enrolmentFormSubmitted && (
                  <button
                    onClick={() => setSelectedForm("Enrollment")}
                    className={`flex-1 py-4 px-4 text-center font-medium text-sm transition-all ${
                      selectedForm === "Enrollment"
                        ? "text-emerald-600 border-b-2 border-emerald-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    RPL Enrollment
                  </button>
                )}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mb-6">
              {selectedForm === "initial" && renderInitialForm()}
              {selectedForm === "student" && renderStudentForm()}
              {selectedForm === "documents" && renderDocumentsForm()}
              {selectedForm === "rplIntake" && (
                <RPLIntakeDetails rplIntakeData={rplIntakeData} />
              )}
              {selectedForm === "Enrollment" && (
                <EnrollmentDetails enrollmentData={EnrollmentData} />
              )}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-10 text-center">
            <div className="inline-block p-4 rounded-full bg-emerald-100 mb-4">
              <FaFileDownload className="text-emerald-600 text-3xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              No Application Found
            </h2>
            <p className="text-gray-600 mb-6">
              The application you're looking for could not be found.
            </p>
            <button
              onClick={() => navigate("/existing-applications")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
            >
              <FaArrowLeft className="mr-2" /> Back to Applications
            </button>
          </div>
        )}
      </div>

      {/* Update Phone/Email Modal */}
      {isUpdateEmailOpen || isUpdatePhoneOpen ? (
        <Modal
          isUpdateEmailOpen={isUpdateEmailOpen}
          setIsUpdateEmailOpen={setIsUpdateEmailOpen}
          setIsUpdatePhoneOpen={setIsUpdatePhoneOpen}
          isUpdatePhoneOpen={isUpdatePhoneOpen}
        />
      ) : null}
    </div>
  );
};

export default ViewApplications;
