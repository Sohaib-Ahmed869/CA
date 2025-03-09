import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";
import { MdEmail, MdLockOutline } from "react-icons/md";
import { FaSpinner, FaArrowRight, FaLock } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import SpinnerLoader from "../Customer/components/spinnerLoader";
import Loader from "../Customer/components/loader";
import Footer from "../Customer/components/footer";

// Import your logo assets
import certifiedAustralia from "../assets/certifiedAustraliaBlack.png";
import loginImage from "../assets/login.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, check role and redirect
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const role = userDoc.data().role;
            localStorage.setItem("role", role);

            if (role === "admin") navigate("/admin");
            else if (role === "customer") navigate("/");
            else if (role === "rto") {
              localStorage.setItem("rtoType", userDoc.data().type);
              navigate("/rto");
            } else if (role === "agent") navigate("/agent");
            else if (role === "assessor") navigate("/assessor");
          }
        } catch (error) {
          console.error("Error checking user role:", error);
        }
      }
      setPageLoading(false);
    });

    // Auto-fill email from localStorage if "remember me" was checked
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }

    return () => unsubscribe();
  }, [navigate]);

  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    setError("");

    // Validate inputs
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      notifyError("Email and password are required");
      setSubmissionLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save email to localStorage if "remember me" is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const role = userDoc.data().role;
        localStorage.setItem("role", role);

        notify("Login Successful");

        // Redirect based on user role
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "customer") {
          navigate("/");
        } else if (role === "rto") {
          localStorage.setItem("rtoType", userDoc.data().type);
          navigate("/rto");
        } else if (role === "agent") {
          navigate("/agent");
        } else if (role === "assessor") {
          navigate("/assessor");
        } else {
          await auth.signOut();
          notifyError("Unknown user role");
        }
      } else {
        await auth.signOut();
        notifyError("Account not found");
      }
    } catch (err) {
      console.error("Login error:", err);

      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError("Invalid email or password");
        notifyError("Invalid email or password");
      } else if (err.code === "auth/too-many-requests") {
        setError(
          "Too many failed login attempts. Please try again later or reset your password"
        );
        notifyError("Account temporarily locked");
      } else {
        setError("An error occurred during login");
        notifyError("Login failed");
      }
    } finally {
      setSubmissionLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    // Validate reset email
    if (!resetEmail.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setResetLoading(true);

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent!");
      setResetLoading(false);
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Reset error:", err);
      if (err.code === "auth/user-not-found") {
        toast.error("No account found with this email");
      } else {
        toast.error("Error sending reset email");
      }
      setResetLoading(false);
    }
  };

  if (pageLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background design */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-500 overflow-hidden">
        {/* Decorative patterns */}
        <div className="absolute inset-0 opacity-20">
          <svg
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 800"
          >
            <path
              fill="none"
              stroke="white"
              strokeWidth="2"
              d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63"
            />
            <path
              fill="none"
              stroke="white"
              strokeWidth="2"
              d="M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764"
            />
            <path
              fill="none"
              stroke="white"
              strokeWidth="2"
              d="M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880"
            />
            <path
              fill="none"
              stroke="white"
              strokeWidth="1"
              d="M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382"
            />
            <path
              fill="none"
              stroke="white"
              strokeWidth="1"
              d="M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764"
            />
            <path
              fill="none"
              stroke="white"
              strokeWidth="1"
              d="M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880"
            />
          </svg>
        </div>

        {/* Floating circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full opacity-10 animate-floating"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white rounded-full opacity-10 animate-floating-delayed"></div>
      </div>

      <Toaster position="top-right" />
      {submissionLoading && <SpinnerLoader />}

      {/* Header with logo */}
      <div className="relative z-10 flex justify-center py-6">
        <div className="bg-white px-6 py-3 rounded-full shadow-lg">
          <img
            src={certifiedAustralia}
            alt="Certified Australia"
            className="h-16 cursor-pointer"
            onClick={() => {
              window.location.href = "https://certifiedaustralia.com.au/";
            }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-2xl rounded-xl overflow-hidden backdrop-blur-lg border border-white border-opacity-20">
            {/* Login card header */}
            <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-800 px-6 py-10 text-center overflow-hidden">
              {/* Background pattern for header */}
              <div className="absolute inset-0 opacity-20">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,0 L100,0 L100,100 L0,100 Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M0,0 L100,100 M100,0 L0,100"
                    stroke="white"
                    strokeWidth="0.5"
                    strokeDasharray="6,3"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    stroke="white"
                    strokeWidth="0.5"
                    fill="none"
                  />
                </svg>
              </div>

              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white bg-opacity-90 mb-5 shadow-lg transform transition-transform hover:scale-105">
                <img src={loginImage} alt="Login" className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
              <p className="text-emerald-100 mt-1">
                Access your account securely
              </p>
            </div>

            {/* Login form */}
            <div className="px-8 py-8 bg-gradient-to-b from-white to-gray-50">
              {error && (
                <div className="mb-5 bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="relative group">
                  <div className="flex items-center border border-gray-300 bg-white p-3 rounded-lg group-hover:border-emerald-400 group-hover:shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all duration-300">
                    <MdEmail className="text-gray-500 text-xl group-hover:text-emerald-500 transition-colors duration-300" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full ml-3 focus:outline-none text-gray-700 bg-transparent"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="relative group">
                  <div className="flex items-center border border-gray-300 bg-white p-3 rounded-lg group-hover:border-emerald-400 group-hover:shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all duration-300">
                    <FaLock className="text-gray-500 text-xl group-hover:text-emerald-500 transition-colors duration-300" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full ml-3 focus:outline-none text-gray-700 bg-transparent"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-500 hover:text-emerald-500 focus:outline-none transition-colors duration-300"
                    >
                      {showPassword ? (
                        <IoMdEye className="text-xl" />
                      ) : (
                        <IoMdEyeOff className="text-xl" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="absolute block w-6 h-6 bg-white border-2 border-gray-300 rounded-full appearance-none cursor-pointer checked:right-0 checked:border-emerald-500 checked:bg-emerald-500 transition-all duration-300"
                      />
                      <label
                        htmlFor="remember-me"
                        className="block h-6 overflow-hidden bg-gray-200 rounded-full cursor-pointer"
                      ></label>
                    </div>
                    <label
                      htmlFor="remember-me"
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => setIsDialogOpen(true)}
                      className="text-sm text-emerald-600 hover:text-emerald-500 font-medium focus:outline-none transition-colors duration-300"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submissionLoading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  {submissionLoading ? (
                    <FaSpinner className="animate-spin text-white" />
                  ) : (
                    <>
                      Sign In <FaArrowRight className="ml-1" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative">
                  <span className="px-2 bg-gradient-to-b from-white to-gray-50 text-sm text-gray-500">
                    Or
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600">Don't have an account yet?</p>
                <a
                  href="/screening"
                  className="mt-2 inline-block font-semibold text-emerald-600 hover:text-emerald-500 transition-colors duration-300"
                >
                  Create New Account
                </a>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex justify-center space-x-4 text-white text-opacity-90">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs">Secure Login</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs">Data Protection</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
              </svg>
              <span className="text-xs">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition-colors duration-200"
              onClick={() => setIsDialogOpen(false)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
                <MdLockOutline className="text-2xl text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Reset Your Password
              </h3>
              <p className="text-gray-500 mt-1">
                Enter your email and we'll send you a link to reset your
                password
              </p>
            </div>

            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="flex items-center border border-gray-300 p-3 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all duration-300">
                <MdEmail className="text-gray-500 text-xl" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full ml-3 focus:outline-none text-gray-700"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none"
              >
                {resetLoading ? (
                  <FaSpinner className="animate-spin mx-auto text-white" />
                ) : (
                  "Send Reset Link"
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 focus:outline-none"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes floating {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-floating {
          animation: floating 8s ease-in-out infinite;
        }

        .animate-floating-delayed {
          animation: floating 8s ease-in-out 2s infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Login;
