// import React, { useState } from "react";
// import {
//   FaUser,
//   FaBuilding,
//   FaCalendarAlt,
//   FaBriefcase,
//   FaUserTie,
//   FaEnvelope,
//   FaPhone,
//   FaIdCard,
//   FaGraduationCap,
//   FaBook,
//   FaAddressCard,
//   FaCheck,
//   FaLanguage,
//   FaPassport,
//   FaFileAlt,
//   FaMapMarkerAlt,
//   FaGlobe,
//   FaUsers,
//   FaFileContract,
//   FaCheckCircle,
// } from "react-icons/fa";
// import {
//   MdSchool,
//   MdDescription,
//   MdWork,
//   MdHealthAndSafety,
// } from "react-icons/md";

// // Dummy data array for RPL Application Form
// const dummyApplicationData = {
//   // Recognition Area
//   recognitionArea: {
//     courseApplying: "CPC30220 Certificate III in Carpentry",
//   },

//   // Professional Referees
//   professionalReferees: [
//     {
//       name: "Test",
//       position: "Test",
//       organisation: "Test",
//       phoneNumber: "1111111111111111",
//       mobileNumber: "1111111111111111",
//       emailAddress: "asadawan16900@gmail.com",
//     },
//     {
//       name: "Test",
//       position: "Test",
//       organisation: "Test",
//       phoneNumber: "1111111111111111",
//       mobileNumber: "1111111111111111",
//       emailAddress: "asadawan16900@gmail.com",
//     },
//   ],

//   // Employment History
//   employmentHistory: [
//     {
//       employer: "test",
//       address: "test",
//       phoneNumber: "1111111111111111",
//       startDate: "2025-05-09",
//       endDate: "2025-05-09",
//       position: "test",
//       employmentType: "Full Time",
//       duties: "test",
//     },
//     {
//       employer: "test",
//       address: "test",
//       phoneNumber: "11111111111",
//       startDate: "2025-05-09",
//       endDate: "2025-05-09",
//       position: "test",
//       employmentType: "Full Time",
//       duties: "test",
//     },
//   ],

//   // Documents
//   documentedEvidence: [
//     {
//       documentType: "test",
//       description: "White Card (Construction Induction Card)",
//       issueDate: "2016-12-05",
//     },
//     {
//       documentType: "test",
//       description: "CPCCCA2002 - Use carpentry tools and equipment",
//       issueDate: "2017-03-22",
//     },
//     {
//       documentType: "test",
//       description: "Working at Heights",
//       issueDate: "2019-05-14",
//     },
//     {
//       documentType: "test",
//       description: "Professional reference from BuildWell Construction",
//       issueDate: "2023-05-10",
//     },
//   ],

//   // Personal Details
//   personalDetails: {
//     title: "Mr",
//     gender: "Male",
//     surname: "test",
//     firstName: "test",
//     middleNames: "test",
//     preferredName: "test",
//     dateOfBirth: "2002-06-20",
//   },

//   // Contact Details
//   contactDetails: {
//     homePhone: "111111111111",
//     mobilePhone: "111111111111",
//     emailAddress: "asadawan16900@gmail.com",
//     workPhone: "111111111111",
//     preferredContactMethod: "Mobile Phone",
//   },

//   // Emergency Contact
//   emergencyContact: {
//     name: "test",
//     relationship: "test",
//     homePhone: "111111111111",
//     mobilePhone: "11111111111",
//     workPhone: "1111111111111",
//   },

//   // Address Details
//   addressDetails: {
//     residential: {
//       buildingName: "test",
//       unitNumber: "1",
//       streetNumber: "11",
//       streetName: "test",
//       cityTown: "test",
//       state: "NSW",
//       postcode: "11111",
//     },
//     postal: {
//       sameAsResidential: true,
//       buildingName: "test",
//       unitNumber: "1",
//       streetNumber: "11",
//       streetName: "test",
//       cityTown: "test",
//       state: "NSW",
//       postcode: "11111",
//       poBox: "",
//     },
//     studyAddress: {
//       buildingName: "test",
//       unitNumber: "1",
//       streetNumber: "111",
//       streetName: "test",
//       cityTown: "test",
//       state: "NSW",
//       postcode: "111111",
//     },
//   },

//   // Workplace Employer Details
//   workplaceEmployerDetails: {
//     tradingName: "test",
//     contactName: "test",
//     supervisorName: "test",
//     tradingAddress: "test",
//     phone: "11111111111",
//     employerEmail: "asadawan16900@gmail.com",
//   },

//   // Language and Cultural Diversity
//   languageCulturalDiversity: {
//     aboriginalTorresStraitIslander: "No",
//     countryOfBirth: "Australia",
//     languageOtherThanEnglish: "yes",
//     otherLanguage: "urdu",
//     englishProficiency: "Very Well",
//   },

//   // USI
//   usi: {
//     hasUSI: true,
//     usiNumber: "111111111",
//   },

//   // Education Details
//   educationDetails: {
//     stillAtSchool: false,
//     highestSchoolLevel: "Completed Year 12",
//     yearCompleted: "1111",
//     currentSchool: "",
//     previousSchool: "test",
//   },

//   // Employment Status
//   employmentStatus: {
//     status: "Full time employee",
//     workplace: "test",
//     employeeCount: "Over 20",
//   },

//   // Occupation
//   occupation: {
//     classification: "3 – Technicians & Trade Workers",
//   },

//   // Industry of Employment
//   industryOfEmployment: {
//     classification: "E – Construction",
//   },

//   // Disability
//   disability: {
//     hasDisability: false,
//     disabilityTypes: [],
//   },

//   // Previous Qualifications
//   previousQualifications: {
//     hasQualifications: true,
//     qualifications: [
//       {
//         type: "Certificate II",
//         qualification: "Certificate II in Construction",
//         origin: "A", // A = Australian
//       },
//     ],
//   },

//   // Study Reason
//   studyReason: {
//     reason: "To get a better job or promotion",
//   },

//   // How they found out about the course
//   contactSource: {
//     source: "Workplace",
//   },

//   // Australian Citizenship Status
//   citizenshipStatus: {
//     status: "Australian Citizen",
//   },

//   // Program/Qualification
//   programQualification: {
//     course: "CPC30220 Certificate III in Carpentry",
//   },

//   // Pre Training Checklist
//   preTrainingChecklist: {
//     preTrainingFormCompleted: true,
//     lllAssessmentCompleted: true,
//     deliveryModeDiscussed: true,
//     rplDiscussed: true,
//     refundPolicyDiscussed: true,
//     studentHandbookRead: true,
//     entryRequirementsDiscussed: true,
//     creditTransferDiscussed: true,
//     locationDiscussed: true,
//     tuitionFeesDiscussed: true,
//     studentQuestionsAnswered: true,
//     specialNeeds: "None",
//   },

//   // Consent for Photos
//   consentForPhotos: true,

//   // Form Submission Details
//   formSubmission: {
//     signedDate: "2025-05-09",
//   },
// };

// const RPLApplicationFormViewer = ({
//   applicationData = dummyApplicationData,
//   rplApplicationFormData,
// }) => {
//   const [activeTab, setActiveTab] = useState("personalDetails");

//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden">
//       {/* RPL Application Form Tabs */}
//       <div className="border-b border-gray-200">
//         <div className="flex overflow-x-auto">
//           <button
//             onClick={() => setActiveTab("personalDetails")}
//             className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
//               activeTab === "personalDetails"
//                 ? "border-b-2 border-emerald-600 text-emerald-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             Personal Details
//           </button>
//           <button
//             onClick={() => setActiveTab("contactAndAddress")}
//             className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
//               activeTab === "contactAndAddress"
//                 ? "border-b-2 border-emerald-600 text-emerald-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             Contact & Address
//           </button>
//           <button
//             onClick={() => setActiveTab("employmentHistory")}
//             className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
//               activeTab === "employmentHistory"
//                 ? "border-b-2 border-emerald-600 text-emerald-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             Employment History
//           </button>
//           <button
//             onClick={() => setActiveTab("education")}
//             className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
//               activeTab === "education"
//                 ? "border-b-2 border-emerald-600 text-emerald-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             Education & Qualifications
//           </button>
//           <button
//             onClick={() => setActiveTab("referees")}
//             className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
//               activeTab === "referees"
//                 ? "border-b-2 border-emerald-600 text-emerald-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             Referees & Documents
//           </button>
//           <button
//             onClick={() => setActiveTab("courseDetails")}
//             className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
//               activeTab === "courseDetails"
//                 ? "border-b-2 border-emerald-600 text-emerald-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             Course Details
//           </button>
//         </div>
//       </div>

