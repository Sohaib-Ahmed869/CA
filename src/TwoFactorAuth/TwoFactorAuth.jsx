import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import certifiedAustralia from "../assets/certifiedAustraliaBlack.png";
import loginImage from "../assets/login.png";

const URL = import.meta.env.VITE_REACT_BACKEND_URL;

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fapending = localStorage.getItem("fapending");
    const role = localStorage.getItem("authrole");
    if (!fapending) {
      if (role === "admin") {
        navigate("/admin");
      }
      if (role === "rto") {
        navigate("/rto");
      }
      if (role === "assessor") {
        navigate("/assessor");
      }
      if (role === "customer") {
        navigate("/customer");
      }
      if (role === "agent") {
        navigate("/agent");
      }
    }
  }, []);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(60);
  const email = localStorage.getItem("email");
  const inputRefs = useRef([]);
  const RoleForTitle = localStorage.getItem("RoleForTitle");
  const title =
    RoleForTitle === "rto" || RoleForTitle === "assessor"
      ? `Enter the code sent to  ${email}`
      : "Verification code sent to admin";
  useEffect(() => {
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Allow only single digit

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to the next input field
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Session expired");

      const idToken = await user.getIdToken();
      const response = await fetch(`${URL}/api/auth/verify-2fa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: fullCode, idToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Verification failed");
      }

      const { token, role, type, name } = await response.json();
      localStorage.setItem("2faPending ", false);
      localStorage.removeItem("email");
      localStorage.removeItem("RoleForTitle");
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("firebaseToken", idToken);
      localStorage.setItem("authrole", role);
      localStorage.setItem("role", role);
      localStorage.setItem("type", type);
      localStorage.setItem("agentName", type);
      localStorage.setItem("agent", name);

      // Define role-based redirection
      const navigationMap = {
        admin: "/admin",
        customer: "/",
        rto: "/rto",
        agent: "/agent",
        assessor: "/assessor",
      };
      console.log("role for navifation ", role);
      const path = navigationMap[role || type] || "/";
      navigate(path); // Redirect to the correct dashboard
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;

    setResendLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Session expired");

      const idToken = await user.getIdToken();
      const response = await fetch(`${URL}/api/auth/resend-2fa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) throw new Error("Failed to resend code");

      setCooldown(60);
      toast.success("New code sent");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen justify-center bg-gray-50">
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
      <div className="relative z-10 w-full max-w-md p-8 ">
        <div className="flex  items-center justify-center   z-20">
          <div className="w-full max-w-md  bg-white rounded-lg shadow-lg">
            <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-800 px-6 py-10 text-center overflow-hidden">
              {/* Background pattern for header */}
              <div className="absolute inset-0 opacity-20 ">
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
              <h2 className="text-2xl font-bold text-white">
                Two Step Verification
              </h2>
              <p className="text-emerald-100 mt-1">Verify your Identity </p>
            </div>
            <div className="p-8">
              <p className="text-gray-600   my-4 text-center">{title}</p>
              <form onSubmit={handleVerify} className="space-y-4 px-8 py-4">
                <div className="flex justify-center gap-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      maxLength={1}
                      className="w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-emerald-500"
                      inputMode="numeric"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify Code"}
                </button>
              </form>

              <div className="mt-4 text-center ">
                <button
                  onClick={handleResend}
                  disabled={cooldown > 0 || resendLoading}
                  className="text-emerald-600 hover:text-emerald-700 disabled:text-gray-400"
                >
                  {resendLoading
                    ? "Sending..."
                    : `Resend Code ${cooldown > 0 ? `(${cooldown}s)` : ""}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
