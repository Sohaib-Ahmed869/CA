// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaUserEdit,
//   FaFileUpload,
//   FaCreditCard,
//   FaCertificate,
//   FaCheck,
//   FaArrowRight,
//   FaExclamationCircle,
//   FaChevronDown,
//   FaChevronUp,
// } from "react-icons/fa";
// import { CheckCircle, Clock, Repeat } from "lucide-react";

// // Add CSS animation for smoother transitions
// const fadeInAnimation = `
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(10px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// .animate-fadeIn {
//   animation: fadeIn 0.5s cubic-bezier(0.26, 0.54, 0.32, 1) forwards;
//   opacity: 0;
// }

// @keyframes pulse {
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// }
// .animate-pulse-slow {
//   animation: pulse 2s ease-in-out infinite;
// }

// .timeline-connector {
//   transition: background-position 0.8s ease-in-out;
//   background-size: 200% 100%;
//   background-position: 100% 0;
// }

// .timeline-connector.active {
//   background-position: 0 0;
// }
// `;

// const ImprovedTimeline = ({
//   applications = [],
//   timeline,
//   applicationName,
//   paid,
//   // Add new props for action handlers
//   onPaymentClick,
//   onStudentFormClick,
//   onUploadClick,
//   onCertificateClick,
// }) => {
//   const [selectedId, setSelectedId] = useState(null);
//   const [selectedApp, setSelectedApp] = useState(null);
//   const [completedSteps, setCompletedSteps] = useState(0);
//   const [timelineData, setTimelineData] = useState([]);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [certificateStatus, setCertificateStatus] = useState(false);
//   const navigate = useNavigate();
//   const [certificateModalOpen, setCertificateModalOpen] = useState(false);
//   const [certificateToView, setCertificateToView] = useState("");

//   const CertificateViewerModal = ({ isOpen, onClose, certificateUrl }) => {
//     if (!isOpen) return null;

//     return (
//       <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
//         <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full h-5/6 mx-4">
//           <div className="flex justify-between items-center p-4 border-b border-gray-200">
//             <h3 className="font-bold text-lg text-gray-900">Certificate</h3>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-500 focus:outline-none"
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div className="p-0 h-full">
//             <iframe
//               src={certificateUrl}
//               title="Certificate"
//               className="w-full h-full border-0"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Set the most recent application as selected by default
//   useEffect(() => {
//     if (applications && applications.length > 0 && !selectedId) {
//       // Select the most recent application (assuming it's the last in the array)
//       const latestApp = applications[applications.length - 1];
//       setSelectedId(latestApp.id || latestApp.applicationId);
//       setSelectedApp(latestApp);
//     }
//   }, [applications, selectedId]);

//   // Generate the timeline data when the selected application changes
//   useEffect(() => {
//     if (!selectedApp) return;

//     // Simple checks for completion status - matching ExistingApplications logic
//     const isFormFilled =
//       selectedApp.studentForm &&
//       Object.keys(selectedApp.studentForm).length > 0 &&
//       selectedApp.studentForm.firstName;

//     // const isDocumentsUploaded =
//     //   selectedApp.documentsForm &&
//     //   Object.keys(selectedApp.documentsForm).length > 0 &&
//     //   (selectedApp.documentsForm.resume ||
//     //     selectedApp.documentsForm.creditcard);

//     // const isPaymentDone =
//     //   selectedApp.paid ||
//     //   (selectedApp.partialScheme === true && selectedApp.full_paid === true);

//     // const isCertificateGenerated =
//     //   selectedApp.certificateId ||
//     //   selectedApp.currentStatus === "Certificate Generated" ||
//     //   selectedApp.currentStatus === "Completed";

//     // if (
//     //   isCertificateGenerated &&
//     //   isPaymentDone === true &&
//     //   isDocumentsUploaded === true &&
//     //   isFormFilled === true
//     // ) {
//     //   setCertificateStatus(true);
//     // }
//     const hasRequestedDocuments = selectedApp.requestedDocuments?.length > 0;

//     const areRequestedDocumentsUploaded = hasRequestedDocuments
//       ? selectedApp.requestedDocuments.every(
//           (requestedDoc) =>
//             selectedApp.documentsForm?.[requestedDoc.name]?.fileUrl
//         )
//       : true;

//     const isDocumentsUploaded =
//       selectedApp.documentsForm && selectedApp.documentsUploaded;
//     Object.keys(selectedApp.documentsForm).length > 0 &&
//       (!hasRequestedDocuments || areRequestedDocumentsUploaded);

//     const isPaymentDone = selectedApp.partialScheme
//       ? selectedApp.full_paid
//       : selectedApp.paid;

//     const isCertificateGenerated =
//       selectedApp.certificateId ||
//       selectedApp.currentStatus === "Certificate Generated" ||
//       selectedApp.currentStatus === "Completed";

//     if (
//       isCertificateGenerated &&
//       isPaymentDone === true &&
//       isDocumentsUploaded === true &&
//       isFormFilled === true
//     ) {
//       setCertificateStatus(true);
//     }

//     // // Create timeline data
//     const timeline = [
//       {
//         id: "payment",
//         title: "Payment",
//         subtitle: isPaymentDone
//           ? `$${formatPrice(selectedApp.price || "0")}`
//           : "Payment Pending",
//         status: isPaymentDone
//           ? "done"
//           : isFormFilled && isDocumentsUploaded && isPaymentDone
//           ? "current"
//           : "pending",
//         date: getStepDate(selectedApp, "Payment Awaiting"),
//         icon: <FaCreditCard className="text-white" />,
//         description: `Complete your payment of $${formatPrice(
//           selectedApp.price || "0"
//         )} to proceed with certification.`,
//         action: () => {
//           if (onPaymentClick) {
//             // Pass all necessary payment data
//             onPaymentClick(
//               selectedApp.price,
//               selectedApp.discount,
//               selectedApp.id || selectedApp.applicationId,
//               selectedApp.userId,
//               selectedApp.partialScheme,
//               selectedApp.paid,
//               selectedApp.payment1,
//               selectedApp.payment2,
//               selectedApp.full_paid
//             );
//           }
//         },
//       },
//       {
//         id: "form",
//         title: "Student Intake Form",
//         subtitle: "Personal Details",
//         status: isFormFilled ? "done" : "pending",
//         date: getStepDate(selectedApp, "Student Intake Form"),
//         icon: <FaUserEdit className="text-white" />,
//         description:
//           "Complete your personal information and qualification requirements.",
//         action: () => {
//           if (onStudentFormClick) {
//             onStudentFormClick(selectedApp.id || selectedApp.applicationId);
//           } else {
//             navigate(
//               `/student-intake-form/${
//                 selectedApp.id || selectedApp.applicationId
//               }`
//             );
//           }
//         },
//       },
//       {
//         id: "documents",
//         title: "Documents",
//         subtitle: "Required Files",
//         status: isDocumentsUploaded
//           ? "done"
//           : isFormFilled
//           ? "current"
//           : "pending",
//         date: getStepDate(selectedApp, "Sent to RTO"),
//         icon: <FaFileUpload className="text-white" />,
//         description:
//           "Upload your identification and required supporting documents.",
//         action: () => {
//           if (onUploadClick) {
//             onUploadClick(
//               selectedApp.id || selectedApp.applicationId,
//               selectedApp.initialForm?.industry
//             );
//           } else {
//             navigate(
//               `/upload-documents/${selectedApp.id || selectedApp.applicationId}`
//             );
//           }
//         },
//       },
//       // Find this code block in the timeline data array (around line 136-149):
//       {
//         id: "certificate",
//         title: "Certificate",
//         subtitle: "Generated & Ready",
//         status: isCertificateGenerated
//           ? "done"
//           : isFormFilled && isDocumentsUploaded && isPaymentDone
//           ? "current"
//           : "pending",
//         date: getStepDate(selectedApp, "Certificate Generated"),
//         icon: <FaCertificate className="text-white" />,
//         description: isCertificateGenerated
//           ? "Your certificate is ready for download."
//           : "Your certificate will be generated once all steps are complete.",
//         action: () => {
//           if (selectedApp.certificateId) {
//             setCertificateToView(selectedApp.certificateId);
//             setCertificateModalOpen(true);
//           }
//         },
//       },
//     ];

//     setTimelineData(timeline);
//     setCompletedSteps(timeline.filter((item) => item.status === "done").length);
//   }, [
//     selectedApp,
//     onPaymentClick,
//     onStudentFormClick,
//     onUploadClick,
//     onCertificateClick,
//     navigate,
//   ]);

//   // Helper to get the date for a specific status step
//   const getStepDate = (application, statusName) => {
//     if (!application || !application.status) return null;

//     const statusEntry = application.status.find(
//       (s) => s.statusname === statusName
//     );
//     if (statusEntry && statusEntry.time) {
//       return formatDate(statusEntry.time);
//     }
//     return null;
//   };

//   // Format price removing commas and converting to number
//   const formatPrice = (price) => {
//     if (!price) return "0";
//     return parseFloat(price.toString().replace(/,/g, "")).toLocaleString();
//   };

//   // Format date in a friendly way
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   // Handle application selection with animation reset
//   const handleSelectApplication = (application) => {
//     // First set the selectedId
//     setSelectedId(application.id || application.applicationId);

//     // Then reset animation by briefly hiding the content
//     const timelineContainer = document.querySelector(".timeline-content");
//     if (timelineContainer) {
//       timelineContainer.style.opacity = "0";

//       // Short timeout to ensure animation plays again
//       setTimeout(() => {
//         setSelectedApp(application);
//         timelineContainer.style.opacity = "1";
//       }, 100);
//     } else {
//       setSelectedApp(application);
//     }
//   };

//   // Get the next action step
//   const getNextActionStep = () => {
//     // First check for any "current" steps
//     const currentStep = timelineData.find((step) => step.status === "current");
//     if (currentStep) return currentStep;

//     // If no current steps, find the first pending step
//     const pendingStep = timelineData.find((step) => step.status === "pending");
//     if (pendingStep) return pendingStep;

//     // If all steps are done, return the certificate step
//     return timelineData.find((step) => step.id === "certificate");
//   };

//   // Add the CSS animation to the document
//   useEffect(() => {
//     // Check if the style is already added to avoid duplicates
//     if (!document.getElementById("timeline-animation-style")) {
//       const styleEl = document.createElement("style");
//       styleEl.id = "timeline-animation-style";
//       styleEl.innerHTML = fadeInAnimation;
//       document.head.appendChild(styleEl);

//       return () => {
//         // Clean up
//         const existingStyle = document.getElementById(
//           "timeline-animation-style"
//         );
//         if (existingStyle) document.head.removeChild(existingStyle);
//       };
//     }
//   }, []);

//   // Render if no applications
//   if (!applications || applications.length === 0) {
//     return (
//       <div className="w-full bg-white shadow-sm rounded-xl p-8 text-center">
//         <div className="text-gray-500 text-lg">
//           No applications found. Create a new application to get started.
//         </div>
//       </div>
//     );
//   }

//   // Get the active next step (current or first pending)
//   const activeStep = getNextActionStep();

//   return (
//     <div className="bg-white rounded-xl overflow-hidden">
//       <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-5 relative">
//         {/* Header Section */}
//         {/* <div className="flex justify-between items-center mb-3">
//           <div>
//             <h2 className="text-white text-xl font-bold ">
//               Application Progress
//             </h2>
//             <p className="text-white/80 text-sm">
//               {selectedApp?.initialForm?.lookingForWhatQualification ||
//                 applicationName ||
//                 "Your Certification Journey"}
//             </p>
//           </div>
//           <div className="bg-white rounded-full px-3 py-1.5 flex items-center space-x-1 text-xs  ">
//             <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
//             <span className="font-medium text-emerald-800 ">
//               {completedSteps}/{timelineData.length} Steps Completed
//             </span>
//           </div>
//         </div> */}
//         <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3 space-y-2 md:space-y-0">
//           <div className="flex-1 min-w-0">
//             <h2 className="text-white text-lg md:text-xl font-bold leading-tight truncate">
//               Application Progress
//             </h2>
//             <p className="text-white/80 text-xs md:text-sm truncate">
//               {selectedApp?.initialForm?.lookingForWhatQualification ||
//                 applicationName ||
//                 "Your Certification Journey"}
//             </p>
//           </div>
//           <div className="bg-white rounded-full px-2 py-1 md:px-3 md:py-1.5 flex items-center space-x-1 text-xs max-w-fit">
//             <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
//             <span className="font-medium text-emerald-800 whitespace-nowrap">
//               {completedSteps}/{timelineData.length} Steps Completed
//             </span>
//           </div>
//         </div>
//         {/* Application ID Pills */}
//         {applications && applications.length > 1 && (
//           <div className="mb-4 hide-scrollbar">
//             <div className="flex flex-wrap overflow-x-auto hide-scrollbar gap-2">
//               {applications.map((app, index) => (
//                 <button
//                   key={app.id || app.applicationId || index}
//                   className={`flex-shrink-0 cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium border transition-all duration-300 ${
//                     selectedId === app.id || selectedId === app.applicationId
//                       ? "bg-white text-emerald-700 border-white"
//                       : "bg-emerald-500/20 text-white border-emerald-500/30 hover:bg-emerald-500/40"
//                   }`}
//                   onClick={() => handleSelectApplication(app)}
//                 >
//                   Application #{app.applicationId || app.id || index + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Progress Bar */}
//         <div className="w-full bg-emerald-500/30 h-2 rounded-full overflow-hidden">
//           <div
//             className="bg-white h-full rounded-full transition-all duration-500 ease-out"
//             style={{
//               width: `${(completedSteps / timelineData.length) * 100}%`,
//             }}
//           ></div>
//         </div>
//       </div>

//       {/* Timeline Content */}
//       <div className="p-6 timeline-content transition-opacity duration-300">
//         {/* Timeline Steps - Modern Vertical Format */}
//         <div className="space-y-6 mb-6">
//           {timelineData.map((step, index) => (
//             <div
//               key={step.id}
//               className={`flex items-start animate-fadeIn ${
//                 index === timelineData.length - 1 ? "" : "pb-2"
//               }`}
//               style={{ animationDelay: `${index * 150}ms` }}
//             >
//               {/* Step Circle */}
//               <div
//                 className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full shadow-sm transition-all duration-500 ${
//                   step.status === "done"
//                     ? "bg-emerald-600"
//                     : step.status === "current"
//                     ? "bg-emerald-500 animate-pulse-slow"
//                     : "bg-gray-300"
//                 }`}
//               >
//                 {step.status === "done" ? (
//                   <FaCheck className="text-white" />
//                 ) : (
//                   step.icon
//                 )}
//               </div>

//               {/* Vertical Line Connector */}
//               {index < timelineData.length - 1 && (
//                 <div className="absolute ml-5 mt-10 h-12 w-0.5 bg-gray-200"></div>
//               )}

//               {/* Step Details */}
//               <div className="ml-4 flex-grow">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h4
//                       className={`font-semibold text-gray-800 ${
//                         step.status === "current" ? "text-emerald-700" : ""
//                       }`}
//                     >
//                       {step.title}
//                     </h4>
//                     <p className="text-sm text-gray-500">{step.subtitle}</p>
//                   </div>

//                   <div className="flex items-center">
//                     {step.date && (
//                       <span className="text-xs text-gray-500 mr-2">
//                         {step.date}
//                       </span>
//                     )}

//                     <span
//                       className={`px-2 py-0.5 rounded-full text-xs ${
//                         step.status === "done"
//                           ? "bg-emerald-100 text-emerald-800"
//                           : step.status === "current"
//                           ? "bg-red-200 text-red-800"
//                           : step.status === "pending" &&
//                             (step.id === "documents" || step.id === "form")
//                           ? "bg-red-100 text-red-800"
//                           : "bg-gray-100 text-gray-600"
//                       }`}
//                     >
//                       {step.status === "done"
//                         ? "Completed"
//                         : step.status === "current" &&
//                           activeStep.id === "certificate"
//                         ? "In Process"
//                         : step.status === "current"
//                         ? "Required"
//                         : step.status === "pending" &&
//                           (step.id === "documents" || step.id === "form")
//                         ? "required"
//                         : "Pending"}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Step Description */}
//                 <p className="text-sm text-gray-600 mt-1">{step.description}</p>

//                 {/* Action Button if applicable - now using the defined action handler */}
//                 {step.status === "current" ||
//                 (step.status === "pending" && index === completedSteps) ||
//                 step.status === "pending" ||
//                 (step.id === "certificate" && selectedApp.certificateId) ? (
//                   <button
//                     onClick={step.action}
//                     className="mt-2 inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-800 transition-colors"
//                   >
//                     {step.id === "payment" && "Make Payment"}
//                     {step.id === "documents" && "Upload Files"}
//                     {step.id === "form" && "Complete Student Form"}
//                     {step.id === "certificate" &&
//                       selectedApp.certificateId &&
//                       "Download Certificate"}
//                     {step.id !== "certificate" && (
//                       <FaArrowRight className="ml-1 text-xs" />
//                     )}
//                     {step.id === "certificate" && selectedApp.certificateId && (
//                       <FaArrowRight className="ml-1 text-xs" />
//                     )}
//                   </button>
//                 ) : null}
//                 {/* Add payment info to the payment step description when partial payment */}
//                 {step.id === "payment" && selectedApp?.partialScheme && (
//                   <div className="mt-2 flex flex-wrap gap-2">
//                     {selectedApp.paid && !selectedApp.full_paid ? (
//                       <>
//                         <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
//                           <span>Paid: ${selectedApp.payment1 || 0}</span>
//                         </div>
//                         <div className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full">
//                           <span>Remaining: ${selectedApp.payment2 || 0}</span>
//                         </div>
//                         <div>
//                           {(selectedApp.autoDebit?.status === "MANUALLY_PAID" ||
//                             selectedApp.autoDebit?.status ===
//                               "ALREADY_PAID") && (
//                             <span className="flex items-center  text-xs bg-green-100 text-green-700 font-semibold  px-2 py-0.5 rounded-full">
//                               <CheckCircle className="h-3 w-3 mr-1" />
//                               Direct Debit : Manually Paid
//                             </span>
//                           )}

//                           {selectedApp.autoDebit.status === "COMPLETED" && (
//                             <span className="flex items-center  text-xs bg-green-100 text-green-700 font-semibold  px-2 py-0.5 rounded-full">
//                               <CheckCircle className="h-3 w-3 mr-1" />
//                               Direct Debit Completed: $
//                               {selectedApp.autoDebit.amountDue || 0}
//                             </span>
//                           )}
//                           {selectedApp.autoDebit.status === "FAILED" && (
//                             <span className="flex items-center  text-xs bg-red-100 text-red-700 font-semibold  px-2 py-0.5 rounded-full">
//                               <CheckCircle className="h-3 w-3 mr-1" />
//                               Direct Debit FAILED: $
//                               {selectedApp.autoDebit.amountDue || 0}
//                             </span>
//                           )}
//                           {selectedApp.autoDebit.status === "SCHEDULED" && (
//                             <span className="flex items-center   text-xs bg-yellow-100 text-yellow-700 font-semibold  px-2 py-0.5 rounded-full">
//                               <Clock className="h-3 w-3 mr-1 text-yellow-600" />
//                               Direct Debit : Scheduled: $
//                               {selectedApp.autoDebit.amountDue || 0}
//                             </span>
//                           )}
//                         </div>
//                       </>
//                     ) : selectedApp.full_paid ? (
//                       <>
//                         <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
//                           <span>
//                             Fully Paid: $
//                             {parseFloat(selectedApp.payment1 || 0) +
//                               parseFloat(selectedApp.payment2 || 0)}
//                           </span>
//                         </div>
//                         {(selectedApp.autoDebit?.status === "MANUALLY_PAID" ||
//                           selectedApp.autoDebit?.status === "ALREADY_PAID") && (
//                           <span className="flex items-center  text-xs bg-green-100 text-green-700 font-semibold  px-2 py-0.5 rounded-full">
//                             <CheckCircle className="h-3 w-3 mr-1" />
//                             Direct Debit : Manually Paid
//                           </span>
//                         )}

//                         {selectedApp.autoDebit.status === "COMPLETED" && (
//                           <span className="flex items-center  text-xs bg-green-100 text-green-700 font-semibold  px-2 py-0.5 rounded-full">
//                             <CheckCircle className="h-3 w-3 mr-1" />
//                             Direct Debit Completed: $
//                             {selectedApp.autoDebit.amountDue || 0}
//                           </span>
//                         )}
//                       </>
//                     ) : (
//                       <div className=" flex gap-1 items-center text-xs text-gray-600 ">
//                         <span>Initial: ${selectedApp.payment1 || 0}</span>
//                         <span>/ Final: ${selectedApp.payment2 || 0}</span>

//                         {/* Status Indicator */}
//                         {selectedApp.autoDebit.status === "SCHEDULED" && (
//                           <span className="flex items-center text-blue-600">
//                             <Clock className="h-3 w-3 mr-1 text-blue-600" />
//                             Direct Debit : Scheduled: $
//                             {selectedApp.payment1 || 0}
//                           </span>
//                         )}

//                         {/* Payment Details */}

//                         {/* Direct Debit */}
//                         {/* {selectedApp?.autoDebit?.enabled && (
//                             <div className="flex items-center text-purple-600">
//                               /<Repeat className="h-3 w-3 mr-1 ml-1" />
//                               Direct Debit: $
//                               {selectedApp?.autoDebit?.amountDue || 0}
//                             </div>
//                           )} */}
//                       </div>
//                     )}
//                     {selectedApp.discount > 0 && (
//                       <div className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-0.5 rounded-full">
//                         <span>Discount: ${selectedApp.discount}</span>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Next Action Card - only shows if there's a required step */}
//         {activeStep && activeStep.status !== "done" && (
//           <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 flex items-start mt-4 animate-fadeIn">
//             <div className="bg-emerald-100 rounded-full p-2 mr-3 flex-shrink-0">
//               <FaExclamationCircle className="text-emerald-700 text-sm" />
//             </div>
//             <div className="flex-grow">
//               <h4 className="font-medium text-emerald-800 text-sm">
//                 {activeStep.id === "certificate"
//                   ? "Your information is being processed."
//                   : "Next Action Required"}
//               </h4>
//               <p className="text-sm text-emerald-700">
//                 {activeStep.id === "form"
//                   ? "Please complete your student intake form to proceed."
//                   : activeStep.id === "documents"
//                   ? "Your documents need to be uploaded to continue the process."
//                   : activeStep.id === "payment"
//                   ? "Payment is required to process your certification."
//                   : activeStep.id === "certificate"
//                   ? "Your certificate will be issued after your information is verified."
//                   : "Your certificate will be generated once all steps are complete."}
//               </p>

//               {!(activeStep.id === "certificate" && !certificateStatus) && (
//                 <button
//                   onClick={activeStep.action}
//                   className="mt-3 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-sm transition-colors"
//                 >
//                   {activeStep.id === "form" && "Complete Student Form"}
//                   {activeStep.id === "documents" && "Upload Documents"}
//                   {activeStep.id === "payment" && "Make Payment"}
//                   {activeStep.id === "certificate" && "View Certificate"}
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Help Text - Only show if expanded or there's a specific issue */}
//         <div className={`mt-4 text-center ${isExpanded ? "block" : "hidden"}`}>
//           <div className="text-xs text-gray-500 mt-2">
//             Need assistance with your application? Contact our support team at{" "}
//             <span className="text-emerald-600">
//               info@certifiedaustralia.com
//             </span>
//           </div>
//         </div>

//         {/* Expand/Collapse Button */}
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="w-full flex items-center justify-center mt-4 py-2 text-xs text-gray-500 hover:text-gray-700"
//         >
//           {isExpanded ? (
//             <>
//               Show Less <FaChevronUp className="ml-1" />
//             </>
//           ) : (
//             <>
//               Show More <FaChevronDown className="ml-1" />
//             </>
//           )}
//         </button>
//       </div>
//       {/* Certificate Viewer Modal */}
//       <CertificateViewerModal
//         isOpen={certificateModalOpen}
//         onClose={() => setCertificateModalOpen(false)}
//         certificateUrl={certificateToView}
//       />
//     </div>
//   );
// };

// export default ImprovedTimeline;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserEdit,
  FaFileUpload,
  FaCreditCard,
  FaCertificate,
  FaCheck,
  FaArrowRight,
  FaExclamationCircle,
  FaChevronDown,
  FaChevronUp,
  FaClipboardList,
  FaFileSignature,
} from "react-icons/fa";
import { CheckCircle, Clock, Repeat } from "lucide-react";

