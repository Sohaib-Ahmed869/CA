import React, { useState } from "react";
import certifiedAustralia from "../../assets/certifiedAustralia.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  //display logo on one side and login button on the other
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center bg-secondary shadow-md p-2 lg:p-4">
      <div className="flex items-center">
        <img
          src={certifiedAustralia}
          alt="Certified Australia Logo"
          className="h-20 ml-4 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex items-center">
        <button className="btn btn-primary text-white px-4 py-2 rounded-lg mr-4">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
