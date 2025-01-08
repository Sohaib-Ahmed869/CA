import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import certifiedAustralia from "../../assets/certifiedAustralia.png";
import CustomersInfo from "../customers/page";
import ExistingApplicationsAdmin from "../applications/page";
import PaymentApproval from "../payments/page";
import FinanceManagement from "../FinanceModule/viewApplicationsFM";
import ExpensesDashboard from "../FinanceModule/ExpenseView";
import Analytics from "../FinanceModule/Analytics";
import Dashboard from "../dashboard/page";
import Industries from "../Industries/page";
import { MdDashboard } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { getAuth, signOut } from "firebase/auth";
import { FaIndustry } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

import ChangePassword from "../ChangePassword/page";
import { CgPassword } from "react-icons/cg";
import { getDashboardStats } from "../../Customer/Services/adminServices";
const AdminSidebar = () => {
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [active, setActive] = useState("Dashboard");
  const [activeFinance, setActiveFinance] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);
  const auth = getAuth();
  const onClickLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const hasFinanceAccess = () => {
    const allowedUserIds = [
      "SE6BCPgaNzOFAD3N181iia2iCUG2",
      "wJ1LPS7YLDMpGzKY6HHVm9na9wA2",
    ];
    return allowedUserIds.includes(currentUserId);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);
  const handleFinanceClick = (option) => {
    setActive("Finances");
    setActiveFinance(option);
    setIsOpen(false);
  };

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  const renderFinanceDropdown = () => (
    <div
      className={`ml-8 overflow-hidden transition-all duration-300 ease-in-out ${
        isFinanceOpen ? "max-h-40" : "max-h-0"
      }`}
    >
      <div className="py-2">
        <button
          className={`w-full text-left p-2 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
            activeFinance === "Management"
              ? "bg-gray-100 bg-opacity-15"
              : "hover:bg-gray-100 hover:bg-opacity-10"
          }`}
          onClick={() => handleFinanceClick("Management")}
        >
          <div className="w-1 h-1 rounded-full bg-white"></div>
          Finance Management
        </button>
        <button
          className={`w-full text-left p-2 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
            activeFinance === "Expenses"
              ? "bg-gray-100 bg-opacity-15"
              : "hover:bg-gray-100 hover:bg-opacity-10"
          }`}
          onClick={() => handleFinanceClick("Expenses")}
        >
          <div className="w-1 h-1 rounded-full bg-white"></div>
          View Expenses
        </button>
        <button
          className={`w-full text-left p-2 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
            activeFinance === "Analytics"
              ? "bg-gray-100 bg-opacity-15"
              : "hover:bg-gray-100 hover:bg-opacity-10"
          }`}
          onClick={() => handleFinanceClick("Analytics")}
        >
          <div className="w-1 h-1 rounded-full bg-white"></div>
          View Analytics
        </button>
      </div>
    </div>
  );

  const renderFinanceSection = () => {
    if (!hasFinanceAccess()) return null;

    return (
      <li className="border-b border-base-300">
        <button
          className={`w-full cursor-pointer p-3 flex items-center justify-between ${
            active === "Finances" ? "bg-gray-100 bg-opacity-15 rounded-xl" : ""
          }`}
          onClick={() => setIsFinanceOpen(!isFinanceOpen)}
        >
          <div className="flex items-center gap-2">
            <RiMoneyDollarCircleLine className="text-xl" />
            <span className="font-medium">Finances</span>
          </div>
          <MdKeyboardArrowDown
            className={`transform transition-transform duration-200 ${
              isFinanceOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {renderFinanceDropdown()}
      </li>
    );
  };
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
              {renderFinanceSection()}

              <li
                className={`cursor-pointer p-3 flex items-center gap-2 ${
                  active === "Industries"
                    ? "bg-gray-100 bg-opacity-15 rounded-xl"
                    : ""
                }`}
                onClick={() => {
                  setActive("Industries");
                  setIsOpen(false);
                }}
              >
                <FaIndustry className="text-xl" />
                <button className="font-medium">Industries</button>
              </li>
              <li
                className={`cursor-pointer p-3 flex items-center gap-2 ${
                  active === "Change Password"
                    ? "bg-gray-100 bg-opacity-15 rounded-xl"
                    : ""
                }`}
                onClick={() => {
                  setActive("Change Password");
                  setIsOpen(false);
                }}
              >
                <CgPassword className="text-xl" />
                <button className="font-medium">Change Password</button>
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
        className={`flex flex-col min-h-screen bg-secondary w-72 fixed hidden lg:block lg:static transform ${
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
          {renderFinanceSection()}

          <li
            className={`border-b border-base-300 cursor-pointer p-3 flex items-center gap-2 ${
              active === "Industries"
                ? "bg-gray-100 bg-opacity-15 rounded-xl"
                : ""
            }`}
            onClick={() => {
              setActive("Industries");
              setIsOpen(false);
            }}
          >
            <FaIndustry className="text-xl" />
            <button className="font-medium">Industries</button>
          </li>

          <li
            className={`border-b border-base-300 cursor-pointer p-3 flex items-center gap-2 ${
              active === "Change Password"
                ? "bg-gray-100 bg-opacity-15 rounded-xl"
                : ""
            }`}
            onClick={() => {
              setActive("Change Password");
              setIsOpen(false);
            }}
          >
            <CgPassword className="text-xl" />
            <button className="font-medium">Change Password</button>
          </li>

          <li
            className="border-b border-base-300 cursor-pointer p-3 flex items-center gap-2"
            onClick={() => {
              onClickLogout();
            }}
          >
            <BiLogOut className="text-xl" />
            <button className="font-medium">Logout</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className="flex-1 p-4 mt-10 lg:mt-0 max-sm:overflow-x-hidden"
        onClick={() => setIsOpen(false)}
      >
        {active === "Dashboard" && <Dashboard />}
        {active === "Customers" && <CustomersInfo />}
        {active === "Applications" && <ExistingApplicationsAdmin />}
        {active === "Payments" && <PaymentApproval />}
        {active === "Industries" && <Industries />}
        {active === "Change Password" && <ChangePassword />}
        {active === "Finances" && activeFinance === "Management" && (
          <FinanceManagement />
        )}
        {active === "Finances" && activeFinance === "Expenses" && (
          <ExpensesDashboard />
        )}
        {active === "Finances" && activeFinance === "Analytics" && (
          <Analytics />
        )}
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