//       {/* Tab Content */}
//       <div className="p-6">
//         {/* Personal Details Tab */}
//         {activeTab === "personalDetails" && (
//           <div>
//             <div className="flex items-center mb-6">
//               <FaUser className="text-emerald-600 text-2xl mr-4" />
//               <h3 className="text-lg font-medium text-gray-900">
//                 Personal Details
//               </h3>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500 mb-1">Title</p>
//                 <p className="font-medium">
//                   {applicationData.personalDetails.title}
//                 </p>
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500 mb-1">Gender</p>
//                 <p className="font-medium">
//                   {applicationData.personalDetails.gender}
//                 </p>
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500 mb-1">Surname</p>
//                 <p className="font-medium">
//                   {applicationData.personalDetails.surname}
//                 </p>
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500 mb-1">First Name</p>
//                 <p className="font-medium">
//                   {applicationData.personalDetails.firstName}
//                 </p>
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500 mb-1">Middle Name(s)</p>
//                 <p className="font-medium">
//                   {applicationData.personalDetails.middleNames}
//                 </p>
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500 mb-1">Preferred Name</p>
//                 <p className="font-medium">
//                   {applicationData.personalDetails.preferredName}
//                 </p>
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
//                 <p className="font-medium">
//                   {new Date(
//                     applicationData.personalDetails.dateOfBirth
//                   ).toLocaleDateString()}
//                 </p>
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500 mb-1">Citizenship Status</p>
//                 <p className="font-medium">
//                   {applicationData.citizenshipStatus.status}
//                 </p>
//               </div>
//             </div>

//             <div className="mt-6">
//               <div className="flex items-center mb-2">
//                 <FaLanguage className="text-emerald-600 text-lg mr-2" />
//                 <h4 className="text-md font-medium text-gray-800">
//                   Language and Cultural Diversity
//                 </h4>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">
//                     Aboriginal/Torres Strait Islander Origin
//                   </p>
//                   <p className="font-medium">
//                     {
//                       applicationData.languageCulturalDiversity
//                         .aboriginalTorresStraitIslander
//                     }
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Country of Birth</p>
//                   <p className="font-medium">
//                     {applicationData.languageCulturalDiversity.countryOfBirth}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">
//                     Speak Language Other Than English
//                   </p>
//                   <p className="font-medium">
//                     {
//                       applicationData.languageCulturalDiversity
//                         .languageOtherThanEnglish
//                     }
//                   </p>
//                 </div>

//                 {applicationData.languageCulturalDiversity.otherLanguage && (
//                   <div className="rounded-lg bg-gray-50 p-4">
//                     <p className="text-sm text-gray-500 mb-1">Other Language</p>
//                     <p className="font-medium">
//                       {applicationData.languageCulturalDiversity.otherLanguage}
//                     </p>
//                   </div>
//                 )}

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">
//                     English Proficiency
//                   </p>
//                   <p className="font-medium">
//                     {
//                       applicationData.languageCulturalDiversity
//                         .englishProficiency
//                     }
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6">
//               <div className="flex items-center mb-2">
//                 <MdHealthAndSafety className="text-emerald-600 text-lg mr-2" />
//                 <h4 className="text-md font-medium text-gray-800">
//                   Disability Status
//                 </h4>
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500 mb-1">
//                   Do you consider yourself to have a disability, impairment or
//                   long-term condition?
//                 </p>
//                 <p className="font-medium">
//                   {applicationData.disability.hasDisability ? "Yes" : "No"}
//                 </p>

//                 {applicationData.disability.hasDisability &&
//                   applicationData.disability.disabilityTypes.length > 0 && (
//                     <div className="mt-2">
//                       <p className="text-sm text-gray-500 mb-1">
//                         Type(s) of disability:
//                       </p>
//                       <ul className="list-disc pl-5">
//                         {applicationData.disability.disabilityTypes.map(
//                           (type, index) => (
//                             <li key={index} className="text-sm">
//                               {type}
//                             </li>
//                           )
//                         )}
//                       </ul>
//                     </div>
//                   )}
//               </div>
//             </div>

//             <div className="mt-6">
//               <div className="flex items-center mb-2">
//                 <FaPassport className="text-emerald-600 text-lg mr-2" />
//                 <h4 className="text-md font-medium text-gray-800">
//                   Unique Student Identifier (USI)
//                 </h4>
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500 mb-1">USI Number</p>
//                 <p className="font-medium">
//                   {applicationData.usi.hasUSI
//                     ? applicationData.usi.usiNumber
//                     : "Permission given to create USI"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Contact & Address Tab */}
//         {activeTab === "contactAndAddress" && (
//           <div>
//             <div className="flex items-center mb-6">
//               <FaAddressCard className="text-emerald-600 text-2xl mr-4" />
//               <h3 className="text-lg font-medium text-gray-900">
//                 Contact & Address Information
//               </h3>
//             </div>

//             <div className="mb-6">
//               <div className="flex items-center mb-3">
//                 <FaPhone className="text-emerald-600 text-lg mr-2" />
//                 <h4 className="text-md font-medium text-gray-800">
//                   Contact Details
//                 </h4>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Home Phone</p>
//                   <p className="font-medium">
//                     {applicationData.contactDetails.homePhone}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Mobile Phone</p>
//                   <p className="font-medium">
//                     {applicationData.contactDetails.mobilePhone}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Email Address</p>
//                   <p className="font-medium">
//                     {applicationData.contactDetails.emailAddress}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Work Phone</p>
//                   <p className="font-medium">
//                     {applicationData.contactDetails.workPhone || "N/A"}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">
//                     Preferred Contact Method
//                   </p>
//                   <p className="font-medium">
//                     {applicationData.contactDetails.preferredContactMethod}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <div className="flex items-center mb-3">
//                 <FaUser className="text-emerald-600 text-lg mr-2" />
//                 <h4 className="text-md font-medium text-gray-800">
//                   Emergency Contact
//                 </h4>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Name</p>
//                   <p className="font-medium">
//                     {applicationData.emergencyContact.name}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Relationship</p>
//                   <p className="font-medium">
//                     {applicationData.emergencyContact.relationship}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Home Phone</p>
//                   <p className="font-medium">
//                     {applicationData.emergencyContact.homePhone || "N/A"}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Mobile Phone</p>
//                   <p className="font-medium">
//                     {applicationData.emergencyContact.mobilePhone}
//                   </p>
//                 </div>

//                 {applicationData.emergencyContact.workPhone && (
//                   <div className="rounded-lg bg-gray-50 p-4">
//                     <p className="text-sm text-gray-500 mb-1">Work Phone</p>
//                     <p className="font-medium">
//                       {applicationData.emergencyContact.workPhone}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="mb-6">
//               <div className="flex items-center mb-3">
//                 <FaMapMarkerAlt className="text-emerald-600 text-lg mr-2" />
//                 <h4 className="text-md font-medium text-gray-800">
//                   Residential Address
//                 </h4>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {applicationData.addressDetails.residential.buildingName && (
//                   <div className="rounded-lg bg-gray-50 p-4">
//                     <p className="text-sm text-gray-500 mb-1">
//                       Building/Property Name
//                     </p>
//                     <p className="font-medium">
//                       {applicationData.addressDetails.residential.buildingName}
//                     </p>
//                   </div>
//                 )}

//                 {applicationData.addressDetails.residential.unitNumber && (
//                   <div className="rounded-lg bg-gray-50 p-4">
//                     <p className="text-sm text-gray-500 mb-1">
//                       Flat/Unit Number
//                     </p>
//                     <p className="font-medium">
//                       {applicationData.addressDetails.residential.unitNumber}
//                     </p>
//                   </div>
//                 )}

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Street Number</p>
//                   <p className="font-medium">
//                     {applicationData.addressDetails.residential.streetNumber}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Street Name</p>
//                   <p className="font-medium">
//                     {applicationData.addressDetails.residential.streetName}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">City/Town</p>
//                   <p className="font-medium">
//                     {applicationData.addressDetails.residential.cityTown}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">State</p>
//                   <p className="font-medium">
//                     {applicationData.addressDetails.residential.state}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Postcode</p>
//                   <p className="font-medium">
//                     {applicationData.addressDetails.residential.postcode}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <div className="flex items-center mb-3">
//                 <FaEnvelope className="text-emerald-600 text-lg mr-2" />
//                 <h4 className="text-md font-medium text-gray-800">
//                   Postal Address
//                 </h4>
//               </div>

//               {applicationData.addressDetails.postal.sameAsResidential ? (
//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="font-medium text-emerald-600">
//                     Same as residential address
//                   </p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {applicationData.addressDetails.postal.buildingName && (
//                     <div className="rounded-lg bg-gray-50 p-4">
//                       <p className="text-sm text-gray-500 mb-1">
//                         Building/Property Name
//                       </p>
//                       <p className="font-medium">
//                         {applicationData.addressDetails.postal.buildingName}
//                       </p>
//                     </div>
//                   )}

