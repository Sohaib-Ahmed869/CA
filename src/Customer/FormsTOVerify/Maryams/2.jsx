"use client";

import { useState, useRef, useEffect } from "react";

// Custom styles for sticky header
const stickyHeaderStyles = {
  position: "sticky",
  top: 0,
  zIndex: 10,
  backgroundColor: "white",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

export default function RPLAssessmentFormaaa() {
  const [currentStep, setCurrentStep] = useState(0);
  const [candidateName, setCandidateName] = useState("");
  const [dateCompleted, setDateCompleted] = useState("");
  const [venue, setVenue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // All units of competency (including all remaining units from the PDF)
  const units = [
    { id: "intro", title: "Self-Assessment Information" },
    { id: "CPCCCM2012", title: "Work safely at heights" },
    {
      id: "CPCPCM2039",
      title: "Carry out interactive workplace communication",
    },
    {
      id: "CPCPCM2040",
      title: "Read plans, calculate quantities and mark out materials",
    },
    {
      id: "CPCPCM2041",
      title: "Work effectively in the plumbing services sector",
    },
    { id: "CPCPCM2043", title: "Carry out WHS requirements" },
    { id: "CPCPCM2045", title: "Handle and store plumbing materials" },
    { id: "CPCPCM2046", title: "Use plumbing hand and power tools" },
    { id: "CPCPCM2047", title: "Carry out levelling" },
    { id: "CPCPCM2048", title: "Cut and join sheet metal" },
    { id: "CPCPCM2054", title: "Carry out simple concreting and rendering" },
    { id: "CPCPCM2055", title: "Work safely on roofs" },
    { id: "CPCPCM3021", title: "Flash penetrations through roofs and walls" },
    { id: "CPCPCM3022", title: "Weld polymer pipes using fusion method" },
    {
      id: "CPCPCM3023",
      title: "Fabricate and install non-ferrous pressure piping",
    },
    { id: "CPCPCM3024", title: "Prepare simple drawings" },
    { id: "CPCPCM3025", title: "Install trench support" },
    { id: "CPCPDR2021", title: "Locate and clear blockages" },
    {
      id: "CPCPDR2025",
      title:
        "Install stormwater and sub-soil drainage systems and drain work site",
    },
    {
      id: "CPCPDR2026",
      title:
        "Install prefabricated inspection openings and inspection chambers",
    },
    {
      id: "CPCPDR3021",
      title: "Plan layout and install below ground sanitary drainage systems",
    },
    {
      id: "CPCPDR3023",
      title:
        "Install on-site domestic wastewater treatment plants and disposal systems",
    },
    {
      id: "CPCPFS3031",
      title: "Fabricate and install fire hydrant and hose reel systems",
    },
    { id: "CPCPGS3048", title: "Install gas pressure control equipment" },
    { id: "CPCPGS3049", title: "Install gas appliance flues" },
    { id: "CPCPGS3051", title: "Purge consumer piping" },
    {
      id: "CPCPGS3053",
      title: "Disconnect and reconnect Type A gas appliances",
    },
    {
      id: "CPCPGS3054",
      title:
        "Calculate and install natural ventilation for Type A gas appliances",
    },
    { id: "CPCPGS3056", title: "Size and install consumer gas piping systems" },
    {
      id: "CPCPGS3059",
      title:
        "Install LPG storage of aggregate storage capacity up to 500 litres",
    },
    { id: "CPCPGS3061", title: "Install and commission Type A gas appliances" },
    { id: "CPCPWT3022", title: "Install and commission pumpsets" },
    { id: "CPCPWT3025", title: "Install water pumpsets" },
    {
      id: "CPCPWT3026",
      title: "Fit off and commission heated and cold water services",
    },
    {
      id: "CPCPWT3027",
      title: "Connect irrigation systems from drinking water supply",
    },
    { id: "CPCPWT3028", title: "Install water services" },
    { id: "CPCPWT3029", title: "Install water pipe systems" },
    { id: "CPCPWT3030", title: "Maintain backflow prevention devices" },
    {
      id: "CPCPWT3031",
      title:
        "Install and commission water heating systems and adjust controls and devices",
    },
    { id: "CPCPWT3032", title: "Install water tanks" },
    {
      id: "CPCPWT3033",
      title:
        "Commission and maintain hot and heated water temperature control devices",
    },
    {
      id: "CPCPWT3034",
      title: "Install and commission solar water heating systems",
    },
    { id: "CPCPWT3035", title: "Maintain water meters" },
    {
      id: "CPCPWT3036",
      title: "Fit off and commission sanitary plumbing systems",
    },
    {
      id: "CPCPWT3037",
      title: "Install and commission water filtration systems",
    },
    {
      id: "CPCPWT3038",
      title: "Test and maintain water pressure reduction devices",
    },
    { id: "CPCPWT3039", title: "Maintain fire hydrant systems" },
    { id: "CPCPWT3040", title: "Install domestic water filtration systems" },
    { id: "CPCPWT3041", title: "Test water supply systems" },
    { id: "CPCPRF3022", title: "Fabricate and install roof drainage systems" },
    { id: "CPCPRF3023", title: "Fabricate and install roof sheet flashings" },
    { id: "CPCPRF3024", title: "Install roof components" },
    { id: "CPCPRF3025", title: "Install rainwater tanks" },
    { id: "CPCPRF3026", title: "Install roof drainage systems" },
    { id: "CPCPRF3027", title: "Maintain roof drainage systems" },
    { id: "CPCPRF3028", title: "Test and commission roof drainage systems" },
    { id: "CPCPRF3029", title: "Fit off and commission stormwater systems" },
    {
      id: "CPCPRF3030",
      title: "Install, test and commission metal roofing systems",
    },
    { id: "final", title: "Assessment Submission" },
  ];

  // Unit competency questions data
  const unitQuestions = {
    CPCCCM2012: [
      "Demonstrated the ability to interpret job requirements and planning from documentation.",
      "Contributed effectively to safety planning and documentation.",
      "Demonstrated knowledge of various fall protection systems suitable for specific tasks.",
      "Showed proficiency in identifying secure anchor points for safe work execution.",
      "Engaged in active discussions to ensure comprehensive understanding of the SWMS.",
      "Exhibited responsibility in ensuring personal safety through proper PPE use.",
      "Demonstrated awareness of potential hazards and took proactive steps to mitigate risks.",
      "Maintained diligence in ensuring the reliability of safety equipment.",
      "Displayed understanding of the importance of signaling and barrier systems in work area safety.",
      "Demonstrated competency in setting up fall protection systems as per guidelines.",
      "Verified the installation and certification of safety equipment and structures.",
      "Exhibited careful and safe practices while utilizing fall protection gear.",
      "Ensured communication and confirmation regarding safety equipment setup.",
      "Practiced safe methods in handling and positioning materials at heights.",
      "Followed all safety procedures and guidelines while performing tasks at heights.",
    ],
    CPCPCM2039: [
      "Demonstrated ability to discern key information for effective communication.",
      "Showed understanding of the workplace environment and relevant communication channels.",
      "Demonstrated adaptability in choosing communication methods based on the situation.",
      "Exhibited ability to convey messages effectively in a workplace setting.",
      "Showed flexibility and responsiveness in communication strategies.",
      "Practiced active listening and confirmation techniques.",
      "Demonstrated awareness and proper use of non-verbal cues in communication.",
      "Displayed sensitivity to others' interpretations and adjusted accordingly.",
      "Applied visual aids and signaling techniques effectively.",
      "Checked for understanding and clarity in non-verbal exchanges.",
      "Demonstrated competency in drafting and understanding written materials.",
      "Showed proficiency in understanding and applying written workplace information.",
      "Demonstrated knowledge and correct use of workplace signage.",
      "Showed ability to handle workplace paperwork and records efficiently.",
      "Maintained thorough records and reports as required in the workplace.",
    ],
    CPCPCM2040: [
      "Reviewed plumbing plans, specifications, and related Australian Standards.",
      "Identified and understood manufacturer's specifications and jurisdictional requirements.",
      "Applied work health and safety (WHS) and environmental requirements relevant to the job.",
      "Ensured usage of the most current version of plans and specifications.",
      "Recognized and applied drawing conventions in the documents.",
      "Selected appropriate tools and equipment for the task.",
      "Determined the correct type of materials required for the job.",
      "Accurately calculated necessary dimensions and quantities of materials.",
      "Documented the materials list according to workplace requirements.",
      "Accurately read and interpreted job dimensions from plans and specifications.",
      "Effectively used marking tools for materials as per job requirements.",
      "Checked and ensured accuracy and compliance of markings with planned dimensions.",
      "Managed work area clearing and material disposal/reuse/recycling as per legislation and workplace policies.",
      "Maintained, cleaned, and stored tools and equipment, reporting any damages.",
      "Demonstrated understanding of plan types, functions, conventions, and scales.",
      "Applied calculation principles relevant to the plumbing sector, including unit conversions and measurements.",
      "Accessed and utilized codes, standards, and other relevant information effectively.",
      "Adhered to WHS requirements specific to reading plans, calculating quantities, and marking out materials.",
    ],
    CPCPCM2041: [
      "Understood and complied with employment conditions, responsibilities, and obligations in the plumbing sector.",
      "Utilized various mediums to access and understand the requirements of relevant plumbing legislation, regulations, standards, and codes of practice.",
      "Actively participated in identifying and pursuing own development needs and processes.",
      "Consistently applied specific work health and safety requirements when preparing for and undertaking plumbing activities.",
      "Adhered to workplace quality assurance and sustainability principles and concepts.",
      "Identified workplace goals and made agreed contributions to teamwork activities.",
      "Organized and took responsibility for own workload in a team setting.",
      "Completed work activities to the standard expected in the plumbing workplace.",
      "Effectively identified and reported safety risks based on hazards in the work area.",
      "Participated in periodic reviews of team activities and implemented findings to improve work practices.",
      "Demonstrated ability to work collaboratively as part of plumbing services workplace processes.",
      "Identified actions and strategies to manage workplace and personal conflict situations.",
      "Demonstrated knowledge of basic job and skill analysis techniques relevant to the plumbing sector.",
      "Had knowledge of the plumbing and services streams, career structure, and requirements, including business opportunities.",
      "Showed understanding of regulatory and legislative standards and codes of conduct in the plumbing services sector.",
      "Consistently practiced safe work habits in a normal working environment.",
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
    CPCPCM2045: [
      "Reviewed and applied these requirements in previous work settings.",
      "Chose appropriate tools and equipment for material handling and ensured they met safe work requirements.",
      "Regularly checked tools for faults and reported any issues.",
      "Selected and properly utilized PPE according to job requirements.",
      "Identified and stored materials to prevent damage, cross-contamination, and ensured ease of retrieval.",
      "Used appropriate signs and barricades to isolate stored materials.",
      "Adhered to safety data sheets and statutory requirements for storing materials.",
      "Identified hazardous materials for separate storage and applied safety precautions.",
      "Cleared work areas, disposed of waste materials, and followed recycling protocols.",
      "Kept tools clean, checked for serviceability, and stored securely.",
      "Documented and reported safety-related information as required.",
      "Safely stored and transported materials in compliance with relevant guidelines.",
      "Demonstrated awareness of environmental risks associated with materials handling.",
      "Effectively used job safety analyses and safe work method statements.",
      "Demonstrated knowledge of emergency response procedures.",
    ],
    CPCPCM2046: [
      "Adhered to workplace health and safety and environmental guidelines when using tools.",
      "Located and accessed power supply for power tools effectively.",
      "Selected and wore appropriate PPE for tool usage according to job requirements.",
      "Adhered to electrical safety guidelines when operating power tools.",
      "Regularly inspected hand tools for safety and reported any faults.",
      "Chose hand tools that were suitable for specific plumbing tasks.",
      "Used equipment effectively to position or support materials during hand tool use.",
      "Handled hand tools according to manufacturer's specifications and workplace procedures.",
      "Chose suitable power tools for the job and checked their tags, serviceability, and safety.",
      "Operated power tools in line with safety requirements and manufacturer's guidelines.",
      "Kept power tools securely when not in use, adhering to workplace procedures.",
      "Cleared work area, disposing of, reusing, or recycling materials as per environmental and workplace requirements.",
      "Cleaned tools, checked for serviceability, reported damage, and stored them securely.",
      "Documented and communicated safety-related information according to workplace norms.",
      "Demonstrated understanding of the different types of hand and power tools used in plumbing and their specific applications.",
    ],
    CPCPCM2047: [
      "Reviewed and understood levelling requirements from job plans, specifications, codes, and Australian standards.",
      "Consistently followed workplace health and safety and environmental guidelines during levelling tasks.",
      "Chose appropriate tools and equipment, ensuring their serviceability for levelling work.",
      "Checked levelling tools for current calibration and complied with relevant legislation and workplace policies.",
      "Accurately identified levels required from job plans and specifications for levelling tasks.",
      "Set up and used levelling equipment as per manufacturer's specifications and workplace procedures.",
      "Accurately recorded and marked levels as per job requirements, maintaining required tolerances.",
      "Ensured safe handling and storage of levelling equipment when not in use.",
      "Effectively cleared the work area, responsibly disposing of waste materials.",
      "Regularly cleaned and checked tools and equipment for serviceability, reporting any damages.",
      "Showed understanding of various levelling tools such as laser levels, spirit levels, and their applications.",
      "Adhered to safe work procedures related to the use, handling, and storage of levelling equipment.",
      "Applied basic calculations required for carrying out levelling tasks.",
      "Efficiently accessed and utilized job-related documents and specifications for levelling tasks.",
      "Documented and communicated safety-related information according to workplace norms.",
    ],
    CPCPCM2048: [
      "Reviewed and understood requirements from job plans, specifications, codes, Australian standards, and manufacturer's specifications.",
      "Consistently followed workplace health and safety and environmental guidelines during sheet metal work.",
      "Accurately calculated the amount of sheet metal needed for various projects.",
      "Developed a list of required materials and collected them efficiently.",
      "Chose the right tools and equipment, including PPE, for cutting and joining sheet metal.",
      "Followed job plans and specifications for precise marking out of sheet metal.",
      "Measured and cut sheet metal with precision.",
      "Cleaned and prepared sheet metal surfaces effectively for joining.",
      "Employed appropriate sealing methods and joining techniques such as grooved seam, knock-up joint, or Pittsburgh lock.",
      "Ensured alignment and secure fastening of sheet metal using techniques like spot welding, riveting, or screwing.",
      "Cleared the work area, disposing of, reusing, or recycling materials responsibly.",
      "Cleaned and checked tools and equipment for serviceability, reporting any damages.",
      "Showed understanding of different sheet metal materials and their applications.",
      "Adhered to safe work procedures for cutting and joining sheet metal.",
      "Applied basic calculations needed for cutting and joining tasks.",
    ],
    CPCPCM2054: [
      "Accessed, read, and determined concreting and rendering requirements from relevant job plans, specifications, codes, Australian standards, manufacturer's specifications, and jurisdictional requirements.",
      "Identified and applied workplace work health and safety (WHS) and environmental requirements in concreting and rendering tasks.",
      "Created a materials list and collected materials for concreting and rendering tasks.",
      "Selected and checked the serviceability of appropriate tools and equipment, including personal protective equipment (PPE).",
      "Prepared site prior to placement of concrete or cement render.",
      "Prepared concrete or cement render mixture to meet job and manufacturer's requirements.",
      "Transported concrete or cement render safely using appropriate methods.",
      "Applied concrete in formwork or rendered to restore damaged surface according to job specifications.",
      "Screeded concrete surface to project datum or screeded cement render to ensure level or plumb finish.",
      "Finished surface of concrete or cement render according to relevant job plans and specifications.",
      "Cleared the work area, and disposed of, reused, or recycled materials in accordance with legislation and workplace policies and procedures.",
      "Cleaned tools and equipment, checked for serviceability, reported any damage, and stored and secured appropriately.",
      "Carried out tasks such as benching an access chamber, installing thrust blocks, cement rendering pipe penetration, pouring or repairing a concrete slab, or repairing pipe chases.",
      "Applied basic levelling techniques and handled materials safely, understanding storage and transport requirements.",
      "Utilized different types of concreting tools and equipment effectively for simple concrete and rendering tasks.",
      "Accessed and adhered to relevant information, including codes and standards, for carrying out simple concrete and rendering tasks.",
    ],
    CPCPCM2055: [
      "Accessed, read, and determined requirements for working safely on roofs from job plans, specifications, codes, Australian standards, and manufacturer's specifications.",
      "Obtained and followed organizational WHS and environmental requirements specific to roofing work.",
      "Inspected fall prevention and fall arrest equipment for serviceability and adequacy for roofing work.",
      "Created a materials list specific to roofing tasks and collected necessary materials.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment (PPE) relevant to roof work.",
      "Erected appropriate safety signage and barricades as per workplace requirements.",
      "Installed fall prevention and used fall arrest equipment in compliance with manufacturer's, workplace, and regulatory requirements.",
      "Conducted regular checks of fall prevention and fall arrest systems for compliance and reported any faults.",
      "Installed fall prevention and used fall arrest equipment in compliance with manufacturer's, workplace, and regulatory requirements.",
      "Conducted regular checks of fall prevention and fall arrest systems for compliance and reported any faults.",
      "Installed fall prevention and used fall arrest equipment in compliance with manufacturer's, workplace, and regulatory requirements.",
      "Followed statutory jurisdictional regulations and workplace safety requirements relevant to roofing work, including handling of hazardous materials and electrical hazards.",
      "Applied knowledge of safety equipment like scaffolds, guardrails, safety mesh, ladders, and energy absorbers.",
      "Dismantled fall prevention and fall arrest systems correctly and removed them from the work area.",
      "Cleared the work area post-task, disposing of, reusing, or recycling materials as per legislation and policies.",
      "Cleaned tools and equipment, checked for serviceability, reported any damage, and stored them securely.",
    ],
    CPCPCM3021: [
      "Accessed, read, and determined flashing penetration requirements from job plans, specifications, codes, Australian standards, and manufacturer's specifications.",
      "Understood and applied relevant statutory and jurisdictional regulations.",
      "Identified and followed workplace policies and procedures, including WHS and environmental requirements.",
      "Recognized potential hazards and risks associated with flashing work and implemented control measures.",
      "Compiled a materials list specific to flashing tasks and collected necessary materials.",
      "Selected and checked the serviceability of appropriate tools and equipment, including personal protective equipment (PPE).",
      "Identified locations for wall and roof penetrations, considering existing and future services.",
      "Accurately set out and cut penetrations in roofs and walls.",
      "Installed supports as needed and fitted the penetrating product effectively.",
      "Installed purpose-made or proprietary flashing in compliance with job specifications and standards.",
      "Applied fire-resistant requirements to penetrations where required.",
      "Demonstrated understanding of terminology related to flashing penetrations.",
      "Aware of issues related to electrolysis and compatibility of different materials.",
      "Applied principles of capillary action, thermal expansion, and corrosion prevention.",
      "Cleared the work area post-task, responsibly disposing of, reusing, or recycling materials.",
      "Cleaned tools and equipment, checked for serviceability, reported any damage, and stored them securely.",
      "Successfully flashed a square/rectangular penetration through wall cladding and roof sheeting, with sides greater than 300 mm.",
      "Flashed a circular penetration greater than 200 mm diameter through roof sheeting.",
    ],
    CPCPCM3022: [
      "Accessed and thoroughly read job plans and specifications for welding polymer pipes.",
      "Understood codes, Australian standards, and manufacturer's specifications.",
      "Comprehended jurisdictional requirements for fusion welding of polymer pipes.",
      "Determined job priorities in consultation with colleagues or supervisors.",
      "Sequenced job tasks effectively to optimize workflow.",
      "Identified and applied workplace policies and procedures.",
      "Adhered to work health and safety (WHS) and environmental requirements in all welding activities.",
      "Selected appropriate tools, equipment, and personal protective equipment (PPE) for the welding task.",
      "Conducted a thorough serviceability check of all chosen tools and equipment.",
      "Created a comprehensive materials list required for the welding task.",
      "Successfully collected all necessary materials, ensuring readiness for the job.",
      "Checked welding equipment for correct operation in line with manufacturer instructions.",
      "Prepared joints using appropriate tools and techniques as per manufacturer specifications.",
      "Conducted test welds and verified them against job specifications.",
      "Carried out fusion welds adhering to job plans, specifications, codes, Australian standards, and manufacturer's guidelines.",
      "Conducted a visual inspection of fusion welds, ensuring compliance with all relevant standards and specifications.",
      "Cleared the work area post-completion of welding tasks.",
      "Disposed of, reused, or recycled materials in accordance with state/territory legislation and workplace policies.",
      "Cleaned tools and equipment post-use.",
      "Checked for serviceability, reported any damage, and stored securely.",
      "Demonstrated knowledge of safe operation procedures for fusion welding of polymer pipes.",
      "Understood the effect of heat on the properties of polymer pipes.",
      "Knew the operating principles of fusion welding equipment and the characteristics of materials used.",
      "Skilled in surface preparation for the welding process.",
      "Capable of identifying specific welding requirements for various tasks.",
    ],
    CPCPCM3023: [
      "Accessed, read, and determined requirements for fabricating and installing non-ferrous pressure piping from job plans, specifications, codes, Australian standards, and manufacturer's specifications.",
      "Considered jurisdictional requirements during planning and execution.",
      "Identified and applied workplace policies and procedures relevant to the task.",
      "Adhered to work health and safety (WHS) and environmental requirements throughout the process.",
      "Created a materials list and successfully gathered all necessary materials.",
      "Set up silver brazing equipment following workplace and WHS guidelines.",
      "Set out pipelines and connection points accurately according to drawings, specifications, or instructions.",
      "Utilized silver brazing equipment effectively, adhering to workplace and WHS procedures.",
      "Installed pipework in compliance with relevant job plans, codes, Australian standards, and manufacturer's specifications.",
      "Ensured installation met the requirements for a DN20 copper line with specified bends and joints.",
      "Tested installed pipework as per relevant codes, standards, and specifications.",
      "Identified and corrected any issues found during testing.",
      "Shut down and dismantled silver brazing equipment properly following workplace procedures.",
      "Cleaned and stored tools and equipment post-use, reporting any damage.",
      "Cleared the work area effectively after completion of tasks.",
      "Handled disposal, reuse, or recycling of materials in accordance with legislation and workplace policies.",
      "Showed understanding of the fabrication, installation, and testing process for non-ferrous pressure pipe systems.",
      "Recognized relevant statutory requirements and standards related to the task.",
      "Demonstrated knowledge of types of non-ferrous materials and joining techniques.",
    ],
    CPCPCM3024: [
      "Consulted with supervisors or associated persons to identify key features required for plumbing service drawings.",
      "Utilized relevant documentation to understand the scope of the drawing task.",
      "Identified and applied workplace, WHS, and environmental requirements in the drawing process.",
      "Ensured adherence to safety procedures while creating drawings.",
      "Chose suitable views (e.g., 2D plan, isometric, sectional) for creating sketches and drawings.",
      "Ensured views selected were appropriate for effectively conveying the required information.",
      "Employed standard drawing conventions in sketches and drawings.",
      "Incorporated relevant codes and standards into the drawings for accurate representation.",
      "Accurately recorded essential information on drawings using symbols and abbreviations per standard conventions.",
      "Ensured clarity and precision in notations and labeling on the drawings.",
      "Stored drawings according to organizational administration and quality procedures.",
      "Maintained drawings in a manner that ensures easy access and preservation of quality.",
      "Demonstrated the ability to produce different types of drawings (floor plans, schematic drawings of pipework, sectional, isometric).",
      "Applied various drawing techniques as needed for different types of plumbing services work.",
      "Accessed relevant information, including codes and standards, required for creating accurate and compliant drawings.",
      "Used this information effectively in the drawing process.",
      "Utilized appropriate tools, materials, and equipment for creating simple drawings.",
      "Handled these tools and materials safely and efficiently.",
      "Followed WHS requirements while taking and recording measurements for drawings.",
      "Ensured measurements were accurate and safely obtained.",
    ],
    CPCPCM3025: [
      "Accessed, read, and determined installation requirements from job plans, specifications, codes, Australian standards, and manufacturer's specifications.",
      "Applied understanding of jurisdictional requirements to the installation process.",
      "Identified and adhered to workplace, WHS, and environmental requirements during the installation.",
      "Planned and sequenced tasks in coordination with others, ensuring a collaborative approach.",
      "Selected and checked tools and equipment, including PPE, for serviceability.",
      "Prepared the work area to facilitate efficient trench support installation, considering space and safety.",
      "Located and marked underground services to prevent damage during installation.",
      "Adapted installation methods considering the presence of underground services.",
      "Sourced appropriate equipment for the excavation task.",
      "Identified potential hazards and implemented effective control measures.",
      "Set out trench support installation according to specified plans and standards.",
      "Considered existing services and traffic control requirements in installation planning.",
      "Installed trench support systems without causing damage to the environment or existing structures.",
      "Checked the installation for compliance with relevant job plans, codes, and standards.",
      "Removed trench support equipment and backfilled the trench in compliance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment before storage.",
    ],
    CPCPDR2021: [
      "Identified the location and nature of blockages in sanitary plumbing and drainage systems.",
      "Understood the requirements for clearing different types of blockages.",
      "Consistently adhered to workplace, WHS/OHS, and environmental requirements in plumbing tasks.",
      "Recognized and managed hazards and risks associated with blockage clearing, implementing relevant control measures.",
      "Chose and correctly used tools and equipment for blockage clearing, including personal protective equipment.",
      "Employed closed-circuit television (CCTV) effectively to identify blockages in pipework.",
      "Competently used mechanical methods to clear blockages in drainage pipework.",
      "Ensured pipework and fittings remained undamaged during the blockage removal process.",
      "Performed system flushing and testing post-clearing to ensure adequate operation.",
      "Effectively cleared the work area post-task, disposing of materials as per legislation and workplace policies.",
      "Maintained, cleaned, and stored tools and equipment appropriately, reporting any damage.",
      "Demonstrated understanding of different pipes and fittings characteristics.",
      "Applied knowledge of various drain clearing tools and equipment, including their operation methods.",
    ],
    CPCPDR2025: [
      "Accessed, read, and understood job plans, specifications, codes, and standards related to stormwater and drainage systems.",
      "Utilized manufacturer's specifications and jurisdictional requirements effectively.",
      "Identified and applied workplace policies and procedures.",
      "Adhered to WHS and environmental requirements in drainage work",
      "Created a comprehensive materials list and collected necessary materials.",
      "Selected and checked the serviceability of tools and equipment, including PPE.",
      "Located and set out the position for stormwater and drainage, determining appropriate levels and gradients.",
      "Excavated trenches to specified dimensions using manual or mechanical means.",
      "Measured, cut, and installed pipework aligning with connection points.",
      "Conducted pressure tests on stormwater installations.",
      "Fitted covers and inspection openings accurately.",
      "Implemented sediment controls following environmental requirements.",
      "Installed and operated a submersible pump correctly for site drainage.",
      "Cleared work area post-task, handling waste as per legislation and policies.",
      "Cleaned, checked, and stored tools and equipment, reporting any damage.",
      "Demonstrated knowledge of terminology, processes, and techniques for stormwater drainage system installation.",
      "Applied knowledge of excavation techniques, shoring methods, and stormwater pits.",
      "Located underground services effectively.",
      "Understood the operational features of relevant plant, equipment, and submersible pumps.",
    ],
    CPCPDR2026: [
      "Accessed and accurately interpreted prefabricated inspection openings and chamber installation methods from job plans, specifications, codes, and standards.",
      "Utilized manufacturer's specifications and jurisdictional requirements effectively in planning.",
      "Identified and consistently applied workplace policies and procedures.",
      "Adhered to WHS and environmental requirements specifically for inspection openings and chamber installations.",
      "Created a materials list and efficiently collected all necessary materials.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Accurately marked out and prepared the installation site.",
      "Installed prefabricated inspection openings and chambers, ensuring proper connection of inlet and outlet pipes.",
      "Followed relevant job plans, specifications, codes, and standards for installation.",
      "Cleared the work area post-task, disposing of materials as per legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Applied knowledge of pipe fittings, jointing techniques, and characteristics of inspection openings and chambers.",
      "Accessed relevant information, including job plans, codes, Australian Standards, and manufacturer's specifications.",
    ],
    CPCPDR3021: [
      "Accessed, read, and correctly interpreted installation requirements from job plans, specifications, relevant Australian Standards, codes, and manufacturer's specifications.",
      "Applied jurisdictional requirements effectively in planning the drainage system.",
      "Identified and consistently applied workplace policies and procedures.",
      "Adhered to WHS and environmental requirements during the installation process.",
      "Planned and drew the layout of a sanitary drainage system, ensuring compliance with design principles and working drawing conventions.",
      "Created a comprehensive materials list and collected necessary materials for the drainage system.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Established and set out fixture locations, levels, and heights accurately for new or existing connection points.",
      "Excavated trenches to the specified depth and grade, using manual or mechanical means.",
      "Fabricated and installed sanitary drainage pipework, connecting it to the new or existing system.",
      "Tested the installation to ensure it was functional and met all requirements.",
      "Prepared accurate as-constructed drawings post-installation, documenting the completed work.",
      "Cleared the work area post-task, managing waste materials as per legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Applied knowledge of terminology relating to below-ground sanitary drainage systems.",
      "Used approved materials correctly and understood their characteristics and applications.",
      "Identified underground services and followed trench support techniques.",
    ],
    CPCPDR3023: [
      "Accessed, read, and understood installation requirements from job plans, specifications, codes, Australian standards, and manufacturer's specifications.",
      "Accurately applied jurisdictional requirements to wastewater treatment plant installations.",
      "Identified and consistently adhered to workplace policies and procedures.",
      "Applied WHS and environmental requirements relevant to wastewater treatment plant installations.",
      "Created a comprehensive materials list and efficiently collected required materials.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Set out and excavated the site to required depth and specifications.",
      "Prepared the excavated base for installation according to standards.",
      "Installed a treatment plant and on-site disposal system, ensuring proper connections.",
      "Cleared the work area post-task, managing waste materials responsibly.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Applied knowledge of effluent treatment and disposal systems.",
      "Understood the types of domestic treatment plants and onsite effluent disposal systems.",
      "Followed guidelines for treated-water irrigation systems in accordance with standards and requirements.",
    ],
    CPCPFS3031: [
      "Accessed, read, and correctly applied fire hydrant and hose reel requirements from job plans, specifications, codes, Australian standards, and manufacturer's specifications.",
      "Accurately interpreted jurisdictional requirements for the installation.",
      "Identified and consistently adhered to workplace policies and procedures.",
      "Applied WHS and environmental requirements specific to fire hydrant and hose reel system installations.",
      "Created a comprehensive materials list and efficiently collected required materials.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Set out the fire hydrant and hose reel systems according to job plans and specifications.",
      "Connected fire brigade suction and booster arrangement correctly.",
      "Fitted all pipework and pipe supports appropriately.",
      "Connected fire hydrant valves, hose reels, and ancillary equipment securely.",
      "Performed hydrostatic test on the installation to ensure its functionality.",
      "Completed and documented all necessary installation steps.",
      "Cleared the work area post-task, managing waste materials responsibly.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of processes, procedures, and techniques for fabricating and installing these systems.",
      "Applied knowledge of pressure testing systems and pipe jointing methods.",
      "Understood the characteristics and applications of materials and components used in the systems.",
    ],
    CPCPGS3048: [
      "Accessed, read, and applied gas pressure control equipment installation requirements from job specifications, Australian Standards, codes, and manufacturer's specifications.",
      "Accurately applied jurisdictional requirements to the installation process.",
      "Identified and adhered to workplace policies and procedures.",
      "Applied WHS and environmental requirements specific to gas pressure control equipment installations.",
      "Identified potential hazards and implemented control measures.",
      "Created a comprehensive materials list and efficiently collected required materials.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Performed installation of pipework, fittings, and gas pressure control equipment.",
      "Conducted tests, purged, and commissioned the gas pressure control system.",
      "Adjusted gas pressure to meet the required specifications.",
      "Completed and documented all necessary installation steps as per regulatory requirements.",
      "Cleared the work area post-task, managing waste materials responsibly.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of processes, procedures, and techniques for installing, testing, and commissioning gas pressure control equipment.",
      "Applied knowledge of gas properties, gas safety, combustion principles, pressure, and flow rates.",
      "Understood the installation and ventilation requirements of over-pressure regulators, including internal relief and over-pressure shut-off valves.",
    ],
    CPCPGS3049: [
      "Reviewed job specifications, Australian Standards, codes, manufacturer's specifications, and jurisdictional requirements to determine flue installation needs.",
      "Identified and followed relevant workplace policies and procedures, including work health and safety (WHS) and environmental requirements.",
      "Compiled a materials list for the flue installation and selected appropriate tools, equipment, and personal protective equipment (PPE).",
      "Installed and tested various types of flues, including fan-assisted, natural draft, and mild steel flues from a boiler spigot to above the roofline, ensuring alignment with job specifications and compliance with relevant standards.",
      "Demonstrated understanding of gas properties, gas safety, combustion principles, pressure, and flow rates in the context of flue installation.",
      "Identified hazards, assessed risks, and implemented control measures to minimize them during flue installation activities.",
      "Accurately completed documentation in accordance with regulatory requirements and workplace procedures.",
      "Cleared the work area, managed waste appropriately, cleaned, checked, and stored tools and equipment, and reported any damages.",
    ],
    CPCPGS3051: [
      "Accessed, read, and determined requirements for consumer piping from job plans, specifications, codes, Australian Standards, manufacturer's specifications, and jurisdictional requirements.",
      "Identified and adhered to organizational work health and safety and environmental requirements in past purging tasks.",
      "Identified potential hazards, including electrical safety risks, and implemented effective control measures in previous purging operations.",
      "Calculated and recorded the volume of the piping system accurately in past projects.",
      "Chose the appropriate medium and method for purging a consumer piping system based on past job requirements.",
      "Selected and utilized suitable tools, equipment, and personal protective equipment for purging tasks.",
      "Performed purging operations in accordance with relevant codes, Australian standards, and jurisdictional requirements.",
      "Completed necessary documentation accurately according to regulatory requirements and/or workplace procedures.",
      "Cleared the work area and managed waste in compliance with state and territory legislation and workplace policies.",
      "Cleaned, checked for serviceability, reported any damages, and securely stored tools and equipment after use.",
      "Demonstrated understanding of the characteristics of inert and fuel gases used in the purging process.",
      "Applied safe work practices associated with purging consumer piping systems, including knowledge of electrical safety precautions.",
    ],
    CPCPGS3052: [
      "Accessed, read, and applied gas pressure control equipment installation requirements from job specifications, Australian Standards, codes, and manufacturer's specifications.",
      "Accurately applied jurisdictional requirements to the installation process.",
      "Identified and adhered to workplace policies and procedures.",
      "Applied WHS and environmental requirements specific to gas pressure control equipment installations.",
      "Identified potential hazards and implemented control measures.",
      "Created a comprehensive materials list and efficiently collected required materials.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Performed installation of pipework, fittings, and gas pressure control equipment.",
      "Conducted tests, purged, and commissioned the gas pressure control system.",
      "Adjusted gas pressure to meet the required specifications.",
      "Completed and documented all necessary installation steps as per regulatory requirements.",
      "Cleared the work area post-task, managing waste materials responsibly.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of processes, procedures, and techniques for installing, testing, and commissioning gas pressure control equipment.",
      "Applied knowledge of gas properties, gas safety, combustion principles, pressure, and flow rates.",
      "Understood the installation and ventilation requirements of over-pressure regulators, including internal relief and over-pressure shut-off valves.",
    ],
    CPCPGS3053: [
      "Accessed, read, and determined requirements for disconnecting and reconnecting Type A gas appliances from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Identified potential hazards and implemented control measures.",
      "Created a materials list and collected necessary materials for the task.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Disconnected Type A gas appliances according to regulatory requirements and workplace procedures.",
      "Reconnected and tested Type A gas appliances according to regulatory requirements and workplace procedures.",
      "Conducted appropriate tests to ensure the reconnected appliance was functioning correctly and safely.",
      "Completed necessary documentation according to regulatory requirements and workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of the properties of gas, gas safety, and combustion principles.",
      "Applied knowledge of electrical safety and isolation procedures.",
      "Understood the operation principles of gas appliances and associated equipment.",
      "Applied knowledge of testing procedures for gas appliances after reconnection.",
    ],
    CPCPGS3054: [
      "Accessed, read, and determined requirements for calculating and installing natural ventilation for Type A gas appliances from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the ventilation installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Calculated ventilation requirements for Type A gas appliances according to standards and specifications.",
      "Determined the appropriate type and size of ventilation openings required.",
      "Installed ventilation systems according to calculated requirements and regulatory standards.",
      "Tested the installed ventilation system to ensure it met the required specifications.",
      "Completed necessary documentation according to regulatory requirements and workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of gas properties, gas safety, and combustion principles.",
      "Applied knowledge of ventilation principles and requirements for Type A gas appliances.",
      "Understood the relationship between ventilation and appliance performance and safety.",
      "Applied calculation methods for determining ventilation requirements.",
    ],
    CPCPGS3055: [
      "Accessed, read, and determined requirements for installing gas sub-meters from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the sub-meter installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Located and prepared the installation site according to plans and specifications.",
      "Installed gas sub-meters according to regulatory requirements and manufacturer's specifications.",
      "Connected gas sub-meters to the piping system ensuring proper alignment and secure connections.",
      "Tested the installed sub-meters for proper operation and gas-tightness.",
      "Completed necessary documentation according to regulatory requirements and workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of gas properties and gas safety principles.",
      "Applied knowledge of gas sub-meter types, operation, and installation requirements.",
      "Understood the requirements for testing and commissioning gas sub-meters.",
      "Applied knowledge of relevant codes and standards for gas sub-meter installations.",
    ],
    CPCPGS3056: [
      "Accessed, read, and determined requirements for sizing and installing consumer gas piping systems from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the piping system installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Calculated gas load and determined appropriate pipe sizes for the installation.",
      "Set out and installed gas piping systems according to plans, specifications, and regulatory requirements.",
      "Installed pipework with appropriate supports and in accordance with specified gradients.",
      "Tested the installed piping system for leaks and proper operation.",
      "Completed necessary documentation according to regulatory requirements and workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of gas properties, gas safety, and combustion principles.",
      "Applied knowledge of pipe sizing principles and calculation methods.",
      "Understood the requirements for testing and commissioning gas piping systems.",
      "Applied knowledge of relevant codes and standards for gas piping installations.",
    ],
    CPCPGS3059: [
      "Accessed, read, and determined requirements for installing LPG storage of aggregate storage capacity up to 500 litres from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the LPG storage installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Located and prepared the installation site according to plans, specifications, and safety requirements.",
      "Installed LPG storage containers of aggregate capacity up to 500 litres according to regulatory requirements.",
      "Connected pipework and fittings to the storage containers according to specifications.",
      "Tested the installation for leaks and proper operation.",
      "Completed necessary documentation according to regulatory requirements and workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of LPG properties, safety requirements, and handling procedures.",
      "Applied knowledge of LPG storage container types, installation requirements, and safety considerations.",
      "Understood the requirements for testing and commissioning LPG storage installations.",
      "Applied knowledge of relevant codes and standards for LPG storage installations.",
    ],
    CPCPGS3060: [
      "Accessed, read, and determined requirements for installing LPG storage of aggregate storage capacity exceeding 500 litres and less than 8 kl from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the LPG storage installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Located and prepared the installation site according to plans, specifications, and safety requirements.",
      "Installed LPG storage containers of aggregate capacity exceeding 500 litres and less than 8 kl according to regulatory requirements.",
      "Connected pipework and fittings to the storage containers according to specifications.",
      "Installed and connected required valves, regulators, and safety devices.",
      "Tested the installation for leaks and proper operation.",
      "Completed necessary documentation according to regulatory requirements and workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of LPG properties, safety requirements, and handling procedures.",
      "Applied knowledge of LPG storage container types, installation requirements, and safety considerations for larger installations.",
      "Understood the requirements for testing and commissioning larger LPG storage installations.",
      "Applied knowledge of relevant codes and standards for larger LPG storage installations.",
    ],
    CPCPGS3061: [
      "Accessed, read, and determined requirements for installing and commissioning Type A gas appliances from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the appliance installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Located and prepared the installation site according to plans and specifications.",
      "Installed Type A gas appliances according to manufacturer's instructions and regulatory requirements.",
      "Connected gas supply to the appliance ensuring proper alignment and secure connections.",
      "Connected flues and ventilation systems as required by specifications and standards.",
      "Tested the installed appliance for proper operation, gas-tightness, and safety.",
      "Commissioned the appliance according to manufacturer's instructions and regulatory requirements.",
      "Completed necessary documentation according to regulatory requirements and workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of gas properties, gas safety, and combustion principles.",
      "Applied knowledge of Type A gas appliance types, operation, and installation requirements.",
      "Understood the requirements for testing and commissioning Type A gas appliances.",
    ],
    CPCPIG2021: [
      "Accessed, read, and determined requirements for designing domestic urban irrigation systems from job plans, specifications, codes, Australian Standards, and client requirements.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Determined irrigation system requirements based on client needs and site conditions.",
      "Calculated and documented water flow rates, pipe sizes, and pressure requirements.",
      "Selected appropriate irrigation system components based on design requirements.",
      "Created irrigation system design drawings and documentation.",
      "Estimated materials quantities and costs for the irrigation system.",
      "Presented the irrigation system design to the client for approval.",
      "Completed necessary documentation according to workplace procedures.",
      "Demonstrated understanding of irrigation system principles and components.",
      "Applied knowledge of water conservation principles in irrigation system design.",
      "Understood the relationship between plants, soil types, and irrigation requirements.",
      "Applied calculation methods for determining irrigation system requirements.",
      "Demonstrated knowledge of relevant codes and standards for irrigation system design.",
    ],
    CPCPIG3021: [
      "Accessed, read, and determined requirements for setting out, installing, and commissioning irrigation systems from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the irrigation system installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Set out irrigation system according to plans and specifications.",
      "Installed pipework, fittings, and components according to design specifications.",
      "Installed and connected control systems and electrical components as required.",
      "Tested the installed irrigation system for proper operation and coverage.",
      "Commissioned the irrigation system according to specifications and requirements.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of irrigation system principles and components.",
      "Applied knowledge of installation techniques for different irrigation system types.",
      "Understood the requirements for testing and commissioning irrigation systems.",
      "Applied knowledge of relevant codes and standards for irrigation system installation.",
    ],
    CPCPIG3022: [
      "Accessed, read, and determined requirements for installing and commissioning domestic irrigation pumps from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the pump installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Located and prepared the pump installation site according to plans and specifications.",
      "Installed domestic irrigation pumps according to manufacturer's instructions and specifications.",
      "Connected pipework, fittings, and valves to the pump according to specifications.",
      "Connected electrical components and control systems as required.",
      "Tested the installed pump for proper operation and performance.",
      "Commissioned the pump according to manufacturer's instructions and specifications.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of pump types, principles, and selection criteria.",
      "Applied knowledge of pump installation techniques and requirements.",
      "Understood the requirements for testing and commissioning irrigation pumps.",
      "Applied knowledge of relevant codes and standards for pump installations.",
    ],
    CPCPRF2022: [
      "Accessed, read, and determined requirements for selecting and installing roof sheeting and wall cladding from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Selected appropriate roof sheeting and wall cladding materials based on specifications and requirements.",
      "Prepared the installation site and set out the work according to plans and specifications.",
      "Installed roof sheeting according to manufacturer's instructions and specifications.",
      "Installed wall cladding according to manufacturer's instructions and specifications.",
      "Installed flashings, cappings, and other accessories as required.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of roof sheeting and wall cladding materials and their applications.",
      "Applied knowledge of installation techniques for different roofing and cladding materials.",
      "Understood the requirements for weatherproofing and sealing roof and wall installations.",
      "Applied knowledge of relevant codes and standards for roof and wall installations.",
    ],
    CPCPRF2023: [
      "Accessed, read, and determined requirements for collecting and storing roof water from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the roof water collection system.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Prepared the installation site and set out the work according to plans and specifications.",
      "Installed roof drainage components such as gutters and downpipes according to specifications.",
      "Installed rainwater tanks and associated components according to specifications.",
      "Connected pipework and fittings for the roof water collection system.",
      "Tested the installed system for proper operation and water-tightness.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of roof water collection principles and components.",
      "Applied knowledge of installation techniques for roof drainage systems.",
      "Understood the requirements for testing and commissioning roof water collection systems.",
      "Applied knowledge of relevant codes and standards for roof water collection systems.",
    ],
    CPCPRF2024: [
      "Accessed, read, and determined requirements for fabricating roof coverings for curved structures from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the fabrication.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the curved roof dimensions and requirements from plans and specifications.",
      "Selected appropriate roofing materials for the curved structure.",
      "Marked out and cut roofing materials according to calculated dimensions.",
      "Fabricated roof coverings suitable for the curved structure according to specifications.",
      "Prepared the fabricated materials for installation.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of curved roof structures and their requirements.",
      "Applied knowledge of fabrication techniques for curved roof coverings.",
      "Understood the properties and limitations of different roofing materials for curved structures.",
      "Applied knowledge of relevant codes and standards for roof fabrication.",
    ],
    CPCPRF3021: [
      "Accessed, read, and determined requirements for receiving roofing materials from job plans, specifications, codes, Australian Standards, and supplier documentation.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Prepared the receiving area for the delivery of roofing materials.",
      "Checked delivered materials against order documentation for accuracy and completeness.",
      "Inspected received materials for damage, defects, or non-compliance with specifications.",
      "Handled and stored roofing materials according to manufacturer's recommendations and workplace procedures.",
      "Completed necessary documentation for received materials according to workplace procedures.",
      "Reported any discrepancies, damage, or defects according to workplace procedures.",
      "Demonstrated understanding of different roofing materials and their handling requirements.",
      "Applied knowledge of proper storage techniques for various roofing materials.",
      "Understood the documentation requirements for receiving materials.",
      "Applied knowledge of relevant codes and standards for roofing materials.",
    ],
    CPCPRF3022: [
      "Accessed, read, and determined requirements for fabricating and installing roof drainage systems from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the roof drainage system.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the roof drainage system requirements from plans and specifications.",
      "Fabricated roof drainage components such as gutters, downpipes, and sumps according to specifications.",
      "Installed fabricated roof drainage components according to plans and specifications.",
      "Tested the installed roof drainage system for proper operation and water-tightness.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of roof drainage principles and components.",
      "Applied knowledge of fabrication techniques for roof drainage components.",
      "Understood the requirements for testing and commissioning roof drainage systems.",
      "Applied knowledge of relevant codes and standards for roof drainage systems.",
    ],
    CPCPRF3023: [
      "Accessed, read, and determined requirements for fabricating and installing external flashings from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the external flashings.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the external flashing requirements from plans and specifications.",
      "Fabricated external flashings according to specifications and measurements.",
      "Installed fabricated external flashings according to plans and specifications.",
      "Sealed and weatherproofed the installed flashings as required.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of external flashing principles and applications.",
      "Applied knowledge of fabrication techniques for external flashings.",
      "Understood the requirements for weatherproofing and sealing external flashings.",
      "Applied knowledge of relevant codes and standards for external flashings.",
    ],
    CPCPRF3024: [
      "Accessed, read, and determined requirements for installing roof components from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the roof component installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the roof component requirements from plans and specifications.",
      "Prepared the installation site and set out the work according to plans and specifications.",
      "Installed roof components such as skylights, roof ventilators, and other penetrations according to specifications.",
      "Sealed and weatherproofed the installed components as required.",
      "Tested the installed components for proper operation and water-tightness.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of roof component types and their applications.",
      "Applied knowledge of installation techniques for different roof components.",
      "Understood the requirements for weatherproofing and sealing roof penetrations.",
      "Applied knowledge of relevant codes and standards for roof component installations.",
    ],
    CPCPRF3025: [
      "Accessed, read, and determined requirements for installing roof coverings to curved roof structures from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the curved roof installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the curved roof covering requirements from plans and specifications.",
      "Prepared the installation site and set out the work according to plans and specifications.",
      "Installed roof coverings to curved structures according to specifications and manufacturer's instructions.",
      "Installed flashings, cappings, and other accessories as required for the curved roof.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of curved roof structures and their requirements.",
      "Applied knowledge of installation techniques for curved roof coverings.",
      "Understood the properties and limitations of different roofing materials for curved structures.",
      "Applied knowledge of relevant codes and standards for curved roof installations.",
    ],
    CPCPRF3026: [
      "Accessed, read, and determined requirements for installing roof sheets, wall cladding, and complex flashings from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the installation requirements from plans and specifications.",
      "Prepared the installation site and set out the work according to plans and specifications.",
      "Installed roof sheets according to specifications and manufacturer's instructions.",
      "Installed wall cladding according to specifications and manufacturer's instructions.",
      "Fabricated and installed complex flashings for various roof and wall junctions.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of roof sheeting, wall cladding, and complex flashing requirements.",
      "Applied knowledge of installation techniques for roof sheets and wall cladding.",
      "Understood the requirements for fabricating and installing complex flashings.",
      "Applied knowledge of relevant codes and standards for roof and wall installations.",
    ],
    CPCPRF3027: [
      "Accessed, read, and determined requirements for selecting and installing a heritage roof system from job plans, specifications, codes, Australian Standards, and heritage requirements.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the heritage roof system.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the heritage roof system requirements from plans, specifications, and heritage documentation.",
      "Selected appropriate materials and components that comply with heritage requirements.",
      "Prepared the installation site and set out the work according to plans and specifications.",
      "Installed heritage roof system components according to specifications and heritage requirements.",
      "Completed necessary documentation according to workplace and heritage authority procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of heritage roof systems and their requirements.",
      "Applied knowledge of traditional roofing techniques and materials.",
      "Understood the requirements for maintaining heritage integrity while ensuring functionality.",
      "Applied knowledge of relevant codes, standards, and heritage requirements for roof installations.",
    ],
    CPCPSN3011: [
      "Accessed, read, and determined requirements for planning the layout of a residential sanitary plumbing system and fabricating and installing sanitary stacks from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the sanitary plumbing system.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Planned and set out the layout of a residential sanitary plumbing system according to plans and specifications.",
      "Fabricated sanitary stacks according to specifications and measurements.",
      "Installed fabricated sanitary stacks according to plans and specifications.",
      "Tested the installed sanitary plumbing system for proper operation and water-tightness.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of sanitary plumbing principles and components.",
      "Applied knowledge of fabrication techniques for sanitary stacks.",
      "Understood the requirements for testing and commissioning sanitary plumbing systems.",
      "Applied knowledge of relevant codes and standards for sanitary plumbing systems.",
    ],
    CPCPSN3022: [
      "Accessed, read, and determined requirements for installing discharge pipes from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the discharge pipe installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the discharge pipe requirements from plans and specifications.",
      "Prepared the installation site and set out the work according to plans and specifications.",
      "Installed discharge pipes according to specifications and manufacturer's instructions.",
      "Connected discharge pipes to fixtures, traps, and other components as required.",
      "Tested the installed discharge pipes for proper operation and water-tightness.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of discharge pipe principles and applications.",
      "Applied knowledge of installation techniques for discharge pipes.",
      "Understood the requirements for testing and commissioning discharge pipe systems.",
      "Applied knowledge of relevant codes and standards for discharge pipe installations.",
    ],
    CPCPSN3025: [
      "Accessed, read, and determined requirements for installing pre-treatment facilities from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the pre-treatment facility installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the pre-treatment facility requirements from plans and specifications.",
      "Prepared the installation site and set out the work according to plans and specifications.",
      "Installed pre-treatment facilities such as grease traps, neutralizing chambers, and other treatment devices.",
      "Connected pre-treatment facilities to the plumbing and drainage system as required.",
      "Tested the installed pre-treatment facilities for proper operation and water-tightness.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of pre-treatment facility types and their applications.",
      "Applied knowledge of installation techniques for pre-treatment facilities.",
      "Understood the requirements for testing and commissioning pre-treatment facilities.",
      "Applied knowledge of relevant codes and standards for pre-treatment facility installations.",
    ],
    CPCPSN3026: [
      "Accessed, read, and determined requirements for installing sewerage pumpsets from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the sewerage pumpset installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the sewerage pumpset requirements from plans and specifications.",
      "Prepared the installation site and set out the work according to plans and specifications.",
      "Installed sewerage pumpsets according to specifications and manufacturer's instructions.",
      "Connected pipework, fittings, and valves to the pumpset according to specifications.",
      "Connected electrical components and control systems as required.",
      "Tested the installed sewerage pumpset for proper operation and performance.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of sewerage pumpset types, principles, and selection criteria.",
      "Applied knowledge of pumpset installation techniques and requirements.",
      "Understood the requirements for testing and commissioning sewerage pumpsets.",
      "Applied knowledge of relevant codes and standards for sewerage pumpset installations.",
    ],
    CPCPWT3020: [
      "Accessed, read, and determined requirements for connecting and installing storage tanks to a domestic water supply from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the storage tank installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the storage tank requirements from plans and specifications.",
      "Prepared the installation site and set out the work according to plans and specifications.",
      "Installed storage tanks according to specifications and manufacturer's instructions.",
      "Connected storage tanks to the domestic water supply system as required.",
      "Installed and connected required valves, overflows, and other accessories.",
      "Tested the installed storage tank system for proper operation and water-tightness.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of water storage tank types and their applications.",
      "Applied knowledge of installation techniques for water storage tanks.",
      "Understood the requirements for testing and commissioning water storage systems.",
      "Applied knowledge of relevant codes and standards for water storage tank installations.",
    ],
    CPCPWT3021: [
      "Accessed, read, and determined requirements for setting out and installing water services from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the water service installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the water service requirements from plans and specifications.",
      "Set out water service pipework according to plans and specifications.",
      "Installed water service pipework, including required valves and fittings.",
      "Connected water service to the water main or other supply source as required.",
      "Tested the installed water service for proper operation and water-tightness.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of water service principles and components.",
      "Applied knowledge of installation techniques for water services.",
      "Understood the requirements for testing and commissioning water services.",
      "Applied knowledge of relevant codes and standards for water service installations.",
    ],
    CPCPWT3022: [
      "Accessed, read, and determined requirements for installing and commissioning water heating systems and adjusting controls and devices from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the water heating system installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the water heating system requirements from plans and specifications.",
      "Prepared the installation site and set out the work according to plans and specifications.",
      "Installed water heating systems according to specifications and manufacturer's instructions.",
      "Connected water heating systems to water supply and energy sources as required.",
      "Installed and connected required valves, tempering devices, and other accessories.",
      "Tested the installed water heating system for proper operation and water-tightness.",
      "Adjusted controls and devices to achieve required temperature and performance.",
      "Commissioned the water heating system according to manufacturer's instructions and specifications.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of water heating system types and their applications.",
      "Applied knowledge of installation techniques for water heating systems.",
      "Understood the requirements for testing, commissioning, and adjusting water heating systems.",
      "Applied knowledge of relevant codes and standards for water heating system installations.",
    ],
    CPCPWT3024: [
      "Accessed, read, and determined requirements for installing and maintaining domestic water treatment equipment from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the water treatment equipment installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the water treatment equipment requirements from plans and specifications.",
      "Prepared the installation site and set out the work according to plans and specifications.",
      "Installed water treatment equipment according to specifications and manufacturer's instructions.",
      "Connected water treatment equipment to the water supply system as required.",
      "Tested the installed water treatment equipment for proper operation and water-tightness.",
      "Performed maintenance on water treatment equipment according to manufacturer's instructions.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of water treatment equipment types and their applications.",
      "Applied knowledge of installation techniques for water treatment equipment.",
      "Understood the requirements for testing and maintaining water treatment equipment.",
      "Applied knowledge of relevant codes and standards for water treatment equipment installations.",
    ],
    CPCPWT3025: [
      "Accessed, read, and determined requirements for installing water pumpsets from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the water pumpset installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the water pumpset requirements from plans and specifications.",
      "Prepared the installation site and set out the work according to plans and specifications.",
      "Installed water pumpsets according to specifications and manufacturer's instructions.",
      "Connected pipework, fittings, and valves to the pumpset according to specifications.",
      "Connected electrical components and control systems as required.",
      "Tested the installed water pumpset for proper operation and performance.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of water pumpset types, principles, and selection criteria.",
      "Applied knowledge of pumpset installation techniques and requirements.",
      "Understood the requirements for testing and commissioning water pumpsets.",
      "Applied knowledge of relevant codes and standards for water pumpset installations.",
    ],
    CPCPWT3026: [
      "Accessed, read, and determined requirements for installing and fitting off sanitary fixtures, water services, and adjusting water service controls from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the sanitary fixture and water service requirements from plans and specifications.",
      "Prepared the installation site and set out the work according to plans and specifications.",
      "Installed sanitary fixtures according to specifications and manufacturer's instructions.",
      "Connected water services to sanitary fixtures as required.",
      "Installed and connected required valves, taps, and other accessories.",
      "Adjusted water service controls to achieve required flow rates and performance.",
      "Tested the installed fixtures and water services for proper operation and water-tightness.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of sanitary fixture types and their installation requirements.",
      "Applied knowledge of water service connection techniques.",
      "Understood the requirements for adjusting water service controls.",
      "Applied knowledge of relevant codes and standards for sanitary fixture and water service installations.",
    ],
    CPCPWT3027: [
      "Accessed, read, and determined requirements for installing backflow prevention devices from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the backflow prevention device installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the backflow prevention device requirements from plans and specifications.",
      "Prepared the installation site and set out the work according to plans and specifications.",
      "Installed backflow prevention devices according to specifications and manufacturer's instructions.",
      "Connected backflow prevention devices to the water supply system as required.",
      "Tested the installed backflow prevention devices for proper operation and water-tightness.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of backflow prevention device types and their applications.",
      "Applied knowledge of installation techniques for backflow prevention devices.",
      "Understood the requirements for testing and commissioning backflow prevention devices.",
      "Applied knowledge of relevant codes and standards for backflow prevention device installations.",
    ],
    CPCPWT3029: [
      "Accessed, read, and determined requirements for installing water pipe systems from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the water pipe system installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the water pipe system requirements from plans and specifications.",
      "Prepared the installation site and set out the work according to plans and specifications.",
      "Installed water pipe systems according to specifications and manufacturer's instructions.",
      "Connected water pipe systems to supply sources, fixtures, and appliances as required.",
      "Installed and connected required valves, fittings, and other accessories.",
      "Tested the installed water pipe system for proper operation and water-tightness.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of water pipe system types and their applications.",
      "Applied knowledge of installation techniques for water pipe systems.",
      "Understood the requirements for testing and commissioning water pipe systems.",
      "Applied knowledge of relevant codes and standards for water pipe system installations.",
    ],
    CPCPWT3030: [
      "Accessed, read, and determined requirements for installing home fire sprinkler systems from job plans, specifications, codes, Australian Standards, and manufacturer's specifications.",
      "Identified and applied workplace, WHS, and environmental requirements for the task.",
      "Created a materials list and collected necessary materials for the home fire sprinkler system installation.",
      "Selected and checked the serviceability of tools and equipment, including personal protective equipment.",
      "Determined the home fire sprinkler system requirements from plans and specifications.",
      "Prepared the installation site and set out the work according to plans and specifications.",
      "Installed home fire sprinkler systems according to specifications and manufacturer's instructions.",
      "Connected home fire sprinkler systems to water supply sources as required.",
      "Installed and connected required valves, fittings, sprinkler heads, and other accessories.",
      "Tested the installed home fire sprinkler system for proper operation and water-tightness.",
      "Completed necessary documentation according to workplace procedures.",
      "Cleared the work area, disposing of materials in accordance with legislation and workplace policies.",
      "Cleaned, checked, and reported any damages to tools and equipment, and stored them securely.",
      "Demonstrated understanding of home fire sprinkler system types and their applications.",
      "Applied knowledge of installation techniques for home fire sprinkler systems.",
      "Understood the requirements for testing and commissioning home fire sprinkler systems.",
      "Applied knowledge of relevant codes and standards for home fire sprinkler system installations.",
    ],
    HLTAID011: [
      "Responded to an emergency situation by recognizing, assessing, and managing immediate hazards to health and safety of self and others.",
      "Applied appropriate first aid procedures for various conditions including respiratory distress, allergic reactions, bleeding, shock, and other common injuries.",
      "Communicated details of the incident accurately to emergency services and other relevant people.",
      "Accurately completed relevant documentation related to the first aid incident.",
      "Demonstrated proper application of cardiopulmonary resuscitation (CPR) techniques.",
      "Used an automated external defibrillator (AED) safely and in accordance with manufacturer's instructions.",
      "Provided an accurate verbal and written report of the incident and actions taken.",
      "Reviewed the incident and own performance to identify improvements for future first aid responses.",
      "Recognized the psychological impacts of an emergency situation and provided appropriate support.",
      "Demonstrated understanding of the principles of first aid and emergency response.",
      "Applied knowledge of infection control procedures during first aid provision.",
      "Understood legal, workplace, and community considerations related to providing first aid.",
      "Demonstrated proper techniques for managing various first aid scenarios.",
      "Applied knowledge of basic anatomy and physiology considerations in provision of first aid.",
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

  const handleSubmit = () => {
    setIsSubmitted(true);
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
          Self-assessment recording tool for CPC32420 - Certificate III in
          Plumbing
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

  // Candidate information form
  const CandidateInfoForm = () => (
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
          <label className="block text-gray-700 font-medium mb-2">Venue:</label>
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
  );

  // Final assessment page component
  const FinalAssessmentPage = () => {
    if (isSubmitted) {
      return (
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold text-emerald-700 mb-4">
            Form Submitted Successfully
          </h1>
          <p className="text-gray-600">
            Thank you for completing the self-assessment.
          </p>
        </div>
      );
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
        CPC32420 - Certificate III in Plumbing
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

      {currentStep === 0 && <CandidateInfoForm />}

      <div className="bg-gray-50 p-4 md:p-6 rounded-lg mb-6 shadow-sm">
        {currentStep === 0 && <IntroductionStep />}
        {currentStep === units.length - 1 && <FinalAssessmentPage />}
        {currentStep > 0 && currentStep < units.length - 1 && (
          <GenericCompetencyForm unit={units[currentStep]} />
        )}
      </div>

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
        {currentStep < units.length - 1 && (
          <button
            onClick={goToNextStep}
            className="px-3 md:px-4 py-2 rounded-md flex items-center text-sm md:text-base bg-emerald-600 text-white hover:bg-emerald-700"
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
        )}
      </div>
    </div>
  );
}
