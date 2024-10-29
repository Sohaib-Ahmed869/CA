import React, { useState } from "react";
import FloatingLabelInput from "../../components/floatingLabelInput";

const CreditsTransfer = ({ creditsTransfer, setCreditsTransfer }) => {
  const handleChange = (e) => {
    setCreditsTransfer({ ...creditsTransfer, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-5">Credits Transfer</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <label htmlFor="creditsTransfer" className="text-sm">
          Do you have credits to transfer?
        </label>
        <select
          name="creditsTransfer"
          id="creditsTransfer"
          className=" text-sm input input-sm border-none rounded-md"
          value={creditsTransfer.creditsTransfer}
          onChange={handleChange}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <FloatingLabelInput
          name="nameOfQualification"
          type="text"
          id="nameOfQualification"
          label="Name of Qualification"
          value={creditsTransfer.nameOfQualification}
          onChange={handleChange}
        />
        <FloatingLabelInput
          name="YearCompleted"
          type="text"
          id="YearCompleted"
          label="Year Completed"
          value={creditsTransfer.YearCompleted}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CreditsTransfer;
