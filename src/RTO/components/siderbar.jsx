import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import certifiedAustralia from "../../assets/certifiedAustralia.png";
import Approval from "../approval/page";
import Completed from "../completed/page";
import Dashboard from "../dashboard/page";
import { GiHamburgerMenu } from "react-icons/gi";
import { getAuth, signOut } from "firebase/auth";
import { MdDashboard } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
const Sidebar = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  const auth = getAuth();
  const onClickLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };
  return (
    <div className="flex animate-fade-right">
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 fixed z-50">
          <GiHamburgerMenu
            className="text-2xl text-black cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden sm:block">
          <div className="bg-secondary w-72 top-6 left-6 shadow-lg rounded-2xl fixed z-50">
            <ul className="text-white p-4 text-sm ">
              <li
                className={`cursor-pointer p-3 flex items-center gap-2 ${
                  active === "Dashboard"
                    ? "bg-gray-100 bg-opacity-15 rounded-xl"
                    : ""
                }`}
                onClick={() => {
                  setActive("Dashboard");
                  setIsOpen(false);
                }}
              >
                <MdDashboard className="text-xl" />
                <button className="font-medium">Dashboard</button>
              </li>
              <li
                className={`cursor-pointer p-3 flex items-center gap-2 ${
                  active === "Approvals"
                    ? "bg-gray-100 bg-opacity-15 rounded-xl"
                    : ""
                }`}
                onClick={() => {
                  setActive("Approvals");
                  setIsOpen(false);
                }}
              >
                <FaCheckSquare className="text-xl" />
                <button className="font-medium">Approvals</button>
              </li>
              <li
                className={`cursor-pointer p-3 flex items-center gap-2 ${
                  active === "Completed Applications"
                    ? "bg-gray-100 bg-opacity-15 rounded-xl"
                    : ""
                }`}
                onClick={() => {
                  setActive("Completed Applications");
                  setIsOpen(false);
                }}
              >
                <BsClock className="text-xl" />
                <button className="font-medium">Completed Applications</button>
              </li>
              <li
                className="cursor-pointer p-3 flex items-center gap-2"
                onClick={() => {
                  setIsOpen(false);
                  onClickLogout();
                }}
              >
                <BiLogOut className="text-xl" />
                <button className="font-medium">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`flex flex-col min-h-screen bg-secondary w-72 fixed max-md:hidden lg:static transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0`}
      >
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
              active === "Approvals"
                ? "bg-gray-100 bg-opacity-15 rounded-xl"
                : ""
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
              active === "Completed Applications"
                ? "bg-gray-100 bg-opacity-15 rounded-xl"
                : ""
            }`}
            onClick={() => {
              setActive("Completed Applications");
            }}
          >
            <BsClock className="text-xl" />
            <button className="font-medium">Completed Applications</button>
          </li>
          <li
            className=" bottom-3 cursor-pointer p-3 flex items-center gap-2"
            onClick={() => {
              onClickLogout();
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
            Dashboard: <Dashboard />,
            Approvals: <Approval />,
            "Completed Applications": <Completed />,
          }[active]
        }
      </div>
    </div>
  );
};

export default Sidebar;
