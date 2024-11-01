import React, { useState } from "react";
import DashboardCard from "./charts/one";
import UserStatsCard from "./charts/two";
import ApplicationStatusCard from "./charts/three";

import dashb from "../../assets/dashb.png";

import { MdOutlineContactPage } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { FaMoneyBillWave } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { BiCheck } from "react-icons/bi";
import { BiTimeFive } from "react-icons/bi";
import { BiUserCheck } from "react-icons/bi";
import { MdPending } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

const Dashboard = () => {
  const [totalApplications, setTotalApplications] = useState(10);
  const [applicationsPending, setApplicationsPending] = useState(5);
  const [applicationsCompletedThisMonth, setApplicationsCompletedThisMonth] =
    useState(5);
  const [applicationsCompletedLastMonth, setApplicationsCompletedLastMonth] =
    useState(5);
  const [MTC, setMTC] = useState(5);
  const [rejectedApplications, setRejectedApplications] = useState(5);
  return (
    <div className="flex flex-col lg:p-10 w-full justify-between animate-fade">
      <div className="flex items-center gap-4 mb-5 lg:flex-row flex-col">
        <img src={dashb} alt="Dashboard" className="h-36" />
        <div className="flex flex-col lg:w-1/2 w-full">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm mt-2">
            Welcome to the dashboard. Here you can view all the statistics
            related to the applications and customers.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Total Applications</label>
          <h1 className="text-xl font-bold mt-2">{totalApplications}</h1>
          <MdOutlineContactPage
            alt="Applications"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Applications Pending</label>
          <h1 className="text-xl font-bold mt-2">{applicationsPending}</h1>
          <MdPending
            alt="Applications"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Applications Completed This Month</label>
          <h1 className="text-xl font-bold mt-2">
            {applicationsCompletedThisMonth}
          </h1>
          <BiCheck
            alt="Applications"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Applications Completed Last Month</label>
          <h1 className="text-xl font-bold mt-2">
            {applicationsCompletedLastMonth}
          </h1>
          <BiTimeFive
            alt="Applications"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Mean Time to Complete</label>
          <h1 className="text-xl font-bold mt-2">{MTC} days</h1>
          <BiUserCheck
            alt="Applications"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Rejected Applications</label>
          <h1 className="text-xl font-bold mt-2">{rejectedApplications}</h1>
          <FaTimes
            alt="Applications"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <DashboardCard />
        <UserStatsCard />
        <ApplicationStatusCard />
      </div>
    </div>
  );
};

export default Dashboard;
