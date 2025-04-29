// import React, { useState } from "react";
// import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

// const units = [
//   {
//     code: "CPCCCM2012",
//     title: "Work safely at heights",
//     tasks: [
//       "Demonstrated the ability to interpret job requirements and planning from documentation.",
//       "Contributed effectively to safety planning and documentation.",
//       "Demonstrated knowledge of various fall protection systems suitable for specific tasks.",
//       "Showed proficiency in identifying secure anchor points for safe work execution.",
//       "Engaged in active discussions to ensure comprehensive understanding of the SWMS.",
//       "Exhibited responsibility in ensuring personal safety through proper PPE use.",
//       "Demonstrated awareness of potential hazards and took proactive steps to mitigate risks.",
//       "Maintained diligence in ensuring the reliability of safety equipment.",
//       "Displayed understanding of the importance of signaling and barrier systems in work area safety.",
//       "Demonstrated competency in setting up fall protection systems as per guidelines.",
//       "Verified the installation and certification of safety equipment and structures.",
//       "Exhibited careful and safe practices while utilizing fall protection gear.",
//       "Ensured communication and confirmation regarding safety equipment setup.",
//       "Practiced safe methods in handling and positioning materials at heights.",
//       "Followed all safety procedures and guidelines while performing tasks at heights.",
//     ],
//   },
//   {
//     code: "CPCPCM2039",
//     title: "Carry out interactive workplace communication",
//     tasks: [
//       "Demonstrated ability to discern key information for effective communication.",
//       "Showed understanding of the workplace environment and relevant communication channels.",
//       "Demonstrated adaptability in choosing communication methods based on the situation.",
//       "Exhibited ability to convey messages effectively in a workplace setting.",
//       "Showed flexibility and responsiveness in communication strategies.",
//       "Practiced active listening and confirmation techniques.",
//       "Demonstrated awareness and proper use of non-verbal cues in communication.",
//       "Displayed sensitivity to others' interpretations and adjusted accordingly.",
//       "Applied visual aids and signaling techniques effectively.",
//       "Checked for understanding and clarity in non-verbal exchanges.",
//       "Demonstrated competency in drafting and understanding written materials.",
//       "Showed proficiency in understanding and applying written workplace information.",
//       "Demonstrated knowledge and correct use of workplace signage.",
//       "Showed ability to handle workplace paperwork and records efficiently.",
//       "Maintained thorough records and reports as required in the workplace.",
//     ],
//   },
//   // Add all remaining units from the PDF following the same structure
//   // Example of another unit:
//   {
//     code: "CPCPCM2040",
//     title: "Read plans, calculate quantities and mark out materials",
//     tasks: [
//       "Reviewed plumbing plans, specifications, and related Australian Standards.",
//       "Identified and understood manufacturer’s specifications and jurisdictional requirements.",
//       "Applied work health and safety (WHS) and environmental requirements relevant to the job.",
//       // ... continue with all tasks for this unit
//     ],
//   },
//   // Continue adding all 55 units from the PDF
// ];

// const RPLSelfAssessmentCPC32420 = () => {
//   const [activeSection, setActiveSection] = useState(1);
//   const totalSections = 3;

//   const initialRecording = units.reduce((acc, unit) => {
//     acc[unit.code] = unit.tasks.map(() => ({ value: "", document: "" }));
//     return acc;
//   }, {});

