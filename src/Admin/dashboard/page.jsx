import React, { useState } from "react";
import DashboardCard from "./charts/one";
import UserStatsCard from "./charts/two";
import ApplicationStatusCard from "./charts/three";

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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl">
          <label className="text-sm">Applications</label>
          <h1 className="text-xl font-bold mt-2">{totalApplications}</h1>
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl">
          <label className="text-sm">Customers</label>
          <h1 className="text-xl font-bold mt-2">{totalCustomers}</h1>
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl">
          <label className="text-sm">Verified Customers</label>
          <h1 className="text-xl font-bold mt-2">{totalVerifiedCustomers}</h1>
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl">
          <label className="text-sm">Payments</label>
          <h1 className="text-xl font-bold mt-2">{totalPayments}</h1>
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl">
          <label className="text-sm">Completed Applications</label>
          <h1 className="text-xl font-bold mt-2">
            {totalCompletedApplications}
          </h1>
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl">
          <label className="text-sm">RTO Applications</label>
          <h1 className="text-xl font-bold mt-2">{totalRTOApplications}</h1>
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl">
          <label className="text-sm">Payments Pending</label>
          <h1 className="text-xl font-bold mt-2">{totalPaymentsPending}</h1>
        </div>
        <div className="flex flex-col w-full shadow-md p-5 rounded-xl">
          <label className="text-sm">Payments Verified</label>
          <h1 className="text-xl font-bold mt-2">{totalPaymentsVerified}</h1>
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
