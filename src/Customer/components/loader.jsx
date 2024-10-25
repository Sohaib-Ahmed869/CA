import React, { useState } from "react";
import icon from "../../assets/icon.png";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-white fixed z-10">
      <div className="animate-pulse ">
        <img src={icon} alt="Certified Australia Logo" className="h-32" />
      </div>
    </div>
  );
};

export default Loader;
