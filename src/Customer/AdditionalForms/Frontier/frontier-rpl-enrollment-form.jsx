import React, { useState } from "react";
import Navbar from "../../components/navbar";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const FrontierRPLEnrollmentForm = () => {
  const [activeSection, setActiveSection] = useState(1);
  const totalSections = 16; // Total number of sections in the form

  const [formData, setFormData] = useState({
    // Part A: Pre-Enrollment Information - Read only

    // Part B: Enrollment Form
    qualification: "",
    personalDetails: {
      title: "",
      familyName: "",
      givenNames: "",
      dateOfBirth: "",
      gender: "",
      homePhone: "",
      workPhone: "",
      mobile: "",
      email: "",
      residentialAddress: {
        flatUnit: "",
        streetName: "",
        suburb: "",
        state: "",
        postcode: "",
      },
      postalAddress: {
        flatUnit: "",
        streetName: "",
        suburb: "",
        state: "",
        postcode: "",
      },
    },
    emergencyContact: {
      fullName: "",
      relationship: "",
      homePhone: "",
      workPhone: "",
      mobile: "",
      email: "",
      address: "",
      state: "",
      postcode: "",
    },
    languageCulturalDiversity: {
      countryOfBirth: "",
      countryOfCitizenship: "",
      citizenshipStatus: "",
      otherCitizenshipStatus: "",
      speakOtherLanguage: "",
      otherLanguage: "",
      englishProficiency: "",
      aboriginal: "",
    },
    disabilityLearnerSupport: {
      haveDisability: "",
      disabilityTypes: [],
      requireSupport: "",
    },
    concession: {
      haveConcession: "",
      cardType: "",
      cardNumber: "",
    },
    schooling: {
      studiedStates: [],
      highestSchoolLevel: "",
      yearCompleted: "",
      attendingSecondary: "",
      vsn: "",
      apprentice: "",
      deltaNumber: "",
    },
    previousQualifications: {
      completedQualifications: "",
      qualificationsAchieved: [],
    },
    employmentStatus: {
      currentStatus: "",
      occupation: "",
      industry: "",
      employerDetails: {
        tradingName: "",
        abn: "",
        industry: "",
        legalName: "",
        position: "",
        address: "",
        suburb: "",
        state: "",
        postcode: "",
        phone: "",
        mobile: "",
        contactPerson: "",
        contactNumber: "",
      },
    },
    studyReason: "",
    applyingForLicensing: false,
    usi: "",
    usiConsent: false,
    townCityOfBirth: "",
    identityDocument: {
      type: "",
      state: "",
      licenseNumber: "",
      medicareNumber: "",
      individualReference: "",
      cardColor: "",
      expiryDate: "",
      passportNumber: "",
      countryOfIssue: "",
      citizenshipStockNumber: "",
      acquisitionDate: "",
    },
    creditTransfer: [],

    // Part C: Referee Details
    referees: [
      {
        applicantFirstName: "",
        applicantFamilyName: "",
        refereeName: "",
        companyName: "",
        employmentStart: "",
        employmentFinish: "",
        employmentType: "",
        relationshipType: "",
        yearsExperience: "",
        fullTime: true,
        skillsVerified: "",
        generalDuties: "",
        otherTasks: "",
      },
      {
        applicantFirstName: "",
        applicantFamilyName: "",
        refereeName: "",
        companyName: "",
        employmentStart: "",
        employmentFinish: "",
        employmentType: "",
        relationshipType: "",
        yearsExperience: "",
        fullTime: true,
        skillsVerified: "",
        generalDuties: "",
        otherTasks: "",
      },
      {
        applicantFirstName: "",
        applicantFamilyName: "",
        refereeName: "",
        companyName: "",
        employmentStart: "",
        employmentFinish: "",
        employmentType: "",
        relationshipType: "",
        yearsExperience: "",
        fullTime: true,
        skillsVerified: "",
        generalDuties: "",
        otherTasks: "",
      },
    ],

    // Part D: Evidence to be submitted - Read only

    // Declarations
    privacyConsent: false,
    ncverConsent: false,
    governmentPrivacyConsent: false,
    studentDeclarations: {
      readHandbook: false,
      informedAboutTraining: false,
      readPolicies: false,
      readCourseBooklet: false,
      understandAttendance: false,
      understandCompletion: false,
      understandEnrollment: false,
      understandNameAddressChange: false,
    },
  });
  // This function handles changes for top-level fields or non-nested fields
  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]:
        typeof prev[section] === "object" && field
          ? { ...prev[section], [field]: value }
          : value,
    }));
  };

  // Fixed function to handle deeply nested input changes
  const handleNestedInputChange = (section, fieldOrPath, value) => {
    setFormData((prev) => {
      // If fieldOrPath is an array, it's a path to a deeply nested property
      if (Array.isArray(fieldOrPath)) {
        const [parentField, childField] = fieldOrPath;

        return {
          ...prev,
          [section]: {
            ...prev[section],
            [parentField]: {
              ...prev[section][parentField],
              [childField]: value,
            },
          },
        };
      }
      // If fieldOrPath is a string, it's a direct child of the section
      else {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [fieldOrPath]: value,
          },
        };
      }
    });
  };

  const handleRefereeChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedReferees = [...prev.referees];
      updatedReferees[index] = {
        ...updatedReferees[index],
        [field]: value,
      };
      return {
        ...prev,
        referees: updatedReferees,
      };
    });
  };

  const handleCheckboxChange = (section, field, checked) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: checked,
      },
    }));
  };

  const handleMultiCheckboxChange = (section, field, value, checked) => {
    setFormData((prev) => {
      const currentValues = [...prev[section][field]];
      if (checked) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: [...currentValues, value],
          },
        };
      } else {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: currentValues.filter((item) => item !== value),
          },
        };
      }
    });
  };

  const validateSection = (section) => {
    // Basic validation for required fields
    switch (section) {
      case 1:
        // Pre-enrollment information - just reading
        return true;
      case 2:
        // Enrollment form - personal details
        return (
          formData.qualification &&
          formData.personalDetails.familyName &&
          formData.personalDetails.givenNames &&
          formData.personalDetails.dateOfBirth &&
          formData.personalDetails.gender &&
          formData.personalDetails.mobile
        );
      case 3:
        // Employment, study reason, USI
        return formData.usi && formData.usiConsent;
      case 4:
        // Credit Transfer and Declarations
        return (
          formData.privacyConsent &&
          formData.ncverConsent &&
          formData.governmentPrivacyConsent
        );
      case 5:
        // Referee details
        return (
          formData.referees[0].refereeName && formData.referees[1].refereeName
        );
      case 6:
        // Evidence to be submitted - just reading
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    // if (validateSection(activeSection)) {
    setActiveSection((prev) => Math.min(prev + 1, totalSections));
    window.scrollTo(0, 0);
    // } else {
    //   alert("Please complete all required fields before proceeding.");
    // }
  };

  const handleBack = () => {
    setActiveSection((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You might want to send the data to an API endpoint
    alert("Your RPL enrollment form has been submitted successfully!");
  };

  const progressPercentage = (activeSection / totalSections) * 100;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-28 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-medium font-outfit text-emerald-800 mb-2">
              Frontier Institute of Technology
            </h1>
            <h2 className="text-2xl font-medium text-emerald-700">
              RPL Enrollment Form
            </h2>
            <p className="text-sm text-gray-500">RTO NO: 21244</p>
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
              Section {activeSection} of {totalSections}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Section 1: Pre-Enrollment Information */}
            {activeSection === 1 && <PreEnrollmentInfo />}

            {/* Section 2: Enrollment Form - Personal Details */}
            {activeSection === 2 && (
              <PersonalDetails
                formData={formData}
                handleInputChange={handleInputChange}
                handleNestedInputChange={handleNestedInputChange}
              />
            )}

            {activeSection === 3 && (
              <EmergencyContact
                formData={formData}
                handleInputChange={handleInputChange}
                handleNestedInputChange={handleNestedInputChange}
              />
            )}
            {activeSection === 4 && (
              <LanguageCulturalDiversity
                formData={formData}
                handleInputChange={handleInputChange}
                handleNestedInputChange={handleNestedInputChange}
              />
            )}
            {activeSection === 5 && (
              <DisabilityLearnerSupport
                formData={formData}
                handleInputChange={handleInputChange}
                handleNestedInputChange={handleNestedInputChange}
                handleMultiCheckboxChange={handleMultiCheckboxChange}
              />
            )}

            {activeSection === 6 && (
              <Concession
                formData={formData}
                handleInputChange={handleInputChange}
                handleNestedInputChange={handleNestedInputChange}
              />
            )}
            {activeSection === 7 && (
              <Schooling
                formData={formData}
                handleInputChange={handleInputChange}
                handleNestedInputChange={handleNestedInputChange}
                handleMultiCheckboxChange={handleMultiCheckboxChange}
              />
            )}
            {activeSection === 8 && (
              <PreviousQualification
                formData={formData}
                handleInputChange={handleInputChange}
                handleNestedInputChange={handleNestedInputChange}
                handleMultiCheckboxChange={handleMultiCheckboxChange}
              />
            )}
            {activeSection === 9 && (
              <EmploymentStatus
                formData={formData}
                handleInputChange={handleInputChange}
                handleNestedInputChange={handleNestedInputChange}
              />
            )}

            {activeSection === 10 && (
              <StudyReason
                formData={formData}
                handleInputChange={handleInputChange}
                handleNestedInputChange={handleNestedInputChange}
              />
            )}

            {/* Section 3: Employment, Study Reason, USI */}
            {activeSection === 11 && (
              <EmploymentUSI
                formData={formData}
                handleInputChange={handleInputChange}
                handleNestedInputChange={handleNestedInputChange}
                handleCheckboxChange={handleCheckboxChange}
                handleMultiCheckboxChange={handleMultiCheckboxChange}
              />
            )}

            {/* Section 4: Credit Transfer and Declarations */}
            {activeSection === 12 && (
              <CreditTransferDeclarations
                formData={formData}
                handleInputChange={handleInputChange}
                handleCheckboxChange={handleCheckboxChange}
              />
            )}

            {activeSection === 13 && (
              <ComplaintAndAppeal
                formData={formData}
                handleInputChange={handleInputChange}
                handleCheckboxChange={handleCheckboxChange}
              />
            )}
            {activeSection === 14 && (
              <StudentDeclaration
                formData={formData}
                handleInputChange={handleInputChange}
                handleCheckboxChange={handleCheckboxChange}
              />
            )}

            {/* Section 5: Referee Details */}
            {activeSection === 15 && (
              <RefereeDetails
                formData={formData}
                handleRefereeChange={handleRefereeChange}
              />
            )}

            {/* Section 6: Evidence to be Submitted */}
            {activeSection === 16 && <EvidenceSubmission />}

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
                  Submit Enrollment
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

// Section 1: Pre-Enrollment Information
const PreEnrollmentInfo = () => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        PART A: PRE-ENROLLMENT INFORMATION
      </h3>

      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-2">What is RPL?</h4>
        <p className="mb-4">
          According to the Australian Qualification Framework, the definition
          Recognition of Prior Learning (RPL) is:
        </p>
        <p className="italic mb-4 pl-4 border-l-4 border-gray-300">
          Recognition of prior learning is an assessment process that involves
          assessment of an individual's relevant prior learning (including
          formal, informal and non-formal learning) to determine the credit
          outcome of an individual application for credit.
        </p>
        <p className="mb-4">
          Source: https://www.aqf.edu.au/sites/aqf/files/rpl-explanation.pdf
        </p>
        <p className="mb-4">Recognition is sometimes known as:</p>
        <ul className="list-disc pl-8 mb-4">
          <li>Recognition of Prior Learning (RPL)</li>
          <li>Recognition of Current Competency (RCC)</li>
        </ul>
        <p className="mb-4">
          According to the Standards for RTO's, Recognition of Prior Learning
          (RPL) means an assessment process that assesses the competency/s of an
          individual that may have been acquired through formal, non-formal and
          informal learning to determine the extent to which that individual
          meets the requirements specified in the training package or VET
          accredited courses.
        </p>
        <ol className="list-alpha pl-8 mb-4">
          <li className="mb-2">
            <strong>formal learning</strong> refers to learning that takes place
            through a structured program of instruction and is linked to the
            attainment of an AQF qualification or statement of attainment (for
            example, a certificate, diploma or university degree).
          </li>
          <li className="mb-2">
            <strong>non-formal learning</strong> refers to learning that takes
            place through a structured program of instruction, but does not lead
            to the attainment of an AQF qualification or statement of attainment
            (for example, in-house professional development programs conducted
            by a business); and
          </li>
          <li className="mb-2">
            <strong>informal learning</strong> refers to learning that results
            from experience of work-related, social, family, hobby or leisure
            activities (for example the acquisition of interpersonal skills
            developed through several years as a sales representative).
          </li>
        </ol>
        <p className="mb-4">
          Source: https://www.legislation.gov.au/Details/F2019C00503
        </p>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-2">Who is eligible?</h4>
        <p className="mb-4">
          To be eligible and for us to consider a candidate's application, the
          candidate must provide the following evidences along with a filled
          application form:
        </p>
        <ol className="list-decimal pl-8 mb-4">
          <li className="mb-2">
            Minimum 2 years of job experience in the industry, supported by a
            current CV and other relevant documents as listed below:
            <ol className="list-alpha pl-6 mt-2">
              <li>CV / Resume;</li>
              <li>Any licenses if applicable;</li>
              <li>
                Previously completed qualification certificates and transcripts;
              </li>
              <li>Overseas qualification and transcripts, if relevant;</li>
              <li>Employer's Letter of employment;</li>
              <li>
                If business owned by the candidate, an ABN registration copy;
              </li>
              <li>
                A supervisor's letter acknowledging their experience in the job
                and the industry;
              </li>
            </ol>
          </li>
          <li className="mb-2">
            A declaration of a nominated third-party supervisor, who will work
            along the candidate to support their RPL process. A third-party
            supervisor could be a colleague, a manager or a supervisor at your
            workplace.
          </li>
          <li>
            At least 2 referees, not including the third-party supervisor.
          </li>
        </ol>
      </div>

      <div className="mb-6">
        <p className="mb-4">
          Potential Candidates must fill out the RPL application form with the
          above evidence and submit it to Frontier via email to
          enrolment@frontier.edu.au. Once the application is processed, the
          candidate will receive an initial self-assessment document in which
          they are required to select the type of evidence that they can provide
          for each unit of competency. As soon as the candidate submits the
          initial self-assessment, the administration team will forward the
          document along with the evidence provided to a qualified Trainer who
          will evaluate it and contact the candidate. The Trainer and Assessor
          will provide the candidate with an RPL initial evaluation report
          outlining the next steps they will have to take. If the candidate is
          dissatisfied with the outcome of the RPL application, they have the
          right to appeal the decision. For more details on the outcome appeal
          process, please read Frontier's Student Support Policy and Procedure
          and Frontier's Complaint and Appeal Policy and Procedure. Both
          policies can be found at https://frontier.edu.au/policies-2/.
        </p>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-2">
          Who are eligible as Referees to assess your skill and knowledge?
        </h4>
        <p className="mb-4">
          The applicant must provide details of three referees on the
          application form. Out of the three, one of the referees, the
          'Testimonial Referee', must be a supervisor, and the other two, the
          'Nominated Referees', will be contacted by the Assessor for reference
          check. One of the 'Nominated Referees' should be able to provide the
          candidate with a 'Third-Party Report', and they must be in a position
          to verify the applicant's skills and knowledge and to validate the
          candidate's working period with the company. An explanation of the
          type of referees are detailed below:
        </p>
        <p className="mb-4 pl-4 border-l-4 border-gray-300">
          <strong>Testimonial Referee:</strong> A testimonial referee can be an
          employer, a supervisor or a manager. They should be able to provide
          the candidate with a testimonial letter declaring that they have known
          them for more than 1 year and declare that they have sufficient job
          experience to meet the qualification requirements. The testimonial
          referee must also outline how the qualification will benefit the
          candidate and the job role at their workplace.
        </p>
        <p className="mb-4 pl-4 border-l-4 border-gray-300">
          <strong>Nominated Referee:</strong> There should be two nominated
          referees in the form. A nominated referee can be a colleague, a
          supervisor or a manager who has worked with the candidate and can
          assess their skills and knowledge relevant to each unit of competency.
          The two nominated referees are the ones who will be contacted for
          reference check. One of the nominated referees has to provide a
          detailed Third-Party Report for each Unit of Competency.
        </p>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-2">The RPL Stages</h4>
        <p className="mb-4">
          Learning opportunities can contribute to an individual's current
          abilities to enable formal recognition of a nationally recognised
          qualification / unit of competency.
        </p>
        <p className="mb-4">
          Recognition of Prior Learning (RPL) is an assessment pathway to gain a
          qualification when a candidate believes that they have the skills,
          knowledge and experience gained through work, training courses and
          work-based training to meet the requirements of the course.
        </p>
        <p className="mb-4">
          The evidence they provide will be assessed against the evidence
          requirements of one or more units of competency. The RPL process
          shortens the course duration, but it has its own structure to assess
          students' competency against units of competency. There are six stages
          involved in the RPL process, however, it is upon the Trainer &
          Assessor's discretion to determine and select the steps that students
          will need to complete. The more evidence provided by students at the
          beginning during the 'Initial RPL Self-Assessment, the fewer steps the
          RPL process will involve.
        </p>
        <p className="mb-4">
          Please note that any training courses, work-based training, skills,
          knowledge, and experience gained through work must have been gained in
          a legal manner and must be verifiable to be able to be recognised for
          RPL.
        </p>
        <div className="mb-4">
          <h5 className="font-medium mb-2">
            The stages as key assessment methods involved in the RPL include:
          </h5>
          <ul className="list-disc pl-8">
            <li>Step 1: Initial Self-Assessment and Evidence Gathering</li>
            <li>Step 2</li>
            <li>
              Step 3: Third Party Report & Verification of Third Party &
              Evidence Authenticity
            </li>
            <li>Step 4: Conversational Competency / Interview</li>
            <li>Step 5: Knowledge Assessment or Practical Demonstration</li>
            <li>Step 6: Gap Training or Gap Assessment</li>
          </ul>
        </div>
        <p className="text-sm italic">
          Refer to: Frontier's Assessment Policy & Procedure, and RPL Assessor
          Guide for more information
        </p>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <h4 className="font-medium text-gray-800 mb-2 underline">Next Steps</h4>
        <p className="mb-2">
          Please continue to the next section to complete the enrollment form.
          You will need to provide:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Your personal and contact details</li>
          <li>Information about your qualifications and employment history</li>
          <li>
            Details of three referees who can verify your skills and experience
          </li>
          <li>Documentation to support your application</li>
        </ul>
      </div>
    </div>
  );
};

