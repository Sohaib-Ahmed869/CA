import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApplications } from "../Customer/Services/customerApplication";
import Navbar from "../Customer/components/navbar";
import { VscDebugBreakpointData } from "react-icons/vsc";

const ViewApplications = () => {
  const [selectedForm, setSelectedForm] = useState("initial"); // Default form
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const { userId, id } = useParams();

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

  return (
    <div className="bg-gray-200 min-h-screen py-24">
      <Navbar />

      {applications.length > 0 &&
        applications
          .filter((app) => app.id === id)
          .map((application) => (
            <div
              key={application.id}
              className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl"
            >
              {/* Step Navigation */}
              <div className="flex justify-center gap-4 mb-6">
                {["initial", "student", "documents"].map((form) => (
                  <button
                    key={form}
                    onClick={() => setSelectedForm(form)}
                    className={`btn btn-primary  text-black font-normal px-4 py-2 border-white rounded-lg transition ${
                      selectedForm === form
                        ? "bg-primary text-white hover:bg-primary border-white"
                        : "bg-info  hover:bg-info hover:border-white"
                    }`}
                  >
                    {form === "initial" && "Initial Screening Form"}
                    {form === "student" && "Student Intake Form"}
                    {form === "documents" && "Uploaded Documents"}
                  </button>
                ))}
              </div>

              {/* Step Content */}
              <div className="p-4 bg-gray-100 rounded-md">
                {selectedForm === "initial" && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">
                      Initial Screening Form
                    </h2>
                    {[
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
                      { label: "Price", value: `$${application.price}` },
                    ].map((item, index) => (
                      <p key={index} className="border-l-4 border-accent pl-2">
                        <VscDebugBreakpointData className="inline mr-2 mb-1 text-info" />
                        <strong>{item.label}:</strong> {item.value || "N/A"}
                      </p>
                    ))}
                  </div>
                )}

                {selectedForm === "student" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Student Intake Form
                    </h3>
                    {[
                      {
                        label: "Name",
                        value: `${
                          application.studentForm?.firstName || "N/A"
                        } ${application.studentForm?.lastName || ""}`,
                      },
                      { label: "USI", value: application.studentForm?.USI },
                      {
                        label: "Gender",
                        value: application.studentForm?.gender,
                      },
                      { label: "DOB", value: application.studentForm?.dob },
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
                        label: "Contact",
                        value: application.studentForm?.contactNumber,
                      },
                      { label: "Email", value: application.studentForm?.email },
                      {
                        label: "Country of Birth",
                        value: application.studentForm?.countryOfBirth,
                      },
                      {
                        label: "Citizenship",
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
                    ].map((item, index) => (
                      <p key={index} className="border-l-4 border-accent pl-2">
                        <VscDebugBreakpointData className="inline mr-2 mb-1 text-info" />
                        <strong>{item.label}:</strong> {item.value || "N/A"}
                      </p>
                    ))}
                  </div>
                )}

                {selectedForm === "documents" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Uploaded Documents
                    </h3>
                    {[
                      {
                        label: "Credit Card",
                        value: application.documentsForm?.creditcard
                          ? "Uploaded"
                          : "Not Uploaded",
                      },
                      {
                        label: "Resume",
                        value: application.documentsForm?.resume
                          ? "Uploaded"
                          : "Not Uploaded",
                      },
                      {
                        label: "Previous Qualifications",
                        value: application.documentsForm?.previousQualifications
                          ? "Uploaded"
                          : "Not Uploaded",
                      },
                      {
                        label: "Reference 1",
                        value: application.documentsForm?.reference1
                          ? "Uploaded"
                          : "Not Uploaded",
                      },
                      {
                        label: "Reference 2",
                        value: application.documentsForm?.reference2
                          ? "Uploaded"
                          : "Not Uploaded",
                      },
                    ].map((item, index) => (
                      <p key={index} className="border-l-4 border-accent pl-2">
                        <VscDebugBreakpointData className="inline mr-2 mb-1 text-info" />
                        <strong>{item.label}:</strong> {item.value}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
    </div>
  );
};

export default ViewApplications;
