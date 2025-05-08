"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ======================
// Data Configuration
// ======================
const initialUnits = [
  {
    code: "BSBESB402",
    name: "Establish Legal and Risk Management Requirements of New Business Ventures",
    tasks: [
      "Student successfully identified the legal structure of the proposed business using reliable sources.",
      "Student analysed legislative and regulatory requirements applicable to the identified legal structure.",
      "Student developed and implemented procedures to ensure compliance with relevant legislative and regulatory requirements.",
      "Student established processes for storing and maintaining legal documents and business records.",
      "Student established systems to identify areas of non-compliance and developed corrective action plans where necessary.",
      "Student demonstrated effective communication skills in discussing legal and risk management requirements.",
      "Student collaborated with stakeholders, such as supervisors or team members, to gather information and insights.",
      "Student documented legal and risk management processes accurately and comprehensively.",
      "Student adhered to workplace procedures throughout the process.",
      "Student demonstrated attention to detail in analyzing and addressing legal and risk management requirements.",
      "Student assessed products or services to determine procurement rights and ensure business interest protection.",
      "Student successfully negotiated and secured contractual procurement rights according to the business plan and workplace procedures.",
      "Student completed contractual arrangements following workplace procedures and the business plan.",
      "Student sought legal advice if required to confirm contractual rights and obligations.",
      "Student demonstrated effective communication skills during the negotiation process.",
      "Student documented the entire contractual process, highlighting key terms and conditions.",
      "Student applied an understanding of the business plan in the negotiation and contracting process.",
      "Student ensured the protection of business interests throughout the contractual process.",
      "Student adhered to workplace procedures during the negotiation and contracting process.",
      "Student demonstrated attention to legal compliance in creating the contract.",
      "Student effectively analysed business activities to identify applicable risk management requirements.",
      "Student assessed the probability and impact of at least three different internal and external risks to the business.",
      "Student developed a comprehensive plan to prioritize and treat identified risks.",
      "Student successfully implemented procedures to mitigate risks according to the risk treatment plan.",
      "Student clearly communicated the steps taken in prioritizing and treating risks.",
      "Student identified internal risks specific to the business or new business venture.",
      "Student identified external risks specific to the business or new business venture.",
      "Student documented the outcomes of the risk assessment and mitigation efforts.",
      "Student adhered to the risk management plan throughout the risk assessment and treatment process.",
      "Student reflected on the outcomes of the risk assessment and mitigation efforts.",
    ],
  },
  {
    code: "CPCCBC4012",
    name: "Read and Interpret Plans and Specifications",
    tasks: [
      "Student effectively identified the orientation of structures on the site plan.",
      "Student accurately recognised and interpreted site contours from the plans.",
      "Student successfully identified datum and reduced levels as indicated on the architectural and structural plans.",
      "Student conducted a thorough examination of key features to be removed or retained on the site.",
      "Student prepared a comprehensive report summarizing findings and recommendations based on the identified features.",
      "Observations and findings were clearly documented by the student.",
      "Student demonstrated attention to detail in interpreting annotations on the plans.",
      "Recommendations for retaining or removing site features were communicated concisely.",
      "Student demonstrated skills in estimating the impact of identified features on the construction process.",
      "The practical task observations aligned with the performance criteria related to identifying orientation and site features.",
      "Student accurately identified load-bearing elements such as columns, beams, and walls on the structural plans.",
      "Student conducted a thorough comparison of identified load-bearing elements with the specifications.",
      "Student successfully identified areas of compliance and discrepancies between the plans and specifications.",
      "Cross-referencing between plans and specifications was effectively carried out by the student.",
      "Findings, including compliance and discrepancies, were clearly documented by the student.",
      "Observations indicated alignment with construction standards and codes.",
      "Student demonstrated attention to detail in documenting load-bearing information.",
      "The student presented a logical report highlighting compliance and any necessary recommendations.",
      "Communication of identified load-bearing elements demonstrated clarity.",
      "The practical task observations aligned with the performance criteria related to identifying structural load-bearing information.",
      "Student accurately identified locations specified for wind bracing on the plans.",
      "Student conducted a thorough cross-referencing of specified wind bracing materials and tie-down methods with the wind bracing table.",
      "Verification process demonstrated accuracy in checking wind bracing materials and tie-down methods.",
      "Observations and findings were clearly documented by the student.",
      "Student demonstrated attention to details related to wind bracing specifications.",
      "Recommendations for accuracy were effectively communicated in the report.",
      "Observations indicated alignment with wind bracing standards and requirements.",
      "The student presented a logical report highlighting the verification process and any necessary recommendations.",
      "Observations provided evidence of supervisory skills in verifying construction elements.",
      "The practical task observations aligned with the performance criteria related to checking wind bracing materials and tie-down methods.",
    ],
  },
  {
    code: "CPCPCM4011",
    name: "Carry Out Work-Based Risk Control Processes",
    tasks: [
      "Successfully identified potential hazards associated with plumbing and services work.",
      "Demonstrated effective skills in assessing risks related to the identified hazards.",
      "Proposed appropriate and practical control measures for each identified risk.",
      "Ensured compliance with work health and safety (WHS) regulations during the risk assessment.",
      "Accurately documented the risk assessment process, including identified risks and control measures.",
      "Clearly considered the scope of work while conducting the risk assessment.",
      "Communicated findings effectively, ensuring a clear understanding of the identified risks and control measures.",
      "Followed workplace procedures and regulatory requirements throughout the risk assessment.",
      "Demonstrated thoroughness in examining site conditions and functions for potential hazards.",
      "Applied knowledge of risk management theory and terminology in the practical context.",
      "Produced well-organized and comprehensive documentation of the risk management process.",
      "Included relevant evaluation criteria in the documented risk management process.",
      "Clearly articulated strategies for mitigating identified risks in the documentation.",
      "Ensured alignment with workplace procedures and regulatory requirements in the documentation.",
      "Communicated the risk management process findings clearly for easy interpretation.",
      "Addressed the entire risk management process, from risk identification to control measures.",
      "Demonstrated compliance with relevant authorities' requirements in the documentation.",
      "Provided evidence of thorough evaluation of identified risks and potential consequences.",
      "Structured the documentation logically, facilitating easy understanding.",
      "Demonstrated attention to detail in documenting and evaluating the risk management process.",
      "Successfully located relevant information, including codes and standards.",
      "Demonstrated effective interpretation of obtained information in the context of plumbing and services.",
      "Applied the retrieved information effectively to the specific context of work-based risk control processes.",
      "Ensured compliance with regulatory requirements and industry standards in the application of information.",
      "Applied information that was directly relevant to the requirements of the practical task.",
      "Efficiently extracted pertinent information for use in risk assessment and management.",
      "Applied knowledge of tools, materials, and equipment used in work-based risk control processes.",
      "Ensured that the application of information aligned with workplace procedures.",
      "Demonstrated discernment in selecting appropriate sources of information.",
      "Provided clear evidence of compliance with codes, standards, and other relevant documentation.",
      "Applied knowledge of work health and safety (WHS) regulations and legislation in plumbing tasks.",
      "Implemented appropriate safety measures in line with WHS regulations.",
      "Demonstrated effective use of personal protective equipment (PPE) where required.",
      "Ensured and maintained a safe working environment throughout the practical task.",
      "Documented instances where WHS regulations and legislation were actively considered and followed.",
      "Effectively identified potential risks to health and safety during plumbing operations.",
      "Responded appropriately to identified risks, considering WHS regulations.",
      "Ensured actions aligned with Commonwealth, state, and territory legislation applicable to workplace operations.",
      "Communicated safety measures effectively to relevant individuals.",
      "Demonstrated thorough compliance with WHS regulations and legislation in all aspects of the task.",
      "Successfully identified work health and safety (WHS) duty holders relevant to plumbing and services work.",
      "Demonstrated an understanding of the respective duties of various WHS duty holders.",
      "Clearly outlined the responsibilities of employers in the context of WHS.",
      "Clearly articulated the duties and responsibilities of employees in relation to WHS.",
      "Accurately described the duties and obligations of contractors regarding WHS.",
      "Effectively communicated the duties of WHS duty holders to others in the workplace.",
      "Ensured that the description of duties aligned with WHS legislation.",
      "Applied knowledge of WHS duty holders and their duties in the plumbing and services context.",
      "Documented the identified duties of WHS duty holders accurately.",
      "Presented information on WHS duty holders and their duties in a clear and organized manner.",
      "Demonstrated effective skills in developing a risk control policy and procedure.",
      "Ensured that the policy and procedure aligned with the findings of the risk control review process.",
      "Clearly outlined the steps involved in risk control within the developed policy and procedure.",
      "Clearly articulated the responsibilities of individuals in the risk control process.",
      "Identified and described appropriate communication methods to inform associated persons of control measures.",
      "Ensured alignment with workplace procedures and regulatory requirements in the developed policy and procedure.",
      "Documented the risk control policy and procedure thoroughly, leaving no critical aspects unaddressed.",
      "Integrated relevant standards into the policy and procedure.",
      "Ensured compliance with regulatory authorities' requirements in the developed policy and procedure.",
      "Clearly communicated the findings of the risk control review process within the developed policy and procedure.",
    ],
  },
  {
    code: "CPCPCM4012",
    name: "Estimate and Cost Work",
    tasks: [
      "Correctly assembled columns, beams, and braces.",
      "Proper use of structural bolts, nuts, washers, purlins, and girts.",
      "Beams installed at a minimum height of 4 m.",
      "Established a suitable access and working platform (e.g., elevated work platform, mobile scaffold, scissor lift, or ladder).",
      "Ensured stability during erection and dismantling.",
      "Implemented temporary bracing as required.",
      "Correct use of hand tools.",
      "Proper utilization of working-at-height safety equipment (harness, lanyard, and inertia reel).",
      "Packed and plumbed the structure correctly.",
      "Adhered to workplace and manufacturer requirements throughout the process.",
      "Demonstrated adherence to safety measures and guidelines.",
      "Effectively communicated with relevant persons during the task.",
      "Maintained relevant documentation, including SWMSs and equipment service records.",
      "Installed three retaining wall panels correctly.",
      "Ensured each panel is not less than 4 m high by 2 m wide.",
      "Confirmed that each panel weighs not less than 1.5 tonnes.",
      "Set one panel at a 90-degree angle to another.",
      "Identified and addressed any defective lifting equipment during the process.",
      "Adhered to safety measures and guidelines.",
      "Effectively communicated with relevant persons during the task.",
      "Maintained relevant documentation, including SWMSs and equipment service records.",
      "Conducted a risk assessment related to panel installation.",
      "Adhered to workplace and manufacturer requirements throughout the process.",
      "Installed the safety net with minimum dimensions of 3 m x 4 m.",
      "Ensured compliance with manufacturer specifications and engineering details.",
      "Identified and addressed any defective nets during installation and removal.",
      "Adhered to safety measures and guidelines.",
      "Effectively communicated with relevant persons during the task.",
      "Maintained relevant documentation, including SWMSs and equipment service records.",
      "Conducted a risk assessment related to safety net installation.",
    ],
  },
  {
    code: "CPCPCM4015",
    name: "Access and Interpret Regulatory Requirements for the Plumbing and Services Industry",
    tasks: [
      "Student demonstrated the ability to find and download each volume of the National Construction Code (NCC).",
      "Student accurately identified and documented distinctive features of each NCC volume.",
      "Student ensured that they downloaded the most recent versions of the NCC volumes.",
      "Student provided clear documentation of the steps taken during the download and identification process.",
      "Student discussed any challenges encountered during the download and identification, showing problem-solving skills.",
      "Student demonstrated an understanding of the hierarchical relationship of legislation, Acts, regulations, codes, and standards.",
      "Student discussed how this knowledge is critical in ensuring compliance with plumbing regulatory requirements.",
      "Student explained how the knowledge gained is integrated into the planning of work activities.",
      "Student used correct terminology related to plumbing and services industry regulations.",
      "Student communicated their process and understanding clearly, demonstrating effective articulation.",
      "Student successfully identified ten Australian Standards referenced in the Plumbing Code of Australia (PCA).",
      "Student provided a brief yet detailed description of each standard's focus and its relevance.",
      "Student included information on how standards cover jurisdictional variations and additions.",
      "Student effectively explained how these standards impact their work in the plumbing and services industry.",
      "Student reflected on instances where they applied knowledge from these standards in professional experience.",
      "Student demonstrated an understanding of the difference between Performance Solutions and Deemed to Satisfy installations.",
      "Student used correct terminology related to standards, plumbing, and regulatory compliance.",
      "Student explained how the knowledge from standards influenced decision-making in plumbing installations.",
      "Student provided practical examples of applying knowledge from standards in real-world scenarios.",
      "Student communicated their understanding and experiences clearly, demonstrating effective articulation.",
      "Student accurately determined the official locations to obtain five current versions of Australian Standards.",
      "Student provided clear documentation of the sources, websites, or platforms used to access Australian Standards.",
      "Student outlined any subscription requirements for accessing Australian Standards.",
      "Student discussed any challenges encountered during the access process, demonstrating problem-solving skills.",
      "Student demonstrated an understanding of jurisdictional documentation requirements for Performance Solutions and Deemed to Satisfy installations.",
      "Student explained how knowledge of jurisdictional requirements influenced the access process.",
      "Student discussed how understanding jurisdictional requirements is crucial in ensuring compliance.",
      "Student used correct terminology related to Australian Standards, plumbing, and regulatory compliance.",
      "Student communicated their access process and understanding clearly, demonstrating effective articulation.",
      "Student followed instructions accurately, completing the task according to specified requirements.",
      "Student accurately determined classes and types of buildings referenced in the National Construction Code (NCC).",
      "Student thoroughly examined and identified the criteria used for classifying buildings.",
      "Student provided clear examples of different classes and types of buildings.",
      "Student discussed how this knowledge is essential when applying regulatory requirements in their work.",
      "Student reflected on instances where they had to consider building classification in their professional experience.",
      "Student demonstrated an understanding of the difference between Performance Solutions and Deemed to Satisfy installations.",
      "Student used correct terminology related to building classification and NCC requirements.",
      "Student explained how the knowledge of building classification impacts decision-making in plumbing installations.",
      "Student provided practical examples of applying knowledge of building classification in real-world scenarios.",
      "Student communicated their understanding and experiences clearly, demonstrating effective articulation.",
      "Student accurately identified and documented cross-volume considerations in the Plumbing Code of Australia (PCA).",
      "Student effectively analyzed how these cross-volume considerations impact plumbing and services work.",
      "Student provided a clear summary of the key cross-volume considerations.",
      "Student discussed any challenges they anticipated when navigating cross-volume requirements, demonstrating foresight.",
      "Student demonstrated an understanding of relevant certification requirements for the use of materials and products.",
      "Student explained how knowledge of certification requirements influenced the mapping process.",
      "Student discussed how understanding certification requirements is crucial in ensuring compliance.",
      "Student used correct terminology related to plumbing, certification requirements, and regulatory compliance.",
      "Student communicated their mapping process and understanding clearly, demonstrating effective articulation.",
      "Student followed instructions accurately, completing the task according to specified requirements.",
    ],
  },
  {
    code: "CPCPGS4011",
    name: "Design and Size Consumer Gas Installations",
    tasks: [
      "The student effectively communicated the layout details of the sanitary drainage system for the residential design.",
      "The student demonstrated attention to detail in sizing and laying out the sanitary drainage system for the residential design.",
      "The student ensured the design complied with relevant Australian Standards, codes, and jurisdictional requirements.",
      "The student accurately interpreted architectural plans and specifications to inform the sanitary drainage system design.",
      "The student correctly identified the scope of work for the sanitary drainage system design task.",
      "The student proposed a practical layout for the sanitary drainage system in the residential design.",
      "The student included necessary fixtures and fittings in the sanitary drainage system design.",
      "The student ensured the design accounted for appropriate gradients and venting requirements.",
      "The student utilized appropriate drawing tools and techniques to present the sanitary drainage system design.",
      "The student adhered to workplace policies, work health and safety (WHS), and environmental requirements during the design process.",
    ],
  },
  {
    code: "CPCPWT4011",
    name: "Design and Size Heated and Cold-Water Services and Systems",
    tasks: [
      "Prepared schematic drawings for a multi-floor commercial building design.",
      "Incorporated approved heated/tempered water systems and drinking/non-drinking cold-water systems across all specified floor levels.",
      "Assessed the accuracy and appropriateness of fixture placement and connectivity in the design.",
      "Checked incorporation of essential safety features such as hydrant and hose reel systems in accordance with regulations.",
      "Assessed the completeness and functionality of the design in meeting the outlined requirements.",
      "Observed inclusion and layout of fixtures within the commercial kitchen and the plant room.",
      "Evaluated the design’s alignment with specified requirements for fixture quantity and variety on each floor level.",
      "Checked how well the design accounted for jurisdictional specifications and codes.",
      "Assessed the overall presentation of the design and attention to minute details in the schematic layouts.",
      "Observed incorporation of approved heated/tempered water systems and drinking/non-drinking cold-water systems across all specified floor levels, including the basement.",
    ],
  },
  {
    code: "BSBESB403",
    name: "Plan Finances for New Business Ventures",
    tasks: [
      "Demonstrated ability to identify and articulate financial requirements for the new business venture.",
      "Considered production and delivery costs, aligning with business goals.",
      "Utilized relevant documentation and procedures to gather cost information.",
      "Clearly set profit targets in alignment with business venture requirements.",
      "Calculated prices based on costs and profit targets, specifying charge-out rates or unit prices.",
      "Evaluated and selected pricing strategies based on market conditions.",
      "Calculated break-even sales point to assess the viability of the business venture.",
      "Demonstrated understanding of the relationship between costs, pricing, and profit targets.",
      "Developed financial forecasts to support the business venture’s planning process.",
      "Identified and documented potential financial risks for the business venture.",
      "Proposed strategies to mitigate identified financial risks.",
      "Ensured financial plans aligned with regulatory and compliance requirements.",
      "Demonstrated attention to detail in financial calculations and documentation.",
      "Demonstrated the ability to identify areas for improvement.",
      "Communicated the findings and recommendations clearly and concisely.",
      "Used appropriate terminology related to financial planning.",
    ],
  },
  {
    code: "CPCPDR4013",
    name: "Design and Size Domestic Treatment Plant Disposal Systems",
    tasks: [
      "Accessing, reading, and determining design requirements from plans, specifications, relevant manufacturer’s requirements, Australian Standards, and jurisdictional requirements.",
      "Identifying and applying workplace policies and procedures, work health and safety (WHS) and environmental requirements.",
      "Obtaining and confirming information for a suitable location for the land application area, reserve area and onsite land application of effluent.",
      "Developing and sizing system layouts in accordance with relevant manufacturer’s requirements, Australian standards, and jurisdictional requirements.",
      "Creating and scaling the system design according to the appropriate manufacturer’s specifications, Australian standards, and local regulations.",
      "Utilizing the suggested plan to pinpoint and define the ideal materials needed.",
      "Creating the ultimate system layout blueprints according to the appropriate drawing design guidelines.",
      "Developing ideas and metrics for sewage treatment systems in homes.",
      "Exploring the Attributes and Features of Landscape Application areas.",
      "Identifying scope of work by waste processing method.",
      "Drawing instruments and sketching techniques, including the use of conventional symbols.",
      "Using of computers for documentation.",
    ],
  },
  {
    code: "CPCPRF4011",
    name: "Design and Size Roof Drainage Systems",
    tasks: [
      "Reviewing and interpreting plans, project specifications, pertinent Australian Standards, regulations, manufacturers’ guidelines, and local requirements to ascertain the design and dimensions required for the roof drainage system.",
      "Recognizing and implementing workplace, work health and safety (WHS), and environmental standards.",
      "Creating and configuring system layout to align with pertinent manufacturers’ guidelines, Australian Standards, and local jurisdiction requirements.",
      "Determining roof catchment areas and design flows from rainfall data and current Australian standards.",
      "Determining quantity and size of gutters, sumps, rain heads, overflows and downpipes.",
      "Creating the ultimate plans for the roof drainage system layout in accordance with the applicable drawing design standards.",
      "Sourcing of pertinent information for the design and dimensioning of roof drainage systems.",
      "Understand methods for computing catchment areas and designing flow rates.",
      "Ensure the determination of the quantity and size of gutters, sumps, rain heads, and downpipes aligns with the applicable Australian Standards, plans, and specifications.",
      "Understand environmental needs and sustainability principles, including principles of efficient design.",
      "Possess knowledge of drawing tools and sketching methods, including proficiency in utilizing traditional symbols.",
      "Proficient in utilizing computers and computer-aided design (CAD) software for documentation purposes.",
      "Be familiar with accessing pertinent information, such as codes and standards.",
      "Understand the tools, materials, and equipment necessary for designing, sizing, and documenting the layout of roof drainage systems.",
      "Understand the work health and safety (WHS) regulations related to designing, sizing, and documenting roof drainage system layouts.",
    ],
  },
  {
    code: "CPCPMS4011",
    name: "Design, Size and Lay Out Heating and Cooling Systems",
    tasks: [
      "Accessing, interpreting, and identifying heating and cooling installation needs based on job specifications, pertinent Australian Standards, codes, manufacturer’s specifications, and jurisdictional requirements.",
      "Recognizing and implementing workplace, work health and safety (WHS), and environmental standards.",
      "Determining quantity, location, fixtures and legal points of discharge.",
      "Examine architectural drawings, plans, and specifications to ascertain the heating and cooling needs.",
      "Conduct sizing calculations for air conditioning or small-scale heating systems to meet the necessary heating and cooling demands, as well as to ascertain the needed piping and ductwork.",
      "Creating the ultimate system layout blueprints in accordance with job specifications, applicable Australian Standards, regulations, manufacturer’s specifications, and local requirements.",
      "Understanding the principles, functioning, and traits of heating and cooling systems.",
      "Understanding the features and uses of various fixing and joining techniques and methods.",
      "Understanding the traits and uses of pipe and ducting systems, along with their fittings and fixture supports, including methods for fixing and joining.",
      "Understanding design principles and performance metrics for heating and cooling systems.",
      "Understanding electrical and electronic principles alongside safety protocols.",
      "Understanding the process of designing, sizing, and documenting the layout of heating and cooling systems.",
      "Understanding the characteristics of water and air, such as their pressure and flow rates.",
      "Understanding Air Conditioning Systems: evaporative cooling system, hydronic heating system, hydronic cooling system, warm air system, refrigerated air conditioning system.",
      "Understanding of small-scale heating systems: Boilers, Piping, Radiators.",
      "Understanding of design materials: utilization of computers and pertinent computer-aided design (CAD) software, selection of drafting materials and tools, interpretation of pertinent structural plans and specifications.",
      "Understanding how to retrieve pertinent information, such as codes and standards.",
      "Understanding the tools, materials, and equipment utilized for designing, sizing, and documenting heating and cooling system layouts.",
      "Understanding the work health and safety (WHS) standards pertaining to the design, dimensions, and documentation of heating and cooling systems.",
    ],
  },
  {
    code: "CPCPCM4013",
    name: "Produce 2-D Architectural Drawings Using Design Software",
    tasks: [
      "Verifying and clarifying drawing specifications with pertinent staff members.",
      "Accessing and consulting the latest building and plumbing standards and regulations.",
      "Setting up a basic drawing environment.",
      "Developing a strategy for layering when drawing, viewing, and editing.",
      "Creating an architectural library.",
      "Creating suitable styles for title block, hatch patterns, dimension lines and thicknesses and text.",
      "Creating sketches utilizing suitable layers.",
      "Including necessary annotations on the drawing as needed.",
      "Including dimensions on the drawing, utilizing suitable scales.",
      "Using editing commands to modify drawing elements and existing text.",
      "Setting printing requirements to suit page layout for drawings.",
      "Establishing printing settings for the printer.",
      "Adhere to sustainability principles and concepts while preparing for and carrying out work processes.",
      "Create suitable directories for the drawing project.",
      "Embed drawing files into various software applications.",
      "Bring in text files from other software applications into CAD.",
    ],
  },
];
// ======================
// Utility Functions
// ======================
const initializeFormState = (units) => {
  return units.reduce((acc, unit) => {
    acc[unit.code] = unit.tasks.reduce((taskAcc, _, index) => {
      taskAcc[index] = { frequency: null, explanation: "" };
      return taskAcc;
    }, {});
    return acc;
  }, {});
};

