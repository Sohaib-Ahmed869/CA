import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import certifiedAustralia from "../../assets/certifiedAustralia.png";
import CustomersInfo from "../customers/page";
import RTOApplications from "../sentToRTO/page";
import CertificateApplications from "../certificateGenerated/page";
import AdminDashboard from "../Dashboard/page";
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
import { CgPassword } from "react-icons/cg";
const AssessorSidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const auth = getAuth();
  const onClickLogout = async () => {
    await signOut(auth);
    navigate("/login");
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
                  active === "RTO Applications"
                    ? "bg-gray-100 bg-opacity-15 rounded-xl"
                    : ""
                }`}
                onClick={() => {
                  setActive("RTO Applications");
                  setIsOpen(false);
                }}
              >
                <FaMoneyBill1Wave className="text-xl" />
                <button className="font-medium">RTO Applications</button>
              </li>
              <li
                className={`cursor-pointer p-3 flex items-center gap-2 ${
                  active === "Certificate Applications"
                    ? "bg-gray-100 bg-opacity-15 rounded-xl"
                    : ""
                }`}
                onClick={() => {
                  setActive("Certificate Applications");
                  setIsOpen(false);
                }}
              >
                <RiMoneyDollarCircleLine className="text-xl" />
                <button className="font-medium">
                  Certificate Applications
                </button>
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
              active === "RTO Applications"
                ? "bg-gray-100 bg-opacity-15 rounded-xl"
                : ""
            }`}
            onClick={() => {
              setActive("RTO Applications");
              setIsOpen(false);
            }}
          >
            <FaMoneyBill1Wave className="text-xl" />
            <button className="font-medium">RTO Applications</button>
          </li>
          <li
            className={`border-b border-base-300 cursor-pointer p-3 flex items-center gap-2 ${
              active === "Certificate Applications"
                ? "bg-gray-100 bg-opacity-15 rounded-xl"
                : ""
            }`}
            onClick={() => {
              setActive("Certificate Applications");
              setIsOpen(false);
            }}
          >
            <RiMoneyDollarCircleLine className="text-xl" />
            <button className="font-medium">Certificate Applications</button>
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
        {active === "Dashboard" && <AdminDashboard setActive={setActive} />}
        {active === "Customers" && <CustomersInfo />}
        {active === "RTO Applications" && <RTOApplications />}
        {active === "Certificate Applications" && <CertificateApplications />}
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

export default AssessorSidebar;
