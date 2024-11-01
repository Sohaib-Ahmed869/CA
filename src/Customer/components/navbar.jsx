import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import certifiedAustralia from "../../assets/certifiedAustralia.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check auth state on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set logged-in state based on user presence
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="navbar fixed top-4 left-1/2 transform -translate-x-1/2 z-10 shadow-lg bg-secondary backdrop-blur-md rounded-2xl px-6 py-3 flex justify-between items-center w-[90%] max-w-2xl bg-opacity-90">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={certifiedAustralia}
          alt="Certified Australia Logo"
          className="h-12 mr-4"
        />
      </div>
      <div>
        {isLoggedIn ? (
          <button
            className="btn btn-primary btn-sm border-0 text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="btn btn-primary btn-sm border-0 text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
