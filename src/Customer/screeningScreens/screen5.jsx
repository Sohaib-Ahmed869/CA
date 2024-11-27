import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import countryList from "react-select-country-list";

const FinalScreen = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  password,
  setPassword,
  phone,
  setPhone,
  email,
  setEmail,
  country,
  setCountry,
  questions,
  setQuestions,
  toc,
  setToc,
}) => {
  return (
    <div className="flex flex-col lg:p-10 p-4 w-full justify-between animate-fade">
      <div className="flex items-center justify-between gap-4 mb-5 lg:flex-row flex-col">
        <div className="flex flex-col lg:w-1/2 w-full">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            value={firstName}
            className="input mt-2"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col lg:w-1/2 w-full">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            className="input mt-2"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 mb-5 lg:flex-row flex-col">
        <div className="flex flex-col w-full">
          <label htmlFor="password">Create Password</label>
          <input
            type="password"
            id="password"
            value={password}
            className="input mt-2"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mb-5 lg:flex-row flex-col">
        <div className="flex flex-col lg:w-1/2 w-full">
          <label htmlFor="phone">Phone</label>
          <PhoneInput
            country={"au"} // Default country
            value={phone}
            onChange={(phone) => setPhone(phone)}
            autoFormat={false}
            disableCountryCode={false}
            inputClass="input mt-2 p-2" // Apply custom input class if necessary
            inputStyle={{
              width: "100%",
              borderRadius: "0.25rem",
            }}
            placeholder="Enter phone number"
          />
        </div>
        <div className="flex flex-col lg:w-1/2 w-full">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={email}
            className="input mt-2"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 mb-5 lg:flex-row flex-col">
        <div className="flex flex-col lg:w-1/2 w-full ">
          <label htmlFor="country">Country</label>
          <Select
            options={countryList().getData()}
            value={country}
            onChange={(e) => setCountry(e)}
          />
        </div>
        <div className="flex flex-col lg:w-1/2 w-full">
          <label htmlFor="questions">Questions</label>
          <input
            id="questions"
            value={questions}
            className="input mt-2"
            placeholder="Any questions for us?"
            onChange={(e) => setQuestions(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center lg:w-full">
        <input
          id="toc"
          type="checkbox"
          className="mr-2"
          checked={toc}
          onChange={(e) => setToc(e.target.checked)}
        />
        <label htmlFor="toc">
          {" "}
          I agree to let Certified Australia contact me about the qualification
          or services it provides.
        </label>
      </div>
    </div>
  );
};

export default FinalScreen;