// Add CSS animation for smoother transitions
const fadeInAnimation = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.5s cubic-bezier(0.26, 0.54, 0.32, 1) forwards;
  opacity: 0;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
.animate-pulse-slow {
  animation: pulse 2s ease-in-out infinite;
}

.timeline-connector {
  transition: background-position 0.8s ease-in-out;
  background-size: 200% 100%;
  background-position: 100% 0;
}

.timeline-connector.active {
  background-position: 0 0;
}
`;

// Map of RTO document form names to their respective routes
const RTO_FORM_ROUTES = {
  "RPL Intake CPC31420 Certificate III in Construction Waterproofing":
    "/rpl-intake-cpc-31420-certificate-3-waterProofing",
  "RPL Intake CPC30220 Certificate III in Carpentry":
    "/rpl-intake-cpc-30220-certificate-3-carpentry",
  "RPL Enrolment Kit": "/rpl-enrollment-kit",
  "RPL Self Assessment kit":
    "/rpl-self-assessment-cpc-30220-certificate-3-carpentry",
  "RPL Application Form":
    "/rpl-applicationform-cpc-30220-certificate-3-carpentry",
  // Add more mappings as needed for other forms
  "RPL Intake CPC31320 Certificate III in Wall and Floor Tiling":
    "/rpl-intake-cpc-31320-certificate-3-wall-and-floor-tiling",
  "RPL Intake CPC30220 Certificate III in Carpentry":
    "/rpl-intake-cpc-30220-certificate-3-carpentry",
  "RPL Application Form CPC30220":
    "/rpl-applicationform-cpc-30220-certificate-3-carpentry",
  "RPL Assessment CPC30220":
    "/rpl-assessment-cpc-30220-certificate-3-carpentry",
  "RPL Evidence Kit Carpentry": "/rpl-evidence-kit-carpentry",
  "RPL Intake CPC30320 Certificate III in Concreting":
    "/rpl-intake-cpc-30320-certificate-3-concreting",
  "CIBT Enrollment Form": "/cibt-enrollment-form",
  "CIBT Entry Interview Form": "/cibt-entry-interview-form",
  "LLN Assessment": "/lln-assessment",
  // Plumbing forms
  "RPL Application Form CPC32420":
    "/rpl-application-form-cpc-32420-certificate-3-plumbing",
  "RPL Self Assessment Form CPC32420":
    "/rpl-self-assessment-form-cpc-32420-certificate-3-plumbing",
  // Roof Plumbing
  "RPL Intake CPC32620": "/rpl-intake-cpc-32620-certificate-3-roofPlumbing",
  // Solid Plastering
  "RPL Application Form CPC31020":
    "/rpl-application-form-cpc-31020-certificate-3-solidPlastering",
  "RPL Intake CPC31020": "/rpl-intake-cpc-31020-certificate-3-solidPlastering",
  // Building and Construction
  "RPL Intake CPC40120":
    "/rpl-intake-cpc-40120-certificate-IV-building-and-construction",
  "RPL Application Form CPC40120":
    "/rpl-application-form-cpc-41020-certificate-IV-building-and-construction",
  // Plumbing and Services
  "RPL Intake CPC40920":
    "/rpl-intake-cpc-40920-certificate-IV-Plumbing-and-Services",
  // Painting and Decorating
  "RPL Intake CPC30620":
    "/rpl-intake-cpc-30620-certificate-III-Painting-and-Decorating",
  // Diploma Building and Construction
  "RPL Intake CPC50220":
    "/rpl-intake-cpc-50220-Diploma-of-Building-and-Construction-(Building)",
  // Frontier RTO
  "Frontier RPL Enrollment Form": "/frontier-rpl-enrollment-form",
};

const ImprovedTimeline = ({
  applications = [],
  timeline,
  applicationName,
  paid,
  // Add new props for action handlers
  onPaymentClick,
  onStudentFormClick,
  onUploadClick,
  onCertificateClick,
  onRtoFormClick, // New prop for handling RTO form clicks
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [timelineData, setTimelineData] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [certificateStatus, setCertificateStatus] = useState(false);
  const navigate = useNavigate();
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [certificateToView, setCertificateToView] = useState("");

  const CertificateViewerModal = ({ isOpen, onClose, certificateUrl }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full h-5/6 mx-4">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="font-bold text-lg text-gray-900">Certificate</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg
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
            </button>
          </div>
          <div className="p-0 h-full">
            <iframe
              src={certificateUrl}
              title="Certificate"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </div>
    );
  };

  // Set the most recent application as selected by default
  useEffect(() => {
    if (applications && applications.length > 0 && !selectedId) {
      // Select the most recent application (assuming it's the last in the array)
      const latestApp = applications[applications.length - 1];
      setSelectedId(latestApp.id || latestApp.applicationId);
      setSelectedApp(latestApp);
    }
  }, [applications, selectedId]);

  // Generate the timeline data when the selected application changes
  useEffect(() => {
    if (!selectedApp) return;

    // Simple checks for completion status - matching ExistingApplications logic
    const isFormFilled =
      selectedApp.studentForm &&
      Object.keys(selectedApp.studentForm).length > 0 &&
      selectedApp.studentForm.firstName;
    selectedApp?.rplIntakeSubmitted === true;
    selectedApp?.enrolmentFormSubmitted === true;

    const hasRequestedDocuments = selectedApp.requestedDocuments?.length > 0;

    const areRequestedDocumentsUploaded = hasRequestedDocuments
      ? selectedApp.requestedDocuments.every(
          (requestedDoc) =>
            selectedApp.documentsForm?.[requestedDoc.name]?.fileUrl
        )
      : true;

    const isDocumentsUploaded =
      selectedApp.documentsForm && selectedApp.documentsUploaded;

    const isPaymentDone = selectedApp.partialScheme
      ? selectedApp.full_paid
      : selectedApp.paid;

    const isCertificateGenerated =
      selectedApp.certificateId ||
      selectedApp.currentStatus === "Certificate Generated" ||
      selectedApp.currentStatus === "Completed";

    // Check if RTO forms have been requested
    const hasRtoDocumentsRequested =
      selectedApp.rtoDocumentsRequested === true &&
      selectedApp.requestedRtoDocuments &&
      selectedApp.requestedRtoDocuments.length > 0;

    // Check RTO forms completion status
    // This is placeholder logic - you'll need to implement your own tracking mechanism
    const rtoFormsCompleted = selectedApp.rtoFormsCompleted || {};

    if (
      isCertificateGenerated &&
      isPaymentDone === true &&
      isDocumentsUploaded === true &&
      isFormFilled === true
    ) {
      setCertificateStatus(true);
    }

    // Create base timeline data (standard steps)
    let timeline = [
      {
        id: "form",
        title: "Student Intake Form",
        subtitle: "Personal Details",
        status: isFormFilled ? "done" : "pending",
        date: getStepDate(selectedApp, "Student Intake Form"),
        icon: <FaUserEdit className="text-white" />,
        description:
          "Complete your personal information and qualification requirements.",
        action: () => {
          if (onStudentFormClick) {
            onStudentFormClick(selectedApp.id || selectedApp.applicationId);
          } else {
            navigate(
              `/student-intake-form/${
                selectedApp.id || selectedApp.applicationId
              }`
            );
          }
        },
        stepOrder: 2,
      },
      {
        id: "documents",
        title: "Documents",
        subtitle: "Required Files",
        status: isDocumentsUploaded
          ? "done"
          : isFormFilled
          ? "current"
          : "pending",
        date: getStepDate(selectedApp, "Sent to RTO"),
        icon: <FaFileUpload className="text-white" />,
        description:
          "Upload your identification and required supporting documents.",
        action: () => {
          if (onUploadClick) {
            onUploadClick(
              selectedApp.id || selectedApp.applicationId,
              selectedApp.initialForm?.industry
            );
          } else {
            navigate(
              `/upload-documents/${selectedApp.id || selectedApp.applicationId}`
            );
          }
        },
        stepOrder: 3,
      },
      {
        id: "payment",
        title: "Payment",
        subtitle: isPaymentDone
          ? `$${formatPrice(selectedApp.price || "0")}`
          : "Payment Pending",
        status: isPaymentDone
          ? "done"
          : isFormFilled && isDocumentsUploaded
          ? "current"
          : "pending",
        date: getStepDate(selectedApp, "Payment Awaiting"),
        icon: <FaCreditCard className="text-white" />,
        description: `Complete your payment of $${formatPrice(
          selectedApp.price || "0"
        )} to proceed with certification.`,
        action: () => {
          if (onPaymentClick) {
            // Pass all necessary payment data
            onPaymentClick(
              selectedApp.price,
              selectedApp.discount,
              selectedApp.id || selectedApp.applicationId,
              selectedApp.userId,
              selectedApp.partialScheme,
              selectedApp.paid,
              selectedApp.payment1,
              selectedApp.payment2,
              selectedApp.full_paid
            );
          }
        },
        stepOrder: 1,
      },
    ];

    // Insert RTO document steps if requested
    if (hasRtoDocumentsRequested) {
      // Add RTO form steps for each requested document
      const rtoFormSteps = selectedApp.requestedRtoDocuments.map(
        (formName, index) => {
          // Check if this is an intake form and if rplIntakeSubmitted is true
          const isIntakeForm = formName.toLowerCase().includes("intake");
          const isEnrollmentForm = formName.toLowerCase().includes("enrolment");
          const isApplicationForm = formName
            .toLowerCase()
            .includes("application");
          const isAssessmentForm = formName
            .toLowerCase()
            .includes("assessment");
          // For intake forms, check ONLY rplIntakeSubmitted field
          // For other forms, use rtoFormsCompleted as before
          const isCompleted = isIntakeForm
            ? selectedApp.rplIntakeSubmitted === true
            : isEnrollmentForm
            ? selectedApp.enrolmentFormSubmitted === true
            : isApplicationForm
            ? selectedApp.ApplicationFormSubmitted === true
            : isAssessmentForm
            ? selectedApp.assessmentFormSubmitted === true
            : rtoFormsCompleted && rtoFormsCompleted[formName] === true;

          const formRoute = RTO_FORM_ROUTES[formName] || "#";

          // Create a friendly display title from the form name
          const displayTitle = formName
            .replace("RPL ", "")
            .replace("Certificate III in ", "")
            .replace(/cpc\s*\d+/i, "")
            .trim();

          return {
            id: `rto-form-${index}`,
            title: `${displayTitle}`,
            subtitle: "RTO Required Form",
            // Set status based on completion check
            status: isCompleted ? "done" : "current",
            date: isCompleted
              ? selectedApp.rplIntakeSubmittedDate || null
              : null,
            icon: <FaClipboardList className="text-white" />,
            description: `Complete the ${displayTitle} form required by your RTO.`,
            action: () => {
              if (onRtoFormClick) {
                onRtoFormClick(
                  selectedApp.id || selectedApp.applicationId,
                  formName,
                  formRoute
                );
              } else {
                navigate(
                  `${formRoute}/${selectedApp.id || selectedApp.applicationId}`
                );
              }
            },
            stepOrder: 4,
            formName: formName,
          };
        }
      );

      // Insert RTO steps into the timeline at the appropriate position
      timeline = [
        ...timeline.slice(0, 2),
        ...rtoFormSteps,
        ...timeline.slice(2),
      ];
    }
    // Add certificate step as the final step
    timeline.push({
      id: "certificate",
      title: "Certificate",
      subtitle: "Generated & Ready",
      status: isCertificateGenerated
        ? "done"
        : isFormFilled && isDocumentsUploaded && isPaymentDone
        ? "current"
        : "pending",
      date: getStepDate(selectedApp, "Certificate Generated"),
      icon: <FaCertificate className="text-white" />,
      description: isCertificateGenerated
        ? "Your certificate is ready for download."
        : "Your certificate will be generated once all steps are complete.",
      action: () => {
        if (selectedApp.certificateId) {
          setCertificateToView(selectedApp.certificateId);
          setCertificateModalOpen(true);
        }
      },
      stepOrder: 5,
    });

    // Sort steps by order if needed
    timeline.sort((a, b) => a.stepOrder - b.stepOrder);

    setTimelineData(timeline);
    setCompletedSteps(timeline.filter((item) => item.status === "done").length);
  }, [
    selectedApp,
    onPaymentClick,
    onStudentFormClick,
    onUploadClick,
    onCertificateClick,
    onRtoFormClick,
    navigate,
  ]);

  // Helper to get the date for a specific status step
  const getStepDate = (application, statusName) => {
    if (!application || !application.status) return null;

    const statusEntry = application.status.find(
      (s) => s.statusname === statusName
    );
    if (statusEntry && statusEntry.time) {
      return formatDate(statusEntry.time);
    }
    return null;
  };

  // Format price removing commas and converting to number
  const formatPrice = (price) => {
    if (!price) return "0";
    return parseFloat(price.toString().replace(/,/g, "")).toLocaleString();
  };

  // Format date in a friendly way
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Handle application selection with animation reset
  const handleSelectApplication = (application) => {
    // First set the selectedId
    setSelectedId(application.id || application.applicationId);

    // Then reset animation by briefly hiding the content
    const timelineContainer = document.querySelector(".timeline-content");
    if (timelineContainer) {
      timelineContainer.style.opacity = "0";

      // Short timeout to ensure animation plays again
      setTimeout(() => {
        setSelectedApp(application);
        timelineContainer.style.opacity = "1";
      }, 100);
    } else {
      setSelectedApp(application);
    }
  };

  // Get the next action step
  const getNextActionStep = () => {
    // First check for any "current" steps
    const currentStep = timelineData.find((step) => step.status === "current");
    if (currentStep) return currentStep;

    // If no current steps, find the first pending step
    const pendingStep = timelineData.find((step) => step.status === "pending");
    if (pendingStep) return pendingStep;

    // If all steps are done, return the certificate step
    return timelineData.find((step) => step.id === "certificate");
  };

  // Add the CSS animation to the document
  useEffect(() => {
    // Check if the style is already added to avoid duplicates
    if (!document.getElementById("timeline-animation-style")) {
      const styleEl = document.createElement("style");
      styleEl.id = "timeline-animation-style";
      styleEl.innerHTML = fadeInAnimation;
      document.head.appendChild(styleEl);

      return () => {
        // Clean up
        const existingStyle = document.getElementById(
          "timeline-animation-style"
        );
        if (existingStyle) document.head.removeChild(existingStyle);
      };
    }
  }, []);

  // Render if no applications
  if (!applications || applications.length === 0) {
    return (
      <div className="w-full bg-white shadow-sm rounded-xl p-8 text-center">
        <div className="text-gray-500 text-lg">
          No applications found. Create a new application to get started.
        </div>
      </div>
    );
  }

  // Get the active next step (current or first pending)
  const activeStep = getNextActionStep();

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-5 relative">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3 space-y-2 md:space-y-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-white text-lg md:text-xl font-bold leading-tight truncate">
              Application Progress
            </h2>
            <p className="text-white/80 text-xs md:text-sm truncate">
              {selectedApp?.initialForm?.lookingForWhatQualification ||
                applicationName ||
                "Your Certification Journey"}
            </p>
          </div>
          <div className="bg-white rounded-full px-2 py-1 md:px-3 md:py-1.5 flex items-center space-x-1 text-xs max-w-fit">
            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
            <span className="font-medium text-emerald-800 whitespace-nowrap">
              {completedSteps}/{timelineData.length} Steps Completed
            </span>
          </div>
        </div>

        {/* Application ID Pills */}
        {applications && applications.length > 1 && (
          <div className="mb-4 hide-scrollbar">
            <div className="flex flex-wrap overflow-x-auto hide-scrollbar gap-2">
              {applications.map((app, index) => (
                <button
                  key={app.id || app.applicationId || index}
                  className={`flex-shrink-0 cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium border transition-all duration-300 ${
                    selectedId === app.id || selectedId === app.applicationId
                      ? "bg-white text-emerald-700 border-white"
                      : "bg-emerald-500/20 text-white border-emerald-500/30 hover:bg-emerald-500/40"
                  }`}
                  onClick={() => handleSelectApplication(app)}
                >
                  Application #{app.applicationId || app.id || index + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full bg-emerald-500/30 h-2 rounded-full overflow-hidden">
          <div
            className="bg-white h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${(completedSteps / timelineData.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="p-6 timeline-content transition-opacity duration-300">
        {/* Timeline Steps - Modern Vertical Format */}
        <div className="space-y-6 mb-6">
          {timelineData.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-start animate-fadeIn ${
                index === timelineData.length - 1 ? "" : "pb-2"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Step Circle */}
              <div
                className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full shadow-sm transition-all duration-500 ${
                  step.status === "done"
                    ? "bg-emerald-600"
                    : step.status === "current"
                    ? "bg-emerald-500 animate-pulse-slow"
                    : "bg-gray-300"
                }`}
              >
                {step.status === "done" ? (
                  <FaCheck className="text-white" />
                ) : (
                  step.icon
                )}
              </div>

              {/* Vertical Line Connector */}
              {index < timelineData.length - 1 && (
                <div className="absolute ml-5 mt-10 h-12 w-0.5 bg-gray-200"></div>
              )}

              {/* Step Details */}
              <div className="ml-4 flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4
                      className={`font-semibold text-gray-800 ${
                        step.status === "current" ? "text-emerald-700" : ""
                      }`}
                    >
                      {step.title}
                      {step.id.includes("rto-form") && (
                        <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                          RTO
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-500">{step.subtitle}</p>
                  </div>

                  <div className="flex items-center">
                    {step.date && (
                      <span className="text-xs text-gray-500 mr-2">
                        {step.date}
                      </span>
                    )}

                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        step.status === "done"
                          ? "bg-emerald-100 text-emerald-800"
                          : step.status === "current"
                          ? "bg-red-200 text-red-800"
                          : step.status === "pending" &&
                            (step.id === "documents" || step.id === "form")
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {step.status === "done"
                        ? "Completed"
                        : step.status === "current" &&
                          activeStep.id === "certificate"
                        ? "In Process"
                        : step.status === "current"
                        ? "Required"
                        : step.status === "pending" &&
                          (step.id === "documents" || step.id === "form")
                        ? "Required"
                        : "Pending"}
                    </span>
                  </div>
                </div>

                {/* Step Description */}
                <p className="text-sm text-gray-600 mt-1">{step.description}</p>

                {/* Action Button */}
                {step.status === "current" ||
                (step.status === "pending" && index === completedSteps) ||
                step.status === "pending" ||
                (step.id === "certificate" && selectedApp.certificateId) ? (
                  <button
                    onClick={step.action}
                    className="mt-2 inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-800 transition-colors"
                  >
                    {step.id === "payment" && "Make Payment"}
                    {step.id === "documents" && "Upload Files"}
                    {step.id === "form" && "Complete Student Form"}
                    {step.id.includes("rto-form") && "Complete Form"}
                    {step.id === "certificate" &&
                      selectedApp.certificateId &&
                      "Download Certificate"}
                    {step.id !== "certificate" && (
                      <FaArrowRight className="ml-1 text-xs" />
                    )}
                    {step.id === "certificate" && selectedApp.certificateId && (
                      <FaArrowRight className="ml-1 text-xs" />
                    )}
                  </button>
                ) : null}

                {/* Add payment info to the payment step description when partial payment */}
                {step.id === "payment" && selectedApp?.partialScheme && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedApp.paid && !selectedApp.full_paid ? (
                      <>
                        <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                          <span>Paid: ${selectedApp.payment1 || 0}</span>
                        </div>
                        <div className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                          <span>Remaining: ${selectedApp.payment2 || 0}</span>
                        </div>
                        <div>
                          {(selectedApp.autoDebit?.status === "MANUALLY_PAID" ||
                            selectedApp.autoDebit?.status ===
                              "ALREADY_PAID") && (
                            <span className="flex items-center text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Direct Debit : Manually Paid
                            </span>
                          )}

                          {selectedApp.autoDebit?.status === "COMPLETED" && (
                            <span className="flex items-center text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Direct Debit Completed: $
                              {selectedApp.autoDebit.amountDue || 0}
                            </span>
                          )}

                          {selectedApp.autoDebit?.status === "FAILED" && (
                            <span className="flex items-center text-xs bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded-full">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Direct Debit FAILED: $
                              {selectedApp.autoDebit.amountDue || 0}
                            </span>
                          )}

                          {selectedApp.autoDebit?.status === "SCHEDULED" && (
                            <span className="flex items-center text-xs bg-yellow-100 text-yellow-700 font-semibold px-2 py-0.5 rounded-full">
                              <Clock className="h-3 w-3 mr-1 text-yellow-600" />
                              Direct Debit : Scheduled: $
                              {selectedApp.autoDebit.amountDue || 0}
                            </span>
                          )}
                        </div>
                      </>
                    ) : selectedApp.full_paid ? (
                      <>
                        <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                          <span>
                            Fully Paid: $
                            {parseFloat(selectedApp.payment1 || 0) +
                              parseFloat(selectedApp.payment2 || 0)}
                          </span>
                        </div>
                        {(selectedApp.autoDebit?.status === "MANUALLY_PAID" ||
                          selectedApp.autoDebit?.status === "ALREADY_PAID") && (
                          <span className="flex items-center text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Direct Debit : Manually Paid
                          </span>
                        )}

                        {selectedApp.autoDebit?.status === "COMPLETED" && (
                          <span className="flex items-center text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Direct Debit Completed: $
                            {selectedApp.autoDebit.amountDue || 0}
                          </span>
                        )}
                      </>
                    ) : (
                      <div className="flex gap-1 items-center text-xs text-gray-600">
                        <span>Initial: ${selectedApp.payment1 || 0}</span>
                        <span>/ Final: ${selectedApp.payment2 || 0}</span>

                        {/* Status Indicator */}
                        {selectedApp.autoDebit?.status === "SCHEDULED" && (
                          <span className="flex items-center text-blue-600">
                            <Clock className="h-3 w-3 mr-1" />
                            Auto-debit scheduled
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Next Step Action Card */}
        {activeStep && !certificateStatus && (
          <div className="mt-8 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100 rounded-xl p-4 animate-fadeIn">
            <div className="flex items-start">
              <div className="bg-emerald-100 rounded-full p-2 mr-3 flex-shrink-0">
                <FaExclamationCircle className="text-emerald-700 text-sm" />
              </div>
              <div className="ml-4">
                <h4 className="font-medium text-emerald-800 text-sm">
                  {activeStep.id === "certificate"
                    ? "Your information is being processed."
                    : "Next Action Required"}{" "}
                </h4>
                <p className="text-sm text-gray-700 mt-1">
                  {activeStep.status === "current" &&
                  activeStep.id === "payment"
                    ? "Complete your payment to continue your certification process."
                    : activeStep.status === "current" &&
                      activeStep.id === "documents"
                    ? "Upload your identification and supporting documents."
                    : activeStep.status === "current" &&
                      activeStep.id === "form"
                    ? "Please complete your student intake form to proceed."
                    : activeStep.id.includes("rto-form")
                    ? `Complete the ${activeStep.formName} required by your RTO.`
                    : activeStep.status === "current" &&
                      activeStep.id === "certificate"
                    ? "Your certificate will be issued after your information is verified."
                    : activeStep.status === "pending" &&
                      activeStep.id === "form"
                    ? "Please complete your student intake form to proceed."
                    : activeStep.status === "pending" &&
                      activeStep.id === "payment"
                    ? "Payment is required to process your certification."
                    : "Proceed to the next step in your application process."}
                </p>
                <button
                  onClick={activeStep.action}
                  className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-md flex items-center transition-colors"
                >
                  {activeStep.id === "payment"
                    ? "Make Payment"
                    : activeStep.id === "documents"
                    ? "Upload Documents"
                    : activeStep.id === "form"
                    ? "Complete Form"
                    : activeStep.id.includes("rto-form")
                    ? "Complete Form"
                    : activeStep.id === "certificate"
                    ? selectedApp.certificateId
                      ? "View Certificate"
                      : "Certificate under processing"
                    : "Continue"}
                  {activeStep.id === "certificate" &&
                    selectedApp.certificateId && (
                      <FaArrowRight className="ml-2" />
                    )}

                  {activeStep.id !== "certificate" && (
                    <FaArrowRight className="ml-2" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Status Card for Certificate Generated */}
        {certificateStatus && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-4 animate-fadeIn">
            <div className="flex items-start">
              <div className="bg-green-500 rounded-full p-2 flex-shrink-0">
                <FaCheck className="h-4 w-4 text-white" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-green-800">
                  Certificate Generated!
                </h4>
                <p className="text-sm text-gray-700 mt-1">
                  Congratulations! Your certification process is complete. You
                  can now download your certificate.
                </p>
                <button
                  onClick={() => {
                    if (selectedApp.certificateId) {
                      setCertificateToView(selectedApp.certificateId);
                      setCertificateModalOpen(true);
                    }
                  }}
                  className="mt-3 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md flex items-center transition-colors"
                >
                  Download Certificate
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Additional application details - collapsible */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <span>Application Details</span>
            {isExpanded ? (
              <FaChevronUp className="h-4 w-4" />
            ) : (
              <FaChevronDown className="h-4 w-4" />
            )}
          </button>

          {isExpanded && selectedApp && (
            <div className="mt-3 space-y-3 text-sm text-gray-500 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <span className="font-medium text-gray-600">Status:</span>{" "}
                  {selectedApp.currentStatus || "In Progress"}
                </div>
                <div>
                  <span className="font-medium text-gray-600">
                    Application ID:
                  </span>{" "}
                  {selectedApp.applicationId || selectedApp.id}
                </div>
                {selectedApp.initialForm?.lookingForWhatQualification && (
                  <div>
                    <span className="font-medium text-gray-600">
                      Qualification:
                    </span>{" "}
                    {selectedApp.initialForm.lookingForWhatQualification}
                  </div>
                )}
                {selectedApp.initialForm?.industry && (
                  <div>
                    <span className="font-medium text-gray-600">Industry:</span>{" "}
                    {selectedApp.initialForm.industry}
                  </div>
                )}
                {selectedApp.createdAt && (
                  <div>
                    <span className="font-medium text-gray-600">Created:</span>{" "}
                    {formatDate(selectedApp.createdAt)}
                  </div>
                )}
                {selectedApp.price && (
                  <div>
                    <span className="font-medium text-gray-600">Price:</span> $
                    {formatPrice(selectedApp.price)}
                  </div>
                )}
              </div>

              {/* Status Timeline */}
              {selectedApp.status && selectedApp.status.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-medium text-gray-700 mb-2">
                    Status History
                  </h5>
                  <div className="space-y-2">
                    {selectedApp.status.map((statusItem, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-xs border-l-2 border-gray-200 pl-3 py-1"
                      >
                        <div className="text-gray-500 w-32">
                          {formatDate(statusItem.time)}
                        </div>
                        <div className="ml-2">{statusItem.statusname}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      <CertificateViewerModal
        isOpen={certificateModalOpen}
        onClose={() => setCertificateModalOpen(false)}
        certificateUrl={certificateToView}
      />
    </div>
  );
};

export default ImprovedTimeline;
