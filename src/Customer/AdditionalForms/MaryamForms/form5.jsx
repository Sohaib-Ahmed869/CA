import { useState } from "react";

export default function RPLThirdPartyCPC40920() {
  const [currentStep, setCurrentStep] = useState(0);

  // Personal information (collected once)
  const [studentName, setStudentName] = useState("");
  const [unitCode, setUnitCode] = useState("");
  const [thirdPartyName, setThirdPartyName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [supervisionLength, setSupervisionLength] = useState("");
  const [comments, setComments] = useState("");

  // Unit-specific form data (stored per unit)
  const [unitFormData, setUnitFormData] = useState({});

  // All units of competency
  const units = [
    { id: "intro", title: "Instructions to Use Third Party Evidence Kit" },
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
    CPCCBC4012: [
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
    CPCPCM4011: [
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
    CPCPCM4012: [
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
      "Maintained relevant documentation, including SWMSs and equipment service",
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
    CPCPCM4015: [
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
    CPCPDR4011: [
      "The student effectively communicated the layout details of the sanitary drainage system for the residential design.",
      "Clarity in presenting the design for each dwelling, including specified fixtures.",
      "The student demonstrated an understanding of and adherence to regulatory requirements governing residential sanitary drainage systems.",
      "Compliance with the prescribed fixtures for each dwelling, considering regulatory standards.",
      "The student incorporated client specifications into the design, addressing any specific requirements or preferences.",
      "Evidence of consideration for client needs in the layout details.",
      "The student proficiently documented the residential design, including accurate drawings and specifications.",
      "Clear representation of the proposed layout plans and sizing details.",
      "Effective integration of fixtures within each dwelling, ensuring a functional and efficient sanitary drainage system.",
      "Consideration of spatial requirements for each fixture.",
      "The student accurately sized the sanitary drainage system components, ensuring they meet the demands of the residential design.",
      "Proper sizing of pipes, drains, and other components.",
      "Demonstrated ability to identify potential design problems and proposed effective resolutions.",
      "Evidence of troubleshooting and problem-solving skills during the design process.",
      "Attention to detail in the design, indicating a thorough understanding of the requirements.",
      "Accuracy in depicting fixture locations, pipe routes, and connection points.",
      "Adherence to relevant drawing design standards in the documentation process.",
      "Consistency in using conventional symbols and industry-accepted practices.",
      "Displayed awareness of and adherence to work health and safety considerations during the design process.",
      "Appropriate safety measures considered and integrated into the design.",
      "The student presented a comprehensive design for the commercial space, incorporating all specified fixtures and components.",
      "Clear representation of the water/oil separator, commercial kitchen, trade waste facility, and other designated fixtures.",
      "The student ensured compliance with regulatory requirements for a commercial sanitary drainage system.",
      "Evidence of adherence to standards for trade waste installations.",
      "The student considered and incorporated client specifications into the commercial design.",
      "Addressed any specific needs or preferences outlined by the client.",
      "Proficient documentation of the commercial design, including accurate drawings and specifications.",
      "Clear representation of the proposed layout plans, sizing details, and fixture integration.",
      "The student effectively specified optimal materials for the proposed commercial design.",
      "Materials chosen aligned with the requirements of the sanitary drainage system and relevant standards.",
      "Demonstrated the ability to identify and resolve potential design issues within the commercial context.",
      "Effective problem-solving during the design process.",
      "Ensured compliance with trade waste standards for the designated fixtures.",
      "Proper integration and sizing of trade waste components.",
      "Consideration of spatial requirements for commercial fixtures, ensuring an efficient and functional layout.",
      "Demonstrated awareness of space utilization in a commercial setting.",
      "Attention to detail in the commercial design, including accurate representation of fixture locations and connection points.",
      "Avoidance of errors in the documentation process.",
      "Displayed awareness of and adherence to work health and safety considerations during the design process for the commercial space.",
      "Appropriate safety measures considered and integrated into the design.",
      "The student conducted a thorough review of the previously designed residential and commercial sanitary drainage systems.",
      "Checked for compliance with regulatory requirements and client specifications.",
      "Evaluated the quality and accuracy of the documentation for both designs.",
      "Identified any areas of improvement or adjustment needed.",
      "Ensured that the designs align with the specified performance criteria of the unit.",
      "Demonstrated understanding of the key elements required for regulatory compliance.",
      "Effectively identified any issues or non-compliance in the designs.",
      "Clearly communicated areas that may require adjustment.",
      "Proposed effective adjustments or improvements to bring the designs into compliance.",
      "Demonstrated problem-solving abilities in addressing identified issues.",
      "Confirmed alignment with client specifications for both residential and commercial designs.",
      "Addressed any client-specific requirements in the compliance check.",
      "Communicated findings and proposed adjustments in a clear and concise manner.",
      "Ensured effective communication of compliance status to relevant stakeholders.",
      "Demonstrated the application of knowledge related to regulatory requirements in the context of the compliance review.",
      "Connected observations to relevant knowledge evidence.",
      "Implemented quality assurance measures to ensure the accuracy and reliability of the compliance review.",
      "Checked for consistency and completeness in the evaluation process.",
      "Displayed awareness of and adherence to work health and safety considerations during the compliance review.",
      "Ensured the safety of the assessment process and made recommendations for safety improvements if needed.",
    ],
    CPCPDR4012: [
      "Demonstrated site assessment skills, identifying stormwater catchment areas effectively.",
      "Selected and justified stormwater pipe sizes in compliance with regulatory standards and main/street kerb requirements.",
      "Outlined and justified stormwater requirements for retention pits, silt and flotation arrestor pits, rainwater tanks, and overflow discharge locations.",
      "Documented the layout details accurately, ensuring proper drainage to the legal point of discharge within the external stormwater drainage network.",
      "Applied knowledge of Australian standards and workplace procedures in designing the residential stormwater drainage system.",
      "Considered and applied relevant specifications and client requirements in the design process.",
      "Adhered to development plans and regulations throughout the design process.",
      "Demonstrated an understanding of contour, reduced and invert levels in relation to the stormwater drainage design.",
      "Utilized appropriate drawing instruments and techniques as per conventional symbols and standards.",
      "Effectively applied computer-aided design (CAD) software in documenting the stormwater drainage system layout.",
      "Evaluated and analyzed the site, identifying specific stormwater catchment areas accurately.",
      "Selected stormwater pipe sizes to conform to regulatory authorities and main/street kerb standards, ensuring proper discharge flow and levels.",
      "Documented and justified the layout details, incorporating drainage to the legal point of discharge within the external stormwater drainage network.",
      "Applied knowledge of Australian standards, workplace procedures, and client specifications in the commercial stormwater drainage design.",
      "Ensured compliance with development plans, specifications, and relevant regulations throughout the design process.",
      "Demonstrated understanding and application of contour, reduced, and invert levels in the design.",
      "Utilized appropriate drawing instruments and sketching techniques according to established symbols and standards.",
      "Effectively employed computer-aided design (CAD) software to document the stormwater drainage system layout for commercial buildings.",
      "Considered variations in stormwater design requirements for different commercial building types.",
      "Displayed proficiency in accessing relevant information, including codes, standards, and materials for the design process.",
      "Conducted a comprehensive site assessment, accurately identifying stormwater catchment areas for a unit complex.",
      "Selected stormwater pipe sizes based on specific requirements for the unit complex, ensuring compliance with job needs.",
      "Outlined stormwater requirements for retention pits, silt and flotation arrestor pits, rainwater tanks, and overflow discharge locations as per the unit complex specifications.",
      "Documented the layout details meticulously, ensuring effective drainage to the legal point of discharge within the external stormwater drainage network.",
      "Applied knowledge of Australian standards, workplace procedures, and client specifications specifically for unit complex stormwater design.",
      "Adhered to development plans, specifications, and regulations throughout the unit complex stormwater design process.",
      "Demonstrated proficiency in contour, reduced, and invert levels for designing the stormwater drainage system for a unit complex.",
      "Utilized appropriate drawing instruments and sketching techniques as per conventional symbols and standards for unit complex designs.",
      "Effectively utilized computer-aided design (CAD) software to create detailed layouts for the unit complex stormwater drainage system.",
      "Considered variations in stormwater design requirements concerning unit complexes and multiple dwellings within the project scope.",
    ],
    CPCPGS4011: [
      "Demonstrated understanding in interpreting plans and specifications for caravan gas installation.",
      "Applied knowledge in determining appropriate take-off points and appliance locations.",
      "Correctly sized piping considering pressure up to 200 kPa and type of materials used.",
      "Incorporated safety measures such as over-pressure protection devices effectively.",
      "Included both natural gas and LPG installations complying with standards.",
      "Utilized at least two piping materials as per requirements.",
      "Documented layout plans adhering to relevant drawing design standards.",
      "Integrated certified Type A gas appliances in the installation design.",
      "Adhered to workplace policies regarding WHS and environmental considerations.",
      "Demonstrated compliance with Australian Standards and jurisdictional requirements.",
      "Applied knowledge in designing a marine gas installation with an LPG leak detection system.",
      "Considered specific requirements for marine settings in the layout.",
      "Correctly sized piping for marine installation considering pressures up to 200 kPa.",
      "Implemented safety features like over-pressure protection devices appropriately.",
      "Integrated both natural gas and LPG installations in compliance with standards.",
      "Used at least two piping materials as stipulated.",
      "Developed comprehensive documentation meeting relevant drawing design standards.",
      "Incorporated certified Type A gas appliances into the layout effectively.",
      "Adhered to WHS and environmental policies in the design process.",
      "Ensured compliance with Australian Standards and jurisdictional requirements.",
      "Demonstrated understanding of requirements for commercial gas installations.",
      "Correctly identified and located appliances as per specifications.",
      "Effectively sized piping considering pressures up to 200 kPa and material types.",
      "Integrated safety measures like over-pressure protection devices accurately.",
      "Incorporated natural gas and LPG installations meeting compliance standards.",
      "Utilized a minimum of two piping materials according to requirements.",
      "Generated comprehensive layout plans conforming to drawing design standards.",
      "Integrated certified Type A gas appliances into the commercial installation layout.",
      "Adhered to workplace policies regarding WHS and environmental considerations.",
      "Ensured compliance with Australian Standards and jurisdictional requirements.",
      "Displayed proficiency in designing gas installations for multiple dwellings.",
      "Correctly identified appliance locations in each dwelling as per specifications.",
      "Sized piping accurately considering pressures up to 200 kPa and material variations.",
      "Implemented safety measures such as over-pressure protection devices effectively.",
      "Incorporated natural gas and LPG installations complying with standards.",
      "Used at least two piping materials in accordance with requirements.",
      "Produced detailed layout plans meeting drawing design standards.",
      "Integrated certified Type A gas appliances into each dwelling's installation layout.",
      "Adhered to WHS and environmental policies during the design process.",
      "Ensured compliance with Australian Standards and jurisdictional requirements.",
    ],
    CPCPSN4011: [
      "Considered specific fixture requirements for each floor level.",
      "Ensured inclusion of disabled and gender-specific facilities as per regulations.",
      "Positioned the trade waste facility below the approved connection point as instructed.",
      "Incorporated necessary components to ensure trade waste compliance.",
      "Ensured fixtures and layouts adhered to relevant codes and standards.",
      "Showed awareness of legal points of discharge for the commercial building.",
      "Positioned fixtures logically for efficient usage and space management.",
      "Sized fixtures appropriately to meet commercial usage demands.",
      "Produced detailed schematic plans reflecting the designed system accurately.",
      "Included necessary annotations and labels for fixture identification.",
      "Demonstrated consideration for environmental impact in fixture choices.",
      "Ensured safety measures were incorporated into the design where applicable.",
      "Selected materials suitable for commercial usage and longevity.",
      "Ensured compatibility among materials used in the system.",
      "Utilized CAD software effectively for system documentation.",
      "Produced plans using appropriate drawing tools and techniques.",
      "Accounted for challenges in vertical plumbing systems across multiple levels.",
      "Managed complexities associated with a multi-floor layout effectively.",
      "Demonstrated understanding of practical implications in system design decisions.",
      "Addressed real-world considerations in the layout design.",
      "Allocated fixtures effectively across different residential levels.",
      "Ensured appropriate fixture distribution for residential usage.",
      "Ensured fixtures and layouts adhered to relevant codes and standards for residential buildings.",
      "Considered legal points of discharge for the residential structure.",
      "Sized and positioned fixtures to accommodate residential needs efficiently.",
      "Ensured logical placement of fixtures for ease of use and functionality.",
      "Produced clear and detailed schematic plans reflecting the designed system accurately.",
      "Included necessary annotations and labels for fixture identification.",
      "Demonstrated consideration for environmental impact in fixture choices for residential usage.",
      "Incorporated safety measures into the design where applicable for residential spaces.",
      "Chose materials suitable for residential usage and longevity.",
      "Ensured compatibility among materials used in the system.",
      "Utilized CAD software effectively for system documentation in a residential context.",
      "Demonstrated skill in using appropriate drawing tools and techniques.",
      "Managed complexities associated with residential plumbing across different levels.",
      "Accounted for unique considerations in a residential plumbing layout.",
      "Demonstrated understanding of practical implications in residential system design decisions.",
      "Addressed real-world considerations in the layout design for residential settings.",
      "Demonstrated creativity in optimizing space and fixture placement for residential needs.",
      "Adapted the design to accommodate residential living requirements effectively.",
    ],
    CPCPWT4011: [
      "Checked adherence to Australian Standards for placement of fixtures and systems on multiple floor levels.",
      "Evaluated the clarity and comprehensiveness of schematic layouts and documentation.",
      "Observed integration of approved heated/tempered circulating systems and cold-water systems across all specified floor levels.",
      "Assessed the accuracy and appropriateness of fixture placement and connectivity in the design.",
      "Checked incorporation of essential safety features such as hydrant and hose reel systems in accordance with regulations.",
      "Assessed the completeness and functionality of the design in meeting the outlined requirements.",
      "Observed inclusion and layout of fixtures within the commercial kitchen and the plant room.",
      "Evaluated the design's alignment with specified requirements for fixture quantity and variety on each floor level.",
      "Checked how well the design accounted for jurisdictional specifications and codes.",
      "Assessed the overall presentation of the design and attention to minute details in the schematic layouts.",
      "Observed incorporation of approved heated/tempered water systems and drinking/non-drinking cold-water systems across all specified floor levels, including the basement.",
      "Assessed the appropriateness and sizing of fixtures like baths, showers, WCs, basins, kitchen sinks, dishwashers, laundry tubs, and washing machines.",
      "Checked compliance with regulations and standards in fixture placement and water system design.",
      "Evaluated the clarity and completeness of documentation and schematic layouts.",
      "Observed integration of fixtures and systems within the basement level as per the outlined requirements.",
      "Checked the understanding of how heated/tempered and cold-water systems interact within a residential building layout.",
      "Assessed the attention to detail in the connectivity and flow of water systems across different levels.",
      "Evaluated the application of knowledge in designing water systems and fixtures for a residential setup.",
      "Ensured the inclusion and appropriate quantity of fixtures across various levels, meeting the unit requirements.",
      "Assessed the overall design integrity, functionality, and cohesiveness of the residential building layout.",
    ],
    BSBESB403: [
      "Demonstrated ability to identify and articulate financial requirements for the new business venture.",
      "Considered production and delivery costs, aligning with business goals.",
      "Utilized relevant documentation and procedures to gather cost information.",
      "Clearly set profit targets in alignment with business venture requirements.",
      "Calculated prices based on costs and profit targets, specifying charge-out rates or unit prices.",
      "Evaluated and selected pricing strategies based on market conditions.",
      "Calculated break-even sales point to assess the viability of the business venture.",
      "Demonstrated understanding of the relationship between break-even analysis and business viability.",
      "Prepared a comprehensive financial plan document.",
      "Ensured the financial plan reflects legal requirements applicable to business operations.",
      "Included strategies to monitor the financial performance of the business.",
      "Researched and compiled a list of legal requirements applicable to businesses.",
      "Incorporated strategies within the financial plan to ensure compliance with legal requirements.",
      "Developed effective monitoring strategies for assessing financial performance over time.",
      "Ensured alignment of monitoring strategies with the overall financial plan.",
      "Clearly documented legal compliance measures within the financial plan.",
      "Clearly documented monitoring strategies within the financial plan.",
      "Effectively analyzed provided financial reports.",
      "Identified key financial indicators, such as cash flow and profit margins.",
      "Related the analysis to the financial plan and its strategies.",
      "Developed a comprehensive summary report with insights into the financial health of the business.",
      "Provided recommendations based on the financial report analysis.",
      "Demonstrated the ability to identify areas for improvement.",
      "Communicated the findings and recommendations clearly and concisely.",
      "Used appropriate terminology related to financial planning.",
    ],
    CPCCBC4002: [
      "The student accurately accessed and identified the relevant WHS legislation and regulations applicable to the construction industry.",
      "The student conducted a thorough review of key sections, regulations, and recent amendments within the identified legislation.",
      "The student accurately summarized critical aspects of the legislation that directly impact workplace safety in the construction industry.",
      "The student provided specific and relevant examples illustrating how adherence to the identified legislation contributes to maintaining worker safety and competence.",
      "The student applied knowledge by interpreting and applying legislative requirements to practical workplace safety scenarios.",
      "The student presented a clear and concise summary of the legislative impact on workplace safety.",
      "The student demonstrated an understanding of how the legislative requirements specifically relate to the construction industry.",
      "The student incorporated recent amendments into the analysis, showcasing an up-to-date understanding of legislation.",
      "Documentation, summaries, and examples provided by the student were accurate and aligned with legislative requirements.",
      "The student effectively communicated their findings, ensuring clarity in conveying the impact of legislation on construction workplace safety.",
      "The student selected an appropriate construction site or simulated a worksite environment for the safety audit.",
      "The student developed a comprehensive safety audit checklist, covering key aspects such as hazard identification, safety procedure compliance, and emergency response readiness.",
      "The student conducted a thorough safety audit, identifying and assessing faults, problems, and non-compliances related to workplace safety.",
      "The student proposed actionable recommendations and strategies to address identified issues, demonstrating problem-solving skills.",
      "The student emphasized the introduction of safety systems for reporting safety issues and maintaining worker safety and competence.",
      "Documentation of audit findings by the student was clear, organized, and aligned with safety audit objectives.",
      "The student followed the safety audit checklist meticulously, ensuring all key aspects were covered during the audit.",
      "The student communicated audit findings and recommendations clearly, ensuring effective reporting to relevant stakeholders.",
      "The student specifically addressed emergency response readiness in the audit, covering procedures and preparedness.",
      "The student took a holistic approach, considering various aspects of workplace safety in the construction environment during the audit.",
      "The student selected a specific hazard identified during the safety audit for implementation planning.",
      "The student developed a detailed plan outlining control measures to mitigate the identified hazard.",
      "The student clearly articulated steps for the implementation of control measures, ensuring a practical and feasible approach.",
      "The student incorporated a monitoring and evaluation plan to assess the effectiveness of implemented control measures over time.",
      "The student emphasized the importance of maintaining ongoing control to ensure sustained workplace safety.",
      "The student documented the hazard control implementation plan clearly, ensuring it could be easily understood and followed.",
      "The student effectively communicated the steps for implementation, monitoring, and evaluation to relevant stakeholders.",
      "The student ensured that the hazard control measures aligned with overall safety goals and objectives.",
      "The student considered the practicality of implementing control measures within the construction worksite environment.",
      "The student provided a comprehensive report detailing the hazard control measures implemented and their impact on workplace safety.",
    ],
    CPCCBC4024: [
      "Identified and described the nature of the dispute, including potential causes, circumstances, and parties involved.",
      "Applied analytical skills to assess the dispute issue.",
      "Documented dispute details accurately and in sufficient terms to eliminate ambiguity.",
      "Ensured clarity and completeness in the documentation.",
      "Followed established dispute resolution procedures or developed appropriate procedures where none were specified.",
      "Demonstrated understanding of industry guidelines and legislative",
      "Maintained impartiality throughout the dispute resolution process.",
      "Demonstrated fairness and objectivity in documenting the dispute.",
      "Drafted comprehensive dispute resolution procedures for the hypothetical construction project scenario.",
      "Outlined clear steps for dispute identification, documentation, and resolution.",
      "Ensured clarity and fairness in the outlined procedures.",
      "Considered roles and responsibilities of all parties involved.",
      "Aligned procedures with relevant industry guidelines and legislation.",
      "Demonstrated understanding of regulatory and legal requirements.",
      "Emphasized maintaining impartiality throughout the dispute resolution process.",
      "Clearly articulated the neutrality of the procedures.",
      "Applied the dispute resolution procedures developed in Task 2 during the simulated process.",
      "Ensured a systematic approach to dispute resolution.",
      "Conducted effective interviews with concerned parties to clarify reasons for the dispute.",
      "Demonstrated strong communication skills.",
      "Conducted inspections of work when necessary to determine compliance with requirements.",
      "Developed solutions based on interviews and inspections to optimize the likelihood of a favorable outcome.",
      "Effectively offered recommended solutions to resolve the dispute equitably.",
      "Communicated legal processes in case resolution did not occur.",
      "Recorded and maintained the dispute process, information, and outcomes as per established procedures.",
      "Ensured accuracy and completeness in the documentation.",
      "Maintained impartiality throughout the simulated dispute resolution process.",
      "Demonstrated fairness and objectivity in interactions with parties.",
    ],
    CPCPCM2043: [
      "Identified potential hazards in the simulated environment.",
      "Correctly selected and used personal protective equipment (PPE).",
      "Followed specific WHS protocols and procedures for the task.",
      "Demonstrated awareness of safety risks associated with the plumbing task.",
      "Effectively communicated safety measures taken.",
      "Documented the steps of compliance with WHS policies and procedures.",
      "Showed knowledge of emergency procedures relevant to the task.",
      "Maintained a safe working area throughout the simulation.",
      "Engaged in safe work practices consistently.",
      "Adjusted methods based on the evolving requirements of the task.",
      "Selected appropriate tools and equipment for the plumbing task.",
      "Checked and confirmed the serviceability of tools and equipment.",
      "Erected necessary safety measures such as barricades or signage accurately.",
      "Utilized safety data sheets (SDSs) effectively in planning the task.",
      "Applied job safety analyses (JSAs) in the work process.",
      "Demonstrated understanding of safe work method statements (SWMSs).",
      "Planned the task with a focus on safety and compliance.",
      "Maintained compliance with safety regulations throughout the simulation.",
      "Adapted safety measures as per the specific requirements of the task.",
      "Communicated effectively about safety protocols with team members.",
      "Accurately identified hazards in the work area.",
      "Assessed risks associated with identified hazards.",
      "Reported hazards to designated personnel effectively.",
      "Contributed to WHS, hazard, accident, or incident reports.",
      "Followed safe work practices for risk control.",
      "Implemented control measures immediately upon hazard identification.",
      "Communicated about hazards and risks clearly and effectively.",
      "Demonstrated understanding of duty of care in the work environment.",
      "Participated actively in risk assessment processes.",
      "Maintained awareness of potential risks throughout the task.",
    ],
    UEERL0004: [
      "Student demonstrated understanding and application of WHS/OHS policies and procedures.",
      "Appropriate selection and use of personal protective equipment (PPE).",
      "Student identified and documented safety hazards.",
      "Risks were assessed, and control measures determined and implemented.",
      "Point of isolation was determined and documented.",
      "Coordination with relevant person/s for effective worksite involvement.",
      "Clear documentation of safety measures during the disconnection process.",
      "Adherence to workplace procedures during the planning and execution.",
      "Tools, equipment, and testing devices were obtained and checked for correct operation and safety.",
      "Student reconnected electrical equipment following relevant industry standards.",
      "Adherence to workplace procedures during the reconnection process.",
      "Appropriate selection and use of tools, equipment, and testing devices.",
      "Identification of the point of isolation for reconnection.",
      "Cables were terminated using stud, screw, tunnel, and lug terminal types.",
      "Correct preparation and use of relevant terminating tools.",
      "Visual inspection and testing of equipment's electrical characteristics.",
      "Testing compliance with insulation resistance and continuity.",
      "Student completed required regulatory compliance documentation accurately.",
      "Reports and documents align with workplace, industry, and regulatory requirements.",
      "Reports describe suitable procedures for safe disconnection and reconnection.",
      "Clarity in explaining steps and safety protocols in the documentation.",
      "Demonstrated understanding of and adherence to workplace, industry, and regulatory standards.",
      "Compliance with documentation requirements specified in the performance evidence.",
    ],
  };

  const goToNextStep = () => {
    if (currentStep < units.length - 1) {
      // Clear form data for the next unit
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

  // Reusable component for third party information
  const ThirdPartyInfo = () => (
    <div className="mb-6 border p-4 rounded-lg">
      <h4 className="font-semibold mb-4">
        Third Party Form (Supervisor to complete)
      </h4>
      <p className="mb-4">
        <strong>Instructions:</strong>
        <br />
        As a provider of a third party report you are required to:
        <br />• Understand the significance of answering honestly
        <br />• Deal specifically with the student's performance
        <br />• Be prepared to provide additional evidence in the form of a
        report or phone interview.
        <br />
        We value your support and ask that you complete this report honestly.
      </p>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Student's name:</label>
          <input
            type="text"
            className="border p-2 rounded"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Unit code and name:</label>
          <input
            type="text"
            className="border p-2 rounded"
            value={unitCode}
            onChange={(e) => setUnitCode(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">
            Name of person completing this Third-Party Evidence Kit:
          </label>
          <input
            type="text"
            className="border p-2 rounded"
            value={thirdPartyName}
            onChange={(e) => setThirdPartyName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">
            Relationship to the candidate/student:
          </label>
          <input
            type="text"
            className="border p-2 rounded"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">
            Best contact number of the person completing this Third-Party
            Evidence Kit:
          </label>
          <input
            type="text"
            className="border p-2 rounded"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">
            Best contact email of the person completing this Third-Party
            Evidence Kit:
          </label>
          <input
            type="email"
            className="border p-2 rounded"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">
            Qualification/experience of the third party:
          </label>
          <textarea
            className="border p-2 rounded h-20"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">
            Length of supervision of student:
          </label>
          <input
            type="text"
            className="border p-2 rounded"
            value={supervisionLength}
            onChange={(e) => setSupervisionLength(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Comments:</label>
          <textarea
            className="border p-2 rounded h-20"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );

  // Reusable component for competency assessment table
  const CompetencyTable = ({ unitId, questions }) => {
    // Initialize responses for this unit if they don't exist yet
    const unitKey = `responses_${unitId}`;
    const [responses, setResponses] = useState(
      questions.map(() => ({ level: null, explanation: "" }))
    );

    const handleResponseChange = (index, level) => {
      const newResponses = [...responses];
      newResponses[index] = { ...newResponses[index], level };
      setResponses(newResponses);

      // Update the unit-specific form data
      const updatedFormData = { ...unitFormData };
      if (!updatedFormData[unitKey]) {
        updatedFormData[unitKey] = {};
      }
      updatedFormData[unitKey].responses = newResponses;
      setUnitFormData(updatedFormData);
    };

    const handleExplanationChange = (index, explanation) => {
      const newResponses = [...responses];
      newResponses[index] = { ...newResponses[index], explanation };
      setResponses(newResponses);

      // Update the unit-specific form data
      const updatedFormData = { ...unitFormData };
      if (!updatedFormData[unitKey]) {
        updatedFormData[unitKey] = {};
      }
      updatedFormData[unitKey].responses = newResponses;
      setUnitFormData(updatedFormData);
    };

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border text-left w-1/2">
                The candidate/student has demonstrated:
              </th>
              <th className="py-2 px-4 border text-center" colSpan="3">
                Frequency
              </th>
              <th className="py-2 px-4 border text-center w-1/4">
                Explanation
              </th>
            </tr>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 border"></th>
              <th className="py-2 px-4 border text-center">Often</th>
              <th className="py-2 px-4 border text-center">Sometimes</th>
              <th className="py-2 px-4 border text-center">Rarely</th>
              <th className="py-2 px-4 border"></th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index} className={index % 2 === 0 ? "" : "bg-gray-50"}>
                <td className="py-2 px-4 border">{question}</td>
                <td className="py-2 px-4 border text-center">
                  <input
                    type="radio"
                    name={`q${unitId}_${index}`}
                    checked={responses[index].level === "often"}
                    onChange={() => handleResponseChange(index, "often")}
                  />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input
                    type="radio"
                    name={`q${unitId}_${index}`}
                    checked={responses[index].level === "sometimes"}
                    onChange={() => handleResponseChange(index, "sometimes")}
                  />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input
                    type="radio"
                    name={`q${unitId}_${index}`}
                    checked={responses[index].level === "rarely"}
                    onChange={() => handleResponseChange(index, "rarely")}
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    className="w-full border p-1"
                    value={responses[index].explanation}
                    onChange={(e) =>
                      handleExplanationChange(index, e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Additional information and signature section
  const AdditionalInfoSection = ({ unitId }) => {
    // Initialize form data for this unit if it doesn't exist yet
    const unitKey = `formData_${unitId}`;
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [thirdPartySignatureDate, setThirdPartySignatureDate] = useState("");
    const [assessorName, setAssessorName] = useState("");
    const [verified, setVerified] = useState(null);
    const [assessorDate, setAssessorDate] = useState("");

    // Update the unit-specific form data when values change
    const updateUnitFormData = (field, value) => {
      const updatedFormData = { ...unitFormData };
      if (!updatedFormData[unitKey]) {
        updatedFormData[unitKey] = {};
      }
      updatedFormData[unitKey][field] = value;
      setUnitFormData(updatedFormData);
    };

    return (
      <div className="mt-6">
        <div className="mb-4">
          <label className="font-semibold block mb-2">
            Please provide any additional information to support your report:
          </label>
          <textarea
            className="w-full border p-2 rounded h-24"
            value={additionalInfo}
            onChange={(e) => {
              setAdditionalInfo(e.target.value);
              updateUnitFormData("additionalInfo", e.target.value);
            }}
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-semibold block mb-2">
              Third party signature:
            </label>
            <div className="border p-2 h-12 rounded bg-gray-50"></div>
          </div>
          <div>
            <label className="font-semibold block mb-2">Date:</label>
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={thirdPartySignatureDate}
              onChange={(e) => {
                setThirdPartySignatureDate(e.target.value);
                updateUnitFormData("thirdPartySignatureDate", e.target.value);
              }}
            />
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <h5 className="font-semibold mb-2">RTO use only</h5>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Assessor's name:</label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                value={assessorName}
                onChange={(e) => {
                  setAssessorName(e.target.value);
                  updateUnitFormData("assessorName", e.target.value);
                }}
              />
            </div>
            <div>
              <label className="block mb-2">Verified:</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`verified_${unitId}`}
                    checked={verified === true}
                    onChange={() => {
                      setVerified(true);
                      updateUnitFormData("verified", true);
                    }}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`verified_${unitId}`}
                    checked={verified === false}
                    onChange={() => {
                      setVerified(false);
                      updateUnitFormData("verified", false);
                    }}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="block mb-2">Date:</label>
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={assessorDate}
              onChange={(e) => {
                setAssessorDate(e.target.value);
                updateUnitFormData("assessorDate", e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  // Progress bar component
  const ProgressBar = () => {
    const progress = (currentStep / (units.length - 1)) * 100;

    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-emerald-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  // Introduction step component
  const IntroductionStep = () => (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        Instructions to Use Third Party Evidence Kit
      </h3>
      <p className="mb-4">
        The following information provides a basis for the supervisor/ manager
        to complete a Third Party Report where additional workplace verification
        of any aspect of candidate's workplace skills or knowledge is required.
      </p>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">
          Purpose of Using Third Party Evidence Kit
        </h4>
        <p className="mb-4">
          Assessor gives this evidence kit to the referees to confirm the
          following:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>
            the candidate's skills and experience in this unit of
            competency/occupation.
          </li>
        </ul>
        <p>
          The referees may fill out the appropriate form and return to the
          assessor to confirm their judgement. The assessor may be able to
          complete this part of evidence gathering in person while at the
          workplace.
        </p>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">
          Instructions to Complete Third-Party Evidence
        </h4>
        <p className="mb-4">
          In this step, the assessor may seek third-party evidence by contacting
          the candidate's supervisor or manager. This step aims to gather
          additional information and perspectives to assess the candidate's
          skills and knowledge related to the specific unit of competency being
          claimed for RPL.
        </p>
        <p className="mb-4">
          It is important to note that obtaining third-party evidence is not
          mandatory in certain circumstances to ensure fairness in the
          assessment process. These circumstances include:
        </p>

        <ul className="list-disc pl-8 mb-4">
          <li>
            <strong>Candidate confidentiality:</strong> If the candidate does
            not want their employer to know they are seeking RPL.
          </li>
          <li>
            <strong>Organisational changes:</strong> If the organisation they
            are working for has been taken over or no longer exists.
          </li>
          <li>
            <strong>Difficult circumstances:</strong> If the candidate may have
            left their previous employment under challenging conditions.
          </li>
        </ul>

        <p className="mb-4">
          If the assessor decides to use third-party evidence, they should do so
          judiciously. The assessor should request evidence from the supervisor
          or manager that is specific to the activities required for the
          assessor to make their judgment, rather than assessing all
          requirements of the unit of competency.
        </p>
        <p className="mb-4">
          The third-party evidence requires the supervisor or manager to answer
          the questions to the best of their ability and provide a brief summary
          where required. They will confirm that the evidence they provide is a
          true and accurate reflection of the candidate's skills and knowledge.
        </p>
        <p className="mb-4">
          The third-party evidence can be completed by the assessor either by
          email, over the telephone, or face-to-face, based on the most suitable
          method for both parties.
        </p>
        <p className="mb-4">
          By incorporating the perspectives of a third party with direct
          knowledge of the candidate's performance, the assessment process gains
          credibility and provides a more comprehensive evaluation. The assessor
          will carefully consider the feedback from the supervisor or manager,
          along with the other stages of the RPL process, to reach a fair and
          accurate decision regarding the candidate's competency in the claimed
          unit.
        </p>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">Third Party Declaration</h4>
        <p>
          Please complete the Third-Party Declaration (see the next page) and
          ensure you provide your contact details on this form.
        </p>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">Assessor Contact</h4>
        <p>
          An assessor from our organisation will contact you to discuss the
          candidate's performance and ask any questions related to the feedback
          you will provide. This is purely to help the assessor make an
          assessment decision.
        </p>
      </div>
    </div>
  );

  // Generic competency form component
  const GenericCompetencyForm = ({ unit, stepIndex }) => {
    const questions = unitQuestions[unit.id] || [];

    return (
      <div>
        <h3 className="text-xl font-semibold mb-4">
          RPL Third Party Evidence Kit
        </h3>

        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-4">
            Unit Code and Unit Name: {unit.id} - {unit.title}
          </h4>

          {stepIndex === 1 && <ThirdPartyInfo />}

          {questions.length > 0 ? (
            <>
              <CompetencyTable unitId={unit.id} questions={questions} />
              <AdditionalInfoSection unitId={unit.id} />
            </>
          ) : (
            <p className="text-center py-4 bg-gray-100 rounded">
              No assessment criteria available for this unit.
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl my-16 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        CPC40920 Certificate IV in Plumbing and Services (Operations)
      </h1>
      <h2 className="text-xl font-semibold mb-4">
        Step 3: RPL Third Party Evidence Kit
      </h2>

      <ProgressBar />

      <div className="flex justify-between mb-4">
        <span className="text-sm text-gray-500">
          Step {currentStep + 1} of {units.length}
        </span>
        <span className="text-sm text-gray-500">
          {units[currentStep].title}
        </span>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        {currentStep === 0 && <IntroductionStep />}
        {currentStep > 0 && (
          <GenericCompetencyForm
            unit={units[currentStep]}
            stepIndex={currentStep}
          />
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded ${
            currentStep === 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-emerald-500 text-white hover:bg-emerald-600"
          }`}
        >
          Previous
        </button>
        <button
          onClick={goToNextStep}
          disabled={currentStep === units.length - 1}
          className={`px-4 py-2 rounded ${
            currentStep === units.length - 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-emerald-500 text-white hover:bg-emerald-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
