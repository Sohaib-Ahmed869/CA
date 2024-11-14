import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const SpinnerLoader = () => {
  const loadingPrompts = [
    "Loading, please wait...",
    "Just a moment, we're processing your request...",
    "Hang tight, we're getting things ready...",
    "This won't take long...",
    "Almost there, thanks for your patience...",
    "Preparing everything for you...",
    "Loading your experience...",
    "Getting things set up...",
    "Please hold on while we load your data...",
    "Making sure everything's ready...",
    "Bringing things together...",
    "Almost ready, stay with us...",
    "Your request is on its way...",
    "Loading, thank you for waiting...",
    "Gathering information...",
    "Optimizing your experience...",
    "Thanks for your patience, loading...",
    "Almost done...",
    "Finalizing setup...",
    "Getting things ready...",
  ];

  const randomPrompt =
    loadingPrompts[Math.floor(Math.random() * loadingPrompts.length)];

  return (
    <div className="flex flex-col items-center justify-center fixed bg-white z-20 top-0 left-0 w-full h-full bg-opacity-90">
      <FaSpinner className="animate-spin text-primary text-4xl" />
      <p className="ml-2 text-primary">{randomPrompt}</p>
    </div>
  );
};

export default SpinnerLoader;
