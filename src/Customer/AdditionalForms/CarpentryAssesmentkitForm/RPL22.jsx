"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Check, Menu, X } from "lucide-react";
import RPLEvidenceAssessmentForm from "./RPLEvidenceAssessmentForm";
import toast, { Toaster } from "react-hot-toast";
import SpinnerLoader from "../../components/spinnerLoader";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const URL = import.meta.env.VITE_REACT_BACKEND_URL;

const RPL2 = () => {
  const [currentPage, setCurrentPage] = useState(29);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [applicationId, setApplicationId] = useState("");
  useEffect(() => {
    const idFromUrl = window.location.pathname.split("/")[2];
    setApplicationId(idFromUrl);
    console.log("id passed", idFromUrl);
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateSignature: "",
    date: "",
    declaration: false,
    units: {
      CPCCCA2002: Array(9).fill(""),
      CPCCCA2011: Array(12).fill(""),
      CPCCCA3001: Array(15).fill(""),
      CPCCCA3002: Array(19).fill(""),
      CPCCCA3003: Array(22).fill(""),
      CPCCCA3004: Array(16).fill(""),
      CPCCCA3005: Array(12).fill(""),
      CPCCCA3006: Array(16).fill(""),
      CPCCCA3007: Array(23).fill(""),
      CPCCCA3008: Array(22).fill(""),
      CPCCCA3010: Array(22).fill(""),
      CPCCCA3016: Array(22).fill(""),
      CPCCCA3017: Array(25).fill(""),
      CPCCCA3024: Array(20).fill(""),
      CPCCCA3025: Array(13).fill(""),
      CPCCCA3028: Array(18).fill(""),
      CPCCCM2006: Array(11).fill(""),
      CPCCCM2008: Array(21).fill(""),
      CPCCCM2012: Array(23).fill(""),
      CPCCCO2013: Array(23).fill(""),
      CPCCOM1012: Array(9).fill(""),
      CPCCOM1014: Array(8).fill(""),
      CPCCOM1015: Array(5).fill(""),
      CPCCOM3001: Array(15).fill(""),
      CPCCOM3006: Array(23).fill(""),
      CPCCWHS2001: Array(23).fill(""),
      CPCWHS3001: Array(18).fill(""),
    },
    evidenceMatrix: {
      resume: Array(27).fill(false),
      qualifications: Array(27).fill(false),
      certificates: Array(27).fill(false),
      workshops: Array(27).fill(false),
      memberships: Array(27).fill(false),
      industryDocs: Array(27).fill(false),
      jobDescription: Array(27).fill(false),
      licenses: Array(27).fill(false),
      references: Array(27).fill(false),
      certifications: Array(27).fill(false),
      demonstration: Array(27).fill(false),
      indirectDemo: Array(27).fill(false),
      products: Array(27).fill(false),
      workplaceDocs: Array(27).fill(false),
      questions: Array(27).fill(false),
      assignments: Array(27).fill(false),
      thirdParty: Array(27).fill(false),
      selfAssessment: Array(27).fill(false),
      simulation: Array(27).fill(false),
      portfolios: Array(27).fill(false),
      hobbies: Array(27).fill(false),
      supplementary: Array(27).fill(false),
    },
    additionalNotes: "",
    assessorName: "",
    assessorSignature: "",
    assessorDate: "",
  });

  const totalPages = 59; // Introduction + 2 Evidence Matrix pages + 27 units

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Submit logic would go here
  //   alert("Form submitted successfully!");
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send request to mark application as submitted
      const response = await axios.post(
        `${URL}/api/form/mark-assessment-submitted`,
        {
          applicationId,
        }
      );

      // Handle successful response
      if (response.status === 200) {
        toast.success("Form Submitted Successfully");
        navigate("/");
        console.log("Application marked as submitted");
        // You might want to redirect or update UI here
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error marking application as submitted:", error);
      toast.error(
        error.response?.data?.error ||
          "Failed to submit form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const goToPage = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Unit data for self-assessment
  const unitData555 = {
    CPCCCA2002: {
      title: "Use carpentry tools and equipment",
      tasks: [
        "Reviewed work instructions to use tools and equipment.",
        "Planned all work to comply with laws and regulations, national construction codes, Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications and workplace requirements.",
        "Selected and used personal protective equipment (PPE) for each part of the task.",
        "Inspected work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Selected equipment and hand, power, and pneumatic tools for the carpentry task, identify their functions and operations, check for serviceability and report any faults.",
        "Used equipment and hand, power and pneumatic tools following WHS requirements and manufacturers' recommendations.",
        "Sharpened and maintained tools.",
        "Cleaned up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Checked, maintained, stored and secured tools and equipment and report any faults.",
      ],
    },
    CPCCCA2011: {
      title: "Handle carpentry materials",
      tasks: [
        "Read and interpreted work instructions and plan sequence of work.",
        "Planned all work to comply with laws and regulations, work health and safety (WHS) and environmental requirements, manufacturers' specifications and workplace requirements.",
        "Selected tools and equipment, check for serviceability and report any faults.",
        "Selected and used personal protective equipment (PPE) for each part of the task.",
        "Inspected work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Applied safe manual handling techniques to move carpentry materials to specified location.",
        "Sorted carpentry materials to suit material type and size, and stack clear of access ways for ease of identification, retrieval, task sequence and task location.",
        "Protected carpentry materials against physical and water damage.",
        "Stacked and secured carpentry materials for mechanical handling in accordance with the type of material and equipment to be used.",
        "Unloaded, moved or located carpentry materials at specified location.",
        "Checked tools and equipment and report any faults.",
        "Stored tools and equipment in accordance with workplace requirements.",
      ],
    },
    CPCCCA3001: {
      title: "Carry out general demolition of minor building structures",
      tasks: [
        "Reviewed and clarified task for demolition of minor building structures.",
        "Assessed minor building structures to determine scope of demolition work.",
        "Reviewed jurisdictional requirements for demolition of minor building structures.",
        "Reviewed work health and safety (WHS) requirements for the task in accordance with safety plans and policies.",
        "Identified and managed risks including determining the status of existing services.",
        "Identified safety signage and barricade requirements.",
        "Reviewed environmental requirements for the task in accordance with environmental plans and legislative requirements.",
        "Selected plant, tools and equipment, check for serviceability and rectify or report any faults.",
        "Erected identified safety signage and barricades, and fit personal protective equipment (PPE).",
        "Completed preparatory work for demolition of minor building structures.",
        "Carried out demolition procedures in accordance with safe and effective processes of deconstructing or demolishing a minor building structure.",
        "Safely and effectively handled materials and building component parts to designated storage area using appropriate material-handling techniques.",
        "Safely and effectively handled, stored and stacked materials and components identified for salvaging, ready for transport.",
        "Cleared work area and disposed of non-salvageable materials in accordance with legislation, regulations, codes of practice and task requirements.",
        "Cleaned, checked, maintained and stored tools and equipment in accordance with manufacturers' specifications and workplace requirements.",
      ],
    },
    CPCCCA3002: {
      title: "Carry out setting out",
      tasks: [
        "Read and interpreted work instructions and plan sequence of work.",
        "Planned all work to comply with laws and regulations, Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Selected tools and equipment, check for serviceability and report any faults.",
        "Selected and use personal protective equipment (PPE) for each part of the task.",
        "Inspected work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Located survey pegs at corners of site.",
        "Set string lines to accurately show site boundary markings in accordance with site drawings and survey pegs.",
        "Determined, from drawings, the distance of the building line from the boundary or existing building.",
        "Determined approximate position and length of line and building clearances at each end from drawings and survey pegs.",
        "Installed pegs and profiles, ensuring that they are level across and between one another and have adequate provision to mark footing width on profile.",
        "Accurately marked location for line with nails on profiles and set taut string line to true alignment with boundary.",
        "Determined and marked corner of building with peg on set building line to true measurement from adjacent boundary.",
        "Used triangulation principles to set up right angle to line from corner peg.",
        "Installed profiles to approximate level of other profiles and set taut string line to right-angled alignment.",
        "Installed profiles for remaining building lines level with established profiles.",
        "Marked measurements for remaining building lines accurately, and nail on profiles to dimensions from drawings.",
        "Set taut string lines to nailed locations on profiles.",
        "Checked diagonal measurements for square and adjust lines to provide square relationship within 3 mm tolerance over minimum diagonal length of 10 m.",
        "Checked measurements for accuracy.",
      ],
    },
    CPCCCA3003: {
      title: "Install flooring systems",
      tasks: [
        "Read and interpreted work instructions and plan sequence of work.",
        "Planned all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Selected tools and equipment, check for serviceability and report any faults.",
        "Selected and use personal protective equipment (PPE) as required for each stage of the task.",
        "Inspected work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Selected materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Positioned support structure, stumps/piers to set-out lines, drawings and specifications.",
        "Installed support structure.",
        "Checked support structure, posts, stumps and piers for level, plumb and square.",
        "Marked and cut bearer material to lengths for joining over supports.",
        "Made arrangements for damp proof course and termite shield to be installed where specified by regulations.",
        "Located and fixed bearers and check and adjust for square, in-line and level.",
        "Fixed waling plates for decks and balconies to external walls.",
        "Set out location for floor joists using spacings in accordance with drawings and specifications.",
        "Checked floor joists for straightness, then fit and fix to line and level.",
        "Fitted and fixed supporting blocks and trimmers around doorways and openings.",
        "Cut, fit and fixed trimmers to support sheet flooring joints.",
        "Checked flooring materials for suitability.",
        "Confirmed floor measurements and cut and prepare flooring materials for installation with a minimum of waste.",
        "Installed and secured flooring to manufacturers' specifications.",
        "Cleaned up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Checked, maintained and stored tools and equipment and report any faults.",
      ],
    },
    CPCCCA3004: {
      title: "Construct and erect wall frames",
      tasks: [
        "Read and interpreted work instructions and plan sequence of work.",
        "Planned all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Selected tools and equipment, check for serviceability and report any faults.",
        "Selected and use personal protective equipment (PPE) for each part of the task.",
        "Inspected work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Selected materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Set out location of walls on a slab or subfloor frame.",
        "Set out wall plates and a pattern stud meeting specifications and requirements under AS:1684 Residential timber-framed construction and National Association of Steel-framed Housing (NASH): Standard Residential and Low-rise Steel Framing.",
        "Assembled wall frames, lintels and bracing.",
        "Selected timber and steel frames and components.",
        "Erected frames, fix into place and align using fixtures and fastenings in accordance with AS 1684 Residential timber-framed construction and National Association of Steel-framed Housing (NASH): Standard Residential and Low-rise Steel Framing.",
        "Attached temporary wall braces.",
        "Plumbed corners at intersections, straightened wall plates and complete bracing.",
        "Straightened studs to maintain a flat surface for wall coverings.",
        "Cleaned up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Checked, maintained and stored tools and equipment and report any faults.",
      ],
    },
    CPCCCA3005: {
      title: "Construct ceiling frames",
      tasks: [
        "Read and interpreted work instructions and plan sequence of work.",
        "Planned all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Selected tools and equipment, check for serviceability and report any faults.",
        "Selected and use personal protective equipment (PPE) for each part of the task.",
        "Inspected work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Selected ceiling frame materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Identified rafter positions for roof type and set out on top plates to determine ceiling joist positions.",
        "Set out location of ceiling joists on the top plate to specifications and spacing requirements of ceiling lining.",
        "Designed and set out for ceiling joist support members to meet the requirements of AS 1684 Residential timber-framed construction.",
        "Cut and installed ceiling joists, trimmers, hanging beams, counter beams, strutting beams and combinations of these components as per AS 1684.",
        "Cleaned up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Checked, maintained and stored tools and equipment and report any faults.",
      ],
    },
    CPCCCA3006: {
      title: "Erect roof trusses",
      tasks: [
        "Read and interpreted work instructions and plan sequence of work.",
        "Planned all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Selected tools and equipment, check for serviceability and report any faults.",
        "Selected and use personal protective equipment (PPE) for each part of the task.",
        "Inspected work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Identified materials required from truss layout plan, including fasteners and steel brackets, calculate quantities, handle safely and prepare and position ready for use.",
        "Set out location of roof trusses on top plates to truss layout plan.",
        "Managed lifting and handling of materials, including lifting trusses and stacking loads on wall frames ready for use.",
        "Erected, plumbed and fixed roof trusses to set out positions in correct sequence to align at apex.",
        "Installed bottom chord at constant height above internal wall plates and use to provide lateral support for internal walls.",
        "Fixed ceiling trimming and creeper trusses.",
        "Constructed and fixed roof bracing following AS 4440 Installation of nail-plated timber roof trusses and National Association of Steel-framed Housing (NASH) Standards.",
        "Fixed lateral restraints to truss chords in position to manufacturers' specifications.",
        "Installed roof and internal wall bracing connections, including tie downs, for wind load following manufacturers' guidelines and AS 4440 and NASH.",
        "Cleaned up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Checked, maintained and stored tools and equipment and report any faults.",
      ],
    },
    CPCCCA3007: {
      title: "Construct pitched roofs",
      tasks: [
        "Read and interpreted work instructions and plan sequence of work.",
        "Planned all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Selected tools and equipment, check for serviceability and report any faults.",
        "Selected and use personal protective equipment (PPE) for each part of the task.",
        "Inspected work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Selected materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Set out and mark position of members on top plates for roof type and rafter spacing.",
        "Determined bevels for all roof members.",
        "Calculated and set out pattern rafter to length allowing for overhang and creeper reductions.",
        "Set out and cut main ridge boards to length.",
        "Cut common rafters to length, and check.",
        "Erected common rafters in correct sequence.",
        "Calculated lengths for hip and valley rafters from pitch of roof.",
        "Cut and fixed hip and valley rafters.",
        "Cut and fixed creeper rafters from pattern rafter allowing for overhang.",
        "Determined lengths for under-purlins.",
        "Cut and installed under-purlins.",
        "Measured, cut and installed struts to under-purlins, hips, valley and ridges.",
        "Installed collar ties and tie-downs to span tables in AS 1684 Residential timber-framed construction.",
        "Fitted trimmers to gable ends to take gable end rafter and barge board.",
        "Cut and fixed valley boards and surrounding battens.",
        "Cleaned up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Checked, maintained and stored tools and equipment and report any faults.",
      ],
    },
    CPCCCA3008: {
      title: "Construct eaves",
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
        "Sloping eaves are fitted to underside of rafters or framing for fixing and joining of material.",
        "Work area is cleared and materials disposed of, reused or recycled in accordance with legislation, regulations, codes of practice and job specification.",
        "Plant, tools and equipment are cleaned, checked, maintained and stored in accordance with manufacturer recommendations and standard work practices.",
      ],
    },
    CPCCCA3010: {
      title: "Install windows and doors",
      tasks: [
        "Read and interpreted work instructions and plan sequence of work.",
        "Planned all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Selected tools and equipment, check for serviceability and report any faults.",
        "Selected tools and equipment, check for serviceability and report any faults.",
        "Inspected work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Selected materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Checked wall frame opening for adequate clearance for window unit.",
        "Positioned window unit with packing and flashings so that the head and sill are level, stiles are plumb and in wind, and reveals or frame are finished flush with face of inside wall lining.",
        "Selected type, gauge and quantity of fasteners as per Australian Window Association - An Industry Guide to the Correct Fixing of Windows and Doors and fix window to wall frame.",
        "Checked wall frame for adequate clearance for door frame.",
        "Marked door jamb and head, cut to length, allowing for door clearances.",
        "Trenched the door head to accommodate jambs, allowing for specified clearances.",
        "Assembled, squared, fixed and braced door frame with flush rebates.",
        "Selected type, gauge and quantity of fasteners as per Australian Window Association - An Industry Guide to the Correct Fixing of Windows and Doors. Installed door frame into wall frame opening, ensuring the door jambs are plumb and in wind, positioned flush to linings, head is level, and all appropriate flashings are in place.",
        "Marked out hinges and fit to door and jamb.",
        "Fitted door to frame and adjust gaps to requirements of AS2688 Timber and composite doors.",
        "Fitted and fixed door furniture and door stop components to manufacturers' specifications.",
        "Fitted hardware (rollers) to door according to manufacturer's specifications.",
        "Fitted door to cavity sliding door unit and adjust height of rollers to ensure leading door edge is plumb and closes neat against cavity sliding door stile.",
        "Made final adjustments to packing of cavity sliding door stile.",
        "Fitted and fixed door furniture and cavity door centring locators, according to manufacturer's specifications.",
        "Cleaned up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Checked, maintained and stored tools and equipment and report any faults.",
      ],
    },
    CPCCCA3016: {
      title: "Construct, assemble and install timber external stairs",
      tasks: [
        "Read and interpreted work instructions and plan sequence of work.",
        "Planned all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Selected tools and equipment, check for serviceability and report any faults.",
        "Selected and use personal protective equipment (PPE) for each part of the task.",
        "Inspected work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Selected materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Determined exit and ground finish levels from site drawings and location.",
        "Calculated rise and going of stairs.",
        "Set out newel posts to layout of designed stairs.",
        "Set out risers and goings to regulated pitch of stairs on stringers.",
        "Housed stringers to accommodate treads or fix metal brackets to support treads.",
        "Set out and cut material for treads to length.",
        "Cut stringers and attach into newel posts and landings.",
        "Fixed treads to stringers.",
        "Located and secured bolts to maintain stair width.",
        "Fixed bracing and lateral ties to newels to maintain rigidity of stair structure.",
        "Marked material for handrails and balusters and cut to length.",
        "Fitted and fixed handrails and balusters.",
        "Installed non-slip finish to treads.",
        "Cleaned up, meeting all legislative and workplace requirements for safety, waste disposal, materials handling and protection of the environment.",
        "Checked, maintained and stored tools and equipment and report any faults.",
      ],
    },
    CPCCCA3017: {
      title: "Install exterior cladding",
      tasks: [
        "Read and interpreted work instructions and plan sequence of work.",
        "Planned all work to comply with laws and regulations, the National Construction Code (NCC) including fire protection, Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Selected tools and equipment, check for serviceability and report any faults.",
        "Selected and use personal protective equipment (PPE) for each part of the task.",
        "Inspected work site, assess hazards and apply risk controls, including required signage and barricades.",
        "Selected materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Checked frames are true and plumb.",
        "Checked frame and trim or pack studs to provide an even surface across studs and noggins.",
        "Fitted and fixed rows of noggings to frames to line, flush with wall face.",
        "Prepared frames to cladding manufacturers' installation instructions.",
        "Cut weatherproofing, vapour barrier, and flashing materials, fit into position, and secure.",
        "Identified locations for ancillary materials and prepared to required lengths, position and secure as per manufacturers' installation instructions.",
        "Determined effective cover or overlap for cladding from recommended lap, type and profile of board and height of wall.",
        "Produced set-out rod or jig.",
        "Marked locations of each profile on the building paper or corner stop to determine height of each row of profile.",
        "Cut cladding to fit length of wall faces or to join on intermediate studs.",
        "Joined butt joints of cladding at centre of studs with joint flush to face and line.",
        "Joined manufactured boards using manufacturers' specification/method.",
        "Fixed and finished internal and external corners to manufacturers' specification/method.",
        "Determined starting position of first panel against windows, doors and corners in accordance with specified design and finished effect.",
        "Cut panelling to fit height of wall.",
        "Fixed abutting joints of panelling following manufacturers' specifications and requirements for flashing.",
        "Cut, fit and fixed panelling plumb and level.",
        "Cleaned up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Checked, maintained and stored tools and equipment and report any faults.",
      ],
    },
    CPCCCA3024: {
      title: "Install lining, panelling and moulding",
      tasks: [
        "Read and interpreted work instructions and plan sequence of work.",
        "Planned all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Selected tools and equipment, check for serviceability and report any faults.",
        "Selected and use personal protective equipment (PPE) as required for each stage of the task.",
        "Inspected work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Selected materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Selected fixing procedures for lining materials.",
        "Set out surface to provide a balanced panel or board effect to width and height.",
        "Marked lining materials and cut to length and/or shape, fit and position.",
        "Secured and fixed panelling/lining.",
        "Installed panelling/lining to plumb, level and uniform plane.",
        "Marked standard architraves for edging and cut to length, position and fit.",
        "Marked skirtings and cut to length, position and fit.",
        "Marked mitre joints, cut to length, position and fit flush to face and true without gaps.",
        "Marked scribed joints and cut to length, position and fit.",
        "Cut scotia return end to profile shape and length.",
        "Marked standard pelmet moulding to length and cut, fit, assemble and fix with mitres true without gaps.",
        "Set out raked moulding to position and shape mould to pattern for each position.",
        "Cleaned up meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Checked, maintained and stored tools and equipment and report any faults.",
      ],
    },
    CPCCCA3025: {
      title:
        "Read and interpret plans, specifications and drawings for carpentry work",
      tasks: [
        "Located and accessed plans, specifications and drawings.",
        "Verified currency of plans, specifications and drawings.",
        "Determined key features of plans, specifications and drawings.",
        "Interpreted legend symbols and abbreviations.",
        "Checked plans, specifications and drawings dimensions against workplace site for accuracy.",
        "Checked plans and drawing dimensions against specifications for accuracy and inconsistencies.",
        "Oriented the plans, specifications and drawings with the site.",
        "Located site services, main features, contours and datum from the site plan.",
        "Reviewed drawings, plans and specifications to determine construction details and dimensions for project.",
        "Determined location, dimensions and tolerances for ancillary works.",
        "Identified environmental controls and locations.",
        "Determined specifications for materials, standards of work, finishes and tolerances.",
        "Determined material requirements and processes to be followed.",
      ],
    },
    CPCCCA3028: {
      title: "Erect and dismantle formwork for footings and slabs on ground",
      tasks: [
        "Read and interpreted work instructions and plan sequence of work.",
        "Planned all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Selected tools and equipment, check for serviceability and report any faults.",
        "Selected and use personal protective equipment (PPE) for each part of the task.",
        "Inspected work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Selected materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Cleared work area and prepared surface for safe erection of formwork.",
        "Measured, set out and leveled formwork.",
        "Applied fixing and fasteners to ensure stable formwork construction.",
        "Constructed and erected edge rebate.",
        "Checked and braced formwork for accuracy of square and dimension.",
        "Installed block-outs and cast-in services to specified locations.",
        "Applied release agent to formwork face following manufacturers' specifications.",
        "Stripped edge boxing and bracing support sequentially and safely.",
        "Checked formwork for re-usability and dispose of damaged components to meet safety and environmental requirements.",
        "Safely de-nailed, cleaned, oiled and stored or stacked reusable formwork components.",
        "Cleaned up, meeting all legislative and workplace requirements for safety, waste disposal and materials handling.",
        "Checked, maintained and stored tools and equipment and report any faults.",
      ],
    },
    CPCCCM2006: {
      title: "Apply basic levelling procedures",
      tasks: [
        "Job requirements are obtained, confirmed with relevant personnel, and applied to planning.",
        "Work site is inspected, and conditions and hazards are identified within scope of own role and reported according to workplace procedures.",
        "Health and safety requirements for levelling procedures are confirmed and applied to planning.",
        "Levelling tools and equipment are selected according to job requirements, checked for serviceability, and faults are rectified or reported before starting work.",
        "Team roles and verbal and non-verbal communication signals are confirmed, as required.",
        "Required heights or levels are identified from work instructions.",
        "Levelling device is set up, and levelling device tolerance is checked according to manufacturer specifications.",
        "Levels are shot and heights are transferred to required location and marked according to job requirements.",
        "Results of levelling activities are documented according to organisational requirements.",
        "Work area is cleared and materials sorted and removed or recycled according to statutory and regulatory authority requirements.",
        "Tools and equipment are cleaned, checked, maintained and stored according to manufacturer specifications.",
      ],
    },
    CPCCCM2008: {
      title: "Erect and dismantle restricted height scaffolding",
      tasks: [
        "Reviewed scaffolding task and workplace-specific information relating to the task and confirm with associated personnel.",
        "Identified environmental protection and legislative requirements for scaffolding task and incorporate into planning and preparation.",
        "Identified hazards, control measures and equipment associated with the workplace and scaffolding task from job safety analysis (JSA) and safe work method statement (SWMS).",
        "Calculated scaffolding and material requirements and incorporate into planning and preparation.",
        "Determined expected loading on scaffold and supporting structure using load tables, and incorporate into planning and preparation.",
        "Identified site access and egress routes and incorporate into planning and preparation.",
        "Planned scaffolding task in accordance with workplace requirements.",
        "Applied risk control measures and equipment including installing safety signs and barriers and using personal protective equipment (PPE).",
        "Selected plant, tools and equipment, check for serviceability and rectify or report any faults.",
        "Selected, prepared and located materials using safe handling techniques.",
        "Inspected scaffolding and components and label, reject or repair damaged items.",
        "Established footing in accordance with the Australian Standard for scaffolding.",
        "Erected scaffolding in accordance with regulations, planned risk prevention and control measures, acceptable safe work practices and manufacturers' specifications.",
        "Inspected critical structural and safety areas of scaffolding for damage, corrosion and wear.",
        "Checked current use of scaffolding for compliance with type of scaffolding equipment.",
        "Reviewed scaffolding to determine if changes or modifications were scheduled as per original planning.",
        "Carried out alterations or repairs.",
        "Completed inspection log and handover.",
        "Dismantled scaffolding using reverse of procedure for erection.",
        "Cleared work area and dispose of, re-use or recycle materials in accordance with legislation, regulations, codes of practice and task specifications.",
        "Cleaned, checked, maintained and stored plant, tools and equipment in accordance with manufacturers' specifications and workplace requirements.",
      ],
    },
    CPCCCM2012: {
      title: "Work safely at heights",
      tasks: [
        "Read work order and associated drawings and consult with relevant persons to determine the proposed work-at-heights task, including where and how work is to be carried out, and the equipment or plant to be used.",
        "Participated in the development of the safe work method statement (SWMS) for the specified task.",
        "Selected appropriate work-at-heights control measures including required fall restraint devices and/or fall arrest devices in accordance with workplace and regulatory requirements.",
        "Determined location of anchor points for harness-based work to safely access required work area.",
        "Reviewed completed SWMS and clarify issues with relevant persons.",
        "Selected personal protective equipment (PPE), check for serviceability and report problems.",
        "Identified unstable, fragile or brittle work surfaces and implement control measures to prevent a fall from height.",
        "Checked fall protection equipment, including required fall restraint and fall arrest devices to ensure serviceability and report problems.",
        "Identified, selected and installed signage and barricade equipment in accordance with SWMS or relevant safe work procedure.",
        "Installed/fitted fall protection equipment, including fall restraint devices and fall arrest devices as appropriate, within the limitations of licensing requirements, level of authority and SWMS.",
        "Ensured required fall protection, scaffold and barriers have been adequately installed and where necessary certified, in accordance with regulatory and workplace requirements.",
        "Connected to fall protection equipment, including temporary anchor points, without being exposed to a risk of a fall from height.",
        "Consulted with relevant persons to confirm fall protection equipment and safety systems are correctly fitted, adjusted and installed, and are appropriate to the task.",
        "Accessed work area safely and moved and placed tools, equipment and materials using methods that eliminate or minimise the risk of falling objects.",
        "Undertook work tasks in compliance with the SWMS and workplace requirements.",
        "Traversed between anchor points while remaining connected to the fall prevention system and protected from a risk of a fall from height.",
        "Used PPE appropriate to the task and in accordance with manufacturer requirements.",
        "Maintained communication with relevant persons while working at height.",
        "Kept fall protection equipment in place and adjusted to allow for movement during work.",
        "Kept fall prevention equipment adjusted to prevent falling off or through a structure using the restraint technique.",
        "Kept scaffold/work platform components and fall barriers in place during work.",
        "Monitored control measures and consulted with relevant persons to respond to changing work practices or site conditions.",
        "Exited from work area removing tools and materials in compliance with worksite procedures, safety and environmental requirements.",
      ],
    },
    CPCCCO2013: {
      title: "Carry out concreting to simple forms",
      tasks: [
        "Read and interpreted work instructions and plan sequence of work.",
        "Planned all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Selected tools and equipment, check for serviceability and report any faults.",
        "Selected and use personal protective equipment (PPE) for each part of the task.",
        "Inspected work site, locate services, assess hazards and apply risk controls, including required signage and barricades.",
        "Selected materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Prepared substrate.",
        "Reviewed formwork design from drawings.",
        "Erected formwork.",
        "Installed vapour barrier.",
        "Handled, cut and positioned reinforcing components.",
        "Positioned reinforcing bars and mesh.",
        "Positioned bar chairs and spacers with minimum edge cover.",
        "Cleaned formwork or excavation of excess material and debris before concrete placement.",
        "Transported concrete by wheelbarrow.",
        "Placed concrete in formwork to specified depth.",
        "Screeded concrete to the alignment of formwork and specified datums.",
        "Finished surface of concrete to specifications.",
        "Denailed timber components following stripping of formwork.",
        "Cleaned and stacked components and store for reuse or bundle for removal.",
        "Removed formwork components from site.",
        "Cleaned up, meeting all legislative and workplace requirements for safety, waste disposal, materials handling and protection of the environment.",
        "Checked, maintained and stored tools and equipment and report any faults.",
      ],
    },
    CPCCOM1012: {
      title: "Work effectively and sustainably in the construction industry",
      tasks: [
        "Participated in planning work tasks with team members.",
        "Worked with team members to review team purpose, roles, responsibilities, goals, plans and objectives.",
        "Worked with team members following guidelines, directions and instructions to complete work tasks.",
        "Worked with team members to resolve problems that impede the team's performance.",
        "Described the process for becoming a tradesperson or skilled operator in the construction industry.",
        "Identified own existing skills and the additional skills required for a tradesperson or skilled operator role in the construction industry.",
        "Identified environmental and resource efficiency requirements that apply to entry level roles in the construction industry.",
        "Followed requirements to identify and report environmental hazards.",
        "Followed requirements to identify and report resource efficiency issues.",
      ],
    },
    CPCCOM1014: {
      title: "Conduct workplace communication .",
      tasks: [
        "Received information and instructions from others using effective listening, questioning and speaking skills to confirm understanding.",
        "Conveyed information and instructions to others using effective listening, questioning and speaking skills to confirm understanding.",
        "Accessed and interpreted basic information from a range of sources.",
        "Selected and sequenced information to prepare a basic written report.",
        "Selected and sequenced information to prepare and present a basic verbal report.",
        "Entered information into basic workplace records and documents.",
        "Described and followed simple processes and procedures for meetings.",
        "Provided constructive contributions to meeting discussions.",
      ],
    },
    // CPCCOM1114: {
    //   title: "Conduct workplace communication",
    //   tasks: [
    //     "Select most appropriate equipment and method for obtaining the measurement",
    //     "Use a ruler or tape to obtain linear measurements accurate to 1 mm.",
    //     "Take basic measurements and calculate quantities of materials in a construction environment, using basic formulae for each of: weight, area, volume, perimeter, circumference, ratio and percentage.",
    //     "Convert measurements in metres to millimetres and measurements in millimetres to metres.",
    //     "Check calculations for accuracy and record calculation workings and results. ",
    //   ],
    // },
    CPCCOM1015: {
      title: "Carry out measurements and calculations",
      tasks: [
        "Selected most appropriate equipment and method for obtaining the measurement.",
        "Used a ruler or tape to obtain linear measurements accurate to 1 mm.",
        "Took basic measurements and calculate quantities of materials in a construction environment, using basic formulae for each of: weight, area, volume, perimeter, circumference, ratio and percentage.",
        "Converted measurements in metres to millimetres and measurements in millimetres to metres.",
        "Checked calculations for accuracy and record calculation workings and results.",
      ],
    },
    CPCCOM3001: {
      title:
        "Perform construction calculations to determine carpentry material requirements",
      tasks: [
        "Reviewed drawings, specifications and workplace requirements for a construction project.",
        "Planned all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Reviewed drawings and specifications to determine dimensions of each type of construction material for the project.",
        "Calculated the area of each type of lining material.",
        "Calculated the total area of the building wrap and of each type of external cladding material.",
        "Calculated the total area of each type of roofing material.",
        "Calculated the quantity of materials that are measured by volume.",
        "Calculated the quantity of wall and roof framing materials.",
        "Calculated the dimensions and quantity of sheets of each type of flooring and lining material, ensuring that the most economical layout is employed.",
        "Calculated the length of linear flooring and lining material, ensuring that the most economical layout is employed.",
        "Calculated the dimensions and quantity of sheets of external cladding material, ensuring that the most economical layout is employed.",
        "Calculated the length of linear external cladding material, ensuring that the most economical layout is employed.",
        "Calculated the dimensions and quantity of sheets or units of roofing material, ensuring that the most economical layout is employed and allowing for overlaps.",
        "Recorded workings and review calculations for accuracy.",
        "Recorded results of calculations as required for costing and ordering materials.",
      ],
    },
    CPCCOM3006: {
      title: "Carry out levelling operations",
      tasks: [
        "Read and interpreted work instructions and plan sequence of work.",
        "Planned all work to comply with laws and regulations, Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, workplace requirements, drawings and specifications.",
        "Selected tools and equipment, including personal protective equipment (PPE), check for serviceability and report any faults.",
        "Fit PPE correctly.",
        "Inspected work site, assess hazards and services, and apply risk controls, including required signage and barricades.",
        "Selected materials required for task, calculate quantities, handle safely and prepare and position ready for use.",
        "Confirmed team roles and verbal and non-verbal communication signals.",
        "Set up and test instrument for operational effectiveness and accuracy.",
        "Set up or locate datum point.",
        "Took and recorded readings from the datum and at nominated or selected stations following project specifications.",
        "Identified backsights, intermediate sights and foresights, and book levels.",
        "Transferred instrument to another location, repeat process, and record change station and record readings.",
        "Calculated reduced levels for all stations using rise and fall method, and check accuracy of recordings using the three-check method.",
        "Set up and test instrument for operational effectiveness and accuracy, and check tolerances.",
        "Set up or locate datum point.",
        "Took and recorded readings to datum and establish the height of collimation.",
        "Transferred instrument to another location, establish new height of collimation, and record change station in field book.",
        "Calculated reduced levels using height of instrument method.",
        "Calculated reduced levels for all stations and record heights and levels in field book.",
        "Checked accuracy of readings using height of collimation method of calculation and three check method.",
        "Calculated distances from instrument to stations using staff, stadia lines, and identified factor of levelling instrument.",
        "Recorded readings and distances.",
      ],
    },
    CPCCWHS2001: {
      title:
        "Apply WHS requirements, policies and procedures in the construction industry",
      tasks: [
        "Identified, assessed and reported hazards in the work area to designated personnel.",
        "Reported safety risks in the work area based on identified hazards, to designated personnel.",
        "Followed safe work practices, duty of care requirements and safe work instructions for controlling risks.",
        "Contributed to WHS, hazard, accident or incident reports in accordance with workplace procedures, Australian government and state or territory WHS legislation, and relevant information.",
        "Correctly identified and, if appropriate, handled and used hazardous materials on a work site in accordance with legislative requirements, and workplace policies and procedures.",
        "Applied measures for controlling risks and construction hazards effectively and immediately.",
        "Used appropriate signs and symbols to secure hazardous materials that have safety implications for self and other workers, immediately they are identified.",
        "Identified asbestos-containing materials on a work site and report to designated personnel.",
        "Identified, wore, correctly fitted, used and stored correct personal protective equipment and clothing for each area of construction work in accordance with workplace procedures.",
        "Selected tools, equipment and materials, and organised tasks in conjunction with other personnel on site and in accordance with workplace procedures.",
        "Determined required barricades and signage, and erect at the appropriate site location.",
        "Applied material safety data sheets (MSDSs), job safety analyses (JSAs) and safe work method statements (SWMSs) relevant to the work to be performed.",
        "Carried out tasks in a manner that is safe for operators, other personnel and the general community, in accordance with legislative requirements, and workplace policies and procedures.",
        "Used plant and equipment guards in accordance with manufacturers' specifications, work site regulations and Australian Standards.",
        "Followed procedures and report hazards, incidents and injuries to relevant authorities.",
        "Recognised and did not use prohibited tools and equipment in areas containing identified asbestos.",
        "Identified and followed requirements of work site safety signs and symbols.",
        "Cleared and maintained work site area to prevent and protect self and others from incidents and accidents, and to meet environmental requirements.",
        "Identified designated personnel in the event of an emergency for communication purposes.",
        "Followed safe workplace procedures for dealing with accidents, fire and other emergencies, including identification and use, if appropriate, of fire equipment within scope of own responsibilities.",
        "Described, practiced and effectively carried out emergency response and evacuation procedures when required.",
        "Carried out emergency first aid treatment of minor injuries and, as soon as possible, accurately report treatment details to designated personnel.",
      ],
    },
    CPCWHS3001: {
      title:
        "Identify construction work hazards and select risk control strategies",
      tasks: [
        "Reviewed job task, work site and compliance requirements.",
        "Selected and used personal protective equipment (PPE) for each part of the task.",
        "Inspected work site and identified hazards relevant to job task.",
        "Determined and recorded level of risk for each identified hazard.",
        "Reviewed requirements of work health and safety legislation for preparation of job safety analysis (JSA) using template.",
        "Broke job task into logical steps, determine tools, equipment, plant and materials to be used for each step, and record on JSA.",
        "Identified work site and task-related hazards and levels of risk relating to each step, and record on JSA.",
        "Applied hierarchy of controls to determine risk control strategies for each hazard in each step of the job task, discuss and confirm with relevant personnel, and record on JSA.",
        "Reviewed work site and job task immediately before starting work and discuss JSA with relevant personnel to confirm as still applicable, or to amend as required.",
        "Stored JSA securely on site in accordance with compliance requirements.",
        "Reviewed requirements of work health and safety legislation for preparation of safe work method statements (SWMS).",
        "Determined work site conditions and job task requirements.",
        "Determined and recorded high-risk work site and task hazards relevant to job task.",
        "Broke job task into logical steps, determine tools, equipment and materials to be used for each step, and record on SWMS.",
        "Identified high-risk work site and task-related hazards and levels of risk relating to each step, and record on SWMS.",
        "Applied hierarchy of controls to determine risk control strategies for each high-risk hazard in each step of the job task, discuss and confirm with relevant personnel, and record on SWMS.",
        "Reviewed work site and job task immediately before starting work and discuss SWMS with relevant personnel to confirm as still applicable, or to amend as required.",
        "Stored SWMS securely on site in accordance with compliance requirements.",
      ],
    },
  };

  // Evidence types for the matrix
  const evidenceTypes = [
    {
      id: "resume",
      label: "Resume/Brief CV or work history (A 01, 02 and 03)",
    },
    {
      id: "qualifications",
      label:
        "Qualifications/Certificates/results of assessment for nationally recognised qualifications (A 03)",
    },
    {
      id: "certificates",
      label:
        "Qualifications/Certificates/results of assessment for other qualifications and courses (A 02)",
    },
    {
      id: "workshops",
      label:
        "Results/statement of attendance/certificates; for in-house courses, workshops, seminars, symposiums (A 01)",
    },
    {
      id: "memberships",
      label: "Membership of relevant professional associations (A 01)",
    },
    {
      id: "industryDocs",
      label:
        "Other documentation that may demonstrate industry experience, i.e. participation in the development of industry programs; industry awards (A 02)",
    },
    { id: "jobDescription", label: "Job/Position Description (A 01)" },
    {
      id: "licenses",
      label: "Relevant industry licences i.e. Blue Card (A 01)",
    },
    {
      id: "references",
      label:
        "References/letters from previous or current employers/supervisors (A 01)",
    },
    {
      id: "certifications",
      label:
        "Certifications Industry workshop certificates of completion or attendance (A 01)",
    },
    {
      id: "demonstration",
      label:
        "Direct demonstration/observation: Performance of a task, or range of tasks, either in the workplace or in a simulated work environment, witnessed directly by an assessor (A 01)",
    },
    {
      id: "indirectDemo",
      label:
        "Indirect demonstration Use of photographs, videos, etc. showing performance of a task when the assessor cannot be present (A 02)",
    },
    {
      id: "products",
      label:
        "Products Models, programs, designs, items, objects that have been made, fixed or revamped by the candidate (A 01 and A 02)",
    },
    {
      id: "workplaceDocs",
      label:
        "Workplace documents: Work samples, which may include but not limited to: Rosters, budgets, reports, standard operating procedures, diaries/task sheets/job sheets/log books/performance appraisals/work plans/projects etc. developed by the candidate (A 01 and A 02)",
    },
    {
      id: "questions",
      label:
        "Questions - written and oral Asking the candidate about real or hypothetical situations to check understanding, task management and contingency management skills (A 02)",
    },
    {
      id: "assignments",
      label:
        "Assignments Projects, reports, essays, etc. relevant to the LLN requirements of the unit of competency (A 02)",
    },
    {
      id: "thirdParty",
      label:
        "Third party reports Documented and verified reports from supervisor, colleague, subject expert, trainer or others (A 01)",
    },
    {
      id: "selfAssessment",
      label:
        "Self-assessment A candidate's personal statement on their performance (not generally sufficient in isolation). A personal statement should be a concise description of your work activities and the functions you carry out and must be related to the unit of competency (A 02)",
    },
    {
      id: "simulation",
      label:
        "Simulation Simulated activity to accommodate difficult to demonstrate criteria e.g. emergencies, contingencies, difficult behaviours etc. (A 02)",
    },
    {
      id: "portfolios",
      label:
        "Portfolios Collections of evidence compiled by the candidate (A 01 and A 02)",
    },
    {
      id: "hobbies",
      label:
        "Hobbies or interests that relate to the outcomes of the unit elements (A 02)",
    },
    {
      id: "supplementary",
      label:
        "Supplementary Evidence – Any other evidence not covered through the RPL Evidence Matrix. Please specify why you have selected another supplementary evidence (A 01, 02 and 03)",
    },
  ];

  // Units for the evidence matrix
  const unitCodes1 = Object.keys(unitData555).slice(0, 10);
  const unitCodes2 = Object.keys(unitData555).slice(10, 20);
  const unitCodes3 = Object.keys(unitData555).slice(20);

  // Render the introduction page
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

  // Render the evidence matrix page
  const renderEvidenceMatrixPage = (unitCodes, pageNumber) => {
    return (
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Evidence Matrix (Section {pageNumber})
        </h3>
        <p className="mb-6 text-sm sm:text-base">
          The following table helps you identify which types of evidence are
          relevant for each unit of competency. Check the boxes where you have
          evidence that supports your competency in that unit.
        </p>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full border border-gray-200 text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-2 sm:px-4 sm:py-3 border text-left">
                    Relevance of Evidence
                  </th>
                  {unitCodes.map((unitCode) => (
                    <th
                      key={unitCode}
                      className="px-3 py-2 sm:px-4 sm:py-3 border text-center"
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
                    <td className="px-3 py-2 sm:px-4 sm:py-3 border">
                      {evidence.label}
                    </td>
                    {unitCodes.map((unitCode, unitIndex) => (
                      <td
                        key={`${evidence.id}-${unitCode}`}
                        className="px-3 py-2 sm:px-4 sm:py-3 border text-center"
                      >
                        <input
                          type="checkbox"
                          checked={
                            formData.evidenceMatrix[evidence.id][
                              unitIndex + (pageNumber - 1) * 10
                            ] || false
                          }
                          onChange={(e) =>
                            handleEvidenceChange(
                              evidence.id,
                              unitIndex + (pageNumber - 1) * 10,
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 text-green-600 border-gray-300 rounded"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-500 italic">
          Swipe horizontally to see more columns
        </p>
      </div>
    );
  };

  // Render a unit assessment page
  const renderUnitAssessmentPage = (unitCode, unitIndex) => {
    const unit = unitData555[unitCode];
    if (!unit) return null;

    return (
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Unit {unitIndex + 1}: {unitCode} - {unit.title}
        </h3>
        <p className="mb-6 text-sm sm:text-base">
          For each task below, indicate your level of experience by selecting
          "Never", "Sometimes", or "Regularly".
        </p>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full border border-gray-200 text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-2 sm:px-4 sm:py-3 border text-left">
                    Core Task
                  </th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 border text-left">
                    Required experience and knowledge
                  </th>
                  <th
                    colSpan="3"
                    className="px-3 py-2 sm:px-4 sm:py-3 border text-center"
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
                        className="px-3 py-2 sm:px-4 sm:py-3 border"
                      >
                        {unitCode}
                      </td>
                    ) : null}
                    <td className="px-3 py-2 sm:px-4 sm:py-3 border">{task}</td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 border text-center">
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
                          className="h-4 w-4 text-green-600 border-gray-300"
                        />
                        <span className="ml-1 sm:ml-2">Never</span>
                      </label>
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 border text-center">
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
                          className="h-4 w-4 text-green-600 border-gray-300"
                        />
                        <span className="ml-1 sm:ml-2">Sometimes</span>
                      </label>
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 border text-center">
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
                          className="h-4 w-4 text-green-600 border-gray-300"
                        />
                        <span className="ml-1 sm:ml-2">Regularly</span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* <tfoot>
                <tr className="bg-gray-100 font-semibold">
                  <td colSpan="2" className="px-3 py-2 sm:px-4 sm:py-3 border">
                    TOTALS:
                  </td>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 border text-center">
                    NEVER /{unit.tasks.length}
                  </td>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 border text-center">
                    SOMETIMES /{unit.tasks.length}
                  </td>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 border text-center">
                    REGULARLY /{unit.tasks.length}
                  </td>
                </tr>
              </tfoot> */}
            </table>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-500 italic">
          Swipe horizontally to see more columns
        </p>
      </div>
    );
  };

  // Render the submission page
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

  // Determine which page content to render based on currentPage
  const renderPageContent = () => {
    //   return renderIntroductionPage()
    if (currentPage === 29) {
      return <RPLEvidenceAssessmentForm updatepage={setCurrentPage} />;
    } else if (currentPage === 30) {
      return renderEvidenceMatrixPage(unitCodes2, 2);
    } else if (currentPage === 31) {
      return renderEvidenceMatrixPage(unitCodes3, 3);
    } else if (currentPage === 32) {
      return renderEvidenceMatrixPage(unitCodes1, 1);
    } else if (currentPage >= 32 && currentPage <= 61) {
      // For unit assessment pages (5 to 28)
      const unitIndex = currentPage - 33;
      const unitCodes = Object.keys(unitData555);
      if (unitIndex >= 0 && unitIndex < unitCodes.length) {
        return renderUnitAssessmentPage(unitCodes[unitIndex], unitIndex);
      }
      return null;
    } else {
      return null;
    }
  };

  return (
    <>
      <Navbar />

      {isSubmitting && <SpinnerLoader />}

      <Toaster position="top-right" />
      {currentPage === 29 ? (
        <RPLEvidenceAssessmentForm updatepage={setCurrentPage} />
      ) : (
        <div className="min-h-screen bg-gray-50 mt-16 py-4 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Mobile Navigation Menu */}
            <div className="md:hidden flex justify-between items-center mb-4">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-md bg-green-600 text-white"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
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
                    <button
                      onClick={() => goToPage(2)}
                      className={`w-full text-left p-3 rounded-md ${
                        currentPage === 2
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100"
                      }`}
                    >
                      Evidence Matrix (Section 1)
                    </button>
                    <button
                      onClick={() => goToPage(3)}
                      className={`w-full text-left p-3 rounded-md ${
                        currentPage === 3
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100"
                      }`}
                    >
                      Evidence Matrix (Section 2)
                    </button>
                    <button
                      onClick={() => goToPage(4)}
                      className={`w-full text-left p-3 rounded-md ${
                        currentPage === 4
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100"
                      }`}
                    >
                      Evidence Matrix (Section 3)
                    </button>
                    {Object.keys(unitData555).map((unitCode, index) => (
                      <button
                        key={unitCode}
                        onClick={() => goToPage(index + 5)}
                        className={`w-full text-left p-3 rounded-md ${
                          currentPage === index + 5
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100"
                        }`}
                      >
                        {unitCode} -{" "}
                        {unitData555[unitCode].title.length > 40
                          ? unitData555[unitCode].title.substring(0, 40) + "..."
                          : unitData555[unitCode].title}
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

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 sm:mb-6">
                  <div
                    className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${(currentPage / totalPages) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mb-6 sm:mb-8 hidden sm:block">
                  Page {currentPage} of {totalPages}
                </p>

                {/* Page Content */}
                {renderPageContent()}

                {/* Navigation Buttons */}
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RPL2;
