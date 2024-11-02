import React from "react";
import { FaSpinner } from "react-icons/fa";

const SpinnerLoader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full fixed bg-white z-20">
      <FaSpinner className="animate-spin text-primary text-4xl" />
    </div>
  );
};

export default SpinnerLoader;
