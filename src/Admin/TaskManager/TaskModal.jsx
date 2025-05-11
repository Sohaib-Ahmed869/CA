import { Suspense, useEffect, useState } from "react";
import { format } from "date-fns";
import {
  ChatBubbleOvalLeftIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon, Tag } from "lucide-react";
import {
  getApplicationById,
  updateTaskDetails,
} from "../../Customer/Services/taskService";
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
import { BsEye } from "react-icons/bs";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import Application from "../customers/applicationpage";
import { resendEmail } from "../../Customer/Services/adminServices";
import toast, { Toaster } from "react-hot-toast";
import PaymentPage from "../../Customer/checkoutForm";
import { IoMdClose } from "react-icons/io";

// Helper functions for lead status
const getColorLabel = (colorValue) => {
  const colorMap = {
    red: "Hot Lead",
    orange: "Warm Lead",
    gray: "Cold Lead",
    yellow: "Proceeded With Payment",
    lightblue: "Impacted Student",
    pink: "Agent",
    green: "Completed",
    white: "Default",
  };
  return colorMap[colorValue] || "N/A";
};

const getLeadStatusClass = (colorValue) => {
  const colorClassMap = {
    red: "bg-red-100 text-red-800",
    orange: "bg-orange-100 text-orange-800",
    gray: "bg-gray-100 text-gray-800",
    yellow: "bg-yellow-100 text-yellow-800",
    lightblue: "bg-blue-100 text-blue-800",
    pink: "bg-pink-100 text-pink-800",
    green: "bg-green-100 text-green-800",
    white: "bg-gray-50 text-gray-800",
  };
  return colorClassMap[colorValue] || "bg-gray-100 text-gray-800";
};

// TASK MODAL CODE

