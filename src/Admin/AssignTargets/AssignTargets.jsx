import React, { useEffect, useState } from "react";
import applicationsimg from "../../assets/applications.png";
import { HiOutlineBadgeCheck, HiOutlineAcademicCap } from "react-icons/hi";
import { BsPeople, BsGraphUp, BsTelephoneOutbound } from "react-icons/bs";
import { FaBullseye } from "react-icons/fa";
import { Modal } from "antd";

import {
  getAgents,
  getApplications,
  getAgentTargets,
} from "../../Customer/Services/adminServices";
import AssignTargetsForm from "./assignTargetsForm";

const AssignTargets = () => {
  const [agents, setAgents] = useState([]);
  const [applications, setApplications] = useState([]);
  const [targets, setTargets] = useState([]);
  const [agentStats, setAgentStats] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Calculate metrics
  const completedApplications = applications.filter(
    (app) =>
      app.currentStatus === "Certificate Generated" ||
      app.currentStatus === "Dispatched" ||
      app.currentStatus === "Completed"
  ).length;

  const activeApplications = applications.filter(
    (app) => app.currentStatus !== "Certificate Generated"
  ).length;

  const uniqueUserIds = new Set(applications.map((app) => app.userId));
  const totalStudents = uniqueUserIds.size;
  const conversionRate =
    totalStudents > 0
      ? ((completedApplications / totalStudents) * 100).toFixed(1)
      : 0;

  useEffect(() => {
    const fetchData = async () => {
      const [apps, agts, trgts] = await Promise.all([
        getApplications(),
        getAgents(),
        getAgentTargets(),
      ]);
      setApplications(apps);
      setAgents(agts);
      setTargets(trgts);
    };
    fetchData();
  }, []);
  console.log("targets", targets);
  // useEffect(() => {
  //   const calculateStats = () => {
  //     const stats = {};
  //     const todayString = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  //     agents.forEach((agent) => {
  //       const agentTargetDoc = targets.find((t) => t.id === agent.id);
  //       let latestTarget = null;

  //       if (agentTargetDoc?.targets) {
  //         // Filter targets for today's date
  //         const todayTargets = agentTargetDoc.targets.filter(
  //           (t) => t.date === todayString
  //         );

  //         if (todayTargets.length > 0) {
  //           // Sort by createdAt descending to get the most recent target
  //           todayTargets.sort((a, b) => {
  //             const aDate = a.createdAt?.toDate
  //               ? a.createdAt.toDate()
  //               : new Date(a.createdAt);
  //             const bDate = b.createdAt?.toDate
  //               ? b.createdAt.toDate()
  //               : new Date(b.createdAt);
  //             return bDate - aDate;
  //           });
  //           latestTarget = todayTargets[0];
  //         }
  //       }

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
  //         // Find the agent ID by matching the name in assignedAdmin
  //         const agent = agents.find(
  //           (a) => a.name === application.assignedAdmin
  //         );

  //         if (agent) {
  //           const agentId = agent.id;
  //           const isCompleted =
  //             application.studentIntakeFormSubmitted &&
  //             application.documentsUploaded &&
  //             application.full_paid;

  //           if (isCompleted && stats[agentId]) {
  //             stats[agentId].applications.completed++;
  //           }
  //         }
  //       }
  //     });

  //     setAgentStats(stats);
  //   };

  //   calculateStats();
  // }, [applications, agents, targets]);
  // console.log("targets", targets);
  useEffect(() => {
    const calculateStats = () => {
      const stats = {};
      const todayString = selectedDate; // Get today's date in YYYY-MM-DD format

      // Create a map for quick agent lookup
      const agentMap = {};
      agents.forEach((agent) => {
        agentMap[agent.name] = agent.id;
      });

      agents.forEach((agent) => {
        const agentTargetDoc = targets.find((t) => t.id === agent.id);
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
  }, [applications, agents, targets, selectedDate]);

  // KPI Grid Component
  const KPIGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100">
        <div className="flex items-center gap-3 mb-2">
          <BsPeople className="text-emerald-600 text-2xl" />
          <h3 className="font-semibold text-gray-700 font-outfit">
            Total Applications
          </h3>
        </div>
        <p className="text-2xl font-regular text-emerald-900">
          {applications.length}
        </p>
        <span className="text-sm text-gray-500">
          {" "}
          Total Agents: {agents.length}
        </span>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100">
        <div className="flex items-center gap-3 mb-2">
          <HiOutlineBadgeCheck className="text-blue-600 text-2xl" />
          <h3 className="font-semibold text-gray-700">
            Certificates Generated
          </h3>
        </div>
        <p className="text-2xl font-regular text-blue-900">
          {completedApplications}
        </p>
        <span className="text-sm text-gray-500">Last 30 days</span>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100">
        <div className="flex items-center gap-3 mb-2">
          <BsGraphUp className="text-purple-600 text-2xl" />
          <h3 className="font-semibold text-gray-700">Conversion Rate</h3>
        </div>
        <p className="text-2xl font-regular text-indigo-900">
          {conversionRate}%
        </p>
        <div className="h-1 bg-gray-200 rounded-full mt-2">
          <div
            className="h-full bg-purple-600 rounded-full"
            style={{ width: `${conversionRate}%` }}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100">
        <div className="flex items-center gap-3 mb-2">
          <HiOutlineAcademicCap className="text-orange-600 text-2xl" />
          <h3 className="font-semibold text-gray-700">Students</h3>
        </div>
        <p className="text-2xl font-regular text-red-900">
          {activeApplications}
        </p>
        <span className="text-sm text-gray-500">Active applications</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 shadow-lg pt-8 pb-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-md">
              <img
                src={applicationsimg}
                alt="Applications"
                className="h-24 w-auto"
              />
            </div>
            <div className="text-center md:text-left text-white mb-6 md:mb-0">
              <h1 className="text-3xl md:text-3xl font-bold mb-2">
                Agent Performance Dashboard
              </h1>
              <p className="text-emerald-100 text-lg">
                Track and manage agent targets & performance metrics
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <KPIGrid />

        <div>
          <div className=" p-6  pb-10  mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2  ">
                <BsPeople className="text-emerald-600 text-xl border-l-4 border-solid    border-emerald-600 pl-2 size-8" />
                <h2 className="text-xl font-semibold text-emerald-800">
                  Agent Progress
                </h2>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <FaBullseye className="text-white" />
                Set Targets
              </button>
            </div>
            <div className="flex ml-1 gap-4 items-center my-4  ">
              <label className="block text-gray-700  text-lg font-regular mb-2">
                Choose Date :
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border rounded p-2 border-gray-300"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => {
                const stats = agentStats[agent.id] || {
                  applications: { target: 0, completed: 0 },
                  calls: { target: 0, completed: 0 },
                };

                const appProgress = Math.min(
                  (stats.applications.completed / stats.applications.target) *
                    100 || 0,
                  100
                );

                const callProgress = Math.min(
                  (stats.calls.completed / stats.calls.target) * 100 || 0,
                  100
                );

                return (
                  <div
                    key={agent.id}
                    className="bg-white p-8   py-12 rounded-xl shadow-lg border border-emerald-100 hover:shadow-xl transition-shadow"
                  >
                    <h3 className="font-semibold text-endigo-900 text-lg text-center mb-4 capitalize">
                      {agent.name}
                    </h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <HiOutlineBadgeCheck className="text-emerald-600" />
                          <span className="text-sm">
                            {stats.applications.completed}/
                            {stats.applications.target}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BsTelephoneOutbound className="text-blue-600" />
                          <span className="text-sm">
                            {stats.calls.completed}/{stats.calls.target}
                          </span>
                        </div>
                      </div>

                      {/* Applications Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-emerald-600">Applications</span>
                          <span>{appProgress.toFixed(1)}%</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                            style={{ width: `${appProgress}%` }}
                          />
                        </div>
                      </div>

                      {/* Calls Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-600">Calls</span>
                          <span>{callProgress.toFixed(1)}%</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-500"
                            style={{ width: `${callProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Target Modal */}
        <Modal
          title="Set Agent Targets"
          visible={showModal}
          onCancel={() => setShowModal(false)}
          footer={null}
          centered
          destroyOnClose
        >
          <AssignTargetsForm
            agents={agents}
            onSuccess={() => {
              const fetchTargets = async () => {
                const today = new Date().toISOString().split("T")[0];
                const targetsData = await getAgentTargets(null, today);
                setTargets(targetsData);
              };
              fetchTargets();
              setShowModal(false);
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default AssignTargets;
