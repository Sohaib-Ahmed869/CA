import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const RPLIntakeCPC32620RoofPlumbing = () => {
  const [activeSection, setActiveSection] = useState(1);
  const totalSections = 6; // Total number of sections

  const [formData, setFormData] = useState({
    studentInitials: "",
    studentName: "",
    courseQualification: "CPC32620 Certificate III in Roof Plumbing",
    studentDeclaration: {
      name: "",
      date: "",
      signature: "",
    },
    confirmationOfReassessment: {
      studentName: "",
      qualification: "CPC32620 Certificate III in Roof Plumbing",
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
      keySkills: "",
      tasksResponsibilities: "",
      training: "",
      additionalSupport: "",
      competencies: {
        installRoofSheets: false,
        installRoofCoverings: false,
        installRoofComponents: false,
        fabricateAndInstallExternalFlashings: false,
        fabricateAndInstallRoofDrainageSystems: false,
        collectAndStoreRoofWater: false,
        selectAndInstallRoofSheeting: false,
        produce2DArchitecturalDrawings: false,
        prepareSimpleDrawings: false,
        flashPenetrations: false,
        workSafelyOnRoofs: false,
        cutAndJoinSheetMetal: false,
        carryOutLevelling: false,
        carryOutWHSRequirements: false,
        workEffectivelyInPlumbing: false,
        readPlansCalculateQuantities: false,
        applyWHSRequirements: false,
        operatePersonnelAndMaterialsHoists: false,
        operateElevatedWorkPlatforms: false,
        workSafelyAtHeights: false,
        erectAndDismantleScaffolding: false,
        workSafelyInManufacturing: false,
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
      studentName: "",
      companyName: "",
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
        installRoofSheets: false,
        installRoofCoverings: false,
        installRoofComponents: false,
        fabricateAndInstallExternalFlashings: false,
        fabricateAndInstallRoofDrainageSystems: false,
        collectAndStoreRoofWater: false,
        selectAndInstallRoofSheeting: false,
        produce2DArchitecturalDrawings: false,
        prepareSimpleDrawings: false,
        flashPenetrations: false,
        workSafelyOnRoofs: false,
        cutAndJoinSheetMetal: false,
        carryOutLevelling: false,
        carryOutWHSRequirements: false,
        workEffectivelyInPlumbing: false,
        readPlansCalculateQuantities: false,
        applyWHSRequirements: false,
        operatePersonnelAndMaterialsHoists: false,
        operateElevatedWorkPlatforms: false,
        workSafelyAtHeights: false,
        erectAndDismantleScaffolding: false,
        workSafelyInManufacturing: false,
      },
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
      case 1:
        return (
          formData.studentDeclaration.name.trim() !== "" &&
          formData.studentDeclaration.date.trim() !== ""
        );
      case 2:
        // At least one form of evidence should be selected
        return Object.values(formData.evidence).some((value) => value === true);
      case 3:
        return (
          formData.selfAssessment.keySkills.trim() !== "" &&
          formData.selfAssessment.workExperience.trim() !== ""
        );
      case 4:
        return (
          formData.employerVerification.employer1.orgName.trim() !== "" &&
          formData.employerVerification.employer1.supervisorName.trim() !== ""
        );
      case 5:
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
    //   alert("Please complete all required fields before proceeding.");
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
          I, {formData.studentDeclaration.name || "_________"} (Student Name),
          have read and understood the above statements. I agree to the terms
          and conditions outlined as part of the RPL process.
        </p>

        <div className="mb-6">
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
            placeholder="Type your full name as signature"
            required
          />
        </div>
      </div>
    </div>
  );
};

// Evidence Collection Component

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

const EvidenceCollection = ({ formData, handleCheckboxChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Evidence Collection
      </h3>
      <p className="mb-4">
        Please select the types of evidence you are submitting as part of your
        RPL assessment. All relevant supporting documents should be included
        with your submission.
      </p>

      <div className="border border-gray-300 rounded-md p-6 mb-6">
        <h4 className="font-medium text-gray-800 mb-4">
          Types of Evidence Available
        </h4>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="photos"
              checked={formData.evidence.photos}
              onChange={() => handleCheckboxChange("evidence", "photos")}
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label htmlFor="photos" className="ml-3 text-gray-700">
              Photos or Videos of Tasks Performed
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="payslips"
              checked={formData.evidence.payslips}
              onChange={() => handleCheckboxChange("evidence", "payslips")}
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label htmlFor="payslips" className="ml-3 text-gray-700">
              Payslips or Employment Contracts
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="certificates"
              checked={formData.evidence.certificates}
              onChange={() => handleCheckboxChange("evidence", "certificates")}
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label htmlFor="certificates" className="ml-3 text-gray-700">
              Previous Certificates or Qualifications
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="workSamples"
              checked={formData.evidence.workSamples}
              onChange={() => handleCheckboxChange("evidence", "workSamples")}
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label htmlFor="workSamples" className="ml-3 text-gray-700">
              Work Samples (Reports, Documentation, etc.)
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="testimonials"
              checked={formData.evidence.testimonials}
              onChange={() => handleCheckboxChange("evidence", "testimonials")}
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label htmlFor="testimonials" className="ml-3 text-gray-700">
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
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="employerVerification"
              className="ml-3 text-gray-700"
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
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label htmlFor="selfAssessment" className="ml-3 text-gray-700">
              Student Self-Assessment
            </label>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Please ensure all evidence is submitted along
          with this form. You can email all documents directly to our support
          team at info@certifiedaustralia.com.au.
        </p>
      </div>
    </div>
  );
};

// Self Assessment Component
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
        Student Self-Assessment
      </h3>
      <p className="mb-4">
        This self-assessment allows you to reflect on your skills, knowledge,
        and experience. Please complete this form to the best of your ability,
        providing specific examples where possible.
      </p>

      <div className="border border-gray-300 rounded-md p-6 mb-6">
        <h4 className="font-medium text-gray-800 mb-4">
          Self-Assessment Questions
        </h4>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              What are your key skills and strengths relevant to this
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
              rows="4"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Describe your work experience and how it relates to the units of
              competency in this course:
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
              rows="4"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              What specific tasks or responsibilities have you performed that
              demonstrate your competency?
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
              rows="4"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Have you undertaken any formal or informal training relevant to
              this qualification? If yes, please provide details.
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
              rows="4"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Are there any areas where you feel you need additional training or
              support? If yes, please explain.
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
              rows="4"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded-md p-6 mb-6">
        <h4 className="font-medium text-gray-800 mb-4">
          Alignment with Competencies
        </h4>
        <p className="mb-4">
          Please review the units of competency for this qualification and
          indicate whether you believe you are competent in each area:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="installRoofSheets"
              checked={formData.selfAssessment.competencies.installRoofSheets}
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "installRoofSheets"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label htmlFor="installRoofSheets" className="ml-3 text-gray-700">
              Install roof sheets, wall cladding and complex flashings
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="installRoofCoverings"
              checked={
                formData.selfAssessment.competencies.installRoofCoverings
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "installRoofCoverings"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="installRoofCoverings"
              className="ml-3 text-gray-700"
            >
              Install roof coverings to curved roof structures
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="installRoofComponents"
              checked={
                formData.selfAssessment.competencies.installRoofComponents
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "installRoofComponents"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="installRoofComponents"
              className="ml-3 text-gray-700"
            >
              Install roof components
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="fabricateAndInstallExternalFlashings"
              checked={
                formData.selfAssessment.competencies
                  .fabricateAndInstallExternalFlashings
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "fabricateAndInstallExternalFlashings"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="fabricateAndInstallExternalFlashings"
              className="ml-3 text-gray-700"
            >
              Fabricate and install external flashings
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="fabricateAndInstallRoofDrainageSystems"
              checked={
                formData.selfAssessment.competencies
                  .fabricateAndInstallRoofDrainageSystems
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "fabricateAndInstallRoofDrainageSystems"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="fabricateAndInstallRoofDrainageSystems"
              className="ml-3 text-gray-700"
            >
              Fabricate and install roof drainage systems
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="collectAndStoreRoofWater"
              checked={
                formData.selfAssessment.competencies.collectAndStoreRoofWater
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "collectAndStoreRoofWater"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="collectAndStoreRoofWater"
              className="ml-3 text-gray-700"
            >
              Collect and store roof water
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="selectAndInstallRoofSheeting"
              checked={
                formData.selfAssessment.competencies
                  .selectAndInstallRoofSheeting
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "selectAndInstallRoofSheeting"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="selectAndInstallRoofSheeting"
              className="ml-3 text-gray-700"
            >
              Select and install roof sheeting and wall cladding
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="produce2DArchitecturalDrawings"
              checked={
                formData.selfAssessment.competencies
                  .produce2DArchitecturalDrawings
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "produce2DArchitecturalDrawings"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="produce2DArchitecturalDrawings"
              className="ml-3 text-gray-700"
            >
              Produce 2-D architectural drawings using design software
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="prepareSimpleDrawings"
              checked={
                formData.selfAssessment.competencies.prepareSimpleDrawings
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "prepareSimpleDrawings"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="prepareSimpleDrawings"
              className="ml-3 text-gray-700"
            >
              Prepare simple drawings
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="flashPenetrations"
              checked={formData.selfAssessment.competencies.flashPenetrations}
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "flashPenetrations"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label htmlFor="flashPenetrations" className="ml-3 text-gray-700">
              Flash penetrations through roofs and walls
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="workSafelyOnRoofs"
              checked={formData.selfAssessment.competencies.workSafelyOnRoofs}
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "workSafelyOnRoofs"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label htmlFor="workSafelyOnRoofs" className="ml-3 text-gray-700">
              Work safely on roofs
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="cutAndJoinSheetMetal"
              checked={
                formData.selfAssessment.competencies.cutAndJoinSheetMetal
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "cutAndJoinSheetMetal"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="cutAndJoinSheetMetal"
              className="ml-3 text-gray-700"
            >
              Cut and join sheet metal
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="carryOutLevelling"
              checked={formData.selfAssessment.competencies.carryOutLevelling}
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "carryOutLevelling"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label htmlFor="carryOutLevelling" className="ml-3 text-gray-700">
              Carry out levelling
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="carryOutWHSRequirements"
              checked={
                formData.selfAssessment.competencies.carryOutWHSRequirements
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "carryOutWHSRequirements"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="carryOutWHSRequirements"
              className="ml-3 text-gray-700"
            >
              Carry out WHS requirements
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="workEffectivelyInPlumbing"
              checked={
                formData.selfAssessment.competencies.workEffectivelyInPlumbing
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "workEffectivelyInPlumbing"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="workEffectivelyInPlumbing"
              className="ml-3 text-gray-700"
            >
              Work effectively in the plumbing services sector
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="readPlansCalculateQuantities"
              checked={
                formData.selfAssessment.competencies
                  .readPlansCalculateQuantities
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "readPlansCalculateQuantities"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="readPlansCalculateQuantities"
              className="ml-3 text-gray-700"
            >
              Read plans, calculate quantities and mark out materials
            </label>
          </div>

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
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="applyWHSRequirements"
              className="ml-3 text-gray-700"
            >
              Apply WHS requirements, policies and procedures in the
              construction industry
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="operatePersonnelAndMaterialsHoists"
              checked={
                formData.selfAssessment.competencies
                  .operatePersonnelAndMaterialsHoists
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "operatePersonnelAndMaterialsHoists"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="operatePersonnelAndMaterialsHoists"
              className="ml-3 text-gray-700"
            >
              Operate personnel and materials hoists
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="operateElevatedWorkPlatforms"
              checked={
                formData.selfAssessment.competencies
                  .operateElevatedWorkPlatforms
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "operateElevatedWorkPlatforms"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="operateElevatedWorkPlatforms"
              className="ml-3 text-gray-700"
            >
              Operate elevated work platforms up to 11 metres
            </label>
          </div>

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
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label htmlFor="workSafelyAtHeights" className="ml-3 text-gray-700">
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
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="erectAndDismantleScaffolding"
              className="ml-3 text-gray-700"
            >
              Erect and dismantle restricted height scaffolding
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="workSafelyInManufacturing"
              checked={
                formData.selfAssessment.competencies.workSafelyInManufacturing
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "workSafelyInManufacturing"
                )
              }
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="workSafelyInManufacturing"
              className="ml-3 text-gray-700"
            >
              Work safely and effectively in manufacturing and engineering
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
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

      <div className="border border-gray-300 rounded-md p-6 mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Employer 1 Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="orgName1"
              className="block text-gray-700 font-medium mb-2"
            >
              Name of Employer/Organisation:
            </label>
            <input
              type="text"
              id="orgName1"
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
            <label
              htmlFor="supervisorName1"
              className="block text-gray-700 font-medium mb-2"
            >
              Supervisor/Manager Name:
            </label>
            <input
              type="text"
              id="supervisorName1"
              value={formData.employerVerification.employer1.supervisorName}
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="position1"
              className="block text-gray-700 font-medium mb-2"
            >
              Position/Title:
            </label>
            <input
              type="text"
              id="position1"
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
              required
            />
          </div>
          <div>
            <label
              htmlFor="contactNumber1"
              className="block text-gray-700 font-medium mb-2"
            >
              Contact Number:
            </label>
            <input
              type="text"
              id="contactNumber1"
              value={formData.employerVerification.employer1.contactNumber}
              onChange={(e) =>
                handleDoubleNestedInputChange(
                  "employerVerification",
                  "employer1",
                  "contactNumber",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="email1"
            className="block text-gray-700 font-medium mb-2"
          >
            Email Address:
          </label>
          <input
            type="email"
            id="email1"
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
            required
          />
        </div>

        <h4 className="font-medium text-gray-800 mb-4">Employment Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="employeeName1"
              className="block text-gray-700 font-medium mb-2"
            >
              Employee Name:
            </label>
            <input
              type="text"
              id="employeeName1"
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
              required
            />
          </div>
          <div>
            <label
              htmlFor="jobTitle1"
              className="block text-gray-700 font-medium mb-2"
            >
              Job Title:
            </label>
            <input
              type="text"
              id="jobTitle1"
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
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="startDate1"
              className="block text-gray-700 font-medium mb-2"
            >
              Start Date:
            </label>
            <input
              type="date"
              id="startDate1"
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
              required
            />
          </div>
          <div>
            <label
              htmlFor="endDate1"
              className="block text-gray-700 font-medium mb-2"
            >
              End Date:
            </label>
            <input
              type="date"
              id="endDate1"
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

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Employment Type:
          </label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="fullTime1"
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
                className="mr-2"
              />
              <label htmlFor="fullTime1" className="text-gray-700">
                Full-Time
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="partTime1"
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
                className="mr-2"
              />
              <label htmlFor="partTime1" className="text-gray-700">
                Part-Time
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="casual1"
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
                className="mr-2"
              />
              <label htmlFor="casual1" className="text-gray-700">
                Casual
              </label>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="duties1"
            className="block text-gray-700 font-medium mb-2"
          >
            Description of Duties:
          </label>
          <textarea
            id="duties1"
            value={formData.employerVerification.employer1.duties}
            onChange={(e) =>
              handleDoubleNestedInputChange(
                "employerVerification",
                "employer1",
                "duties",
                e.target.value
              )
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-32"
            placeholder="Please provide a detailed description of the student's duties and responsibilities"
            required
          ></textarea>
        </div>
      </div>

      {/* Employer 2 - Optional */}
      <div className="border border-gray-300 rounded-md p-6 mb-6">
        <h4 className="font-medium text-gray-800 mb-4">
          Employer 2 Details (Optional)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="orgName2"
              className="block text-gray-700 font-medium mb-2"
            >
              Name of Employer/Organisation:
            </label>
            <input
              type="text"
              id="orgName2"
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
            <label
              htmlFor="supervisorName2"
              className="block text-gray-700 font-medium mb-2"
            >
              Supervisor/Manager Name:
            </label>
            <input
              type="text"
              id="supervisorName2"
              value={formData.employerVerification.employer2.supervisorName}
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="position2"
              className="block text-gray-700 font-medium mb-2"
            >
              Position/Title:
            </label>
            <input
              type="text"
              id="position2"
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
            <label
              htmlFor="contactNumber2"
              className="block text-gray-700 font-medium mb-2"
            >
              Contact Number:
            </label>
            <input
              type="text"
              id="contactNumber2"
              value={formData.employerVerification.employer2.contactNumber}
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
        </div>

        <div className="mb-6">
          <label
            htmlFor="email2"
            className="block text-gray-700 font-medium mb-2"
          >
            Email Address:
          </label>
          <input
            type="email"
            id="email2"
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

        <h4 className="font-medium text-gray-800 mb-4">Employment Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="employeeName2"
              className="block text-gray-700 font-medium mb-2"
            >
              Employee Name:
            </label>
            <input
              type="text"
              id="employeeName2"
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
            <label
              htmlFor="jobTitle2"
              className="block text-gray-700 font-medium mb-2"
            >
              Job Title:
            </label>
            <input
              type="text"
              id="jobTitle2"
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="startDate2"
              className="block text-gray-700 font-medium mb-2"
            >
              Start Date:
            </label>
            <input
              type="date"
              id="startDate2"
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
            <label
              htmlFor="endDate2"
              className="block text-gray-700 font-medium mb-2"
            >
              End Date:
            </label>
            <input
              type="date"
              id="endDate2"
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

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Employment Type:
          </label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="fullTime2"
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
                className="mr-2"
              />
              <label htmlFor="fullTime2" className="text-gray-700">
                Full-Time
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="partTime2"
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
                className="mr-2"
              />
              <label htmlFor="partTime2" className="text-gray-700">
                Part-Time
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="casual2"
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
                className="mr-2"
              />
              <label htmlFor="casual2" className="text-gray-700">
                Casual
              </label>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="duties2"
            className="block text-gray-700 font-medium mb-2"
          >
            Description of Duties:
          </label>
          <textarea
            id="duties2"
            value={formData.employerVerification.employer2.duties}
            onChange={(e) =>
              handleDoubleNestedInputChange(
                "employerVerification",
                "employer2",
                "duties",
                e.target.value
              )
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-32"
            placeholder="Please provide a detailed description of the student's duties and responsibilities"
          ></textarea>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
        <h4 className="font-medium text-amber-800 mb-2">Note:</h4>
        <p className="text-amber-700">
          This form should be completed by your employer or supervisor. The
          information provided will help verify your work experience and duties
          as part of your RPL application. Please ensure that all details are
          accurate and can be verified if needed.
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
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Referee Testimonial and Skills Verification Declaration
      </h3>

      <p className="mb-4">
        This document serves as an official testimonial certifying that the
        individual has demonstrated the competencies and practical skills
        required for CPC32620 Certificate III in Roof Plumbing.
      </p>

      <div className="border border-gray-300 rounded-md p-6 mb-6">
        <p className="mb-4">
          Verification of Skills for{" "}
          <input
            type="text"
            value={formData.refereeTestimonial.studentName}
            onChange={(e) =>
              handleNestedInputChange(
                "refereeTestimonial",
                "studentName",
                e.target.value
              )
            }
            className="border-b border-gray-400 px-2 py-1 focus:outline-none focus:border-emerald-500"
            placeholder="Student Name"
          />{" "}
          in CPC32620 Certificate III in Roof Plumbing
        </p>

        <p className="mb-6">
          This document serves as an official testimonial certifying that the
          above-named individual,{" "}
          {formData.refereeTestimonial.studentName || "___________"}, has
          demonstrated the competencies and practical skills required for
          CPC32620 Certificate III in Roof Plumbing as outlined below. These
          skills were performed and verified during their employment at{" "}
          <input
            type="text"
            value={formData.refereeTestimonial.companyName}
            onChange={(e) =>
              handleNestedInputChange(
                "refereeTestimonial",
                "companyName",
                e.target.value
              )
            }
            className="border-b border-gray-400 px-2 py-1 focus:outline-none focus:border-emerald-500"
            placeholder="Company Name"
          />{" "}
          over a period of{" "}
          <input
            type="text"
            value={formData.refereeTestimonial.employmentPeriod}
            onChange={(e) =>
              handleNestedInputChange(
                "refereeTestimonial",
                "employmentPeriod",
                e.target.value
              )
            }
            className="border-b border-gray-400 px-2 py-1 focus:outline-none focus:border-emerald-500"
            placeholder="Employment Period"
          />
          .
        </p>

        <h4 className="font-medium text-gray-800 mb-4">
          Core Competencies and Activities Performed by the Candidate:
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="readPlansCalculateQuantities"
              checked={
                formData.refereeTestimonial.competencies
                  .readPlansCalculateQuantities
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "readPlansCalculateQuantities"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="readPlansCalculateQuantities"
              className="ml-2 text-gray-700"
            >
              Read plans, calculate quantities and mark out materials
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="carryOutLevelling"
              checked={
                formData.refereeTestimonial.competencies.carryOutLevelling
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "carryOutLevelling"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="carryOutLevelling" className="ml-2 text-gray-700">
              Carry out levelling
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="carryOutWHSRequirements"
              checked={
                formData.refereeTestimonial.competencies.carryOutWHSRequirements
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "carryOutWHSRequirements"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="carryOutWHSRequirements"
              className="ml-2 text-gray-700"
            >
              Carry out WHS requirements
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="workEffectivelyInPlumbing"
              checked={
                formData.refereeTestimonial.competencies
                  .workEffectivelyInPlumbing
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "workEffectivelyInPlumbing"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="workEffectivelyInPlumbing"
              className="ml-2 text-gray-700"
            >
              Work effectively in the plumbing services sector
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="workSafelyAtHeights"
              checked={
                formData.refereeTestimonial.competencies.workSafelyAtHeights
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "workSafelyAtHeights"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="workSafelyAtHeights" className="ml-2 text-gray-700">
              Work safely at heights
            </label>
          </div>

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
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
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
              id="operatePersonnelAndMaterialsHoists"
              checked={
                formData.refereeTestimonial.competencies
                  .operatePersonnelAndMaterialsHoists
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "operatePersonnelAndMaterialsHoists"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="operatePersonnelAndMaterialsHoists"
              className="ml-2 text-gray-700"
            >
              Operate personnel and materials hoists
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="operateElevatedWorkPlatforms"
              checked={
                formData.refereeTestimonial.competencies
                  .operateElevatedWorkPlatforms
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "operateElevatedWorkPlatforms"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="operateElevatedWorkPlatforms"
              className="ml-2 text-gray-700"
            >
              Operate elevated work platforms up to 11 metres
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="erectAndDismantleScaffolding"
              checked={
                formData.refereeTestimonial.competencies
                  .erectAndDismantleScaffolding
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "erectAndDismantleScaffolding"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="erectAndDismantleScaffolding"
              className="ml-2 text-gray-700"
            >
              Erect and dismantle restricted height scaffolding
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="cutAndJoinSheetMetal"
              checked={
                formData.refereeTestimonial.competencies.cutAndJoinSheetMetal
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "cutAndJoinSheetMetal"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="cutAndJoinSheetMetal"
              className="ml-2 text-gray-700"
            >
              Cut and join sheet metal
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="workSafelyOnRoofs"
              checked={
                formData.refereeTestimonial.competencies.workSafelyOnRoofs
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "workSafelyOnRoofs"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="workSafelyOnRoofs" className="ml-2 text-gray-700">
              Work safely on roofs
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="workSafelyInManufacturing"
              checked={
                formData.refereeTestimonial.competencies
                  .workSafelyInManufacturing
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "workSafelyInManufacturing"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="workSafelyInManufacturing"
              className="ml-2 text-gray-700"
            >
              Work safely and effectively in manufacturing and engineering
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="installRoofSheets"
              checked={
                formData.refereeTestimonial.competencies.installRoofSheets
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "installRoofSheets"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="installRoofSheets" className="ml-2 text-gray-700">
              Install roof sheets, wall cladding and complex flashings
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="installRoofComponents"
              checked={
                formData.refereeTestimonial.competencies.installRoofComponents
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "installRoofComponents"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="installRoofComponents"
              className="ml-2 text-gray-700"
            >
              Install roof components
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="fabricateAndInstallRoofDrainageSystems"
              checked={
                formData.refereeTestimonial.competencies
                  .fabricateAndInstallRoofDrainageSystems
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "fabricateAndInstallRoofDrainageSystems"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="fabricateAndInstallRoofDrainageSystems"
              className="ml-2 text-gray-700"
            >
              Fabricate and install roof drainage systems
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="collectAndStoreRoofWater"
              checked={
                formData.refereeTestimonial.competencies
                  .collectAndStoreRoofWater
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "collectAndStoreRoofWater"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="collectAndStoreRoofWater"
              className="ml-2 text-gray-700"
            >
              Collect and store roof water
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="selectAndInstallRoofSheeting"
              checked={
                formData.refereeTestimonial.competencies
                  .selectAndInstallRoofSheeting
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "selectAndInstallRoofSheeting"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="selectAndInstallRoofSheeting"
              className="ml-2 text-gray-700"
            >
              Select and install roof sheeting and wall cladding
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="produce2DArchitecturalDrawings"
              checked={
                formData.refereeTestimonial.competencies
                  .produce2DArchitecturalDrawings
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "produce2DArchitecturalDrawings"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="produce2DArchitecturalDrawings"
              className="ml-2 text-gray-700"
            >
              Produce 2-D architectural drawings using design software
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="prepareSimpleDrawings"
              checked={
                formData.refereeTestimonial.competencies.prepareSimpleDrawings
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "prepareSimpleDrawings"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="prepareSimpleDrawings"
              className="ml-2 text-gray-700"
            >
              Prepare simple drawings
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="flashPenetrations"
              checked={
                formData.refereeTestimonial.competencies.flashPenetrations
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "flashPenetrations"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="flashPenetrations" className="ml-2 text-gray-700">
              Flash penetrations through roofs and walls
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="fabricateAndInstallExternalFlashings"
              checked={
                formData.refereeTestimonial.competencies
                  .fabricateAndInstallExternalFlashings
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "fabricateAndInstallExternalFlashings"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="fabricateAndInstallExternalFlashings"
              className="ml-2 text-gray-700"
            >
              Fabricate and install external flashings
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="installRoofCoverings"
              checked={
                formData.refereeTestimonial.competencies.installRoofCoverings
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "refereeTestimonial",
                  "competencies",
                  "installRoofCoverings"
                )
              }
              className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="installRoofCoverings"
              className="ml-2 text-gray-700"
            >
              Install roof coverings to curved roof structures
            </label>
          </div>
        </div>

        <h4 className="font-medium text-gray-800 mb-4">
          Referee Contact Details:
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="refereeName"
              className="block text-gray-700 font-medium mb-2"
            >
              Referee Name:
            </label>
            <input
              type="text"
              id="refereeName"
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
            <label
              htmlFor="position"
              className="block text-gray-700 font-medium mb-2"
            >
              Position:
            </label>
            <input
              type="text"
              id="position"
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
            <label
              htmlFor="qualification"
              className="block text-gray-700 font-medium mb-2"
            >
              Qualification/Licence Details:
            </label>
            <input
              type="text"
              id="qualification"
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
            <label
              htmlFor="organisation"
              className="block text-gray-700 font-medium mb-2"
            >
              Organisation:
            </label>
            <input
              type="text"
              id="organisation"
              value={formData.refereeTestimonial.organisation}
              onChange={(e) =>
                handleNestedInputChange(
                  "refereeTestimonial",
                  "organisation",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.refereeTestimonial.phoneNumber}
              onChange={(e) =>
                handleNestedInputChange(
                  "refereeTestimonial",
                  "phoneNumber",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="emailAddress"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address:
            </label>
            <input
              type="email"
              id="emailAddress"
              value={formData.refereeTestimonial.emailAddress}
              onChange={(e) =>
                handleNestedInputChange(
                  "refereeTestimonial",
                  "emailAddress",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-4">
            In my capacity as Referee, I declare that the information provided
            in this document is true and accurate to the best of my knowledge.
            Should further verification or clarification be required, I can
            provide additional details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="refereeSignature"
              className="block text-gray-700 font-medium mb-2"
            >
              Signature:
            </label>
            <input
              type="text"
              id="refereeSignature"
              value={formData.refereeTestimonial.signature}
              onChange={(e) =>
                handleNestedInputChange(
                  "refereeTestimonial",
                  "signature",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Type your full name as signature"
              required
            />
          </div>

          <div>
            <label
              htmlFor="refereeDate"
              className="block text-gray-700 font-medium mb-2"
            >
              Date:
            </label>
            <input
              type="date"
              id="refereeDate"
              value={formData.refereeTestimonial.date}
              onChange={(e) =>
                handleNestedInputChange(
                  "refereeTestimonial",
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

export default RPLIntakeCPC32620RoofPlumbing;