//                   {applicationData.addressDetails.postal.unitNumber && (
//                     <div className="rounded-lg bg-gray-50 p-4">
//                       <p className="text-sm text-gray-500 mb-1">
//                         Flat/Unit Number
//                       </p>
//                       <p className="font-medium">
//                         {applicationData.addressDetails.postal.unitNumber}
//                       </p>
//                     </div>
//                   )}

//                   {applicationData.addressDetails.postal.poBox ? (
//                     <div className="rounded-lg bg-gray-50 p-4">
//                       <p className="text-sm text-gray-500 mb-1">PO Box</p>
//                       <p className="font-medium">
//                         {applicationData.addressDetails.postal.poBox}
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="rounded-lg bg-gray-50 p-4">
//                       <p className="text-sm text-gray-500 mb-1">
//                         Street Number
//                       </p>
//                       <p className="font-medium">
//                         {applicationData.addressDetails.postal.streetNumber}
//                       </p>
//                     </div>
//                   )}

//                   <div className="rounded-lg bg-gray-50 p-4">
//                     <p className="text-sm text-gray-500 mb-1">Street Name</p>
//                     <p className="font-medium">
//                       {applicationData.addressDetails.postal.streetName}
//                     </p>
//                   </div>

//                   <div className="rounded-lg bg-gray-50 p-4">
//                     <p className="text-sm text-gray-500 mb-1">City/Town</p>
//                     <p className="font-medium">
//                       {applicationData.addressDetails.postal.cityTown}
//                     </p>
//                   </div>

//                   <div className="rounded-lg bg-gray-50 p-4">
//                     <p className="text-sm text-gray-500 mb-1">State</p>
//                     <p className="font-medium">
//                       {applicationData.addressDetails.postal.state}
//                     </p>
//                   </div>

//                   <div className="rounded-lg bg-gray-50 p-4">
//                     <p className="text-sm text-gray-500 mb-1">Postcode</p>
//                     <p className="font-medium">
//                       {applicationData.addressDetails.postal.postcode}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div>
//               <div className="flex items-center mb-3">
//                 <FaBuilding className="text-emerald-600 text-lg mr-2" />
//                 <h4 className="text-md font-medium text-gray-800">
//                   Workplace Employer Details
//                 </h4>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Trading Name</p>
//                   <p className="font-medium">
//                     {applicationData.workplaceEmployerDetails.tradingName}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Contact Name</p>
//                   <p className="font-medium">
//                     {applicationData.workplaceEmployerDetails.contactName}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Supervisor Name</p>
//                   <p className="font-medium">
//                     {applicationData.workplaceEmployerDetails.supervisorName}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Trading Address</p>
//                   <p className="font-medium">
//                     {applicationData.workplaceEmployerDetails.tradingAddress}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Phone</p>
//                   <p className="font-medium">
//                     {applicationData.workplaceEmployerDetails.phone}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Employer Email</p>
//                   <p className="font-medium">
//                     {applicationData.workplaceEmployerDetails.employerEmail}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Employment History Tab */}
//         {activeTab === "employmentHistory" && (
//           <div>
//             <div className="flex items-center mb-6">
//               <FaBriefcase className="text-emerald-600 text-2xl mr-4" />
//               <h3 className="text-lg font-medium text-gray-900">
//                 Employment History
//               </h3>
//             </div>

//             <div className="mb-6">
//               <div className="flex items-center mb-3">
//                 <MdWork className="text-emerald-600 text-lg mr-2" />
//                 <h4 className="text-md font-medium text-gray-800">
//                   Current Employment Status
//                 </h4>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">
//                     Employment Status
//                   </p>
//                   <p className="font-medium">
//                     {applicationData.employmentStatus.status}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">
//                     Current Workplace
//                   </p>
//                   <p className="font-medium">
//                     {applicationData.employmentStatus.workplace}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Employee Count</p>
//                   <p className="font-medium">
//                     {applicationData.employmentStatus.employeeCount}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">
//                     Occupation Classification
//                   </p>
//                   <p className="font-medium">
//                     {applicationData.occupation.classification}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">
//                     Industry Classification
//                   </p>
//                   <p className="font-medium">
//                     {applicationData.industryOfEmployment.classification}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center mb-3">
//                 <FaCalendarAlt className="text-emerald-600 text-lg mr-2" />
//                 <h4 className="text-md font-medium text-gray-800">
//                   Employment History
//                 </h4>
//               </div>

//               {applicationData.employmentHistory.map((job, index) => (
//                 <div
//                   key={index}
//                   className="mb-6 border-l-4 border-emerald-500 pl-4"
//                 >
//                   <h5 className="font-medium text-gray-800 mb-2">
//                     {job.position} at {job.employer}
//                   </h5>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                     <div className="rounded-lg bg-gray-50 p-4">
//                       <p className="text-sm text-gray-500 mb-1">Employer</p>
//                       <p className="font-medium">{job.employer}</p>
//                     </div>

//                     <div className="rounded-lg bg-gray-50 p-4">
//                       <p className="text-sm text-gray-500 mb-1">Position</p>
//                       <p className="font-medium">{job.position}</p>
//                     </div>

//                     <div className="rounded-lg bg-gray-50 p-4">
//                       <p className="text-sm text-gray-500 mb-1">
//                         Employment Type
//                       </p>
//                       <p className="font-medium">{job.employmentType}</p>
//                     </div>

//                     <div className="rounded-lg bg-gray-50 p-4">
//                       <p className="text-sm text-gray-500 mb-1">
//                         Employment Period
//                       </p>
//                       <p className="font-medium">
//                         {new Date(job.startDate).toLocaleDateString()} to{" "}
//                         {new Date(job.endDate).toLocaleDateString()}
//                       </p>
//                     </div>

//                     <div className="rounded-lg bg-gray-50 p-4">
//                       <p className="text-sm text-gray-500 mb-1">Address</p>
//                       <p className="font-medium">{job.address}</p>
//                     </div>

//                     <div className="rounded-lg bg-gray-50 p-4">
//                       <p className="text-sm text-gray-500 mb-1">Phone Number</p>
//                       <p className="font-medium">{job.phoneNumber}</p>
//                     </div>
//                   </div>

//                   <div className="rounded-lg bg-gray-50 p-4">
//                     <p className="text-sm text-gray-500 mb-1">
//                       Duties & Responsibilities
//                     </p>
//                     <p className="text-sm">{job.duties}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Education & Qualifications Tab */}
//         {activeTab === "education" && (
//           <div>
//             <div className="flex items-center mb-6">
//               <FaGraduationCap className="text-emerald-600 text-2xl mr-4" />
//               <h3 className="text-lg font-medium text-gray-900">
//                 Education & Qualifications
//               </h3>
//             </div>

//             <div className="mb-6">
//               <div className="flex items-center mb-3">
//                 <MdSchool className="text-emerald-600 text-lg mr-2" />
//                 <h4 className="text-md font-medium text-gray-800">
//                   School Education
//                 </h4>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Still at School</p>
//                   <p className="font-medium">
//                     {applicationData.educationDetails.stillAtSchool
//                       ? "Yes"
//                       : "No"}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">
//                     Highest School Level Completed
//                   </p>
//                   <p className="font-medium">
//                     {applicationData.educationDetails.highestSchoolLevel}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Year Completed</p>
//                   <p className="font-medium">
//                     {applicationData.educationDetails.yearCompleted}
//                   </p>
//                 </div>

//                 {applicationData.educationDetails.stillAtSchool && (
//                   <div className="rounded-lg bg-gray-50 p-4">
//                     <p className="text-sm text-gray-500 mb-1">Current School</p>
//                     <p className="font-medium">
//                       {applicationData.educationDetails.currentSchool}
//                     </p>
//                   </div>
//                 )}

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Previous School</p>
//                   <p className="font-medium">
//                     {applicationData.educationDetails.previousSchool}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center mb-3">
//                 <FaBook className="text-emerald-600 text-lg mr-2" />
//                 <h4 className="text-md font-medium text-gray-800">
//                   Previous Qualifications
//                 </h4>
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4 mb-4">
//                 <p className="text-sm text-gray-500 mb-1">
//                   Have you successfully completed any of the following
//                   qualifications?
//                 </p>
//                 <p className="font-medium">
//                   {applicationData.previousQualifications.hasQualifications
//                     ? "Yes"
//                     : "No"}
//                 </p>
//               </div>

//               {applicationData.previousQualifications.hasQualifications && (
//                 <div className="space-y-4">
//                   {applicationData.previousQualifications.qualifications.map(
//                     (qual, index) => (
//                       <div
//                         key={index}
//                         className="border-l-4 border-emerald-500 pl-4"
//                       >
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div className="rounded-lg bg-gray-50 p-4">
//                             <p className="text-sm text-gray-500 mb-1">
//                               Qualification Type
//                             </p>
//                             <p className="font-medium">{qual.type}</p>
//                           </div>