//   const [formData, setFormData] = useState({
//     candidateName: "",
//     dateCompleted: "",
//     venue: "",
//     recording: initialRecording,
//   });

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleResponseChange = (unitCode, index, field, value) => {
//     setFormData((prev) => {
//       const updatedUnit = [...prev.recording[unitCode]];
//       updatedUnit[index] = { ...updatedUnit[index], [field]: value };
//       return {
//         ...prev,
//         recording: { ...prev.recording, [unitCode]: updatedUnit },
//       };
//     });
//   };

//   const handleNext = () =>
//     setActiveSection((s) => Math.min(s + 1, totalSections));
//   const handleBack = () => setActiveSection((s) => Math.max(s - 1, 1));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     alert("Self-Assessment submitted successfully!");
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto pt-10 p-6">
//         <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
//           <h1 className="text-3xl font-medium text-emerald-800 mb-4">
//             CPC32420 Certificate III in Plumbing
//           </h1>

//           {/* Progress Bar */}
//           <div className="mb-6">
//             <div className="h-2 bg-gray-200 rounded-full">
//               <div
//                 className="h-2 bg-green-600 rounded-full transition-all duration-300"
//                 style={{ width: `${(activeSection / totalSections) * 100}%` }}
//               />
//             </div>
//             <div className="mt-2 text-sm text-gray-600">
//               Step {activeSection} of {totalSections}
//             </div>
//           </div>

//           <form onSubmit={handleSubmit}>
//             {/* Section 1: Candidate Information */}
//             {activeSection === 1 && (
//               <div>
//                 <h2 className="text-2xl font-medium text-emerald-700 mb-4">
//                   Candidate Information
//                 </h2>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-gray-700 mb-2">
//                       Candidate's Name:
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.candidateName}
//                       onChange={(e) =>
//                         handleInputChange("candidateName", e.target.value)
//                       }
//                       className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 mb-2">
//                       Date Completed:
//                     </label>
//                     <input
//                       type="date"
//                       value={formData.dateCompleted}
//                       onChange={(e) =>
//                         handleInputChange("dateCompleted", e.target.value)
//                       }
//                       className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 mb-2">Venue:</label>
//                     <input
//                       type="text"
//                       value={formData.venue}
//                       onChange={(e) =>
//                         handleInputChange("venue", e.target.value)
//                       }
//                       className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Section 2: Assessment Process */}
//             {activeSection === 2 && (
//               <div>
//                 <h2 className="text-2xl font-medium text-emerald-700 mb-4">
//                   Assessment Process
//                 </h2>
//                 <div className="prose max-w-none">
//                   <h3 className="text-lg font-semibold mb-2">Key Steps:</h3>
//                   <ol className="list-decimal pl-6 space-y-3">
//                     <li>
//                       Review checklist and select experience level for each task
//                     </li>
//                     <li>Collect supporting evidence for selected items</li>
//                     <li>Submit completed assessment with documentation</li>
//                     <li>Assessor review and competency determination</li>
//                   </ol>

//                   <h3 className="text-lg font-semibold mt-6 mb-2">
//                     Guidelines:
//                   </h3>
//                   <ul className="list-disc pl-6 space-y-2">
//                     <li>
//                       Select 'Regularly' if performed frequently in past work
//                     </li>
//                     <li>Select 'Sometimes' if performed occasionally</li>
//                     <li>Select 'Never' if no experience with the task</li>
//                     <li>
//                       Provide documentation for all 'Regularly'/'Sometimes'
//                       responses
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             )}

//             {/* Section 3: Competency Recording Tool */}
//             {activeSection === 3 && (
//               <div>
//                 <h2 className="text-2xl font-medium text-emerald-700 mb-6">
//                   Competency Self-Assessment
//                 </h2>
//                 {units.map((unit) => (
//                   <div
//                     key={unit.code}
//                     className="mb-8 border rounded-lg p-4 bg-gray-50"
//                   >
//                     <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                       {unit.code} - {unit.title}
//                     </h3>
//                     <div className="space-y-4">
//                       {unit.tasks.map((task, idx) => (
//                         <div
//                           key={idx}
//                           className="border-b border-gray-200 py-3"
//                         >
//                           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                             <p className="flex-1 text-gray-700">{task}</p>
//                             <div className="flex items-center gap-4">
//                               <div className="flex items-center gap-2">
//                                 {["Never", "Sometimes", "Regularly"].map(
//                                   (opt) => (
//                                     <label
//                                       key={opt}
//                                       className="flex items-center gap-1"
//                                     >
//                                       <input
//                                         type="radio"
//                                         name={`${unit.code}-${idx}`}
//                                         value={opt}
//                                         checked={
//                                           formData.recording[unit.code][idx]
//                                             .value === opt
//                                         }
//                                         onChange={() =>
//                                           handleResponseChange(
//                                             unit.code,
//                                             idx,
//                                             "value",
//                                             opt
//                                           )
//                                         }
//                                         className="form-radio h-4 w-4 text-emerald-600"
//                                       />
//                                       <span className="text-sm">{opt}</span>
//                                     </label>
//                                   )
//                                 )}
//                               </div>
//                               <input
//                                 type="text"
//                                 placeholder="Document name"
//                                 value={
//                                   formData.recording[unit.code][idx].document
//                                 }
//                                 onChange={(e) =>
//                                   handleResponseChange(
//                                     unit.code,
//                                     idx,
//                                     "document",
//                                     e.target.value
//                                   )
//                                 }
//                                 className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48 text-sm"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Navigation Controls */}
//             <div className="mt-8 flex justify-between">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 disabled={activeSection === 1}
//                 className="flex items-center px-6 py-2 bg-emerald-600 text-white rounded-md disabled:opacity-50 hover:bg-emerald-700 transition-colors"
//               >
//                 <BsChevronLeft className="mr-2" /> Back
//               </button>

