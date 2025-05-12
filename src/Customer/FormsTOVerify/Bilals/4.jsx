import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, Menu, X } from "lucide-react";

const RPLSelfAssessment2CPC30620A = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateSignature: "",
    date: "",
    declaration: false,
    additionalNotes: "",
    assessorName: "",
    assessorSignature: "",
    assessorDate: "",
    evidenceMatrix: {
      resume: Array(29).fill(false),
      qualifications: Array(29).fill(false),
      otherQualifications: Array(29).fill(false),
      workshops: Array(29).fill(false),
      memberships: Array(29).fill(false),
      industryDocs: Array(29).fill(false),
      jobDescription: Array(29).fill(false),
      licenses: Array(29).fill(false),
      references: Array(29).fill(false),
      certifications: Array(29).fill(false),
      directDemo: Array(29).fill(false),
      indirectDemo: Array(29).fill(false),
      products: Array(29).fill(false),
      workplaceDocs: Array(29).fill(false),
      questions: Array(29).fill(false),
      assignments: Array(29).fill(false),
      thirdParty: Array(29).fill(false),
      selfAssessment: Array(29).fill(false),
      simulation: Array(29).fill(false),
      portfolios: Array(29).fill(false),
      hobbies: Array(29).fill(false),
      supplementary: Array(29).fill(false),
    },
    units: {
      CPCCCM2008: Array(21).fill(""),
      CPCCCM2012: Array(23).fill(""),
      CPCCCM3001: Array(23).fill(""),
      CPCCCM3005: Array(18).fill(""),
      CPCCOM1012: Array(9).fill(""),
      CPCCOM1013: Array(9).fill(""),
      CPCCOM1014: Array(8).fill(""),
      CPCCOM1015: Array(5).fill(""),
      CPCCOM2001: Array(11).fill(""),
      CPCCPB3026: Array(17).fill(""),
      CPCCPD2011: Array(19).fill(""),
      CPCCPD2012: Array(11).fill(""),
      CPCCPD2013: Array(20).fill(""),
      CPCCPD3021: Array(14).fill(""),
      CPCCPD3022: Array(21).fill(""),
      CPCCPD3023: Array(22).fill(""),
      CPCCPD3024: Array(23).fill(""),
      CPCCPD3025: Array(11).fill(""),
      CPCCPD3026: Array(23).fill(""),
      CPCCPD3027: Array(25).fill(""),
      CPCCPD3028: Array(34).fill(""),
      CPCCPD3030: Array(21).fill(""),
      CPCCPD3031: Array(26).fill(""),
      CPCCPD3035: Array(12).fill(""),
      CPCCPD3036: Array(18).fill(""),
      CPCCWHS2001: Array(22).fill(""),
      BSBESB301: Array(13).fill(""),
      BSBESB303: Array(11).fill(""),
      CPCCPD3029: Array(19).fill(""),
    },
  });

  const totalPages = 32;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEvidenceChange = (evidenceType, unitIndex, checked) => {
    setFormData((prev) => {
      const updatedEvidence = [...prev.evidenceMatrix[evidenceType]];
      updatedEvidence[unitIndex] = checked;
      return {
        ...prev,
        evidenceMatrix: {
          ...prev.evidenceMatrix,
          [evidenceType]: updatedEvidence,
        },
      };
    });
  };

  const handleUnitChange = (unit, taskIndex, value) => {
    setFormData((prev) => {
      const updatedUnit = [...prev.units[unit]];
      updatedUnit[taskIndex] = value;
      return {
        ...prev,
        units: {
          ...prev.units,
          [unit]: updatedUnit,
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

  const goToPage = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  const unitData = {
    CPCCCM2008: {
      title: "Erect and dismantle restricted height scaffolding",
      tasks: [
        "I reviewed scaffolding task and workplace-specific information relating to the task and confirm with associated personnel.",
        "I identified environmental protection and legislative requirements for scaffolding task and incorporate into planning and preparation.",
        "I identified hazards, control measures and equipment associated with the workplace and scaffolding task from job safety analysis (JSA) and safe work method statement (SWMS).",
        "I calculated scaffolding and material requirements and incorporate into planning and preparation.",
        "I determined expected loading on scaffold and supporting structure using load tables, and incorporate into planning and preparation.",
        "I identified site access and egress routes and incorporate into planning and preparation.",
        "I planned scaffolding task in accordance with workplace requirements.",
        "I applied risk control measures and equipment including installing safety signs and barriers and using personal protective equipment (PPE).",
        "I selected plant, tools and equipment, check for serviceability and rectify or report any faults.",
        "I selected prepare and locate materials using safe handling techniques.",
        "I inspected scaffolding and components and label, reject or repair damaged items.",
        "I established footing in accordance with the Australian Standard for scaffolding.",
        "I erected scaffolding in accordance with regulations, planned risk prevention and control measures, acceptable safe work practices and manufacturers' specifications.",
        "I inspected critical structural and safety areas of scaffolding for damage, corrosion and wear.",
        "I checked current use of scaffolding for compliance with type of scaffolding equipment.",
        "I reviewed scaffolding to determine if changes or modifications were scheduled as per original planning.",
        "I carried out alterations or repairs.",
        "I completed inspection log and handover.",
        "I dismantled scaffolding using reverse of procedure for erection.",
        "I cleared work area and dispose of, re-use or recycle materials in accordance with legislation, regulations, codes of practice and task specifications.",
        "I cleaned, checked, maintained and stored plant, tools and equipment in accordance with manufacturers' specifications and workplace requirements.",
      ],
    },
    CPCCCM2012: {
      title: "Work safely at heights",
      tasks: [
        "I read work order and associated drawings and consult with relevant persons to determine the proposed work-at-heights task, including where and how work is to be carried out, and the equipment or plant to be used.",
        "I participated in the development of the safe work method statement (SWMS) for the specified task.",
        "I selected appropriate work-at-heights control measures including required fall restraint devices and/or fall arrest devices in accordance with workplace and regulatory requirements.",
        "I determined location of anchor points for harness-based work to safely access required work area.",
        "I reviewed completed SWMS and clarify issues with relevant persons.",
        "I selected personal protective equipment (PPE), check for serviceability and report problems.",
        "I Identified unstable, fragile or brittle work surfaces and implement control measures to prevent a fall from height.",
        "I checked fall protection equipment, including required fall restraint and fall arrest devices to ensure serviceability and report problems.",
        "I identified, selected and installed signage and barricade equipment in accordance with SWMS or relevant safe work procedure.",
        "I installed/fitted fall protection equipment, including fall restraint devices and fall arrest devices as appropriate, within the limitations of licensing requirements, level of authority and SWMS.",
        "I ensured required fall protection, scaffold and barriers have been adequately installed and where necessary certified, in accordance with regulatory and workplace requirements.",
        "I connected to fall protection equipment, including temporary anchor points, without being exposed to a risk of a fall from height.",
        "I Consult with relevant persons to confirm fall protection equipment and safety systems are correctly fitted, adjusted and installed, and are appropriate to the task.",
        "I accessed work area safely and move and place tools, equipment and materials using methods that eliminate or minimise the risk of falling objects.",
        "Undertake work tasks in compliance with the SWMS and workplace requirements.",
        "Traverse between anchor points while remaining connected to the fall prevention system and protected from a risk of a fall from height.",
        "I used PPE appropriate to the task and in accordance with manufacturer requirements.",
        "I maintain communication with relevant persons while working at height.",
        "Keep fall protection equipment in place and adjust to allow for movement during work.",
        "Keep fall prevention equipment adjusted to prevent falling off or through a structure using the restraint technique.",
        "Keep scaffold/work platform components and fall barriers in place during work.",
        "Monitor control measures and consult with relevant persons to respond to changing work practices or site conditions.",
        "Exit from work area removing tools and materials in compliance with worksite procedures, safety and environmental requirements.",
      ],
    },
    CPCCCM3001: {
      title: "Operate elevated work platforms up to 11 metres",
      tasks: [
        "I confirmed, obtained and applied the job requirements to planning.",
        "I inspected the work site and terrain level checked to determine stabilising and safe working area requirements.",
        "I assessed work site conditions and hazards and site health and safety requirements confirmed and applied to planning.",
        "I reviewed safe work method statement (SWMS) for the type of EWP and job and work site requirements with relevant personnel and confirmed.",
        "I selected plant, tools and equipment, including personal protective equipment (PPE) according to job requirements, checked for serviceability, and faults are rectified or reported before starting work.",
        "I identified, obtained, prepared, safely handled and located ready for use the materials appropriate to the work application.",
        "I confirmed with team members, supervisor, and other personnel working on site the verbal and non-verbal communication signals as required.",
        "I established and practised the rescue plan, including use of fall arrest system before using EWP.",
        "I connected the power source to platform equipment according to manufacturer specifications.",
        "I carried out routine pre-operational equipment checks according to operator manual or manufacturer specifications, and logbooks for defect checks and EWP maintenance schedules.",
        "I checked for correct operation and ease of movement the equipment is switched on in line with start-up procedures, and controls.",
        "I checked to ensure that emergency safety devices specified in operator manual are present and operating correctly.",
        "I fitted securely the fall arrest harness and connected lanyard to attachment point.",
        "I operated EWP controls according to manufacturer recommendations and platform is elevated to work position.",
        "I specified where power is switched off and locking devices are engaged according to operator manual.",
        "I carried out work according to job specification, operator manual, and health and safety requirements.",
        "I operated the controls according to manufacturer recommendations and platform is lowered to down position.",
        "I carried out the shut-down procedures according to operator manual instructions and equipment is switched off.",
        "I cleared and disposed the materials of, reused or recycled according to legislation, regulations, codes of practice, and job specifications.",
        "I cleaned, checked, maintained and stored the EWP, tools and equipment according to manufacturer recommendations and standard work practices.",
        "I applied the Work completion procedures and relevant personnel notified that work is finished.",
      ],
    },
    CPCCCM3005: {
      title: "Calculate costs of construction work",
      tasks: [
        "I determined the job requirements through discussion with customer or from information supplied.",
        "I accessed Plans and specifications and inspected the site to confirm requirements.",
        "I developed and checked details of products and services to be provided for availability and fitness for purpose.",
        "I determined delivery point and methods of transportation where necessary.",
        "I recorded and checked the details of job tasks accurately according to workplace procedures.",
        "I obtained and checked the information about material, labour and overhead costs to be current and accurate.",
        "I planned and sequenced the work, including preparatory tasks to cover all necessary activity.",
        "I estimated types and quantities of materials required for work based on availability, fitness for purpose, and current costs.",
        "I estimated labour requirements to perform work tasks and to complete the job.",
        "I estimated and checked the time requirements to perform work tasks accurately with appropriate personnel.",
        "I calculated the totals of individual materials, labour and overhead costs according to workplace procedures and statutory requirements.",
        "I identified and calculated the other project-specific costs according to workplace procedures.",
        "I calculated the total work cost including mark-up percentages set by appropriate personnel.",
        "I calculated the final cost for work by applying profit margin according to workplace procedures, and is checked for accuracy.",
        "I documented the details of costs and charges clearly and accurately according to workplace procedures.",
        "I verified the costs, calculations or other details according to workplace procedures and current costing data.",
        "I prepared the costing estimate and materials take-off for quote.",
        "I completed the costing documents accurately for future reference according to workplace procedures.",
      ],
    },
    CPCCOM1012: {
      title: "Work effectively and sustainably in the construction industry",
      tasks: [
        "I participate in planning work tasks with team members.",
        "I worked with team members to review team purpose, roles, responsibilities, goals, plans and objectives.",
        "I worked with team members following guidelines, directions and instructions to complete work tasks.",
        "I worked with team members to resolve problems that impede the team's performance.",
        "I described the process for becoming a tradesperson or skilled operator in the construction industry.",
        "I identified own existing skills and the additional skills required for a tradesperson or skilled operator role in the construction industry.",
        "I identified environmental and resource efficiency requirements that apply to entry level roles in the construction industry.",
        "I followed requirements to identify and report environmental hazards.",
        "I followed requirements to identify and report resource efficiency issues.",
      ],
    },
    CPCCOM1013: {
      title: "Plan and organise work",
      tasks: [
        "I determined work task outcomes and other requirements.",
        "I broke the work task into its component tasks.",
        "I assessed the component tasks to determine what needs to be done and how it is to be done.",
        "I estimate the time and the number of personnel required to complete each component task.",
        "I identified the tools and equipment required, including personal protective equipment (PPE) for each stage of the task.",
        "I planned the sequence of the component tasks in a logical order and to maximise efficient use of resources.",
        "I prepared a written work plan and a list of resources required to complete the overall work task.",
        "I worked with team members to review the work plan, schedule the work, allocate roles and responsibilities, and review work health and safety requirements.",
        "I confirmed availability of required tools and equipment, including PPE.",
      ],
    },
    CPCCOM1014: {
      title: "Conduct workplace communication",
      tasks: [
        "I received information and instructions from others using effective listening, questioning and speaking skills to confirm understanding.",
        "I conveyed information and instructions to others using effective listening, questioning and speaking skills to confirm understanding.",
        "I accessed and interpreted basic information from a range of sources.",
        "I selected and sequenced information to prepare a basic written report.",
        "I selected and sequenced information to prepare and present a basic verbal report.",
        "I entered information into basic workplace records and documents.",
        "I described and followed simple processes and procedures for meetings.",
        "I provided constructive contributions to meeting discussions.",
      ],
    },
    CPCCOM1015: {
      title: "Carry out measurements and calculations",
      tasks: [
        "I selected most appropriate equipment and method for obtaining the measurement.",
        "I used a ruler or tape to obtain linear measurements accurate to 1 mm.",
        "I took basic measurements and calculate quantities of materials in a construction environment, using basic formulae for each of: weight, area, volume, perimeter, circumference, ratio and percentage.",
        "I converted measurements in metres to millimetres and measurements in millimetres to metres.",
        "I checked calculations for accuracy and record calculation workings and results.",
      ],
    },
    CPCCOM2001: {
      title: "Read and interpret plans and specifications",
      tasks: [
        "I explained the key features and functions of each of the main types of plans/drawings used in the construction industry.",
        "I located and explained the purpose of the legend on plans/drawings used in the construction industry.",
        "I explained the meaning of construction symbols and abbreviations used on plans/drawings in the construction industry.",
        "I checked title panels on plans/drawings and specifications to verify latest amendments are included, and report inconsistencies.",
        "I selected and use personal protective equipment (PPE) required to enter a proposed construction site.",
        "I orientated the site plan with the site.",
        "I located existing services, key features and boundaries of the site from the site plan and associated drawings.",
        "I identified construction types, project dimensions and nominated locations from project plans/drawings and specifications.",
        "I identified environmental requirements, controls and locations from environmental plans, project plans/drawings and specifications.",
        "I identified standards of work, finishes and tolerances from project plans/drawings and specifications.",
        "I identified required materials from project plans/drawings and specifications.",
      ],
    },
    CPCCPB3026: {
      title: "Erect and maintain trestle and plank systems",
      tasks: [
        "I read and interpreted work instructions and plan sequence of work.",
        "I planned all work to comply with laws and regulations, the National Construction Code (NCC), Australian Standards, work health and safety (WHS) and environmental requirements, manufacturers' specifications, and workplace requirements.",
        "I selected and used personal protective equipment (PPE) for each stage of the task.",
        "I selected tools and equipment, check for serviceability and report any faults that may affect the safe operation of the equipment, tag equipment and set aside.",
        "I inspected work site, assess hazards and apply risk controls, including required signage and barricades.",
        "I cleaned work area of unnecessary materials.",
        "I assessed risks to other workers, power supply and other services.",
        "I planned access to erected trestle and plank platform.",
        "I planned access of plaster products and tools from the plank.",
        "I identified whether situation is appropriate for the use of trestle and plank system.",
        "I selected type of trestle and plank system and work method to meet Australian Standard AS6001-1999.",
        "I compared benefits of different trestle and plank systems.",
        "I inspected trestles and planks for serviceability as required by the Australian standards and report faults.",
        "I positioned trestles for the work and the planks to be used.",
        "I fitted planks to the trestles at the required height using authorised procedures and within regulatory restrictions.",
        "I inspected trestle and plank work platform before and during use.",
        "I reported faults and rectified or labelled system to prevent use pending repair.",
      ],
    },
    CPCCPD2011: {
      title: "Handle and store painting and decorating materials",
      tasks: [
        "I reviewed work instructions to handle painting and decorating materials.",
        "I planned all work to meet relevant requirements of work health and safety (WHS), Commonwealth and state or territory legislation, environmental plans and obligations, manufacturers' specifications, and workplace requirements.",
        "I selected and fitted personal protective equipment (PPE) as required for each task.",
        "I inspected work site, assess hazards and apply risk controls, including required signage and barricades.",
        "I selected tools and equipment, check for serviceability and rectify/report any faults.",
        "I checked materials and components for conformity to material schedule, plans, specifications and environmental characteristics.",
        "I identified handling characteristics of materials and components from safety data sheets (SDS) and regulatory requirements and use safe and effective handling techniques.",
        "I checked that storage locations meet fire safety, ventilation and product-dispersal requirements.",
        "I sorted materials by type and size and stack for ease of identification and retrieval.",
        "I protected material and components against physical and water damage and store clear of traffic ways.",
        "I selected, safely handle and distribute materials from stack to required job location.",
        "I stored materials to best serve their subsequent use.",
        "I prepared work areas, including removing objects and using drop sheets to protect surrounding surfaces.",
        "I cleaned up in accordance with all legislative and workplace requirements for safety, waste disposal, safe handling and protection of the environment.",
        "I identified hazardous material for separate handling by authorised personnel.",
        "I cleared work area, reuse or recycle materials and place waste and unwanted materials into job waste bins or rubbish stockpile.",
        "I checked and maintain tools and equipment and clean with appropriate solvents.",
        "I disposed of paint waste and of water and solvents used in cleaning tools and equipment in an environmentally sustainable manner.",
        "I stored tools, equipment and sealed unused materials to avoid spontaneous ignition.",
      ],
    },
    CPCCPD2012: {
      title: "Use painting and decorating tools and equipment",
      tasks: [
        "I reviewed work instructions to use painting and decorating tools and equipment.",
        "I planned all work to meet relevant requirements of work health and safety (WHS), Commonwealth and state or territory legislation, environmental plans and obligations, manufacturers' specifications, and workplace requirements.",
        "I selected tools and equipment, including personal protective equipment (PPE) for the task and identify their functions, limitations and safe methods of operation.",
        "I fitted personal protective equipment (PPE) as required for each task.",
        "I checked tools, equipment and hoses for serviceability, leads are tagged and rectify and report faults.",
        "I checked and maintain power tool and equipment guards, retaining bolts, couplings, gauges and controls.",
        "I conducted pre-operational checks according to manufacturers' recommendations.",
        "I followed start-up and shut-down procedures according to workplace practices.",
        "I used tools and equipment safely and effectively.",
        "I located tools and equipment safely when not in immediate use.",
        "I cleaned, checked, maintained and stored tools and equipment on conclusion of task.",
      ],
    },
    CPCCPD2013: {
      title: "Remove and replace doors and window components",
      tasks: [
        "I reviewed work instructions for requirements to remove and replace doors and windows components.",
        "I planned all work to meet relevant requirements of work health and safety (WHS), Commonwealth and state or territory legislation, environmental plans and obligations, manufacturers' specifications and workplace requirements.",
        "I selected and fitted personal protective equipment (PPE) as required for each task.",
        "I inspected work site, assessed hazards and applied risk controls, including required signage and barricades.",
        "I selected tools and equipment, including personal protective equipment (PPE), check for serviceability and rectify/report any faults.",
        "I removed door and window components carefully, including doors, screens and fittings and door and window furniture.",
        "I removed components without damaging surrounding areas and objects.",
        "I located or stored components safely.",
        "I used safe handling techniques for glass to remove old panes of glass from doors and windows safely, without undue damage and demonstrating correct hacking procedure.",
        "I determined the correct fixing method for installation of replacement glass.",
        "I measured and sourced type and style of glass for replacement in keeping with the finish and purpose of door or window.",
        "I cleaned, repaired and primed door or window aperture before installation of replacement glass.",
        "I used safe handling techniques for glass to install replacement glass to specification and required finish.",
        "I handled, placed, hanged and fixed doors carefully into original position.",
        "I refitted door furniture and fixed back into place without marking door or surrounds.",
        "I refitted window furniture and fixed back into place without marking window surfaces or surrounds.",
        "I replaced screens securely in position without damage to surrounds.",
        "I cleaned up, meeting all legislative and workplace requirements for safety, waste disposal, materials handling and protection of the environment.",
        "I cleared work area and reused, recycled or disposed of materials and waste.",
        "I checked, maintained and stored tools and equipment and rectified/reported any faults.",
      ],
    },
    CPCCPD3021: {
      title: "Prepare existing coated surface for painting",
      tasks: [
        "I reviewed work instructions to prepare surfaces for painting.",
        "I planned all work to meet relevant requirements of Australian Standards, work health and safety (WHS), Commonwealth and state or territory legislation, environmental plans and obligations, manufacturers' specifications, and workplace requirements.",
        "I selected and fitted personal protective equipment (PPE) as required for each task.",
        "I inspected work site, assessed hazards and applied risk controls, including required signage and barricades.",
        "I selected tools and equipment, checked for serviceability and rectified/reported any faults.",
        "I determined test condition and nature of existing substrate and surface material by performing adhesion test.",
        "I selected surface preparation method in accordance with environmental, finish and substrate requirements.",
        "I prepared surfaces by removing unwanted coatings and loose debris.",
        "I repaired surface defects, applied suitable primer, stopped, filled and sanded imperfections to smooth finish ready for painting.",
        "I cleaned up, meeting all legislative and workplace requirements for safety, waste disposal, materials handling and protection of the environment.",
        "I cleared work area, reused or recycled materials and placed waste and unwanted materials into job waste bins or rubbish stockpile.",
        "I checked and maintained tools and equipment and cleaned with appropriate solvents.",
        "I disposed of paint waste and of water and solvents used in cleaning tools and equipment in an environmentally sustainable manner.",
        "I stored tools, equipment and sealed unused materials to avoid spontaneous ignition.",
      ],
    },
    CPCCPD3022: {
      title: "Apply paint by brush and roller",
      tasks: [
        "I reviewed work instructions to apply paint by brush and roller.",
        "I planned all work to meet relevant requirements of work health and safety (WHS), Commonwealth and state or territory legislation, environmental plans and obligations, manufacturers' specifications, and workplace requirements.",
        "I conducted work with regard to responsibilities in heritage-listed buildings.",
        "I selected and fitted personal protective equipment (PPE) as required for each task.",
        "I inspected work site, assessed hazards and applied risk controls, including required signage and barricades.",
        "I identified materials appropriate to the work application, calculated quantities and prepared, handled safely and located ready for use.",
        "I selected tools and equipment, checked for serviceability and reported any faults.",
        "I checked that materials and substrate surfaces are prepared in accordance with manufacturers' recommendations and relevant Australian Standards.",
        "I protected surrounding surfaces with drop sheets, masking or removal of objects.",
        "I checked that where doors, windows and associated furniture are removed they are safely stacked, stored and protected.",
        "I checked work site to ensure provision of adequate ventilation and implementation of precautions to prevent fire and explosion.",
        "I implemented measures to ensure application area remains free of dust and foreign matter.",
        "I mixed each of oil based, water based and two pack paint, to designed proportion, consistency, specified ratio and drying time.",
        "I stirred paint and colours thoroughly using separate stirring sticks or other devices.",
        "I selected brush, roller or brush/roller combination for surface profile, size of area, type of paint and finish.",
        "I applied paint to achieve required level of opacity, finish, texture and sheen.",
        "I cleaned up, meeting all legislative and workplace requirements for safety, waste disposal, materials handling and protection of the environment.",
        "I cleared work area, reused or recycled materials and placed waste and unwanted materials into job waste bins or rubbish stockpile.",
        "I checked and maintained tools and equipment and cleaned with appropriate solvents.",
        "I disposed of paint waste and water and solvents used in cleaning painting equipment in an environmentally sustainable manner.",
        "I stored tools, equipment and sealed unused materials to avoid spontaneous ignition.",
      ],
    },
    CPCCPD3023: {
      title: "Apply texture coat paint finishes by brush, roller and spray",
      tasks: [
        "I reviewed work instructions to apply texture coat paint finishes by brush, roller and spray.",
        "I planned all work to meet relevant requirements of work health and safety (WHS), Commonwealth and state or territory legislation, environmental plans and obligations, manufacturers' specifications, and workplace requirements.",
        "I conducted work with regard to responsibilities in conservation areas and heritage-listed buildings.",
        "I selected and fitted personal protective equipment (PPE) as required for each task.",
        "I inspected work site, assessed hazards and applied risk controls, including required signage and barricades.",
        "I identified materials appropriate to the work application, calculated quantities and prepared, handled safely and located ready for use.",
        "I selected tools and equipment, checked for serviceability and reported any faults.",
        "I checked that materials and substrate surfaces are prepared in accordance with manufacturers' recommendations and relevant Australian Standards.",
        "I protected surrounding surfaces by drop sheets, masking or removal of objects.",
        "I implemented measures to ensure application area remains free of dust and foreign matter.",
        "I set-up area to suit selected application system and prepared system and equipment for use, including checking fittings for function and security.",
        "I mixed and adjusted texture coat viscosity for application process.",
        "I used brushes and rollers following standard operating procedures and manufacturers' recommendations.",
        "I identified defects in coating and took corrective action to achieve required finish.",
        "I set up spray system to manufacturers' specifications, including checking adjustment by spraying a sample panel.",
        "I applied texture coat paint using spray system to achieve specified finish.",
        "I identified defects in coating and take corrective action to achieve required finish.",
        "I cleaned up, meeting all legislative and workplace requirements for safety, waste disposal, materials handling and protection of the environment.",
        "I cleared work area, reused or recycled materials and placed waste and unwanted materials into job waste bins or rubbish stockpile.",
        "I checked and maintained tools and equipment and cleaned with appropriate solvents.",
        "I disposed of paint waste and of water and solvents used in cleaning tools and equipment in an environmentally sustainable manner.",
        "I stored tools, equipment and sealed unused materials to avoid spontaneous ignition.",
      ],
    },
    CPCCPD3024: {
      title: "Apply paint by spray",
      tasks: [
        "I reviewed work instructions to apply paint by spray.",
        "I planned all work to meet relevant requirements of work health and safety (WHS), Commonwealth and state or territory legislation, environmental plans and obligations, manufacturers' specifications, and workplace requirements.",
        "I selected and fitted personal protective equipment (PPE) as required for each task.",
        "I inspected work site, assessed hazards and apply risk controls, including required signage and barricades.",
        "I selected tools and equipment, checked for serviceability and report any faults.",
        "I checked that materials and substrate surfaces are prepared in accordance with manufacturers' recommendations and relevant Australian Standards.",
        "I protected surrounding surfaces with drop sheets, masking or removal of objects.",
        "I checked that where doors, windows and associated furniture are removed they are safely stacked, stored and protected.",
        "I checked work site to ensure provision of adequate ventilation and implementation of precautions to prevent fire and explosion.",
        "I implemented measures to ensure application area remains free of dust and foreign matter.",
        "I set up area to suit selected spray system.",
        "I mixed and adjusted viscosity of paint to allow for to allow for application process for spray paint finishing materials.",
        "I set up and tested spray system equipment, accessories and lines to manufacturers' specifications.",
        "I checked fittings are secure.",
        "I tested safety devices are performing to manufacturers' specifications and report defects.",
        "I operated spray equipment following standard operating procedures and manufacturers' recommendations.",
        "I identified defects in coating and take corrective action to achieve required finish.",
        "Applied paint using application technique to achieve an even finish with required opacity and sheen levels and to specification.",
        "I cleaned up, meeting all legislative and workplace requirements for safety, waste disposal, materials handling and protection of the environment.",
        "I cleared work area, reuse or recycle materials and place waste and unwanted materials into job waste bins or rubbish stockpile.",
        "I checked and maintained spray system, tools and equipment and clean with appropriate solvents.",
        "I disposed of paint waste and of water and solvents used in cleaning tools and equipment in an environmentally sustainable manner.",
        "I stored spray system, tools, equipment and sealed unused materials to avoid spontaneous ignition.",
      ],
    },
    CPCCPD3025: {
      title: "Match specific paint colours",
      tasks: [
        "I reviewed work instructions to interpret and match paint colour.",
        "I planned all work to meet relevant requirements of work health and safety (WHS), Commonwealth and state or territory legislation, environmental plans and obligations, manufacturers' specifications, and workplace requirements.",
        "I selected tools and equipment, including personal protective equipment (PPE), check for serviceability and report any faults.",
        "From a provided colour sample, I determined paint type and sheen level.",
        "I selected paint type, paint base and colourants for colour match.",
        "I mixed and matched colour against sample and allow to dry.",
        "I tested dry paint to establish accuracy of match of colour, adjusting and repeating testing process as required.",
        "I recorded details of colourants used to achieve the paint match.",
        "I cleared work area and checked and maintained tools and equipment and clean with appropriate solvents without damage.",
        "I disposed of water and solvents used in cleaning tools and equipment in an environmentally sustainable manner.",
        "I stored tools, equipment and sealed unused materials to avoid spontaneous ignition.",
      ],
    },
    CPCCPD3026: {
      title: "Apply stains and clear timber finishes",
      tasks: [
        "I reviewed work instructions to apply stains and clear timber finishes.",
        "I planned all work to meet relevant requirements of work health and safety (WHS), Commonwealth and state or territory legislation, environmental plans and obligations, manufacturers' specifications, and workplace requirements.",
        "I selected and fitted personal protective equipment (PPE) as required for each task.",
        "I inspected work site, assessed hazards and applied risk controls, including required signage and barricades.",
        "I stripped and prepared existing stained or finished surfaces for application using appropriate techniques.",
        "I protected surrounding surfaces with drop sheets, masking or removal of objects.",
        "I checked that where doors, windows and associated furniture are removed they are safely stacked, stored and protected.",
        "I checked work site to ensure provision of adequate ventilation and implementation of precautions to prevent fire and explosion.",
        "I implemented measures to ensure application area remains free of dust and foreign matter.",
        "I matched stain colour to previously stained timber.",
        "I selected application method for the specified surface, allowing for aesthetics durability, area size and type of finish.",
        "I selected materials appropriate to the work application, calculate quantities and prepare and handle safely.",
        "I selected tools and equipment, check for serviceability and rectify and report any faults.",
        "I prepared stain to required proportions and consistency.",
        "I applied stain to timber surface according to work instructions.",
        "I mixed colour-matched wood filler and apply to timber.",
        "I applied coats of selected clear finish to achieve required finish and sheen.",
        "I allowed required drying and curing time between coats.",
        "I cleaned up, meeting all legislative and workplace requirements for safety, waste disposal, materials handling and protection of the environment.",
        "I cleared work area, reuse or recycle materials and place waste and unwanted materials into job waste bins or rubbish stockpile.",
        "I checked and maintained tools and equipment and clean with appropriate solvents.",
        "I disposed of paint waste and water and solvents used in cleaning tools and equipment in an environmentally sustainable manner.",
        "I stored tools, equipment and sealed unused materials to avoid spontaneous ignition.",
      ],
    },
    CPCCPD3027: {
      title: "Remove and apply wallpaper",
      tasks: [
        "I reviewed work instructions for details of requirements to apply wallpaper.",
        "I planned all work to meet relevant requirements of work health and safety (WHS), Commonwealth and state or territory legislation, environmental plans and obligations, manufacturers' specifications, and workplace requirements.",
        "I prepared plan for hanging wallpaper.",
        "I selected and fitted personal protective equipment (nty requirements.",
        "I inspected work site, assess hazards and apply risk controls, including required signage and barricades.",
        "I identified the types and quantities of materials required for the task and safely prepare and position ready for use.",
        "I checked wallpaper for conformity to pattern number, batch number and other shading requirements.",
        "I selected tools and equipment, check for serviceability and report any faults.",
        "I determined type, condition and nature of existing wallpaper.",
        "I selected surface preparation method in accordance with environmental, finish and substrate requirements.",
        "I removed wallpaper using appropriate tools.",
        "I prepared surfaces by removing loose debris.",
        "I repaired surface defects and imperfections, and stop, fill and sand to smooth finish.",
        "I conducted adhesion test and take any required remedial action.",
        "I sealed wall using appropriate material.",
        "I prepared adhesives in accordance with safe workplace procedures.",
        "I applied size coating to work area and allow to dry.",
        "I applied wallpaper/ lining paper ensuring an even surface, seams are butted, paper is plumb and pattern matches.",
        "I trimmed accurately around fittings.",
        "I removed residue for a clean finish.",
        "I cleaned-up, meeting all legislative and workplace requirements for safety, waste disposal, materials handling and protection of the environment.",
        "I cleared work area, reused or recycled materials and placed waste and unwanted materials into job waste bins or rubbish stockpile.",
        "I checked and maintained tools and equipment and clean with appropriate solvents.",
        "I disposed of waste and water and solvents used in cleaning tools and equipment in an environmentally sustainable manner.",
        "I stored tools, equipment and unused materials in accordance with workplace practices.",
      ],
    },
    CPCCPD3028: {
      title: "Apply decorative paint finishes",
      tasks: [
        "I reviewed work instructions to apply decorative paint finishes and select method of application.",
        "I planned all work to meet relevant requirements of work health and safety (WHS), Commonwealth and state or territory legislation, environmental plans and obligations, manufacturers' specifications, and workplace requirements.",
        "I selected and fitted personal protective equipment (PPE) as required for each task.",
        "I inspected work site, assessed hazards and apply risk controls, including required signage and barricades.",
        "I identified the types and quantities of materials required for the task and safely prepare and position ready for use.",
        "I selected tools and equipment, check for serviceability and report any faults.",
        "I checked that materials and substrate surfaces are prepared in accordance with manufacturer recommendations and relevant Australian Standards.",
        "I protected surrounding surfaces by drop sheets, masking or removal of objects.",
        "I checked work site to ensure provision of adequate ventilation and implementation of precautions to prevent fire and explosion.",
        "I implemented measures to ensure application area remains free of dust and foreign matter.",
        "I set-up area to apply decorative paint finishes.",
        "I applied prime and intermediate coats, allowed to dry thoroughly and sand to a smooth, even finish.",
        "I adjusted paint viscosity to suit climatic conditions and selected application method.",
        "I prepared surface for final coat of mirror paint finish.",
        "I applied final coat without imperfections, flowing out to an even, smooth finish and meeting all requirements.",
        "I applied ground coat evenly to prepared surface to specified colour and consistency.",
        "I applied scumble glaze to prepared base coat and produce broken colour effect to match sample.",
        "I applied clear coating to achieve an even finish to specified sheen level.",
        "I prepared surface for application of acrylic finish.",
        "I applied acrylic finish to achieve an even finish to specification.",
        "I set out lining work to designed effect on prepared surface.",
        "I selected paint materials, applicators and brush ware for lining work.",
        "I applied application techniques to produce designed lining work effects and finish to requirements.",
        "I used specified transfer method and cut design accurately using a register mark.",
        "I laid out stencil design on recommended material.",
        "I placed and taped initial stencil to designed location.",
        "I applied paint to achieve designed effect.",
        "I selected special effect materials, applicators and brush ware.",
        "I applied a range of traditional and modern special finishes to produce specified effects and finish.",
        "I cleaned up, meeting all legislative and workplace requirements for safety, waste disposal, materials handling and protection of the environment.",
        "I cleared work area, reused or recycled materials and placed waste and unwanted materials into job waste bins or rubbish stockpile.",
        "I checked and maintained tools and equipment and clean with appropriate solvents.",
        "I disposed of paint waste and water and solvents used in cleaning tools and equipment in an environmentally sustainable manner.",
        "I stored tools, equipment and sealed unused materials to avoid spontaneous ignition.",
      ],
    },
    CPCCPD3030: {
      title: "Apply protective paint coating systems",
      tasks: [
        "I reviewed work instructions to apply protective paint coating systems and select method of application consistent with the job location, type of paint, type and condition of surface and climatic conditions.",
        "I planned all work to meet relevant requirements of work health and safety (WHS), Commonwealth and state or territory legislation, environmental plans and obligations, manufacturers' specifications, and workplace requirements.",
        "I selected and fitted personal protective equipment (PPE) as required for each task.",
        "I inspected work site, assessed hazards and applied risk controls, including required signage and barricades.",
        "I identified materials appropriate to the work application, calculate quantities and prepare, handle safely and locate ready for use.",
        "I selected tools and equipment, check for serviceability and rectify and report any faults.",
        "I protected surrounding surfaces with drop sheets, masking or removal of objects.",
        "I ensured ventilation is adequate and implement precautions to prevent fire and explosion.",
        "I implemented measures to ensure application area remains free of dust and foreign matter.",
        "I determined suitability of surface for protective paint coating and select surface preparation method to meet substrate requirements.",
        "I prepared surface, repaired, stopped and filled imperfections, and sanded to a smooth finish ready for the protective coating.",
        "I prepared and mixed protective coatings to manufacturers' specifications.",
        "I provided constructive contributions to meeting discussions.",
        "I applied and finished protective coating system to requirements.",
        "I performed wet film thickness measurement on wet surface for quality assurance and rectify any issues.",
        "I performed dry film thickness measurement on dry surface for quality assurance and rectify any issues.",
        "I cleaned-up in accordance with all legislative and workplace requirements for safety, waste disposal, materials handling and protection of the environment.",
        "I identified hazardous material for separate handling by authorised personnel.",
        "I cleared work area, reused or recycled materials and placed waste and unwanted materials into job waste bins or rubbish stockpile.",
        "I checked and maintained tools and equipment and cleaned with appropriate solvents.",
        "I disposed of paint waste and water and solvents used in cleaning tools and equipment in an environmentally sustainable manner.",
      ],
    },
    CPCCPD3031: {
      title: "Work safely with lead-painted surfaces in the painting industry",
      tasks: [
        "I reviewed circumstances in which lead-based paint hazards may be encountered.",
        "I reviewed work instructions to implement safe lead paint work practices, and test for lead-based paint.",
        "I selected and fitted personal protective equipment (PPE) as required for each task.",
        "I planned all work to meet relevant requirements of work health and safety (WHS), Commonwealth and state or territory legislation, environmental plans and obligations, manufacturers' specifications, and workplace requirements.",
        "I inspected work site, assess hazards, arrange for lead tests on soils, and apply risk controls.",
        "I selected tools and equipment, checked for serviceability and report any faults.",
        "I selected process for the identification, management and treatment of lead-based paints.",
        "I established, closed off and maintained a safe working area around lead-based painted surfaces using temporary control measures, barriers and signage.",
        "I removed furnishings and food stuffs cover other surfaces and water storage, and seal doors and windows.",
        "I applied debris and waste management procedures for control of lead paint contamination from flake, chalk and dust.",
        "I prepared surface of paint containing lead for removal or covering.",
        "I positioned tools and equipment for job requirements.",
        "I selected removal processes for paint containing lead.",
        "I quarantined contamination area and protected people at risk in accordance with regulatory requirements.",
        "I applied removal processes for paint containing lead.",
        "I selected and applied methods for the containment and disposal off-site of paint containing lead to regulatory requirements.",
        "I assessed and selected methods for applying covering coating of paint containing lead on existing surfaces by over-painting or encapsulation in accordance with regulatory requirements.",
        "I assessed suitability of work area for covering of paint containing lead.",
        "I applied covering coating to paint containing lead.",
        "I prepared surface of covering coating for subsequent paint coatings.",
        "I arranged for testing of work site to ensure that no further contamination has occurred.",
        "I cleaned up meeting all legislative and workplace requirements for safety, waste disposal, materials handling and protection of the environment.",
        "I cleared work area, reused or recycled materials and placed waste and unwanted materials into job waste bins or rubbish stockpile.",
        "I checked and maintained tools and equipment and clean with appropriate solvents.",
        "I disposed of paint waste and of water and solvents used in cleaning tools and equipment in an environmentally sustainable manner.",
        "I stored tools, equipment and sealed unused materials to avoid spontaneous ignition.",
      ],
    },
    CPCCPD3035: {
      title: "Prepare uncoated surfaces for painting",
      tasks: [
        "I reviewed work instructions to prepare uncoated surfaces for painting.",
        "I planned all work to meet relevant requirements of Australian Standards, work health and safety (WHS), Commonwealth and state or territory legislation, environmental plans and obligations, manufacturers' specifications, and workplace requirements.",
        "I selected and fitted personal protective equipment (PPE) as required for each task.",
        "I inspected work site, assessed hazards and applied risk controls, including required signage and barricades.",
        "I selected tools and equipment, checked for serviceability and reported any faults.",
        "I determined and tested condition and nature of substrate and surface material by conducting a moisture test.",
        "I selected surface preparation method in accordance with environmental, finish and substrate requirements.",
        "I prepared surfaces by removing loose debris.",
        "I repaired and filled surfaces to a smooth finish ready for painting.",
        "I cleaned up, meeting all legislative and workplace requirements for safety, waste disposal, materials handling and protection of the environment.",
        "I checked and maintained tools and equipment and cleaned with appropriate solvents.",
        "I stored tools, equipment and sealed unused materials to avoid spontaneous combustion.",
      ],
    },
    CPCCPD3036: {
      title:
        "Work safely to encapsulate non-friable asbestos in the painting industry",
      tasks: [
        "I reviewed circumstances in which asbestos hazards may be encountered.",
        "I reviewed work instructions and building information to implement safe asbestos work practices, and to determine the location of asbestos.",
        "I selected and fitted personal protective equipment (PPE) as required for each task.",
        "I planned all work to meet relevant requirements of work health and safety (WHS), Commonwealth and state or territory legislation, environmental plans and obligations, manufacturers' specifications, and workplace requirements.",
        "I inspected work site, assessed hazards and applied risk controls, including required signage and barricades.",
        "I selected tools and equipment, checked for serviceability and reported any faults.",
        "I identified sections within the work area where non-friable asbestos might be found.",
        "I established and maintained a safe working area around substrates that might contain asbestos, and apply temporary control measures, barriers and signage to ensure substrates are not disturbed.",
        "I protected furnishings, other surfaces, surrounding ground areas, drinking vessels, water storage and foodstuffs and seal doors and windows.",
        "I arranged for testing to confirm the presence of asbestos.",
        "I assessed and selected methods, tools and equipment and PPE for the encapsulation of asbestos on existing surfaces in accordance with regulatory requirements.",
        "I assessed suitability of work area for asbestos encapsulant coating.",
        "I applied a water based asbestos encapsulant coating to manufacturers' specifications.",
        "I cleaned up, meeting all legislative and workplace requirements for safety, waste disposal, materials handling and protection of the environment.",
        "I cleared work area, reused or recycled materials and placed waste and unwanted materials into job waste bins or rubbish stockpile.",
        "I checked and maintained tools and equipment and clean with appropriate solvents.",
        "I disposed of paint waste and water and solvents used in cleaning tools and equipment in an environmentally sustainable manner.",
        "I stored tools, equipment and sealed unused materials to avoid spontaneous ignition.",
      ],
    },
    CPCCWHS2001: {
      title:
        "Apply WHS requirements, policies and procedures in the construction industry",
      tasks: [
        "I identified, assessed and reported hazards in the work area to designated personnel.",
        "I reported safety risks in the work area based on identified hazards, to designated personnel.",
        "I followed safe work practices, duty of care requirements and safe work instructions for controlling risks.",
        "I contributed to WHS, hazard, accident or incident reports in accordance with workplace procedures, Australian government and state or territory WHS legislation, and relevant information.",
        "I correctly identified and, if appropriate, handle and use hazardous materials on a work site in accordance with legislative requirements, and workplace policies and procedures.",
        "I applied measures for controlling risks and construction hazards effectively and immediately.",
        "I used appropriate signs and symbols to secure hazardous materials that have safety implications for self and other workers, immediately they are identified.",
        "I identified asbestos-containing materials on a work site and report to designated personnel.",
        "I identified, wear, correctly fit, use and stored correct personal protective equipment and clothing for each area of construction work in accordance with workplace procedures.",
        "I selected tools, equipment and materials, and organised tasks in conjunction with other personnel on site and in accordance with workplace procedures.",
        "I determined required barricades and signage and erect at the appropriate site location.",
        "I applied material safety data sheets (MSDSs), job safety analyses (JSAs) and safe work method statements (SWMSs) relevant to the work to be performed.",
        "I carried out tasks in a manner that is safe for operators, other personnel and the general community, in accordance with legislative requirements, and workplace policies and procedures.",
        "I used plant and equipment guards in accordance with manufacturers' specifications, work site regulations and Australian Standards.",
        "I followed procedures and report hazards, incidents and injuries to relevant authorities.",
        "I recognised and did not use prohibited tools and equipment in areas containing identified asbestos.",
        "I identified and followed requirements of work site safety signs and symbols.",
        "I cleared and maintained work site area to prevent and protect self and others from incidents and accidents, and to meet environmental requirements.",
        "I identified designated personnel in the event of an emergency for communication purposes.",
        "I followed safe workplace procedures for dealing with accidents, fire and other emergencies, including identification and use, if appropriate, of fire equipment within scope of own responsibilities.",
        "I described, practiced and effectively carried out emergency response and evacuation procedures when required.",
        "I carried out emergency first aid treatment of minor injuries and, as soon as possible, accurately report treatment details to designated personnel.",
      ],
    },
    BSBESB301: {
      title: "Investigate business opportunities",
      tasks: [
        "I sourced and analysed market information for potential opportunities.",
        "I analysed information and listed details of business ideas and opportunities.",
        "I identified and described products and/or services that match business ideas.",
        "I identified and analysed available business, financial, digital technology and technical factors related to the potential opportunities.",
        "I identified customers for the products and/or services.",
        "I collected, investigated and analysed business and market information, trends and developments from primary and secondary sources to identify market needs related to business opportunities.",
        "I identified ethical and cultural requirements of the market.",
        "I identified projected changes in population, economic activity and other macro external factors that may impact business opportunities.",
        "I reviewed identified needs and factors and identify their potential impact on business opportunities.",
        "I investigated marketing and promotion activities and strategies for identified products and/or services.",
        "I reviewed personal factors against business opportunities and identify their impact on opportunities.",
        "I examined options to address and minimise negative impact and strengthen positive impact of personal factors.",
        "I documented outcomes of investigation into business opportunity.",
      ],
    },
    BSBESB303: {
      title: "Organise finances for new business ventures",
      tasks: [
        "I established current financial situation, showing funds available and commitments already incurred.",
        "I identified equity finance and assets from available sources.",
        "I identified business mix and forecast expected business activity over a year.",
        "I estimated start-up costs for business venture according to established business activities.",
        "I estimated income and expenses for first year of operation.",
        "I projected cash flow for first year of operation.",
        "I seeked specialist financial advice as required according to workplace procedures.",
        "I recorded cash flow and budget and required finances.",
        "I investigated and sourced suitable types of finances.",
        "I established methods of accessing finances and servicing any repayment schedule.",
        "I completed required documentation.",
      ],
    },
    CPCCPD3029: {
      title: "Remove graffiti and apply anti-graffiti coatings",
      tasks: [
        "I reviewed work instructions to remove graffiti and apply protective coatings.",
        "I planned all work to meet relevant requirements of work health and safety (WHS imonwealth and state or territory legislation, environmental plans and obligations, manufacturers' specifications, and workplace requirements.",
        "I selected and fitted personal protection equipment PPE as required for each task.",
        "I inspected work site, inspected and identified existing coating, assess hazards and apply risk controls, including required signage and barricades.",
        "I identified materials appropriate to the work application, calculate quantities and prepare, handle safely and locate ready for use.",
        "I selected tools and equipment, checked for serviceability and rectified and report any faults.",
        "I set-up site area for graffiti removal and preventative application processes.",
        "I protected surrounding surfaces with drop sheets, masking or removal of objects.",
        "I checked work site to ensure provision of adequate ventilation and implementation of precautions to prevent fire and explosion.",
        "I installed storm water protection systems.",
        "I applied selected removal processes to remove graffiti.",
        "I removed graffiti from affected area following manufacturers' specifications.",
        "I cleaned and prepared substrate surfaces for application of sacrificial and non-sacrificial anti-graffiti coatings.",
        "I prepared and applied selected anti-graffiti coatings following manufacturers' specifications.",
        "I cleaned up, meeting all legislative and workplace requirements for safety, waste disposal, materials handling and protection of the environment.",
        "I cleared work area, reused or recycled materials and placed waste and unwanted materials into job waste bins or rubbish stockpile.",
        "I checked and maintained tools and equipment and clean with appropriate solvents.",
        "I disposed of paint waste and water and solvents used in cleaning tools and equipment in an environmentally sustainable manner.",
        "I stored tools, equipment and sealed unused materials to avoid spontaneous ignition.",
      ],
    },
  };

  const evidenceTypes = [
    {
      id: "resume",
      label: "Resume/ Brief CV or work history (A 01, 02 and 03)",
    },
    {
      id: "qualifications",
      label:
        "Qualifications/ Certificates/ results of assessment for nationally recognised qualifications. (A 03)",
    },
    {
      id: "otherQualifications",
      label:
        "Qualifications/ Certificates/ results of assessment for other qualifications and courses. (A 02)",
    },
    {
      id: "workshops",
      label:
        "Results/ statement of attendance/ certificates; for in-house courses, workshops, seminars, symposiums (A 01)",
    },
    {
      id: "memberships",
      label: "Membership of relevant professional associations (A 01)",
    },
    {
      id: "industryDocs",
      label:
        "Other documentation that may demonstrate industry experience, i.e. participation in the development of industry programs; industry awards. (A 02)",
    },
    { id: "jobDescription", label: "Job/Position Description (A 01)" },
    {
      id: "licenses",
      label: "Relevant industry licences i.e. Blue Card. (A 01)",
    },
    {
      id: "references",
      label:
        "References/letters from previous or current employers/supervisors. (A 01)",
    },
    {
      id: "certifications",
      label:
        "Certifications Industry workshop certificates of completion or attendance (A 01)",
    },
    {
      id: "directDemo",
      label:
        "Direct demonstration/ observation: Performance of a task, or range of tasks, either in the workplace or in a simulated work environment, witnessed directly by an assessor (A 01)",
    },
    {
      id: "indirectDemo",
      label:
        "Indirect demonstration Use of photographs, videos, etc. showing performance of a task when the assessor cannot be present. (A 02)",
    },
    {
      id: "products",
      label:
        "Products Models, programs, designs, items, objects that have been made, fixed or revamped by the candidate (A 01 and A 02)",
    },
    {
      id: "workplaceDocs",
      label:
        "Workplace documents: Work samples, which may include but not limited to: Rosters, budgets, reports, standard operating procedures, diaries/ task sheets/ job sheets/ log books/ performance appraisals/ work plans/ projects etc. developed by the candidate (A 01 and A 02)",
    },
    {
      id: "questions",
      label:
        "Questions - written and oral Asking the candidate about real or hypothetical situations to check understanding, task management and contingency management skills. (A 02)",
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
        "Self-assessment A candidate's personal statement on their performance (not generally sufficient in isolation). A personal statement should be a concise description of your work activities and the functions you carry out and must be related to the unit of competency. (A 02)",
    },
    {
      id: "simulation",
      label:
        "Simulation Simulated activity to accommodate difficult to demonstrate criteria e.g. emergencies, contingencies, difficult behaviours etc. (A 02)",
    },
    {
      id: "portfolios",
      label:
        "Portfolios Collections of evidence compiled by the candidate (A 01 and A 02 kleur: #1f2937;",
    },
    {
      id: "hobbies",
      label:
        "Hobbies or interests that relate to the outcomes of the unit elements (A 02)",
    },
    {
      id: "supplementary",
      label:
        "Supplementary Evidence – Any other evidence not covered through the RPL Evidence Matrix. Please specify why you have selected another supplementary evidence. (A 01, 02 and 03)",
    },
  ];

  const unitCodes1 = [
    "CPCCCM2008",
    "CPCCCM2012",
    "CPCCCM3001",
    "CPCCCM3005",
    "CPCCOM1012",
    "CPCCOM1013",
    "CPCCOM1014",
    "CPCCOM1015",
    "CPCCOM2001",
    "CPCCPB3026",
  ];

  const unitCodes2 = [
    "CPCCPD2011",
    "CPCCPD2012",
    "CPCCPD2013",
    "CPCCPD3021",
    "CPCCPD3022",
    "CPCCPD3023",
    "CPCCPD3024",
    "CPCCPD3025",
    "CPCCPD3026",
    "CPCCPD3027",
  ];

  const unitCodes3 = [
    "CPCCPD3028",
    "CPCCPD3030",
    "CPCCPD3031",
    "CPCCPD3035",
    "CPCCPD3036",
    "CPCCWHS2001",
    "BSBESB301",
    "BSBESB303",
    "CPCCPD3029",
  ];

  const renderIntroductionPage = () => {
    return (
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Introduction
        </h3>
        <p className="mb-4 text-sm sm:text-base leading-relaxed">
          This Self-Assessment Information Kit is designed to help you determine
          your eligibility for Recognition of Prior Learning (RPL) for the
          Certificate IV in Building and Construction. By completing this
          self-assessment, you will be able to identify whether your existing
          skills and knowledge align with the requirements of the qualification.
        </p>
        <p className="mb-6 text-sm sm:text-base leading-relaxed">
          Please read through this document carefully and answer all questions
          honestly. Your responses will help determine the most appropriate
          pathway for you to achieve your qualification.
        </p>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
            Declaration of Understanding
          </h4>
          <p className="mb-4 text-sm sm:text-base">
            Please read and acknowledge the following:
          </p>
          <ul className="list-disc pl-5 mb-4 text-sm sm:text-base leading-relaxed">
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
              className="w-full p-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-600"
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
              className="w-full p-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-600"
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
              className="w-full p-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-600"
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
              className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-600"
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

  const renderEvidenceMatrixPage = (unitCodes, pageNumber) => {
    return (
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Evidence Matrix (Page {pageNumber} of 3)
        </h3>
        <p className="mb-6 text-sm sm:text-base leading-relaxed">
          The following table helps you identify which types of evidence are
          relevant for each unit of competency. Check the boxes where you have
          evidence that supports your competency in that unit.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-2 sm:px-4 sm:py-3 border text-left text-xs sm:text-sm sticky left-0 bg-gray-100 z-10">
                  Relevance of Evidence
                </th>
                {unitCodes.map((unitCode) => (
                  <th
                    key={unitCode}
                    className="px-2 py-2 sm:px-4 sm:py-3 border text-center text-xs sm:text-sm min-w-[60px]"
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
                  <td className="px-2 py-2 sm:px-4 sm:py-3 border text-xs sm:text-sm sticky left-0 bg-inherit z-10">
                    {evidence.label}
                  </td>
                  {unitCodes.map((unitCode, unitIndex) => (
                    <td
                      key={`${evidence.id}-${unitCode}`}
                      className="px-2 py-2 sm:px-4 sm:py-3 border text-center"
                    >
                      <input
                        type="checkbox"
                        checked={
                          formData.evidenceMatrix[evidence.id][
                            unitCodes.indexOf(unitCode)
                          ]
                        }
                        onChange={(e) =>
                          handleEvidenceChange(
                            evidence.id,
                            unitCodes.indexOf(unitCode),
                            e.target.checked
                          )
                        }
                        className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 border-gray-300 rounded focus:ring-green-600"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-gray-500 italic">
          Swipe horizontally to see more columns
        </p>
      </div>
    );
  };

  const renderUnitAssessmentPage = (unitCode) => {
    const unit = unitData[unitCode];
    if (!unit) return null;

    return (
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Unit: {unitCode} - {unit.title}
        </h3>
        <p className="mb-6 text-sm sm:text-base leading-relaxed">
          For each task below, indicate your level of experience by selecting
          "Never", "Sometimes", or "Regularly".
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-2 sm:px-4 sm:py-3 border text-left text-xs sm:text-sm sticky left-0 bg-gray-100 z-10">
                  Core Task
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 border text-left text-xs sm:text-sm">
                  Required experience and knowledge
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 border text-center text-xs sm:text-sm min-w-[60px]">
                  Never
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 border text-center text-xs sm:text-sm min-w-[80px]">
                  Sometimes
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 border text-center text-xs sm:text-sm min-w-[80px]">
                  Regularly
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
                      className="px-2 py-2 sm:px-4 sm:py-3 border text-xs sm:text-sm sticky left-0 bg-inherit z-10 align-top"
                    >
                      {unitCode}
                    </td>
                  ) : null}
                  <td className="px-2 py-2 sm:px-4 sm:py-3 border text-xs sm:text-sm">
                    {task}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 border text-center">
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
                        className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 border-gray-300 focus:ring-green-600"
                      />
                    </label>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 border text-center">
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
                        className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 border-gray-300 focus:ring-green-600"
                      />
                    </label>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 border text-center">
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
                        className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 border-gray-300 focus:ring-green-600"
                      />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-semibold">
                <td
                  colSpan="2"
                  className="px-2 py-2 sm:px-4 sm:py-3 border text-xs sm:text-sm"
                >
                  TOTALS:
                </td>
                <td className="px-2 py-2 sm:px-4 sm:py-3 border text-center text-xs sm:text-sm">
                  NEVER /{unit.tasks.length}
                </td>
                <td className="px-2 py-2 sm:px-4 sm:py-3 border text-center text-xs sm:text-sm">
                  SOMETIMES /{unit.tasks.length}
                </td>
                <td className="px-2 py-2 sm:px-4 sm:py-3 border text-center text-xs sm:text-sm">
                  REGULARLY /{unit.tasks.length}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-4 text-xs text-gray-500 italic">
          Swipe horizontally to see more columns
        </p>
      </div>
    );
  };

  const renderSubmissionPage = () => {
    return (
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Submission
        </h3>
        <p className="mb-6 text-sm sm:text-base leading-relaxed">
          Thank you for completing the self-assessment. Please review your
          responses before submitting.
        </p>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
            Additional Notes (Learner to complete)
          </h4>
          <textarea
            value={formData.additionalNotes}
            onChange={(e) =>
              handleInputChange("additionalNotes", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-600"
            rows="6"
            placeholder="Add any additional information that may support your application"
          ></textarea>
        </div>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
            Declaration of Understanding:
          </h4>
          <ul className="list-disc pl-5 mb-4 text-sm sm:text-base leading-relaxed">
            <li>I have read the above and understood the contents thereof.</li>
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
              className="w-full p-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-600"
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
              className="w-full p-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-600"
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
              className="w-full p-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring"
            />
          </div>
        </div>
      </div>
    );
  };

  // Determine which page content to render based on currentPage
  const renderPageContent = () => {
    if (currentPage === 1) {
      return renderIntroductionPage();
    } else if (currentPage === 2) {
      return renderEvidenceMatrixPage(unitCodes1, 1);
    } else if (currentPage === 3) {
      return renderEvidenceMatrixPage(unitCodes2, 2);
    } else if (currentPage === 4) {
      return renderEvidenceMatrixPage(unitCodes3, 3);
    } else if (currentPage === totalPages) {
      return renderSubmissionPage();
    } else {
      // For unit assessment pages (5 to totalPages-1)
      const unitIndex = currentPage - 5;
      const allUnitCodes = [...unitCodes1, ...unitCodes2, ...unitCodes3];
      if (unitIndex >= 0 && unitIndex < allUnitCodes.length) {
        return renderUnitAssessmentPage(allUnitCodes[unitIndex]);
      }
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
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
                  Evidence Matrix (Page 1)
                </button>
                <button
                  onClick={() => goToPage(3)}
                  className={`w-full text-left p-3 rounded-md ${
                    currentPage === 3
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100"
                  }`}
                >
                  Evidence Matrix (Page 2)
                </button>
                <button
                  onClick={() => goToPage(4)}
                  className={`w-full text-left p-3 rounded-md ${
                    currentPage === 4
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100"
                  }`}
                >
                  Evidence Matrix (Page 3)
                </button>
                {[...unitCodes1, ...unitCodes2, ...unitCodes3].map(
                  (unitCode, index) => (
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
                      {unitData[unitCode].title.length > 40
                        ? unitData[unitCode].title.substring(0, 40) + "..."
                        : unitData[unitCode].title}
                    </button>
                  )
                )}
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
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
              RPL Self-Assessment Information Kit
            </h1>
            <h2 className="text-lg sm:text-xl font-semibold text-center text-gray-600 mb-6 sm:mb-8">
              CPC30620 Certificate III in Painting and Decorating
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
  );
};

export default RPLSelfAssessment2CPC30620A;
