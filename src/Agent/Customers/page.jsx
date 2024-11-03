import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../../Customer/components/navbar";
import { useNavigate } from "react-router-dom";
import SpinnerLoader from "../../Customer/components/spinnerLoader";
import customersimg from "../../assets/customer.png";
import { getCustomersByAgents } from "../../Customer/Services/agentApplication";

const CustomersByAgent = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [agentId, setAgentId] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAgentId(user.uid);
        console.log("User ID:", user.uid);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigate]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        if (agentId) {
          const customers = await getCustomersByAgents(agentId);
          setCustomers(customers);
          setLoading(false);
          console.log(customers);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCustomers();
  }, [agentId]); // Run fetchCustomers only when agentId changes

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-28">
        <div className="flex flex-col items-center">
          <img src={customersimg} alt="Customers" className="h-28" />
          <h1 className="text-2xl font-bold text-left mb-10">
            Customers Registered by Agent
          </h1>
        </div>
        {loading ? (
          <SpinnerLoader />
        ) : (
          <div className="mt-10">
            {customers &&
              customers.map((customer) => (
                <table className="table-auto w-full text-left mt-5 table">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">First Name</th>
                      <th className="px-4 py-2">Last Name</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">{customer.firstName}</td>
                      <td className="border px-4 py-2">{customer.lastName}</td>
                      <td className="border px-4 py-2">{customer.email}</td>
                      <td className="border px-4 py-2">{customer.phone}</td>
                    </tr>
                  </tbody>
                </table>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersByAgent;