//               {activeSection === totalSections ? (
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//                 >
//                   Submit Assessment
//                 </button>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={handleNext}
//                   className="flex items-center px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
//                 >
//                   Next <BsChevronRight className="ml-2" />
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RPLSelfAssessmentCPC32420;
import { useState } from "react";

export default function RPLSelfAssessmentApp() {
  const [currentStep, setCurrentStep] = useState(0);
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
  ];

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

  return (
    <div className="max-w-6xl my-16 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        CPC32420 - Certificate III in Plumbing
      </h1>
      <h2 className="text-xl font-semibold mb-4">
        Step 2: RPL Self-Assessment Information Kit
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
        {currentStep === 1 && <WorkSafelyAtHeights />}
        {currentStep === 2 && <CarryOutInteractiveWorkplaceCommunication />}
        {currentStep === 3 && <ReadPlansCalculate />}
        {currentStep === 4 && <WorkEffectively />}
        {currentStep === 5 && <CarryOutWHS />}
        {currentStep === 6 && <HandleAndStore />}
        {currentStep === 7 && <UsePlumbingTools />}
        {currentStep === 8 && <CarryOutLevelling />}
        {currentStep === 9 && <CutAndJoinSheetMetal />}
        {currentStep === 10 && <CarryOutConcreting />}
        {currentStep === 11 && <WorkSafelyOnRoofs />}
        {currentStep === 12 && <FlashPenetrations />}
        {currentStep === 13 && <WeldPolymerPipes />}
        {currentStep === 14 && <FabricateAndInstallPiping />}
        {currentStep === 15 && <PrepareSimpleDrawings />}
        {currentStep === 16 && <InstallTrenchSupport />}
        {currentStep === 17 && <LocateAndClearBlockages />}
        {currentStep === 18 && <InstallStormwater />}
        {currentStep === 19 && <InstallPrefabricated />}
        {currentStep === 20 && <PlanLayoutAndInstall />}
        {currentStep === 21 && <InstallOnSiteDomestic />}
        {currentStep === 22 && <FabricateAndInstallFireHydrant />}
        {currentStep === 23 && <InstallGasPressureControl />}
        {currentStep === 24 && <InstallGasApplianceFlues />}
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

function IntroductionStep() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        Self-Assessment Information
      </h3>
      <p className="mb-4">
        By conducting a thorough and honest self-assessment, learners can
        present a comprehensive case for their competence during the RPL
        process. It helps align their skills and knowledge with the required
        competency standards and provides a foundation for further assessment
        and validation by qualified assessors.
      </p>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">Purpose of the document</h4>
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

      <div className="mb-6">
        <h4 className="font-semibold mb-2">What is self-assessment?</h4>
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

      <div className="mb-6">
        <h4 className="font-semibold mb-2">Why conduct a self-assessment?</h4>
        <p className="pl-4">
          Conducting a self-assessment as part of the Recognition of Prior
          Learning (RPL) process in the Vocational Education and Training (VET)
          sector serves several purposes. Here are some reasons why
          self-assessment is important in the context of RPL:
        </p>

        <div className="pl-4 mt-4">
          <h5 className="font-semibold">Self-reflection</h5>
          <p>
            Self-assessment allows learners to reflect on their existing skills,
            knowledge, and experience in relation to the competency requirements
            of a particular qualification or unit of competency. It encourages
            learners to consider their strengths and areas for improvement,
            promoting self-awareness and self-directed learning.
          </p>
        </div>

        <div className="pl-4 mt-4">
          <h5 className="font-semibold">Evidence gathering</h5>
          <p>
            Self-assessment helps learners identify and gather evidence that
            demonstrates their competency. By critically evaluating their skills
            and knowledge, learners can determine which evidence is most
            relevant and suitable for supporting their claims of competence.
          </p>
        </div>

        <div className="pl-4 mt-4">
          <h5 className="font-semibold">Empowerment and engagement</h5>
          <p>
            Self-assessment empowers learners to participate in the RPL process
            actively. It encourages them to recognise their capabilities and
            achievements, fostering a sense of ownership and engagement in their
            learning journey.
          </p>
        </div>

        <div className="pl-4 mt-4">
          <h5 className="font-semibold">
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

      <h3 className="text-xl font-semibold mb-4">Self-Assessment Processes</h3>
      <p className="mb-4">
        Self-assessment allows you to evaluate your skills and knowledge based
        on past experiences. Follow the steps below:
      </p>
      <p className="mb-4">
        <em>
          (Note: If you tick "Regularly" for more than half of the questions, it
          indicates that you frequently perform the tasks related to the unit.
          In such cases, you should consider undertaking the RPL process. If you
          tick "Sometimes" for more than half of the questions, it suggests that
          you occasionally perform the tasks related to the unit. In such cases,
          it is recommended that you contact the Training Department at the
          Registered Training Organisation (RTO) to discuss your situation
          further. If you tick "Never" for more than half of the questions, it
          indicates that you have not performed the tasks related to the unit.
          In such cases, you should consider an alternative learning pathway,
          such as completing the course at the RTO or gap training. You may also
          contact the Student and Welfare Support Coordinator to discuss your
          options.)
        </em>
      </p>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Step 1: Checklist</h4>
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

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Step 2: Evidence Collection</h4>
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

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Step 3: Submitting your Response</h4>
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

      <p className="mb-4">
        The assessor will guide you throughout the process, offering support and
        feedback. It is important to be honest, and provide accurate information
        during the self-assessment. Remember, the quality and relevance of your
        evidence are crucial for a successful RPL assessment.
      </p>
      <p className="mb-4">
        If you have questions or need clarification, contact your assigned
        assessor or the RPL coordinator for assistance.
      </p>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Step 4: Assessor Review</h4>
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
    </div>
  );
}

