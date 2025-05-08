import React, { useState } from "react";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaMapMarkerAlt,
  FaBuilding,
  FaCalendarAlt,
  FaBriefcase,
  FaUserTie,
  FaGraduationCap,
  FaClipboardCheck,
  FaGlobe,
  FaLanguage,
  FaBook,
  FaCalculator,
} from "react-icons/fa";
import { MdSchool, MdAccessibility, MdWork } from "react-icons/md";

const EnrollmentDetails = ({ enrollmentData }) => {
  const [activeTab, setActiveTab] = useState("personal");

  if (!enrollmentData) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="text-center py-8">
          <FaClipboardCheck className="mx-auto text-gray-400 text-5xl mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            No Enrollment Data Available
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            The enrollment information is not available for this application.
          </p>
        </div>
      </div>
    );
  }

  const { formData } = enrollmentData;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Enrollment Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab("personal")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "personal"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Personal Details
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "contact"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Contact & Address
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "education"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Education & Employment
          </button>
          <button
            onClick={() => setActiveTab("diversity")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "diversity"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Cultural & Diversity
          </button>
          <button
            onClick={() => setActiveTab("declarations")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "declarations"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Declarations
          </button>
          <button
            onClick={() => setActiveTab("llnAssessment")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "llnAssessment"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            LLN Assessment
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Personal Details Tab */}
        {activeTab === "personal" && (
          <div>
            <div className="flex items-center mb-6">
              <FaUser className="text-emerald-600 text-2xl mr-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Personal Details
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="font-medium">
                      {formData.personalDetails.title}{" "}
                      {formData.personalDetails.firstName}{" "}
                      {formData.personalDetails.middleNames}{" "}
                      {formData.personalDetails.familyName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Preferred Name</p>
                    <p className="font-medium">
                      {formData.personalDetails.preferredName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Gender</p>
                    <p className="font-medium">
                      {formData.personalDetails.gender}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    <p className="font-medium">
                      {formatDate(formData.personalDetails.dob)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Citizenship Status</p>
                    <p className="font-medium">{formData.citizenship.status}</p>
                  </div>
                  {formData.citizenship.otherDetails && (
                    <div>
                      <p className="text-xs text-gray-500">
                        Other Citizenship Details
                      </p>
                      <p className="font-medium">
                        {formData.citizenship.otherDetails}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 md:col-span-2">
                <div className="flex items-center mb-2">
                  <FaCalendarAlt className="text-emerald-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Selected Course
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  {formData.courseSelection.selectedCourse}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 md:col-span-2">
                <div className="flex items-center mb-2">
                  <FaBriefcase className="text-emerald-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Employment Details
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Trading Name</p>
                    <p className="font-medium">
                      {formData.employmentDetails.tradingName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Contact Name</p>
                    <p className="font-medium">
                      {formData.employmentDetails.contactName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Supervisor Name</p>
                    <p className="font-medium">
                      {formData.employmentDetails.supervisorName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Training Address</p>
                    <p className="font-medium">
                      {formData.employmentDetails.trainingAddress}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium">
                      {formData.employmentDetails.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Employee Email</p>
                    <p className="font-medium">
                      {formData.employmentDetails.employeeEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact & Address Tab */}
        {activeTab === "contact" && (
          <div>
            <div className="flex items-center mb-6">
              <FaPhone className="text-emerald-600 text-2xl mr-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Contact Information
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center mb-2">
                  <FaEnvelope className="text-emerald-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Contact Details
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Home Phone</p>
                    <p className="font-medium">
                      {formData.contactDetails.homePhone}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Mobile Phone</p>
                    <p className="font-medium">
                      {formData.contactDetails.mobilePhone}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Work Phone</p>
                    <p className="font-medium">
                      {formData.contactDetails.workPhone}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium">
                      {formData.contactDetails.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Alternative Email</p>
                    <p className="font-medium">
                      {formData.contactDetails.altEmail}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">
                      Preferred Contact Method
                    </p>
                    <p className="font-medium">
                      {formData.contactDetails.preferredContact}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center mb-2">
                  <FaUserTie className="text-emerald-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Emergency Contact
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-medium">
                      {formData.emergencyContact.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Relationship</p>
                    <p className="font-medium">
                      {formData.emergencyContact.relationship}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Home Phone</p>
                    <p className="font-medium">
                      {formData.emergencyContact.homePhone}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Mobile Phone</p>
                    <p className="font-medium">
                      {formData.emergencyContact.mobilePhone}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Work Phone</p>
                    <p className="font-medium">
                      {formData.emergencyContact.workPhone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center mb-2">
                  <FaHome className="text-emerald-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Residential Address
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Building Name</p>
                    <p className="font-medium">
                      {formData.residentialAddress.buildingName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Flat Details</p>
                    <p className="font-medium">
                      {formData.residentialAddress.flatDetails}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Street Number</p>
                    <p className="font-medium">
                      {formData.residentialAddress.streetNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Street Name</p>
                    <p className="font-medium">
                      {formData.residentialAddress.streetName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Suburb</p>
                    <p className="font-medium">
                      {formData.residentialAddress.suburb}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">State</p>
                    <p className="font-medium">
                      {formData.residentialAddress.state}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Postcode</p>
                    <p className="font-medium">
                      {formData.residentialAddress.postcode}
                    </p>
                  </div>
                </div>
              </div>

              {formData.postalAddress.different && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center mb-2">
                    <FaMapMarkerAlt className="text-emerald-600 mr-2" />
                    <p className="text-sm font-medium text-gray-700">
                      Postal Address
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <div>
                      <p className="text-xs text-gray-500">Building Name</p>
                      <p className="font-medium">
                        {formData.postalAddress.buildingName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Flat Details</p>
                      <p className="font-medium">
                        {formData.postalAddress.flatDetails}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Street Number</p>
                      <p className="font-medium">
                        {formData.postalAddress.streetNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Street Name</p>
                      <p className="font-medium">
                        {formData.postalAddress.streetName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Postal Delivery</p>
                      <p className="font-medium">
                        {formData.postalAddress.postalDelivery}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Suburb</p>
                      <p className="font-medium">
                        {formData.postalAddress.suburb}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">State</p>
                      <p className="font-medium">
                        {formData.postalAddress.state}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Postcode</p>
                      <p className="font-medium">
                        {formData.postalAddress.postcode}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Education & Employment Tab */}
        {activeTab === "education" && (
          <div>
            <div className="flex items-center mb-6">
              <MdSchool className="text-emerald-600 text-2xl mr-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Education & Employment
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center mb-2">
                  <FaGraduationCap className="text-emerald-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Education Details
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">
                      Currently Enrolled in School
                    </p>
                    <p className="font-medium">
                      {formData.educationDetails.enrolledInSchool}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">
                      Highest School Level
                    </p>
                    <p className="font-medium">
                      {formData.educationDetails.highestSchoolLevel}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Completion Year</p>
                    <p className="font-medium">
                      {formData.educationDetails.completionYear}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Current School</p>
                    <p className="font-medium">
                      {formData.educationDetails.currentSchool}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Previous School</p>
                    <p className="font-medium">
                      {formData.educationDetails.previousSchool}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center mb-2">
                  <FaGraduationCap className="text-emerald-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Qualifications
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">
                      Completed Qualifications
                    </p>
                    <p className="font-medium">
                      {formData.qualifications.completedQualifications}
                    </p>
                  </div>
                </div>

                {formData.qualifications.completedQualifications === "Yes" && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-2">
                      Qualification Types
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {Object.entries(
                        formData.qualifications.qualificationType
                      ).map(([type, value]) => {
                        // Create a label from camelCase
                        const label = type
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase());

                        // Count true values
                        const trueCount =
                          Object.values(value).filter(Boolean).length;

                        if (trueCount > 0) {
                          return (
                            <div
                              key={type}
                              className="border border-gray-200 rounded-md p-2"
                            >
                              <p className="font-medium text-sm">{label}</p>
                              <div className="mt-1 text-xs text-gray-600">
                                {value.A && (
                                  <span className="inline-block bg-blue-100 text-blue-800 rounded px-2 py-1 text-xs mr-1">
                                    Australia
                                  </span>
                                )}
                                {value.E && (
                                  <span className="inline-block bg-green-100 text-green-800 rounded px-2 py-1 text-xs mr-1">
                                    Overseas
                                  </span>
                                )}
                                {value.I && (
                                  <span className="inline-block bg-yellow-100 text-yellow-800 rounded px-2 py-1 text-xs">
                                    International
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center mb-2">
                  <MdWork className="text-emerald-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Employment Status
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Current Status</p>
                    <p className="font-medium">
                      {formData.employmentStatus.currentStatus}
                    </p>
                  </div>
                  {formData.employmentStatus.employeeCount && (
                    <div>
                      <p className="text-xs text-gray-500">Employee Count</p>
                      <p className="font-medium">
                        {formData.employmentStatus.employeeCount}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center mb-2">
                  <FaClipboardCheck className="text-emerald-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Study Reason
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Main Reason</p>
                    <p className="font-medium">
                      {formData.studyReason.mainReason}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Discovery Method</p>
                    <p className="font-medium">
                      {formData.studyReason.discoveryMethod}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cultural & Diversity Tab */}
        {activeTab === "diversity" && (
          <div>
            <div className="flex items-center mb-6">
              <FaGlobe className="text-emerald-600 text-2xl mr-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Cultural Diversity & Special Needs
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center mb-2">
                  <FaGlobe className="text-emerald-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Cultural Background
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Indigenous Status</p>
                    <p className="font-medium">
                      {formData.culturalDiversity.indigenousStatus}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Country of Birth</p>
                    <p className="font-medium">
                      {formData.culturalDiversity.countryOfBirth === "Other"
                        ? formData.culturalDiversity.otherCountry
                        : formData.culturalDiversity.countryOfBirth}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center mb-2">
                  <FaLanguage className="text-emerald-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">Language</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">
                      Speaks language other than English
                    </p>
                    <p className="font-medium">
                      {formData.culturalDiversity.otherLanguage}
                    </p>
                  </div>
                  {formData.culturalDiversity.otherLanguage === "Yes" && (
                    <>
                      <div>
                        <p className="text-xs text-gray-500">Language</p>
                        <p className="font-medium">
                          {formData.culturalDiversity.specifyLanguage}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">
                          English Proficiency
                        </p>
                        <p className="font-medium">
                          {formData.culturalDiversity.englishProficiency}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center mb-2">
                  <MdAccessibility className="text-emerald-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Disability Status
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Has Disability</p>
                    <p className="font-medium">
                      {formData.disability.hasDisability}
                    </p>
                  </div>

                  {formData.disability.hasDisability === "YES" && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">
                        Disability Types
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.disability.disabilityTypes.map(
                          (type, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs"
                            >
                              {type}
                            </span>
                          )
                        )}
                        {formData.disability.otherDisability && (
                          <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs">
                            {formData.disability.otherDisability}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {formData.preTrainingChecklist?.items?.specialNeeds && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center mb-2">
                    <MdAccessibility className="text-emerald-600 mr-2" />
                    <p className="text-sm font-medium text-gray-700">
                      Special Needs
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">
                    {formData.preTrainingChecklist.items.specialNeeds}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {/* lln assessment tab */}
        {/* LLN Assessment Tab */}
        {activeTab === "llnAssessment" && (
          <div>
            <div className="flex items-center mb-6">
              <FaClipboardCheck className="text-emerald-600 text-2xl mr-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Language, Literacy & Numeracy Assessment
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Oral Communication */}
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center mb-2">
                  <FaLanguage className="text-emerald-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Oral Communication
                  </p>
                  {formData.llnAssessment.oralValidated && (
                    <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Validated
                    </span>
                  )}
                </div>
                <div className="mt-2">
                  {formData.llnAssessment.oralAnswers.map((answer, index) => (
                    <div key={index} className="mb-4">
                      <p className="text-xs text-gray-500">
                        Question {index + 1}
                      </p>
                      <p className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200 mt-1">
                        {answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reading */}
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center mb-2">
                  <FaBook className="text-emerald-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Reading Assessment
                  </p>
                  {formData.llnAssessment.readingValidated && (
                    <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Validated
                    </span>
                  )}
                </div>

                {/* Multiple Choice */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">
                    Multiple Choice Questions
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">
                        Question 1 Answers
                      </p>
                      {formData.llnAssessment.readingMultipleChoice.q1.length >
                      0 ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {formData.llnAssessment.readingMultipleChoice.q1.map(
                            (choice, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs"
                              >
                                Option {choice}
                              </span>
                            )
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-700">No selections</p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">
                        Question 2 Answers
                      </p>
                      {formData.llnAssessment.readingMultipleChoice.q2.length >
                      0 ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {formData.llnAssessment.readingMultipleChoice.q2.map(
                            (choice, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs"
                              >
                                Option {choice}
                              </span>
                            )
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-700">No selections</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Fill in the Blanks */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">
                    Fill in the Blanks
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    {formData.llnAssessment.fillBlanks.map((answer, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-2 rounded border border-gray-200"
                      >
                        <p className="text-xs text-gray-500">Blank {idx + 1}</p>
                        <p className="text-sm font-medium">{answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Text Summary */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500">Text Summary</p>
                  <p className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200 mt-1">
                    {formData.llnAssessment.textSummary}
                  </p>
                </div>

                {/* Image Description */}
                <div>
                  <p className="text-xs text-gray-500">Image Description</p>
                  <p className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200 mt-1">
                    {formData.llnAssessment.imageDescription}
                  </p>
                </div>
              </div>

              {/* Numeracy */}
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center mb-2">
                  <FaCalculator className="text-emerald-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Numeracy Assessment
                  </p>
                  {formData.llnAssessment.numeracyValidated && (
                    <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Validated
                    </span>
                  )}
                </div>

                {/* Questions 1-2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Question 1</p>
                    <p className="text-sm font-medium mt-1">
                      Answer: {formData.llnAssessment.numeracyAnswers.q1}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Working:</p>
                    <p className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200 mt-1">
                      {formData.llnAssessment.numeracyAnswers.q1Working}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Question 2</p>
                    <p className="text-sm font-medium mt-1">
                      Answer: {formData.llnAssessment.numeracyAnswers.q2}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Working:</p>
                    <p className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200 mt-1">
                      {formData.llnAssessment.numeracyAnswers.q2Working}
                    </p>
                  </div>
                </div>

                {/* Question 3 */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">
                    Question 3 Answers
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {formData.llnAssessment.numeracyAnswers.q3.map(
                      (answer, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-2 rounded border border-gray-200"
                        >
                          <p className="text-xs text-gray-500">
                            Answer {idx + 1}
                          </p>
                          <p className="text-sm font-medium">{answer}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Question 4 */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">
                    Question 4 Answers
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-2">
                    {formData.llnAssessment.numeracyAnswers.q4.map(
                      (answer, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-2 rounded border border-gray-200"
                        >
                          <p className="text-xs text-gray-500">
                            Answer {idx + 1}
                          </p>
                          <p className="text-sm font-medium">{answer}</p>
                        </div>
                      )
                    )}
                  </div>
                  <p className="text-xs text-gray-500">Working:</p>
                  <p className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200 mt-1">
                    {formData.llnAssessment.numeracyAnswers.q4Working}
                  </p>
                </div>

                {/* Question 5 - Area Calculations */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">
                    Question 5 - Area Calculations
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b text-xs font-medium text-gray-500 text-left">
                            Length
                          </th>
                          <th className="py-2 px-4 border-b text-xs font-medium text-gray-500 text-left">
                            Width
                          </th>
                          <th className="py-2 px-4 border-b text-xs font-medium text-gray-500 text-left">
                            Area
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.llnAssessment.numeracyAnswers.q5.map(
                          (item, idx) => (
                            <tr
                              key={idx}
                              className={idx % 2 === 0 ? "bg-gray-50" : ""}
                            >
                              <td className="py-2 px-4 border-b text-sm">
                                {item.length}
                              </td>
                              <td className="py-2 px-4 border-b text-sm">
                                {item.width}
                              </td>
                              <td className="py-2 px-4 border-b text-sm">
                                {item.area}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Question 6 - Fraction/Decimal/Percentage Conversions */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">
                    Question 6 - Conversions
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b text-xs font-medium text-gray-500 text-left">
                            Fraction
                          </th>
                          <th className="py-2 px-4 border-b text-xs font-medium text-gray-500 text-left">
                            Decimal
                          </th>
                          <th className="py-2 px-4 border-b text-xs font-medium text-gray-500 text-left">
                            Percentage
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.llnAssessment.numeracyAnswers.q6.map(
                          (item, idx) => (
                            <tr
                              key={idx}
                              className={idx % 2 === 0 ? "bg-gray-50" : ""}
                            >
                              <td className="py-2 px-4 border-b text-sm">
                                {item.fraction}
                              </td>
                              <td className="py-2 px-4 border-b text-sm">
                                {item.decimal}
                              </td>
                              <td className="py-2 px-4 border-b text-sm">
                                {item.percentage}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Declarations Tab */}
        {activeTab === "declarations" && (
          <div>
            <div className="flex items-center mb-6">
              <FaClipboardCheck className="text-emerald-600 text-2xl mr-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Declarations & Signatures
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center mb-2">
                  <FaClipboardCheck className="text-emerald-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Pre-Training Checklist
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {formData.preTrainingChecklist &&
                    Object.entries(formData.preTrainingChecklist.items)
                      .filter(([key]) => key !== "specialNeeds")
                      .map(([key, value]) => (
                        <div key={key} className="flex items-center">
                          {value === true ? (
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                            </div>
                          ) : (
                            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-2">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                ></path>
                              </svg>
                            </div>
                          )}
                          <p className="text-xs text-gray-700">
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                          </p>
                        </div>
                      ))}
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center mb-2">
                  <FaBuilding className="text-emerald-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Student Declarations
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Student Handbook</p>
                    <p className="font-medium">
                      {formData.declarations.readHandbook
                        ? "Acknowledged"
                        : "Not Acknowledged"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Privacy Consent</p>
                    <p className="font-medium">
                      {formData.declarations.privacyConsent
                        ? "Consented"
                        : "Not Consented"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Photo/Video Consent</p>
                    <p className="font-medium">
                      {formData.declarations.photoConsent}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">
                      Information Accuracy
                    </p>
                    <p className="font-medium">
                      {formData.declarations.informationAccuracy
                        ? "Confirmed"
                        : "Not Confirmed"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center mb-2">
                  <FaClipboardCheck className="text-emerald-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Signatures
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Student Signature</p>
                    <p className="font-medium">
                      {formData.declarations.studentSignature}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Student Date</p>
                    <p className="font-medium">
                      {formatDate(formData.declarations.date)}
                    </p>
                  </div>
                  {formData.declarations.parentSignature && (
                    <>
                      <div>
                        <p className="text-xs text-gray-500">
                          Parent/Guardian Signature
                        </p>
                        <p className="font-medium">
                          {formData.declarations.parentSignature}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">
                          Parent/Guardian Date
                        </p>
                        <p className="font-medium">
                          {formatDate(formData.declarations.parentDate)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Pre-training Interview */}
              {formData.preTrainingInterview && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center mb-2">
                    <FaUserTie className="text-emerald-600 mr-2" />
                    <p className="text-sm font-medium text-gray-700">
                      Pre-Training Interview
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mt-2">
                    <div>
                      <p className="text-xs text-gray-500">Expectations</p>
                      <p className="text-sm text-gray-700">
                        {formData.preTrainingInterview.expectations}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Current Position</p>
                      <p className="text-sm text-gray-700">
                        {formData.preTrainingInterview.currentPosition}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Job Titles</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div>
                          <p className="text-xs text-gray-500">Job Title 1</p>
                          <p className="text-sm text-gray-700">
                            {formData.preTrainingInterview.jobTitle1}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Job Title 2</p>
                          <p className="text-sm text-gray-700">
                            {formData.preTrainingInterview.jobTitle2}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Job Title 3</p>
                          <p className="text-sm text-gray-700">
                            {formData.preTrainingInterview.jobTitle3}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Formal Training</p>
                      <p className="font-medium">
                        {formData.preTrainingInterview.formalTraining}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Apply RPL</p>
                      <p className="font-medium">
                        {formData.preTrainingInterview.applyRPL}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-2">
                        Learning Styles
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.preTrainingInterview.learningStyles.map(
                          (style, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs"
                            >
                              {style}
                            </span>
                          )
                        )}
                        {formData.preTrainingInterview.otherLearningStyle && (
                          <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs">
                            {formData.preTrainingInterview.otherLearningStyle}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-2">
                        Additional Support Needed
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.preTrainingInterview.additionalSupport.map(
                          (support, index) => (
                            <span
                              key={index}
                              className="bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 text-xs"
                            >
                              {support}
                            </span>
                          )
                        )}
                        {formData.preTrainingInterview.otherSupport && (
                          <span className="bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 text-xs">
                            {formData.preTrainingInterview.otherSupport}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Student Name</p>
                        <p className="font-medium">
                          {formData.preTrainingInterview.studentName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="font-medium">
                          {formatDate(formData.preTrainingInterview.date)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollmentDetails;
