import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const RPLIntakeCPC31320WallFloorTiling = () => {
  const [activeSection, setActiveSection] = useState(1);
  const totalSections = 6; // Total number of sections

  const [formData, setFormData] = useState({
    studentInitials: "",
    studentName: "",
    courseQualification: "CPC31320 Certificate III in Wall and Floor Tiling",
    studentDeclaration: {
      name: "",
      date: "",
      signature: "",
    },
    confirmationOfReassessment: {
      studentName: "",
      qualification: "CPC31320 Certificate III in Wall and Floor Tiling",
      email: "",
      mobile: "",
      dob: "",
    },
    evidence: {
      photos: false,
      payslips: false,
      certificates: false,
      workSamples: false,
      testimonials: false,
      employerVerification: false,
      selfAssessment: false,
    },
    selfAssessment: {
      workExperience: "",
      declarationSignature: "",
      declarationDate: "",
      keySkills: "",
      tasksResponsibilities: "",
      training: "",
      additionalSupport: "",
      competencies: {
        investigateBusinessOpportunities: false,
        manageFinances: false,
        applyBasicLevelling: false,
        carryOutBasicDemolition: false,
        workEffectively: false,
        planAndOrganiseWork: false,
        conductWorkplaceCommunication: false,
        carryOutMeasurements: false,
        readAndInterpretPlans: false,
        handleWallAndFloorTilingMaterials: false,
        useWallAndFloorTilingTools: false,
        prepareSurfaces: false,
        installFloorTiles: false,
        installWallTiles: false,
        repairWallAndFloorTiling: false,
        installDecorativeTiling: false,
        installMosaicTiling: false,
        applyWaterproofing: false,
        tileCurvedSurfaces: false,
        applyWHSRequirements: false,
      },
    },
    employerVerification: {
      employer1: {
        orgName: "",
        supervisorName: "",
        position: "",
        contactNumber: "",
        email: "",
        employeeName: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        employmentType: "",
        duties: "",
      },
      employer2: {
        orgName: "",
        supervisorName: "",
        position: "",
        contactNumber: "",
        email: "",
        employeeName: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        employmentType: "",
        duties: "",
      },
    },
    refereeTestimonial: {
      studentName: "", // Add this
      employmentPeriod: "",
      refereeName: "",
      position: "",
      qualification: "",
      organisation: "",
      phoneNumber: "",
      emailAddress: "",
      signature: "",
      date: "",
      competencies: {
        investigateBusinessOpportunities: false,
        manageFinances: false,
        applyBasicLevelling: false,
        carryOutBasicDemolition: false,
        workEffectively: false,
        planAndOrganiseWork: false,
        conductWorkplaceCommunication: false,
        carryOutMeasurements: false,
        readAndInterpretPlans: false,
        handleWallAndFloorTilingMaterials: false,
        useWallAndFloorTilingTools: false,
        prepareSurfaces: false,
        installFloorTiles: false,
        installWallTiles: false,
        repairWallAndFloorTiling: false,
        installDecorativeTiling: false,
        installMosaicTiling: false,
        applyWaterproofing: false,
        tileCurvedSurfaces: false,
        applyWHSRequirements: false,
      },
    },
    confirmationOfAssessment: {
      studentName: "",
      qualification: "",
      email: "",
      mobile: "",
      dob: "",
    },
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
      // case 1:
      //   return formData.studentInitials.trim() !== "";
      case 2:
        return (
          formData.studentDeclaration.name.trim() !== "" &&
          formData.studentDeclaration.date.trim() !== ""
        );
      case 3:
        // At least one form of evidence should be selected
        return Object.values(formData.evidence).some((value) => value === true);
      case 4:
        return (
          formData.selfAssessment.keySkills.trim() !== "" &&
          formData.selfAssessment.workExperience.trim() !== ""
        );
      case 5:
        return (
          formData.employerVerification.employer1.orgName.trim() !== "" &&
          formData.employerVerification.employer1.supervisorName.trim() !== ""
        );
      case 6:
        return (
          formData.refereeTestimonial.refereeName.trim() !== "" &&
          formData.refereeTestimonial.position.trim() !== ""
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateSection(activeSection)) {
      setActiveSection((prev) => Math.min(prev + 1, totalSections));
    } else {
      alert("Please complete all required fields before proceeding.");
    }
  };

  const handleBack = () => {
    setActiveSection((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Submit data to backend
    alert("RPL Assessment submitted successfully!");
  };

  const progressPercentage = (activeSection / totalSections) * 100;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto pt-10 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-medium font-outfit text-emerald-800 mb-2">
              Certified Australia
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
            {/* Cover Letter Section */}
            {/* {activeSection === 1 && (
              <CoverLetter
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )} */}

            {/* Student Declaration Section */}
            {activeSection === 1 && (
              <StudentDeclaration
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
              />
            )}
            {activeSection === 2 && (
              <ConfirmationOfReassessment
                formData={formData}
                handleInputChange={handleInputChange}
                handleNestedInputChange={handleNestedInputChange}
              />
            )}
            {/* Evidence Collection */}
            {activeSection === 3 && (
              <EvidenceCollection
                formData={formData}
                handleCheckboxChange={handleCheckboxChange}
              />
            )}

            {/* Self Assessment */}
            {activeSection === 4 && (
              <SelfAssessment
                formData={formData}
                handleInputChange={handleInputChange}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
              />
            )}

            {/* Employer Verification */}
            {activeSection === 5 && (
              <EmployerVerification
                formData={formData}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
              />
            )}

            {/* Referee Testimonial */}
            {activeSection === 6 && (
              <RefereeTestimonial
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
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
                  Submit Assessment
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

export default RPLIntakeCPC31320WallFloorTiling;

// Cover Letter Component
const CoverLetter = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Cover Letter for RPL Assessment Completion
      </h3>

      <div className="mb-6">
        <p className="mb-4">
          We are reaching out to guide you through the next steps of your
          Recognition of Prior Learning (RPL) assessment process. As part of
          your assessment, you are required to complete specific sections of the
          assessment to ensure compliance and provide the necessary evidence for
          your qualification.
        </p>

        <h4 className="font-medium text-gray-800 mb-2 underline">
          RPL Assessment Checklist
        </h4>

        <div className="mb-4">
          <h5 className="font-medium mb-2">1. Initial Steps</h5>
          <ul className="list-inside space-y-1">
            <li>&#9634; Student Application Received</li>
            <li>&#9634; Confirmation of Enrolment (COE) Issued</li>
            <li>&#9634; Student Declaration Signed</li>
          </ul>
        </div>

        <div className="mb-4">
          <h5 className="font-medium mb-2">2. Evidence Collection</h5>
          <ul className="list-inside space-y-1">
            <li>&#9634; Photos or Videos of Tasks Performed</li>
            <li>&#9634; Payslips or Employment Contracts</li>
            <li>&#9634; Previous Certificates or Qualifications</li>
            <li>&#9634; Work Samples (Reports, Documentation, etc.)</li>
            <li>&#9634; Referee Testimonials and Declarations</li>
            <li>&#9634; Employer Verification</li>
            <li>&#9634; Student Self-Assessment</li>
          </ul>
        </div>

        <div className="mb-4">
          <h5 className="font-medium mb-2">3. Assessment Process</h5>
          <ul className="list-inside space-y-1">
            <li>&#9634; Competency Mapping Completed</li>
            <li>&#9634; Competency Conversation Conducted</li>
            <li>&#9634; Skills Observation Checklist Completed</li>
            <li>&#9634; Third-Party RPL Kit Completed by Assessor</li>
            <li>&#9634; Evidence Authentication Verified</li>
          </ul>
        </div>

        <div className="mb-4">
          <h5 className="font-medium mb-2">4. Compliance and Reporting</h5>
          <ul className="list-inside space-y-1">
            <li>&#9634; Assessor's Final Decision Recorded</li>
            <li>&#9634; Student Feedback Survey Issued</li>
            <li>&#9634; Records Management Completed</li>
            <li>&#9634; Appeals Process Communicated</li>
          </ul>
        </div>

        <div className="mb-6">
          <h5 className="font-medium mb-2">5. Post-Assessment Steps</h5>
          <ul className="list-inside space-y-1">
            <li>&#9634; Certification Issued</li>
            <li>&#9634; Gap Training Plan Provided (If Required)</li>
            <li>&#9634; Compliance Review Conducted; including validation</li>
          </ul>
        </div>

        <h4 className="font-medium text-gray-800 mb-2 underline">
          Sections to Be Completed by you:
        </h4>

        <div className="mb-4">
          <h5 className="font-medium mb-2">1. Declaration</h5>
          <p>
            Please complete and sign the student declaration form provided. This
            is a mandatory step to confirm your understanding of the RPL process
            and compliance with our requirements.
          </p>
        </div>

        <div className="mb-6">
          <h5 className="font-medium mb-2">2. Evidence Collection</h5>
          <p className="mb-2">
            Submit all relevant supporting documents as listed below:
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Photos or videos of tasks you have performed</li>
            <li>
              Pay slips or employment contracts as proof of work experience
            </li>
            <li>Copies of any previous certificates or qualifications</li>
            <li>Samples of your work, such as reports or documentation</li>
          </ul>

          <p className="mt-2 mb-2">Complete and submit:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              Complete the self-assessment form provided to reflect your
              competency levels
            </li>
            <li>
              Referee testimonials and declarations from employers or colleagues
            </li>
            <li>
              Employer verification confirming your roles and responsibilities
            </li>
          </ul>
        </div>

        <h4 className="font-medium text-gray-800 mb-2 underline">
          Next Steps:
        </h4>
        <p>
          Once you have completed the required sections, please ensure all
          documents are emailed directly to our support team at
          info@certifiedaustralia.com.au. Our team will review your submission
          and notify you if any additional information is required.
        </p>
        <p className="mt-2">
          If you have any questions or need assistance with completing these
          sections, please do not hesitate to contact us. Our email is
          info@certifiedaustralia.com.au.
        </p>
        <p className="mt-4">
          Best regards,
          <br />
          Certified Australia
        </p>
      </div>

      <div className="mt-6">
        <label
          htmlFor="studentInitials"
          className="block text-gray-700 font-medium mb-2"
        >
          Student Initials:
        </label>
        <input
          type="text"
          id="studentInitials"
          value={formData.studentInitials}
          onChange={(e) => handleInputChange("studentInitials", e.target.value)}
          className="w-48 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>
    </div>
  );
};

// Student Declaration Component
const StudentDeclaration = ({ formData, handleNestedInputChange }) => {
  return (
    <div>
      <p className="mb-4">
        We are reaching out to guide you through the next steps of your
        Recognition of Prior Learning (RPL) assessment process. As part of your
        assessment, you are required to complete specific sections of the
        assessment to ensure compliance and provide the necessary evidence for
        your qualification.
      </p>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Recognition of Prior Learning (RPL) Student Declaration
      </h3>

      <p className="mb-4">
        This declaration is a formal statement from the student acknowledging
        their participation in the RPL process and agreeing to the terms and
        conditions outlined by the RTO (Registered Training Organisation). See
        RTO handbook for more information.
      </p>

      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-800 mb-3">1. Student Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Name:</label>
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Date:</label>
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-800 mb-3">
            2. Declaration Statements
          </h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              I declare that the evidence provided for the RPL assessment is
              true, accurate, and authentic.
            </li>
            <li>
              I confirm that all documentation submitted is my own or has been
              obtained with proper authorisation.
            </li>
            <li>
              I agree to comply with all RPL process requirements, including
              submitting any additional evidence requested by the assessor.
            </li>
            <li>
              I understand that any false or misleading information may result
              in the rejection of my RPL application.
            </li>
            <li>
              I acknowledge that the RTO may contact my employer, referee, or
              other relevant parties to verify the authenticity of the evidence
              provided.
            </li>
            <li>
              I have been informed of my rights to appeal the assessment outcome
              if required.
            </li>
            <li>
              More information can be found at
              https://www.asqa.gov.au/guidance-resources/resources-providers/faqs/recognition-prior-learning-rpl
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-800 mb-3">
            3. Student Acknowledgement
          </h4>
          <p className="mb-3">
            I,{" "}
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
              className="w-48 p-1 border-b border-gray-300 focus:outline-none focus:border-emerald-500"
            />{" "}
            (Student Name), have read and understood the above statements. I
            agree to the terms and conditions outlined as part of the RPL
            process.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-gray-700 mb-2">Signature:</label>
              <input
                type="text"
                value={formData.studentDeclaration.signature}
                onChange={(e) =>
                  handleNestedInputChange(
                    "studentDeclaration",
                    "signature",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Date:</label>
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const ConfirmationOfReassessment = ({ formData, handleInputChange }) => {
  return (
    <div className="border border-gray-300 rounded-md p-6 mb-6">
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Confirmation of Reassessment
      </h3>

      <div className="bg-gray-50 p-6 rounded-md mb-6">
        <h4 className="font-medium text-gray-800 mb-4">STUDENT INFORMATION</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Student Name:
            </label>
            <input
              type="text"
              value={formData.confirmationOfReassessment?.studentName || ""}
              onChange={(e) =>
                handleInputChange("confirmationOfReassessment", {
                  ...formData.confirmationOfReassessment,
                  studentName: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Qualification:
            </label>
            <input
              type="text"
              readOnly
              value={
                formData.confirmationOfReassessment?.qualification ||
                formData.courseQualification
              }
              onChange={(e) =>
                handleInputChange("confirmationOfReassessment", {
                  ...formData.confirmationOfReassessment,
                  qualification: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              value={formData.confirmationOfReassessment?.email || ""}
              onChange={(e) =>
                handleInputChange("confirmationOfReassessment", {
                  ...formData.confirmationOfReassessment,
                  email: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mobile:
            </label>
            <input
              type="tel"
              value={formData.confirmationOfReassessment?.mobile || ""}
              onChange={(e) =>
                handleInputChange("confirmationOfReassessment", {
                  ...formData.confirmationOfReassessment,
                  mobile: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Date of Birth:
            </label>
            <input
              type="date"
              value={formData.confirmationOfReassessment?.dob || ""}
              onChange={(e) =>
                handleInputChange("confirmationOfReassessment", {
                  ...formData.confirmationOfReassessment,
                  dob: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Dear student,</h4>
        <p className="mb-4">
          Thank you for your patience during the assessment process. This
          document confirms that your RPL application will be assessed as part
          of our compliance procedures.
        </p>
        <p className="mb-4">
          You are required to complete the 'Declaration' and 'Evidence
          Collection' sections as part of this assessment process. All required
          documents will be provided to assist you in this process.
        </p>
        <p className="mb-4">
          Below is the completed checklist outlining the steps to be undertaken
          during the assessment:
        </p>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Assessment Checklist</h4>
        <div className="bg-gray-50 p-4 rounded">
          <ul className="list-none space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-6 h-6 bg-gray-200 text-gray-500 rounded-full text-center mr-2 flex-shrink-0">
                □
              </span>
              <span>Student Application Received</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-6 h-6 bg-gray-200 text-gray-500 rounded-full text-center mr-2 flex-shrink-0">
                □
              </span>
              <span>Confirmation of Enrolment (COE) Issued</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-6 h-6 bg-gray-200 text-gray-500 rounded-full text-center mr-2 flex-shrink-0">
                □
              </span>
              <span>Student Declaration Signed</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-6 h-6 bg-gray-200 text-gray-500 rounded-full text-center mr-2 flex-shrink-0">
                □
              </span>
              <span>Evidence Collection Completed</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-4">
          Outcome of Assessment
        </h4>
        <p>
          Upon completing the submission for assessment, we will inform you of
          the outcome of your RPL assessment.
        </p>
      </div>

      <div className="text-right text-gray-700 italic">Certified Australia</div>
    </div>
  );
};

// Evidence Collection Component
const EvidenceCollection = ({ formData, handleCheckboxChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Evidence Collection
      </h3>

      <p className="mb-6">
        Please indicate which types of evidence you are submitting as part of
        your RPL application. Check all that apply and ensure you have these
        documents ready to upload or submit with your application.
      </p>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
        <h4 className="font-medium text-gray-800 mb-4">
          Required Evidence Checklist
        </h4>

        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="photos"
              checked={formData.evidence.photos}
              onChange={() => handleCheckboxChange("evidence", "photos")}
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="photos" className="ml-2 text-gray-700">
              Photos or Videos of Tasks Performed
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="payslips"
              checked={formData.evidence.payslips}
              onChange={() => handleCheckboxChange("evidence", "payslips")}
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="payslips" className="ml-2 text-gray-700">
              Payslips or Employment Contracts
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="certificates"
              checked={formData.evidence.certificates}
              onChange={() => handleCheckboxChange("evidence", "certificates")}
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="certificates" className="ml-2 text-gray-700">
              Previous Certificates or Qualifications
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="workSamples"
              checked={formData.evidence.workSamples}
              onChange={() => handleCheckboxChange("evidence", "workSamples")}
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="workSamples" className="ml-2 text-gray-700">
              Work Samples (Reports, Documentation, etc.)
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="testimonials"
              checked={formData.evidence.testimonials}
              onChange={() => handleCheckboxChange("evidence", "testimonials")}
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="testimonials" className="ml-2 text-gray-700">
              Referee Testimonials and Declarations
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="employerVerification"
              checked={formData.evidence.employerVerification}
              onChange={() =>
                handleCheckboxChange("evidence", "employerVerification")
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label
              htmlFor="employerVerification"
              className="ml-2 text-gray-700"
            >
              Employer Verification
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="selfAssessment"
              checked={formData.evidence.selfAssessment}
              onChange={() =>
                handleCheckboxChange("evidence", "selfAssessment")
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="selfAssessment" className="ml-2 text-gray-700">
              Student Self-Assessment
            </label>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h4 className="font-medium text-yellow-800 mb-3">Important Note:</h4>
        <p className="text-yellow-700">
          Your RPL assessment will be based on the evidence you provide. The
          more comprehensive and relevant your evidence, the better chance you
          have of demonstrating your competency. Please ensure all documents are
          clear, legible, and properly labeled.
        </p>
      </div>
    </div>
  );
};
// Self Assessment Component
const SelfAssessment = ({
  formData,
  handleNestedInputChange,
  handleNestedCheckboxChange,
}) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Recognition of Prior Learning (RPL) Student Self-Assessment
      </h3>

      <p className="mb-4">
        This self-assessment form allows students to reflect on their skills,
        knowledge, and experience. Please complete this form to the best of your
        ability, providing specific examples where possible.
      </p>

      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-800 mb-3">
            Self-Assessment Questions
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">
                1. What are your key skills and strengths relevant to this
                qualification?
              </label>
              <textarea
                value={formData.selfAssessment.keySkills}
                onChange={(e) =>
                  handleNestedInputChange(
                    "selfAssessment",
                    "keySkills",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows="3"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                2. Describe your work experience and how it relates to the units
                of competency in this course (briefly outline your industry
                experience).
              </label>
              <textarea
                value={formData.selfAssessment.workExperience}
                onChange={(e) =>
                  handleNestedInputChange(
                    "selfAssessment",
                    "workExperience",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows="3"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                3. What specific tasks or responsibilities have you performed in
                your workplace that demonstrate your competency?
              </label>
              <textarea
                value={formData.selfAssessment.tasksResponsibilities}
                onChange={(e) =>
                  handleNestedInputChange(
                    "selfAssessment",
                    "tasksResponsibilities",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows="3"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                4. Have you undertaken any formal or informal training relevant
                to this qualification? If yes, please provide details.
              </label>
              <textarea
                value={formData.selfAssessment.training}
                onChange={(e) =>
                  handleNestedInputChange(
                    "selfAssessment",
                    "training",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows="3"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                5. Are there any areas where you feel you need additional
                training or support? If yes, please explain.
              </label>
              <textarea
                value={formData.selfAssessment.additionalSupport}
                onChange={(e) =>
                  handleNestedInputChange(
                    "selfAssessment",
                    "additionalSupport",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-800 mb-3">
            Alignment with Competencies
          </h4>
          <p className="mb-2">
            Please review the units of competency for this qualification and
            indicate whether you believe you are competent in each area:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="applyWHSRequirements"
                checked={
                  formData.selfAssessment.competencies.applyWHSRequirements
                }
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "applyWHSRequirements"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="applyWHSRequirements"
                className="ml-2 text-gray-700"
              >
                Apply WHS requirements, policies and procedures in the
                construction industry
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="investigateBusinessOpportunities"
                checked={
                  formData.selfAssessment.competencies
                    .investigateBusinessOpportunities
                }
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "investigateBusinessOpportunities"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="investigateBusinessOpportunities"
                className="ml-2 text-gray-700"
              >
                Investigate business opportunities
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="manageFinances"
                checked={formData.selfAssessment.competencies.manageFinances}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "manageFinances"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="manageFinances" className="ml-2 text-gray-700">
                Manage finances for new business ventures
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="applyBasicLevelling"
                checked={
                  formData.selfAssessment.competencies.applyBasicLevelling
                }
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "applyBasicLevelling"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="applyBasicLevelling"
                className="ml-2 text-gray-700"
              >
                Apply basic levelling procedures
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="carryOutBasicDemolition"
                checked={
                  formData.selfAssessment.competencies.carryOutBasicDemolition
                }
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "carryOutBasicDemolition"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="carryOutBasicDemolition"
                className="ml-2 text-gray-700"
              >
                Carry out basic demolition
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="workEffectively"
                checked={formData.selfAssessment.competencies.workEffectively}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "workEffectively"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="workEffectively" className="ml-2 text-gray-700">
                Work effectively and sustainably in the construction industry
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="planAndOrganiseWork"
                checked={
                  formData.selfAssessment.competencies.planAndOrganiseWork
                }
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "planAndOrganiseWork"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="planAndOrganiseWork"
                className="ml-2 text-gray-700"
              >
                Plan and organise work
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="conductWorkplaceCommunication"
                checked={
                  formData.selfAssessment.competencies
                    .conductWorkplaceCommunication
                }
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "conductWorkplaceCommunication"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="conductWorkplaceCommunication"
                className="ml-2 text-gray-700"
              >
                Conduct workplace communication
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="carryOutMeasurements"
                checked={
                  formData.selfAssessment.competencies.carryOutMeasurements
                }
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "carryOutMeasurements"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="carryOutMeasurements"
                className="ml-2 text-gray-700"
              >
                Carry out measurements and calculations
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="readAndInterpretPlans"
                checked={
                  formData.selfAssessment.competencies.readAndInterpretPlans
                }
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "readAndInterpretPlans"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="readAndInterpretPlans"
                className="ml-2 text-gray-700"
              >
                Read and interpret plans and specifications
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="handleWallAndFloorTilingMaterials"
                checked={
                  formData.selfAssessment.competencies
                    .handleWallAndFloorTilingMaterials
                }
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "handleWallAndFloorTilingMaterials"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="handleWallAndFloorTilingMaterials"
                className="ml-2 text-gray-700"
              >
                Handle wall and floor tiling materials
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="useWallAndFloorTilingTools"
                checked={
                  formData.selfAssessment.competencies
                    .useWallAndFloorTilingTools
                }
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "useWallAndFloorTilingTools"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="useWallAndFloorTilingTools"
                className="ml-2 text-gray-700"
              >
                Use wall and floor tiling tools and equipment
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="prepareSurfaces"
                checked={formData.selfAssessment.competencies.prepareSurfaces}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "prepareSurfaces"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="prepareSurfaces" className="ml-2 text-gray-700">
                Prepare surfaces for tiling application
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="installFloorTiles"
                checked={formData.selfAssessment.competencies.installFloorTiles}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "installFloorTiles"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="installFloorTiles" className="ml-2 text-gray-700">
                Install floor tiles
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="installWallTiles"
                checked={formData.selfAssessment.competencies.installWallTiles}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "installWallTiles"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="installWallTiles" className="ml-2 text-gray-700">
                Install wall tiles
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="repairWallAndFloorTiling"
                checked={
                  formData.selfAssessment.competencies.repairWallAndFloorTiling
                }
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "repairWallAndFloorTiling"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="repairWallAndFloorTiling"
                className="ml-2 text-gray-700"
              >
                Repair wall and floor tiling
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="installDecorativeTiling"
                checked={
                  formData.selfAssessment.competencies.installDecorativeTiling
                }
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "installDecorativeTiling"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="installDecorativeTiling"
                className="ml-2 text-gray-700"
              >
                Install decorative tiling
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="installMosaicTiling"
                checked={
                  formData.selfAssessment.competencies.installMosaicTiling
                }
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "installMosaicTiling"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="installMosaicTiling"
                className="ml-2 text-gray-700"
              >
                Install mosaic tiling
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="applyWaterproofing"
                checked={
                  formData.selfAssessment.competencies.applyWaterproofing
                }
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "applyWaterproofing"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="applyWaterproofing"
                className="ml-2 text-gray-700"
              >
                Apply waterproofing for wall and floor tiling
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="tileCurvedSurfaces"
                checked={
                  formData.selfAssessment.competencies.tileCurvedSurfaces
                }
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    "tileCurvedSurfaces"
                  )
                }
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="tileCurvedSurfaces"
                className="ml-2 text-gray-700"
              >
                Tile curved surfaces
              </label>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-800 mb-3">
            Student Declaration
          </h4>
          <p className="mb-4">
            I,{" "}
            {formData.selfAssessment.workExperience
              ? formData.studentDeclaration.name
              : "_________________"}{" "}
            (Student Name), declare that the information provided in this
            self-assessment is accurate and true to the best of my knowledge. I
            understand that this self-assessment will be used as part of the RPL
            process and may require verification.
          </p>
        </div>
      </div>
    </div>
  );
};

// Employer Verification Component
// Employer Verification Component
const EmployerVerification = ({ formData, handleDoubleNestedInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Employment Verification Document
      </h3>

      <p className="mb-4">
        This form is used to verify the employment details of a student applying
        for Recognition of Prior Learning (RPL). It must be completed by the
        student's employer or supervisor.
      </p>

      {/* First Employer */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-800 mb-4 underline">
          Primary Employment Details
        </h4>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-6">
            <div>
              <h5 className="font-medium text-gray-700 mb-3">
                1. Employer Details
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Name of Employer/Organisation:
                  </label>
                  <input
                    type="text"
                    value={formData.employerVerification.employer1.orgName}
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer1",
                        "orgName",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Supervisor/Manager Name:
                  </label>
                  <input
                    type="text"
                    value={
                      formData.employerVerification.employer1.supervisorName
                    }
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer1",
                        "supervisorName",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Position/Title:
                  </label>
                  <input
                    type="text"
                    value={formData.employerVerification.employer1.position}
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer1",
                        "position",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Contact Number:
                  </label>
                  <input
                    type="tel"
                    value={
                      formData.employerVerification.employer1.contactNumber
                    }
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer1",
                        "contactNumber",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    value={formData.employerVerification.employer1.email}
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer1",
                        "email",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-700 mb-3">
                2. Employment Details
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Employee Name:
                  </label>
                  <input
                    type="text"
                    value={formData.employerVerification.employer1.employeeName}
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer1",
                        "employeeName",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Job Title:</label>
                  <input
                    type="text"
                    value={formData.employerVerification.employer1.jobTitle}
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer1",
                        "jobTitle",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    value={formData.employerVerification.employer1.startDate}
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer1",
                        "startDate",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">End Date:</label>
                  <input
                    type="date"
                    value={formData.employerVerification.employer1.endDate}
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer1",
                        "endDate",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 mb-2">
                  Employment Type:
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="employmentType1"
                      value="Full-Time"
                      checked={
                        formData.employerVerification.employer1
                          .employmentType === "Full-Time"
                      }
                      onChange={(e) =>
                        handleDoubleNestedInputChange(
                          "employerVerification",
                          "employer1",
                          "employmentType",
                          e.target.value
                        )
                      }
                      className="form-radio text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2">Full-Time</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="employmentType1"
                      value="Part-Time"
                      checked={
                        formData.employerVerification.employer1
                          .employmentType === "Part-Time"
                      }
                      onChange={(e) =>
                        handleDoubleNestedInputChange(
                          "employerVerification",
                          "employer1",
                          "employmentType",
                          e.target.value
                        )
                      }
                      className="form-radio text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2">Part-Time</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="employmentType1"
                      value="Casual"
                      checked={
                        formData.employerVerification.employer1
                          .employmentType === "Casual"
                      }
                      onChange={(e) =>
                        handleDoubleNestedInputChange(
                          "employerVerification",
                          "employer1",
                          "employmentType",
                          e.target.value
                        )
                      }
                      className="form-radio text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2">Casual</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-700 mb-3">
                3. Description of Duties
              </h5>
              <label className="block text-gray-700 mb-2">
                Please provide a detailed description of the student's duties
                and responsibilities:
              </label>
              <textarea
                value={formData.employerVerification.employer1.duties}
                onChange={(e) =>
                  handleDoubleNestedInputChange(
                    "employerVerification",
                    "employer1",
                    "duties",
                    e.target.value
                  )
                }
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Second Employer (Optional) */}
      <div>
        <h4 className="font-medium text-gray-800 mb-4 underline">
          Additional Employment Details (if applicable)
        </h4>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-6">
            <div>
              <h5 className="font-medium text-gray-700 mb-3">
                1. Employer Details
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Name of Employer/Organisation:
                  </label>
                  <input
                    type="text"
                    value={formData.employerVerification.employer2.orgName}
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer2",
                        "orgName",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Supervisor/Manager Name:
                  </label>
                  <input
                    type="text"
                    value={
                      formData.employerVerification.employer2.supervisorName
                    }
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer2",
                        "supervisorName",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Position/Title:
                  </label>
                  <input
                    type="text"
                    value={formData.employerVerification.employer2.position}
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer2",
                        "position",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Contact Number:
                  </label>
                  <input
                    type="tel"
                    value={
                      formData.employerVerification.employer2.contactNumber
                    }
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer2",
                        "contactNumber",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    value={formData.employerVerification.employer2.email}
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer2",
                        "email",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-700 mb-3">
                2. Employment Details
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Employee Name:
                  </label>
                  <input
                    type="text"
                    value={formData.employerVerification.employer2.employeeName}
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer2",
                        "employeeName",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Job Title:</label>
                  <input
                    type="text"
                    value={formData.employerVerification.employer2.jobTitle}
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer2",
                        "jobTitle",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    value={formData.employerVerification.employer2.startDate}
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer2",
                        "startDate",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">End Date:</label>
                  <input
                    type="date"
                    value={formData.employerVerification.employer2.endDate}
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer2",
                        "endDate",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 mb-2">
                  Employment Type:
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="employmentType2"
                      value="Full-Time"
                      checked={
                        formData.employerVerification.employer2
                          .employmentType === "Full-Time"
                      }
                      onChange={(e) =>
                        handleDoubleNestedInputChange(
                          "employerVerification",
                          "employer2",
                          "employmentType",
                          e.target.value
                        )
                      }
                      className="form-radio text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2">Full-Time</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="employmentType2"
                      value="Part-Time"
                      checked={
                        formData.employerVerification.employer2
                          .employmentType === "Part-Time"
                      }
                      onChange={(e) =>
                        handleDoubleNestedInputChange(
                          "employerVerification",
                          "employer2",
                          "employmentType",
                          e.target.value
                        )
                      }
                      className="form-radio text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2">Part-Time</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="employmentType2"
                      value="Casual"
                      checked={
                        formData.employerVerification.employer2
                          .employmentType === "Casual"
                      }
                      onChange={(e) =>
                        handleDoubleNestedInputChange(
                          "employerVerification",
                          "employer2",
                          "employmentType",
                          e.target.value
                        )
                      }
                      className="form-radio text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2">Casual</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-700 mb-3">
                3. Description of Duties
              </h5>
              <label className="block text-gray-700 mb-2">
                Please provide a detailed description of the student's duties
                and responsibilities:
              </label>
              <textarea
                value={formData.employerVerification.employer2.duties}
                onChange={(e) =>
                  handleDoubleNestedInputChange(
                    "employerVerification",
                    "employer2",
                    "duties",
                    e.target.value
                  )
                }
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-blue-800">
          <strong>Note:</strong> The employment verification document must be
          completed by your employer or supervisor. Please ensure that all
          information provided is accurate and can be verified.
        </p>
      </div>
    </div>
  );
};

// Referee Testimonial Component
const RefereeTestimonial = ({
  formData,
  handleNestedInputChange,
  handleNestedCheckboxChange,
}) => {
  const competencyList = [
    {
      id: "investigateBusinessOpportunities",
      label: "Investigate business opportunities",
    },
    {
      id: "manageFinances",
      label: "Manage finances for new business ventures",
    },
    { id: "applyBasicLevelling", label: "Apply basic levelling procedures" },
    { id: "carryOutBasicDemolition", label: "Carry out basic demolition" },
    {
      id: "workEffectively",
      label: "Work effectively and sustainably in the construction industry",
    },
    { id: "planAndOrganiseWork", label: "Plan and organise work" },
    {
      id: "conductWorkplaceCommunication",
      label: "Conduct workplace communication",
    },
    {
      id: "carryOutMeasurements",
      label: "Carry out measurements and calculations",
    },
    {
      id: "readAndInterpretPlans",
      label: "Read and interpret plans and specifications",
    },
    {
      id: "handleWallAndFloorTilingMaterials",
      label: "Handle wall and floor tiling materials",
    },
    {
      id: "useWallAndFloorTilingTools",
      label: "Use wall and floor tiling tools and equipment",
    },
    { id: "prepareSurfaces", label: "Prepare surfaces for tiling application" },
    { id: "installFloorTiles", label: "Install floor tiles" },
    { id: "installWallTiles", label: "Install wall tiles" },
    { id: "repairWallAndFloorTiling", label: "Repair wall and floor tiling" },
    { id: "installDecorativeTiling", label: "Install decorative tiling" },
    { id: "installMosaicTiling", label: "Install mosaic tiling" },
    {
      id: "applyWaterproofing",
      label: "Apply waterproofing for wall and floor tiling",
    },
    { id: "tileCurvedSurfaces", label: "Tile curved surfaces" },
    {
      id: "applyWHSRequirements",
      label:
        "Apply WHS requirements, policies and procedures in the construction industry",
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Referee Testimonial and Skills Verification Declaration
      </h3>

      <p className="mb-6">
        This document serves as an official testimonial certifying that the
        above-named individual has demonstrated the competencies and practical
        skills required for CPC31320 Certificate III in Wall and Floor Tiling as
        outlined below. These skills were performed and verified during their
        employment.
      </p>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
        <h4 className="font-medium text-gray-800 mb-4">
          Core Competencies and Activities Performed by the Candidate
        </h4>

        <p className="mb-4 text-gray-700">
          The following list includes workplace activities regularly performed
          by the candidate as part of their role, aligned with the industry
          standards and requirements of the CPC31320 Certificate III in Wall and
          Floor Tiling. As a referee, I certify that I have directly observed or
          supervised the candidate in these tasks and can confirm their
          competency in each area.
        </p>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {competencyList.map((competency) => (
            <div key={competency.id} className="flex items-center">
              <input
                type="checkbox"
                id={`referee-${competency.id}`}
                checked={
                  formData.refereeTestimonial.competencies[competency.id]
                }
                onChange={() => {}}
                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor={`referee-${competency.id}`}
                className="ml-2 text-gray-700"
              >
                {competency.label}
              </label>
            </div>
          ))}
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="applyWHSRequirements"
              checked={
                formData.refereeTestimonial.competencies.applyWHSRequirements
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "applyWHSRequirements"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label
              htmlFor="applyWHSRequirements"
              className="ml-2 text-gray-700"
            >
              Apply WHS requirements, policies and procedures in the
              construction industry
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="investigateBusinessOpportunities"
              checked={
                formData.refereeTestimonial.competencies
                  .investigateBusinessOpportunities
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "investigateBusinessOpportunities"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label
              htmlFor="investigateBusinessOpportunities"
              className="ml-2 text-gray-700"
            >
              Investigate business opportunities
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="manageFinances"
              checked={formData.refereeTestimonial.competencies.manageFinances}
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "manageFinances"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="manageFinances" className="ml-2 text-gray-700">
              Manage finances for new business ventures
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="applyBasicLevelling"
              checked={
                formData.refereeTestimonial.competencies.applyBasicLevelling
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "applyBasicLevelling"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="applyBasicLevelling" className="ml-2 text-gray-700">
              Apply basic levelling procedures
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="carryOutBasicDemolition"
              checked={
                formData.refereeTestimonial.competencies.carryOutBasicDemolition
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "carryOutBasicDemolition"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label
              htmlFor="carryOutBasicDemolition"
              className="ml-2 text-gray-700"
            >
              Carry out basic demolition
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="workEffectively"
              checked={formData.refereeTestimonial.competencies.workEffectively}
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "workEffectively"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="workEffectively" className="ml-2 text-gray-700">
              Work effectively and sustainably in the construction industry
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="planAndOrganiseWork"
              checked={
                formData.refereeTestimonial.competencies.planAndOrganiseWork
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "planAndOrganiseWork"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="planAndOrganiseWork" className="ml-2 text-gray-700">
              Plan and organise work
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="conductWorkplaceCommunication"
              checked={
                formData.refereeTestimonial.competencies
                  .conductWorkplaceCommunication
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "conductWorkplaceCommunication"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label
              htmlFor="conductWorkplaceCommunication"
              className="ml-2 text-gray-700"
            >
              Conduct workplace communication
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="carryOutMeasurements"
              checked={
                formData.refereeTestimonial.competencies.carryOutMeasurements
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "carryOutMeasurements"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label
              htmlFor="carryOutMeasurements"
              className="ml-2 text-gray-700"
            >
              Carry out measurements and calculations
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="readAndInterpretPlans"
              checked={
                formData.refereeTestimonial.competencies.readAndInterpretPlans
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "readAndInterpretPlans"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label
              htmlFor="readAndInterpretPlans"
              className="ml-2 text-gray-700"
            >
              Read and interpret plans and specifications
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="handleWallAndFloorTilingMaterials"
              checked={
                formData.refereeTestimonial.competencies
                  .handleWallAndFloorTilingMaterials
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "handleWallAndFloorTilingMaterials"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label
              htmlFor="handleWallAndFloorTilingMaterials"
              className="ml-2 text-gray-700"
            >
              Handle wall and floor tiling materials
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="useWallAndFloorTilingTools"
              checked={
                formData.refereeTestimonial.competencies
                  .useWallAndFloorTilingTools
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "useWallAndFloorTilingTools"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label
              htmlFor="useWallAndFloorTilingTools"
              className="ml-2 text-gray-700"
            >
              Use wall and floor tiling tools and equipment
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="prepareSurfaces"
              checked={formData.refereeTestimonial.competencies.prepareSurfaces}
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "prepareSurfaces"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="prepareSurfaces" className="ml-2 text-gray-700">
              Prepare surfaces for tiling application
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="installFloorTiles"
              checked={
                formData.refereeTestimonial.competencies.installFloorTiles
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "installFloorTiles"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="installFloorTiles" className="ml-2 text-gray-700">
              Install floor tiles
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="installWallTiles"
              checked={
                formData.refereeTestimonial.competencies.installWallTiles
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "installWallTiles"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="installWallTiles" className="ml-2 text-gray-700">
              Install wall tiles
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="repairWallAndFloorTiling"
              checked={
                formData.refereeTestimonial.competencies
                  .repairWallAndFloorTiling
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "repairWallAndFloorTiling"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label
              htmlFor="repairWallAndFloorTiling"
              className="ml-2 text-gray-700"
            >
              Repair wall and floor tiling
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="installDecorativeTiling"
              checked={
                formData.refereeTestimonial.competencies.installDecorativeTiling
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "installDecorativeTiling"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label
              htmlFor="installDecorativeTiling"
              className="ml-2 text-gray-700"
            >
              Install decorative tiling
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="installMosaicTiling"
              checked={
                formData.refereeTestimonial.competencies.installMosaicTiling
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "installMosaicTiling"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="installMosaicTiling" className="ml-2 text-gray-700">
              Install mosaic tiling
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="applyWaterproofing"
              checked={
                formData.refereeTestimonial.competencies.applyWaterproofing
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "applyWaterproofing"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="applyWaterproofing" className="ml-2 text-gray-700">
              Apply waterproofing for wall and floor tiling
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="tileCurvedSurfaces"
              checked={
                formData.refereeTestimonial.competencies.tileCurvedSurfaces
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "tileCurvedSurfaces"
                )
              }
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="tileCurvedSurfaces" className="ml-2 text-gray-700">
              Tile curved surfaces
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-800 mb-4">
          Referee Contact Details:
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Name:</label>
            <input
              type="text"
              value={formData.refereeTestimonial.refereeName}
              onChange={(e) =>
                handleNestedInputChange(
                  "refereeTestimonial",
                  "refereeName",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Position:</label>
            <input
              type="text"
              value={formData.refereeTestimonial.position}
              onChange={(e) =>
                handleNestedInputChange(
                  "refereeTestimonial",
                  "position",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Qualification/Licence Details:
            </label>
            <input
              type="text"
              value={formData.refereeTestimonial.qualification}
              onChange={(e) =>
                handleNestedInputChange(
                  "refereeTestimonial",
                  "qualification",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Organisation:</label>
            <input
              type="text"
              value={formData.refereeTestimonial.organisation}
              onChange={(e) =>
                handleNestedInputChange(
                  "refereeTestimonial",
                  "organisation",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Phone Number:</label>
            <input
              type="tel"
              value={formData.refereeTestimonial.phoneNumber}
              onChange={(e) =>
                handleNestedInputChange(
                  "refereeTestimonial",
                  "phoneNumber",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email Address:</label>
            <input
              type="email"
              value={formData.refereeTestimonial.emailAddress}
              onChange={(e) =>
                handleNestedInputChange(
                  "refereeTestimonial",
                  "emailAddress",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Signature:</label>
              <input
                type="text"
                value={formData.refereeTestimonial.signature}
                onChange={(e) =>
                  handleNestedInputChange(
                    "refereeTestimonial",
                    "signature",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Date:</label>
              <input
                type="date"
                value={formData.refereeTestimonial.date}
                onChange={(e) =>
                  handleNestedInputChange(
                    "refereeTestimonial",
                    "date",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-700">
            In my capacity as Referee, I declare that the information provided
            in this document is true and accurate to the best of my knowledge.
            Should further verification or clarification be required, I can
            provide additional details.
          </p>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-blue-800">
          <strong>Note:</strong> This testimonial should be completed by someone
          who has directly supervised your work and can verify your skills and
          competencies in wall and floor tiling. The referee should be a
          qualified tradesperson, supervisor, or employer familiar with the
          standards required for this qualification.
        </p>
      </div>
    </div>
  );
};
