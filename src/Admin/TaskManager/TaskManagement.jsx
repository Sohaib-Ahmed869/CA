import React, { useEffect, useState } from "react";
import KanbanBoard from "./KanbanBoard";
import applicationsimg from "../../assets/applications.png";
import { BsPeople } from "react-icons/bs";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { MdPayment } from "react-icons/md";
import { getAgents } from "../../Customer/Services/adminServices";

const TaskManagement = () => {
  const [agents, setAgents] = useState([]);
  const [isManager, setIsManager] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    const userType = localStorage.getItem("type");
    if (userType === "manager") {
      setIsManager(true);
    }
    const agentUser = localStorage.getItem("agent");
    setCurrentUser(agentUser);

    const fetchData = async () => {
      const agents = await getAgents();
      console.log(agents);

      setAgents(agents);
    };
    fetchData();
  }, []);
  return (
    <div>
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
                Task Management
              </h1>
              <p className="text-emerald-100 max-w-3xl text-lg">
                Welcome to the Task Management Page, where you can manage and
                track your tasks efficiently.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                  <BsPeople className="mr-2" />
                  {/* <span>{applications.length} Total Applications</span> */}
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                  <HiOutlineBadgeCheck className="mr-2" />
                  {/* <span>{stats.completedApplications} Completed</span> */}
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                  <MdPayment className="mr-2" />
                  {/* <span>{stats.paidApplications} Paid</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="z-50">
        <KanbanBoard
          isManager={isManager}
          agents={agents}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default TaskManagement;
