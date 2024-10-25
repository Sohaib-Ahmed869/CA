import React, { useState } from "react";
import FloatingLabelInput from "../../components/floatingLabelInput";

const PersonalInfo = ({ personalInfo, setPersonalInfo }) => {
  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-5">Personal Information</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FloatingLabelInput
          name="firstName"
          type="text"
          id="firstName"
          label="First Name"
          value={personalInfo.firstName}
          onChange={handleChange}
        />
        <FloatingLabelInput
          name="middleName"
          type="text"
          id="middleName"
          label="Middle Name"
          value={personalInfo.middleName}
          onChange={handleChange}
        />
        <FloatingLabelInput
          name="surname"
          type="text"
          id="surname"
          label="Surname"
          value={personalInfo.surname}
          onChange={handleChange}
        />
        <FloatingLabelInput
          name="USI"
          type="text"
          id="USI"
          label="USI"
          value={personalInfo.USI}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PersonalInfo;