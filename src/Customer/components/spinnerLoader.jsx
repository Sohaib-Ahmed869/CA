import React from "react";
import { FaSpinner } from "react-icons/fa";

const SpinnerLoader = () => {
  return (
    <div className="flex items-center justify-center absolute bg-white z-20 top-0 left-0 w-full h-full bg-opacity-50">
      <FaSpinner className="animate-spin text-primary text-4xl" />
    </div>
  );
};

export default SpinnerLoader;
