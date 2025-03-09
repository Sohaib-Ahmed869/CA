import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import certifiedAustralia from "../../assets/certifiedAustralia.png";
import Approval from "../approval/page";
import Completed from "../completed/page";
import Dashboard from "../dashboard/page";
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdOutlineSettings,
} from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { BiLogOut, BiMenu, BiX } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { RiLockPasswordLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import ChangePassword from "../../Admin/ChangePassword/page";

const Sidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const auth = getAuth();

  const onClickLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const MenuItem = ({
    icon,
    label,
    isActive,
    onClick,
    hasBorder = true,
    badge = null,
  }) => (
    <li
      className={`cursor-pointer transition-all duration-200 ease-in-out 
      ${hasBorder ? "border-b border-emerald-600/20" : ""} 
      ${
        isActive
          ? "bg-emerald-700/30 text-white"
          : "text-emerald-50 hover:bg-emerald-700/20"
      } 
      rounded-xl my-1`}
      onClick={onClick}
    >
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`${
              isActive ? "bg-emerald-500" : "bg-emerald-700/50"
            } p-2 rounded-lg`}
          >
            {icon}
          </div>
          <span className="font-medium">{label}</span>
        </div>
        {badge && (
          <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
    </li>
  );

  return (
    <div className="flex">
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          className="p-2 bg-emerald-600 text-white rounded-lg shadow-lg focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <BiX className="text-2xl" />
          ) : (
            <BiMenu className="text-2xl" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-40 w-72 bg-gradient-to-b from-emerald-800 to-emerald-900 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="py-6 px-3">
                <div className="flex justify-center mb-8">
                  <img
                    src={certifiedAustralia}
                    alt="Certified Australia"
                    className="h-16"
                  />
                </div>

                <div className="mb-8 px-4">
                  <h2 className="text-emerald-100 text-xs uppercase tracking-wider mb-2">
                    Menu
                  </h2>
                  <ul className="space-y-1">
                    <MenuItem
                      icon={<MdDashboard className="text-xl" />}
                      label="Dashboard"
                      isActive={active === "Dashboard"}
                      onClick={() => {
                        setActive("Dashboard");
                        setIsOpen(false);
                      }}
                      hasBorder={false}
                    />
                    <MenuItem
                      icon={<FaCheckSquare className="text-xl" />}
                      label="Approvals"
                      isActive={active === "Approvals"}
                      onClick={() => {
                        setActive("Approvals");
                        setIsOpen(false);
                      }}
                      hasBorder={false}
                    />
                    <MenuItem
                      icon={<BsClock className="text-xl" />}
                      label="Completed Applications"
                      isActive={active === "Completed Applications"}
                      onClick={() => {
                        setActive("Completed Applications");
                        setIsOpen(false);
                      }}
                      hasBorder={false}
                    />
                    <MenuItem
                      icon={<RiLockPasswordLine className="text-xl" />}
                      label="Change Password"
                      isActive={active === "Change Password"}
                      onClick={() => {
                        setActive("Change Password");
                        setIsOpen(false);
                      }}
                      hasBorder={false}
                    />
                  </ul>
                </div>

                <div className="px-4 pt-6 border-t border-emerald-700">
                  <button
                    className="flex items-center gap-3 w-full p-3 text-red-200 hover:bg-red-900/20 rounded-xl transition-colors"
                    onClick={onClickLogout}
                  >
                    <div className="bg-red-900/50 p-2 rounded-lg">
                      <BiLogOut className="text-xl" />
                    </div>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      <div className="hidden lg:block w-72 min-h-screen bg-gradient-to-b from-emerald-800 to-emerald-900 shadow-xl relative">
        <div className="py-6 h-full flex flex-col">
          <div className="flex justify-center items-center mb-8 px-4">
            <img
              src={certifiedAustralia}
              alt="Certified Australia"
              className="h-20"
            />
          </div>

          <div className="px-4 mb-8">
            <h2 className="text-emerald-100 text-xs uppercase tracking-wider mb-3 ml-2">
              Menu
            </h2>
            <ul>
              <MenuItem
                icon={<MdDashboard className="text-xl" />}
                label="Dashboard"
                isActive={active === "Dashboard"}
                onClick={() => setActive("Dashboard")}
              />
              <MenuItem
                icon={<FaCheckSquare className="text-xl" />}
                label="Approvals"
                isActive={active === "Approvals"}
                onClick={() => setActive("Approvals")}
              />
              <MenuItem
                icon={<BsClock className="text-xl" />}
                label="Completed Applications"
                isActive={active === "Completed Applications"}
                onClick={() => setActive("Completed Applications")}
              />
              <MenuItem
                icon={<RiLockPasswordLine className="text-xl" />}
                label="Change Password"
                isActive={active === "Change Password"}
                onClick={() => setActive("Change Password")}
                hasBorder={false}
              />
            </ul>
          </div>

          <div className="mt-auto px-4 pt-6 border-t border-emerald-700">
            <button
              className="flex items-center gap-3 w-full p-3 text-red-200 hover:bg-red-900/20 rounded-xl transition-colors"
              onClick={onClickLogout}
            >
              <div className="bg-red-900/50 p-2 rounded-lg">
                <BiLogOut className="text-xl" />
              </div>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-5 lg:p-2 mt-14 lg:mt-0 max-sm:overflow-x-hidden">
        {
          {
            Dashboard: <Dashboard />,
            Approvals: <Approval />,
            "Completed Applications": <Completed />,
            "Change Password": <ChangePassword />,
          }[active]
        }
      </div>
    </div>
  );
};

export default Sidebar;