// ======================
// Components
// ======================
const UnitComponent = ({ unit, formData, onFieldChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-emerald-800">
        {unit.code} - {unit.name}
      </h3>

      <div className="space-y-6">
        {unit.tasks.map((task, index) => (
          <div key={index} className="border-b pb-4">
            <div className="mb-2 font-medium text-gray-700">{task}</div>

            <div className="flex items-center gap-4 mb-3">
              {["Often", "Sometimes", "Rarely"].map((frequency) => (
                <label key={frequency} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`${unit.code}-${index}`}
                    checked={formData[unit.code][index].frequency === frequency}
                    onChange={() =>
                      onFieldChange(unit.code, index, "frequency", frequency)
                    }
                    className="h-4 w-4 text-emerald-600"
                  />
                  {frequency}
                </label>
              ))}
            </div>

            <textarea
              placeholder="Additional comments or explanations..."
              value={formData[unit.code][index].explanation}
              onChange={(e) =>
                onFieldChange(unit.code, index, "explanation", e.target.value)
              }
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
              rows="2"
            />
          </div>
        ))}
      </div>

      <ThirdPartyDeclaration />
    </div>
  );
};

const ThirdPartyDeclaration = () => (
  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
    <h4 className="text-lg font-semibold mb-4 text-emerald-800">
      Third Party Declaration
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Name of person completing this form"
        className="p-2 border rounded focus:ring-emerald-500"
      />
      <input
        type="text"
        placeholder="Relationship to candidate"
        className="p-2 border rounded focus:ring-emerald-500"
      />
      <input
        type="email"
        placeholder="Email address"
        className="p-2 border rounded focus:ring-emerald-500"
      />
      <input
        type="tel"
        placeholder="Contact number"
        className="p-2 border rounded focus:ring-emerald-500"
      />
      <div className="md:col-span-2">
        <label className="block mb-2">
          <input type="checkbox" className="mr-2" />I confirm the information
          provided is accurate and truthful
        </label>
      </div>
    </div>
  </div>
);

