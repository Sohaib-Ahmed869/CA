import React, { useEffect, useState } from "react";
import FloatingLabelInput from "../../components/floatingLabelInput";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ContactInfo = ({ contactInfo, setContactInfo }) => {
  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(contactInfo.phone);
  }, [contactInfo.phone]);

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-5">Contact Information</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col">
          <label htmlFor="phone">Phone Number</label>
          <PhoneInput
            country={"au"}
            value={contactInfo.contactNumber}
            onChange={(phone) =>
              setContactInfo({ ...contactInfo, contactNumber: phone })
            }
            inputClass="input p-0 mt-2"
          />
        </div>
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
        <div className="flex flex-col">
          <label htmlFor="questions">Are you an Australian citizen?</label>
          <select
            id="questions"
            value={contactInfo.australianCitizen}
            className="input p-0 mt-2"
            onChange={(e) =>
              setContactInfo({
                ...contactInfo,
                australianCitizen: e.target.value,
              })
            }
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="questions">
            Are you an Aboriginal or Torres Strait Islander?
          </label>
          <select
            id="questions"
            value={contactInfo.aboriginalOrTorresStraitIslander}
            className="input p-0 mt-2"
            onChange={(e) =>
              setContactInfo({
                ...contactInfo,
                aboriginalOrTorresStraitIslander: e.target.value,
              })
            }
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <FloatingLabelInput
          name="previousQualifications"
          type="text"
          id="previousQualifications"
          label="Previous Qualifications"
          value={contactInfo.previousQualifications}
          onChange={handleChange}
        />
        <FloatingLabelInput
          name="employmentStatus"
          type="text"
          id="employmentStatus"
          label="Employment Status"
          value={contactInfo.employmentStatus}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="questions">Do you have a disability?</label>
        <select
          id="questions"
          value={contactInfo.disability}
          className="input mt-2 p-0"
          onChange={(e) =>
            setContactInfo({
              ...contactInfo,
              disability: e.target.value,
            })
          }
        >
          <option value="">Select an option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
    </div>
  );
};

export default ContactInfo;
