import React, { useState } from "react";
import {
  FaUser,
  FaCheck,
  FaTimes,
  FaBuilding,
  FaCalendarAlt,
  FaBriefcase,
  FaUserTie,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { MdSchool, MdDescription } from "react-icons/md";
import { GiSkills } from "react-icons/gi";

const RPLIntakeDetails = ({ rplIntakeData }) => {
  const [activeTab, setActiveTab] = useState("declaration");

  if (!rplIntakeData) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="text-center py-8">
          <MdDescription className="mx-auto text-gray-400 text-5xl mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            No RPL Intake Data Available
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            The RPL intake information is not available for this application.
          </p>
        </div>
      </div>
    );
  }

  const { formData } = rplIntakeData;

  // Helper function to render competency checkboxes
  const renderCompetencies = (competencies) => {
    if (!competencies) return null;

    return (
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-gray-700 mb-2">Competencies</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {Object.entries(competencies).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center space-x-2 p-2 border border-gray-100 rounded-md"
            >
              {value ? (
                <FaCheck className="text-emerald-500 flex-shrink-0" />
              ) : (
                <FaTimes className="text-red-500 flex-shrink-0" />
              )}
              <span className="text-sm">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* RPL Intake Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab("declaration")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "declaration"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Student Declaration
          </button>
          <button
            onClick={() => setActiveTab("selfAssessment")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "selfAssessment"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Self Assessment
          </button>
          <button
            onClick={() => setActiveTab("employerVerification")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "employerVerification"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Employer Verification
          </button>
          <button
            onClick={() => setActiveTab("refereeTestimonial")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "refereeTestimonial"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Referee Testimonial
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Student Declaration Tab */}
        {activeTab === "declaration" && (
          <div>
            <div className="flex items-center mb-6">
              <FaUser className="text-emerald-600 text-2xl mr-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Student Declaration
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">
                  Course Qualification
                </p>
                <p className="font-medium">{formData.courseQualification}</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">
                  Student Declaration
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-medium">
                      {formData.studentDeclaration.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-medium">
                      {new Date(
                        formData.studentDeclaration.date
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Signature</p>
                    <p className="font-medium">
                      {formData.studentDeclaration.signature}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">
                  Confirmation of Reassessment
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Student Name</p>
                    <p className="font-medium">
                      {formData.confirmationOfReassessment.studentName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Qualification</p>
                    <p className="font-medium">
                      {formData.confirmationOfReassessment.qualification}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium">
                      {formData.confirmationOfReassessment.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Mobile</p>
                    <p className="font-medium">
                      {formData.confirmationOfReassessment.mobile}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    <p className="font-medium">
                      {new Date(
                        formData.confirmationOfReassessment.dob
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Self Assessment Tab */}
        {activeTab === "selfAssessment" && (
          <div>
            <div className="flex items-center mb-6">
              <GiSkills className="text-emerald-600 text-2xl mr-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Self Assessment
              </h3>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Key Skills
                </p>
                <p className="text-sm text-gray-600">
                  {formData.selfAssessment.keySkills}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Work Experience
                </p>
                <p className="text-sm text-gray-600">
                  {formData.selfAssessment.workExperience}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Tasks & Responsibilities
                </p>
                <p className="text-sm text-gray-600">
                  {formData.selfAssessment.tasksResponsibilities}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Training
                </p>
                <p className="text-sm text-gray-600">
                  {formData.selfAssessment.training}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Additional Support
                </p>
                <p className="text-sm text-gray-600">
                  {formData.selfAssessment.additionalSupport}
                </p>
              </div>

              {renderCompetencies(formData.selfAssessment.competencies)}
            </div>
          </div>
        )}

        {/* Employer Verification Tab */}
        {activeTab === "employerVerification" && (
          <div>
            <div className="flex items-center mb-6">
              <FaBuilding className="text-emerald-600 text-2xl mr-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Employer Verification
              </h3>
            </div>

            {/* Employer 1 */}
            <div className="border-l-4 border-emerald-500 pl-4 mb-8">
              <h4 className="font-medium text-gray-800 mb-4">Employer 1</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <FaBuilding className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Organization</p>
                    <p className="font-medium">
                      {formData.employerVerification.employer1.orgName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaUserTie className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Supervisor</p>
                    <p className="font-medium">
                      {formData.employerVerification.employer1.supervisorName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaBriefcase className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Position</p>
                    <p className="font-medium">
                      {formData.employerVerification.employer1.position}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaPhone className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Contact Number</p>
                    <p className="font-medium">
                      {formData.employerVerification.employer1.contactNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaEnvelope className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium">
                      {formData.employerVerification.employer1.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaUser className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Employee Name</p>
                    <p className="font-medium">
                      {formData.employerVerification.employer1.employeeName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaBriefcase className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Job Title</p>
                    <p className="font-medium">
                      {formData.employerVerification.employer1.jobTitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaCalendarAlt className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Employment Period</p>
                    <p className="font-medium">
                      {new Date(
                        formData.employerVerification.employer1.startDate
                      ).toLocaleDateString()}{" "}
                      -
                      {new Date(
                        formData.employerVerification.employer1.endDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaBriefcase className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Employment Type</p>
                    <p className="font-medium">
                      {formData.employerVerification.employer1.employmentType}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-500">Duties</p>
                <p className="text-sm mt-1">
                  {formData.employerVerification.employer1.duties}
                </p>
              </div>
            </div>

            {/* Employer 2 */}
            {formData.employerVerification.employer2 &&
              formData.employerVerification.employer2.orgName && (
                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-medium text-gray-800 mb-4">Employer 2</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <FaBuilding className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Organization</p>
                        <p className="font-medium">
                          {formData.employerVerification.employer2.orgName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaUserTie className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Supervisor</p>
                        <p className="font-medium">
                          {
                            formData.employerVerification.employer2
                              .supervisorName
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaBriefcase className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Position</p>
                        <p className="font-medium">
                          {formData.employerVerification.employer2.position}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaPhone className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Contact Number</p>
                        <p className="font-medium">
                          {
                            formData.employerVerification.employer2
                              .contactNumber
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaEnvelope className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-medium">
                          {formData.employerVerification.employer2.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaUser className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Employee Name</p>
                        <p className="font-medium">
                          {formData.employerVerification.employer2.employeeName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaBriefcase className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Job Title</p>
                        <p className="font-medium">
                          {formData.employerVerification.employer2.jobTitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaCalendarAlt className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">
                          Employment Period
                        </p>
                        <p className="font-medium">
                          {formData.employerVerification.employer2.startDate &&
                            new Date(
                              formData.employerVerification.employer2.startDate
                            ).toLocaleDateString()}{" "}
                          -
                          {formData.employerVerification.employer2.endDate &&
                            new Date(
                              formData.employerVerification.employer2.endDate
                            ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaBriefcase className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Employment Type</p>
                        <p className="font-medium">
                          {
                            formData.employerVerification.employer2
                              .employmentType
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs text-gray-500">Duties</p>
                    <p className="text-sm mt-1">
                      {formData.employerVerification.employer2.duties}
                    </p>
                  </div>
                </div>
              )}
          </div>
        )}

        {/* Referee Testimonial Tab */}
        {activeTab === "refereeTestimonial" && (
          <div>
            <div className="flex items-center mb-6">
              <FaUserTie className="text-emerald-600 text-2xl mr-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Referee Testimonial
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start">
                <FaUser className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Student Name</p>
                  <p className="font-medium">
                    {formData.refereeTestimonial.studentName}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaBuilding className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Company</p>
                  <p className="font-medium">
                    {formData.refereeTestimonial.companyName}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaCalendarAlt className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Employment Period</p>
                  <p className="font-medium">
                    {formData.refereeTestimonial.employmentPeriod}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaUserTie className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Referee Name</p>
                  <p className="font-medium">
                    {formData.refereeTestimonial.refereeName}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaBriefcase className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Position</p>
                  <p className="font-medium">
                    {formData.refereeTestimonial.position}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MdSchool className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Qualification</p>
                  <p className="font-medium">
                    {formData.refereeTestimonial.qualification}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaBuilding className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Organisation</p>
                  <p className="font-medium">
                    {formData.refereeTestimonial.organisation}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaPhone className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Phone Number</p>
                  <p className="font-medium">
                    {formData.refereeTestimonial.phoneNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaEnvelope className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Email Address</p>
                  <p className="font-medium">
                    {formData.refereeTestimonial.emailAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaUser className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Signature</p>
                  <p className="font-medium">
                    {formData.refereeTestimonial.signature}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaCalendarAlt className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-medium">
                    {new Date(
                      formData.refereeTestimonial.date
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {renderCompetencies(formData.refereeTestimonial.competencies)}
          </div>
        )}
      </div>
    </div>
  );
};

export default RPLIntakeDetails;