function WorkSafelyAtHeights() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        Self-assessment recording tool for CPC32420 - Certificate III in
        Plumbing
      </h3>

      <div className="mb-6">
        <h4 className="font-semibold text-lg mb-4">
          Unit of competency: CPCCCM2012 - Work safely at heights
        </h4>
        <p className="italic mb-4">
          The full text of the units can be viewed at www.training.gov.au
        </p>

        <div className="mb-4">
          <div className="flex flex-col">
            <div className="w-full">
              <div className="border-b py-2 mb-4">
                <div className="flex justify-between">
                  <div className="w-2/3 font-semibold">Candidate's name:</div>
                  <div className="w-1/3">
                    <input type="text" className="w-full border p-1" />
                  </div>
                </div>
              </div>
              <div className="border-b py-2 mb-4">
                <div className="flex justify-between">
                  <div className="w-2/3 font-semibold">Date completed:</div>
                  <div className="w-1/3">
                    <input type="date" className="w-full border p-1" />
                  </div>
                </div>
              </div>
              <div className="border-b py-2 mb-4">
                <div className="flex justify-between">
                  <div className="w-2/3 font-semibold">Venue:</div>
                  <div className="w-1/3">
                    <input type="text" className="w-full border p-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border text-left w-1/2">
                  Required experience and knowledge
                </th>
                <th className="py-2 px-4 border text-center" colSpan="3">
                  I have performed these tasks.
                </th>
                <th className="py-2 px-4 border text-center w-1/4">
                  Documents for justification
                </th>
              </tr>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 border"></th>
                <th className="py-2 px-4 border text-center">Never</th>
                <th className="py-2 px-4 border text-center">Sometimes</th>
                <th className="py-2 px-4 border text-center">Regularly</th>
                <th className="py-2 px-4 border"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border">
                  Demonstrated the ability to interpret job requirements and
                  planning from documentation.
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q1" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q1" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q1" />
                </td>
                <td className="py-2 px-4 border">
                  <input type="text" className="w-full border p-1" />
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-2 px-4 border">
                  Contributed effectively to safety planning and documentation.
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q2" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q2" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q2" />
                </td>
                <td className="py-2 px-4 border">
                  <input type="text" className="w-full border p-1" />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">
                  Demonstrated knowledge of various fall protection systems
                  suitable for specific tasks.
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q3" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q3" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q3" />
                </td>
                <td className="py-2 px-4 border">
                  <input type="text" className="w-full border p-1" />
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-2 px-4 border">
                  Showed proficiency in identifying secure anchor points for
                  safe work execution.
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q4" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q4" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q4" />
                </td>
                <td className="py-2 px-4 border">
                  <input type="text" className="w-full border p-1" />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">
                  Engaged in active discussions to ensure comprehensive
                  understanding of the SWMS.
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q5" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q5" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q5" />
                </td>
                <td className="py-2 px-4 border">
                  <input type="text" className="w-full border p-1" />
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-2 px-4 border">
                  Exhibited responsibility in ensuring personal safety through
                  proper PPE use.
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q6" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q6" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q6" />
                </td>
                <td className="py-2 px-4 border">
                  <input type="text" className="w-full border p-1" />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">
                  Demonstrated awareness of potential hazards and took proactive
                  steps to mitigate risks.
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q7" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q7" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q7" />
                </td>
                <td className="py-2 px-4 border">
                  <input type="text" className="w-full border p-1" />
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-2 px-4 border">
                  Maintained diligence in ensuring the reliability of safety
                  equipment.
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q8" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q8" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q8" />
                </td>
                <td className="py-2 px-4 border">
                  <input type="text" className="w-full border p-1" />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">
                  Displayed understanding of the importance of signaling and
                  barrier systems in work area safety.
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q9" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q9" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q9" />
                </td>
                <td className="py-2 px-4 border">
                  <input type="text" className="w-full border p-1" />
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-2 px-4 border">
                  Demonstrated competency in setting up fall protection systems
                  as per guidelines.
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q10" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q10" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q10" />
                </td>
                <td className="py-2 px-4 border">
                  <input type="text" className="w-full border p-1" />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">
                  Verified the installation and certification of safety
                  equipment and structures.
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q11" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q11" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q11" />
                </td>
                <td className="py-2 px-4 border">
                  <input type="text" className="w-full border p-1" />
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-2 px-4 border">
                  Exhibited careful and safe practices while utilizing fall
                  protection gear.
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q12" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q12" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q12" />
                </td>
                <td className="py-2 px-4 border">
                  <input type="text" className="w-full border p-1" />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">
                  Ensured communication and confirmation regarding safety
                  equipment setup.
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q13" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q13" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q13" />
                </td>
                <td className="py-2 px-4 border">
                  <input type="text" className="w-full border p-1" />
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-2 px-4 border">
                  Practiced safe methods in handling and positioning materials
                  at heights.
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q14" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q14" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q14" />
                </td>
                <td className="py-2 px-4 border">
                  <input type="text" className="w-full border p-1" />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">
                  Followed all safety procedures and guidelines while performing
                  tasks at heights.
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q15" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q15" />
                </td>
                <td className="py-2 px-4 border text-center">
                  <input type="radio" name="q15" />
                </td>
                <td className="py-2 px-4 border">
                  <input type="text" className="w-full border p-1" />
                </td>
              </tr>
              <tr className="bg-gray-100 font-semibold">
                <td className="py-2 px-4 border">TOTALS:</td>
                <td className="py-2 px-4 border text-center">NEVER /15</td>
                <td className="py-2 px-4 border text-center">SOMETIMES /15</td>
                <td className="py-2 px-4 border text-center">REGULARLY /15</td>
                <td className="py-2 px-4 border"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
