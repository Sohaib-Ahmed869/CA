import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { BsArrowRight } from "react-icons/bs";

// Applications by Status Chart (Pie Chart)
const ApplicationStatusChart = ({ applications }) => {
  const getStatusCounts = () => {
    const counts = {
      "Waiting for Verification": 0,
      "Sent to RTO": 0,
      "Certificate Generated": 0,
      "Student Intake Form": 0,
      "Upload Documents": 0,
    };

    applications.forEach((app) => {
      counts[app.currentStatus] = (counts[app.currentStatus] || 0) + 1;
    });

    return counts;
  };

  const statusCounts = getStatusCounts();

  const chartOptions = {
    series: Object.values(statusCounts),
    colors: ["#089C34", "#142E1D", "#10B981", "#3B82F6", "#8B5CF6"],
    chart: {
      height: 320,
      type: "pie",
    },
    labels: Object.keys(statusCounts),
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
        fontSize: "12px",
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
  };

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-col">
          <h5 className="text-xl font-bold leading-none text-gray-900">
            Application Status
          </h5>
          <p className="text-sm text-gray-500">
            Distribution of applications by status
          </p>
        </div>
      </div>
      <div id="pie-chart">
        <ApexCharts
          options={chartOptions}
          series={chartOptions.series}
          type="pie"
          height={320}
        />
      </div>
    </div>
  );
};

// Weekly Applications Chart (Bar Chart)
const WeeklyApplicationsChart = ({ applications }) => {
  const getWeeklyData = () => {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const completed = Array(7).fill(0);
    const pending = Array(7).fill(0);

    applications.forEach((app) => {
      const date = new Date(app.status[0].time);
      const dayIndex = date.getDay();
      if (app.paid) {
        completed[dayIndex]++;
      } else {
        pending[dayIndex]++;
      }
    });

    return { completed, pending };
  };

  const weeklyData = getWeeklyData();

  const chartOptions = {
    colors: ["#089C34", "#142E1D"],
    series: [
      {
        name: "Paid",
        color: "#089C34",
        data: weeklyData.completed,
      },
      {
        name: "Pending Payment",
        color: "#142E1D",
        data: weeklyData.pending,
      },
    ],
    chart: {
      type: "bar",
      height: 320,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "70%", borderRadius: 8 },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: {
          fontFamily: "Inter, sans-serif",
          fontSize: "12px",
        },
      },
    },
    yaxis: { show: true },
  };

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex justify-between pb-4 mb-4 border-b border-gray-200">
        <div className="flex items-center">
          <div>
            <h5 className="leading-none text-2xl font-bold text-gray-900 pb-1">
              {applications.length}
            </h5>
            <p className="text-sm font-normal text-gray-500">
              Applications this week
            </p>
          </div>
        </div>
      </div>
      <div id="column-chart">
        <ApexCharts
          options={chartOptions}
          series={chartOptions.series}
          type="bar"
          height={320}
        />
      </div>
    </div>
  );
};

// Payment Trends Chart (Area Chart)
const PaymentTrendsChart = ({ applications }) => {
  const getPaymentTrends = () => {
    const last7Days = Array(7).fill(0);
    const dates = [];

    // Get last 7 dates
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split("T")[0]);
    }

    applications.forEach((app) => {
      if (app.paid) {
        const paymentDate = new Date(app.paymentCompletedAt)
          .toISOString()
          .split("T")[0];
        const dayIndex = dates.indexOf(paymentDate);
        if (dayIndex !== -1) {
          last7Days[dayIndex] += parseFloat(app.price);
        }
      }
    });

    return { dates, payments: last7Days };
  };

  const trends = getPaymentTrends();

  const chartOptions = {
    chart: {
      height: 320,
      type: "area",
      toolbar: { show: false },
    },
    series: [
      {
        name: "Daily Payments",
        data: trends.payments,
      },
    ],
    xaxis: {
      categories: trends.dates,
      labels: { show: true },
    },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
    dataLabels: { enabled: false },
    colors: ["#089C34"],
  };

  const totalPayments = trends.payments.reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 pb-2">
            ${totalPayments.toLocaleString()}
          </h5>
          <p className="text-base font-normal text-gray-500">
            Payments this week
          </p>
        </div>
      </div>
      <div id="area-chart">
        <ApexCharts
          options={chartOptions}
          series={chartOptions.series}
          type="area"
          height={320}
        />
      </div>
    </div>
  );
};

// KPI Cards Component
const KPICards = ({ stats }) => {
  const kpis = [
    { label: "Total Applications", value: stats.totalApplications, icon: "📝" },
    { label: "Total Payments", value: stats.totalPayments, icon: "💰" },
    { label: "Payments Completed", value: stats.paidApplications, icon: "✅" },
    {
      label: "Certificates Generated",
      value: stats.certificatesGenerated,
      icon: "🎓",
    },
    { label: "Sent to RTO", value: stats.rtoApplications, icon: "📤" },
    { label: "Payments Pending", value: stats.pendingPayments, icon: "⏳" },
    { label: "Total Customers", value: stats.totalCustomers, icon: "👥" },
    { label: "Total Agents", value: stats.totalAgents, icon: "👨‍💼" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {kpis.map((kpi, index) => (
        <div
          key={index}
          className="flex flex-col w-full shadow-md p-5 rounded-xl relative"
        >
          <label className="text-sm">{kpi.label}</label>
          <h1 className="text-xl font-bold mt-2">{kpi.value}</h1>
          <span className="text-4xl absolute right-5 bottom-5">{kpi.icon}</span>
        </div>
      ))}
    </div>
  );
};

export {
  ApplicationStatusChart,
  WeeklyApplicationsChart,
  PaymentTrendsChart,
  KPICards,
};
