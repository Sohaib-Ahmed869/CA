import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import analyticsImg from "../../assets/applications.png";

// Import Lucide React icons for consistent styling
import {
  DollarSign,
  Wallet,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Filter,
} from "lucide-react";

const URL = import.meta.env.VITE_REACT_BACKEND_URL;

const Analytics = () => {
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [metrics, setMetrics] = useState({
    totalPayment: 0,
    totalProfit: 0,
    totalExpense: 0,
    additionalExpense: 0,
    defaultExpense: 0,
    currentMonthProfit: 0,
  });

  const [applicationOption, setApplicationOption] = useState("all");
  const [monthlyData, setMonthlyData] = useState([]);

  // Function to calculate metrics for a specific time period
  const calculateMetrics = async (timeFrame = "all") => {
    try {
      setSubmissionLoading(true);

      // Fetch all applications that have been paid
      const applicationsResponse = await fetch(`${URL}/api/admin/applications`);

      let applications = await applicationsResponse.json();
      // setApplications(applications);

      //filter out where paid is true
      if (applicationOption === "unpaid") {
        applications = applications.filter(
          (app) => app.paid === false && app.full_paid === false
        );
      }
      if (applicationOption === "paid") {
        applications = applications.filter(
          (app) => app.paid === true || app.full_paid === true
        );
      }
      if (applicationOption === "all") {
        applications = applications;
      }
      // Filter data based on selected timeframe
      let filteredApplications = applications;
      if (timeFrame !== "all") {
        const [year, month] = timeFrame.split("-");
        filteredApplications = applications.filter((app) => {
          const paymentDate = new Date(
            app.paymentCompletedAt || app.status[0].time
          );
          return (
            paymentDate.getFullYear() === parseInt(year) &&
            paymentDate.getMonth() === parseInt(month) - 1
          );
        });
      }

      // Calculate total payments
      const totalPayment = filteredApplications.reduce((sum, app) => {
        // Use same calculation method everywhere
        const amount = app.partialScheme
          ? parseFloat(app.amount_paid || 0)
          : parseFloat(app.price?.replace(/[^0-9.-]+/g, "") || 0);
        return sum + amount;
      }, 0);

      // Calculate total expenses
      const additionalExpense = filteredApplications.reduce((sum, app) => {
        const expenses = app.expenses || [];
        return (
          sum +
          expenses.reduce(
            (expSum, exp) => expSum + parseFloat(exp.amount || 0),
            0
          )
        );
      }, 0);
      const defaultExpense = filteredApplications.reduce((total, app) => {
        // Handle potential missing values and parse amount
        const isfAmount = app.isf?.expense
          ? parseFloat(app.isf.expense) || 0
          : 0;
        return total + isfAmount;
      }, 0);
      const totalExpense = additionalExpense + defaultExpense;
      // Calculate total profit (payments - expenses)
      const totalProfit = totalPayment - totalExpense;

      // Calculate current month's profit
      const today = new Date();
      const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      const currentMonthApplications = applications.filter((app) => {
        const paymentDate = new Date(
          app.paymentCompletedAt || app.status[0].time
        );
        return paymentDate >= firstDayOfMonth;
      });

      const currentMonthPayment = currentMonthApplications.reduce(
        (sum, app) => {
          const amount = app.partialScheme
            ? parseFloat(app.amount_paid || 0)
            : parseFloat(String(app.price).replace(/[^0-9.-]+/g, "") || 0);
          return sum + amount;
        },
        0
      );

      const currentMonthExpenses = currentMonthApplications.reduce(
        (sum, app) => {
          const expenses = app.expenses || [];
          const additional = expenses.reduce(
            (expSum, exp) => expSum + parseFloat(exp.amount || 0),
            0
          );
          const defaultExp = app.isf?.expense
            ? parseFloat(app.isf.expense) || 0
            : 0;
          return sum + additional + defaultExp;
        },
        0
      );
      const currentMonthProfit = currentMonthPayment - currentMonthExpenses;

      // Update metrics state
      setMetrics({
        totalPayment,
        totalProfit,
        additionalExpense,
        totalExpense,
        defaultExpense,
        currentMonthProfit,
      });

      // Prepare monthly data for graph
      const monthlyStats = new Map();
      const appsForGraph =
        timeFrame === "all" ? applications : filteredApplications;

      appsForGraph.forEach((app) => {
        const date = new Date(app.paymentCompletedAt || app.status[0].time);
        const monthKey = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;

        if (!monthlyStats.has(monthKey)) {
          monthlyStats.set(monthKey, {
            month: monthKey,
            payments: 0,
            expenses: 0,
            profit: 0,
          });
        }

        const stats = monthlyStats.get(monthKey);
        const paymentAmount = app.partialScheme
          ? parseFloat(app.amount_paid || 0)
          : parseFloat(app.price?.replace(/[^0-9.-]+/g, "") || 0);

        stats.payments += paymentAmount;
        const appExpenses = (app.expenses || []).reduce(
          (sum, exp) => sum + parseFloat(exp.amount || 0),
          0
        );

        const appDefaultExpense = app.isf?.expense
          ? parseFloat(app.isf.expense) || 0
          : 0;

        stats.expenses += appExpenses + appDefaultExpense;
        stats.profit = stats.payments - stats.expenses;
      });

      setMonthlyData(
        Array.from(monthlyStats.values()).sort((a, b) =>
          a.month.localeCompare(b.month)
        )
      );

      setSubmissionLoading(false);
    } catch (error) {
      console.error("Error calculating metrics:", error);
      toast.error("Failed to load analytics data");
      setSubmissionLoading(false);
    }
  };

  useEffect(() => {
    calculateMetrics(selectedMonth);
  }, [selectedMonth, applicationOption]);

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    bgColor,
    textColor,
  }) => (
    <div
      className={`bg-white rounded-xl shadow-sm border border-${color}-50 p-6`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm text-${textColor}-600 font-medium mb-1`}>
            {title}
          </p>
          <p className={`text-2xl font-bold text-${textColor}-800`}>
            ${value.toFixed(2)}
          </p>
        </div>
        <div className={`p-3 rounded-lg bg-${bgColor}-50`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 xl:p-10 w-full animate-fade">
      {submissionLoading && <SpinnerLoader />}
      <Toaster />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-xl shadow-md mb-6">
        <div className="flex items-center gap-6 flex-col sm:flex-row p-6">
          <div className="bg-white p-4 rounded-full flex-shrink-0">
            <img
              src={analyticsImg}
              alt="Analytics"
              className="h-16 w-16 object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Financial Analytics
            </h1>
            <p className="text-green-100 mt-1">
              Track and analyze your financial metrics over time
            </p>
          </div>
        </div>
      </div>

      {/* Time Period Selector */}
      <div className=" flex justify-between bg-white rounded-xl shadow-sm p-6 border border-green-50 mb-6">
        <div className="flex items-center">
          <Calendar className="mr-2 text-green-700" size={20} />
          <label className="text-sm font-medium text-gray-700 mr-4">
            Select Time Period
          </label>
          <select
            className="block w-64 p-2 border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="all">All Time</option>
            {monthlyData.map((data) => (
              <option key={data.month} value={data.month}>
                {new Date(data.month + "-01").toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <Filter className="mr-2 text-green-700" size={20} />
          <label className="text-sm font-medium text-gray-700 mr-4"></label>
          <select
            className="block w-64 p-2 border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            onChange={(e) => setApplicationOption(e.target.value)}
          >
            <option value="all">All </option>
            <option value="paid">Completed Applications</option>
            <option value="unpaid">Pending Applications</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Payments"
          value={metrics.totalPayment}
          icon={Wallet}
          color="green"
          bgColor="green"
          textColor="green"
        />
        <StatCard
          title="Total Profit"
          value={metrics.totalProfit}
          icon={TrendingUp}
          color="green"
          bgColor="green"
          textColor="green"
        />
        <StatCard
          title="Additional Expenses"
          value={metrics.additionalExpense}
          icon={TrendingDown}
          color="red"
          bgColor="red"
          textColor="red"
        />
        <StatCard
          title="Default Expenses"
          value={metrics.defaultExpense}
          icon={TrendingDown}
          color="red"
          bgColor="red"
          textColor="red"
        />
        <StatCard
          title="Total Expenses"
          value={metrics.totalExpense}
          icon={TrendingDown}
          color="red"
          bgColor="red"
          textColor="red"
        />
        <StatCard
          title="This Month's Profit"
          value={metrics.currentMonthProfit}
          icon={DollarSign}
          color="yellow"
          bgColor="yellow"
          textColor="yellow"
        />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-green-50">
        <div className="flex items-center mb-4">
          <BarChart3 className="mr-2 text-green-700" size={20} />
          <h2 className="text-lg font-semibold text-gray-800">
            Financial Trends
          </h2>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tickFormatter={(value) => {
                  const date = new Date(value + "-01");
                  return date.toLocaleString("default", {
                    month: "short",
                    year: "2-digit",
                  });
                }}
                stroke="#6b7280"
              />
              <YAxis stroke="#6b7280" />
              <Tooltip
                formatter={(value) => [`$${value.toFixed(2)}`, null]}
                labelFormatter={(label) => {
                  const date = new Date(label + "-01");
                  return date.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  });
                }}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.96)",
                  borderRadius: "6px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  border: "none",
                  padding: "12px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="payments"
                stroke="#047857"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                name="Payments"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                name="Expenses"
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                strokeWidth={3}
                activeDot={{ r: 8 }}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
