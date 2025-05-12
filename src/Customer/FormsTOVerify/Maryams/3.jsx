"use client";

import { useState, useEffect, useRef } from "react";

// Custom styles for sticky header
const stickyHeaderStyles = {
  position: "sticky",
  top: 0,
  zIndex: 10,
  backgroundColor: "white",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const FormSubmitted = () => {
  return <h1>Form Submitted Successfully</h1>;
};

export default function RPLAssessmentCPC30220cccc() {
  const [currentStep, setCurrentStep] = useState(0);
  const [candidateName, setCandidateName] = useState("");
  const [dateCompleted, setDateCompleted] = useState("");
  const [venue, setVenue] = useState("");

  // All units of competency
  const units = [
    { id: "intro", title: "Self-Assessment Information" },
    {
      id: "BSBESB402",
      title:
        "Establish Legal and Risk Management Requirements of New business Ventures",
    },
    { id: "CPCCBC4012", title: "Read and Interpret Plans and Specifications" },
    { id: "CPCPCM4011", title: "Carry Out Work-Based Risk Control Processes" },
    { id: "CPCPCM4012", title: "Estimate and Cost Work" },
    {
      id: "CPCPCM4015",
      title:
        "Access and Interpret Regulatory Requirements for the Plumbing and Services Industry",
    },
    { id: "CPCPDR4011", title: "Design and Size Sanitary Drainage Systems" },
    { id: "CPCPDR4012", title: "Design and size stormwater drainage systems" },
    { id: "CPCPGS4011", title: "Design and size consumer gas installations" },
    { id: "CPCPSN4011", title: "Design and size sanitary plumbing systems" },
    {
      id: "CPCPWT4011",
      title: "Design and size heated and cold-water services and systems",
    },
    { id: "BSBESB403", title: "Plan finances for new business ventures" },
    {
      id: "CPCCBC4002",
      title:
        "Manage Work Health and Safety in the Building and Construction Workplace",
    },
    { id: "CPCCBC4024", title: "Resolve business disputes" },
    { id: "CPCPCM2043", title: "Carry out WHS requirements" },
    {
      id: "UEERL0004",
      title:
        "Disconnect - reconnect electrical equipment connected to low voltage (LV) installation wiring",
    },
  ];

  // Unit competency questions data
  const unitQuestions = {
    BSBESB402: [
      "Discussed with supervisor to understand the nature of the problem with the machine.",
      "Utilised relevant documentation to obtain the scope of work and identify problems associated with the machine.",
      "Followed WHS/OHS and workplace procedures for the work undertaken.",
      "Identified hazards associated with the work.",
      "Assessed risks related to the work.",
      "Implemented control measures to minimize identified hazards and risks.",
      "Ensure that the checklist aligns closely with the specific tasks and competencies outlined in the unit. Consider the unique aspects of legal and risk management requirements for new business ventures when refining the checklist.",
      "Assess whether the checklist adequately covers the depth of knowledge and skills required by the unit. Depending on the complexity of the unit, you may need to expand the checklist or include additional assessment methods to ensure a comprehensive evaluation.",
      "While a checklist is a useful tool, consider supplementing it with other assessment methods such as competency conversation questions or practical scenarios to further evaluate the application of knowledge and skills.",
      "Collect feedback from assessors, industry experts, or students who undergo the assessment. Use this feedback to refine and improve the checklist for future assessments.",
      "Ensure that each item on the checklist directly relates to the performance criteria, evidence requirements, and knowledge evidence outlined in the unit. This clear mapping enhances the validity of the assessment.",
      "Maintain a balance between comprehensiveness and conciseness. The checklist should be thorough but not overly lengthy to ensure efficient and effective assessment.",
    ],
    CPCCBC4012: [
      "Discussed with stakeholders to confirm the current version of plans, specifications, and amendments.",
      "Utilised relevant documentation to determine the scope of work and details associated with the construction project.",
      "Followed Workplace Health and Safety (WHS) and Occupational Health and Safety (OHS) procedures in the work area.",
      "Identified and confirmed the nature of the building, site characteristics, and features outlined in the plans.",
      "Checked that the details on plans align with the specifications provided for the project.",
      "Distinguished key features on the plans, including building layout, spaces, and dimensions.",
      "Examined detailed drawings to determine sizes, thickness, and construction methods.",
      "Identified internal linings, external cladding, and roof materials as specified in plans and specifications.",
      "Identified concrete footing and slab sizes, and confirmed the position and type of reinforcing.",
      "Identified load-bearing points of the building based on plans.",
      "Identified wind bracing and tie-down requirements in accordance with the project specifications.",
      "Identified provisional sum (PS) and prime cost (PC) items on plans.",
    ],
    CPCPCM4011: [
      "Discussed with supervisor to obtain the nature of the problem with the machine.",
      "Utilized relevant documentation to determine the scope of work and problems associated with the machine.",
      "Followed WHS/OHS and workplace procedures for the work.",
      "Identified hazards associated with the work.",
      "Assessed risks related to the identified hazards.",
      "Implemented control measures to minimize identified risks.",
      "Nature of the machine's problem obtained from relevant documentation or work supervisor to determine the scope of work.",
      "WHS/OHS requirements and workplace procedures for a given work area identified and applied.",
      "Hazards identified, risks assessed, and control measures implemented.",
      "Reflect on instances where you discussed machine problems with a supervisor.",
      "Consider times when you used documentation to understand the scope of work.",
      "Recall situations where you followed WHS/OHS and workplace procedures.",
      "Think about instances when you identified hazards, assessed risks, and implemented control measures.",
    ],
    CPCPCM4012: [
      "Discussed with stakeholders to understand customer requirements.",
      "Utilised relevant plans and specifications to determine work requirements.",
      "Considered sustainability principles and concepts applicable to the proposed work.",
      "Determined the source of products and services to be provided.",
      "Identified the delivery point and methods of transportation.",
      "Planned and sequenced work, including preparatory tasks.",
      "Calculated types and quantities of materials required.",
      "Determined plant and equipment requirements to perform work.",
      "Assessed labor requirements to perform work.",
      "Determined time requirements to perform work.",
      "Calculated sundry costs to perform work.",
      "Estimated the total cost of materials, plant, equipment, sundry costs, and labor according to workplace procedures.",
      "Applied overheads and mark-up percentages to calculate the total work cost.",
      "Produced the final cost for work.",
      "Recorded details of services, costs, and charges according to workplace procedures.",
      "Applied terms, inclusions, and exclusions according to workplace procedures.",
      "Presented quotations according to workplace procedures.",
      "Stored quotations and documentation for future reference according to workplace procedures.",
      "Provided detailed quotations from plans for three varied jobs for a Class 1 building, meeting customer requirements.",
      "Included accurate and industry-realistic estimates and costs for labor, materials, overheads, and timing in quotes and tenders.",
    ],
    CPCPCM4015: [
      "Discussed with relevant authorities to obtain information on plumbing regulatory requirements.",
      "Utilised documentation to understand the scope of work and problems related to plumbing installations.",
      "Adhered to Work Health and Safety (WHS) and Occupational Health and Safety (OHS) requirements during work activities.",
      "Identified and assessed hazards associated with plumbing work and implemented control measures.",
      "Located and downloaded different volumes of the National Construction Code (NCC) to gather regulatory information.",
      "Identified ten (10) Australian Standards referenced in the Plumbing Code of Australia (PCA) and specified the plumbing areas they cover.",
      "Determined the official location to obtain five (5) current versions of Australian Standards referenced in the PCA.",
      "Classified and determined the type of buildings as per the National Construction Code (NCC).",
      "Identified cross-volume considerations in the Plumbing Code of Australia (PCA) and located them within NCC volumes 1 or 2.",
      "Differentiated between Performance Solutions and Deemed to Satisfy (DTS) installations.",
      "Identified and interpreted jurisdictional variations and additions in the National Construction Code (NCC).",
      "Understood the hierarchy of legislation and the relationship between Acts, regulations, codes, and standards.",
      "Demonstrated knowledge of jurisdictional requirements and the application process for a performance solution.",
      "Demonstrated knowledge of jurisdictional requirements and processes to lawfully carry out plumbing and services work.",
      "Understood the WaterMark certification scheme and its relevance to the installation and design of plumbing systems.",
      "Applied compliance knowledge for three provisions related to a metal cladding system on a building: structural, sound transmission, and energy efficiency.",
    ],
    CPCPDR4011: [
      "Discussed with relevant parties (e.g., supervisor) to understand the nature of the sanitary drainage system design problem.",
      "Utilised relevant documentation to determine the scope of work and identified issues associated with the system.",
      "Followed WHS and workplace procedures specific to the design and sizing of sanitary drainage systems.",
      "Applied WHS/OHS requirements for the designated work area.",
      "Identified hazards related to the design and sizing of sanitary drainage systems.",
      "Assessed risks associated with the work.",
      "Implemented control measures to minimize identified hazards and risks.",
      "Processes for trade waste installations.",
      "Characteristics and application of different pipe systems and fittings.",
      "Drawing instruments, sketching techniques, and the use of conventional symbols.",
      "Use of computers and computer-aided design (CAD) software for documentation.",
      "Processes for treating trade waste to acceptable levels for discharge.",
      "Non-gravitational sewage systems.",
      "Properties and characteristics of trade waste applications.",
    ],
    CPCPDR4012: [
      "Consulted relevant documentation or supervisor to understand the nature of the problem with stormwater drainage systems.",
      "Applied WHS/OHS requirements and workplace procedures specific to stormwater drainage system design.",
      "Identified and assessed potential hazards and risks associated with stormwater drainage design work.",
      "Implemented control measures to mitigate identified hazards and risks in stormwater drainage system design.",
      "Understanding the nature of stormwater drainage system problems from documentation or supervisor guidance.",
      "Application of WHS/OHS procedures and workplace protocols related to stormwater drainage design work.",
      "Identification, assessment, and management of hazards and risks pertinent to stormwater drainage system design.",
      "Discussed and understood stormwater drainage system problems from relevant sources.",
      "Adhered to WHS/OHS guidelines and workplace procedures for stormwater drainage design.",
      "Identified and managed potential hazards and risks in stormwater drainage system design work.",
    ],
    CPCPGS4011: [
      "Obtained and interpreted design requirements from plans, specifications, and relevant documentation.",
      "Applied workplace policies, WHS, and environmental requirements effectively.",
      "Selected appropriate tools, equipment, and PPE for the given task.",
      "Determined quantity, location, and types of take-off points and appliances from provided plans and specifications.",
      "Sized consumer gas installations adhering to manufacturer's requirements, Australian Standards, and jurisdictional regulations.",
      "Identified and specified optimal materials required for the proposed design.",
      "Produced final system layout plans meeting relevant drawing design standards.",
      "Applied work health and safety procedures, including hazard identification, risk assessment, and implementing control measures.",
      "Demonstrated understanding of hazards, risks, and control measures in a workplace context.",
      "Utilized drawing instruments, sketching techniques, and CAD software effectively.",
      "Acknowledged the impact of ventilation on design and installation.",
      "Exhibited knowledge of gas piping materials, joining techniques, standards, and limitations.",
      "Displayed familiarity with codes, standards, tools, and equipment used in gas installations.",
      "Comprehended the properties of gas, gas safety, combustion principles, pressure, and megajoule rates.",
    ],
    CPCPSN4011: [
      "Accessed and interpreted relevant documentation for sanitary system design.",
      "Applied workplace, WHS, and environmental requirements to design practices.",
      "Determined quantity, fixture locations, and legal discharge points as per requirements.",
      "Designed and sized system layout following relevant standards and instructions.",
      "Identified optimal material requirements based on the proposed design.",
      "Produced final layout plans adhering to drawing design standards.",
      "Demonstrated knowledge of relevant regulations, materials, systems, drawing tools, and WHS requirements for designing sanitary plumbing systems.",
    ],
    CPCPWT4011: [
      "Discussed with relevant personnel to understand the scope and nature of water system requirements for the project.",
      "Utilized documentation to determine system requirements, adhering to Australian Standards, codes, and manufacturer instructions.",
      "Applied workplace, work health, safety (WHS), and environmental requirements in designing water systems for residential and commercial buildings.",
      "Identified quantity, location, and fixture connection points based on project specifications.",
      "Designed and sized water system layouts in accordance with manufacturer instructions, Australian Standards, and jurisdictional requirements.",
      "Specified optimal material requirements based on the proposed design.",
      "Produced final system layout plans conforming to relevant drawing design standards.",
      "Demonstrated the ability to design and document water system layouts for both commercial and residential buildings with specific fixtures on each floor level as outlined in the unit.",
      "Knowledgeably described the process of designing and sizing heated, tempered, and cold-water systems.",
      "Displayed understanding of water properties, pressure, flow rates, and different system requirements for various building types.",
      "Appreciated the use of tools, materials, equipment, and computer-aided design software in designing water systems.",
      "Applied work health and safety (WHS) requirements relevant to designing and sizing heated and cold-water services.",
    ],
    BSBESB403: [
      "Discussed with relevant stakeholders to obtain information on financial requirements and profit targets for the business venture.",
      "Utilised documentation such as business plans and financial reports to understand the scope of financial planning work.",
      "Followed Workplace Health and Safety (WHS)/Occupational Health and Safety (OHS) requirements and workplace procedures throughout the financial planning process.",
      "Identified and documented costs associated with production and delivery of products/services.",
      "Set profit targets in alignment with business venture requirements and workplace procedures.",
      "Calculated prices based on costs and profit targets, considering charge-out rates for labor or unit prices for products/services.",
      "Calculated the break-even sales point to assess the viability of the business venture.",
      "Evaluated and selected pricing strategies based on market conditions to meet profit targets.",
      "Prepared a projected profit statement as part of the overall business plan.",
      "Identified working capital requirements necessary to attain profit projections.",
      "Identified non-current asset requirements and considered alternative asset management strategies.",
      "Prepared cash flow projections to facilitate business operation as outlined in the business plan and legal requirements.",
      "Accurately identified capital investment requirements for each operational period.",
      "Selected budget targets for ongoing monitoring of financial performance.",
      "Identified start-up and ongoing financial requirements according to the financial plan and budget.",
      "Identified sources of finance for required liquidity based on business goals and objectives.",
      "Researched and assessed the cost of securing finance on optimal terms.",
      "Developed strategies to obtain finance as required to ensure the financial viability of the business venture.",
    ],
    CPCCBC4002: [
      "Evaluate construction site safety and identify potential risk areas.",
      "Assess on-site worker's health and safety.",
      "Identify hazards and determine control measures complying with legislative requirements and organisational policies.",
      "Consult with workers and WHS experts, contribute to an inspection report.",
      "Complete a workplace inspection report with recommended actions.",
      "Establish a workplace safety plan using information from the inspection report.",
      "Implement processes to identify hazards, rate risks, and put control measures in place.",
      "Establish educational programs for building and construction workplace safety.",
      "Negotiate and resolve safety issues and conflicts.",
      "Monitor and audit workplace safety for compliance with WHS regulations.",
      "Record findings, recommend and implement actions for non-compliance.",
      "Review effectiveness of educational programs.",
      "Monitor, review, and document effectiveness of control measures.",
      "Accessing and interpreting relevant WHS legislation and regulations.",
      "Identifying faults, problems, and non-compliances, and their impact on workplace safety.",
      "Introducing safety systems for reporting safety issues, controlling hazards, and maintaining worker safety and competence.",
      "Assessors must meet the requirements for assessors as per the Standards for Registered Training Organizations.",
      "Assessment can be undertaken in the workplace or in a simulated workplace environment.",
      "Candidates must have access to relevant legislation, safety codes, organizational policies, workplace incident data, and digital devices for research and communication.",
    ],
    CPCCBC4024: [
      "Discussed with relevant parties to identify dispute issues, causes, and persons involved.",
      "Analyzed contractual arrangements, agreements, and relevant legislation.",
      "Identified risks and prepared contingency strategies.",
      "Obtained advice from senior managers and professionals to develop a dispute resolution strategy.",
      "Followed dispute resolution procedures.",
      "Secured agreement for the procedure from all parties.",
      "Interviewed concerned parties individually to clarify reasons for the dispute, issues, and desired outcomes.",
      "Conducted inspections of work in dispute to determine compliance with requirements.",
      "Developed solutions based on interviews and inspections to optimize the likelihood of a favorable outcome.",
      "Offered recommended solutions to resolve the dispute equitably.",
      "Advised parties of legal processes if resolution did not occur.",
      "Recorded and maintained dispute process, information, and outcomes.",
      "Identified and detailed processes to consult with external arbitrators or conciliators when disputes cannot be resolved internally.",
      "Implemented procedures to settle disputes promptly following statutory law, professional, and organizational requirements.",
      "Communicated with relevant parties to ensure client satisfaction or follow-up actions.",
    ],
    CPCPCM2043: [
      "Reviewed and understood workplace induction procedures.",
      "Located emergency equipment and understood current workplace emergency and evacuation procedures.",
      "Recognized and implemented safe work practices for preparing and conducting work processes.",
      "Chose appropriate personal protective equipment for the job and used it correctly.",
      "Selected tools and equipment according to safe work requirements, checked their serviceability, and reported faults.",
      "Set up required barricades, hoardings, and signage at job locations where needed.",
      "Applied relevant safety data sheets (SDSs), job safety analyses (JSAs), safe work method statements (SWMSs), and standard operating procedures (SOPs).",
      "Identified, assessed, and reported hazards in the work area and communicated safety risks based on these hazards.",
      "Participated in creating WHS, hazard, accident, or incident reports in accordance with workplace procedures.",
      "Identified and followed procedures for handling hazardous materials on work sites.",
      "Applied effective measures for controlling risks and construction hazards.",
      "Employed appropriate signs and symbols to secure hazardous materials with safety implications.",
      "Performed tasks safely, ensuring the safety of operators, other personnel, and the community.",
      "Employed tools, plant, and equipment according to manufacturers' specifications and worksite regulations.",
      "Adhered to the requirements of work site safety signs and symbols.",
      "Cleared and maintained the work site area to prevent incidents and comply with environmental requirements.",
      "Executed workplace emergency procedures when necessary.",
    ],
    UEERL0004: [
      "Discussed with supervisor to obtain information about the machine problem.",
      "Utilised relevant documentation to understand the scope of work and machine issues.",
      "Followed WHS/OHS and workplace procedures for the assigned work area.",
      "Identified and applied WHS/OHS requirements, including hazard identification, risk assessment, and control measures.",
      "Identified hazards associated with the work.",
      "Assessed risks related to the work.",
      "Implemented control measures to minimize identified hazards and risks.",
    ],
  };

  const goToNextStep = () => {
    if (currentStep < units.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Reusable component for competency assessment table
  const CompetencyTable = ({ unitId, questions }) => {
    const [responses, setResponses] = useState(
      questions.map(() => ({ level: null, justification: "" }))
    );
    const tableHeaderRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (tableHeaderRef.current) {
          const headerRect = tableHeaderRef.current.getBoundingClientRect();
          setIsSticky(headerRect.top <= 0);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    const handleResponseChange = (index, level) => {
      const newResponses = [...responses];
      newResponses[index] = { ...newResponses[index], level };
      setResponses(newResponses);
    };

    const handleJustificationChange = (index, justification) => {
      const newResponses = [...responses];
      newResponses[index] = { ...newResponses[index], justification };
      setResponses(newResponses);
    };

    const countResponses = (level) => {
      return responses.filter((response) => response.level === level).length;
    };

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-sm">
          <thead
            ref={tableHeaderRef}
            style={isSticky ? stickyHeaderStyles : {}}
          >
            <tr className="bg-emerald-50">
              <th className="py-2 px-2 md:px-4 border text-left w-full md:w-1/2 text-emerald-700 text-sm md:text-base">
                Required experience and knowledge
              </th>
              <th
                className="py-2 px-2 md:px-4 border text-center text-emerald-700 text-sm md:text-base"
                colSpan="3"
              >
                I have performed these tasks.
              </th>
              <th className="py-2 px-2 md:px-4 border text-center w-full md:w-1/4 text-emerald-700 text-sm md:text-base">
                Documents for justification
              </th>
            </tr>
            <tr className="bg-emerald-50/50">
              <th className="py-2 px-2 md:px-4 border"></th>
              <th className="py-2 px-2 md:px-4 border text-center text-sm md:text-base">
                Never
              </th>
              <th className="py-2 px-2 md:px-4 border text-center text-sm md:text-base">
                Sometimes
              </th>
              <th className="py-2 px-2 md:px-4 border text-center text-sm md:text-base">
                Regularly
              </th>
              <th className="py-2 px-2 md:px-4 border"></th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-2 px-2 md:px-4 border text-sm md:text-base">
                  {question}
                </td>
                <td className="py-2 px-2 md:px-4 border text-center">
                  <input
                    type="radio"
                    name={`q${unitId}_${index}`}
                    checked={responses[index].level === "never"}
                    onChange={() => handleResponseChange(index, "never")}
                    className="form-radio h-4 w-4 text-emerald-600"
                  />
                </td>
                <td className="py-2 px-2 md:px-4 border text-center">
                  <input
                    type="radio"
                    name={`q${unitId}_${index}`}
                    checked={responses[index].level === "sometimes"}
                    onChange={() => handleResponseChange(index, "sometimes")}
                    className="form-radio h-4 w-4 text-emerald-600"
                  />
                </td>
                <td className="py-2 px-2 md:px-4 border text-center">
                  <input
                    type="radio"
                    name={`q${unitId}_${index}`}
                    checked={responses[index].level === "regularly"}
                    onChange={() => handleResponseChange(index, "regularly")}
                    className="form-radio h-4 w-4 text-emerald-600"
                  />
                </td>
                <td className="py-2 px-2 md:px-4 border">
                  <input
                    type="text"
                    className="w-full border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
                    value={responses[index].justification}
                    onChange={(e) =>
                      handleJustificationChange(index, e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
            <tr className="bg-emerald-50 font-semibold">
              <td className="py-2 px-2 md:px-4 border text-emerald-700 text-sm md:text-base">
                TOTALS:
              </td>
              <td className="py-2 px-2 md:px-4 border text-center text-sm md:text-base">
                NEVER {countResponses("never")}/{questions.length}
              </td>
              <td className="py-2 px-2 md:px-4 border text-center text-sm md:text-base">
                SOMETIMES {countResponses("sometimes")}/{questions.length}
              </td>
              <td className="py-2 px-2 md:px-4 border text-center text-sm md:text-base">
                REGULARLY {countResponses("regularly")}/{questions.length}
              </td>
              <td className="py-2 px-2 md:px-4 border"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  // Progress bar component
  const ProgressBar = () => {
    const progress = (currentStep / (units.length - 1)) * 100;

    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  // Introduction step component
  const IntroductionStep = () => (
    <div>
      <h3 className="text-xl font-semibold text-emerald-700 mb-4">
        Self-Assessment Information
      </h3>
      <p className="mb-4 text-gray-600">
        By conducting a thorough and honest self-assessment, learners can
        present a comprehensive case for their competence during the RPL
        process. It helps align their skills and knowledge with the required
        competency standards and provides a foundation for further assessment
        and validation by qualified assessors.
      </p>

      <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold mb-2 text-emerald-700">
          Purpose of the document
        </h4>
        <p className="pl-4">
          This document aims to facilitate effective communication between you
          and your assessor regarding your self-assessment against the unit of
          competency requirements. It has been designed to be user-friendly and
          supportive, offering a convenient summary of the unit of competency
          under assessment. While completing this document is not obligatory for
          the commencement of your RPL assessment, it can serve as a valuable
          resource to enhance your understanding of the assessment expectations
          and provide clarity during the assessment process.
        </p>
      </div>

      <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold mb-2 text-emerald-700">
          What is self-assessment?
        </h4>
        <p className="pl-4">
          Self-assessment is the process where learners evaluate and provide
          evidence of their existing skills and knowledge against the competency
          standards required for a particular qualification or unit of
          competency.
        </p>
        <p className="pl-4 mt-2">
          Learners often have significant industry experience or prior learning
          that can be considered for credit towards a qualification.
          Self-assessment allows learners to reflect on their skills and
          knowledge, gather evidence, and make judgments about their competency
          in relation to the requirements of the qualification.
        </p>
      </div>

      <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold mb-2 text-emerald-700">
          Why conduct a self-assessment?
        </h4>
        <p className="pl-4">
          Conducting a self-assessment as part of the Recognition of Prior
          Learning (RPL) process in the Vocational Education and Training (VET)
          sector serves several purposes. Here are some reasons why
          self-assessment is important in the context of RPL:
        </p>

        <div className="pl-4 mt-4">
          <h5 className="font-semibold text-emerald-700">Self-reflection</h5>
          <p>
            Self-assessment allows learners to reflect on their existing skills,
            knowledge, and experience in relation to the competency requirements
            of a particular qualification or unit of competency. It encourages
            learners to consider their strengths and areas for improvement,
            promoting self-awareness and self-directed learning.
          </p>
        </div>

        <div className="pl-4 mt-4">
          <h5 className="font-semibold text-emerald-700">Evidence gathering</h5>
          <p>
            Self-assessment helps learners identify and gather evidence that
            demonstrates their competency. By critically evaluating their skills
            and knowledge, learners can determine which evidence is most
            relevant and suitable for supporting their claims of competence.
          </p>
        </div>

        <div className="pl-4 mt-4">
          <h5 className="font-semibold text-emerald-700">
            Empowerment and engagement
          </h5>
          <p>
            Self-assessment empowers learners to participate in the RPL process
            actively. It encourages them to recognise their capabilities and
            achievements, fostering a sense of ownership and engagement in their
            learning journey.
          </p>
        </div>

        <div className="pl-4 mt-4">
          <h5 className="font-semibold text-emerald-700">
            Targeted learning and gap identification
          </h5>
          <p>
            Through self-assessment, learners can identify gaps or areas where
            their skills or knowledge may not meet the required competency
            standards. This insight enables them to focus their learning efforts
            on areas that require further development or acquisition of new
            knowledge.
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-emerald-700 mb-4">
        Self-Assessment Processes
      </h3>
      <p className="mb-4 text-gray-600">
        Self-assessment allows you to evaluate your skills and knowledge based
        on past experiences. Follow the steps below:
      </p>
      <p className="mb-4 bg-yellow-50 p-4 border border-yellow-200 rounded-md italic text-gray-700">
        (Note: If you tick "Regularly" for more than half of the questions, it
        indicates that you frequently perform the tasks related to the unit. In
        such cases, you should consider undertaking the RPL process. If you tick
        "Sometimes" for more than half of the questions, it suggests that you
        occasionally perform the tasks related to the unit. In such cases, it is
        recommended that you contact the Training Department at the Registered
        Training Organisation (RTO) to discuss your situation further. If you
        tick "Never" for more than half of the questions, it indicates that you
        have not performed the tasks related to the unit. In such cases, you
        should consider an alternative learning pathway, such as completing the
        course at the RTO or gap training. You may also contact the Student and
        Welfare Support Coordinator to discuss your options.)
      </p>

      <div className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold mb-2 text-emerald-700">
          Step 1: Checklist
        </h4>
        <ul className="list-disc pl-8">
          <li>
            Review the provided checklist, which outlines the skills and
            competencies required for the specified unit of competency.
          </li>
          <li>
            For each item on the checklist, select one of the following options
            that best reflects your level of experience:
            <ul className="list-disc pl-8 mt-2">
              <li>
                <strong>Regularly:</strong> You frequently perform the task or
                possess the required competency.
              </li>
              <li>
                <strong>Sometimes:</strong> You occasionally perform the task or
                have some level of competency.
              </li>
              <li>
                <strong>Never:</strong> You do not perform the task or lack the
                required competency.
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold mb-2 text-emerald-700">
          Step 2: Evidence Collection
        </h4>
        <ul className="list-disc pl-8">
          <li>
            Based on your self-assessment, gather evidence that supports your
            claims of possessing the skills and competencies indicated as
            "Regularly" or "Sometimes" in the checklist.
          </li>
          <li>
            Add the document name in the table (Self-assessment recording tool)
            justifying your claim
          </li>
          <li>
            Examples of evidence may include workplace documents, work samples,
            qualifications, licenses, testimonials, or any other relevant
            supporting materials.
          </li>
          <li>
            Organise your evidence clearly and logically, labelling each piece
            to indicate which skill or competency it supports.
          </li>
        </ul>
      </div>

      <div className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold mb-2 text-emerald-700">
          Step 3: Submitting your Response
        </h4>
        <ul className="list-disc pl-8">
          <li>
            Once you have completed the self-assessment checklist and gathered
            the corresponding evidence, submit your responses and evidence to
            the assigned assessor.
          </li>
          <li>
            Provide a clear and comprehensive overview of your self-assessment,
            indicating the skills and competencies you believe you possess based
            on your past experiences.
          </li>
          <li>
            Ensure your evidence is reliable and linked to the indicated skills
            and competencies.
          </li>
        </ul>
      </div>

      <div className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold mb-2 text-emerald-700">
          Step 4: Assessor Review
        </h4>
        <ul className="list-disc pl-8">
          <li>
            The assessor will review your self-assessment responses and examine
            the evidence you provided.
          </li>
          <li>
            Based on their evaluation, the assessor will determine whether you
            are eligible for RPL (Recognition of Prior Learning) or if there are
            gaps in your skills and knowledge that require further training (gap
            training).
          </li>
        </ul>
      </div>

      <p className="mb-4 text-gray-600">
        The assessor will guide you throughout the process, offering support and
        feedback. It is important to be honest, and provide accurate information
        during the self-assessment. Remember, the quality and relevance of your
        evidence are crucial for a successful RPL assessment.
      </p>
      <p className="mb-4 text-gray-600">
        If you have questions or need clarification, contact your assigned
        assessor or the RPL coordinator for assistance.
      </p>
    </div>
  );

  // Generic competency form component
  const GenericCompetencyForm = ({ unit }) => {
    const questions = unitQuestions[unit.id] || [];

    return (
      <div>
        <h3 className="text-xl font-semibold text-emerald-700 mb-4">
          Self-assessment recording tool for CPC40920 Certificate IV in Plumbing
          and Services (Hydraulic Services Design)
        </h3>

        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-4 text-emerald-700">
            Unit of competency: {unit.id} - {unit.title}
          </h4>
          <p className="italic mb-4 text-gray-600">
            The full text of the units can be viewed at{" "}
            <a
              href="http://www.training.gov.au"
              className="text-emerald-600 underline"
            >
              www.training.gov.au
            </a>
          </p>

          {questions.length > 0 ? (
            <CompetencyTable unitId={unit.id} questions={questions} />
          ) : (
            <p className="text-center py-4 bg-gray-100 rounded-md">
              No assessment criteria available for this unit.
            </p>
          )}
        </div>
      </div>
    );
  };

  // Final assessment page component
  const FinalAssessmentPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
      setIsSubmitted(true);
    };

    if (isSubmitted) {
      return <FormSubmitted />;
    }

    return (
      <div>
        <h3 className="text-xl font-semibold text-emerald-700 mb-4">
          After Completion of the Self-assessment
        </h3>
        <p className="mb-4 text-gray-600">
          After completing the self-assessment checklist, you can provide
          additional evidence to support the claims you made during the
          self-assessment process. This evidence should correspond to the skills
          and knowledge you identified as possessing.
        </p>
        <p className="mb-4 text-gray-600">
          Please gather any relevant evidence you did not provide during the
          initial form submission, but that aligns with the skills and knowledge
          you claimed in the self-assessment checklist. This evidence may
          include workplace documents, work samples, qualifications, licenses,
          testimonials, or other supporting materials.
        </p>
        <p className="mb-4 text-gray-600">
          Ensure your evidence is valid, reliable, and directly linked to the
          skills and knowledge you identified in the self-assessment. It should
          demonstrate your competency in those areas.
        </p>
        <p className="mb-4 text-gray-600">
          Compile your evidence organised, labelling each piece to indicate
          which skill or competency it supports.
        </p>
        <p className="mb-4 text-gray-600">
          Once you have gathered and organised your evidence, please submit it
          to the assigned assessor for review. The assessor will consider this
          additional evidence alongside your self-assessment checklist to
          accurately assess your skills and knowledge.
        </p>
        <p className="mb-4 text-gray-600">
          Your evidence will validate your claims and support your case for
          Recognition of Prior Learning (RPL).
        </p>
        <p className="mb-4 text-gray-600">
          If you have any questions or need guidance on the appropriate evidence
          types, reach out to your assigned assessor or the RPL coordinator for
          assistance.
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Submit Assessment
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl my-8 md:my-16 mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl md:text-2xl text-center font-bold text-emerald-700 mb-2 md:mb-4">
        CPC40920 Certificate IV in Plumbing and Services (Operations)
      </h1>
      <h2 className="text-lg md:text-xl text-center font-semibold text-emerald-600 mb-4">
        Step 2: RPL Self-Assessment Information Kit
      </h2>

      <ProgressBar />

      <div className="flex justify-between mb-4 text-gray-600">
        <span className="text-sm">
          Step {currentStep + 1} of {units.length}
        </span>
        <span className="text-sm font-medium">{units[currentStep].title}</span>
      </div>

      {currentStep === 1 && (
        <div className="bg-white p-4 md:p-6 rounded-lg mb-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-emerald-700 mb-4">
            Candidate Information
          </h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Candidate's name:
              </label>
              <input
                type="text"
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Date completed:
              </label>
              <input
                type="date"
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={dateCompleted}
                onChange={(e) => setDateCompleted(e.target.value)}
                placeholder="dd/mm/yyyy"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Venue:
              </label>
              <input
                type="text"
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Enter venue location"
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 p-4 md:p-6 rounded-lg mb-6 shadow-sm">
        {currentStep === 0 && <IntroductionStep />}
        {currentStep === units.length - 1 && <FinalAssessmentPage />}
        {currentStep > 0 && currentStep < units.length - 1 && (
          <GenericCompetencyForm unit={units[currentStep]} />
        )}
      </div>

      {currentStep !== units.length - 1 && (
        <div className="flex justify-between">
          <button
            onClick={goToPreviousStep}
            disabled={currentStep === 0}
            className={`px-3 md:px-4 py-2 rounded-md flex items-center text-sm md:text-base ${
              currentStep === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Previous
          </button>
          <button
            onClick={goToNextStep}
            disabled={currentStep === units.length - 1}
            className={`px-3 md:px-4 py-2 rounded-md flex items-center text-sm md:text-base ${
              currentStep === units.length - 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5 ml-1 md:ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
