"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const RPLSelfAssessmentCPC40920 = () => {
    const [activeSection, setActiveSection] = useState(1)

    // Define all units
    const units = [
        { code: "BSBESB402", title: "Establish Legal and Risk Management Requirements of New Business Ventures" },
        { code: "CPCCBC4012", title: "Read and Interpret Plans and Specifications" },
        { code: "CPCPCM4011", title: "Carry Out Work-Based Risk Control Processes" },
        { code: "CPCPCM4012", title: "Estimate and Cost Work" },
        { code: "CPCPCM4015", title: "Access and Interpret Regulatory Requirements for the Plumbing and Services Industry" },
        { code: "CPCPDR4011", title: "Design and Size Sanitary Drainage Systems" },
        { code: "CPCPDR4012", title: "Design and Size Stormwater Drainage Systems" },
        { code: "CPCPGS4011", title: "Design and Size Consumer Gas Installations" },
        { code: "CPCPSN4011", title: "Design and Size Sanitary Plumbing Systems" },
        { code: "CPCPWT4011", title: "Design and Size Heated and Cold-Water Services and Systems" },
        { code: "CPCPDR4013", title: "Design Pre-Treatment Facilities" },
        { code: "BSBESB401", title: "Research and Develop Business Plans" },
        { code: "CPCPRF4011", title: "Design and Size Roof Drainage Systems" },
        { code: "CPCPMS4011", title: "Design and Install Small-Bore Heating and Cooling Systems" },
        { code: "CPCPCM4013", title: "Produce 2-D Architectural Drawings Using Design Software" },
    ];

    // Calculate total sections: Introduction + Processes + Units + Submission
    const totalSections = 2 + units.length + 1

    const [formData, setFormData] = useState({
        candidateName: "",
        dateCompleted: "",
        venue: "",
        units: {
            BSBESB402: Array(12).fill({ value: "", document: "" }),
            CPCCBC4012: Array(12).fill({ value: "", document: "" }),
            CPCPCM4011: Array(13).fill({ value: "", document: "" }),
            CPCPCM4012: Array(20).fill({ value: "", document: "" }),
            CPCPCM4015: Array(16).fill({ value: "", document: "" }),
            CPCPDR4011: Array(14).fill({ value: "", document: "" }),
            CPCPDR4012: Array(10).fill({ value: "", document: "" }),
            CPCPGS4011: Array(14).fill({ value: "", document: "" }),
            CPCPSN4011: Array(7).fill({ value: "", document: "" }),
            CPCPWT4011: Array(12).fill({ value: "", document: "" }),
            CPCPDR4013: Array(6).fill({ value: "", document: "" }),
            BSBESB401: Array(17).fill({ value: "", document: "" }),
            CPCPRF4011: Array(6).fill({ value: "", document: "" }),
            CPCPMS4011: Array(6).fill({ value: "", document: "" }),
            CPCPCM4013: Array(18).fill({ value: "", document: "" }),
        },
        submission: {
            questions: Array(12).fill(""),
            assessorName: "",
            dateOfInterview: "",
            comments: "",
            additionalNotes: "",
        },
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleResponseChange = (unitCode, index, field, value) => {
        setFormData((prev) => {
            const updatedUnit = [...prev.units[unitCode]]
            updatedUnit[index] = { ...updatedUnit[index], [field]: value }
            return {
                ...prev,
                units: {
                    ...prev.units,
                    [unitCode]: updatedUnit,
                },
            }
        })
    }

    const handleNext = () => {
        setActiveSection((prev) => Math.min(prev + 1, totalSections))
        window.scrollTo(0, 0)
    }

    const handleBack = () => {
        setActiveSection((prev) => Math.max(prev - 1, 1))
        window.scrollTo(0, 0)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Self-Assessment submitted successfully!");
      };
    const handleSubmissionChange = (field, value, index = null) => {
        setFormData((prev) => {
            if (field === "questions") {
                const updatedQuestions = [...prev.submission.questions];
                updatedQuestions[index] = value;
                return {
                    ...prev,
                    submission: { ...prev.submission, questions: updatedQuestions },
                };
            }
            return {
                ...prev,
                submission: { ...prev.submission, [field]: value },
            };
        });
    };
    const progressPercentage = (activeSection / totalSections) * 100

    // Determine which unit to show based on the active section
    const getUnitIndex = () => {
        if (activeSection > 2 && activeSection < totalSections) {
            return activeSection - 3
        }
        return 0
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto pt-10 p-6">
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-medium text-emerald-700">RPL Self-Assessment Information Kit</h1>
                        <h2 className="text-xl font-medium text-emerald-600 mt-2">
                            CPC40920 Certificate IV in Plumbing and Services (Hydraulic Services Design)
                        </h2>
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
                        {/* Section 1: Self-Assessment Information */}
                        {activeSection === 1 && <SelfAssessmentInformation />}

                        {/* Section 2: Self-Assessment Processes */}
                        {activeSection === 2 && <SelfAssessmentProcesses />}

                        {/* Sections 3 to 3+units.length: Unit Assessment */}
                        {activeSection > 2 && activeSection < totalSections && (
                            <UnitAssessment
                                unit={units[getUnitIndex()]}
                                unitIndex={getUnitIndex()}
                                formData={formData}
                                handleInputChange={handleInputChange}
                                handleResponseChange={handleResponseChange}
                            />
                        )}

                        {/* Last Section: Submission */}
                        {activeSection === totalSections && (
                            <SubmissionSection
                                formData={formData.submission}
                                handleSubmissionChange={handleSubmissionChange}
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
                                <ChevronLeft className="mr-2 h-4 w-4" /> Back
                            </button>

                            {activeSection === totalSections ? (
                                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                                    Submit Assessment
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="flex items-center px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                                >
                                    Next <ChevronRight className="ml-2 h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const SelfAssessmentInformation = () => {
    return (
        <div>
            <h3 className="text-xl font-medium text-emerald-700 mb-6">Self-Assessment Information</h3>

            <p className="mb-6">
                By conducting a thorough and honest self-assessment, learners can present a comprehensive case for their
                competence during the RPL process. It helps align their skills and knowledge with the required competency
                standards and provides a foundation for further assessment and validation by qualified assessors.
            </p>

            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                <h4 className="font-medium text-gray-800 mb-2">Purpose of the document</h4>
                <p>
                    This document aims to facilitate effective communication between you and your assessor regarding your
                    self-assessment against the unit of competency requirements. It has been designed to be user-friendly and
                    supportive, offering a convenient summary of the unit of competency under assessment. While completing this
                    document is not obligatory for the commencement of your RPL assessment, it can serve as a valuable resource to
                    enhance your understanding of the assessment expectations and provide clarity during the assessment process.
                </p>
            </div>

            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                <h4 className="font-medium text-gray-800 mb-2">What is self-assessment?</h4>
                <p className="mb-3">
                    Self-assessment is the process where learners evaluate and provide evidence of their existing skills and
                    knowledge against the competency standards required for a particular qualification or unit of competency.
                </p>
                <p>
                    Learners often have significant industry experience or prior learning that can be considered for credit
                    towards a qualification. Self-assessment allows learners to reflect on their skills and knowledge, gather
                    evidence, and make judgments about their competency in relation to the requirements of the qualification.
                </p>
            </div>

            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                <h4 className="font-medium text-gray-800 mb-2">Why conduct a self-assessment?</h4>
                <p className="mb-3">
                    Conducting a self-assessment as part of the Recognition of Prior Learning (RPL) process in the Vocational
                    Education and Training (VET) sector serves several purposes. Here are some reasons why self-assessment is
                    important in the context of RPL:
                </p>

                <div className="mb-3">
                    <h5 className="font-medium text-gray-700">Self-reflection</h5>
                    <p className="pl-4">
                        Self-assessment allows learners to reflect on their existing skills, knowledge, and experience in relation
                        to the competency requirements of a particular qualification or unit of competency. It encourages learners
                        to consider their strengths and areas for improvement, promoting self-awareness and self-directed learning.
                    </p>
                </div>

                <div className="mb-3">
                    <h5 className="font-medium text-gray-700">Evidence gathering</h5>
                    <p className="pl-4">
                        Self-assessment helps learners identify and gather evidence that demonstrates their competency. By
                        critically evaluating their skills and knowledge, learners can determine which evidence is most relevant and
                        suitable for supporting their claims of competence.
                    </p>
                </div>

                <div className="mb-3">
                    <h5 className="font-medium text-gray-700">Empowerment and engagement</h5>
                    <p className="pl-4">
                        Self-assessment empowers learners to participate in the RPL process actively. It encourages them to
                        recognise their capabilities and achievements, fostering a sense of ownership and engagement in their
                        learning journey.
                    </p>
                </div>

                <div>
                    <h5 className="font-medium text-gray-700">Targeted learning and gap identification</h5>
                    <p className="pl-4">
                        Through self-assessment, learners can identify gaps or areas where their skills or knowledge may not meet
                        the required competency standards. This insight enables them to focus their learning efforts on areas that
                        require further development or acquisition of new knowledge.
                    </p>
                </div>
            </div>
        </div>
    )
}

const SelfAssessmentProcesses = () => {
    return (
        <div>
            <h3 className="text-xl font-medium text-emerald-700 mb-6">Self-Assessment Processes</h3>

            <p className="mb-4">
                Self-assessment allows you to evaluate your skills and knowledge based on past experiences. Follow the steps
                below:
            </p>

            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm italic">
                    Note: If you tick "Regularly" for more than half of the questions, it indicates that you frequently perform
                    the tasks related to the unit. In such cases, you should consider undertaking the RPL process.
                </p>
                <p className="text-sm italic mt-2">
                    If you tick "Sometimes" for more than half of the questions, it suggests that you occasionally perform the
                    tasks related to the unit. In such cases, it is recommended that you contact the Training Department at the
                    Registered Training Organisation (RTO) to discuss your situation further.
                </p>
                <p className="text-sm italic mt-2">
                    If you tick "Never" for more than half of the questions, it indicates that you have not performed the tasks
                    related to the unit. In such cases, you should consider an alternative learning pathway, such as completing
                    the course at the RTO or gap training. You may also contact the Student and Welfare Support Coordinator to
                    discuss your options.
                </p>
            </div>

            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                <h4 className="font-medium text-gray-800 mb-2">Step 1: Checklist</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        Review the provided checklist, which outlines the skills and competencies required for the specified unit of
                        competency.
                    </li>
                    <li>
                        For each item on the checklist, select one of the following options that best reflects your level of
                        experience:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>
                                <span className="font-medium">Regularly:</span> You frequently perform the task or possess the required
                                competency.
                            </li>
                            <li>
                                <span className="font-medium">Sometimes:</span> You occasionally perform the task or have some level of
                                competency.
                            </li>
                            <li>
                                <span className="font-medium">Never:</span> You do not perform the task or lack the required competency.
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                <h4 className="font-medium text-gray-800 mb-2">Step 2: Evidence Collection</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        Based on your self-assessment, gather evidence that supports your claims of possessing the skills and
                        competencies indicated as "Regularly" or "Sometimes" in the checklist.
                    </li>
                    <li>Add the document name in the table (Self-assessment recording tool) justifying your claim.</li>
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

            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                <h4 className="font-medium text-gray-800 mb-2">Step 3: Submitting your Response</h4>
                <ul className="list-disc pl-6 space-y-2">
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

            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                <h4 className="font-medium text-gray-800 mb-2">Step 4: Assessor Review</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>The assessor will review your self-assessment responses and examine the evidence you provided.</li>
                    <li>
                        Based on their evaluation, the assessor will determine whether you are eligible for RPL (Recognition of
                        Prior Learning) or if there are gaps in your skills and knowledge that require further training (gap
                        training).
                    </li>
                </ul>
            </div>

            <p className="mb-4">
                The assessor will guide you throughout the process, offering support and feedback. It is important to be honest,
                and provide accurate information during the self-assessment. Remember, the quality and relevance of your
                evidence are crucial for a successful RPL assessment.
            </p>
            <p>
                If you have questions or need clarification, contact your assigned assessor or the RPL coordinator for
                assistance.
            </p>
        </div>
    )
}

const UnitAssessment = ({ unit, unitIndex, formData, handleInputChange, handleResponseChange }) => {
    // Define tasks for each unit
    const unitTasks = {
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
            "Implemented control measures to minimize identified hazards and risks.",
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
        "CPCPDR4011": [
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
            "Properties and characteristics of trade waste applications."
        ],
        "CPCPDR4012": [
            "Consulted relevant documentation or supervisor to understand the nature of the problem with stormwater drainage systems.",
            "Applied WHS/OHS requirements and workplace procedures specific to stormwater drainage system design.",
            "Identified and assessed potential hazards and risks associated with stormwater drainage design work.",
            "Implemented control measures to mitigate identified hazards and risks in stormwater drainage system design.",
            "Understanding the nature of stormwater drainage system problems from documentation or supervisor guidance.",
            "Application of WHS/OHS procedures and workplace protocols related to stormwater drainage design work.",
            "Identification, assessment, and management of hazards and risks pertinent to stormwater drainage system design.",
            "Discussed and understood stormwater drainage system problems from relevant sources.",
            "Adhered to WHS/OHS guidelines and workplace procedures for stormwater drainage design.",
            "Identified and managed potential hazards and risks in stormwater drainage system design work."
        ],
        "CPCPGS4011": [
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
            "Comprehended the properties of gas, gas safety, combustion principles, pressure, and megajoule rates."
        ],
        "CPCPSN4011": [
            "Accessed and interpreted relevant documentation for sanitary system design.",
            "Applied workplace, WHS, and environmental requirements to design practices.",
            "Determined quantity, fixture locations, and legal discharge points as per requirements.",
            "Designed and sized system layout following relevant standards and instructions.",
            "Identified optimal material requirements based on the proposed design.",
            "Produced final layout plans adhering to drawing design standards.",
            "Demonstrated knowledge of relevant regulations, materials, systems, drawing tools, and WHS requirements for designing sanitary plumbing systems."
        ],
        "CPCPWT4011": [
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
            "Applied work health and safety (WHS) requirements relevant to designing and sizing heated and cold-water services."
        ],
        "CPCPDR4013": [
            "Review, and assess design needs based on plans, specifications, pertinent manufacturer's guidelines, Australian Standards, and local regulatory requirements.",
            "Recognize and implement workplace policies, procedures, as well as adhere to work health and safety (WHS) and environmental standards.",
            "Secure and validate details regarding an appropriate site for the land application area, reserve area, and on-site land application of effluent.",
            "Develop and size system layout in accordance with relevant manufacturer's requirements, Australian standards and jurisdictional requirements.",
            "Utilize the suggested design to pinpoint and outline the ideal materials needed.",
            "Produce final system layout plans to relevant drawing design standards."
        ],
        "BSBESB401": [
            "Discussed with relevant stakeholders to obtain information on financial requirements and profit targets for the business venture.",
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
            "Developed strategies to obtain finance as required to ensure the financial viability of the business venture."
        ],
        "CPCPRF4011": [
            "Accessing, reading, and determining the design and size of the roof drainage system based on plans, job specifications, relevant Australian Standards, codes, manufacturers' instructions, and jurisdictional requirements.",
            "Recognizing and implementing workplace, work health and safety (WHS), and environmental standards.",
            "Developing and sizing the system layout according to pertinent manufacturers' guidelines, Australian Standards, and local jurisdiction requirements.",
            "Determine roof catchment areas and design flows from rainfall data and current Australian standards.",
            "Determining the quantity and size of gutters, sumps, rain heads, overflows, and downpipes.",
            "Produce final roof drainage system layout plans according to relevant drawing design standards."
        ],
        "CPCPMS4011": [
            "Accessing, reading, and determining heating and cooling installation requirements based on job specifications, relevant Australian Standards, codes, manufacturer's specifications, and jurisdictional requirements.",
            "Identify and apply workplace policies and procedures, work health and safety (WHS) and environmental requirements.",
            "Determining the quantity, location, fixtures, and legal points of discharge.",
            "Reviewing building drawings, plans, and specifications to ascertain heating and cooling requirements.",
            "Conducting the sizing of an air conditioning or small-bore heating system to meet the necessary heating and cooling load, and to establish the required piping and ducting.",
            "Creating final system layout plans in accordance with job specifications, applicable Australian Standards."
        ],
        "CPCPCM4013": [
            "Verifying and specifying drawing requirements with the appropriate personnel.",
            "Accessing and referring to current building and plumbing standards and regulations.",
            "Set up a basic drawing environment.",
            "Develop a strategy for layering when drawing, viewing, and editing.",
            "Create an architectural library.",
            "Developing appropriate styles for the title block, hatch patterns, dimension lines, line thicknesses, and text.",
            "Creating drawings utilizing the correct layers.",
            "Add relevant notations to the drawing as required.",
            "Add dimensions, using appropriate scales, to the drawing.",
            "Utilize editing commands for altering drawing elements and preexisting text.",
            "Adjusting printing specifications to match the page layout for the drawings.",
            "Set print parameters for printer.",
            "Print drawings on the correct media.",
            "Implement sustainability principles and concepts while preparing for and carrying out work processes.",
            "Setting up appropriate directories for the drawing project.",
            "Saving and backing up drawing files to specific drives or directories.",
            "Insert drawing files into other software applications.",
            "Transferring text files from other software applications into CAD."
        ]

    }

    const tasks = unitTasks[unit.code] || []

    return (
        <div>
            <h3 className="text-xl font-medium text-emerald-700 mb-6">
                Self-assessment recording tool for CPC40920 Certificate IV in Plumbing and Services (Hydraulic Services Design)
            </h3>

            {unitIndex === 0 && (
                <>
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Candidate's name:</label>
                            <input
                                type="text"
                                value={formData.candidateName}
                                onChange={(e) => handleInputChange("candidateName", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Date completed:</label>
                            <input
                                type="date"
                                value={formData.dateCompleted}
                                onChange={(e) => handleInputChange("dateCompleted", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Venue:</label>
                        <input
                            type="text"
                            value={formData.venue}
                            onChange={(e) => handleInputChange("venue", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>
                </>
            )}

            {/* Current Unit Display */}
            <div className="mb-10 border rounded-lg overflow-hidden">
                <div className="bg-emerald-700 text-white p-4">
                    <h4 className="text-lg font-medium">
                        {unitIndex + 1}. Unit of competency: {unit.code} - {unit.title}
                    </h4>
                    <p className="text-sm mt-1 text-emerald-100">
                        The full text of the units can be viewed at www.training.gov.au
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b border-gray-200 w-1/2">
                                    Required experience and knowledge
                                </th>
                                <th
                                    className="py-3 px-4 text-center text-sm font-medium text-gray-700 border-b border-gray-200"
                                    colSpan="3"
                                >
                                    I have performed these tasks.
                                </th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b border-gray-200 w-1/4">
                                    Documents for justification
                                </th>
                            </tr>
                            <tr className="bg-gray-50">
                                <th className="py-2 px-4 border-b border-gray-200"></th>
                                <th className="py-2 px-4 text-center text-sm font-medium text-gray-600 border-b border-gray-200 w-20">
                                    Never
                                </th>
                                <th className="py-2 px-4 text-center text-sm font-medium text-gray-600 border-b border-gray-200 w-20">
                                    Sometimes
                                </th>
                                <th className="py-2 px-4 text-center text-sm font-medium text-gray-600 border-b border-gray-200 w-20">
                                    Regularly
                                </th>
                                <th className="py-2 px-4 border-b border-gray-200"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, taskIndex) => (
                                <tr key={taskIndex} className={taskIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <td className="py-3 px-4 border-b border-gray-200">{task}</td>
                                    <td className="py-3 px-4 text-center border-b border-gray-200">
                                        <input
                                            type="radio"
                                            name={`${unit.code}-${taskIndex}`}
                                            value="Never"
                                            checked={formData.units[unit.code][taskIndex].value === "Never"}
                                            onChange={() => handleResponseChange(unit.code, taskIndex, "value", "Never")}
                                            className="form-radio h-4 w-4 text-emerald-600"
                                        />
                                    </td>
                                    <td className="py-3 px-4 text-center border-b border-gray-200">
                                        <input
                                            type="radio"
                                            name={`${unit.code}-${taskIndex}`}
                                            value="Sometimes"
                                            checked={formData.units[unit.code][taskIndex].value === "Sometimes"}
                                            onChange={() => handleResponseChange(unit.code, taskIndex, "value", "Sometimes")}
                                            className="form-radio h-4 w-4 text-emerald-600"
                                        />
                                    </td>
                                    <td className="py-3 px-4 text-center border-b border-gray-200">
                                        <input
                                            type="radio"
                                            name={`${unit.code}-${taskIndex}`}
                                            value="Regularly"
                                            checked={formData.units[unit.code][taskIndex].value === "Regularly"}
                                            onChange={() => handleResponseChange(unit.code, taskIndex, "value", "Regularly")}
                                            className="form-radio h-4 w-4 text-emerald-600"
                                        />
                                    </td>
                                    <td className="py-3 px-4 border-b border-gray-200">
                                        <input
                                            type="text"
                                            value={formData.units[unit.code][taskIndex].document}
                                            onChange={(e) => handleResponseChange(unit.code, taskIndex, "document", e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                            placeholder="Document name"
                                        />
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-gray-100 font-medium">
                                <td className="py-3 px-4 border-t border-gray-300">TOTALS:</td>
                                <td className="py-3 px-4 text-center border-t border-gray-300">NEVER /{tasks.length}</td>
                                <td className="py-3 px-4 text-center border-t border-gray-300">SOMETIMES /{tasks.length}</td>
                                <td className="py-3 px-4 text-center border-t border-gray-300">REGULARLY /{tasks.length}</td>
                                <td className="py-3 px-4 border-t border-gray-300"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {unitIndex === 0 && (
                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <h4 className="font-medium text-gray-800 mb-2">After Completion of the Self-assessment:</h4>
                    <p className="mb-3">
                        After completing the self-assessment checklist, you can provide additional evidence to support the claims
                        you made during the self-assessment process. This evidence should correspond to the skills and knowledge you
                        identified as possessing.
                    </p>
                    <p className="mb-3">
                        Please gather any relevant evidence you did not provide during the initial form submission, but that aligns
                        with the skills and knowledge you claimed in the self-assessment checklist. This evidence may include
                        workplace documents, work samples, qualifications, licenses, testimonials, or other supporting materials.
                    </p>
                    <p className="mb-3">
                        Ensure your evidence is valid, reliable, and directly linked to the skills and knowledge you identified in
                        the self-assessment. It should demonstrate your competency in those areas.
                    </p>
                </div>
            )}
        </div>
    )
}

const SubmissionSection = ({ formData, handleSubmissionChange }) => {
    return (
        <div>
            <h3 className="text-xl font-medium text-emerald-700 mb-6">Self-assessment Questions</h3>

            <div className="mb-6">
                <p className="mb-4">
                    The following section contains remarks and annotations for conversing with the candidate during the initial
                    interview for their Recognition of Prior Learning (RPL) application.
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <tbody>
                            {formData.questions.map((question, i) => (
                                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <td className="py-3 px-4 border-b border-gray-200 w-16 font-medium">{i + 1}.</td>
                                    <td className="py-3 px-4 border-b border-gray-200">
                                        <input
                                            type="text"
                                            value={question}
                                            onChange={(e) => handleSubmissionChange("questions", e.target.value, i)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                        />
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td className="py-3 px-4 border-b border-gray-200 font-medium">Assessor name:</td>
                                <td className="py-3 px-4 border-b border-gray-200">
                                    <input
                                        type="text"
                                        value={formData.assessorName}
                                        onChange={(e) => handleSubmissionChange("assessorName", e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    />
                                </td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="py-3 px-4 border-b border-gray-200 font-medium">Date of interview:</td>
                                <td className="py-3 px-4 border-b border-gray-200">
                                    <input
                                        type="date"
                                        value={formData.dateOfInterview}
                                        onChange={(e) => handleSubmissionChange("dateOfInterview", e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 border-b border-gray-200 font-medium align-top">
                                    Additional comments and recommendations for the applicant:
                                </td>
                                <td className="py-3 px-4 border-b border-gray-200">
                                    <textarea
                                        value={formData.comments}
                                        onChange={(e) => handleSubmissionChange("comments", e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                        rows="4"
                                    ></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded-md">
                <h4 className="font-medium text-gray-800 mb-2 uppercase">Office Use Only</h4>
                <p className="font-medium mb-2">Additional notes to be completed by RPL Assessor:</p>
                <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => handleSubmissionChange("additionalNotes", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    rows="6"
                ></textarea>
            </div>
        </div>
    );
};
export default RPLSelfAssessmentCPC40920
