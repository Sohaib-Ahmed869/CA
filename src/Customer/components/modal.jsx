import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";

import { updateEmail, updatePhone } from "../Services/adminServices";
const Modal = ({
  isUpdatePhoneOpen,
  isUpdateEmailOpen,
  setIsUpdatePhoneOpen,
  setIsUpdateEmailOpen,
}) => {
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const handlePhoneUpdate = async () => {
    try {
      setSubmissionLoading(true);
      const response = await updatePhone(auth.currentUser.uid, updatedPhone);
      if (response === "error") {
        toast.error("Failed to update phone number.");
      } else {
        toast.success("Phone number updated successfully!");
      }
      setSubmissionLoading(false);
      setIsUpdatePhoneOpen(false);
    } catch (error) {
      console.error("Error updating phone:", error);
      toast.error("An error occurred while updating the phone number.");
      setSubmissionLoading(false);
    }
  };

  // Update Email Function
  const handleEmailUpdate = async () => {
    try {
      setSubmissionLoading(true);
      const response = await updateEmail(auth.currentUser.uid, updatedEmail);
      if (response === "error") {
        toast.error("Failed to update email.");
      } else {
        toast.success("Email updated successfully!");
      }
      setSubmissionLoading(false);
      setIsUpdateEmailOpen(false);
    } catch (error) {
      console.error("Error updating email:", error);
      toast.error("An error occurred while updating the email.");
      setSubmissionLoading(false);
    }
  };

  return (
    <div>
      {isUpdatePhoneOpen && (
        <dialog className="modal modal-open min-h-screen  min-w-screen">
          <div className="modal-box">
            <button
              className="btn btn-secondary float-right"
              onClick={() => setIsUpdatePhoneOpen(false)}
            >
              <RxCross1 className="text-sm  text-warning" />
              Close{" "}
            </button>
            <h3 className="font-bold text-lg">Update Phone</h3>
            <input
              className="input input-bordered w-full mt-4"
              value={updatedPhone}
              onChange={(e) => setUpdatedPhone(e.target.value)}
              placeholder="Enter new phone number"
            />
            <button
              className="btn btn-primary text-white  mt-4 w-full"
              onClick={handlePhoneUpdate}
            >
              Update Phone
            </button>
          </div>
        </dialog>
      )}

      {/* Update Email Modal */}
      {isUpdateEmailOpen && (
        <dialog className="modal modal-open   min-h-screen">
          <div className="modal-box">
            <button
              className="btn btn-secondary float-right"
              onClick={() => setIsUpdateEmailOpen(false)}
            >
              <RxCross1 className="text-sm  text-warning" />
              Close
            </button>
            <h3 className="font-bold text-md">Update Email</h3>
            <input
              className="input input-bordered w-full mt-4"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              placeholder="Enter new email address"
            />
            <button
              className="btn btn-primary text-white mt-4 w-full"
              onClick={handleEmailUpdate}
            >
              Update Email
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Modal;
