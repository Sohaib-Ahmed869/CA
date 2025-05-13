import { useState, useEffect } from "react";
import axios from "axios";
import LeadsTable from "./LeadsTable";
import FinanceTable from "./FinanceTable";
import ReportingHeader from "./reportingHeader";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import ReportingFilters from "./reportingFilters";
const URL = import.meta.env.VITE_REACT_BACKEND_URL;

const Reporting = () => {
  const [activeTable, setActiveTable] = useState("leads");
  const [leadsData, setLeadsData] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const [leadsRes, financeRes] = await Promise.all([
  //           axios.get(`${URL}/api/admin/leads-stats`),
  //           axios.get(`${URL}/api/admin/finance-stats`),
  //         ]);

  //         setLeadsData(leadsRes.data);
  //         setFinanceData(financeRes.data);
  //         setLoading(false);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //         setLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = {};

        if (dateFilter !== "all") {
          params.dateFilter = dateFilter;
          if (dateFilter === "custom") {
            params.start = startDate;
            params.end = endDate;
          }
        }

        const [leadsRes, financeRes] = await Promise.all([
          axios.get(`${URL}/api/admin/leads-stats`, { params }),
          axios.get(`${URL}/api/admin/finance-stats`, { params }),
        ]);

        //remove the data with 0 as value
        const filteredLeadsData = leadsRes.data.filter(
          (item) => item.total > 0
        );

        setLeadsData(filteredLeadsData);
        setFinanceData(financeRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dateFilter, endDate]);

  const handleFilterChange = (filter) => {
    setDateFilter(filter);
  };

  const handleCustomDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };
  if (loading) return <SpinnerLoader />;

  return (
    <>
      <ReportingHeader />
      <ReportingFilters
        onFilterChange={handleFilterChange}
        onCustomDateChange={handleCustomDateChange}
        dateFilter={dateFilter}
      />
      <div className="p-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTable("leads")}
            className={`px-4 py-2 rounded-lg ${
              activeTable === "leads"
                ? "bg-emerald-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Leads Overview
          </button>
          {/* <button
            onClick={() => setActiveTable("finance")}
            className={`px-4 py-2 rounded-lg ${
              activeTable === "finance"
                ? "bg-emerald-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Finance Overview
          </button> */}
        </div>

        {activeTable === "leads" ? (
          <LeadsTable data={leadsData} />
        ) : (
          <FinanceTable data={financeData} />
        )}
      </div>
    </>
  );
};

export default Reporting;
