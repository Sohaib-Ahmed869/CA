import { useEffect, useState } from "react";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import applicationsimg from "../../assets/applications.png";
import { BiRefresh } from "react-icons/bi";
const TimerLogsTable = () => {
  const [logs, setLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const URL = import.meta.env.VITE_REACT_BACKEND_URL;

  const fetchTimerLogs = async (date) => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        date: date?.toISOString().split("T")[0],
      });

      const response = await fetch(`${URL}/api/timer/logs?${params}`);
      const data = await response.json();
      console.log("timer logs", data);
      if (!response.ok) throw new Error(data.message || "Failed to fetch logs");

      setLogs(data.logs);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTimerLogs(selectedDate);
  }, [selectedDate, refresh]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div>
      {isLoading && <SpinnerLoader />}
      <div className="animate-fadeIn z-40">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 shadow-lg mb-6 pt-8 pb-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg
              className="h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 800"
            >
              <path
                fill="none"
                stroke="white"
                strokeWidth="2"
                d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63"
              />
              <path
                fill="none"
                stroke="white"
                strokeWidth="2"
                d="M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764"
              />
              <path
                fill="none"
                stroke="white"
                strokeWidth="2"
                d="M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880"
              />
              <path
                fill="none"
                stroke="white"
                strokeWidth="1"
                d="M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382"
              />
              <path
                fill="none"
                stroke="white"
                strokeWidth="1"
                d="M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764"
              />
              <path
                fill="none"
                stroke="white"
                strokeWidth="1"
                d="M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880"
              />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
              <div className="bg-white p-3 rounded-xl shadow-md">
                <img
                  src={applicationsimg}
                  alt="Applications"
                  className="h-32 w-auto"
                />
              </div>
            </div>
            <div className="text-center md:text-left text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Agent Time Logs
              </h1>
              <p className="text-emerald-100 max-w-3xl text-lg">
                View and track time logs for each agent
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4">
          <div className="mb-4 flex items-center gap-4">
            <label className="text-gray-500 font-normal text-lg">
              Filter by Date:
              <input
                type="date"
                value={selectedDate.toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="mx-2 p-2 border rounded-lg"
              />
            </label>
            <button
              className="flex gap-1 items-center bg-emerald-500 p-2 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-300"
              onClick={() => setRefresh((prev) => prev + 1)}
            >
              <BiRefresh /> Refresh{" "}
            </button>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-emerald-500">
                  <tr className="">
                    <th className="px-6 py-6 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Agent Name
                    </th>
                    <th className="px-6 py-6 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-6 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Last Start Time
                    </th>
                    <th className="px-6 py-6 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-6 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Total Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length === 0 && !isLoading && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4 text-gray-500"
                      >
                        No logs found for selected date
                      </td>
                    </tr>
                  )}
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 border-b border-gray-200">
                        {log.agentName}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200">
                        {log.agentEmail}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200">
                        {new Date(log.lastStartTime).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200">
                        <span
                          className={`px-2 py-2 rounded ${
                            log.status === "running"
                              ? "bg-green-100 text-green-800 rounded-lg"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200">
                        {formatTime(log.totalTime)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerLogsTable;
