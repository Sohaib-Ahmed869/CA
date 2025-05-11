import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const RPLEvidenceAssessmentForm = ({ updatepage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateSignature: "",
    date: "",
    declaration: false,
    unitEvidence: {},
    competencyResponses: {},
    additionalNotes: "",
    assessorName: "",
    assessorSignature: "",
    assessorDate: "",
  });

  const unitData = {
    CPCCCA2002: {
      title: "Use carpentry tools and equipment",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Review work instructions to use tools and equipment.",
        "Plan all work to comply with laws and regulations, national construction codes, Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications and workplace requirements.",
        "Select and use personal protective equipment (PPE) for each part of the task.",
        "Inspect work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Select equipment and hand, power and pneumatic tools for the carpentry task, identify their functions and operations, check for serviceability and report any faults.",
        "Use equipment and hand, power and pneumatic tools following WHS requirements.",
        "Sharpen and maintain tools.",
        "Clean up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Check, maintain, store and secure tools and equipment and report any faults.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency in this unit, a candidate must safely and effectively, across three different carpentry tasks, use and maintain all of the listed tools and equipment at least once:",
        "hand tools:",
        "retractable tape measure",
        "folding or steel ruler",
        "combination square",
        "string line",
        "chalk line",
        "hand saw",
        "coping saw",
        "carpenters hammer / claw hammer",
        "wood chisel",
        "hand plane",
        "trimming knife",
        "clamps",
        "bevels",
        "spirit level",
        "tin snips",
        "power/battery/pneumatic tools and equipment:",
        "circular saw",
        "reciprocating saw",
        "sliding compound saw",
        "jigsaw",
        "angle grinder",
        "planer",
        "laminate trimmer or router",
        "drill",
        "rotary hammer drill",
        "impact driver",
        "nail gun",
        "bench grinder",
        "extension lead",
        "portable residual current device",
        "air compressor and hoses.",
        "The candidate must also:",
        "replace blades/cutters/grinding discs in:",
        "a power saw",
        "a powered planer",
        "a router",
        "grinder",
        "grind, sharpen and hone a hand plane blade",
        "grind, sharpen and hone a chisel.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "workplace quality policies and standards for using carpentry tools and equipment",
        "safety requirements for using carpentry tools and equipment",
        "types of tools and equipment and their characteristics, uses and limitations:",
        "hand tools including:",
        "retractable tape measure",
        "folding or steel ruler",
        "combination square",
        "spirit level",
        "string line",
        "chalk line",
        "hand saw",
        "coping saw",
        "carpenters hammer/claw hammer",
        "wood chisel",
        "hand plane",
        "metal trimming knife",
        "clamp",
        "bevel",
        "tin snips",
        "power/battery/pneumatic tools and equipment:",
        "bench grinder",
        "circular saw",
        "reciprocating saw",
        "sliding compound saw",
        "jigsaw",
        "angle grinder",
        "mobile plane",
        "laminate trimmer or router",
        "drill",
        "rotary hammer drill",
        "impact driver",
        "nail gun",
        "extension lead",
        "portable residual current device",
        "air compressor and hoses",
        "processes to safely grind, sharpen and hone a hand plane blade and a chisel.",
      ],
    },
    CPCCCA2011: {
      title: "Handle carpentry materials",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Read and interpret work instructions and plan sequence of work.",
        "Plan all work to comply with laws and regulations, work health and safety (WHS) and environmental requirements, manufacturers' specifications and workplace requirements.",
        "Select tools and equipment, check for serviceability and report any faults.",
        "Select and use personal protective equipment (PPE) for each part of the task.",
        "Inspect work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Apply safe manual handling techniques to move carpentry materials to specified location.",
        "Sort carpentry materials to suit material type and size, and stack clear of access ways for ease of identification, retrieval, task sequence and task location.",
        "Protect carpentry materials against physical and water damage.",
        "Stack and secure carpentry materials for mechanical handling in accordance with the type of material and equipment to be used.",
        "Unload, move or locate carpentry materials at specified location.",
        "Check, tools and equipment and report any faults.",
        "Store tools and equipment in accordance with workplace requirements.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must meet the performance criteria of this unit by handling carpentry materials for three different carpentry tasks, including:",
        "safely handling, sorting and stacking:",
        "varying lengths of timber or similarly-proportioned materials onto an Australian standard pallet, a minimum of 0.5 cubic metres, secured ready for mechanical handling",
        "different sizes and types of sheet material onto an Australian standard pallet, a minimum of 0.1 cubic metres, secured ready for mechanical handling",
        "preparing the following for mechanical handling:",
        "varying lengths of timber or similarly-proportioned materials",
        "different sizes and types of sheet material.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "requirements of Commonwealth and state or territory work health and safety (WHS) legislation relevant to handling carpentry materials",
        "safety data sheets",
        "workplace quality policies and standards for handling carpentry materials",
        "safety requirements for handling carpentry materials",
        "methods of securing materials",
        "types and uses of tools and equipment for handling carpentry materials:",
        "hammers",
        "pallets",
        "pinch bars",
        "tin snips",
        "wheelbarrows",
        "requirements and processes for safely preparing the following materials for mechanical handling, and manual handling, sorting, and stacking:",
        "concrete components",
        "insulation",
        "joinery units",
        "metal sheeting",
        "paints and sealants",
        "plaster or fibre cement sheeting",
        "reconstituted timber products",
        "reinforcement materials",
        "scaffolding components",
        "structural steel sections and components",
        "timber",
        "methods of handling carpentry materials:",
        "material size, weight or shape factors necessitating the assistance of other workers",
        "correct lifting and carrying techniques, use of pallets and control of waste",
        "preparation for mechanical handling, including the use of forklifts, pallet jacks and trucks.",
      ],
    },
    CPCCCA3001: {
      title: "Carry out general demolition of minor building structures",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Review and clarify task for demolition of minor building structures.",
        "Assess minor building structures to determine scope of demolition work.",
        "Review jurisdictional requirements for demolition of minor building structures.",
        "Review work health and safety (WHS) requirements for the task in accordance with safety plans and policies.",
        "Identify and manage risks including determining the status of existing services.",
        "Identify safety signage and barricade requirements.",
        "Review environmental requirements for the task in accordance with environmental plans and legislative requirements.",
        "Select plant, tools and equipment, check for serviceability and rectify or report any faults.",
        "Erect identified safety signage and barricades, and fit personal protective equipment (PPE).",
        "Complete preparatory work for demolition of minor building structures.",
        "Carry out demolition procedures in accordance with safe and effective processes of deconstructing or demolishing a minor building structure.",
        "Safely and effectively handle materials and building component parts to designated storage area using appropriate material-handling techniques.",
        "Safely and effectively handle, store and stack materials and components identified for salvaging, ready for transport.",
        "Clear work area and dispose of non-salvageable materials in accordance with legislation, regulations, codes of practice and task requirements.",
        "Clean, check, maintain and store tools and equipment in accordance with manufacturers' specifications and workplace requirements.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency in this unit, a person must carry out general demolition of one minor building structure, including removal of an external load-bearing wall to form an opening of no less than three metres wide.",
        "In doing this, the person must meet the performance criteria for this unit.",
        "To be competent in this unit, a person must demonstrate knowledge of:",
        "jurisdictional work health and safety (WHS) and environmental legislation and regulations relating to carrying out general demolition of minor building structures, including:",
        "job safety analyses (JSAs)",
        "safe work method statements (SWMSs)",
        "safety data sheets (SDSs)",
        "safety manuals and instructions for plant, tools and equipment",
        "signage and barricades",
        "personal protective equipment (PPE)",
        "environmental and work site safety plans",
        "requirements of Australian Standards and the National Construction Code (NCC) relating to carrying out general demolition of minor building structures",
        "workplace requirements for all aspects of carrying out general demolition of minor building structures including interpreting work orders and other task documentation and reporting problems",
        "common industry hazard identification and risk controls for carrying out general demolition of minor building structures, including safe handling of materials and machinery, and the use of signage and barriers",
        "environmental requirements for carrying out general demolition of minor building structures, including those relating to:",
        "clean-up protection",
        "noise and dust",
        "vibration",
        "waste management",
        "processes for selection of appropriate tools, equipment and materials for carrying out general demolition of minor building structures",
        "techniques and processes for safely and effectively planning and carrying out dismantling or demolition work in accordance with legislation and codes of practice",
        "recognition and safe handling of materials and building component parts, and methods for salvage or disposal, including:",
        "bonded asbestos",
        "brickwork",
        "concrete",
        "process for managing risks, including:",
        "in areas below floors",
        "identification, relocation or disconnection of services",
        "loads supported by walls",
        "security, and public health and safety",
        "weatherproofing of the structure",
        "existing services, including:",
        "electricity",
        "gas",
        "telephone and other communications",
        "water",
        "requirements for cleaning up work area and tools, materials storage and environmentally friendly waste management.",
      ],
    },
    CPCCCA3002: {
      title: "Carry out setting out",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Read and interpret work instructions and plan sequence of work.",
        "Plan all work to comply with laws and regulations, Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Select tools and equipment, check for serviceability and report any faults.",
        "Select and use personal protective equipment (PPE) for each part of the task.",
        "Inspect work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Locate survey pegs at corners of site.",
        "Set string lines to accurately show site boundary markings in accordance with site drawings and survey pegs.",
        "Determine, from drawings, the distance of the building line from the boundary or existing building.",
        "Determine approximate position and length of line and building clearances at each end from drawings and survey pegs.",
        "Install pegs and profiles, ensuring that they are level across and between one another and have adequate provision to mark footing width on profile.",
        "Accurately mark location for line with nails on profiles and set taut string line to true alignment with boundary.",
        "Determine and mark corner of building with peg on set building line to true measurement from adjacent boundary.",
        "Use triangulation principles to set up right angle to line from corner peg.",
        "Install profiles to approximate level of other profiles and set taut string line to right-angled alignment.",
        "Install profiles for remaining building lines level with established profiles.",
        "Mark measurements for remaining building lines accurately, and nail on profiles to dimensions from drawings.",
        "Set taut string lines to nailed locations on profiles.",
        "Check diagonal measurements for square and adjust lines to provide square relationship within 3 mm tolerance over minimum diagonal length of 10 m.",
        "Check measurements for accuracy.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must meet the performance criteria of this unit by setting out one L- and one T-shape building on a site with fall.",
        "Setting out must be to 3 mm tolerance over minimum diagonal length of 10 metres, and include pads, slabs, strips and piers.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "compliance requirements of Australian Standards relevant to carrying out setting out",
        "workplace quality policies and standards for carrying-out setting-out",
        "safety requirements for carrying out setting out",
        "application and requirements for line, level and plumb in construction projects",
        "mathematical techniques associated with setting out",
        "processes for reading and interpreting construction plans, drawings and sketches when carrying out setting out of pads, slabs, strips and piers",
        "processes and techniques for accurate setting-out on flat, sloping and steep sites",
        "processes for setting-out",
        "site isolation responsibilities when carrying out setting out",
        "types, characteristics, technical capabilities and limitations of devices used to carry out setting out activities.",
      ],
    },
    CPCCCA3003: {
      title: "Install flooring systems",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Read and interpret work instructions and plan sequence of work.",
        "Plan all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Select tools and equipment, check for serviceability and report any faults.",
        "Select and use personal protective equipment (PPE) as required for each stage of the task.",
        "Inspect work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Select materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Position support structure, stumps/piers to set-out lines, drawings and specifications.",
        "Install support structure.",
        "Check support structure, posts, stumps and piers for level, plumb and square.",
        "Mark and cut bearer material to lengths for joining over supports.",
        "Make arrangements for damp proof course and termite shield to be installed where specified by regulations.",
        "Locate and fix bearers and check and adjust for square, in-line and level.",
        "Fix waling plates for decks and balconies to external walls.",
        "Set out location for floor joists using spacings in accordance with drawings and specifications.",
        "Check floor joists for straightness, then fit and fix to line and level.",
        "Fit and fix supporting blocks and trimmers around doorways and openings.",
        "Cut, fit and fix trimmers to support sheet flooring joints.",
        "Check flooring materials for suitability.",
        "Confirm floor measurements and cut and prepare flooring materials for installation with a minimum of waste.",
        "Install and secure flooring to manufacturers' specifications.",
        "Clean up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Check, maintain and store tools and equipment and report any faults.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must meet the performance criteria of this unit by installing each of the following flooring systems:",
        "a bearer and joist system on supports to carry external walls and internal walls parallel to joists for a home or equivalent, not less than 30 square metres, including:",
        "balcony/deck fixings",
        "deep joists",
        "a tongue and groove fitted strip flooring surface, not less than 5 square metres",
        "an approved wet-area floor system, not less than 5 square metres",
        "a sheet platform system for a home or equivalent, not less than 10 square metres.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "compliance requirements of the National Construction Code including requirements for attachment of decks, Australian Standards and National Association of Steel-Framed Housing (NASH) Standards relevant to installing flooring systems",
        "workplace quality policies and standards for installing flooring systems",
        "safety requirements for installing flooring systems",
        "requirements and arrangements for installing damp proof systems and termite barriers",
        "floor and flooring system types, characteristics, construction methods and installation techniques",
        "application of the following floor framing:",
        "premanufactured joists",
        "conventional bearers and joists",
        "drop-in (or in-line or deep) joist construction",
        "sub-floor frame, including timber or steel",
        "sub-floor support construction",
        "flooring support systems:",
        "concrete stumps",
        "masonry piers",
        "patented adjustable supports",
        "steel posts",
        "timber or brick walls",
        "timber stumps",
        "flooring system materials and their uses as required by the National Construction Code (NCC) and other legislation:",
        "strip flooring",
        "engineered products",
        "floor boards",
        "sheet products",
        "acclimatisation of flooring materials",
        "types of imposed loads and their effects",
        "types of insulation products",
        "plans, specifications and drawings for installing flooring systems",
        "types and uses of tools and equipment used to install flooring systems",
        "processes for calculating material requirements to minimise waste when installing flooring systems",
        "regulatory requirements applicable to floor framing and flooring",
        "setting out and levelling techniques.",
      ],
    },
    CPCCCA3004: {
      title: "Construct and erect wall frames",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Read and interpret work instructions and plan sequence of work.",
        "Plan all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Select tools and equipment, check for serviceability and report any faults.",
        "Select and use personal protective equipment (PPE) for each part of the task.",
        "Inspect work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Select materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Set out location of walls on a slab or subfloor frame.",
        "Set out wall plates and a pattern stud meeting specifications and requirements under AS:1684 Residential timber-framed construction and National Association of Steel-framed Housing (NASH): Standard Residential and Low-rise Steel Framing.",
        "Assemble wall frames, lintels and bracing.",
        "Select timber and steel frames and components.",
        "Erect frames, fix into place and align using fixtures and fastenings in accordance with AS 1684 Residential timber-framed construction and National Association of Steel-framed Housing (NASH): Standard Residential and Low-rise Steel Framing.",
        "Attach temporary wall braces.",
        "Plumb corners at intersections, straighten wall plates and complete bracing.",
        "Straighten studs to maintain a flat surface for wall coverings.",
        "Clean up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Check, maintain and store tools and equipment and report any faults.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must meet the performance criteria of this unit by:",
        "setting-out and constructing timber framed walls to a minimum height of 2.4 metres and minimum floor area of 30 square metres to accommodate roof and ceiling members and different types of cladding or linings, including:",
        "two external load-bearing walls with one window opening and one door opening in each wall",
        "two external straight walls with external intersection",
        "two internal non-load-bearing walls with one external junction",
        "setting-out and erecting steel framed walls to a minimum height of 2.4 metres and minimum floor area of 30 square metres to accommodate roof and ceiling members and different types of cladding or linings, including:",
        "two external load-bearing walls with one window opening and one door opening in each wall",
        "two external straight walls with external intersection",
        "two internal non-load-bearing walls encompassing an internal T junction and an external junction.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "compliance requirements of the National Construction Code (NCC) and Australian Standards relevant to constructing wall frames, including AS:1684 Residential timber-framed construction",
        "requirements of the National Association of Steel-framed Housing (NASH) Standards relevant to constructing and erecting wall frames",
        "workplace quality policies and standards for constructing and erecting wall frames",
        "safety requirements for constructing and erecting wall frames",
        "electrolysis and corrosion of dissimilar steels relevant to erecting steel wall frames",
        "plans, specifications and drawings for constructing and erecting wall frames",
        "types and uses of tools and equipment for constructing and erecting wall frames",
        "processes for:",
        "setting out and measuring materials for frames",
        "calculating material requirements",
        "applications for materials used for constructing and erecting wall frames",
        "timber types, structural properties and uses, including engineered timber products",
        "frame construction techniques.",
      ],
    },
    CPCCCA3005: {
      title: "Construct ceiling frames",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        // Note: The document cuts off the full list of tasks for this unit. Only partial data is available.
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must meet the performance criteria of this unit by planning, setting out, constructing and erecting a timber ceiling frame for structure with a minimum of three rooms and minimum area of 30 square metres.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "compliance requirements of the National Construction Code and Australian Standards relevant to constructing ceiling frames, including AS 1684 Residential timber-framed construction",
        "workplace quality policies and standards for constructing ceiling frames",
        "safety requirements for constructing ceiling frames:",
        "working at heights",
        "waste disposal requirements relevant to constructing ceiling frames",
        "materials handling relevant to constructing ceiling frames",
        "correct use of tools and equipment used to construct ceiling frames",
        "processes for:",
        "setting out and measuring materials for ceiling frames",
        "calculating material requirements for ceiling frames",
        "materials for constructing ceiling frames:",
        "types of timber",
        "engineered timber products and their structural properties and applications.",
      ],
    },
    CPCCCA3006: {
      title: "Erect roof trusses",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Read and interpret work instructions and plan sequence of work.",
        "Plan all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Select tools and equipment, check for serviceability and report any faults.",
        "Select and use personal protective equipment (PPE) for each part of the task.",
        "Inspect work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Identify materials required from truss layout plan, including fasteners and steel brackets, calculate quantities, handle safely and prepare and position ready for use.",
        "Set out location of roof trusses on top plates to truss layout plan.",
        "Manage lifting and handling of materials, including lifting trusses and stacking loads on wall frames ready for use.",
        "Erect, plumb and fix roof trusses to set out positions in correct sequence to align at apex.",
        "Install bottom chord at constant height above internal wall plates and use to provide lateral support for internal walls.",
        "Fix ceiling trimming and creeper trusses.",
        "Construct and fix roof bracing following AS 4440 Installation of nail-plated timber roof trusses and National Association of Steel-framed Housing (NASH) Standards.",
        "Fix lateral restraints to truss chords in position to manufacturers' specifications.",
        "Install roof and internal wall bracing connections, including tie downs, for wind load following manufacturers' guidelines and AS 4440 and NASH.",
        "Clean up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Check, maintain and store tools and equipment and report any faults.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must meet the performance criteria of this unit by:",
        "setting out and erecting timber trusses manufactured to AS 4440 installation of nail-plated timber roof trusses and steel trusses to the requirements of the NASH Standards including:",
        "a minimum 30 square metres of timber roof trusses with a major and minor span, including:",
        "one hip end and valley",
        "one gable end",
        "a minimum 30 square metres of steel roof trusses with a major and minor span, including:",
        "one hip end and valley",
        "one gable end",
        "installing:",
        "gable bracing, bottom chord bracing, web bracing and top chord bracing installed in line with the requirements of both AS 4440 Installation of nail-plated timber roof trusses to the requirements of the NASH Standards",
        "a connection between an internal brace wall running parallel to the bottom chord",
        "a connection between an internal brace wall running at 90 degrees to the bottom chord.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "compliance requirements of the National Construction Code and Australian Standards relevant to erecting roof trusses, including AS 4440 Installation of nail-plated timber roof trusses required by the National Construction Code (NCC)",
        "requirements of the National Association of Steel-framed Housing (NASH) Standards relevant to erecting roof trusses",
        "workplace quality policies and standards relevant to erecting roof trusses",
        "safety requirements for erecting roof trusses",
        "plans, specifications and drawings for erecting roof trusses",
        "types and uses of tools and equipment required to erect roof trusses",
        "materials used in roof truss erection",
        "quality requirements for roof trusses",
        "roof truss erection and construction techniques",
        "types of roof construction and components of roof trusses",
        "techniques for lifting and positioning trusses",
        "processes and requirements for the temporary and permanent bracing of roof trusses and elementary bracing principles for various shaped roofs",
        "types of timber and their structural properties and uses, including engineered timber products.",
      ],
    },
    CPCCCA3007: {
      title: "Construct pitched roofs",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Read and interpret work instructions and plan sequence of work.",
        "Plan all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Select tools and equipment, check for serviceability and report any faults.",
        "Select and use personal protective equipment (PPE) for each part of the task.",
        "Inspect work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Select materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Set out and mark position of members on top plates for roof type and rafter spacing.",
        "Determine bevels for all roof members.",
        "Calculate and set out pattern rafter to length allowing for overhang and creeper reductions.",
        "Set out and cut main ridge boards to length.",
        "Cut common rafters to length, and check.",
        "Erect common rafters in correct sequence.",
        "Calculate lengths for hip and valley rafters from pitch of roof.",
        "Cut and fix hip and valley rafters.",
        "Cut and fix creeper rafters from pattern rafter allowing for overhang.",
        "Determine lengths for under-purlins.",
        "Cut and install under-purlins.",
        "Measure, cut and install struts to under-purlins, hips, valley and ridges.",
        "Install collar ties and tie-downs to span tables in AS 1684 Residential timber-framed construction.",
        "Fit trimmers to gable ends to take gable end rafter and barge board.",
        "Cut and fix valley boards and surrounding battens.",
        "Clean up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Check, maintain and store tools and equipment and report any faults.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must meet the performance criteria of this unit by:",
        "setting-out, constructing and erecting:",
        "a skillion roof above 10 degrees for a structure of a minimum 10 square metres",
        "a roof, or a series of roofs, together covering a minimum of 30 square metres, including:",
        "a broken hip and valley",
        "a gable ends",
        "a scotch valley",
        "setting out:",
        "a pattern rafter with birdsmouth, creeper reductions and eave over-hang",
        "roof bevels",
        "strutting beams and under purlins as required by span tables in AS 1684 Residential timber-framed construction and manufacturers’ specifications.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "compliance requirements of the National Construction Code and Australian Standards relevant to constructing pitched roofs, including AS 1684 Residential timber-framed construction",
        "workplace quality policies and standards relevant to constructing pitched roofs",
        "safety requirements relevant to constructing pitched roofs",
        "roofing frame construction techniques",
        "contents of, and terms and symbols used in plans, specifications and drawings for constructing pitched roofs",
        "types and uses of tools and equipment used for constructing pitched roofs",
        "processes, relevant to constructing pitched roofs, for:",
        "setting out and measuring materials for frames",
        "calculating material requirements",
        "materials relevant to constructing pitched roofs",
        "roofing set-out procedures",
        "types, structural properties and uses of timber, engineered timber products and steel for constructing pitched roofs",
        "characteristics and construction techniques of pitched roof types:",
        "scotch valley",
        "broken hip and valley",
        "hip and valley",
        "gable and verge",
        "skillion",
        "strut/props",
        "geometric development of bevels.",
      ],
    },
    CPCCCA3008B: {
      title: "Construct eaves",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Work instructions, including plans, specifications, quality requirements and operational details, are obtained, confirmed and applied from relevant information for planning and preparation purposes.",
        "Safety (OHS) requirements are followed in accordance with safety plans and policies.",
        "Signage and barricade requirements are identified and implemented.",
        "Plant, tools and equipment selected to carry out tasks are consistent with job requirements, checked for serviceability, and any faults are rectified or reported prior to commencement.",
        "Material quantity requirements are calculated in accordance with plans, specifications and quality requirements.",
        "Materials appropriate to the work application including required fire resistance rating are identified, obtained, prepared, safely handled and located ready for use.",
        "Environmental requirements are identified for the project in accordance with environmental plans and statutory and regulatory authority obligations, and are applied.",
        "Passive and active fire control elements for eaves construction are identified and applied.",
        "Overhang of rafters is marked and cut to line, plumb and angle.",
        "Gable ends are trimmed for overhang where a verge rafter is not used.",
        "Fascia is fitted and fixed to roof structure overhang to line and level.",
        "Framework structure for eaves type are identified, and eaves design is established and set out to drawings and specifications.",
        "Timber framework members are set out, marked and cut to lengths in accordance with methods of joining and proposed framework structure.",
        "Boxed eaves constructed with soffit bearers are fixed to wall frame or supported by hangers from rafters, to line and level.",
        "Boxed eaves structure is installed, clear of top of masonry walls in veneer construction to allow for frame shrinkage and settlement.",
        "Eaves structure members are securely fixed, including back blocking and trimmers.",
        "Eaves cladding and sheeting material is marked and cut to shape to suit task application and jointing methods.",
        "Eaves lining, cladding and sheeting are fitted, joined and fixed in accordance with type of material, task application and specifications.",
        "Mouldings are fitted and fixed to specifications to finish eaves.",
        "loping eaves are fitted to underside of rafters or framing for fixing and joining of material.",
        "Work area is cleared and materials disposed of, reused or recycled in accordance with legislation, regulations, codes of practice and job specification.",
        "Plant, tools and equipment are cleaned, checked, maintained and stored in accordance with manufacturer recommendations and standard work practices.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must meet the performance criteria of this unit by marking and cutting roof members to line to accommodate plumb fascia and barge and constructing:",
        "three metres of timber verge gable eaves",
        "three metres of timber boxed gable eaves",
        "three metres of timber boxed eaves",
        "three metres of timber raked eaves",
        "three metres of steel fascia with hangers.",
        "In constructing these timber eaves, the following must be included:",
        "an apex junction on the barge board",
        "a junction between the barge board and the plumb fascia",
        "a junction of the fascia and eave lining at the valley",
        "a junction of the fascia and eave lining at the hip.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "compliance requirements of the National Construction Code (NCC) and Australian Standards relevant to constructing eaves, including AS 1684 Residential timber-framed construction and the National Association of Steel-framed Housing (NASH) Standards",
        "workplace quality policies and standards relevant to constructing eaves",
        "safety requirements for constructing eaves",
        "construction techniques for eave fascia and soffit",
        "eaves design:",
        "sloping soffits and boxed eaves",
        "verandas, concealed gutters and open eaves",
        "materials for constructing eaves:",
        "beads",
      ],
    },
    CPCCCA3010: {
      title: "Install windows and doors",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Select tools and equipment, check for serviceability and report any faults.",
        "Inspect work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Select materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Check wall frame opening for adequate clearance for window unit.",
        "Position window unit with packing and flashings so that the head and sill are level, stiles are plumb and in wind, and reveals or frame are finished flush with face of inside wall lining.",
        "Select type, gauge and quantity of fasteners as per Australian Window Association - An Industry Guide to the Correct Fixing of Windows and Doors and fix window to wall frame.",
        "Check wall frame for adequate clearance for door frame.",
        "Mark door jamb and head, cut to length, allowing for door clearances.",
        "Trench the door head to accommodate jambs, allowing for specified clearances.",
        "Assemble, square, fix and brace door frame with flush rebates.",
        "Select type, gauge and quantity of fasteners as per Australian Window Association - An Industry Guide to the Correct Fixing of Windows and Doors. Install door frame into wall frame opening, ensuring the door jambs are plumb and in wind, positioned flush to linings, head is level, and all appropriate flashings are in place.",
        "Mark out hinges and fit to door and jamb.",
        "Fit door to frame and adjust gaps to requirements of AS2688 Timber and composite doors.",
        "Fit and fix door furniture and door stop components to manufacturers' specifications.",
        "Fit hardware (rollers) to door according to manufacturer's specifications.",
        "Fit door to cavity sliding door unit and adjust height of rollers to ensure leading door edge is plumb and closes neat against cavity sliding door stile.",
        "Make final adjustments to packing of cavity sliding door stile.",
        "Fit and fix door furniture and cavity door centring locators, according to manufacturer's specifications.",
        "Clean up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Check, maintain and store tools and equipment and report any faults.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must meet the performance criteria of this unit by:",
        "installing in wall frames:",
        "a standard window",
        "a sliding cavity door unit and door",
        "constructing and fitting a standard external rebated door frame",
        "fitting and hanging one door, including door furniture, privacy set and door stops",
        "fitting and hanging a pair of doors.",
        "Knowledge Evidence",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "compliance requirements of the National Construction Code and Australian Standards, relevant to installing windows and doors, including AS2688 Timber and composite doors and AS2047 Windows and external glazed doors in buildings, and Australian Window Association - An Industry Guide to the Correct Fixing of Windows and Doors",
        "workplace quality policies and standards relevant to installing windows and doors",
        "safety requirements for installing windows and doors",
        "flashing requirements and installation techniques relevant to installing windows and doors",
        "plans, specifications and drawings for installing windows and doors",
        "types of tools and equipment required to install windows and doors, their characteristics, uses and limitations",
        "processes for setting out windows and doors",
        "processes for calculating material requirements for installing windows and doors",
        "materials relevant to installing windows and doors",
        "various types of doors:",
        "flush panel, framed and panelled, and glazed",
        "hinged door units including standard doors, sliding, flywire, combination window and door units, door sidelight units (glazed or unglazed) and internal doors",
        "jambs, stiles and sills",
        "flashing",
        "door furniture, including flush pulls, latches and deadlocks, push plates and closers, handles and locks",
        "window, door installation including flashing and fixing",
        "types of windows and doors, materials used and their characteristics and uses.",
      ],
    },
    CPCCCA3016: {
      title: "Construct, assemble and install timber external stairs",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Read and interpret work instructions and plan sequence of work.",
        "Plan all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Select tools and equipment, check for serviceability and report any faults.",
        "Select and use personal protective equipment (PPE) for each part of the task.",
        "Inspect work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Select materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Determine exit and ground finish levels from site drawings and location.",
        "Calculate rise and going of stairs.",
        "Set out newel posts to layout of designed stairs.",
        "Set out risers and goings to regulated pitch of stairs on stringers.",
        "House stringers to accommodate treads or fix metal brackets to support treads.",
        "Set out and cut material for treads to length.",
        "Cut stringers and attach into newel posts and landings.",
        "Fix treads to stringers.",
        "Locate and secure bolts to maintain stair width.",
        "Fix bracing and lateral ties to newels to maintain rigidity of stair structure.",
        "Mark material for handrails and balusters and cut to length.",
        "Fit and fix handrails and balusters.",
        "Install non-slip finish to treads.",
        "Clean up, meeting all legislative and workplace requirements for safety, waste disposal, materials handling and protection of the environment.",
        "Check, maintain and store tools and equipment and report any faults.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must meet the performance criteria of this unit by constructing, assembling and installing one flight of timber external stairs from ground level to a minimum height of 1.1 metres, including a handrail and balustrade to the open side of the flight and landing.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "compliance requirements of the National Construction Code and Australian Standards relevant to constructing, assembling and installing timber external stairs",
        "workplace quality policies and standards relevant to constructing, assembling and installing timber external stairs",
        "safety requirements for constructing, assembling and installing timber external stairs",
        "application of and requirements for line, level and plumb when constructing and installing stairs",
        "processes for reading and interpreting plans, specifications and drawings for constructing, assembling and installing timber external stairs",
        "types and uses of tools and equipment required to construct and install timber external stairs",
        "materials relevant to constructing, assembling and installing timber external stairs",
        "processes for measuring and calculating material lengths and quantities for constructing, assembling and installing timber external stairs",
        "durability, quality and treatment requirements of timber used for external stairs",
        "techniques used for constructing and installing timber external stairs, including different methods of joining and fixing components",
        "range and characteristics of different stair types",
        "characteristics of different handrails and balusters.",
      ],
    },
    CPCCCA3017: {
      title: "Install exterior cladding",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Read and interpret work instructions and plan sequence of work.",
        "Plan all work to comply with laws and regulations, the National Construction Code (NCC) including fire protection, Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Select tools and equipment, check for serviceability and report any faults.",
        "Select and use personal protective equipment (PPE) for each part of the task.",
        "Inspect work site, assess hazards and apply risk controls, including required signage and barricades.",
        "Select materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Check frames are true and plumb.",
        "Check frame and trim or pack studs to provide an even surface across studs and noggins.",
        "Fit and fix rows of noggings to frames to line, flush with wall face.",
        "Prepare frames to cladding manufacturers' installation instructions.",
        "Cut weatherproofing, vapour barrier, and flashing materials, fit into position, and secure.",
        "Identify locations for ancillary materials and prepare to required lengths, position and secure as per manufacturers' installation instructions.",
        "Determine effective cover or overlap for cladding from recommended lap, type and profile of board and height of wall.",
        "Produce set-out rod or jig.",
        "Mark locations of each profile on the building paper or corner stop to determine height of each row of profile.",
        "Cut cladding to fit length of wall faces or to join on intermediate studs.",
        "Join butt joints of cladding at centre of studs with joint flush to face and line.",
        "Join manufactured boards using manufacturers' specification/method.",
        "Fix and finish internal and external corners to manufacturers' specification/method.",
        "Determine starting position of first panel against windows, doors and corners in accordance with specified design and finished effect.",
        "Cut panelling to fit height of wall.",
        "Fix abutting joints of panelling following manufacturers' specifications and requirements for flashing.",
        "Cut, fit and fix panelling plumb and level.",
        "Clean up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Check, maintain and store tools and equipment and report any faults.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must meet the performance criteria of this unit by:",
        "producing a set-out rod for a minimum height of 2.1 metre using the effective cover of a weatherboard of a given profile",
        "installing weatherproofing, a vapour barrier and flashing",
        "fixing two different profiled weatherboards to eave height of at least 2.1 metres, incorporating an internal and an external corner with stops, flashings and sarking for a window and a door",
        "installing a minimum of two different types of external cladding panels, incorporating an internal and an external corner, abutting a window or door, and joints between boards determined by the material being used, manufacturers' recommendations and job specifications",
        "attaching vertical and horizontal cladding to frames.",
        "To demonstrate competency, a candidate must meet the performance criteria of this unit by:",
        "producing a set-out rod for a minimum height of 2.1 metre using the effective cover of a weatherboard of a given profile",
        "installing weatherproofing, a vapour barrier and flashing",
        "fixing two different profiled weatherboards to eave height of at least 2.1 metres, incorporating an internal and an external corner with stops, flashings and sarking for a window and a door",
        "installing a minimum of two different types of external cladding panels, incorporating an internal and an external corner, abutting a window or door, and joints between boards determined by the material being used, manufacturers' recommendations and job specifications",
        "attaching vertical and horizontal cladding to frames.",
      ],
    },
    CPCCCA3024: {
      title: "Install lining, panelling and moulding",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Read and interpret work instructions and plan sequence of work.",
        "Plan all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Select tools and equipment, check for serviceability and report any faults.",
        "Select and use personal protective equipment (PPE) as required for each stage of the task.",
        "Inspect work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Select materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Select fixing procedures for lining materials.",
        "Set out surface to provide a balanced panel or board effect to width and height.",
        "Mark lining materials and cut to length and/or shape, fit and position.",
        "Secure and fix panelling/lining.",
        "Install panelling/lining to plumb, level and uniform plane.",
        "Mark standard architraves for edging and cut to length, position and fit.",
        "Mark skirtings and cut to length, position and fit.",
        "Mark mitre joints, cut to length, position and fit flush to face and true without gaps.",
        "Mark scribed joints and cut to length, position and fit.",
        "Cut scotia return end to profile shape and length.",
        "Mark standard peimet moulding to length and cut, fit, assemble and fix with mitres true without gaps.",
        "Set out raked moulding to position and shape mould to pattern for each position.",
        "Clean up meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Check, maintain and store tools and equipment and report any faults.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must meet the performance criteria of this unit by completing to specifications:",
        "lining a continuous wall that includes one opening with lining boards to a minimum of 3.0 metres by 2.4 metres",
        "lining a continuous wall that includes one opening with sheet panelling to a minimum of 3.0 metres by 2.4 metres",
        "fitting profiled architraves to a minimum of one door or one window or a combination of both, with specified margins and tight fitting mitre joints",
        "cutting and fixing a profiled skirting with a minimum of one internal scribed joint and one external mitre joint with tight fitting joints",
        "scribing and mitring a Scotia, quad and colonial architrave with a minimum of one internal joint and one external mitre joint with tight fitting joints",
        "constructing a raking mould using either an internal scribed or external mitre joint with tight fitting joints.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "compliance requirements of the National Construction Code and Australian Standards relating to all aspects of installing lining, panelling and moulding",
        "workplace quality policies and standards for installing lining, panelling and moulding",
        "safety requirements for installing lining, panelling and moulding",
        "types of tools and equipment required for installing lining, panelling and moulding, and their appropriate uses",
        "processes for lining of framed walling or battened surfaces to provide a finished surface:",
        "all moulding applications where joining occurs at surface intersections and involves change of levels and mouldings running at a slope or rake.",
        "junctions of surfaces, which may be at right angles or obtuse or acute angles",
        "lining boards, which may be vertical, horizontal or raked",
        "applications of lining materials:",
        "lining, panelling, mouldings, nails, screws, adhesives and gap fillers",
        "lining and panelling sheet materials, including lining boards, veneer panelling, plywood, hardboard, MDF board, particle board and fibre cement board",
        "to floors, walls, ceilings, windows, door frames and jambs, built-in cupboards, built-in robes, fitments and stairs",
        "preparation of surfaces for lining:",
        "fixing of battens to surface",
        "trimming of frame members to line",
        "fixing of additional noggings",
        "packing of frame members",
        "wedging of frame members",
        "various mouldings:",
        "beading (flat, quad, cover strips and nosings)",
        "bull nosed",
        "multi-curved",
        "ornate period profile",
        "Scotia",
        "splayed",
        "square",
        "edging:",
        "architrave",
        "raking moulds",
        "skirting",
        "joints.",
      ],
    },
    CPCCCA3025: {
      title:
        "Read and interpret plans, specifications and drawings for carpentry work",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Locate and access plans, specifications and drawings.",
        "Verify currency of plans, specifications and drawings.",
        "Determine key features of plans, specifications and drawings.",
        "Interpret legend symbols and abbreviations.",
        "Check plans, specifications and drawings dimensions against workplace site for accuracy.",
        "Check plans and drawing dimensions against specifications for accuracy and inconsistencies.",
        "Orient the plans, specifications and drawings with the site.",
        "Locate site services, main features, contours and datum from the site plan.",
        "Review drawings, plans and specifications to determine construction details and dimensions for project.",
        "Determine location, dimensions and tolerances for ancillary works.",
        "Identify environmental controls and locations.",
        "Determine specifications for materials, standards of work, finishes and tolerances.",
        "Determine material requirements and processes to be followed.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must meet the performance criteria of this unit by reading and interpreting plans, specifications and drawings for two, minimum 30 m2, carpentry projects. Each project must have a minimum of seven materials. A candidate must prepare a work plan for each project that should identify the dimensions, material requirements and processes to be followed.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "features and uses of project documentation, including:",
        "construction plans",
        "cross-sectional plans",
        "dimensions and notes",
        "illustrations",
        "project specifications",
        "site plans, elevations, floor plans and sections",
        "structural detail and specification providing illustrations and dimensions",
        "drawings",
        "specifications",
        "supplementary specifications",
        "work schedules",
        "detail relating to materials and quality of work, quality assurance, nominated subcontractors, and provision of site access and facilities",
        "details relating to performance, including:",
        "characteristics",
        "material types",
        "standards of work",
        "tolerances",
        "treatments and finishes",
        "processes for planning and scheduling carpentry work from plans and specifications.",
      ],
    },
    CPCCCA3028: {
      title: "Erect and dismantle formwork for footings and slabs on ground",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Read and interpret work instructions and plan sequence of work.",
        "Plan all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Select tools and equipment, check for serviceability and report any faults.",
        "Select and use personal protective equipment (PPE) for each part of the task.",
        "Inspect work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Select materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Clear work area and prepare surface for safe erection of formwork.",
        "Measure, set out and level formwork.",
        "Apply fixing and fasteners to ensure stable formwork construction.",
        "Construct and erect edge rebate.",
        "Check and brace formwork for accuracy of square and dimension.",
        "Install block-outs and cast-in services to specified locations.",
        "Apply release agent to formwork face following manufacturers' specifications.",
        "Strip edge boxing and bracing support sequentially and safely.",
        "Check formwork for re-usability and dispose of damaged components to meet safety and environmental requirements.",
        "Safely de-nail, clean, oil and store or stack reusable formwork components.",
        "Clean up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Check, maintain and store tools and equipment and report any faults.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must meet the performance criteria of this unit by erecting and dismantling formwork for one slab on ground with:",
        "a minimum area of 30 square metres",
        "a minimum thickness of 100 millimetres",
        "an edge rebate and an internal corner.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "compliance requirements of the National Construction Code and Australian Standards relevant to erecting and dismantling formwork for footings and slabs on ground",
        "workplace quality policies and standards relating to formwork",
        "safety requirements for erecting and dismantling formwork for footings and slabs on ground",
        "environmental requirements for erecting and dismantling formwork for footings and slabs on ground",
        "types and uses of tools and equipment for erecting and dismantling formwork for footings and slabs on ground",
        "types, characteristics and applications of formwork materials",
        "formwork techniques",
        "types of plans, specifications and drawings relating to formwork",
        "symbols and notations used on plans, specifications and drawings for formwork",
        "processes for measuring and setting out formwork",
        "processes for calculating material requirements for erecting formwork for footings and slabs on ground",
        "requirements for line, level and plumb for erecting formwork for footings and slabs on ground.",
      ],
    },
    CPCCCM2006: {
      title: "Apply basic levelling procedures",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        // Note: The document cuts off the full list of tasks for this unit. Only partial data is available.
      ],
      demonstrateCompetency: [
        "A person who demonstrates competency in this unit must satisfy all of the elements, performance criteria and foundation skills of this unit. The person must also transfer levels and record differences in height for three different projects as required by job specifications, using at least three of the following levelling devices:",
        "a spirit level and straight edge",
        "automatic/optical levelling device",
        "levelling with water technique",
        "laser levelling device.",
        "In doing the above work, the person must:",
        "conduct a two peg test with an automatic/optical level to confirm that the instrument meets manufacturer tolerances",
        "locate, interpret and apply relevant information in job specifications to the levelling task",
        "comply with site safety plan, and health and safety regulations applicable to workplace operations",
        "comply with organisational policies and procedures, including quality requirements",
        "safely and effectively use tools and equipment",
        "communicate and work effectively and safely with others, including using agreed communication signals",
        "confirm accuracy of the readings taken, including set-up and movement of device in two locations",
        "accurately record results of each levelling procedure according to organisational requirements.",
        "A person demonstrating competency in this unit must demonstrate knowledge of:",
        "characteristics, technical capabilities and limitations of different types of levelling devices",
        "methods of performing calculations associated with levelling",
        "processes for setting out levelling tasks",
        "requirements for line, level and plumb in construction projects",
        "site and equipment safety requirements relevant to basic levelling procedures",
        "symbols and construction terminology used when interpreting construction plans",
        "techniques used when applying basic levelling procedures",
        "contents of and terms used in job safety analyses (JSA) and safe work method statements (SWMS) and the use of this documentation when levelling.",
      ],
    },
    CPCCCM2008: {
      title: "Erect and dismantle restricted height scaffolding",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Review scaffolding task and workplace-specific information relating to the task and confirm with associated personnel.",
        "Identify environmental protection and legislative requirements for scaffolding task and incorporate into planning and preparation.",
        "Identify hazards, control measures and equipment associated with the workplace and scaffolding task from job safety analysis (JSA) and safe work method statement (SWMS).",
        "Calculate scaffolding and material requirements and incorporate into planning and preparation.",
        "Determine expected loading on scaffold and supporting structure using load tables, and incorporate into planning and preparation.",
        "Identify site access and egress routes and incorporate into planning and preparation.",
        "Plan scaffolding task in accordance with workplace requirements.",
        "Apply risk control measures and equipment including installing safety signs and barriers and using personal protective equipment (PPE).",
        "Select plant, tools and equipment, check for serviceability and rectify or report any faults.",
        "Select, prepare and locate materials using safe handling techniques.",
        "Inspect scaffolding and components and label, reject or repair damaged items.",
        "Establish footing in accordance with the Australian Standard for scaffolding.",
        "Erect scaffolding in accordance with regulations, planned risk prevention and control measures, acceptable safe work practices and manufacturers' specifications.",
        "Inspect critical structural and safety areas of scaffolding for damage, corrosion and wear.",
        "Check current use of scaffolding for compliance with type of scaffolding equipment.",
        "Review scaffolding to determine if changes or modifications were scheduled as per original planning.",
        "Carry out alterations or repairs.",
        "Complete inspection log and handover.",
        "Dismantle scaffolding using reverse of procedure for erection.",
        "Clear work area and dispose of, re-use or recycle materials in accordance with legislation, regulations, codes of practice and task specifications.",
        "Clean, check, maintain and store plant, tools and equipment in accordance with manufacturers' specifications and workplace requirements.",
      ],
      demonstrateCompetency: [
        "A person who demonstrates competency in this unit must erect and dismantle one modular scaffolding system up to four metres, including three bays (one with a return), one lift with ladder, and fall and edge protection.",
        "In doing this, the person must meet the performance criteria for this unit.",
        "To be competent in this unit, a person must demonstrate knowledge of:",
        "processes for identifying and incorporating into planning for erecting and dismantling scaffolding up to 4 metres",
        "task and workplace-specific information, including:",
        "diagrams and sketches",
        "engineering design specifications and manufacturers' specifications",
        "safety date sheets (SDSs)",
        "regulatory and legislative requirements pertaining to erecting and dismantling restricted height scaffolding",
        "relevant Australian Standards.",
        "safe work procedures related to erecting and dismantling restricted height scaffolding including job safety analysis (JSA) and safe work method statement (SWMS), risk control measures and equipment, including:",
        "signage and barricades",
        "verbal, written and graphical instructions",
        "work schedules, plans and specifications",
        "scaffolding and material requirements",
        "expected loadings on scaffolding and supporting structures",
        "site access and egress routes.",
        "processes for:",
        "selecting and checking plant, tools and equipment and rectifying or reporting faults",
        "establishing footings for scaffolding up to 4 metres",
        "erecting and dismantling scaffolding up to 4 metres in accordance with regulations, planned risk prevention and control measures, acceptable safe work practices and manufacturers' specifications",
        "inspecting critical structural and safety areas of scaffolding for damage, corrosion and wear",
        "checking current use of scaffolding for compliance with type of scaffolding equipment",
        "cleaning, checking, maintaining and storing plant, tools and equipment.",
      ],
    },
    CPCCCM2012: {
      title: "Work safely at heights",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Read work order and associated drawings and consult with relevant persons to determine the proposed work-at-heights task, including where and how work is to be carried out, and the equipment or plant to be used.",
        "Participate in the development of the safe work method statement (SWMS) for the specified task.",
        "Select appropriate work-at-heights control measures including required fall restraint devices and/or fall arrest devices in accordance with workplace and regulatory requirements.",
        "Determine location of anchor points for harness-based work to safely access required work area.",
        "Review completed SWMS and clarify issues with relevant persons.",
        "Select personal protective equipment (PPE), check for serviceability and report problems.",
        "Identify unstable, fragile or brittle work surfaces and implement control measures to prevent a fall from height.",
        "Check fall protection equipment, including required fall restraint and fall arrest devices to ensure serviceability and report problems.",
        "Identify, select and install signage and barricade equipment in accordance with SWMS or relevant safe work procedure.",
        "Install/fit fall protection equipment, including fall restraint devices and fall arrest devices as appropriate, within the limitations of licensing requirements, level of authority and SWMS.",
        "Ensure required fall protection, scaffold and barriers have been adequately installed and where necessary certified, in accordance with regulatory and workplace requirements.",
        "Connect to fall protection equipment, including temporary anchor points, without being exposed to a risk of a fall from height.",
        "Consult with relevant persons to confirm fall protection equipment and safety systems are correctly fitted, adjusted and installed, and are appropriate to the task.",
        "Access work area safely and move and place tools, equipment and materials using methods that eliminate or minimise the risk of falling objects.",
        "Undertake work tasks in compliance with the SWMS and workplace requirements.",
        "Traverse between anchor points while remaining connected to the fall prevention system and protected from a risk of a fall from height.",
        "Use PPE appropriate to the task and in accordance with manufacturer requirements.",
        "Maintain communication with relevant persons while working at height.",
        "Keep fall protection equipment in place and adjust to allow for movement during work.",
        "Keep fall prevention equipment adjusted to prevent falling off or through a structure using the restraint technique.",
        "Keep scaffold/work platform components and fall barriers in place during work.",
        "Monitor control measures and consult with relevant persons to respond to changing work practices or site conditions.",
        "Exit from work area removing tools and materials in compliance with worksite procedures, safety and environmental requirements.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency in this unit, a candidate must meet the elements and performance criteria by working safely at heights above 2 m on three occasions, using different fall protection equipment/devices on each occasion.",
        "One occasion must include a restraint technique (anchor point) system with a minimum of three anchor points.",
        "The candidate must access the work area, traverse between anchor points and exit from the work area.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "workplace and regulatory requirements for working safely at heights under applicable Commonwealth, state or territory work health and safety (WHS) legislation, Australian Standards and codes of practice:",
        "hazard identification and risk control",
        "job safety and environmental analyses (JSEAs)",
        "safe work method statements (SWMSs)",
        "safety data sheets (SDSs)",
        "safety manuals and instructions for plant, tools and equipment:",
        "operation manuals",
        "manufacturer specifications",
        "safety signs and load charts for plant",
        "signage and barricades",
        "selection, fitting and use of personal protective equipment (PPE)",
        "environmental and worksite safety plans",
        "reporting problems",
        "processes for planning to work safely at heights:",
        "assessment of weather and ground conditions that may affect safety while working at heights",
        "assessment of conditions and hazards",
        "determination of work requirements",
        "identification of equipment defects",
        "inspection of worksites",
        "methods for identifying common faults with scaffold or work platform systems",
        "types, characteristics, uses and limitations of equipment used when working safely at heights:",
        "air compressors and hoses",
        "anchor points",
        "edge protection",
        "elevated work platforms (EWPs)",
        "fall arrest anchors",
        "fall arrest inertia reels",
        "guard rails",
        "hand and power tools including nail guns",
        "ladders",
        "power leads",
        "rescue equipment",
        "ropes",
        "safety harnesses, lanyards and attachments such as snap hooks and carabiners",
        "scaffolding",
        "shock absorbers",
        "stairways",
        "static line systems",
        "temporary anchor systems",
        "trestles",
        "safe methods for accessing work area, traversing between anchor points and exiting from work area including removing tools and materials when working at heights.",
      ],
    },
    CPCCCO2013: {
      title: "Carry out concreting to simple forms",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Read and interpret work instructions and plan sequence of work.",
        "Plan all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Select tools and equipment, check for serviceability and report any faults.",
        "Select and use personal protective equipment (PPE) for each part of the task.",
        "Inspect work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Select materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Prepare substrate.",
        "Review formwork design from drawings.",
        "Erect formwork.",
        "Install vapour barrier.",
        "Handle, cut and position reinforcing components.",
        "Position reinforcing bars and mesh.",
        "Position bar chairs and spacers with minimum edge cover.",
        "Clean formwork or excavation of excess material and debris before concrete placement.",
        "Transport concrete by wheelbarrow.",
        "Place concrete in formwork to specified depth.",
        "Screed concrete to the alignment of formwork and specified datums.",
        "Finish surface of concrete to specifications.",
        "Denail timber components following stripping of formwork.",
        "Clean and stack components and store for reuse or bundle for removal.",
        "Remove formwork components from site.",
        "Clean up, meeting all legislative and workplace requirements for safety, waste disposal, materials handling and protection of the environment.",
        "Check, maintain and store tools and equipment and report any faults.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must satisfy all the elements, performance criteria and foundation skills of this unit by carrying out concreting to a simple form slab of at least 1 square metre and 100 mm in depth by:",
        "preparing substrate",
        "erecting formwork",
        "cutting, placing and tying reinforcement",
        "placing and hand-screeding concrete to the required finished level and job specification.",
        "All work must be planned and performed using appropriate tools and equipment to the standard required in the workplace and must comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "compliance requirements of the National Construction Code and Australian Standards relevant to concreting to simple forms",
        "workplace quality policies and standards relevant to concreting to simple forms",
        "safety requirements for concreting to simple forms",
        "types and uses of tools and equipment required for concreting to simple forms",
        "properties and use of concrete relevant to concreting to simple forms, including:",
        "uses and limitations at differing strength levels",
        "ingredients and proportions",
        "maintaining design strength during placement",
        "mixing techniques",
        "curing techniques",
        "vibrating and over-vibration",
        "levelling techniques for concreting to simple forms",
        "materials storage and environmentally friendly waste management",
        "plans, drawings and specifications for concreting to simple forms",
        "processes for the calculation of material requirements for concreting to simple forms, including volume of concrete",
        "quality requirements for concreting to simple forms",
        "simple formwork and reinforcing componentry.",
      ],
    },
    CPCCOM1012: {
      title: "Work effectively and sustainably in the construction industry",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Participate in planning work tasks with team members.",
        "Work with team members to review team purpose, roles, responsibilities, goals, plans and objectives.",
        "Work with team members following guidelines, directions and instructions to complete work tasks.",
        "Work with team members to resolve problems that impede the team's performance.",
        "Describe the process for becoming a tradesperson or skilled operator in the construction industry.",
        "Identify own existing skills and the additional skills required for a tradesperson or skilled operator role in the construction industry.",
        "Identify environmental and resource efficiency requirements that apply to entry level roles in the construction industry.",
        "Follow requirements to identify and report environmental hazards.",
        "Follow requirements to identify and report resource efficiency issues.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must satisfy all the elements, performance criteria and foundation skills of this unit by:",
        "working effectively as a member of a team to plan and perform a construction task",
        "working with members of a team to review the team's purpose, roles, responsibilities, goals, plans and objectives",
        "listing own existing skills and the additional skills required for a selected tradesperson or skilled operator role in the construction industry",
        "identifying environmental and resource efficiency requirements that apply to entry level roles in the construction industry",
        "preparing basic reports on each of an environmental hazard and a resource efficiency issue.",
        "All work must be performed to the standard required in the workplace.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "skills and knowledge required to work effectively in the construction industry",
        "construction job roles and employment opportunities in the construction industry",
        "techniques for working effectively in a construction team environment",
        "techniques for determining own skills and skills required for career opportunities",
        "environment and resource efficiency requirements in the construction industry.",
      ],
    },
    CPCCOM1014: {
      title: "Conduct workplace communication",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Receive information and instructions from others using effective listening, questioning and speaking skills to confirm understanding.",
        "Convey information and instructions to others using effective listening, questioning and speaking skills to confirm understanding.",
        "Access and interpret basic information from a range of sources.",
        "Select and sequence information to prepare a basic written report.",
        "Select and sequence information to prepare and present a basic verbal report.",
        "Enter information into basic workplace records and documents.",
        "Describe and follow simple processes and procedures for meetings.",
        "Provide constructive contributions to meeting discussions.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must satisfy all the elements, performance criteria and foundation skills of this unit by:",
        "conveying and receiving information and instructions to and from others",
        "accessing, interpreting and sequencing information",
        "presenting information in verbal and written reports",
        "entering information into workplace records and documents",
        "participating in simple meeting processes.",
        "All work must be performed to the standard required in the workplace.",
        "To be competent in this unit, a candidate must demonstrate knowledge of techniques for:",
        "conveying and receiving information and instructions",
        "effective listening, questioning and speaking skills to confirm understanding",
        "accessing and interpreting basic information from a range of sources",
        "selecting and sequencing basic information",
        "preparing and presenting basic written reports",
        "preparing and presenting basic verbal reports",
        "participating effectively in simple meeting processes",
        "entering information into basic workplace records and documents.",
      ],
    },
    CPCCOM1015: {
      title: "Carry out measurements and calculations",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Select most appropriate equipment and method for obtaining the measurement.",
        "Use a ruler or tape to obtain linear measurements accurate to 1 mm.",
        "Take basic measurements and calculate quantities of materials in a construction environment, using basic formulae for each of: weight, area, volume, perimeter, circumference, ratio and percentage.",
        "Convert measurements in metres to millimetres and measurements in millimetres to metres.",
        "Check calculations for accuracy and record calculation workings and results.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must satisfy all the elements, performance criteria and foundation skills of this unit by:",
        "taking basic measurements and performing basic calculations to determine quantities of materials for construction work using each of the following:",
        "weight",
        "area",
        "volume",
        "perimeter",
        "circumference",
        "ratio",
        "percentage",
        "demonstrating converting measurements in metres to millimetres and measurements in millimetres to metres.",
        "All work must be performed to the standard required in the workplace.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "types of equipment required for planning and performing basic measurements and calculations and their characteristics, uses and limitations, including:",
        "rulers",
        "tape measures",
        "digital measuring and calculating devices",
        "methods of calculating the area and volume of the following in a construction environment:",
        "rectangles",
        "squares",
        "circles",
        "triangles",
        "trapeziums",
        "cubes",
        "cylinders.",
      ],
    },
    CPCCOM3001: {
      title:
        "Perform construction calculations to determine carpentry material requirements",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Review drawings, specifications and workplace requirements for a construction project.",
        "Plan all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Review drawings and specifications to determine dimensions of each type of construction material for the project.",
        "Calculate the area of each type of lining material.",
        "Calculate the total area of the building wrap and of each type of external cladding material.",
        "Calculate the total area of each type of roofing material.",
        "Calculate the quantity of materials that are measured by volume.",
        "Calculate the quantity of wall and roof framing materials.",
        "Calculate the dimensions and quantity of sheets of each type of flooring and lining material, ensuring that the most economical layout is employed.",
        "Calculate the length of linear flooring and lining material, ensuring that the most economical layout is employed.",
        "Calculate the dimensions and quantity of sheets of external cladding material, ensuring that the most economical layout is employed.",
        "Calculate the length of linear external cladding material, ensuring that the most economical layout is employed.",
        "Calculate the dimensions and quantity of sheets or units of roofing material, ensuring that the most economical layout is employed and allowing for overlaps.",
        "Record workings and review calculations for accuracy.",
        "Record results of calculations as required for costing and ordering materials.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must meet the performance criteria of this unit by analysing the drawings and specifications for a building with a minimum of 6 rooms, including a kitchen and bathroom and linear external lining, and preparing a detailed list of materials and calculated quantities of each material for:",
        "wall and roof framing",
        "internal lining and flooring",
        "external cladding and roofing.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "types of equipment required for planning and performing measurements and calculations and their characteristics, uses and limitations, including calculators",
        "methods of using formulas to calculate the area/volume of the following in a construction environment:",
        "rectangles",
      ],
    },
    CPCCOM3006: {
      title: "Carry out levelling operations",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Read and interpret work instructions and plan sequence of work.",
        "Plan all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Select tools and equipment, check for serviceability and report any faults.",
        "Select and use personal protective equipment (PPE) for each part of the task.",
        "Inspect work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Identify and select levelling device suitable for the levelling task.",
        "Set up levelling device and check for accuracy and calibration in accordance with manufacturers' specifications.",
        "Take and record levelling measurements using a levelling device to complete a levelling task.",
        "Transfer heights and check for accuracy against a datum point.",
        "Clean up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Check, maintain and store tools and equipment and report any faults.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must meet the performance criteria of this unit by setting up a levelling device and carrying out levelling operations across three different levelling tasks, including:",
        "using an optical or laser levelling device to transfer levels across a minimum distance of 10 metres",
        "using an optical or laser levelling device to establish a closed level run across a minimum distance of 20 metres with a minimum of four change points and calculating the rise and fall to determine acceptability of the levelling run",
        "using levelling equipment to establish grades.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "compliance requirements of the National Construction Code and Australian Standards relevant to levelling operations",
        "workplace quality policies and standards for levelling operations",
        "safety requirements for levelling operations",
        "application and requirements for line, level and plumb in construction projects",
        "types, characteristics, uses and limitations of levelling devices used to carry out levelling tasks, including:",
        "optical levels",
        "laser levels",
        "levelling staff and targets",
        "processes for setting up levelling devices",
        "techniques for carrying out levelling operations, including:",
        "transferring levels",
        "closed level runs",
        "calculating rise and fall",
        "establishing grades",
        "plans, specifications and drawings relating to levelling operations",
        "processes for recording and calculating measurements relating to levelling operations.",
      ],
    },
    CPCCWHS2001: {
      title:
        "Apply WHS requirements, policies and procedures in the construction industry",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Identify and assess risks in the construction workplace by applying the hierarchy of control measures.",
        "Identify and safely handle hazardous materials and substances used in the construction industry in accordance with safety data sheets (SDS).",
        "Follow workplace requirements to report hazards and risks and apply controls for working with hazardous materials and substances.",
        "Identify manual handling risks, apply controls and use safe manual handling techniques.",
        "Select, check and use personal protective equipment (PPE) as required for construction work tasks.",
        "Identify safety signs, symbols and tags in the construction workplace and follow their requirements.",
        "Follow workplace emergency and evacuation procedures and requirements.",
        "Apply basic first aid procedures in the construction workplace as required.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must satisfy all the elements, performance criteria and foundation skills of this unit by applying work health and safety (WHS) requirements while completing three different construction work tasks.",
        "Across the three tasks, the candidate must collectively demonstrate:",
        "identifying and assessing risks using the hierarchy of control measures",
        "identifying hazardous materials and substances using safety data sheets (SDSs) and safely handling them",
        "reporting hazards and risks and applying controls for working with hazardous materials and substances",
        "identifying manual handling risks, applying controls and using safe manual handling techniques",
        "selecting, checking and using personal protective equipment (PPE)",
        "identifying safety signs, symbols and tags in the construction workplace and following their requirements",
        "following workplace emergency and evacuation procedures",
        "applying basic first aid procedures.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "WHS requirements, policies and procedures in the construction industry, including:",
        "common construction hazards",
        "construction emergency procedures",
        "safety signs, symbols and tags used in the construction industry",
        "requirements for the use of personal protective equipment (PPE)",
        "safety data sheets (SDSs)",
        "the hierarchy of control measures",
        "basic first aid procedures in the construction workplace",
        "safe manual handling techniques",
        "safe work practices for the construction industry.",
      ],
    },
    CPCWHS3001: {
      title:
        "Identify construction work hazards and select risk control strategies",
      description: "RPL evidence needs to show your ability to:",
      tasks: [
        "Review workplace information, work tasks and relevant safety documentation to identify hazards associated with construction work.",
        "Inspect construction workplace to confirm hazards identified during planning and identify any new hazards.",
        "Identify health and safety risks arising from identified hazards.",
        "Consult with safety personnel and other persons to determine risk control strategies for identified hazards.",
        "Select risk control strategies in accordance with workplace and legislative requirements.",
        "Communicate risk control strategies to persons undertaking construction work tasks.",
        "Complete workplace safety documentation in accordance with workplace and legislative requirements.",
      ],
      demonstrateCompetency: [
        "To demonstrate competency, a candidate must satisfy all the elements, performance criteria and foundation skills of this unit by identifying hazards and selecting risk control strategies for three different construction work tasks.",
        "Across the three tasks, the candidate must collectively demonstrate:",
        "reviewing task and workplace-specific information to identify hazards",
        "conducting a workplace inspection to confirm and identify hazards",
        "identifying health and safety risks arising from hazards",
        "consulting with safety personnel and other persons to determine risk control strategies",
        "selecting risk control strategies in line with workplace and legislative requirements",
        "communicating risk control strategies to persons undertaking the work",
        "completing workplace safety documentation.",
        "To be competent in this unit, a candidate must demonstrate knowledge of:",
        "workplace and legislative requirements for identifying hazards and selecting risk control strategies under applicable Commonwealth, state or territory work health and safety (WHS) legislation, Australian Standards and codes of practice, including:",
        "hazard identification and risk assessment processes",
        "hierarchy of control measures",
        "job safety and environmental analyses (JSEAs)",
        "safe work method statements (SWMSs)",
        "safety data sheets (SDSs)",
        "safety manuals and instructions for plant, tools and equipment",
        "signage and barricades",
        "selection, fitting and use of personal protective equipment (PPE)",
        "environmental and worksite safety plans",
        "processes for reporting hazards, risks and incidents",
        "common construction hazards and risks associated with the following high-risk activities:",
        "electrical safety",
        "excavation work",
        "working at heights",
        "working in confined spaces",
        "hazardous chemicals and substances",
        "plant and equipment operation",
        "traffic management",
        "types, characteristics, uses and limitations of equipment used in construction work when identifying hazards and selecting risk control strategies, including:",
        "emergency response equipment",
        "first aid equipment",
        "hazard warning systems",
        "isolation barriers",
        "personal protective equipment (PPE)",
        "safety data sheets (SDSs)",
        "safety signs",
        "temporary barriers",
        "traffic control devices.",
      ],
    },
  };
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEvidenceChange = (unitCode, evidenceType, value) => {
    setFormData((prev) => {
      const unitEvidence = prev.unitEvidence || {};
      const currentUnitEvidence = unitEvidence[unitCode] || {};

      return {
        ...prev,
        unitEvidence: {
          ...unitEvidence,
          [unitCode]: {
            ...currentUnitEvidence,
            [evidenceType]: value,
          },
        },
      };
    });
  };

  const handleCompetencyResponse = (unitCode, category, index, value) => {
    setFormData((prev) => {
      const competencyResponses = prev.competencyResponses || {};
      const unitResponses = competencyResponses[unitCode] || {};
      const categoryResponses = unitResponses[category] || {};

      return {
        ...prev,
        competencyResponses: {
          ...competencyResponses,
          [unitCode]: {
            ...unitResponses,
            [category]: {
              ...categoryResponses,
              [index]: value,
            },
          },
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
    updatepage(2);
    alert("Form submitted successfully!");
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const renderIntroductionPage = () => {
    return (
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Introduction
        </h3>
        <p className="mb-4 text-sm sm:text-base">
          This Self-Assessment Information Kit is designed to help you determine
          your eligibility for Recognition of Prior Learning (RPL) for the
          Certificate III in Carpentry. By completing this self-assessment, you
          will be able to identify whether your existing skills and knowledge
          align with the requirements of the qualification.
        </p>
        <p className="mb-6 text-sm sm:text-base">
          Please read through this document carefully and answer all questions
          honestly. Your responses will help determine the most appropriate
          pathway for you to achieve your qualification.
        </p>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">
            Declaration of Understanding
          </h4>
          <p className="mb-4 text-sm sm:text-base">
            Please read and acknowledge the following:
          </p>
          <ul className="list-disc pl-5 mb-4 text-sm sm:text-base">
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

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm sm:text-base">
              Candidate's Name:
            </label>
            <input
              type="text"
              value={formData.candidateName}
              onChange={(e) =>
                handleInputChange("candidateName", e.target.value)
              }
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm sm:text-base">
              Candidate's Signature:
            </label>
            <input
              type="text"
              value={formData.candidateSignature}
              onChange={(e) =>
                handleInputChange("candidateSignature", e.target.value)
              }
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base"
              placeholder="Type your full name as signature"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm sm:text-base">
              Date:
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base"
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="declaration"
              checked={formData.declaration}
              onChange={(e) =>
                handleInputChange("declaration", e.target.checked)
              }
              className="h-4 w-4 text-green-600 border-gray-300 rounded"
            />
            <label
              htmlFor="declaration"
              className="ml-2 text-gray-700 text-sm sm:text-base"
            >
              I acknowledge and agree to the above statements
            </label>
          </div>
        </div>
      </div>
    );
  };

  const renderUnitAssessmentPage = (unitCode) => {
    const unit = unitData[unitCode];
    if (!unit) return null;

    const unitEvidence = formData.unitEvidence?.[unitCode] || {};
    const competencyResponses = formData.competencyResponses?.[unitCode] || {};

    return (
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Unit: {unitCode} - {unit.title}
        </h3>

        <div className="mb-6">
          <div
            className="bg-gray-100 p-4 rounded-md mb-4 cursor-pointer flex justify-between items-center"
            onClick={() => toggleSection(`${unitCode}-description`)}
          >
            <h4 className="font-semibold text-gray-700">Unit Description</h4>
            {expandedSections[`${unitCode}-description`] ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>

          {expandedSections[`${unitCode}-description`] && (
            <div className="bg-white p-4 border border-gray-200 rounded-md mb-4">
              <p className="mb-2 font-medium">{unit.description}</p>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
                {unit.tasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full border border-gray-200 text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-2 sm:px-4 sm:py-3 border text-left">
                    Unit of Competency / Competency Requirements
                  </th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 border text-center">
                    01. Work Experience
                    <br />
                    Do you have this evidence?
                  </th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 border text-center">
                    02. Life Experience
                    <br />
                    Do you have this evidence?
                  </th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 border text-center">
                    03. Formal Qualifications
                    <br />
                    Do you have this evidence?
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 border">
                    <strong>{unitCode}</strong> - {unit.title}
                  </td>
                  {/* <td className="px-3 py-2 sm:px-4 sm:py-3 border"></td> */}
                  <td className="px-3 py-2 sm:px-4 sm:py-3 border">
                    <div className="flex items-center space-x-2">
                      <select
                        value={unitEvidence.workExperience || ""}
                        onChange={(e) =>
                          handleEvidenceChange(
                            unitCode,
                            "workExperience",
                            e.target.value === "Yes"
                          )
                        }
                        className="p-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="">Yes/No</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <span>Add details about your work experience</span>
                    </div>
                    <textarea
                      value={unitEvidence.workExperienceNotes || ""}
                      onChange={(e) =>
                        handleEvidenceChange(
                          unitCode,
                          "workExperienceNotes",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md text-sm mt-2"
                      rows="3"
                      placeholder="Add details about your work experience"
                    ></textarea>
                  </td>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 border">
                    <div className="flex items-center space-x-2">
                      <select
                        value={unitEvidence.lifeExperience || ""}
                        onChange={(e) =>
                          handleEvidenceChange(
                            unitCode,
                            "lifeExperience",
                            e.target.value === "Yes"
                          )
                        }
                        className="p-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="">Yes/No</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <span>Add details about your life experience</span>
                    </div>
                    <textarea
                      value={unitEvidence.lifeExperienceNotes || ""}
                      onChange={(e) =>
                        handleEvidenceChange(
                          unitCode,
                          "lifeExperienceNotes",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md text-sm mt-2"
                      rows="3"
                      placeholder="Add details about your life experience"
                    ></textarea>
                  </td>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 border">
                    <div className="flex items-center space-x-2">
                      <select
                        value={unitEvidence.formalQualifications || ""}
                        onChange={(e) =>
                          handleEvidenceChange(
                            unitCode,
                            "formalQualifications",
                            e.target.value === "Yes"
                          )
                        }
                        className="p-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="">Yes/No</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <span>Add details about your formal qualifications</span>
                    </div>
                    <textarea
                      value={unitEvidence.formalQualificationsNotes || ""}
                      onChange={(e) =>
                        handleEvidenceChange(
                          unitCode,
                          "formalQualificationsNotes",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md text-sm mt-2"
                      rows="3"
                      placeholder="Add details about your formal qualifications"
                    ></textarea>
                  </td>
                </tr>

                {/* To Demonstrate Competency Section */}
                <tr className="bg-gray-100">
                  <td
                    colSpan="4"
                    className="px-3 py-2 sm:px-4 sm:py-3 border font-semibold text-gray-700"
                  >
                    To demonstrate competency:
                  </td>
                </tr>
                <tr className="bg-white">
                  <td colSpan="4" className="px-3 py-2 sm:px-4 sm:py-3 border">
                    {unit.demonstrateCompetency[0]}
                  </td>
                </tr>
                {unit.demonstrateCompetency.slice(1).map((line, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-3 py-2 sm:px-4 sm:py-3 border">
                      <span
                        className={`${
                          line.startsWith("•") ||
                          line.trim().startsWith("-") ||
                          /^\s+/.test(line)
                            ? "pl-4"
                            : ""
                        }`}
                      >
                        {line}
                      </span>
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 border">
                      <select
                        value={
                          competencyResponses.workExperience?.[index + 1] || ""
                        }
                        onChange={(e) =>
                          handleCompetencyResponse(
                            unitCode,
                            "workExperience",
                            index + 1,
                            e.target.value
                          )
                        }
                        className="border border-gray-300 rounded text-sm"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 border">
                      <select
                        value={
                          competencyResponses.lifeExperience?.[index + 1] || ""
                        }
                        onChange={(e) =>
                          handleCompetencyResponse(
                            unitCode,
                            "lifeExperience",
                            index + 1,
                            e.target.value
                          )
                        }
                        className="border border-gray-300 rounded text-sm"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 border">
                      <select
                        value={
                          competencyResponses.formalQualifications?.[
                            index + 1
                          ] || ""
                        }
                        onChange={(e) =>
                          handleCompetencyResponse(
                            unitCode,
                            "formalQualifications",
                            index + 1,
                            e.target.value
                          )
                        }
                        className="border border-gray-300 rounded text-sm"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-500 italic">
          Swipe horizontally to see more columns on mobile devices
        </p>
      </div>
    );
  };

  const renderSubmissionPage = () => {
    return (
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Submission</h3>
        <p className="mb-6 text-sm sm:text-base">
          Thank you for completing the self-assessment. Please review your
          responses before submitting.
        </p>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Additional Notes</h4>
          <textarea
            value={formData.additionalNotes}
            onChange={(e) =>
              handleInputChange("additionalNotes", e.target.value)
            }
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base"
            rows="4"
            placeholder="Add any additional information that may support your application"
          ></textarea>
        </div>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">OFFICE USE ONLY</h4>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm sm:text-base">
              Assessor's Name:
            </label>
            <input
              type="text"
              value={formData.assessorName}
              onChange={(e) =>
                handleInputChange("assessorName", e.target.value)
              }
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm sm:text-base">
              Assessor's Signature:
            </label>
            <input
              type="text"
              value={formData.assessorSignature}
              onChange={(e) =>
                handleInputChange("assessorSignature", e.target.value)
              }
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm sm:text-base">
              Date:
            </label>
            <input
              type="date"
              value={formData.assessorDate}
              onChange={(e) =>
                handleInputChange("assessorDate", e.target.value)
              }
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderPageContent = () => {
    if (currentPage === 1) {
      return renderIntroductionPage();
    } else if (currentPage <= Object.keys(unitData).length + 1) {
      const unitCodes = Object.keys(unitData);
      const unitIndex = currentPage - 2;
      if (unitIndex >= 0 && unitIndex < unitCodes.length) {
        return renderUnitAssessmentPage(unitCodes[unitIndex]);
      }
    } else {
      updatepage(30);
    }
    return null;
  };

  const totalPages = Object.keys(unitData).length + 2;

  return (
    <div className="min-h-screen mt-16 bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md bg-green-600 text-white"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="text-sm font-medium">
            Step {currentPage} of {totalPages} of Stage 1
          </span>
        </div>

        {menuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Navigation</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-md bg-gray-200"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => goToPage(1)}
                  className={`w-full text-left p-3 rounded-md ${
                    currentPage === 1
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100"
                  }`}
                >
                  Introduction
                </button>
                {Object.keys(unitData).map((unitCode, index) => (
                  <button
                    key={unitCode}
                    onClick={() => goToPage(index + 2)}
                    className={`w-full text-left p-3 rounded-md ${
                      currentPage === index + 2
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
                  className={`w-full text-left p-3 rounded-md ${
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
            <h1 className="text-2xl sm:text-3xl font-medium text-center text-emerald-600 mb-2">
              RPL Self-Assessment Information Kit
            </h1>
            <h2 className="text-lg sm:text-xl font-semibold text-center text-emerald-600 mb-6 sm:mb-8">
              Certificate III in Carpentry
            </h2>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 sm:mb-6">
              <div
                className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mb-6 sm:mb-8 hidden sm:block">
              Step {currentPage} of {totalPages} of Stage 1
            </p>

            {renderPageContent()}
            {currentPage !== totalPages && (
              <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 flex items-center justify-center sm:justify-start"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" /> Previous
                </button>

                {currentPage === totalPages ? (
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center sm:justify-start"
                  >
                    Submit <Check className="w-5 h-5 ml-1" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center sm:justify-start"
                  >
                    Next <ChevronRight className="w-5 h-5 ml-1" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RPLEvidenceAssessmentForm;
