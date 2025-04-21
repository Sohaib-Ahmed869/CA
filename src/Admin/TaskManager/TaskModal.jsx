// TaskModal.js
import { useState } from "react";
import { format } from "date-fns";
import {
  ChatBubbleOvalLeftIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "lucide-react";
import { updateTaskDetails } from "../../Customer/Services/taskService";
import {
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
  BiCalendar,
  BiListCheck,
  BiMessageAltDetail,
  BiUser,
} from "react-icons/bi";
import { CiTextAlignRight } from "react-icons/ci";

const TaskModal = ({
  task,
  onClose,
  isManager,
  allAgents,
  onSave,
  currentUser,
}) => {
  const [editedTask, setEditedTask] = useState(task);
  const [newComment, setNewComment] = useState("");
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItemText, setEditedItemText] = useState("");
  const handleEditItem = (item) => {
    setEditingItemId(item.id);
    setEditedItemText(item.text);
  };

  const handleSaveEdit = () => {
    setEditedTask((prev) => ({
      ...prev,
      checklist: prev.checklist.map((item) =>
        item.id === editingItemId ? { ...item, text: editedItemText } : item
      ),
    }));
    setEditingItemId(null);
    setEditedItemText("");
  };

  const handleDeleteItem = (itemId) => {
    setEditedTask((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((item) => item.id !== itemId),
    }));
  };
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
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      case "medium":
        return <ExclamationCircleIcon className="w-5 h-5 text-yellow-500" />;
      case "low":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };
  const getPriorityBorderColor = () => {
    switch (editedTask.priority) {
      case "high":
        return "border-red-500";
      case "medium":
        return "border-yellow-500";
      case "low":
        return "border-green-500";
      default:
        return "border-gray-500";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50  flex items-center justify-center p-4 z-50 ">
      <div
        className={`bg-white rounded-lg p-6 w-full max-w-3xl flex gap-6 relative border-l-4 h-[90vh] pb-10 overflow-y-auto ${getPriorityBorderColor()}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
        >
          <XMarkIcon className="w-6 h-6 text-gray-500" />
        </button>

        {/* Left Side */}
        <div className="flex-1 space-y-6">
          {isManager || task.createdBy === currentUser ? (
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
          ) : (
            <div className="flex items-center gap-2 w-full p-2 mt-7 border rounded-lg">
              <span className="capitalize">{editedTask.title}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-1">
              <CiTextAlignRight size={18} className="text-gray-900" />{" "}
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
            <h3 className="font-medium mb-3 text-gray-700 flex items-center gap-1">
              <BiListCheck size={20} /> Checklist
            </h3>
            <div className="space-y-2">
              {editedTask.checklist.map((item) => (
                <div key={item.id} className="group relative">
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
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
                    />
                    {editingItemId === item.id ? (
                      <input
                        value={editedItemText}
                        onChange={(e) => setEditedItemText(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSaveEdit()
                        }
                        autoFocus
                        className="flex-1 p-1 border-b-2 focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <span
                        className={`flex-1 text-sm ${
                          item.completed
                            ? "line-through text-gray-500"
                            : "text-gray-700"
                        }`}
                      >
                        {item.text}
                      </span>
                    )}

                    {(isManager || task.createdBy === currentUser) && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {editingItemId === item.id ? (
                          <>
                            <button
                              onClick={handleSaveEdit}
                              className="text-green-500 hover:text-green-600"
                            >
                              <CheckIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingItemId(null)}
                              className="text-gray-500 hover:text-gray-600"
                            >
                              <XMarkIcon className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditItem(item)}
                              className="text-gray-500 hover:text-blue-600"
                            >
                              <PencilSquareIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-gray-500 hover:text-red-600"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </label>
                </div>
              ))}
              {editedTask.checklist.length === 0 && (
                <span className="text-sm text-gray-500">
                  No Items in checklist
                </span>
              )}
            </div>
            {isManager || task.createdBy === currentUser ? (
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
                  className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-1"
                >
                  <PlusIcon className="w-4 h-4" />
                  Add
                </button>
              </div>
            ) : null}
          </div>

          <div>
            <h3 className="font-medium mb-3 text-gray-700 flex items-center gap-1">
              <BiMessageAltDetail size={18} /> Comments
            </h3>
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
                          user: isManager ? "Manager" : currentUser,
                          text: newComment,
                          timestamp: new Date().toISOString(),
                        },
                      ],
                    });
                    setNewComment("");
                  }
                }}
                className="mt-2 px-4 py-2  bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2"
              >
                <ChatBubbleOvalLeftIcon className="w-4 h-4" />
                Post Comment
              </button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-64 space-y-6">
          {isManager && task.createdBy === "manager" && (
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
                <option value="">Select Agent</option>
                {allAgents?.map((agent) => (
                  <option key={agent.id} value={agent.name}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {!isManager && (
            <div className="flex items-center gap-2 w-full p-2 mt-7 border rounded-lg">
              <span className=" flex items-center gap-2">
                <BiUser />
                {task.assignedTo || "personal"}
              </span>
            </div>
          )}

          <div>
            {isManager || task.createdBy === currentUser ? (
              <>
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
              </>
            ) : (
              <div className="flex items-center gap-2 w-full p-2 border rounded-lg">
                <span className=" flex items-center gap-2">
                  <BiCalendar />
                  {task.dueDate || "No due date"}
                </span>
              </div>
            )}
          </div>
          <div>
            {isManager || task.createdBy === currentUser ? (
              <>
                <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
                  Priority
                  {getPriorityIcon(editedTask.priority)}
                </label>
                <select
                  value={editedTask.priority}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, priority: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={!isManager && task.assignedBy === "manager"}
                >
                  <option value="high">High </option>
                  <option value="medium">Medium </option>
                  <option value="low">Low </option>
                </select>
              </>
            ) : (
              <div className="flex items-center gap-2 w-full p-2 border rounded-lg">
                {getPriorityIcon(task.priority)}
                <span className="capitalize">{task.priority}</span>
              </div>
            )}
          </div>

          <button
            onClick={handleSave}
            className="w-full py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 hover:transition-all duration-100 ease-in-out flex items-center justify-center gap-2"
          >
            <CheckIcon className="w-5 h-5" />
            Save Changes
          </button>

          {/* {!isManager && task.createdBy === currentUser && (
            <button
              onClick={handleSave}
              className="w-full py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 hover:transition-all duration-100 ease-in-out flex items-center justify-center gap-2"
            >
              <CheckIcon className="w-5 h-5" />
              Save Changes
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
