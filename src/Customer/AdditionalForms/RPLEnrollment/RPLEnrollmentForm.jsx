// export default RPLEnrolment;
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import EducationUnemploymentChart from "./llnAssessmentChart";
import SpinnerLoader from "../../components/spinnerLoader";
import { submitEnrollmentForm } from "../../Services/rtoFormsServices";
// import logo from "../../../assets/alpha-training-logo.png";

const RPLEnrolment = () => {
  const [activeSection, setActiveSection] = useState(1);
  const totalSections = 16; // Total number of form sections
  const [applicationId, setApplicationId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  useEffect(() => {
    const idFromUrl = window.location.pathname.split("/")[2];
    setApplicationId(idFromUrl);
    console.log("id passed", idFromUrl);
  }, []);

  const [formData, setFormData] = useState({
    personalDetails: {
      title: "",
      gender: "",
      familyName: "",
      firstName: "",
      middleNames: "",
      preferredName: "",
      dob: "",
    },
    contactDetails: {
      homePhone: "",
      mobilePhone: "",
      email: "",
      workPhone: "",
      altEmail: "",
      preferredContact: "",
    },
    emergencyContact: {
      name: "",
      relationship: "",
      homePhone: "",
      mobilePhone: "",
      workPhone: "",
    },
    residentialAddress: {
      buildingName: "",
      flatDetails: "",
      streetNumber: "",
      streetName: "",
      suburb: "",
      state: "",
      postcode: "",
    },
    postalAddress: {
      different: false,
      buildingName: "",
      flatDetails: "",
      streetNumber: "",
      streetName: "",
      postalDelivery: "",
      suburb: "",
      state: "",
      postcode: "",
    },
    employmentDetails: {
      tradingName: "",
      contactName: "",
      supervisorName: "",
      trainingAddress: "",
      phone: "",
      employeeEmail: "",
    },
    culturalDiversity: {
      indigenousStatus: "",
      countryOfBirth: "Australia",
      otherCountry: "",
      otherLanguage: "No",
      specifyLanguage: "",
      englishProficiency: "",
    },
    usiDetails: {
      usiNumber: "",
      createUSI: false,
      birthCity: "",
      identityType: "",
      identityDetails: {},
    },
    educationDetails: {
      enrolledInSchool: "",
      highestSchoolLevel: "",
      completionYear: "",
      currentSchool: "",
      previousSchool: "",
    },
    employmentStatus: {
      currentStatus: "",
      employeeCount: "",
    },
    occupation: "",
    industry: "",
    disability: {
      hasDisability: "",
      disabilityTypes: [],
      otherDisability: "",
    },
    qualifications: {
      completedQualifications: "",
      qualificationType: {
        bachelor: { A: false, E: false, I: false },
        advancedDiploma: { A: false, E: false, I: false },
        diploma: { A: false, E: false, I: false },
        certIV: { A: false, E: false, I: false },
        certIII: { A: false, E: false, I: false },
        certII: { A: false, E: false, I: false },
        certI: { A: false, E: false, I: false },
        otherCert: "",
      },
    },
    studyReason: {
      mainReason: "",
      discoveryMethod: "",
    },
    citizenship: {
      status: "",
      otherDetails: "",
    },
    courseSelection: {
      selectedCourse: "",
    },
    preTrainingChecklist: {
      items: {
        preTrainingForm: false,
        entryRequirements: false,
        llnCompleted: false,
        deliveryMode: false,
        locationDiscussed: false,
        rplDiscussed: false,
        feesDiscussed: false,
        refundPolicy: false,
        questionsAnswered: false,
        handbookRead: false,
        specialNeeds: "",
      },
    },
    declarations: {
      readHandbook: false,
      privacyConsent: false,
      photoConsent: "",
      informationAccuracy: false,
      parentSignature: "",
      parentDate: "",
      studentSignature: "",
      date: "",
    },
    preTrainingInterview: {
      expectations: "",
      currentPosition: "",
      jobTitle1: "",
      jobTitle2: "",
      jobTitle3: "",
      formalTraining: "",
      applyRPL: "",
      learningStyles: [],
      otherLearningStyle: "",
      additionalSupport: [],
      otherSupport: "",
      studentName: "",
      date: "",
    },
    // New state for LLN Assessment
    llnAssessment: {
      // Oral Communication
      oralAnswers: Array(10).fill(""),

      // Reading & Writing
      readingMultipleChoice: {
        q1: [],
        q2: [],
      },
      fillBlanks: Array(10).fill(""),
      summary: "",
      imageDescription: "",

      // Numeracy
      // numeracyAnswers: {
      //   q1: { answer: "", working: "" },
      //   q2: { answer: "", working: "" },
      //   q3: { a: "", b: "", c: "", d: "", e: "" },
      //   q4: Array(5).fill(""),
      //   q5: Array(3).fill({ length: "1", width: "2", area: "3" }),
      //   q6: {
      //     fraction: ["", "7/10", "", "13/20", ""],
      //     decimal: ["0.2", "", "0.65", "", "0.64"],
      //     percentage: ["20%", "70%", "", "64%", ""],
      //   },
      // },
      // Corrected initial state structure for numeracyAnswers
      numeracyAnswers: {
        q1: "",
        q1Working: "", // Separate field for working text
        q2: "",
        q2Working: "", // Separate field for working text
        q3: ["", "", "", "", ""],
        q4: ["", "", "", "", ""],
        q4Working: "", // Separate field for working text
        q5: [
          { length: "", width: "", area: "" },
          { length: "", width: "", area: "" },
          { length: "", width: "", area: "" },
        ],
        q6: [
          { fraction: "1/10", decimal: "0.1", percentage: "10%" }, // First row (pre-filled)
          { fraction: "1/5", decimal: "", percentage: "" },
          { fraction: "", decimal: "0.7", percentage: "" },
          { fraction: "", decimal: "", percentage: "65%" },
          { fraction: "16/25", decimal: "", percentage: "" },
        ],
      },
      // Validation states
      oralValidated: false,
      readingValidated: false,
      numeracyValidated: false,
    },
  });

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };
  const handleLLNInputChange = (section, field, value) => {
    console.log(`Updating ${section}.${field}`, value);

    if (field === "numeracyAnswers") {
      // Handle the complete numeracyAnswers object update
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value, // value here is the complete updated numeracyAnswers object
        },
      }));
    } else {
      // Original implementation for other fields
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
  };

  const handleNestedChange = (section, subSection, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: {
          ...prev[section][subSection],
          [field]: value,
        },
      },
    }));
  };
  const wordCount = (text) =>
    text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

  const validateLLNSection = (section) => {
    const { llnAssessment } = formData;
    switch (section) {
      case "oral":
        return llnAssessment.oralAnswers.every((a) => a.trim().length > 0);
      case "reading":
        return (
          llnAssessment.readingMultipleChoice.q1.length > 0 &&
          llnAssessment.readingMultipleChoice.q2.length > 0 &&
          llnAssessment.fillBlanks.every((b) => b.trim().length > 0)
          //   wordCount(llnAssessment.summary) >= 50 &&
          //   wordCount(llnAssessment.summary) <= 75 &&
          //   wordCount(llnAssessment.imageDescription) >= 50 &&
          //   wordCount(llnAssessment.imageDescription) <= 75
        );
      case "numeracy":

      default:
        return false;
    }
  };
  const handleCheckboxArrayChange = (section, field, value, checked) => {
    setFormData((prev) => {
      const updatedArray = [...prev[section][field]];
      if (checked) {
        updatedArray.push(value);
      } else {
        const index = updatedArray.indexOf(value);
        if (index > -1) {
          updatedArray.splice(index, 1);
        }
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: updatedArray,
        },
      };
    });
  };

  const validateSection = (section) => {
    switch (section) {
      case 1:
        return (
          !!formData.personalDetails.familyName &&
          !!formData.personalDetails.firstName &&
          !!formData.personalDetails.dob
        );
      case 2:
        return (
          !!formData.contactDetails.mobilePhone ||
          !!formData.contactDetails.email
        );
      // Add validations for other sections
      case 15: // Pre-Training Interview validation
        return (
          !!formData.preTrainingInterview.expectations &&
          !!formData.preTrainingInterview.currentPosition &&
          !!formData.preTrainingInterview.formalTraining &&
          !!formData.preTrainingInterview.applyRPL
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    // if (validateSection(activeSection)) {
    setActiveSection((prev) => Math.min(prev + 1, totalSections));
    // } else {
    //   alert("Please complete all required fields before proceeding.");
    // }
  };

  const handleBack = () => {
    setActiveSection((prev) => Math.max(prev - 1, 1));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Implement form submission logic here
  //   console.log("Form submitted:", formData);
  //   alert("Form submitted successfully!");
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Set loading state
      setIsSubmitting(true);
      setSubmitError(null);

      // Final validation
      // if (!validateSection(activeSection)) {
      //   setIsSubmitting(false);
      //   return;
      // }

      // Submit form data
      const result = await submitEnrollmentForm(applicationId, formData);

      if (result.success) {
        setSubmitSuccess(true);
        // Redirect or show success message
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setSubmitError(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const progressPercentage = (activeSection / totalSections) * 100;

  return (
    <>
      {isSubmitting && <SpinnerLoader />}

      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="w-full max-w-7xl mx-auto pt-28 p-2 ">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center mb-6">
              {/* <img src={logo} alt="Logo" className="mx-auto mb-4 w-32" /> */}
              <h1 className="text-3xl font-medium text-emerald-800 mb-2">
                Alpha Training & Recognition
              </h1>
              <h2 className="text-2xl font-medium text-emerald-700">
                RPL Enrolment Kit
              </h2>
              <p className="text-sm text-gray-500">RTO NO: 45282</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-emerald-600 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Section {activeSection} of {totalSections}
              </div>
            </div>

            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              {activeSection === 1 && (
                <PersonalDetails
                  data={formData.personalDetails}
                  onChange={handleInputChange}
                />
              )}

              {activeSection === 2 && (
                <ContactDetails
                  data={formData.contactDetails}
                  onChange={handleInputChange}
                />
              )}

              {activeSection === 3 && (
                <EmergencyContact
                  data={formData.emergencyContact}
                  onChange={handleInputChange}
                />
              )}

              {activeSection === 4 && (
                <ResidentialAddress
                  data={formData.residentialAddress}
                  onChange={handleInputChange}
                />
              )}

              {activeSection === 5 && (
                <PostalAddress
                  data={formData.postalAddress}
                  onChange={handleInputChange}
                />
              )}

              {activeSection === 6 && (
                <EmploymentDetails
                  data={formData.employmentDetails}
                  onChange={handleInputChange}
                />
              )}

              {activeSection === 7 && (
                <CulturalDiversity
                  data={formData.culturalDiversity}
                  onChange={handleInputChange}
                />
              )}

              {activeSection === 8 && (
                <UsiDetails
                  data={formData.usiDetails}
                  onChange={handleInputChange}
                  onNestedChange={handleNestedChange}
                />
              )}

              {activeSection === 9 && (
                <EducationDetails
                  data={formData.educationDetails}
                  onChange={handleInputChange}
                />
              )}

              {activeSection === 10 && (
                <EmploymentStatus
                  data={formData.employmentStatus}
                  occupation={formData.occupation}
                  industry={formData.industry}
                  onChange={handleInputChange}
                />
              )}

              {activeSection === 11 && (
                <DisabilityInfo
                  data={formData.disability}
                  onChange={handleInputChange}
                  onCheckboxArrayChange={handleCheckboxArrayChange}
                />
              )}

              {activeSection === 12 && (
                <PreviousQualifications
                  data={formData.qualifications}
                  onChange={handleInputChange}
                  onNestedChange={handleNestedChange}
                />
              )}

              {activeSection === 13 && (
                <StudyReason
                  data={formData.studyReason}
                  onChange={handleInputChange}
                />
              )}

              {activeSection === 16 && (
                <CourseDeclaration
                  courseData={formData.courseSelection}
                  preTrainingData={formData.preTrainingChecklist}
                  declarationsData={formData.declarations}
                  citizenshipData={formData.citizenship}
                  onChange={handleInputChange}
                  onNestedChange={handleNestedChange}
                />
              )}
              {activeSection === 14 && (
                <PreTrainingInterview
                  data={formData.preTrainingInterview}
                  onChange={handleInputChange}
                  onNestedChange={handleNestedChange}
                />
              )}
              {activeSection === 15 && (
                <LLNAssessment
                  validateLLNSection={validateLLNSection}
                  courseData={formData.courseSelection}
                  data={formData.llnAssessment}
                  declarationsData={formData.declarations}
                  onChange={handleLLNInputChange}
                  onNestedChange={handleNestedChange}
                />
              )}

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
                    className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                  >
                    Submit Enrolment
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default RPLEnrolment;
// Personal Details Component
const PersonalDetails = ({ data, onChange }) => (
  <div>
    <h3 className="text-xl font-medium text-emerald-700 mb-6">
      1. Personal Details (including full legal name)
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-gray-700 mb-2">Title</label>
        <select
          value={data.title}
          onChange={(e) => onChange("personalDetails", "title", e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="">Select</option>
          <option>Mr</option>
          <option>Ms</option>
          <option>Mrs</option>
          <option>Miss</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Gender</label>
        <div className="flex gap-4">
          {["Male", "Female", "Other"].map((gender) => (
            <label key={gender} className="flex items-center">
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={data.gender === gender}
                onChange={(e) =>
                  onChange("personalDetails", "gender", e.target.value)
                }
                className="mr-2"
                required
              />
              {gender}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">
          Family name (Surname)
        </label>
        <input
          type="text"
          value={data.familyName}
          onChange={(e) =>
            onChange("personalDetails", "familyName", e.target.value)
          }
          className="w-full p-2 border rounded-md"
          required
          placeholder="If Single Name only, enter here"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">First Name</label>
        <input
          type="text"
          value={data.firstName}
          onChange={(e) =>
            onChange("personalDetails", "firstName", e.target.value)
          }
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Middle Name(s)</label>
        <input
          type="text"
          value={data.middleNames}
          onChange={(e) =>
            onChange("personalDetails", "middleNames", e.target.value)
          }
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Preferred Name</label>
        <input
          type="text"
          value={data.preferredName}
          onChange={(e) =>
            onChange("personalDetails", "preferredName", e.target.value)
          }
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Date of Birth</label>
        <input
          type="date"
          value={data.dob}
          onChange={(e) => onChange("personalDetails", "dob", e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
    </div>
  </div>
);

// Contact Details Component
const ContactDetails = ({ data, onChange }) => (
  <div>
    <h3 className="text-xl font-medium text-emerald-700 mb-6">
      2. Your Contact Details
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-gray-700 mb-2">Home Phone</label>
        <input
          type="tel"
          value={data.homePhone}
          onChange={(e) =>
            onChange("contactDetails", "homePhone", e.target.value)
          }
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Mobile Phone</label>
        <input
          type="tel"
          value={data.mobilePhone}
          onChange={(e) =>
            onChange("contactDetails", "mobilePhone", e.target.value)
          }
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange("contactDetails", "email", e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Work Phone</label>
        <input
          type="tel"
          value={data.workPhone}
          onChange={(e) =>
            onChange("contactDetails", "workPhone", e.target.value)
          }
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">
          Alternative email address (optional)
        </label>
        <input
          type="email"
          value={data.altEmail}
          onChange={(e) =>
            onChange("contactDetails", "altEmail", e.target.value)
          }
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-gray-700 mb-2">
          Preferred Contact Method
        </label>
        <div className="flex gap-4">
          {["Mobile Phone", "Email", "Post"].map((method) => (
            <label key={method} className="flex items-center">
              <input
                type="radio"
                name="preferredContact"
                value={method}
                checked={data.preferredContact === method}
                onChange={(e) =>
                  onChange("contactDetails", "preferredContact", e.target.value)
                }
                className="mr-2"
                required
              />
              {method}
            </label>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Emergency Contact Component
const EmergencyContact = ({ data, onChange }) => (
  <div>
    <h3 className="text-xl font-medium text-emerald-700 mb-6">
      3. Your Emergency Contact
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-gray-700 mb-2">Name</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange("emergencyContact", "name", e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Relationship</label>
        <input
          type="text"
          value={data.relationship}
          onChange={(e) =>
            onChange("emergencyContact", "relationship", e.target.value)
          }
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Home Phone</label>
        <input
          type="tel"
          value={data.homePhone}
          onChange={(e) =>
            onChange("emergencyContact", "homePhone", e.target.value)
          }
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Mobile Phone</label>
        <input
          type="tel"
          value={data.mobilePhone}
          onChange={(e) =>
            onChange("emergencyContact", "mobilePhone", e.target.value)
          }
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Work Phone</label>
        <input
          type="tel"
          value={data.workPhone}
          onChange={(e) =>
            onChange("emergencyContact", "workPhone", e.target.value)
          }
          className="w-full p-2 border rounded-md"
        />
      </div>
    </div>
  </div>
);

// Residential Address Component
const ResidentialAddress = ({ data, onChange }) => (
  <div>
    <h3 className="text-xl font-medium text-emerald-700 mb-6">
      4. What is the address of your usual residence?
    </h3>
    <p className="text-gray-600 mb-4">
      Please provide the physical address (street number and name not post
      office box) where you usually reside rather than any temporary address at
      which you reside for training, work or other purposes before returning to
      your home.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-gray-700 mb-2">
          Building/property name
        </label>
        <input
          type="text"
          value={data.buildingName}
          onChange={(e) =>
            onChange("residentialAddress", "buildingName", e.target.value)
          }
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Flat/unit details</label>
        <input
          type="text"
          value={data.flatDetails}
          onChange={(e) =>
            onChange("residentialAddress", "flatDetails", e.target.value)
          }
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">
          Street or lot number (e.g. 205 or Lot 118)
        </label>
        <input
          type="text"
          value={data.streetNumber}
          onChange={(e) =>
            onChange("residentialAddress", "streetNumber", e.target.value)
          }
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Street name</label>
        <input
          type="text"
          value={data.streetName}
          onChange={(e) =>
            onChange("residentialAddress", "streetName", e.target.value)
          }
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">
          Suburb, locality or town
        </label>
        <input
          type="text"
          value={data.suburb}
          onChange={(e) =>
            onChange("residentialAddress", "suburb", e.target.value)
          }
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">State/territory</label>
        <select
          value={data.state}
          onChange={(e) =>
            onChange("residentialAddress", "state", e.target.value)
          }
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="">Select</option>
          <option value="ACT">Australian Capital Territory</option>
          <option value="NSW">New South Wales</option>
          <option value="NT">Northern Territory</option>
          <option value="QLD">Queensland</option>
          <option value="SA">South Australia</option>
          <option value="TAS">Tasmania</option>
          <option value="VIC">Victoria</option>
          <option value="WA">Western Australia</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Postcode</label>
        <input
          type="text"
          value={data.postcode}
          onChange={(e) =>
            onChange("residentialAddress", "postcode", e.target.value)
          }
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
    </div>
  </div>
);

// Postal Address Component
const PostalAddress = ({ data, onChange }) => (
  <div>
    <h3 className="text-xl font-medium text-emerald-700 mb-6">
      5. What is your postal address (if different from above)?
    </h3>
    <div className="mb-4">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={data.different}
          onChange={(e) =>
            onChange("postalAddress", "different", e.target.checked)
          }
          className="mr-2"
        />
        Different from residential address
      </label>
    </div>

    {data.different && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">
            Building/property name
          </label>
          <input
            type="text"
            value={data.buildingName}
            onChange={(e) =>
              onChange("postalAddress", "buildingName", e.target.value)
            }
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Flat/unit details</label>
          <input
            type="text"
            value={data.flatDetails}
            onChange={(e) =>
              onChange("postalAddress", "flatDetails", e.target.value)
            }
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Street or lot number (e.g. 205 or Lot 118)
          </label>
          <input
            type="text"
            value={data.streetNumber}
            onChange={(e) =>
              onChange("postalAddress", "streetNumber", e.target.value)
            }
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Street name</label>
          <input
            type="text"
            value={data.streetName}
            onChange={(e) =>
              onChange("postalAddress", "streetName", e.target.value)
            }
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Postal delivery information (e.g. PO Box 254)
          </label>
          <input
            type="text"
            value={data.postalDelivery}
            onChange={(e) =>
              onChange("postalAddress", "postalDelivery", e.target.value)
            }
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Suburb, locality or town
          </label>
          <input
            type="text"
            value={data.suburb}
            onChange={(e) =>
              onChange("postalAddress", "suburb", e.target.value)
            }
            className="w-full p-2 border rounded-md"
            required={data.different}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">State/territory</label>
          <select
            value={data.state}
            onChange={(e) => onChange("postalAddress", "state", e.target.value)}
            className="w-full p-2 border rounded-md"
            required={data.different}
          >
            <option value="">Select</option>
            <option value="ACT">Australian Capital Territory</option>
            <option value="NSW">New South Wales</option>
            <option value="NT">Northern Territory</option>
            <option value="QLD">Queensland</option>
            <option value="SA">South Australia</option>
            <option value="TAS">Tasmania</option>
            <option value="VIC">Victoria</option>
            <option value="WA">Western Australia</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Postcode</label>
          <input
            type="text"
            value={data.postcode}
            onChange={(e) =>
              onChange("postalAddress", "postcode", e.target.value)
            }
            className="w-full p-2 border rounded-md"
            required={data.different}
          />
        </div>
      </div>
    )}
  </div>
);
// Employment Details Component (Step 6)
const EmploymentDetails = ({ data, onChange }) => (
  <div>
    <h3 className="text-xl font-medium text-emerald-700 mb-6">
      6. Workplace Employer Details (if applicable)
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-gray-700 mb-2">Trading Name</label>
        <input
          type="text"
          value={data.tradingName}
          onChange={(e) =>
            onChange("employmentDetails", "tradingName", e.target.value)
          }
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Contact Name</label>
        <input
          type="text"
          value={data.contactName}
          onChange={(e) =>
            onChange("employmentDetails", "contactName", e.target.value)
          }
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Supervisor Name</label>
        <input
          type="text"
          value={data.supervisorName}
          onChange={(e) =>
            onChange("employmentDetails", "supervisorName", e.target.value)
          }
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Training Address</label>
        <input
          type="text"
          value={data.trainingAddress}
          onChange={(e) =>
            onChange("employmentDetails", "trainingAddress", e.target.value)
          }
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Phone</label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) =>
            onChange("employmentDetails", "phone", e.target.value)
          }
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Employer Email</label>
        <input
          type="email"
          value={data.employeeEmail}
          onChange={(e) =>
            onChange("employmentDetails", "employeeEmail", e.target.value)
          }
          className="w-full p-2 border rounded-md"
        />
      </div>
    </div>
  </div>
);

// Cultural Diversity Component (Step 7)
const CulturalDiversity = ({ data, onChange }) => (
  <div>
    <h3 className="text-xl font-medium text-emerald-700 mb-6">
      7. Language and Cultural Diversity
    </h3>
    <div className="grid grid-cols-1 gap-6">
      <div>
        <label className="block text-gray-700 mb-2">
          Are you of Aboriginal/Torres Strait Islander origin?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "No",
            "Yes, Torres Strait Islander",
            "Yes, Aboriginal",
            "Yes, Aboriginal & T.S. Islander",
          ].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="indigenousStatus"
                value={option}
                checked={data.indigenousStatus === option}
                onChange={(e) =>
                  onChange(
                    "culturalDiversity",
                    "indigenousStatus",
                    e.target.value
                  )
                }
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">
          In which country were you born?
        </label>
        <div className="flex gap-4 mb-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="countryOfBirth"
              value="Australia"
              checked={data.countryOfBirth === "Australia"}
              onChange={(e) =>
                onChange("culturalDiversity", "countryOfBirth", e.target.value)
              }
              className="mr-2"
            />
            Australia
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="countryOfBirth"
              value="Other"
              checked={data.countryOfBirth === "Other"}
              onChange={(e) =>
                onChange("culturalDiversity", "countryOfBirth", e.target.value)
              }
              className="mr-2"
            />
            Other
          </label>
        </div>
        {data.countryOfBirth === "Other" && (
          <input
            type="text"
            placeholder="Please specify country"
            value={data.otherCountry}
            onChange={(e) =>
              onChange("culturalDiversity", "otherCountry", e.target.value)
            }
            className="w-full p-2 border rounded-md"
          />
        )}
      </div>

      <div>
        <label className="block text-gray-700 mb-2">
          Do you speak a language other than English at home?
        </label>
        <div className="flex gap-4 mb-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="otherLanguage"
              value="No"
              checked={data.otherLanguage === "No"}
              onChange={(e) =>
                onChange("culturalDiversity", "otherLanguage", e.target.value)
              }
              className="mr-2"
            />
            No (English only)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="otherLanguage"
              value="Yes"
              checked={data.otherLanguage === "Yes"}
              onChange={(e) =>
                onChange("culturalDiversity", "otherLanguage", e.target.value)
              }
              className="mr-2"
            />
            Yes
          </label>
        </div>
        {data.otherLanguage === "Yes" && (
          <input
            type="text"
            placeholder="Please specify language"
            value={data.specifyLanguage}
            onChange={(e) =>
              onChange("culturalDiversity", "specifyLanguage", e.target.value)
            }
            className="w-full p-2 border rounded-md"
          />
        )}
      </div>

      {data.otherLanguage === "Yes" && (
        <div>
          <label className="block text-gray-700 mb-2">
            How well do you speak English?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Very Well", "Well", "Not well", "Not at all"].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="englishProficiency"
                  value={option}
                  checked={data.englishProficiency === option}
                  onChange={(e) =>
                    onChange(
                      "culturalDiversity",
                      "englishProficiency",
                      e.target.value
                    )
                  }
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

// USI Details Component (Step 8)
const UsiDetails = ({ data, onChange, onNestedChange }) => (
  <div>
    <h3 className="text-xl font-medium text-emerald-700 mb-6">
      8. Unique Student Identifier (USI)
    </h3>
    <div className="mb-6 text-sm text-gray-600">
      <p>
        From 1 January 2015, Alpha Training & Recognition can be prevented from
        issuing you with a nationally recognised VET qualification or statement
        of attainment when you complete your course if you do not have a Unique
        Student Identifier (USI). In addition, we are required to include your
        USI in the data we submit to NCVER.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-6">
      <div>
        <label className="block text-gray-700 mb-2">Enter your USI</label>
        <input
          type="text"
          value={data.usiNumber}
          onChange={(e) => onChange("usiDetails", "usiNumber", e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="If you already have a USI"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={data.createUSI}
          onChange={(e) =>
            onChange("usiDetails", "createUSI", e.target.checked)
          }
          className="mr-2"
          id="createUSI"
        />
        <label htmlFor="createUSI" className="text-gray-700">
          I want Alpha Training & Recognition to create a USI on my behalf
        </label>
      </div>

      {data.createUSI && (
        <div className="border p-4 rounded-md bg-blue-50">
          <h4 className="font-medium mb-4">
            Application for Unique Student Identifier (USI)
          </h4>
          <p className="mb-4 text-sm">
            If you would like us to apply for a USI on your behalf, you must
            authorize us to do so and declare that you have read the privacy
            information at
            https://www.usi.gov.au/documents/privacy-notice-when-rto-applies-their-behalf.
          </p>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Town/City of Birth
            </label>
            <input
              type="text"
              value={data.birthCity}
              onChange={(e) =>
                onChange("usiDetails", "birthCity", e.target.value)
              }
              className="w-full p-2 border rounded-md"
              placeholder="Australian or overseas town/city where you were born"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Please provide details for one form of identity
            </label>
            <select
              value={data.identityType}
              onChange={(e) =>
                onChange("usiDetails", "identityType", e.target.value)
              }
              className="w-full p-2 border rounded-md mb-4"
            >
              <option value="">Select identity document</option>
              <option value="driverLicense">Australian Driver's License</option>
              <option value="medicare">Medicare Card</option>
              <option value="immicard">Immicard</option>
              <option value="registrationDescent">
                Certificate of Registration by Descent
              </option>
              <option value="birthCertificate">
                Australian Birth Certificate
              </option>
              <option value="passport">
                Non-Australian Passport (with Australian Visa)
              </option>
              <option value="ausPassport">Australian Passport</option>
              <option value="citizenship">Citizenship Certificate</option>
            </select>

            {data.identityType === "driverLicense" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={data.identityDetails?.state || ""}
                    onChange={(e) =>
                      onNestedChange(
                        "usiDetails",
                        "identityDetails",
                        "state",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    License Number
                  </label>
                  <input
                    type="text"
                    value={data.identityDetails?.licenseNumber || ""}
                    onChange={(e) =>
                      onNestedChange(
                        "usiDetails",
                        "identityDetails",
                        "licenseNumber",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            )}

            {data.identityType === "medicare" && (
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Medicare Card Number
                  </label>
                  <input
                    type="text"
                    value={data.identityDetails?.medicareNumber || ""}
                    onChange={(e) =>
                      onNestedChange(
                        "usiDetails",
                        "identityDetails",
                        "medicareNumber",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Individual Reference Number
                  </label>
                  <input
                    type="text"
                    value={data.identityDetails?.irn || ""}
                    onChange={(e) =>
                      onNestedChange(
                        "usiDetails",
                        "identityDetails",
                        "irn",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border rounded-md"
                    placeholder="Next to your name on Medicare card"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Card Color</label>
                  <div className="flex gap-4">
                    {["Green", "Yellow", "Blue"].map((color) => (
                      <label key={color} className="flex items-center">
                        <input
                          type="radio"
                          name="medicareColor"
                          value={color}
                          checked={data.identityDetails?.cardColor === color}
                          onChange={(e) =>
                            onNestedChange(
                              "usiDetails",
                              "identityDetails",
                              "cardColor",
                              e.target.value
                            )
                          }
                          className="mr-2"
                        />
                        {color}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={data.identityDetails?.expiryDate || ""}
                    onChange={(e) =>
                      onNestedChange(
                        "usiDetails",
                        "identityDetails",
                        "expiryDate",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            )}

            {/* Additional identity type forms would be implemented similarly */}
          </div>
        </div>
      )}
    </div>
  </div>
);

// Education Details Component (Step 9)
const EducationDetails = ({ data, onChange }) => (
  <div>
    <h3 className="text-xl font-medium text-emerald-700 mb-6">
      9. Education Details
    </h3>
    <div className="grid grid-cols-1 gap-6">
      <div>
        <label className="block text-gray-700 mb-2">
          Are you still enrolled in secondary or senior secondary education?
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="enrolledInSchool"
              value="Yes"
              checked={data.enrolledInSchool === "Yes"}
              onChange={(e) =>
                onChange("educationDetails", "enrolledInSchool", e.target.value)
              }
              className="mr-2"
            />
            Yes
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="enrolledInSchool"
              value="No"
              checked={data.enrolledInSchool === "No"}
              onChange={(e) =>
                onChange("educationDetails", "enrolledInSchool", e.target.value)
              }
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">
          What is your highest COMPLETED school level?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Completed Year 12",
            "Completed Year 11",
            "Completed Year 10",
            "Completed Yr. 9 or equivalent",
            "Completed Yr. 8 or lower",
            "Never attended school",
          ].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="highestSchoolLevel"
                value={option}
                checked={data.highestSchoolLevel === option}
                onChange={(e) =>
                  onChange(
                    "educationDetails",
                    "highestSchoolLevel",
                    e.target.value
                  )
                }
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">
          In which year did you complete this school level?
        </label>
        <input
          type="text"
          value={data.completionYear}
          onChange={(e) =>
            onChange("educationDetails", "completionYear", e.target.value)
          }
          className="w-full p-2 border rounded-md"
          placeholder="Must be answered - even if education was completed overseas"
        />
      </div>

      {data.enrolledInSchool === "Yes" && (
        <div>
          <label className="block text-gray-700 mb-2">
            Current school name
          </label>
          <input
            type="text"
            value={data.currentSchool}
            onChange={(e) =>
              onChange("educationDetails", "currentSchool", e.target.value)
            }
            className="w-full p-2 border rounded-md"
          />
        </div>
      )}

      <div>
        <label className="block text-gray-700 mb-2">
          Previous secondary school (if applicable)
        </label>
        <input
          type="text"
          value={data.previousSchool}
          onChange={(e) =>
            onChange("educationDetails", "previousSchool", e.target.value)
          }
          className="w-full p-2 border rounded-md"
        />
      </div>
    </div>
  </div>
);

// Employment Status Component (Step 10)
const EmploymentStatus = ({ data, occupation, industry, onChange }) => (
  <div>
    <h3 className="text-xl font-medium text-emerald-700 mb-6">
      10. Employment Status
    </h3>
    <div className="grid grid-cols-1 gap-6">
      <div>
        <label className="block text-gray-700 mb-2">
          Which of the following categories BEST describes your current
          employment status?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Full time employee",
            "Part time employee",
            "Self-employed – not employing others",
            "Employer",
            "Employed – unpaid worker in a family business",
            "Unemployed – seeking full time work",
            "Unemployed – seeking part time work",
            "Not employed – not seeking employment",
          ].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="currentStatus"
                value={option}
                checked={data.currentStatus === option}
                onChange={(e) =>
                  onChange("employmentStatus", "currentStatus", e.target.value)
                }
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {(data.currentStatus === "Full time employee" ||
        data.currentStatus === "Part time employee" ||
        data.currentStatus === "Self-employed – not employing others" ||
        data.currentStatus === "Employer" ||
        data.currentStatus ===
          "Employed – unpaid worker in a family business") && (
        <>
          <div>
            <label className="block text-gray-700 mb-2">
              How many employees are at your current employer?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="employeeCount"
                  value="Up to 20"
                  checked={data.employeeCount === "Up to 20"}
                  onChange={(e) =>
                    onChange(
                      "employmentStatus",
                      "employeeCount",
                      e.target.value
                    )
                  }
                  className="mr-2"
                />
                Up to 20
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="employeeCount"
                  value="Over 20"
                  checked={data.employeeCount === "Over 20"}
                  onChange={(e) =>
                    onChange(
                      "employmentStatus",
                      "employeeCount",
                      e.target.value
                    )
                  }
                  className="mr-2"
                />
                Over 20
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium text-emerald-700 mb-4">
              11. Occupation
            </h3>
            <label className="block text-gray-700 mb-2">
              Which of the following classifications BEST describes your current
              (or recent) occupation?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "1 - Managers",
                "2 - Professionals",
                "3 – Technicians & Trade Workers",
                "4 – Community and Personal Service Workers",
                "5 – Clerical & Administrative Workers",
                "6 – Sales Workers",
                "7 – Machinery Operators & Drivers",
                "8 - Labourers",
                "9 – Other",
              ].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="occupation"
                    value={option}
                    checked={occupation === option}
                    onChange={(e) => onChange("occupation", e.target.value)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium text-emerald-700 mb-4">
              12. Industry of Employment
            </h3>
            <label className="block text-gray-700 mb-2">
              Which of the following classifications BEST describes the Industry
              of your current (or recent) Employer?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "A – Agriculture, Forestry and Fishing",
                "B – Mining",
                "C – Manufacturing",
                "D – Electricity, Gas, Water & Waste Services",
                "E – Construction",
                "F – Wholesale Trade",
                "G – Retail Trade",
                "H – Accommodation & Feed Services",
                "I – Transport, Postal & Warehousing",
                "J – Information Media & Telecommunications",
                "K – Financial & Insurance Services",
                "L – Rental, Hiring & Real Estate Services",
                "M – Professional, Scientific & Technical Svc's",
                "N – Administrative Support Services",
                "O – Public Administration and Safety",
                "P – Education & Training",
                "Q – Health Care & Social Assistance",
                "R – Arts and Recreation Services",
                "S – Other Services",
              ].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="industry"
                    value={option}
                    checked={industry === option}
                    onChange={(e) => onChange("industry", e.target.value)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  </div>
);

// Disability Information Component (Step 11)
const DisabilityInfo = ({ data, onChange, onCheckboxArrayChange }) => (
  <div>
    <h3 className="text-xl font-medium text-emerald-700 mb-6">
      13. Disability
    </h3>
    <div className="grid grid-cols-1 gap-6">
      <div>
        <label className="block text-gray-700 mb-2">
          Do you consider yourself to have a disability, impairment or long term
          condition?
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="hasDisability"
              value="YES"
              checked={data.hasDisability === "YES"}
              onChange={(e) =>
                onChange("disability", "hasDisability", e.target.value)
              }
              className="mr-2"
            />
            YES
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="hasDisability"
              value="NO"
              checked={data.hasDisability === "NO"}
              onChange={(e) =>
                onChange("disability", "hasDisability", e.target.value)
              }
              className="mr-2"
            />
            NO
          </label>
        </div>
      </div>

      {data.hasDisability === "YES" && (
        <div>
          <label className="block text-gray-700 mb-2">
            Please indicate the areas of disability, impairment or long term
            condition. You may indicate more than one.
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Hearing/deaf",
              "Physical",
              "Intellectual",
              "Learning",
              "Mental illness",
              "Acquired brain impairment",
              "Vision",
              "Medical condition",
              "Other",
            ].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.disabilityTypes.includes(option)}
                  onChange={(e) =>
                    onCheckboxArrayChange(
                      "disability",
                      "disabilityTypes",
                      option,
                      e.target.checked
                    )
                  }
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>

          {data.disabilityTypes.includes("Other") && (
            <div className="mt-4">
              <label className="block text-gray-700 mb-2">
                Please specify other disability:
              </label>
              <input
                type="text"
                value={data.otherDisability}
                onChange={(e) =>
                  onChange("disability", "otherDisability", e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);

// Previous Qualifications Component (Section 12)
const PreviousQualifications = ({ data, onChange, onNestedChange }) => (
  <div>
    <h3 className="text-xl font-medium text-emerald-700 mb-6">
      15. Previous Qualifications/Education
    </h3>
    <div className="mb-6">
      <label className="block text-gray-700 mb-2">
        Have you successfully COMPLETED any of the following qualifications?
      </label>
      <div className="flex gap-4">
        {["Yes", "No"].map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              name="completedQualifications"
              value={option}
              checked={data.completedQualifications === option}
              onChange={(e) =>
                onChange(
                  "qualifications",
                  "completedQualifications",
                  e.target.value
                )
              }
              className="mr-2"
              required
            />
            {option}
          </label>
        ))}
      </div>
    </div>

    {data.completedQualifications === "Yes" && (
      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          If yes, please tick ONE applicable box relating to your prior
          education at ANY applicable Level as follows:
          <br />A = Australian Qualification, E = Australian Equivalent, I =
          International
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Qualification</th>
                <th className="py-2 px-4 border">A</th>
                <th className="py-2 px-4 border">E</th>
                <th className="py-2 px-4 border">I</th>
              </tr>
            </thead>
            <tbody>
              {[
                { key: "bachelor", label: "Bachelor Degree or Higher Degree" },
                {
                  key: "advancedDiploma",
                  label: "Advanced Diploma or Associate Degree",
                },
                { key: "diploma", label: "Diploma or Associate Diploma" },
                {
                  key: "certIV",
                  label: "Certificate IV or Advanced Cert/Technician",
                },
                {
                  key: "certIII",
                  label: "Certificate III or Trade Certificate",
                },
                { key: "certII", label: "Certificate II" },
                { key: "certI", label: "Certificate I" },
              ].map((qual) => (
                <tr key={qual.key}>
                  <td className="py-2 px-4 border">{qual.label}</td>
                  {["A", "E", "I"].map((type) => (
                    <td key={type} className="py-2 px-4 border text-center">
                      <input
                        type="checkbox"
                        checked={data.qualificationType[qual.key][type]}
                        onChange={(e) =>
                          onNestedChange(
                            "qualifications",
                            "qualificationType",
                            qual.key,
                            {
                              ...data.qualificationType[qual.key],
                              [type]: e.target.checked,
                            }
                          )
                        }
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="py-2 px-4 border">Other (please specify)</td>
                <td colSpan="3" className="py-2 px-4 border">
                  <input
                    type="text"
                    value={data.qualificationType.otherCert}
                    onChange={(e) =>
                      onNestedChange(
                        "qualifications",
                        "qualificationType",
                        "otherCert",
                        e.target.value
                      )
                    }
                    className="w-full p-1 border rounded-md"
                    placeholder="Other certification"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          *To determine 'Australian Equivalent' qualifications, please refer to
          the Overseas Qualifications Unit (OQU).
        </p>
      </div>
    )}
  </div>
);

// Study Reason Component (Section 13)
const StudyReason = ({ data, onChange }) => (
  <div>
    <h3 className="text-xl font-medium text-emerald-700 mb-6">
      16. Study Reason
    </h3>
    <div className="mb-6">
      <label className="block text-gray-700 mb-2">
        Of the following reasons, which BEST describes your main reason for
        undertaking this course / traineeship / apprenticeship?
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {[
          "To get a job",
          "To develop my existing business",
          "To start my own business",
          "To try for a different career",
          "To get a better job or promotion",
          "It was a requirement of my job",
          "I wanted extra skills for my job",
          "To get into another course of study",
          "For personal interest or self-development",
          "Other Reasons",
        ].map((reason) => (
          <label key={reason} className="flex items-center">
            <input
              type="radio"
              name="mainReason"
              value={reason}
              checked={data.mainReason === reason}
              onChange={(e) =>
                onChange("studyReason", "mainReason", e.target.value)
              }
              className="mr-2"
              required
            />
            {reason}
          </label>
        ))}
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-lg font-medium text-emerald-700 mb-4">
        17. Student Contact
      </h3>
      <label className="block text-gray-700 mb-2">
        How did you find out about the course you are enrolling in?
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {[
          "Job Services",
          "Staff Member",
          "Current/Past Student",
          "Flyer",
          "Website",
          "Radio advertising",
          "Word of mouth",
          "Social Media (e.g. Facebook)",
          "Apprentice Centre",
          "Newspapers",
          "Workplace",
          "Other (please specify)",
        ].map((method) => (
          <label key={method} className="flex items-center">
            <input
              type="radio"
              name="discoveryMethod"
              value={method}
              checked={data.discoveryMethod === method}
              onChange={(e) =>
                onChange("studyReason", "discoveryMethod", e.target.value)
              }
              className="mr-2"
              required
            />
            {method}
          </label>
        ))}
      </div>
      {data.discoveryMethod === "Other (please specify)" && (
        <input
          type="text"
          placeholder="Please specify"
          className="mt-2 w-full p-2 border rounded-md"
        />
      )}
    </div>
  </div>
);

// Course Declaration Component (Section 14)
const CourseDeclaration = ({
  courseData,
  preTrainingData,
  declarationsData,
  citizenshipData,
  onChange,
  onNestedChange,
}) => (
  <div>
    <h3 className="text-xl font-medium text-emerald-700 mb-6">
      18. Student Handbook
    </h3>
    <div className="mb-6">
      <p className="text-gray-700 mb-4">
        The student handbook outlines the following:
      </p>
      <ul className="list-disc pl-6 mb-4 grid grid-cols-1 md:grid-cols-2 gap-1">
        <li>Student fee information</li>
        <li>Refund Policy</li>
        <li>Code of conduct</li>
        <li>Complaints procedure</li>
        <li>Appeals procedure</li>
        <li>Assessment guidelines</li>
        <li>Student welfare and support services</li>
        <li>Recognition of prior learning</li>
      </ul>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={declarationsData.readHandbook}
          onChange={(e) =>
            onChange("declarations", "readHandbook", e.target.checked)
          }
          className="mr-2"
          required
        />
        <label className="text-gray-700">
          I declare that I have read and understood RTO student handbook and
          their policies & procedures regarding the above.
        </label>
      </div>
      <p className="text-sm text-gray-500">
        The Student Handbook can be found on RTO website. www.atr.edu.au
      </p>
    </div>

    <h3 className="text-xl font-medium text-emerald-700 mb-6">
      19. Australian Citizenship Status
    </h3>
    <div className="mb-6">
      <div className="flex flex-wrap gap-4">
        {[
          "Australian Citizen",
          "New Zealand Citizen",
          "Permanent Resident",
          "Other",
        ].map((status) => (
          <label key={status} className="flex items-center">
            <input
              type="radio"
              name="citizenshipStatus"
              value={status}
              checked={citizenshipData.status === status}
              onChange={(e) =>
                onChange("citizenship", "status", e.target.value)
              }
              className="mr-2"
              required
            />
            {status}
          </label>
        ))}
      </div>
      {citizenshipData.status === "Other" && (
        <div className="mt-2">
          <input
            type="text"
            value={citizenshipData.otherDetails}
            onChange={(e) =>
              onChange("citizenship", "otherDetails", e.target.value)
            }
            className="w-full p-2 border rounded-md"
            placeholder="Please provide details"
          />
        </div>
      )}
    </div>

    <h3 className="text-xl font-medium text-emerald-700 mb-6">
      20. Program / Qualification to be enrolled in
    </h3>
    <div className="mb-6">
      <label className="block text-gray-700 mb-2">
        Select one of the following courses:
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {[
          "CPC30220 - Certificate III in Carpentry",
          "CPC30620 - Certificate III in Painting and Decorating",
          "CPC40120 - Certificate IV in Building and Construction",
          "CPC50210 - Diploma of Building and Construction (Building)",
          "CPC50220 - Diploma of Building and Construction (Building)",
          "AHC30921 - Certificate III in Landscape Construction",
          "CPC30420 - Certificate III in Demolition",
          "CPC30820 - Certificate III in Roof Tiling",
          "CPC31020 - Certificate III in Solid Plastering",
          "CPC32420 - Certificate III in Plumbing",
          "CPC32620 - Certificate III in Roof Plumbing",
          "CPC40920 - Certificate IV in Plumbing and Services",
          "CPC41020 - Certificate IV in Demolition",
          "MSF30322 - Certificate III in Cabinet Making and Timber Technology",
        ].map((course) => (
          <label key={course} className="flex items-center">
            <input
              type="radio"
              name="selectedCourse"
              value={course}
              checked={courseData.selectedCourse === course}
              onChange={(e) =>
                onChange("courseSelection", "selectedCourse", e.target.value)
              }
              className="mr-2"
              required
            />
            {course}
          </label>
        ))}
      </div>
    </div>

    <h3 className="text-xl font-medium text-emerald-700 mb-6">
      21. Pre-Training Checklist
    </h3>
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: "preTrainingForm", label: "Pre-training form completed" },
          { key: "entryRequirements", label: "Entry Requirements discussed" },
          {
            key: "llnCompleted",
            label:
              "Language, Literacy and Numeracy (LLN) assessment completed by student and attached",
          },
          { key: "creditTransfer", label: "Credit Transfer discussed" },
          { key: "deliveryMode", label: "Delivery Mode discussed" },
          {
            key: "locationDiscussed",
            label: "Location of the course discussed",
          },
          {
            key: "rplDiscussed",
            label: "Recognition of prior learning(RPL) discussed",
          },
          {
            key: "feesDiscussed",
            label: "Tuition fees, Concession and Exemption discussed",
          },
          { key: "refundPolicy", label: "Refund policy discussed" },
          { key: "questionsAnswered", label: "Student question answered" },
          {
            key: "handbookRead",
            label: "I have read and understand the student handbook",
          },
        ].map((item) => (
          <label key={item.key} className="flex items-center">
            <input
              type="checkbox"
              checked={preTrainingData.items[item.key]}
              onChange={(e) =>
                onNestedChange(
                  "preTrainingChecklist",
                  "items",
                  item.key,
                  e.target.checked
                )
              }
              className="mr-2"
            />
            {item.label}
          </label>
        ))}
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 mb-2">
          Please indicate any special needs, assistance you may require during
          the course (e.g Writing assistance)
        </label>
        <textarea
          value={preTrainingData.items.specialNeeds}
          onChange={(e) =>
            onNestedChange(
              "preTrainingChecklist",
              "items",
              "specialNeeds",
              e.target.value
            )
          }
          className="w-full p-2 border rounded-md"
          rows="3"
        ></textarea>
      </div>
    </div>

    <h3 className="text-xl font-medium text-emerald-700 mb-6">
      Privacy Statement & Student Declaration
    </h3>
    <div className="mb-6">
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <h4 className="font-medium mb-2">Privacy Notice</h4>
        <p className="text-sm text-gray-700 mb-2">
          Under the Data Provision Requirements 2012, Alpha Training &
          Recognition is required to collect personal information about you and
          to disclose that personal information to the National Centre for
          Vocational Education Research Ltd (NCVER).
        </p>
        <p className="text-sm text-gray-700 mb-2">
          Your personal information (including the personal information
          contained on this enrolment form and your training activity data) may
          be used or disclosed by Alpha Training & Recognition for statistical,
          regulatory and research purposes. Alpha Training & Recognition may
          disclose your personal information for these purposes to third
          parties, including:
        </p>
        <ul className="list-disc pl-6 text-sm text-gray-700 mb-2">
          <li>
            School – if you are a secondary student undertaking VET, including a
            school-based apprenticeship or traineeship;
          </li>
          <li>
            Employer – if you are enrolled in training paid by your employer;
          </li>
          <li>
            Commonwealth and State or Territory government departments and
            authorised agencies;
          </li>
          <li>NCVER;</li>
          <li>Organisations conducting student surveys; and</li>
          <li>Researchers.</li>
        </ul>
        <p className="text-sm text-gray-700">
          For more information about NCVER's Privacy Policy go to
          https://www.ncver.edu.au/privacy.
        </p>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">
          Consent for publication of photographs and student work
        </h4>
        <p className="text-sm text-gray-700 mb-2">
          RTO occasionally takes photos of students participating in classes for
          publicity purposes. These photos may be displayed on our website. The
          names and details of the people in the photos are not released or
          published.
        </p>
        <label className="block text-gray-700 mb-2">
          Do you consent to the use of your photo under these conditions?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="photoConsent"
                value={option}
                checked={declarationsData.photoConsent === option}
                onChange={(e) =>
                  onChange("declarations", "photoConsent", e.target.value)
                }
                className="mr-2"
                required
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">
          Declaration of Information Accuracy
        </h4>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={declarationsData.privacyConsent}
            onChange={(e) =>
              onChange("declarations", "privacyConsent", e.target.checked)
            }
            className="mr-2"
            required
          />
          <label className="text-sm text-gray-700">
            I consent to the collection, use and disclosure of my personal
            information in accordance with the Privacy Notice above.
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={declarationsData.informationAccuracy}
            onChange={(e) =>
              onChange("declarations", "informationAccuracy", e.target.checked)
            }
            className="mr-2"
            required
          />
          <label className="text-sm text-gray-700">
            I declare that the information I have provided to the best of my
            knowledge is true and correct.
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">Student Signature</label>
          <input
            type="text"
            value={declarationsData.studentSignature}
            onChange={(e) =>
              onChange("declarations", "studentSignature", e.target.value)
            }
            className="w-full p-2 border rounded-md"
            placeholder="Type your full name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            value={declarationsData.date}
            onChange={(e) => onChange("declarations", "date", e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">
            Parent/Guardian Signature (if under 18)
          </label>
          <input
            type="text"
            value={declarationsData.parentSignature}
            onChange={(e) =>
              onChange("declarations", "parentSignature", e.target.value)
            }
            className="w-full p-2 border rounded-md"
            placeholder="Type full name (if applicable)"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">
            Parent/Guardian Date (if under 18)
          </label>
          <input
            type="date"
            value={declarationsData.parentDate}
            onChange={(e) =>
              onChange("declarations", "parentDate", e.target.value)
            }
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  </div>
);
// Pre-Training Interview Component
const PreTrainingInterview = ({ data, onChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Pre-Training Review
      </h3>
      <p className="mb-4 text-gray-600">
        A Pre-Training Review ensures that the learning and assessment strategy
        meets your individual needs.
      </p>

      <div className="mb-6">
        <h4 className="text-lg font-medium text-emerald-600 mb-3">
          Introduction
        </h4>
        <p className="mb-2 text-gray-600">The pre-training review ensures:</p>
        <ul className="list-disc pl-5 mb-4 text-gray-600">
          <li>Understand your objectives for undertaking this course</li>
          <li>
            Explores your current competencies and provides opportunities for
            these to be assessed through Recognition of Prior Learning (RPL),
            Recognition of Current Competency (RCC) or Credit Transfer (CT)
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium text-emerald-600 mb-3">
          Part A: Your expectations and experience
        </h4>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            1) Your expectations - What do you hope to gain from undertaking
            this qualification?
          </label>
          <textarea
            value={data.expectations}
            onChange={(e) =>
              onChange("preTrainingInterview", "expectations", e.target.value)
            }
            className="w-full p-2 border rounded-md h-24"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            2a) Please write a brief description of your current position OR
            attach a Position Description.
          </label>
          <textarea
            value={data.currentPosition}
            onChange={(e) =>
              onChange(
                "preTrainingInterview",
                "currentPosition",
                e.target.value
              )
            }
            className="w-full p-2 border rounded-md h-24"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            2b) Provide your last 3 job titles and how long you were employed in
            each position.
          </label>
          <div className="grid grid-cols-1 gap-3">
            <input
              type="text"
              placeholder="Position 1"
              value={data.jobTitle1}
              onChange={(e) =>
                onChange("preTrainingInterview", "jobTitle1", e.target.value)
              }
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Position 2"
              value={data.jobTitle2}
              onChange={(e) =>
                onChange("preTrainingInterview", "jobTitle2", e.target.value)
              }
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Position 3"
              value={data.jobTitle3}
              onChange={(e) =>
                onChange("preTrainingInterview", "jobTitle3", e.target.value)
              }
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            2c) Recognition of Prior Learning (RPL) / Recognition of Current
            Competency (RCC) / Credit Transfer (CT)
          </label>

          <div className="mb-2">
            <p className="text-gray-700 mb-2">
              I. Have you acquired any formal training in any of the
              qualifications you wish to enroll into?
            </p>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="formalTraining"
                  value="Yes"
                  checked={data.formalTraining === "Yes"}
                  onChange={(e) =>
                    onChange(
                      "preTrainingInterview",
                      "formalTraining",
                      e.target.value
                    )
                  }
                  className="mr-2"
                  required
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="formalTraining"
                  value="No"
                  checked={data.formalTraining === "No"}
                  onChange={(e) =>
                    onChange(
                      "preTrainingInterview",
                      "formalTraining",
                      e.target.value
                    )
                  }
                  className="mr-2"
                  required
                />
                No
              </label>
            </div>
          </div>

          <div className="mb-2">
            <p className="text-gray-700 mb-2">
              II. Do you wish to apply for RPL?
            </p>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="applyRPL"
                  value="Yes"
                  checked={data.applyRPL === "Yes"}
                  onChange={(e) =>
                    onChange("preTrainingInterview", "applyRPL", e.target.value)
                  }
                  className="mr-2"
                  required
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="applyRPL"
                  value="No"
                  checked={data.applyRPL === "No"}
                  onChange={(e) =>
                    onChange("preTrainingInterview", "applyRPL", e.target.value)
                  }
                  className="mr-2"
                  required
                />
                No
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium text-emerald-600 mb-3">Part B</h4>
        <p className="mb-2 text-gray-600">
          Following information will help us to determine your learning styles
          and if we are able to deliver courses that meet your learning styles.
        </p>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Tick the most relevant learning style for you:
          </label>
          <div className="grid grid-cols-1 gap-2">
            {[
              "Textbooks that I can read and refer to in my own time",
              "Power Points explained to me during classes",
              "Pictures and diagrams",
              "Group discussions with others",
              "Conducting my own research",
              "Listening to the lectures/ trainers",
              "Practical application of skills and knowledge in a workplace or similar or watching videos",
              "Working through real examples such as a case study or scenario",
            ].map((style, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={
                    data.learningStyles && data.learningStyles.includes(style)
                  }
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const updatedStyles = checked
                      ? [...(data.learningStyles || []), style]
                      : (data.learningStyles || []).filter((s) => s !== style);
                    onChange(
                      "preTrainingInterview",
                      "learningStyles",
                      updatedStyles
                    );
                  }}
                  className="mr-2"
                />
                {style}
              </label>
            ))}
            <div className="mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={
                    data.otherLearningStyle !== undefined &&
                    data.otherLearningStyle !== ""
                  }
                  onChange={(e) => {
                    if (!e.target.checked) {
                      onChange(
                        "preTrainingInterview",
                        "otherLearningStyle",
                        ""
                      );
                    }
                  }}
                  className="mr-2"
                />
                Other (please explain below)
              </label>
              {(data.otherLearningStyle !== undefined &&
                data.otherLearningStyle !== "") ||
              (data.learningStyles && data.learningStyles.includes("Other")) ? (
                <input
                  type="text"
                  value={data.otherLearningStyle || ""}
                  onChange={(e) =>
                    onChange(
                      "preTrainingInterview",
                      "otherLearningStyle",
                      e.target.value
                    )
                  }
                  className="w-full mt-2 p-2 border rounded-md"
                  placeholder="Please specify other learning style"
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            What additional support do you think you will need in order to
            complete this course successfully?
          </label>
          <div className="grid grid-cols-1 gap-2">
            {[
              "English language support",
              "Reading support",
              "Writing support",
              "One-on-one guidance",
              "Additional resources",
            ].map((support, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={
                    data.additionalSupport &&
                    data.additionalSupport.includes(support)
                  }
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const updatedSupport = checked
                      ? [...(data.additionalSupport || []), support]
                      : (data.additionalSupport || []).filter(
                          (s) => s !== support
                        );
                    onChange(
                      "preTrainingInterview",
                      "additionalSupport",
                      updatedSupport
                    );
                  }}
                  className="mr-2"
                />
                {support}
              </label>
            ))}
            <div className="mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={
                    data.otherSupport !== undefined && data.otherSupport !== ""
                  }
                  onChange={(e) => {
                    if (!e.target.checked) {
                      onChange("preTrainingInterview", "otherSupport", "");
                    }
                  }}
                  className="mr-2"
                />
                Other
              </label>
              {(data.otherSupport !== undefined && data.otherSupport !== "") ||
              (data.additionalSupport &&
                data.additionalSupport.includes("Other")) ? (
                <input
                  type="text"
                  value={data.otherSupport || ""}
                  onChange={(e) =>
                    onChange(
                      "preTrainingInterview",
                      "otherSupport",
                      e.target.value
                    )
                  }
                  className="w-full mt-2 p-2 border rounded-md"
                  placeholder="Please specify other support needed"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Student Name</label>
        <input
          type="text"
          value={data.studentName}
          onChange={(e) =>
            onChange("preTrainingInterview", "studentName", e.target.value)
          }
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Date</label>
        <input
          type="date"
          value={data.date}
          onChange={(e) =>
            onChange("preTrainingInterview", "date", e.target.value)
          }
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
    </div>
  );
};

const LLNAssessment = ({
  data,
  onChange,
  validateLLNSection,
  onNestedChange,
}) => {
  const [activePart, setActivePart] = useState("oral");
  const wordCount = (text) =>
    text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

  // Numeracy tables data structure
  const numeracyTables = {
    q3: {
      headers: ["Month", "Average price/litre"],
      rows: [
        ["July 2014", "1.14"],
        ["August 2014", "1.15"],
        ["September 2014", "1.13"],
        ["October 2014", "1.18"],
        ["November 2014", "1.20"],
        ["December 2014", "1.22"],
        ["January 2015", "1.26"],
        ["February 2015", "1.23"],
        ["March 2015", "1.24"],
        ["April 2015", "1.23"],
        ["May 2015", "1.27"],
        ["June 2015", "1.30"],
      ],
      subQuestions: [
        "a) In which month was the petrol price the lowest?",
        "b) In which two months was the price of petrol the same?",
        "c) In which month was the price of petrol the highest?",
        "d) In which month did the price of petrol increase the most?",
        "e) What was the general trend in the price of petrol over this 12-months?",
      ],
    },
    q4: {
      headers: ["Item", "Normal price", "Sale price – 30% off"],
      rows: [
        ["Men's woollen socks", "2 pair pack for $20.00", ""],
        ["Children's Pajamas", "$18.00", ""],
        ["Women's jumpers", "$35.00", ""],
        ["Sports shoes", "$50.00", ""],
        ["Football scarves", "$22.00", ""],
      ],
    },
    q5: {
      headers: ["Answer number", "Length", "Width", "Area in Square Meter"],
      rows: [
        ["a)", "", "", ""],
        ["b)", "", "", ""],
        ["c)", "", "", ""],
      ],
    },
    q6: {
      headers: ["Fraction", "Decimal", "Percentage"],
      rows: [
        ["1/10", "0.1", "10%"],
        ["1/5", "", ""],
        ["", "0.7", ""],
        ["", "", "65%"],
        ["16/25", "", ""],
      ],
    },
  };

  // Handle numeracy answers for all questions including tables
  const handleNumeracyAnswer = (questionKey, value, rowIndex, cellIndex) => {
    const newAnswers = { ...data.numeracyAnswers };

    if (!newAnswers[questionKey]) {
      // Initialize the structure based on question type
      if (questionKey === "q5") {
        // For rectangle dimensions question - initialize properly for each row
        newAnswers[questionKey] = Array(3)
          .fill()
          .map(() => ({
            length: "",
            width: "",
            area: "",
          }));
      } else if (questionKey === "q6") {
        // For fractions/decimals/percentages question
        newAnswers[questionKey] = [];
        // Initialize with the correct structure
        for (let i = 0; i < numeracyTables.q6.rows.length; i++) {
          newAnswers[questionKey][i] = {
            0: numeracyTables.q6.rows[i][0] || "", // Fraction
            1: numeracyTables.q6.rows[i][1] || "", // Decimal
            2: numeracyTables.q6.rows[i][2] || "", // Percentage
          };
        }
      } else {
        // Default case for other questions
        newAnswers[questionKey] = Array(
          numeracyTables[questionKey]?.rows?.length || 0
        ).fill("");
      }
    }

    // Handle different question types
    if (questionKey === "q5") {
      // For rectangle dimensions - update only the specific field
      const fieldMap = ["length", "width", "area"];
      const field = fieldMap[cellIndex];

      if (!newAnswers[questionKey][rowIndex]) {
        newAnswers[questionKey][rowIndex] = { length: "", width: "", area: "" };
      }

      newAnswers[questionKey][rowIndex][field] = value;
    } else if (questionKey === "q6") {
      // For fractions/decimals/percentages table
      if (!newAnswers[questionKey][rowIndex]) {
        newAnswers[questionKey][rowIndex] = {
          0: "", // Fraction
          1: "", // Decimal
          2: "", // Percentage
        };
      }

      // Update only the specific cell
      newAnswers[questionKey][rowIndex][cellIndex] = value;
    } else if (cellIndex !== undefined) {
      // For other questions with nested arrays
      if (!newAnswers[questionKey][rowIndex]) {
        newAnswers[questionKey][rowIndex] = [];
      }
      newAnswers[questionKey][rowIndex][cellIndex] = value;
    } else if (rowIndex !== undefined) {
      // For simple arrays
      newAnswers[questionKey][rowIndex] = value;
    } else {
      // For simple values
      newAnswers[questionKey] = value;
    }

    onChange("llnAssessment", "numeracyAnswers", newAnswers);
  };

  // Render numeracy tables with proper input fields
  const renderNumeracyTable = (questionKey) => {
    const tableData = numeracyTables[questionKey];
    if (!tableData || !tableData.rows) return null;

    return (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              {tableData.headers.map((header, index) => (
                <th key={index} className="p-2 border">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Array.isArray(row)
                  ? row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="p-2 border">
                        {/* For question 5 (rectangles) */}
                        {questionKey === "q5" ? (
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={
                              data.numeracyAnswers[questionKey]?.[rowIndex]?.[
                                cellIndex === 0
                                  ? "length"
                                  : cellIndex === 1
                                  ? "width"
                                  : "area"
                              ] || ""
                            }
                            onChange={(e) =>
                              handleNumeracyAnswer(
                                questionKey,
                                e.target.value,
                                rowIndex,
                                cellIndex
                              )
                            }
                          />
                        ) : questionKey === "q6" ? (
                          // For question 6 (fractions/decimals)
                          // Check if this cell should be read-only based on the reference table
                          cell ? (
                            // If cell has content in the original data, it should be read-only
                            <div className="p-1">{cell}</div>
                          ) : (
                            // Otherwise it's an editable field
                            <input
                              type="text"
                              className="w-full p-1 border rounded"
                              value={
                                data.numeracyAnswers[questionKey]?.[rowIndex]?.[
                                  cellIndex
                                ] || ""
                              }
                              onChange={(e) =>
                                handleNumeracyAnswer(
                                  questionKey,
                                  e.target.value,
                                  rowIndex,
                                  cellIndex
                                )
                              }
                            />
                          )
                        ) : (
                          // For other questions
                          cell || (
                            <input
                              type="text"
                              className="w-full p-1 border rounded"
                              value={
                                data.numeracyAnswers[questionKey]?.[rowIndex] ||
                                ""
                              }
                              onChange={(e) =>
                                handleNumeracyAnswer(
                                  questionKey,
                                  e.target.value,
                                  rowIndex
                                )
                              }
                            />
                          )
                        )}
                      </td>
                    ))
                  : // Handle non-array rows
                    Array(tableData.headers.length)
                      .fill("")
                      .map((_, cellIndex) => (
                        <td key={cellIndex} className="p-2 border">
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={
                              data.numeracyAnswers[questionKey]?.[rowIndex]?.[
                                cellIndex
                              ] || ""
                            }
                            onChange={(e) =>
                              handleNumeracyAnswer(
                                questionKey,
                                e.target.value,
                                rowIndex,
                                cellIndex
                              )
                            }
                          />
                        </td>
                      ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const handlePartComplete = (part) => {
    const nextPart = {
      oral: "reading",
      reading: "numeracy",
      numeracy: "complete",
    }[part];
    setActivePart(nextPart);
  };

  // Oral Communication Questions from the document
  const oralCommunicationQuestions = [
    "Can you tell me about something that you learned recently? How did you learn it? People learn new skills every day, such as how to use the internet and how to record TV shows.",
    "What do you like about learning? Can you talk about how you think you like to learn? What helps you to learn? People learn in different ways. Some learn best by listening and writing, some from visual aids such as the whiteboard or the TV and some learn by watching and doing.",
    "What are you good at? This may include reading (newspapers, emails, websites, notice boards, manuals); writing (letters, emails, forms, lists, messages, reports); numeracy (calculations, times tables, 24-hour clock, measurement, money and finance); speaking and listening (talking on the phone, asking for information, giving instructions or presentations).",
    "What would you like to learn? This might include specific vocational tasks, or it may be more general, such as reading novels or TV guides or writing letters.",
    "What helps you to learn? Are there barriers, for example the need for glasses; medication or family issues; unsuccessful previous schooling; English as a second language. Some may be able to identify a preference for small groups, extra time, one-on-one support, a mentor, a tape recorder, a computer, a dictionary, a calculator etc.",
    "When did you leave school? Have you been enrolled in training (vocational training or tertiary studies) since you left school? If yes, which courses?",
    "Which skills would you require to pursue your career?",
    "What sort of maths did you use at work? Did you use a calculator, count stock and materials, or measure? Did you use calculations? Give directions? Read maps?",
    "What work skills do you already have? Team work using technology, communication, self-management, problem solving, learning, initiative and planning.",
    "What skills would you like to develop from this course?",
  ];

  // Reading comprehension texts
  const readingTexts = [
    `Most people don't mind working out a bit but are discouraged by the thought of exercising hard. The idea of sweating buckets is so daunting that they avoid exercising. Fortunately, exercise is not a matter of all or nothing. There is some reward at every level of effort, provided it is regular. Spend at least 30 minutes a day in action like brisk walking to errands climbing stairs, carrying heavy shopping or children and doing outdoor gardening. Your rewards will not be immediate, but you can expect a reduced risk of problems like brittle bones, heart disease, and poor blood circulation. You work up a decent appetite and sleep well, but improvement in body shape will be minimal.
    Light regular exercise helps your heart. Such activity can include anything from brisk walking, jogging, cycling, swimming and any light sports or even disco dancing. The reward is immunity to colds and flu, less stress and slightly healthier levels of cholesterol and blood pressure. The figure trims down a little but only gradually.`,

    `Communication is the sharing of information. It is the power to create in the minds of others, feelings or information that you want them to have. It is the need to communicate that has given rise to speech, language, alphabets, and writing. The same need led to the invention of paper, printing presses, typewriters, and finally computers and the internet. The power to communicate in depth has allowed humans to dominate Earth. The fast development of the same power has allowed human technological evolution to overtake biological and social evolution.
    There are three principal needs of communication. The need to communicate in the presence of the receiver gave rise to speech and language. The need to communicate in one's absence gave rise to the alphabet, writing, paper, printing press, all kinds of recording devices, and finally the modern-day computer with its features. The need to communicate over a distance included everything that one needed to communicate in one's absence but also gave rise to signals, telegraph, telephone, the postal system and the internet.`,
  ];

  const readingQuestions = [
    "Which of the following statements about light exercise can be supported from the text?",
    "Which of the following questions about communication can be answered from the text?",
  ];

  const readingOptions = [
    [
      "1. Even some routine activities can serve as light exercise.",
      "2. If putting your body into complete shape is your aim, you might be in for some disappointment.",
      "3. It is necessary to exercise different parts of the body daily.",
      "4. Put in some aerobic activity for working up a sweat.",
      "5. It builds resistance to chronic diseases and infections, and your heart performs strongly.",
    ],
    [
      "1. Why do we communicate?",
      "2. How do we communicate?",
      "3. What do we communicate?",
      "4. Where do we communicate?",
      "5. When do we communicate?",
    ],
  ];

  // Fill in the blanks text
  const fillInBlanksText = `Every year thousands of people travel to Britain in order to improve their standard of English. For many, however, this can be a (1) __________ (sore, aching, sick, painful) experience due to the fact that it involves (2) ______________ (attending, going, studying, learning) a strange school, staying in sometimes unpleasant accommodation and living in an unfamiliar culture.

  One (3) ______________ (requirement, answer, argument, reaction) to these problems is the Home-stay method. With this, students are each assigned a teacher (4) _______________ (expecting, matching, suited, prepared) to their language requirements and interests. As well as giving individual tuition, the teacher (5) _____________ (advises, provides, offers, suggests) the student with information about what activities are available locally and (6) _____________ (goes, takes, brings, carries) them on trips.
  
  Students get between ten and twenty hours of tuition a week and are also expected to (7) _________ (do, join, attach, connect) in the family's daily activities. The students speak English at all times and therefore learn how to use the language in every day (8) _____________ (positions, chances, situations, occasions) Home-stay programs usually (9) __________ (pass, stay, remain, last) for up to four weeks. Although costs are higher than of regular language schools, students can feel (10) _____________ (confident, reliable, self-assured, satisfactory) that they will be receiving top-class language teaching in a safe and pleasant environment.`;

  // Summary text
  const summaryText = `Parents' Born Order Affect Their Parenting
  Parents' own birth order can become an issue when dynamics in the family they are raising replicate the family in which they were raised. Agati notes common examples, such as a firstborn parent getting into "raging battles" with a firstborn child. "Both are used to getting the last word. Each has to be right. But the parent has to be the grown-up and step out of that battle," he advises. When youngest children become parents, Agati cautions that because they "may not have had high expectations placed on them, they, in turn, may not see their kids for their abilities."
  But he also notes that since youngest children tend to be more social, "youngest parents can be helpful to their firstborn, who may have a harder time with social situations. These parents can help their eldest kids loosen up and not be so hard on themselves. Mom Susan Ritz says her birth order didn't seem to affect her parenting until the youngest of her three children, Julie, was born. Julie was nine years younger than Ritz's oldest, Joshua, mirroring the age difference between Susan and her own older brother. "I would see Joshua do to Julie what my brother did to me," she says of the taunting and teasing by a much older sibling.
  "I had to try not to always take Julie's side." Biases can surface no matter what your own birth position was, as Lori Silverstone points out. "As a middle myself, I can be harder on my older daughter. I recall my older sister hitting me," she says of her reactions to her daughters' tussles.
  "My husband is a firstborn. He's always sticking up for the oldest. He feels bad for her that the others came so fast. He helps me to see what that feels like, to have that attention and then lose it." Silverstone sees birth-order triggers as "an opportunity to heal parts of ourselves. I've learned to teach my middle daughter to stand up for herself.
  My mother didn't teach me that. I'm conscious of giving my middle daughter tools so she has a nice way to protect herself."
  Whether or not you subscribe to theories that birth order can affect your child's personality, ultimately, "we all have free will," Agati notes. It's important for both parents and kids to realize that, despite the characteristics often associated with birth order, "you're not locked into any role.`;

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-medium text-emerald-700 mb-6">
        Language, Literacy & Numeracy (LLN) Assessment
      </h3>

      <div className="flex justify-center gap-2 md:gap-4 mb-8">
        {["oral", "reading", "numeracy"].map((part) => (
          <div
            key={part}
            className={`w-1/3 h-8 rounded-full flex items-center justify-center text-xs md:text-base
        ${
          activePart === part
            ? "bg-emerald-600 text-white"
            : activePart === "complete" ||
              ["oral", "reading", "numeracy"].indexOf(part) <
                ["oral", "reading", "numeracy"].indexOf(activePart)
            ? "bg-emerald-100"
            : "bg-gray-200"
        }`}
          >
            <span className="hidden md:inline">
              {
                ["Oral Communication", "Reading & Writing", "Numeracy"][
                  ["oral", "reading", "numeracy"].indexOf(part)
                ]
              }
            </span>
            <span className="md:hidden">
              {
                ["Oral", "Reading", "Math"][
                  ["oral", "reading", "numeracy"].indexOf(part)
                ]
              }
            </span>
          </div>
        ))}
      </div>

      {/* Oral Communication Section */}
      {activePart === "oral" && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-xl font-semibold text-emerald-700 mb-4">
            Part A - Oral Communication
          </h4>
          <p className="mb-4 text-gray-600">
            You will receive a maximum of 5 marks for each question. You will be
            assessed against the following criteria:
            <ul className="list-disc pl-6 mt-2">
              <li>Communicative Effectiveness (Communicate confidently)</li>
              <li>
                Intelligibility (Use the natural flow of speech, giving stress
                to particular words within sentences to emphasise meaning)
              </li>
              <li>
                Fluency (Maintain a natural speed to make it easier for the
                listener to follow)
              </li>
              <li>Appropriateness (Use suitable, professional language)</li>
              <li>
                Resources of Grammar and Expression (Use appropriate structures
                to make what you are saying coherent)
              </li>
            </ul>
          </p>

          {oralCommunicationQuestions.map((question, index) => (
            <div key={index} className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">
                Question {index + 1}:
              </label>
              <p className="mb-2 text-gray-600">{question}</p>
              <textarea
                value={data.oralAnswers[index] || ""}
                onChange={(e) => {
                  const newAnswers = [...data.oralAnswers];
                  newAnswers[index] = e.target.value;
                  onChange("llnAssessment", "oralAnswers", newAnswers);
                }}
                className="w-full p-3 border rounded-md h-32"
                required
              />
              <div className="text-sm text-gray-500 mt-1">
                Word count: {wordCount(data.oralAnswers[index] || "")} (Minimum
                30 words recommended)
              </div>
            </div>
          ))}

          <button
            onClick={() => handlePartComplete("oral")}
            className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700"
          >
            Continue to Reading & Writing
          </button>
        </div>
      )}

      {/* Reading & Writing Section */}
      {activePart === "reading" && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-xl font-semibold text-emerald-700 mb-4">
            Part B - Reading & Writing
          </h4>

          {/* Task 1 - Reading Multiple Choice */}
          <div className="mb-8">
            <h5 className="font-medium mb-2">
              Task 1: Reading Multiple Choice Multiple Answer
            </h5>
            <p className="bg-gray-200 w-full text-wrap text-sm p-2 my-3 rounded-md">
              This is a multiple-choice item type that assesses reading skills.
              It requires you to read, analyse, understand and assess a short
              text on an academic subject and choose more than one correct
              response. You will receive a maximum of 5 marks for each question
              if all responses you choose are correct.
            </p>

            {readingTexts.map((text, qIndex) => (
              <div key={qIndex} className="bg-white p-4 rounded-md shadow mb-4">
                <p className="mb-4 text-gray-700 whitespace-pre-line">{text}</p>
                <p className="font-medium mb-2">{readingQuestions[qIndex]}</p>
                <div className="space-y-2">
                  {readingOptions[qIndex].map((option, optIndex) => (
                    <label key={optIndex} className="flex items-start">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-emerald-600 mt-1"
                        checked={
                          data.readingMultipleChoice &&
                          data.readingMultipleChoice[`q${qIndex + 1}`]
                            ? data.readingMultipleChoice[
                                `q${qIndex + 1}`
                              ].includes(optIndex + 1)
                            : false
                        }
                        onChange={(e) => {
                          const newValues =
                            data.readingMultipleChoice &&
                            data.readingMultipleChoice[`q${qIndex + 1}`]
                              ? [
                                  ...data.readingMultipleChoice[
                                    `q${qIndex + 1}`
                                  ],
                                ]
                              : [];
                          if (e.target.checked) {
                            newValues.push(optIndex + 1);
                          } else {
                            const index = newValues.indexOf(optIndex + 1);
                            if (index > -1) newValues.splice(index, 1);
                          }
                          onChange("llnAssessment", "readingMultipleChoice", {
                            ...data.readingMultipleChoice,
                            [`q${qIndex + 1}`]: newValues,
                          });
                        }}
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Task 2 - Fill in the Blanks */}
          <div className="mb-8">
            <h5 className="font-medium mb-2">Task 2: Fill in the Blanks</h5>
            <p className="mb-4 text-gray-600">
              Below is a text with blanks. Select the appropriate answer choice
              for each blank. You will receive one mark for each correct answer.
            </p>
            <div className="bg-white p-4 rounded-md shadow">
              <p className="mb-4 text-gray-700 whitespace-pre-line">
                {fillInBlanksText}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(10)].map((_, index) => (
                  <div key={index}>
                    <label className="block text-sm mb-1">
                      Blank {index + 1}
                    </label>
                    <input
                      type="text"
                      value={
                        data.fillBlanks ? data.fillBlanks[index] || "" : ""
                      }
                      onChange={(e) => {
                        const newBlanks = [
                          ...(data.fillBlanks || Array(10).fill("")),
                        ];
                        newBlanks[index] = e.target.value;
                        onChange("llnAssessment", "fillBlanks", newBlanks);
                      }}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Task 3 - Write summary from written text */}
          <div className="mb-8">
            <h5 className="font-medium mb-2">
              Task 3: Write Summary from Written Text
            </h5>
            <p className="mb-4 text-gray-600">
              Read the given text and summarize it in your own words. You should
              write between 50 to 75 words. You will receive a maximum of 15
              marks for this task.
            </p>
            <div className="bg-white p-4 rounded-md shadow">
              <p className="mb-4 text-gray-700 whitespace-pre-line">
                {summaryText}
              </p>
              <textarea
                value={data.textSummary || ""}
                onChange={(e) =>
                  onChange("llnAssessment", "textSummary", e.target.value)
                }
                className="w-full p-3 border rounded-md h-32"
                placeholder="Write your summary here..."
                required
              />
              <div className="text-sm text-gray-500 mt-1">
                Word count: {wordCount(data.textSummary || "")} (50-75 words
                required)
              </div>
            </div>
          </div>

          {/* Task 4 - Describe Image */}
          <div className="mb-8">
            <h5 className="font-medium mb-2">Task 4: Describe Image</h5>
            <p className="mb-4 text-gray-600">
              Look at the image below. Study it and write your answer. You
              should write between 50 and 75 words. You will receive a maximum
              of 15 marks for this task.
            </p>
            <div className="bg-white p-4 rounded-md shadow">
              <EducationUnemploymentChart />
              <textarea
                value={data.imageDescription || ""}
                onChange={(e) =>
                  onChange("llnAssessment", "imageDescription", e.target.value)
                }
                className="w-full p-3 border rounded-md h-32"
                placeholder="Describe the image here..."
                required
              />
              <div className="text-sm text-gray-500 mt-1">
                Word count: {wordCount(data.imageDescription || "")} (50-75
                words required)
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setActivePart("oral")}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
            >
              Back to Oral Communication
            </button>
            <button
              type="button"
              onClick={() => handlePartComplete("reading")}
              className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700"
            >
              Continue to Numeracy
            </button>
          </div>
        </div>
      )}

      {/* Numeracy Section */}
      {activePart === "numeracy" && (
        //     <div className="bg-gray-50 p-6 rounded-lg">
        //       <h4 className="text-xl font-semibold text-emerald-700 mb-4">
        //         Part C - Numeracy
        //       </h4>

        //       <div className="mb-6">
        //         <p className="font-medium mb-2">
        //           1. A box holds 15 lettuces. At the end of the day the farm crew
        //           had filled 86 boxes. How many lettuces is that in total? Show how
        //           you worked this out.
        //         </p>
        //         <input
        //           type="number"
        //           className="w-32 p-2 border rounded-md mr-4"
        //           value={data.numeracyAnswers.q1 || ""}
        //           onChange={(e) => handleNumeracyAnswer("q1", e.target.value)}
        //         />
        //         <textarea
        //           className="w-full p-2 border rounded-md mt-2"
        //           placeholder="Show your working..."
        //           value={data.numeracyAnswers.q1Working || ""}
        //           onChange={(e) =>
        //             handleNumeracyAnswer("q1Working", e.target.value)
        //           }
        //         />
        //       </div>

        //       <div className="mb-6">
        //         <p className="font-medium mb-2">
        //           2. Diesel costs $1.86 per liter. The tractor's fuel tank is empty.
        //           When full it holds 1200 litres. How much money would it cost to
        //           fill up the tractor with fuel? Show how you worked this out.
        //         </p>
        //         <input
        //           type="number"
        //           className="w-32 p-2 border rounded-md mr-4"
        //           value={data.numeracyAnswers.q2 || ""}
        //           onChange={(e) => handleNumeracyAnswer("q2", e.target.value)}
        //         />
        //         <textarea
        //           className="w-full p-2 border rounded-md mt-2"
        //           placeholder="Show your working..."
        //           value={data.numeracyAnswers.q2Working || ""}
        //           onChange={(e) =>
        //             handleNumeracyAnswer("q2Working", e.target.value)
        //           }
        //         />
        //       </div>

        //       <div className="mb-6">
        //         <p className="font-medium mb-2">
        //           3. The table below shows the average price of petrol per litre for
        //           the period July 2014 to June 2015. Read the information and then
        //           answer the questions that follow.
        //         </p>
        //         {renderNumeracyTable("q3")}
        //         <div className="space-y-2">
        //           {numeracyTables.q3.subQuestions.map((q, index) => (
        //             <div key={index}>
        //               <label className="block mb-1">{q}</label>
        //               <input
        //                 type="text"
        //                 className="w-full p-2 border rounded-md"
        //                 value={data.numeracyAnswers.q3?.[index] || ""}
        //                 onChange={(e) =>
        //                   handleNumeracyAnswer("q3", e.target.value, index)
        //                 }
        //               />
        //             </div>
        //           ))}
        //         </div>
        //       </div>

        //       <div className="mb-6">
        //         <p className="font-medium mb-2">
        //           4. Superstores are having a sale. All items have been reduced by
        //           30%. Complete the table to show the sale price of the items. Show
        //           how you worked out your answers.
        //         </p>
        //         {renderNumeracyTable("q4")}
        //       </div>

        //       <div className="mb-6">
        //         <p className="font-medium mb-2">
        //           5. The perimeter of a rectangle is 64m. What are three possible
        //           measurements for the length and width? What is the area of these
        //           rectangles?
        //         </p>
        //         {renderNumeracyTable("q5")}
        //       </div>

        //       <div className="mb-6">
        //         <p className="font-medium mb-2">
        //           6. Fill in the gaps in the following table. Simplify the fraction
        //           in column one. The first one has been done for you.
        //         </p>
        //         {renderNumeracyTable("q6")}
        //       </div>

        //       <div className="flex justify-between">
        //         <button
        //           onClick={() => setActivePart("reading")}
        //           className="bg-gray-300 px-4 py-2 rounded"
        //         >
        //           Back
        //         </button>
        //         <button
        //           onClick={() => handlePartComplete("numeracy")}
        //           className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700"
        //         >
        //           Complete Assessment
        //         </button>
        //       </div>
        //     </div>
        //   )}
        <div>
          <LLNAssessmentNumeracy data={data} onChange={onChange} />

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setActivePart("reading")}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              onClick={() => handlePartComplete("numeracy")}
              className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700"
            >
              Complete Assessment
            </button>
          </div>
        </div>
      )}

      {activePart === "complete" && (
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <h4 className="text-xl font-semibold text-green-700 mb-4">
            Assessment Complete!
          </h4>
          <p className="text-green-600">
            Your LLN assessment has been submitted successfully.
          </p>
        </div>
      )}
    </div>
  );
};

function LLNAssessmentNumeracy({ data, onChange }) {
  // Helper function to handle numeracy answers
  const handleNumeracyAnswer = (questionKey, value, rowIndex, cellIndex) => {
    const newAnswers = { ...data.numeracyAnswers };

    if (questionKey === "q1" || questionKey === "q2") {
      // Handle simple answer fields
      newAnswers[questionKey] = value;
    } else if (
      questionKey === "q1Working" ||
      questionKey === "q2Working" ||
      questionKey === "q4Working"
    ) {
      // Handle working text fields
      newAnswers[questionKey] = value;
    } else if (questionKey === "q3") {
      if (!newAnswers.q3) {
        newAnswers.q3 = Array(5).fill("");
      }
      newAnswers.q3[rowIndex] = value;
    } else if (questionKey === "q4") {
      if (!newAnswers.q4) {
        newAnswers.q4 = Array(5).fill("");
      }
      newAnswers.q4[rowIndex] = value;
    } else if (questionKey === "q5") {
      if (!newAnswers.q5) {
        newAnswers.q5 = Array(3)
          .fill()
          .map(() => ({
            length: "",
            width: "",
            area: "",
          }));
      }

      const fieldMap = ["length", "width", "area"];
      const field = fieldMap[cellIndex];

      if (!newAnswers.q5[rowIndex]) {
        newAnswers.q5[rowIndex] = { length: "", width: "", area: "" };
      }

      newAnswers.q5[rowIndex][field] = value;
    } else if (questionKey === "q6") {
      if (!newAnswers.q6) {
        newAnswers.q6 = Array(5)
          .fill()
          .map(() => ({
            fraction: "",
            decimal: "",
            percentage: "",
          }));
      }

      const fieldMap = ["fraction", "decimal", "percentage"];
      const field = fieldMap[cellIndex];

      if (!newAnswers.q6[rowIndex]) {
        newAnswers.q6[rowIndex] = { fraction: "", decimal: "", percentage: "" };
      }

      newAnswers.q6[rowIndex][field] = value;
    }

    onChange("llnAssessment", "numeracyAnswers", newAnswers);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h4 className="text-xl font-semibold text-emerald-700 mb-4">
        Part C - Numeracy
      </h4>

      {/* Question 1 */}
      <div className="mb-6">
        <p className="font-medium mb-2">
          1. A box holds 15 lettuces. At the end of the day the farm crew had
          filled 86 boxes. How many lettuces is that in total? Show how you
          worked this out.
        </p>
        <input
          type="number"
          className="w-32 p-2 border rounded-md mr-4"
          value={data.numeracyAnswers?.q1 || ""}
          onChange={(e) => handleNumeracyAnswer("q1", e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded-md mt-2"
          placeholder="Show your working..."
          value={data.numeracyAnswers?.q1Working || ""}
          onChange={(e) => handleNumeracyAnswer("q1Working", e.target.value)}
          rows={3}
        />
      </div>

      {/* Question 2 */}
      <div className="mb-6">
        <p className="font-medium mb-2">
          2. Diesel costs $1.86 per liter. The tractor's fuel tank is empty.
          When full it holds 1200 litres. How much money would it cost to fill
          up the tractor with fuel? Show how you worked this out.
        </p>
        <input
          type="number"
          className="w-32 p-2 border rounded-md mr-4"
          value={data.numeracyAnswers?.q2 || ""}
          onChange={(e) => handleNumeracyAnswer("q2", e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded-md mt-2"
          placeholder="Show your working..."
          value={data.numeracyAnswers?.q2Working || ""}
          onChange={(e) => handleNumeracyAnswer("q2Working", e.target.value)}
          rows={3}
        />
      </div>

      {/* Question 3 */}
      <div className="mb-6">
        <p className="font-medium mb-2">
          3. The table below shows the average price of petrol per litre for the
          period July 2014 to June 2015. Read the information and then answer
          the questions that follow.
        </p>

        {/* Custom Table for Question 3 */}
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Month</th>
                <th className="p-2 border">Average price/litre</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">July 2014</td>
                <td className="p-2 border">1.14</td>
              </tr>
              <tr>
                <td className="p-2 border">August 2014</td>
                <td className="p-2 border">1.15</td>
              </tr>
              <tr>
                <td className="p-2 border">September 2014</td>
                <td className="p-2 border">1.13</td>
              </tr>
              <tr>
                <td className="p-2 border">October 2014</td>
                <td className="p-2 border">1.18</td>
              </tr>
              <tr>
                <td className="p-2 border">November 2014</td>
                <td className="p-2 border">1.20</td>
              </tr>
              <tr>
                <td className="p-2 border">December 2014</td>
                <td className="p-2 border">1.22</td>
              </tr>
              <tr>
                <td className="p-2 border">January 2015</td>
                <td className="p-2 border">1.26</td>
              </tr>
              <tr>
                <td className="p-2 border">February 2015</td>
                <td className="p-2 border">1.23</td>
              </tr>
              <tr>
                <td className="p-2 border">March 2015</td>
                <td className="p-2 border">1.24</td>
              </tr>
              <tr>
                <td className="p-2 border">April 2015</td>
                <td className="p-2 border">1.23</td>
              </tr>
              <tr>
                <td className="p-2 border">May 2015</td>
                <td className="p-2 border">1.27</td>
              </tr>
              <tr>
                <td className="p-2 border">June 2015</td>
                <td className="p-2 border">1.30</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-2">
          <div>
            <label className="block mb-1">
              a) In which month was the petrol price the lowest?
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={data.numeracyAnswers?.q3?.[0] || ""}
              onChange={(e) => handleNumeracyAnswer("q3", e.target.value, 0)}
            />
          </div>
          <div>
            <label className="block mb-1">
              b) In which two months was the price of petrol the same?
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={data.numeracyAnswers?.q3?.[1] || ""}
              onChange={(e) => handleNumeracyAnswer("q3", e.target.value, 1)}
            />
          </div>
          <div>
            <label className="block mb-1">
              c) In which month was the price of petrol the highest?
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={data.numeracyAnswers?.q3?.[2] || ""}
              onChange={(e) => handleNumeracyAnswer("q3", e.target.value, 2)}
            />
          </div>
          <div>
            <label className="block mb-1">
              d) In which month did the price of petrol increase the most?
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={data.numeracyAnswers?.q3?.[3] || ""}
              onChange={(e) => handleNumeracyAnswer("q3", e.target.value, 3)}
            />
          </div>
          <div>
            <label className="block mb-1">
              e) What was the general trend in the price of petrol over this
              12-months?
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={data.numeracyAnswers?.q3?.[4] || ""}
              onChange={(e) => handleNumeracyAnswer("q3", e.target.value, 4)}
            />
          </div>
        </div>
      </div>

      {/* Question 4 */}
      <div className="mb-6">
        <p className="font-medium mb-2">
          4. Superstores are having a sale. All items have been reduced by 30%.
          Complete the table to show the sale price of the items. Show how you
          worked out your answers.
        </p>

        {/* Custom Table for Question 4 */}
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Item</th>
                <th className="p-2 border">Normal price</th>
                <th className="p-2 border">Sale price – 30% off</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">Men's woollen socks</td>
                <td className="p-2 border">2 pair pack for $20.00</td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q4?.[0] || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q4", e.target.value, 0)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 border">Children's Pajamas</td>
                <td className="p-2 border">$18.00</td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q4?.[1] || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q4", e.target.value, 1)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 border">Women's jumpers</td>
                <td className="p-2 border">$35.00</td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q4?.[2] || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q4", e.target.value, 2)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 border">Sports shoes</td>
                <td className="p-2 border">$50.00</td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q4?.[3] || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q4", e.target.value, 3)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 border">Football scarves</td>
                <td className="p-2 border">$22.00</td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q4?.[4] || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q4", e.target.value, 4)
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Show your working..."
            value={data.numeracyAnswers?.q4Working || ""}
            onChange={(e) => handleNumeracyAnswer("q4Working", e.target.value)}
            rows={3}
          />
        </div>
      </div>

      {/* Question 5 */}
      <div className="mb-6">
        <p className="font-medium mb-2">
          5. The perimeter of a rectangle is 64m. What are three possible
          measurements for the length and width? What is the area of these
          rectangles?
        </p>

        {/* Custom Table for Question 5 */}
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Answer number</th>
                <th className="p-2 border">Length</th>
                <th className="p-2 border">Width</th>
                <th className="p-2 border">Area in Square Meter</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">a)</td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q5?.[0]?.length || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q5", e.target.value, 0, 0)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q5?.[0]?.width || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q5", e.target.value, 0, 1)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q5?.[0]?.area || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q5", e.target.value, 0, 2)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 border">b)</td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q5?.[1]?.length || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q5", e.target.value, 1, 0)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q5?.[1]?.width || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q5", e.target.value, 1, 1)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q5?.[1]?.area || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q5", e.target.value, 1, 2)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 border">c)</td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q5?.[2]?.length || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q5", e.target.value, 2, 0)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q5?.[2]?.width || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q5", e.target.value, 2, 1)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q5?.[2]?.area || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q5", e.target.value, 2, 2)
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Question 6 */}
      <div className="mb-6">
        <p className="font-medium mb-2">
          6. Fill in the gaps in the following table. Simplify the fraction in
          column one. The first one has been done for you.
        </p>

        {/* Custom Table for Question 6 */}
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Fraction</th>
                <th className="p-2 border">Decimal</th>
                <th className="p-2 border">Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">1/10</td>
                <td className="p-2 border">0.1</td>
                <td className="p-2 border">10%</td>
              </tr>
              <tr>
                <td className="p-2 border">1/5</td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q6?.[1]?.decimal || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q6", e.target.value, 1, 1)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q6?.[1]?.percentage || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q6", e.target.value, 1, 2)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q6?.[2]?.fraction || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q6", e.target.value, 2, 0)
                    }
                  />
                </td>
                <td className="p-2 border">0.7</td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q6?.[2]?.percentage || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q6", e.target.value, 2, 2)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q6?.[3]?.fraction || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q6", e.target.value, 3, 0)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q6?.[3]?.decimal || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q6", e.target.value, 3, 1)
                    }
                  />
                </td>
                <td className="p-2 border">65%</td>
              </tr>
              <tr>
                <td className="p-2 border">16/25</td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q6?.[4]?.decimal || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q6", e.target.value, 4, 1)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={data.numeracyAnswers?.q6?.[4]?.percentage || ""}
                    onChange={(e) =>
                      handleNumeracyAnswer("q6", e.target.value, 4, 2)
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
