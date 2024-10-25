import React, { useState } from "react";
import FloatingLabelInput from "../../components/floatingLabelInput";

const ContactInfo = ({ contactInfo, setContactInfo }) => {
  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-5">Contact Information</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FloatingLabelInput
          name="contactNumber"
          type="text"
          id="contactNumber"
          label="Contact Number"
          value={contactInfo.contactNumber}
          onChange={handleChange}
        />
        <FloatingLabelInput
          name="email"
          type="email"
          id="email"
          label="Email"
          value={contactInfo.email}
          onChange={handleChange}
        />
        <FloatingLabelInput
          name="countryOfBirth"
          type="text"
          id="countryOfBirth"
          label="Country of Birth"
          value={contactInfo.countryOfBirth}
          onChange={handleChange}
        />
        <FloatingLabelInput
          name="englishLevel"
          type="text"
          id="englishLevel"
          label="English Level"
          value={contactInfo.englishLevel}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ContactInfo;
