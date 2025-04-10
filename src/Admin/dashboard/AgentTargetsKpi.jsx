import React, { useEffect, useState } from "react";
import { HiOutlineBadgeCheck, HiOutlineAcademicCap } from "react-icons/hi";
import { BsTelephoneOutbound } from "react-icons/bs";
import { FaBullseye } from "react-icons/fa";
import {
  getAgents,
  getAgentTargets,
  getApplications,
} from "../../Customer/Services/adminServices";

const AgentTargetsKPI = () => {
  const [agents, setAgents] = useState([]);
  const [targets, setTargets] = useState([]);
  const [agentStats, setAgentStats] = useState({});
  const [agentName, setAgentName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all required data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [agts, trgts, apps] = await Promise.all([
          getAgents(),
          getAgentTargets(),
          getApplications(),
        ]);

        setAgents(agts);
        setTargets(trgts);
        setApplications(apps);
        setError(null);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get agent name from localStorage
  useEffect(() => {
    const storedAgentName = localStorage.getItem("agentuser");
    setAgentName(storedAgentName || "");
  }, []);

  // // Calculate agent stats
  // useEffect(() => {
  //   const calculateStats = () => {
  //     const stats = {};

  //     // Initialize agent stats with targets
  //     agents.forEach((agent) => {
  //       const agentTarget = targets.find((t) => t.id === agent.id);
  //       const latestTarget = agentTarget?.targets?.[0];

  //       stats[agent.id] = {
  //         applications: {
  //           target: latestTarget?.applications || 0,
  //           completed: 0,
  //         },
  //         calls: {
  //           target: latestTarget?.calls || 0,
  //           completed: 0,
  //         },
  //       };
  //     });

  //     // Calculate completed applications
  //     applications.forEach((application) => {
  //       if (application.assignedAdmin) {
  //         const agent = agents.find(
  //           (a) => a.name === application.assignedAdmin
  //         );
  //         if (agent) {
  //           const isCompleted =
  //             application.studentIntakeFormSubmitted &&
  //             application.documentsUploaded &&
  //             application.full_paid;

  //           if (isCompleted && stats[agent.id]) {
  //             stats[agent.id].applications.completed++;
  //           }
  //         }
  //       }
  //     });

  //     setAgentStats(stats);
  //   };

  //   if (agents.length > 0 && applications.length > 0) {
  //     calculateStats();
  //   }
  // }, [applications, agents, targets]);
  useEffect(() => {
    const calculateStats = () => {
      const stats = {};
      const today = new Date();
      const todayString = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"), // Months are 0-indexed
        String(today.getDate()).padStart(2, "0"),
      ].join("-"); // Create a map for quick agent lookup
      const agentMap = {};
      agents.forEach((agent) => {
        agentMap[agent.name] = agent.id;
      });
      console.log("targets", targets);
      agents.forEach((agent) => {
        const agentTargetDoc = targets?.find((t) => t.id === agent.id);
        let latestTarget = null;

        if (agentTargetDoc?.targets) {
          // Filter targets for today's date
          const todayTargets = agentTargetDoc.targets.filter(
            (t) => t.date === todayString
          );

          if (todayTargets.length > 0) {
            // Sort by createdAt descending to get the most recent target
            todayTargets.sort((a, b) => {
              const aDate = a.createdAt?.toDate
                ? a.createdAt.toDate()
                : new Date(a.createdAt);
              const bDate = b.createdAt?.toDate
                ? b.createdAt.toDate()
                : new Date(b.createdAt);
              return bDate - aDate;
            });
            latestTarget = todayTargets[0];
          }
        }

        stats[agent.id] = {
          applications: {
            target: latestTarget?.applications || 0,
            completed: 0,
          },
          calls: {
            target: latestTarget?.calls || 0,
            completed: 0,
          },
        };
      });

      const validStatuses = [
        "Certificate Generated",
        "Sent to Assessor",
        "Completed",
        "Documents Uploaded",
        "Student Intake Form",
      ];

      applications.forEach((application) => {
        const agentId = agentMap[application.assignedAdmin]; // Now agentMap is properly defined

        if (agentId && validStatuses.includes(application.currentStatus)) {
          const isCompleted =
            application.studentIntakeFormSubmitted &&
            application.documentsUploaded &&
            application.full_paid;

          // Find the status entry where statusname matches currentStatus
          const matchedStatus = application.status.find(
            (s) => s.statusname === application.currentStatus
          );

          if (matchedStatus) {
            const statusDate = new Date(matchedStatus.time)
              .toISOString()
              .split("T")[0];

            // Check if the application was completed today
            if (isCompleted && statusDate === todayString) {
              if (!stats[agentId]) {
                stats[agentId] = {
                  applications: { target: 0, completed: 0 },
                  calls: { target: 0, completed: 0 },
                };
              }
              stats[agentId].applications.completed++;
            }
          }
        }
      });

      setAgentStats(stats);
    };

    calculateStats();
  }, [applications, agents, targets]);

  // Get current agent's stats
  const currentAgent = agents.find((a) => a.name === agentName);
  const agentId = currentAgent?.id;
  const currentStats = agentId ? agentStats[agentId] : null;

  if (isLoading) {
    return (
      <div className="rounded-xl shadow-sm p-6 border border-indigo-100 bg-indigo-50">
        <div className="animate-pulse flex justify-between items-start">
          <div className="space-y-3">
            <div className="h-4 bg-indigo-200 rounded w-3/4"></div>
            <div className="h-6 bg-indigo-200 rounded w-1/2"></div>
            <div className="h-4 bg-indigo-200 rounded w-1/3"></div>
          </div>
          <div className="h-10 w-10 bg-indigo-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl shadow-sm p-6 border border-red-100 bg-red-50">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="rounded-xl shadow-sm p-6 border border-indigo-100 bg-indigo-50 transition-all hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium mb-1 text-indigo-800">
            Your Current Targets
          </p>
          <div className="flex gap-6 mt-3">
            <div className="flex items-center gap-2">
              <HiOutlineBadgeCheck className="h-5 w-5 text-indigo-600" />
              <span className="text-xl font-bold text-indigo-800">
                {currentStats?.applications.completed || 0}/
                {currentStats?.applications.target || 0}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BsTelephoneOutbound className="h-5 w-5 text-indigo-600" />
              <span className="text-xl font-bold text-indigo-800">
                {currentStats?.calls.completed || 0}/
                {currentStats?.calls.target || 0}
              </span>
            </div>
          </div>
          {agentName && (
            <p className="text-xs text-indigo-600 mt-3">Agent: {agentName}</p>
          )}
        </div>
        <div className="p-3 rounded-lg text-indigo-700 bg-white bg-opacity-50">
          <FaBullseye className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default AgentTargetsKPI;
