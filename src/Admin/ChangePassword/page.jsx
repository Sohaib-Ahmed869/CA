import React, { useState } from "react";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase";
import toast, { Toaster } from "react-hot-toast";
import reset from "../../assets/reset.png";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaCheck,
  FaTimes,
  FaShieldAlt,
} from "react-icons/fa";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password strength indicators
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
    newPassword
  );

  const passwordStrength = [
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
  ].filter(Boolean).length;

  // Get password strength label and color
  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0)
      return { label: "Very Weak", color: "bg-red-500" };
    if (passwordStrength <= 2) return { label: "Weak", color: "bg-red-400" };
    if (passwordStrength === 3)
      return { label: "Moderate", color: "bg-yellow-500" };
    if (passwordStrength === 4)
      return { label: "Strong", color: "bg-green-400" };
    return { label: "Very Strong", color: "bg-green-600" };
  };

  const strengthInfo = getPasswordStrengthLabel();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      setLoading(false);
      return;
    }

    if (passwordStrength < 3) {
      toast.error("Please use a stronger password");
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
    <div className="min-h-screen bg-gray-50 py-12">
      <Toaster position="top-right" />
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden lg:max-w-7xl">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-full">
              <img src={reset} alt="Reset Password" className="h-12 w-12" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Change Password</h2>
              <p className="text-emerald-100">
                Secure your account with a strong password
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleChangePassword} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaShieldAlt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Create a new password"
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Password strength meter */}
              {newPassword && (
                <div className="mt-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                    <div
                      className={`h-full ${strengthInfo.color} rounded-full transition-all duration-300`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    Password strength:{" "}
                    <span
                      className={`ml-1 font-medium text-${strengthInfo.color.replace(
                        "bg-",
                        ""
                      )}`}
                    >
                      {strengthInfo.label}
                    </span>
                  </p>
                </div>
              )}

              {/* Password requirements */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div
                  className={`flex items-center text-sm ${
                    hasMinLength ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {hasMinLength ? (
                    <FaCheck className="mr-1" />
                  ) : (
                    <FaTimes className="mr-1" />
                  )}
                  At least 8 characters
                </div>
                <div
                  className={`flex items-center text-sm ${
                    hasUpperCase ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {hasUpperCase ? (
                    <FaCheck className="mr-1" />
                  ) : (
                    <FaTimes className="mr-1" />
                  )}
                  Uppercase letter
                </div>
                <div
                  className={`flex items-center text-sm ${
                    hasLowerCase ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {hasLowerCase ? (
                    <FaCheck className="mr-1" />
                  ) : (
                    <FaTimes className="mr-1" />
                  )}
                  Lowercase letter
                </div>
                <div
                  className={`flex items-center text-sm ${
                    hasNumber ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {hasNumber ? (
                    <FaCheck className="mr-1" />
                  ) : (
                    <FaTimes className="mr-1" />
                  )}
                  Number
                </div>
                <div
                  className={`flex items-center text-sm ${
                    hasSpecialChar ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {hasSpecialChar ? (
                    <FaCheck className="mr-1" />
                  ) : (
                    <FaTimes className="mr-1" />
                  )}
                  Special character
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCheck className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  className={`block w-full pl-10 pr-10 py-3 border ${
                    confirmPassword && confirmPassword !== newPassword
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                  } rounded-lg shadow-sm`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {confirmPassword && confirmPassword !== newPassword && (
                <p className="text-sm text-red-500 mt-1">
                  Passwords do not match
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-medium ${
                loading
                  ? "bg-emerald-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              } transition-colors`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </>
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
