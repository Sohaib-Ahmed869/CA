import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
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
} from "lucide-react";

const ApplicationFunnel = ({ applications }) => {
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ColorStatusChart stats={stats} />
        <ApplicationFunnel applications={applications} />
      </div>
    </div>
  );
};

export default Dashboard;
