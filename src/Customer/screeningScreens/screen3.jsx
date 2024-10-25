import React, { useState } from "react";

const StateScreen = ({ state, setState }) => {
  const stateOptions = [
    "New South Wales",
    "Victoria",
    "Queensland",
    "South Australia",
    "Western Australia",
    "Australian Capital Territory",
    "Nothern Territory",
    "Tasmania",
  ];
  return (
    <div className="flex flex-col items-center animate-fade">
      <div className="flex flex-col items-center">
        <label htmlFor="state">Which State do you live in?</label>
        <div className="grid grid-cols-4 gap-5 m-5">
          {stateOptions.map((option, index) => (
            <div
              key={index}
              className={`flex items-center bg-white p-3 rounded-md cursor-pointer text-center ${
                state === option ? "bg-green-500 text-white" : "bg-white"
              }`}
              onClick={() => setState(option)}
            >
              <p className="text-center w-full">{option}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StateScreen;
