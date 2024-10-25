import React, { useState } from "react";

const FormalEducationScreen = ({
  formalEducation,
  setFormalEducation,
  formalEducationAnswer,
  setFormalEducationAnswer,
}) => {
  return (
    <div className="flex flex-col items-center animate-fade">
      <div className="flex flex-col items-center">
        <label htmlFor="formalEducation">
          Do you have any formal qualifications?
        </label>
        <select
          id="formalEducation"
          value={formalEducation}
          className="input w-96 mt-2 mb-2"
          onChange={(e) => setFormalEducation(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      {formalEducation === "Yes" && (
        <div className="flex flex-col items-center">
          <label htmlFor="formalEducationAnswer">
            What qualifications do you have?
          </label>
          <input
            id="formalEducationAnswer"
            className="input w-96 mt-2 mb-2"
            value={formalEducationAnswer}
            onChange={(e) => setFormalEducationAnswer(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default FormalEducationScreen;