const TaskModal = ({
  task,
  onClose,
  isManager,
  allAgents,
  onSave,
  ApplicationIds,
  currentUser,
}) => {
  const [editedTask, setEditedTask] = useState({
    ...task,
    applicationDetails: task.applicationDetails || null, // Initialize with existing value or null
  });
  const onClickPayment = (
    price,
    discount,
    applicationId,
    userId,
    partialScheme,
    paid,
    payment1,
    payment2,
    full_paid
  ) => {
    setUserId(userId);

    // Calculate discounted price
    if (!discount) {
      setPrice(price);
    } else {
      setPrice(calculateDiscountedPrice(price, discount));
    }

    setApplicationId(applicationId);
    setPartialScheme(partialScheme);
    setPaid(paid);
    setPayment1(payment1);
    setPayment2(payment2);
    setFullPaid(full_paid);

    setShowCheckoutModal(true);
  };
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [price, setPrice] = useState(0);
  const [applicationId, setApplicationId] = useState("");
  const [userId, setUserId] = useState(null);
  const [partialScheme, setPartialScheme] = useState(false);
  const [paid, setPaid] = useState(false);
  const [payment1, setPayment1] = useState(0);
  const [payment2, setPayment2] = useState(0);
  const [full_paid, setFullPaid] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItemText, setEditedItemText] = useState("");
  const [isAppIdDropdownOpen, setIsAppIdDropdownOpen] = useState(false);
  const [appIdSearchTerm, setAppIdSearchTerm] = useState("");
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showApplicationView, setShowApplicationView] = useState(false);
  const handleViewApplication = async (id) => {
    setLoading(true);

    const app = await getApplicationById(id);
    console.log(app);
    setApplication(app);

    // Add delay of 500ms before completing
    await new Promise((resolve) => setTimeout(resolve, 500));

    setLoading(false);
    setSelectedApplication(app);
    setShowApplicationView(true);
  };
  const handleEditItem = (item) => {
    setEditingItemId(item.id);
    setEditedItemText(item.text);
  };
  const resendEmailFunc = async (userId) => {
    try {
      // setSubmissionLoading(true);
      const response = await resendEmail(userId);

      if (response === "error") {
        toast.error("Failed to resend email");
      } else {
        toast.success("Email resent successfully");
      }
    } catch (error) {
      console.error("Failed to resend email:", error);
      toast.error("An error occurred while resending email");
    } finally {
      // setSubmissionLoading(false);
    }
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
          applicationDetails: editedTask.applicationDetails, // Store full application details
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

  // Format date for application items
  const formatAppDate = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Toaster />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-[60]">
            <SpinnerLoader />
          </div>
        )}
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

            {/* Application Dropdown - Now positioned directly after title */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-1">
                <Tag size={16} /> Application Details
              </label>
              {isManager || task.createdBy === currentUser ? (
                <div className="relative">
                  <div
                    className="w-full p-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 cursor-pointer flex items-center justify-between"
                    onClick={() => setIsAppIdDropdownOpen(!isAppIdDropdownOpen)}
                  >
                    <div className="flex items-center gap-2">
                      {editedTask.applicationDetails ? (
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                              {editedTask.applicationDetails.applicationId}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatAppDate(
                                editedTask.applicationDetails.createdAt
                              )}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewApplication(
                                  editedTask.applicationDetails.id
                                );
                              }}
                              className="text-gray-600 hover:text-blue-600"
                            >
                              <BsEye className="text-lg " />
                            </button>
                          </div>
                          <span className="text-sm font-medium mt-1">
                            {editedTask.applicationDetails.applicantName}
                          </span>
                          <div className="flex items-center mt-0.5">
                            <span className="text-xs text-gray-600">
                              Status:
                            </span>
                            <span
                              className={`text-xs ml-1 px-2 py-0.5 rounded-full ${getLeadStatusClass(
                                editedTask.applicationDetails.color || "white"
                              )}`}
                            >
                              {getColorLabel(
                                editedTask.applicationDetails.color || "white"
                              )}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-500 ">
                          Select Application
                        </span>
                      )}
                    </div>
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        isAppIdDropdownOpen ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {isAppIdDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <div className="sticky top-0 p-1 bg-white">
                        <input
                          type="text"
                          value={appIdSearchTerm}
                          onChange={(e) => setAppIdSearchTerm(e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Search by ID or name"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="p-1">
                        <div
                          className="p-2 hover:bg-gray-100 rounded cursor-pointer text-gray-500"
                          onClick={() => {
                            setEditedTask({
                              ...editedTask,
                              applicationDetails: null,
                            });
                            setIsAppIdDropdownOpen(false);
                            setAppIdSearchTerm("");
                          }}
                        >
                          None
                        </div>
                        {ApplicationIds.filter(
                          (app) =>
                            app.applicationId
                              .toLowerCase()
                              .includes(appIdSearchTerm.toLowerCase()) ||
                            app.applicantName
                              .toLowerCase()
                              .includes(appIdSearchTerm.toLowerCase())
                        ).map((app) => (
                          <div
                            key={app.id}
                            className={`p-2 hover:bg-gray-100 rounded cursor-pointer ${
                              editedTask.applicationDetails?.applicationId ===
                              app.applicationId
                                ? "bg-blue-50"
                                : ""
                            }`}
                            onClick={() => {
                              setEditedTask({
                                ...editedTask,
                                applicationDetails: app, // Store the entire application object
                              });
                              setIsAppIdDropdownOpen(false);
                              setAppIdSearchTerm("");
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-medium text-sm">
                                    {app.applicationId}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {formatAppDate(app.createdAt)}
                                  </span>
                                </div>
                                <span className="text-sm mt-1">
                                  {app.applicantName}
                                </span>
                                <div className="flex items-center mt-0.5">
                                  <span className="text-xs text-gray-600">
                                    Status:
                                  </span>
                                  <span
                                    className={`text-xs ml-1 px-2 py-0.5 rounded-full ${getLeadStatusClass(
                                      app.color || "white"
                                    )}`}
                                  >
                                    {getColorLabel(app.color || "white")}
                                  </span>
                                </div>
                              </div>
                              {editedTask.applicationDetails?.applicationId ===
                                app.applicationId && (
                                <CheckIcon className="w-4 h-4 text-blue-600" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 w-full p-2 border rounded-lg">
                  {editedTask.applicationDetails ? (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                          {editedTask.applicationDetails.applicationId}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatAppDate(
                            editedTask.applicationDetails.createdAt
                          )}
                        </span>
                        <button
                          onClick={() => {
                            handleViewApplication(
                              editedTask.applicationDetails.id
                            );
                          }}
                        >
                          <BsEye className="text-gray-600" />
                        </button>
                      </div>
                      <span className="text-sm font-medium mt-1">
                        {editedTask.applicationDetails.applicantName}
                      </span>
                      <div className="flex items-center mt-0.5">
                        <span className="text-xs text-gray-600">Status:</span>
                        <span
                          className={`text-xs ml-1 px-2 py-0.5 rounded-full ${getLeadStatusClass(
                            editedTask.applicationDetails.color || "white"
                          )}`}
                        >
                          {getColorLabel(
                            editedTask.applicationDetails.color || "white"
                          )}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-500">
                      No application selected
                    </span>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 text-gray-700 flex items-center gap-1">
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
                          const updatedChecklist = editedTask.checklist.map(
                            (i) =>
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
                <span className="flex items-center gap-2">
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
                  <span className="flex items-center gap-2">
                    <BiCalendar />
                    {task.dueDate || "No due date"}
                  </span>
                </div>
              )}
            </div>
            <div>
              {isManager || task.createdBy === currentUser ? (
                <>
                  <label className="text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
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
          </div>
        </div>
      </div>
      {showApplicationView && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <Application
            application={application}
            setSelectedApplication={setShowApplicationView}
            getApplicationsData={() => {}}
            onClickInitiateCall={() => {}}
            resendEmailFunc={resendEmailFunc}
            onClickPayment={onClickPayment}
          />
        </div>
      )}
      {/* Payment Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Process Payment
                  </h3>
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setShowCheckoutModal(false)}
                  >
                    <span className="sr-only">Close</span>
                    <IoMdClose className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-4">
                  <Suspense fallback={<div>Loading...</div>}>
                    <PaymentPage
                      price={price}
                      applicationId={applicationId}
                      partialScheme={partialScheme}
                      paid={paid}
                      payment1={payment1}
                      payment2={payment2}
                      setShowCheckoutModal={setShowCheckoutModal}
                      getUserApplications={() => {}}
                      userId={userId}
                    />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskModal;
