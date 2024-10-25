import React, { useState } from "react";
import FloatingLabelInput from "../../components/floatingLabelInput";

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
      <h2 className="text-2xl font-semibold mb-5">Student Agreement</h2>
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
            I agree to the terms and conditions
          </label>
        </div>
        <div className="animate-fade animate-one">
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
        </div>
      </div>
    </div>
  );
};

export default StudentAgreement;
