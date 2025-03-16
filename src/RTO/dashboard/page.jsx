import React, { useEffect, useState } from "react";
import dashb from "../../assets/dashb.png";
import { MdOutlineContactPage, MdPending } from "react-icons/md";
import { BiCheck, BiTimeFive, BiUserCheck } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { getDashboardStats } from "../../Customer/Services/rtoservices";

const Dashboard = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const [totalApplications, setTotalApplications] = useState(0);
  const [applicationsPending, setApplicationsPending] = useState(0);
  const [applicationsCompletedThisMonth, setApplicationsCompletedThisMonth] =
    useState(0);
  const [applicationsCompletedThisWeek, setApplicationsCompletedThisWeek] =
    useState(0);
  const [totalRTOs, setTotalRTOs] = useState(0);
  const [rejectedApplications, setRejectedApplications] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const stats = await getDashboardStats();
        setTotalApplications(stats.totalApplications);
        setApplicationsPending(stats.applicationsPending);
        setApplicationsCompletedThisMonth(
          stats.applicationsCompletedInLastMonth
        );
        setApplicationsCompletedThisWeek(stats.applicationsCompletedInLastWeek);
        setTotalRTOs(stats.totalRTOs);
        setRejectedApplications(stats.rejectedApplications);
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.error(err);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-3 lg:p-10 w-full justify-start animate-fade bg-gray-100 min-h-screen">
      <div className="flex items-center gap-4 mb-8 lg:flex-row flex-col">
        <img src={dashb} alt="Dashboard" className="h-32" />
        <div className="flex flex-col lg:w-1/2 w-full">
          <h1 className="text-4xl font-bold text-emerald-700">Dashboard</h1>
          <p className="text-lg mt-2 text-gray-600">
            Welcome to the dashboard. Here you can view all the statistics
            related to the applications and RTOs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Applications Card */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Applications
            </h2>
            <MdOutlineContactPage className="text-3xl text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-emerald-600">
            {totalApplications}
          </h1>
        </div>

        {/* Applications Pending Card */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Applications Pending
            </h2>
            <MdPending className="text-3xl text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold text-yellow-600">
            {applicationsPending}
          </h1>
        </div>

        {/* Applications Completed This Month Card */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Completed This Month
            </h2>
            <BiCheck className="text-3xl text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-green-600">
            {applicationsCompletedThisMonth}
          </h1>
        </div>

        {/* Applications Completed This Week Card */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Completed This Week
            </h2>
            <BiTimeFive className="text-3xl text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-blue-600">
            {applicationsCompletedThisWeek}
          </h1>
        </div>

        {/* Total RTOs Card */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Total RTOs</h2>
            <BiUserCheck className="text-3xl text-indigo-500" />
          </div>
          <h1 className="text-3xl font-bold text-indigo-600">{totalRTOs}</h1>
        </div>

        {/* Rejected Applications Card */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Rejected Applications
            </h2>
            <FaTimes className="text-3xl text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-red-600">
            {rejectedApplications}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
