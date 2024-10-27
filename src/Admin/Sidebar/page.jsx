import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import certifiedAustralia from "../../assets/certifiedAustralia.png";

import CustomersInfo from "../customers/page";
import ExistingApplicationsAdmin from "../applications/page";
import PaymentApproval from "../payments/page";
import Application from "../applications/application";

import { MdDashboard } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

const AdminSidebar = () => {
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
              active === "Dashboard"
                ? "bg-gray-100 bg-opacity-15 rounded-xl"
                : ""
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
              active === "Customers"
                ? "bg-gray-100 bg-opacity-15 rounded-xl"
                : ""
            }`}
            onClick={() => {
              setActive("Customers");
            }}
          >
            <FaCheckSquare className="text-xl" />
            <button className=" font-medium">Customers</button>
          </li>
          <li
            className={`{border-b border-base-300 p-3 cursor-pointer flex items-center gap-2 ${
              active === "Applications"
                ? "bg-gray-100 bg-opacity-15 rounded-xl"
                : ""
            }`}
            onClick={() => {
              setActive("Applications");
            }}
          >
            <BsClock className="text-xl" />
            <button className="font-medium">Applications</button>
          </li>
          <li
            className={`{border-b border-base-300 p-3 cursor-pointer flex items-center gap-2 ${
              active === "Payments"
                ? "bg-gray-100 bg-opacity-15 rounded-xl"
                : ""
            }`}
            onClick={() => {
              setActive("Payments");
            }}
          >
            <BsClock className="text-xl" />
            <button className="font-medium">Payments</button>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-4">
        {active === "Dashboard" && <div>Dashboard</div>}
        {active === "Customers" && <CustomersInfo />}
        {active === "Applications" && <ExistingApplicationsAdmin />}
        {active === "Payments" && <PaymentApproval />}
      </div>
    </div>
  );
};

export default AdminSidebar;
