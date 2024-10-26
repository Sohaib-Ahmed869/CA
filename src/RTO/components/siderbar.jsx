import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import certifiedAustralia from "../../assets/certifiedAustralia.png";
import Approval from "../approval/page";
import Completed from "../completed/page";

import { MdDashboard } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
const Sidebar = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState("Dashboard");
  return (
    <div className="flex animate-fade-right">
      <div className="flex flex-col min-h-screen bg-secondary w-72">
        <ul className=" text-white p-4 text-sm mt-2">
          <li className="flex items-center justify-center mb-10">
            <img
              src={certifiedAustralia}
              alt="Certified Australia"
              className=" h-20"
            />
          </li>

          <li
            className={`{border-b border-base-300 cursor-pointer p-3 flex items-center gap-2 ${
              active === "Dashboard" ? "bg-gray-100 bg-opacity-15 rounded-xl" : ""
            }`}
            onClick={() => {
              setActive("Dashboard");
            }}
          >
            <MdDashboard className="text-xl" />
            <button className="font-medium">Dashboard</button>
          </li>
          <li
            className={`{border-b border-base-300 cursor-pointer p-3 flex items-center gap-2 ${
              active === "Approvals" ? "bg-gray-100 bg-opacity-15 rounded-xl" : ""
            }`}
            onClick={() => {
              setActive("Approvals");
            }}
          >
            <FaCheckSquare className="text-xl" />
            <button className=" font-medium">Approvals</button>
          </li>
          <li
            className={`{border-b border-base-300 p-3 cursor-pointer flex items-center gap-2 ${
              active === "Completed Applications" ? "bg-gray-100 bg-opacity-15 rounded-xl" : ""
            }`}
            onClick={() => {
              setActive("Completed Applications");
            }}
          >
            <BsClock className="text-xl" />
            <button className="font-medium">Completed Applications</button>
          </li>
          <li
            className="absolute bottom-3 cursor-pointer p-3 flex items-center gap-2"
            onClick={() => {
              navigate("/");
            }}
          >
            <BiLogOut className="text-xl" />
            <button className="font-medium">Logout</button>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-4">
        {
          {
            Dashboard: <h1>Dashboard</h1>,
            Approvals: <Approval />,
            "Completed Applications": <Completed />,
          }[active]
        }
      </div>
    </div>
  );
};

export default Sidebar;
