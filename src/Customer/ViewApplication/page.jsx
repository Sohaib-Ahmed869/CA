import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getApplications } from "../Services/customerApplication";
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
import Loader from "../components/loader";
import SpinnerLoader from "../components/spinnerLoader";
import Modal from "../components/modal";
import applicationImage from "../../assets/applications.png";
import DocumentModal from "../components/viewDocsModal";

const ViewApplications = () => {
  const [selectedForm, setSelectedForm] = useState("initial"); // Default form
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState(null);
  const [userId1, setUserId1] = useState("");
  const { userId, id } = useParams();
  const [isDownloading, setIsDownloading] = useState(false);
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdatePhoneOpen, setIsUpdatePhoneOpen] = useState(false);
  const [isUpdateEmailOpen, setIsUpdateEmailOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
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
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

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
    // Authentication check
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
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      getUserApplications(userId);
    }
  }, [userId]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getUserApplications = async (userId1) => {
    setSubmissionLoading(true);
    try {
      const response = await getApplications(userId1);
      const foundApp = response.find((app) => app.id === id);
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
    if (!application?.initialForm) return null;

    const initialForm = application.initialForm;

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
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
    if (!application?.studentForm) return null;

    const studentForm = application.studentForm;

    const studentFields = [
      {
        icon: FaUser,
        label: "First Name",
        value: studentForm.firstName || "N/A",
      },
      {
        icon: FaUser,
        label: "Last Name",
        value: studentForm.lastName || "N/A",
      },
      {
        icon: FaUser,
        label: "Middle Name",
        value: studentForm.middleName || "N/A",
      },
      {
        icon: VscDebugBreakpointData,
        label: "USI",
        value: studentForm.USI || "N/A",
      },
      { icon: FaUser, label: "Gender", value: studentForm.gender || "N/A" },
      {
        icon: BsCalendarDate,
        label: "Date of Birth",
        value: studentForm.dob || "N/A",
      },
      {
        icon: MdLocationOn,
        label: "Home Address",
        value: studentForm.homeAddress || "N/A",
      },
      {
        icon: MdLocationOn,
        label: "Suburb",
        value: studentForm.suburb || "N/A",
      },
      {
        icon: MdLocationOn,
        label: "Postcode",
        value: studentForm.postcode || "N/A",
      },
      { icon: MdLocationOn, label: "State", value: studentForm.state || "N/A" },
      {
        icon: MdLocationOn,
        label: "Country of Birth",
        value: studentForm.countryOfBirth || "N/A",
      },
      {
        icon: MdWorkOutline,
        label: "Employment Status",
        value: studentForm.employmentStatus || "N/A",
      },
      {
        icon: VscDebugBreakpointData,
        label: "English Level",
        value: studentForm.englishLevel || "N/A",
      },
      {
        icon: FaPhoneAlt,
        label: "Contact Number",
        value: studentForm.contactNumber || "N/A",
      },
      { icon: FaEnvelope, label: "Email", value: studentForm.email || "N/A" },
      {
        icon: VscDebugBreakpointData,
        label: "Aboriginal or Torres Strait Islander",
        value: studentForm.aboriginalOrTorresStraitIslander || "N/A",
      },
      {
        icon: VscDebugBreakpointData,
        label: "Disability",
        value: studentForm.disability || "N/A",
      },
      {
        icon: VscDebugBreakpointData,
        label: "Credits Transfer",
        value: studentForm.creditsTransfer ? "Yes" : "No",
      },
      {
        icon: VscDebugBreakpointData,
        label: "Year Completed",
        value: studentForm.YearCompleted || "N/A",
      },
      {
        icon: VscDebugBreakpointData,
        label: "Name of Qualification",
        value: studentForm.nameOfQualification || "N/A",
      },
      {
        icon: MdWorkOutline,
        label: "Business Name",
        value: studentForm.businessName || "N/A",
      },
      {
        icon: MdWorkOutline,
        label: "Employer's Legal Name",
        value: studentForm.employersLegalName || "N/A",
      },
      {
        icon: MdLocationOn,
        label: "Employer's Address",
        value: studentForm.employersAddress || "N/A",
      },
      {
        icon: FaPhoneAlt,
        label: "Employer's Contact Number",
        value: studentForm.employersContactNumber || "N/A",
      },
      {
        icon: MdWorkOutline,
        label: "Position",
        value: studentForm.position || "N/A",
      },
      {
        icon: VscDebugBreakpointData,
        label: "Australian Citizen",
        value: studentForm.australianCitizen ? "Yes" : "No",
      },
      {
        icon: VscDebugBreakpointData,
        label: "Previous Qualifications",
        value: studentForm.previousQualifications || "N/A",
      },
      {
        icon: BsCalendarDate,
        label: "Date of Application",
        value: studentForm.date || "N/A",
      },
      {
        icon: VscDebugBreakpointData,
        label: "Agreement",
        value: studentForm.agree ? "Agreed" : "Not Agreed",
      },
    ];

    return (
      // <div className="bg-white rounded-xl shadow-md overflow-hidden">
      //   <div className="p-6">
      //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      //       <div className="space-y-4">
      //         <div className="flex items-start">
      //           <FaUser className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">Full Name</p>
      //             <p className="font-medium">
      //               {`${studentForm.firstName || ""} ${
      //                 studentForm.lastName || ""
      //               }`.trim() || "N/A"}
      //             </p>
      //           </div>
      //         </div>

      //         <div className="flex items-start">
      //           <VscDebugBreakpointData className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">USI</p>
      //             <p className="font-medium">{studentForm.USI || "N/A"}</p>
      //           </div>
      //         </div>

      //         <div className="flex items-start">
      //           <FaUser className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">Gender</p>
      //             <p className="font-medium">{studentForm.gender || "N/A"}</p>
      //           </div>
      //         </div>

      //         <div className="flex items-start">
      //           <BsCalendarDate className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">Date of Birth</p>
      //             <p className="font-medium">{studentForm.dob || "N/A"}</p>
      //           </div>
      //         </div>

      //         <div className="flex items-start">
      //           <MdLocationOn className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">Home Address</p>
      //             <p className="font-medium">
      //               {studentForm.homeAddress || "N/A"}
      //             </p>
      //           </div>
      //         </div>

      //         <div className="flex items-start">
      //           <MdLocationOn className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">Suburb</p>
      //             <p className="font-medium">{studentForm.suburb || "N/A"}</p>
      //           </div>
      //         </div>

      //         <div className="flex items-start">
      //           <MdLocationOn className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">State</p>
      //             <p className="font-medium">{studentForm.state || "N/A"}</p>
      //           </div>
      //         </div>

      //         <div className="flex items-start">
      //           <MdLocationOn className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">Postcode</p>
      //             <p className="font-medium">{studentForm.postcode || "N/A"}</p>
      //           </div>
      //         </div>

      //         <div className="flex items-start">
      //           <FaPhoneAlt className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">Contact Number</p>
      //             <p className="font-medium">
      //               {studentForm.contactNumber || "N/A"}
      //             </p>
      //           </div>
      //         </div>

      //         <div className="flex items-start">
      //           <FaEnvelope className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">Email</p>
      //             <p className="font-medium">{studentForm.email || "N/A"}</p>
      //           </div>
      //         </div>
      //       </div>

      //       <div className="space-y-4">
      //         <div className="flex items-start">
      //           <MdLocationOn className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">Country of Birth</p>
      //             <p className="font-medium">
      //               {studentForm.countryOfBirth || "N/A"}
      //             </p>
      //           </div>
      //         </div>

      //         <div className="flex items-start">
      //           <VscDebugBreakpointData className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">Australian Citizen</p>
      //             <p className="font-medium">
      //               {studentForm.australianCitizen ? "Yes" : "No"}
      //             </p>
      //           </div>
      //         </div>

      //         <div className="flex items-start">
      //           <VscDebugBreakpointData className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">Disability</p>
      //             <p className="font-medium">
      //               {studentForm.disability ? "Yes" : "No"}
      //             </p>
      //           </div>
      //         </div>

      //         <div className="flex items-start">
      //           <MdWorkOutline className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">Employment Status</p>
      //             <p className="font-medium">
      //               {studentForm.employmentStatus || "N/A"}
      //             </p>
      //           </div>
      //         </div>

      //         <div className="flex items-start">
      //           <MdWorkOutline className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">Business Name</p>
      //             <p className="font-medium">
      //               {studentForm.businessName || "N/A"}
      //             </p>
      //           </div>
      //         </div>

      //         <div className="flex items-start">
      //           <MdWorkOutline className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">Position</p>
      //             <p className="font-medium">{studentForm.position || "N/A"}</p>
      //           </div>
      //         </div>

      //         <div className="flex items-start">
      //           <MdWorkOutline className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">Employer's Legal Name</p>
      //             <p className="font-medium">
      //               {studentForm.employersLegalName || "N/A"}
      //             </p>
      //           </div>
      //         </div>

      //         <div className="flex items-start">
      //           <MdLocationOn className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">Employer's Address</p>
      //             <p className="font-medium">
      //               {studentForm.employersAddress || "N/A"}
      //             </p>
      //           </div>
      //         </div>

      //         <div className="flex items-start">
      //           <FaPhoneAlt className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
      //           <div>
      //             <p className="text-sm text-gray-500">Employer's Contact</p>
      //             <p className="font-medium">
      //               {studentForm.employersContactNumber || "N/A"}
      //             </p>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //  </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[0, 1].map((col) => (
          <div key={col} className="space-y-4">
            {studentFields
              .slice(
                col * Math.ceil(studentFields.length / 2),
                (col + 1) * Math.ceil(studentFields.length / 2)
              )
              .map(({ icon: Icon, label, value }, index) => (
                <div key={index} className="flex items-start">
                  <Icon className="text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">{label}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
      //</div>
    );
  };

  const renderDocumentsForm = () => {
    if (!application?.documentsForm) return null;

    const documentsList = [
      // ID documents
      { label: "Driver's License", key: "driversLicense" },
      { label: "ID Card", key: "idCard" },
      { label: "Passport", key: "passport" },
      { label: "Birth Certificate", key: "birthCertificate" },
      { label: "Medicare Card", key: "medicareCard" },
      { label: "Credit Card", key: "creditcard" },
      { label: "Australian Citizenship", key: "australianCitizenship" },

      // Other documents
      { label: "Resume", key: "resume" },
      { label: "Previous Qualifications", key: "previousQualifications" },
      { label: "Reference 1", key: "reference1" },
      { label: "Reference 2", key: "reference2" },
      { label: "Employment Letter", key: "employmentLetter" },
      { label: "Payslip", key: "payslip" },

      // Images and videos
      { label: "Image 1", key: "image1" },
      { label: "Image 2", key: "image2" },
      { label: "Image 3", key: "image3" },
      { label: "Image 4", key: "image4" },
      { label: "Video 1", key: "video1" },
      { label: "Video 2", key: "video2" },
    ].filter(
      (doc) => application.documentsForm && doc.key in application.documentsForm
    );

    return (
      <>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
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
                    const docObject = application.documentsForm[doc.key];
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
        <DocumentModal
          isOpen={DocumentModalOpen}
          onClose={closeModal}
          docLink={currentDoc}
        />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && <Loader />}
      {submissionLoading && <SpinnerLoader />}

      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8 bg-white p-4 rounded-full">
            <img
              src={applicationImage}
              alt="Application"
              className="h-20 w-20 md:h-24 md:w-24"
            />
          </div>
          <div className="text-center md:text-left text-white">
            <h1 className="text-3xl font-bold mb-2">Application Details</h1>
            <p className="text-emerald-100 max-w-2xl">
              View all information and documents for your application
            </p>

            {application && (
              <div className="mt-2 inline-flex bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white">
                  ID: {application.applicationId || application.id}
                </span>
              </div>
            )}
          </div>

          {/* Hamburger Menu */}
          <div className="absolute top-6 right-6" ref={menuRef}>
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 top-12 w-56 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-visible">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {auth.currentUser?.email || "User"}
                  </p>
                </div>

                <div className="py-1">
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setIsUpdateEmailOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <FaEnvelope className="mr-3 text-emerald-600" />
                    Update Email
                  </button>

                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setIsUpdatePhoneOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <FaPhoneAlt className="mr-3 text-emerald-600" />
                    Update Phone
                  </button>
                </div>

                <div className="py-1 border-t border-gray-100">
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="mr-3 text-red-600" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-wrap mb-4">
          <button
            onClick={() => navigate("/existing-applications")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
          >
            <FaArrowLeft className="mr-2" /> Back to Applications
          </button>
        </div>

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
                    {application.initialForm?.lookingForWhatQualification ||
                      "N/A"}
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
              </div>
            </div>

            {/* Tab Content */}
            <div className="mb-6">
              {selectedForm === "initial" && renderInitialForm()}
              {selectedForm === "student" && renderStudentForm()}
              {selectedForm === "documents" && renderDocumentsForm()}
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
