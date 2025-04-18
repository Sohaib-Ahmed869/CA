// Column.js
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Column = ({
  title,
  tasks,
  status,
  onAddTask,
  isManager,
  agents,
  onSave,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showAddTaskInput, setShowAddTaskInput] = useState(false);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
      // Create basic task structure
      const newTask = {
        title: newTaskTitle.trim(),
        status: "todo",
        priority: "medium",
        assignedTo: "", // This should be set properly based on your logic
        checklist: [],
        comments: [],
        dueDate: "",
      };

      // Call parent handler
      await onAddTask(newTask);

      // Reset state
      setNewTaskTitle("");
      setShowAddTaskInput(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-sm">
      <div className="flex justify-center  items-center mb-4 relative">
        <h3 className="font-semibold text-gray-700 text-lg ">{title}</h3>
        <span className="text-sm text-gray-500 absolute right-0">
          {tasks.length}
        </span>
      </div>

      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2 min-h-[200px]"
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                onSave={onSave}
                index={index}
                isManager={isManager}
                allAgents={agents}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {status === "todo" && (
        <div className="mt-4">
          {!showAddTaskInput ? (
            <button
              onClick={() => setShowAddTaskInput(true)}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700 w-full hover:bg-gray-100 p-1.5 rounded"
            >
              <PlusIcon className="w-4 h-4 mr-1" />
              Add Task
            </button>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter a title or paste a link"
                className="w-full p-2 border rounded text-sm focus:outline-emerald-500"
                autoFocus
                onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddTask}
                  className="px-3 py-1.5 text-sm bg-emerald-500 text-white rounded hover:bg-blue-600"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setNewTaskTitle("");
                    setShowAddTaskInput(false);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Column;
