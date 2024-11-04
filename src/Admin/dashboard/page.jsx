import React, { useState, useEffect } from "react";
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
import { getDashboardStats } from "../../Customer/Services/adminServices";
import SpinnerLoader from "../../Customer/components/spinnerLoader";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalCustomers: 0,
    totalAgents: 0,
    verifiedApplications: 0,
    verifiedCustomers: 0,
    paidApplications: 0,
    rtoApplications: 0,
  });

  const [submissionLoading, setSubmissionLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setSubmissionLoading(true);
        const stats = await getDashboardStats();
        setStats(stats);
        console.log(stats);
        setSubmissionLoading(false);
      } catch (err) {
        console.error(err);
        setSubmissionLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col lg:p-10 w-full justify-between animate-fade">
      {submissionLoading && <SpinnerLoader />}
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Applications</label>
          <h1 className="text-xl font-bold mt-2">{stats.totalApplications}</h1>
          <MdOutlineContactPage
            alt="Applications"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Leads</label>
          <h1 className="text-xl font-bold mt-2">{stats.totalCustomers}</h1>
          <BiUser
            alt="Customers"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Verified Leads</label>
          <h1 className="text-xl font-bold mt-2">{stats.verifiedCustomers}</h1>
          <GoVerified
            alt="Verified Customers"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">RTO Applications</label>
          <h1 className="text-xl font-bold mt-2">{stats.rtoApplications}</h1>
          <FaMoneyBillWave
            alt="Payments"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Verified Applications</label>
          <h1 className="text-xl font-bold mt-2">
            {stats.verifiedApplications}
          </h1>
          <BiCheck
            alt="Completed Applications"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Agents</label>
          <h1 className="text-xl font-bold mt-2">{stats.totalAgents}</h1>
          <BiTimeFive
            alt="RTO Applications"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Payments Completed</label>
          <h1 className="text-xl font-bold mt-2">{stats.paidApplications}</h1>
          <BiUserCheck
            alt="Payments Pending"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Payments Pending</label>
          <h1 className="text-xl font-bold mt-2">
            {stats.totalApplications - stats.paidApplications}
          </h1>
          <MdPending
            alt="Payments Pending"
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
