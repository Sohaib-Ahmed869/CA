import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import certifiedAustralia from "../assets/certifiedAustraliaBlack.png";
import { FaCheckCircle } from "react-icons/fa";
import { auth } from "../firebase";

const ConfirmationPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center lg:p-16 p-4 mt-28">
        <img
          src={certifiedAustralia}
          alt="Certified Australia"
          className="mb-2 h-28"
        />
        <div className="md:w-2/3 lg:w-1/2 bg-gray-100 p-8 rounded-3xl shadow-lg mt-8 w-full text-center">
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
          <p className="text-gray-700 mb-6">
            Your fast skills assessment has been submitted successfully. Your
            account has been created and you're now logged in!
          </p>
          <div className="space-y-4">
            <p className="text-gray-600">
              You'll be redirected to your dashboard in a few seconds, or you
              can click the button below.
            </p>
          </div>
          <div className="mt-8">
            <Link
              to="/"
              className="btn btn-primary text-white px-6 py-3 rounded-lg"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