//                           <div className="rounded-lg bg-gray-50 p-4">
//                             <p className="text-sm text-gray-500 mb-1">
//                               Qualification Name
//                             </p>
//                             <p className="font-medium">{qual.qualification}</p>
//                           </div>

//                           <div className="rounded-lg bg-gray-50 p-4">
//                             <p className="text-sm text-gray-500 mb-1">Origin</p>
//                             <p className="font-medium">
//                               {qual.origin === "A"
//                                 ? "Australian"
//                                 : qual.origin === "E"
//                                 ? "Australian Equivalent"
//                                 : qual.origin === "I"
//                                 ? "International"
//                                 : qual.origin}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               )}

//               <div className="mt-6">
//                 <div className="flex items-center mb-3">
//                   <FaIdCard className="text-emerald-600 text-lg mr-2" />
//                   <h4 className="text-md font-medium text-gray-800">
//                     Study Reason
//                   </h4>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">
//                     Main reason for undertaking this course
//                   </p>
//                   <p className="font-medium">
//                     {applicationData.studyReason.reason}
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <div className="flex items-center mb-3">
//                   <FaGlobe className="text-emerald-600 text-lg mr-2" />
//                   <h4 className="text-md font-medium text-gray-800">
//                     How did you find out about the course?
//                   </h4>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-sm text-gray-500 mb-1">Source</p>
//                   <p className="font-medium">
//                     {applicationData.contactSource.source}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Referees & Documents Tab */}
//         {activeTab === "referees" && (
//           <div>
//             <div className="flex items-center mb-6">
//               <FaUserTie className="text-emerald-600 text-2xl mr-4" />
//               <h3 className="text-lg font-medium text-gray-900">
//                 Professional Referees & Documents
//               </h3>
//             </div>

//             <div className="mb-6">
//               <div className="flex items-center mb-3">
//                 <FaUsers className="text-emerald-600 text-lg mr-2" />
//                 <h4 className="text-md font-medium text-gray-800">
//                   Professional Referees
//                 </h4>
//               </div>

//               {applicationData.professionalReferees.map((referee, index) => (
//                 <div
//                   key={index}
//                   className="mb-6 border-l-4 border-emerald-500 pl-4"
//                 >
//                   <h5 className="font-medium text-gray-800 mb-2">
//                     Referee {index + 1}: {referee.name}
//                   </h5>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="rounded-lg bg-gray-50 p-4">
//                       <p className="text-sm text-gray-500 mb-1">Name</p>
//                       <p className="font-medium">{referee.name}</p>
//                     </div>

//                     <div className="rounded-lg bg-gray-50 p-4">
//                       <p className="text-sm text-gray-500 mb-1">Position</p>
//                       <p className="font-medium">{referee.position}</p>
//                     </div>

//                     <div className="rounded-lg bg-gray-50 p-4">
//                       <p className="text-sm text-gray-500 mb-1">Organisation</p>
//                       <p className="font-medium">{referee.organisation}</p>
//                     </div>

//                     <div className="rounded-lg bg-gray-50 p-4">
//                       <p className="text-sm text-gray-500 mb-1">Phone Number</p>
//                       <p className="font-medium">{referee.phoneNumber}</p>
//                     </div>

//                     <div className="rounded-lg bg-gray-50 p-4">
//                       <p className="text-sm text-gray-500 mb-1">
//                         Mobile Number
//                       </p>
//                       <p className="font-medium">{referee.mobileNumber}</p>
//                     </div>

