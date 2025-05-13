import { DragDropContext } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import Column from "./Column";
import AgentFilter, { FilterByPriority } from "./AgentFilter";
import {
  createTask,
  fetchAllTasks,
  updateTaskStatus,
  updateTaskDetails,
} from "../../Customer/Services/taskService";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import DateRangeFilter from "./DateRangeFilter";
import { BiRefresh } from "react-icons/bi";

const KanbanBoard = ({
  isManager,
  currentUser,
  agents,
  setLoading,
  loading,
  ApplicationIds,
}) => {
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [prioritySortOrder, setPrioritySortOrder] = useState("high");
  const [selectedDateRange, setSelectedDateRange] = useState("1week");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const filters = {};
        if (selectedDateRange === "custom") {
          filters.startDate = customStartDate;
          filters.endDate = customEndDate;
        } else {
          filters.range = selectedDateRange;
        }
        const response = await fetchAllTasks(filters);
        setTasks(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [selectedDateRange, customEndDate, refresh]); // Re-fetch when filters change

  const handleTaskUpdate = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (!isManager) {
      return task.assignedTo === currentUser || task.createdBy === currentUser;
    }
    if (selectedAgent === "all") return true;
    return task.assignedTo === selectedAgent;
  });

  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const task = tasks.find((t) => t.id === result.draggableId);
    if (!task) return;

    const newStatus = destination.droppableId;
    const originalStatus = task.status;

    // Optimistic update
    const updatedTask = { ...task, status: newStatus };
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));

    try {
      await updateTaskStatus({
        taskId: task.id,
        status: newStatus,
        agentName: currentUser,
        role: isManager ? "manager" : "agent",
      });
      // Refresh tasks after status update
      const filters = {};
      if (selectedDateRange === "custom") {
        filters.startDate = customStartDate;
        filters.endDate = customEndDate;
      } else {
        filters.range = selectedDateRange;
      }
      const refreshedTasks = await fetchAllTasks(filters);
      setTasks(refreshedTasks);
      console.log("refreshed tasks", refreshedTasks);
    } catch (error) {
      // Rollback on error
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, status: originalStatus } : t
        )
      );
      console.error("Status update failed:", error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const createdTask = await createTask({
        title: newTask.title,
        agentName: isManager ? "manager" : currentUser,
      });
      setTasks((prev) => [...prev, createdTask]);
      // Refresh tasks after creation
      const refreshedTasks = await fetchAllTasks();
      setTasks(refreshedTasks);
    } catch (error) {
      console.error("Task creation failed:", error);
    }
  };

  const getTasksByStatus = (status) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };

    return filteredTasks
      .filter((task) => task.status === status)
      .sort((a, b) => {
        const aPriority = priorityOrder[a.priority] || 0;
        const bPriority = priorityOrder[b.priority] || 0;

        return prioritySortOrder === "high"
          ? bPriority - aPriority
          : aPriority - bPriority;
      });
  };
  return (
    <>
      {loading && <SpinnerLoader />}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="p-4 bg-white min-h-screen overflow-x-auto">
          {!loading && (
            <div className="flex justify-between gap-4 mb-4 items-center bg-gray-50  border-2 p-4 rounded-lg">
              {isManager && (
                <AgentFilter
                  agents={agents}
                  selectedAgent={selectedAgent}
                  onSelectAgent={setSelectedAgent}
                />
              )}
              <FilterByPriority
                priority={prioritySortOrder}
                setPriority={setPrioritySortOrder}
              />
              <DateRangeFilter
                selectedRange={selectedDateRange}
                onRangeChange={setSelectedDateRange}
                onCustomStartChange={setCustomStartDate}
                onCustomEndChange={setCustomEndDate}
                customStartDate={customStartDate}
                customEndDate={customEndDate}
              />
              <button
                className="flex gap-1 items-center bg-emerald-500 p-2 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-300"
                onClick={() => setRefresh((prev) => prev + 1)}
              >
                <BiRefresh /> Refresh{" "}
              </button>
            </div>
          )}
          <div className="flex gap-4 mt-4">
            <Column
              ApplicationIds={ApplicationIds}
              title="To do"
              tasks={getTasksByStatus("todo")}
              status="todo"
              onSave={handleTaskUpdate}
              onAddTask={handleAddTask}
              isManager={isManager}
              agents={agents}
              currentUser={currentUser}
            />

            <Column
              title="In Progress"
              tasks={getTasksByStatus("inProgress")}
              status="inProgress"
              onSave={handleTaskUpdate}
              isManager={isManager}
              agents={agents}
              currentUser={currentUser}
              ApplicationIds={ApplicationIds}
            />

            <Column
              title="Completed"
              tasks={getTasksByStatus("completed")}
              onSave={handleTaskUpdate}
              status="completed"
              agents={agents}
              isManager={isManager}
              ApplicationIds={ApplicationIds}
              currentUser={currentUser}
            />
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default KanbanBoard;
