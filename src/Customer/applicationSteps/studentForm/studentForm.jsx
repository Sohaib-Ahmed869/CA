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
import { fetchDashboardData } from "../../../store/Admin/statsActions";
import { useDispatch, useSelector } from "react-redux";

const StudentIntakeForm = () => {
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const dispatch = useDispatch();
  const AdminUserId = import.meta.env.VITE_ADMIN_USER_ID;
  const navigate = useNavigate();
  const onSuccess = () => toast.success("Form submitted successfully");
  const onError = (message) =>
    toast.error(message || "Please fill in all required fields");

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
    australianCitizen: "",
    aboriginalOrTorresStraitIslander: "",
    englishLevel: "",
    disability: "",
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
    creditsTransfer: "No",
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
  const [activeSection, setActiveSection] = useState(1);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePersonalInfo = () => {
    if (!personalInfo.firstName) {
      onError("Please enter your first name");
      return false;
    }
    if (!personalInfo.surname) {
      onError("Please enter your surname");
      return false;
    }
    if (!personalInfo.dob) {
      onError("Please enter your date of birth");
      return false;
    }
    const dobDate = new Date(personalInfo.dob);
    const today = new Date();
    if (dobDate > today) {
      onError("Please enter a valid date of birth");
      return false;
    }
    if (!personalInfo.homeAddress) {
      onError("Please enter your home address");
      return false;
    }
    if (!personalInfo.suburb) {
      onError("Please enter your suburb");
      return false;
    }
    if (!personalInfo.postcode) {
      onError("Please enter your postcode");
      return false;
    }
    if (!personalInfo.state) {
      onError("Please enter your state");
      return false;
    }
    return true;
  };

  const validateContactInfo = () => {
    if (!contactInfo.contactNumber) {
      onError("Please enter your contact number");
      return false;
    }
    if (!contactInfo.email) {
      onError("Please enter your email");
      return false;
    }
    if (!validateEmail(contactInfo.email)) {
      onError("Please enter a valid email address");
      return false;
    }
    if (!contactInfo.countryOfBirth) {
      onError("Please enter your country of birth");
      return false;
    }
    return true;
  };

  const validateAgreements = () => {
    if (
      !studentAgreement.agree ||
      !studentAgreement.applicantAgreement ||
      !studentAgreement.toc
    ) {
      onError("Please agree to all terms and conditions");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !validatePersonalInfo() ||
      !validateContactInfo() ||
      !validateAgreements()
    ) {
      return;
    }

    setSubmissionLoading(true);

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
      await dispatch(fetchDashboardData(AdminUserId));
      //do timeout of 3 seconds to show success message
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setSubmissionLoading(false);
      console.error("Error submitting form:", error);
      onError("An error occurred while submitting the form. Please try again.");
    }
  };

  const renderProgressBar = () => {
    return (
      <div className="w-full mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Personal Info</span>
          <span className="text-sm font-medium">Contact Info</span>
          <span className="text-sm font-medium">Employment</span>
          <span className="text-sm font-medium">Credits</span>
          <span className="text-sm font-medium">Agreement</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${activeSection * 20}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-sm:mt-28 bg-gray-50 min-h-screen">
      <Navbar />
      {submissionLoading && <SpinnerLoader />}
      <Toaster position="top-right" />

      <div className="p-5 lg:w-2/3 mx-auto lg:pt-24 lg:pb-20">
        <div className="flex flex-col items-center text-center w-full shadow-lg rounded-2xl p-10 mb-10 bg-white">
          <h1 className="text-2xl lg:text-3xl font-bold text-green-700">
            Student Intake Form
          </h1>
          <p className="text-md text-gray-600 mt-2">
            Please fill in the form below to complete your enrolment.
          </p>
          {renderProgressBar()}
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className={activeSection === 1 ? "block" : "hidden"}>
              <PersonalInfo
                personalInfo={personalInfo}
                setPersonalInfo={setPersonalInfo}
              />
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  onClick={() => {
                    if (validatePersonalInfo()) setActiveSection(2);
                  }}
                >
                  Next
                </button>
              </div>
            </div>

            <div className={activeSection === 2 ? "block" : "hidden"}>
              <ContactInfo
                contactInfo={contactInfo}
                setContactInfo={setContactInfo}
              />
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  onClick={() => setActiveSection(1)}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  onClick={() => {
                    if (validateContactInfo()) setActiveSection(3);
                  }}
                >
                  Next
                </button>
              </div>
            </div>

            <div className={activeSection === 3 ? "block" : "hidden"}>
              <EmploymentDetails
                employmentDetails={employmentDetails}
                setEmploymentDetails={setEmploymentDetails}
              />
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  onClick={() => setActiveSection(2)}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  onClick={() => setActiveSection(4)}
                >
                  Next
                </button>
              </div>
            </div>

            <div className={activeSection === 4 ? "block" : "hidden"}>
              <CreditsTransfer
                creditsTransfer={creditsTransfer}
                setCreditsTransfer={setCreditsTransfer}
              />
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  onClick={() => setActiveSection(3)}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  onClick={() => setActiveSection(5)}
                >
                  Next
                </button>
              </div>
            </div>

            <div className={activeSection === 5 ? "block" : "hidden"}>
              <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-green-700">
                  {TOC.heading}
                </h2>
                <p className="text-md font-normal mb-2">{TOC.subtitle}</p>
                <p className="text-md font-normal mb-4">{TOC.content1}</p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {TOC.terms.map((term, index) => (
                      <li key={index} className="text-sm">
                        {term}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-md font-normal mb-5">{TOC.content2}</p>
              </div>

              <StudentAgreement
                studentAgreement={studentAgreement}
                setStudentAgreement={setStudentAgreement}
              />

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  onClick={() => setActiveSection(4)}
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentIntakeForm;
