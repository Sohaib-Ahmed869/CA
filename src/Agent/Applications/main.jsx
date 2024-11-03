import React, { useState } from "react";
import agent from "../../assets/agent.png";
import { useNavigate } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsPeopleFill, BsCreditCard } from "react-icons/bs";
import { BsFile } from "react-icons/bs";
import Navbar from "../../Customer/components/navbar";

const MainAgentScreen = () => {
  const navigate = useNavigate();

  const options = [
    {
      icon: <BsFile />,
      title: "Applications",
      description: "View and manage applications",
      redirect: "/agent/applications",
    },
    {
      icon: <AiOutlineUserAdd />,
      title: "Register Customer",
      description: "Register a new customer",
      redirect: "/agent/register-customer",
    },
    {
      icon: <BsPeopleFill />,
      title: "View Customers",
      description: "View and manage customers",
      redirect: "/agent/customers",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center animate-fade mt-28">
        <img src={agent} alt="agent" className="object-cover h-32 lg:h-64" />
        <h1 className="text-3xl font-semibold mt-5">Agent Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5 w-full p-20">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex flex-col p-5 bg-white rounded-lg shadow-lg cursor-pointer items-center hover:shadow-2xl transition duration-300"
              onClick={() => navigate(option.redirect)}
            >
              <div className="flex items-center justify-center bg-primary text-white rounded-full h-12 w-12">
                {option.icon}
              </div>
              <h2 className="text-xl font-semibold">{option.title}</h2>
              <p className="text-gray-600">{option.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainAgentScreen;
