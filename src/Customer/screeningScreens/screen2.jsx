import React, { useState } from "react";

const Screen2 = ({
  yearsOfExperience,
  setYearsOfExperience,
  locationOfExperience,
  setLocationOfExperience,
}) => {
  const [options, setOptions] = useState([
    "1-2 years",
    "3-4 years",
    "5-9 years",
    "10+ years",
  ]);


  const locationOptions = ["Australia", "Overseas", "Both"];



  return (
    <div className="flex flex-col items-center animate-fade">
      <div className="flex flex-col items-center">
        <label htmlFor="yearsOfExperience">Years of Experience</label>
        <div className="flex items-center gap-5 m-5">
          {options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center bg-white p-3 rounded-md cursor-pointer ${
                yearsOfExperience === option
                  ? "bg-green-500 text-white"
                  : "bg-white"
              }`}
              onClick={() => setYearsOfExperience(option)}
            >
              <p>{option}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="locationOfExperience">Location of Experience</label>
        <div className="flex items-center gap-5 m-5">
          {locationOptions.map((option, index) => (
            <div
              key={index}
              className={`flex items-center bg-white p-3 rounded-md cursor-pointer ${
                locationOfExperience === option
                  ? "bg-green-500 text-white"
                  : "bg-white"
              }`}
              onClick={() => setLocationOfExperience(option)}
            >
              <p>{option}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Screen2;
