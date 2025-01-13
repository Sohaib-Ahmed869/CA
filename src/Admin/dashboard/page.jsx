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
import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const ApplicationFunnel = ({ applications }) => {
  const getFunnelData = () => {
    const statusOrder = [
      "Student Intake Form",
      "Upload Documents",
      "Sent to RTO",
      "Waiting for Verification",
      "Certificate Generated",
    ];

    // Colors for each status (in order of appearance)
    const colors = ["#142E1D", "#089C34", "#FFA000", "#1976D2", "#6D4C41"];

    // Count applications for each status
    const statusCounts = statusOrder.reduce((acc, status) => {
      acc[status] = 0;
      return acc;
    }, {});

    applications.forEach((app) => {
      if (statusCounts.hasOwnProperty(app.currentStatus)) {
        statusCounts[app.currentStatus]++;
      }
    });

    // Filter out zero-value statuses and return formatted data
    return statusOrder
      .map((status, index) => ({
        name: status,
        count: statusCounts[status],
        fill: colors[index], // Assign a specific color for each status
      }))
      .filter((d) => d.count > 0); // Exclude statuses with count = 0
  };

  const data = React.useMemo(() => getFunnelData(), [applications]);

  // Fallback for empty data
  if (!data.some((d) => d.count > 0)) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h4>No data available for the funnel chart.</h4>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "5",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h3
        style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}
      >
        Application Funnel
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <FunnelChart>
          <Tooltip
            formatter={(value) => `${value} applications`}
            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
          />
          <Funnel
            dataKey="count"
            data={data}
            isAnimationActive
            fillOpacity={1} // Ensure full color visibility
          >
            {/* Display only percentages inside the funnel */}
            <LabelList
              style={{ fontSize: "12px", fontWeight: "bold", fill: "#000000" }}
              formatter={(value) => {
                const total = data.reduce((sum, d) => sum + d.count, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${percentage}%`;
              }}
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
        {data.map((d) => (
          <div
            key={d.name}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "15px",
              fontSize: "14px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: d.fill, // Use the same color as in the funnel
                marginRight: "5px",
                borderRadius: "2px",
              }}
            ></div>
            {d.name}
          </div>
        ))}
      </div>
    </div>
  );
};
const ColorStatusChart = ({ stats }) => {
  const getColorData = () => {
    const hotLeadCount = stats.colorStatusCount?.hotLead || 0;
    const warmLeadCount = stats.colorStatusCount?.warmLead || 0;
    const coldLeadCount = stats.colorStatusCount?.coldLead || 0;

    const totalLeads = hotLeadCount + warmLeadCount + coldLeadCount;

    const hotLeadPercent = totalLeads ? (hotLeadCount / totalLeads) * 100 : 0;
    const warmLeadPercent = totalLeads ? (warmLeadCount / totalLeads) * 100 : 0;
    const coldLeadPercent = totalLeads ? (coldLeadCount / totalLeads) * 100 : 0;

    return {
      labels: ["Hot Lead", "Warm Lead", "Cold Lead"],
      series: [hotLeadPercent, warmLeadPercent, coldLeadPercent],
      numbers: [hotLeadCount, warmLeadCount, coldLeadCount],
    };
  };

  // Get fresh data each render
  const data = React.useMemo(() => getColorData(), [stats]);

  const chartOptions = React.useMemo(
    () => ({
      labels: data.labels,
      colors: ["#EF4444", "#F97316", "#6B7280"],
      chart: {
        type: "pie",
        events: {
          dataPointMouseEnter: function (event, chartContext, config) {
            // Force tooltip update
            const dataPointIndex = config.dataPointIndex;
            const count = data.numbers[dataPointIndex];
            const percentage = data.series[dataPointIndex].toFixed(1);
          },
        },
      },
      legend: {
        position: "bottom",
        fontSize: "14px",
        markers: {
          fillColors: ["#EF4444", "#F97316", "#6B7280"],
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            position: "inside",
            style: {
              fontSize: "14px",
              fontWeight: "bold",
              colors: ["#fff"],
            },
            formatter: function (val, opts) {
              return data.numbers[opts.seriesIndex].toString();
            },
          },
        },
      },
      tooltip: {
        enabled: true,
        custom: function ({ seriesIndex }) {
          const count = data.numbers[seriesIndex];
          const percentage = data.series[seriesIndex].toFixed(1);
          const label = data.labels[seriesIndex];

          return `<div class="custom-tooltip" style="padding: 8px;">
          <span>${label}</span><br/>
          <span>Count: ${count}</span><br/>
          <span>Percentage: ${percentage}%</span>
        </div>`;
        },
      },
      title: {
        text: "Lead Status Distribution",
        align: "left",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },
    }),
    [data]
  );

  // Force chart to re-render when data changes
  const chartKey = React.useMemo(() => JSON.stringify(data), [data]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <ApexCharts
        key={chartKey}
        options={chartOptions}
        series={data.series}
        type="pie"
        height={350}
      />
    </div>
  );
};

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
    colorStatusCount: {
      hotLead: 0,
      warmLead: 0,
      coldLead: 0,
      others: 0,
    },
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
        <ColorStatusChart stats={stats} />
        <ApplicationFunnel applications={applications} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        <PaymentTrends applications={applications} />
        <StatusChart applications={applications} />
      </div>
    </div>
  );
};

export default Dashboard;
