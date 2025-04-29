import React, { useState } from "react";
import Navbar from "../../../components/navbar";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const RPLAssessmentCPC30220 = () => {
  const [activeSection, setActiveSection] = useState(1);
  const totalSections = 3; // STAGE 1, STAGE 2, STAGE 3

  const [formData, setFormData] = useState({
    // STAGE 1 Data
    experience: {
      coordinatingPrograms: false,
      supervisingWorkers: false,
      firstLineManager: false,
      resolvingProblems: false,
      otherExperience: "",
    },
    jobRoles: {
      activitiesProgramCoordinator: false,
      assistantManager: false,
      careCoordinator: false,
      coordinator: false,
      houseCoordinator: false,
      localAreaCoordinator: false,
      programCoordinator: false,
      programProjectManager: false,
      projectOfficer: false,
      respiteCoordinator: false,
      shiftSupervisor: false,
      supervisor: false,
      teamLeader: false,
      unitCoordinator: false,
      unitManager: false,
      volunteerCoordinator: false,
      otherJobRole: "",
    },
    evidence: {
      workExperience: false,
      lifeExperience: false,
      formalQualifications: false,
    },
    // STAGE 2 Data - Will be populated with unit responses
    unitResponses: {},
    // STAGE 3 Data
    llnCompleted: false,
  });

  const handleInputChange = (section, field, value) => {
    if (
      section === "experience" ||
      section === "jobRoles" ||
      section === "evidence"
    ) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: value,
      }));
    }
  };

  const handleUnitResponseChange = (unitId, questionId, value) => {
    setFormData((prev) => ({
      ...prev,
      unitResponses: {
        ...prev.unitResponses,
        [unitId]: {
          ...prev.unitResponses[unitId],
          [questionId]: value,
        },
      },
    }));
  };

  const validateSection = (section) => {
    switch (section) {
      case 1: // STAGE 1 validation
        return (
          (formData.experience.coordinatingPrograms ||
            formData.experience.supervisingWorkers ||
            formData.experience.firstLineManager ||
            formData.experience.resolvingProblems ||
            formData.experience.otherExperience !== "") &&
          Object.values(formData.jobRoles).some((val) => val === true) &&
          (formData.evidence.workExperience ||
            formData.evidence.lifeExperience ||
            formData.evidence.formalQualifications)
        );
      case 2: // STAGE 2 validation
        // Check if at least one unit has responses
        return Object.keys(formData.unitResponses).length > 0;
      case 3: // STAGE 3 validation
        return formData.llnCompleted;
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
    // You might want to send the data to an API endpoint
  };

  const progressPercentage = (activeSection / totalSections) * 100;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-28 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-medium font-outfit text-emerald-800 mb-2">
              Alpha Training & Recognition Pty Ltd
            </h1>
            <h2 className="text-2xl font-medium text-emerald-700">
              RPL Self-Assessment Information Kit
            </h2>
            <p className="text-xl font-medium text-gray-700 mb-2">
              CPC30220 - Certificate III in Carpentry
            </p>
            <p className="text-sm text-gray-500">RTO NO: 45282</p>
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
            {/* STAGE 1: Complete Self-Assessment Checklist */}
            {activeSection === 1 && (
              <Stage1
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}

            {/* STAGE 2: Complete Self-Assessment Questions */}
            {activeSection === 2 && (
              <Stage2
                formData={formData}
                handleUnitResponseChange={handleUnitResponseChange}
              />
            )}

            {/* STAGE 3: Complete Self-Assessment LLN Tool */}
            {activeSection === 3 && (
              <Stage3
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

// STAGE 1 Component
const Stage1 = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        STAGE 1. Complete Self-Assessment Checklist
      </h3>

      <div className="mb-8">
        <p className="mb-4">
          This is a guide to experiences you may have had that would give you
          the required skills and knowledge for this qualification.
        </p>

        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-4">
            1.a. Please tick the boxes that relate to your experience:
          </h4>
          <div className="space-y-2 ml-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="coordinatingPrograms"
                checked={formData.experience.coordinatingPrograms}
                onChange={(e) =>
                  handleInputChange(
                    "experience",
                    "coordinatingPrograms",
                    e.target.checked
                  )
                }
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label
                htmlFor="coordinatingPrograms"
                className="ml-2 text-gray-700"
              >
                Coordinating specific programs or projects within community
                service organisations
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="supervisingWorkers"
                checked={formData.experience.supervisingWorkers}
                onChange={(e) =>
                  handleInputChange(
                    "experience",
                    "supervisingWorkers",
                    e.target.checked
                  )
                }
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label
                htmlFor="supervisingWorkers"
                className="ml-2 text-gray-700"
              >
                Supervising a small number of lower classified workers or
                volunteers
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="firstLineManager"
                checked={formData.experience.firstLineManager}
                onChange={(e) =>
                  handleInputChange(
                    "experience",
                    "firstLineManager",
                    e.target.checked
                  )
                }
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="firstLineManager" className="ml-2 text-gray-700">
                Experience as a first-line manager working under the supervision
                of a service or centre manager who has overall responsibility
                for the service
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="resolvingProblems"
                checked={formData.experience.resolvingProblems}
                onChange={(e) =>
                  handleInputChange(
                    "experience",
                    "resolvingProblems",
                    e.target.checked
                  )
                }
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="resolvingProblems" className="ml-2 text-gray-700">
                Resolving problems and issues in the workplace within
                organisational guidelines
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="otherExperience"
                checked={formData.experience.otherExperience !== ""}
                onChange={(e) => {}}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="otherExperience" className="ml-2 text-gray-700">
                Other (please list)
              </label>
              <input
                type="text"
                value={formData.experience.otherExperience}
                onChange={(e) =>
                  handleInputChange(
                    "experience",
                    "otherExperience",
                    e.target.value
                  )
                }
                className="ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 flex-1"
                placeholder="Specify other experience"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-4">
            1.b. Please tick the boxes which are (or sound similar to) job roles
            you have had:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
            {[
              {
                id: "activitiesProgramCoordinator",
                label: "Activities Program Coordinator",
              },
              { id: "assistantManager", label: "Assistant Manager" },
              { id: "careCoordinator", label: "Care Coordinator" },
              { id: "coordinator", label: "Coordinator" },
              { id: "houseCoordinator", label: "House Coordinator" },
              { id: "localAreaCoordinator", label: "Local Area Coordinator" },
              { id: "programCoordinator", label: "Program Coordinator" },
              { id: "programProjectManager", label: "Program/Project Manager" },
              { id: "projectOfficer", label: "Project Officer" },
              { id: "respiteCoordinator", label: "Respite Coordinator" },
              { id: "shiftSupervisor", label: "Shift Supervisor" },
              { id: "supervisor", label: "Supervisor" },
              { id: "teamLeader", label: "Team Leader" },
              { id: "unitCoordinator", label: "Unit Coordinator" },
              { id: "unitManager", label: "Unit Manager" },
              { id: "volunteerCoordinator", label: "Volunteer Coordinator" },
            ].map((role) => (
              <div key={role.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={role.id}
                  checked={formData.jobRoles[role.id]}
                  onChange={(e) =>
                    handleInputChange("jobRoles", role.id, e.target.checked)
                  }
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor={role.id} className="ml-2 text-gray-700">
                  {role.label}
                </label>
              </div>
            ))}

            <div className="flex items-center md:col-span-2">
              <input
                type="checkbox"
                id="otherJobRole"
                checked={formData.jobRoles.otherJobRole !== ""}
                onChange={(e) => {}}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="otherJobRole" className="ml-2 text-gray-700">
                Other (please list)
              </label>
              <input
                type="text"
                value={formData.jobRoles.otherJobRole}
                onChange={(e) =>
                  handleInputChange("jobRoles", "otherJobRole", e.target.value)
                }
                className="ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 flex-1"
                placeholder="Specify other job role"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-4">
            1.c. Please complete the boxes, which relate to evidence you can
            use:
          </h4>
          <div className="space-y-2 ml-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="workExperience"
                checked={formData.evidence.workExperience}
                onChange={(e) =>
                  handleInputChange(
                    "evidence",
                    "workExperience",
                    e.target.checked
                  )
                }
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="workExperience" className="ml-2 text-gray-700">
                Work experience
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="lifeExperience"
                checked={formData.evidence.lifeExperience}
                onChange={(e) =>
                  handleInputChange(
                    "evidence",
                    "lifeExperience",
                    e.target.checked
                  )
                }
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="lifeExperience" className="ml-2 text-gray-700">
                Life experience
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="formalQualifications"
                checked={formData.evidence.formalQualifications}
                onChange={(e) =>
                  handleInputChange(
                    "evidence",
                    "formalQualifications",
                    e.target.checked
                  )
                }
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label
                htmlFor="formalQualifications"
                className="ml-2 text-gray-700"
              >
                Through formal qualifications
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// STAGE 2 Component
const Stage2 = ({ formData, handleUnitResponseChange }) => {
  const [activeUnit, setActiveUnit] = useState(1);
  const totalUnits = 27; // Total number of units in the qualification

  const units = [
    { id: 1, code: "CPCCCA2002", name: "Use carpentry tools and equipment" },
    { id: 2, code: "CPCCCA2011", name: "Handle carpentry materials" },
    {
      id: 3,
      code: "CPCCCA3001",
      name: "Carry out general demolition of minor building structures",
    },
    { id: 4, code: "CPCCCA3002", name: "Carry out setting out" },
    { id: 5, code: "CPCCCA3003", name: "Install flooring systems" },
    { id: 6, code: "CPCCCA3004", name: "Construct and erect wall frames" },
    { id: 7, code: "CPCCCA3005", name: "Construct ceiling frames" },
    { id: 8, code: "CPCCCA3006", name: "Erect roof trusses" },
    { id: 9, code: "CPCCCA3007", name: "Construct pitched roofs" },
    { id: 10, code: "CPCCCA3008B", name: "Construct eaves" },
    { id: 11, code: "CPCCCA3010", name: "Install windows and doors" },
    {
      id: 12,
      code: "CPCCCA3016",
      name: "Construct, assemble and install timber external stairs",
    },
    { id: 13, code: "CPCCCA3017", name: "Install exterior cladding" },
    {
      id: 14,
      code: "CPCCCA3024",
      name: "Install lining, panelling and moulding",
    },
    {
      id: 15,
      code: "CPCCCA3025",
      name: "Read and interpret plans, specifications and drawings for carpentry work",
    },
    {
      id: 16,
      code: "CPCCCA3028",
      name: "Erect and dismantle formwork for footings and slabs on ground",
    },
    { id: 17, code: "CPCCCM2006", name: "Apply basic levelling procedures" },
    {
      id: 18,
      code: "CPCCCM2008",
      name: "Erect and dismantle restricted height scaffolding",
    },
    { id: 19, code: "CPCCCM2012", name: "Work safely at heights" },
    {
      id: 20,
      code: "CPCCWHS2001",
      name: "Apply WHS requirements, policies and procedures in the construction industry",
    },
    {
      id: 21,
      code: "CPCCOM1012",
      name: "Work effectively and sustainably in the construction industry",
    },
    { id: 22, code: "CPCCOM1014", name: "Conduct workplace communication" },
    {
      id: 23,
      code: "CPCCOM1015",
      name: "Carry out measurements and calculations",
    },
    {
      id: 24,
      code: "CPCCOM3001",
      name: "Perform construction calculations to determine carpentry material requirements",
    },
    { id: 25, code: "CPCCOM3006", name: "Carry out levelling operations" },
    {
      id: 26,
      code: "CPCCWHS2001",
      name: "Apply WHS requirements, policies and procedures in the construction industry",
    },
    {
      id: 27,
      code: "CPCWHS3001",
      name: "Identify construction work hazards and select risk control strategies",
    },
  ];

  const getUnitQuestions = (unitId) => {
    // This would return different questions based on the unit
    // For simplicity, we'll use a generic set of questions
    return [
      {
        id: "task1",
        question:
          "Have you performed tasks related to planning and preparation for this unit?",
        description:
          "Review work instructions, plan work, select PPE, inspect work site, etc.",
      },
      {
        id: "task2",
        question: "Have you performed the core tasks required by this unit?",
        description:
          "Specific tasks vary by unit but generally involve practical carpentry skills",
      },
      {
        id: "task3",
        question:
          "Have you completed cleanup and maintenance tasks as required by this unit?",
        description:
          "Clean up work area, check/maintain/store tools and equipment, report faults",
      },
    ];
  };

  const handleNextUnit = () => {
    setActiveUnit((prev) => Math.min(prev + 1, totalUnits));
  };

  const handlePrevUnit = () => {
    setActiveUnit((prev) => Math.max(prev - 1, 1));
  };

  const currentUnit = units.find((unit) => unit.id === activeUnit);
  const unitQuestions = getUnitQuestions(activeUnit);

  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        STAGE 2. Complete Self-Assessment Questions
      </h3>

      <div className="mb-6">
        <p className="mb-4">
          In this stage, you will be asked a number of questions relating to
          each unit within the course you have selected. These questions are
          designed to help you determine your decision to undertake the
          "Gap-training" or going ahead with the RPL process.
        </p>
        <p className="mb-4">
          Next to each question, you will be asked to tick either of the
          options: Regularly, Sometimes, Never
        </p>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h4 className="font-medium text-gray-800 mb-2">Guidance:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              If you tick "Regularly" for more than half the questions, you
              should consider undertaking the Recognition process.
            </li>
            <li>
              If you tick "Sometimes" for more than half the questions, you
              should contact the Training Department at RTO to discuss this
              further.
            </li>
            <li>
              If you tick "Never" for more than half the questions, you should
              consider an alternative learning pathway.
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
        <h4 className="font-medium text-gray-800 mb-2">
          Current Unit: {currentUnit.code} - {currentUnit.name}
        </h4>
        <p className="text-sm text-gray-600">
          Unit {activeUnit} of {totalUnits}
        </p>
      </div>

      <div className="space-y-6">
        {unitQuestions.map((question) => (
          <div
            key={question.id}
            className="p-4 border border-gray-200 rounded-md"
          >
            <h4 className="font-medium text-gray-800 mb-2">
              {question.question}
            </h4>
            <p className="text-sm text-gray-600 mb-4">{question.description}</p>

            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name={`unit${activeUnit}_${question.id}`}
                  checked={
                    formData.unitResponses[activeUnit]?.[question.id] ===
                    "regularly"
                  }
                  onChange={() =>
                    handleUnitResponseChange(
                      activeUnit,
                      question.id,
                      "regularly"
                    )
                  }
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="ml-2 text-gray-700">Regularly</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name={`unit${activeUnit}_${question.id}`}
                  checked={
                    formData.unitResponses[activeUnit]?.[question.id] ===
                    "sometimes"
                  }
                  onChange={() =>
                    handleUnitResponseChange(
                      activeUnit,
                      question.id,
                      "sometimes"
                    )
                  }
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="ml-2 text-gray-700">Sometimes</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name={`unit${activeUnit}_${question.id}`}
                  checked={
                    formData.unitResponses[activeUnit]?.[question.id] ===
                    "never"
                  }
                  onChange={() =>
                    handleUnitResponseChange(activeUnit, question.id, "never")
                  }
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="ml-2 text-gray-700">Never</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={handlePrevUnit}
          disabled={activeUnit === 1}
          className="flex items-center px-6 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-md disabled:opacity-50"
        >
          <BsChevronLeft className="mr-2" /> Previous Unit
        </button>

        <button
          type="button"
          onClick={handleNextUnit}
          disabled={activeUnit === totalUnits}
          className="flex items-center px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
        >
          Next Unit <BsChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

// STAGE 3 Component
const Stage3 = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-emerald-700 mb-6">
        STAGE 3. Complete Self-Assessment LLN (Language, Literacy, Numeracy)
        Tool
      </h3>

      <div className="mb-6">
        <p className="mb-4">
          Registered Training Organisations have a responsibility to identify
          the language, literacy and numeracy needs of all students prior to the
          delivery of training and assessment services. This enables a training
          organisation to tailor its support services to meet individual student
          requirements.
        </p>
        <p className="mb-4">
          This LLN Self-Assessment Tool is designed to assess the core skills of
          learning, reading, writing, oral communication and numeracy as
          described in the Australian Core Skills Framework (ACSF). It is a
          quick "snapshot" of where you are in relation to the levels required
          in 5 areas needed to successfully gain the Diploma.
        </p>
        <p className="mb-4">
          This is not a test. RTO will use this information as well as your
          application, Self-assessment checklist/questions and your discussions
          with staff to see how we can best support you through your
          qualification.
        </p>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mb-6">
        <h4 className="font-medium text-blue-800 mb-2">Instructions:</h4>
        <p className="mb-2">
          The LLN assessment will be provided as a separate attachment to this
          RPL self-assessment information kit.
        </p>
        <p>
          Please complete the LLN assessment and indicate below when you have
          finished.
        </p>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="llnCompleted"
          checked={formData.llnCompleted}
          onChange={(e) =>
            handleInputChange("llnCompleted", null, e.target.checked)
          }
          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
        />
        <label htmlFor="llnCompleted" className="ml-2 text-gray-700">
          I confirm that I have completed the LLN assessment
        </label>
      </div>
    </div>
  );
};

export default RPLAssessmentCPC30220;