// ======================
// Main Component
// ======================
const ThirdPartyEvidenceKitA = () => {
  // Update the state to include a new page type
  const [currentPage, setCurrentPage] = useState("instructions"); // "instructions", "studentInfo", or "assessment"
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);
  const [formData, setFormData] = useState(() =>
    initializeFormState(initialUnits)
  );
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    unitCode: "",
    thirdPartyName: "",
    relationship: "",
    contactNumber: "",
    contactEmail: "",
    qualification: "",
    supervisionLength: "",
    comments: "",
  });

  const handleFieldChange = (unitCode, taskIndex, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [unitCode]: {
        ...prev[unitCode],
        [taskIndex]: {
          ...prev[unitCode][taskIndex],
          [field]: value,
        },
      },
    }));
  };

  const handleStudentInfoChange = (field, value) => {
    setStudentInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update the handleNavigation function to handle the three-page structure
  const handleNavigation = (direction) => {
    if (currentPage === "instructions" && direction === "next") {
      setCurrentPage("studentInfo");
      window.scrollTo(0, 0);
      return;
    }

    if (currentPage === "studentInfo") {
      if (direction === "prev") {
        setCurrentPage("instructions");
        window.scrollTo(0, 0);
        return;
      }
      if (direction === "next") {
        setCurrentPage("assessment");
        window.scrollTo(0, 0);
        return;
      }
    }

    if (currentPage === "assessment") {
      if (direction === "prev" && currentUnitIndex === 0) {
        setCurrentPage("studentInfo");
        window.scrollTo(0, 0);
        return;
      }

      setCurrentUnitIndex((prev) =>
        direction === "next"
          ? Math.min(prev + 1, initialUnits.length - 1)
          : Math.max(prev - 1, 0)
      );
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    console.log("Student Info:", studentInfo);
    // Add submission logic here
    alert("Form submitted successfully!");
  };

  // Update the return statement to conditionally render based on the three-page structure
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">
            RPL Third Party Evidence Kit
          </h1>
          <h2 className="text-2xl text-emerald-700">
            CPC40920 Certificate IV in Plumbing and Services (Hydraulic Services
            Design)
          </h2>
        </header>

        {currentPage === "instructions" && (
          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-emerald-800">
              Instructions to Use Third Party Evidence Kit
            </h3>
            <p className="mb-4">
              The following information provides a basis for the
              supervisor/manager to complete a Third Party Report where
              additional workplace verification of any aspect of candidate's
              workplace skills or knowledge is required.
            </p>

            <h4 className="text-lg font-semibold mb-2 text-emerald-700">
              Purpose of Using Third Party Evidence Kit
            </h4>
            <p className="mb-4">
              Assessor gives this evidence kit to the referees to confirm the
              following:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                the candidate's skills and experience in this unit of
                competency/occupation.
              </li>
            </ul>
            <p className="mb-4">
              The referees may fill out the appropriate form and return to the
              assessor to confirm their judgement. The assessor may be able to
              complete this part of evidence gathering in person while at the
              workplace.
            </p>

            <h4 className="text-lg font-semibold mb-2 text-emerald-700">
              Instructions to Complete Third-Party Evidence
            </h4>
            <p className="mb-4">
              In this step, the assessor may seek third-party evidence by
              contacting the candidate's supervisor or manager. This step aims
              to gather additional information and perspectives to assess the
              candidate's skills and knowledge related to the specific unit of
              competency being claimed for RPL.
            </p>
            <p className="mb-4">
              It is important to note that obtaining third-party evidence is not
              mandatory in certain circumstances to ensure fairness in the
              assessment process. These circumstances include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Candidate confidentiality: If the candidate does not want their
                employer to know they are seeking RPL.
              </li>
              <li>
                Organisational changes: If the organisation they are working for
                has been taken over or no longer exists.
              </li>
              <li>
                Difficult circumstances: If the candidate may have left their
                previous employment under challenging conditions.
              </li>
            </ul>
            <p className="mb-4">
              If the assessor decides to use third-party evidence, they should
              do so judiciously. The assessor should request evidence from the
              supervisor or manager that is specific to the activities required
              for the assessor to make their judgment, rather than assessing all
              requirements of the unit of competency.
            </p>
            <p className="mb-4">
              The third-party evidence requires the supervisor or manager to
              answer the questions to the best of their ability and provide a
              brief summary where required. They will confirm that the evidence
              they provide is a true and accurate reflection of the candidate's
              skills and knowledge.
            </p>
            <p className="mb-4">
              The third-party evidence can be completed by the assessor either
              by email, over the telephone, or face-to-face, based on the most
              suitable method for both parties.
            </p>
            <p className="mb-4">
              By incorporating the perspectives of a third party with direct
              knowledge of the candidate's performance, the assessment process
              gains credibility and provides a more comprehensive evaluation.
              The assessor will carefully consider the feedback from the
              supervisor or manager, along with the other stages of the RPL
              process, to reach a fair and accurate decision regarding the
              candidate's competency in the claimed unit.
            </p>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => handleNavigation("next")}
                className="flex items-center px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Next <ChevronRight className="ml-2" />
              </button>
            </div>
          </div>
        )}

        {currentPage === "studentInfo" && (
          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-emerald-800">
              Third Party Form (Supervisor to complete)
            </h3>
            <p className="mb-4">
              <strong>Instructions:</strong> As a provider of a third party
              report you are required to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Understand the significance of answering honestly</li>
              <li>Deal specifically with the student's performance</li>
              <li>
                Be prepared to provide additional evidence in the form of a
                report or phone interview.
              </li>
            </ul>
            <p className="mb-4">
              We value your support and ask that you complete this report
              honestly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Student's name:
                </label>
                <input
                  type="text"
                  value={studentInfo.name}
                  onChange={(e) =>
                    handleStudentInfoChange("name", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Unit code and name:
                </label>
                <input
                  type="text"
                  value={studentInfo.unitCode}
                  onChange={(e) =>
                    handleStudentInfoChange("unitCode", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name of person completing this Third-Party Evidence Kit:
                </label>
                <input
                  type="text"
                  value={studentInfo.thirdPartyName}
                  onChange={(e) =>
                    handleStudentInfoChange("thirdPartyName", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Relationship to the candidate/student:
                </label>
                <input
                  type="text"
                  value={studentInfo.relationship}
                  onChange={(e) =>
                    handleStudentInfoChange("relationship", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Best contact number of the person completing this Third-Party
                  Evidence Kit:
                </label>
                <input
                  type="tel"
                  value={studentInfo.contactNumber}
                  onChange={(e) =>
                    handleStudentInfoChange("contactNumber", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Best contact email of the person completing this Third-Party
                  Evidence Kit:
                </label>
                <input
                  type="email"
                  value={studentInfo.contactEmail}
                  onChange={(e) =>
                    handleStudentInfoChange("contactEmail", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Qualification/experience of the third party:
                </label>
                <input
                  type="text"
                  value={studentInfo.qualification}
                  onChange={(e) =>
                    handleStudentInfoChange("qualification", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Length of supervision of student:
                </label>
                <input
                  type="text"
                  value={studentInfo.supervisionLength}
                  onChange={(e) =>
                    handleStudentInfoChange("supervisionLength", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">
                  Comments:
                </label>
                <textarea
                  value={studentInfo.comments}
                  onChange={(e) =>
                    handleStudentInfoChange("comments", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows="3"
                ></textarea>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => handleNavigation("prev")}
                className="flex items-center px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                <ChevronLeft className="mr-2" /> Back to Instructions
              </button>
              <button
                type="button"
                onClick={() => handleNavigation("next")}
                className="flex items-center px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Next <ChevronRight className="ml-2" />
              </button>
            </div>
          </div>
        )}

        {currentPage === "assessment" && (
          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <button
                type="button"
                onClick={() => handleNavigation("prev")}
                className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg"
              >
                <ChevronLeft className="mr-2" />{" "}
                {currentUnitIndex === 0
                  ? "Back to Student Info"
                  : "Previous Unit"}
              </button>

              <span className="text-gray-600">
                Unit {currentUnitIndex + 1} of {initialUnits.length}
              </span>

              <button
                type="button"
                onClick={() => handleNavigation("next")}
                disabled={currentUnitIndex === initialUnits.length - 1}
                className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50"
              >
                Next Unit <ChevronRight className="ml-2" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b border-gray-200 w-1/2">
                      The candidate/student has demonstrated:
                    </th>
                    <th
                      className="py-3 px-4 text-center text-sm font-medium text-gray-700 border-b border-gray-200"
                      colSpan="3"
                    >
                      Frequency
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b border-gray-200 w-1/4">
                      Explanation
                    </th>
                  </tr>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-4 border-b border-gray-200"></th>
                    <th className="py-2 px-4 text-center text-sm font-medium text-gray-600 border-b border-gray-200 w-20">
                      Often
                    </th>
                    <th className="py-2 px-4 text-center text-sm font-medium text-gray-600 border-b border-gray-200 w-20">
                      Sometimes
                    </th>
                    <th className="py-2 px-4 text-center text-sm font-medium text-gray-600 border-b border-gray-200 w-20">
                      Rarely
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200"></th>
                  </tr>
                </thead>
                <tbody>
                  {initialUnits[currentUnitIndex].tasks.map((task, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="py-3 px-4 border-b border-gray-200">
                        {task}
                      </td>
                      <td className="py-3 px-4 text-center border-b border-gray-200">
                        <input
                          type="radio"
                          name={`${initialUnits[currentUnitIndex].code}-${index}`}
                          checked={
                            formData[initialUnits[currentUnitIndex].code][index]
                              .frequency === "Often"
                          }
                          onChange={() =>
                            handleFieldChange(
                              initialUnits[currentUnitIndex].code,
                              index,
                              "frequency",
                              "Often"
                            )
                          }
                          className="form-radio h-4 w-4 text-emerald-600"
                        />
                      </td>
                      <td className="py-3 px-4 text-center border-b border-gray-200">
                        <input
                          type="radio"
                          name={`${initialUnits[currentUnitIndex].code}-${index}`}
                          checked={
                            formData[initialUnits[currentUnitIndex].code][index]
                              .frequency === "Sometimes"
                          }
                          onChange={() =>
                            handleFieldChange(
                              initialUnits[currentUnitIndex].code,
                              index,
                              "frequency",
                              "Sometimes"
                            )
                          }
                          className="form-radio h-4 w-4 text-emerald-600"
                        />
                      </td>
                      <td className="py-3 px-4 text-center border-b border-gray-200">
                        <input
                          type="radio"
                          name={`${initialUnits[currentUnitIndex].code}-${index}`}
                          checked={
                            formData[initialUnits[currentUnitIndex].code][index]
                              .frequency === "Rarely"
                          }
                          onChange={() =>
                            handleFieldChange(
                              initialUnits[currentUnitIndex].code,
                              index,
                              "frequency",
                              "Rarely"
                            )
                          }
                          className="form-radio h-4 w-4 text-emerald-600"
                        />
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        <textarea
                          value={
                            formData[initialUnits[currentUnitIndex].code][index]
                              .explanation
                          }
                          onChange={(e) =>
                            handleFieldChange(
                              initialUnits[currentUnitIndex].code,
                              index,
                              "explanation",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          placeholder="Provide explanation..."
                          rows="2"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <label className="block text-gray-700 font-medium mb-2">
                Please provide any additional information to support your
                report:
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows="4"
              ></textarea>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Third party signature:
                </label>
                <div className="h-20 border border-gray-300 rounded-md bg-gray-50"></div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Date:
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {currentUnitIndex === initialUnits.length - 1 && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Submit All Evidence
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThirdPartyEvidenceKitA;
