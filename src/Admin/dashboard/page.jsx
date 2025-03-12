import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getDashboardStats,
  getApplications,
} from "../../Customer/Services/adminServices";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import dashb from "../../assets/dashb.png";
import ApexCharts from "react-apexcharts";
import { Cell, Legend, Line, LineChart } from "recharts";

import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
  Bar,
  CartesianGrid,
  BarChart,
  XAxis,
  YAxis,
} from "recharts";

// Import icons
import {
  BarChart3,
  Users,
  FileText,
  CreditCard,
  CheckCircle,
  Clock,
  Bookmark,
  Send,
  PieChart,
  BarChart2,
  PercentIcon,
} from "lucide-react";

const ApplicationFunnel = ({ applications }) => {
  // Runs when `applications` updates

  const getFunnelData = () => {
    const statusOrder = [
      "Student Intake Form",
      "Upload Documents",
      "Sent to RTO",
      "Waiting for Verification",
      "Certificate Generated",
    ];

    // Green color palette
    const colors = ["#064e3b", "#065f46", "#047857", "#059669", "#10b981"];

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
        fill: colors[index],
      }))
      .filter((d) => d.count > 0);
  };

  const data = React.useMemo(() => getFunnelData(), [applications]);

  // Fallback for empty data
  if (!data.some((d) => d.count > 0)) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-center h-80">
          <p className="text-gray-500 text-center">
            No application data available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-green-50">
      <div className="flex items-center mb-4">
        <PieChart className="mr-2 text-green-700" size={20} />
        <h3 className="text-lg font-semibold text-gray-800">
          Application Pipeline
        </h3>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <FunnelChart>
          <Tooltip
            formatter={(value) => [`${value} applications`, "Count"]}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.96)",
              borderRadius: "6px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              border: "none",
              padding: "12px",
            }}
            labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
          />
          <Funnel
            dataKey="count"
            data={data}
            isAnimationActive
            fillOpacity={0.9}
            stroke="#fff"
            strokeWidth={2}
          >
            <LabelList
              position="right"
              style={{
                fontSize: "13px",
                fontWeight: "600",
                fill: "#1f2937",
              }}
              formatter={(value) => {
                const total = data.reduce((sum, d) => sum + d.count, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${value} (${percentage}%)`;
              }}
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((d) => (
          <div key={d.name} className="flex items-center text-sm text-gray-700">
            <div
              className="w-3 h-3 mr-2 rounded-sm"
              style={{ backgroundColor: d.fill }}
            ></div>
            <span className="truncate">{d.name}</span>
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

  const data = React.useMemo(() => getColorData(), [stats]);

  const chartOptions = React.useMemo(
    () => ({
      labels: data.labels,
      colors: ["#166534", "#65a30d", "#1f2937"],
      chart: {
        type: "donut",
        fontFamily: "'Inter', sans-serif",
        background: "transparent",
        dropShadow: {
          enabled: false,
        },
      },
      legend: {
        position: "bottom",
        fontSize: "14px",
        fontWeight: 500,
        markers: {
          width: 10,
          height: 10,
          strokeWidth: 0,
          radius: 4,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "60%",
            labels: {
              show: true,
              name: {
                show: true,
                fontWeight: 600,
              },
              value: {
                show: true,
                fontWeight: 700,
                fontSize: "22px",
              },
              total: {
                show: true,
                fontWeight: 700,
                label: "Total Leads",
                formatter: function (w) {
                  return data.numbers.reduce((a, b) => a + b, 0);
                },
              },
            },
          },
          expandOnClick: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: "14px",
        },
        y: {
          formatter: function (val, { seriesIndex }) {
            return `${data.numbers[seriesIndex]} (${val.toFixed(1)}%)`;
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      title: {
        text: "Lead Status Distribution",
        align: "left",
        style: {
          fontSize: "16px",
          fontWeight: 600,
          color: "#1f2937",
        },
      },
    }),
    [data]
  );

  const chartKey = React.useMemo(() => JSON.stringify(data), [data]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-green-50">
      <div className="flex items-center mb-4">
        <PieChart className="mr-2 text-green-700" size={20} />
        <h3 className="text-lg font-semibold text-gray-800">
          Lead Status Distribution
        </h3>
      </div>
      <ApexCharts
        key={chartKey}
        options={chartOptions}
        series={data.series}
        type="donut"
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
      fontFamily: "'Inter', sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 4,
        dataLabels: {
          position: "top",
        },
      },
    },
    colors: ["#10b981", "#374151"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: data.labels,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      borderColor: "#F3F4F6",
      strokeDashArray: 4,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10,
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      markers: {
        radius: 4,
      },
    },
    title: {
      text: "Weekly Applications",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: 600,
        color: "#1f2937",
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-green-50">
      <div className="flex items-center mb-4">
        <BarChart3 className="mr-2 text-green-700" size={20} />
        <h3 className="text-lg font-semibold text-gray-800">
          Weekly Applications
        </h3>
      </div>
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
    colors: ["#064e3b", "#065f46", "#047857", "#059669", "#10b981"],
    chart: {
      type: "pie",
      fontFamily: "'Inter', sans-serif",
    },
    legend: {
      position: "bottom",
      fontSize: "14px",
      fontWeight: 500,
      markers: {
        width: 10,
        height: 10,
        strokeWidth: 0,
        radius: 4,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return data.series[opts.seriesIndex];
      },
      style: {
        fontSize: "14px",
        fontWeight: 600,
        colors: ["#fff"],
      },
      dropShadow: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    title: {
      text: "Application Status Distribution",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: 600,
        color: "#1f2937",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-green-50">
      <div className="flex items-center mb-4">
        <PieChart className="mr-2 text-green-700" size={20} />
        <h3 className="text-lg font-semibold text-gray-800">
          Application Status Distribution
        </h3>
      </div>
      <ApexCharts
        options={chartOptions}
        series={data.series}
        type="pie"
        height={350}
      />
    </div>
  );
};
// Top Qualifications Chart
const TopQualificationsChart = ({ applications }) => {
  const [topQualifications, setTopQualifications] = useState([]);
  console.log(applications);

  // Function to process and update top qualifications
  const processTopQualifications = (applications) => {
    if (!applications || applications.length === 0) return;

    const qualificationCounts = applications.reduce((acc, app) => {
      const qualification = app.isf?.lookingForWhatQualification || "Unknown";
      acc[qualification] = (acc[qualification] || 0) + 1;
      return acc;
    }, {});

    const topQualificationData = Object.entries(qualificationCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    setTopQualifications(topQualificationData);
  };

  useEffect(() => {
    processTopQualifications(applications);
  }, [applications]);

  // Unique colors for each bar
  const barColors = ["#14532D", "#16A34A", "#6EE7B7", "#22C55E", "#064E3B"];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Top Qualifications
          </h2>
          <p className="text-gray-500 text-sm">Most requested qualifications</p>
        </div>
        <BarChart2 size={18} className="text-gray-400" />
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={topQualifications}
            layout="vertical"
            margin={{ top: 0, right: 0, left: 100, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fontSize: 12 }}
              width={100}
              tickFormatter={(value) =>
                value.length > 15 ? `${value.substring(0, 15)}...` : value
              }
            />
            <Tooltip />
            <Bar dataKey="value" name="Applications" radius={[0, 4, 4, 0]}>
              {topQualifications.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={barColors[index % barColors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Function to process application data
const calculateMonthlyStats = (applications) => {
  const monthly = applications.reduce((acc, app) => {
    if (!app.status || !app.status[0] || !app.status[0].time) return acc;

    const date = new Date(app.status[0].time);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const key = `${month} ${year}`;

    if (!acc[key]) {
      acc[key] = { month: key, applications: 0, revenue: 0 };
    }

    // Count applications
    acc[key].applications++;

    // Calculate revenue
    let revenue = 0;
    if (app.full_paid) {
      revenue = parseFloat(app.amount_paid) || 0;
    } else if (app.partialScheme) {
      revenue =
        (parseFloat(app.payment1) || 0) + (parseFloat(app.payment2) || 0);
    }

    acc[key].revenue += revenue;

    return acc;
  }, {});

  // Convert to array and sort by date
  return Object.values(monthly).sort(
    (a, b) => new Date(`1 ${a.month}`) - new Date(`1 ${b.month}`)
  );
};
const formatCurrency = (value) => {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
  return `$${value}`;
};

const ApplicationTrends = ({ applications }) => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    setMonthlyData(calculateMonthlyStats(applications));
  }, [applications]);

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Application Trends
          </h2>
          <p className="text-gray-500 text-sm">
            Monthly applications and revenue
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-gray-500">Applications</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-500">Revenue ($)</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={formatCurrency}
              tick={{ fontSize: 12 }}
            />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="applications"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
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
        const [statsData, appsData] = await Promise.all([
          getDashboardStats({ id: userId }),
          getApplications(),
        ]);

        setStats(statsData);
        setApplications(appsData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setSubmissionLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  useEffect(() => {
    if (applications.length === 0) return;

    const totalApplications = applications.length;
    const paidApplications = applications.filter(
      (app) => app.full_paid || parseFloat(app.amount_paid) > 0
    ).length;
    const completedApplications = applications.filter(
      (app) => app.status && app.status.includes("Completed")
    ).length;

    const conversionRate = totalApplications
      ? ((paidApplications / totalApplications) * 100).toFixed(1)
      : 0;

    const completionRate = totalApplications
      ? ((completedApplications / totalApplications) * 100).toFixed(1)
      : 0;

    setStats((prevStats) => ({
      ...prevStats,
      conversionRate,
      completionRate,
    }));
  }, [applications]);
  console.log("stats", stats);
  const kpiData = [
    {
      label: "Total Applications",
      value: stats.totalApplications,
      Icon: FileText,
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      iconColor: "text-green-700",
    },
    {
      label: "Total Payments",
      value: `$${stats.totalPayments}`,
      Icon: CreditCard,
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      iconColor: "text-green-700",
    },
    {
      label: "Completion Rate",
      value: `${stats.completionRate}%`,
      subText: "Applications completed",
      Icon: Users,
      bgColor: "bg-red-50",
      textColor: "text-red-800",
      iconColor: "text-red-700",
    },
    {
      label: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      subText: "Applications paid",
      Icon: PercentIcon,
      bgColor: "bg-purple-50",
      textColor: "text-purple-800",
      iconColor: "text-purple-700",
    },

    {
      label: "Payment Plans Total",
      value: `$${stats.totalPaymentsWithPartial}`,
      Icon: Users,
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      iconColor: "text-green-700",
    },
    {
      label: "Payment Plans Outstanding",
      value: `$${stats.totalPaymentsWithoutPartial}`,
      Icon: Users,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800",
      iconColor: "text-yellow-700",
    },
    {
      label: "Payments Completed",
      value: stats.paidApplications,
      Icon: CheckCircle,
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      iconColor: "text-green-700",
    },
    {
      label: "Payments Pending",
      value: stats.pendingPayments,
      Icon: Clock,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800",
      iconColor: "text-yellow-700",
    },
    {
      label: "Certificates Generated",
      value: stats.certificatesGenerated,
      Icon: Bookmark,
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      iconColor: "text-green-700",
    },
    {
      label: "Sent to RTO",
      value: stats.rtoApplications,
      Icon: Send,
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      iconColor: "text-green-700",
    },
    {
      label: "Total Agents",
      value: stats.totalAgents,
      Icon: Users,
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      iconColor: "text-green-700",
    },
    {
      label: "Number of Students",
      value: stats.totalCustomers,
      Icon: Users,
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      iconColor: "text-green-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 xl:p-10 w-full animate-fade">
      {submissionLoading && <SpinnerLoader />}

      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-xl shadow-md mb-6">
        <div className="flex items-center gap-6 flex-col sm:flex-row p-6">
          <div className="bg-white p-4 rounded-full flex-shrink-0">
            <img
              src={dashb}
              alt="Dashboard"
              className="h-16 w-16 object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Administration Dashboard
            </h1>
            <p className="text-green-100 mt-1">
              Overview of applications, certifications, and revenue metrics
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md ${kpi.bgColor}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm font-medium mb-1 ${kpi.textColor}`}>
                  {kpi.label}
                </p>
                <h3 className={`text-2xl font-bold ${kpi.textColor}`}>
                  {kpi.value}
                </h3>
              </div>
              <div
                className={`p-3 rounded-lg ${kpi.iconColor} bg-white bg-opacity-50`}
              >
                <kpi.Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <WeeklyChart applications={applications} />
        <StatusChart applications={applications} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 my-6  gap-6">
        <TopQualificationsChart applications={applications} />
        <ApplicationTrends applications={applications} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ColorStatusChart stats={stats} />
        <ApplicationFunnel applications={applications} />
      </div>
    </div>
  );
};

export default Dashboard;
