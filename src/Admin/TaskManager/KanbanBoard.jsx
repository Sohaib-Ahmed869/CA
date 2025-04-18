import { DragDropContext } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import Column from "./Column";
import AgentFilter from "./AgentFilter";
import {
  createTask,
  fetchAllTasks,
  updateTaskStatus,
  updateTaskDetails,
} from "../../Customer/Services/taskService";

const KanbanBoard = ({ isManager, currentUser, agents }) => {
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetchAllTasks();
        setTasks(response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskUpdate = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (!isManager) return task.assignedTo === currentUser;
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
      const refreshedTasks = await fetchAllTasks();
      setTasks(refreshedTasks);
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
        agentName: currentUser,
      });
      setTasks((prev) => [...prev, createdTask]);
      // Refresh tasks after creation
      const refreshedTasks = await fetchAllTasks();
      setTasks(refreshedTasks);
    } catch (error) {
      console.error("Task creation failed:", error);
    }
  };

  const getTasksByStatus = (status) =>
    filteredTasks.filter((task) => task.status === status);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="p-4 bg-white min-h-screen overflow-x-auto">
        {isManager && (
          <AgentFilter
            agents={agents}
            selectedAgent={selectedAgent}
            onSelectAgent={setSelectedAgent}
          />
        )}

        <div className="flex gap-4 mt-4">
          <Column
            title="Todo"
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
            currentUser={currentUser}
          />

          <Column
            title="Completed"
            tasks={getTasksByStatus("completed")}
            onSave={handleTaskUpdate}
            status="completed"
            isManager={isManager}
            currentUser={currentUser}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
