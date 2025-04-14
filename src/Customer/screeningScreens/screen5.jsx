import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import countryList from "react-select-country-list";
import PasswordStrengthBar from "react-password-strength-bar";

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
  const [showPassword, setShowPassword] = useState(false);
  const countries = countryList().getData();
  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let newPassword = "";
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

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

        <div className="flex flex-col lg:w-1/2 w-full relative">
          <label htmlFor="password">Create Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            className="input mt-2 "
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {password && (
            <span className="absolute top-full left-3 right-3 ">
              <PasswordStrengthBar
                password={password}
                className="size-full mt-3"
              />
            </span>
          )}
          {showPassword ? (
            <IoMdEye
              className="absolute  right-3 top-12 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <IoMdEyeOff
              className="absolute  right-3 top-12 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}

          <span
            type="button"
            className=" absolute top-[90%] left-12 text-gray-500 text-sm   mt-6 rounded cursor-pointer  text-center"
            onClick={generatePassword}
          >
            Auto Generate Password
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mb-5 mt-3 lg:flex-row flex-col">
        <div className="flex flex-col lg:w-1/2 w-full ">
          <label htmlFor="phone">Phone</label>
          <PhoneInput
            country={"au"} // Default country
            value={phone}
            onChange={(phone) => setPhone(phone)}
            autoFormat={false}
            disableCountryCode={false}
            className="  rounded-md    mt-2   focus:border-gray-300 focus:ring-0"
            inputStyle={{
              width: "100%",
              padding: "1.4rem  3rem",
              border: "none",
              borderRadius: "0.38rem",
            }}
            placeholder="Enter phone number"
          />
        </div>
        <div className="flex flex-col lg:w-1/2 w-full">
          <label
            htmlFor="country"
            className="text-gray-700 text-sm font-medium"
          >
            Country
          </label>

          <select
            id="country"
            className="mt-2 w-full px-2 py-[11px] border-0 rounded-lg text-base text-gray-500 leading-normal focus:border-gray-300 focus:ring-0"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="" disabled>
              -- Select a Country --
            </option>
            {countries.map((country) => (
              <option key={country.label} value={country.label}>
                {country.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col lg:w-full w-full">
        <label htmlFor="questions">Questions</label>
        <textarea
          id="questions"
          rows={4}
          value={questions}
          className="textarea mt-2 mb-5 rounded-md  focus:border-gray-300 focus:ring-0"
          placeholder="Any questions for us?"
          onChange={(e) => setQuestions(e.target.value)}
        />
      </div>
      {/* </div> */}
      <div className="flex items-center lg:w-full">
        <input
          id="toc"
          type="checkbox"
          className="mr-2"
          checked={toc}
          onChange={(e) => setToc(e.target.checked)}
        />
        <label htmlFor="toc">
          I agree to let Certified Australia contact me about the qualification
          or services it provides.
        </label>
      </div>
    </div>
  );
};

export default FinalScreen;
