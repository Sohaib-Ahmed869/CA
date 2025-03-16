import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApplications } from "../../Customer/Services/adminServices";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ClipboardList,
  FileCheck,
  Award,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  RefreshCw,
  ArrowRight,
  PieChart as PieChartIcon,
  BarChart2,
  ChevronUp,
  Calendar,
  UserCheck,
  Percent,
  Book,
  FileText,
  Briefcase,
} from "lucide-react";

const AdminDashboard = ({ setActive }) => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    total: 0,
    rto: 0,
    certificate: 0,
    pending: 0,
    totalRevenue: 0,
    paidApplications: 0,
    conversionRate: 0,
    completionRate: 0,
  });

  const [monthlyData, setMonthlyData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [topQualifications, setTopQualifications] = useState([]);
  const [loadingStats, setLoadingStats] = useState(false);

  // For time-based filtering
  const [timeFilter, setTimeFilter] = useState("all");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await getApplications();
      setApplications(response);

      // Calculate metrics
      const rtoApps = response.filter(
        (app) => app.currentStatus === "Sent to RTO"
      ).length;
      const certApps = response.filter(
        (app) => app.currentStatus === "Certificate Generated"
      ).length;
      const pendingApps = response.filter(
        (app) => app.currentStatus === "Sent to Assessor"
      ).length;
      const paidApps = response.filter((app) => app.paid).length;

      // Calculate total revenue
      const revenue = response.reduce((total, app) => {
        let price = app.paid
          ? app.price
            ? parseFloat(app.price.toString().replace(/,/g, ""))
            : 0
          : 0;
        const price2 =
          app.paid && app.partialScheme
            ? app.full_paid
              ? price
              : 0
            : app.discount
            ? price - app.discount
            : price;

        return total + parseFloat(price2 || 0);
      }, 0);

      // Calculate conversion rate (paid / total)
      const conversionRate =
        response.length > 0 ? (paidApps / response.length) * 100 : 0;

      // Calculate completion rate (certificates / total)
      const completionRate =
        response.length > 0 ? (certApps / response.length) * 100 : 0;

      // Calculate monthly stats
      const monthly = response.reduce((acc, app) => {
        if (!app.status || !app.status[0] || !app.status[0].time) return acc;

        const date = new Date(app.status[0].time);
        const month = date.toLocaleString("default", { month: "short" });
        const year = date.getFullYear();
        const key = `${month} ${year}`;

        if (!acc[key]) {
          acc[key] = { month: key, applications: 0, revenue: 0, paid: 0 };
        }

        acc[key].applications++;
        if (app.paid) {
          acc[key].paid++;
          const price =
            parseFloat(app.price?.toString().replace(/,/g, "")) || 0;
          const discount = parseFloat(app.discount || 0);
          acc[key].revenue += price - discount;
        }

        return acc;
      }, {});

      // Sort monthly data by date
      const monthlyDataArray = Object.values(monthly);
      monthlyDataArray.sort((a, b) => {
        const monthA = new Date(a.month);
        const monthB = new Date(b.month);
        return monthA - monthB;
      });

      setMonthlyData(monthlyDataArray);

      // Calculate status distribution for pie chart
      const statusCounts = response.reduce((acc, app) => {
        const status = app.currentStatus || "Unknown";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});

      const statusData = Object.keys(statusCounts).map((status) => ({
        name: status,
        value: statusCounts[status],
      }));

      setStatusDistribution(statusData);

      // Get recent applications (last 5)
      const sortedApplications = [...response].sort((a, b) => {
        const dateA = new Date(a.status?.[0]?.time || 0);
        const dateB = new Date(b.status?.[0]?.time || 0);
        return dateB - dateA;
      });

      setRecentApplications(sortedApplications.slice(0, 5));

      // Get top qualifications
      const qualificationCounts = response.reduce((acc, app) => {
        const qualification = app.isf?.lookingForWhatQualification || "Unknown";
        acc[qualification] = (acc[qualification] || 0) + 1;
        return acc;
      }, {});

      const topQualificationData = Object.entries(qualificationCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

      setTopQualifications(topQualificationData);

      setMetrics({
        total: response.length,
        rto: rtoApps,
        certificate: certApps,
        pending: pendingApps,
        totalRevenue: revenue,
        paidApplications: paidApps,
        conversionRate: conversionRate.toFixed(1),
        completionRate: completionRate.toFixed(1),
      });

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const refreshData = async () => {
    setLoadingStats(true);
    await fetchApplications();
    setTimeout(() => {
      setLoadingStats(false);
    }, 500);
  };

  const filterDataByTime = (data) => {
    if (timeFilter === "all") return data;

    const now = new Date();
    const cutoff = new Date();

    if (timeFilter === "month") {
      cutoff.setMonth(now.getMonth() - 1);
    } else if (timeFilter === "quarter") {
      cutoff.setMonth(now.getMonth() - 3);
    } else if (timeFilter === "year") {
      cutoff.setFullYear(now.getFullYear() - 1);
    }

    return data.filter((item) => {
      const date = new Date(item.month);
      return date >= cutoff;
    });
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-md shadow-md border border-gray-200">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name === "revenue" && " $"}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const COLORS = [
    "#4F46E5",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
  ];

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color,
    onClick,
    trend,
  }) => (
    <div
      
      className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="text-white" size={22} />
        </div>
        <div
          className={`px-2 py-1 rounded-md text-xs font-medium flex items-center ${
            trend >= 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {trend >= 0 ? (
            <ChevronUp size={14} />
          ) : (
            <ChevronUp size={14} className="transform rotate-180" />
          )}
          {Math.abs(trend)}%
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {loading && <SpinnerLoader />}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Assessor Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Overview of all applications and key metrics
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <button
              onClick={refreshData}
              className="flex items-center gap-1 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              <RefreshCw
                size={16}
                className={loadingStats ? "animate-spin" : ""}
              />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Applications"
            value={metrics.total}
            subtitle="All applications received"
            icon={ClipboardList}
            color="bg-blue-600"
            trend={4.5}
            onClick={() => setActive("Customers")}
          />
          <StatCard
            title="RTO Applications"
            value={metrics.rto}
            subtitle="Applications sent to RTO"
            icon={FileCheck}
            color="bg-green-600"
            trend={2.8}
            onClick={() => setActive("RTO Applications")}
          />
          <StatCard
            title="Certificates Generated"
            value={metrics.certificate}
            subtitle="Completed certifications"
            icon={Award}
            color="bg-purple-600"
            trend={1.5}
            onClick={() => setActive("Certificate Applications")}
          />
          <StatCard
            title="Pending Applications"
            value={metrics.pending}
            subtitle="Awaiting assessment"
            icon={Clock}
            color="bg-amber-600"
            trend={-2.4}
            onClick={() => setActive("Customers")}
          />
        </div>

        {/* Second Row Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* <StatCard
            title="Total Revenue"
            value={formatCurrency(metrics.totalRevenue)}
            subtitle="From all applications"
            icon={DollarSign}
            color="bg-emerald-600"
            trend={3.2}
          /> */}
          {/* <StatCard
            title="Paid Applications"
            value={metrics.paidApplications}
            subtitle={`${metrics.total} total applications`}
            icon={UserCheck}
            color="bg-cyan-600"
            trend={5.1}
          /> */}
          {/* <StatCard
            title="Conversion Rate"
            value={`${metrics.conversionRate}%`}
            subtitle="Applications paid"
            icon={Percent}
            color="bg-indigo-600"
            trend={0.8}
          /> */}
          <StatCard
            title="Completion Rate"
            value={`${metrics.completionRate}%`}
            subtitle="Applications completed"
            icon={Book}
            color="bg-pink-600"
            trend={1.2}
          />
        </div>

        {/* Recent Applications and Top Qualifications */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
          {/* Recent Applications
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Recent Applications
                </h2>
                <p className="text-gray-500 text-sm">
                  Last 5 applications submitted
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentApplications.map((app, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {app.applicationId || app.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {app.user?.firstName} {app.user?.lastName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            app.currentStatus === "Certificate Generated"
                              ? "bg-green-100 text-green-800"
                              : app.currentStatus === "Sent to RTO"
                              ? "bg-blue-100 text-blue-800"
                              : app.currentStatus === "Sent to Assessor"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {app.currentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {new Date(app.status?.[0]?.time).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {recentApplications.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-6 text-center text-sm text-gray-500"
                      >
                        No recent applications found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div> */}

          {/* Top Qualifications */}
     
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Applications Trend */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Top Qualifications
                </h2>
                <p className="text-gray-500 text-sm">
                  Most requested qualifications
                </p>
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
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={true}
                    vertical={false}
                  />
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
                  <Bar
                    dataKey="value"
                    name="Applications"
                    fill="#8B5CF6"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Status Distribution Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Applications by Status
                </h2>
                <p className="text-gray-500 text-sm">
                  Distribution of all applications
                </p>
              </div>
              <PieChartIcon size={18} className="text-gray-400" />
            </div>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    legendType="circle"

                    nameKey="name"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} applications`, "Count"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
            <button
              onClick={() => setActive("Customers")}
              className="p-4 flex flex-col items-center text-center rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <Users className="mb-2" size={24} />
              <span className="text-sm font-medium">View Applications</span>
            </button>
            <button
              onClick={() => setActive("RTO Applications")}
              className="p-4 flex flex-col items-center text-center rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
            >
              <FileCheck className="mb-2" size={24} />
              <span className="text-sm font-medium">RTO Applications</span>
            </button>
            <button
              onClick={() => setActive("Certificate Applications")}
              className="p-4 flex flex-col items-center text-center rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
            >
              <Award className="mb-2" size={24} />
              <span className="text-sm font-medium">Certificates</span>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
