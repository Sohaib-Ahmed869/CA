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
} from "recharts";
import {
  ClipboardList,
  FileCheck,
  Award,
  Users,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Clock,
} from "lucide-react";

const AdminDashboard = ({ setActive }) => {
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
  });

  const [monthlyData, setMonthlyData] = useState([]);

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
        let price = app.paid ? app.price.replace(/,/g, "") : 0;
        console.log(price);
        const price2 =
          app.paid && app.partialScheme
            ? app.full_paid
              ? price
              : 0
            : app.discount
            ? price - app.discount
            : price;
        //remove comma from price
        price = parseFloat(price2);
        return total + price;
      }, 0);

      // Calculate monthly stats
      const monthly = response.reduce((acc, app) => {
        const date = new Date(app.status[0].time);
        const month = date.toLocaleString("default", { month: "short" });

        if (!acc[month]) {
          acc[month] = { month, applications: 0, revenue: 0 };
        }

        acc[month].applications++;
        if (app.paid) {
          const price = parseFloat(app.price) || 0;
          const discount = parseFloat(app.discount) || 0;
          acc[month].revenue += price - discount;
        }

        return acc;
      }, {});

      setMonthlyData(Object.values(monthly));

      setMetrics({
        total: response.length,
        rto: rtoApps,
        certificate: certApps,
        pending: pendingApps,
        totalRevenue: revenue,
        paidApplications: paidApps,
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

  const StatCard = ({ title, value, icon: Icon, color, onClick }) => (
    <div
      onClick={onClick}
      className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${color} hover:shadow-md transition-shadow cursor-pointer`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <Icon className="text-gray-400" size={24} />
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {loading && <SpinnerLoader />}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Assessor Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Overview of all applications and metrics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Applications"
            value={metrics.total}
            icon={ClipboardList}
            color="border-blue-500"
            onClick={() => setActive("Customers")}
          />
          <StatCard
            title="RTO Applications"
            value={metrics.rto}
            icon={FileCheck}
            color="border-green-500"
            onClick={() => setActive("RTO Applications")}
          />
          <StatCard
            title="Certificates Generated"
            value={metrics.certificate}
            icon={Award}
            color="border-purple-500"
            onClick={() => setActive("Certificate Applications")}
          />
          <StatCard
            title="Pending Applications"
            value={metrics.pending}
            icon={Clock}
            color="border-yellow-500"
            onClick={() => setActive("Customers")}
          />
        </div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Monthly Applications</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => setActive("Customers")}
              className="p-4 text-center rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <FileCheck className="mx-auto mb-2" size={24} />
              View RTO Applications
            </button>
            <button
              onClick={() => setActive("Certificate Applications")}
              className="p-4 text-center rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
            >
              <Award className="mx-auto mb-2" size={24} />
              View Certificates
            </button>
            <button
              onClick={() => setActive("RTO Applications")}
              className="p-4 text-center rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
            >
              <Users className="mx-auto mb-2" size={24} />
              Sent to RTO
            </button>
            <button
              onClick={() => setActive("Customers")}
              className="p-4 text-center rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors"
            >
              <TrendingUp className="mx-auto mb-2" size={24} />
              View Applications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
