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

const Dashboard = () => {
  const [totalApplications, setTotalApplications] = useState(10);
  const [totalCustomers, setTotalCustomers] = useState(10);
  const [totalPayments, setTotalPayments] = useState(2310);
  const [totalCompletedApplications, setTotalCompletedApplications] =
    useState(4);
  const [totalRTOApplications, setTotalRTOApplications] = useState(5);
  const [totalPaymentsPending, setTotalPaymentsPending] = useState(3);
  const [totalPaymentsVerified, setTotalPaymentsVerified] = useState(2);
  const [totalVerifiedCustomers, setTotalVerifiedCustomers] = useState(8);

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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Applications</label>
          <h1 className="text-xl font-bold mt-2">{totalApplications}</h1>
          <MdOutlineContactPage
            alt="Applications"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Customers</label>
          <h1 className="text-xl font-bold mt-2">{totalCustomers}</h1>
          <BiUser
            alt="Customers"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Verified Customers</label>
          <h1 className="text-xl font-bold mt-2">{totalVerifiedCustomers}</h1>
          <GoVerified
            alt="Verified Customers"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Payments</label>
          <h1 className="text-xl font-bold mt-2">{totalPayments}</h1>
          <FaMoneyBillWave
            alt="Payments"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Completed Applications</label>
          <h1 className="text-xl font-bold mt-2">
            {totalCompletedApplications}
          </h1>
          <BiCheck
            alt="Completed Applications"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">RTO Applications</label>
          <h1 className="text-xl font-bold mt-2">{totalRTOApplications}</h1>
          <BiTimeFive
            alt="RTO Applications"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Payments Pending</label>
          <h1 className="text-xl font-bold mt-2">{totalPaymentsPending}</h1>
          <MdPending
            alt="Payments Pending"
            className="text-4xl absolute right-5 bottom-5"
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl relative">
          <label className="text-sm">Payments Verified</label>
          <h1 className="text-xl font-bold mt-2">{totalPaymentsVerified}</h1>
          <BiUserCheck
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
