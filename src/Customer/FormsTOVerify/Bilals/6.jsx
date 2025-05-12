"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, Menu, X } from "lucide-react";

const RPLSelfAssessmentForm40120ff = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateSignature: "",
    date: "",
    declaration: false,
    units: {
      CPCCBC4001: Array(14).fill(""),
      CPCCBC4002: Array(13).fill(""),
      CPCCBC4007: Array(21).fill(""),
      CPCCBC4008: Array(23).fill(""),
      CPCCBC4009: Array(20).fill(""),
      CPCCBC4010: Array(32).fill(""),
      CPCCBC4012: Array(14).fill(""),
      CPCCBC4014: Array(11).fill(""),
      CPCCBC4018: Array(13).fill(""),
      CPCCBC4021: Array(11).fill(""),
      CPCCBC4053: Array(14).fill(""),
      BSBPMG422: Array(11).fill(""),
      CPCCBC4003: Array(28).fill(""),
      CPCCBC4004: Array(19).fill(""),
      CPCCBC4005: Array(14).fill(""),
      CPCCBC4006: Array(20).fill(""),
      CPCSUS4002: Array(16).fill(""),
      BSBESB402: Array(14).fill(""),
      BSBESB406: Array(18).fill(""),
    },
    evidenceMatrix: {
      resume: Array(3).fill(false),
      qualifications: Array(3).fill(false),
      certificates: Array(3).fill(false),
      memberships: Array(3).fill(false),
      industryDocs: Array(3).fill(false),
      jobDescription: Array(3).fill(false),
      licenses: Array(3).fill(false),
      references: Array(3).fill(false),
      certifications: Array(3).fill(false),
      demonstration: Array(3).fill(false),
      indirectDemo: Array(3).fill(false),
      products: Array(3).fill(false),
      workplaceDocs: Array(3).fill(false),
      questions: Array(3).fill(false),
      assignments: Array(3).fill(false),
      thirdParty: Array(3).fill(false),
      selfAssessment: Array(3).fill(false),
      simulation: Array(3).fill(false),
      portfolios: Array(3).fill(false),
      hobbies: Array(3).fill(false),
      supplementary: Array(3).fill(false),
      22: Array(3).fill(false),
    },
    additionalNotes: "",
    assessorName: "",
    assessorSignature: "",
    assessorDate: "",
  });

  const totalPages = 23;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUnitChange = (unit, index, value) => {
    setFormData((prev) => {
      const updatedUnit = [...prev.units[unit]];
      updatedUnit[index] = value;
      return {
        ...prev,
        units: {
          ...prev.units,
          [unit]: updatedUnit,
        },
      };
    });
  };

  const handleEvidenceChange = (evidence, unitIndex, checked) => {
    setFormData((prev) => {
      const updatedEvidence = [...prev.evidenceMatrix[evidence]];
      updatedEvidence[unitIndex] = checked;
      return {
        ...prev,
        evidenceMatrix: {
          ...prev.evidenceMatrix,
          [evidence]: updatedEvidence,
        },
      };
    });
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const unitData = {
    CPCCBC4001: {
      title:
        "Apply building codes and standards to the construction process for Class 1 and 10 buildings",
      tasks: [
        "Determine nature of building, its use and arrangement from construction plans and specifications.",
        "Access, read and interpret relevant Australian Standards and codes for residential building and construction projects.",
        "Define classification of building from the NCC.",
        "Identify and interpret multiple classifications from the NCC.",
        "Identify NCC Performance Requirements relevant to Class 1 and 10, up to two storeys, building projects.",
        "Determine range of criteria to ensure that construction methods comply with NCC Performance Requirements.",
        "Identify and document non-conforming construction methods against NCC Performance Requirements.",
        "Propose and discuss Performance Solution with design and building and construction professionals.",
        "Analyse and apply Assessment Methods to determine compliance with Performance Solution or Deem-to-Satisfy Solution (DTS)",
        "Meet the evidence of suitability requirements for building materials and products stated in the NCC.",
        "Complete relevant documentation to meet NCC requirements.",
        "Identify NCC and other legislative requirements for passive and active fire control elements in buildings.",
        "Determine level of fire resistance required for the construction of various buildings.",
        "Check existing buildings for compliance with passive and active fire protection requirements.",
      ],
    },
    CPCCBC4002: {
      title:
        "Manage work health and safety in the building and construction workplace",
      tasks: [
        "Evaluate construction site safety and identify potential risk areas.",
        "Assess on site worker's health and safety.",
        "Identify hazards and determine control measures that comply with legislative requirements and organisational policies.",
        "Consult with workers to evaluate effectiveness of existing control measures and WHS experts, as necessary, to contribute to an inspection report.",
        "Complete a workplace inspection report with recommended actions to minimise workplace incidents and mitigate risk.",
        "Establish a workplace safety plan incorporating information from the workplace inspection report to raise safety awareness and support safe workplace practices.",
        "Implement processes to identify hazards, rate the risks and put control measures in place.",
        "Establish educational programs specific to the building and construction workplace to ensure workers carry out safe work practices.",
        "Negotiate and resolve safety issues and conflicts.",
        "Monitor and audit workplace safety to ensure compliance with WHS regulations and workplace safety requirements.",
        "Record findings and recommend and implement actions to address non-compliance.",
        "Review effectiveness of educational programs to ensure all workers have been inducted and maintain safe work practices.",
        "Monitor, review and document effectiveness of control measures to determine changes and improvements as required.",
      ],
    },
    CPCCBC4007: {
      title: "Plan building or construction work",
      tasks: [
        "Identify and review contractual obligations and requirements for building or construction work.",
        "Prepare a draft works schedule according to contractual requirements.",
        "Confirm site access requirements and limitations with relevant personnel.",
        "Identify and document on-site and off-site work components.",
        "Identify and document human resource requirements for the project.",
        "Identify and document plant and equipment requirements for the project.",
        "Identify and document physical resource requirements for the project.",
        "Identify and document preliminary works required before project commencement.",
        "Identify and document service connection requirements.",
        "Identify and document temporary services and facilities required for project.",
        "Determine site accommodation requirements.",
        "Determine project timeframes and key milestones.",
        "Identify and document quality requirements and standards.",
        "Identify and document environmental requirements.",
        "Identify and document safety requirements.",
        "Identify and document special requirements.",
        "Identify and document risks and contingency plans.",
        "Identify and document notification requirements.",
        "Identify and document local authority requirements.",
        "Identify and document reporting requirements.",
        "Finalise and document the works schedule.",
      ],
    },
    CPCCBC4008: {
      title:
        "Supervise site communication and administration processes for building and construction projects",
      tasks: [
        "Identify and implement site communication processes.",
        "Identify and implement site administration processes.",
        "Identify and implement site documentation processes.",
        "Identify and implement site record keeping processes.",
        "Identify and implement site reporting processes.",
        "Identify and implement site meeting processes.",
        "Identify and implement site inspection processes.",
        "Identify and implement site quality control processes.",
        "Identify and implement site safety processes.",
        "Identify and implement site environmental processes.",
        "Identify and implement site dispute resolution processes.",
        "Identify and implement site contract administration processes.",
        "Identify and implement site variation processes.",
        "Identify and implement site extension of time processes.",
        "Identify and implement site payment processes.",
        "Identify and implement site practical completion processes.",
        "Identify and implement site defects liability processes.",
        "Identify and implement site final completion processes.",
        "Identify and implement site handover processes.",
        "Identify and implement site project evaluation processes.",
        "Identify and implement site project close-out processes.",
        "Identify and implement site archiving processes.",
        "Identify and implement site lessons learned processes.",
      ],
    },
    CPCCBC4009: {
      title: "Apply legal requirements to building and construction projects",
      tasks: [
        "Identify and apply legal requirements for building and construction projects.",
        "Identify and apply contractual requirements for building and construction projects.",
        "Identify and apply statutory requirements for building and construction projects.",
        "Identify and apply regulatory requirements for building and construction projects.",
        "Identify and apply standards and codes for building and construction projects.",
        "Identify and apply planning requirements for building and construction projects.",
        "Identify and apply environmental requirements for building and construction projects.",
        "Identify and apply WHS requirements for building and construction projects.",
        "Identify and apply quality requirements for building and construction projects.",
        "Identify and apply industrial relations requirements for building and construction projects.",
        "Identify and apply insurance requirements for building and construction projects.",
        "Identify and apply licensing requirements for building and construction projects.",
        "Identify and apply registration requirements for building and construction projects.",
        "Identify and apply certification requirements for building and construction projects.",
        "Identify and apply accreditation requirements for building and construction projects.",
        "Identify and apply consumer protection requirements for building and construction projects.",
        "Identify and apply dispute resolution requirements for building and construction projects.",
        "Identify and apply intellectual property requirements for building and construction projects.",
        "Identify and apply privacy requirements for building and construction projects.",
        "Identify and apply record keeping requirements for building and construction projects.",
      ],
    },
    CPCCBC4010: {
      title:
        "Apply structural principles to residential and commercial constructions",
      tasks: [
        "Identify and apply structural principles for residential constructions.",
        "Identify and apply structural principles for commercial constructions.",
        "Analyse structural requirements for footings and foundations.",
        "Analyse structural requirements for slabs.",
        "Analyse structural requirements for walls.",
        "Analyse structural requirements for roofs.",
        "Analyse structural requirements for beams.",
        "Analyse structural requirements for columns.",
        "Apply principles of load distribution and transfer.",
        "Ensure compliance with relevant Australian Standards and codes.",
        "Assess structural integrity of building materials.",
        "Evaluate structural performance under various load conditions.",
        "Collaborate with engineers and architects to ensure structural compliance.",
        "Document structural specifications and requirements.",
      ],
    },
    CPCCBC4012: {
      title: "Read and interpret plans and specifications",
      tasks: [
        "Read and interpret architectural plans.",
        "Read and interpret engineering plans.",
        "Read and interpret specifications for building projects.",
        "Identify symbols, notations, and abbreviations used in plans.",
        "Extract measurements and dimensions from plans.",
        "Identify materials and finishes from specifications.",
        "Determine construction methods from plans and specifications.",
        "Identify compliance requirements from plans and specifications.",
        "Communicate plan details to relevant stakeholders.",
        "Resolve discrepancies in plans and specifications.",
        "Document interpretations and clarifications of plans.",
      ],
    },
    CPCCBC4014: {
      title: "Prepare simple building sketches and drawings",
      tasks: [
        "Prepare sketches for building components.",
        "Prepare drawings for building layouts.",
        "Use drafting tools and software to create sketches.",
        "Incorporate measurements and dimensions in sketches.",
        "Annotate sketches with relevant details and specifications.",
        "Ensure sketches comply with relevant standards and codes.",
        "Present sketches to clients and stakeholders for feedback.",
        "Revise sketches based on feedback and requirements.",
        "Document and store sketches for project records.",
      ],
    },
    CPCCBC4018: {
      title:
        "Apply site surveys and set-out procedures to building and construction projects",
      tasks: [
        "Conduct site surveys to gather topographic data.",
        "Use surveying equipment to measure site features.",
        "Interpret survey data to inform project planning.",
        "Set out building lines and levels according to plans.",
        "Establish reference points and benchmarks for construction.",
        "Verify accuracy of set-out procedures.",
        "Document survey and set-out data for project records.",
        "Collaborate with surveyors and engineers to ensure accuracy.",
        "Resolve discrepancies in survey and set-out data.",
      ],
    },
    CPCCBC4021: {
      title: "Minimise waste on the building and construction site",
      tasks: [
        "Identify sources of waste on construction sites.",
        "Develop strategies to reduce material waste.",
        "Implement waste segregation and recycling processes.",
        "Monitor waste management practices on site.",
        "Educate workers on waste minimisation techniques.",
        "Document waste management activities and outcomes.",
        "Ensure compliance with environmental regulations.",
        "Evaluate effectiveness of waste minimisation strategies.",
        "Collaborate with suppliers to reduce packaging waste.",
      ],
    },
    CPCCBC4053: {
      title:
        "Apply building codes and standards to the construction process for Class 2 to 9 Type C buildings",
      tasks: [
        "Determine nature of building, its use, and arrangement from plans and specifications.",
        "Access and interpret Australian Standards and codes for Class 2 to 9 buildings.",
        "Define classification of building from the NCC.",
        "Identify NCC Performance Requirements for Class 2 to 9 Type C buildings.",
        "Determine criteria to ensure construction complies with NCC Performance Requirements.",
        "Identify and document non-conforming construction methods.",
        "Propose Performance Solutions in collaboration with professionals.",
        "Apply Assessment Methods to verify compliance with Performance or DTS Solutions.",
        "Ensure materials meet NCC evidence of suitability requirements.",
        "Document compliance with NCC requirements.",
        "Identify fire control requirements for Class 2 to 9 buildings.",
        "Check existing buildings for fire protection compliance.",
      ],
    },
    BSBPMG422: {
      title: "Apply project quality management techniques",
      tasks: [
        "Identify project quality requirements and standards.",
        "Develop a quality management plan for the project.",
        "Implement quality control processes during project execution.",
        "Conduct quality assurance reviews to ensure compliance.",
        "Monitor and report on quality performance metrics.",
        "Identify and address quality issues and non-conformances.",
        "Document quality management activities and outcomes.",
        "Collaborate with stakeholders to resolve quality issues.",
        "Evaluate effectiveness of quality management techniques.",
      ],
    },
    CPCCBC4003: {
      title: "Select, prepare and administer a construction contract",
      tasks: [
        "Identify appropriate contract type for the construction project.",
        "Communicate with parties to confirm capacity for a binding agreement.",
        "Prepare contract documents incorporating all relevant details.",
        "Establish factors and special conditions for contract consent.",
        "Apply requirements for offer and acceptance of a contract.",
        "Draft contract with accurate details and conditions.",
        "Assess and schedule progress payments.",
        "Resolve discrepancies prior to contract preparation.",
        "Ensure legality and validity of draft contract.",
        "Prepare final contract per organisational legal processes.",
        "Process progress payments as per contract terms.",
        "Handle applications for extension of time.",
        "Negotiate and document contract variations.",
        "Minimise liquidated damages or penalties.",
        "Resolve contractual disputes per contract and legislation.",
        "Assess conditions for issuing a final certificate.",
        "Apply process for practical completion.",
        "Finalise defects liability under the contract.",
        "Issue certificate upon contract completion.",
        "Secure documentation for records.",
      ],
    },
    CPCCBC4004: {
      title:
        "Identify and produce estimated costs for building and construction projects",
      tasks: [
        "Read and interpret construction drawings and specifications.",
        "Identify building site features, type, and construction method.",
        "Establish site facilities and temporary fencing requirements.",
        "Identify waste removal requirements and apply site fees.",
        "Identify statutory, approvals, or compliance costs.",
        "Produce a materials and consumables quantity list.",
        "Estimate off-site production and delivery costs.",
        "Identify and estimate contractor and employee work rates.",
        "Estimate labour hours and calculate costs, including on-costs.",
        "Identify physical resources required for the project.",
        "Determine operational costs and timeframes for resource hire.",
        "Obtain supplier prices for physical resources.",
        "Cost plant, equipment, and machinery.",
        "Compile materials, consumables, and delivery costs.",
        "Compile labour costs inclusive of rates and entitlements.",
        "Compile costs of physical resources.",
        "Apply organisational overhead recovery and margins.",
        "Produce estimated project costs for tender or bill.",
        "Manage risks associated with estimating project costs.",
      ],
    },
    CPCCBC4005: {
      title: "Produce labour and material schedules for ordering",
      tasks: [
        "Check conditions of approval and project commencement dates.",
        "Identify variations to scope of works and contractual terms.",
        "Compile list of approved suppliers and contractors.",
        "Confirm material and labour availability.",
        "Enter critical project information into project schedule.",
        "Prepare electronic call forward sheet and site files.",
        "Break down project into stages, tasks, and milestones.",
        "Itemise materials and labour for construction stages.",
        "Sequence material delivery and labour commencement.",
        "Factor in unplanned delays.",
        "Monitor construction stage costs against estimates.",
        "Manage project progress against scheduled timelines.",
        "Record variations, changes, and delays.",
        "Resolve issues and maintain cost analysis.",
      ],
    },
    CPCCBC4006: {
      title:
        "Select, procure and store Favourite construction materials for building and construction projects",
      tasks: [
        "Identify and read project plans, specifications, and codes.",
        "Assess material properties and suitability for the project.",
        "Evaluate materials for quality, compatibility, and compliance.",
        "Establish environmental impacts of materials.",
        "Determine tolerances for naturally occurring materials.",
        "Establish material assembly and installation tolerances.",
        "Select structurally adequate materials per contract.",
        "Select materials for safety, fire resistance, and cost-effectiveness.",
        "Consider material degradation over building life cycle.",
        "Evaluate alternative materials if specified ones are unavailable.",
        "Finalise material selection with professionals and client.",
        "Procure materials per organisation’s requirements.",
        "Collect evidence of material suitability from suppliers.",
        "Manage transportation to limit material damage.",
        "Check delivered materials for compliance and condition.",
        "Allocate storage space and supervise safe handling.",
        "Implement inspection processes for delivered materials.",
        "Inform relevant persons of material quality issues.",
        "Instruct on workplace safety for material handling.",
        "Maintain records of deliveries and material variations.",
      ],
    },
    CPCSUS4002: {
      title:
        "Use building science principles to construct energy efficient buildings",
      tasks: [
        "Identify building use and energy efficiency expectations.",
        "Identify risks from occupants’ indoor activities.",
        "Determine environmental and climatic impacts on materials.",
        "Identify construction methods for material durability.",
        "Consult legislation and codes for energy efficiency standards.",
        "Consult domestic and international best practices.",
        "Research building science principles for energy efficiency.",
        "Review embodied energy of materials.",
        "Research HVAC systems for energy efficiency and air quality.",
        "Review mechanical ventilation systems for appropriateness.",
        "Research moisture and vapour barriers for efficiency.",
        "Identify site location to maximise energy efficiency.",
        "Assess energy efficiency of thermal, heating, and cooling flows.",
        "Develop strategies to minimise air leakages.",
        "Select ventilation systems for site and operational costs.",
        "Select materials for energy efficiency and durability.",
      ],
    },
    BSBESB402: {
      title:
        "Establish legal and risk management requirements of new business ventures",
      tasks: [
        "Identify legal structure of business using reliable sources.",
        "Identify applicable legislative and regulatory requirements.",
        "Analyse requirements’ relationship to business practices.",
        "Develop procedures for legislative and regulatory compliance.",
        "Implement processes for storing legal documents.",
        "Establish systems to identify and correct non-compliance.",
        "Assess products/services for procurement rights.",
        "Negotiate and secure contractual procurement rights.",
        "Complete contractual arrangements per procedures.",
        "Seek legal advice to confirm contractual obligations.",
        "Analyse business activities for risk management requirements.",
        "Assess probability and impact of risks.",
        "Develop a plan to prioritise and treat risks.",
        "Implement procedures to mitigate risks.",
      ],
    },
    BSBESB406: {
      title:
        "Establish operational strategies and procedures for new business ventures",
      tasks: [
        "Develop an operational plan with clear action points.",
        "Identify WHS and environmental issues and minimise risks.",
        "Review and evaluate quality assurance processes.",
        "Develop KPIs aligned to business plan.",
        "Align KPIs to business strategies and technologies.",
        "Implement systems to evaluate performance and satisfaction.",
        "Implement systems to control stock, costs, and risks.",
        "Manage staffing requirements within budget constraints.",
        "Provide products/services per legal and ethical standards.",
        "Provide products/services per time, cost, and quality specs.",
        "Apply quality procedures for customer requirements.",
        "Evaluate operational targets using digital technologies.",
        "Review systems to support business performance.",
        "Investigate operating problems and implement changes.",
        "Update operational policies to incorporate corrective action.",
        "Adjust business operations to increase success.",
        "Implement new digital technologies into operations.",
        "Research new business opportunities and adjust goals.",
      ],
    },
  };

  const evidenceTypes = [
    { id: "resume", label: "Resume/Brief CV or work history", code: "A 01" },
    {
      id: "qualifications",
      label:
        "Qualifications/Certificates for nationally recognised qualifications",
      code: "A 01",
    },
    {
      id: "certificates",
      label:
        "Academic transcripts showing units/elements relevant to the qualification",
      code: "A 01",
    },
    {
      id: "memberships",
      label:
        "Results/statement of attendance/certificates; for in-house courses, workshops, seminars, symposiums",
      code: "A 01",
    },
    {
      id: "industryDocs",
      label: "Membership of relevant professional associations",
      code: "A 01",
    },
    {
      id: "jobDescription",
      label:
        "Other documentation that may demonstrate industry experience, i.e. participation in the development of industry programs; industry awards",
      code: "A 02",
    },
    { id: "licenses", label: "Job/Position Description", code: "A 01" },
    {
      id: "references",
      label: "Relevant industry licences i.e. Blue Card",
      code: "A 01",
    },
    {
      id: "certifications",
      label:
        "References/letters from previous or current employers/supervisors",
      code: "A 01",
    },
    {
      id: "demonstration",
      label:
        "Certifications Industry workshop certificates of completion or attendance",
      code: "A 01",
    },
    {
      id: "indirectDemo",
      label:
        "Direct demonstration/observation: Performance of a task, or range of tasks, either in the workplace or in a simulated work environment, witnessed directly by an assessor",
      code: "A 01",
    },
    {
      id: "products",
      label:
        "Indirect demonstration: Use of photographs, videos, etc. showing performance of a task when the assessor cannot be present",
      code: "A 02",
    },
    {
      id: "workplaceDocs",
      label:
        "Products: Models, programs, designs, items, objects that have been made, fixed or revamped by the candidate",
      code: "A 01 and A 02",
    },
    {
      id: "questions",
      label:
        "Workplace documents: Work samples, which may include but not limited to: Rosters, budgets, reports, standard operating procedures, diaries/task sheets/job sheets/log books/performance appraisals/work plans/projects etc. developed by the candidate",
      code: "A 01 and A 02",
    },
    {
      id: "assignments",
      label:
        "Questions - written and oral: Asking the candidate about real or hypothetical situations to check understanding, task management and contingency management skills",
      code: "A 02",
    },
    {
      id: "thirdParty",
      label:
        "Assignments: Projects, reports, essays, etc. relevant to the LLN requirements of the unit of competency",
      code: "A 02",
    },
    {
      id: "selfAssessment",
      label:
        "Third party reports: Documented and verified reports from supervisor, colleague, subject expert, trainer or others",
      code: "A 01",
    },
    {
      id: "simulation",
      label:
        "Self-assessment: A candidate's personal statement on their performance (not generally sufficient in isolation)",
      code: "A 02",
    },
    {
      id: "portfolios",
      label:
        "Simulation: Simulated activity to accommodate difficult to demonstrate criteria e.g. emergencies, contingencies, difficult behaviours etc.",
      code: "A 02",
    },
    {
      id: "hobbies",
      label: "Portfolios: Collections of evidence compiled by the candidate",
      code: "A 01 and A 02",
    },
    {
      id: "supplementary",
      label:
        "Hobbies or interests that relate to the outcomes of the unit elements",
      code: "A 02",
    },
    {
      id: "22",
      label:
        "Supplementary Evidence - Any other evidence not covered through the RPL Evidence Matrix",
      code: "A 01, 02 and 03",
    },
  ];

  const evidenceTypes2 = [
    {
      id: "resume",
      label:
        "Results/statement of attendance/certificates; for in-house courses, workshops, seminars, symposiums",
      code: "A 01",
    },
    {
      id: "qualifications",
      label: "Membership of relevant professional associations",
      code: "A 01",
    },
    {
      id: "certificates",
      label:
        "Other documentation that may demonstrate industry experience, i.e. participation in the development of industry programs; industry awards",
      code: "A 02",
    },
    { id: "memberships", label: "Job/Position Description", code: "A 01" },
    {
      id: "industryDocs",
      label: "Relevant industry licences i.e. Blue Card",
      code: "A 01",
    },
    {
      id: "jobDescription",
      label:
        "References/letters from previous or current employers/supervisors",
      code: "A 01",
    },
    {
      id: "licenses",
      label:
        "Direct demonstration/observation: Performance of a task, or range of tasks, either in the workplace or in a simulated work environment, witnessed directly by an assessor",
      code: "A 01",
    },
    {
      id: "references",
      label:
        "Indirect demonstration: Use of photographs, videos, etc. showing performance of a task when the assessor cannot be present",
      code: "A 02",
    },
    {
      id: "certifications",
      label:
        "Indirect demonstration: Use of photographs, videos, etc. showing performance of a task when the assessor cannot be present",
      code: "A 02",
    },
    {
      id: "demonstration",
      label:
        "Products: Models, programs, designs, items, objects that have been made, fixed or revamped by the candidate",
      code: "A 01 and A 02",
    },
    {
      id: "indirectDemo",
      label:
        "Workplace documents: Work samples, which may include but not limited to: Rosters, budgets, reports, standard operating procedures, diaries/task sheets/job sheets/log books/performance appraisals/work plans/projects etc. developed by the candidate",
      code: "A 01 and A 02",
    },
    {
      id: "products",
      label:
        "Questions - written and oral: Asking the candidate about real or hypothetical situations to check understanding, task management and contingency management skills",
      code: "A 02",
    },
    {
      id: "workplaceDocs",
      label:
        "Assignments: Projects, reports, essays, etc. relevant to the LLN requirements of the unit of competency",
      code: "A 02",
    },
    {
      id: "questions",
      label:
        "Third party reports: Documented and verified reports from supervisor, colleague, subject expert, trainer or others",
      code: "A 01",
    },
    {
      id: "assignments",
      label:
        "Self-assessment: A candidate's personal statement on their performance (not generally sufficient in isolation)",
      code: "A 02",
    },
    {
      id: "thirdParty",
      label:
        "Simulation: Simulated activity to accommodate difficult to demonstrate criteria e.g. emergencies, contingencies, difficult behaviours etc.",
      code: "A 02",
    },
    {
      id: "selfAssessment",
      label: "Portfolios: Collections of evidence compiled by the candidate",
      code: "A 01 and A 02",
    },
    {
      id: "simulation",
      label:
        "Hobbies or interests that relate to the outcomes of the unit elements",
      code: "A 02",
    },
    {
      id: "supplementary",
      label:
        "Supplementary Evidence - Any other evidence not covered through the RPL Evidence Matrix",
      code: "A 01, 02 and 03",
    },
  ];

  const unitCodes = Object.keys(unitData).slice(0, 10);
  const unitCodes2 = Object.keys(unitData).slice(11, 19);

  const renderIntroductionPage = () => {
    return (
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
          Introduction
        </h3>
        <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
          This Self-Assessment Information Kit is designed to help you determine
          your eligibility for Recognition of Prior Learning (RPL) for the
          Certificate IV in Building and Construction. By completing this
          self-assessment, you will be able to identify whether your existing
          skills and knowledge align with the requirements of the qualification.
        </p>
        <p className="mb-3 sm:mb-4 text-xs sm:text-sm">
          Please read through this document carefully and answer all questions
          honestly. Your responses will help determine the most appropriate
          pathway for you to achieve your qualification.
        </p>

        <div className="bg-gray-50 p-2 sm:p-4 rounded-md mb-3 sm:mb-4">
          <h4 className="font-semibold text-gray-700 mb-1 sm:mb-2 text-xs sm:text-sm">
            Declaration of Understanding
          </h4>
          <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
            Please read and acknowledge the following:
          </p>
          <ul className="list-disc pl-3 sm:pl-5 mb-2 sm:mb-3 text-xs sm:text-sm">
            <li>
              I have read and understood the contents of this self-assessment
              kit.
            </li>
            <li>
              I was given the opportunity to clarify any issues relating to the
              RPL assessment process.
            </li>
            <li>
              I have requested this assessment in accordance with my own free
              will and without duress.
            </li>
          </ul>

          <div className="mb-2 sm:mb-3">
            <label className="block text-gray-700 mb-1 text-xs sm:text-sm">
              Candidate's Name:
            </label>
            <input
              type="text"
              value={formData.candidateName}
              onChange={(e) =>
                handleInputChange("candidateName", e.target.value)
              }
              className="w-full p-1 sm:p-2 border border-gray-300 rounded-md text-xs sm:text-sm"
            />
          </div>

          <div className="mb-2 sm:mb-3">
            <label className="block text-gray-700 mb-1 text-xs sm:text-sm">
              Candidate's Signature:
            </label>
            <input
              type="text"
              value={formData.candidateSignature}
              onChange={(e) =>
                handleInputChange("candidateSignature", e.target.value)
              }
              className="w-full p-1 sm:p-2 border border-gray-300 rounded-md text-xs sm:text-sm"
              placeholder="Type your full name as signature"
            />
          </div>

          <div className="mb-2 sm:mb-3">
            <label className="block text-gray-700 mb-1 text-xs sm:text-sm">
              Date:
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="w-full p-1 sm:p-2 border border-gray-300 rounded-md text-xs sm:text-sm"
            />
          </div>

          <div className="flex items-center mb-2 sm:mb-3">
            <input
              type="checkbox"
              id="declaration"
              checked={formData.declaration}
              onChange={(e) =>
                handleInputChange("declaration", e.target.checked)
              }
              className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 border-gray-300 rounded"
            />
            <label
              htmlFor="declaration"
              className="ml-1 sm:ml-2 text-gray-700 text-xs sm:text-sm"
            >
              I acknowledge and agree to the above statements
            </label>
          </div>
        </div>
      </div>
    );
  };

  const renderEvidenceMatrixPage = () => {
    return (
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
          Evidence Matrix (Section 1)
        </h3>
        <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
          The following table helps you identify which types of evidence are
          relevant for each unit of competency. Check the boxes where you have
          evidence that supports your competency in that unit.
        </p>

        <div className="w-full overflow-x-auto">
          <table className="w-full border border-gray-200 text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1 sm:px-3 sm:py-2 border text-left text-[10px] sm:text-xs font-medium sticky left-0 bg-gray-100 z-10">
                  Relevance of Evidence
                </th>
                {unitCodes.map((unitCode) => (
                  <th
                    key={unitCode}
                    className="px-1 py-1 sm:px-2 sm:py-2 border text-center text-[10px] sm:text-xs font-medium"
                  >
                    {unitCode}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {evidenceTypes.map((evidence, evidenceIndex) => (
                <tr
                  key={evidence.id}
                  className={evidenceIndex % 2 === 1 ? "bg-gray-50" : ""}
                >
                  <td className="px-2 py-1 sm:px-3 sm:py-2 border text-[10px] sm:text-xs sticky left-0 bg-white sm:bg-inherit z-10">
                    {evidence.label}
                  </td>
                  {unitCodes.map((unitCode, unitIndex) => (
                    <td
                      key={`${evidence.id}-${unitCode}`}
                      className="px-1 py-1 sm:px-2 sm:py-2 border text-center"
                    >
                      <input
                        type="checkbox"
                        checked={
                          formData.evidenceMatrix[evidence.id]?.[unitIndex] ||
                          false
                        }
                        onChange={(e) =>
                          handleEvidenceChange(
                            evidence.id,
                            unitIndex,
                            e.target.checked
                          )
                        }
                        className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 border-gray-300 rounded"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-gray-500 italic">
          Swipe horizontally to see more columns
        </p>
      </div>
    );
  };

  const renderEvidenceMatrixPage2 = () => {
    return (
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
          Evidence Matrix (Section 2)
        </h3>
        <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
          The following table helps you identify which types of evidence are
          relevant for each unit of competency. Check the boxes where you have
          evidence that supports your competency in that unit.
        </p>

        <div className="w-full overflow-x-auto">
          <table className="w-full border border-gray-200 text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1 sm:px-3 sm:py-2 border text-left text-[10px] sm:text-xs font-medium sticky left-0 bg-gray-100 z-10">
                  Relevance of Evidence
                </th>
                {unitCodes2.map((unitCode) => (
                  <th
                    key={unitCode}
                    className="px-1 py-1 sm:px-2 sm:py-2 border text-center text-[10px] sm:text-xs font-medium"
                  >
                    {unitCode}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {evidenceTypes2.map((evidence, evidenceIndex) => (
                <tr
                  key={evidence.id}
                  className={evidenceIndex % 2 === 1 ? "bg-gray-50" : ""}
                >
                  <td className="px-2 py-1 sm:px-3 sm:py-2 border text-[10px] sm:text-xs sticky left-0 bg-white sm:bg-inherit z-10">
                    {evidence.label}
                  </td>
                  {unitCodes2.map((unitCode, unitIndex) => (
                    <td
                      key={`${evidence.id}-${unitCode}`}
                      className="px-1 py-1 sm:px-2 sm:py-2 border text-center"
                    >
                      <input
                        type="checkbox"
                        checked={
                          formData.evidenceMatrix[evidence.id]?.[unitIndex] ||
                          false
                        }
                        onChange={(e) =>
                          handleEvidenceChange(
                            evidence.id,
                            unitIndex,
                            e.target.checked
                          )
                        }
                        className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 border-gray-300 rounded"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-gray-500 italic">
          Swipe horizontally to see more columns
        </p>
      </div>
    );
  };

  const renderUnitAssessmentPage = (unitCode, unitIndex) => {
    const unit = unitData[unitCode];
    if (!unit) return null;

    return (
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
          Unit {unitIndex + 1}: {unitCode} - {unit.title}
        </h3>
        <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
          For each task below, indicate your level of experience by selecting
          "Never", "Sometimes", or "Regularly".
        </p>

        <div className="w-full overflow-x-auto">
          <table className="w-full border border-gray-200 text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1 sm:px-3 sm:py-2 border text-left text-[10px] sm:text-xs font-medium sticky left-0 bg-gray-100 z-10">
                  Core Task
                </th>
                <th className="px- Butik py-1 sm:px-3 sm:py-2 border text-left text-[10px] sm:text-xs font-medium">
                  Required experience and knowledge
                </th>
                <th
                  colSpan="3"
                  className="px-2 py-1 sm:px-3 sm:py-2 border text-center text-[10px] sm:text-xs font-medium"
                >
                  I have performed these tasks
                </th>
              </tr>
            </thead>
            <tbody>
              {unit.tasks.map((task, taskIndex) => (
                <tr
                  key={taskIndex}
                  className={taskIndex % 2 === 1 ? "bg-gray-50" : ""}
                >
                  {taskIndex === 0 ? (
                    <td
                      rowSpan={unit.tasks.length}
                      className="px-2 py-1 sm:px-3 sm:py-2 border text-[10px] sm:text-xs sticky left-0 bg-white sm:bg-inherit z-10"
                    >
                      {unitCode}
                    </td>
                  ) : null}
                  <td className="px-2 py-1 sm:px-3 sm:py-2 border text-[10px] sm:text-xs">
                    {task}
                  </td>
                  <td className="px-1 py-1 sm:px-2 sm:py-2 border text-center">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`${unitCode}-task${taskIndex}`}
                        value="Never"
                        checked={
                          formData.units[unitCode][taskIndex] === "Never"
                        }
                        onChange={() =>
                          handleUnitChange(unitCode, taskIndex, "Never")
                        }
                        className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 border-gray-300"
                      />
                      <span className="ml-1 text-[10px] sm:text-xs">Never</span>
                    </label>
                  </td>
                  <td className="px-1 py-1 sm:px-2 sm:py-2 border text-center">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`${unitCode}-task${taskIndex}`}
                        value="Sometimes"
                        checked={
                          formData.units[unitCode][taskIndex] === "Sometimes"
                        }
                        onChange={() =>
                          handleUnitChange(unitCode, taskIndex, "Sometimes")
                        }
                        className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 border-gray-300"
                      />
                      <span className="ml-1 text-[10px] sm:text-xs">
                        Sometimes
                      </span>
                    </label>
                  </td>
                  <td className="px-1 py-1 sm:px-2 sm:py-2 border text-center">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`${unitCode}-task${taskIndex}`}
                        value="Regularly"
                        checked={
                          formData.units[unitCode][taskIndex] === "Regularly"
                        }
                        onChange={() =>
                          handleUnitChange(unitCode, taskIndex, "Regularly")
                        }
                        className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 border-gray-300"
                      />
                      <span className="ml-1 text-[10px] sm:text-xs">
                        Regularly
                      </span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-semibold">
                <td
                  colSpan="2"
                  className="px-2 py-1 sm:px-3 sm:py-2 border text-[10px] sm:text-xs"
                >
                  TOTALS:
                </td>
                <td className="px-1 py-1 sm:px-2 sm:py-2 border text-center text-[10px] sm:text-xs">
                  NEVER /{unit.tasks.length}
                </td>
                <td className="px-1 py-1 sm:px-2 sm:py-2 border text-center text-[10px] sm:text-xs">
                  SOMETIMES /{unit.tasks.length}
                </td>
                <td className="px-1 py-1 sm:px-2 sm:py-2 border text-center text-[10px] sm:text-xs">
                  REGULARLY /{unit.tasks.length}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-gray-500 italic">
          Swipe horizontally to see more columns
        </p>
      </div>
    );
  };

  const renderSubmissionPage = () => {
    return (
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
          Submission
        </h3>
        <p className="mb-2 sm:mb-3 text-xs sm:text-sm">
          Thank you for completing the self-assessment. Please review your
          responses before submitting.
        </p>

        <div className="bg-gray-50 p-2 sm:p-4 rounded-md mb-3 sm:mb-4">
          <h4 className="font-semibold text-gray-700 mb-1 sm:mb-2 text-xs sm:text-sm">
            Additional Notes
          </h4>
          <textarea
            value={formData.additionalNotes}
            onChange={(e) =>
              handleInputChange("additionalNotes", e.target.value)
            }
            className="w-full p-1 sm:p-2 border border-gray-300 rounded-md text-xs sm:text-sm"
            rows="4"
            placeholder="Add any additional information that may support your application"
          ></textarea>
        </div>
      </div>
    );
  };

  const renderPageContent = () => {
    if (currentPage === 1) {
      return renderIntroductionPage();
    } else if (currentPage === 2) {
      return renderEvidenceMatrixPage();
    } else if (currentPage === 3) {
      return renderEvidenceMatrixPage2();
    } else if (currentPage === totalPages) {
      return renderSubmissionPage();
    } else {
      const unitIndex = currentPage <= 5 ? currentPage - 3 : currentPage - 4;
      const unitCodes = Object.keys(unitData);
      if (unitIndex >= 0 && unitIndex < unitCodes.length) {
        return renderUnitAssessmentPage(unitCodes[unitIndex], unitIndex);
      }
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6">
      <div className="max-w-full sm:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:hidden flex justify-between items-center mb-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md bg-green-600 text-white"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="text-xs font-medium">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {menuOpen && (
          <div className="sm:hidden fixed inset-0 z-50 bg-white overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base sm:text-lg font-bold">Navigation</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-md bg-gray-200"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => goToPage(1)}
                  className={`w-full text-left p-2 rounded-md text-xs ${
                    currentPage === 1
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100"
                  }`}
                >
                  Introduction
                </button>
                <button
                  onClick={() => goToPage(2)}
                  className={`w-full text-left p-2 rounded-md text-xs ${
                    currentPage === 2
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100"
                  }`}
                >
                  Evidence Matrix (Section 1)
                </button>
                <button
                  onClick={() => goToPage(3)}
                  className={`w-full text-left p-2 rounded-md text-xs ${
                    currentPage === 3
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100"
                  }`}
                >
                  Evidence Matrix (Section 2)
                </button>
                {Object.keys(unitData).map((unitCode, index) => (
                  <button
                    key={unitCode}
                    onClick={() => goToPage(index < 3 ? index + 3 : index + 4)}
                    className={`w-full text-left p-2 rounded-md text-xs ${
                      currentPage === (index < 3 ? index + 3 : index + 4)
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100"
                    }`}
                  >
                    {unitCode} -{" "}
                    {unitData[unitCode].title.length > 30
                      ? unitData[unitCode].title.substring(0, 30) + "..."
                      : unitData[unitCode].title}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(totalPages)}
                  className={`w-full text-left p-2 rounded-md text-xs ${
                    currentPage === totalPages
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100"
                  }`}
                >
                  Submission
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-6 sm:px-6 sm:py-8">
            <h1 className="text-lg sm:text-xl font-bold text-center text-gray-800 mb-2 sm:mb-3">
              RPL Self-Assessment Information Kit
            </h1>
            <h2 className="text-sm sm:text-base font-semibold text-center text-gray-600 mb-3 sm:mb-4">
              CPC40920 Certificate IV in Building and Construction
            </h2>

            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 mb-3 sm:mb-4">
              <div
                className="bg-green-600 h-2 sm:h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 hidden sm:block">
              Page {currentPage} of {totalPages}
            </p>

            {renderPageContent()}

            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 flex items-center justify-center text-xs sm:text-sm"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1" /> Previous
              </button>

              {currentPage === totalPages ? (
                <button
                  onClick={handleSubmit}
                  className="px-3 py-1 sm:px-4 sm:py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center text-xs sm:text-sm"
                >
                  Submit <Check className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-3 py-1 sm:px-4 sm:py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center text-xs sm:text-sm"
                >
                  Next <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RPLSelfAssessmentForm40120ff;
