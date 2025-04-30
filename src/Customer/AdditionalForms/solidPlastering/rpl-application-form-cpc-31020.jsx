import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const RPLApplicationFormCPC31020 = () => {
  const [activeSection, setActiveSection] = useState(1);
  const totalSections = 25; // Total number of sections

  const [formData, setFormData] = useState({
    studentInitials: "",
    studentName: "",
    courseQualification: "CPC31020 - Certificate III in Solid Plastering",
    studentDeclaration: {
      name: "",
      date: "",
      signature: "",
    },
    recognitionArea: "",
    professionalReferees: {
      referee1: {
        name: "",
        position: "",
        organization: "",
        phoneNumber: "",
        mobileNumber: "",
        email: "",
      },
      referee2: {
        name: "",
        position: "",
        organization: "",
        phoneNumber: "",
        mobileNumber: "",
        email: "",
      },
    },
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
    documentedEvidence: [
      {
        description: "",
        assessorNotes: "",
      },
    ],
    personalDetails: {
      title: "",
      gender: "",
      surname: "",
      firstName: "",
      middleName: "",
      preferredName: "",
      dateOfBirth: "",
      homePhone: "",
      mobilePhone: "",
      email: "",
      workPhone: "",
      preferredContact: "via Mobile Phone", // Default value
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
      unitNumber: "",
      streetNumber: "",
      streetName: "",
      city: "",
      state: "",
      postcode: "",
    },
    postalAddress: {
      sameAsResidential: false,
      buildingName: "",
      unitNumber: "",
      streetNumber: "",
      poBox: "",
      streetName: "",
      city: "",
      state: "",
      postcode: "",
    },
    studyAddress: {
      buildingName: "",
      unitNumber: "",
      streetNumber: "",
      streetName: "",
      city: "",
      state: "",
      postcode: "",
    },
    employerDetails: {
      tradingName: "",
      contactName: "",
      supervisorName: "",
      tradingAddress: "",
      phone: "",
      email: "",
    },
    culturalDiversity: {
      aboriginal: "No", // Default value
      countryOfBirth: "Australia", // Default value
      otherLanguage: "No", // Default value
      languageSpoken: "",
      englishProficiency: "Very Well", // Default value
    },
    usi: {
      hasUSI: false,
      usiNumber: "",
      permissionToCreate: false,
    },
    educationDetails: {
      attendingSchool: "No", // Default value
      highestSchoolLevel: "", // Default value
      yearCompleted: "",
      currentSchool: "",
      previousSchool: "",
    },
    employmentStatus: {
      status: "", // Default value
      employed: "",
      employeeCount: "Up to 20", // Default value
    },
    occupation: {
      classification: "", // Default value
    },
    industryOfEmployment: {
      classification: "", // Default value
    },
    disability: {
      hasDisability: false,
      disabilityTypes: {
        hearingDeaf: false,
        intellectual: false,
        mentalIllness: false,
        vision: false,
        physical: false,
        acquiredBrainImpairment: false,
        learning: false,
        medicalCondition: false,
        other: false,
      },
      otherDisability: "",
    },
    previousQualifications: {
      hasCompleted: false,
      qualifications: {
        bachelorDegree: { type: "" },
        advancedDiploma: { type: "" },
        diploma: { type: "" },
        certificateIV: { type: "" },
        certificateIII: { type: "" },
        certificateII: { type: "" },
        certificateI: { type: "" },
        other: { type: "" },
      },
      otherQualification: "",
    },
    studyReason: {
      reason: "", // Default value
    },
    contactSource: {
      source: "", // Default value
    },
    citizenshipStatus: {
      status: "Australian Citizen", // Default value
    },
    programSelection: "CPC31020 - Certificate III in Solid Plastering",
    preTrainingChecklist: {
      preTrainingCompleted: false,
      entryRequirements: false,
      llnAssessment: false,
      creditTransfer: false,
      deliveryMode: false,
      courseLocation: false,
      rplDiscussed: false,
      tuitionFees: false,
      refundPolicy: false,
      studentQuestions: false,
      studentHandbook: false,
      specialNeeds: false,
      specialNeedsDetails: "",
    },
    photoConsent: "Yes", // Default value
  });

  // Input change handler for regular fields
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Nested input change handler for two-level nesting
  const handleNestedInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Double-nested input change handler for three-level nesting
  const handleDoubleNestedInputChange = (section, subsection, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value,
        },
      },
    }));
  };

  // Triple-nested input change handler for four-level nesting
  const handleTripleNestedInputChange = (
    section,
    subsection,
    subsubsection,
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [subsubsection]: {
            ...prev[section][subsection][subsubsection],
            [field]: value,
          },
        },
      },
    }));
  };

  // Array item change handler
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

  // Checkbox change handler
  const handleCheckboxChange = (section, field) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field],
      },
    }));
  };

  // Nested checkbox change handler
  const handleNestedCheckboxChange = (section, subsection, field) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: !prev[section][subsection][field],
        },
      },
    }));
  };

  const validateSection = (section) => {
    // Basic validation logic
    switch (section) {
      case 1:
        return true; // Welcome section, no validation needed
      case 2:
        return formData.recognitionArea.trim() !== "";
      case 3:
        return formData.professionalReferees.referee1.name.trim() !== "";
      case 4:
        return formData.employmentHistory[0].employer.trim() !== "";
      case 5:
        return formData.documentedEvidence[0].description.trim() !== "";
      case 6:
        return (
          formData.personalDetails.firstName.trim() !== "" &&
          formData.personalDetails.surname.trim() !== ""
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    // if (validateSection(activeSection)) {
    setActiveSection((prev) => Math.min(prev + 1, totalSections));
    // } else {
    // alert("Please complete all required fields before proceeding.");
    // }
  };

  const handleBack = () => {
    setActiveSection((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Submit data to backend
    alert("RPL Application submitted successfully!");
  };

  const progressPercentage = (activeSection / totalSections) * 100;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto pt-10 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-medium font-outfit text-emerald-800 mb-2">
              RPL Application Form
            </h1>
            <h2 className="text-2xl font-medium text-emerald-700">
              {formData.courseQualification}
            </h2>
            <p className="text-sm text-gray-500">
              Recognition of Prior Learning (RPL) Assessment
            </p>
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

          <form onSubmit={handleSubmit}>
            {/* Welcome Section */}
            {activeSection === 1 && <WelcomeSection />}

            {/* Recognition Area */}
            {activeSection === 2 && (
              <RecognitionAreaSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}

            {/* Professional Referees */}
            {activeSection === 3 && (
              <ProfessionalRefereesSection
                formData={formData}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
              />
            )}

            {/* Employment History */}
            {activeSection === 4 && (
              <EmploymentHistorySection
                formData={formData}
                handleArrayItemChange={handleArrayItemChange}
                addArrayItem={addArrayItem}
                removeArrayItem={removeArrayItem}
              />
            )}

            {/* Documented Evidence */}
            {/* {activeSection === 5 && (
              <DocumentedEvidenceSection
                formData={formData}
                handleArrayItemChange={handleArrayItemChange}
                addArrayItem={addArrayItem}
                removeArrayItem={removeArrayItem}
              />
            )} */}

            {/* Personal Details */}
            {activeSection === 5 && (
              <PersonalDetailsSection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 6 && (
              <ContactDetailsSection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 7 && (
              <EmergencyContactSection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 8 && (
              <ResidentialAddressSection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 9 && (
              <PostalAddressSection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 10 && (
              <EmployerDetailsSection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 11 && (
              <CulturalDiversitySection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 12 && (
              <USISection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 13 && (
              <EducationDetailsSection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 14 && (
              <EmploymentStatusSection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 15 && (
              <OccupationSection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 16 && (
              <IndustrySection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 17 && (
              <DisabilitySection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 18 && (
              <PreviousQualificationsSection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 19 && (
              <StudyReasonSection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 20 && (
              <StudentContactSection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 21 && (
              <StudentHandbookSection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 22 && (
              <CitizenshipStatusSection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {/* {activeSection === 23 && (
              <ProgramQualificationSection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )} */}
            {activeSection === 23 && (
              <PreTrainingChecklistSection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 24 && (
              <PhotoConsentSection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
              />
            )}
            {activeSection === 25 && (
              <DeclarationSection
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                handleTripleNestedInputChange={handleTripleNestedInputChange}
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
export default RPLApplicationFormCPC31020;
// Welcome Section Component
const WelcomeSection = () => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Welcome Message
      </h3>

      <div className="border border-gray-300 rounded-md p-6 mb-6">
        <p className="mb-4">
          Welcome to the Recognition of Prior Learning (RPL) Kit. You can use
          this kit if you think you have the appropriate competence (skills,
          knowledge and attitude) contained within course objectives. Having
          competence means 'the ability to apply your knowledge and skills to
          perform your job or workplace task effectively'.
        </p>

        <h4 className="text-lg font-medium text-gray-800 mt-6 mb-4">
          Structure of the RPL process
        </h4>

        <div className="mb-4">
          <h5 className="font-medium text-gray-700 mb-2">
            Step 1: Application Form
          </h5>
          <p>
            To initiate the RPL process, candidates should obtain the RPL
            Application Form from the Registered Training Organisation (RTO).
            This form is the primary document for providing personal information
            and details about their previous skills, experience, and
            qualifications. Candidates must ensure that they accurately and
            comprehensively fill in their personal information, including full
            name, contact details, and any required identification numbers.
          </p>
        </div>

        <div className="mb-4">
          <h5 className="font-medium text-gray-700 mb-2">
            Step 2: Self-Assessment
          </h5>
          <p>
            In the second step of the RPL process, candidates will be provided
            with a self-assessment checklist tailored to the unit of competency
            for which they are applying for RPL. This checklist serves as a tool
            to evaluate their proficiency in the required competencies based on
            their past experiences.
          </p>
        </div>

        <div className="mb-4">
          <h5 className="font-medium text-gray-700 mb-2">
            Step 3: Third-Party Evidence or Report
          </h5>
          <p>
            In Step 3 of the RPL process, the assessor may seek third-party
            evidence by contacting the candidate's supervisor or manager. This
            step aims to gather additional information and perspectives to
            assess the candidate's skills and knowledge related to the specific
            unit of competency being claimed for RPL.
          </p>
        </div>

        <div className="mb-4">
          <h5 className="font-medium text-gray-700 mb-2">
            Step 4: Competency Conversation
          </h5>
          <p>
            During Step 4 of the RPL process, candidates will communicate with
            the assessor and the conversation takes the form of an interview
            where the assessor asks questions specifically related to the unit
            of competency for which the candidate is seeking RPL.
          </p>
        </div>

        <div className="mb-4">
          <h5 className="font-medium text-gray-700 mb-2">
            Step 5: Practical Demonstration and Observation
          </h5>
          <p>
            In Step 5 of the RPL process, candidates will undergo a practical
            demonstration to assess their competency. The assessor will assign a
            specific task based on the competency conversation (Step 4) and
            areas where further evidence or clarification is required.
          </p>
        </div>

        <div className="mb-4">
          <h5 className="font-medium text-gray-700 mb-2">
            Step 6: Unit Mapping
          </h5>
          <p>
            In Step 6 of the RPL process, the assessor will use the mapping
            document to guide the assessment. The mapping document serves as a
            tool for the assessor to identify the skills, knowledge, and
            performance criteria that will be assessed during the RPL process.
          </p>
        </div>

        <h4 className="text-lg font-medium text-gray-800 mt-6 mb-4">
          Gap training
        </h4>
        <p className="mb-4">
          RPL is an assessment process that aims to identify areas of competence
          and determine if there are any gaps in a candidate's skills and
          knowledge related to a unit of competency. It is important to note
          that not all candidates will have skills or knowledge gaps.
        </p>
        <p className="mb-4">
          If it is determined that there are gaps in the candidate's skills and
          knowledge, opportunities for closing those gaps will be established
          through negotiation with the assessor. These opportunities may include
          attending training and assessment sessions or completing workplace
          activities.
        </p>
        <p className="mb-4">
          However, it is not mandatory for the candidate to undergo gap training
          unless it is deemed necessary based on the identified gaps and the
          requirements of the unit of competency.
        </p>
      </div>
    </div>
  );
};

// Recognition Area Section Component
const RecognitionAreaSection = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        RPL Application Form
      </h3>

      <div className="border border-gray-300 rounded-md p-6 mb-6">
        <p className="mb-4">
          Welcome to the Recognition of Prior Learning (RPL) Kit. You can use
          this kit if you think you have the appropriate competence (skills,
          knowledge and attitude) contained within course objectives.
        </p>

        <h4 className="font-medium text-gray-800 mb-4">
          RECOGNITION – RPL APPLICATION FORM
        </h4>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Course applying for recognition?
          </label>
          <input
            type="text"
            value={formData.courseQualification}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            disabled
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Recognition Area
          </label>
          <textarea
            value={formData.recognitionArea}
            onChange={(e) =>
              handleInputChange("recognitionArea", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            rows="4"
            required
          ></textarea>
        </div>
      </div>
    </div>
  );
};

// Professional Referees Section Component
const ProfessionalRefereesSection = ({
  formData,
  handleDoubleNestedInputChange,
}) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Professional Referees
      </h3>

      <div className="border border-gray-300 rounded-md p-6 mb-6">
        <p className="mb-4">
          Please provide details of professional referees who can verify your
          experience and skills relevant to this qualification.
        </p>

        <h4 className="font-medium text-gray-800 mb-4">Referee 1</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              value={formData.professionalReferees.referee1.name}
              onChange={(e) =>
                handleDoubleNestedInputChange(
                  "professionalReferees",
                  "referee1",
                  "name",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Position
            </label>
            <input
              type="text"
              value={formData.professionalReferees.referee1.position}
              onChange={(e) =>
                handleDoubleNestedInputChange(
                  "professionalReferees",
                  "referee1",
                  "position",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Organisation
            </label>
            <input
              type="text"
              value={formData.professionalReferees.referee1.organization}
              onChange={(e) =>
                handleDoubleNestedInputChange(
                  "professionalReferees",
                  "referee1",
                  "organization",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.professionalReferees.referee1.phoneNumber}
              onChange={(e) =>
                handleDoubleNestedInputChange(
                  "professionalReferees",
                  "referee1",
                  "phoneNumber",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mobile Number
            </label>
            <input
              type="text"
              value={formData.professionalReferees.referee1.mobileNumber}
              onChange={(e) =>
                handleDoubleNestedInputChange(
                  "professionalReferees",
                  "referee1",
                  "mobileNumber",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.professionalReferees.referee1.email}
              onChange={(e) =>
                handleDoubleNestedInputChange(
                  "professionalReferees",
                  "referee1",
                  "email",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>

        <h4 className="font-medium text-gray-800 mb-4">Referee 2</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              value={formData.professionalReferees.referee2.name}
              onChange={(e) =>
                handleDoubleNestedInputChange(
                  "professionalReferees",
                  "referee2",
                  "name",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Position
            </label>
            <input
              type="text"
              value={formData.professionalReferees.referee2.position}
              onChange={(e) =>
                handleDoubleNestedInputChange(
                  "professionalReferees",
                  "referee2",
                  "position",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Organisation
            </label>
            <input
              type="text"
              value={formData.professionalReferees.referee2.organization}
              onChange={(e) =>
                handleDoubleNestedInputChange(
                  "professionalReferees",
                  "referee2",
                  "organization",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.professionalReferees.referee2.phoneNumber}
              onChange={(e) =>
                handleDoubleNestedInputChange(
                  "professionalReferees",
                  "referee2",
                  "phoneNumber",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mobile Number
            </label>
            <input
              type="text"
              value={formData.professionalReferees.referee2.mobileNumber}
              onChange={(e) =>
                handleDoubleNestedInputChange(
                  "professionalReferees",
                  "referee2",
                  "mobileNumber",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.professionalReferees.referee2.email}
              onChange={(e) =>
                handleDoubleNestedInputChange(
                  "professionalReferees",
                  "referee2",
                  "email",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Employment History Section Component

// Employment History Section Component
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

// Documented Evidence Section Component
const DocumentedEvidenceSection = ({
  formData,
  handleArrayItemChange,
  addArrayItem,
  removeArrayItem,
}) => {
  const emptyEvidenceItem = {
    description: "",
    assessorNotes: "",
  };

  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Documented Evidence
      </h3>
      <p className="text-gray-600 mb-4">
        If you are including documents in your application, please provide a
        brief description below. If you have an Australian Qualification or
        Statement of Attainment, please attach a verified copy.
      </p>

      {formData.documentedEvidence.map((evidence, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-emerald-700">
              Document {index + 1}
            </h4>
            {formData.documentedEvidence.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem("documentedEvidence", index)}
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Document Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={evidence.description}
              onChange={(e) =>
                handleArrayItemChange(
                  "documentedEvidence",
                  index,
                  "description",
                  e.target.value
                )
              }
              placeholder="e.g. Qualifications, Statement of Attainment, Resume, Photos, Awards, Certificates etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              For Office Use Only - Assessor Notes
            </label>
            <textarea
              value={evidence.assessorNotes}
              onChange={(e) =>
                handleArrayItemChange(
                  "documentedEvidence",
                  index,
                  "assessorNotes",
                  e.target.value
                )
              }
              disabled
              placeholder="This section will be filled by the assessor"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
              rows="3"
            ></textarea>
          </div>
        </div>
      ))}

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => addArrayItem("documentedEvidence", emptyEvidenceItem)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          Add Another Document
        </button>
      </div>
    </div>
  );
};
// PersonalDetailsSection Component
const PersonalDetailsSection = ({ formData, handleNestedInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Personal Details
      </h2>
      <p className="text-gray-600 mb-4">
        Please provide your personal information below. Fields marked with * are
        required.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 mb-1">Title *</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.personalDetails.title}
            onChange={(e) =>
              handleNestedInputChange(
                "personalDetails",
                "title",
                e.target.value
              )
            }
            required
          >
            <option value="">Select Title</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-1">Gender *</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.personalDetails.gender}
            onChange={(e) =>
              handleNestedInputChange(
                "personalDetails",
                "gender",
                e.target.value
              )
            }
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 mb-1">
            Surname (Family Name) *
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.personalDetails.surname}
            onChange={(e) =>
              handleNestedInputChange(
                "personalDetails",
                "surname",
                e.target.value
              )
            }
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-1">First Name *</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.personalDetails.firstName}
            onChange={(e) =>
              handleNestedInputChange(
                "personalDetails",
                "firstName",
                e.target.value
              )
            }
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-1">Middle Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.personalDetails.middleName}
            onChange={(e) =>
              handleNestedInputChange(
                "personalDetails",
                "middleName",
                e.target.value
              )
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 mb-1">Preferred Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.personalDetails.preferredName}
            onChange={(e) =>
              handleNestedInputChange(
                "personalDetails",
                "preferredName",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-1">Date of Birth *</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.personalDetails.dateOfBirth}
            onChange={(e) =>
              handleNestedInputChange(
                "personalDetails",
                "dateOfBirth",
                e.target.value
              )
            }
            required
          />
        </div>
      </div>
    </div>
  );
};
const ContactDetailsSection = ({ formData, handleNestedInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Contact Details
      </h2>
      <p className="text-gray-600 mb-4">
        Please provide your contact information below. Fields marked with * are
        required.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 mb-1">Home Phone</label>
          <input
            type="tel"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.personalDetails.homePhone}
            onChange={(e) =>
              handleNestedInputChange(
                "personalDetails",
                "homePhone",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-1">Mobile Phone *</label>
          <input
            type="tel"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.personalDetails.mobilePhone}
            onChange={(e) =>
              handleNestedInputChange(
                "personalDetails",
                "mobilePhone",
                e.target.value
              )
            }
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-1">Work Phone</label>
          <input
            type="tel"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.personalDetails.workPhone}
            onChange={(e) =>
              handleNestedInputChange(
                "personalDetails",
                "workPhone",
                e.target.value
              )
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 mb-1">Email Address *</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.personalDetails.email}
            onChange={(e) =>
              handleNestedInputChange(
                "personalDetails",
                "email",
                e.target.value
              )
            }
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-1">
            Preferred Contact Method *
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.personalDetails.preferredContact}
            onChange={(e) =>
              handleNestedInputChange(
                "personalDetails",
                "preferredContact",
                e.target.value
              )
            }
            required
          >
            <option value="via Mobile Phone">via Mobile Phone</option>
            <option value="via Email">via Email</option>
            <option value="via Post">via Post</option>
          </select>
        </div>
      </div>
    </div>
  );
};
const EmergencyContactSection = ({ formData, handleNestedInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Emergency Contact
      </h2>
      <p className="text-gray-600 mb-4">
        Please provide details of someone we can contact in case of emergency.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 mb-1">Name *</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.emergencyContact.name}
            onChange={(e) =>
              handleNestedInputChange(
                "emergencyContact",
                "name",
                e.target.value
              )
            }
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-1">Relationship *</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.emergencyContact.relationship}
            onChange={(e) =>
              handleNestedInputChange(
                "emergencyContact",
                "relationship",
                e.target.value
              )
            }
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 mb-1">Home Phone</label>
          <input
            type="tel"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.emergencyContact.homePhone}
            onChange={(e) =>
              handleNestedInputChange(
                "emergencyContact",
                "homePhone",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-1">Mobile Phone *</label>
          <input
            type="tel"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.emergencyContact.mobilePhone}
            onChange={(e) =>
              handleNestedInputChange(
                "emergencyContact",
                "mobilePhone",
                e.target.value
              )
            }
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-1">Work Phone</label>
          <input
            type="tel"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.emergencyContact.workPhone}
            onChange={(e) =>
              handleNestedInputChange(
                "emergencyContact",
                "workPhone",
                e.target.value
              )
            }
          />
        </div>
      </div>
    </div>
  );
};
const ResidentialAddressSection = ({ formData, handleNestedInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Residential Address
      </h2>
      <p className="text-gray-600 mb-4">
        Please provide your current residential address details (not a PO Box).
        Fields marked with * are required.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 mb-1">
            Building/Property Name
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.residentialAddress.buildingName}
            onChange={(e) =>
              handleNestedInputChange(
                "residentialAddress",
                "buildingName",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-1">Unit Number</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.residentialAddress.unitNumber}
            onChange={(e) =>
              handleNestedInputChange(
                "residentialAddress",
                "unitNumber",
                e.target.value
              )
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 mb-1">Street Number *</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.residentialAddress.streetNumber}
            onChange={(e) =>
              handleNestedInputChange(
                "residentialAddress",
                "streetNumber",
                e.target.value
              )
            }
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-1">Street Name *</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.residentialAddress.streetName}
            onChange={(e) =>
              handleNestedInputChange(
                "residentialAddress",
                "streetName",
                e.target.value
              )
            }
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 mb-1">City/Town *</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.residentialAddress.city}
            onChange={(e) =>
              handleNestedInputChange(
                "residentialAddress",
                "city",
                e.target.value
              )
            }
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-1">State *</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.residentialAddress.state}
            onChange={(e) =>
              handleNestedInputChange(
                "residentialAddress",
                "state",
                e.target.value
              )
            }
            required
          >
            <option value="">Select State</option>
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

        <div className="form-group">
          <label className="block text-gray-700 mb-1">Postcode *</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.residentialAddress.postcode}
            onChange={(e) =>
              handleNestedInputChange(
                "residentialAddress",
                "postcode",
                e.target.value
              )
            }
            required
            maxLength="4"
          />
        </div>
      </div>
    </div>
  );
};
const PostalAddressSection = ({
  formData,
  handleNestedInputChange,
  handleNestedCheckboxChange,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Postal Address
      </h2>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-emerald-600"
            checked={formData.postalAddress.sameAsResidential}
            onChange={() =>
              handleNestedCheckboxChange("postalAddress", "sameAsResidential")
            }
          />
          <span className="ml-2 text-gray-700">
            Same as Residential Address
          </span>
        </label>
      </div>

      {!formData.postalAddress.sameAsResidential && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-gray-700 mb-1">
                Building/Property Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.postalAddress.buildingName}
                onChange={(e) =>
                  handleNestedInputChange(
                    "postalAddress",
                    "buildingName",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 mb-1">Unit Number</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.postalAddress.unitNumber}
                onChange={(e) =>
                  handleNestedInputChange(
                    "postalAddress",
                    "unitNumber",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-gray-700 mb-1">Street Number</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.postalAddress.streetNumber}
                onChange={(e) =>
                  handleNestedInputChange(
                    "postalAddress",
                    "streetNumber",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 mb-1">PO Box</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.postalAddress.poBox}
                onChange={(e) =>
                  handleNestedInputChange(
                    "postalAddress",
                    "poBox",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-gray-700 mb-1">Street Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.postalAddress.streetName}
                onChange={(e) =>
                  handleNestedInputChange(
                    "postalAddress",
                    "streetName",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 mb-1">City/Town *</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.postalAddress.city}
                onChange={(e) =>
                  handleNestedInputChange(
                    "postalAddress",
                    "city",
                    e.target.value
                  )
                }
                required={!formData.postalAddress.sameAsResidential}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-gray-700 mb-1">State *</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.postalAddress.state}
                onChange={(e) =>
                  handleNestedInputChange(
                    "postalAddress",
                    "state",
                    e.target.value
                  )
                }
                required={!formData.postalAddress.sameAsResidential}
              >
                <option value="">Select State</option>
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

            <div className="form-group">
              <label className="block text-gray-700 mb-1">Postcode *</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.postalAddress.postcode}
                onChange={(e) =>
                  handleNestedInputChange(
                    "postalAddress",
                    "postcode",
                    e.target.value
                  )
                }
                required={!formData.postalAddress.sameAsResidential}
                maxLength="4"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
const EmployerDetailsSection = ({ formData, handleNestedInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Workplace Employer Details
      </h2>
      <p className="text-gray-600 mb-4">
        Please provide your current employer details if applicable.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 mb-1">Trading Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.employerDetails.tradingName}
            onChange={(e) =>
              handleNestedInputChange(
                "employerDetails",
                "tradingName",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-1">Contact Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.employerDetails.contactName}
            onChange={(e) =>
              handleNestedInputChange(
                "employerDetails",
                "contactName",
                e.target.value
              )
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 mb-1">Supervisor Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.employerDetails.supervisorName}
            onChange={(e) =>
              handleNestedInputChange(
                "employerDetails",
                "supervisorName",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-1">Trading Address</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.employerDetails.tradingAddress}
            onChange={(e) =>
              handleNestedInputChange(
                "employerDetails",
                "tradingAddress",
                e.target.value
              )
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.employerDetails.phone}
            onChange={(e) =>
              handleNestedInputChange(
                "employerDetails",
                "phone",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.employerDetails.email}
            onChange={(e) =>
              handleNestedInputChange(
                "employerDetails",
                "email",
                e.target.value
              )
            }
          />
        </div>
      </div>
    </div>
  );
};
const CulturalDiversitySection = ({ formData, handleNestedInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Language and Cultural Diversity
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 mb-2">
            Are you of Aboriginal/Torres Strait Islander origin? *
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.culturalDiversity.aboriginal}
            onChange={(e) =>
              handleNestedInputChange(
                "culturalDiversity",
                "aboriginal",
                e.target.value
              )
            }
            required
          >
            <option value="No">No</option>
            <option value="Yes, Aboriginal">Yes, Aboriginal</option>
            <option value="Yes, Torres Strait Islander">
              Yes, Torres Strait Islander
            </option>
            <option value="Yes, Aboriginal & T.S. Islander">
              Yes, Aboriginal & Torres Strait Islander
            </option>
          </select>
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-2">
            In which country were you born? *
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.culturalDiversity.countryOfBirth}
            onChange={(e) =>
              handleNestedInputChange(
                "culturalDiversity",
                "countryOfBirth",
                e.target.value
              )
            }
            required
          >
            <option value="Australia">Australia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="Philippines">Philippines</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 mb-2">
            Do you speak a language other than English at home? *
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.culturalDiversity.otherLanguage}
            onChange={(e) =>
              handleNestedInputChange(
                "culturalDiversity",
                "otherLanguage",
                e.target.value
              )
            }
            required
          >
            <option value="No">No (English only)</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {formData.culturalDiversity.otherLanguage === "Yes" && (
          <div className="form-group">
            <label className="block text-gray-700 mb-2">
              If yes, which language do you speak at home? *
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.culturalDiversity.languageSpoken}
              onChange={(e) =>
                handleNestedInputChange(
                  "culturalDiversity",
                  "languageSpoken",
                  e.target.value
                )
              }
              required
            />
          </div>
        )}
      </div>

      {formData.culturalDiversity.otherLanguage === "Yes" && (
        <div className="form-group">
          <label className="block text-gray-700 mb-2">
            How well do you speak English? *
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.culturalDiversity.englishProficiency}
            onChange={(e) =>
              handleNestedInputChange(
                "culturalDiversity",
                "englishProficiency",
                e.target.value
              )
            }
            required
          >
            <option value="Very Well">Very Well</option>
            <option value="Well">Well</option>
            <option value="Not well">Not well</option>
            <option value="Not at all">Not at all</option>
          </select>
        </div>
      )}
    </div>
  );
};
// USI Section Component
const USISection = ({
  formData,
  handleNestedInputChange,
  handleCheckboxChange,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Unique Student Identifier (USI)
      </h2>
      <p className="text-gray-600 mb-4">
        A Unique Student Identifier (USI) is a reference number that gives you
        access to your USI account. A USI allows your training records and
        results to be collected in an online account that you can access
        anytime. It's required for all nationally recognised training.
      </p>

      <div className="form-group">
        <label className="block text-gray-700 mb-2">Do you have a USI? *</label>
        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={formData.usi.hasUSI}
              onChange={() => handleNestedInputChange("usi", "hasUSI", true)}
              className="form-radio"
            />
            <span>Yes, I have a USI</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={!formData.usi.hasUSI}
              onChange={() => handleNestedInputChange("usi", "hasUSI", false)}
              className="form-radio"
            />
            <span>No, I don't have a USI</span>
          </label>
        </div>
      </div>

      {formData.usi.hasUSI && (
        <div className="form-group">
          <label className="block text-gray-700 mb-2">
            Please provide your USI number: *
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.usi.usiNumber}
            onChange={(e) =>
              handleNestedInputChange("usi", "usiNumber", e.target.value)
            }
            required
          />
        </div>
      )}

      {!formData.usi.hasUSI && (
        <div className="form-group">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.usi.permissionToCreate}
              onChange={() =>
                handleNestedInputChange("usi", "permissionToCreate")
              }
              className="form-checkbox"
            />
            <span>
              I give the RTO permission to create, view and update a USI on my
              behalf using the personal details I have provided along with my ID
              documents.
            </span>
          </label>
          <p className="mt-4 text-sm text-gray-600">
            Please note you will need to provide at least one form of ID from
            the following list: Driver's License, Australian Passport, Medicare
            Card, Visa (with Non-Australian Passport), Birth Certificate
            (Australian), Certificate of Registration by Descent, Citizenship
            Certificate, or Immi Card
          </p>
        </div>
      )}
    </div>
  );
};

// Education Details Section Component
const EducationDetailsSection = ({ formData, handleNestedInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Education Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 mb-2">
            Are you still attending secondary school? *
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.educationDetails.attendingSchool}
            onChange={(e) =>
              handleNestedInputChange(
                "educationDetails",
                "attendingSchool",
                e.target.value
              )
            }
            required
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label className="block text-gray-700 mb-2">
            What is your highest COMPLETED school level? *
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.educationDetails.highestSchoolLevel}
            onChange={(e) =>
              handleNestedInputChange(
                "educationDetails",
                "highestSchoolLevel",
                e.target.value
              )
            }
            required
          >
            <option value="">-- Select --</option>
            <option value="Completed Year 12">Completed Year 12</option>
            <option value="Completed Year 11">Completed Year 11</option>
            <option value="Completed Year 10">Completed Year 10</option>
            <option value="Completed Year 9">
              Completed Year 9 or equivalent
            </option>
            <option value="Completed Year 8">Completed Year 8 or lower</option>
            <option value="Never attended school">Never attended school</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 mb-2">
            In which year did you complete this school level? *
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.educationDetails.yearCompleted}
            onChange={(e) =>
              handleNestedInputChange(
                "educationDetails",
                "yearCompleted",
                e.target.value
              )
            }
            placeholder="YYYY"
            required
          />
        </div>

        {formData.educationDetails.attendingSchool === "Yes" && (
          <div className="form-group">
            <label className="block text-gray-700 mb-2">
              If still attending school, name of current school: *
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.educationDetails.currentSchool}
              onChange={(e) =>
                handleNestedInputChange(
                  "educationDetails",
                  "currentSchool",
                  e.target.value
                )
              }
              required
            />
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="block text-gray-700 mb-2">
          Previous secondary school (if applicable):
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.educationDetails.previousSchool}
          onChange={(e) =>
            handleNestedInputChange(
              "educationDetails",
              "previousSchool",
              e.target.value
            )
          }
        />
      </div>
    </div>
  );
};

// Employment Status Section Component
const EmploymentStatusSection = ({ formData, handleNestedInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Employment Status
      </h2>

      <div className="form-group">
        <label className="block text-gray-700 mb-2">
          Which of the following categories BEST describes your current
          employment status? *
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.employmentStatus.status}
          onChange={(e) =>
            handleNestedInputChange(
              "employmentStatus",
              "status",
              e.target.value
            )
          }
          required
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

      {formData.employmentStatus.status &&
        formData.employmentStatus.status.includes("employee") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-gray-700 mb-2">
                Where are you employed? *
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.employmentStatus.employed}
                onChange={(e) =>
                  handleNestedInputChange(
                    "employmentStatus",
                    "employed",
                    e.target.value
                  )
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 mb-2">
                How many employees are at your current employer? *
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.employmentStatus.employeeCount}
                onChange={(e) =>
                  handleNestedInputChange(
                    "employmentStatus",
                    "employeeCount",
                    e.target.value
                  )
                }
                required
              >
                <option value="Up to 20">Up to 20</option>
                <option value="Over 20">Over 20</option>
              </select>
            </div>
          </div>
        )}
    </div>
  );
};

// Occupation Section Component
const OccupationSection = ({ formData, handleNestedInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">Occupation</h2>

      <div className="form-group">
        <label className="block text-gray-700 mb-2">
          Which of the following classifications BEST describes your current (or
          recent) occupation? *
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.occupation.classification}
          onChange={(e) =>
            handleNestedInputChange(
              "occupation",
              "classification",
              e.target.value
            )
          }
          required
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
  );
};

// Industry of Employment Section Component
const IndustrySection = ({ formData, handleNestedInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Industry of Employment
      </h2>

      <div className="form-group">
        <label className="block text-gray-700 mb-2">
          Which of the following classifications BEST describes the Industry of
          your current (or recent) Employer? *
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.industryOfEmployment.classification}
          onChange={(e) =>
            handleNestedInputChange(
              "industryOfEmployment",
              "classification",
              e.target.value
            )
          }
          required
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
          <option value="M - Professional, Scientific & Technical Svc's">
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
  );
};

// Disability Section Component
const DisabilitySection = ({
  formData,
  handleNestedInputChange,
  handleNestedCheckboxChange,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">Disability</h2>

      <div className="form-group">
        <label className="block text-gray-700 mb-2">
          Do you consider yourself to have a disability, impairment or long-term
          condition? *
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={formData.disability.hasDisability}
              onChange={() =>
                handleNestedInputChange("disability", "hasDisability", true)
              }
              className="form-radio"
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={!formData.disability.hasDisability}
              onChange={() =>
                handleNestedInputChange("disability", "hasDisability", false)
              }
              className="form-radio"
            />
            <span>No</span>
          </label>
        </div>
      </div>

      {formData.disability.hasDisability && (
        <div className="form-group">
          <label className="block text-gray-700 mb-2">
            If yes, please indicate the areas of disability, impairment or
            long-term condition: *
            <span className="text-gray-500 text-sm ml-2">
              (You may select more than one)
            </span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.disability.disabilityTypes.hearingDeaf}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "disability",
                    "disabilityTypes",
                    "hearingDeaf"
                  )
                }
                className="form-checkbox"
              />
              <span>Hearing/Deaf</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.disability.disabilityTypes.physical}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "disability",
                    "disabilityTypes",
                    "physical"
                  )
                }
                className="form-checkbox"
              />
              <span>Physical</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.disability.disabilityTypes.intellectual}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "disability",
                    "disabilityTypes",
                    "intellectual"
                  )
                }
                className="form-checkbox"
              />
              <span>Intellectual</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.disability.disabilityTypes.learning}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "disability",
                    "disabilityTypes",
                    "learning"
                  )
                }
                className="form-checkbox"
              />
              <span>Learning</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.disability.disabilityTypes.mentalIllness}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "disability",
                    "disabilityTypes",
                    "mentalIllness"
                  )
                }
                className="form-checkbox"
              />
              <span>Mental Illness</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={
                  formData.disability.disabilityTypes.acquiredBrainImpairment
                }
                onChange={() =>
                  handleNestedCheckboxChange(
                    "disability",
                    "disabilityTypes",
                    "acquiredBrainImpairment"
                  )
                }
                className="form-checkbox"
              />
              <span>Acquired Brain Impairment</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.disability.disabilityTypes.vision}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "disability",
                    "disabilityTypes",
                    "vision"
                  )
                }
                className="form-checkbox"
              />
              <span>Vision</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.disability.disabilityTypes.medicalCondition}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "disability",
                    "disabilityTypes",
                    "medicalCondition"
                  )
                }
                className="form-checkbox"
              />
              <span>Medical Condition</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.disability.disabilityTypes.other}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "disability",
                    "disabilityTypes",
                    "other"
                  )
                }
                className="form-checkbox"
              />
              <span>Other</span>
            </label>
          </div>

          {formData.disability.disabilityTypes.other && (
            <div className="mt-4">
              <label className="block text-gray-700 mb-2">
                Please specify other disability:
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.disability.otherDisability}
                onChange={(e) =>
                  handleNestedInputChange(
                    "disability",
                    "otherDisability",
                    e.target.value
                  )
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Previous Qualifications Section Component
const PreviousQualificationsSection = ({
  formData,
  handleNestedInputChange,
  handleNestedCheckboxChange,
  handleTripleNestedInputChange,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Previous Qualifications
      </h2>

      <div className="form-group">
        <label className="block text-gray-700 mb-2">
          Have you SUCCESSFULLY completed any of the following qualifications? *
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={formData.previousQualifications.hasCompleted}
              onChange={() =>
                handleNestedInputChange(
                  "previousQualifications",
                  "hasCompleted",
                  true
                )
              }
              className="form-radio"
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={!formData.previousQualifications.hasCompleted}
              onChange={() =>
                handleNestedInputChange(
                  "previousQualifications",
                  "hasCompleted",
                  false
                )
              }
              className="form-radio"
            />
            <span>No</span>
          </label>
        </div>
      </div>

      {formData.previousQualifications.hasCompleted && (
        <div className="form-group">
          <label className="block text-gray-700 mb-4">
            If yes, please select the applicable boxes and provide details:
          </label>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
              <div className="md:col-span-2">
                <label className="block text-gray-700">
                  Bachelor Degree or Higher:
                </label>
              </div>
              <div className="md:col-span-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Details (e.g., Australian, Australian Equivalent, International)"
                  value={
                    formData.previousQualifications.qualifications
                      .bachelorDegree.type
                  }
                  onChange={(e) =>
                    handleTripleNestedInputChange(
                      "previousQualifications",
                      "qualifications",
                      "bachelorDegree",
                      "type",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
              <div className="md:col-span-2">
                <label className="block text-gray-700">
                  Advanced Diploma or Associate Degree:
                </label>
              </div>
              <div className="md:col-span-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Details (e.g., Australian, Australian Equivalent, International)"
                  value={
                    formData.previousQualifications.qualifications
                      .advancedDiploma.type
                  }
                  onChange={(e) =>
                    handleTripleNestedInputChange(
                      "previousQualifications",
                      "qualifications",
                      "advancedDiploma",
                      "type",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
              <div className="md:col-span-2">
                <label className="block text-gray-700">
                  Diploma or Associate Diploma:
                </label>
              </div>
              <div className="md:col-span-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Details (e.g., Australian, Australian Equivalent, International)"
                  value={
                    formData.previousQualifications.qualifications.diploma.type
                  }
                  onChange={(e) =>
                    handleTripleNestedInputChange(
                      "previousQualifications",
                      "qualifications",
                      "diploma",
                      "type",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
              <div className="md:col-span-2">
                <label className="block text-gray-700">
                  Certificate IV or Advanced Certificate:
                </label>
              </div>
              <div className="md:col-span-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Details (e.g., Australian, Australian Equivalent, International)"
                  value={
                    formData.previousQualifications.qualifications.certificateIV
                      .type
                  }
                  onChange={(e) =>
                    handleTripleNestedInputChange(
                      "previousQualifications",
                      "qualifications",
                      "certificateIV",
                      "type",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
              <div className="md:col-span-2">
                <label className="block text-gray-700">
                  Certificate III or Trade Certificate:
                </label>
              </div>
              <div className="md:col-span-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Details (e.g., Australian, Australian Equivalent, International)"
                  value={
                    formData.previousQualifications.qualifications
                      .certificateIII.type
                  }
                  onChange={(e) =>
                    handleTripleNestedInputChange(
                      "previousQualifications",
                      "qualifications",
                      "certificateIII",
                      "type",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
              <div className="md:col-span-2">
                <label className="block text-gray-700">Certificate II:</label>
              </div>
              <div className="md:col-span-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Details (e.g., Australian, Australian Equivalent, International)"
                  value={
                    formData.previousQualifications.qualifications.certificateII
                      .type
                  }
                  onChange={(e) =>
                    handleTripleNestedInputChange(
                      "previousQualifications",
                      "qualifications",
                      "certificateII",
                      "type",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
              <div className="md:col-span-2">
                <label className="block text-gray-700">Certificate I:</label>
              </div>
              <div className="md:col-span-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Details (e.g., Australian, Australian Equivalent, International)"
                  value={
                    formData.previousQualifications.qualifications.certificateI
                      .type
                  }
                  onChange={(e) =>
                    handleTripleNestedInputChange(
                      "previousQualifications",
                      "qualifications",
                      "certificateI",
                      "type",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
              <div className="md:col-span-2">
                <label className="block text-gray-700">
                  Other qualification:
                </label>
              </div>
              <div className="md:col-span-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Please specify"
                  value={formData.previousQualifications.otherQualification}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "previousQualifications",
                      "otherQualification",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Study Reason Section Component
const StudyReasonSection = ({ formData, handleNestedInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Study Reason
      </h2>

      <div className="form-group">
        <label className="block text-gray-700 mb-2">
          Of the following reasons, which BEST describes your main reason for
          undertaking this course? *
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.studyReason.reason}
          onChange={(e) =>
            handleNestedInputChange("studyReason", "reason", e.target.value)
          }
          required
        >
          <option value="">-- Select --</option>
          <option value="To get a job">To get a job</option>
          <option value="To develop my existing business">
            To develop my existing business
          </option>
          <option value="To start my own business">
            To start my own business
          </option>
          <option value="To try for a different career">
            To try for a different career
          </option>
          <option value="To get a better job or promotion">
            To get a better job or promotion
          </option>
          <option value="It was a requirement of my job">
            It was a requirement of my job
          </option>
          <option value="I wanted extra skills for my job">
            I wanted extra skills for my job
          </option>
          <option value="To get into another course of study">
            To get into another course of study
          </option>
          <option value="For personal interest or self-development">
            For personal interest or self-development
          </option>
          <option value="Other">Other Reasons</option>
        </select>
      </div>
    </div>
  );
};
const StudentContactSection = ({ formData, handleNestedInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Student Contact
      </h2>

      <div className="form-group">
        <label className="block text-gray-700 mb-2">
          How did you find out about the course you are enrolling in? *
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.contactSource.source}
          onChange={(e) =>
            handleNestedInputChange("contactSource", "source", e.target.value)
          }
          required
        >
          <option value="">-- Select --</option>
          <option value="Job Services">Job Services</option>
          <option value="Staff Member">Staff Member</option>
          <option value="Current/Past Student">Current/Past Student</option>
          <option value="Flyer">Flyer</option>
          <option value="Website">Website</option>
          <option value="Radio advertising">Radio advertising</option>
          <option value="Word of mouth">Word of mouth</option>
          <option value="Social Media">Social Media (e.g. Facebook)</option>
          <option value="Apprentice Centre">Apprentice Centre</option>
          <option value="Newspapers">Newspapers</option>
          <option value="Workplace">Workplace</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};

const StudentHandbookSection = ({ formData, handleNestedCheckboxChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Student Handbook
      </h2>

      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-gray-700 mb-4">
          I declare that I have read and understood RTO student handbook and
          their policies & procedures regarding the above.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="studentFeeInfo"
                checked={formData.studentHandbook?.studentFeeInfo || false}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "studentHandbook",
                    "studentFeeInfo"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="studentFeeInfo" className="text-gray-700">
                Student fee information
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="refundPolicy"
                checked={formData.studentHandbook?.refundPolicy || false}
                onChange={() =>
                  handleNestedCheckboxChange("studentHandbook", "refundPolicy")
                }
                className="mr-2"
              />
              <label htmlFor="refundPolicy" className="text-gray-700">
                Refund Policy
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="codeOfConduct"
                checked={formData.studentHandbook?.codeOfConduct || false}
                onChange={() =>
                  handleNestedCheckboxChange("studentHandbook", "codeOfConduct")
                }
                className="mr-2"
              />
              <label htmlFor="codeOfConduct" className="text-gray-700">
                Code of conduct
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="complaintsProcedure"
                checked={formData.studentHandbook?.complaintsProcedure || false}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "studentHandbook",
                    "complaintsProcedure"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="complaintsProcedure" className="text-gray-700">
                Complaints procedure
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="appealsProcedure"
                checked={formData.studentHandbook?.appealsProcedure || false}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "studentHandbook",
                    "appealsProcedure"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="appealsProcedure" className="text-gray-700">
                Appeals procedure
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="assessmentGuidelines"
                checked={
                  formData.studentHandbook?.assessmentGuidelines || false
                }
                onChange={() =>
                  handleNestedCheckboxChange(
                    "studentHandbook",
                    "assessmentGuidelines"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="assessmentGuidelines" className="text-gray-700">
                Assessment guidelines
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="studentWelfare"
                checked={formData.studentHandbook?.studentWelfare || false}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "studentHandbook",
                    "studentWelfare"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="studentWelfare" className="text-gray-700">
                Student welfare and support services
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="recognitionOfPriorLearning"
                checked={
                  formData.studentHandbook?.recognitionOfPriorLearning || false
                }
                onChange={() =>
                  handleNestedCheckboxChange(
                    "studentHandbook",
                    "recognitionOfPriorLearning"
                  )
                }
                className="mr-2"
              />
              <label
                htmlFor="recognitionOfPriorLearning"
                className="text-gray-700"
              >
                Recognition of prior learning
              </label>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500">
            The Student Handbook can be found on RTO website. www.RTO.edu.au
          </p>
        </div>
      </div>
    </div>
  );
};

const CitizenshipStatusSection = ({ formData, handleNestedInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Australian Citizenship Status
      </h2>

      <div className="form-group">
        <label className="block text-gray-700 mb-2">Citizenship Status *</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="australianCitizen"
              name="citizenshipStatus"
              value="Australian Citizen"
              checked={
                formData.citizenshipStatus.status === "Australian Citizen"
              }
              onChange={(e) =>
                handleNestedInputChange(
                  "citizenshipStatus",
                  "status",
                  e.target.value
                )
              }
              className="mr-2"
            />
            <label htmlFor="australianCitizen" className="text-gray-700">
              Australian Citizen
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="newZealandCitizen"
              name="citizenshipStatus"
              value="New Zealand Citizen"
              checked={
                formData.citizenshipStatus.status === "New Zealand Citizen"
              }
              onChange={(e) =>
                handleNestedInputChange(
                  "citizenshipStatus",
                  "status",
                  e.target.value
                )
              }
              className="mr-2"
            />
            <label htmlFor="newZealandCitizen" className="text-gray-700">
              New Zealand Citizen
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="permanentResident"
              name="citizenshipStatus"
              value="Permanent Resident"
              checked={
                formData.citizenshipStatus.status === "Permanent Resident"
              }
              onChange={(e) =>
                handleNestedInputChange(
                  "citizenshipStatus",
                  "status",
                  e.target.value
                )
              }
              className="mr-2"
            />
            <label htmlFor="permanentResident" className="text-gray-700">
              Permanent Resident
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="otherCitizenship"
              name="citizenshipStatus"
              value="Other"
              checked={formData.citizenshipStatus.status === "Other"}
              onChange={(e) =>
                handleNestedInputChange(
                  "citizenshipStatus",
                  "status",
                  e.target.value
                )
              }
              className="mr-2"
            />
            <label htmlFor="otherCitizenship" className="text-gray-700">
              Other (please provide details)
            </label>
          </div>
        </div>

        {formData.citizenshipStatus.status === "Other" && (
          <div className="mt-2">
            <input
              type="text"
              placeholder="Please specify other citizenship status"
              value={formData.citizenshipStatus.otherDetails || ""}
              onChange={(e) =>
                handleNestedInputChange(
                  "citizenshipStatus",
                  "otherDetails",
                  e.target.value
                )
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const ProgramQualificationSection = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Program / Qualification
      </h2>

      <div className="form-group">
        <label className="block text-gray-700 mb-2">
          Select the program/qualification to be enrolled in *
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.programSelection}
          onChange={(e) =>
            handleInputChange("programSelection", e.target.value)
          }
          required
        >
          <option value="">-- Select --</option>
          <option value="CPC32420 - Certificate III in Plumbing">
            CPC32420 - Certificate III in Plumbing
          </option>
          <option value="CPC32720 - Certificate III in Gas Fitting">
            CPC32720 - Certificate III in Gas Fitting
          </option>
          <option value="CPC32820 - Certificate III in Fire Protection">
            CPC32820 - Certificate III in Fire Protection
          </option>
          <option value="CPC40920 - Certificate IV in Plumbing and Services">
            CPC40920 - Certificate IV in Plumbing and Services
          </option>
        </select>
      </div>
    </div>
  );
};

const PreTrainingChecklistSection = ({
  formData,
  handleNestedCheckboxChange,
  handleNestedInputChange,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Pre-Training Checklist
      </h2>

      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-gray-700 mb-4">
          Please confirm the following items have been completed or discussed:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="preTrainingCompleted"
                checked={formData.preTrainingChecklist.preTrainingCompleted}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "preTrainingChecklist",
                    "preTrainingCompleted"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="preTrainingCompleted" className="text-gray-700">
                Pre-training form completed
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="entryRequirements"
                checked={formData.preTrainingChecklist.entryRequirements}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "preTrainingChecklist",
                    "entryRequirements"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="entryRequirements" className="text-gray-700">
                Entry Requirements discussed
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="llnAssessment"
                checked={formData.preTrainingChecklist.llnAssessment}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "preTrainingChecklist",
                    "llnAssessment"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="llnAssessment" className="text-gray-700">
                Language, Literacy and Numeracy (LLN) assessment completed
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="creditTransfer"
                checked={formData.preTrainingChecklist.creditTransfer}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "preTrainingChecklist",
                    "creditTransfer"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="creditTransfer" className="text-gray-700">
                Credit Transfer discussed
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="deliveryMode"
                checked={formData.preTrainingChecklist.deliveryMode}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "preTrainingChecklist",
                    "deliveryMode"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="deliveryMode" className="text-gray-700">
                Delivery Mode discussed
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="courseLocation"
                checked={formData.preTrainingChecklist.courseLocation}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "preTrainingChecklist",
                    "courseLocation"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="courseLocation" className="text-gray-700">
                Location of the course discussed
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rplDiscussed"
                checked={formData.preTrainingChecklist.rplDiscussed}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "preTrainingChecklist",
                    "rplDiscussed"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="rplDiscussed" className="text-gray-700">
                Recognition of prior learning (RPL) discussed
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="tuitionFees"
                checked={formData.preTrainingChecklist.tuitionFees}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "preTrainingChecklist",
                    "tuitionFees"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="tuitionFees" className="text-gray-700">
                Tuition fees, Concession and Exemption discussed
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="refundPolicy"
                checked={formData.preTrainingChecklist.refundPolicy}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "preTrainingChecklist",
                    "refundPolicy"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="refundPolicy" className="text-gray-700">
                Refund policy discussed
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="studentQuestions"
                checked={formData.preTrainingChecklist.studentQuestions}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "preTrainingChecklist",
                    "studentQuestions"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="studentQuestions" className="text-gray-700">
                Student questions answered
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="studentHandbook"
                checked={formData.preTrainingChecklist.studentHandbook}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "preTrainingChecklist",
                    "studentHandbook"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="studentHandbook" className="text-gray-700">
                I have read and understand the student handbook
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="specialNeeds"
                checked={formData.preTrainingChecklist.specialNeeds}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "preTrainingChecklist",
                    "specialNeeds"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="specialNeeds" className="text-gray-700">
                Special needs or assistance required during the course
              </label>
            </div>
          </div>
        </div>

        {formData.preTrainingChecklist.specialNeeds && (
          <div className="mt-4">
            <label className="block text-gray-700 mb-2">
              Please specify any special needs or assistance required:
            </label>
            <textarea
              value={formData.preTrainingChecklist.specialNeedsDetails}
              onChange={(e) =>
                handleNestedInputChange(
                  "preTrainingChecklist",
                  "specialNeedsDetails",
                  e.target.value
                )
              }
              className="w-full p-2 border border-gray-300 rounded"
              rows="3"
            ></textarea>
          </div>
        )}
      </div>
    </div>
  );
};

const PhotoConsentSection = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Consent for Publication of Photographs
      </h2>

      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-gray-700 mb-4">
          RTO occasionally takes photos of students participating in classes for
          publicity purposes. These photos may be displayed on our website. The
          names and details of the people in the photos are not released or
          published. Staff will always identify when they are taking photos so
          students who don't wish to have their photo taken can be excluded from
          the photo. If at any time your photo is published on the website and
          you would like it removed, we will do so within 24 hours of receiving
          a written request to remove it.
        </p>

        <div className="form-group">
          <label className="block text-gray-700 mb-2">
            Do you consent to the use of your photo under these conditions? *
          </label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="photoConsentYes"
                name="photoConsent"
                value="Yes"
                checked={formData.photoConsent === "Yes"}
                onChange={(e) =>
                  handleInputChange("photoConsent", e.target.value)
                }
                className="mr-2"
              />
              <label htmlFor="photoConsentYes" className="text-gray-700">
                Yes
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="photoConsentNo"
                name="photoConsent"
                value="No"
                checked={formData.photoConsent === "No"}
                onChange={(e) =>
                  handleInputChange("photoConsent", e.target.value)
                }
                className="mr-2"
              />
              <label htmlFor="photoConsentNo" className="text-gray-700">
                No
              </label>
            </div>
          </div>

          {formData.photoConsent === "No" && (
            <p className="mt-2 text-sm text-gray-500">
              If you indicated NO, please ensure you advise the staff member at
              the time the photo is being taken to ensure you are excluded from
              the photo.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const DeclarationSection = ({
  formData,
  handleInputChange,
  handleNestedInputChange,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-emerald-700 mb-4">
        Declaration of Information Accuracy
      </h2>

      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-gray-700 mb-4">
          I declare that the information I have provided on this enrolment form
          is true and accurate, and understand that providing false information
          may affect my eligibility to obtain government funding.
        </p>

        <p className="text-gray-700 mb-4">
          In signing or emailing this form I acknowledge and declare that:
        </p>

        <ol className="list-decimal ml-6 mb-6 text-gray-700 space-y-2">
          <li>
            I have read and understood and consent to the privacy notice and
            have completed all questions and details on the enrolment.
          </li>
          <li>
            The information herein provided is to the best of my knowledge true,
            correct and complete at the time of my enrolment.
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
            regulations, policies and disciplinary procedures whilst I remain an
            enrolled student.
          </li>
          <li>
            My participation in this course is subject to the right of RTO to
            cancel or amalgamate courses or classes. I agree to abide by all
            rules and regulations of RTO.
          </li>
          <li>
            I understand and have been provided with information by RTO in
            relation to Credit Transfer and Recognition of Prior Learning (RPL).
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
            during any RTO organised activity, and where emergency contact next
            of kin cannot be contacted within reasonable time, to seek
            ambulance, medical or surgical treatment at my cost.
          </li>
          <li>
            My academic results will be withheld until my debit is fully paid
            and any property belonging to RTO has been returned.
          </li>
          <li>
            I acknowledge that from time to time RTO may send me information
            regarding course opportunities and other promotional offers and that
            I have the ability to opt out.
          </li>
        </ol>

        <div className="mt-6 space-y-4">
          <div className="form-group">
            <label className="block text-gray-700 mb-2">Full Name: *</label>
            <input
              type="text"
              value={formData.studentDeclaration.name}
              onChange={(e) =>
                handleNestedInputChange(
                  "studentDeclaration",
                  "name",
                  e.target.value
                )
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 mb-2">Date: *</label>
            <input
              type="date"
              value={formData.studentDeclaration.date}
              onChange={(e) =>
                handleNestedInputChange(
                  "studentDeclaration",
                  "date",
                  e.target.value
                )
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500">
            By submitting this form, I am providing my electronic signature and
            agreeing to the declarations listed above.
          </p>
        </div>
      </div>
    </div>
  );
};

// Contact Source Section Component
