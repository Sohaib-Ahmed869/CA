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
                  {item.time ? (
                    <BiCheck className="text-white bg-green-500 rounded-full" />
                  ) : (
                    <BsClock className="text-gray-500 bg-gray-200 rounded-full" />
                  )}
                </div>
                <div className="text-sm text-gray-500 mt-2 text-center">
                  <p>{item.statusname}</p>
                  {item.time && <p>{item.time.split("T")[0]}</p>}
                  {!item.time && <p>Not Started</p>}
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

  const Application = ({ application, setSelectedApplication }) => {
    const [viewIntakeForm, setViewIntakeForm] = useState(false);

    return (
      <div className="min-h-screen">
        <button onClick={() => setSelectedApplication(null)} className="btn-sm">
          Back
        </button>
        <div className="flex flex-col items-center justify-center p-16">
          <div className="col-span-4 text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Application# {application.applicationId}
            </h1>
            <p className="text-sm text-gray-500">
              This application was submitted by {application.user.firstName}{" "}
              {application.user.lastName} on{" "}
              {application.status[0].time.split("T")[0]}
            </p>
            <h1 className="text-lg font-semibold text-gray-800 mt-4">
              {application.isf.lookingForWhatQualification}
            </h1>
          </div>

          <div className="col-span-4 bg-white p-4 rounded-lg shadow-lg w-full">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm text-gray-500">
                <h2 className="text-lg font-semibold text-gray-800">
                  Initial Screening Information
                </h2>
                <p>First Name: {application.user.firstName}</p>
                <p>Last Name: {application.user.lastName}</p>
                <p>Email: {application.user.email}</p>
                <p>Country: {application.user.country}</p>
                <p>State: {application.isf.state}</p>
                <p>Industry: {application.isf.industry}</p>
                <p>Qualification: {application.isf.qualification || "N/A"}</p>
                <p>Years of Experience: {application.isf.yearsOfExperience}</p>
                <p>
                  Location of Experience: {application.isf.locationOfExperience}
                </p>
                <p>
                  Formal Education:{" "}
                  {application.isf.formalEducation ? "Yes" : "No"} -{" "}
                  {application.isf.formalEducationAnswer || "N/A"}
                </p>

                <p>
                  Terms and Conditions:{" "}
                  {application.user.toc ? "Agreed" : "Not Agreed"}
                </p>
              </div>
              <div className="text-sm text-gray-500 flex justify-end">
                <button
                  onClick={() => setViewIntakeForm(true)}
                  className="btn-sm rounded-xl flex items-center gap-2 bg-gray-200 px-4 py-2 m-2"
                >
                  View Info
                </button>
              </div>
            </div>
          </div>

          <Timeline timeline={application.status} />

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
                  {/* <button
                    onClick={onClickDownloadIntakeForm}
                    className=" text-black btn-sm rounded-xl flex items-center gap-2 bg-gray-200 px-4 py-2 m-2 disabled:opacity-50"
                  >
                    <GrDocumentDownload />
                    Download Intake Form
                  </button> */}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm text-gray-500">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Personal Information
                    </h2>
                    <p>First Name: {application.user.firstName}</p>
                    <p>Last Name: {application.user.lastName}</p>
                    {/* <p>USI: {application.isf.USI}</p> */}
                    <p>State: {application.isf.state}</p>
                    <p>
                      Location Of Experience:{" "}
                      {application.isf.locationOfExperience}
                    </p>
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
