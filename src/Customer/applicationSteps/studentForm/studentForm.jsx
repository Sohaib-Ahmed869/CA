import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import FloatingLabelInput from "../../components/floatingLabelInput";
import PersonalInfo from "./personalInfo";
import ContactInfo from "./ContactInfo";
import EmploymentDetails from "./employeeDetails";
import CreditsTransfer from "./creditsTransfer";
import StudentAgreement from "./studentAgreement";

const StudentIntakeForm = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    USI: "",
    gender: "",
    dob: "",
    homeAddress: "",
    suburb: "",
    postcode: "",
    state: "",
  });

  const [contactInfo, setContactInfo] = useState({
    contactNumber: "",
    email: "",
    countryOfBirth: "",
    australianCitizen: false,
    aboriginalOrTorresStraitIslander: false,
    englishLevel: "",
    disability: false,
    educationLevel: "",
    previousQualifications: [],
    employmentStatus: "",
  });

  const [employmentDetails, setEmploymentDetails] = useState({
    businessName: "",
    position: "",
    employersLegalName: "",
    employersAddress: "",
    employersContactNumber: "",
  });

  const [creditsTransfer, setCreditsTransfer] = useState({
    creditsTransfer: false,
    nameOfQualification: "",
    YearCompleted: "",
  });

  const TOC = {
    heading: "Student Agreement",
    subtitle:
      "Please read the following student agreement and sign it before submitting this enrolment form.",
    content1:
      "This student agreement outlines the terms and conditions of enrolment and constitutes the agreement between Certified Australia and the student(you).",
    terms: [
      "Confirm you have understood RPL and how your competency will be assessed in regard to the qualification needed by the provision of acceptable evidence from you",
      "Confirm that you fulfil all qualification requirements and have the required documentation and evidence for the qualification provided",
      "Confirm all the information provided to Certified Australia at the time of enrolment is accurate and complete, including anything that may impact your ability to complete the qualification",
      "Agree to pay all required fees associated with the qualification on or before the agreed date, where you are electing an upfront fee paying method",
      "Consent to the collection, use and disclosure of your personal information in the manner outlined below: I understand and agree that my personal information collected by Certified Australia during enrolment will be used for the purposes of course enrolment, learning and student records administration, identification, and communication. The information will be held securely and discarded appropriately when no longer required in accordance with the Privacy and Personal Information Protection Act 1998",
      "Accept to complete a statutory declaration, if necessary, to validate the evidence you will provide",
      "Accept to demonstrate your skills in a practical assessment, if deemed necessary by the assessor, at your workplace or another venue to confirm competency",
    ],
    content2:
      "It is your responsibility to inform Certified Australia in writing within 7 days of any corrections or changes to personal details during the period of the RPL process.",
  };

  const [studentAgreement, setStudentAgreement] = useState({
    agree: false,
    date: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div>
      <Navbar />
      <div className="p-5 lg:p-60 lg:pt-20 lg:pb-20">
        <div className="flex flex-col items-center text-left w-full">
          <h1 className="text-2xl lg:text-3xl font-bold">
            Student Intake Form
          </h1>
          <p className="text-md text-gray-600 mb-3 lg:mb-8">
            Please fill in the form below to complete your enrolment.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <PersonalInfo
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
          />
          <ContactInfo
            contactInfo={contactInfo}
            setContactInfo={setContactInfo}
          />
          <EmploymentDetails
            employmentDetails={employmentDetails}
            setEmploymentDetails={setEmploymentDetails}
          />
          <CreditsTransfer
            creditsTransfer={creditsTransfer}
            setCreditsTransfer={setCreditsTransfer}
          />

          <h2 className="text-2xl font-semibold mb-2">{TOC.heading}</h2>
          <p className="text-md font-normal mb-2">{TOC.subtitle}</p>
          <p className="text-md font-normal mb-2">{TOC.content1}</p>
          <ul className="list-disc list-inside mb-2 text-sm text-gray-600">
            {TOC.terms.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ul>
          <p className="text-md font-normal mb-5">{TOC.content2}</p>

          <StudentAgreement
            studentAgreement={studentAgreement}
            setStudentAgreement={setStudentAgreement}
          />
          <button type="submit" className="btn btn-primary  w-full text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentIntakeForm;
