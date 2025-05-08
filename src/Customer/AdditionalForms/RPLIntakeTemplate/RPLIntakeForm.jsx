import React, { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import submitRPLIntakeForm from "../../Services/rtoFormsServices";
import SpinnerLoader from "../../components/spinnerLoader";
import ChatbotComponent from "../../Services/ChatbotComponent";

// List of competencies for CPC31020 Certificate III in Solid Plastering

const RPLIntakeForm = ({ competencies, qualificationName }) => {
  // State for tracking the current section (1 to 6)
  const [activeSection, setActiveSection] = useState(1);
  const totalSections = 5;
  const navigate = useNavigate();
  const [applicationId, setApplicationId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  useEffect(() => {
    const idFromUrl = window.location.pathname.split("/")[2];
    setApplicationId(idFromUrl);
    console.log("id passed", idFromUrl);
  }, []);

  // State for form data, using a nested object to store all inputs
  const [formData, setFormData] = useState({
    // studentInitials: "",
    // studentName: "",
    courseQualification: qualificationName,
    studentDeclaration: {
      name: "",
      date: "",
      signature: "",
    },
    confirmationOfReassessment: {
      studentName: "",
      qualification: qualificationName,
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
    //   files: [], // Store uploaded files
    // },
    selfAssessment: {
      keySkills: "",
      workExperience: "",
      tasksResponsibilities: "",
      training: "",
      additionalSupport: "",
      competencies: competencies.reduce(
        (acc, comp) => ({ ...acc, [comp]: false }),
        {}
      ), // Initialize competencies as false
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
      competencies: competencies.reduce(
        (acc, comp) => ({ ...acc, [comp]: false }),
        {}
      ),
    },
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handler for top-level input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handler for nested input changes (e.g., studentDeclaration.name)
  const handleNestedInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  // Handler for double-nested input changes (e.g., employerVerification.employer1.orgName)
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

  // Handler for checkbox changes in evidence section
  const handleCheckboxChange = (section, field) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field],
      },
    }));
  };

  // Handler for nested checkbox changes (e.g., selfAssessment.competencies)
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

  // Handler for file uploads
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      evidence: {
        ...prev.evidence,
        files: [...prev.evidence.files, ...files],
      },
    }));
  };

  // Validate the current section before advancing
  const validateSection = (section) => {
    const newErrors = {};
    switch (section) {
      case 1:
        if (!formData.studentDeclaration.name.trim())
          newErrors.studentDeclaration = { name: "Name is required" };
        if (!formData.studentDeclaration.date)
          newErrors.studentDeclaration = {
            ...newErrors.studentDeclaration,
            date: "Date is required",
          };
        if (!formData.studentDeclaration.signature.trim())
          newErrors.studentDeclaration = {
            ...newErrors.studentDeclaration,
            signature: "Signature is required",
          };
        break;
      case 2:
        if (!formData.confirmationOfReassessment.studentName.trim())
          newErrors.confirmationOfReassessment = {
            studentName: "Name is required",
          };
        if (!formData.confirmationOfReassessment.email.includes("@"))
          newErrors.confirmationOfReassessment = {
            ...newErrors.confirmationOfReassessment,
            email: "Valid email is required",
          };
        break;
      // case 3:
      //   if (!Object.values(formData.evidence).some((value) => value === true))
      //     newErrors.evidence = {
      //       general: "At least one evidence type must be selected",
      //     };
      //   break;
      case 3:
        if (!formData.selfAssessment.keySkills.trim())
          newErrors.selfAssessment = { keySkills: "Key skills are required" };
        if (!formData.selfAssessment.workExperience.trim())
          newErrors.selfAssessment = {
            ...newErrors.selfAssessment,
            workExperience: "Work experience is required",
          };
        break;
      case 4:
        if (!formData.employerVerification.employer1.orgName.trim())
          newErrors.employerVerification = {
            orgName: "Organisation name is required",
          };
        if (!formData.employerVerification.employer1.supervisorName.trim())
          newErrors.employerVerification = {
            ...newErrors.employerVerification,
            supervisorName: "Supervisor name is required",
          };
        break;
      case 5:
        if (!formData.refereeTestimonial.refereeName.trim())
          newErrors.refereeTestimonial = {
            refereeName: "Referee name is required",
          };
        if (!formData.refereeTestimonial.position.trim())
          newErrors.refereeTestimonial = {
            ...newErrors.refereeTestimonial,
            position: "Position is required",
          };
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigate to the next section
  const handleNext = () => {
    // if (validateSection(activeSection)) {
    setActiveSection((prev) => Math.min(prev + 1, totalSections));
    // } else {
    // alert("Please complete all required fields before proceeding.");
    // }
  };

  // Navigate to the previous section
  const handleBack = () => {
    setActiveSection((prev) => Math.max(prev - 1, 1));
  };

  // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateSection(activeSection)) {
  //     console.log("Form submitted:", formData);
  //     alert("RPL Assessment submitted successfully!");
  //   } else {
  //     alert("Please complete all required fields.");
  //   }
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
      const result = await submitRPLIntakeForm(applicationId, formData);

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
      <ChatbotComponent />
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

            <form onSubmit={(e) => handleSubmit(e)}>
              {activeSection === 1 && (
                <StudentDeclaration
                  formData={formData}
                  handleNestedInputChange={handleNestedInputChange}
                  errors={errors.studentDeclaration}
                />
              )}
              {activeSection === 2 && (
                <ConfirmationOfReassessment
                  formData={formData}
                  handleNestedInputChange={handleNestedInputChange}
                  errors={errors.confirmationOfReassessment}
                />
              )}
              {/* {activeSection === 3 && (
              <EvidenceCollection
                formData={formData}
                handleCheckboxChange={handleCheckboxChange}
                handleFileChange={handleFileChange}
                errors={errors.evidence}
              />
            )} */}
              {activeSection === 3 && (
                <SelfAssessment
                  formData={formData}
                  handleNestedInputChange={handleNestedInputChange}
                  handleNestedCheckboxChange={handleNestedCheckboxChange}
                  errors={errors.selfAssessment}
                  competencies={competencies} // Add this prop
                />
              )}
              {activeSection === 4 && (
                <EmployerVerification
                  formData={formData}
                  handleDoubleNestedInputChange={handleDoubleNestedInputChange}
                  errors={errors.employerVerification}
                />
              )}
              {activeSection === 5 && (
                <RefereeTestimonial
                  formData={formData}
                  handleNestedInputChange={handleNestedInputChange}
                  handleNestedCheckboxChange={handleNestedCheckboxChange}
                  errors={errors.refereeTestimonial}
                  competencies={competencies}
                  qualificationName={qualificationName}
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
    </>
  );
};

// Student Declaration Component
const StudentDeclaration = ({ formData, handleNestedInputChange, errors }) => {
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
            <label className="block text-gray-700 font-medium mb-2">
              Name:
            </label>
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
            {errors?.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Date:
            </label>
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
            {errors?.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
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
            More information can be found at{" "}
            <a
              href="https://www.asqa.gov.au/guidance-resources/resources-providers/faqs/recognition-prior-learning-rpl"
              className="text-emerald-600 hover:underline"
            >
              ASQA RPL FAQs
            </a>
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
          <label className="block text-gray-700 font-medium mb-2">
            Signature:
          </label>
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
            placeholder="Type your full name as signature"
            required
          />
          {errors?.signature && (
            <p className="text-red-500 text-sm mt-1">{errors.signature}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Confirmation of Reassessment Component
const ConfirmationOfReassessment = ({
  formData,
  handleNestedInputChange,
  errors,
}) => {
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
              value={formData.confirmationOfReassessment.studentName}
              onChange={(e) =>
                handleNestedInputChange(
                  "confirmationOfReassessment",
                  "studentName",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            {errors?.studentName && (
              <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Qualification:
            </label>
            <input
              type="text"
              readOnly
              value={formData.confirmationOfReassessment.qualification}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              value={formData.confirmationOfReassessment.email}
              onChange={(e) =>
                handleNestedInputChange(
                  "confirmationOfReassessment",
                  "email",
                  e.target.value
                )
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            {errors?.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mobile:
            </label>
            <input
              type="number"
              value={formData.confirmationOfReassessment.mobile}
              onChange={(e) =>
                handleNestedInputChange(
                  "confirmationOfReassessment",
                  "mobile",
                  e.target.value
                )
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
              value={formData.confirmationOfReassessment.dob}
              onChange={(e) =>
                handleNestedInputChange(
                  "confirmationOfReassessment",
                  "dob",
                  e.target.value
                )
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
const EvidenceCollection = ({
  formData,
  handleCheckboxChange,
  handleFileChange,
  errors,
}) => {
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
        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Evidence Files:
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            accept=".pdf,.jpg,.jpeg,.png,.mp4"
          />
          {formData.evidence.files.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600">
              {formData.evidence.files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>
        {errors?.general && (
          <p className="text-red-500 text-sm mt-4">{errors.general}</p>
        )}
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
const SelfAssessment = ({
  formData,
  handleNestedInputChange,
  handleNestedCheckboxChange,
  errors,
  competencies,
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
            {errors?.keySkills && (
              <p className="text-red-500 text-sm mt-1">{errors.keySkills}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Describe your work experience and how it relates to the units of
              competency in this course (briefly outline your industry
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
              rows="4"
              required
            ></textarea>
            {errors?.workExperience && (
              <p className="text-red-500 text-sm mt-1">
                {errors.workExperience}
              </p>
            )}
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
          {competencies.map((comp) => (
            <div key={comp} className="flex items-center">
              <input
                type="checkbox"
                id={comp}
                checked={formData.selfAssessment.competencies[comp]}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "selfAssessment",
                    "competencies",
                    comp
                  )
                }
                className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label htmlFor={comp} className="ml-3 text-gray-700">
                {comp}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Employer Verification Component
const EmployerVerification = ({
  formData,
  handleDoubleNestedInputChange,
  errors,
}) => {
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
            <label className="block text-gray-700 font-medium mb-2">
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
            {errors?.orgName && (
              <p className="text-red-500 text-sm mt-1">{errors.orgName}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            {errors?.supervisorName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.supervisorName}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
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
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
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
            required
          />
        </div>
        <h4 className="font-medium text-gray-800 mb-4">Employment Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
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
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
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
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
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
          <label className="block text-gray-700 font-medium mb-2">
            Description of Duties:
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
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-32"
            placeholder="Please provide a detailed description of the student's duties and responsibilities"
            required
          ></textarea>
        </div>
      </div>
      <div className="border border-gray-300 rounded-md p-6 mb-6">
        <h4 className="font-medium text-gray-800 mb-4">
          Employer 2 Details (Optional)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
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
            <label className="block text-gray-700 font-medium mb-2">
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
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
            <label className="block text-gray-700 font-medium mb-2">
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
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
        <h4 className="font-medium text-gray-800 mb-4">Employment Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
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
            <label className="block text-gray-700 font-medium mb-2">
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
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
            <label className="block text-gray-700 font-medium mb-2">
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
          <label className="block text-gray-700 font-medium mb-2">
            Description of Duties:
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
  errors,
  competencies,
  qualificationName,
}) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Referee Testimonial and Skills Verification Declaration
      </h3>
      <p className="mb-4">
        This document serves as an official testimonial certifying that the
        individual has demonstrated the competencies and practical skills
        required for CPC31020 Certificate III in Solid Plastering.
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
            className="border-b border-gray-400 px-2 py-1 focus:outline-none focus:border-emerald-500 rounded-lg text-center"
            placeholder="Student Name"
          />{" "}
          in {qualificationName}
        </p>
        <p className="mb-6">
          This document serves as an official testimonial certifying that the
          above-named individual,{" "}
          {formData.refereeTestimonial.studentName || "___________"}, has
          demonstrated the competencies and practical skills required for{" "}
          {qualificationName} as outlined below. These skills were performed and
          verified during their employment at{" "}
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
            className="border-b border-gray-400 px-2 py-1 focus:outline-none focus:border-emerald-500 rounded-lg text-center"
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
            className="border-b border-gray-400 px-2 py-1 focus:outline-none focus:border-emerald-500 rounded-lg text-center"
            placeholder="Employment Period"
          />
          .
        </p>
        <h4 className="font-medium text-gray-800 mb-4">
          Core Competencies and Activities Performed by the Candidate:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {competencies.map((comp) => (
            <div key={comp} className="flex items-center">
              <input
                type="checkbox"
                id={comp}
                checked={formData.refereeTestimonial.competencies[comp]}
                onChange={() =>
                  handleNestedCheckboxChange(
                    "refereeTestimonial",
                    "competencies",
                    comp
                  )
                }
                className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor={comp} className="ml-2 text-gray-700">
                {comp}
              </label>
            </div>
          ))}
        </div>
        <h4 className="font-medium text-gray-800 mb-4">
          Referee Contact Details:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            {errors?.refereeName && (
              <p className="text-red-500 text-sm mt-1">{errors.refereeName}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            {errors?.position && (
              <p className="text-red-500 text-sm mt-1">{errors.position}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
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
            <label className="block text-gray-700 font-medium mb-2">
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
            <label className="block text-gray-700 font-medium mb-2">
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
            <label className="block text-gray-700 font-medium mb-2">
              Signature:
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Type your full name as signature"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RPLIntakeForm;
