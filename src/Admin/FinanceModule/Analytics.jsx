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
import { FaDollarSign } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { MdPayments } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import analyticsImg from "../../assets/applications.png";

const URL = import.meta.env.VITE_REACT_BACKEND_URL;

const Analytics = () => {
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [metrics, setMetrics] = useState({
    totalPayment: 0,
    totalProfit: 0,
    totalExpense: 0,
    currentMonthProfit: 0,
  });
  const [monthlyData, setMonthlyData] = useState([]);

  // Function to calculate metrics for a specific time period
  const calculateMetrics = async (timeFrame = "all") => {
    try {
      setSubmissionLoading(true);

      // Fetch all applications that have been paid
      const applicationsResponse = await fetch(`${URL}/api/admin/applications`);
      let applications = await applicationsResponse.json();

      //filter out where paid is true
      applications = applications.filter((app) => app.paid === true);

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
        let CleanPrice = app.price.replace(/[^0-9.-]+/g, "");
        let price = app.partialScheme ? app.amount_paid : CleanPrice;
        //convert to int
        return sum + parseFloat(price || 0);
      }, 0);

      // Calculate total expenses
      const totalExpense = filteredApplications.reduce((sum, app) => {
        const expenses = app.expenses || [];
        return (
          sum +
          expenses.reduce(
            (expSum, exp) => expSum + parseFloat(exp.amount || 0),
            0
          )
        );
      }, 0);

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
        (sum, app) => sum + parseFloat(app.amount_paid || 0),
        0
      );
      const currentMonthExpenses = currentMonthApplications.reduce(
        (sum, app) => {
          const expenses = app.expenses || [];
          return (
            sum +
            expenses.reduce(
              (expSum, exp) => expSum + parseFloat(exp.amount || 0),
              0
            )
          );
        },
        0
      );
      const currentMonthProfit = currentMonthPayment - currentMonthExpenses;

      // Update metrics state
      setMetrics({
        totalPayment,
        totalProfit,
        totalExpense,
        currentMonthProfit,
      });

      // Prepare monthly data for graph
      const monthlyStats = new Map();
      applications.forEach((app) => {
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
        stats.payments += parseFloat(app.amount_paid || 0);
        const appExpenses = (app.expenses || []).reduce(
          (sum, exp) => sum + parseFloat(exp.amount || 0),
          0
        );
        stats.expenses += appExpenses;
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
  }, [selectedMonth]);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold">${value.toFixed(2)}</p>
        </div>
        <div
          className={`p-3 rounded-full ${color
            .replace("border-", "bg-")
            .replace("500", "100")}`}
        >
          <Icon className={`text-xl ${color.replace("border-", "text-")}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-3">
      {submissionLoading && <SpinnerLoader />}
      <Toaster />

      <div className="flex items-center gap-4 mb-5 lg:flex-row flex-col">
        <img src={analyticsImg} alt="Analytics" className="h-36" />
        <div className="flex flex-col lg:w-1/2 w-full">
          <h1 className="text-3xl font-bold">Financial Analytics</h1>
          <p className="text-sm mt-2">
            Track and analyze your financial metrics over time.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700">
          Select Time Period
        </label>
        <select
          className="mt-1 block w-64 p-2 border border-gray-300 rounded-md shadow-sm"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Payments"
          value={metrics.totalPayment}
          icon={MdPayments}
          color="border-blue-500"
        />
        <StatCard
          title="Total Profit"
          value={metrics.totalProfit}
          icon={FaDollarSign}
          color="border-green-500"
        />
        <StatCard
          title="Total Expenses"
          value={metrics.totalExpense}
          icon={BiMoney}
          color="border-red-500"
        />
        <StatCard
          title="This Month's Profit"
          value={metrics.currentMonthProfit}
          icon={IoWalletOutline}
          color="border-purple-500"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Financial Trends</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickFormatter={(value) => {
                  const date = new Date(value + "-01");
                  return date.toLocaleString("default", {
                    month: "short",
                    year: "2-digit",
                  });
                }}
              />
              <YAxis />
              <Tooltip
                formatter={(value) => [`$${value.toFixed(2)}`, null]}
                labelFormatter={(label) => {
                  const date = new Date(label + "-01");
                  return date.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  });
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="payments"
                stroke="#3B82F6"
                name="Payments"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#EF4444"
                name="Expenses"
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#10B981"
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
