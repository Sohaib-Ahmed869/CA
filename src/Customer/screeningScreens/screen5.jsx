import React, { useState } from "react";

const FinalScreen = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
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
    <div className="flex flex-col p-10 w-full justify-between animate-fade">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex flex-col w-1/2">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            value={firstName}
            className="input mt-2"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-1/2">
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
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex flex-col w-1/2">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            value={phone}
            className="input mt-2"
            placeholder="Phone number"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-1/2">
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
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex flex-col w-1/2">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            value={country}
            className="input mt-2"
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="questions">Questions</label>
          <input
            id="questions"
            value={questions}
            className="input mt-2"
            placeholder="Questions"
            onChange={(e) => setQuestions(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center">
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
          or services it provide.
        </label>
      </div>
    </div>
  );
};

export default FinalScreen;