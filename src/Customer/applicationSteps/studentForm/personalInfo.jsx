import React, { useState } from "react";
import FloatingLabelInput from "../../components/floatingLabelInput";
import { FaInfoCircle } from "react-icons/fa";
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
          label="Middle Name (optional)"
          value={personalInfo.middleName}
          onChange={handleChange}
          required={false}
        />
        <FloatingLabelInput
          name="surname"
          type="text"
          id="surname"
          label="Surname"
          value={personalInfo.surname}
          onChange={handleChange}
        />
        <div className="relative flex items-center gap-2">
          <FloatingLabelInput
            name="USI"
            type="text"
            id="USI"
            label="USI (Only for people living in Australia)"
            value={personalInfo.USI}
            onChange={handleChange}
            required={false}
          />
          <div className="relative group">
            <p className="  text-gray-400  text-lg rounded-full h-6 w-6 flex items-center justify-center cursor-pointer">
              <FaInfoCircle />
            </p>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-max bg-gray-800 text-white text-xs rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              If you don’t know your USI or don’t have one, use{" "}
              <a
                href="https://www.usi.gov.au/students/find-your-usi"
                className="text-blue-400 underline"
              >
                this link
              </a>
              .
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="gender" className=" text-xs text-gray-500">
            Gender
          </label>
          <select
            onChange={handleChange}
            value={personalInfo.gender}
            name="gender"
            id="gender"
            className="input mt-2 p-2 text-sm"
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
