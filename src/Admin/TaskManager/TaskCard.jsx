import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import TaskModal from "./TaskModal";

const priorityColors = {
  high: "red",
  medium: "orange",
  low: "green",
};

const TaskCard = ({ task, index, isManager, allAgents, onSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              {isManager ? (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {task?.assignedTo || "Unassigned"}
                </span>
              ) : (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Assigned
                </span>
              )}
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
        />
      )}
    </>
  );
};

export default TaskCard;
