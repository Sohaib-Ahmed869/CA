// Main Component: EnrollmentForm.js
import React, { useState } from "react";
import Navbar from "../../components/navbar";
import PersonalDetails from "./sections/PersonalDetails";
import LanguageCultural from "./sections/LanguageCultural";
import DisabilityInfo from "./sections/DisabilityInfo";
import Schooling from "./sections/Schooling";
import PreviousQualifications from "./sections/PreviousQualifications";
import EmploymentStudy from "./sections/EmploymentStudy";
// import EmergencyContact from "./sections/EmergencyContact";
// import USIInfo from "./sections/USIInfo";
// import StudentDeclaration from "./sections/StudentDeclaration";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import CourseSelection from "./sections/CourseSelection";
import EmergencyContact from "./sections/EmergencyContact";
import EmploymentDetails from "./sections/EmploymentDetails";
import USIInfo from "./sections/USIInfo";
import StudentDeclaration from "./sections/StudentDeclaration";
import logo from "../../../assets/cibt-logo.png";

const EnrollmentForm = () => {
  const [activeSection, setActiveSection] = useState(1);
  const totalSections = 11;

  // Form State
  const [formData, setFormData] = useState({
    // Course Selection
    selectedCourse: "",
    preferredStart: { immediate: false, specificDate: "" },

    // Previous Study
    previousStudy: "",

    // Credit & Recognition
    creditApplication: { applied: false, docsProvided: false },
    priorLearningRecognition: { applied: false, needsDiscussion: false },

    // International Students
    courseTransfer: { applied: false, docsProvided: false },

    // Personal Details
    personalDetails: {
      familyName: "",
      givenName: "",
      middleName: "",
      dob: "",
      gender: "",
      contacts: { home: "", mobile: "", email: "", altEmail: "" },
      address: {
        building: "",
        unit: "",
        street: "",
        suburb: "",
        state: "",
        postcode: "",
      },
    },

    // Language & Cultural
    countryOfBirth: "Australia",
    otherLanguage: { speaks: false, language: "" },
    indigenousStatus: "",

    // Disability
    disability: { hasDisability: false, types: [] },

    // Schooling
    highestSchoolLevel: "",
    stillEnrolled: "",

    // Previous Qualifications
    previousQualifications: [],

    // Employment & Study
    employmentStatus: "",
    studyReason: "",

    // Emergency Contact
    emergencyContact: {
      name: "",
      relationship: "",
      address: "",
      contacts: { home: "", work: "", mobile: "", email: "" },
    },
    employmentDetails: {
      employerName: "",
      position: "",
      businessAddress: "",
      phone: "",
      email: "",
    },
    // USI
    usi: "",
    declarations: {
      privacyAcknowledged: false,
      consentGiven: false,
      declarationSigned: false,
    },
    // Agreements
    agreements: {
      privacyConsent: false,
      declaration: false,
      parentConsent: false,
    },
  });

  const validateSection = (section) => {
    switch (section) {
      case 1:
        return !!formData.selectedCourse;
      case 2:
        return (
          !!formData.personalDetails.familyName &&
          !!formData.personalDetails.givenName
        );
      // Add validations for other sections
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateSection(activeSection)) {
      setActiveSection((prev) => Math.min(prev + 1, totalSections));
    }
  };

  const handleBack = () => {
    setActiveSection((prev) => Math.max(prev - 1, 1));
  };

  const progressPercentage = (activeSection / totalSections) * 100;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-28 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <img src={logo} alt="Logo" className="mx-auto mb-4 w-32 " />
            <h1 className="text-3xl font-medium font-outfit text-emerald-800 mb-2">
              Cove Institute of Business & Trade
            </h1>
            <h2 className="text-2xl font-medium text-emerald-700">
              Enrollment Form{" "}
            </h2>
            <p className="text-sm text-gray-500">RTO NO: 45665</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-green-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Step {activeSection} of {totalSections}
            </div>
          </div>

          {/* Form Sections */}
          {activeSection === 1 && (
            <CourseSelection formData={formData} setFormData={setFormData} />
          )}

          {activeSection === 2 && (
            <PersonalDetails formData={formData} setFormData={setFormData} />
          )}

          {activeSection === 3 && (
            <LanguageCultural formData={formData} setFormData={setFormData} />
          )}

          {activeSection === 4 && (
            <DisabilityInfo formData={formData} setFormData={setFormData} />
          )}

          {activeSection === 5 && (
            <Schooling formData={formData} setFormData={setFormData} />
          )}

          {activeSection === 6 && (
            <PreviousQualifications
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {activeSection === 7 && (
            <EmploymentStudy formData={formData} setFormData={setFormData} />
          )}
          {activeSection === 8 && (
            <EmergencyContact formData={formData} setFormData={setFormData} />
          )}
          {activeSection === 9 && (
            <EmploymentDetails formData={formData} setFormData={setFormData} />
          )}
          {activeSection === 10 && (
            <USIInfo formData={formData} setFormData={setFormData} />
          )}
          {activeSection === 11 && (
            <StudentDeclaration formData={formData} setFormData={setFormData} />
          )}

          {/* Add other sections similarly */}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={activeSection === 1}
              className="flex items-center px-6 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-md disabled:opacity-50"
            >
              <BsChevronLeft className="mr-2" /> Back
            </button>

            {activeSection === totalSections ? (
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Submit Application
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                Next <BsChevronRight className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentForm;
