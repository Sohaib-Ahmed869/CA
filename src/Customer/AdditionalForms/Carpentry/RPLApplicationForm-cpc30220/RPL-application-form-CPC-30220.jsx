import React, { useEffect, useState } from "react";
import Navbar from "../../../components/navbar";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const URL = import.meta.env.VITE_REACT_BACKEND_URL;
import SpinnerLoader from "../../../components/spinnerLoader";

const RPLApplicationFormCPC30220 = () => {
  const [activeSection, setActiveSection] = useState(1);
  const totalSections = 22; // Total number of sections
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    personalDetails: {
      title: "",
      gender: "",
      surname: "",
      firstName: "",
      middleName: "",
      preferredName: "",
      dateOfBirth: "",
    },
    contactDetails: {
      homePhone: "",
      mobilePhone: "",
      email: "",
      workPhone: "",
      preferredContactMethod: "",
    },
    emergencyContact: {
      name: "",
      relationship: "",
      homePhone: "",
      mobilePhone: "",
      workPhone: "",
    },
    addressDetails: {
      buildingName: "",
      unitNumber: "",
      streetNo: "",
      streetName: "",
      city: "",
      state: "",
      postcode: "",
      sameAsResidential: false,
      postalBuildingName: "",
      postalUnitNumber: "",
      postalStreetNo: "",
      postalPOBox: "",
      postalStreetName: "",
      postalCity: "",
      postalState: "",
      postalPostcode: "",
    },
    workplaceDetails: {
      tradingName: "",
      contactName: "",
      supervisorName: "",
      tradingAddress: "",
      phone: "",
      email: "",
    },
    culturalDiversity: {
      aboriginalOrigin: "",
      countryOfBirth: "",
      otherCountry: "",
      speakOtherLanguage: "",
      otherLanguage: "",
      englishProficiency: "",
    },
    usi: {
      haveUSI: false,
      usiNumber: "",
      allowCreation: false,
    },
    education: {
      stillAtSchool: false,
      highestSchoolLevel: "",
      yearCompleted: "",
      currentSchool: "",
      previousSchool: "",
    },
    employment: {
      status: "",
      employedAt: "",
      employeeCount: "",
    },
    occupation: {
      classification: "",
    },
    industry: {
      classification: "",
    },
    disability: {
      hasDisability: false,
      disabilityTypes: [],
      otherDisability: "",
    },
    previousQualifications: {
      hasCompleted: false,
      qualifications: [],
      otherQualification: "",
    },
    studyReason: "",
    contactSource: "",
    citizenshipStatus: "",
    program: "CPC30220 Certificate III in Carpentry",
    preTraining: {
      preTrainingFormCompleted: false,
      entryRequirementsDiscussed: false,
      lLNAssessmentCompleted: false,
      creditTransferDiscussed: false,
      deliveryModeDiscussed: false,
      locationDiscussed: false,
      rplDiscussed: false,
      feesDiscussed: false,
      refundPolicyDiscussed: false,
      studentQuestionsAnswered: false,
      readStudentHandbook: false,
      specialNeeds: "",
    },
    consent: {
      photoConsent: false,
      agreeToTerms: false, // Added this field
      signature: "", // Added this field
      signatureDate: "", // Added this field
    },
    rplArea: {
      courseApplying: "CPC30220 Certificate III in Carpentry",
    },
    referees: [
      {
        name: "",
        position: "",
        organization: "",
        phoneNumber: "",
        mobileNumber: "",
        email: "",
      },
      {
        name: "",
        position: "",
        organization: "",
        phoneNumber: "",
        mobileNumber: "",
        email: "",
      },
    ],
    employmentHistory: [
      {
        employer: "",
        periodFrom: "",
        periodTo: "",
        position: "",
        employmentType: "Full Time", // Default value
        duties: "",
      },
    ],
    studentHandbook: {
      checkedItems: {},
    },
    documentedEvidence: [],
  });
  const navigate = useNavigate();
  const [applicationId, setApplicationId] = useState("");
  useEffect(() => {
    const idFromUrl = window.location.pathname.split("/")[2];
    setApplicationId(idFromUrl);
    console.log("id passed", idFromUrl);
  }, []);

  // Updated handleInputChange function to handle different types of state updates
  const handleInputChange = (section, field, value) => {
    setFormData((prev) => {
      // If field is null, we're updating an entire array or object directly
      if (field === null) {
        return {
          ...prev,
          [section]: value,
        };
      }
      // Otherwise, update a specific field in a section
      return {
        ...prev,
        [section]:
          typeof prev[section] === "object"
            ? { ...prev[section], [field]: value }
            : value,
      };
    });
  };
  const handleArrayItemChange = (section, index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Add array item handler
  const addArrayItem = (section, emptyItem) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], emptyItem],
    }));
  };

  // Remove array item handler
  const removeArrayItem = (section, index) => {
    if (formData[section].length > 1) {
      setFormData((prev) => ({
        ...prev,
        [section]: prev[section].filter((_, i) => i !== index),
      }));
    }
  };

  const validateSection = (section) => {
    // Basic validation logic for each section
    switch (section) {
      case 1:
        return formData.rplArea.courseApplying.trim() !== "";
      case 2:
        return (
          formData.referees[0].name.trim() !== "" &&
          formData.referees[0].position.trim() !== ""
        );
      case 3:
        return (
          formData.employmentHistory[0].employer.trim() !== "" &&
          formData.employmentHistory[0].positionHeld.trim() !== ""
        );
      case 4:
        return true; // No required fields for documented evidence
      case 5:
        return (
          formData.personalDetails.firstName.trim() !== "" &&
          formData.personalDetails.surname.trim() !== ""
        );
      case 6:
        return (
          formData.contactDetails.email.trim() !== "" ||
          formData.contactDetails.mobilePhone.trim() !== ""
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    // if (validateSection(activeSection)) {
    setActiveSection((prev) => Math.min(prev + 1, totalSections));
    // } else {
    // toast.error("Please complete all required fields before proceeding.");
    // }
  };

  const handleBack = () => {
    setActiveSection((prev) => Math.max(prev - 1, 1));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission here
  //   toast.success("Form Submitted Successfully");
  //   console.log("Form submitted:", formData);
  //   // You might want to send the data to an API endpoint
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.consent.signature === "") {
      toast.error("please fill in all the fields");
      return;
    }
    setIsSubmitting(true);

    try {
      // Send request to mark application as submitted
      const response = await axios.post(
        `${URL}/api/form/submit-rpl-application-form`,
        {
          applicationId,
          formData,
        }
      );

      // Handle successful response
      if (response.status === 201) {
        toast.success("Form Submitted Successfully");
        navigate("/");
        console.log("Application marked as submitted");
        // You might want to redirect or update UI here
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error marking application as submitted:", error);
      toast.error(
        error.response?.data?.error ||
          "Failed to submit form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const progressPercentage = (activeSection / totalSections) * 100;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      {isSubmitting && <SpinnerLoader />}
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto pt-28 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-medium text-emerald-700">
              RPL Application - CPC30220 Certificate III in Carpentry
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

          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            {/* RPL Area Section */}
            {activeSection === 1 && (
              <RPLAreaSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}

            {/* Referees Section */}
            {activeSection === 2 && (
              <RefereesSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}

            {/* Employment History Section */}
            {activeSection === 3 && (
              <EmploymentHistorySection
                formData={formData}
                handleArrayItemChange={handleArrayItemChange}
                addArrayItem={addArrayItem}
                removeArrayItem={removeArrayItem}
              />
            )}

            {/* Documented Evidence Section */}
            {activeSection === 4 && (
              <DocumentedEvidenceSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}

            {/* Personal Details Section */}
            {activeSection === 5 && (
              <PersonalDetailsSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}

            {/* Contact Details Section */}
            {activeSection === 6 && (
              <ContactDetailsSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            {activeSection === 7 && (
              <AddressDetailsSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            {activeSection === 8 && (
              <WorkplaceDetailsSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            {activeSection === 9 && (
              <CulturalDiversitySection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            {activeSection === 10 && (
              <USISection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            {activeSection === 11 && (
              <EducationDetailsSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            {activeSection === 12 && (
              <EmploymentStatusSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            {activeSection === 13 && (
              <OccupationSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            {activeSection === 14 && (
              <IndustrySection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            {activeSection === 15 && (
              <DisabilitySection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            {activeSection === 16 && (
              <PreviousQualificationsSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            {activeSection === 17 && (
              <StudyReasonSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            {activeSection === 18 && (
              <ContactSourceSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            {activeSection === 19 && (
              <StudentHandbookSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            {activeSection === 20 && (
              <CitizenshipStatusSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            {/* {activeSection === 16 && (
              <ProgramSelectionSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )} */}
            {activeSection === 21 && (
              <PreTrainingChecklistSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            {activeSection === 22 && (
              <ConsentSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}

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
          </form>
        </div>
      </div>
    </div>
  );
};

export default RPLApplicationFormCPC30220;

// RPL Area Section Component
const RPLAreaSection = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Recognition Area
      </h3>
      <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <h4 className="font-medium text-gray-800 mb-2 underline">
          Welcome Message
        </h4>
        <p className="mb-4">
          Welcome to the Recognition of Prior Learning (RPL) Kit. You can use
          this kit if you think you have the appropriate competence (skills,
          knowledge and attitude) contained within course objectives. Having
          competence means 'the ability to apply your knowledge and skills to
          perform your job or workplace task effectively'
        </p>
        <p>
          This kit has six sections/steps to complete the RPL application
          process:
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>
            <strong>Step 1:</strong> The Application process and RPL Application
            Form
          </li>
          <li>
            <strong>Step 2:</strong> Completing the RPL Self-Assessment
            Information Kit
          </li>
          <li>
            <strong>Step 3:</strong> RPL Competency Conversation Kit
          </li>
          <li>
            <strong>Step 4:</strong> RPL Demonstration and Observation Kit
          </li>
          <li>
            <strong>Step 5:</strong> Third-Party Evidence Kit
          </li>
          <li>
            <strong>Step 6:</strong> Finalisation of RPL Process
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label
            htmlFor="courseApplying"
            className="block text-gray-700 font-medium mb-2"
          >
            Course applying for recognition:
          </label>
          <input
            readOnly
            type="text"
            id="courseApplying"
            value={formData.rplArea.courseApplying}
            // onChange={(e) =>
            //   handleInputChange("rplArea", "courseApplying", e.target.value)
            // }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
            placeholder="CPC30220 Certificate III in Carpentry"
          />
        </div>
      </div>
    </div>
  );
};

// Referees Section Component
const RefereesSection = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Professional Referees (relevant to work situation)
      </h3>

      {/* First Referee */}
      <div className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-md">
        <h4 className="font-medium text-gray-800 mb-4">Referee 1</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Name:
            </label>
            <input
              type="text"
              value={formData.referees[0].name}
              onChange={(e) => {
                const updatedReferees = [...formData.referees];
                updatedReferees[0] = {
                  ...updatedReferees[0],
                  name: e.target.value,
                };
                handleInputChange("referees", null, updatedReferees);
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Position:
            </label>
            <input
              type="text"
              value={formData.referees[0].position}
              onChange={(e) => {
                const updatedReferees = [...formData.referees];
                updatedReferees[0] = {
                  ...updatedReferees[0],
                  position: e.target.value,
                };
                handleInputChange("referees", null, updatedReferees);
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Organisation:
            </label>
            <input
              type="text"
              value={formData.referees[0].organization}
              onChange={(e) => {
                const updatedReferees = [...formData.referees];
                updatedReferees[0] = {
                  ...updatedReferees[0],
                  organization: e.target.value,
                };
                handleInputChange("referees", null, updatedReferees);
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number:
            </label>
            <input
              type="tel"
              value={formData.referees[0].phoneNumber}
              onChange={(e) => {
                const updatedReferees = [...formData.referees];
                updatedReferees[0] = {
                  ...updatedReferees[0],
                  phoneNumber: e.target.value,
                };
                handleInputChange("referees", null, updatedReferees);
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mobile Number:
            </label>
            <input
              type="tel"
              value={formData.referees[0].mobileNumber}
              onChange={(e) => {
                const updatedReferees = [...formData.referees];
                updatedReferees[0] = {
                  ...updatedReferees[0],
                  mobileNumber: e.target.value,
                };
                handleInputChange("referees", null, updatedReferees);
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address:
            </label>
            <input
              type="email"
              value={formData.referees[0].email}
              onChange={(e) => {
                const updatedReferees = [...formData.referees];
                updatedReferees[0] = {
                  ...updatedReferees[0],
                  email: e.target.value,
                };
                handleInputChange("referees", null, updatedReferees);
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>
      </div>

      {/* Second Referee */}
      <div className="p-6 bg-gray-50 border border-gray-200 rounded-md">
        <h4 className="font-medium text-gray-800 mb-4">Referee 2</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Name:
            </label>
            <input
              type="text"
              value={formData.referees[1].name}
              onChange={(e) => {
                const updatedReferees = [...formData.referees];
                updatedReferees[1] = {
                  ...updatedReferees[1],
                  name: e.target.value,
                };
                handleInputChange("referees", null, updatedReferees);
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Position:
            </label>
            <input
              type="text"
              value={formData.referees[1].position}
              onChange={(e) => {
                const updatedReferees = [...formData.referees];
                updatedReferees[1] = {
                  ...updatedReferees[1],
                  position: e.target.value,
                };
                handleInputChange("referees", null, updatedReferees);
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Organisation:
            </label>
            <input
              type="text"
              value={formData.referees[1].organization}
              onChange={(e) => {
                const updatedReferees = [...formData.referees];
                updatedReferees[1] = {
                  ...updatedReferees[1],
                  organization: e.target.value,
                };
                handleInputChange("referees", null, updatedReferees);
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number:
            </label>
            <input
              type="tel"
              value={formData.referees[1].phoneNumber}
              onChange={(e) => {
                const updatedReferees = [...formData.referees];
                updatedReferees[1] = {
                  ...updatedReferees[1],
                  phoneNumber: e.target.value,
                };
                handleInputChange("referees", null, updatedReferees);
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mobile Number:
            </label>
            <input
              type="tel"
              value={formData.referees[1].mobileNumber}
              onChange={(e) => {
                const updatedReferees = [...formData.referees];
                updatedReferees[1] = {
                  ...updatedReferees[1],
                  mobileNumber: e.target.value,
                };
                handleInputChange("referees", null, updatedReferees);
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address:
            </label>
            <input
              type="email"
              value={formData.referees[1].email}
              onChange={(e) => {
                const updatedReferees = [...formData.referees];
                updatedReferees[1] = {
                  ...updatedReferees[1],
                  email: e.target.value,
                };
                handleInputChange("referees", null, updatedReferees);
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Employment History Section Component
// const EmploymentHistorySection = ({ formData, handleInputChange }) => {
//   return (
//     <div>
//       <h3 className="text-xl font-medium text-emerald-700 mb-6">
//         Applicant Employment History
//       </h3>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200 mb-4">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//                 Name, Address and Phone number of Employers
//               </th>
//               <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//                 Period of Employment (DD/MM/YYYY)
//               </th>
//               <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//                 Position Held
//               </th>
//               <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//                 Employment Type
//               </th>
//               <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//                 Description of Major Duties
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {formData.employmentHistory.map((job, index) => (
//               <tr key={index} className="border-t border-gray-200">
//                 <td className="py-3 px-4">
//                   <input
//                     type="text"
//                     value={job.employer}
//                     onChange={(e) => {
//                       const updatedHistory = [...formData.employmentHistory];
//                       updatedHistory[index] = {
//                         ...updatedHistory[index],
//                         employer: e.target.value,
//                       };
//                       handleInputChange(
//                         "employmentHistory",
//                         null,
//                         updatedHistory
//                       );
//                     }}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
//                     placeholder="Employer details"
//                   />
//                 </td>
//                 <td className="py-3 px-4">
//                   <div className="flex space-x-2">
//                     <div>
//                       <label className="block text-xs text-gray-500">
//                         From
//                       </label>
//                       <input
//                         type="date"
//                         value={job.fromDate}
//                         onChange={(e) => {
//                           const updatedHistory = [
//                             ...formData.employmentHistory,
//                           ];
//                           updatedHistory[index] = {
//                             ...updatedHistory[index],
//                             fromDate: e.target.value,
//                           };
//                           handleInputChange(
//                             "employmentHistory",
//                             null,
//                             updatedHistory
//                           );
//                         }}
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs text-gray-500">To</label>
//                       <input
//                         type="date"
//                         value={job.toDate}
//                         onChange={(e) => {
//                           const updatedHistory = [
//                             ...formData.employmentHistory,
//                           ];
//                           updatedHistory[index] = {
//                             ...updatedHistory[index],
//                             toDate: e.target.value,
//                           };
//                           handleInputChange(
//                             "employmentHistory",
//                             null,
//                             updatedHistory
//                           );
//                         }}
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
//                       />
//                     </div>
//                   </div>
//                 </td>
//                 <td className="py-3 px-4">
//                   <input
//                     type="text"
//                     value={job.positionHeld}
//                     onChange={(e) => {
//                       const updatedHistory = [...formData.employmentHistory];
//                       updatedHistory[index] = {
//                         ...updatedHistory[index],
//                         positionHeld: e.target.value,
//                       };
//                       handleInputChange(
//                         "employmentHistory",
//                         null,
//                         updatedHistory
//                       );
//                     }}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
//                     placeholder="Position held"
//                   />
//                 </td>
//                 <td className="py-3 px-4">
//                   <select
//                     value={job.employmentType}
//                     onChange={(e) => {
//                       const updatedHistory = [...formData.employmentHistory];
//                       updatedHistory[index] = {
//                         ...updatedHistory[index],
//                         employmentType: e.target.value,
//                       };
//                       handleInputChange(
//                         "employmentHistory",
//                         null,
//                         updatedHistory
//                       );
//                     }}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
//                   >
//                     <option value="">Select</option>
//                     <option value="Full Time">Full Time</option>
//                     <option value="Part Time">Part Time</option>
//                     <option value="Casual">Casual</option>
//                   </select>
//                 </td>
//                 <td className="py-3 px-4">
//                   <textarea
//                     value={job.duties}
//                     onChange={(e) => {
//                       const updatedHistory = [...formData.employmentHistory];
//                       updatedHistory[index] = {
//                         ...updatedHistory[index],
//                         duties: e.target.value,
//                       };
//                       handleInputChange(
//                         "employmentHistory",
//                         null,
//                         updatedHistory
//                       );
//                     }}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
//                     placeholder="Description of duties"
//                     rows="2"
//                   ></textarea>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="text-sm text-gray-500 italic">
//         *Attach additional sheet if required
//       </div>
//     </div>
//   );
// };
const EmploymentHistorySection = ({
  formData,
  handleArrayItemChange,
  addArrayItem,
  removeArrayItem,
}) => {
  const emptyEmploymentRecord = {
    employer: "",
    periodFrom: "",
    periodTo: "",
    position: "",
    employmentType: "Full Time",
    duties: "",
  };

  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Employment History
      </h3>
      <p className="text-gray-600 mb-4">
        Please provide details of your employment history relevant to this
        application.
      </p>

      {formData.employmentHistory.map((employment, index) => (
        <div key={index} className="mb-8 p-4 border border-gray-200 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-emerald-700">
              Employment Record {index + 1}
            </h4>
            {formData.employmentHistory.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem("employmentHistory", index)}
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">
                Name, Address and Phone number of Employer{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={employment.employer}
                onChange={(e) =>
                  handleArrayItemChange(
                    "employmentHistory",
                    index,
                    "employer",
                    e.target.value
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Period From <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={employment.periodFrom}
                  onChange={(e) =>
                    handleArrayItemChange(
                      "employmentHistory",
                      index,
                      "periodFrom",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Period To <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={employment.periodTo}
                  onChange={(e) =>
                    handleArrayItemChange(
                      "employmentHistory",
                      index,
                      "periodTo",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Position Held <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={employment.position}
                onChange={(e) =>
                  handleArrayItemChange(
                    "employmentHistory",
                    index,
                    "position",
                    e.target.value
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Employment Type
              </label>
              <select
                value={employment.employmentType}
                onChange={(e) =>
                  handleArrayItemChange(
                    "employmentHistory",
                    index,
                    "employmentType",
                    e.target.value
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part-time">Part-time</option>
                <option value="Casual">Casual</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">
                Description of Major Duties{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={employment.duties}
                onChange={(e) =>
                  handleArrayItemChange(
                    "employmentHistory",
                    index,
                    "duties",
                    e.target.value
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows="4"
                required
              ></textarea>
            </div>
          </div>
        </div>
      ))}

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() =>
            addArrayItem("employmentHistory", emptyEmploymentRecord)
          }
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          Add Another Employment Record
        </button>
      </div>
    </div>
  );
};

// DocumentedEvidenceSection Component
const DocumentedEvidenceSection = ({ formData, handleInputChange }) => {
  const [evidenceItems, setEvidenceItems] = useState(
    formData.documentedEvidence || []
  );

  const addEvidenceItem = () => {
    const newItem = { description: "", assessorNotes: "" };
    const updatedItems = [...evidenceItems, newItem];
    setEvidenceItems(updatedItems);
    handleInputChange("documentedEvidence", null, updatedItems);
  };

  const updateEvidenceItem = (index, field, value) => {
    const updatedItems = [...evidenceItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setEvidenceItems(updatedItems);
    handleInputChange("documentedEvidence", null, updatedItems);
  };

  const removeEvidenceItem = (index) => {
    const updatedItems = evidenceItems.filter((_, i) => i !== index);
    setEvidenceItems(updatedItems);
    handleInputChange("documentedEvidence", null, updatedItems);
  };

  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Documented Evidence
      </h3>
      <p className="mb-4 text-gray-600">
        If you are including documents in your application, please provide a
        brief description below. If you have an Australian Qualification or
        Statement of Attainment, please attach a verified copy.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
        {evidenceItems.length === 0 ? (
          <p className="text-gray-500 italic mb-4">
            No evidence items added yet.
          </p>
        ) : (
          <div className="space-y-4 mb-4">
            {evidenceItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 pb-4 border-b border-gray-200"
              >
                <div className="flex-grow">
                  <label className="block text-gray-700 font-medium mb-2">
                    Document Description
                  </label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      updateEvidenceItem(index, "description", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. Qualifications, Resume, Photos, Awards, Certificates etc."
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeEvidenceItem(index)}
                  className="mt-8 px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={addEvidenceItem}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 flex items-center"
        >
          <span className="mr-1">+</span> Add Evidence Item
        </button>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h4 className="font-medium text-gray-800 mb-2">Upload Documents</h4>
        <p className="text-gray-600 mb-4">
          Please upload scanned copies of your evidence documents. Accepted
          formats: PDF, JPG, PNG (max 5MB per file)
        </p>
        <input
          type="file"
          multiple
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <p className="text-sm text-gray-500 mt-2">
          Note: Original documents may need to be presented during the
          verification process.
        </p>
      </div>
    </div>
  );
};

// PersonalDetailsSection Component
const PersonalDetailsSection = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Personal Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title:</label>
          <select
            value={formData.personalDetails.title}
            onChange={(e) =>
              handleInputChange("personalDetails", "title", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select</option>
            <option value="Mr">Mr</option>
            <option value="Miss">Miss</option>
            <option value="Ms">Ms</option>
            <option value="Mrs">Mrs</option>
            <option value="Dr">Dr</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">
            Gender:
          </label>
          <div className="flex space-x-4 mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="Male"
                checked={formData.personalDetails.gender === "Male"}
                onChange={(e) =>
                  handleInputChange("personalDetails", "gender", e.target.value)
                }
                className="form-radio h-5 w-5 text-emerald-600"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="Female"
                checked={formData.personalDetails.gender === "Female"}
                onChange={(e) =>
                  handleInputChange("personalDetails", "gender", e.target.value)
                }
                className="form-radio h-5 w-5 text-emerald-600"
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Surname: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.personalDetails.surname}
            onChange={(e) =>
              handleInputChange("personalDetails", "surname", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            If Single Name only, enter here
          </p>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            First Name: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.personalDetails.firstName}
            onChange={(e) =>
              handleInputChange("personalDetails", "firstName", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Middle Name(s):
          </label>
          <input
            type="text"
            value={formData.personalDetails.middleName}
            onChange={(e) =>
              handleInputChange("personalDetails", "middleName", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Preferred Name:
          </label>
          <input
            type="text"
            value={formData.personalDetails.preferredName}
            onChange={(e) =>
              handleInputChange(
                "personalDetails",
                "preferredName",
                e.target.value
              )
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Date of Birth: <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={formData.personalDetails.dateOfBirth}
          onChange={(e) =>
            handleInputChange("personalDetails", "dateOfBirth", e.target.value)
          }
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <h3 className="text-xl font-medium text-emerald-700 mb-6 mt-8">
        Address Details
      </h3>

      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-4">
          Usual Residential Address (Not a PO Box)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">
              Building/Property name:
            </label>
            <input
              type="text"
              value={formData.addressDetails.buildingName}
              onChange={(e) =>
                handleInputChange(
                  "addressDetails",
                  "buildingName",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">
                Flat/Unit Number:
              </label>
              <input
                type="text"
                value={formData.addressDetails.unitNumber}
                onChange={(e) =>
                  handleInputChange(
                    "addressDetails",
                    "unitNumber",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Street No:</label>
              <input
                type="text"
                value={formData.addressDetails.streetNo}
                onChange={(e) =>
                  handleInputChange(
                    "addressDetails",
                    "streetNo",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-1">
            <label className="block text-gray-700 mb-1">Street Name:</label>
            <input
              type="text"
              value={formData.addressDetails.streetName}
              onChange={(e) =>
                handleInputChange(
                  "addressDetails",
                  "streetName",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">City/Town:</label>
            <input
              type="text"
              value={formData.addressDetails.city}
              onChange={(e) =>
                handleInputChange("addressDetails", "city", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">State:</label>
              <select
                value={formData.addressDetails.state}
                onChange={(e) =>
                  handleInputChange("addressDetails", "state", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select</option>
                <option value="NSW">NSW</option>
                <option value="VIC">VIC</option>
                <option value="QLD">QLD</option>
                <option value="WA">WA</option>
                <option value="SA">SA</option>
                <option value="TAS">TAS</option>
                <option value="ACT">ACT</option>
                <option value="NT">NT</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Postcode:</label>
              <input
                type="text"
                value={formData.addressDetails.postcode}
                onChange={(e) =>
                  handleInputChange(
                    "addressDetails",
                    "postcode",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.addressDetails.sameAsResidential}
            onChange={(e) =>
              handleInputChange(
                "addressDetails",
                "sameAsResidential",
                e.target.checked
              )
            }
            className="form-checkbox h-5 w-5 text-emerald-600"
          />
          <span className="ml-2 text-gray-700">
            Postal address is same as residential address
          </span>
        </label>
      </div>

      {!formData.addressDetails.sameAsResidential && (
        <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-4">Postal Address</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">
                Building/Property name:
              </label>
              <input
                type="text"
                value={formData.addressDetails.postalBuildingName}
                onChange={(e) =>
                  handleInputChange(
                    "addressDetails",
                    "postalBuildingName",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Flat/Unit:</label>
                <input
                  type="text"
                  value={formData.addressDetails.postalUnitNumber}
                  onChange={(e) =>
                    handleInputChange(
                      "addressDetails",
                      "postalUnitNumber",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Street No:</label>
                <input
                  type="text"
                  value={formData.addressDetails.postalStreetNo}
                  onChange={(e) =>
                    handleInputChange(
                      "addressDetails",
                      "postalStreetNo",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">PO Box:</label>
                <input
                  type="text"
                  value={formData.addressDetails.postalPOBox}
                  onChange={(e) =>
                    handleInputChange(
                      "addressDetails",
                      "postalPOBox",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="md:col-span-1">
              <label className="block text-gray-700 mb-1">Street Name:</label>
              <input
                type="text"
                value={formData.addressDetails.postalStreetName}
                onChange={(e) =>
                  handleInputChange(
                    "addressDetails",
                    "postalStreetName",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">City/Town:</label>
              <input
                type="text"
                value={formData.addressDetails.postalCity}
                onChange={(e) =>
                  handleInputChange(
                    "addressDetails",
                    "postalCity",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">State:</label>
                <select
                  value={formData.addressDetails.postalState}
                  onChange={(e) =>
                    handleInputChange(
                      "addressDetails",
                      "postalState",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select</option>
                  <option value="NSW">NSW</option>
                  <option value="VIC">VIC</option>
                  <option value="QLD">QLD</option>
                  <option value="WA">WA</option>
                  <option value="SA">SA</option>
                  <option value="TAS">TAS</option>
                  <option value="ACT">ACT</option>
                  <option value="NT">NT</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Postcode:</label>
                <input
                  type="text"
                  value={formData.addressDetails.postalPostcode}
                  onChange={(e) =>
                    handleInputChange(
                      "addressDetails",
                      "postalPostcode",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ContactDetailsSection Component
const ContactDetailsSection = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Contact Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Home Phone:
          </label>
          <input
            type="tel"
            value={formData.contactDetails.homePhone}
            onChange={(e) =>
              handleInputChange("contactDetails", "homePhone", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Mobile Phone: <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.contactDetails.mobilePhone}
            onChange={(e) =>
              handleInputChange("contactDetails", "mobilePhone", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Email Address: <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.contactDetails.email}
            onChange={(e) =>
              handleInputChange("contactDetails", "email", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Work Phone:
          </label>
          <input
            type="tel"
            value={formData.contactDetails.workPhone}
            onChange={(e) =>
              handleInputChange("contactDetails", "workPhone", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Preferred Contact Method:
        </label>
        <div className="flex flex-wrap gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="Mobile"
              checked={
                formData.contactDetails.preferredContactMethod === "Mobile"
              }
              onChange={(e) =>
                handleInputChange(
                  "contactDetails",
                  "preferredContactMethod",
                  e.target.value
                )
              }
              className="form-radio h-5 w-5 text-emerald-600"
            />
            <span className="ml-2">via Mobile Phone</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="Email"
              checked={
                formData.contactDetails.preferredContactMethod === "Email"
              }
              onChange={(e) =>
                handleInputChange(
                  "contactDetails",
                  "preferredContactMethod",
                  e.target.value
                )
              }
              className="form-radio h-5 w-5 text-emerald-600"
            />
            <span className="ml-2">via Email</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="Post"
              checked={
                formData.contactDetails.preferredContactMethod === "Post"
              }
              onChange={(e) =>
                handleInputChange(
                  "contactDetails",
                  "preferredContactMethod",
                  e.target.value
                )
              }
              className="form-radio h-5 w-5 text-emerald-600"
            />
            <span className="ml-2">via Post</span>
          </label>
        </div>
      </div>

      <h3 className="text-xl font-medium text-emerald-700 mb-6 mt-8">
        Emergency Contact
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Name: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.emergencyContact.name}
            onChange={(e) =>
              handleInputChange("emergencyContact", "name", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Relationship: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.emergencyContact.relationship}
            onChange={(e) =>
              handleInputChange(
                "emergencyContact",
                "relationship",
                e.target.value
              )
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Home Phone:
          </label>
          <input
            type="tel"
            value={formData.emergencyContact.homePhone}
            onChange={(e) =>
              handleInputChange("emergencyContact", "homePhone", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Mobile Phone: <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.emergencyContact.mobilePhone}
            onChange={(e) =>
              handleInputChange(
                "emergencyContact",
                "mobilePhone",
                e.target.value
              )
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Work Phone:
          </label>
          <input
            type="tel"
            value={formData.emergencyContact.workPhone}
            onChange={(e) =>
              handleInputChange("emergencyContact", "workPhone", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>
      {/* 
      <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-md">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Declaration and Consent
        </h3>

        <div className="space-y-4">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={formData.consent.photoConsent}
              onChange={(e) =>
                handleInputChange("consent", "photoConsent", e.target.checked)
              }
              className="form-checkbox h-5 w-5 text-emerald-600 mt-1"
            />
            <span className="ml-2 text-gray-700">
              I consent to the RTO occasionally taking photos of students
              participating in classes for publicity purposes. These photos may
              be displayed on the website. The names and details of the people
              in the photos are not released or published. Staff will always
              identify when they are taking photos so students who don't wish to
              have their photo taken can be excluded from the photo.
            </span>
          </label>

          <label className="flex items-start">
            <input
              type="checkbox"
              checked={formData.preTraining.readStudentHandbook}
              onChange={(e) =>
                handleInputChange(
                  "preTraining",
                  "readStudentHandbook",
                  e.target.checked
                )
              }
              className="form-checkbox h-5 w-5 text-emerald-600 mt-1"
            />
            <span className="ml-2 text-gray-700">
              I declare that I have read and understood RTO student handbook and
              their policies & procedures.
            </span>
          </label>

          <label className="flex items-start">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-emerald-600 mt-1"
              required
            />
            <span className="ml-2 text-gray-700">
              I declare that the information I have provided on this enrolment
              form is true and accurate, and understand that providing false
              information may affect my eligibility to obtain government
              funding.
            </span>
          </label>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-2">
            By submitting this form, you acknowledge that you have completed all
            questions truthfully and agree to be bound by the RTO's Student Code
            of Conduct, regulations, policies and disciplinary procedures.
          </p>
        </div>
      </div> */}
    </div>
  );
};
const AddressDetailsSection = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Address Details
      </h3>

      {/* Residential Address Used While Studying */}
      <h4 className="text-lg font-medium text-gray-700 mb-4">
        RESIDENTIAL ADDRESS USED WHILE STUDYING
        <span className="text-sm font-normal text-gray-500">
          {" "}
          (if different to Usual Residential Address)
        </span>
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Building/Property name:
          </label>
          <input
            type="text"
            value={formData.addressDetails.studyBuildingName}
            onChange={(e) =>
              handleInputChange(
                "addressDetails",
                "studyBuildingName",
                e.target.value
              )
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Flat/Unit Number:
          </label>
          <input
            type="text"
            value={formData.addressDetails.studyUnitNumber}
            onChange={(e) =>
              handleInputChange(
                "addressDetails",
                "studyUnitNumber",
                e.target.value
              )
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Street No:
          </label>
          <input
            type="text"
            value={formData.addressDetails.studyStreetNo}
            onChange={(e) =>
              handleInputChange(
                "addressDetails",
                "studyStreetNo",
                e.target.value
              )
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Street Name:
          </label>
          <input
            type="text"
            value={formData.addressDetails.studyStreetName}
            onChange={(e) =>
              handleInputChange(
                "addressDetails",
                "studyStreetName",
                e.target.value
              )
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            City/Town:
          </label>
          <input
            type="text"
            value={formData.addressDetails.studyCity}
            onChange={(e) =>
              handleInputChange("addressDetails", "studyCity", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">State:</label>
          <select
            value={formData.addressDetails.studyState}
            onChange={(e) =>
              handleInputChange("addressDetails", "studyState", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Please select</option>
            <option value="NSW">NSW</option>
            <option value="VIC">VIC</option>
            <option value="QLD">QLD</option>
            <option value="WA">WA</option>
            <option value="SA">SA</option>
            <option value="TAS">TAS</option>
            <option value="NT">NT</option>
            <option value="ACT">ACT</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Postcode:
          </label>
          <input
            type="text"
            value={formData.addressDetails.studyPostcode}
            onChange={(e) =>
              handleInputChange(
                "addressDetails",
                "studyPostcode",
                e.target.value
              )
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            maxLength="4"
          />
        </div>
      </div>
    </div>
  );
};
const WorkplaceDetailsSection = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Workplace Employer Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Trading Name:
          </label>
          <input
            type="text"
            value={formData.workplaceDetails.tradingName}
            onChange={(e) =>
              handleInputChange(
                "workplaceDetails",
                "tradingName",
                e.target.value
              )
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Contact Name:
          </label>
          <input
            type="text"
            value={formData.workplaceDetails.contactName}
            onChange={(e) =>
              handleInputChange(
                "workplaceDetails",
                "contactName",
                e.target.value
              )
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Supervisor Name:
        </label>
        <input
          type="text"
          value={formData.workplaceDetails.supervisorName}
          onChange={(e) =>
            handleInputChange(
              "workplaceDetails",
              "supervisorName",
              e.target.value
            )
          }
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Trading Address:
        </label>
        <textarea
          value={formData.workplaceDetails.tradingAddress}
          onChange={(e) =>
            handleInputChange(
              "workplaceDetails",
              "tradingAddress",
              e.target.value
            )
          }
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          rows="3"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Phone:</label>
          <input
            type="tel"
            value={formData.workplaceDetails.phone}
            onChange={(e) =>
              handleInputChange("workplaceDetails", "phone", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Employer Email:
          </label>
          <input
            type="email"
            value={formData.workplaceDetails.email}
            onChange={(e) =>
              handleInputChange("workplaceDetails", "email", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>
    </div>
  );
};
const CulturalDiversitySection = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Language and Cultural Diversity
      </h3>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Are you of Aboriginal/Torres Strait Islander origin?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="No"
              checked={formData.culturalDiversity.aboriginalOrigin === "No"}
              onChange={(e) =>
                handleInputChange(
                  "culturalDiversity",
                  "aboriginalOrigin",
                  e.target.value
                )
              }
              className="form-radio h-5 w-5 text-emerald-600"
            />
            <span className="ml-2">No</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="Yes, Torres Strait Islander"
              checked={
                formData.culturalDiversity.aboriginalOrigin ===
                "Yes, Torres Strait Islander"
              }
              onChange={(e) =>
                handleInputChange(
                  "culturalDiversity",
                  "aboriginalOrigin",
                  e.target.value
                )
              }
              className="form-radio h-5 w-5 text-emerald-600"
            />
            <span className="ml-2">Yes, Torres Strait Islander</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="Yes, Aboriginal"
              checked={
                formData.culturalDiversity.aboriginalOrigin ===
                "Yes, Aboriginal"
              }
              onChange={(e) =>
                handleInputChange(
                  "culturalDiversity",
                  "aboriginalOrigin",
                  e.target.value
                )
              }
              className="form-radio h-5 w-5 text-emerald-600"
            />
            <span className="ml-2">Yes, Aboriginal</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="Yes, Aboriginal & T.S. Islander"
              checked={
                formData.culturalDiversity.aboriginalOrigin ===
                "Yes, Aboriginal & T.S. Islander"
              }
              onChange={(e) =>
                handleInputChange(
                  "culturalDiversity",
                  "aboriginalOrigin",
                  e.target.value
                )
              }
              className="form-radio h-5 w-5 text-emerald-600"
            />
            <span className="ml-2">Yes, Aboriginal & T.S. Islander</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          In which country were you born?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="Australia"
              checked={
                formData.culturalDiversity.countryOfBirth === "Australia"
              }
              onChange={(e) => {
                handleInputChange(
                  "culturalDiversity",
                  "countryOfBirth",
                  e.target.value
                );
                handleInputChange("culturalDiversity", "otherCountry", "");
              }}
              className="form-radio h-5 w-5 text-emerald-600"
            />
            <span className="ml-2">Australia</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="Other"
              checked={formData.culturalDiversity.countryOfBirth === "Other"}
              onChange={(e) =>
                handleInputChange(
                  "culturalDiversity",
                  "countryOfBirth",
                  e.target.value
                )
              }
              className="form-radio h-5 w-5 text-emerald-600"
            />
            <span className="ml-2">Other (please specify below)</span>
          </label>
        </div>
        {formData.culturalDiversity.countryOfBirth === "Other" && (
          <div className="mt-4 pl-6">
            <input
              type="text"
              value={formData.culturalDiversity.otherCountry}
              onChange={(e) =>
                handleInputChange(
                  "culturalDiversity",
                  "otherCountry",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Please specify country"
            />
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Do you speak a language other than English at home?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="No"
              checked={formData.culturalDiversity.speakOtherLanguage === "No"}
              onChange={(e) => {
                handleInputChange(
                  "culturalDiversity",
                  "speakOtherLanguage",
                  e.target.value
                );
                handleInputChange("culturalDiversity", "otherLanguage", "");
                handleInputChange(
                  "culturalDiversity",
                  "englishProficiency",
                  ""
                );
              }}
              className="form-radio h-5 w-5 text-emerald-600"
            />
            <span className="ml-2">No (English only)</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="Yes"
              checked={formData.culturalDiversity.speakOtherLanguage === "Yes"}
              onChange={(e) =>
                handleInputChange(
                  "culturalDiversity",
                  "speakOtherLanguage",
                  e.target.value
                )
              }
              className="form-radio h-5 w-5 text-emerald-600"
            />
            <span className="ml-2">Yes (please specify below)</span>
          </label>
        </div>
        {formData.culturalDiversity.speakOtherLanguage === "Yes" && (
          <div className="mt-4 pl-6">
            <input
              type="text"
              value={formData.culturalDiversity.otherLanguage}
              onChange={(e) =>
                handleInputChange(
                  "culturalDiversity",
                  "otherLanguage",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Please specify language"
            />
          </div>
        )}
      </div>

      {formData.culturalDiversity.speakOtherLanguage === "Yes" && (
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            If you speak a language other than English at home, how well do you
            speak English?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="Very Well"
                checked={
                  formData.culturalDiversity.englishProficiency === "Very Well"
                }
                onChange={(e) =>
                  handleInputChange(
                    "culturalDiversity",
                    "englishProficiency",
                    e.target.value
                  )
                }
                className="form-radio h-5 w-5 text-emerald-600"
              />
              <span className="ml-2">Very Well</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="Well"
                checked={
                  formData.culturalDiversity.englishProficiency === "Well"
                }
                onChange={(e) =>
                  handleInputChange(
                    "culturalDiversity",
                    "englishProficiency",
                    e.target.value
                  )
                }
                className="form-radio h-5 w-5 text-emerald-600"
              />
              <span className="ml-2">Well</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="Not well"
                checked={
                  formData.culturalDiversity.englishProficiency === "Not well"
                }
                onChange={(e) =>
                  handleInputChange(
                    "culturalDiversity",
                    "englishProficiency",
                    e.target.value
                  )
                }
                className="form-radio h-5 w-5 text-emerald-600"
              />
              <span className="ml-2">Not well</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="Not at all"
                checked={
                  formData.culturalDiversity.englishProficiency === "Not at all"
                }
                onChange={(e) =>
                  handleInputChange(
                    "culturalDiversity",
                    "englishProficiency",
                    e.target.value
                  )
                }
                className="form-radio h-5 w-5 text-emerald-600"
              />
              <span className="ml-2">Not at all</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

const USISection = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Unique Student Identifier (USI)
      </h3>
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="mb-2">
          A Unique Student Identifier (USI) is a reference number made up of
          numbers and letters that gives students access to their USI account. A
          USI will allow an individual's USI account to be linked to the
          National Vocational Education and Training (VET) Data Collection
          allowing an individual to see all of their training results from all
          providers including all completed training units and qualifications.
        </p>
        <p>
          It is a Government requirement that a student needs a USI when
          enrolling or re-enrolling in nationally recognised training from 1
          January 2015.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="mb-4">
          <p className="block text-gray-700 font-medium mb-2">
            Do you have a USI?
          </p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                type="radio"
                id="haveUSI-yes"
                name="haveUSI"
                checked={formData.usi.haveUSI}
                onChange={() => handleInputChange("usi", "haveUSI", true)}
                className="mr-2"
              />
              <label htmlFor="haveUSI-yes">Yes</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="haveUSI-no"
                name="haveUSI"
                checked={!formData.usi.haveUSI}
                onChange={() => handleInputChange("usi", "haveUSI", false)}
                className="mr-2"
              />
              <label htmlFor="haveUSI-no">No</label>
            </div>
          </div>
        </div>

        {formData.usi.haveUSI ? (
          <div>
            <label
              htmlFor="usiNumber"
              className="block text-gray-700 font-medium mb-2"
            >
              Enter your USI:
            </label>
            <input
              type="text"
              id="usiNumber"
              value={formData.usi.usiNumber}
              onChange={(e) =>
                handleInputChange("usi", "usiNumber", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              maxLength={10}
              placeholder="Enter your 10-character USI"
            />
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allowUSICreation"
                  checked={formData.usi.allowCreation}
                  onChange={(e) =>
                    handleInputChange("usi", "allowCreation", e.target.checked)
                  }
                  className="mr-2"
                />
                <label htmlFor="allowUSICreation" className="text-gray-700">
                  I give RTO permission to create, view and update a USI on my
                  behalf using the personal details I have provided.
                </label>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <p className="font-medium mb-2">
                Please provide two forms of ID:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input type="checkbox" id="driverLicense" className="mr-2" />
                  <label htmlFor="driverLicense">Driver's Licence</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="passport" className="mr-2" />
                  <label htmlFor="passport">Australian Passport</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="medicare" className="mr-2" />
                  <label htmlFor="medicare">Medicare Card</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="visa" className="mr-2" />
                  <label htmlFor="visa">
                    Visa (with Non-Australian Passport)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="birthCertificate"
                    className="mr-2"
                  />
                  <label htmlFor="birthCertificate">
                    Birth Certificate (Australian)
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="descent" className="mr-2" />
                  <label htmlFor="descent">
                    Certificate of Registration by Descent
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="citizenship" className="mr-2" />
                  <label htmlFor="citizenship">Citizenship Certificate</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="immiCard" className="mr-2" />
                  <label htmlFor="immiCard">Immi Card</label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EducationDetailsSection = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Education Details
      </h3>

      <div className="grid grid-cols-1 gap-6">
        <div className="mb-4">
          <p className="block text-gray-700 font-medium mb-2">
            Are you still attending secondary school?
          </p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                type="radio"
                id="stillAtSchool-yes"
                name="stillAtSchool"
                checked={formData.education.stillAtSchool}
                onChange={() =>
                  handleInputChange("education", "stillAtSchool", true)
                }
                className="mr-2"
              />
              <label htmlFor="stillAtSchool-yes">Yes</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="stillAtSchool-no"
                name="stillAtSchool"
                checked={!formData.education.stillAtSchool}
                onChange={() =>
                  handleInputChange("education", "stillAtSchool", false)
                }
                className="mr-2"
              />
              <label htmlFor="stillAtSchool-no">No</label>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="highestSchoolLevel"
            className="block text-gray-700 font-medium mb-2"
          >
            What is your highest COMPLETED school level? (Not inclusive of
            higher education)
          </label>
          <select
            id="highestSchoolLevel"
            value={formData.education.highestSchoolLevel}
            onChange={(e) =>
              handleInputChange(
                "education",
                "highestSchoolLevel",
                e.target.value
              )
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">-- Select --</option>
            <option value="Year 12">Completed Year 12</option>
            <option value="Year 11">Completed Year 11</option>
            <option value="Year 10">Completed Year 10</option>
            <option value="Year 9">Completed Year 9 or equivalent</option>
            <option value="Year 8">Completed Year 8 or lower</option>
            <option value="Never">Never attended school</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="yearCompleted"
            className="block text-gray-700 font-medium mb-2"
          >
            In which year did you complete this school level?
          </label>
          <input
            type="text"
            id="yearCompleted"
            value={formData.education.yearCompleted}
            onChange={(e) =>
              handleInputChange("education", "yearCompleted", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="YYYY"
          />
        </div>

        {formData.education.stillAtSchool && (
          <div>
            <label
              htmlFor="currentSchool"
              className="block text-gray-700 font-medium mb-2"
            >
              If still attending school, name of school:
            </label>
            <input
              type="text"
              id="currentSchool"
              value={formData.education.currentSchool}
              onChange={(e) =>
                handleInputChange("education", "currentSchool", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        )}

        <div>
          <label
            htmlFor="previousSchool"
            className="block text-gray-700 font-medium mb-2"
          >
            Previous secondary school (if applicable):
          </label>
          <input
            type="text"
            id="previousSchool"
            value={formData.education.previousSchool}
            onChange={(e) =>
              handleInputChange("education", "previousSchool", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>
    </div>
  );
};

const EmploymentStatusSection = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Employment Status
      </h3>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label
            htmlFor="employmentStatus"
            className="block text-gray-700 font-medium mb-2"
          >
            Which of the following categories BEST describes your current
            employment status?
          </label>
          <select
            id="employmentStatus"
            value={formData.employment.status}
            onChange={(e) =>
              handleInputChange("employment", "status", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">-- Select --</option>
            <option value="Full time employee">Full time employee</option>
            <option value="Part time employee">Part time employee</option>
            <option value="Self-employed – not employing others">
              Self-employed – not employing others
            </option>
            <option value="Self-employed – employing others">Employer</option>
            <option value="Employed – unpaid worker in a family business">
              Employed – unpaid worker in a family business
            </option>
            <option value="Unemployed – seeking full time work">
              Unemployed – seeking full time work
            </option>
            <option value="Unemployed – seeking part time work">
              Unemployed – seeking part time work
            </option>
            <option value="Not employed – not seeking employment">
              Not employed – not seeking employment
            </option>
          </select>
        </div>

        {formData.employment.status &&
          !formData.employment.status.includes("Unemployed") &&
          !formData.employment.status.includes("Not employed") && (
            <>
              <div>
                <label
                  htmlFor="employedAt"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Where are you employed?
                </label>
                <input
                  type="text"
                  id="employedAt"
                  value={formData.employment.employedAt}
                  onChange={(e) =>
                    handleInputChange(
                      "employment",
                      "employedAt",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  How many employees are at your current employer?
                </label>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="employeeCount-up-to-20"
                      name="employeeCount"
                      checked={formData.employment.employeeCount === "Up to 20"}
                      onChange={() =>
                        handleInputChange(
                          "employment",
                          "employeeCount",
                          "Up to 20"
                        )
                      }
                      className="mr-2"
                    />
                    <label htmlFor="employeeCount-up-to-20">Up to 20</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="employeeCount-over-20"
                      name="employeeCount"
                      checked={formData.employment.employeeCount === "Over 20"}
                      onChange={() =>
                        handleInputChange(
                          "employment",
                          "employeeCount",
                          "Over 20"
                        )
                      }
                      className="mr-2"
                    />
                    <label htmlFor="employeeCount-over-20">Over 20</label>
                  </div>
                </div>
              </div>
            </>
          )}
      </div>
    </div>
  );
};

const OccupationSection = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">Occupation</h3>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label
            htmlFor="occupationClassification"
            className="block text-gray-700 font-medium mb-2"
          >
            Which of the following classifications BEST describes your current
            (or recent) occupation?
          </label>
          <select
            id="occupationClassification"
            value={formData.occupation.classification}
            onChange={(e) =>
              handleInputChange("occupation", "classification", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">-- Select --</option>
            <option value="1 - Managers">1 - Managers</option>
            <option value="2 - Professionals">2 - Professionals</option>
            <option value="3 - Technicians & Trade Workers">
              3 - Technicians & Trade Workers
            </option>
            <option value="4 - Community and Personal Service Workers">
              4 - Community and Personal Service Workers
            </option>
            <option value="5 - Clerical & Administrative Workers">
              5 - Clerical & Administrative Workers
            </option>
            <option value="6 - Sales Workers">6 - Sales Workers</option>
            <option value="7 - Machinery Operators & Drivers">
              7 - Machinery Operators & Drivers
            </option>
            <option value="8 - Labourers">8 - Labourers</option>
            <option value="9 - Other">9 - Other</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const IndustrySection = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Industry of Employment
      </h3>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label
            htmlFor="industryClassification"
            className="block text-gray-700 font-medium mb-2"
          >
            Which of the following classifications BEST describes the Industry
            of your current (or recent) Employer?
          </label>
          <select
            id="industryClassification"
            value={formData.industry.classification}
            onChange={(e) =>
              handleInputChange("industry", "classification", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">-- Select --</option>
            <option value="A - Agriculture, Forestry and Fishing">
              A - Agriculture, Forestry and Fishing
            </option>
            <option value="B - Mining">B - Mining</option>
            <option value="C - Manufacturing">C - Manufacturing</option>
            <option value="D - Electricity, Gas, Water & Waste Services">
              D - Electricity, Gas, Water & Waste Services
            </option>
            <option value="E - Construction">E - Construction</option>
            <option value="F - Wholesale Trade">F - Wholesale Trade</option>
            <option value="G - Retail Trade">G - Retail Trade</option>
            <option value="H - Accommodation & Feed Services">
              H - Accommodation & Feed Services
            </option>
            <option value="I - Transport, Postal & Warehousing">
              I - Transport, Postal & Warehousing
            </option>
            <option value="J - Information Media & Telecommunications">
              J - Information Media & Telecommunications
            </option>
            <option value="K - Financial & Insurance Services">
              K - Financial & Insurance Services
            </option>
            <option value="L - Rental, Hiring & Real Estate Services">
              L - Rental, Hiring & Real Estate Services
            </option>
            <option value="M - Professional, Scientific & Technical Services">
              M - Professional, Scientific & Technical Services
            </option>
            <option value="N - Administrative Support Services">
              N - Administrative Support Services
            </option>
            <option value="O - Public Administration and Safety">
              O - Public Administration and Safety
            </option>
            <option value="P - Education & Training">
              P - Education & Training
            </option>
            <option value="Q - Health Care & Social Assistance">
              Q - Health Care & Social Assistance
            </option>
            <option value="R - Arts and Recreation Services">
              R - Arts and Recreation Services
            </option>
            <option value="S - Other Services">S - Other Services</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const DisabilitySection = ({ formData, handleInputChange }) => {
  const handleDisabilityTypeChange = (type, checked) => {
    const updatedTypes = [...formData.disability.disabilityTypes];

    if (checked) {
      if (!updatedTypes.includes(type)) {
        updatedTypes.push(type);
      }
    } else {
      const index = updatedTypes.indexOf(type);
      if (index > -1) {
        updatedTypes.splice(index, 1);
      }
    }

    handleInputChange("disability", "disabilityTypes", updatedTypes);
  };

  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">Disability</h3>

      <div className="grid grid-cols-1 gap-6">
        <div className="mb-4">
          <p className="block text-gray-700 font-medium mb-2">
            Do you consider yourself to have a disability, impairment or long
            term condition?
          </p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                type="radio"
                id="hasDisability-yes"
                name="hasDisability"
                checked={formData.disability.hasDisability}
                onChange={() =>
                  handleInputChange("disability", "hasDisability", true)
                }
                className="mr-2"
              />
              <label htmlFor="hasDisability-yes">Yes</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="hasDisability-no"
                name="hasDisability"
                checked={!formData.disability.hasDisability}
                onChange={() =>
                  handleInputChange("disability", "hasDisability", false)
                }
                className="mr-2"
              />
              <label htmlFor="hasDisability-no">No</label>
            </div>
          </div>
        </div>

        {formData.disability.hasDisability && (
          <div>
            <p className="block text-gray-700 font-medium mb-2">
              If yes, please indicate the areas of disability, impairment or
              long term condition. You may indicate more than one.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="disability-hearing"
                  checked={formData.disability.disabilityTypes.includes(
                    "Hearing/deaf"
                  )}
                  onChange={(e) =>
                    handleDisabilityTypeChange("Hearing/deaf", e.target.checked)
                  }
                  className="mr-2"
                />
                <label htmlFor="disability-hearing">Hearing/deaf</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="disability-physical"
                  checked={formData.disability.disabilityTypes.includes(
                    "Physical"
                  )}
                  onChange={(e) =>
                    handleDisabilityTypeChange("Physical", e.target.checked)
                  }
                  className="mr-2"
                />
                <label htmlFor="disability-physical">Physical</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="disability-intellectual"
                  checked={formData.disability.disabilityTypes.includes(
                    "Intellectual"
                  )}
                  onChange={(e) =>
                    handleDisabilityTypeChange("Intellectual", e.target.checked)
                  }
                  className="mr-2"
                />
                <label htmlFor="disability-intellectual">Intellectual</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="disability-learning"
                  checked={formData.disability.disabilityTypes.includes(
                    "Learning"
                  )}
                  onChange={(e) =>
                    handleDisabilityTypeChange("Learning", e.target.checked)
                  }
                  className="mr-2"
                />
                <label htmlFor="disability-learning">Learning</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="disability-mental"
                  checked={formData.disability.disabilityTypes.includes(
                    "Mental illness"
                  )}
                  onChange={(e) =>
                    handleDisabilityTypeChange(
                      "Mental illness",
                      e.target.checked
                    )
                  }
                  className="mr-2"
                />
                <label htmlFor="disability-mental">Mental illness</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="disability-medical"
                  checked={formData.disability.disabilityTypes.includes(
                    "Medical condition"
                  )}
                  onChange={(e) =>
                    handleDisabilityTypeChange(
                      "Medical condition",
                      e.target.checked
                    )
                  }
                  className="mr-2"
                />
                <label htmlFor="disability-medical">Medical condition</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="disability-vision"
                  checked={formData.disability.disabilityTypes.includes(
                    "Vision"
                  )}
                  onChange={(e) =>
                    handleDisabilityTypeChange("Vision", e.target.checked)
                  }
                  className="mr-2"
                />
                <label htmlFor="disability-vision">Vision</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="disability-brain"
                  checked={formData.disability.disabilityTypes.includes(
                    "Acquired brain impairment"
                  )}
                  onChange={(e) =>
                    handleDisabilityTypeChange(
                      "Acquired brain impairment",
                      e.target.checked
                    )
                  }
                  className="mr-2"
                />
                <label htmlFor="disability-brain">
                  Acquired brain impairment
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="disability-other"
                  checked={formData.disability.disabilityTypes.includes(
                    "Other"
                  )}
                  onChange={(e) =>
                    handleDisabilityTypeChange("Other", e.target.checked)
                  }
                  className="mr-2"
                />
                <label htmlFor="disability-other">Other</label>
              </div>
            </div>

            {formData.disability.disabilityTypes.includes("Other") && (
              <div className="mt-4">
                <label
                  htmlFor="otherDisability"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Please specify other disability:
                </label>
                <input
                  type="text"
                  id="otherDisability"
                  value={formData.disability.otherDisability}
                  onChange={(e) =>
                    handleInputChange(
                      "disability",
                      "otherDisability",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
// Previous Qualifications Section
const PreviousQualificationsSection = ({ formData, handleInputChange }) => {
  const handleQualificationChange = (type, isAustralian) => {
    const qualifications = [...formData.previousQualifications.qualifications];
    const index = qualifications.findIndex((q) => q.type === type);

    if (index !== -1) {
      qualifications[index] = {
        ...qualifications[index],
        origin: isAustralian ? "A" : isAustralian === false ? "I" : "E",
      };
    } else {
      qualifications.push({
        type,
        origin: isAustralian ? "A" : isAustralian === false ? "I" : "E",
      });
    }

    handleInputChange("previousQualifications", null, {
      ...formData.previousQualifications,
      qualifications,
    });
  };

  // Check if "Other" qualification is selected
  const hasOtherQualification =
    formData.previousQualifications.qualifications.some(
      (q) => q.type === "Other"
    );

  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6 mt-8">
        Previous Qualifications
      </h3>

      <div className="mb-6">
        <p className="mb-2 font-medium">
          Have you successfully COMPLETED any of the following qualifications?
        </p>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="hasCompleted"
              value="true"
              checked={formData.previousQualifications.hasCompleted === true}
              onChange={() =>
                handleInputChange(
                  "previousQualifications",
                  "hasCompleted",
                  true
                )
              }
              className="mr-2"
            />
            Yes
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="hasCompleted"
              value="false"
              checked={formData.previousQualifications.hasCompleted === false}
              onChange={() =>
                handleInputChange(
                  "previousQualifications",
                  "hasCompleted",
                  false
                )
              }
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>

      {formData.previousQualifications.hasCompleted && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-3 bg-gray-50 border-b text-left">
                    Qualification
                  </th>
                  <th className="py-2 px-3 bg-gray-50 border-b text-center">
                    Australian (A)
                  </th>
                  <th className="py-2 px-3 bg-gray-50 border-b text-center">
                    Australian Equivalent (E)
                  </th>
                  <th className="py-2 px-3 bg-gray-50 border-b text-center">
                    International (I)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Bachelor Degree or Higher Degree",
                  "Advanced Diploma or Associate Degree",
                  "Diploma or Associate Diploma",
                  "Certificate IV or Advanced Cert/Technician",
                  "Certificate III or Trade Certificate",
                  "Certificate II",
                  "Certificate I",
                  "Other",
                ].map((qualification, index) => {
                  const qual =
                    formData.previousQualifications.qualifications.find(
                      (q) => q.type === qualification
                    );
                  return (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : ""}
                    >
                      <td className="py-2 px-3 border-b">{qualification}</td>
                      <td className="py-2 px-3 border-b text-center">
                        <input
                          type="radio"
                          name={`qual_${index}`}
                          checked={qual?.origin === "A"}
                          onChange={() =>
                            handleQualificationChange(qualification, true)
                          }
                        />
                      </td>
                      <td className="py-2 px-3 border-b text-center">
                        <input
                          type="radio"
                          name={`qual_${index}`}
                          checked={qual?.origin === "E"}
                          onChange={() =>
                            handleQualificationChange(qualification, null)
                          }
                        />
                      </td>
                      <td className="py-2 px-3 border-b text-center">
                        <input
                          type="radio"
                          name={`qual_${index}`}
                          checked={qual?.origin === "I"}
                          onChange={() =>
                            handleQualificationChange(qualification, false)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Add text field for "Other" qualification */}
          {hasOtherQualification && (
            <div className="mt-4">
              <label
                htmlFor="otherQualification"
                className="block text-gray-700 font-medium mb-2"
              >
                Please specify other qualification:
              </label>
              <input
                type="text"
                id="otherQualification"
                value={formData.previousQualifications.otherQualification || ""}
                onChange={(e) =>
                  handleInputChange(
                    "previousQualifications",
                    "otherQualification",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Please specify your other qualification"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Study Reason Section
const StudyReasonSection = ({ formData, handleInputChange }) => {
  const reasons = [
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
  ];

  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Study Reason
      </h3>

      <div className="mb-6">
        <p className="mb-2 font-medium">
          Which BEST describes your main reason for undertaking this
          course/traineeship/apprenticeship?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reasons.map((reason, index) => (
            <label key={index} className="flex items-center">
              <input
                type="radio"
                name="studyReason"
                value={reason}
                checked={formData.studyReason === reason}
                onChange={() => handleInputChange("studyReason", null, reason)}
                className="mr-2"
              />
              {reason}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

// Contact Source Section
const ContactSourceSection = ({ formData, handleInputChange }) => {
  const sources = [
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
    "Other",
  ];

  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Student Contact
      </h3>

      <div className="mb-6">
        <p className="mb-2 font-medium">
          How did you find out about the course you are enrolling in?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sources.map((source, index) => (
            <label key={index} className="flex items-center">
              <input
                type="radio"
                name="contactSource"
                value={source}
                checked={formData.contactSource === source}
                onChange={() =>
                  handleInputChange("contactSource", null, source)
                }
                className="mr-2"
              />
              {source}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

// Student Handbook Section
const StudentHandbookSection = ({ formData, handleInputChange }) => {
  const handbookItems = [
    "Student fee information",
    "Refund Policy",
    "Code of conduct",
    "Complaints procedure",
    "Appeals procedure",
    "Assessment guidelines",
    "Student welfare and support services",
    "Recognition of prior learning",
  ];

  const [checkedItems, setCheckedItems] = useState(
    formData.studentHandbook?.checkedItems || {}
  );

  const handleCheckboxChange = (item) => {
    const updatedItems = {
      ...checkedItems,
      [item]: !checkedItems[item],
    };
    setCheckedItems(updatedItems);

    // Update formData
    handleInputChange("studentHandbook", "checkedItems", updatedItems);
  };

  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6 mt-8">
        Student Handbook
      </h3>

      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md mb-6">
        <p className="mb-4">The student handbook outlines the following:</p>
        <div className="grid grid-cols-1 gap-4">
          {handbookItems.map((item, index) => (
            <label key={index} className="flex items-start">
              <input
                type="checkbox"
                checked={checkedItems[item] || false}
                onChange={() => handleCheckboxChange(item)}
                className="mt-1 mr-2"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.preTraining.readStudentHandbook}
            onChange={(e) =>
              handleInputChange(
                "preTraining",
                "readStudentHandbook",
                e.target.checked
              )
            }
            className="mr-2"
          />
          I declare that I have read and understood RTO student handbook and
          their policies & procedures regarding the above.
        </label>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        The Student Handbook can be found on RTO website.{" "}
        <a
          href="https://www.RTO.edu.au"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:underline"
        >
          www.RTO.edu.au
        </a>
      </p>
    </div>
  );
};

// Citizenship Status Section
const CitizenshipStatusSection = ({ formData, handleInputChange }) => {
  const statuses = [
    "Australian Citizen",
    "New Zealand Citizen",
    "Permanent Resident",
    "Other",
  ];

  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Australian Citizenship Status
      </h3>

      <div className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {statuses.map((status, index) => (
            <label key={index} className="flex items-center">
              <input
                type="radio"
                name="citizenshipStatus"
                value={status}
                checked={formData.citizenshipStatus === status}
                onChange={() =>
                  handleInputChange("citizenshipStatus", null, status)
                }
                className="mr-2"
              />
              {status}
            </label>
          ))}
        </div>
      </div>

      {formData.citizenshipStatus === "Other" && (
        <div className="mb-6">
          <label
            htmlFor="otherCitizenshipDetails"
            className="block text-gray-700 mb-2"
          >
            Please provide details:
          </label>
          <input
            type="text"
            id="otherCitizenshipDetails"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Specify your citizenship status"
          />
        </div>
      )}
    </div>
  );
};

// Program Selection Section
const ProgramSelectionSection = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Program / Qualification to be enrolled in
      </h3>

      <div className="mb-6">
        <label htmlFor="program" className="block text-gray-700 mb-2">
          Select one of the following courses:
        </label>
        <input
          type="text"
          id="program"
          value={formData.program}
          onChange={(e) => handleInputChange("program", null, e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="CPC30220 Certificate III in Carpentry"
        />
      </div>
    </div>
  );
};

// Pre-Training Checklist Section
const PreTrainingChecklistSection = ({ formData, handleInputChange }) => {
  const checklistItems = [
    { id: "preTrainingFormCompleted", label: "Pre-training form completed" },
    { id: "entryRequirementsDiscussed", label: "Entry Requirements discussed" },
    {
      id: "lLNAssessmentCompleted",
      label:
        "Language, Literacy and Numeracy(LLN) assessment completed by student and attached",
    },
    { id: "creditTransferDiscussed", label: "Credit Transfer discussed" },
    { id: "deliveryModeDiscussed", label: "Delivery Mode discussed" },
    { id: "locationDiscussed", label: "Location of the course discussed" },
    {
      id: "rplDiscussed",
      label: "Recognition of prior learning(RPL) discussed",
    },
    {
      id: "feesDiscussed",
      label: "Tuition fees, Concession and Exemption discussed",
    },
    { id: "refundPolicyDiscussed", label: "Refund policy discussed" },
    { id: "studentQuestionsAnswered", label: "Student question answered" },
    {
      id: "readStudentHandbook",
      label: "I have read and understand the student handbook",
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Pre Training Checklist
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {checklistItems.map((item) => (
          <label key={item.id} className="flex items-start">
            <input
              type="checkbox"
              checked={formData.preTraining[item.id]}
              onChange={(e) =>
                handleInputChange("preTraining", item.id, e.target.checked)
              }
              className="mt-1 mr-2"
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>

      <div className="mb-6">
        <label htmlFor="specialNeeds" className="block text-gray-700 mb-2">
          Please indicate any special needs, assistance you may require during
          the course:
        </label>
        <textarea
          id="specialNeeds"
          value={formData.preTraining.specialNeeds}
          onChange={(e) =>
            handleInputChange("preTraining", "specialNeeds", e.target.value)
          }
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          rows="4"
          placeholder="e.g., Writing assistance"
        ></textarea>
      </div>
    </div>
  );
};
const ConsentSection = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Consent and Declaration
      </h3>

      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md mb-6">
        <h4 className="font-medium mb-2">
          Consent for publication of photographs and student work
        </h4>
        <p className="mb-4">
          RTO occasionally takes photos of students participating in classes for
          publicity purposes. These photos may be displayed on our website. The
          names and details of the people in the photos are not released or
          published. Staff will always identify when they are taking photos so
          students who don't wish to have their photo taken can be excluded from
          the photo. If at any time your photo is published on the website and
          you would like it removed, we will do so within 24 hours of receiving
          a written request to remove it.
        </p>

        <div className="mb-4">
          <p className="mb-2">
            Do you consent to the use of your photo under these conditions?
          </p>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="photoConsent"
                value="true"
                checked={formData.consent.photoConsent === true}
                onChange={() =>
                  handleInputChange("consent", "photoConsent", true)
                }
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="photoConsent"
                value="false"
                checked={formData.consent.photoConsent === false}
                onChange={() =>
                  handleInputChange("consent", "photoConsent", false)
                }
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          If you indicated NO please ensure you advise the staff member at the
          time the photo is being taken to ensure you are excluded from the
          photo.
        </p>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-2">
          Declaration of Information Accuracy
        </h4>
        <p className="mb-4">
          I declare that the information I have provided on this enrolment form
          is true and accurate, and understand that providing false information
          may affect my eligibility to obtain government funding.
        </p>

        <div className="space-y-2">
          <p>
            In signing or emailing this form I acknowledge and declare that:
          </p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>
              I have read and understood and consent to the privacy notice and
              have completed all questions and details on the enrolment.
            </li>
            <li>
              The information herein provided is to the best of my knowledge
              true, correct and complete at the time of my enrolment.
            </li>
            <li>
              Arrangements have been made to pay all fees and charges applicable
              to this enrolment.
            </li>
            <li>
              I have read and understand the RTO Information for Learners
              Handbook.
            </li>
            <li>
              I agree to be bound by the RTO's Student Code of Conduct,
              regulations, policies and disciplinary procedures whilst I remain
              an enrolled student.
            </li>
            <li>
              My participation in this course is subject to the right of RTO to
              cancel or amalgamate courses or classes. I agree to abide by all
              rules and regulations of RTO.
            </li>
            <li>
              I understand and have been provided with information by RTO in
              relation to Credit Transfer and Recognition of Prior Learning
              (RPL).
            </li>
            <li>
              I confirm that I have been informed about the training, assessment
              and support services to be provided, and about my rights and
              obligations as a student at RTO.
            </li>
            <li>
              I have also visited RTO website to review Training and Assessment
              options available to me including but not limited to duration,
              location, mode of delivery and work placement (if any), fees,
              refunds, complaints and withdrawals.
            </li>
            <li>
              I authorise RTO or its agent, in the event of illness or accident
              during any RTO organised activity, and where emergency contact
              next of kin cannot be contacted within reasonable time, to seek
              ambulance, medical or surgical treatment at my cost.
            </li>
            <li>
              My academic results will be withheld until my debit is fully paid
              and any property belonging to RTO has been returned.
            </li>
            <li>
              I acknowledge that from time to time RTO may send me information
              regarding course opportunities and other promotional offers and
              that I have the ability to opt out.
            </li>
          </ol>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="agreeToTerms"
            className="mr-2"
            checked={formData.consent.agreeToTerms || false}
            onChange={(e) =>
              handleInputChange("consent", "agreeToTerms", e.target.checked)
            }
          />
          <label htmlFor="agreeToTerms">
            I agree to all terms and conditions stated above
          </label>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="signature" className="block text-gray-700 mb-2">
            Electronic Signature:
          </label>
          <input
            type="text"
            id="signature"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Type your full name"
            value={formData.consent.signature || ""}
            onChange={(e) =>
              handleInputChange("consent", "signature", e.target.value)
            }
          />
        </div>
        <div className="flex-1">
          <label htmlFor="signatureDate" className="block text-gray-700 mb-2">
            Date:
          </label>
          <input
            type="date"
            id="signatureDate"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={formData.consent.signatureDate || ""}
            onChange={(e) =>
              handleInputChange("consent", "signatureDate", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};
