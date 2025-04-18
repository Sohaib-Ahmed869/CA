// TaskModal.js
import { useState } from "react";
import { format } from "date-fns";
import {
  ChatBubbleOvalLeftIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PlusIcon } from "lucide-react";
import { updateTaskDetails } from "../../Customer/Services/taskService";

const TaskModal = ({ task, onClose, isManager, allAgents, onSave }) => {
  const [editedTask, setEditedTask] = useState(task);
  const [newComment, setNewComment] = useState("");
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const currentUser = localStorage.getItem("agent");
  console.log("current user", currentUser);
  const handleSave = async () => {
    try {
      await updateTaskDetails({
        taskId: task.id,
        updates: {
          title: editedTask.title,
          description: editedTask.description,
          priority: editedTask.priority,
          assignedTo: editedTask.assignedTo,
          dueDate: editedTask.dueDate,
          checklist: editedTask.checklist,
          comments: editedTask.comments,
        },
        agentName: currentUser,
        role: isManager ? "manager" : "agent",
      });
      onSave(editedTask);
      onClose();
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl flex gap-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
        >
          <XMarkIcon className="w-6 h-6 text-gray-500" />
        </button>

        {/* Left Side */}
        <div className="flex-1 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={!isManager && task.assignedBy === "manager"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Description
            </label>
            <textarea
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
              disabled={!isManager && task.assignedBy === "manager"}
            />
          </div>

          <div>
            <h3 className="font-medium mb-3 text-gray-700">Checklist</h3>
            <div className="space-y-2">
              {editedTask.checklist.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={(e) => {
                      const updatedChecklist = editedTask.checklist.map((i) =>
                        i.id === item.id
                          ? { ...i, completed: e.target.checked }
                          : i
                      );
                      setEditedTask({
                        ...editedTask,
                        checklist: updatedChecklist,
                      });
                    }}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    disabled={!isManager && task.assignedBy === "manager"}
                  />
                  <span
                    className={`flex-1 text-sm ${
                      item.completed
                        ? "line-through text-gray-500"
                        : "text-gray-700"
                    }`}
                  >
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
            {isManager && (
              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  value={newChecklistItem}
                  onChange={(e) => setNewChecklistItem(e.target.value)}
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Add checklist item"
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    e.target.value.trim() &&
                    setNewChecklistItem("")
                  }
                />
                <button
                  onClick={() => {
                    if (newChecklistItem.trim()) {
                      setEditedTask({
                        ...editedTask,
                        checklist: [
                          ...editedTask.checklist,
                          {
                            id: Date.now(),
                            text: newChecklistItem,
                            completed: false,
                          },
                        ],
                      });
                      setNewChecklistItem("");
                    }
                  }}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1"
                >
                  <PlusIcon className="w-4 h-4" />
                  Add
                </button>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-medium mb-3 text-gray-700">Comments</h3>
            <div className="space-y-3">
              {editedTask.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-blue-600">
                      {comment.user}
                    </span>
                    <time className="text-xs text-gray-500">
                      {format(new Date(comment.timestamp), "MMM dd, h:mm a")}
                    </time>
                  </div>
                  <p className="text-gray-700 text-sm">{comment.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-20"
                placeholder="Write a comment..."
              />
              <button
                onClick={() => {
                  if (newComment.trim()) {
                    setEditedTask({
                      ...editedTask,
                      comments: [
                        ...editedTask.comments,
                        {
                          id: Date.now(),
                          user: currentUser,
                          text: newComment,
                          timestamp: new Date().toISOString(),
                        },
                      ],
                    });
                    setNewComment("");
                  }
                }}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <ChatBubbleOvalLeftIcon className="w-4 h-4" />
                Post Comment
              </button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-64 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Assignee
            </label>
            <select
              value={editedTask.assignedTo}
              onChange={(e) =>
                setEditedTask({ ...editedTask, assignedTo: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={!isManager}
            >
              {allAgents?.map((agent) => (
                <option key={agent.id} value={agent.name}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              value={editedTask.dueDate}
              onChange={(e) =>
                setEditedTask({ ...editedTask, dueDate: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={!isManager && task.assignedBy === "manager"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Priority
            </label>
            <select
              value={editedTask.priority}
              onChange={(e) =>
                setEditedTask({ ...editedTask, priority: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={!isManager && task.assignedBy === "manager"}
            >
              <option value="high">High (Red)</option>
              <option value="medium">Medium (Orange)</option>
              <option value="low">Low (Green)</option>
            </select>
          </div>

          {isManager && (
            <button
              onClick={handleSave}
              className="w-full py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <CheckIcon className="w-5 h-5" />
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
