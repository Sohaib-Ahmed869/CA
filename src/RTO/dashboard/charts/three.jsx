import React, { useState } from "react";
import ApexCharts from "react-apexcharts";
import { BiChevronDown } from "react-icons/bi";

const statuses = [
  "Completed",
  "Rejected",
];

const getChartOptions = () => {
  return {
    series: [30, 15],
    colors: [
      "#142E1D",
      "#EF4444",
      "#089C34",
      "#9ce37d",
      "#10B981",

      "#3B82F6",
      "#8B5CF6",
    ],
    chart: {
      height: 320,
      type: "pie",
    },
    labels: statuses,
    dataLabels: {
      enabled: false,
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
};

const ApplicationStatusCard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("Last 7 days");

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-col">
          <h5 className="text-xl font-bold leading-none text-gray-900">
            Application Statuses
          </h5>
          <p className="text-sm text-gray-500">
            Overview of application statuses
          </p>
        </div>
      </div>

      {/* Pie Chart */}
      <div id="pie-chart">
        <ApexCharts
          options={getChartOptions()}
          series={getChartOptions().series}
          type="pie"
          height={320}
        />
      </div>
    </div>
  );
};

export default ApplicationStatusCard;
