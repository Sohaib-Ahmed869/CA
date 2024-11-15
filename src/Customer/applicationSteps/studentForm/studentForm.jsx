import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import FloatingLabelInput from "../../components/floatingLabelInput";
import PersonalInfo from "./personalInfo";
import ContactInfo from "./ContactInfo";
import EmploymentDetails from "./employeeDetails";
import CreditsTransfer from "./creditsTransfer";
import StudentAgreement from "./studentAgreement";
import { studentIntakeForm } from "../../Services/customerApplication";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SpinnerLoader from "../../components/spinnerLoader";
import { BsBack } from "react-icons/bs";

const StudentIntakeForm = () => {
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const navigate = useNavigate();
  const onSuccess = () => toast.success("Form submitted successfully");
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
    previousQualifications: "",
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
    applicantAgreement: false,
    toc: false,
    date: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !studentAgreement.agree ||
      !studentAgreement.applicantAgreement ||
      !studentAgreement.toc
    ) {
      alert("Please agree to the terms and conditions");
      return;
    }
    if (
      !personalInfo.firstName ||
      !personalInfo.surname ||
      !contactInfo.contactNumber ||
      !contactInfo.email ||
      !personalInfo.dob ||
      !personalInfo.homeAddress ||
      !personalInfo.suburb ||
      !personalInfo.postcode ||
      !personalInfo.state ||
      !contactInfo.countryOfBirth
    ) {
      if (!personalInfo.firstName) {
        alert("Please enter your first name");
      }
      if (!personalInfo.surname) {
        alert("Please enter your surname");
      }
      if (!contactInfo.contactNumber) {
        alert("Please enter your contact number");
      }
      if (!contactInfo.email) {
        alert("Please enter your email");
      }
      if (!personalInfo.dob) {
        alert("Please enter your date of birth");
      }
      if (!personalInfo.homeAddress) {
        alert("Please enter your home address");
      }
      if (!personalInfo.suburb) {
        alert("Please enter your suburb");
      }
      if (!personalInfo.postcode) {
        alert("Please enter your postcode");
      }
      if (!personalInfo.state) {
        alert("Please enter your state");
      }
      if (!contactInfo.countryOfBirth) {
        alert("Please enter your country of birth");
      }

      return;
    }
    setSubmissionLoading(true);
    console.log("previousQualifications", contactInfo.previousQualifications);
    const data = {
      firstName: personalInfo.firstName,
      middleName: personalInfo.middleName,
      lastName: personalInfo.surname,
      USI: personalInfo.USI || "-",
      gender: personalInfo.gender,
      dob: personalInfo.dob,
      homeAddress: personalInfo.homeAddress,
      suburb: personalInfo.suburb,
      postcode: personalInfo.postcode,
      state: personalInfo.state,
      contactNumber: contactInfo.contactNumber,
      email: contactInfo.email,
      countryOfBirth: contactInfo.countryOfBirth,
      australianCitizen: contactInfo.australianCitizen,
      aboriginalOrTorresStraitIslander:
        contactInfo.aboriginalOrTorresStraitIslander,
      englishLevel: contactInfo.englishLevel,
      disability: contactInfo.disability,
      educationLevel: contactInfo.educationLevel,
      previousQualifications: contactInfo.previousQualifications,
      employmentStatus: contactInfo.employmentStatus,
      businessName: employmentDetails.businessName,
      position: employmentDetails.position,
      employersLegalName: employmentDetails.employersLegalName,
      employersAddress: employmentDetails.employersAddress,
      employersContactNumber: employmentDetails.employersContactNumber,
      creditsTransfer: creditsTransfer.creditsTransfer,
      nameOfQualification: creditsTransfer.nameOfQualification,
      YearCompleted: creditsTransfer.YearCompleted,
      agree: studentAgreement.agree,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      //get application id from params of the url

      const id = window.location.pathname.split("/")[2];
      const applicationId = id;
      const response = await studentIntakeForm(data, applicationId);
      console.log(response);
      onSuccess();
      setFormSubmitted(true);
      setSubmissionLoading(false);
      //do timeout of 3 seconds to show success message
      setTimeout(() => {
        navigate("/");
      }, 1000);
      navigate("/");
    } catch (error) {
      setSubmissionLoading(false);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-sm:mt-28">
      <Navbar />
      {submissionLoading && <SpinnerLoader />}
      <Toaster />

      <div className="p-5 lg:w-1/2 mx-auto lg:pt-36 lg:pb-20">
        <div className="flex flex-col items-center text-left w-full shadow-md rounded-2xl p-10 mb-10">
          <h1 className="text-2xl lg:text-3xl font-bold">
            Student Intake Form
          </h1>
          <p className="text-md text-gray-600">
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