//                     <div className="rounded-lg bg-gray-50 p-4">
//                       <p className="text-sm text-gray-500 mb-1">
//                         Email Address
//                       </p>
//                       <p className="font-medium">{referee.emailAddress}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div>
//               <div className="flex items-center mb-3">
//                 <FaFileAlt className="text-emerald-600 text-lg mr-2" />
//                 <h4 className="text-md font-medium text-gray-800">
//                   Documented Evidence
//                 </h4>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Document Type
//                       </th>
//                       <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Description
//                       </th>
//                       <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Issue Date
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {applicationData.documentedEvidence.map((doc, index) => (
//                       <tr key={index}>
//                         <td className="py-3 px-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <FaFileContract className="text-emerald-600 mr-2" />
//                             <span className="font-medium text-gray-900">
//                               {doc.documentType}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">
//                           {doc.description}
//                         </td>
//                         <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">
//                           {new Date(doc.issueDate).toLocaleDateString()}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Course Details Tab */}
//         {activeTab === "courseDetails" && (
//           <div>
//             <div className="flex items-center mb-6">
//               <FaGraduationCap className="text-emerald-600 text-2xl mr-4" />
//               <h3 className="text-lg font-medium text-gray-900">
//                 Course Details
//               </h3>
//             </div>

//             <div className="mb-6">
//               <div className="flex items-center mb-3">
//                 <FaBook className="text-emerald-600 text-lg mr-2" />
//                 <h4 className="text-md font-medium text-gray-800">
//                   Program/Qualification
//                 </h4>
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500 mb-1">Course</p>
//                 <p className="font-medium">
//                   {applicationData.programQualification.course}
//                 </p>
//               </div>
//             </div>

//             <div className="mb-6">
//               <div className="flex items-center mb-3">
//                 <FaCheckCircle className="text-emerald-600 text-lg mr-2" />
//                 <h4 className="text-md font-medium text-gray-800">
//                   Pre-Training Checklist
//                 </h4>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <div className="flex items-center">
//                     {applicationData.preTrainingChecklist
//                       .preTrainingFormCompleted ? (
//                       <FaCheck className="text-emerald-500 mr-2" />
//                     ) : (
//                       <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
//                     )}
//                     <p className="text-sm">Pre-training form completed</p>
//                   </div>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <div className="flex items-center">
//                     {applicationData.preTrainingChecklist
//                       .lllAssessmentCompleted ? (
//                       <FaCheck className="text-emerald-500 mr-2" />
//                     ) : (
//                       <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
//                     )}
//                     <p className="text-sm">
//                       Language, Literacy and Numeracy assessment completed
//                     </p>
//                   </div>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <div className="flex items-center">
//                     {applicationData.preTrainingChecklist
//                       .deliveryModeDiscussed ? (
//                       <FaCheck className="text-emerald-500 mr-2" />
//                     ) : (
//                       <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
//                     )}
//                     <p className="text-sm">Delivery mode discussed</p>
//                   </div>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <div className="flex items-center">
//                     {applicationData.preTrainingChecklist.rplDiscussed ? (
//                       <FaCheck className="text-emerald-500 mr-2" />
//                     ) : (
//                       <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
//                     )}
//                     <p className="text-sm">RPL discussed</p>
//                   </div>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <div className="flex items-center">
//                     {applicationData.preTrainingChecklist
//                       .refundPolicyDiscussed ? (
//                       <FaCheck className="text-emerald-500 mr-2" />
//                     ) : (
//                       <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
//                     )}
//                     <p className="text-sm">Refund policy discussed</p>
//                   </div>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <div className="flex items-center">
//                     {applicationData.preTrainingChecklist
//                       .studentHandbookRead ? (
//                       <FaCheck className="text-emerald-500 mr-2" />
//                     ) : (
//                       <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
//                     )}
//                     <p className="text-sm">Student handbook read</p>
//                   </div>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <div className="flex items-center">
//                     {applicationData.preTrainingChecklist
//                       .entryRequirementsDiscussed ? (
//                       <FaCheck className="text-emerald-500 mr-2" />
//                     ) : (
//                       <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
//                     )}
//                     <p className="text-sm">Entry requirements discussed</p>
//                   </div>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <div className="flex items-center">
//                     {applicationData.preTrainingChecklist
//                       .creditTransferDiscussed ? (
//                       <FaCheck className="text-emerald-500 mr-2" />
//                     ) : (
//                       <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
//                     )}
//                     <p className="text-sm">Credit transfer discussed</p>
//                   </div>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <div className="flex items-center">
//                     {applicationData.preTrainingChecklist.locationDiscussed ? (
//                       <FaCheck className="text-emerald-500 mr-2" />
//                     ) : (
//                       <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
//                     )}
//                     <p className="text-sm">Location discussed</p>
//                   </div>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <div className="flex items-center">
//                     {applicationData.preTrainingChecklist
//                       .tuitionFeesDiscussed ? (
//                       <FaCheck className="text-emerald-500 mr-2" />
//                     ) : (
//                       <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
//                     )}
//                     <p className="text-sm">Tuition fees discussed</p>
//                   </div>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <div className="flex items-center">
//                     {applicationData.preTrainingChecklist
//                       .studentQuestionsAnswered ? (
//                       <FaCheck className="text-emerald-500 mr-2" />
//                     ) : (
//                       <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
//                     )}
//                     <p className="text-sm">Student questions answered</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-4 rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500 mb-1">Special Needs</p>
//                 <p className="font-medium">
//                   {applicationData.preTrainingChecklist.specialNeeds}
//                 </p>
//               </div>
//             </div>

//             <div className="mb-6">
//               <div className="flex items-center mb-3">
//                 <FaCheck className="text-emerald-600 text-lg mr-2" />
//                 <h4 className="text-md font-medium text-gray-800">
//                   Consent for Photos
//                 </h4>
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4">
//                 <div className="flex items-center">
//                   {applicationData.consentForPhotos ? (
//                     <FaCheck className="text-emerald-500 mr-2" />
//                   ) : (
//                     <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
//                   )}
//                   <p className="text-sm">
//                     Consent given for publication of photographs and student
//                     work
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center mb-3">
//                 <FaFileContract className="text-emerald-600 text-lg mr-2" />
//                 <h4 className="text-md font-medium text-gray-800">
//                   Form Submission Details
//                 </h4>
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500 mb-1">Signed Date</p>
//                 <p className="font-medium">
//                   {new Date(
//                     applicationData.formSubmission.signedDate
//                   ).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RPLApplicationFormViewer;
"use client";

import { useState } from "react";
import {
  FaUser,
  FaBuilding,
  FaCalendarAlt,
  FaBriefcase,
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaGraduationCap,
  FaBook,
  FaAddressCard,
  FaCheck,
  FaLanguage,
  FaPassport,
  FaFileAlt,
  FaMapMarkerAlt,
  FaGlobe,
  FaUsers,
  FaFileContract,
  FaCheckCircle,
} from "react-icons/fa";
import { MdSchool, MdWork, MdHealthAndSafety } from "react-icons/md";

// Dummy data array for RPL Application Form
const dummyApplicationData = {
  // Recognition Area
  recognitionArea: {
    courseApplying: "CPC30220 Certificate III in Carpentry",
  },

  // Professional Referees
  professionalReferees: [
    {
      name: "Test",
      position: "Test",
      organisation: "Test",
      phoneNumber: "1111111111111111",
      mobileNumber: "1111111111111111",
      emailAddress: "asadawan16900@gmail.com",
    },
    {
      name: "Test",
      position: "Test",
      organisation: "Test",
      phoneNumber: "1111111111111111",
      mobileNumber: "1111111111111111",
      emailAddress: "asadawan16900@gmail.com",
    },
  ],

  // Employment History
  employmentHistory: [
    {
      employer: "test",
      address: "test",
      phoneNumber: "1111111111111111",
      startDate: "2025-05-09",
      endDate: "2025-05-09",
      position: "test",
      employmentType: "Full Time",
      duties: "test",
    },
    {
      employer: "test",
      address: "test",
      phoneNumber: "11111111111",
      startDate: "2025-05-09",
      endDate: "2025-05-09",
      position: "test",
      employmentType: "Full Time",
      duties: "test",
    },
  ],

  // Documents
  documentedEvidence: [
    {
      documentType: "test",
      description: "White Card (Construction Induction Card)",
      issueDate: "2016-12-05",
    },
    {
      documentType: "test",
      description: "CPCCCA2002 - Use carpentry tools and equipment",
      issueDate: "2017-03-22",
    },
    {
      documentType: "test",
      description: "Working at Heights",
      issueDate: "2019-05-14",
    },
    {
      documentType: "test",
      description: "Professional reference from BuildWell Construction",
      issueDate: "2023-05-10",
    },
  ],

  // Personal Details
  personalDetails: {
    title: "Mr",
    gender: "Male",
    surname: "test",
    firstName: "test",
    middleNames: "test",
    preferredName: "test",
    dateOfBirth: "2002-06-20",
  },

  // Contact Details
  contactDetails: {
    homePhone: "111111111111",
    mobilePhone: "111111111111",
    emailAddress: "asadawan16900@gmail.com",
    workPhone: "111111111111",
    preferredContactMethod: "Mobile Phone",
  },

  // Emergency Contact
  emergencyContact: {
    name: "test",
    relationship: "test",
    homePhone: "111111111111",
    mobilePhone: "11111111111",
    workPhone: "1111111111111",
  },

  // Address Details
  addressDetails: {
    residential: {
      buildingName: "test",
      unitNumber: "1",
      streetNumber: "11",
      streetName: "test",
      cityTown: "test",
      state: "NSW",
      postcode: "11111",
    },
    postal: {
      sameAsResidential: true,
      buildingName: "test",
      unitNumber: "1",
      streetNumber: "11",
      streetName: "test",
      cityTown: "test",
      state: "NSW",
      postcode: "11111",
      poBox: "",
    },
    studyAddress: {
      buildingName: "test",
      unitNumber: "1",
      streetNumber: "111",
      streetName: "test",
      cityTown: "test",
      state: "NSW",
      postcode: "111111",
    },
  },

  // Workplace Employer Details
  workplaceEmployerDetails: {
    tradingName: "test",
    contactName: "test",
    supervisorName: "test",
    tradingAddress: "test",
    phone: "11111111111",
    employerEmail: "asadawan16900@gmail.com",
  },

  // Language and Cultural Diversity
  languageCulturalDiversity: {
    aboriginalTorresStraitIslander: "No",
    countryOfBirth: "Australia",
    languageOtherThanEnglish: "yes",
    otherLanguage: "urdu",
    englishProficiency: "Very Well",
  },

  // USI
  usi: {
    hasUSI: true,
    usiNumber: "111111111",
  },

  // Education Details
  educationDetails: {
    stillAtSchool: false,
    highestSchoolLevel: "Completed Year 12",
    yearCompleted: "1111",
    currentSchool: "",
    previousSchool: "test",
  },

  // Employment Status
  employmentStatus: {
    status: "Full time employee",
    workplace: "test",
    employeeCount: "Over 20",
  },

  // Occupation
  occupation: {
    classification: "3 – Technicians & Trade Workers",
  },

  // Industry of Employment
  industryOfEmployment: {
    classification: "E – Construction",
  },

  // Disability
  disability: {
    hasDisability: false,
    disabilityTypes: [],
  },

  // Previous Qualifications
  previousQualifications: {
    hasQualifications: true,
    qualifications: [
      {
        type: "Certificate II",
        qualification: "Certificate II in Construction",
        origin: "A", // A = Australian
      },
    ],
  },

  // Study Reason
  studyReason: {
    reason: "To get a better job or promotion",
  },

  // How they found out about the course
  contactSource: {
    source: "Workplace",
  },

  // Australian Citizenship Status
  citizenshipStatus: {
    status: "Australian Citizen",
  },

  // Program/Qualification
  programQualification: {
    course: "CPC30220 Certificate III in Carpentry",
  },

  // Pre Training Checklist
  preTrainingChecklist: {
    preTrainingFormCompleted: true,
    lllAssessmentCompleted: true,
    deliveryModeDiscussed: true,
    rplDiscussed: true,
    refundPolicyDiscussed: true,
    studentHandbookRead: true,
    entryRequirementsDiscussed: true,
    creditTransferDiscussed: true,
    locationDiscussed: true,
    tuitionFeesDiscussed: true,
    studentQuestionsAnswered: true,
    specialNeeds: "None",
  },

  // Consent for Photos
  consentForPhotos: true,

  // Form Submission Details
  formSubmission: {
    signedDate: "2025-05-09",
  },
};

const RPLApplicationFormViewer = ({ rplApplicationFormData }) => {
  // Map the rplApplicationFormData to the expected structure
  const applicationData = rplApplicationFormData
    ? mapFormDataToApplicationData(rplApplicationFormData)
    : dummyApplicationData;

  const [activeTab, setActiveTab] = useState("personalDetails");

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* RPL Application Form Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab("personalDetails")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "personalDetails"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Personal Details
          </button>
          <button
            onClick={() => setActiveTab("contactAndAddress")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "contactAndAddress"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Contact & Address
          </button>
          <button
            onClick={() => setActiveTab("employmentHistory")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "employmentHistory"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Employment History
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "education"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Education & Qualifications
          </button>
          <button
            onClick={() => setActiveTab("referees")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "referees"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Referees & Documents
          </button>
          <button
            onClick={() => setActiveTab("courseDetails")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === "courseDetails"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Course Details
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Personal Details Tab */}
        {activeTab === "personalDetails" && (
          <div>
            <div className="flex items-center mb-6">
              <FaUser className="text-emerald-600 text-2xl mr-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Personal Details
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">Title</p>
                <p className="font-medium">
                  {applicationData.personalDetails.title}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">Gender</p>
                <p className="font-medium">
                  {applicationData.personalDetails.gender}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">Surname</p>
                <p className="font-medium">
                  {applicationData.personalDetails.surname}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">First Name</p>
                <p className="font-medium">
                  {applicationData.personalDetails.firstName}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">Middle Name(s)</p>
                <p className="font-medium">
                  {applicationData.personalDetails.middleNames}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">Preferred Name</p>
                <p className="font-medium">
                  {applicationData.personalDetails.preferredName}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                <p className="font-medium">
                  {new Date(
                    applicationData.personalDetails.dateOfBirth
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">Citizenship Status</p>
                <p className="font-medium">
                  {applicationData.citizenshipStatus.status}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-2">
                <FaLanguage className="text-emerald-600 text-lg mr-2" />
                <h4 className="text-md font-medium text-gray-800">
                  Language and Cultural Diversity
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Aboriginal/Torres Strait Islander Origin
                  </p>
                  <p className="font-medium">
                    {
                      applicationData.languageCulturalDiversity
                        .aboriginalTorresStraitIslander
                    }
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Country of Birth</p>
                  <p className="font-medium">
                    {applicationData.languageCulturalDiversity.countryOfBirth}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Speak Language Other Than English
                  </p>
                  <p className="font-medium">
                    {
                      applicationData.languageCulturalDiversity
                        .languageOtherThanEnglish
                    }
                  </p>
                </div>

                {applicationData.languageCulturalDiversity.otherLanguage && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500 mb-1">Other Language</p>
                    <p className="font-medium">
                      {applicationData.languageCulturalDiversity.otherLanguage}
                    </p>
                  </div>
                )}

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    English Proficiency
                  </p>
                  <p className="font-medium">
                    {
                      applicationData.languageCulturalDiversity
                        .englishProficiency
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-2">
                <MdHealthAndSafety className="text-emerald-600 text-lg mr-2" />
                <h4 className="text-md font-medium text-gray-800">
                  Disability Status
                </h4>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">
                  Do you consider yourself to have a disability, impairment or
                  long-term condition?
                </p>
                <p className="font-medium">
                  {applicationData.disability.hasDisability ? "Yes" : "No"}
                </p>

                {applicationData.disability.hasDisability &&
                  applicationData.disability.disabilityTypes.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-1">
                        Type(s) of disability:
                      </p>
                      <ul className="list-disc pl-5">
                        {applicationData.disability.disabilityTypes.map(
                          (type, index) => (
                            <li key={index} className="text-sm">
                              {type}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-2">
                <FaPassport className="text-emerald-600 text-lg mr-2" />
                <h4 className="text-md font-medium text-gray-800">
                  Unique Student Identifier (USI)
                </h4>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">USI Number</p>
                <p className="font-medium">
                  {applicationData.usi.hasUSI
                    ? applicationData.usi.usiNumber
                    : "Permission given to create USI"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Contact & Address Tab */}
        {activeTab === "contactAndAddress" && (
          <div>
            <div className="flex items-center mb-6">
              <FaAddressCard className="text-emerald-600 text-2xl mr-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Contact & Address Information
              </h3>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FaPhone className="text-emerald-600 text-lg mr-2" />
                <h4 className="text-md font-medium text-gray-800">
                  Contact Details
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Home Phone</p>
                  <p className="font-medium">
                    {applicationData.contactDetails.homePhone}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Mobile Phone</p>
                  <p className="font-medium">
                    {applicationData.contactDetails.mobilePhone}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  <p className="font-medium">
                    {applicationData.contactDetails.emailAddress}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Work Phone</p>
                  <p className="font-medium">
                    {applicationData.contactDetails.workPhone || "N/A"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Preferred Contact Method
                  </p>
                  <p className="font-medium">
                    {applicationData.contactDetails.preferredContactMethod}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FaUser className="text-emerald-600 text-lg mr-2" />
                <h4 className="text-md font-medium text-gray-800">
                  Emergency Contact
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Name</p>
                  <p className="font-medium">
                    {applicationData.emergencyContact.name}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Relationship</p>
                  <p className="font-medium">
                    {applicationData.emergencyContact.relationship}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Home Phone</p>
                  <p className="font-medium">
                    {applicationData.emergencyContact.homePhone || "N/A"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Mobile Phone</p>
                  <p className="font-medium">
                    {applicationData.emergencyContact.mobilePhone}
                  </p>
                </div>

                {applicationData.emergencyContact.workPhone && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500 mb-1">Work Phone</p>
                    <p className="font-medium">
                      {applicationData.emergencyContact.workPhone}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FaMapMarkerAlt className="text-emerald-600 text-lg mr-2" />
                <h4 className="text-md font-medium text-gray-800">
                  Residential Address
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {applicationData.addressDetails.residential.buildingName && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500 mb-1">
                      Building/Property Name
                    </p>
                    <p className="font-medium">
                      {applicationData.addressDetails.residential.buildingName}
                    </p>
                  </div>
                )}

                {applicationData.addressDetails.residential.unitNumber && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500 mb-1">
                      Flat/Unit Number
                    </p>
                    <p className="font-medium">
                      {applicationData.addressDetails.residential.unitNumber}
                    </p>
                  </div>
                )}

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Street Number</p>
                  <p className="font-medium">
                    {applicationData.addressDetails.residential.streetNumber}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Street Name</p>
                  <p className="font-medium">
                    {applicationData.addressDetails.residential.streetName}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">City/Town</p>
                  <p className="font-medium">
                    {applicationData.addressDetails.residential.cityTown}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">State</p>
                  <p className="font-medium">
                    {applicationData.addressDetails.residential.state}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Postcode</p>
                  <p className="font-medium">
                    {applicationData.addressDetails.residential.postcode}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FaEnvelope className="text-emerald-600 text-lg mr-2" />
                <h4 className="text-md font-medium text-gray-800">
                  Postal Address
                </h4>
              </div>

              {applicationData.addressDetails.postal.sameAsResidential ? (
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="font-medium text-emerald-600">
                    Same as residential address
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {applicationData.addressDetails.postal.buildingName && (
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">
                        Building/Property Name
                      </p>
                      <p className="font-medium">
                        {applicationData.addressDetails.postal.buildingName}
                      </p>
                    </div>
                  )}

                  {applicationData.addressDetails.postal.unitNumber && (
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">
                        Flat/Unit Number
                      </p>
                      <p className="font-medium">
                        {applicationData.addressDetails.postal.unitNumber}
                      </p>
                    </div>
                  )}

                  {applicationData.addressDetails.postal.poBox ? (
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">PO Box</p>
                      <p className="font-medium">
                        {applicationData.addressDetails.postal.poBox}
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">
                        Street Number
                      </p>
                      <p className="font-medium">
                        {applicationData.addressDetails.postal.streetNumber}
                      </p>
                    </div>
                  )}

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500 mb-1">Street Name</p>
                    <p className="font-medium">
                      {applicationData.addressDetails.postal.streetName}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500 mb-1">City/Town</p>
                    <p className="font-medium">
                      {applicationData.addressDetails.postal.cityTown}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500 mb-1">State</p>
                    <p className="font-medium">
                      {applicationData.addressDetails.postal.state}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500 mb-1">Postcode</p>
                    <p className="font-medium">
                      {applicationData.addressDetails.postal.postcode}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center mb-3">
                <FaBuilding className="text-emerald-600 text-lg mr-2" />
                <h4 className="text-md font-medium text-gray-800">
                  Workplace Employer Details
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Trading Name</p>
                  <p className="font-medium">
                    {applicationData.workplaceEmployerDetails.tradingName}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Contact Name</p>
                  <p className="font-medium">
                    {applicationData.workplaceEmployerDetails.contactName}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Supervisor Name</p>
                  <p className="font-medium">
                    {applicationData.workplaceEmployerDetails.supervisorName}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Trading Address</p>
                  <p className="font-medium">
                    {applicationData.workplaceEmployerDetails.tradingAddress}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <p className="font-medium">
                    {applicationData.workplaceEmployerDetails.phone}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Employer Email</p>
                  <p className="font-medium">
                    {applicationData.workplaceEmployerDetails.employerEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Employment History Tab */}
        {activeTab === "employmentHistory" && (
          <div>
            <div className="flex items-center mb-6">
              <FaBriefcase className="text-emerald-600 text-2xl mr-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Employment History
              </h3>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-3">
                <MdWork className="text-emerald-600 text-lg mr-2" />
                <h4 className="text-md font-medium text-gray-800">
                  Current Employment Status
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Employment Status
                  </p>
                  <p className="font-medium">
                    {applicationData.employmentStatus.status}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Current Workplace
                  </p>
                  <p className="font-medium">
                    {applicationData.employmentStatus.workplace}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Employee Count</p>
                  <p className="font-medium">
                    {applicationData.employmentStatus.employeeCount}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Occupation Classification
                  </p>
                  <p className="font-medium">
                    {applicationData.occupation.classification}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Industry Classification
                  </p>
                  <p className="font-medium">
                    {applicationData.industryOfEmployment.classification}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <FaCalendarAlt className="text-emerald-600 text-lg mr-2" />
                <h4 className="text-md font-medium text-gray-800">
                  Employment History
                </h4>
              </div>

              {applicationData.employmentHistory.map((job, index) => (
                <div
                  key={index}
                  className="mb-6 border-l-4 border-emerald-500 pl-4"
                >
                  <h5 className="font-medium text-gray-800 mb-2">
                    {job.position} at {job.employer}
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">Employer</p>
                      <p className="font-medium">{job.employer}</p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">Position</p>
                      <p className="font-medium">{job.position}</p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">
                        Employment Type
                      </p>
                      <p className="font-medium">{job.employmentType}</p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">
                        Employment Period
                      </p>
                      <p className="font-medium">
                        {new Date(job.startDate).toLocaleDateString()} to{" "}
                        {new Date(job.endDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">Address</p>
                      <p className="font-medium">{job.address}</p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                      <p className="font-medium">{job.phoneNumber}</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500 mb-1">
                      Duties & Responsibilities
                    </p>
                    <p className="text-sm">{job.duties}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Qualifications Tab */}
        {activeTab === "education" && (
          <div>
            <div className="flex items-center mb-6">
              <FaGraduationCap className="text-emerald-600 text-2xl mr-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Education & Qualifications
              </h3>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-3">
                <MdSchool className="text-emerald-600 text-lg mr-2" />
                <h4 className="text-md font-medium text-gray-800">
                  School Education
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Still at School</p>
                  <p className="font-medium">
                    {applicationData.educationDetails.stillAtSchool
                      ? "Yes"
                      : "No"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Highest School Level Completed
                  </p>
                  <p className="font-medium">
                    {applicationData.educationDetails.highestSchoolLevel}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Year Completed</p>
                  <p className="font-medium">
                    {applicationData.educationDetails.yearCompleted}
                  </p>
                </div>

                {applicationData.educationDetails.stillAtSchool && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500 mb-1">Current School</p>
                    <p className="font-medium">
                      {applicationData.educationDetails.currentSchool}
                    </p>
                  </div>
                )}

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Previous School</p>
                  <p className="font-medium">
                    {applicationData.educationDetails.previousSchool}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <FaBook className="text-emerald-600 text-lg mr-2" />
                <h4 className="text-md font-medium text-gray-800">
                  Previous Qualifications
                </h4>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 mb-4">
                <p className="text-sm text-gray-500 mb-1">
                  Have you successfully completed any of the following
                  qualifications?
                </p>
                <p className="font-medium">
                  {applicationData.previousQualifications.hasQualifications
                    ? "Yes"
                    : "No"}
                </p>
              </div>

              {applicationData.previousQualifications.hasQualifications && (
                <div className="space-y-4">
                  {applicationData.previousQualifications.qualifications.map(
                    (qual, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-emerald-500 pl-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-sm text-gray-500 mb-1">
                              Qualification Type
                            </p>
                            <p className="font-medium">{qual.type}</p>
                          </div>

                          <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-sm text-gray-500 mb-1">
                              Qualification Name
                            </p>
                            <p className="font-medium">{qual.qualification}</p>
                          </div>

                          <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-sm text-gray-500 mb-1">Origin</p>
                            <p className="font-medium">
                              {qual.origin === "A"
                                ? "Australian"
                                : qual.origin === "E"
                                ? "Australian Equivalent"
                                : qual.origin === "I"
                                ? "International"
                                : qual.origin}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}

              <div className="mt-6">
                <div className="flex items-center mb-3">
                  <FaIdCard className="text-emerald-600 text-lg mr-2" />
                  <h4 className="text-md font-medium text-gray-800">
                    Study Reason
                  </h4>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Main reason for undertaking this course
                  </p>
                  <p className="font-medium">
                    {applicationData.studyReason.reason}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center mb-3">
                  <FaGlobe className="text-emerald-600 text-lg mr-2" />
                  <h4 className="text-md font-medium text-gray-800">
                    How did you find out about the course?
                  </h4>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">Source</p>
                  <p className="font-medium">
                    {applicationData.contactSource.source}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Referees & Documents Tab */}
        {activeTab === "referees" && (
          <div>
            <div className="flex items-center mb-6">
              <FaUserTie className="text-emerald-600 text-2xl mr-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Professional Referees & Documents
              </h3>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FaUsers className="text-emerald-600 text-lg mr-2" />
                <h4 className="text-md font-medium text-gray-800">
                  Professional Referees
                </h4>
              </div>

              {applicationData.professionalReferees.map((referee, index) => (
                <div
                  key={index}
                  className="mb-6 border-l-4 border-emerald-500 pl-4"
                >
                  <h5 className="font-medium text-gray-800 mb-2">
                    Referee {index + 1}: {referee.name}
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">Name</p>
                      <p className="font-medium">{referee.name}</p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">Position</p>
                      <p className="font-medium">{referee.position}</p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">Organisation</p>
                      <p className="font-medium">{referee.organisation}</p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                      <p className="font-medium">{referee.phoneNumber}</p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">
                        Mobile Number
                      </p>
                      <p className="font-medium">{referee.mobileNumber}</p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">
                        Email Address
                      </p>
                      <p className="font-medium">{referee.emailAddress}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center mb-3">
                <FaFileAlt className="text-emerald-600 text-lg mr-2" />
                <h4 className="text-md font-medium text-gray-800">
                  Documented Evidence
                </h4>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Document Type
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Issue Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {applicationData.documentedEvidence.map((doc, index) => (
                      <tr key={index}>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaFileContract className="text-emerald-600 mr-2" />
                            <span className="font-medium text-gray-900">
                              {doc.documentType}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">
                          {doc.description}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(doc.issueDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Course Details Tab */}
        {activeTab === "courseDetails" && (
          <div>
            <div className="flex items-center mb-6">
              <FaGraduationCap className="text-emerald-600 text-2xl mr-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Course Details
              </h3>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FaBook className="text-emerald-600 text-lg mr-2" />
                <h4 className="text-md font-medium text-gray-800">
                  Program/Qualification
                </h4>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">Course</p>
                <p className="font-medium">
                  {applicationData.programQualification.course}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FaCheckCircle className="text-emerald-600 text-lg mr-2" />
                <h4 className="text-md font-medium text-gray-800">
                  Pre-Training Checklist
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center">
                    {applicationData.preTrainingChecklist
                      .preTrainingFormCompleted ? (
                      <FaCheck className="text-emerald-500 mr-2" />
                    ) : (
                      <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
                    )}
                    <p className="text-sm">Pre-training form completed</p>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center">
                    {applicationData.preTrainingChecklist
                      .lllAssessmentCompleted ? (
                      <FaCheck className="text-emerald-500 mr-2" />
                    ) : (
                      <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
                    )}
                    <p className="text-sm">
                      Language, Literacy and Numeracy assessment completed
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center">
                    {applicationData.preTrainingChecklist
                      .deliveryModeDiscussed ? (
                      <FaCheck className="text-emerald-500 mr-2" />
                    ) : (
                      <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
                    )}
                    <p className="text-sm">Delivery mode discussed</p>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center">
                    {applicationData.preTrainingChecklist.rplDiscussed ? (
                      <FaCheck className="text-emerald-500 mr-2" />
                    ) : (
                      <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
                    )}
                    <p className="text-sm">RPL discussed</p>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center">
                    {applicationData.preTrainingChecklist
                      .refundPolicyDiscussed ? (
                      <FaCheck className="text-emerald-500 mr-2" />
                    ) : (
                      <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
                    )}
                    <p className="text-sm">Refund policy discussed</p>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center">
                    {applicationData.preTrainingChecklist
                      .studentHandbookRead ? (
                      <FaCheck className="text-emerald-500 mr-2" />
                    ) : (
                      <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
                    )}
                    <p className="text-sm">Student handbook read</p>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center">
                    {applicationData.preTrainingChecklist
                      .entryRequirementsDiscussed ? (
                      <FaCheck className="text-emerald-500 mr-2" />
                    ) : (
                      <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
                    )}
                    <p className="text-sm">Entry requirements discussed</p>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center">
                    {applicationData.preTrainingChecklist
                      .creditTransferDiscussed ? (
                      <FaCheck className="text-emerald-500 mr-2" />
                    ) : (
                      <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
                    )}
                    <p className="text-sm">Credit transfer discussed</p>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center">
                    {applicationData.preTrainingChecklist.locationDiscussed ? (
                      <FaCheck className="text-emerald-500 mr-2" />
                    ) : (
                      <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
                    )}
                    <p className="text-sm">Location discussed</p>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center">
                    {applicationData.preTrainingChecklist
                      .tuitionFeesDiscussed ? (
                      <FaCheck className="text-emerald-500 mr-2" />
                    ) : (
                      <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
                    )}
                    <p className="text-sm">Tuition fees discussed</p>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center">
                    {applicationData.preTrainingChecklist
                      .studentQuestionsAnswered ? (
                      <FaCheck className="text-emerald-500 mr-2" />
                    ) : (
                      <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
                    )}
                    <p className="text-sm">Student questions answered</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">Special Needs</p>
                <p className="font-medium">
                  {applicationData.preTrainingChecklist.specialNeeds}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FaCheck className="text-emerald-600 text-lg mr-2" />
                <h4 className="text-md font-medium text-gray-800">
                  Consent for Photos
                </h4>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center">
                  {applicationData.consentForPhotos ? (
                    <FaCheck className="text-emerald-500 mr-2" />
                  ) : (
                    <div className="w-5 h-5 border border-gray-300 rounded mr-2"></div>
                  )}
                  <p className="text-sm">
                    Consent given for publication of photographs and student
                    work
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <FaFileContract className="text-emerald-600 text-lg mr-2" />
                <h4 className="text-md font-medium text-gray-800">
                  Form Submission Details
                </h4>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500 mb-1">Signed Date</p>
                <p className="font-medium">
                  {new Date(
                    applicationData.formSubmission.signedDate
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Function to map the form data to the expected structure
const mapFormDataToApplicationData = (formData) => {
  const data = formData.formData;

  return {
    // Recognition Area
    recognitionArea: {
      courseApplying: data.rplArea?.courseApplying || "",
    },

    // Professional Referees
    professionalReferees:
      data.referees?.map((referee) => ({
        name: referee.name || "",
        position: referee.position || "",
        organisation: referee.organization || "",
        phoneNumber: referee.phoneNumber || "",
        mobileNumber: referee.mobileNumber || "",
        emailAddress: referee.email || "",
      })) || [],

    // Employment History
    employmentHistory:
      data.employmentHistory?.map((job) => ({
        employer: job.employer || "",
        address: "", // Not available in the new data structure
        phoneNumber: "", // Not available in the new data structure
        startDate: job.periodFrom || "",
        endDate: job.periodTo || "",
        position: job.position || "",
        employmentType: job.employmentType || "",
        duties: job.duties || "",
      })) || [],

    // Documents
    documentedEvidence:
      data.documentedEvidence?.map((doc) => ({
        documentType: doc.documentType || "",
        description: doc.description || "",
        issueDate: doc.issueDate || "",
      })) || [],

    // Personal Details
    personalDetails: {
      title: data.personalDetails?.title || "",
      gender: data.personalDetails?.gender || "",
      surname: data.personalDetails?.surname || "",
      firstName: data.personalDetails?.firstName || "",
      middleNames: data.personalDetails?.middleName || "",
      preferredName: data.personalDetails?.preferredName || "",
      dateOfBirth: data.personalDetails?.dateOfBirth || "",
    },

    // Contact Details
    contactDetails: {
      homePhone: data.contactDetails?.homePhone || "",
      mobilePhone: data.contactDetails?.mobilePhone || "",
      emailAddress: data.contactDetails?.email || "",
      workPhone: data.contactDetails?.workPhone || "",
      preferredContactMethod: data.contactDetails?.preferredContactMethod || "",
    },

    // Emergency Contact
    emergencyContact: {
      name: data.emergencyContact?.name || "",
      relationship: data.emergencyContact?.relationship || "",
      homePhone: data.emergencyContact?.homePhone || "",
      mobilePhone: data.emergencyContact?.mobilePhone || "",
      workPhone: data.emergencyContact?.workPhone || "",
    },

    // Address Details
    addressDetails: {
      residential: {
        buildingName: data.addressDetails?.buildingName || "",
        unitNumber: data.addressDetails?.unitNumber || "",
        streetNumber: data.addressDetails?.streetNo || "",
        streetName: data.addressDetails?.streetName || "",
        cityTown: data.addressDetails?.city || "",
        state: data.addressDetails?.state || "",
        postcode: data.addressDetails?.postcode || "",
      },
      postal: {
        sameAsResidential: data.addressDetails?.sameAsResidential || false,
        buildingName: data.addressDetails?.postalBuildingName || "",
        unitNumber: data.addressDetails?.postalUnitNumber || "",
        streetNumber: data.addressDetails?.postalStreetNo || "",
        streetName: data.addressDetails?.postalStreetName || "",
        cityTown: data.addressDetails?.postalCity || "",
        state: data.addressDetails?.postalState || "",
        postcode: data.addressDetails?.postalPostcode || "",
        poBox: data.addressDetails?.postalPOBox || "",
      },
      studyAddress: {
        buildingName: data.addressDetails?.studyBuildingName || "",
        unitNumber: data.addressDetails?.studyUnitNumber || "",
        streetNumber: data.addressDetails?.studyStreetNo || "",
        streetName: data.addressDetails?.studyStreetName || "",
        cityTown: data.addressDetails?.studyCity || "",
        state: data.addressDetails?.studyState || "",
        postcode: data.addressDetails?.studyPostcode || "",
      },
    },

    // Workplace Employer Details
    workplaceEmployerDetails: {
      tradingName: data.workplaceDetails?.tradingName || "",
      contactName: data.workplaceDetails?.contactName || "",
      supervisorName: data.workplaceDetails?.supervisorName || "",
      tradingAddress: data.workplaceDetails?.tradingAddress || "",
      phone: data.workplaceDetails?.phone || "",
      employerEmail: data.workplaceDetails?.email || "",
    },

    // Language and Cultural Diversity
    languageCulturalDiversity: {
      aboriginalTorresStraitIslander:
        data.culturalDiversity?.aboriginalOrigin || "No",
      countryOfBirth: data.culturalDiversity?.countryOfBirth || "",
      languageOtherThanEnglish:
        data.culturalDiversity?.speakOtherLanguage || "No",
      otherLanguage: data.culturalDiversity?.otherLanguage || "",
      englishProficiency: data.culturalDiversity?.englishProficiency || "",
    },

    // USI
    usi: {
      hasUSI: data.usi?.haveUSI || false,
      usiNumber: data.usi?.usiNumber || "",
    },

    // Education Details
    educationDetails: {
      stillAtSchool: data.education?.stillAtSchool || false,
      highestSchoolLevel: data.education?.highestSchoolLevel
        ? `Completed ${data.education.highestSchoolLevel}`
        : "",
      yearCompleted: data.education?.yearCompleted || "",
      currentSchool: data.education?.currentSchool || "",
      previousSchool: data.education?.previousSchool || "",
    },

    // Employment Status
    employmentStatus: {
      status: data.employment?.status || "",
      workplace: data.employment?.employedAt || "",
      employeeCount: data.employment?.employeeCount || "",
    },

    // Occupation
    occupation: {
      classification: data.occupation?.classification || "",
    },

    // Industry of Employment
    industryOfEmployment: {
      classification: data.industry?.classification || "",
    },

    // Disability
    disability: {
      hasDisability: data.disability?.hasDisability || false,
      disabilityTypes: data.disability?.disabilityTypes || [],
    },

    // Previous Qualifications
    previousQualifications: {
      hasQualifications: data.previousQualifications?.hasCompleted || false,
      qualifications:
        data.previousQualifications?.qualifications?.map((qual) => ({
          type: qual.type || "",
          qualification: qual.type || "", // Using type as qualification name since it's not provided separately
          origin: qual.origin || "",
        })) || [],
    },

    // Study Reason
    studyReason: {
      reason: data.studyReason || "",
    },

    // How they found out about the course
    contactSource: {
      source: data.contactSource || "",
    },

    // Australian Citizenship Status
    citizenshipStatus: {
      status: data.citizenshipStatus || "",
    },

    // Program/Qualification
    programQualification: {
      course: data.program || "",
    },

    // Pre Training Checklist
    preTrainingChecklist: {
      preTrainingFormCompleted:
        data.preTraining?.preTrainingFormCompleted || false,
      lllAssessmentCompleted: data.preTraining?.lLNAssessmentCompleted || false,
      deliveryModeDiscussed: data.preTraining?.deliveryModeDiscussed || false,
      rplDiscussed: data.preTraining?.rplDiscussed || false,
      refundPolicyDiscussed: data.preTraining?.refundPolicyDiscussed || false,
      studentHandbookRead: data.preTraining?.readStudentHandbook || false,
      entryRequirementsDiscussed:
        data.preTraining?.entryRequirementsDiscussed || false,
      creditTransferDiscussed:
        data.preTraining?.creditTransferDiscussed || false,
      locationDiscussed: data.preTraining?.locationDiscussed || false,
      tuitionFeesDiscussed: data.preTraining?.feesDiscussed || false,
      studentQuestionsAnswered:
        data.preTraining?.studentQuestionsAnswered || false,
      specialNeeds: data.preTraining?.specialNeeds || "None",
    },

    // Consent for Photos
    consentForPhotos: data.consent?.photoConsent || false,

    // Form Submission Details
    formSubmission: {
      signedDate: data.consent?.signatureDate || "",
    },
  };
};

export default RPLApplicationFormViewer;
