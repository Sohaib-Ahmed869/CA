import React, { useEffect, useState } from "react";
import { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import certifiedAustralia from "../../assets/certifiedAustralia.png";
import CustomersInfo from "../customers/page";
import ExistingApplicationsAdmin from "../applications/page";
import PaymentApproval from "../payments/page";
const FinanceManagement = lazy(() =>
  import("../FinanceModule/viewApplicationsFM")
);
const ExpensesDashboard = lazy(() => import("../FinanceModule/ExpenseView"));
import Dashboard from "../dashboard/page";
const Analytics = lazy(() => import("../FinanceModule/Analytics"));
const Industries = lazy(() => import("../Industries/page"));
const ArchivedApplications = lazy(() => import("../archived/page"));
const PaymentDeadlinesPage = lazy(() => import("../payments/pendingpayments"));
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdOutlineAnalytics,
  MdOutlineSettings,
} from "react-icons/md";
import {
  FaCheckSquare,
  FaFileArchive,
  FaIndustry,
  FaMoneyBillWave,
  FaUserFriends,
  FaChartPie,
  FaClock,
} from "react-icons/fa";
import { BsClock, BsClockHistory, BsFileEarmarkText } from "react-icons/bs";
import { BiLogOut, BiMenu, BiX } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { RiMoneyDollarCircleLine, RiLockPasswordLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion"; // Add framer-motion for animations
import SpinnerLoader from "../../Customer/components/spinnerLoader";

import ChangePassword from "../ChangePassword/page";
import { getDashboardStats } from "../../Customer/Services/adminServices";
const TaskManagement = lazy(() => import("../TaskManager/TaskManagement"));
import Reporting from "../Reporting/page";
import AgentTimer from "../Timer/Timer";
import TimerLogsTable from "../Timer/AgentTimeLogs";
const AssignTargets = lazy(() => import("../AssignTargets/AssignTargets"));

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [active, setActive] = useState("Dashboard");
  const [activeFinance, setActiveFinance] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);
  const [isAgentManager, setIsAgentManager] = useState(false);
  const [logoutTrigger, setLogoutTrigger] = useState(0);

  const auth = getAuth();

  const onClickLogout = async () => {
    // FIRST: Trigger timer pause
    setLogoutTrigger((prev) => prev + 1);

    // Add a small delay to ensure the timer pauses
    await new Promise((resolve) => setTimeout(resolve, 300));

    // SECOND: Sign out from Firebase
    await signOut(auth);

    // THIRD: Clean local storage and navigate
    localStorage.removeItem("authrole");
    localStorage.removeItem("role");
    localStorage.removeItem("type");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("firebaseToken");
    navigate("/login");
  };

  const hasFinanceAccess = () => {
    const userType = localStorage.getItem("type");
    return userType === "ceo";
  };

  useEffect(() => {
    const UserName = localStorage.getItem("type");
    if (UserName === "manager") {
      setIsAgentManager(true);
    }
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

  // Sidebar menu item component for cleaner code
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

  // Finance dropdown items
  const FinanceDropdownItem = ({ label, isActive, onClick }) => (
    <button
      className={`w-full text-left p-2 pl-12 my-1 rounded-lg transition-colors duration-200 flex items-center gap-2 
      ${
        isActive
          ? "bg-emerald-700/30 text-white"
          : "text-emerald-50 hover:bg-emerald-700/20"
      }`}
      onClick={onClick}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
      <span>{label}</span>
    </button>
  );

  const renderFinanceDropdown = () => (
    <AnimatePresence>
      {isFinanceOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="py-1 px-3">
            <FinanceDropdownItem
              label="Finance Management"
              isActive={activeFinance === "Management"}
              onClick={() => handleFinanceClick("Management")}
            />
            <FinanceDropdownItem
              label="View Expenses"
              isActive={activeFinance === "Expenses"}
              onClick={() => handleFinanceClick("Expenses")}
            />
            <FinanceDropdownItem
              label="View Analytics"
              isActive={activeFinance === "Analytics"}
              onClick={() => handleFinanceClick("Analytics")}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderFinanceSection = () => {
    if (!hasFinanceAccess()) return null;

    return (
      <li
        className={`cursor-pointer transition-all duration-200 ease-in-out 
          border-b border-emerald-600/20 
          ${
            active === "Finances"
              ? "bg-emerald-700/30 text-white"
              : "text-emerald-50 hover:bg-emerald-700/20"
          } 
          rounded-xl my-1`}
      >
        <div
          className="p-3 flex items-center justify-between"
          onClick={() => setIsFinanceOpen(!isFinanceOpen)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`${
                active === "Finances" ? "bg-emerald-500" : "bg-emerald-700/50"
              } p-2 rounded-lg`}
            >
              <RiMoneyDollarCircleLine className="text-xl" />
            </div>
            <span className="font-medium">Finances</span>
          </div>
          <MdKeyboardArrowDown
            className={`transform transition-transform duration-300 ${
              isFinanceOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        {renderFinanceDropdown()}
      </li>
    );
  };

  return (
    <div className="flex">
      {/* Mobile menu button */}
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

      {/* Mobile sidebar */}
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
                    Management
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
                      icon={<FaUserFriends className="text-xl" />}
                      label="Students"
                      isActive={active === "Students"}
                      onClick={() => {
                        setActive("Students");
                        setIsOpen(false);
                      }}
                      hasBorder={false}
                    />
                    <MenuItem
                      icon={<BsClockHistory className="text-xl" />}
                      label="Applications"
                      isActive={active === "Applications"}
                      onClick={() => {
                        setActive("Applications");
                        setIsOpen(false);
                      }}
                      hasBorder={false}
                    />
                    <MenuItem
                      icon={<FaFileArchive className="text-xl" />}
                      label="Archived"
                      isActive={active === "Archived Applications"}
                      onClick={() => {
                        setActive("Archived Applications");
                        setIsOpen(false);
                      }}
                      hasBorder={false}
                    />
                  </ul>
                </div>

                <div className="mb-8 px-4">
                  <h2 className="text-emerald-100 text-xs uppercase tracking-wider mb-2">
                    Finance
                  </h2>
                  <ul className="space-y-1">
                    {hasFinanceAccess() && (
                      <MenuItem
                        icon={<FaMoneyBillWave className="text-xl" />}
                        label="Payments"
                        isActive={active === "Payments"}
                        onClick={() => {
                          setActive("Payments");
                          setIsOpen(false);
                        }}
                        hasBorder={false}
                      />
                    )}
                    <MenuItem
                      icon={<RiMoneyDollarCircleLine className="text-xl" />}
                      label="Payment Deadlines"
                      isActive={active === "Payment Deadlines"}
                      onClick={() => {
                        setActive("Payment Deadlines");
                        setIsOpen(false);
                      }}
                      hasBorder={false}
                    />

                    {hasFinanceAccess() && (
                      <li
                        className={`cursor-pointer transition-all duration-200 ease-in-out 
                          ${
                            active === "Finances"
                              ? "bg-emerald-700/30 text-white"
                              : "text-emerald-50 hover:bg-emerald-700/20"
                          } 
                          rounded-xl`}
                      >
                        <div
                          className="p-3 flex items-center justify-between"
                          onClick={() => setIsFinanceOpen(!isFinanceOpen)}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`${
                                active === "Finances"
                                  ? "bg-emerald-500"
                                  : "bg-emerald-700/50"
                              } p-2 rounded-lg`}
                            >
                              <RiMoneyDollarCircleLine className="text-xl" />
                            </div>
                            <span className="font-medium">Finances</span>
                          </div>
                          <MdKeyboardArrowDown
                            className={`transform transition-transform duration-300 ${
                              isFinanceOpen ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                        {renderFinanceDropdown()}
                      </li>
                    )}
                  </ul>
                </div>

                <div className="mb-8 px-4">
                  <h2 className="text-emerald-100 text-xs uppercase tracking-wider mb-2">
                    Configuration
                  </h2>
                  <ul className="space-y-1">
                    {hasFinanceAccess() && (
                      <MenuItem
                        icon={<FaIndustry className="text-xl" />}
                        label="Industries"
                        isActive={active === "Industries"}
                        onClick={() => {
                          setActive("Industries");
                          setIsOpen(false);
                        }}
                        hasBorder={false}
                      />
                    )}
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

            {/* Backdrop */}
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

      {/* Desktop Sidebar */}
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
            {/* <ul className="mb-6">
              {localStorage.getItem("type") === "agent" && (
                <li className=" rounded-xl my-1">
                  <AgentTimer
                    userId={currentUserId}
                    logoutTrigger={logoutTrigger}
                  />
                </li>
              )}
            </ul> */}
            <h2 className="text-emerald-100 text-xs uppercase tracking-wider mb-3 ml-2">
              Management
            </h2>
            <ul>
              <MenuItem
                icon={<MdDashboard className="text-xl" />}
                label="Dashboard"
                isActive={active === "Dashboard"}
                onClick={() => setActive("Dashboard")}
              />
              <MenuItem
                icon={<FaUserFriends className="text-xl" />}
                label="Students"
                isActive={active === "Students"}
                onClick={() => setActive("Students")}
              />
              <MenuItem
                icon={<BsClockHistory className="text-xl" />}
                label="Applications"
                isActive={active === "Applications"}
                onClick={() => setActive("Applications")}
              />
              <MenuItem
                icon={<FaFileArchive className="text-xl" />}
                label="Archived Applications"
                isActive={active === "Archived Applications"}
                onClick={() => setActive("Archived Applications")}
              />
              {isAgentManager && (
                <MenuItem
                  icon={<FaFileArchive className="text-xl" />}
                  label="AssignTargets"
                  isActive={active === "AssignTargets"}
                  onClick={() => setActive("AssignTargets")}
                />
              )}
              {hasFinanceAccess() && (
                <MenuItem
                  icon={<FaFileArchive className="text-xl" />}
                  label="Reporting Dashboard"
                  isActive={active === "reporting"}
                  onClick={() => setActive("reporting")}
                />
              )}
              {!hasFinanceAccess() && (
                <MenuItem
                  icon={<FaFileArchive className="text-xl" />}
                  label="Task Management"
                  isActive={active === "TaskManagement"}
                  onClick={() => setActive("TaskManagement")}
                />
              )}
              {/* {localStorage.getItem("type") !== "agent" ? (
                <MenuItem
                  icon={<FaClock className="text-xl" />}
                  label="Agent Time Logs"
                  isActive={active === "AgentTimeLogs"}
                  onClick={() => {
                    setActive("AgentTimeLogs");
                    setIsOpen(false);
                  }}
                  hasBorder={false}
                />
              ) : null} */}
            </ul>
          </div>

          <div className="px-4 mb-8">
            <h2 className="text-emerald-100 text-xs uppercase tracking-wider mb-3 ml-2">
              Finance
            </h2>
            <ul>
              {hasFinanceAccess() && (
                <MenuItem
                  icon={<FaMoneyBillWave className="text-xl" />}
                  label="Payments"
                  isActive={active === "Payments"}
                  onClick={() => setActive("Payments")}
                />
              )}
              <MenuItem
                icon={<RiMoneyDollarCircleLine className="text-xl" />}
                label="Payment Deadlines"
                isActive={active === "Payment Deadlines"}
                onClick={() => {
                  setActive("Payment Deadlines");
                  setIsOpen(false);
                }}
                hasBorder={false}
              />
              {renderFinanceSection()}
            </ul>
          </div>

          <div className="px-4 mb-8">
            <h2 className="text-emerald-100 text-xs uppercase tracking-wider mb-3 ml-2">
              Configuration
            </h2>
            <ul>
              {hasFinanceAccess() && (
                <MenuItem
                  icon={<FaIndustry className="text-xl" />}
                  label="Industries"
                  isActive={active === "Industries"}
                  onClick={() => setActive("Industries")}
                />
              )}
              <MenuItem
                icon={<RiLockPasswordLine className="text-xl" />}
                label="Change Password"
                isActive={active === "Change Password"}
                onClick={() => setActive("Change Password")}
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
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6 mt-14 lg:mt-0 max-sm:overflow-x-hidden">
        {active === "Dashboard" && <Dashboard />}
        {active === "Students" && <CustomersInfo />}
        {active === "Applications" && <ExistingApplicationsAdmin />}
        {active === "Payments" && <PaymentApproval />}
        {active === "Payment Deadlines" && (
          <Suspense fallback={<SpinnerLoader />}>
            {" "}
            <PaymentDeadlinesPage />{" "}
          </Suspense>
        )}
        {active === "TaskManagement" && (
          <Suspense fallback={<SpinnerLoader />}>
            {" "}
            <TaskManagement />{" "}
          </Suspense>
        )}
        {active === "Industries" && (
          <Suspense fallback={<SpinnerLoader />}>
            <Industries />
          </Suspense>
        )}
        {active === "Archived Applications" && (
          <Suspense fallback={<SpinnerLoader />}>
            {" "}
            <ArchivedApplications />{" "}
          </Suspense>
        )}
        {active === "Change Password" && <ChangePassword />}
        {active === "AssignTargets" && (
          <Suspense fallback={<SpinnerLoader />}>
            <AssignTargets />
          </Suspense>
        )}
        {active === "Finances" && activeFinance === "Management" && (
          <Suspense fallback={<SpinnerLoader />}>
            <FinanceManagement />
          </Suspense>
        )}
        {active === "Finances" && activeFinance === "Expenses" && (
          <Suspense fallback={<SpinnerLoader />}>
            <ExpensesDashboard />
          </Suspense>
        )}
        {active === "Finances" && activeFinance === "Analytics" && (
          <Suspense fallback={<SpinnerLoader />}>
            <Analytics />
          </Suspense>
        )}
        {active === "reporting" && (
          <Suspense fallback={<SpinnerLoader />}>
            <Reporting />
          </Suspense>
        )}
        {active === "AgentTimeLogs" && <TimerLogsTable />}
      </div>
    </div>
  );
};

export default AdminSidebar;
