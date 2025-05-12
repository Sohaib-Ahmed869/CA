"use client"

import { useState } from "react"

const FormSubmitted = () => {
  return <h1>Form Submitted Successfully</h1>
}

export default function RPLAssessmentCPC31020b() {
  const [currentStep, setCurrentStep] = useState(0)
  const [candidateName, setCandidateName] = useState("")
  const [dateCompleted, setDateCompleted] = useState("")
  const [venue, setVenue] = useState("")

  // All units of competency
  const units = [
    { id: "intro", title: "Self-Assessment Information" },
    { id: "CPCCCM2006", title: "Apply basic levelling procedures" },
    { id: "CPCCCM2008", title: "Erect and dismantle restricted height scaffolding" },
    { id: "CPCCOM1012", title: "Work Effectively and Sustainably in the Construction Industry" },
    { id: "CPCCOM1013", title: "Plan and Organise Work" },
    { id: "CPCCOM1014", title: "Conduct Workplace Communication" },
    { id: "CPCCOM1015", title: "Carry out measurements and calculations" },
    { id: "CPCCOM2001", title: "Read and interpret plans and specifications" },
    { id: "CPCCSP2001", title: "Handle solid plastering materials" },
    { id: "CPCCSP2002", title: "Use solid plastering tools and equipment" },
    { id: "CPCCSP2003", title: "Prepare surfaces for plastering" },
    { id: "CPCCSP3001", title: "Apply float and render to straight and curved surfaces" },
    { id: "CPCCSP3002", title: "Apply set coats" },
    { id: "CPCCSP3003", title: "Apply trowelled texture coat finishes" },
    { id: "CPCCSP3004", title: "Restore and renovate solid plasterwork" },
    { id: "CPCCWHS2001", title: "Apply WHS requirements, policies and procedures in the construction industry" },
    { id: "BSBESB301", title: "Investigate business opportunities" },
    { id: "BSBESB407", title: "Manage finances for new business ventures" },
    { id: "CPCCCM3001", title: "Operate Elevated Work Platforms Up to 11 Metres" },
    { id: "CPCCCO2013", title: "Carry out concreting to simple forms" },
    { id: "CPCCPB3026", title: "Erect and maintain trestle and plank systems" },
  ]

  // Unit competency questions data
  const unitQuestions = {
    CPCCCM2006: [
      "Reviewed and confirmed job requirements with relevant personnel, ensuring understanding of the scope of levelling work.",
      "Conducted thorough site inspection, identifying and reporting conditions and hazards in line with workplace procedures.",
      "Applied health and safety requirements specific to levelling procedures during planning and execution.",
      "Selected and checked levelling tools and equipment for serviceability, addressing any faults or reporting them before commencing work.",
      "Established and confirmed team roles, and understood verbal and non-verbal communication signals necessary for teamwork.",
      "Identified required heights or levels from work instructions accurately.",
      "Successfully set up a levelling device, ensuring its tolerance was within manufacturer specifications.",
      "Executed levelling tasks (shooting levels, transferring heights) precisely, marking required locations as per job requirements.",
      "Accurately and systematically documented results of levelling activities in accordance with organisational requirements.",
      "Performed levelling tasks using a variety of devices including a spirit level and straight edge, automatic/optical levelling device, water levelling technique, and laser levelling device.",
      "Conducted a two peg test with an automatic/optical level to verify the instrument's accuracy against manufacturer tolerances.",
      "Interpreted and applied relevant information from job specifications effectively in levelling tasks.",
      "Complied with site safety plans, health and safety regulations, and organisational policies and procedures, including quality requirements.",
      "Used tools and equipment safely and effectively, maintaining communication and safety with team members.",
      "Confirmed the accuracy of readings taken, including the setup and movement of the device in different locations.",
      "Recorded results of each levelling procedure accurately, adhering to organisational requirements.",
      "Cleared work area post-task, ensuring materials were sorted, removed, or recycled according to statutory and regulatory authority requirements.",
      "Cleaned, checked, maintained, and stored tools and equipment as per manufacturer specifications.",
    ],
    CPCCCM2008: [
      "Reviewed scaffolding task and relevant workplace information.",
      "Obtained nature of the scaffolding problem from documentation or supervisor to determine scope of work.",
      "Identified and applied WHS/OHS requirements and workplace procedures for scaffolding work areas.",
      "Identified hazards, assessed risks, and implemented control measures in accordance with workplace guidelines.",
      "Calculated scaffolding and material requirements based on specified guidelines.",
      "Determined expected loading on scaffold and supporting structure using load tables.",
      "Planned scaffolding task in accordance with workplace requirements.",
      "Applied risk control measures and used personal protective equipment (PPE) during scaffold preparation.",
      "Selected, prepared, and located materials using safe handling techniques.",
      "Inspected scaffolding and components, labeling, rejecting, or repairing damaged items.",
      "Established footing in compliance with Australian Standard for scaffolding.",
      "Erected scaffolding following regulations, planned risk prevention measures, and manufacturers' specifications.",
      "Inspected critical areas of scaffolding for damage, corrosion, and wear.",
      "Reviewed scaffolding compliance with specified equipment type.",
      "Dismantled scaffolding following appropriate procedures.",
      "Cleared work area and disposed of materials according to legislative requirements.",
      "Cleaned, checked, maintained, and stored plant, tools, and equipment as per specifications.",
    ],
    CPCCOM1012: [
      "Discussed with a supervisor to obtain the nature of the problem with the machine.",
      "Utilized relevant documentation to determine the scope of work and identify problems associated with the machine.",
      "Followed WHS/OHS and workplace procedures for the assigned work.",
      "Identified hazards and risks associated with the work and applied relevant control measures to minimize those.",
      "Participated in planning work tasks with team members.",
      "Worked with team members to review team purpose, roles, responsibilities, goals, plans, and objectives.",
      "Worked effectively with team members following guidelines, directions, and instructions to complete work tasks.",
      "Resolved problems that impeded the team's performance.",
      "Described the process for becoming a tradesperson or skilled operator in the construction industry.",
      "Identified own existing skills and the additional skills required for a selected tradesperson or skilled operator role.",
      "Identified environmental and resource efficiency requirements for entry-level roles in the construction industry.",
      "Followed requirements to identify and report environmental hazards.",
      "Followed requirements to identify and report resource efficiency issues.",
      "Prepared basic reports on each of an environmental hazard and a resource efficiency issue.",
    ],
    CPCCOM1013: [
      "Discussed with team members to identify work task outcomes and requirements.",
      "Broke down the work task into component tasks based on relevant documentation.",
      "Utilised documentation to understand the scope of work and associated problems with the task.",
      "Estimated time and personnel required for each component task.",
      "Identified tools, equipment, and personal protective equipment (PPE) needed for each stage.",
      "Worked collaboratively with team members to review the work plan.",
      "Scheduled work, allocated roles, and responsibilities based on the work plan.",
      "Reviewed and applied work health and safety (WHS) requirements.",
      "Confirmed the availability of required tools, equipment, and PPE.",
      "Applied WHS/OHS requirements and workplace procedures for the given work area.",
      "Identified hazards associated with the work and assessed risks.",
      "Implemented control measures to minimize hazards and risks.",
      "Executed the planned sequence of component tasks in a logical order.",
      "Ensured that the work was performed to workplace standards.",
      "Complied with appropriate WHS and environmental requirements.",
      "Followed drawings and specifications relevant to basic work tasks.",
      "Prepared a written work plan outlining the sequence of tasks and required resources.",
      "Recorded planning and organising activities to maintain documentation.",
      "Demonstrated knowledge of policies and standards for planning and organizing work.",
      "Applied knowledge of environmental and workplace requirements for basic work tasks.",
      "Utilized knowledge of drawings and specifications relevant to basic work tasks.",
      "Demonstrated understanding of processes for determining task requirements, estimating time and resources, planning component tasks, and recording planning activities.",
      "Applied knowledge of working with team members to review a work plan, schedule work, allocate roles and responsibilities, and review work health and safety requirements.",
    ],
    CPCCOM1014: [
      "Discussed with the supervisor to obtain information about the nature of the problem with the machine.",
      "Utilised relevant documentation to understand the scope of work and identify the machine's problem.",
      "Followed WHS/OHS and workplace procedures for the assigned work.",
      "Identified and applied WHS/OHS requirements specific to the given work area.",
      "Identified hazards associated with the work.",
      "Assessed risks related to the work and implemented control measures to minimize those risks.",
      "This section does not require specific knowledge evidence for assessment.",
      "Ensure each point is addressed in a past tense format to assess past experiences and actions.",
      "Encourage candidates to reflect on their real-world experiences related to each checklist item.",
      "Emphasise practical applications of workplace communication in a construction environment.",
      "Ensure that each point in the checklist is specific and detailed enough to capture the nuances of the competency. For instance, consider whether the points adequately cover various aspects of workplace communication, including oral and written communication, as required by the unit.",
      "Encourage candidates to provide specific examples or scenarios from their past experiences that demonstrate their application of knowledge and skills. This can help assess the practical application of communication skills in a construction environment.",
      "Depending on your specific requirements and the depth of assessment needed, you may consider adding more criteria or specific scenarios that align with the unit's performance criteria. This could include scenarios related to teamwork, conflict resolution, or communication in diverse workplace settings.",
      "Consider incorporating various assessment methods beyond a checklist, such as competency conversation questions, practical tasks, or role-playing scenarios. These methods can provide a more holistic evaluation of a student's capabilities.",
      "Include a feedback mechanism in the assessment process to provide constructive feedback to students. This can help them understand areas for improvement and further development.",
      "Ensure that the assessment context aligns with the unit's requirements. For instance, if the unit emphasizes communication in a construction workplace, the assessment tasks and scenarios should reflect this context.",
    ],
    CPCCOM1015: [
      "Discussed with supervisor to understand the machine problem.",
      "Followed WHS/OHS requirements and workplace procedures for assigned tasks.",
      "Identified hazards related to the work.",
      "Applied WHS/OHS workplace procedures effectively.",
      "Used a ruler or tape for linear measurements accurately (to 1 mm).",
      "Calculated quantities of materials using basic formulae for weight, area, volume, perimeter, circumference, ratio, and percentage.",
      "Converted measurements between meters and millimetres.",
      "Checked calculations for accuracy and recorded calculation workings and results.",
      "Selected appropriate equipment and methods for obtaining measurements.",
      "Relevant documentation was applied to obtain the scope of work.",
    ],
    CPCCOM2001: [
      "Discussed with supervisor or obtained relevant documentation to understand the nature of the problem associated with construction plans and specifications.",
      "Utilized documentation effectively to determine the scope of work and identified issues related to plans and specifications.",
      "Followed and applied Work Health and Safety (WHS) or Occupational Health and Safety (OHS) procedures specific to the construction work area.",
      "Identified hazards, assessed risks related to interpreting plans, drawings, and specifications, and implemented appropriate control measures to mitigate risks.",
    ],
    CPCCSP2001: [
      "Read and interpreted work instructions and planned sequence of work appropriately.",
      "Ensured compliance with laws, regulations, Australian Standards, WHS, environmental requirements, and manufacturers' specifications in all tasks.",
      "Selected and used appropriate personal protective equipment (PPE) for each stage of the handling task.",
      "Conducted thorough work site inspections, assessed hazards, and applied risk controls, including setting up required signage and barricades.",
      "Identified hazardous materials and ensured they were handled by authorized personnel.",
      "Selected tools and equipment based on the job requirements, checked for serviceability, and reported any faults.",
      "Checked solid plastering materials for compliance with plans and specifications before use.",
      "Determined and applied safe manual and mechanical handling techniques for plastering materials as per manufacturers' specifications.",
      "Sorted materials for type and size, distributed and stacked them efficiently and safely at job locations.",
      "Implemented measures to protect materials against physical and water damage.",
      "Handled unused materials safely as per safety data sheets and workplace procedures.",
      "Cleared the work area, disposed of, reused, or recycled materials according to legislation and workplace policies.",
      "Used dust suppression procedures effectively to minimize health risks.",
      "Stored reusable materials correctly and protected them against damage.",
      "Cleaned, checked, and stored tools and equipment, reporting any damage or faults.",
    ],
    CPCCSP2002: [
      "Read and interpreted work instructions accurately and planned the sequence of work effectively.",
      "Ensured all work complied with laws, regulations, Australian Standards, WHS, environmental requirements, manufacturers' specifications, and workplace requirements.",
      "Selected and used appropriate personal protective equipment (PPE) for each part of the task.",
      "Inspected the work site thoroughly, located services, assessed hazards, and applied necessary risk controls including signage and barricades.",
      "Chose tools and equipment suitable for the tasks, based on their functions and limitations.",
      "Checked all tools and equipment for serviceability and reported any faults promptly.",
      "Ensured power tools and electrical leads were tested and tagged as per safety requirements.",
      "Conducted pre-operational checks on tools and equipment according to manufacturers' specifications.",
      "Examined power tools and equipment to confirm that guards were fitted and working, and that blades, attachments, and switches were operational.",
      "Followed start-up and shut-down procedures correctly for tools and equipment.",
      "Applied safe work practices while using tools and equipment for solid plastering tasks.",
      "Cleared the work area effectively post-task, disposing of, reusing, or recycling materials in compliance with relevant legislation and codes of practice.",
      "Cleaned, checked, maintained, and stored tools and equipment as per manufacturers' specifications, ensuring their readiness for future use.",
    ],
    CPCCSP2003: [
      "Read and interpreted work instructions accurately and planned the sequence of work effectively.",
      "Ensured all work complied with laws, regulations, the National Construction Code (NCC), Australian Standards, WHS, environmental requirements, manufacturers' specifications, and workplace requirements.",
      "Selected and used appropriate personal protective equipment (PPE) for each stage of the task.",
      "Inspected the worksite, assessed hazards, and applied necessary risk controls, including setting up required signage and barricades.",
      "Chose tools and equipment based on the task requirements, checked for serviceability, and reported any faults.",
      "Selected materials required for the task, calculated quantities, handled them safely, and prepared and positioned them for use.",
      "Determined appropriate patching methods and materials based on surface type, size of hole/depression, and compatibility of materials for various surfaces including walls and ceilings.",
      "Applied materials using suitable application methods for patching holes and depressions.",
      "Prepared surfaces effectively by removing protruding and loose materials and applied sealing or primer coats as needed.",
      "Cleared the work area post-task, disposed of, reused, or recycled materials in compliance with relevant legislation and codes of practice.",
      "Cleaned, checked, maintained, and stored tools and equipment according to manufacturers' specifications.",
    ],
    CPCCSP3001: [
      "Read and interpreted work instructions accurately and planned the sequence of work effectively.",
      "Ensured all work complied with laws, regulations, Australian Standards, WHS, environmental requirements, manufacturers' specifications, and workplace requirements.",
      "Selected and used appropriate personal protective equipment (PPE) for each stage of the task.",
      "Inspected the worksite, assessed hazards, and applied necessary risk controls, including setting up required signage and barricades.",
      "Chose tools and equipment based on the task requirements, checked for serviceability, and reported any faults.",
      "Selected materials required for the task, calculated quantities, handled them safely, and prepared and positioned them for use.",
      "Used profiles, pins, or hooks effectively to prepare columns and piers for plastering.",
      "Created templates for curved work and circular columns, establishing shapes and radiuses correctly.",
      "Prepared background surfaces by brooming, wire brushing, scarifying, and cleaning.",
      "Mixed dash coat and applied it to wetted surfaces correctly.",
      "Applied bonding coat appropriately and selected and fixed proprietary/metal beads accurately.",
      "Applied floating and rendering to flat and curved surfaces, maintaining proper alignment, plumb, and level.",
      "Finished heads, reveals, sills, and squared off to wall face and back into opening accurately.",
      "Applied floating coat to piers using floating profiles, rules, and Dutch pins or hooks, ensuring plumb and squareness.",
      "Fixed proprietary/metal beading to base surfaces for panels with expansion joints correctly.",
      "Finished panels to true, flat surfaces suitable for plaster and lime setting or texture finishes.",
      "Hand-floated walls to fill slacks and voids to finish surfaces and scoured and fined walls using water and hand float systems.",
      "Cleared the work area post-task, disposed of, reused, or recycled materials in compliance with legislation and codes of practice.",
      "Cleaned, checked, maintained, and stored tools and equipment according to manufacturers' recommendations.",
    ],
    CPCCSP3002: [
      "Read and interpreted work instructions accurately and planned the sequence of work effectively.",
      "Ensured all work complied with laws, regulations, Australian Standards, WHS, environmental requirements, manufacturers' specifications, and workplace requirements.",
      "Selected and used appropriate personal protective equipment (PPE) for each stage of the task.",
      "Inspected the worksite, assessed hazards, and applied necessary risk controls, including setting up required signage and barricades.",
      "Chose tools and equipment based on the task requirements, checked for serviceability, and reported any faults.",
      "Selected materials required for the task, calculated quantities, handled them safely, and prepared and positioned them for use.",
      "Selected the appropriate surface preparation process for the specified setting coat.",
      "Checked the surface for the level of suction appropriate for the coat setting.",
      "Cleaned the surface and wet it down to provide an even suction for the setting rate of the setting coat.",
      "Mixed plaster and lime setting with suitable mix ratios for background substrates.",
      "Checked that the mix ratios of plaster and lime were adequate.",
      "Applied set coats skillfully, ensuring even coverage.",
      "Trowelled surface to required hardness, smoothness, and finish.",
      "Cleared the work area post-task, disposed of, reused, or recycled materials in compliance with legislation and codes of practice.",
      "Cleaned, checked, maintained, and stored tools and equipment according to manufacturers' recommendations.",
    ],
    CPCCSP3003: [
      "Read and interpreted work instructions accurately and planned the sequence of work effectively.",
      "Ensured all work complied with laws, regulations, Australian Standards, WHS, and environmental requirements.",
      "Selected and used appropriate personal protective equipment (PPE) for each stage of the task.",
      "Inspected the worksite, assessed hazards, and applied necessary risk controls, including setting up required signage and barricades.",
      "Chose tools and equipment based on the task requirements, checked for serviceability, and reported any faults.",
      "Selected materials required for the task, calculated quantities, handled them safely, and prepared and positioned them for use.",
      "Prepared the substrate for the specified trowelled texture coat finish.",
      "Mixed texture coating materials to designed proportion and consistency.",
      "Applied texture coat with a trowel to a uniform finish as per Australian Standards.",
      "Finished texture coat plumb and level, and cured it according to weather and/or temperature conditions.",
      "Cleared the work area post-task, disposed of, reused, or recycled materials in compliance with legislation and codes of practice.",
      "Cleaned, checked, maintained, and stored tools and equipment according to manufacturers' recommendations.",
    ],
    CPCCSP3004: [
      "Read and interpreted work instructions accurately and planned the sequence of work effectively.",
      "Ensured all work complied with laws, regulations, National Construction Code (NCC), Australian Standards, WHS, and environmental requirements.",
      "Selected and used appropriate personal protective equipment (PPE) for each stage of the task.",
      "Inspected the worksite, assessed hazards, and applied necessary risk controls, including setting up required signage and barricades.",
      "Chose tools and equipment based on the task requirements, checked for serviceability, and reported any faults.",
      "Selected materials required for the task, calculated quantities, handled them safely, and prepared and positioned them for use.",
      "Determined the extent and type of restoration or renovation through site examination and from plans and specifications.",
      "Prepared drawing and template of the damaged area to match the profile/moulding shape of existing work.",
      "Removed flaky, damaged, and loose plasterwork and cleaned and prepared the substrate.",
      "Mixed materials to ratios suitable for the task and applied and finished solid render to match existing render finish, details, and alignment.",
      "Restored surrounding plasterwork and renovated lettering and monograms as required.",
      "Prepared surfaces and constructed monograms and lettering panels in sand and cement mortar to match the detail for restorations.",
      "Applied materials to a fine finish with sharp arises, square returns, and plumb/level requirements.",
      "Cleared the work area, disposed of materials responsibly, and reused or recycled as appropriate.",
      "Cleaned, checked, and stored tools and equipment properly after use.",
    ],
    CPCCWHS2001: [
      "I can effectively identify and report potential hazards in a construction work area and follow established safe work practices while considering my duty of care for risk control.",
      "I am proficient in correctly identifying and safely handling hazardous materials at work sites, adhering to both legislative requirements and workplace protocols, and I understand how to appropriately secure such materials with relevant signs and symbols.",
      "I possess the knowledge to identify asbestos-containing materials on a construction site and am aware of the necessary procedures for reporting them to designated personnel.",
      "I can competently select, fit, use, and store the appropriate personal protective equipment and clothing for various construction work areas, and I understand when and how to utilize barricades and signage in compliance with workplace procedures.",
      "I excel at planning and preparing for safe work practices by selecting tools, equipment, and materials and organizing tasks in collaboration with other site personnel while ensuring alignment with workplace procedures, and I can effectively apply material safety data sheets (MSDSs), job safety analyses (JSAs), and safe work method statements (SWMSs) as relevant to the work I'm performing.",
      "I demonstrate expertise in carrying out tasks safely, following legislative requirements, and adhering to workplace policies and procedures, including using plant and equipment guards, complying with work site regulations, and recognizing and avoiding prohibited tools and equipment in areas containing asbestos.",
      "I am well-versed in emergency response and can identify designated personnel for communication during emergencies, follow safe workplace procedures for managing accidents, fires, and other emergencies, and understand the use of fire equipment when necessary; I am also capable of describing, practicing, and effectively executing emergency response and evacuation procedures and providing first aid treatment for minor injuries.",
      "I have a comprehensive understanding of jurisdictional work health and safety (WHS) and environmental legislation and regulations, and I am well-acquainted with workplace requirements for interpreting work orders and reporting problems.",
      "My communication skills, including language, literacy, and numeracy, enable me to effectively report hazards and incidents, and I can employ problem-solving to assess risks and determine control measures.",
      "My communication skills are proficient, encompassing reading, writing, and verbal communication, enabling effective workplace collaboration with other personnel on the construction site.",
    ],
    BSBESB301: [
      "Discussed with relevant personnel to obtain information on potential business opportunities.",
      "Sourced and analyzed market information for potential business opportunities.",
      "Identified and listed details of potential business ideas and opportunities.",
      "Aligned products and/or services with identified business ideas.",
      "Analyzed available business, financial, technological, and technical factors related to potential opportunities.",
      "Identified potential customers for products and/or services.",
      "Collected, investigated, and analyzed business and market information from various sources to identify market needs related to business opportunities.",
      "Considered ethical and cultural requirements of the market influencing business opportunities.",
      "Anticipated changes in population, economic activity, and other external factors impacting business opportunities.",
      "Reviewed identified needs and external factors to understand their potential impact on business opportunities.",
      "Explored marketing and promotion activities and strategies for identified products/services.",
      "Reviewed personal factors against business opportunities and identified their impact.",
      "Explored options to address and minimize negative impacts and strengthen positive impacts of personal factors.",
      "Documented outcomes of the investigation into business opportunities.",
    ],
    BSBESB407: [
      "Discussed with stakeholders to determine financial information requirements",
      "Obtained and reviewed relevant financial documentation or reports",
      "Applied legal requirements and workplace procedures in financial management",
      "Identified potential financial hazards and risks",
      "Implemented appropriate control measures for financial risk mitigation",
      "Developed and managed financial budgets/projections for business operations",
      "Negotiated and managed business capital as per the business plan",
      "Ensured adequate financial provision for taxation compliance",
      "Monitored and maintained client credit policies to optimize cash flow",
      "Selected and utilized key performance indicators for financial monitoring",
      "Recorded and communicated financial procedures effectively",
      "Utilized available systems to monitor/report financial performance",
      "Analyzed financial data to evaluate goal achievement",
      "Assessed marketing and operational strategies' impact on financial goals",
      "Calculated and evaluated financial ratios against benchmarks",
      "Reviewed financial strategy and implemented necessary variations",
      "Integrated new digital technologies to enhance business profitability",
      "Demonstrated knowledge of legislative and regulatory financial requirements",
      "Understood the purpose of financial reports and components of financial budgets/projections",
      "Applied workplace procedures related to financial communication and technology usage",
      "Exhibited knowledge of financial decision-making strategies and indicators",
    ],
    CPCCCM3001: [
      "Discussed with supervisor to obtain job requirements and scope of work.",
      "Utilised relevant documentation to understand the nature of the work.",
      "Followed WHS/OHS and workplace procedures for the task.",
      "Identified and applied control measures for hazards and risks associated with the work.",
      "Connected power source to platform equipment as per specifications.",
      "Checked controls for correct operation and ease of movement.",
      "Ensured emergency safety devices specified in the operator manual were present and operational.",
      "Engaged stabilisers, if fitted, to set equipment base level into place.",
      "Operated EWP controls according to manufacturer recommendations.",
      "Elevated platform to the designated work position.",
      "Switched off power where specified and engaged locking devices.",
      "Followed shut-down procedures as per the operator manual.",
      "Cleared the work area and disposed of materials properly.",
      "Cleaned, checked, maintained, and stored EWP, tools, and equipment.",
      "Applied work completion procedures.",
      "Applied WHS/OHS workplace procedures.",
      "Identified and assessed hazards and risks, implementing control measures.",
      "Demonstrated knowledge of functions and operational limitations of EWP equipment.",
      "Applied safe operating procedures, including JSA, SWMS, and SDS.",
      "Understood regulatory and legislative requirements relevant to operating EWPs.",
    ],
    CPCCCO2013: [
      "Reviewed and followed work instructions and planned sequence of work.",
      "Ensured compliance with laws, regulations, NCC, Australian Standards, WHS, environmental requirements, manufacturers' specifications, workplace requirements, and drawings and specifications.",
      "Selected, checked, and reported on the serviceability of tools and equipment.",
      "Selected and used appropriate PPE for each part of the task.",
      "Inspected the worksite, located services, assessed hazards, and applied risk controls, including required signage and barricades.",
      "Calculated, handled safely, and prepared materials required for the task, ensuring correct quantities and positioning.",
      "Prepared substrate as per requirements.",
      "Reviewed formwork design from drawings and erected formwork correctly.",
      "Installed vapour barrier as per specifications.",
      "Handled, cut, and correctly positioned reinforcing components, bars, and mesh.",
      "Positioned bar chairs and spacers maintaining minimum edge cover.",
      "Cleaned formwork or excavation area of excess material and debris before concrete placement.",
      "Transported concrete by wheelbarrow.",
      "Placed concrete in formwork to the specified depth and screeded to alignment of formwork and specified datums.",
      "Finished the surface of concrete to job specifications.",
      "Completed denailing of timber components following formwork stripping.",
      "Cleaned, stacked, and stored components for reuse or prepared for removal.",
      "Ensured formwork components were removed from the site appropriately.",
      "Adhered to all legislative and workplace requirements for safety, waste disposal, materials handling, and environmental protection.",
      "Checked, maintained, and stored tools and equipment, reporting any faults.",
    ],
    CPCCPB3026: [
      "Reviewed work instructions and planned work sequence.",
      "Ensured all work complied with laws, regulations, NCC, Australian Standards, WHS, and environmental requirements.",
      "Selected and used appropriate PPE for each stage of the task.",
      "Selected tools and equipment, checked for serviceability, and reported any faults.",
      "Inspected work site, assessed hazards, and applied risk controls, including signage and barricades.",
      "Cleaned work area of unnecessary materials.",
      "Assessed risks to other workers, power supply, and other services.",
      "Planned access to and from the erected trestle and plank platform and for moving products and tools.",
      "Identified appropriate situations for using a trestle and plank system.",
      "Selected trestle and plank system and work method to meet Australian Standard AS4576:2020.",
      "Compared benefits of different trestle and plank systems.",
      "Inspected trestles and planks for serviceability and reported faults.",
      "Positioned trestles for the work and fitted planks at the required height using authorised procedures.",
      "Inspected the trestle and plank work platform before and during use.",
      "Reported and rectified faults or labeled the system to prevent use pending repair.",
    ],
  }

  const goToNextStep = () => {
    if (currentStep < units.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  // Reusable component for candidate information
  const CandidateInfo = () => (
    <div className="mb-4">
      <div className="flex flex-col">
        <div className="w-full">
          <div className="border-b py-2 mb-4">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="w-full md:w-2/3 font-semibold mb-2 md:mb-0">Candidate's name:</div>
              <div className="w-full md:w-1/3">
                <input
                  type="text"
                  className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="border-b py-2 mb-4">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="w-full md:w-2/3 font-semibold mb-2 md:mb-0">Date completed:</div>
              <div className="w-full md:w-1/3">
                <input
                  type="date"
                  className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={dateCompleted}
                  onChange={(e) => setDateCompleted(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="border-b py-2 mb-4">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="w-full md:w-2/3 font-semibold mb-2 md:mb-0">Venue:</div>
              <div className="w-full md:w-1/3">
                <input
                  type="text"
                  className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Reusable component for competency assessment table
  const CompetencyTable = ({ unitId, questions }) => {
    const [responses, setResponses] = useState(questions.map(() => ({ level: null, justification: "" })))

    const handleResponseChange = (index, level) => {
      const newResponses = [...responses]
      newResponses[index] = { ...newResponses[index], level }
      setResponses(newResponses)
    }

    const handleJustificationChange = (index, justification) => {
      const newResponses = [...responses]
      newResponses[index] = { ...newResponses[index], justification }
      setResponses(newResponses)
    }

    const countResponses = (level) => {
      return responses.filter((response) => response.level === level).length
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-sm">
          <thead>
            <tr className="bg-emerald-50">
              <th className="py-2 px-2 md:px-4 border text-left w-full md:w-1/2 text-emerald-700 text-sm md:text-base">
                Required experience and knowledge
              </th>
              <th className="py-2 px-2 md:px-4 border text-center text-emerald-700 text-sm md:text-base" colSpan="3">
                I have performed these tasks.
              </th>
              <th className="py-2 px-2 md:px-4 border text-center w-full md:w-1/4 text-emerald-700 text-sm md:text-base">
                Documents for justification
              </th>
            </tr>
            <tr className="bg-emerald-50/50">
              <th className="py-2 px-2 md:px-4 border"></th>
              <th className="py-2 px-2 md:px-4 border text-center text-sm md:text-base">Never</th>
              <th className="py-2 px-2 md:px-4 border text-center text-sm md:text-base">Sometimes</th>
              <th className="py-2 px-2 md:px-4 border text-center text-sm md:text-base">Regularly</th>
              <th className="py-2 px-2 md:px-4 border"></th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="py-2 px-2 md:px-4 border text-sm md:text-base">{question}</td>
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
                    onChange={(e) => handleJustificationChange(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
            <tr className="bg-emerald-50 font-semibold">
              <td className="py-2 px-2 md:px-4 border text-emerald-700 text-sm md:text-base">TOTALS:</td>
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
    )
  }

  // Progress bar component
  const ProgressBar = () => {
    const progress = (currentStep / (units.length - 1)) * 100

    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    )
  }

  // Introduction step component
  const IntroductionStep = () => (
    <div>
      <h3 className="text-xl font-semibold text-emerald-700 mb-4">Self-Assessment Information</h3>
      <p className="mb-4 text-gray-600">
        By conducting a thorough and honest self-assessment, learners can present a comprehensive case for their
        competence during the RPL process. It helps align their skills and knowledge with the required competency
        standards and provides a foundation for further assessment and validation by qualified assessors.
      </p>

      <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold mb-2 text-emerald-700">Purpose of the document</h4>
        <p className="pl-4">
          This document aims to facilitate effective communication between you and your assessor regarding your
          self-assessment against the unit of competency requirements. It has been designed to be user-friendly and
          supportive, offering a convenient summary of the unit of competency under assessment. While completing this
          document is not obligatory for the commencement of your RPL assessment, it can serve as a valuable resource to
          enhance your understanding of the assessment expectations and provide clarity during the assessment process.
        </p>
      </div>

      <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold mb-2 text-emerald-700">What is self-assessment?</h4>
        <p className="pl-4">
          Self-assessment is the process where learners evaluate and provide evidence of their existing skills and
          knowledge against the competency standards required for a particular qualification or unit of competency.
        </p>
        <p className="pl-4 mt-2">
          Learners often have significant industry experience or prior learning that can be considered for credit
          towards a qualification. Self-assessment allows learners to reflect on their skills and knowledge, gather
          evidence, and make judgments about their competency in relation to the requirements of the qualification.
        </p>
      </div>

      <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold mb-2 text-emerald-700">Why conduct a self-assessment?</h4>
        <p className="pl-4">
          Conducting a self-assessment as part of the Recognition of Prior Learning (RPL) process in the Vocational
          Education and Training (VET) sector serves several purposes. Here are some reasons why self-assessment is
          important in the context of RPL:
        </p>

        <div className="pl-4 mt-4">
          <h5 className="font-semibold text-emerald-700">Self-reflection</h5>
          <p>
            Self-assessment allows learners to reflect on their existing skills, knowledge, and experience in relation
            to the competency requirements of a particular qualification or unit of competency. It encourages learners
            to consider their strengths and areas for improvement, promoting self-awareness and self-directed learning.
          </p>
        </div>

        <div className="pl-4 mt-4">
          <h5 className="font-semibold text-emerald-700">Evidence gathering</h5>
          <p>
            Self-assessment helps learners identify and gather evidence that demonstrates their competency. By
            critically evaluating their skills and knowledge, learners can determine which evidence is most relevant and
            suitable for supporting their claims of competence.
          </p>
        </div>

        <div className="pl-4 mt-4">
          <h5 className="font-semibold text-emerald-700">Empowerment and engagement</h5>
          <p>
            Self-assessment empowers learners to participate in the RPL process actively. It encourages them to
            recognise their capabilities and achievements, fostering a sense of ownership and engagement in their
            learning journey.
          </p>
        </div>

        <div className="pl-4 mt-4">
          <h5 className="font-semibold text-emerald-700">Targeted learning and gap identification</h5>
          <p>
            Through self-assessment, learners can identify gaps or areas where their skills or knowledge may not meet
            the required competency standards. This insight enables them to focus their learning efforts on areas that
            require further development or acquisition of new knowledge.
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-emerald-700 mb-4">Self-Assessment Processes</h3>
      <p className="mb-4 text-gray-600">
        Self-assessment allows you to evaluate your skills and knowledge based on past experiences. Follow the steps
        below:
      </p>
      <p className="mb-4 bg-yellow-50 p-4 border border-yellow-200 rounded-md italic text-gray-700">
        (Note: If you tick "Regularly" for more than half of the questions, it indicates that you frequently perform the
        tasks related to the unit. In such cases, you should consider undertaking the RPL process. If you tick
        "Sometimes" for more than half of the questions, it suggests that you occasionally perform the tasks related to
        the unit. In such cases, it is recommended that you contact the Training Department at the Registered Training
        Organisation (RTO) to discuss your situation further. If you tick "Never" for more than half of the questions,
        it indicates that you have not performed the tasks related to the unit. In such cases, you should consider an
        alternative learning pathway, such as completing the course at the RTO or gap training. You may also contact the
        Student and Welfare Support Coordinator to discuss your options.)
      </p>

      <div className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold mb-2 text-emerald-700">Step 1: Checklist</h4>
        <ul className="list-disc pl-8">
          <li>
            Review the provided checklist, which outlines the skills and competencies required for the specified unit of
            competency.
          </li>
          <li>
            For each item on the checklist, select one of the following options that best reflects your level of
            experience:
            <ul className="list-disc pl-8 mt-2">
              <li>
                <strong>Regularly:</strong> You frequently perform the task or possess the required competency.
              </li>
              <li>
                <strong>Sometimes:</strong> You occasionally perform the task or have some level of competency.
              </li>
              <li>
                <strong>Never:</strong> You do not perform the task or lack the required competency.
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold mb-2 text-emerald-700">Step 2: Evidence Collection</h4>
        <ul className="list-disc pl-8">
          <li>
            Based on your self-assessment, gather evidence that supports your claims of possessing the skills and
            competencies indicated as "Regularly" or "Sometimes" in the checklist.
          </li>
          <li>Add the document name in the table (Self-assessment recording tool) justifying your claim</li>
          <li>
            Examples of evidence may include workplace documents, work samples, qualifications, licenses, testimonials,
            or any other relevant supporting materials.
          </li>
          <li>
            Organise your evidence clearly and logically, labelling each piece to indicate which skill or competency it
            supports.
          </li>
        </ul>
      </div>

      <div className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold mb-2 text-emerald-700">Step 3: Submitting your Response</h4>
        <ul className="list-disc pl-8">
          <li>
            Once you have completed the self-assessment checklist and gathered the corresponding evidence, submit your
            responses and evidence to the assigned assessor.
          </li>
          <li>
            Provide a clear and comprehensive overview of your self-assessment, indicating the skills and competencies
            you believe you possess based on your past experiences.
          </li>
          <li>Ensure your evidence is reliable and linked to the indicated skills and competencies.</li>
        </ul>
      </div>

      <div className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold mb-2 text-emerald-700">Step 4: Assessor Review</h4>
        <ul className="list-disc pl-8">
          <li>The assessor will review your self-assessment responses and examine the evidence you provided.</li>
          <li>
            Based on their evaluation, the assessor will determine whether you are eligible for RPL (Recognition of
            Prior Learning) or if there are gaps in your skills and knowledge that require further training (gap
            training).
          </li>
        </ul>
      </div>

      <p className="mb-4 text-gray-600">
        The assessor will guide you throughout the process, offering support and feedback. It is important to be honest,
        and provide accurate information during the self-assessment. Remember, the quality and relevance of your
        evidence are crucial for a successful RPL assessment.
      </p>
      <p className="mb-4 text-gray-600">
        If you have questions or need clarification, contact your assigned assessor or the RPL coordinator for
        assistance.
      </p>
    </div>
  )

  // Generic competency form component
  const GenericCompetencyForm = ({ unit }) => {
    const questions = unitQuestions[unit.id] || []

    return (
      <div>
        <h3 className="text-xl font-semibold text-emerald-700 mb-4">
          Self-assessment recording tool for CPC31020 - Certificate III in Solid Plastering
        </h3>

        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-4 text-emerald-700">
            Unit of competency: {unit.id} - {unit.title}
          </h4>
          <p className="italic mb-4 text-gray-600">
            The full text of the units can be viewed at{" "}
            <a href="http://www.training.gov.au" className="text-emerald-600 underline">
              www.training.gov.au
            </a>
          </p>

          {questions.length > 0 ? (
            <CompetencyTable unitId={unit.id} questions={questions} />
          ) : (
            <p className="text-center py-4 bg-gray-100 rounded-md">No assessment criteria available for this unit.</p>
          )}
        </div>
      </div>
    )
  }

  // Final assessment page component
  const FinalAssessmentPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = () => {
      setIsSubmitted(true)
    }

    if (isSubmitted) {
      return <FormSubmitted />
    }

    return (
      <div>
        <h3 className="text-xl font-semibold text-emerald-700 mb-4">After Completion of the Self-assessment</h3>
        <p className="mb-4 text-gray-600">
          After completing the self-assessment checklist, you can provide additional evidence to support the claims you
          made during the self-assessment process. This evidence should correspond to the skills and knowledge you
          identified as possessing.
        </p>
        <p className="mb-4 text-gray-600">
          Please gather any relevant evidence you did not provide during the initial form submission, but that aligns
          with the skills and knowledge you claimed in the self-assessment checklist. This evidence may include
          workplace documents, work samples, qualifications, licenses, testimonials, or other supporting materials.
        </p>
        <p className="mb-4 text-gray-600">
          Ensure your evidence is valid, reliable, and directly linked to the skills and knowledge you identified in the
          self-assessment. It should demonstrate your competency in those areas.
        </p>
        <p className="mb-4 text-gray-600">
          Compile your evidence organised, labelling each piece to indicate which skill or competency it supports.
        </p>
        <p className="mb-4 text-gray-600">
          Once you have gathered and organised your evidence, please submit it to the assigned assessor for review. The
          assessor will consider this additional evidence alongside your self-assessment checklist to accurately assess
          your skills and knowledge.
        </p>
        <p className="mb-4 text-gray-600">
          Your evidence will validate your claims and support your case for Recognition of Prior Learning (RPL).
        </p>
        <p className="mb-4 text-gray-600">
          If you have any questions or need guidance on the appropriate evidence types, reach out to your assigned
          assessor or the RPL coordinator for assistance.
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
    )
  }

  return (
    <div className="max-w-6xl my-8 md:my-16 mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl md:text-2xl text-center font-bold text-emerald-700 mb-2 md:mb-4">
        CPC31020 - Certificate III in Solid Plastering
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

      {currentStep === 0 && (
        <div className="bg-white p-4 md:p-6 rounded-lg mb-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-emerald-700 mb-4">Candidate Information</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Candidate's name:</label>
              <input
                type="text"
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Date completed:</label>
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
      )}

      <div className="bg-gray-50 p-4 md:p-6 rounded-lg mb-6 shadow-sm">
        {currentStep === 0 && <IntroductionStep />}
        {currentStep === units.length - 1 && <FinalAssessmentPage />}
        {currentStep > 0 && currentStep < units.length - 1 && <GenericCompetencyForm unit={units[currentStep]} />}
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
  )
}
