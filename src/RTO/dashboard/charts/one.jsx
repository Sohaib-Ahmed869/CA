import React from "react";
import ApexCharts from "react-apexcharts";
import { useState } from "react";

import { BiChevronDown } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

const options = {
  colors: ["#089C34", "#142E1D"],
  series: [
    {
      name: "Completed",
      color: "#009934",
      data: [
        { x: "Mon", y: 231 },
        { x: "Tue", y: 122 },
        { x: "Wed", y: 63 },
        { x: "Thu", y: 421 },
        { x: "Fri", y: 122 },
        { x: "Sat", y: 323 },
        { x: "Sun", y: 111 },
      ],
    },
    {
      name: "Pending",
      color: "#142E1D",
      data: [
        { x: "Mon", y: 232 },
        { x: "Tue", y: 113 },
        { x: "Wed", y: 341 },
        { x: "Thu", y: 224 },
        { x: "Fri", y: 522 },
        { x: "Sat", y: 411 },
        { x: "Sun", y: 243 },
      ],
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
  dataLabels: {
    enabled: false, // Hide data values on the chart
  },
  xaxis: {
    labels: {
      style: {
        fontFamily: "Inter, sans-serif",
        fontSize: "12px",
        color: "#A0AEC0",
      },
      colors: "#A0AEC0",
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { show: false },
  fill: { opacity: 1 },
};

const DashboardCard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow  p-4 md:p-6">
      <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 ">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg bg-gray-100  flex items-center justify-center me-3">
            <svg
              className="w-6 h-6 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 19"
            >
              <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
              <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
            </svg>
          </div>
          <div>
            <h5 className="leading-none text-2xl font-bold text-gray-900  pb-1">
              3.4k
            </h5>
            <p className="text-sm font-normal text-gray-500">
              Applications Resolved
            </p>
          </div>
        </div>
        <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md">
          <BsArrowRight className="w-2.5 h-2.5 me-1.5" />
          42.5%
        </span>
      </div>

     
      <div id="column-chart">
        <ApexCharts
          options={options}
          series={options.series}
          type="bar"
          height={320}
        />
      </div>
    </div>
  );
};

export default DashboardCard;
