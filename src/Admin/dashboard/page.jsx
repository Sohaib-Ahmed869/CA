import React, { useEffect, useState } from "react";
import { MdOutlineContactPage } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { FaMoneyBillWave } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { BiCheck } from "react-icons/bi";
import { BiTimeFive } from "react-icons/bi";
import { BiUserCheck } from "react-icons/bi";
import { getAuth } from "firebase/auth";
import { MdPending } from "react-icons/md";
import {
  getDashboardStats,
  getApplications,
} from "../../Customer/Services/adminServices";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import dashb from "../../assets/dashb.png";
import ApexCharts from "react-apexcharts";

// Weekly Applications Chart
const WeeklyChart = ({ applications }) => {
  const getWeeklyData = () => {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const completed = new Array(7).fill(0);
    const pending = new Array(7).fill(0);

    applications.forEach((app) => {
      const date = new Date(app.status[0].time);
      const dayIndex = (date.getDay() + 6) % 7; // Adjust to start from Monday
      if (app.paid) {
        completed[dayIndex]++;
      } else {
        pending[dayIndex]++;
      }
    });

    return {
      labels: weekDays,
      series: [
        {
          name: "Paid",
          data: completed,
        },
        {
          name: "Pending",
          data: pending,
        },
      ],
    };
  };

  const data = getWeeklyData();

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    colors: ["#089C34", "#142E1D"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: data.labels,
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Weekly Applications</h3>
      <ApexCharts
        options={chartOptions}
        series={data.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

// Status Distribution Chart
const StatusChart = ({ applications }) => {
  const getStatusData = () => {
    const statuses = {
      "Student Intake Form": 0,
      "Upload Documents": 0,
      "Sent to RTO": 0,
      "Waiting for Verification": 0,
      "Certificate Generated": 0,
    };

    applications.forEach((app) => {
      if (statuses.hasOwnProperty(app.currentStatus)) {
        statuses[app.currentStatus]++;
      }
    });

    return {
      series: Object.values(statuses),
      labels: Object.keys(statuses),
    };
  };

  const data = getStatusData();

  const chartOptions = {
    labels: data.labels,
    colors: ["#142E1D", "#089C34", "#FFA000", "#1976D2", "#6D4C41", "#8E24AA"],
    chart: {
      type: "pie",
    },
    legend: {
      position: "bottom",
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">
        Application Status Distribution
      </h3>
      <ApexCharts
        options={chartOptions}
        series={Object.values(data.series)} // Change this line
        labels={Object.values(data.labels)} // Add this line
        type="pie"
        height={350}
      />
    </div>
  );
};

// Payment Trends Chart
const PaymentTrends = ({ applications }) => {
  const getPaymentData = () => {
    const last7Days = [];
    const paymentAmounts = new Array(7).fill(0);

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last7Days.push(date.toISOString().split("T")[0]);
    }

    applications.forEach((app) => {
      if (app.paid && app.paymentCompletedAt) {
        const paymentDate = app.paymentCompletedAt.split("T")[0];
        const dayIndex = last7Days.indexOf(paymentDate);
        if (dayIndex !== -1) {
          const amount =
            parseFloat(app.price.toString().replace(/,/g, "")) || 0;
          paymentAmounts[dayIndex] += amount;
        }
      }
    });

    return {
      dates: last7Days,
      series: [
        {
          name: "Payment Amount",
          data: paymentAmounts,
        },
      ],
    };
  };

  const data = getPaymentData();

  const chartOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: data.dates,
    },
    colors: ["#089C34"],
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Payment Trends</h3>
      <ApexCharts
        options={chartOptions}
        series={data.series}
        type="area"
        height={350}
      />
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalPayments: 0,
    paidApplications: 0,
    certificatesGenerated: 0,
    rtoApplications: 0,
    pendingPayments: 0,
    totalCustomers: 0,
    totalAgents: 0,
  });

  const [applications, setApplications] = useState([]);
  const [submissionLoading, setSubmissionLoading] = useState(false);

  const [userId, setUserId] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      if (!userId) return;

      try {
        setSubmissionLoading(true);

        // Fetch data in parallel using Promise.all
        const [statsData, appsData] = await Promise.all([
          getDashboardStats({ id: userId }),
          getApplications(),
        ]);

        setStats(statsData);
        setApplications(appsData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        // You might want to show an error toast here
      } finally {
        setSubmissionLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  const kpiData = [
    {
      label: "Total Applications",
      value: stats.totalApplications,
      Icon: MdOutlineContactPage,
    },
    {
      label: "Total Payments",
      value: `$${stats.totalPayments}`,
      Icon: FaMoneyBillWave,
    },

    {
      label: "Total Payments on Payment Plans",
      value: `$${stats.totalPaymentsWithPartial}`,
      Icon: BiUser,
    },
    {
      label: "Total Outstandings of Payment Plans",
      value: `$${stats.totalPaymentsWithoutPartial}`,
      Icon: BiUserCheck,
    },
    {
      label: "Payments Completed",
      value: stats.paidApplications,
      Icon: BiCheck,
    },
    {
      label: "Payments Pending",
      value: stats.pendingPayments,
      Icon: MdPending,
    },

    {
      label: "Certificates Generated",
      value: stats.certificatesGenerated,
      Icon: GoVerified,
    },
    { label: "Sent to RTO", value: stats.rtoApplications, Icon: BiTimeFive },
  ];

  return (
    <div className="flex flex-col lg:p-10 w-full justify-between animate-fade">
      {submissionLoading && <SpinnerLoader />}

      <div className="flex items-center gap-4 mb-5 lg:flex-row flex-col">
        <img src={dashb} alt="Dashboard" className="h-36" />
        <div className="flex flex-col lg:w-1/2 w-full">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm mt-2">
            Welcome to the dashboard. Here you can view all statistics related
            to applications and payments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            className="flex flex-col w-full shadow-md p-5 rounded-xl relative"
          >
            <label className="text-sm">{kpi.label}</label>
            <h1 className="text-xl font-bold mt-2">{kpi.value}</h1>
            <kpi.Icon className="text-4xl absolute right-5 bottom-5" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <WeeklyChart applications={applications} />
        <PaymentTrends applications={applications} />
        <StatusChart applications={applications} />
      </div>
    </div>
  );
};

export default Dashboard;
