import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApplications } from "../Services/customerApplication";
import Navbar from "../components/navbar";
import { VscDebugBreakpointData } from "react-icons/vsc";
import { FaEye, FaDownload, FaFileDownload, FaSpinner } from "react-icons/fa";

const ViewApplications = () => {
  const [selectedForm, setSelectedForm] = useState("initial"); // Default form
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const { userId, id } = useParams();
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (userId) {
      getUserApplications(userId);
    }
  }, [userId]);

  const getUserApplications = async (userId) => {
    setSubmissionLoading(true);
    try {
      const response = await getApplications(userId);
      setApplications(response);
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

  const renderFormSection = (title, items) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border-l-4 border-primary pl-3 py-2 bg-gray-50 rounded-r-md hover:bg-gray-100 transition-all duration-300"
          >
            <div className="flex items-start">
              <VscDebugBreakpointData className="inline mr-2 mt-1 text-primary flex-shrink-0" />
              <div>
                <span className="font-semibold text-gray-700">
                  {item.label}:
                </span>{" "}
                <span className="text-gray-800">{item.value || "N/A"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-32">
        {submissionLoading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
          </div>
        ) : applications.length > 0 ? (
          applications
            .filter((app) => app.id === id)
            .map((application) => (
              <div
                key={application.id}
                className=" mx-auto bg-white shadow-xl rounded-xl overflow-hidden"
              >
                <div className="bg-gradient-to-b from-secondary to-primary p-6 text-white">
                  <h1 className="text-2xl font-bold">Application Details</h1>
                  <p className="text-blue-100">
                    Application ID:{" "}
                    {application.applicationId || application.id}
                  </p>
                </div>

                {/* Step Navigation */}
                <div className="flex flex-wrap justify-center gap-2 p-4 bg-gray-50 border-b">
                  {["initial", "student", "documents"].map((form) => (
                    <button
                      key={form}
                      onClick={() => setSelectedForm(form)}
                      className={`relative px-6 py-3 rounded-lg transition-all duration-300 font-medium text-sm ${
                        selectedForm === form
                          ? "bg-primary text-white shadow-md"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {form === "initial" && "Initial Screening"}
                      {form === "student" && "Student Information"}
                      {form === "documents" && "Documents"}

                      {selectedForm === form && (
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-white rounded-t-md"></span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Step Content */}
                <div className="p-6">
                  {selectedForm === "initial" &&
                    renderFormSection("Initial Screening Form", [
                      {
                        label: "Education",
                        value: application.initialForm?.formal_education,
                      },
                      {
                        label: "Qualification",
                        value: application.initialForm?.qualification,
                      },
                      { label: "State", value: application.initialForm?.state },
                      {
                        label: "Experience",
                        value: application.initialForm?.yearsOfExperience,
                      },
                      {
                        label: "Industry",
                        value: application.initialForm?.industry,
                      },
                      {
                        label: "Looking for Qualification",
                        value:
                          application.initialForm?.lookingForWhatQualification,
                      },
                      { label: "Type", value: application.type },
                      {
                        label: "Price",
                        value: application.price
                          ? `$${application.price}`
                          : "N/A",
                      },
                    ])}

                  {selectedForm === "student" &&
                    renderFormSection("Student Information", [
                      {
                        label: "Name",
                        value:
                          `${application.studentForm?.firstName || ""} ${
                            application.studentForm?.lastName || ""
                          }`.trim() || "N/A",
                      },
                      { label: "USI", value: application.studentForm?.USI },
                      {
                        label: "Gender",
                        value: application.studentForm?.gender,
                      },
                      {
                        label: "Date of Birth",
                        value: application.studentForm?.dob,
                      },
                      {
                        label: "Home Address",
                        value: application.studentForm?.homeAddress,
                      },
                      {
                        label: "Suburb",
                        value: application.studentForm?.suburb,
                      },
                      { label: "State", value: application.studentForm?.state },
                      {
                        label: "Postcode",
                        value: application.studentForm?.postcode,
                      },
                      {
                        label: "Contact Number",
                        value: application.studentForm?.contactNumber,
                      },
                      { label: "Email", value: application.studentForm?.email },
                      {
                        label: "Country of Birth",
                        value: application.studentForm?.countryOfBirth,
                      },
                      {
                        label: "Australian Citizen",
                        value: application.studentForm?.australianCitizen
                          ? "Yes"
                          : "No",
                      },
                      {
                        label: "Disability",
                        value: application.studentForm?.disability
                          ? "Yes"
                          : "No",
                      },
                      {
                        label: "Employment Status",
                        value: application.studentForm?.employmentStatus,
                      },
                      {
                        label: "Business Name",
                        value: application.studentForm?.businessName,
                      },
                      {
                        label: "Position",
                        value: application.studentForm?.position,
                      },
                      {
                        label: "Employer's Legal Name",
                        value: application.studentForm?.employersLegalName,
                      },
                      {
                        label: "Employer's Address",
                        value: application.studentForm?.employersAddress,
                      },
                      {
                        label: "Employer's Contact",
                        value: application.studentForm?.employersContactNumber,
                      },
                    ])}

                  {selectedForm === "documents" && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
                          Uploaded Documents
                        </h2>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Document Type
                              </th>
                              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Status
                              </th>
                              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {[
                              // ID documents
                              {
                                label: "Driver's License",
                                key: "driversLicense",
                              },
                              { label: "ID Card", key: "idCard" },
                              { label: "Passport", key: "passport" },
                              {
                                label: "Birth Certificate",
                                key: "birthCertificate",
                              },
                              { label: "Medicare Card", key: "medicareCard" },
                              { label: "Credit Card", key: "creditcard" },
                              {
                                label: "Australian Citizenship",
                                key: "australianCitizenship",
                              },

                              // Other documents
                              { label: "Resume", key: "resume" },
                              {
                                label: "Previous Qualifications",
                                key: "previousQualifications",
                              },
                              { label: "Reference 1", key: "reference1" },
                              { label: "Reference 2", key: "reference2" },
                              {
                                label: "Employment Letter",
                                key: "employmentLetter",
                              },
                              { label: "Payslip", key: "payslip" },

                              // Images and videos
                              { label: "Image 1", key: "image1" },
                              { label: "Image 2", key: "image2" },
                              { label: "Image 3", key: "image3" },
                              { label: "Image 4", key: "image4" },
                              { label: "Video 1", key: "video1" },
                              { label: "Video 2", key: "video2" },
                            ]
                              .filter((doc) => {
                                // Only show documents that exist in the documentsForm object
                                return (
                                  application.documentsForm &&
                                  doc.key in application.documentsForm
                                );
                              })
                              .map((doc, index) => {
                                const docObject =
                                  application.documentsForm?.[doc.key];
                                const isUploaded =
                                  !!docObject && !!docObject.fileUrl;
                                const fileUrl = docObject?.fileUrl;

                                return (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-3 px-4">{doc.label}</td>
                                    <td className="py-3 px-4">
                                      <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                          isUploaded
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                      >
                                        {isUploaded
                                          ? "Uploaded"
                                          : "Not Uploaded"}
                                      </span>
                                    </td>
                                    <td className="py-3 px-4">
                                      {isUploaded ? (
                                        <button
                                          onClick={() =>
                                            handleViewDocument(fileUrl)
                                          }
                                          className="inline-flex items-center text-blue-600 hover:text-blue-900"
                                        >
                                          <FaEye className="mr-1" /> View
                                        </button>
                                      ) : (
                                        <span className="text-gray-400">
                                          Not Available
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              No Application Found
            </h2>
            <p className="text-gray-600">
              The application you're looking for could not be found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewApplications;
