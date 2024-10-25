import React, { useState } from "react";
import FloatingLabelInput from "../../components/floatingLabelInput";

const EmploymentDetails = ({ employmentDetails, setEmploymentDetails }) => {
  const handleChange = (e) => {
    setEmploymentDetails({
      ...employmentDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-5">Employment Details</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FloatingLabelInput
          name="businessName"
          type="text"
          id="businessName"
          label="Business Name"
          value={employmentDetails.businessName}
          onChange={handleChange}
        />
        <FloatingLabelInput
          name="position"
          type="text"
          id="position"
          label="Position"
          value={employmentDetails.position}
          onChange={handleChange}
        />
        <FloatingLabelInput
          name="employersLegalName"
          type="text"
          id="employersLegalName"
          label="Employer's Legal Name"
          value={employmentDetails.employersLegalName}
          onChange={handleChange}
        />
        <FloatingLabelInput
          name="employersAddress"
          type="text"
          id="employersAddress"
          label="Employer's Address"
          value={employmentDetails.employersAddress}
          onChange={handleChange}
        />
        <FloatingLabelInput
          name="employersContactNumber"
          type="text"
          id="employersContactNumber"
          label="Employer's Contact Number"
          value={employmentDetails.employersContactNumber}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default EmploymentDetails;