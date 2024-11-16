import React, { useState } from "react";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase";
import toast, { Toaster } from "react-hot-toast";
import reset from "../../assets/reset.png";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Re-authenticate the user with their current password
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Update the password
      await updatePassword(user, newPassword);
      toast.success("Password updated successfully!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password. Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5 lg:mt-20">
      <Toaster position="top-right" />
      <div className="bg-white lg:p-20 w-full p-5">
        <div className="flex items-center mb-8 gap-5">
          <img src={reset} alt="Reset Password" className="h-24" />
          <div>
            <h2 className="text-2xl font-bold">Change Password</h2>
            <p className="text-gray-500">Change your account password here</p>
          </div>
        </div>
        <form onSubmit={handleChangePassword} className="flex flex-col">
          <input
            type="password"
            placeholder="Current Password"
            className="input input-bordered mb-4"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            className="input input-bordered mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="input input-bordered mb-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary text-white"
            disabled={loading}
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
