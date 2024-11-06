import React, { useState } from "react";
import FloatingLabelInput from "../../components/floatingLabelInput";
import studentAgreement from "../../../assets/1.pdf";
import studentApplicantAgreement from "../../../assets/2.pdf";
import TOC from "../../../assets/3.pdf";

const StudentAgreement = ({ studentAgreement, setStudentAgreement }) => {
  const handleChange = (e) => {
    setStudentAgreement({
      ...studentAgreement,
      [e.target.name]: e.target.value,
    });
    console.log(studentAgreement);
  };

  const handleCheckbox = (e) => {
    setStudentAgreement({
      ...studentAgreement,
      [e.target.name]: e.target.checked,
    });
    console.log(studentAgreement);
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-5">Student Agreements</h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
        <div className="gap-1 flex items-center">
          <input
            type="checkbox"
            name="agree"
            id="agree"
            value={studentAgreement.agree}
            onChange={handleCheckbox}
          />
          <label className="text-md text-gray-600">
            I agree to the{" "}
            <span>
              <a
                href={studentApplicantAgreement}
                target="_blank"
                rel="noreferrer"
                className="text-md text-blue-500"
              >
                Student Agreement
              </a>
            </span>
          </label>
        </div>
        <div className="gap-1 flex items-center">
          <input
            type="checkbox"
            name="applicantAgreement"
            id="applicantAgreement"
            value={studentAgreement.applicantAgreement}
            onChange={handleCheckbox}
          />
          <label className="text-md text-gray-600">
            I agree to the{" "}
            <span>
              {" "}
              <a
                href={
                  studentAgreement.applicantAgreement
                    ? studentAgreement.applicantAgreement
                    : studentAgreement.applicantAgreement
                }
                target="_blank"
                rel="noreferrer"
                className="text-md text-blue-500"
              >
                Student Applicant Agreement
              </a>
            </span>
          </label>
        </div>
        <div className="gap-1 flex items-center">
          <input
            type="checkbox"
            name="toc"
            id="toc"
            value={studentAgreement.toc}
            onChange={handleCheckbox}
          />
          <label className="text-md text-gray-600">
            I agree to the{" "}
            <span>
              <a
                href={
                  studentAgreement.toc
                    ? studentAgreement.toc
                    : studentAgreement.toc
                }
                target="_blank"
                rel="noreferrer"
                className="text-md text-blue-500"
              >
                Terms and Conditions
              </a>
            </span>
          </label>
        </div>
        {/* <div className="animate-fade animate-one">
          {studentAgreement.agree ? (
            <FloatingLabelInput
              name="date"
              type="date"
              id="date"
              label="Date"
              value={studentAgreement.date}
              onChange={handleChange}
            />
          ) : null}
        </div> */}
      </div>
    </div>
  );
};

export default StudentAgreement;
