import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import certifiedAustralia from "../../assets/certifiedAustralia.png";
import CustomersInfo from "../customers/page";
import ExistingApplicationsAdmin from "../applications/page";
import PaymentApproval from "../payments/page";
import Dashboard from "../dashboard/page";
import { MdDashboard } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { getAuth, signOut } from "firebase/auth";
import { getDashboardStats } from "../../Customer/Services/adminServices";
const AdminSidebar = () => {
  const navigate = useNavigate();
  

  const [active, setActive] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  const auth = getAuth();
  const onClickLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);
  return (
    <div className="flex animate-fade-right">
      {/*hambuger menu button */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 fixed z-50">
          <GiHamburgerMenu
            className="text-2xl text-black cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>

      {/*mobile menu */}
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
                  active === "Customers"
                    ? "bg-gray-100 bg-opacity-15 rounded-xl"
                    : ""
                }`}
                onClick={() => {
                  setActive("Customers");
                  setIsOpen(false);
                }}
              >
                <FaCheckSquare className="text-xl" />
                <button className="font-medium">Customers</button>
              </li>
              <li
                className={`cursor-pointer p-3 flex items-center gap-2 ${
                  active === "Applications"
                    ? "bg-gray-100 bg-opacity-15 rounded-xl"
                    : ""
                }`}
                onClick={() => {
                  setActive("Applications");
                  setIsOpen(false);
                }}
              >
                <BsClock className="text-xl" />
                <button className="font-medium">Applications</button>
              </li>
              <li
                className={`cursor-pointer p-3 flex items-center gap-2 ${
                  active === "Payments"
                    ? "bg-gray-100 bg-opacity-15 rounded-xl"
                    : ""
                }`}
                onClick={() => {
                  setActive("Payments");
                  setIsOpen(false);
                }}
              >
                <FaMoneyBill1Wave className="text-xl" />
                <button className="font-medium">Payments</button>
              </li>
              <li
                className="cursor-pointer p-3 flex items-center gap-2"
                onClick={onClickLogout}
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
        <ul className="text-white p-4 text-sm mt-2">
          <li className="flex items-center justify-center mb-10">
            <img
              src={certifiedAustralia}
              alt="Certified Australia"
              className="h-20"
            />
          </li>

          <li
            className={`border-b border-base-300 cursor-pointer p-3 flex items-center gap-2 ${
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
            className={`border-b border-base-300 cursor-pointer p-3 flex items-center gap-2 ${
              active === "Customers"
                ? "bg-gray-100 bg-opacity-15 rounded-xl"
                : ""
            }`}
            onClick={() => {
              setActive("Customers");
              setIsOpen(false);
            }}
          >
            <FaCheckSquare className="text-xl" />
            <button className="font-medium">Customers</button>
          </li>
          <li
            className={`border-b border-base-300 cursor-pointer p-3 flex items-center gap-2 ${
              active === "Applications"
                ? "bg-gray-100 bg-opacity-15 rounded-xl"
                : ""
            }`}
            onClick={() => {
              setActive("Applications");
              setIsOpen(false);
            }}
          >
            <BsClock className="text-xl" />
            <button className="font-medium">Applications</button>
          </li>
          <li
            className={`border-b border-base-300 cursor-pointer p-3 flex items-center gap-2 ${
              active === "Payments"
                ? "bg-gray-100 bg-opacity-15 rounded-xl"
                : ""
            }`}
            onClick={() => {
              setActive("Payments");
              setIsOpen(false);
            }}
          >
            <FaMoneyBill1Wave className="text-xl" />
            <button className="font-medium">Payments</button>
          </li>
          <li
            className="border-b border-base-300 cursor-pointer p-3 flex items-center gap-2"
            onClick={() => {
              navigate("/");
            }}
          >
            <BiLogOut className="text-xl" />
            <button className="font-medium">Logout</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className="flex-1 p-4 mt-10 lg:mt-0"
        onClick={() => setIsOpen(false)}
      >
        {active === "Dashboard" && <Dashboard />}
        {active === "Customers" && <CustomersInfo />}
        {active === "Applications" && <ExistingApplicationsAdmin />}
        {active === "Payments" && <PaymentApproval />}
      </div>

      {isOpen && (
        <div
          className="fixed top-0 left-0 bg-black bg-opacity-50 min-h-screen z-40 w-auto"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminSidebar;
