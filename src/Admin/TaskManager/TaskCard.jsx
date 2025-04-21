import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import TaskModal from "./TaskModal";

const priorityColors = {
  high: "red",
  medium: "orange",
  low: "green",
};

const TaskCard = ({
  task,
  index,
  isManager,
  allAgents,
  onSave,
  currentUser,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getTagInfo = (task, currentUser, role) => {
    if (role === "manager" && task?.assignedTo.length > 0) {
      return {
        label: task.assignedTo,
        bg: "bg-green-100",
        text: "text-green-800",
      };
    }

    if (
      role === "agent" &&
      task?.assignedTo.length > 0 &&
      task?.assignedTo === currentUser
    ) {
      return {
        label: "Assigned",
        bg: "bg-green-100",
        text: "text-green-800",
      };
    }

    if (role === "agent" && task?.createdBy === currentUser) {
      return {
        label: "Personal",
        bg: "bg-yellow-100",
        text: "text-yellow-800",
      };
    }
    if (
      role === "manager" &&
      task?.createdBy === currentUser &&
      task?.assignedTo.length === 0
    ) {
      return {
        label: "unassigned",
        bg: "bg-blue-100",
        text: "text-blue-800",
      };
    }
    if (
      role === "manager" &&
      task?.createdBy === "manager" &&
      task?.assignedTo.length === 0
    ) {
      return {
        label: "Unassigned",
        bg: "bg-red-100",
        text: "text-red-800",
      };
    }
    if (role === "manager" && task?.createdBy) {
      return {
        label: `Self: ${task.createdBy}`,
        bg: "bg-purple-100",
        text: "text-purple-800",
      };
    }

    return {
      label: "Unassigned",
      bg: "bg-gray-100",
      text: "text-gray-800",
    };
  };
  const tag = getTagInfo(task, currentUser, isManager ? "manager" : "agent");

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`bg-white p-3 rounded-lg shadow-sm hover:shadow-md cursor-pointer border-l-4 mb-2 ${
              snapshot.isDragging ? "shadow-lg transform rotate-2" : ""
            }`}
            style={{
              borderLeftColor: priorityColors[task.priority],
              ...provided.draggableProps.style,
            }}
            onClick={() => setIsModalOpen(true)}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-800">{task.title}</h3>
              <span
                className={`text-xs px-2 py-1 rounded-full min-w-[80px] text-center ${tag.bg} ${tag.text}`}
              >
                {tag.label}
              </span>
            </div>
            {task.dueDate && (
              <p className="mt-2 text-xs text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            )}
          </div>
        )}
      </Draggable>

      {isModalOpen && (
        <TaskModal
          task={task}
          onSave={onSave}
          onClose={() => setIsModalOpen(false)}
          isManager={isManager}
          allAgents={allAgents}
          currentUser={currentUser}
        />
      )}
    </>
  );
};

export default TaskCard;
