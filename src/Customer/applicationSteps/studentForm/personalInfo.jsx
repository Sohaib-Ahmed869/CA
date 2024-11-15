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
          label="USI (Only for people living in Australia)"
          value={personalInfo.USI}
          onChange={handleChange}
        />
        <div className="flex flex-col">
          <label htmlFor="gender">Gender</label>
          <select
            onChange={handleChange}
            value={personalInfo.gender}
            name="gender"
            id="gender"
            className="input mt-2 p-2"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <FloatingLabelInput
          name="dob"
          type="date"
          id="dob"
          label="Date of Birth"
          value={personalInfo.dob}
          onChange={handleChange}
        />
        <FloatingLabelInput
          name="homeAddress"
          type="text"
          id="homeAddress"
          label="Home Address"
          value={personalInfo.homeAddress}
          onChange={handleChange}
        />
        <FloatingLabelInput
          name="suburb"
          type="text"
          id="suburb"
          label="Suburb"
          value={personalInfo.suburb}
          onChange={handleChange}
        />
        <FloatingLabelInput
          name="postcode"
          type="text"
          id="postcode"
          label="Postcode"
          value={personalInfo.postcode}
          onChange={handleChange}
        />
        <FloatingLabelInput
          name="state"
          type="text"
          id="state"
          label="State"
          value={personalInfo.state}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
