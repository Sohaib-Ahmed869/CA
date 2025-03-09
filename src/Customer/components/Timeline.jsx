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
} from "react-icons/fa";

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
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [timelineData, setTimelineData] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

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

    const isDocumentsUploaded =
      selectedApp.documentsForm &&
      Object.keys(selectedApp.documentsForm).length > 0 &&
      (selectedApp.documentsForm.resume ||
        selectedApp.documentsForm.creditcard);

    const isPaymentDone =
      selectedApp.paid ||
      (selectedApp.partialScheme === true && selectedApp.full_paid === true);

    const isCertificateGenerated =
      selectedApp.certificateId ||
      selectedApp.currentStatus === "Certificate Generated" ||
      selectedApp.currentStatus === "Completed";

    // Create timeline data
    const timeline = [
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
      },
      {
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
        description:
          "Your certificate will be generated and ready for download once all steps are completed.",
        action: () => {
          if (onCertificateClick && selectedApp.certificateId) {
            onCertificateClick(selectedApp.certificateId);
          } else if (selectedApp.certificateId) {
            window.open(selectedApp.certificateId, "_blank");
          }
        },
      },
    ];

    setTimelineData(timeline);
    setCompletedSteps(timeline.filter((item) => item.status === "done").length);
  }, [
    selectedApp,
    onPaymentClick,
    onStudentFormClick,
    onUploadClick,
    onCertificateClick,
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
        {/* Header Section */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-white text-xl font-bold">
              Application Progress
            </h2>
            <p className="text-white/80 text-sm">
              {selectedApp?.initialForm?.lookingForWhatQualification ||
                applicationName ||
                "Your Certification Journey"}
            </p>
          </div>
          <div className="bg-white rounded-full px-3 py-1.5 flex items-center space-x-1 text-xs">
            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
            <span className="font-medium text-emerald-800">
              {completedSteps}/{timelineData.length} Steps Completed
            </span>
          </div>
        </div>

        {/* Application ID Pills */}
        {applications.length > 1 && (
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
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {step.status === "done"
                        ? "Completed"
                        : step.status === "current"
                        ? "Required"
                        : "Pending"}
                    </span>
                  </div>
                </div>

                {/* Step Description */}
                <p className="text-sm text-gray-600 mt-1">{step.description}</p>

                {/* Action Button if applicable - now using the defined action handler */}
                {step.status === "current" ||
                (step.status === "pending" && index === completedSteps) ||
                (step.id === "payment" && step.status === "pending") ? (
                  <button
                    onClick={step.action}
                    className="mt-2 inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-800 transition-colors"
                  >
                    {step.id === "form" && "Complete Student Form"}
                    {step.id === "documents" && "Upload Files"}
                    {step.id === "payment" && "Make Payment"}
                    {step.id === "certificate" && "View Certificate"}
                    <FaArrowRight className="ml-1 text-xs" />
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
                      </>
                    ) : selectedApp.full_paid ? (
                      <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                        <span>
                          Fully Paid: $
                          {parseFloat(selectedApp.payment1 || 0) +
                            parseFloat(selectedApp.payment2 || 0)}
                        </span>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-600">
                        Initial: ${selectedApp.payment1 || 0} / Final: $
                        {selectedApp.payment2 || 0}
                      </div>
                    )}
                    {selectedApp.discount > 0 && (
                      <div className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                        <span>Discount: ${selectedApp.discount}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Next Action Card - only shows if there's a required step */}
        {activeStep && activeStep.status !== "done" && (
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 flex items-start mt-4 animate-fadeIn">
            <div className="bg-emerald-100 rounded-full p-2 mr-3 flex-shrink-0">
              <FaExclamationCircle className="text-emerald-700 text-sm" />
            </div>
            <div className="flex-grow">
              <h4 className="font-medium text-emerald-800 text-sm">
                Next Action Required
              </h4>
              <p className="text-sm text-emerald-700">
                {activeStep.id === "form"
                  ? "Please complete your student intake form to proceed."
                  : activeStep.id === "documents"
                  ? "Your documents need to be uploaded to continue the process."
                  : activeStep.id === "payment"
                  ? "Payment is required to process your certification."
                  : "Your certificate will be generated once all steps are complete."}
              </p>

              <button
                onClick={activeStep.action}
                className="mt-3 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-sm transition-colors"
              >
                {activeStep.id === "form" && "Complete Student Form"}
                {activeStep.id === "documents" && "Upload Documents"}
                {activeStep.id === "payment" && "Make Payment"}
                {activeStep.id === "certificate" && "View Certificate"}
              </button>
            </div>
          </div>
        )}

        {/* Help Text - Only show if expanded or there's a specific issue */}
        <div className={`mt-4 text-center ${isExpanded ? "block" : "hidden"}`}>
          <div className="text-xs text-gray-500 mt-2">
            Need assistance with your application? Contact our support team at{" "}
            <span className="text-emerald-600">
              info@certifiedaustralia.com
            </span>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center mt-4 py-2 text-xs text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? (
            <>
              Show Less <FaChevronUp className="ml-1" />
            </>
          ) : (
            <>
              Show More <FaChevronDown className="ml-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ImprovedTimeline;