// Section 2: Personal Details
// PersonalDetails Component
const PersonalDetails = ({
  formData,
  handleInputChange,
  handleNestedInputChange,
}) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        PART B: ENROLLMENT FORM - Personal Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">
            Which qualification are you applying for?{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.qualification}
            onChange={(e) =>
              handleInputChange("qualification", "", e.target.value)
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="">Select a qualification</option>
            <option value="BSB30115">
              BSB30115 Certificate III in Business
            </option>
            <option value="BSB40215">
              BSB40215 Certificate IV in Business
            </option>
            <option value="BSB50215">BSB50215 Diploma of Business</option>
            <option value="CPC30211">
              CPC30211 Certificate III in Carpentry
            </option>
            <option value="CPC40110">
              CPC40110 Certificate IV in Building and Construction (Building)
            </option>
            <option value="CPC50210">
              CPC50210 Diploma of Building and Construction (Building)
            </option>
            <option value="TAE40116">
              TAE40116 Certificate IV in Training and Assessment
            </option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Personal Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.personalDetails.title}
              onChange={(e) =>
                handleNestedInputChange(
                  "personalDetails",
                  "title",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">Select title</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
              <option value="Miss">Miss</option>
              <option value="Dr.">Dr.</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Family Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.personalDetails.familyName}
              onChange={(e) =>
                handleNestedInputChange(
                  "personalDetails",
                  "familyName",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Given Names <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.personalDetails.givenNames}
              onChange={(e) =>
                handleNestedInputChange(
                  "personalDetails",
                  "givenNames",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.personalDetails.dateOfBirth}
              onChange={(e) =>
                handleNestedInputChange(
                  "personalDetails",
                  "dateOfBirth",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.personalDetails.gender}
              onChange={(e) =>
                handleNestedInputChange(
                  "personalDetails",
                  "gender",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">Home Phone</label>
            <input
              type="tel"
              value={formData.personalDetails.homePhone}
              onChange={(e) =>
                handleNestedInputChange(
                  "personalDetails",
                  "homePhone",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Work Phone</label>
            <input
              type="tel"
              value={formData.personalDetails.workPhone}
              onChange={(e) =>
                handleNestedInputChange(
                  "personalDetails",
                  "workPhone",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Mobile <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.personalDetails.mobile}
              onChange={(e) =>
                handleNestedInputChange(
                  "personalDetails",
                  "mobile",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.personalDetails.email}
            onChange={(e) =>
              handleNestedInputChange(
                "personalDetails",
                "email",
                e.target.value
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Residential Address</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Flat/Unit Details
            </label>
            <input
              type="text"
              value={formData.personalDetails.residentialAddress.flatUnit}
              onChange={(e) =>
                handleNestedInputChange(
                  "personalDetails",
                  ["residentialAddress", "flatUnit"],
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Street Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.personalDetails.residentialAddress.streetName}
              onChange={(e) =>
                handleNestedInputChange(
                  "personalDetails",
                  ["residentialAddress", "streetName"],
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Suburb <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.personalDetails.residentialAddress.suburb}
              onChange={(e) =>
                handleNestedInputChange(
                  "personalDetails",
                  ["residentialAddress", "suburb"],
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.personalDetails.residentialAddress.state}
              onChange={(e) =>
                handleNestedInputChange(
                  "personalDetails",
                  ["residentialAddress", "state"],
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">Select state</option>
              <option value="VIC">VIC</option>
              <option value="NSW">NSW</option>
              <option value="QLD">QLD</option>
              <option value="WA">WA</option>
              <option value="SA">SA</option>
              <option value="TAS">TAS</option>
              <option value="NT">NT</option>
              <option value="ACT">ACT</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Postcode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.personalDetails.residentialAddress.postcode}
              onChange={(e) =>
                handleNestedInputChange(
                  "personalDetails",
                  ["residentialAddress", "postcode"],
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-4">
          Postal Address (if different from above)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Flat/Unit Details
            </label>
            <input
              type="text"
              value={formData.personalDetails.postalAddress.flatUnit}
              onChange={(e) =>
                handleNestedInputChange(
                  "personalDetails",
                  ["postalAddress", "flatUnit"],
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Street Name</label>
            <input
              type="text"
              value={formData.personalDetails.postalAddress.streetName}
              onChange={(e) =>
                handleNestedInputChange(
                  "personalDetails",
                  ["postalAddress", "streetName"],
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Suburb</label>
            <input
              type="text"
              value={formData.personalDetails.postalAddress.suburb}
              onChange={(e) =>
                handleNestedInputChange(
                  "personalDetails",
                  ["postalAddress", "suburb"],
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">State</label>
            <select
              value={formData.personalDetails.postalAddress.state}
              onChange={(e) =>
                handleNestedInputChange(
                  "personalDetails",
                  ["postalAddress", "state"],
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select state</option>
              <option value="VIC">VIC</option>
              <option value="NSW">NSW</option>
              <option value="QLD">QLD</option>
              <option value="WA">WA</option>
              <option value="SA">SA</option>
              <option value="TAS">TAS</option>
              <option value="NT">NT</option>
              <option value="ACT">ACT</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Postcode</label>
            <input
              type="text"
              value={formData.personalDetails.postalAddress.postcode}
              onChange={(e) =>
                handleNestedInputChange(
                  "personalDetails",
                  ["postalAddress", "postcode"],
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// EmergencyContact Component
const EmergencyContact = ({
  formData,
  handleInputChange,
  handleNestedInputChange,
}) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Emergency Contact Details
      </h3>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.emergencyContact.fullName}
              onChange={(e) =>
                handleNestedInputChange(
                  "emergencyContact",
                  "fullName",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Relationship to You <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.emergencyContact.relationship}
              onChange={(e) =>
                handleNestedInputChange(
                  "emergencyContact",
                  "relationship",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">Home Phone</label>
            <input
              type="tel"
              value={formData.emergencyContact.homePhone}
              onChange={(e) =>
                handleNestedInputChange(
                  "emergencyContact",
                  "homePhone",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Work Phone</label>
            <input
              type="tel"
              value={formData.emergencyContact.workPhone}
              onChange={(e) =>
                handleNestedInputChange(
                  "emergencyContact",
                  "workPhone",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Mobile <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.emergencyContact.mobile}
              onChange={(e) =>
                handleNestedInputChange(
                  "emergencyContact",
                  "mobile",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={formData.emergencyContact.email}
            onChange={(e) =>
              handleNestedInputChange(
                "emergencyContact",
                "email",
                e.target.value
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-gray-700 mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.emergencyContact.address}
              onChange={(e) =>
                handleNestedInputChange(
                  "emergencyContact",
                  "address",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.emergencyContact.state}
              onChange={(e) =>
                handleNestedInputChange(
                  "emergencyContact",
                  "state",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">Select state</option>
              <option value="VIC">VIC</option>
              <option value="NSW">NSW</option>
              <option value="QLD">QLD</option>
              <option value="WA">WA</option>
              <option value="SA">SA</option>
              <option value="TAS">TAS</option>
              <option value="NT">NT</option>
              <option value="ACT">ACT</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Postcode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.emergencyContact.postcode}
              onChange={(e) =>
                handleNestedInputChange(
                  "emergencyContact",
                  "postcode",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Language and Cultural Diversity Component
const LanguageCulturalDiversity = ({
  formData,
  handleInputChange,
  handleNestedInputChange,
}) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Language and Cultural Diversity
      </h3>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">
              In which country were you born?{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.languageCulturalDiversity.countryOfBirth}
              onChange={(e) =>
                handleNestedInputChange(
                  "languageCulturalDiversity",
                  "countryOfBirth",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">Select country</option>
              <option value="Australia">Australia</option>
              <option value="New Zealand">New Zealand</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="India">India</option>
              <option value="China">China</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Country of Citizenship <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.languageCulturalDiversity.countryOfCitizenship}
              onChange={(e) =>
                handleNestedInputChange(
                  "languageCulturalDiversity",
                  "countryOfCitizenship",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">Select country</option>
              <option value="Australia">Australia</option>
              <option value="New Zealand">New Zealand</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="India">India</option>
              <option value="China">China</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Australian Citizenship Status{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.languageCulturalDiversity.citizenshipStatus}
            onChange={(e) =>
              handleNestedInputChange(
                "languageCulturalDiversity",
                "citizenshipStatus",
                e.target.value
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="">Select status</option>
            <option value="Australian Citizen">Australian Citizen</option>
            <option value="New Zealand Citizen">New Zealand Citizen</option>
            <option value="Australian Permanent Resident">
              Australian Permanent Resident
            </option>
            <option value="Student Visa">Student Visa</option>
            <option value="Temporary Resident Visa">
              Temporary Resident Visa
            </option>
            <option value="Visitor's Visa">Visitor's Visa</option>
            <option value="Business Visa">Business Visa</option>
            <option value="Holiday Visa">Holiday Visa</option>
            <option value="Permanent Humanitarian Visa">
              Permanent Humanitarian Visa
            </option>
            <option value="Other">Other</option>
            <option value="Overseas - No Visa or Citizenship">
              Overseas - No Visa or Citizenship
            </option>
          </select>
        </div>

        {formData.languageCulturalDiversity.citizenshipStatus === "Other" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Please specify other citizenship status{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.languageCulturalDiversity.otherCitizenshipStatus}
              onChange={(e) =>
                handleNestedInputChange(
                  "languageCulturalDiversity",
                  "otherCitizenshipStatus",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Do you speak a language other than English at home?{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.languageCulturalDiversity.speakOtherLanguage}
            onChange={(e) =>
              handleNestedInputChange(
                "languageCulturalDiversity",
                "speakOtherLanguage",
                e.target.value
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="">Select an option</option>
            <option value="No, English only">No, English only</option>
            <option value="Yes, other">Yes, other</option>
          </select>
        </div>

        {formData.languageCulturalDiversity.speakOtherLanguage ===
          "Yes, other" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Please specify other language{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.languageCulturalDiversity.otherLanguage}
              onChange={(e) =>
                handleNestedInputChange(
                  "languageCulturalDiversity",
                  "otherLanguage",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            How well do you speak English?{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.languageCulturalDiversity.englishProficiency}
            onChange={(e) =>
              handleNestedInputChange(
                "languageCulturalDiversity",
                "englishProficiency",
                e.target.value
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="">Select proficiency</option>
            <option value="Very well">Very well</option>
            <option value="Well">Well</option>
            <option value="Not well">Not well</option>
            <option value="Not at all">Not at all</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Are you of Aboriginal or Torres Strait Islander origin?{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.languageCulturalDiversity.aboriginal}
            onChange={(e) =>
              handleNestedInputChange(
                "languageCulturalDiversity",
                "aboriginal",
                e.target.value
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="">Select an option</option>
            <option value="No">No</option>
            <option value="Yes, Aboriginal">Yes, Aboriginal</option>
            <option value="Yes, Torres Strait Islander">
              Yes, Torres Strait Islander
            </option>
            <option value="Yes, both Aboriginal and Torres Strait Islander">
              Yes, both Aboriginal and Torres Strait Islander
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};
// DisabilityLearnerSupport Component
const DisabilityLearnerSupport = ({
  formData,
  handleInputChange,
  handleNestedInputChange,
  handleMultiCheckboxChange,
}) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Disability & Learner Support
      </h3>

      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Do you consider yourself to have a disability, impairment or
            long-term condition? <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.disabilityLearnerSupport.haveDisability}
            onChange={(e) =>
              handleNestedInputChange(
                "disabilityLearnerSupport",
                "haveDisability",
                e.target.value
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {formData.disabilityLearnerSupport.haveDisability === "Yes" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Please select the area(s) in the following list:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                "Hearing/Deaf",
                "Physical",
                "Intellectual",
                "Learning",
                "Mental illness",
                "Acquired brain impairment",
                "Vision",
                "Medical condition",
                "Other",
              ].map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    id={type}
                    checked={formData.disabilityLearnerSupport.disabilityTypes.includes(
                      type
                    )}
                    onChange={(e) =>
                      handleMultiCheckboxChange(
                        "disabilityLearnerSupport",
                        "disabilityTypes",
                        type,
                        e.target.checked
                      )
                    }
                    className="mr-2"
                  />
                  <label htmlFor={type} className="text-gray-700">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {formData.disabilityLearnerSupport.haveDisability === "Yes" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Do you require any additional training support from us?{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.disabilityLearnerSupport.requireSupport}
              onChange={(e) =>
                handleNestedInputChange(
                  "disabilityLearnerSupport",
                  "requireSupport",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

// Concession Component
const Concession = ({
  formData,
  handleInputChange,
  handleNestedInputChange,
}) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">Concession</h3>

      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Do you hold a current concession card?{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.concession.haveConcession}
            onChange={(e) =>
              handleNestedInputChange(
                "concession",
                "haveConcession",
                e.target.value
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {formData.concession.haveConcession === "Yes" && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                What type of card? <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.concession.cardType}
                onChange={(e) =>
                  handleNestedInputChange(
                    "concession",
                    "cardType",
                    e.target.value
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="">Select card type</option>
                <option value="Health Card">Health Card</option>
                <option value="Pensioner Card">Pensioner Card</option>
                <option value="Veterans Gold Card">Veterans Gold Card</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Card Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.concession.cardNumber}
                onChange={(e) =>
                  handleNestedInputChange(
                    "concession",
                    "cardNumber",
                    e.target.value
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                You must provide a certified copy of the concession card with
                this enrollment application.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Schooling Component
const Schooling = ({
  formData,
  handleInputChange,
  handleNestedInputChange,
  handleMultiCheckboxChange,
}) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">Schooling</h3>

      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Please tick the state(s) you have studied in{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {["VIC", "SA", "NT", "NSW", "QLD", "WA", "TAS", "Overseas"].map(
              (state) => (
                <div key={state} className="flex items-center">
                  <input
                    type="checkbox"
                    id={state}
                    checked={formData.schooling.studiedStates.includes(state)}
                    onChange={(e) =>
                      handleMultiCheckboxChange(
                        "schooling",
                        "studiedStates",
                        state,
                        e.target.checked
                      )
                    }
                    className="mr-2"
                  />
                  <label htmlFor={state} className="text-gray-700">
                    {state}
                  </label>
                </div>
              )
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            What is your highest COMPLETED school level?{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.schooling.highestSchoolLevel}
            onChange={(e) =>
              handleNestedInputChange(
                "schooling",
                "highestSchoolLevel",
                e.target.value
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="">Select level</option>
            <option value="Year 12 or equivalent">Year 12 or equivalent</option>
            <option value="Year 11 or equivalent">Year 11 or equivalent</option>
            <option value="Year 10 or equivalent">Year 10 or equivalent</option>
            <option value="Year 9 or equivalent">Year 9 or equivalent</option>
            <option value="Year 8 or below">Year 8 or below</option>
            <option value="Never attended school">Never attended school</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            In which YEAR did you complete that school level?{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.schooling.yearCompleted}
            onChange={(e) =>
              handleNestedInputChange(
                "schooling",
                "yearCompleted",
                e.target.value
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Are you still attending secondary school?{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.schooling.attendingSecondary}
            onChange={(e) =>
              handleNestedInputChange(
                "schooling",
                "attendingSecondary",
                e.target.value
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Do you have a Victorian Student Number (VSN)?
          </label>
          <input
            type="text"
            value={formData.schooling.vsn}
            onChange={(e) =>
              handleNestedInputChange("schooling", "vsn", e.target.value)
            }
            placeholder="Enter VSN if applicable"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Are you currently enrolled as an apprentice at another education
            provider? <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.schooling.apprentice}
            onChange={(e) =>
              handleNestedInputChange("schooling", "apprentice", e.target.value)
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {formData.schooling.apprentice === "Yes" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              What is your DELTA number?
            </label>
            <input
              type="text"
              value={formData.schooling.deltaNumber}
              onChange={(e) =>
                handleNestedInputChange(
                  "schooling",
                  "deltaNumber",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};

// PreviousQualification Component
const PreviousQualification = ({
  formData,
  handleInputChange,
  handleNestedInputChange,
  handleMultiCheckboxChange,
}) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Previous Qualifications Achieved
      </h3>

      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Have you SUCCESSFULLY completed any of the following qualifications?{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.previousQualifications.completedQualifications}
            onChange={(e) =>
              handleNestedInputChange(
                "previousQualifications",
                "completedQualifications",
                e.target.value
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {formData.previousQualifications.completedQualifications === "Yes" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Please indicate where you achieved the qualification:
            </label>
            <p className="text-sm text-gray-500 mb-2">
              A = Australia, E = Australian Equivalent, I = International
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b">Qualification</th>
                    <th className="py-2 px-3 border-b">A</th>
                    <th className="py-2 px-3 border-b">E</th>
                    <th className="py-2 px-3 border-b">I</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "Bachelor degree or higher degree",
                    "Advanced diploma or associate degree",
                    "Diploma (or associate diploma)",
                    "Certificate IV (or advanced certificate/technician)",
                    "Certificate III (or trade certificate)",
                    "Certificate II",
                    "Certificate I",
                    "Certificates other than the above",
                  ].map((qualification) => (
                    <tr key={qualification} className="border-b">
                      <td className="py-2 px-4">{qualification}</td>
                      <td className="py-2 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={formData.previousQualifications.qualificationsAchieved.includes(
                            `A-${qualification}`
                          )}
                          onChange={(e) =>
                            handleMultiCheckboxChange(
                              "previousQualifications",
                              "qualificationsAchieved",
                              `A-${qualification}`,
                              e.target.checked
                            )
                          }
                        />
                      </td>
                      <td className="py-2 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={formData.previousQualifications.qualificationsAchieved.includes(
                            `E-${qualification}`
                          )}
                          onChange={(e) =>
                            handleMultiCheckboxChange(
                              "previousQualifications",
                              "qualificationsAchieved",
                              `E-${qualification}`,
                              e.target.checked
                            )
                          }
                        />
                      </td>
                      <td className="py-2 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={formData.previousQualifications.qualificationsAchieved.includes(
                            `I-${qualification}`
                          )}
                          onChange={(e) =>
                            handleMultiCheckboxChange(
                              "previousQualifications",
                              "qualificationsAchieved",
                              `I-${qualification}`,
                              e.target.checked
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const EmploymentStatus = ({
  formData,
  handleInputChange,
  handleNestedInputChange,
}) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Employment Status
      </h3>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">
          Of the following categories, which BEST describes your current
          employment status? <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.employmentStatus.currentStatus}
          onChange={(e) =>
            handleNestedInputChange(
              "employmentStatus",
              "currentStatus",
              e.target.value
            )
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        >
          <option value="">Select an option</option>
          <option value="Full-time employee">Full-time employee</option>
          <option value="Part-time employee">Part-time employee</option>
          <option value="Self-employed – not employing others">
            Self-employed – not employing others
          </option>
          <option value="Self-employed – employing others">
            Self-employed – employing others
          </option>
          <option value="Employed – unpaid worker in a family business">
            Employed – unpaid worker in a family business
          </option>
          <option value="Unemployed – seeking full-time work">
            Unemployed – seeking full-time work
          </option>
          <option value="Unemployed – seeking part-time work">
            Unemployed – seeking part-time work
          </option>
          <option value="Not employed – not seeking employment">
            Not employed – not seeking employment
          </option>
        </select>
      </div>

      {formData.employmentStatus.currentStatus &&
        formData.employmentStatus.currentStatus.includes("employed") && (
          <>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                If employed, which BEST describes your current or recent
                occupation? <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.employmentStatus.occupation}
                onChange={(e) =>
                  handleNestedInputChange(
                    "employmentStatus",
                    "occupation",
                    e.target.value
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="">Select an option</option>
                <option value="Managers">Managers</option>
                <option value="Professionals">Professionals</option>
                <option value="Technicians and Trades Workers">
                  Technicians and Trades Workers
                </option>
                <option value="Community and Personal Service Workers">
                  Community and Personal Service Workers
                </option>
                <option value="Clerical and Administrative Workers">
                  Clerical and Administrative Workers
                </option>
                <option value="Sales Workers">Sales Workers</option>
                <option value="Machinery Operators and Drivers">
                  Machinery Operators and Drivers
                </option>
                <option value="Labourers">Labourers</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                If employed, which BEST describes the Industry of your current
                or previous employment? <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.employmentStatus.industry}
                onChange={(e) =>
                  handleNestedInputChange(
                    "employmentStatus",
                    "industry",
                    e.target.value
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="">Select an option</option>
                <option value="Agriculture, Forestry and Fishing">
                  Agriculture, Forestry and Fishing
                </option>
                <option value="Mining">Mining</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Electricity, Gas, Water and Waste Services">
                  Electricity, Gas, Water and Waste Services
                </option>
                <option value="Construction">Construction</option>
                <option value="Wholesale Trade">Wholesale Trade</option>
                <option value="Retail Trade">Retail Trade</option>
                <option value="Accommodation and Food Services">
                  Accommodation and Food Services
                </option>
                <option value="Transport, Postal and Warehousing">
                  Transport, Postal and Warehousing
                </option>
                <option value="Information Media and Telecommunications">
                  Information Media and Telecommunications
                </option>
                <option value="Financial and Insurance Services">
                  Financial and Insurance Services
                </option>
                <option value="Rental, Hiring and Real Estate Services">
                  Rental, Hiring and Real Estate Services
                </option>
                <option value="Professional, Scientific and Technical Services">
                  Professional, Scientific and Technical Services
                </option>
                <option value="Administrative and Support Services">
                  Administrative and Support Services
                </option>
                <option value="Public Administration and Safety">
                  Public Administration and Safety
                </option>
                <option value="Education and Training">
                  Education and Training
                </option>
                <option value="Health Care and Social Assistance">
                  Health Care and Social Assistance
                </option>
                <option value="Arts and Recreation Services">
                  Arts and Recreation Services
                </option>
                <option value="Other Services">Other Services</option>
              </select>
            </div>

            <h4 className="text-lg font-medium text-emerald-700 mb-4">
              Current Employer Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Trading Name</label>
                <input
                  type="text"
                  value={formData.employmentStatus.employerDetails.tradingName}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "employmentStatus",
                      ["employerDetails", "tradingName"],
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">ABN</label>
                <input
                  type="text"
                  value={formData.employmentStatus.employerDetails.abn}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "employmentStatus",
                      ["employerDetails", "abn"],
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Industry</label>
                <input
                  type="text"
                  value={formData.employmentStatus.employerDetails.industry}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "employmentStatus",
                      ["employerDetails", "industry"],
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Legal Name</label>
                <input
                  type="text"
                  value={formData.employmentStatus.employerDetails.legalName}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "employmentStatus",
                      ["employerDetails", "legalName"],
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Your Position
                </label>
                <input
                  type="text"
                  value={formData.employmentStatus.employerDetails.position}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "employmentStatus",
                      ["employerDetails", "position"],
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Employer Address
              </label>
              <input
                type="text"
                value={formData.employmentStatus.employerDetails.address}
                onChange={(e) =>
                  handleNestedInputChange(
                    "employmentStatus",
                    ["employerDetails", "address"],
                    e.target.value
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Suburb</label>
                <input
                  type="text"
                  value={formData.employmentStatus.employerDetails.suburb}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "employmentStatus",
                      ["employerDetails", "suburb"],
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  value={formData.employmentStatus.employerDetails.state}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "employmentStatus",
                      ["employerDetails", "state"],
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Postcode</label>
                <input
                  type="text"
                  value={formData.employmentStatus.employerDetails.postcode}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "employmentStatus",
                      ["employerDetails", "postcode"],
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  value={formData.employmentStatus.employerDetails.phone}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "employmentStatus",
                      ["employerDetails", "phone"],
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Mobile</label>
                <input
                  type="text"
                  value={formData.employmentStatus.employerDetails.mobile}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "employmentStatus",
                      ["employerDetails", "mobile"],
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Contact Person
                </label>
                <input
                  type="text"
                  value={
                    formData.employmentStatus.employerDetails.contactPerson
                  }
                  onChange={(e) =>
                    handleNestedInputChange(
                      "employmentStatus",
                      ["employerDetails", "contactPerson"],
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="text"
                  value={
                    formData.employmentStatus.employerDetails.contactNumber
                  }
                  onChange={(e) =>
                    handleNestedInputChange(
                      "employmentStatus",
                      ["employerDetails", "contactNumber"],
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </>
        )}
    </div>
  );
};
const StudyReason = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Study Reason
      </h3>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">
          Of the following categories, which BEST describes your main reason for
          undertaking this course/traineeship/apprenticeship?{" "}
          <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.studyReason}
          onChange={(e) =>
            handleInputChange("studyReason", null, e.target.value)
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        >
          <option value="">Select an option</option>
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
          <option value="To get skills for community/voluntary work">
            To get skills for community/voluntary work
          </option>
          <option value="Other reasons">Other reasons</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.applyingForLicensing}
            onChange={(e) =>
              handleInputChange("applyingForLicensing", null, e.target.checked)
            }
            className="form-checkbox h-5 w-5 text-emerald-600"
          />
          <span className="text-gray-700">
            I am planning to apply for a trade license or skills assessment
          </span>
        </label>
        <p className="text-sm text-gray-500 mt-2">
          Frontier is committed to student support and satisfaction. By letting
          us know, we would be able to provide you support services related to
          trade licensing application.
        </p>
      </div>
    </div>
  );
};

const EmploymentUSI = ({
  formData,
  handleInputChange,
  handleNestedInputChange,
  handleCheckboxChange,
}) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Unique Student Identifier (USI)
      </h3>

      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          From 1 January 2015, Frontier Institute of Technology can be prevented
          from issuing you with a nationally recognised VET qualification or
          statement of attainment when you complete your course if you do not
          have a Unique Student Identifier (USI). If you have not yet obtained a
          USI, you can apply for it directly at
          https://www.usi.gov.au/your-usi/create-usi/ using a computer or a
          mobile device.
        </p>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Enter your Unique Student Identifier (if you already have one){" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.usi}
            onChange={(e) => handleInputChange("usi", null, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium text-emerald-600 mb-4">
          Application for Unique Student Identifier
        </h4>
        <p className="text-gray-700 mb-4">
          If you would like Frontier Institute of Technology to apply for a USI
          on your behalf, you must authorise us to do so and declare that you
          have read the privacy information at
          https://www.usi.gov.au/Training-Organisations/Pages/Privacy-Notice.aspx.
          You must also provide some additional information as noted below.
        </p>

        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.usiConsent}
              onChange={(e) =>
                handleInputChange("usiConsent", null, e.target.checked)
              }
              className="form-checkbox h-5 w-5 text-emerald-600"
            />
            <span className="text-gray-700">
              I authorise Frontier Institute of Technology to apply pursuant to
              sub-section 9(2) of the Student Identifiers Act 2014, for a USI on
              my behalf. I have read and consent to the collection, use and
              disclosure of my personal information.
            </span>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Town/City of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.townCityOfBirth}
            onChange={(e) =>
              handleInputChange("townCityOfBirth", null, e.target.value)
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Please write the name of the Australian or overseas town or city where you were born"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Please provide details for one of the forms of identity below
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium mb-2">Australian Driver License</h5>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">
                  State
                </label>
                <select
                  value={formData.identityDocument.state}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "identityDocument",
                      "state",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select state</option>
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
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">
                  License Number
                </label>
                <input
                  type="text"
                  value={formData.identityDocument.licenseNumber}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "identityDocument",
                      "licenseNumber",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-2">Medicare Card</h5>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Medicare Card Number
                </label>
                <input
                  type="text"
                  value={formData.identityDocument.medicareNumber}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "identityDocument",
                      "medicareNumber",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Individual Reference Number
                </label>
                <input
                  type="text"
                  value={formData.identityDocument.individualReference}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "identityDocument",
                      "individualReference",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Number next to your name"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Card Color
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="cardColor"
                      value="Green"
                      checked={formData.identityDocument.cardColor === "Green"}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "identityDocument",
                          "cardColor",
                          e.target.value
                        )
                      }
                      className="mr-2"
                    />
                    <span>Green</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="cardColor"
                      value="Yellow"
                      checked={formData.identityDocument.cardColor === "Yellow"}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "identityDocument",
                          "cardColor",
                          e.target.value
                        )
                      }
                      className="mr-2"
                    />
                    <span>Yellow</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="cardColor"
                      value="Blue"
                      checked={formData.identityDocument.cardColor === "Blue"}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "identityDocument",
                          "cardColor",
                          e.target.value
                        )
                      }
                      className="mr-2"
                    />
                    <span>Blue</span>
                  </label>
                </div>
              </div>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.identityDocument.expiryDate}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "identityDocument",
                      "expiryDate",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h5 className="font-medium mb-2">Australian Passport</h5>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Passport Number
                </label>
                <input
                  type="text"
                  value={formData.identityDocument.passportNumber}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "identityDocument",
                      "passportNumber",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-2">
                Non-Australian Passport (with Australian Visa)
              </h5>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Passport Number
                </label>
                <input
                  type="text"
                  value={formData.identityDocument.passportNumber}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "identityDocument",
                      "passportNumber",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Country of Issue
                </label>
                <input
                  type="text"
                  value={formData.identityDocument.countryOfIssue}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "identityDocument",
                      "countryOfIssue",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h5 className="font-medium mb-2">Citizenship Certificate</h5>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Stock Number
                </label>
                <input
                  type="text"
                  value={formData.identityDocument.citizenshipStockNumber}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "identityDocument",
                      "citizenshipStockNumber",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Acquisition Date
                </label>
                <input
                  type="date"
                  value={formData.identityDocument.acquisitionDate}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "identityDocument",
                      "acquisitionDate",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-2">
                Certificate of Registration by Descent
              </h5>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Acquisition Date
                </label>
                <input
                  type="date"
                  value={formData.identityDocument.acquisitionDate}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "identityDocument",
                      "acquisitionDate",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-2">
          In accordance with section 11 of the Student Identifiers Act 2014,
          Frontier Institute of Technology will securely destroy personal
          information which we collect from individuals solely for the purpose
          of applying for a USI on their behalf as soon as practicable after we
          have made the application or the information is no longer needed for
          that purpose, unless we are required by or under any law to retain it.
        </p>
      </div>
    </div>
  );
};

const CreditTransferDeclarations = ({
  formData,
  handleInputChange,
  handleCheckboxChange,
}) => {
  // State for credit transfer rows
  const [creditTransferRows, setCreditTransferRows] = useState([
    { unitCode: "", unitTitle: "" },
  ]);

  // Function to add a new row
  const addCreditTransferRow = () => {
    setCreditTransferRows([
      ...creditTransferRows,
      { unitCode: "", unitTitle: "" },
    ]);
  };

  // Function to remove a row
  const removeCreditTransferRow = (index) => {
    if (creditTransferRows.length > 1) {
      const updatedRows = [...creditTransferRows];
      updatedRows.splice(index, 1);
      setCreditTransferRows(updatedRows);
    }
  };

  // Function to handle changes in credit transfer rows
  const handleRowChange = (index, field, value) => {
    const updatedRows = [...creditTransferRows];
    updatedRows[index][field] = value;
    setCreditTransferRows(updatedRows);

    // Update parent form data
    handleInputChange("creditTransfer", null, updatedRows);
  };

  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Credit Transfer
      </h3>

      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          If you have any prior Nationally Recognised Certificates or Statements
          of Attainment completed within Australia, they may be eligible for
          Credit Transfer. You must present an original certificate with a
          transcript of the competencies containing nationally recognised titles
          and codes. If any of these units' titles and codes are equivalent to
          the ones you are enrolled in, you might be granted a Credit Transfer
          for that particular unit.
        </p>

        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-emerald-50">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Unit Code
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Unit Title
              </th>
              <th
                className="border border-gray-300 px-4 py-2 text-center"
                colSpan="2"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {creditTransferRows.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    value={row.unitCode}
                    onChange={(e) =>
                      handleRowChange(index, "unitCode", e.target.value)
                    }
                    className="w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    value={row.unitTitle}
                    onChange={(e) =>
                      handleRowChange(index, "unitTitle", e.target.value)
                    }
                    className="w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => removeCreditTransferRow(index)}
                    className="text-red-500 hover:text-red-700 mx-1"
                    disabled={creditTransferRows.length === 1}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="button"
          onClick={addCreditTransferRow}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          Add Row
        </button>

        <div className="mt-6">
          <p className="text-gray-700 mb-2">Student Declaration & Signature:</p>
          <p className="text-gray-700 mb-4">
            Original or certified copies of all certificates/Statements of
            Attainment have been provided by the student for the purposes of
            this Credit Transfer application and are documents obtained through
            accredited training pathways.
          </p>
        </div>
      </div>
    </div>
  );
};

const ComplaintAndAppeal = () => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Complaint and Appeal
      </h3>

      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          Frontier's Management shall ensure that all complaints and appeals are
          dealt with in accordance with the principles of natural justice and
          procedural fairness and will remain publicly available.
        </p>

        <p className="text-gray-700 mb-4">
          At Frontier Institute of Technology, we encourage every individual,
          whether they are a student or staff, to share their views, as your
          opinion is important in serving you better. Frontier ensures that we
          will try to resolve any concerns through a one on one friendly
          discussion at first instance, and if you remain unhappy with any of
          our decisions or actions, you can formalise your complaint and appeal
          through the process explained at www.frontier.edu.au/policies/. Upon
          receiving a written complaint, we will get back to you within 10
          working days.
        </p>

        <p className="text-gray-700 mb-4">
          If the matter remains unsolved after two attempts, you are always free
          to appeal externally. For more details about Frontier's Complaint and
          Appeal Policy, please access{" "}
          <a
            href="https://frontier.edu.au/policies-2/"
            className="text-emerald-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.frontier.edu.au/policies-2/
          </a>
          .
        </p>
      </div>
    </div>
  );
};

const StudentDeclaration = ({
  formData,
  handleInputChange,
  handleCheckboxChange,
}) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Student Declaration
      </h3>

      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          By checking the boxes below, I acknowledge that:
        </p>

        <div className="space-y-3">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="readHandbook"
              checked={formData.studentDeclarations.readHandbook}
              onChange={(e) =>
                handleCheckboxChange(
                  "studentDeclarations",
                  "readHandbook",
                  e.target.checked
                )
              }
              className="mt-1 mr-3"
            />
            <label htmlFor="readHandbook" className="text-gray-700">
              I have read and understood the Student Handbook and Course
              Information Booklet.
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="informedAboutTraining"
              checked={formData.studentDeclarations.informedAboutTraining}
              onChange={(e) =>
                handleCheckboxChange(
                  "studentDeclarations",
                  "informedAboutTraining",
                  e.target.checked
                )
              }
              className="mt-1 mr-3"
            />
            <label htmlFor="informedAboutTraining" className="text-gray-700">
              I have been fully informed about the training and assessment
              process and agree to participate.
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="readPolicies"
              checked={formData.studentDeclarations.readPolicies}
              onChange={(e) =>
                handleCheckboxChange(
                  "studentDeclarations",
                  "readPolicies",
                  e.target.checked
                )
              }
              className="mt-1 mr-3"
            />
            <label htmlFor="readPolicies" className="text-gray-700">
              I have read and understood Frontier's Policies and Procedures
              including Complaints and Appeals, Privacy, and Refund Policies.
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="readCourseBooklet"
              checked={formData.studentDeclarations.readCourseBooklet}
              onChange={(e) =>
                handleCheckboxChange(
                  "studentDeclarations",
                  "readCourseBooklet",
                  e.target.checked
                )
              }
              className="mt-1 mr-3"
            />
            <label htmlFor="readCourseBooklet" className="text-gray-700">
              I have read and understood the RPL Information provided in the
              Course Information Booklet.
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="understandAttendance"
              checked={formData.studentDeclarations.understandAttendance}
              onChange={(e) =>
                handleCheckboxChange(
                  "studentDeclarations",
                  "understandAttendance",
                  e.target.checked
                )
              }
              className="mt-1 mr-3"
            />
            <label htmlFor="understandAttendance" className="text-gray-700">
              I understand that regular attendance and participation is required
              to successfully complete this course.
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="understandCompletion"
              checked={formData.studentDeclarations.understandCompletion}
              onChange={(e) =>
                handleCheckboxChange(
                  "studentDeclarations",
                  "understandCompletion",
                  e.target.checked
                )
              }
              className="mt-1 mr-3"
            />
            <label htmlFor="understandCompletion" className="text-gray-700">
              I understand that all assessments must be completed and submitted
              as scheduled to achieve the qualification.
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="understandEnrollment"
              checked={formData.studentDeclarations.understandEnrollment}
              onChange={(e) =>
                handleCheckboxChange(
                  "studentDeclarations",
                  "understandEnrollment",
                  e.target.checked
                )
              }
              className="mt-1 mr-3"
            />
            <label htmlFor="understandEnrollment" className="text-gray-700">
              I understand that enrollment in this RPL process does not
              guarantee the awarding of a qualification or statement of
              attainment.
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="understandNameAddressChange"
              checked={formData.studentDeclarations.understandNameAddressChange}
              onChange={(e) =>
                handleCheckboxChange(
                  "studentDeclarations",
                  "understandNameAddressChange",
                  e.target.checked
                )
              }
              className="mt-1 mr-3"
            />
            <label
              htmlFor="understandNameAddressChange"
              className="text-gray-700"
            >
              I agree to notify Frontier Institute of Technology of any change
              of name, address, or contact details within 7 days.
            </label>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-700 font-medium">
            I declare that all information provided in this enrollment form is
            true and correct.
          </p>
        </div>
      </div>
    </div>
  );
};

// Referee Details Component
const RefereeDetails = ({ formData, handleRefereeChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Referee Details
      </h3>

      <div className="mb-8">
        <p className="text-gray-700 mb-4">
          Please provide details of three referees who can verify your
          professional experience and skills relevant to the qualification you
          are applying for. Referees could be supervisors, managers, colleagues,
          or clients.
        </p>

        {formData.referees.map((referee, index) => (
          <div key={index} className="border rounded-lg p-6 mb-6 bg-gray-50">
            <h4 className="text-lg font-medium text-emerald-600 mb-4">
              Referee {index + 1}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">
                  Your First Name
                </label>
                <input
                  type="text"
                  value={referee.applicantFirstName}
                  onChange={(e) =>
                    handleRefereeChange(
                      index,
                      "applicantFirstName",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Your Family Name
                </label>
                <input
                  type="text"
                  value={referee.applicantFamilyName}
                  onChange={(e) =>
                    handleRefereeChange(
                      index,
                      "applicantFamilyName",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Referee Full Name
                </label>
                <input
                  type="text"
                  value={referee.refereeName}
                  onChange={(e) =>
                    handleRefereeChange(index, "refereeName", e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={referee.companyName}
                  onChange={(e) =>
                    handleRefereeChange(index, "companyName", e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Employment Start Date
                </label>
                <input
                  type="date"
                  value={referee.employmentStart}
                  onChange={(e) =>
                    handleRefereeChange(
                      index,
                      "employmentStart",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Employment Finish Date
                </label>
                <input
                  type="date"
                  value={referee.employmentFinish}
                  onChange={(e) =>
                    handleRefereeChange(
                      index,
                      "employmentFinish",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Employment Type
                </label>
                <select
                  value={referee.employmentType}
                  onChange={(e) =>
                    handleRefereeChange(index, "employmentType", e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Casual">Casual</option>
                  <option value="Contract">Contract</option>
                  <option value="Self-employed">Self-employed</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Relationship to Referee
                </label>
                <select
                  value={referee.relationshipType}
                  onChange={(e) =>
                    handleRefereeChange(
                      index,
                      "relationshipType",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Manager">Manager</option>
                  <option value="Colleague">Colleague</option>
                  <option value="Client">Client</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={referee.yearsExperience}
                  onChange={(e) =>
                    handleRefereeChange(
                      index,
                      "yearsExperience",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">
                  Skills and Knowledge Verified
                </label>
                <textarea
                  value={referee.skillsVerified}
                  onChange={(e) =>
                    handleRefereeChange(index, "skillsVerified", e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows="3"
                  placeholder="List the skills and knowledge that this referee can verify"
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">
                  General Duties Performed
                </label>
                <textarea
                  value={referee.generalDuties}
                  onChange={(e) =>
                    handleRefereeChange(index, "generalDuties", e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows="3"
                  placeholder="Describe your general duties in this role"
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">
                  Other Relevant Tasks
                </label>
                <textarea
                  value={referee.otherTasks}
                  onChange={(e) =>
                    handleRefereeChange(index, "otherTasks", e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows="3"
                  placeholder="Any other tasks relevant to your RPL application"
                ></textarea>
              </div>
            </div>
          </div>
        ))}

        <p className="text-gray-700 mt-4">
          Note: Frontier Institute of Technology may contact your referees to
          verify your work experience and skills as part of the RPL assessment
          process.
        </p>
      </div>
    </div>
  );
};

// Evidence Submission Component
const EvidenceSubmission = () => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        Evidence to be Submitted
      </h3>

      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          To support your RPL application, please submit the following
          documents:
        </p>

        <div className="bg-emerald-50 p-6 rounded-lg">
          <h4 className="text-lg font-medium text-emerald-700 mb-4">
            Required Documentation
          </h4>

          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              Certified copies of qualifications, certificates, and statements
              of attainment
            </li>
            <li>Current resume or CV detailing your work history</li>
            <li>
              Position descriptions and/or performance reviews from current or
              previous employers
            </li>
            <li>Letters of reference from employers or clients</li>
            <li>
              Samples of work completed that demonstrate your skills and
              knowledge
            </li>
            <li>Industry licenses or tickets relevant to the qualification</li>
            <li>
              Professional development records, workshop certificates, or
              training records
            </li>
            <li>
              Other evidence that demonstrates your competence against the units
              in the qualification
            </li>
          </ul>

          <div className="mt-6">
            <h4 className="text-lg font-medium text-emerald-700 mb-4">
              Document Submission Instructions
            </h4>

            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>
                Please ensure all documents are clear, legible copies (certified
                where required)
              </li>
              <li>
                Organize your evidence by unit of competency where possible
              </li>
              <li>
                Include a cover sheet with your name, contact details, and the
                qualification you are applying for
              </li>
              <li>
                Submit your evidence in person, by mail, or electronically as
                directed by your RPL assessor
              </li>
              <li>
                Keep copies of all documents submitted as part of your
                application
              </li>
            </ol>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-700">
            After submitting your enrollment form and evidence, an RPL assessor
            will contact you to arrange an initial interview and plan the
            assessment process. Additional evidence may be requested during the
            assessment.
          </p>
        </div>
      </div>
    </div>
  );
};
export default FrontierRPLEnrollmentForm;
