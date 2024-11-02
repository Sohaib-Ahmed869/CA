import React, { useState, useEffect } from "react";
import login from "../../assets/login.png";
import certification from '../../assets/certification.jpg'

const AgentSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onClickSignup = () => {
    console.log("Signing up");
  };

  return (
    <div>
      <div className="flex flex-col animate-fade w-1/2">
        <div className="w-full flex flex-col items-start">
          <img src={login} alt="login" className="object-cover h-32" />
          <p className="text-gray-600 mb-5">
            Welcome back! Please login to your account.
          </p>
        </div>
        <form onSubmit={onClickSignup} className="flex flex-col">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="First Name"
              className="input mb-5 input-bordered w-1/2"
              value={email}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input mb-5 input-bordered w-1/2"
              value={email}
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
      </div>
    </div>
  );
};
