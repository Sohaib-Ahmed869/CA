import React from "react";
import { useState } from "react";
import jsPDF from "jspdf";
import Navbar from "../../Customer/components/navbar";
import { GrDocumentDownload } from "react-icons/gr";
import { BiCheck } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

const Timeline = ({ timeline }) => {
  return (
    <div className="col-span-4 bg-white p-4 rounded-lg shadow-lg mt-10 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Timeline</h2>
      <div className="flex items-center justify-between max-md:grid max-md:grid-cols-3">
        {timeline.map((item, index) => (
          <div key={index} className="flex items-center">
            {/* Icon and Text */}
            <div className="flex flex-col items-center">
              <div className="text-2xl">
                {item.date ? (
                  <BiCheck className="text-white bg-green-500 rounded-full" />
                ) : (
                  <BsClock className="text-gray-500 bg-gray-200 rounded-full" />
                )}
              </div>
              <div className="text-sm text-gray-500 mt-2 text-center">
                <p>{item.status}</p>
                {item.date && <p>{item.date}</p>}
                {!item.date && <p>---</p>}
              </div>
            </div>

            {/* Line between items */}
            {index !== timeline.length - 1 && (
              <div className="flex items-center ml-4 mr-4">
                <FaArrowRightLong className="text-gray-500" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Application = () => {
  const [application, setApplication] = useState({
    applicationId: 12351,
    firstName: "Sara",
    lastName: "Johnson",
    email: "sara@gmail.com",
    country: "Australia",
    state: "NSW",
    industry: "Technology",
    qualification: "Bachelor's in Computer Science",
    yearsOfExperience: 5,
    locationOfExperience: "Sydney",
    formalEducation: true,
    formalEducationAnswer: "Yes, attended University of Sydney",
    questions: [""],
    toc: true,
    studentIntakeForm: {
      firstName: "Sara",
      lastName: "Johnson",
      surname: "Johnson",
      USI: "123456789",
      gender: "Female",
      dob: "01/01/1990",
      homeAddress: "123 Main St",
      suburb: "Sydney",
      postcode: "2000",
      state: "NSW",
      contactNumber: "+61-123-456-7890",
      email: "sara@gmail.com",
      countryOfBirth: "Australia",
      australianCitizen: true,
      aboriginalOrTorresStraitIslander: false,
      englishLevel: "Advanced",
      disability: false,
      educationLevel: "Bachelor's",
      previousQualifications: ["Bachelor's in Computer Science"],
      employmentStatus: "Employed",
      businessName: "Logistics Inc",
      position: "Software Engineer",
      employersLegalName: "Logistics Inc",
      employersAddress: "123 Business St",
      employersContactNumber: "+61-234-567-8901",
      creditsTransfer: false,
      nameOfQualification: "",
      YearCompleted: "",
      agree: true,
      date: "01/01/2024",
    },

    status: "Sent to RTO",
    paymentStatus: true,
    timeline: [
      {
        status: "Submitted",
        date: "01/01/2024",
      },
      {
        status: "Waiting for Payment",
        date: "01/01/2024",
      },
      {
        status: "Payment Received",
        date: "10/01/2024",
      },
      {
        status: "Student Intake Form Fill",
        date: "15/01/2024",
      },
      {
        status: "Documents Uploaded",
        date: "20/01/2024",
      },
      {
        status: "Sent to RTO",
        date: "25/01/2024",
      },
      {
        status: "Certification Generated",
        date: null,
      },
      {
        status: "Dispatched",
        date: null,
      },
      {
        status: "Completed",
        date: null,
      },
    ],
  });

  const onClickDownloadIntakeForm = () => {
    //convert the application object to a PDF file
    console.log("Download Intake Form");

    // Create a new PDF document
    const doc = new jsPDF();

    //set the font size
    doc.setFontSize(12);

    doc.text("Student Intake Form", 10, 10);

    doc.text("Personal Information", 10, 20);
    doc.text(`First Name: ${application.studentIntakeForm.firstName}`, 10, 30);
    doc.text(`Last Name: ${application.studentIntakeForm.lastName}`, 10, 40);
    doc.text(`Surname: ${application.studentIntakeForm.surname}`, 10, 50);
    doc.text(`USI: ${application.studentIntakeForm.USI}`, 10, 60);
    doc.text(`Gender: ${application.studentIntakeForm.gender}`, 10, 70);
    doc.text(`DOB: ${application.studentIntakeForm.dob}`, 10, 80);
    doc.text(
      `Home Address: ${application.studentIntakeForm.homeAddress}`,
      10,
      90
    );
    doc.text(`Suburb: ${application.studentIntakeForm.suburb}`, 10, 100);
    doc.text(`Postcode: ${application.studentIntakeForm.postcode}`, 10, 110);
    doc.text(`State: ${application.studentIntakeForm.state}`, 10, 120);

    doc.text("Contact Information", 10, 130);
    doc.text(
      `Contact Number: ${application.studentIntakeForm.contactNumber}`,
      10,
      140
    );
    doc.text(`Email: ${application.studentIntakeForm.email}`, 10, 150);
    doc.text(
      `Country of Birth: ${application.studentIntakeForm.countryOfBirth}`,
      10,
      160
    );
    doc.text(
      `Australian Citizen: ${
        application.studentIntakeForm.australianCitizen ? "Yes" : "No"
      }`,
      10,
      170
    );
    doc.text(
      `Aboriginal or Torres Strait Islander: ${
        application.studentIntakeForm.aboriginalOrTorresStraitIslander
          ? "Yes"
          : "No"
      }`,
      10,
      180
    );
    doc.text(
      `English Level: ${application.studentIntakeForm.englishLevel}`,
      10,
      190
    );
    doc.text(
      `Disability: ${application.studentIntakeForm.disability ? "Yes" : "No"}`,
      10,
      200
    );
    doc.text(
      `Education Level: ${application.studentIntakeForm.educationLevel}`,
      10,
      210
    );
    doc.text(
      `Previous Qualifications: ${application.studentIntakeForm.previousQualifications.join(
        ", "
      )}`,
      10,
      220
    );
    doc.text(
      `Employment Status: ${application.studentIntakeForm.employmentStatus}`,
      10,
      230
    );

    //start a new page
    doc.addPage();

    doc.text("Employment Information", 10, 30);
    doc.text(
      `Business Name: ${application.studentIntakeForm.businessName}`,
      10,
      50
    );
    doc.text(`Position: ${application.studentIntakeForm.position}`, 10, 60);
    doc.text(
      `Employers Legal Name: ${application.studentIntakeForm.employersLegalName}`,
      10,
      70
    );
    doc.text(
      `Employers Address: ${application.studentIntakeForm.employersAddress}`,
      10,
      80
    );
    doc.text(
      `Employers Contact Number: ${application.studentIntakeForm.employersContactNumber}`,
      10,
      90
    );
    doc.text(
      `Credits Transfer: ${
        application.studentIntakeForm.creditsTransfer ? "Yes" : "No"
      }`,
      10,
      100
    );
    doc.text(
      `Name of Qualification: ${application.studentIntakeForm.nameOfQualification}`,
      10,
      110
    );
    doc.text(
      `Year Completed: ${application.studentIntakeForm.YearCompleted}`,
      10,
      120
    );

    doc.text("Student Agreement", 10, 130);
    doc.text(
      "I agree to the terms and conditions outlined in the student agreement.",
      10,
      140
    );
    doc.text(`Date: ${application.studentIntakeForm.date}`, 10, 150);

    // Save the PDF
    doc.save("StudentIntakeForm.pdf");
  };

  const [viewIntakeForm, setViewIntakeForm] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center p-16">
        <div className="col-span-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Application# {application.applicationId}
          </h1>
          <p className="text-sm text-gray-500">
            This application was submitted by{" "}
            {application.studentIntakeForm.firstName}{" "}
            {application.studentIntakeForm.lastName} on{" "}
            {application.studentIntakeForm.date}.
          </p>
        </div>

        <div className="col-span-4 bg-white p-4 rounded-lg shadow-lg w-full">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-sm text-gray-500">
              <h2 className="text-lg font-semibold text-gray-800">
                Initial Screening Information
              </h2>
              <p>First Name: {application.firstName}</p>
              <p>Last Name: {application.lastName}</p>
              <p>Email: {application.email}</p>
              <p>Country: {application.country}</p>
              <p>State: {application.state}</p>
              <p>Industry: {application.industry}</p>
              <p>Qualification: {application.qualification}</p>
              <p>Years of Experience: {application.yearsOfExperience}</p>
              <p>Location of Experience: {application.locationOfExperience}</p>
              <p>
                Formal Education: {application.formalEducation ? "Yes" : "No"} -{" "}
                {application.formalEducationAnswer}
              </p>
              <p>Questions: {application.questions.join(", ")}</p>
              <p>
                Terms and Conditions:{" "}
                {application.toc ? "Agreed" : "Not Agreed"}
              </p>
            </div>
            <div className="text-sm text-gray-500 flex justify-end">
              <button
                onClick={() => setViewIntakeForm(true)}
                className="btn-sm rounded-xl flex items-center gap-2 bg-gray-200 px-4 py-2 m-2"
              >
                View Intake Form
              </button>
            </div>
          </div>
        </div>

        <Timeline timeline={application.timeline} />

        {viewIntakeForm && (
          <dialog className="modal modal-open">
            <div className="col-span-4 bg-white p-4 rounded-lg shadow-lg">
              <button
                onClick={() => setViewIntakeForm(false)}
                className="mt-4 mr-4 float-right"
              >
                <FaTimes className="text-lg" />
              </button>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Student Intake Form
                </h2>
                <button
                  onClick={onClickDownloadIntakeForm}
                  className=" text-black btn-sm rounded-xl flex items-center gap-2 bg-gray-200 px-4 py-2 m-2 disabled:opacity-50"
                >
                  <GrDocumentDownload />
                  Download Intake Form
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm text-gray-500">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Personal Information
                  </h2>
                  <p>First Name: {application.studentIntakeForm.firstName}</p>
                  <p>Last Name: {application.studentIntakeForm.lastName}</p>
                  <p>Surname: {application.studentIntakeForm.surname}</p>
                  <p>USI: {application.studentIntakeForm.USI}</p>
                  <p>Gender: {application.studentIntakeForm.gender}</p>
                  <p>DOB: {application.studentIntakeForm.dob}</p>
                  <p>
                    Home Address: {application.studentIntakeForm.homeAddress}
                  </p>
                  <p>Suburb: {application.studentIntakeForm.suburb}</p>
                  <p>Postcode: {application.studentIntakeForm.postcode}</p>
                  <p>State: {application.studentIntakeForm.state}</p>
                </div>

                <div className="text-sm text-gray-500">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Contact Information
                  </h2>
                  <p>
                    Contact Number:{" "}
                    {application.studentIntakeForm.contactNumber}
                  </p>
                  <p>Email: {application.studentIntakeForm.email}</p>
                  <p>
                    Country of Birth:{" "}
                    {application.studentIntakeForm.countryOfBirth}
                  </p>
                  <p>
                    Australian Citizen:{" "}
                    {application.studentIntakeForm.australianCitizen
                      ? "Yes"
                      : "No"}
                  </p>
                  <p>
                    Aboriginal or Torres Strait Islander:{" "}
                    {application.studentIntakeForm
                      .aboriginalOrTorresStraitIslander
                      ? "Yes"
                      : "No"}
                  </p>
                  <p>
                    English Level: {application.studentIntakeForm.englishLevel}
                  </p>
                  <p>
                    Disability:{" "}
                    {application.studentIntakeForm.disability ? "Yes" : "No"}
                  </p>
                  <p>
                    Education Level:{" "}
                    {application.studentIntakeForm.educationLevel}
                  </p>
                  <p>
                    Previous Qualifications:{" "}
                    {application.studentIntakeForm.previousQualifications.join(
                      ", "
                    )}
                  </p>
                  <p>
                    Employment Status:{" "}
                    {application.studentIntakeForm.employmentStatus}
                  </p>
                </div>

                <div className="text-sm text-gray-500">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Employment Information
                  </h2>
                  <p>
                    Business Name: {application.studentIntakeForm.businessName}
                  </p>
                  <p>Position: {application.studentIntakeForm.position}</p>
                  <p>
                    Employers Legal Name:{" "}
                    {application.studentIntakeForm.employersLegalName}
                  </p>
                  <p>
                    Employers Address:{" "}
                    {application.studentIntakeForm.employersAddress}
                  </p>
                  <p>
                    Employers Contact Number:{" "}
                    {application.studentIntakeForm.employersContactNumber}
                  </p>
                  <p>
                    Credits Transfer:{" "}
                    {application.studentIntakeForm.creditsTransfer
                      ? "Yes"
                      : "No"}
                  </p>
                  <p>
                    Name of Qualification:{" "}
                    {application.studentIntakeForm.nameOfQualification}
                  </p>
                  <p>
                    Year Completed:{" "}
                    {application.studentIntakeForm.YearCompleted}
                  </p>
                </div>

                <div className="text-sm text-gray-500">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Student Agreement
                  </h2>
                  <p>
                    I agree to the terms and conditions outlined in the student
                    agreement.
                  </p>
                  <p>Date: {application.studentIntakeForm.date}</p>
                </div>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default Application;
