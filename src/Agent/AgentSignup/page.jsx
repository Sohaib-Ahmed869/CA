import React, { useState, useEffect } from "react";
import login from "../../assets/login.png";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import certifiedAustralia from "../../assets/certifiedAustralia.png";
import { useNavigate } from "react-router-dom";
import { registerAgent } from "../../Customer/Services/authService";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

const AgentSignup = () => {
  const notify = () => toast.success("Agent registered successfully");
  const notifyError = (message) => toast.error(message);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [submissionLoading, setSubmissionLoading] = useState(false);

  const onClickSignup = async (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    try {
      const response = await registerAgent(
        firstName,
        lastName,
        email,
        password
      );
      console.log(response);
      if (response.message === "Agent registered successfully") {
        navigate("/agent/login");
      }
      setSubmissionLoading(false);
    } catch (err) {
      console.error(err);

      notifyError("An error occurred. Please try again");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center animate-fade min-h-screen bg-gray-200 lg:p-0 p-10">
      {submissionLoading && <SpinnerLoader />}
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="flex flex-col animate-fade p-5 bg-white rounded-2xl shadow-lg lg:w-1/2">
        <div className="w-full flex flex-col items-start">
          <img src={login} alt="login" className="object-cover h-32" />
          <p className="text-gray-600 mb-5">
            Welcome to Certified Australia! Please sign up to create an agent
            account.
          </p>
        </div>
        <form onSubmit={onClickSignup} className="flex flex-col">
          <div className="flex items-center gap-5">
            <input
              type="text"
              placeholder="First Name"
              className="input mb-5 input-bordered w-1/2"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input mb-5 input-bordered w-1/2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="input mb-5 input-bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input mb-5 input-bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </form>
        <button
          onClick={onClickSignup}
          className="btn btn-primary w-full text-white"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default AgentSignup;
