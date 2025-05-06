import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const RPLIntakeCPC31420WaterProofing = () => {
  const [activeSection, setActiveSection] = useState(1);
  const totalSections = 5; // Total number of sections

  const [formData, setFormData] = useState({
    studentInitials: "",
    studentName: "",
    courseQualification:
      "CPC31420 Certificate III in Construction Waterproofing",
    studentDeclaration: {
      name: "",
      date: "",
      signature: "",
    },
    confirmationOfReassessment: {
      studentName: "",
      qualification: "CPC31420 Certificate III in Construction Waterproofing",

      email: "",
      mobile: "",
      dob: "",
    },
    // evidence: {
    //   photos: false,
    //   payslips: false,
    //   certificates: false,
    //   workSamples: false,
    //   testimonials: false,
    //   employerVerification: false,
    //   selfAssessment: false,
    // },
    selfAssessment: {
      workExperience: "",
      keySkills: "",
      tasksResponsibilities: "",
      training: "",
      additionalSupport: "",
      competencies: {
        applyWaterproofingRemedial: false,
        applyWaterproofingToExternalAboveGround: false,
        applyWaterproofingToInternalWet: false,
        applyWaterproofingToBelowGround: false,
        prepareSurfacesForWaterproofing: false,
        useWaterproofingTools: false,
        handleWaterproofingMaterials: false,
        applyWHSRequirements: false,
        carryOutMeasurementsAndCalculations: false,
        readPlansAndSpecifications: false,
        conductWorkplaceCommunication: false,
        planAndOrganiseWork: false,
        workEffectivelyInConstruction: false,
        carryOutConcreting: false,
        carryOutDemolition: false,
        applyLevellingProcedures: false,
        manageFinances: false,
        investigateBusinessOpportunities: false,
        assessConstructionWaterproofingProcesses: false,
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
            {/* {activeSection === 3 && (
              <EvidenceCollection
                formData={formData}
                handleCheckboxChange={handleCheckboxChange}
              />
            )} */}

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
const EvidenceCollection = ({ formData, handleCheckboxChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Evidence Collection
      </h3>

      <p className="mb-4">
        Please indicate which forms of evidence you are able to provide as part
        of your RPL assessment. You'll need to submit these to support your
        application.
      </p>

      <div className="border border-gray-300 rounded-md p-6 mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Evidence Checklist</h4>

        <div className="space-y-3">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="photos"
              checked={formData.evidence.photos}
              onChange={() => handleCheckboxChange("evidence", "photos")}
              className="mt-1 mr-3"
            />
            <label htmlFor="photos" className="text-gray-700">
              Photos or videos of tasks you have performed
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="payslips"
              checked={formData.evidence.payslips}
              onChange={() => handleCheckboxChange("evidence", "payslips")}
              className="mt-1 mr-3"
            />
            <label htmlFor="payslips" className="text-gray-700">
              Payslips or employment contracts as proof of work experience
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="certificates"
              checked={formData.evidence.certificates}
              onChange={() => handleCheckboxChange("evidence", "certificates")}
              className="mt-1 mr-3"
            />
            <label htmlFor="certificates" className="text-gray-700">
              Previous certificates or qualifications
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="workSamples"
              checked={formData.evidence.workSamples}
              onChange={() => handleCheckboxChange("evidence", "workSamples")}
              className="mt-1 mr-3"
            />
            <label htmlFor="workSamples" className="text-gray-700">
              Work samples (reports, documentation, etc.)
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="testimonials"
              checked={formData.evidence.testimonials}
              onChange={() => handleCheckboxChange("evidence", "testimonials")}
              className="mt-1 mr-3"
            />
            <label htmlFor="testimonials" className="text-gray-700">
              Referee testimonials and declarations
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="employerVerification"
              checked={formData.evidence.employerVerification}
              onChange={() =>
                handleCheckboxChange("evidence", "employerVerification")
              }
              className="mt-1 mr-3"
            />
            <label htmlFor="employerVerification" className="text-gray-700">
              Employer verification
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="selfAssessment"
              checked={formData.evidence.selfAssessment}
              onChange={() =>
                handleCheckboxChange("evidence", "selfAssessment")
              }
              className="mt-1 mr-3"
            />
            <label htmlFor="selfAssessment" className="text-gray-700">
              Student self-assessment
            </label>
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
        <h4 className="font-medium text-gray-800 mb-4">
          Self-Assessment Questions
        </h4>

        <div className="space-y-6">
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
              rows="4"
              value={formData.selfAssessment.keySkills}
              onChange={(e) =>
                handleNestedInputChange(
                  "selfAssessment",
                  "keySkills",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              rows="4"
              value={formData.selfAssessment.workExperience}
              onChange={(e) =>
                handleNestedInputChange(
                  "selfAssessment",
                  "workExperience",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              rows="4"
              value={formData.selfAssessment.tasksResponsibilities}
              onChange={(e) =>
                handleNestedInputChange(
                  "selfAssessment",
                  "tasksResponsibilities",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              rows="4"
              value={formData.selfAssessment.training}
              onChange={(e) =>
                handleNestedInputChange(
                  "selfAssessment",
                  "training",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              rows="4"
              value={formData.selfAssessment.additionalSupport}
              onChange={(e) =>
                handleNestedInputChange(
                  "selfAssessment",
                  "additionalSupport",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>
        </div>

        <h4 className="font-medium text-gray-800 mt-8 mb-4">
          Alignment with Competencies
        </h4>
        <p className="mb-4">
          Please review the units of competency for this qualification and
          indicate whether you believe you are competent in each area:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="applyWaterproofingRemedial"
              checked={
                formData.selfAssessment.competencies.applyWaterproofingRemedial
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "applyWaterproofingRemedial"
                )
              }
              className="mt-1 mr-3"
            />
            <label
              htmlFor="applyWaterproofingRemedial"
              className="text-gray-700"
            >
              Apply waterproofing remedial processes
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="applyWaterproofingToExternalAboveGround"
              checked={
                formData.selfAssessment.competencies
                  .applyWaterproofingToExternalAboveGround
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "applyWaterproofingToExternalAboveGround"
                )
              }
              className="mt-1 mr-3"
            />
            <label
              htmlFor="applyWaterproofingToExternalAboveGround"
              className="text-gray-700"
            >
              Apply waterproofing process to external above-ground wet areas
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="applyWaterproofingToInternalWet"
              checked={
                formData.selfAssessment.competencies
                  .applyWaterproofingToInternalWet
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "applyWaterproofingToInternalWet"
                )
              }
              className="mt-1 mr-3"
            />
            <label
              htmlFor="applyWaterproofingToInternalWet"
              className="text-gray-700"
            >
              Apply waterproofing process to internal wet areas
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="applyWaterproofingToBelowGround"
              checked={
                formData.selfAssessment.competencies
                  .applyWaterproofingToBelowGround
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "applyWaterproofingToBelowGround"
                )
              }
              className="mt-1 mr-3"
            />
            <label
              htmlFor="applyWaterproofingToBelowGround"
              className="text-gray-700"
            >
              Apply waterproofing system to below ground level wet areas
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="prepareSurfacesForWaterproofing"
              checked={
                formData.selfAssessment.competencies
                  .prepareSurfacesForWaterproofing
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "prepareSurfacesForWaterproofing"
                )
              }
              className="mt-1 mr-3"
            />
            <label
              htmlFor="prepareSurfacesForWaterproofing"
              className="text-gray-700"
            >
              Prepare surfaces for waterproofing application
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="useWaterproofingTools"
              checked={
                formData.selfAssessment.competencies.useWaterproofingTools
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "useWaterproofingTools"
                )
              }
              className="mt-1 mr-3"
            />
            <label htmlFor="useWaterproofingTools" className="text-gray-700">
              Use waterproofing tools and equipment
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="handleWaterproofingMaterials"
              checked={
                formData.selfAssessment.competencies
                  .handleWaterproofingMaterials
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "handleWaterproofingMaterials"
                )
              }
              className="mt-1 mr-3"
            />
            <label
              htmlFor="handleWaterproofingMaterials"
              className="text-gray-700"
            >
              Handle waterproofing materials and components
            </label>
          </div>

          <div className="flex items-start">
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
              className="mt-1 mr-3"
            />
            <label htmlFor="applyWHSRequirements" className="text-gray-700">
              Apply WHS requirements, policies and procedures in the
              construction industry
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="carryOutMeasurementsAndCalculations"
              checked={
                formData.selfAssessment.competencies
                  .carryOutMeasurementsAndCalculations
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "carryOutMeasurementsAndCalculations"
                )
              }
              className="mt-1 mr-3"
            />
            <label
              htmlFor="carryOutMeasurementsAndCalculations"
              className="text-gray-700"
            >
              Carry out measurements and calculations
            </label>
          </div>

          <div className="flex items-start">
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
              className="mt-1 mr-3"
            />
            <label
              htmlFor="readPlansAndSpecifications"
              className="text-gray-700"
            >
              Read and interpret plans and specifications
            </label>
          </div>

          <div className="flex items-start">
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
              className="mt-1 mr-3"
            />
            <label
              htmlFor="conductWorkplaceCommunication"
              className="text-gray-700"
            >
              Conduct workplace communication
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="planAndOrganiseWork"
              checked={formData.selfAssessment.competencies.planAndOrganiseWork}
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "planAndOrganiseWork"
                )
              }
              className="mt-1 mr-3"
            />
            <label htmlFor="planAndOrganiseWork" className="text-gray-700">
              Plan and organise work
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="workEffectivelyInConstruction"
              checked={
                formData.selfAssessment.competencies
                  .workEffectivelyInConstruction
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "workEffectivelyInConstruction"
                )
              }
              className="mt-1 mr-3"
            />
            <label
              htmlFor="workEffectivelyInConstruction"
              className="text-gray-700"
            >
              Work effectively and sustainably in the construction industry
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="carryOutConcreting"
              checked={formData.selfAssessment.competencies.carryOutConcreting}
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "carryOutConcreting"
                )
              }
              className="mt-1 mr-3"
            />
            <label htmlFor="carryOutConcreting" className="text-gray-700">
              Carry out concreting to simple forms
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="carryOutDemolition"
              checked={formData.selfAssessment.competencies.carryOutDemolition}
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "carryOutDemolition"
                )
              }
              className="mt-1 mr-3"
            />
            <label htmlFor="carryOutDemolition" className="text-gray-700">
              Carry out basic demolition
            </label>
          </div>

          <div className="flex items-start">
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
              className="mt-1 mr-3"
            />
            <label htmlFor="applyLevellingProcedures" className="text-gray-700">
              Apply basic levelling procedures
            </label>
          </div>

          <div className="flex items-start">
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
              className="mt-1 mr-3"
            />
            <label htmlFor="manageFinances" className="text-gray-700">
              Manage finances for new business ventures
            </label>
          </div>

          <div className="flex items-start">
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
              className="mt-1 mr-3"
            />
            <label
              htmlFor="investigateBusinessOpportunities"
              className="text-gray-700"
            >
              Investigate business opportunities
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="assessConstructionWaterproofingProcesses"
              checked={
                formData.selfAssessment.competencies
                  .assessConstructionWaterproofingProcesses
              }
              onChange={() =>
                handleNestedCheckboxChange(
                  "selfAssessment",
                  "competencies",
                  "assessConstructionWaterproofingProcesses"
                )
              }
              className="mt-1 mr-3"
            />
            <label
              htmlFor="assessConstructionWaterproofingProcesses"
              className="text-gray-700"
            >
              Assess construction waterproofing processes
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
const RefereeTestimonial = ({ formData, handleNestedInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Referee Testimonial and Skills Verification Declaration
      </h3>

      <p className="mb-4">
        This document serves as an official testimonial certifying that the
        individual has demonstrated the competencies and practical skills
        required for CPC30320 Certificate III in Concreting as outlined below.
      </p>

      <div className="border border-gray-300 rounded-md p-6 mb-6">
        <h4 className="font-medium text-gray-800 mb-4">
          Referee Contact Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="refereeName"
              className="block text-gray-700 font-medium mb-2"
            >
              Name:
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
              Position/Title:
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
              required
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-medium mb-2"
            >
              Contact Number:
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

        <h4 className="font-medium text-gray-800 mb-4">
          Core Competencies and Activities Performed by the Candidate
        </h4>
        <p className="mb-4">
          The following list includes workplace activities regularly performed
          by the candidate as part of their role, aligned with the industry
          standards and requirements of the CPC30320 Certificate III in
          Concreting. As a referee, I certify that I have directly observed or
          supervised the candidate in these tasks and can confirm their
          competency in each area.
        </p>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <ul className="list-disc ml-6 space-y-2">
            <li>Place and fix reinforcement materials</li>
            <li>Core concrete</li>
            <li>Install topping slabs</li>
            <li>Slump-test concrete</li>
            <li>Cut concrete</li>
            <li>Repair and rectify concrete</li>
            <li>Cure concrete</li>
            <li>Finish concrete</li>
            <li>Place concrete</li>
            <li>Determine concrete supply requirements</li>
            <li>
              Select, use and maintain concreting plant, tools and equipment
            </li>
            <li>Handle concreting materials and components</li>
            <li>Read and interpret plans and specifications</li>
            <li>Carry out measurements and calculations</li>
            <li>Conduct workplace communication</li>
            <li>Plan and organise work</li>
            <li>
              Work effectively and sustainably in the construction industry
            </li>
            <li>Apply basic levelling procedures</li>
            <li>Carry out hand excavation</li>
            <li>
              Erect and dismantle formwork for footings and slabs on ground
            </li>
            <li>Carry out setting out</li>
            <li>
              Apply WHS requirements, policies and procedures in the
              construction industry
            </li>
          </ul>
        </div>

        <div className="border-t border-gray-300 pt-6 mb-6">
          <h4 className="font-medium text-gray-800 mb-4">
            Referee Declaration
          </h4>
          <p className="mb-4">
            In my capacity as Referee, I declare that the information provided
            in this document is true and accurate to the best of my knowledge.
            Should further verification or clarification be required, I can
            provide additional details.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
    </div>
  );
};

export default RPLIntakeCPC31420WaterProofing;
