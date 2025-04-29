import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const RPLIntakeCPC30220Carpentry = () => {
  const [activeSection, setActiveSection] = useState(1);
  const totalSections = 5; // Total number of sections

  const [formData, setFormData] = useState({
    studentInitials: "",
    studentName: "",
    courseQualification: "CPC30220 Certificate III in Carpentry",
    studentDeclaration: {
      name: "",
      date: "",
      signature: "",
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
      keySkills: "",
      tasksResponsibilities: "",
      training: "",
      additionalSupport: "",
      competencies: {
        workSafelyAtHeights: false,
        erectAndDismantleScaffolding: false,
        applyLevellingProcedures: false,
        erectFormworkForFootings: false,
        readPlansAndSpecifications: false,
        installLiningAndPanelling: false,
        installCurtainWalling: false,
        erectJumpFormFormwork: false,
        erectFormworkToSuspendedSlabs: false,
        constructFormworkForStairs: false,
        installExteriorCladding: false,
        constructAndInstallBulkheads: false,
        constructExternalStairs: false,
        constructAdvancedRoofs: false,
        constructEaves: false,
        constructPitchedRoofs: false,
        erectRoofTrusses: false,
        constructCeilingFrames: false,
        constructAndErectWallFrames: false,
        installFlooringSystems: false,
        carryOutSettingOut: false,
        carryOutDemolition: false,
        handleCarpentryMaterials: false,
        useCarpentryTools: false,
        carryOutConcreting: false,
        workEffectively: false,
        conductWorkplaceCommunication: false,
        carryOutMeasurements: false,
        performConstructionCalculations: false,
        carryOutLevellingOperations: false,
        applyWHSRequirements: false,
        identifyConstructionWorkHazards: false,
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
      refereeName: "",
      position: "",
      qualification: "",
      organisation: "",
      phoneNumber: "",
      emailAddress: "",
      signature: "",
      date: "",
    },
  });

  // Fixed input change handler for regular fields
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Fixed nested input change handler for two-level nesting
  const handleNestedInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Fixed double-nested input change handler for three-level nesting
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

  // Fixed checkbox change handler
  const handleCheckboxChange = (section, field) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field],
      },
    }));
  };

  // Fixed nested checkbox change handler
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

            {/* Evidence Collection */}
            {activeSection === 2 && (
              <EvidenceCollection
                formData={formData}
                handleCheckboxChange={handleCheckboxChange}
              />
            )}

            {/* Self Assessment */}
            {activeSection === 3 && (
              <SelfAssessment
                formData={formData}
                handleInputChange={handleInputChange}
                handleNestedInputChange={handleNestedInputChange}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
              />
            )}

            {/* Employer Verification */}
            {activeSection === 4 && (
              <EmployerVerification
                formData={formData}
                handleDoubleNestedInputChange={handleDoubleNestedInputChange}
              />
            )}

            {/* Referee Testimonial */}
            {activeSection === 5 && (
              <RefereeTestimonial
                formData={formData}
                handleNestedInputChange={handleNestedInputChange}
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

export default RPLIntakeCPC30220Carpentry;

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

      <div className="border border-gray-300 rounded-md p-6 mb-6">
        <h4 className="font-medium text-gray-800 mb-4">1. Student Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="studentName"
              className="block text-gray-700 font-medium mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="studentName"
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
            <label
              htmlFor="declarationDate"
              className="block text-gray-700 font-medium mb-2"
            >
              Date:
            </label>
            <input
              type="date"
              id="declarationDate"
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

        <h4 className="font-medium text-gray-800 mb-4">
          2. Declaration Statements
        </h4>
        <ul className="list-disc ml-6 space-y-2 mb-6">
          <li>
            I declare that the evidence provided for the RPL assessment is true,
            accurate, and authentic.
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
            I understand that any false or misleading information may result in
            the rejection of my RPL application.
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

        <h4 className="font-medium text-gray-800 mb-4">
          3. Student Acknowledgement
        </h4>
        <p className="mb-4">
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
            className="border-b border-gray-400 mx-2 px-2 w-48 focus:outline-none focus:border-emerald-500"
          />{" "}
          (Student Name), have read and understood the above statements. I agree
          to the terms and conditions outlined as part of the RPL process.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="studentSignature"
              className="block text-gray-700 font-medium mb-2"
            >
              Signature:
            </label>
            <input
              type="text"
              id="studentSignature"
              value={formData.studentDeclaration.signature}
              onChange={(e) =>
                handleNestedInputChange(
                  "studentDeclaration",
                  "signature",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="signatureDate"
              className="block text-gray-700 font-medium mb-2"
            >
              Date:
            </label>
            <input
              type="date"
              id="signatureDate"
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

      <p className="mb-4">
        Please select all the types of evidence that you will be submitting as
        part of your RPL assessment. You must provide sufficient evidence to
        demonstrate your competency in the qualification requirements.
      </p>

      <div className="border border-gray-300 rounded-md p-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="photos"
              checked={formData.evidence.photos}
              onChange={() => handleCheckboxChange("evidence", "photos")}
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="photos" className="ml-2 block text-gray-700">
              Photos or Videos of Tasks Performed
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="payslips"
              checked={formData.evidence.payslips}
              onChange={() => handleCheckboxChange("evidence", "payslips")}
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="payslips" className="ml-2 block text-gray-700">
              Payslips or Employment Contracts
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="certificates"
              checked={formData.evidence.certificates}
              onChange={() => handleCheckboxChange("evidence", "certificates")}
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="certificates" className="ml-2 block text-gray-700">
              Previous Certificates or Qualifications
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="workSamples"
              checked={formData.evidence.workSamples}
              onChange={() => handleCheckboxChange("evidence", "workSamples")}
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="workSamples" className="ml-2 block text-gray-700">
              Work Samples (Reports, Documentation, etc.)
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="testimonials"
              checked={formData.evidence.testimonials}
              onChange={() => handleCheckboxChange("evidence", "testimonials")}
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="testimonials" className="ml-2 block text-gray-700">
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
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="employerVerification"
              className="ml-2 block text-gray-700"
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
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="selfAssessment"
              className="ml-2 block text-gray-700"
            >
              Student Self-Assessment
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <h4 className="font-medium text-gray-800 mb-2 underline">
          Instructions
        </h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Please ensure all evidence is current, valid, sufficient, and
            authentic.
          </li>
          <li>
            Electronic evidence should be clearly labeled with your name and the
            date.
          </li>
          <li>
            For photographic evidence, ensure images clearly show you performing
            the task.
          </li>
          <li>All documents must be submitted in PDF, JPG, or PNG format.</li>
          <li>
            Email all evidence to info@certifiedaustralia.com.au with your name
            and qualification in the subject line.
          </li>
        </ul>
      </div>
    </div>
  );
};
// Self Assessment Component
const SelfAssessment = ({
  formData,
  handleInputChange,
  handleNestedInputChange,
  handleNestedCheckboxChange,
}) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Recognition of Prior Learning (RPL) Student Self-Assessment
      </h3>

      <p className="mb-4">
        This self-assessment form allows you to reflect on your skills,
        knowledge, and experience. Please complete this form to the best of your
        ability, providing specific examples where possible.
      </p>

      <div className="border border-gray-300 rounded-md p-6 mb-6">
        <h4 className="font-medium text-gray-800 mb-4">1. Student Details</h4>
        <div className="mb-6">
          <label
            htmlFor="selfAssessmentName"
            className="block text-gray-700 font-medium mb-2"
          >
            Name:
          </label>
          <input
            type="text"
            id="selfAssessmentName"
            value={formData.studentName}
            onChange={(e) => handleInputChange("studentName", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <h4 className="font-medium text-gray-800 mb-4">
          2. Self-Assessment Questions
        </h4>
        <p className="mb-2 text-gray-700">
          Please answer the following questions in detail.
        </p>

        <div className="space-y-6 mb-6">
          <div>
            <label
              htmlFor="keySkills"
              className="block text-gray-700 font-medium mb-2"
            >
              1. What are your key skills and strengths relevant to this
              qualification?
            </label>
            <textarea
              id="keySkills"
              value={formData.selfAssessment.keySkills}
              onChange={(e) =>
                handleNestedInputChange(
                  "selfAssessment",
                  "keySkills",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24"
              required
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="workExperience"
              className="block text-gray-700 font-medium mb-2"
            >
              2. Describe your work experience and how it relates to the units
              of competency in this course (briefly outline your industry
              experience).
            </label>
            <textarea
              id="workExperience"
              value={formData.selfAssessment.workExperience}
              onChange={(e) =>
                handleNestedInputChange(
                  "selfAssessment",
                  "workExperience",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24"
              required
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="tasksResponsibilities"
              className="block text-gray-700 font-medium mb-2"
            >
              3. What specific tasks or responsibilities have you performed in
              your workplace that demonstrate your competency?
            </label>
            <textarea
              id="tasksResponsibilities"
              value={formData.selfAssessment.tasksResponsibilities}
              onChange={(e) =>
                handleNestedInputChange(
                  "selfAssessment",
                  "tasksResponsibilities",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="training"
              className="block text-gray-700 font-medium mb-2"
            >
              4. Have you undertaken any formal or informal training relevant to
              this qualification? If yes, please provide details.
            </label>
            <textarea
              id="training"
              value={formData.selfAssessment.training}
              onChange={(e) =>
                handleNestedInputChange(
                  "selfAssessment",
                  "training",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="additionalSupport"
              className="block text-gray-700 font-medium mb-2"
            >
              5. Are there any areas where you feel you need additional training
              or support? If yes, please explain.
            </label>
            <textarea
              id="additionalSupport"
              value={formData.selfAssessment.additionalSupport}
              onChange={(e) =>
                handleNestedInputChange(
                  "selfAssessment",
                  "additionalSupport",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24"
            ></textarea>
          </div>
        </div>

        <h4 className="font-medium text-gray-800 mb-4">
          3. Alignment with Competencies
        </h4>
        <p className="mb-4 text-gray-700">
          Please review the units of competency for this qualification and
          indicate whether you believe you are competent in each area. Check the
          box for each competency you believe you have achieved.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="workSafelyAtHeights"
              checked={formData.selfAssessment.competencies.workSafelyAtHeights}
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "workSafelyAtHeights"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="workSafelyAtHeights"
              className="ml-2 block text-gray-700"
            >
              Work safely at heights
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="erectAndDismantleScaffolding"
              checked={
                formData.selfAssessment.competencies
                  .erectAndDismantleScaffolding
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "erectAndDismantleScaffolding"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="erectAndDismantleScaffolding"
              className="ml-2 block text-gray-700"
            >
              Erect and dismantle restricted height scaffolding
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="applyLevellingProcedures"
              checked={
                formData.selfAssessment.competencies.applyLevellingProcedures
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "applyLevellingProcedures"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="applyLevellingProcedures"
              className="ml-2 block text-gray-700"
            >
              Apply basic levelling procedures
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="erectFormworkForFootings"
              checked={
                formData.selfAssessment.competencies.erectFormworkForFootings
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "erectFormworkForFootings"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="erectFormworkForFootings"
              className="ml-2 block text-gray-700"
            >
              Erect and dismantle formwork for footings and slabs on ground
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="readPlansAndSpecifications"
              checked={
                formData.selfAssessment.competencies.readPlansAndSpecifications
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "readPlansAndSpecifications"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="readPlansAndSpecifications"
              className="ml-2 block text-gray-700"
            >
              Read and interpret plans, specifications and drawings for
              carpentry work
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="installLiningAndPanelling"
              checked={
                formData.selfAssessment.competencies.installLiningAndPanelling
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "installLiningAndPanelling"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="installLiningAndPanelling"
              className="ml-2 block text-gray-700"
            >
              Install lining, panelling and moulding
            </label>
          </div>

          {/* Add all the remaining competencies */}
          {/* For brevity I'm showing a few more - in a real application you'd list all of them */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="installCurtainWalling"
              checked={
                formData.selfAssessment.competencies.installCurtainWalling
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "installCurtainWalling"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="installCurtainWalling"
              className="ml-2 block text-gray-700"
            >
              Install curtain walling
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="erectJumpFormFormwork"
              checked={
                formData.selfAssessment.competencies.erectJumpFormFormwork
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "erectJumpFormFormwork"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="erectJumpFormFormwork"
              className="ml-2 block text-gray-700"
            >
              Erect and dismantle jump form formwork
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="constructAndErectWallFrames"
              checked={
                formData.selfAssessment.competencies.constructAndErectWallFrames
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "constructAndErectWallFrames"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="constructAndErectWallFrames"
              className="ml-2 block text-gray-700"
            >
              Construct and erect wall frames
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="installFlooringSystems"
              checked={
                formData.selfAssessment.competencies.installFlooringSystems
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "installFlooringSystems"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="installFlooringSystems"
              className="ml-2 block text-gray-700"
            >
              Install flooring systems
            </label>
          </div>
        </div>

        <h4 className="font-medium text-gray-800 mb-4">
          4. Student Declaration
        </h4>
        <p className="mb-4">
          I, {formData.studentDeclaration.name}, declare that the information
          provided in this self-assessment is accurate and true to the best of
          my knowledge. I understand that this self-assessment will be used as
          part of the RPL process and may require verification.
        </p>
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

      {/* First Employer */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-800 mb-4">Primary Employer</h4>

        <div className="mb-4">
          <h5 className="font-medium mb-2">1. Employer Details</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
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
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Supervisor/Manager Name:
              </label>
              <input
                type="text"
                value={formData.employerVerification.employer1.supervisorName}
                onChange={(e) =>
                  handleDoubleNestedInputChange(
                    "employerVerification",
                    "employer1",
                    "supervisorName",
                    e.target.value
                  )
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
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
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Contact Number:
              </label>
              <input
                type="text"
                value={formData.employerVerification.employer1.contactNumber}
                onChange={(e) =>
                  handleDoubleNestedInputChange(
                    "employerVerification",
                    "employer1",
                    "contactNumber",
                    e.target.value
                  )
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-1">
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
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h5 className="font-medium mb-2">2. Employment Details</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
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
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Job Title:
              </label>
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
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
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
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                End Date:
              </label>
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
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Employment Type:
              </label>
              <div className="flex space-x-4 mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="employmentType1"
                    value="Full-Time"
                    checked={
                      formData.employerVerification.employer1.employmentType ===
                      "Full-Time"
                    }
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer1",
                        "employmentType",
                        e.target.value
                      )
                    }
                    className="form-radio h-4 w-4 text-emerald-600"
                  />
                  <span className="ml-2">Full-Time</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="employmentType1"
                    value="Part-Time"
                    checked={
                      formData.employerVerification.employer1.employmentType ===
                      "Part-Time"
                    }
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer1",
                        "employmentType",
                        e.target.value
                      )
                    }
                    className="form-radio h-4 w-4 text-emerald-600"
                  />
                  <span className="ml-2">Part-Time</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="employmentType1"
                    value="Casual"
                    checked={
                      formData.employerVerification.employer1.employmentType ===
                      "Casual"
                    }
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer1",
                        "employmentType",
                        e.target.value
                      )
                    }
                    className="form-radio h-4 w-4 text-emerald-600"
                  />
                  <span className="ml-2">Casual</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h5 className="font-medium mb-2">3. Description of Duties</h5>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Please provide a detailed description of the student's duties and
            responsibilities:
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
            className="w-full p-2 border border-gray-300 rounded-md h-24"
            required
          ></textarea>
        </div>
      </div>

      {/* Second Employer (Optional) */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2">
          Secondary Employer (if applicable)
        </h4>

        <div className="mb-4">
          <h5 className="font-medium mb-2">1. Employer Details</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
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
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Supervisor/Manager Name:
              </label>
              <input
                type="text"
                value={formData.employerVerification.employer2.supervisorName}
                onChange={(e) =>
                  handleDoubleNestedInputChange(
                    "employerVerification",
                    "employer2",
                    "supervisorName",
                    e.target.value
                  )
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
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
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Contact Number:
              </label>
              <input
                type="text"
                value={formData.employerVerification.employer2.contactNumber}
                onChange={(e) =>
                  handleDoubleNestedInputChange(
                    "employerVerification",
                    "employer2",
                    "contactNumber",
                    e.target.value
                  )
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-1">
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
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h5 className="font-medium mb-2">2. Employment Details</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
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
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Job Title:
              </label>
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
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
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
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                End Date:
              </label>
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
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Employment Type:
              </label>
              <div className="flex space-x-4 mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="employmentType2"
                    value="Full-Time"
                    checked={
                      formData.employerVerification.employer2.employmentType ===
                      "Full-Time"
                    }
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer2",
                        "employmentType",
                        e.target.value
                      )
                    }
                    className="form-radio h-4 w-4 text-emerald-600"
                  />
                  <span className="ml-2">Full-Time</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="employmentType2"
                    value="Part-Time"
                    checked={
                      formData.employerVerification.employer2.employmentType ===
                      "Part-Time"
                    }
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer2",
                        "employmentType",
                        e.target.value
                      )
                    }
                    className="form-radio h-4 w-4 text-emerald-600"
                  />
                  <span className="ml-2">Part-Time</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="employmentType2"
                    value="Casual"
                    checked={
                      formData.employerVerification.employer2.employmentType ===
                      "Casual"
                    }
                    onChange={(e) =>
                      handleDoubleNestedInputChange(
                        "employerVerification",
                        "employer2",
                        "employmentType",
                        e.target.value
                      )
                    }
                    className="form-radio h-4 w-4 text-emerald-600"
                  />
                  <span className="ml-2">Casual</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h5 className="font-medium mb-2">3. Description of Duties</h5>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Please provide a detailed description of the student's duties and
            responsibilities:
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
            className="w-full p-2 border border-gray-300 rounded-md h-24"
          ></textarea>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-sm text-gray-600">
          By proceeding to the next step, you confirm that the employment
          information provided is accurate and can be verified by Certified
          Australia.
        </p>
      </div>
    </div>
  );
}; // Referee Testimonial Component
const RefereeTestimonial = ({ formData, handleNestedInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Referee Testimonial and Skills Verification Declaration
      </h3>

      <div className="mb-6">
        <p className="mb-4">
          This document serves as an official testimonial certifying that the
          above-named individual has demonstrated the competencies and practical
          skills required for CPC30220 Certificate III in Carpentry as outlined
          below. These skills were performed and verified during their
          employment.
        </p>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Referee Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Referee Name:
            </label>
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
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Position:
            </label>
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
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
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
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Organisation:
            </label>
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
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Phone Number:
            </label>
            <input
              type="text"
              value={formData.refereeTestimonial.phoneNumber}
              onChange={(e) =>
                handleNestedInputChange(
                  "refereeTestimonial",
                  "phoneNumber",
                  e.target.value
                )
              }
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email Address:
            </label>
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
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-2">
          Core Competencies and Activities Performed by the Candidate
        </h4>
        <p className="mb-4 text-sm text-gray-600">
          The following list includes workplace activities regularly performed
          by the candidate as part of their role, aligned with the industry
          standards and requirements of the CPC30220 Certificate III in
          Carpentry. As a referee, I certify that I have directly observed or
          supervised the candidate in these tasks and can confirm their
          competency in each area.
        </p>

        <div className="bg-gray-50 p-4 border border-gray-200 rounded-md mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Note: In the following step, you will be required to verify the
            specific competencies observed. The competencies you previously
            selected in the Self-Assessment section will be highlighted for
            verification.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Referee Declaration</h4>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Signature (Type your full name):
            </label>
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
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              placeholder="Type your full name as signature"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Date:
            </label>
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
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <p className="text-sm text-gray-600">
            In my capacity as Referee, I declare that the information provided
            in this document is true and accurate to the best of my knowledge.
            Should further verification or clarification be required, I can
            provide additional details.
          </p>
        </div>
      </div>
    </div>
  );
};
